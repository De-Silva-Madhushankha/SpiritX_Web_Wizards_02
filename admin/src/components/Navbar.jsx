// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b shadow-lg bg-white/5 backdrop-blur-md border-white/10">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <Link to="/" className="transition-opacity hover:opacity-80">
            <img 
              src="./images/logo.png" 
              alt="Spirit11 Logo" 
              className="h-6 sm:h-8"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-white lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-6 lg:flex">
            <Link 
              to="/add-player" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/add-player' 
                  ? 'text-blue-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Add Player
            </Link>
            <Link 
              to="/tournament-summary" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/tournament-summary' 
                  ? 'text-blue-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Tournament Summary
            </Link>
            <Button 
              variant="ghost" 
              className="text-white transition-colors duration-200 hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4`}>
          <div className="flex flex-col space-y-4">
            <Link 
              to="/add-player" 
              className={`text-sm font-medium transition-colors px-2 py-2 rounded-md ${
                location.pathname === '/add-player' 
                  ? 'text-blue-400 bg-white/5' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Add Player
            </Link>
            <Link 
              to="/tournament-summary" 
              className={`text-sm font-medium transition-colors px-2 py-2 rounded-md ${
                location.pathname === '/tournament-summary' 
                  ? 'text-blue-400 bg-white/5' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tournament Summary
            </Link>
            <Button 
              variant="ghost" 
              className="justify-start w-full text-white transition-colors duration-200 hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;