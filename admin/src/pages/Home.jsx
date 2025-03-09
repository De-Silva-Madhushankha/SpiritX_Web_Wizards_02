import React from 'react';
import PlayerList from '../components/PlayerList';
import { ScrollArea } from '../components/ui/scroll-area';
import { Users, Bath as Bat, CircleDot, Trophy,Bean } from 'lucide-react';
import { useEffect, useState } from "react";

const players = [
  {
    id: 1,
    name: 'John Smith',
    university: 'Harvard University',
    category: 'Batsman',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    university: 'Stanford University',
    category: 'Bowler',
  },
  {
    id: 3,
    name: 'David Williams',
    university: 'MIT',
    category: 'All-rounder',
  },
  {
    id: 4,
    name: 'James Brown',
    university: 'Oxford University',
    category: 'Bowler',
  },
  {
    id: 5,
    name: 'Robert Davis',
    university: 'Cambridge University',
    category: 'Batsman',
  },
];

const Home = () => {


  const [batsmanCount, setBatsmanCount] = useState(null);
  const [BowlerCount, setBowlerCount] = useState(null);
  const [allRounderCount, setAllRounderCount] = useState(null);


  useEffect(() => {
    const fetchBatsmen = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/player/category/Batsman');
        const data = await response.json();
        setBatsmanCount(data.length);

        const response1 = await fetch('http://localhost:4000/api/player/category/Bowler');
        const data1 = await response1.json(); 
        setBowlerCount(data1.length);

        const response2 = await fetch('http://localhost:4000/api/player/category/All-Rounder');
        const data2 = await response2.json(); 
        setAllRounderCount(data2.length);
      } catch (error) {
        console.error('Error fetching batsmen:', error);
      }
    };

    fetchBatsmen();
  }, []);

  return (
    <main className="container px-4 py-8 mx-auto">
      {/* Header Section */}
      <div className="p-6 mb-8 rounded-lg bg-white/10 backdrop-blur-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 mb-4 rounded-full bg-blue-500/20">
            <Trophy className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="mb-3 text-4xl font-bold text-transparent text-white md:text-5xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
            Spirit11-Admin Dashboard
          </h1>
          <h2 className="mb-4 text-xl font-semibold text-blue-400 md:text-2xl">
            The Ultimate Inter-University Fantasy Cricket Game
          </h2>
          <p className="max-w-2xl text-sm text-center text-gray-300 md:text-base">
            Build your dream team from real university players, analyze statistics, and compete with others for the top spot on the leaderboard. Join the ultimate fantasy cricket experience! 🏏
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid max-w-full grid-cols-1 gap-4 mx-auto mb-8 sm:grid-cols-3">
        <div className="flex items-center justify-between p-5 rounded-lg bg-white/10 backdrop-blur-sm">
          <div>
            <p className="mb-1 text-sm text-gray-400">Batsmen</p>
            <p className="text-2xl font-bold text-white">{batsmanCount}</p>
          </div>
          <div className="p-3 rounded-full bg-blue-500/20">
            <Bean className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm">
          <div>
            <p className="mb-1 text-sm text-gray-400">Bowlers</p>
            <p className="text-2xl font-bold text-white">{BowlerCount}</p>
          </div>
          <div className="p-3 rounded-full bg-green-500/20">
            <CircleDot className="w-6 h-6 text-green-400" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm">
          <div>
            <p className="mb-1 text-sm text-gray-400">All-rounders</p>
            <p className="text-2xl font-bold text-white">{allRounderCount}</p>
          </div>
          <div className="p-3 rounded-full bg-purple-500/20">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

        <PlayerList />
    </main>
  );
};

export default Home;