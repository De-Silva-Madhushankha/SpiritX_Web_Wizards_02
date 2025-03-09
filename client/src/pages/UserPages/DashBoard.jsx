import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Trophy, MoveUp, Signal, CirclePlus, Wallet } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashBoard = () => {
  const [teamRank, setTeamRank] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [teamValue, setTeamValue] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [recentPerformance, setRecentPerformance] = useState([]);

  useEffect(() => {
    const fetchTeamRank = async () => {
      try {
        const response = await axios.get('/team/teaminfo/teamRank', { withCredentials: true });
        console.log(response.data);
        const rank = response.data;
        if (typeof rank === 'number') {
          setTeamRank(rank);
        } else {
          console.error('Unexpected API response');
        }
      } catch (err) {
        console.error('Error fetching team rank:', err);
      }
    };

    const fetchTotalPoints = async () => {
      try {
        const response = await axios.get('/team/teaminfo/totalPoints', { withCredentials: true });
        setTotalPoints(response.data.totalPoints);
      } catch (err) {
        console.error('Error fetching total points:', err);
      }
    };

    const fetchTeamValue = async () => {
      try {
        const response = await axios.get('/team/teaminfo/teamValue', { withCredentials: true });
        setTeamValue(response.data.teamValue);
      } catch (err) {
        console.error('Error fetching team value:', err);
      }
    };

    const fetchRemainingBudget = async () => {
      try {
        const response = await axios.get('/team/teaminfo/remainingBudget', { withCredentials: true });
        setRemainingBudget(response.data.remainingBudget);
      } catch (err) {
        console.error('Error fetching remaining budget:', err);
      }
    };

    const fetchRecentPerformance = async () => {
      try {
        const response = await axios.get('/team/teaminfo/recentPerformance', { withCredentials: true });
        setRecentPerformance(response.data.recentPerformance);
      } catch (err) {
        console.error('Error fetching recent performance:', err);
      }
    };

    fetchTeamRank();
    fetchTotalPoints();
    fetchTeamValue();
    fetchRemainingBudget();
    fetchRecentPerformance();
  }, []);

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
        <div className="max-w-7xl mx-auto bg-white/10 p-8 rounded-3xl backdrop-filter backdrop-blur-md border border-white/20 shadow-2xl w-full text-white">
          <h1 className="text-3xl font-bold text-gray-100 mb-6">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Team Rank Card */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Team Rank</span>
                <span className="text-gray-400">
                  <Trophy />
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-4xl font-bold text-gray-800">#{teamRank}</h2>
                <p className="text-sm text-green-500 mt-1 flex items-center">
                  <span className="mr-1">
                    <MoveUp size={15} />
                  </span>
                  +5 from last week
                </p>
              </div>
            </div>

            {/* Total Points Card */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Total Points</span>
                <span className="text-gray-400">
                  <Signal />
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-4xl font-bold text-gray-800">{totalPoints.toFixed(1)}</h2>
                <p className="text-sm text-green-500 mt-1 flex items-center">
                  <span className="mr-1">
                    <MoveUp size={15} />
                  </span>
                  +180 this week
                </p>
              </div>
            </div>

            {/* Team Value Card */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Team Value</span>
                <span className="text-gray-400">
                  <CirclePlus />
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-4xl font-bold text-gray-800">${teamValue}M</h2>
                <p className="text-sm text-green-500 mt-1 flex items-center">
                  <span className="mr-1">
                    <MoveUp size={15} />
                  </span>
                  +$0.2M from initial
                </p>
              </div>
            </div>

            {/* Remaining Budget Card */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Remaining Budget</span>
                <span className="text-gray-400">
                  <Wallet />
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-4xl font-bold text-gray-800">LKR {remainingBudget}</h2>
                <p className="text-sm text-gray-500 mt-1">of $10M total</p>
              </div>
            </div>
          </div>

          {/* Recent Performance */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Recent Performance</h2>
            <p className="text-sm text-gray-500 mb-6">Your team's performance in recent matches.</p>

            <div className="space-y-4">
              {recentPerformance.map((match, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{match.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{match.date}</p>
                    </div>
                    <div className="text-xl font-bold text-sky-600">{match.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;