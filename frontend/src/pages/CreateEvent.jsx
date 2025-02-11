import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";


const CreateEvent = () => {
    const { darkMode } = useContext(DarkModeContext); 
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        category: "",
        date: "",
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [formattedDate, setFormattedDate] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setIsPageLoaded(true), 100);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.style.backgroundColor = "#1E1E2E";
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.style.backgroundColor = "";
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const categories = [
        "Technology", "Business", "Sports", "Music", "Education", 
        "Health & Wellness", "Art & Design", "Science & Research", 
        "Gaming & Esports", "Networking & Career", "Cultural & Social",
        "Entrepreneurship & Startups", "Workshops & Training", 
        "Film & Entertainment", "Food & Culinary", "Travel & Adventure", "Other Event"
    ];

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value; 
        if (selectedDate) {
            const [year, month, day] = selectedDate.split("-");
            setFormattedDate(`${day}-${month}-${year}`);
        }
        setEventData({ ...eventData, date: selectedDate });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file); 
        setImage(file);
    };

    const uploadImageToCloudinary = async (file) => {
        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbppugijm/image/upload";
        const UPLOAD_PRESET = "qwertyuiop";
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", "event_images");
    
        try {
            const response = await axios.post(CLOUDINARY_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
     
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const token = localStorage.getItem("token");
    
            const formData = new FormData();
            formData.append("name", eventData.name);
            formData.append("description", eventData.description);
            formData.append("category", eventData.category);
            formData.append("date", eventData.date);
            if (image) {
                formData.append("image", image);
            }
    
            console.log("Final FormData Sent:", formData);
    
            await axios.post(
                "https://event-hub-1gy9.onrender.com/api/events/create",
                formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            alert("Event Created Successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating event:", error.response?.data || error.message);
            alert("Event creation failed.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div
            className={`min-h-screen w-full flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                isPageLoaded ? "opacity-100" : "opacity-0"
            } ${darkMode ? "bg-[#1E1E2E] text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}
        >
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                <h1 className="text-center text-5xl font-extrabold mb-10 text-[#7a8ae5] tracking-wide">
                    Create a New Event
                </h1>
                <motion.p
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="text-center text-2xl mb-10 text-black dark:text-white tracking-wide"
                >
                    <Typewriter
                        words={[
                            "Create Your Perfect Event!", 
                            "Plan, Organize, and Share with Ease!"
                        ]}
                        loop={false}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        placeholder="Event Name" 
                        className="w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white" 
                        required 
                    />

                    <textarea 
                        name="description" 
                        onChange={handleChange} 
                        placeholder="Event Description" 
                        className="w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white" 
                        required
                    ></textarea>

                    <select 
                        name="category" 
                        onChange={handleChange} 
                        value={eventData.category}
                        className="w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7a8ae5] focus:border-[#7a8ae5]"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Date of Event</h2>
                        <input
                            type="date" 
                            name="date" 
                            value={eventData.date} 
                            onChange={handleDateChange} 
                            className="w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7a8ae5] focus:border-[#7a8ae5]"
                            required 
                        />
                        {formattedDate && (
                            <p className="text-gray-500 dark:text-gray-300 mt-1">Selected Date: {formattedDate}</p>
                        )}
                    </div>

                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer" 
                        required 
                    />

                    <button 
                        type="submit" 
                        className="w-full bg-[#7a8ae5] text-white py-2 rounded-md hover:bg-[#5a6ab8] transition duration-300 ease-in-out"
                    >
                        {loading ? "Creating..." : "Create Event"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
