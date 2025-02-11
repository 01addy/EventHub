import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext.jsx";

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <footer className={`w-full py-6 px-6 md:px-16 transition-all duration-300 
      ${darkMode ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-900 shadow-md"}`}>

      <div className="max-w-7xl mx-auto">
        
        {/* Name Section */}
        <div className="text-center mb-6">
          <h1 className={`text-3xl font-bold tracking-wide transition duration-300 
            ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-[#7a8ae5] hover:text-[#5a6ab8]"}`}>
            Aditya Pratap Singh
          </h1>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          
          {/* Navigation Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-2 transition ${darkMode ? "text-purple-400" : "text-[#7a8ae5]"}`}>Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/about" className={`hover:text-purple-500 transition ${darkMode ? "text-gray-300" : "text-gray-900"}`}>About</Link></li>
              <li><Link to="/contact" className={`hover:text-purple-500 transition ${darkMode ? "text-gray-300" : "text-gray-900"}`}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-2 transition ${darkMode ? "text-purple-400" : "text-[#7a8ae5]"}`}>Connect with Me</h3>
            <div className="flex space-x-4 text-xl">
              <a href="https://www.instagram.com/pratap_2712/" target="_blank" rel="noopener noreferrer"
                className={`hover:text-pink-400 transition ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/adityapratap2712/" target="_blank" rel="noopener noreferrer"
                className={`hover:text-blue-400 transition ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                <FaLinkedin />
              </a>
              <a href="https://github.com/01addy" target="_blank" rel="noopener noreferrer"
                className={`hover:text-gray-400 transition ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Google Map Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-2 transition ${darkMode ? "text-purple-400" : "text-[#7a8ae5]"}`}>Location</h3>
            <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.128114885539!2d77.4866611!3d28.678228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb6a2b4a2b1b%3A0x1f5f5f5f5f5f5f5f!2sYour%20Location!5e0!3m2!1sen!2sin!4v1707654321000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`text-center mt-6 text-xs transition ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          <p>© {new Date().getFullYear()} Event Management Platform | All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;