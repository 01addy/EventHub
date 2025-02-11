import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";

const MyEvents = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [selectedDate, setSelectedDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const categories = [
    "Technology", "Business", "Sports", "Music", "Education", 
    "Health & Wellness", "Art & Design", "Science & Research", 
    "Gaming & Esports", "Networking & Career", "Cultural & Social",
    "Entrepreneurship & Startups", "Workshops & Training", 
    "Film & Entertainment", "Food & Culinary", "Travel & Adventure", "Other Event"
  ];

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

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://event-hub-1gy9.onrender.com/api/events/created", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
        setIsPageLoaded(true);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user]);

  
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory 
      ? event.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesDate = selectedDate ? event.date.startsWith(selectedDate) : true;
    return matchesCategory && matchesDate;
  });

  
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const now = new Date().getTime();
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();

    if (timeA < now && timeB >= now) return 1;
    if (timeA >= now && timeB < now) return -1;

    return timeA - timeB;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short", year: "numeric", month: "short", day: "numeric"
    });
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-semibold">Please Log In to view your created events</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => navigate("/login")}>
          Log In
        </button>
      </div>
    );
  }

  return (
    <div
      className={`p-6 min-h-screen w-full transition-opacity duration-[1200ms] ease-in-out ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      } ${darkMode ? "bg-[#1E1E2E] text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}
    >
      <h1 className="text-center text-5xl font-extrabold mb-10 text-white tracking-wide">
        My Events
      </h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
        <h3>Filter Events by:</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-md border border-gray-300 bg-white text-black cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 rounded-md border border-gray-300 bg-white text-black cursor-pointer"
        />

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div 
              key={event._id} 
              className="p-6 rounded-lg shadow-lg border bg-white text-black cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="bg-green-500 text-white font-bold text-center py-2 rounded-t-md">
                {event.category}
              </div>

              {event.image && (
                <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-md mt-2" />
              )}

              <h4 className="text-xl mt-2 font-semibold">{event.name}</h4>
              <p>📅 Date: {formatDate(event.date)}</p>
              <p>Attendees: {event.attendees?.length || 0}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-semibold col-span-full">
            No events found for the selected filters.
          </p>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-5 text-gray-600 text-2xl hover:text-red-500 transition"
            >
              ✖
            </button>

            <h2 className="text-3xl font-extrabold text-center text-[#7a8ae5] mt-4">
              {selectedEvent.name}
            </h2>

            <p className="text-gray-700 text-center mt-3 font-medium">
              📅 Date: {formatDate(selectedEvent.date)}
            </p>

            {selectedEvent.image && (
              <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-68 object-cover rounded-md shadow-lg mt-4" />
            )}

            <p className="text-gray-700 leading-relaxed text-justify mt-4">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
