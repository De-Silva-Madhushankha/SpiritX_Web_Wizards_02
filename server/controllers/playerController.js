import Player from "../models/playerModel.js";
import { calculatePlayerStats } from "../utils/playerCalculations.js";
import mongoose from "mongoose"; 

// Get all players // Admin-E-1 (postman checked)
export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to fetch players', error: error.message });
    }
};

//get specific player //Admin-E-2 //Admin-M-2(postman checked)
export const getPlayer = async (req, res) => {
    try {
      const playerId = req.params.id; // Get the player ID from the request parameters

      console.log(playerId);
  
      // Find the player by ID in the database
      const player = await Player.findById(playerId);
  
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      const playerData = player.toObject();
      console.log(playerData);
  
      // Calculate the player's stats
      const playerStats = calculatePlayerStats(playerData);
  
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

  // get player by category //User-E-4 (postman checked)
  export const getPlayersByCategory = async (req, res) => {
    try {
      const { category } = req.params;  // Fetch category from query parameters
    
      // Ensure category is provided
      if (!category) {
        return res.status(400).json({ message: "Category is required" });
      }
    
      // Validate category (make sure it's one of the allowed values)
      const validCategories = ["Batsman", "Bowler", "All-Rounder"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          message: `Category must be one of the following: ${validCategories.join(", ")}`
        });
      }
    
      // Find players by category (using correct query)
      const players = await Player.find({ category });
    
      // If no players found, return a 404
      if (players.length === 0) {
        return res.status(404).json({ message: `No players found for category: ${category}` });
      }
    
      // Return the list of players found
      res.status(200).json(players);
    } catch (error) {
      // Log the error for debugging
      console.error(error);
    
      // Return a generic server error message
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  




// Create a new player// Admin-M-1   //(Postman checked)
export const createPlayer = async (req, res) => {
  try {
    // Validation checks for required fields
    const { name, university, category, totalRuns, ballsFaced, inningsPlayed, wickets, oversBowled, runsConceded } = req.body;

    if (totalRuns < 0 || ballsFaced < 0 || inningsPlayed < 0 || wickets < 0 || oversBowled < 0 || runsConceded < 0) {
      return res.status(400).json({ msg: 'All numerical values must be non-negative' });
    }

    // Create a new player
    const playerData = req.body;
  // Calculate Batting Strike Rate
  const battingStrikeRate = playerData.ballsFaced > 0 ? (playerData.totalRuns / playerData.ballsFaced) * 100 : 0;

  // Calculate Batting Average
  const battingAverage = playerData.inningsPlayed > 0 ? playerData.totalRuns / playerData.inningsPlayed : 0;

  // Calculate Bowling Strike Rate
  const bowlingStrikeRate = playerData.wickets > 0 ? playerData.oversBowled * 6 / playerData.wickets : undefined;

  // Calculate Economy Rate
  const economyRate = playerData.oversBowled > 0 ? (playerData.runsConceded / (playerData.oversBowled * 6)) * 6 : 0;

  // Calculate Batting Points
  const battingPoints = (battingStrikeRate / 5) + (battingAverage * 0.8);

  // Calculate Bowling Points
  const bowlingPoints = (bowlingStrikeRate ? 500 / bowlingStrikeRate : 0) + (140 / economyRate);

  // Calculate Total Player Points
  const totalPlayerPoints = (battingPoints?battingPoints:0) + (bowlingPoints?bowlingPoints:0);
  

        // Update player data with calculated points
        playerData.battingStrikeRate = battingStrikeRate;
        playerData.battingAverage = battingAverage;
        playerData.bowlingStrikeRate = bowlingStrikeRate;
        playerData.economyRate = economyRate;
        playerData.battingPoints = battingPoints;
        playerData.bowlingPoints = bowlingPoints;
        playerData.totalPlayerPoints = totalPlayerPoints;

        const player = new Player(playerData);

    // Save player to the database
    await player.save();

    // Return the created player with 201 status
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ msg: 'Failed to create player', error: error.message });
  }
};


// Update player by ID //Admin-M-1 (postman checked)
export const updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlayer) {
            console.log("Player not found");
            return res.status(404).json({ msg: "Player not found" });
        }

        console.log("Updated Player Data:", updatedPlayer);

        // Convert Mongoose document to plain object
        const playerData = updatedPlayer.toObject();

        // Calculate updated player stats
        const updatedStats = calculatePlayerStats(playerData);

        res.status(200).json({
            msg: "Player updated successfully",
            player: updatedPlayer,
            playerStats: updatedStats
        });
    } catch (error) {
        console.error("Error updating player:", error.message);
        res.status(500).json({ msg: "Failed to update player", error: error.message });
    }
};


// Delete player by ID// Admin-M-1 (postman checked)
export const deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(`Deleting player with ID: ${id}`);

        // Validate if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Player ID" });
        }

        // Find and delete the player
        const player = await Player.findByIdAndDelete(id);

        if (!player) {
            console.log("Player not found");
            return res.status(404).json({ msg: "Player not found" });
        }

        console.log("Player deleted successfully:", player);

        res.status(200).json({ msg: "Player deleted successfully", deletedPlayer: player });
    } catch (error) {
        console.error("Error deleting player:", error.message);
        res.status(500).json({ msg: "Failed to delete player", error: error.message });
    }
};



export const searchPlayers = async (req, res) => {
    try {
      const searchQuery = req.query.q; 
      
      const players = await Player.find({
        $text: { $search: searchQuery }
      });
  
      if (players.length > 0) {
        return res.json(players);
      } else {
        return res.status(404).json({ message: 'No players found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Internal Server Error' });
      console.log(error);
    }
  };