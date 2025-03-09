import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Leaderboard = () => {
    const user = useSelector((state) => state.auth.user);
    const [userRank, setUserRank ] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`/user/leaderboard/${user._id}`);
                setLeaderboardData(response.data.leaderboard);
                setUserRank(response.data.leaderboard.findIndex((team) => team._id === user._id) + 1);
            } catch (error) {
                console.error('Failed to fetch team data:', error);
            }
        };
        fetchLeaderboard();
    }, [user]);

    // Function to determine background and text colors based on rank
    const getRankStyles = (rank) => {
        if (rank === 1) return "bg-blue-500 text-white";
        if (rank === 2) return "bg-sky-400 text-white";
        if (rank === 3) return "bg-sky-200 text-white";
        if (rank === userRank) return "bg-amber-200 text-gray-800";
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
                            {leaderboardData?.map((team, index) => (
                                <div
                                    key={index}
                                    className={`${index+1 === userRank ? 'bg-gray-100' : ''
                                        } border-b border-gray-100 hover:bg-gray-50 transition-colors`}
                                >
                                    <div className="flex items-center py-4">
                                        <div className="w-12 flex-shrink-0 flex justify-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankStyles(index + 1)}`}>
                                                <span className="text-sm font-medium">{index + 1}</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium text-gray-900">{team.username}</h3>
                                        </div>
                                        <div className="flex-shrink-0 w-32 text-right">
                                            <span className="font-semibold text-sky-600">{team.points} pts</span>
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