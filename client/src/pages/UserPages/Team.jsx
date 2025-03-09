import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { User, ChevronDown, ChevronUp, UserMinus } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TeamPage = () => {
    const user = useSelector(state => state.auth.user);
    const [expandedPlayerId, setExpandedPlayerId] = useState(null);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`/team/currentTeam/${user._id}`);
                setPlayers(response.data.teamMembers);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch team data:', error);
            }
        };

        fetchTeamData();
    }, [user]);

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
                                    <p className="font-bold text-green-700"> {players.length}/11</p>
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
                                    <div key={player.playerId} className="mb-2 last:mb-0">
                                        <div
                                            key={player.playerId}
                                            className="mb-2 last:mb-0"
                                        >
                                            <div
                                                onClick={() => toggleExpand(player.playerId)}
                                                className="border border-gray-100 grid grid-cols-12 items-center hover:bg-gray-50 transition-colors rounded-lg p-3 cursor-pointer"
                                            >
                                                <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center text-indigo-600 col-span-1">
                                                    <User size={16} strokeWidth={2} />
                                                </div>
                                                <div className="col-span-6 md:col-span-5">
                                                    <h3 className="font-medium text-gray-900">{player.name}</h3>
                                                    <p className="text-xs text-gray-500">{player.university}</p>
                                                </div>
                                                <div className="col-span-3 md:col-span-4 flex justify-end items-center">
                                                    <span className="font-semibold text-gray-800 mr-4">
                                                        LKR {player.playerValue}
                                                    </span>
                                                    <div className="text-gray-400">
                                                        {expandedPlayerId === player.playerId ? (
                                                            <ChevronUp size={16} />
                                                        ) : (
                                                            <ChevronDown size={16} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {expandedPlayerId === player.playerId && (
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
                                                        <span className="text-gray-600">{player.totalRuns}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Balls Faced:</span>
                                                        <span className="text-gray-600">{player.ballsFaced}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Wickets:</span>
                                                        <span className="text-gray-600">{player.wickets}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Overs Bowled:</span>
                                                        <span className="text-gray-600">{player.oversBowled}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-700 w-32">Runs Conceded:</span>
                                                        <span className="text-gray-600">{player.runsConceded}</span>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-3 mt-2 flex justify-end">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            releasePlayer(player.playerId);
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