import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config(); 

const app = express();
const httpServer = createServer(app);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        setTimeout(connectDB, 5000);
    }
};
connectDB();

app.use(cors({
    origin: ["http://localhost:3000", "https://event-hub-five.vercel.app"],
    credentials: true,
}));


const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);


io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("eventUpdated", () => {
        console.log("Event updated, broadcasting refresh...");
        io.emit("refreshEvents");
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});


app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
});
export { io };
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));