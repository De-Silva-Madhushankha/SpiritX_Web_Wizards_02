import express from 'express';
import {getPlayers, createPlayer, updatePlayer, deletePlayer, getPlayer,getPlayersByCategory} from "../controllers/playerController.js";

const router = express.Router();

router.get('/', getPlayers);
router.get('/:id', getPlayer);
router.post('/', createPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);
router.get('/search', searchPlayers);
router.get("/category/:category", getPlayersByCategory);

export default router;
