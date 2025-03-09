import React from 'react';
import Navbar from '../../components/Navbar';

const BudgetManagement = () => {
    const budgetData = {
        total: 10000000,
        spent: 9200000,
        remaining: 800000,
        allocation: {
            batsmen: 5900000,
            bowlers: 4300000,
            allRounders: 3300000
        }
    };

    // Function to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Calculate percentages for progress bars
    const calculatePercentage = (value, total) => {
        return (value / total) * 100;
    };

    // Progress bar component
    const ProgressBar = ({ percentage, category }) => {
        // Different colors for different categories
        const getBarColor = () => {
            switch (category) {
                case 'batsmen': return 'bg-sky-300';
                case 'bowlers': return 'bg-sky-400';
                case 'allRounders': return 'bg-sky-500';
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
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Budget Management</h1>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            {/* Budget Overview */}
                            <div className="mb-8 space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700">Total Budget</span>
                                    <span className="font-semibold text-gray-800">{formatCurrency(budgetData.total)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700">Spent</span>
                                    <span className="font-semibold text-gray-800">{formatCurrency(budgetData.spent)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-700">Remaining</span>
                                    <span className="font-semibold text-green-600">{formatCurrency(budgetData.remaining)}</span>
                                </div>
                            </div>

                            {/* Budget Allocation Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Budget Allocation</h2>

                                <div className="space-y-6">
                                    {/* Batsmen */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-gray-700">Batsmen</span>
                                            <span className="font-semibold text-gray-800">{formatCurrency(budgetData.allocation.batsmen)}</span>
                                        </div>
                                        <ProgressBar
                                            percentage={calculatePercentage(budgetData.allocation.batsmen, budgetData.total)}
                                            category="batsmen"
                                        />
                                    </div>

                                    {/* Bowlers */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-gray-700">Bowlers</span>
                                            <span className="font-semibold text-gray-800">{formatCurrency(budgetData.allocation.bowlers)}</span>
                                        </div>
                                        <ProgressBar
                                            percentage={calculatePercentage(budgetData.allocation.bowlers, budgetData.total)}
                                            category="bowlers"
                                        />
                                    </div>

                                    {/* All-Rounders */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-gray-700">All-Rounders</span>
                                            <span className="font-semibold text-gray-800">{formatCurrency(budgetData.allocation.allRounders)}</span>
                                        </div>
                                        <ProgressBar
                                            percentage={calculatePercentage(budgetData.allocation.allRounders, budgetData.total)}
                                            category="allRounders"
                                        />
                                    </div>
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