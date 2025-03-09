import Player from "../models/playerModel.js";
import Team  from "../models/teamModel.js";
import User from "../models/userModel.js";
import mongoose from  "mongoose";

import { calculatePlayerStats } from "../utils/playerCalculations.js";

//User-E-4  (postman checked)
export const addPlayerToTeam = async (req, res) => {
  try {
       
      const { userId, playerId } = req.body;

      console.log("UserID:", userId);

      // Validate userId and playerId before querying
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(playerId)) {
          return res.status(400).json({ message: "Invalid userId or playerId format" });
      }

      // Convert to ObjectId
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const playerObjectId = new mongoose.Types.ObjectId(playerId);

      // Find the user's team
      let team = await Team.findOne({ userId: userObjectId });

      if (!team) {
          team = new Team({ userId: userObjectId, players: [] });
      }

      // Check if player already exists in the team
      if (team.players.includes(playerObjectId)) {
          return res.status(400).json({ message: "Player already in team" });
      }

      // Check if the team already has 11 players
      if (team.players.length >= 11) {
          return res.status(400).json({ message: "Team already has 11 players" });
      }

      // Find the player
      const player = await Player.findById(playerObjectId);
      if (!player) {
          return res.status(404).json({ message: "Player not found" });
      }

      // Calculate the player's stats (including value)
      const playerStats = calculatePlayerStats(player);
      const playerValue = playerStats.playerValue;

      // Find the user
      const user = await User.findById(userObjectId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (user.budget < playerValue) {
          return res.status(400).json({ message: "Not enough budget to add this player" });
      }

      // Deduct player value from user's budget
      user.budget -=playerValue;
      await user.save();

      // Assign player to team
      player.teamId = team._id;
      await player.save();

      // Add player to team
      team.players.push(playerObjectId);
      await team.save();

      res.status(200).json({ message: "Player added to team", team });

  } catch (error) {
      console.error("Error adding player to team:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

  

//User-E-5(postman checked)
export const removePlayerFromTeam = async (req, res) => {
  try {
    const { userId, playerId } = req.params;

    // Validate userId and playerId before querying
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(playerId)) {
      return res.status(400).json({ message: "Invalid userId or playerId format" });
    }

    // Convert to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const playerObjectId = new mongoose.Types.ObjectId(playerId);

    // Find the user's team
    const team = await Team.findOne({ userId: userObjectId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Find the player
    const player = await Player.findById(playerObjectId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Find the user
    const user = await User.findById(userObjectId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the player is in the team
    if (!team.players.includes(playerObjectId)) {
      return res.status(400).json({ message: "Player is not in the team" });
    }

    // Calculate the player's value
    const playerStats = calculatePlayerStats(player);
    const playerValue = playerStats.playerValue;

    // Remove the player from the team
    team.players = team.players.filter((id) => id.toString() !== playerObjectId.toString());

    // Refund the player's value to the user's budget
    user.budget += playerValue;

    // Set the player's teamId to null
    player.teamId = null;

    // Save updates
    await user.save();
    await player.save();
    await team.save();

    // Return success response
    res.status(200).json({ message: "Player removed from team", team });

  } catch (error) {
    console.error("Error removing player from team:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


  
//User-E-5 //calculate team points only 11 players are selected(postman checked)
  export const calculateTeamPoints = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid userId format" });
        }
        const team = await Team.findOne({ userId }).populate("players");

        if (!team || team.players.length !== 11) {
            return res.status(400).json({ message: "Team must have exactly 11 players to calculate points" });
        }

        let totalPoints = 0;
        team.players.forEach(player => {
            const stats = calculatePlayerStats(player);
            totalPoints += stats.playerPoints;
        });

        res.status(200).json({ totalTeamPoints: totalPoints });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
//User-E-1 //User-E-5  (postman checked)
  export const getUserTeam = async (req, res) => {
    try {
        const { userId } = req.params;
        const team = await Team.findOne({ userId }).populate("players", "name university category");

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//User-E-5(postman checked)
export const getTeam = async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Fetch the user's team
      const team = await Team.findOne({ userId }).populate("players"); // Populate players details
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
  
      // Calculate total points of the team
      let totalPoints = 0;
      team.players.forEach(player => {
        const playerStats = calculatePlayerStats(player); // Calculate points for each player
        totalPoints += playerStats.playerPoints; // Add to the total points
      });
  
      // Only show total points when the team is complete (11 players)
      const teamCompleted = team.players.length === 11;
      const teamPoints = teamCompleted ? totalPoints : null;
  
      res.status(200).json({
        team: team.players,
        teamPoints: teamPoints,
        teamCompleted: teamCompleted
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // User-M-2,3 (postman checked)
  // Controller to get the current user's team and player details // get the team with their price & number of team players
  export const getCurrentTeam = async (req, res) => {
    try {
      const { userId } = req.params; // Get the userId from request parameters
  
      // Find the user's team using the userId
      const team = await Team.findOne({ userId }).populate("players");
  
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
  
      // Initialize an array to hold the team data with player details and player values
      const teamMembers = [];
  
      // Calculate player details and value for each player
      for (const playerId of team.players) {
        const player = await Player.findById(playerId);
        if (!player) {
          continue; // Skip if player not found
        }
  
        // Calculate player stats and value
        const playerStats = calculatePlayerStats(player);
  
        // Prepare player data along with calculated value
        const playerDetails = {
          playerId: player._id,
          name: player.name,
          university: player.university,
          category: player.category,
          totalRuns: player.totalRuns,
          wickets: player.wickets,
          oversBowled: player.oversBowled,
          runsConceded: player.runsConceded,
          ballsFaced: player.ballsFaced,
          playerValue: playerStats.playerValue, // Player value based on calculated stats
          playerPoints: playerStats.playerPoints, // Player points based on calculated stats
          battingStrikeRate: playerStats.playerBattingStrikeRate,
          battingAverage: playerStats.playerBattingAverage,
          bowlingStrikeRate: playerStats.playerBowlingStrikeRate,
          economyRate: playerStats.playerEconomyRate
        };
  
        // Add the player details to the teamMembers array
        teamMembers.push(playerDetails);
      }
  
      // Calculate total team points (sum of all player points)
      const totalTeamPoints = teamMembers.reduce((total, player) => total + player.playerPoints, 0);
  
      // Respond with the team members and total points
      res.status(200).json({
        teamMembers,
        totalTeamPoints,
        teamStatus: `${team.players.length}/11 players selected` // Team completeness status
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

// Controller to get team rank
export const getTeamRank = async (req, res) => {
  try {
    const userId = req.user._id;
    const team = await Team.findOne({ userId }).populate("players");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const allTeams = await Team.find().populate("players");
    const teamPoints = allTeams.map(team => {
      let totalPoints = 0;
      team.players.forEach(player => {
        const playerStats = calculatePlayerStats(player);
        totalPoints += playerStats.playerPoints;
      });
      return { userId: team.userId, totalPoints };
    });

    teamPoints.sort((a, b) => b.totalPoints - a.totalPoints);
    const userRank = teamPoints.findIndex(team => team.userId.toString() === userId.toString()) + 1;

    res.status(200).json(userRank);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get total points
export const getTotalPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const team = await Team.findOne({ userId }).populate("players");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    let totalPoints = 0;
    team.players.forEach(player => {
      const playerStats = calculatePlayerStats(player);
      totalPoints += playerStats.playerPoints;
    });

    res.status(200).json({ totalPoints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get team value
export const getTeamValue = async (req, res) => {
  try {
    const userId = req.user._id;
    const team = await Team.findOne({ userId }).populate("players");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    let teamValue = 0;
    team.players.forEach(player => {
      teamValue += player.value;
    });

    res.status(200).json({ teamValue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get remaining budget
export const getRemainingBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const remainingBudget = user.budget;
    res.status(200).json({ remainingBudget });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get recent performance
export const getRecentPerformance = async (req, res) => {
  try {
    const userId = req.user._id;
    const team = await Team.findOne({ userId }).populate("players");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const recentPerformance = team.players.map(player => ({
      title: player.name,
      date: new Date().toLocaleDateString(),
      points: calculatePlayerStats(player).playerPoints
    }));

    res.status(200).json({ recentPerformance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

  