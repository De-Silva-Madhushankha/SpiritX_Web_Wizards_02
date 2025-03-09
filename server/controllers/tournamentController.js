import Player from "../models/playerModel.js";

// Get tournament stats  //Admin-E-3
export const getTournamentStats = async (req, res) => {
    try {
        // Aggregate query to calculate overall stats and find top scorer & wicket-taker
        const aggregateQuery = [
            {
                $group: {
                    _id: null,
                    totalRuns: { $sum: "$totalRuns" },
                    totalWickets: { $sum: "$wickets" },
                },
            },
        ];
        //console.log(aggregateQuery);

        // Execute aggregation
        const stats = await Player.aggregate(aggregateQuery);

        if (!stats || stats.length === 0) {
            return res.status(404).json({ message: "No player data found" });
        }

        // Find highest run scorer & highest wicket taker in a single query each
        const highestRunScorer = await Player.findOne().sort({ totalRuns: -1 }).limit(1);
        const highestWicketTaker = await Player.findOne().sort({ wickets: -1 }).limit(1);

        // Prepare the response
        const result = {
            overallRuns: stats[0].totalRuns || 0,
            overallWickets: stats[0].totalWickets || 0,
            highestRunScorer: highestRunScorer || null,
            highestWicketTaker: highestWicketTaker || null,
        };

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching tournament stats:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
