import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
    Enum : ["user","admin"]
  },
  email:{
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  budget: {
    type: Number,
    default: 9000000, // LKR 9,000,000 initial budget
  },
  points: {
    type: Number,
    default: 0, // Points will be calculated when the team is complete
  },
});

const User = mongoose.model("User", userSchema);

export default User;
