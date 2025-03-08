import React, { useState } from 'react';
import { Bell, Trophy, User, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Trophy className="h-6 w-6 text-yellow-300" />
                        <a href="/dashboard" className="text-xl font-bold tracking-wider">
                            Spirit<span className="text-yellow-300">11</span>
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        <a href="/dashboard" className="px-3 py-2 rounded-md hover:bg-white/10 transition duration-150 text-sm font-medium">
                            Dashboard
                        </a>
                        <a href="/dashboard/team" className="px-3 py-2 rounded-md hover:bg-white/10 transition duration-150 text-sm font-medium">
                            My Team
                        </a>
                        <a href="/dashboard/players" className="px-3 py-2 rounded-md hover:bg-white/10 transition duration-150 text-sm font-medium">
                            Players
                        </a>
                        <a href="/dashboard/stats" className="px-3 py-2 rounded-md hover:bg-white/10 transition duration-150 text-sm font-medium">
                            Statistics
                        </a>
                        <a href="/dashboard/schedule" className="px-3 py-2 rounded-md hover:bg-white/10 transition duration-150 text-sm font-medium">
                            Schedule
                        </a>
                        <a href="/dashboard/budget" className="px-3 py-2 rounded-md hover:bg-white/10 transition duration-150 text-sm font-medium">
                            Budget
                        </a>
                        <a href="/dashboard/leaderboard" className="px-3 py-2 rounded-md hover:bg-white/10 transition duration-150 text-sm font-medium">
                            Leaderboard
                        </a>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-3">
                        {/* Notification Bell */}
                        <button className="p-1 rounded-full hover:bg-white/10 transition duration-150 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={toggleMenu}
                                className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition duration-150 focus:outline-none"
                            >
                                <User className="h-4 w-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800 border border-gray-200">
                                    <a href="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                        <User className="mr-2 h-4 w-4 text-indigo-600" />
                                        Profile
                                    </a>
                                    <a href="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                        <Settings className="mr-2 h-4 w-4 text-indigo-600" />
                                        Settings
                                    </a>
                                    <div className="border-t border-gray-100"></div>
                                    <a href="/logout" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                        <LogOut className="mr-2 h-4 w-4 text-indigo-600" />
                                        Log out
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button (visible on small screens) */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-md hover:bg-white/10 transition duration-150">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (toggled by button) - hidden on this sample but would be implemented here */}
        </nav>
    );
};

export default Navbar;