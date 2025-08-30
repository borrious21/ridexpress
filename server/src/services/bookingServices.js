import Booking from "../models/Booking.js";

const createBooking = async (data, userID) => {
  const vehicleNumber = crypto.randomUUID();
  const booking = await Booking.create({
    ...data,
    user: userID,
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

export default { createBooking, getBooking, deleteBooking };
