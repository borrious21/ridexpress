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

const getBookedByUser = async (userid) => {
  const booking = await Booking.find({ user: userid })
    .populate("bookingItems.vehicle")
    .populate("user", ["name", "email", "phone", "address"]);

  return booking;
};

const getBookedByID = async (id) => {
  const booking = await Booking.findById(id)
    .populate("bookingItems.vehicle")
    .populate("user", ["name", "email", "phone", "address"]);

  return booking;
};

const updateBooking = async (id, data) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    {
      status: data.status,
    },
    { new: true }
  );

  return booking;
};

const bookingPayment = async (id) => {
  const book = await getBookedByID(id);

  return await payment.payViaKhalti({
    amount: book.totalAmount,
    customer: book.user,
    purchaseOrderID: book.id,
    purchaseOrderName: book.vehicleNumber
  })
  return book;
}; 


export default {
  createBooking,
  getBooking,
  deleteBooking,
  getBookedByUser,
  getBookedByID,
  updateBooking,
  bookingPayment
};
