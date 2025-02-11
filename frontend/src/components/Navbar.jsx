import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext.jsx";

const Navbar = ({ isAuthenticated, setIsAuthenticated, setShowLogin }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [isAuthenticated]);

  const handleAuthAction = () => {
    if (isAuthenticated){
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      setIsAuthenticated(false);
      setUser(null);
    } else {
      
      setShowLogin(true);
    }
  };

  return (
    <nav className={`w-full py-4 px-8 fixed top-0 left-0 z-50 transition-all duration-300 
      ${darkMode ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-900 shadow-md"}`}>

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          EventHub
        </Link>

        <div className="space-x-6">
          <Link to="/" className="hover:text-purple-500 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-purple-500 transition">Events</Link>
          <Link to="/create-event" className="hover:text-purple-500 transition">Create Event</Link>
          <Link to="/my-events" className="hover:text-purple-500 transition">My Events</Link>
          <Link to="/about" className="hover:text-purple-500 transition">About</Link>
          <Link to="/contact" className="hover:text-purple-500 transition">Contact Us</Link>
        </div>

        {/* Icons  */}
        <div className="flex items-center space-x-4">
          
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-600" />}
          </button>

          {/* Login/Logout Icon */}
          <button
            onClick={handleAuthAction}
            className={`p-2 rounded-full text-white transition ${
              isAuthenticated ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
            title={isAuthenticated ? "Logout" : "Login"}
          >
            {isAuthenticated ? <FaSignOutAlt size={20} /> : <FaSignInAlt size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
