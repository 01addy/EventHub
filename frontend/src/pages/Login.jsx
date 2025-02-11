import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { 
        email, 
        password,
      });

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        onClose();
        navigate("/");
      }
    } catch (error) {
      setError("Invalid email or password!");
    }
  };


  const handleGuestLogin = () => {
    sessionStorage.setItem("guest", "true"); 
    onClose();
    navigate("/");
  };

  
  useEffect(() => {
    const handleTabClose = () => {
      if (!sessionStorage.getItem("sessionActive")) {
        localStorage.removeItem("token");
      }
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative mt-16">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center text-[#5a6ccf] mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#5a6ccf] text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#5a6ccf] text-black"
          />
          <button type="submit" className="w-full py-2 bg-[#9fb2f5] text-black font-bold rounded-md hover:bg-[#7f92e5] transition-all duration-300">
            Submit
          </button>
        </form>

        <button onClick={handleGuestLogin} className="w-full mt-4 py-2 bg-gray-300 text-black font-bold rounded-md hover:bg-gray-400 transition-all duration-300">
          Continue as Guest
        </button>

        <div className="flex justify-between mt-4">
          <button className="text-sm text-blue-600 hover:underline" onClick={() => setIsForgotPasswordOpen(true)}>
            Forgot Password?
          </button>
          <button className="text-sm text-blue-600 hover:underline" onClick={() => setIsSignUpOpen(true)}>
            New User? Sign Up
          </button>
        </div>
      </div>

      <ForgotPassword isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
      <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </div>
  );
};

export default Login;
