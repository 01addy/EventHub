import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import Event from "../models/Event.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendEnrollmentConfirmation } from "../utils/sendEmail.js";
import { io } from "../server.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error: error.message });
    }
});

// Create Event
router.post("/create", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        console.log("Received request to create event.");
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        const { name, description, category, date } = req.body;
        const userId = req.user.id; 

        if (!name || !description || !category || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let imageUrl = "";
        if (req.file) {
            try {
                console.log("Uploading image to Cloudinary...");

                // Upload file buffer to Cloudinary using a Promise
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: "events" },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary Upload Error:", error);
                                reject(error);
                            } else {
                                console.log("Upload successful. Image URL:", result.secure_url);
                                resolve(result.secure_url);
                            }
                        }
                    );

                    uploadStream.end(req.file.buffer);
                });

                imageUrl = result;
            } catch (uploadError) {
                console.error("Error during Cloudinary upload:", uploadError);
                return res.status(500).json({ message: "Error uploading image" });
            }
        } else {
            console.log("No image provided in request.");
        }

        
        const newEvent = new Event({ userId, name, description, category, date, image: imageUrl });
        console.log("Saving event with image URL:", imageUrl);
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Enroll in an Event
router.post("/enroll", authMiddleware, async (req, res) => {
    try {
        const { eventId, userEmail, userName } = req.body;

        if (!eventId || !userEmail || !userName) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (!Array.isArray(event.attendees)) {
            event.attendees = []; 
        }
        if (event.attendees.includes(userEmail)) {
            return res.status(400).json({ message: "You are already enrolled in this event." });
        }

        event.attendees.push(userEmail);
        event.attendeeCount += 1;
        await event.save();

        io.emit("eventUpdated", event);

        await sendEnrollmentConfirmation(userEmail, {
            name: event.name,
            type: event.category,
            description: event.description,
            date: event.date,
            image: event.image,
        });

        res.status(200).json({ message: "Enrollment successful. Confirmation email sent!" });

    } catch (error) {
        console.error("Enrollment Error:", error);
        res.status(500).json({ message: "Server error. Try again later." });
    }
});


// Created event
router.get("/created", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      const events = await Event.find({ userId }).sort({ date: 1 }); 
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching created events:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;
