import express from "express";
import { signup, signin, signout, getUsers, checkUsername, sendOTP, verifyOTP, resetPassword } from '../controllers/authController.js';
const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/signout", signout)
router.get("/check-username",checkUsername);
router.post("/auth/forgot-password/send-otp", sendOTP);
router.post("/auth/forgot-password/verify-otp", verifyOTP);
router.post("/auth/forgot-password/reset-password", resetPassword);

export default router;
