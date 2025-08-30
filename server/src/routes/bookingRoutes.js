import express from "express";
import bookingController from "../controller/bookingController.js";
import auth from "../middleware/auth.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";

const router = express.Router();

//URL: /api/booking
router.get("/", roleBasedAuth[ADMIN], bookingController.getBooking);

router.post("/", auth, bookingController.createBooking);

router.delete("/:id", roleBasedAuth[ADMIN], bookingController.deleteBooking);

export default router;
