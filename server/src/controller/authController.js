import authService from "../services/authServices.js";
import jwt from "jsonwebtoken";
import { createJWT } from "../utils/tokens.js";

const signup = async (req, res) => {
  const input = req.body;

  try {
    
    if (!input.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!input.confirmPassword) {
      return res.status(400).json({ message: "Confirm Password is required" });
    }

    if (input.password !== input.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await authService.signup(input);

    const authToken = createJWT(data);

    console.log(user);

    res.cookie("authToken", authToken, { maxAge: 900000 * 1000 });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { signup };
