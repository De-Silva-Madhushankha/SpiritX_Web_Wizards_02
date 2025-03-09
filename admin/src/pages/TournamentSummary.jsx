import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-md border-white/20">
        <p className="font-medium text-white">{label}</p>
        <p className="text-blue-400">{payload[0].name}: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const TournamentSummary = () => {
  const [overallRuns, setOverallRuns] = useState(null);
  const [overallWickets, setOverallWickets] = useState(null);
  const [topBatsmen, setTopBatsmen] = useState([]);
  const [topBowlers, setTopBowlers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/overallstat');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setOverallRuns(data.overallRuns);
        setOverallWickets(data.overallWickets);
        
        setTopBatsmen(
          data.topRunScorers.map(player => ({
            name: player.name,
            runs: player.totalRuns,
          })).sort((a, b) => b.runs - a.runs)
        );

        setTopBowlers(
          data.topWicketTakers.map(player => ({
            name: player.name,
            wickets: player.wickets,
          })).sort((a, b) => b.wickets - a.wickets)
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container max-w-full px-4 py-6 mx-auto sm:py-8">
      <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl sm:mb-8">Tournament Summary</h1>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 sm:gap-6 sm:mb-12">
        <div className="p-4 rounded-lg bg-white/10 backdrop-blur-lg sm:p-6">
          <h3 className="mb-2 text-xs text-gray-400 sm:text-sm">Overall Runs</h3>
          <p className="text-3xl font-bold text-white sm:text-4xl">{overallRuns}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/10 backdrop-blur-lg sm:p-6">
          <h3 className="mb-2 text-xs text-gray-400 sm:text-sm">Overall Wickets</h3>
          <p className="text-3xl font-bold text-white sm:text-4xl">{overallWickets}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6 sm:space-y-8">
        {/* Top Run Scorers */}
        <div className="p-4 rounded-lg bg-white/10 backdrop-blur-lg sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl sm:mb-6">Highest Run Scorers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topBatsmen} margin={{ top: 15, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} angle={0} textAnchor="end" height={60} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="runs" fill="rgba(59, 130, 246, 0.8)" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="runs" position="top" fill="white" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Wicket Takers */}
        <div className="p-8 rounded-lg bg-white/10 backdrop-blur-lg sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl sm:mb-6">Highest Wicket Takers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topBowlers} margin={{ top: 15, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} angle={0} textAnchor="end" height={60} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="wickets" fill="rgba(34, 197, 94, 0.8)" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="wickets" position="top" fill="white" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;