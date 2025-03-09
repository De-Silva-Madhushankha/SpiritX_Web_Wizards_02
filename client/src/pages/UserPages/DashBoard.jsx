import React from 'react'
import Navbar from '../../components/Navbar'
import { Trophy, MoveUp, MoveDown, Signal, CirclePlus, Wallet } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const DashBoard = () => {

  const [teamRank, setTeamRank] = useState("");

  useEffect(() => {
    const fetchTeamRank = async () => {
      try {
        const response = await axios.get('/team/teamRank/', { withCredentials: true });
        console.log(response.data);
        const rank = response.data;
        if (Array.isArray(data)) {
          setTeamRank(data);
        } else {
          console.error('API response');
          toast.error('Unexpected API response');
        }
      } catch (err) {
        console.error('Error fetching team rank:', err);
        toast.error('Failed to fetch team rank');
      }
    };
    fetchTeamRank();
  }, []);


  const totalPoints = axios.get('/api/team/points/:userId', { withCredentials: true }).then(res => res.data); 



  const teamValue = 9.2;
  const remainingBudget = 0.8;
  
  return (
    <div>
      <Navbar/>
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
                <h2 className="text-4xl font-bold text-gray-800">#42</h2>
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
                <h2 className="text-4xl font-bold text-gray-800">2,345</h2>
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
                <h2 className="text-4xl font-bold text-gray-800">$9.2M</h2>
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
                <h2 className="text-4xl font-bold text-gray-800">$0.8M</h2>
                <p className="text-sm text-gray-500 mt-1">of $10M total</p>
              </div>
            </div>
          </div>

          {/* Recent Performance */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Recent Performance</h2>
            <p className="text-sm text-gray-500 mb-6">Your team's performance in recent matches.</p>

            <div className="space-y-4">
              {/* Match 12 */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">Match 12: University A vs University B</h3>
                    <p className="text-sm text-gray-500 mt-1">Mar 5, 2025</p>
                  </div>
                  <div className="text-xl font-bold text-sky-600">120 pts</div>
                </div>
              </div>

              {/* Match 11 */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">Match 11: University C vs University D</h3>
                    <p className="text-sm text-gray-500 mt-1">Mar 2, 2025</p>
                  </div>
                  <div className="text-xl font-bold text-sky-600">85 pts</div>
                </div>
              </div>

              {/* Match 10 */}
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">Match 10: University E vs University F</h3>
                    <p className="text-sm text-gray-500 mt-1">Feb 28, 2025</p>
                  </div>
                  <div className="text-xl font-bold text-sky-600">145 pts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
