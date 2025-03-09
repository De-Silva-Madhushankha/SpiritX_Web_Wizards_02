import express from "express";
import { addPlayerToTeam, removePlayerFromTeam, calculateTeamPoints, getUserTeam ,getTeam , getCurrentTeam} from "../controllers/teamController.js";

const router = express.Router();

router.post("/add", addPlayerToTeam);

router.delete("/remove/:userId/:playerId" , removePlayerFromTeam);

router.get("/points/:userId", calculateTeamPoints);

router.get("/:userId", getUserTeam);

router.get("/finalTeam/:userId", getTeam);

router.get("/currentTeam/:userId", getCurrentTeam);

export default router;
