import express from "express";
import bookingController from "../controller/bookingController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//URL: /api/booking
router.post("/", auth, bookingController.createBooking);

export default router;
