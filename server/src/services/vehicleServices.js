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

export default { createVehicle };
