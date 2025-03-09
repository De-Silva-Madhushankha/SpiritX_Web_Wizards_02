import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const calculatePlayerScore = (stats) => {
  const battingScore = Math.round(stats.totalRuns / stats.inningsPlayed);
  const bowlingScore = Math.round((stats.wickets / stats.inningsPlayed) * 100);
  return Math.round((battingScore + bowlingScore) / 2);
};

const PlayerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [playerData, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/player/${id}`);
        
        if (!response.ok) {
          throw new Error("Player not found");
        }
        const data = await response.json();

        const player = data.playerData;
        const playerstac = data.playerStats;

        const formattedPlayer = {
          id: player._id,
          name: player.name,
          university: player.university,
          category: player.category,
          image: 'https://randomuser.me/api/portraits/men/1.jpg', // Placeholder image
          stats: {
            totalRuns: player.totalRuns,
            ballsFaced: player.ballsFaced,
            inningsPlayed: player.inningsPlayed,
            wickets: player.wickets,
            oversBowled: player.oversBowled,
            runsConceded: player.runsConceded,

            point: playerstac.playerPoints,

            playerValue:playerstac.playerValue,
            playerBattingStrikeRate: playerstac.playerBattingStrikeRate,  
            playerBattingAverage:playerstac.playerBattingAverage,
            playerBowlingStrikeRate:playerstac.playerBowlingStrikeRate,
            playerEconomyRate:playerstac.playerEconomyRate,

          },
        };

        setPlayer(formattedPlayer);
        setError(null);

      } catch (err) {
        setError(err.message);
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [id]);

  const handleEdit = () => {
    console.log('Edit player:', id);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/player/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete player');
      }
  
      // Show success toast notification
      toast.success('Player deleted successfully!');
      
      // Navigate back to the players list after successful delete
      navigate('/');
  
    } catch (err) {
      setError(err.message);
      // Show error toast notification
      toast.error(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container px-4 py-6 mx-auto">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-6 mx-auto">
        <p className="text-red-400">{error}</p>
        <Button variant="ghost" onClick={() => navigate('/')} className="mt-4 text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Players
        </Button>
      </div>
    );
  }

  if (!playerData) {
    return null;
  }

  return (
    <div className="container px-4 py-6 mx-auto sm:py-8">
      <Button
        variant="ghost"
        className="mb-4 text-white sm:mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Players
      </Button>

      <div className="p-4 rounded-lg bg-white/10 backdrop-blur-lg sm:p-6">
        <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <img
                src={playerData.image}
                alt={playerData.name}
                className="object-cover w-20 h-20 border-blue-400 rounded-full border-1 sm:w-20 sm:h-20"
              />
              <div className="absolute flex items-center justify-center text-sm font-bold text-white bg-yellow-500 rounded-full -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 ">
                {playerData.stats.point}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">{playerData.name}</h1>
              <p className="text-sm text-gray-300 sm:text-base">{playerData.university}</p>
              <span className="inline-block px-3 py-1 mt-2 text-xs font-medium text-blue-400 rounded-full sm:text-sm bg-blue-500/20">
                {playerData.category}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="flex-1 text-blue-400 sm:flex-none hover:text-blue-300 hover:bg-blue-400/10"
              onClick={() => navigate(`/edit-player/${id}`)}
              >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="ghost"
              className="flex-1 text-red-400 sm:flex-none hover:text-red-300 hover:bg-red-400/10"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Runs" value={playerData.stats.totalRuns} />
          <StatCard title="Balls Faced" value={playerData.stats.ballsFaced} />
          <StatCard title="Innings Played" value={playerData.stats.inningsPlayed} />
          <StatCard title="Wickets" value={playerData.stats.wickets} />
          <StatCard title="Overs Bowled" value={playerData.stats.oversBowled} />
          <StatCard title="Runs Conceded" value={playerData.stats.runsConceded} />

          <StatCard title="Economy Rate" value={playerData.stats.playerEconomyRate} />
          <StatCard title="Bowling Strike Rate" value={playerData.stats.playerBowlingStrikeRate} />
          <StatCard title="Batting Average" value={playerData.stats.playerBattingAverage} />
          <StatCard title="Batting Strike Rate" value={playerData.stats.playerBattingStrikeRate} />
          <StatCard title="Player Value" value={playerData.stats.playerValue} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
    <h3 className="mb-1 text-xs text-gray-400 sm:text-sm">{title}</h3>
    <p className="text-xl font-semibold text-white sm:text-2xl">{value}</p>
  </div>
);

export default PlayerDetails;
