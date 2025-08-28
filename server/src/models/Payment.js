import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required."],
    min: 0,
  },
  method: {
    type: String,
    required: [true, "Payment method is required."],
    enum: ["cash", "card", "online"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "failed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
