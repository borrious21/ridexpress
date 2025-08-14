import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  type: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

export default mongoose.model("Vehicle", vehicleSchema);