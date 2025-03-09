import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Players" }] // Array of player IDs
  });
  
  const Team = mongoose.model("Team", teamSchema);
  export default Team;
  