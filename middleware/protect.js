import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      const error = new Error("No token found");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;