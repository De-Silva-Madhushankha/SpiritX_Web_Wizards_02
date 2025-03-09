import express from "express";
import { addPlayerToTeam, removePlayerFromTeam, calculateTeamPoints, getUserTeam, getTeam, getCurrentTeam, getTeamRank, getTotalPoints, getTeamValue, getRemainingBudget, getRecentPerformance } from "../controllers/teamController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/teaminfo/teamRank", authMiddleware, getTeamRank);
router.get("/teaminfo/totalPoints", authMiddleware, getTotalPoints);
router.get("/teaminfo/teamValue", authMiddleware, getTeamValue);
router.get("/teaminfo/remainingBudget", authMiddleware, getRemainingBudget);
router.get("/teaminfo/recentPerformance", authMiddleware, getRecentPerformance);

router.post("/add", addPlayerToTeam);

router.delete("/remove/:userId/:playerId" , removePlayerFromTeam);

router.get("/points/:userId", calculateTeamPoints);

router.get("/:userId", getUserTeam);

router.get("/finalTeam/:userId", getTeam);

router.get("/currentTeam/:userId", getCurrentTeam);




router.get("/" ,authMiddleware, (req, res) => {
    res.send("Team routes");
});

export default router;
