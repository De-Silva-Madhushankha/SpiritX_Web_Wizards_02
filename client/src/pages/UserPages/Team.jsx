import React from 'react';
import Navbar from '../../components/Navbar';
import { User } from 'lucide-react';

const TeamPage = () => {
    const players = [
        // Batsmen
        { id: 1, name: 'Rahul Sharma', university: 'University A', value: '$1.8M', category: 'Batsmen' },
        { id: 2, name: 'Virat Singh', university: 'University B', value: '$1.5M', category: 'Batsmen' },
        { id: 3, name: 'Rohit Kumar', university: 'University C', value: '$1.4M', category: 'Batsmen' },
        { id: 4, name: 'Ajay Patel', university: 'University D', value: '$1.2M', category: 'Batsmen' },

        // Bowlers
        { id: 5, name: 'Amit Yadav', university: 'University E', value: '$1.6M', category: 'Bowlers' },
        { id: 6, name: 'Suresh Raina', university: 'University F', value: '$1.4M', category: 'Bowlers' },
        { id: 7, name: 'Deepak Chahar', university: 'University G', value: '$1.3M', category: 'Bowlers' },

        // All-Rounders
        { id: 8, name: 'Hardik Pandya', university: 'University H', value: '$1.7M', category: 'All-Rounders' },
        { id: 9, name: 'Ravindra Jadeja', university: 'University I', value: '$1.6M', category: 'All-Rounders' },
        { id: 10, name: 'Shreyas Iyer', university: 'University J', value: '$1.5M', category: 'All-Rounders' },
        { id: 11, name: 'MS Dhoni', university: 'University K', value: '$1.6M', category: 'All-Rounders' },
    ];

    // Group players by category
    const categories = [...new Set(players.map(player => player.category))];

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">My Team</h1>
                    {categories.map((category) => (
                        <div key={category} className="mb-6 bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{category}</h2>
                            {players
                                .filter(player => player.category === category)
                                .map(player => (
                                    <div
                                        key={player.id}
                                        className="border-b last:border-none border-gray-100 grid grid-cols-12 items-center hover:bg-gray-50 transition-colors rounded-lg p-2"
                                    >
                                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 col-span-1">
                                            <User size={16} strokeWidth={2} />
                                        </div>
                                        <div className="col-span-6 md:col-span-5">
                                            <h3 className="font-medium text-gray-900">{player.name}</h3>
                                            <p className="text-xs text-gray-500">{player.university}</p>
                                        </div>
                                        <div className="col-span-3 text-right font-semibold text-gray-800">
                                            {player.value}
                                        </div>
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
