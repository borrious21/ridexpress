import dotenv from "dotenv";
import { version } from "mongoose";

dotenv.config();

const config = {
  mongoDBUrl: process.env.MONGODB_URL || "",
  name: process.env.NAME || "RidExpress",
  port: process.env.PORT || 5000,
  version: process.env.VERSION || "1.0.0",
  jwtSecret:
    process.env.JWT_SECRET ||
    "e6b0f7b6f7a357a416f5c762f75531caecf815b4d96d00bc",
  cloudinary: {
    cloudName: process.env.CLOUD_NAME || "",
    apiKey: process.env.API_KEY || "",
    apiSecret: process.env.API_SECRET || "",
  },
};

export default config;
