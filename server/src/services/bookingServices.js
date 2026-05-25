import { PAYMENT_STATUS_COMPLETED } from "../constants/paymentStatus.js";
import { BOOKING_STATUS_CONFIRMED } from "../constants/bookingStatus.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import payment from "../utils/payment.js";
import crypto from "crypto";

const createBooking = async (data, user) => {
  const vehicleNumber = crypto.randomUUID();
  const booking = await Booking.create({
    ...data,
    user: user._id ?? user.id,
    vehicleNumber,
  });

  return booking;
};

const getBooking = async () => {
  const booking = await Booking.find().populate("bookingItems.vehicle");
  return booking;
};

const deleteBooking = async (id) => {
  const booking = await Booking.findByIdAndDelete(id);
  return booking;
};

const getBookedByUser = async (userid) => {
  const booking = await Booking.find({ user: userid })
    .populate("bookingItems.vehicle")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  return booking;
};

const getBookedByID = async (id) => {
  const booking = await Booking.findById(id)
    .populate("bookingItems.vehicle")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  return booking;
};

const updateBooking = async (id, data) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { status: data.status },
    { new: true }
  );

  return booking;
};

const bookingPayment = async (id) => {
  const book = await getBookedByID(id);

  if (!book) {
    throw { statusCode: 404, message: "Booking not found" };
  }

  const transactionId = crypto.randomUUID();

  const bookingPaymentRecord = await Payment.create({
    amount: book.totalPrice,
    method: "online",
    transactionId,
  });

  await Booking.findByIdAndUpdate(id, {
    payment: bookingPaymentRecord._id,
    status: "pending",
  });

  return await payment.payViaKhalti({
    amount: book.totalPrice,
    customer: book.user,
    purchaseOrderID: book.id,
    purchaseOrderName: book.vehicleNumber,
  });
};

const confirmPayment = async (id, status) => {
  const booking = await getBookedByID(id);

  if (!booking) {
    throw { statusCode: 404, message: "Booking not found" };
  }

  if (!booking.payment) {
    throw { statusCode: 400, message: "Payment not initiated. Call POST /api/booking/:id/payment first." };
  }

  if (!status) {
    throw { statusCode: 400, message: "Payment status is required" };
  }

  if (status.toUpperCase() !== PAYMENT_STATUS_COMPLETED) {
    await Payment.findByIdAndUpdate(booking.payment._id, {
      status: "failed",
    });
    throw { statusCode: 400, message: "Payment is not completed" };
  }

  await Payment.findByIdAndUpdate(booking.payment._id, {
    status: PAYMENT_STATUS_COMPLETED,
  });

  return await Booking.findByIdAndUpdate(
    id,
    { status: BOOKING_STATUS_CONFIRMED },
    { new: true }
  );
};

export default {
  createBooking,
  getBooking,
  deleteBooking,
  getBookedByUser,
  getBookedByID,
  updateBooking,
  bookingPayment,
  confirmPayment,
};