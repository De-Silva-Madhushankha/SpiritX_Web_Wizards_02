import Player from "../models/playerModel.js";
//import { calculatePlayerStats } from "../utils/playerCalculations.js";


// Get tournament stats  //Admin-E-3 (postman checked)

export const getTournamentStats = async (req, res) => {
    try {
      // Aggregate query to calculate overall stats
      const aggregateQuery = [
        {
          $group: {
            _id: null, // We want to aggregate all the documents into one group
            totalRuns: { $sum: "$Total Runs" }, // Sum of all players' total runs
            totalWickets: { $sum: "$Wickets" }, // Sum of all players' wickets
            highestRunScorer: { $max: "$Total Runs" }, // Highest total runs
            highestWicketTaker: { $max: "$Wickets" }, // Highest wickets
          },
        },
      ];
  
      // Execute the aggregate query
      const stats = await Player.aggregate(aggregateQuery);
  
      if (!stats || stats.length === 0) {
        return res.status(404).json({ message: "No player data found" });
      }
  
      // Find the player with the highest runs
      const highestRunScorerPlayer = await Player.findOne({
        "Total Runs": stats[0].highestRunScorer,
      });
  
      // Find the player with the highest wickets
      const highestWicketTakerPlayer = await Player.findOne({
        Wickets: stats[0].highestWicketTaker,
      });
  
      // Prepare the response data
      const result = {
        overallRuns: stats[0].totalRuns,
        overallWickets: stats[0].totalWickets,
        highestRunScorer: highestRunScorerPlayer,
        highestWicketTaker: highestWicketTakerPlayer,
      };
  
      // Return the stats
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  