import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';

let players = [];
const loadPlayersFromCSV = () => {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream('sample_data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          players = results;
          resolve();
        })
        .on('error', (err) => reject(err));
    });
  };
  
  // Load players from CSV when server starts
  loadPlayersFromCSV()
    .then(() => {
      players.forEach((player) => {
        axios.post('http://localhost:4000/api/player', player)
          .then((response) => {
            console.log('Player added:', response.data);
          })
          .catch((err) => {
            console.error('Error adding player:', err);
          });
      });
    })
    .catch((err) => {
      console.error('Error loading players from CSV:', err);
    });
