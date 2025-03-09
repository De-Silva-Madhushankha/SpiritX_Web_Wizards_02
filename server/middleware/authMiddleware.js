import { verifyToken } from '../utils/jwtUtils.js';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = verifyToken(token);
    console.log('decoded:', decoded);
    const user_id = decoded.id; 
    const user = await User.findById(user_id); // Find the user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    console.log('authmiddle:', user);
    next(); 
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

export default authMiddleware;