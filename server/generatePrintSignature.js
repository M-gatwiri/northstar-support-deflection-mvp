import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const payload = {
  jobId: "JOB-TEST-001",
  attendeeId: "A001",
  status: "COMPLETED",
};

const signature = crypto
  .createHmac("sha256", process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest("hex");

console.log("Printer webhook signature:");
console.log(signature);