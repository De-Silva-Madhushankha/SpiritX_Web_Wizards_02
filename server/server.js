import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // Import http module to integrate Socket.IO with Express
import { Server } from "socket.io"; // Correct import for socket.io

// Importing routes
import statRoutes from "./routes/statRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import chatBotRouter from "./routes/chatBotRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], 
  credentials: true,
}));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

io.on("connection", (socket) => {
  console.log("✅ A user connected");

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });

  // Emit a test event every 5 seconds (optional for testing purposes)
  setInterval(() => {
    socket.emit("serverMessage", "Hello from the server!");
  }, 5000);
});

// API Routes
app.use("/api/player", playerRoutes);
app.use("/api/chatbot", chatBotRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the IPL Fantasy API");
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
