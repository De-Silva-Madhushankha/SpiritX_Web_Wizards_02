import Player from "../models/playerModel.js";

// Get all players
export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to fetch players', error: error.message });
    }
};

// Create a new player
export const createPlayer = async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ msg: 'Failed to create player', error: error.message });
    }
};

// Update player by ID
export const updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlayer) {
            return res.status(404).json({ msg: 'Player not found' });
        }
        res.json(updatedPlayer);
    } catch (error) {
        res.status(400).json({ msg: 'Failed to update player', error: error.message });
    }
};

// Delete player by ID
export const deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }
        res.json({ msg: 'Player deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to delete player', error: error.message });
    }
};
