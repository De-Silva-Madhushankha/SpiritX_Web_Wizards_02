import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // Import http module to integrate Socket.IO with Express
import { Server } from "socket.io"; // Correct import for socket.io

// Importing routes
import playerRoutes from "./routes/playerRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

app.use(cookieParser());


app.use("/api/player", playerRoutes);
app.use("/api/overallstat", statRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/user", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));


  // Emit a test event every 5 seconds (optional for testing purposes)
  setInterval(() => {
    socket.emit("serverMessage", "Hello from the server!");
  }, 5000);
});

// Start server
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
