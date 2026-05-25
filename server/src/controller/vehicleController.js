import vehicleServices from "../services/vehicleServices.js";

const createVehicle = async (req, res) => {
  try {
    const data = await vehicleServices.createVehicle(req.body, req.files, req.user_id);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const products = await vehicleServices.getVehicles(req.query);
    res.status(200).json(products);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getVehiclesById = async (req, res) => {
  try {
    const id = req.params.id;
    const vehicles = await vehicleServices.getVehiclesById(id);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updatedVehicles = async (req, res) => {
  try {
    const data = await vehicleServices.updatedVehicles(req.params.id, req.body, req.files, req.user_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteVehicles = async (req, res) => {
  try {
    await vehicleServices.deleteVehicles(req.params.id);
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export default { createVehicle, getVehicles, getVehiclesById, updatedVehicles, deleteVehicles };