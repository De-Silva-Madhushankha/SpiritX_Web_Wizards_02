import Player from "../models/playerModel.js";

export const getTournamentStats = async (req, res) => {
  try {
      // Aggregate query to calculate overall stats
      const aggregateQuery = [
          {
              $group: {
                  _id: null,
                  totalRuns: { $sum: "$totalRuns" },
                  totalWickets: { $sum: "$wickets" },
              },
          },
      ];

      // Execute aggregation
      const stats = await Player.aggregate(aggregateQuery);

      if (!stats || stats.length === 0) {
          return res.status(404).json({ message: "No player data found" });
      }

      // Find top 5 highest run scorers
      const topRunScorers = await Player.find().sort({ totalRuns: -1 }).limit(5);

      // Find top 5 highest wicket takers
      const topWicketTakers = await Player.find().sort({ wickets: -1 }).limit(5);

      // Prepare the response
      const result = {
          overallRuns: stats[0].totalRuns || 0,
          overallWickets: stats[0].totalWickets || 0,
          topRunScorers: topRunScorers || [],
          topWicketTakers: topWicketTakers || [],
      };

      res.status(200).json(result);
  } catch (error) {
      console.error("Error fetching tournament stats:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};
