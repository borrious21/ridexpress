import { verifyJWT } from "../utils/tokens.js";

const auth = async (req, res, next) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const authToken = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("authToken="))
    ?.split("=")[1];

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const data = await verifyJWT(authToken);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;