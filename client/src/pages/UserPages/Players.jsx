import React, { useState } from 'react';
import { Search, Filter, DollarSign, User, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';

const SearchPlayers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        university: null,
        minPrice: null,
        maxPrice: null,
        position: null
    });

    const totalBudget = 10.0;
    const usedBudget = 2.7;
    const remainingBudget = totalBudget - usedBudget;

    const positions = ["Wicket Keeper", "Bowler", "Batsman", "All Rounder"];

    const universities = ["University J", "University K", "University L", "University M", "University N"];

    const players = [
        { id: 1, name: "MS Dhoni", university: "University J", position: "Wicket Keeper", points: 350, price: 2.0 },
        { id: 2, name: "Jasprit Bumrah", university: "University K", position: "Bowler", points: 330, price: 1.9 },
        { id: 3, name: "KL Rahul", university: "University L", position: "Batsman", points: 320, price: 1.8 },
        { id: 4, name: "Rishabh Pant", university: "University M", position: "Wicket Keeper", points: 310, price: 1.7 },
        { id: 5, name: "Yuzvendra Chahal", university: "University N", position: "Bowler", points: 300, price: 1.6 },
        { id: 6, name: "Virat Kohli", university: "University J", position: "Batsman", points: 390, price: 2.2 },
        { id: 7, name: "Rohit Sharma", university: "University K", position: "Batsman", points: 380, price: 2.1 },
        { id: 8, name: "Hardik Pandya", university: "University L", position: "All Rounder", points: 360, price: 2.0 },
        { id: 9, name: "Ravindra Jadeja", university: "University M", position: "All Rounder", points: 350, price: 1.9 }
    ];

    const clearFilters = () => {
        setSelectedFilters({
            university: null,
            minPrice: null,
            maxPrice: null,
            position: null
        });
    };

    const filteredPlayers = players
        .filter(player =>
            player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.position.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(player =>
            (selectedFilters.university ? player.university === selectedFilters.university : true) &&
            (selectedFilters.position ? player.position === selectedFilters.position : true) &&
            (selectedFilters.minPrice ? player.price >= selectedFilters.minPrice : true) &&
            (selectedFilters.maxPrice ? player.price <= selectedFilters.maxPrice : true)
        );

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
                <div className="max-w-7xl mx-auto bg-white/10 p-8 rounded-3xl backdrop-filter backdrop-blur-md border border-white/20 shadow-2xl w-full">
                    <h1 className="text-3xl font-bold text-gray-100 mb-6">Available Players</h1>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div className="mt-4 md:mt-0 flex items-center">
                            <div className="bg-blue-50 rounded-lg p-3 flex items-center mr-3">
                                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                                <div>
                                    <p className="text-xs text-gray-500">Remaining Budget</p>
                                    <p className="font-bold text-blue-700">${remainingBudget.toFixed(1)}M</p>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-3 flex items-center">
                                <User className="h-5 w-5 text-green-600 mr-2" />
                                <div>
                                    <p className="text-xs text-gray-500">Team</p>
                                    <p className="font-bold text-green-700">3/11</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-3 mb-6">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-700" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search players by name, university or position..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 bg-white text-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 md:w-auto w-full"
                            onClick={() => setFilterOpen(!filterOpen)}
                        >
                            <Filter className="h-5 w-5 mr-2" />
                            Filters
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {filterOpen && (
                        <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-700">Filters</h3>
                                <button
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                    onClick={clearFilters}
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        value={selectedFilters.university || ''}
                                        onChange={(e) => setSelectedFilters({ ...selectedFilters, university: e.target.value || null })}
                                    >
                                        <option value="">All Universities</option>
                                        {universities.map(university => (
                                            <option key={university} value={university}>{university}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        value={selectedFilters.position || ''}
                                        onChange={(e) => setSelectedFilters({ ...selectedFilters, position: e.target.value || null })}
                                    >
                                        <option value="">All Positions</option>
                                        {positions.map(position => (
                                            <option key={position} value={position}>{position}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Price ($M)</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        value={selectedFilters.minPrice || ''}
                                        onChange={(e) => setSelectedFilters({ ...selectedFilters, minPrice: e.target.value ? parseFloat(e.target.value) : null })}
                                    >
                                        <option value="">No Min</option>
                                        <option value="1.0">$1.0M</option>
                                        <option value="1.5">$1.5M</option>
                                        <option value="2.0">$2.0M</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($M)</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        value={selectedFilters.maxPrice || ''}
                                        onChange={(e) => setSelectedFilters({ ...selectedFilters, maxPrice: e.target.value ? parseFloat(e.target.value) : null })}
                                    >
                                        <option value="">No Max</option>
                                        <option value="1.5">$1.5M</option>
                                        <option value="2.0">$2.0M</option>
                                        <option value="2.5">$2.5M</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Top Players Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-100 mb-4">Top Players Available</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {players.slice(0, 3).map(player => (
                                <div key={player.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-800">{player.name}</h3>
                                                <div className="text-sm text-gray-500">{player.university} • {player.position}</div>
                                            </div>
                                            <div className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">
                                                {player.points} pts
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="font-bold text-gray-900">${player.price.toFixed(1)}M</span>
                                            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Players List */}
                    <div>
                        <h2 className="text-lg font-medium text-gray-100 mb-4">All Available Players</h2>

                        {filteredPlayers.length === 0 ? (
                            <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
                                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3" />
                                <p className="text-yellow-700">No players match your search criteria. Try adjusting your filters.</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {filteredPlayers.map((player, index) => (
                                    <div
                                        key={player.id}
                                        className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${index !== filteredPlayers.length - 1 ? 'border-b border-gray-200' : ''
                                            }`}
                                    >
                                        <div className="flex items-center mb-3 md:mb-0">
                                            <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                                                <User className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">{player.name}</h3>
                                                <div className="text-sm text-gray-500">{player.university} • {player.position}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                                            <div className="flex items-center">
                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">
                                                    {player.points} pts
                                                </span>
                                            </div>

                                            <div className="font-bold text-gray-900 w-20 text-right">${player.price.toFixed(1)}M</div>

                                            <button
                                                className={`px-4 py-1 rounded text-white text-sm ${player.price <= remainingBudget
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                    }`}
                                                disabled={player.price > remainingBudget}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPlayers;