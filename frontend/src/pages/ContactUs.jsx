import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter';
import { DarkModeContext } from "../context/DarkModeContext";

const ContactUs = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
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

  return (
    <div className={`container mx-auto px-6 py-12 transition-opacity duration-[1200ms] ease-in-out ${fadeIn ? "opacity-100" : "opacity-0"} ${darkMode ? "bg-[#1E1E2E] text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>
      
      {/* Page Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="text-center text-5xl font-extrabold mb-10 text-white tracking-wide"
      >
        Contact Us
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="bg-purple-700 p-8 rounded-lg shadow-lg text-white text-center"
      >
        <h3 className="text-3xl font-bold">Get in Touch with us!!!</h3>
        <p className="text-lg mt-4">
          <Typewriter
            words={[
              "We’d love to hear from you!",
              "Whether you have questions, feedback, or just want to chat",
              "Feel free to reach out."
            ]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1000}
          />
        </p>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
        className="grid md:grid-cols-2 gap-8 mt-10"
      >
        {/* Contact Info */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-3 text-[#7a8ae5]">Contact Information</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Have a query? Feel free to reach out via phone or email.
          </p>
          <div className="mt-4">
            <p className="flex items-center text-gray-700 dark:text-gray-300 ">
              <FaPhoneAlt className="mr-2" />
              <a href="tel:+918858066219" className="underline">+91-8858066219</a>
            </p>
            <p className="flex items-center mt-2 text-gray-900 dark:text-gray-300">
              <FaEnvelope className="mr-2" />
              <a href="mailto:adityapratap.job@gmail.com" className="underline">adityapratap.job@gmail.com</a>
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-3 text-[#7a8ae5]">Send a Message</h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-[#7a8ae5]" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Email</label>
              <input type="email" className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-[#7a8ae5]" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
              <textarea rows="4" className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-[#7a8ae5]"></textarea>
            </div>

            <button type="submit" className="w-full py-2 bg-purple-700 hover:bg-[#5a6ab8] text-white font-bold rounded-md transition-all duration-300">
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
