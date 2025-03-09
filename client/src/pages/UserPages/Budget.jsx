import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BudgetManagement = () => {
    const user = useSelector((state) => state.auth.user);
    const [remainingBudget, setRemainingBudget] = useState();
    const [spentBugdet, setSpentBudget] = useState();
    const [players, setPlayers] = useState([]);
    const [totalValueByCategory, setTotalValueByCategory] = useState({});
    const totalBudget = 9000000;

    const fetchRemainingBudget = async () => {
        try {
            const response = await axios.get(`/user/remainingbudget/${user._id}`);
            setRemainingBudget(response.data.remainingBudget);
            setSpentBudget(totalBudget - response.data.remainingBudget);
        } catch (error) {
            console.error('Failed to fetch team data:', error);
        }
    };

    const fetchTeamData = async () => {
        try {
            const response = await axios.get(`/team/currentTeam/${user._id}`);
            setPlayers(response.data.teamMembers);
            const totalValueByCategory = response.data.teamMembers.reduce((acc, player) => {
                acc[player.category] = acc[player.category] ? acc[player.category] + player.playerValue : player.playerValue;
                return acc;
            }, {});
            setTotalValueByCategory(totalValueByCategory);
        } catch (error) {
            console.error('Failed to fetch team data:', error);
        }
    };

    useEffect(() => {
        if (!user) return;
        fetchRemainingBudget();
        fetchTeamData();
    }, [user]);

    // Calculate percentages for progress bars
    const calculatePercentage = (value, total) => {
        return (value / total) * 100;
    };

    // Progress bar component
    const ProgressBar = ({ percentage, category }) => {
        // Different colors for different categories
        const getBarColor = () => {
            switch (category) {
                case 'Batsman': return 'bg-sky-300';
                case 'Bowler': return 'bg-sky-400';
                case 'All-Rounder': return 'bg-sky-500';
                default: return 'bg-sky-500';
            }
        };

        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                    className={`${getBarColor()} h-2.5 rounded-full`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        );
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
                    <h1 className="text-3xl font-bold text-gray-100 mb-6">Budget Management</h1>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            {/* Budget Overview */}
                            <div className="mb-8 space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700 font-bold">Total Budget</span>
                                    <span className="font-semibold text-gray-800">LKR {totalBudget}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700 font-bold">Spent</span>
                                    <span className="font-semibold text-gray-800">LKR {spentBugdet}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-700 font-bold">Remaining</span>
                                    <span className="font-semibold text-green-600">LKR {remainingBudget}</span>
                                </div>
                            </div>

                            {/* Budget Allocation Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Budget Allocation</h2>
                                <div className="space-y-6">
                                    {Object.entries(totalValueByCategory).map(([category, totalValue]) => (
                                        <div key={category}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-700">
                                                    {category === 'Batsman' && 'Batsmen'}
                                                    {category === 'Bowler' && 'Bowlers'}
                                                    {category === 'All-Rounder' && 'All-Rounders'}
                                                </span>
                                                <span className="font-semibold text-gray-800">LKR {totalValue}</span>
                                            </div>
                                            <ProgressBar
                                                percentage={calculatePercentage(totalValue, totalBudget)}
                                                category={category}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetManagement;