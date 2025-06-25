import User from "../models/User.js";
import ResetPasswordModel from "../models/ResetPassword.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";
import config from "../config/config.js";
import sendEmail from "../utils/email.js";
import { ADMIN, USER } from "../constants/roles.js";

const signup = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (user) {
    throw { statusCode: 409, message: "User already exists" };
  }

  const hashedPassword = bcrypt.hashSync(data.password, 10);

  const requestedRoles = Array.isArray(data.roles)
    ? data.roles.map((r) => String(r).toUpperCase())
    : [];
  const roles = requestedRoles.includes(ADMIN) ? [ADMIN] : [USER];

  const signupUser = await User.create({
    name: data.name,
    address: data.address,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
    roles,
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

const login = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw { statusCode: 404, message: "User not found" };
  }

  const isMatch = bcrypt.compareSync(data.password, user.password);

  if (!isMatch) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    roles: user.roles,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { message: "Password reset link sent to your email" };
  }

  await ResetPasswordModel.deleteMany({ userId: user._id });

  const token = crypto.randomUUID();

  await ResetPasswordModel.create({
    token,
    userId: user._id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    isUsed: false,
  });

  await sendEmail(email, {
    subject: "Password Reset",
    body: `
      <div style="padding:20px;">
        <h1>Please click the link to reset your password</h1>
        <a href="${config.appUrl}/reset-password?token=${token}&userId=${user._id}"
        style="
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        ">
        Reset Password
        </a>
      </div>
    `,
  });

  return { message: "Password reset link sent to your email" };
};

const resetPassword = async (userId, token, newPassword) => {
  let objectId;

  try {
    objectId = new mongoose.Types.ObjectId(userId);
  } catch (e) {
    throw { statusCode: 400, message: "Invalid userId format" };
  }

  const data = await ResetPasswordModel.findOne({
    userId: objectId,
    token,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!data) {
    throw {
      statusCode: 400,
      message: "Invalid or expired password reset token",
    };
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });

  await ResetPasswordModel.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return {
    message: "Password has been reset successfully",
  };
};

export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
