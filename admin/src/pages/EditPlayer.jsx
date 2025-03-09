import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editableFields = [
    'name',
    'university',
    'category',
    'totalRuns',
    'ballsFaced',
    'inningsPlayed',
    'wickets',
    'oversBowled',
    'runsConceded',
  ];

  const [playerData, setPlayerData] = useState({});

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/player/${id}`);
        if (!response.ok) {
          throw new Error('Player not found');
        }
        const data = await response.json();
        const filteredData = Object.keys(data.playerData)
          .filter((key) => editableFields.includes(key))
          .reduce((obj, key) => {
            obj[key] = data.playerData[key];
            return obj;
          }, {});
        setPlayerData(filteredData);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchPlayerDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['totalRuns', 'ballsFaced', 'inningsPlayed', 'wickets', 'oversBowled', 'runsConceded'].includes(name) && isNaN(value)) {
      return;
    }
    setPlayerData({ ...playerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/player/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });
      if (!response.ok) {
        throw new Error('Failed to update player');
      }
      toast.success('Player updated successfully!');
      navigate(`/player/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto sm:py-8">
      <Button variant="ghost" className="mb-4 text-white" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="p-6 rounded-lg bg-white/10 backdrop-blur-lg">
        <h2 className="mb-4 text-2xl font-bold text-white">Edit Player</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.keys(playerData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 text-sm text-gray-300 capitalize" htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
              {key === 'category' ? (
                <select
                  id={key}
                  name={key}
                  value={playerData[key] || ''}
                  onChange={handleChange}
                  className="p-2 text-white rounded bg-white/20 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Batsman" className='text-black'>Batsman</option>
                  <option value="Bowler" className='text-black' >Bowler</option>
                  <option value="All-Rounder" className='text-black'>All-Rounder</option>
                </select>
              ) : (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={playerData[key] || ''}
                  onChange={handleChange}
                  className="p-2 text-white rounded bg-white/20 focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>
          ))}
          <Button type="submit" className="col-span-1 mt-4 sm:col-span-2">Save Changes</Button>
        </form>
      </div>
    </div>
  );
};

export default EditPlayer;