import Player from "../models/playerModel.js";
import { calculatePlayerStats } from "../utils/playerCalculations.js";

// Get all players // Admin-E-1
export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to fetch players', error: error.message });
    }
};

//get specific player //Admin-E-2 //Admin-M-2
export const getPlayer = async (req, res) => {
    try {
      const playerId = req.params.id; // Get the player ID from the request parameters
  
      // Find the player by ID in the database
      const player = await Player.findById(playerId);
  
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
  
      // Calculate the player's stats
      const playerStats = calculatePlayerStats(player);
  
      // Return the player data along with the calculated stats
      res.status(200).json({
        playerData: player,
        playerStats: playerStats
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // get player by category //User-E-4
  export const getPlayersByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      const players = await Player.find({ category }); // Get players in the selected category
      res.status(200).json(players);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  




// Create a new player// Admin-M-1
export const createPlayer = async (req, res) => {
  try {
    // Validation checks for required fields
    const { name, university, category, totalRuns, ballsFaced, inningsPlayed, wickets, oversBowled, runsConceded } = req.body;

    if (totalRuns < 0 || ballsFaced < 0 || inningsPlayed < 0 || wickets < 0 || oversBowled < 0 || runsConceded < 0) {
      return res.status(400).json({ msg: 'All numerical values must be non-negative' });
    }

    // Create a new player
    const player = new Player(req.body);

    // Save player to the database
    await player.save();

    // Return the created player with 201 status
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ msg: 'Failed to create player', error: error.message });
  }
};


// Update player by ID //Admin-M-1
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

// Delete player by ID// Admin-M-1
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

