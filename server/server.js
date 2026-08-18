import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();

app.use(express.json());

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});