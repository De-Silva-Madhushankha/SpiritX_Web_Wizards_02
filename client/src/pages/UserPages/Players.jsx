import React, { useState, useEffect } from 'react';
import { Search, Filter, DollarSign, User, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const SearchPlayers = () => {
    const user = useSelector((state) => state.auth.user);
    const [searchTerm, setSearchTerm] = useState('');
    const positions = ["Batsman", "Bowler", "All-Rounder"];
    const [universities, setUniversities] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        university: null,
        minPrice: null,
        maxPrice: null,
        position: null
    });

    const [remainingBudget, setRemainingBudget] = useState(0);
    const [players, setAvailablePlayers] = useState([]);
    const [currentTeamLength, setCurrentTeamLength] = useState(0);

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
            player.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(player =>
            (selectedFilters.university ? player.university === selectedFilters.university : true) &&
            (selectedFilters.position ? player.category === selectedFilters.position : true) &&
            (selectedFilters.minPrice ? player.playerValue >= selectedFilters.minPrice : true) &&
            (selectedFilters.maxPrice ? player.playerValue <= selectedFilters.maxPrice : true)
        );

    const fetchRemainingBudget = async () => {
        try {
            const response = await axios.get(`/user/remainingbudget/${user._id}`);
            setRemainingBudget(response.data.remainingBudget);
        } catch (error) {
            console.error('Failed to fetch team data:', error);
        }
    };

    const fetchTeamData = async () => {
        try {
            const response = await axios.get(`/team/currentTeam/${user._id}`);
            let currentTeam = response.data.teamMembers;
            setCurrentTeamLength(currentTeam.length);
        } catch (error) {
            console.error('Failed to fetch team data:', error);
        }
    };

    const fetchAvailablePlayers = async () => {
        try {
            const response = await axios.get('/user');
            setAvailablePlayers(response.data);
            const universities = response.data.map(player => player.university);
            setUniversities([...new Set(universities)]);
        } catch (error) {
            console.error('Failed to fetch available players:', error);
        }
    }

    useEffect(() => {
        if (!user) return;
        fetchRemainingBudget();
        fetchAvailablePlayers();
        fetchTeamData();
    }, [user]);

    const handleAddPlayer = async (playerId) => {
        try {
            const response = await axios.post('/team/add', { userId: user._id, playerId });
            if(response.status === 200) {
                toast.success('Player added to team successfully');
            }
            fetchRemainingBudget();
            fetchTeamData();
            fetchAvailablePlayers();
        } catch (error) {
            console.error('Failed to add player to team:', error);
        }
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
                <div className="max-w-7xl mx-auto bg-white/10 p-8 rounded-3xl backdrop-filter backdrop-blur-md border border-white/20 shadow-2xl w-full">
                    <h1 className="text-3xl font-bold text-gray-100 mb-6">Available Players</h1>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div className="mt-4 md:mt-0 flex items-center">
                            <div className="bg-blue-50 rounded-lg p-3 flex items-center mr-3">
                                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                                <div>
                                    <p className="text-xs text-gray-500">Remaining Budget</p>
                                    <p className="font-bold text-blue-700">{remainingBudget}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-3 flex items-center">
                                <User className="h-5 w-5 text-green-600 mr-2" />
                                <div>
                                    <p className="text-xs text-gray-500">Team</p>
                                    <p className="font-bold text-green-700">{currentTeamLength}/11</p>
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
                                        <option value="700000">700000</option>
                                        <option value="600000">600000</option>
                                        <option value="500000">500000</option>
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
                                        <option value="1000000">1000000</option>
                                        <option value="900000">900000</option>
                                        <option value="800000">800000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

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
                                        key={player._id}
                                        className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${index !== filteredPlayers.length - 1 ? 'border-b border-gray-200' : ''
                                            }`}
                                    >
                                        <div className="flex items-center mb-3 md:mb-0">
                                            <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                                                <User className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">{player.name}</h3>
                                                <div className="text-sm text-gray-500">{player.university} • {player.category}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                                            <div className="font-bold text-gray-900 w-20 text-right">LKR {player.playerValue}</div>

                                            <button
                                                className={`px-4 py-1 rounded text-white text-sm ${player.playerValue <= remainingBudget
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                    }`}
                                                disabled={player.playerValue > remainingBudget}
                                                onClick={() => handleAddPlayer(player._id)}
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