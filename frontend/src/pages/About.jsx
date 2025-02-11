import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import { DarkModeContext } from "../context/DarkModeContext";

const About = () => {
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
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="text-center text-5xl font-extrabold mb-10 text-white tracking-wide"
      >
        About the Developer
      </motion.h1>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="bg-purple-700 p-8 rounded-lg shadow-lg text-white text-center"
      >
        <h2 className="text-3xl font-bold">
          <Typewriter
            words={['Aditya Pratap Singh', 'A Passionate Developer']}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
        <p className="text-lg mt-4">
          A highly skilled developer specializing in modern web applications.
          Passionate about crafting seamless user experiences with creativity & innovation.
        </p>
      </motion.div>

      {/* Info Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
        className="grid md:grid-cols-2 gap-8 mt-10"
      >
        {/* Bio Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-3 text-[#7a8ae5]">Who Am I?</h3>
          <p className="text-gray-700 dark:text-gray-300">
            I combine technical proficiency with creativity to build scalable web applications.
            Proficient in React.js, Node.js, and MongoDB, always seeking innovative solutions.
          </p>
          <a
            href="/resume.pdf"
            download="Aditya_Pratap_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[#7a8ae5] underline hover:text-[#5a6ab8]"
          >
            Download Resume 📄
          </a>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-3 text-[#7a8ae5]">Get in Touch</h3>
          <p><b>Phone:</b> <a href="tel:+918858066219" className="underline">+91-8858066219</a></p>
          <p><b>Email:</b> <a href="mailto:adityapratap.job@gmail.com" className="underline text-[#7a8ae5] hover:text-[#5a6ab8]">adityapratap.job@gmail.com</a></p>
          <p><b>GitHub:</b> <a href="https://github.com/01addy" target="_blank" className="underline text-[#7a8ae5] hover:text-[#5a6ab8]">01addy</a></p>
          <p><b>LinkedIn:</b> <a href="https://www.linkedin.com/in/adityapratap2712" target="_blank" className="underline text-[#7a8ae5] hover:text-[#5a6ab8]">Aditya Pratap Singh</a></p>
        </motion.div>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
        className="mt-12"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Tech Stack Used</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#7a8ae5]">Frontend</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><b>React.js:</b> Dynamic UI</li>
              <li><b>Tailwind CSS:</b> Modern styling</li>
              <li><b>Framer Motion:</b> Smooth animations</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#7a8ae5]">Backend</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><b>Node.js & Express:</b> API development</li>
              <li><b>MongoDB:</b> NoSQL database</li>
              <li><b>JWT:</b> Authentication</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
