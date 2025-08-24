import vehicleServices from "../services/vehicleServices.js";

const createVehicle = async (req, res) => {
  try {
    const data = await vehicleServices.createVehicle(
      req.body,
      req.files,
      req.user_id
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getVehicles = async (req, res) => {
  const products = await vehicleServices.getVehicles(req.query);

  res.statusCode(200).json(products);
};

export default { createVehicle, getVehicles };
