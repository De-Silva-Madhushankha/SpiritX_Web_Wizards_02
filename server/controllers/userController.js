import Player from "../models/playerModel.js";
import User from "../models/userModel.js"; 

//user-E-2 (postman checked)
export const getAvailablePlayers = async (req, res) => {
  try {
    const players = await Player.find({ teamId:null }); // Fetch only available players
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//User-M-2
export const getUserRemainingBudget = async (req, res) => {
    try {
      const { userId } = req.params; // Get the userId from the request parameters
  
      // Find the user by userId in the database
      const user = await User.findById(userId);
  
      // If the user doesn't exist, return a 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Calculate the remaining budget (initial budget - current budget)
      const remainingBudget = 9000000 - user.budget;
  
      // Return the remaining budget
      res.status(200).json({ remainingBudget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

// Controller to get the leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { userId } = req.params; // Get the logged-in user's ID from the request parameters

    // Fetch all users and their points, sorted by points in descending order
    const leaderboard = await User.find()
      .sort({ points: -1 }) // Sort by points in descending order
      .select("username points"); // Only select the username and points fields

    // Find the logged-in user details to highlight them
    const loggedInUser = await User.findById(userId).select("username points");

    // Add a field to highlight the logged-in user in the leaderboard
    const leaderboardWithHighlight = leaderboard.map((user) => ({
      ...user.toObject(),
      isLoggedInUser: user._id.toString() === userId.toString(),
    }));

    // Return the leaderboard with the logged-in user highlighted
    res.status(200).json({
      leaderboard: leaderboardWithHighlight,
      loggedInUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
