import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const payload = {
  transactionId: "ABC123",
  orderId: "NS1001",
  amount: 1500,
  status: "COMPLETED",
};

const signature = crypto
  .createHmac("sha256", process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest("hex");

console.log("Webhook signature:");
console.log(signature);