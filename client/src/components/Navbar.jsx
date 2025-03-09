import React from 'react';
import { useDispatch } from 'react-redux';
import { Trophy, LogOut } from 'lucide-react';
import { logoutUser } from '../features/auth/authActions';

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await dispatch(logoutUser());
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-transparent shadow-lg backdrop-blur-md relative z-50">
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
                    <div className="hidden md:flex items-center space-x-2">
                        {[
                            { href: "/user/dashboard", text: "Dashboard" },
                            { href: "/user/team", text: "My Team" },
                            { href: "/user/search-players", text: "Players" },
                            { href: "/user/budget-management", text: "Budget" },
                            { href: "/user/leaderboard", text: "Leaderboard" }
                        ].map(({ href, text }) => (
                            <a key={href} href={href} className="px-3 py-2 rounded-md transition hover:text-blue-400 hover:bg-white/20">
                                {text}
                            </a>
                        ))}
                    </div>
                    
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-sky-600 text-white font-medium shadow-md hover:shadow-lg hover:cursor-pointer transform transition-all duration-200"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>

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
        </nav>
    );
};

export default Navbar;