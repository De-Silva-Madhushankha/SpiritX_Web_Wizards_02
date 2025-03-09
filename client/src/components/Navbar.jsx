import React, { useState } from 'react';
import { Bell, Trophy, User, Settings, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const userType = useSelector((state) => state.auth.userType) || 'user';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-transparent shadow-lg backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Trophy className="h-6 w-6 text-blue-500" />
                        <a href="/dashboard" className="text-xl font-bold tracking-wider hover:text-blue-400 transition">
                            Spirit<span className="text-blue-500">11</span>
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    {userType === 'admin' && (
                        <div className="hidden md:flex items-center space-x-2">
                            <a href="/admin/dashboard" className="px-3 py-2 rounded-md transition hover:text-blue-400 hover:bg-white/20">
                                Dashboard
                            </a>
                            <a href="/admin/players" className="px-3 py-2 rounded-md transition hover:text-blue-400 hover:bg-white/20">
                                Players
                            </a>
                        </div>
                    )}

                    {userType === 'user' && (
                        <div className="hidden md:flex items-center space-x-2">
                            {[
                                { href: "/user/dashboard", text: "Dashboard" },
                                { href: "/user/team", text: "My Team" },
                                { href: "/user/players", text: "Players" },
                                { href: "/user/stats", text: "Statistics" },
                                { href: "/user/schedule", text: "Schedule" },
                                { href: "/user/budget-management", text: "Budget" },
                                { href: "/leaderboard", text: "Leaderboard" }
                            ].map(({ href, text }) => (
                                <a key={href} href={href} className="px-3 py-2 rounded-md transition hover:text-blue-400 hover:bg-white/20">
                                    {text}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-3">
                        {/* Notification Bell */}
                        <button className="p-2 rounded-full transition hover:bg-white/20 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={toggleMenu}
                                className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 transition hover:bg-gray-400"
                            >
                                <User className="h-4 w-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800 border border-gray-200">
                                    <h2 className="text-sm px-4 py-2 font-semibold">My Account</h2>
                                    <div className="border-t border-gray-100"></div>
                                    <a href="/profile" className="flex items-center px-4 py-2 text-sm transition hover:text-blue-500 hover:bg-gray-100">
                                        <User className="mr-2 h-4 w-4 text-indigo-600" />
                                        Profile
                                    </a>
                                    <a href="/settings" className="flex items-center px-4 py-2 text-sm transition hover:text-blue-500 hover:bg-gray-100">
                                        <Settings className="mr-2 h-4 w-4 text-indigo-600" />
                                        Settings
                                    </a>
                                    <div className="border-t border-gray-100"></div>
                                    <a href="/logout" className="flex items-center px-4 py-2 text-sm transition hover:text-red-500 hover:bg-gray-100">
                                        <LogOut className="mr-2 h-4 w-4 text-indigo-600" />
                                        Log out
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button (visible on small screens) */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-md transition hover:bg-white/20">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
