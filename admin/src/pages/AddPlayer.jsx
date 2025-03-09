import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPlayer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    category: 'Batsman',
    totalRuns: '',
    ballsFaced: '',
    inningsPlayed: '',
    wickets: '',
    oversBowled: '',
    runsConceded: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert numbers properly
    const newValue = ['totalRuns', 'ballsFaced', 'inningsPlayed', 'wickets', 'oversBowled', 'runsConceded'].includes(name)
      ? value === '' ? '' : Number(value) 
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Ensure required fields are filled
    if (!formData.name || !formData.university) {
      setError('Please fill in all required fields.');
      return;
    }
  
    // Convert empty numeric fields to 0 (avoids sending empty strings)
    const formattedData = {
      ...formData,
      totalRuns: formData.totalRuns ? Number(formData.totalRuns) : 0,
      ballsFaced: formData.ballsFaced ? Number(formData.ballsFaced) : 0,
      inningsPlayed: formData.inningsPlayed ? Number(formData.inningsPlayed) : 0,
      wickets: formData.wickets ? Number(formData.wickets) : 0,
      oversBowled: formData.oversBowled ? Number(formData.oversBowled) : 0,
      runsConceded: formData.runsConceded ? Number(formData.runsConceded) : 0,
    };
  
    try {
      const response = await fetch('http://localhost:4000/api/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Capture server error message
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Player added successfully:', data);
      toast.success('Player Added successfully!');
  
      //rest form data
      setFormData({
        name: '',
        university: '',
        category: 'Batsman',
        totalRuns: '',
        ballsFaced: '',
        inningsPlayed: '',
        wickets: '',
        oversBowled: '',
        runsConceded: ''
      });
    } catch (error) {
      console.error('Error adding player:', error.message);
      setError(`Failed to add player: ${error.message}`);
    }
  };
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-white">Add New Player</h1>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-lg bg-white/10 backdrop-blur-lg">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-white border border-gray-600 rounded-md bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="university" className="block mb-1 text-sm font-medium text-gray-300">
                  University
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-white border border-gray-600 rounded-md bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-white border border-gray-600 rounded-md bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Batsman" className="text-black bg-white/5">Batsman</option>
                  <option value="Bowler" className="text-black bg-white/5">Bowler</option>
                  <option value="All-Rounder" className="text-black bg-white/5">All-rounder</option>
                </select>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
              {['totalRuns', 'ballsFaced', 'inningsPlayed', 'wickets', 'oversBowled', 'runsConceded'].map((stat) => (
                <div key={stat}>
                  <label htmlFor={stat} className="block mb-1 text-sm font-medium text-gray-300">
                    {stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <input
                    type="number"
                    id={stat}
                    name={stat}
                    value={formData[stat]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-white border border-gray-600 rounded-md bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="ghost"
              className="text-white hover:bg-white"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600"
            >
              Add Player
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
