import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    University: { type: String, required: true },
    Category: { type: String, required: true, enum: ['Batsman', 'All-Rounder', 'Bowler']},
    TotalRuns: { type: Number, required: true },
    ballsFaced: { type: Number, required: true },
    inningsPlayed: { type: Number, required: true },
    wickets: { type: Number, required: true },
    oversBowled: { type: Number, required: true },
    runsConceded: { type: Number, required: true }
});

export default mongoose.model("Player", playerSchema);