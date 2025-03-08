import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    default: 9000000, // Rs. 9,000,000 initial budget
  },
  points: {
    type: Number,
    default: 0, // Points will be calculated when the team is complete
  },
});

const User = mongoose.model("User", userSchema);

export default User;
