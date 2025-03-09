import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Batsman", "Bowler", "All-Rounder"]
  },
  totalRuns: {
    type: Number,
    required: true
  },
  ballsFaced: {
    type: Number,
    required: true
  },
  inningsPlayed: {
    type: Number,
    required: true
  },
  wickets: {
    type: Number,
    required: true
  },
  oversBowled: {
    type: Number,
    required: true
  },
  runsConceded: {
    type: Number,
    required: true
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team", // Reference to the Team model
    default: null // Player can exist without being assigned to a team
  }

}
);

const Player = mongoose.model("Players", playerSchema);

export default Player;
