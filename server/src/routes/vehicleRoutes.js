import express from "express";
import vehicleController from "../controller/vehicleController.js";

const router = express.Router();

router.get("/", vehicleController.getVehicles);
router.get("/:id", vehicleController.getVehiclesById);
router.post("/", vehicleController.createVehicle);
router.put("/:id", vehicleController.updatedVehicles);

export default router;
