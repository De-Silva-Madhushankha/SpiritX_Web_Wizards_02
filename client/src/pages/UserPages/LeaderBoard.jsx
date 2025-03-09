import React from 'react';
import Navbar from '../../components/Navbar';

const Leaderboard = () => {
    const leaderboardData = [
        { rank: 1, name: 'CricketMaster', value: '$9.8M', points: 3450 },
        { rank: 2, name: 'BowlingWizard', value: '$9.7M', points: 3380 },
        { rank: 3, name: 'BattingKing', value: '$9.9M', points: 3320 },
        { rank: 4, name: 'AllRounderPro', value: '$9.6M', points: 3290 },
        { rank: 5, name: 'CricketLegend', value: '$9.8M', points: 3240 },
        { rank: '...', name: '...', value: '...', points: '...' },
        { rank: 42, name: 'YourTeamName', value: '$9.2M', points: 2345 },
    ];

    // Function to determine background and text colors based on rank
    const getRankStyles = (rank) => {
        if (rank === 1) return "bg-blue-500 text-white";
        if (rank === 2) return "bg-sky-400 text-white";
        if (rank === 3) return "bg-sky-200 text-white";
        if (rank === 42) return "bg-amber-200 text-gray-800";
        return "bg-gray-200 text-black";
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen p-4 md:p-8"
                style={{
                    backgroundImage: "url('/assets/bg.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="max-w-7xl mx-auto bg-white/10 p-8 rounded-3xl backdrop-filter backdrop-blur-md border border-white/20 shadow-2xl w-full text-white">
                    <h1 className="text-3xl font-bold text-gray-100 mb-6">Leaderboard</h1>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                        <div className="overflow-hidden">
                            {leaderboardData.map((team, index) => (
                                <div
                                    key={index}
                                    className={`${team.rank === 42 ? 'bg-gray-100' : ''
                                        } border-b border-gray-100 hover:bg-gray-50 transition-colors`}
                                >
                                    <div className="flex items-center py-4">
                                        <div className="w-12 flex-shrink-0 flex justify-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankStyles(team.rank)}`}>
                                                <span className="text-sm font-medium">{team.rank}</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium text-gray-900">{team.name}</h3>
                                            <p className="text-xs text-gray-500">Team Value: {team.value}</p>
                                        </div>
                                        <div className="flex-shrink-0 w-32 text-right">
                                            <span className="font-semibold text-gray-800">{team.points} pts</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;