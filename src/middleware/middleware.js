import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const apiVerify = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please create an account.",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You haven't any permission to access resources",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.ownerId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid credentials " });
  }
};
