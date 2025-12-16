// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

/* ---------- Database ---------- */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection failed");
    setTimeout(connectDB, 5000);
  }
};
connectDB();

/* ---------- Middleware ---------- */
app.use(
  cors({
    origin: ["https://event-hub-liard-three.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- Routes ---------- */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

/* ---------- Socket.IO ---------- */
const io = new Server(httpServer, {
  cors: {
    origin: "https://event-hub-liard-three.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("eventUpdated", () => {
    io.emit("refreshEvents");
  });
});

/* ---------- Error Handler ---------- */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || "Server error" });
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };

