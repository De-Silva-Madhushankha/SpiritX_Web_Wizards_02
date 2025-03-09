import express from "express";
import { signup } from "../controllers/authController.js"; // Import the controller function

const router = express.Router();

// Use POST request for signup
router.post("/signup", signup); // Changed to POST

export default router;
