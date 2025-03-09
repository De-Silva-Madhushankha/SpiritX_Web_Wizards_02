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
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ msg: 'Failed to create player', error: error.message });
    }
};

// Update player by ID
export const updatePlayer = async (req, res) => {
    try {
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

        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, playerData, { new: true });
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