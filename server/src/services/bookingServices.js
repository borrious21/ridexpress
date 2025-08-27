import Booking from "../models/Booking.js";

const createBooking = async (data, userID) => {
  const vehicleNumber = crypto.randomUUID();
  const booking = await Booking.create({ ...data, userID, vehicleNumber });
  return booking;
};

export default { createBooking };
