import express from "express";
import vehicleController from "../controller/vehicleController.js";

const router = express.Router();

router.get("/", vehicleController.getVehicles);
router.post("/", vehicleController.createVehicle);

export default router;
