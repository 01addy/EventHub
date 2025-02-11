import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { DarkModeContext } from "../context/DarkModeContext";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const featuredEvents = [
    { id: 1, title: "Tech Conference 2025", image: "https://res.cloudinary.com/dbppugijm/image/upload/v1739100652/Tech_Conference_lajnve.jpg" },
    { id: 2, title: "Music Festival", image: "https://res.cloudinary.com/dbppugijm/image/upload/v1739100720/Music-Festivals_y7jlj7.jpg" },
    { id: 3, title: "Startup Meetup", image: "https://res.cloudinary.com/dbppugijm/image/upload/v1739100810/Startup_Meet_uboevl.jpg" },
    { id: 4, title: "Football Tournament", image: "https://res.cloudinary.com/dbppugijm/image/upload/v1739101004/football-tournament_oz6i4j.jpg" },
  ];

  return (
    <div className={`${darkMode ? "bg-[#1E1E2E] text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"} w-full min-h-screen `}>
      
      {/* Content Wrapper */}
      <div className="w-full max-w-7xl px-6 pt-24 flex flex-col items-center justify-center text-center">
        
        {/* Hero Section */}
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to EventHub
        </motion.h1>

        {/* Typewriter Effect */}
        <motion.p
          className="text-lg max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typewriter
            words={["Plan, manage, and attend amazing events with ease.", "Join our platform and start creating today!"]}
            loop={0} 
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={30}
            delaySpeed={1500}
          />
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-white text-purple-600 font-bold rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            Browse Events
          </Link>
          <Link
            to="/create-event"
            className="px-6 py-3 bg-purple-700 text-white font-bold rounded-2xl shadow-lg hover:bg-purple-800 transition-all duration-300"
          >
            Create an Event
          </Link>
        </motion.div>

        {/* Featured Events Carousel */}
        <div className="mt-10 w-full max-w-3xl">
          <Swiper
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay]}
            className="w-full"
          >
            {featuredEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <motion.div
                  className="p-4 rounded-lg shadow-lg text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <img src={event.image} alt={event.title} className="rounded-lg w-full h-52 object-cover" />
                  <h3 className="mt-2 text-xl font-bold">{event.title}</h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
