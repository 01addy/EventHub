import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { io } from "socket.io-client";

const socket = io("https://event-hub-1gy9.onrender.com");

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [setShowLoginModal] = useState(false); 

  // Predefined Categories for Events
  const categories = [
    "Technology", "Business", "Sports", "Music", "Education",
    "Health & Wellness", "Art & Design", "Science & Research",
    "Gaming & Esports", "Networking & Career", "Cultural & Social",
    "Entrepreneurship & Startups", "Workshops & Training",
    "Film & Entertainment", "Food & Culinary", "Travel & Adventure", "Other Event"
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://event-hub-1gy9.onrender.com/api/events");
        console.log("Dashboard Events:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching dashboard events:", error);
      }
    };

    fetchEvents();
    setTimeout(() => setIsPageLoaded(true), 100);

    // Listen for real-time updates from the backend
    socket.on("eventUpdated", (updatedEvent) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    });

    return () => {
      socket.off("eventUpdated"); // Cleanup listener on unmount
    };
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      setIsUserLoggedIn(!!token); 
    };
  
    checkLoginStatus();
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange); 
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log("User Logged IN:", isUserLoggedIn);
  }, [isUserLoggedIn]);


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory 
      ? event.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesDate = selectedDate ? event.date.startsWith(selectedDate) : true;
    return matchesCategory && matchesDate;
  });

  const isEventExpired = (eventDate) => {
    const eventTime = new Date(eventDate).getTime();
    const currentTime = new Date().getTime();
    return eventTime < currentTime; 
  };

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const now = new Date();
    const timeA = new Date(a.date).getTime();
  const timeB = new Date(b.date).getTime();

  if (timeA < now && timeB >= now) return 1; 
  if (timeA >= now && timeB < now) return -1; 

  return timeA - timeB; 
  });

  const handleEnroll = async (event) => {
    try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!token || !user) {
            alert("Please log in to enroll.");
            setShowLoginModal(true);
            return;
        }

        setSelectedEvent({ ...event, enrolling: true });

        await axios.post(
            "https://event-hub-1gy9.onrender.com/api/events/enroll",
            {
                eventId: event._id,
                userEmail: user.email,
                userName: user.name,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        setSelectedEvent(null);
        alert("Enrolled successfully!");
        

    } catch (error) {
        alert(`Failed to enroll: ${error.response?.data?.message || "Unknown error"}`);
    if (errorMessage.includes("already enrolled")) {
            alert("You are already enrolled in this event.");
        } else {
            alert(`Failed to enroll: ${errorMessage}`);
        }
    }
    finally {
        
        setSelectedEvent(null);
    }
};

  return (
    <div
      className={`p-6 min-h-screen w-full transition-opacity duration-[1200ms] ease-in-out ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      } ${darkMode ? "bg-[#1E1E2E] text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}
    >
      <h1 className="text-center text-5xl font-extrabold mb-10 text-white tracking-wide">
        Events
      </h1>
      
      <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="text-center text-2xl mb-10 text-black dark:text-white tracking-wide"
      >
      <Typewriter
        words={[
          "Browse, Enroll, and Engage!", 
          "Elevate Your Experience with Premier Events Tailored for You!"
          ]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </motion.p>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
        <h3>Filter Events by:</h3>
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`p-2 rounded-md border ${
            darkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"
          } cursor-pointer`}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={`p-2 rounded-md border ${
            darkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"
          } cursor-pointer`}
        />

        {/* Reset Filters Button */}
        <button
          onClick={() => {
            setSelectedCategory("");
            setSelectedDate("");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Events Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ease-in-out ${selectedEvent ? "blur-md" : ""}`}>
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div 
              key={event._id} 
              className={`p-6 rounded-lg shadow-lg border cursor-pointer ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
              onClick={() => setSelectedEvent(event)}
            >
              {/* Event Category (Displayed in Green Box) */}
              <div className="bg-green-500 text-white font-bold text-center py-2 rounded-t-md">
                {event.category}
              </div>

              {/* Event Image */}
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-40 object-cover rounded-md mt-2" 
                />
              )}

              {/* Event Name */}
              <h4 className="text-xl mt-2 font-semibold text-black dark:text-white">{event.name}</h4>

              {/* Event Date */}
              <p className="text-gray-600 dark:text-gray-300">📅 Date: {formatDate(event.date)}</p>
              
              {/*Event Attendees*/ }
              <p> Attendees: {event.attendees?.length || 0}</p>

              {/*Enroll Button*/}
              <button
                onClick={() => handleEnroll(event)} 
                className={`mt-4 w-full py-2 rounded-md transition duration-300 ease-in-out ${
                  isEventExpired(event.date) ? "bg-gray-400 text-white cursor-not-allowed" 
                  : "bg-[#7a8ae5] text-white hover:bg-[#5a6ab8]"
                }`}
                disabled={isEventExpired(event.date)}
              >
                {isEventExpired(event.date) ? "Ended" : isUserLoggedIn ? "Enroll Now" : "Log in to Enroll"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-semibold text-gray-600 dark:text-gray-300 col-span-full">
            No events found for the selected filters.
          </p>
        )}
      </div>

      {/* Event Description Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black w-full bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-50">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Event Category */}
              {selectedEvent?.category ? (
                <p className="text-base md:text-lg font-semibold text-center uppercase tracking-wide text-white bg-[#7a8ae5] dark:bg-[#5a6ab8] px-6 py-3 rounded-full w-fit mx-auto shadow-lg">
                  {selectedEvent.category}
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic text-center">Category not available</p>
              )}
                <div className="mt-9"></div>
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-5 text-gray-600 dark:text-gray-300 text-2xl hover:text-red-500 transition"
              >
                ✖
              </button>

              {/* Event Image (Larger & More Styled) */}
              {selectedEvent.image && (
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name} 
                  className="w-full h-68 object-cover rounded-md shadow-lg mt-4"
                />
              )}

              {/* Event Title (More Space & Stylish Font) */}
              <h2 className="text-3 xl font-extrabold text-center text-[#7a8ae5] mt-4">
                {selectedEvent.name}
              </h2>

              {/* Event Description (Enhanced UI) */}
                <div className="mt-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-5 rounded-md shadow-lg border border-gray-300 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 mb-3">
                    Event Details
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    {selectedEvent.description.split("\n").map((line, index) => (
                      <span key={index} className="block mb-2">{line}</span>
                    ))}
                  </p>
                </div>


              {/* Event Date */}
              <p className="text-gray-700 dark:text-gray-400 text-center mt-3 font-medium">
                📅 Date: {formatDate(selectedEvent.date)}
              </p>

              {/* Enroll Button (More Space & Styling) */}
              {!isEventExpired(selectedEvent.date) && (
                <button
                  onClick={() => handleEnroll(selectedEvent)}
                  className="mt-6 w-full bg-[#7a8ae5] text-white py-3 rounded-md hover:bg-[#5a6ab8] transition text-lg font-semibold shadow-md"
                  disabled={selectedEvent?.enrolling}
                >
                  {selectedEvent?.enrolling ? "Enrolling..." : isUserLoggedIn ? "Enroll Now" : "Log in to Enroll"}
                </button>            
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
