import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import warehouseInventory from "./warehouseData.js";

dotenv.config();

const app = express();

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

app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});