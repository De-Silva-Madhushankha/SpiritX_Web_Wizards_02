import express from "express";
import { addPlayerToTeam, removePlayerFromTeam, calculateTeamPoints, getUserTeam ,getTeam , getCurrentTeam} from "../controllers/teamController.js";

const router = express.Router();

// Route to add a player to the user's team
router.post("/add", addPlayerToTeam);

// Route to remove a player from the user's team
router.delete("/remove/:playerId", removePlayerFromTeam);

// Route to calculate and get team points (only when 11 players are added)
router.get("/points/:userId", calculateTeamPoints);

// Route to get the user's team
router.get("/:userId", getUserTeam);

router.get("/finalTeam/:userId", getTeam);

router.get("/currentTeam/:userId", getCurrentTeam);

export default router;
