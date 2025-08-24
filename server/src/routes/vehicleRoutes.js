import express from "express";
import vehicleController from "../controller/vehicleController.js";

const router = express.Router();

router.get("/", vehicleController.getVehicles);
router.get("/:id", vehicleController.getVehiclesById);
router.post("/", vehicleController.createVehicle);
router.put("/:id", vehicleController.updatedVehicles);
router.delete("/:id", vehicleController.deleteVehicles);

export default router;
