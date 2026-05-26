import authService from "../services/authServices.js";
import { createJWT } from "../utils/tokens.js";

const COOKIE_MAX_AGE = 15 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: COOKIE_MAX_AGE,
};

const signup = async (req, res) => {
  const input = req.body;

  try {
    if (!input.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await authService.signup(input);

    const authToken = createJWT({
      id: user._id,
      email: user.email,
      roles: user.roles,
    });

    res.cookie("authToken", authToken, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token: authToken,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const input = req.body;

  try {
    if (!input.email || !input.password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await authService.login(input);

    const authToken = createJWT({
      id: user._id,
      email: user.email,
      roles: user.roles,
    });

    res.cookie("authToken", authToken, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user,
      token: authToken,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const input = req.body;

  try {
    if (!input.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const data = await authService.forgotPassword(input.email);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const input = req.body;
  const query = req.query;

  try {
    if (!query.token || !query.userId) {
      return res.status(400).json({
        message: "Token and UserID are required.",
      });
    }

    if (!input.password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (!input.confirmPassword) {
      return res.status(400).json({
        message: "Confirm Password is required",
      });
    }

    if (input.password !== input.confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const result = await authService.resetPassword(
      query.userId,
      query.token,
      input.password
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export default { signup, login, forgotPassword, resetPassword };