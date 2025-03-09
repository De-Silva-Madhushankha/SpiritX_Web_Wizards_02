import express from "express";
import { addPlayerToTeam, removePlayerFromTeam, calculateTeamPoints, getUserTeam ,getTeam , getCurrentTeam, getTeamRank} from "../controllers/teamController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", addPlayerToTeam);

router.delete("/remove/:userId/:playerId" , removePlayerFromTeam);

router.get("/points/:userId", calculateTeamPoints);

router.get("/:userId", getUserTeam);

router.get("/finalTeam/:userId", getTeam);

router.get("/currentTeam/:userId", getCurrentTeam);

router.get("/teamRank", authMiddleware, getTeamRank);

router.get("/" ,authMiddleware, (req, res) => {
    res.send("Team routes");
});

export default router;
