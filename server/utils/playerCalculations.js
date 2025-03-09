
export const calculatePlayerStats = (playerData) => {
    // Ensure playerData exists and has required fields
    console.log(playerData);
    console.log(playerData.totalRuns);
    console.log(playerData.ballsFaced);

    if (!playerData || !playerData.totalRuns || !playerData.ballsFaced){
    
        return {
            playerPoints: 0,
            playerValue: 0,
            playerBattingStrikeRate: 0,
            playerBattingAverage: 0,
            playerBowlingStrikeRate: 0,
            playerEconomyRate: 0,
        };
    }

    // Convert overs to balls (1 over = 6 balls)
    const ballsBowled = playerData.oversBowled *6 ;
    console.log(ballsBowled);
    // Batting Calculations
    const battingStrikeRate = playerData.ballsFaced > 0 
        ? (playerData.totalRuns / playerData.ballsFaced) * 100 
        : 0;

        console.log(battingStrikeRate);
    
    const battingAverage = playerData.inningsPlayed > 0 
        ? playerData.totalRuns / playerData.inningsPlayed 
        : 0;

    const battingPoints = (battingStrikeRate / 5) + (battingAverage * 0.8);

    // Bowling Calculations
    let bowlingStrikeRateContribution = 0;
    if (playerData.wickets > 0 && ballsBowled > 0) {
        const bowlingStrikeRate = ballsBowled / playerData.wickets;
        bowlingStrikeRateContribution = 500 / bowlingStrikeRate;
    }

    const economyRate = ballsBowled > 0 
        ? (playerData.runsConceded / ballsBowled) * 6 
        : 0;
    
    const economyRateContribution = economyRate > 0 
        ? 140 / economyRate 
        : 0;

    const bowlingPoints = bowlingStrikeRateContribution + economyRateContribution;

    // Total Points (sum of batting and bowling points)
    const totalPoints = battingPoints + bowlingPoints;

    // Value Calculation (Player value based on total points)
    const rawValue = (9 * totalPoints + 100) * 1000;
    const roundedValue = Math.round(rawValue / 50000) * 50000;

    return {
        playerPoints: Number(totalPoints.toFixed(2)), // Total points with 2 decimal places
        playerValue: roundedValue, // Rounded player value to nearest 50000
        playerBattingStrikeRate: Number(battingStrikeRate.toFixed(2)),
        playerBattingAverage: Number(battingAverage.toFixed(2)),
        playerBowlingStrikeRate: ballsBowled > 0 && playerData.wickets > 0
            ? Number((ballsBowled / playerData.wickets).toFixed(2))
            : 0,
        playerEconomyRate: Number(economyRate.toFixed(2)),
    };
};
