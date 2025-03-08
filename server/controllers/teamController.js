import Player from "../models/playerModel.js";
import Team  from "../models/teamModel.js";
import User from "../models/userModel.js";

import { calculatePlayerStats } from "../utils/playerCalculations.js";

//User-E-4 
export const addPlayerToTeam = async (req, res) => {
    try {
      const { userId, playerId } = req.body;
  
      let team = await Team.findOne({ userId });
      if (!team) {
        team = new Team({ userId, players: [] });
      }
  
      // Check if player already exists in the team
      if (team.players.includes(playerId)) {
        return res.status(400).json({ message: "Player already in team" });
      }
  
      // Check if the team already has 11 players
      if (team.players.length >= 11) {
        return res.status(400).json({ message: "Team already has 11 players" });
      }

      // Find the player by ID in the database
      const player = await Player.findById(playerId);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Calculate the player's stats (including value)
      const playerStats = calculatePlayerStats(player);
      const playerValue = playerStats.playerValue; // Get the calculated player value
      

      const user = await User.findById(userId); // Assuming you have a User model

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.budget < playerValue ) {
        return res.status(400).json({ message: "Not enough budget to add this player" });
      }
      user.budget -= playerValue;

      player.teamId = team._id; // Assign player to team
      await player.save(); // Save player update

      team.players.push(playerId);
      await team.save();
  
      res.status(200).json({ message: "Player added to team", team });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
//User-E-5
export const removePlayerFromTeam = async (req, res) => {
  try {
    const { userId, playerId } = req.body;

    // Find the user's team
    const team = await Team.findOne({ userId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Find the player to calculate their value
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Calculate the player's value using the existing stats calculation
    const playerStats = calculatePlayerStats(player);
    const playerValue = playerStats.playerValue; // Get the calculated player value

    const user = await User.findById(userId); // Assuming you have a User model

      if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Remove the player from the team's players array
    team.players = team.players.filter((id) => id.toString() !== playerId);
    user.budget += playerValue; // Refund the player’s value to the team’s budget

    // Update the player's teamId to null (indicating no team)
    player.teamId = "No Team";
    await player.save(); // Save the updated player

    // Save the updated team
    await team.save();

    // Return the updated team and player details
    res.status(200).json({ message: "Player removed from team", team });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



  
//User-E-5 //calculate team points only 11 players are selected
  export const calculateTeamPoints = async (req, res) => {
    try {
        const { userId } = req.params;
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
  
//User-E-1 //User-E-5
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

//User-E-5
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
  
  // User-M-2,3
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
  