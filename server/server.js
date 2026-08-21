import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import warehouseInventory from "./warehouseData.js";
import cors from "cors";
import { addPrintJob } from "./printQueue.js";


dotenv.config();

const app = express();
app.use(cors());
const attendees = new Map([
  ["A001", { id: "A001", name: "Mercy", status: "NOT_CHECKED_IN" }],
  ["A002", { id: "A002", name: "Jane", status: "NOT_CHECKED_IN" }],
  ["A003", { id: "A003", name: "Brian", status: "NOT_CHECKED_IN" }],
]);

app.get("/attendees/:attendeeId", (req, res) => {
  const attendee = attendees.get(req.params.attendeeId);

  if (!attendee) {
    return res.status(404).json({
      message: "Attendee not found",
    });
  }

  res.json(attendee);
});

app.use(express.json());
const inventoryCache = new Map();
async function syncInventory() {
  try {
    const response = await fetch("http://localhost:5000/warehouse/inventory");

    const inventory = await response.json();

    inventory.forEach((item) => {
      inventoryCache.set(item.productId, {
        ...item,
        inStock: item.quantity > 0,
        lastUpdated: new Date().toISOString(),
      });
    });

    console.log("Inventory cache updated:");
    console.log(inventory);
  } catch (error) {
    console.error("Inventory sync failed:", error.message);
  }
}
syncInventory();

setInterval(syncInventory, 5 * 60 * 1000);

function verifyWebhook(payload, signature) {
  const secret = process.env.WEBHOOK_SECRET;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");

  if (!signature) {
    return false;
  }

  return signature === expectedSignature;
}

app.get("/", (req, res) => {
  res.json({
    message: "NorthStar webhook server is running",
  });
});

app.post("/webhook/mpesa", (req, res) => {
  const signature = req.headers["x-webhook-signature"];

  if (!signature) {
    return res.status(401).json({
      message: "Missing webhook signature",
    });
  }

  const isValid = verifyWebhook(req.body, signature);

  if (!isValid) {
    return res.status(401).json({
      message: "Invalid webhook signature",
    });
  }

  console.log("Verified M-PESA webhook:");
  console.log(req.body);

  res.status(200).json({
    message: "Webhook verified and accepted",
  });
});

app.get("/warehouse/inventory", (req, res) => {
  res.json(warehouseInventory);
});

app.get("/inventory/:productId", (req, res) => {
  const productId = req.params.productId;

  const inventory = inventoryCache.get(productId);

  if (!inventory) {
    return res.status(404).json({
      message: "Product not found in inventory",
    });
  }

  res.json(inventory);
});

const PORT = 5000;
app.post("/print", (req, res) => {
  const { attendeeId, attendeeName } = req.body;

  if (!attendeeId || !attendeeName) {
    return res.status(400).json({
      message: "Attendee ID and name are required",
    });
  }

  const attendee = attendees.get(attendeeId);

  if (!attendee) {
    return res.status(404).json({
      message: "Attendee not found",
    });
  }

  // Prevent duplicate scans
  if (
    attendee.status === "PENDING" ||
    attendee.status === "CHECKED_IN"
  ) {
    return res.status(409).json({
      message: "Attendee is already being checked in or is already checked in",
      attendee,
    });
  }

  attendee.status = "PENDING";

  const job = {
    jobId: `JOB-${Date.now()}`,
    attendeeId,
    attendeeName,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  addPrintJob(job);

  res.status(202).json({
    message: "Print request queued",
    job,
  });
});

app.post("/webhook/print", (req, res) => {
  const signature = req.headers["x-webhook-signature"];

  if (!signature) {
    return res.status(401).json({
      message: "Missing webhook signature",
    });
  }

  const isValid = verifyWebhook(req.body, signature);

  if (!isValid) {
    return res.status(401).json({
      message: "Invalid webhook signature",
    });
  }

  const { jobId, attendeeId, status } = req.body;

  if (!jobId || !attendeeId || !status) {
    return res.status(400).json({
      message: "jobId, attendeeId and status are required",
    });
  }

  const attendee = attendees.get(attendeeId);

  if (!attendee) {
    return res.status(404).json({
      message: "Attendee not found",
    });
  }

  if (attendee.status === "CHECKED_IN") {
    return res.status(200).json({
      message: "Attendee already checked in",
    });
  }

  if (status === "COMPLETED") {
    attendee.status = "CHECKED_IN";

    console.log(`Badge printed successfully for ${attendee.name}`);

    return res.status(200).json({
      message: "Print confirmation received",
      attendee,
    });
  }

  res.status(200).json({
    message: "Print job update received",
    status,
  });
});

app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});