import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaSignInAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext.jsx";

const Navbar = ({ isAuthenticated, setIsAuthenticated, setShowLogin }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [isAuthenticated]);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    } else {
      setShowLogin(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`w-full py-4 px-8 fixed top-0 left-0 z-50 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-900 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          EventHub
        </Link>

        {/* Mobile Hamburger Icon on Right */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full text-gray-800 dark:text-white hover:text-purple-600"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-purple-500 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-purple-500 transition">Events</Link>
          <Link to="/create-event" className="hover:text-purple-500 transition">Create Event</Link>
          <Link to="/my-events" className="hover:text-purple-500 transition">My Events</Link>
          <Link to="/about" className="hover:text-purple-500 transition">About</Link>
          <Link to="/contact" className="hover:text-purple-500 transition">Contact Us</Link>
        </div>

        {/* Desktop Icons (Theme and Login/Logout) */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-600" />}
          </button>

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

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden absolute top-16 right-0 w-full bg-gray-900 text-white transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <Link to="/" className="w-full text-center py-2 px-4 hover:text-purple-500 transition">Home</Link>
          <Link to="/dashboard" className="w-full text-center py-2 px-4 hover:text-purple-500 transition">Events</Link>
          <Link to="/create-event" className="w-full text-center py-2 px-4 hover:text-purple-500 transition">Create Event</Link>
          <Link to="/my-events" className="w-full text-center py-2 px-4 hover:text-purple-500 transition">My Events</Link>
          <Link to="/about" className="w-full text-center py-2 px-4 hover:text-purple-500 transition">About</Link>
          <Link to="/contact" className="w-full text-center py-2 px-4 hover:text-purple-500 transition">Contact Us</Link>

          {/* Theme Switcher */}
          <button
            className="w-full text-center py-2 px-4 hover:text-purple-500 transition"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <FaSun size={20} className="text-yellow-400" />
            ) : (
              <FaMoon size={20} className="text-gray-600" />
            )}
          </button>

          {/* Login/Logout Button */}
          <button
            onClick={handleAuthAction}
            className={`w-full text-center py-2 px-4 transition ${
              isAuthenticated ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isAuthenticated ? <FaSignOutAlt size={20} /> : <FaSignInAlt size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
