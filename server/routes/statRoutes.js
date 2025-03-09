import express from "express";
import { getTournamentStats } from "../controllers/tournamentController.js"; // Import the controller function

const router = express.Router();

// Route to get tournament stats
router.get("/", getTournamentStats);

export default router;
