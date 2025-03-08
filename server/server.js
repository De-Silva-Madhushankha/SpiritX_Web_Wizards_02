import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/player", playerRoutes);


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})