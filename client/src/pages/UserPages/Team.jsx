import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { User, ChevronDown, ChevronUp, UserMinus } from 'lucide-react';

const TeamPage = () => {
    const [expandedPlayerId, setExpandedPlayerId] = useState(null);
    const [players, setPlayers] = useState([
        {
            id: 1,
            name: 'Rahul Sharma',
            university: 'University A',
            points: 320,
            value: '$1.8M',
            category: 'Batsmen',
            stats: {
                totalRuns: 420,
                ballsFaced: 380,
                inningsPlayed: 16,
                wickets: 0,
                oversBowled: 0,
                runsConceded: 0
            }
        },
        {
            id: 2,
            name: 'Virat Singh',
            university: 'University B',
            points: 280,
            value: '$1.5M',
            category: 'Batsmen',
            stats: {
                totalRuns: 380,
                ballsFaced: 340,
                inningsPlayed: 15,
                wickets: 0,
                oversBowled: 0,
                runsConceded: 0
            }
        },
        {
            id: 3,
            name: 'Rohit Kumar',
            university: 'University C',
            points: 260,
            value: '$1.4M',
            category: 'Batsmen',
            stats: {
                totalRuns: 340,
                ballsFaced: 310,
                inningsPlayed: 14,
                wickets: 0,
                oversBowled: 0,
                runsConceded: 0
            }
        },
        {
            id: 4,
            name: 'Ajay Patel',
            university: 'University D',
            points: 240,
            value: '$1.2M',
            category: 'Batsmen',
            stats: {
                totalRuns: 320,
                ballsFaced: 290,
                inningsPlayed: 13,
                wickets: 0,
                oversBowled: 0,
                runsConceded: 0
            }
        },

        // Bowlers
        {
            id: 5,
            name: 'Amit Yadav',
            university: 'University E',
            points: 290,
            value: '$1.6M',
            category: 'Bowlers',
            stats: {
                totalRuns: 80,
                ballsFaced: 60,
                inningsPlayed: 10,
                wickets: 22,
                oversBowled: 85,
                runsConceded: 420
            }
        },
        {
            id: 6,
            name: 'Suresh Raina',
            university: 'University F',
            points: 270,
            value: '$1.4M',
            category: 'Bowlers',
            stats: {
                totalRuns: 60,
                ballsFaced: 50,
                inningsPlayed: 8,
                wickets: 18,
                oversBowled: 75,
                runsConceded: 380
            }
        },
        {
            id: 7,
            name: 'Deepak Chahar',
            university: 'University G',
            points: 250,
            value: '$1.3M',
            category: 'Bowlers',
            stats: {
                totalRuns: 50,
                ballsFaced: 40,
                inningsPlayed: 7,
                wickets: 16,
                oversBowled: 65,
                runsConceded: 340
            }
        },

        // All-Rounders
        {
            id: 8,
            name: 'Hardik Pandya',
            university: 'University H',
            points: 310,
            value: '$1.7M',
            category: 'All-Rounders',
            stats: {
                totalRuns: 320,
                ballsFaced: 280,
                inningsPlayed: 15,
                wickets: 14,
                oversBowled: 60,
                runsConceded: 350
            }
        },
        {
            id: 9,
            name: 'Ravindra Jadeja',
            university: 'University I',
            points: 300,
            value: '$1.6M',
            category: 'All-Rounders',
            stats: {
                totalRuns: 300,
                ballsFaced: 270,
                inningsPlayed: 14,
                wickets: 12,
                oversBowled: 55,
                runsConceded: 330
            }
        },
        {
            id: 10,
            name: 'Bhanuka Rajapaksa',
            university: 'University of Moratuwa',
            points: 280,
            value: '$1.5M',
            category: 'All-Rounders',
            stats: {
                totalRuns: 364,
                ballsFaced: 303,
                inningsPlayed: 14,
                wickets: 11,
                oversBowled: 56,
                runsConceded: 336
            }
        },
        {
            id: 11,
            name: 'Shivam Dube',
            university: 'University K',
            points: 260,
            value: '$1.4M',
            category: 'All-Rounders',
            stats: {
                totalRuns: 260,
                ballsFaced: 230,
                inningsPlayed: 12,
                wickets: 8,
                oversBowled: 45,
                runsConceded: 280
            }
        },
    ]);

    // Group players by category
    const categories = [...new Set(players.map(player => player.category))];

    const toggleExpand = (playerId) => {
        setExpandedPlayerId(expandedPlayerId === playerId ? null : playerId);
    };

    const releasePlayer = (playerId) => {
        setPlayers(players.filter(player => player.id !== playerId));
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
                <div className="max-w-7xl mx-auto bg-white/10 p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-md border border-white/20 shadow-2xl w-full text-white">
                    <h1 className="text-3xl font-bold text-gray-100 mb-6">My Team</h1>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div className="mt-4 md:mt-0 flex items-center">
                            <div className="bg-green-50 rounded-lg p-3 flex items-center">
                                <User className="h-5 w-5 text-green-600 mr-2" />
                                <div>
                                    <p className="text-xs text-gray-500">Team</p>
                                    <p className="font-bold text-green-700">3/11</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {categories.map((category) => (
                        <div key={category} className="mb-6 bg-white rounded-xl shadow-md p-4 md:p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{category}</h2>
                            {players
                                .filter(player => player.category === category)
                                .map(player => (
                                    <div key={player.id} className="mb-2 last:mb-0">
                                        <div
                                            onClick={() => toggleExpand(player.id)}
                                            className="border border-gray-100 grid grid-cols-12 items-center hover:bg-gray-50 transition-colors rounded-lg p-3 cursor-pointer"
                                        >
                                            <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center text-indigo-600 col-span-1">
                                                <User size={16} strokeWidth={2} />
                                            </div>
                                            <div className="col-span-6 md:col-span-5">
                                                <h3 className="font-medium text-gray-900">{player.name}</h3>
                                                <p className="text-xs text-gray-500">{player.university}</p>
                                            </div>
                                            <div className="col-span-2 md:col-span-3 text-right">
                                                <span className="inline-block px-2 py-1 bg-indigo-50 text-sky-700 rounded-full text-xs font-medium">
                                                    {player.points} pts
                                                </span>
                                            </div>
                                            <div className="col-span-2 text-right font-semibold text-gray-800">
                                                {player.value}
                                            </div>
                                            <div className="col-span-1 text-right text-gray-400">
                                                {expandedPlayerId === player.id ? (
                                                    <ChevronUp size={16} />
                                                ) : (
                                                    <ChevronDown size={16} />
                                                )}
                                            </div>
                                        </div>

                                        {expandedPlayerId === player.id && (
                                            <div className="bg-gray-50 rounded-b-lg border-x border-b border-gray-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="space-y-2">
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Name:</span>
                                                        <span className="text-gray-600">{player.name}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">University:</span>
                                                        <span className="text-gray-600">{player.university}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Category:</span>
                                                        <span className="text-gray-600">{player.category}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Total Runs:</span>
                                                        <span className="text-gray-600">{player.stats.totalRuns}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Balls Faced:</span>
                                                        <span className="text-gray-600">{player.stats.ballsFaced}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Innings Played:</span>
                                                        <span className="text-gray-600">{player.stats.inningsPlayed}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Wickets:</span>
                                                        <span className="text-gray-600">{player.stats.wickets}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Overs Bowled:</span>
                                                        <span className="text-gray-600">{player.stats.oversBowled}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Runs Conceded:</span>
                                                        <span className="text-gray-600">{player.stats.runsConceded}</span>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-3 mt-2 flex justify-end">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            releasePlayer(player.id);
                                                        }}
                                                        className="flex items-center bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <UserMinus size={16} className="mr-2" />
                                                        Release Player
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;