import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // Import http module to integrate Socket.IO with Express
import { Server } from "socket.io"; // Correct import for socket.io

// Importing routes
import playerRoutes from "./routes/playerRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

// Create HTTP server to work with Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // Set to your frontend URL in production
    methods: ["GET", "POST"],
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(express.json());
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


// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected");

  // Example of emitting events or listening for events
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Emit a test event every 5 seconds (optional for testing purposes)
  setInterval(() => {
    socket.emit("serverMessage", "Hello from the server!");
  }, 5000);
});

// Start server
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
