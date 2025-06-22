import bookingServices from "../services/bookingServices.js";

const createBooking = async (req, res) => {
  const input = req.body;

  try {
    if (!input) {
      return res.status(400).send("Data should be included");
    }

    if (!input.bookingItems || !input.bookingItems.length) {
      return res.status(400).send("Booking items are required");
    }

    const booking = await bookingServices.createBooking(input, req.user);

    res.json(booking);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  createBooking,
};
