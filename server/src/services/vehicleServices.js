import { VEHICLE_DESC } from "../constants/prompt.js";
import Vehicle from "../models/Vehicle.js";
import uploadFile from "../utils/file.js";
import ai from "../utils/gemini.js";

const createVehicle = async (data, files, createdBy) => {
  const imageUrls = [];

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    imageUrls.push(...uploadedFiles.map((item) => item.secure_url)); 
  }

  const promptMsg = VEHICLE_DESC
    .replace("%s", data.name)
    .replace("%s", data.brand)
    .replace("%s", data.model)
    .replace("%s", data.type);

  const aiDesc = await ai(promptMsg);

  const vehicle = await Vehicle.create({  
    ...data,
    imageUrls,
    createdBy,
    description: data.description ?? aiDesc,
  });

  return vehicle;
};

const getVehicles = async (query) => {
  const { brands, category, min, max, limit, name, offset, createdBy } = query;

  const sort = JSON.parse(query.sort || "{}");
  const filters = {};

  if (brands) filters.brand = { $in: brands.split(",") };
  if (category) filters.category = category;
  if (min) filters.pricePerDay = { $gte: Number(min) };         
  if (max) filters.pricePerDay = { ...filters.pricePerDay, $lte: Number(max) };
  if (name) filters.name = { $regex: name, $options: "i" };
  if (createdBy) filters.createdBy = createdBy;

  const products = await Vehicle.find(filters)
    .sort(sort)
    .limit(Number(limit) || 10)   
    .skip(Number(offset) || 0);

  return products;
};

const getVehiclesById = async (id) => {
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw { statusCode: 404, message: "Vehicle not found" };  
  }

  return vehicle;
};

const updatedVehicles = async (id, data, files, userId) => {
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw { statusCode: 404, message: "Vehicle not found" };
  }

  if (String(vehicle.createdBy) !== String(userId)) {  
    throw { statusCode: 403, message: "Access Denied" };
  }

  const updatedData = { ...data };  

  if (files && files.length > 0) {  
    const uploadedFiles = await uploadFile(files);
    updatedData.imageUrls = uploadedFiles.map((item) => item.secure_url); 
  }

  const result = await Vehicle.findByIdAndUpdate(id, updatedData, { new: true }); 

  return result;
};

const deleteVehicles = async (id) => {
  await Vehicle.findByIdAndDelete(id);
};

export default {
  createVehicle,
  getVehicles,
  getVehiclesById,
  updatedVehicles,
  deleteVehicles,
};