import express from "express";
import vehicleController from "../controller/vehicleController.js";

const router = express.Router();

router.post("/", vehicleController.createVehicle);

export default router;
