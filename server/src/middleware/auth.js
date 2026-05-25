import { verifyJWT } from "../utils/tokens.js";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const authToken = cookie.split("=")[1];

  try {
    const data = await verifyJWT(authToken);
    
    const user = await User.findById(data.id ?? data._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;