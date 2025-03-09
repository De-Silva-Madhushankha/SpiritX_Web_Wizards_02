import Fuse from 'fuse.js';
import axios from 'axios';
import Player from "../models/playerModel.js";
import natural from 'natural';
import dotenv from "dotenv";

let players = [];
const tokenizer = new natural.WordTokenizer();
(async () => {
    try {
        const playersFromDB = await Player.find();
        players = playersFromDB.map(player => player.name);
        console.log('Players fetched successfully');
    } catch (error) {
        console.error('Failed to fetch players', error.message);
    }
})();

const extractInfoFromQuestion = (question) => {
  const words = tokenizer.tokenize(question.toLowerCase());
  const fuse = new Fuse(players, {
    keys: ['name'],
    threshold: 0, 
  });

  let playerNames = [];

  for (const word of words) {
    const result = fuse.search(word);
    if (result.length > 0) {
    result.forEach(match => playerNames.push(match.item));
    }
  }
  playerNames = playerNames.map(name => name.toLowerCase());

  return  playerNames;
};

const chatBotController = async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message);
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const  playerNames  = extractInfoFromQuestion(message);
        const playerData = await Player.find({
            name: { $in: playerNames.map(name => new RegExp(`^${name}$`, "i")) }
        });
        const topPlayers = await Player.find()
            .sort({ totalPlayerPoints: -1 }) // Sort by totalPlayerPoints in descending order
            .limit(20); 
        const topPlayerNames= topPlayers.map(player => player.name);
        let prompt1 = '';
        playerData.forEach(player => {
            prompt1 += `Data for ${player.name} is as follows: `;
            prompt1 += `University: ${player.university}, `;
            prompt1 += `Category: ${player.category}, `;
            prompt1 += `Total Runs: ${player.totalRuns}, `;
            prompt1 += `Balls Faced: ${player.ballsFaced}, `;
            prompt1 += `Innings Played: ${player.inningsPlayed}, `;
            prompt1 += `Wickets: ${player.wickets}, `;
            prompt1 += `Overs Bowled: ${player.oversBowled}, `;
            prompt1 += `Runs Conceded: ${player.runsConceded}, `;
        });

        let prompt2 = '';
        let count = 0;
        prompt2 += `The top 20 players in order are as follows: `;
        topPlayers.forEach(player => {
            count++;
            prompt2 += ` ${count}: ${player.name},\n`;});

            console.log(prompt2);
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API}`, {
                system_instruction: {
                    parts: [{ 
                        text: `You are a cricket expert chatbot designed to provide information in a natural, human-like manner.
                        The information are obtain and given in the question is what you should base your response on.

                        - If a name seems misspelled, gently point it out as a human would, rather than stating there is a typo directly.
                        - If multiple data points are given, verify the consistency of the information before responding.
                        - Answer with clarity and a conversational tone, as if explaining to a cricket enthusiast.
                        - Use ',' to separate when giving player list.Do not enumarate the list.
                        - If the information is insufficient, acknowledge it rather than making assumptions.
                        - If a user asks about any detail not available in the dataset, the you should reply:“I don’t have enough knowledge to answer that question."
                        - when the best player team is asked just give the top 11 players.
                        -If the question is not clear, ask for clarification.
                        - The data provided are the things you know about cricket players.
                        Keep your responses engaging and informative, just like a friendly cricket analyst!\n` + prompt1 + prompt2

                        
                    }]
                },
                contents: {
                    parts: [{ text: message }]
                }
            });

            res.json({ response: response.data.candidates[0].content.parts[0].text });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export default chatBotController;
