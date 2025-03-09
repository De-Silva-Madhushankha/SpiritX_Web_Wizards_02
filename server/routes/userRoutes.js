import express from "express";
import {getAvailablePlayers ,getUserRemainingBudget,getLeaderboard} from "../controllers/userController.js"; // Import the controller function

const router = express.Router();

// Route to get tournament stats
router.get("/", getAvailablePlayers);
router.get("/remainingbudget/:userId", getUserRemainingBudget);
router.get("/leaderboard/:userId", getLeaderboard);

export default router;
