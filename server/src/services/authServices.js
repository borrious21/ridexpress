import User from "../models/User.js";
import bcrypt from "bcryptjs";

const signup = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (user) throw { statusCode: 409, message: "User already exists" };

  const hashedPassword = bcrypt.hashSync(data.password);

  const signupUser = await User.create({
    name: data.name,
    address: data.address,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });

  return {
    _id: signupUser._id,
    name: signupUser.name,
    email: signupUser.email,
    phone: signupUser.phone,
    address: signupUser.address,
    roles: signupUser.roles,
  };
};
export default { signup };
