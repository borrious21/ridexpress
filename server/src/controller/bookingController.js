import bookingServices from "../services/bookingServices.js";

const createBooking = async (req, res) => {
  const input = req.body;

  if (!input) {
    return res.status(400).send("Data should be include");
  }
  if (!input.bookingItems || !input.bookingItems.length) {
    return res.status(400).send("Booking items are required");
  }

  try {
    const booking = await bookingServices.createBooking(input, req.user);

    res.json(booking);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { createBooking };
