import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider, DarkModeContext } from "./context/DarkModeContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import MyEvents from "./pages/MyEvents.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ContactUs from "./pages/ContactUs.jsx";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated]= useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleTabClose = (event) => {
      if (!event.persisted) {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); 
        setIsAuthenticated(false);
      }
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoginOpen(true);
    }
  }, []);

  return (
    <DarkModeProvider>
      <DarkModeContext.Consumer>
        {({ darkMode }) => (
          <Router>
            {/* Floating Login Modal */}
            {isLoginOpen && <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
            
            {/* Pass setShowLogin to Navbar */}
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setShowLogin={setIsLoginOpen} />

            {/* Main Content Wrapper */}
            <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} pt-16 min-h-screen flex flex-col`}>
              <main className="flex-grow flex justify-center items-center">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/create-event" element={<CreateEvent />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/my-events" element={<MyEvents />} />
                  <Route
                    path="/enrolled-events"
                    element={
                      <ProtectedRoute>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        )}
      </DarkModeContext.Consumer>
    </DarkModeProvider>
  );
}

export default App;
