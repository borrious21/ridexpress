import Vehicle from "../models/Vehicle.js";
import uploadFile from "../utils/file.js";

const createVehicle = async (data, files, createdBy) => {
  const uploadedFiles = await uploadFile(files);

  return await Vehicle.create({
    ...data,
    imageUrls: uploadedFiles.map((item) => item?.url), //here jaba array ma files halda diffrent data haru aauca eeuta file ko but we only need urls to store
    createdBy, // the data in database thats why we only write urls
  });
};

const getVehicles = async (query) => {
  const { brands, category, min, max, limit, name, offset, createdBy } = query;

  const sort = JSON.parse(query.sort || "{}");
  const filters = {};

  if (brands) filters.brand = { $in: brands.split(",") };
  if (category) filters.category = category;
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (name) filters.name = { $regex: name, $options: "i" };

  if (createdBy) filters.createdBy = createdBy;

  const products = await Vehicle.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);

  return products;
};

const getVehiclesById = async (id) => {
  const vehicles = await Vehicle.findById(id);

  if (!vehicles) {
    throw {
      statuscode: 404,
      message: "Vehicles is not found",
    };
  }

  if (!vehicles.stock < 1) {
    throw {
      statuscode: 404,
      message: "Vehicles is not available",
    };
  }
  return vehicles;
};

const updatedVehicles = async (id, data, files, userid) => {
  const vehicles = await Vehicle.findById(id);

  if (vehicles.createdBy != userid) {
    throw {
      statuscode: 403,
      message: "Access Denied",
    };
  }

  const updatedData = data;
  if (files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    updatedData.imageUrls = uploadedFiles.map((item) => item?.url);
  }

  const updateData = await Vehicle.findByIdAndUpdate(
    id,
    { updateData },
    {
      new: true,
    }
  );
  return updateData;
};

export default { createVehicle, getVehicles, getVehiclesById, updatedVehicles };
