import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { countries } from "../data/countries";

const SignUp = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!gender) newErrors.gender = "Please select a gender";
    if (!country) newErrors.country = "Please select a country";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) newErrors.email = "Invalid email format";

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.match(phoneRegex)) newErrors.phone = "Enter a valid 10-digit phone number";

    const passwordRegex = /^[A-Za-z0-9#@_]{6,}$/;
    if (!password.match(passwordRegex)) newErrors.password = "Password must be at least 6 characters and include A-Z, a-z, 0-9, #@_";

    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        gender,
        country: country?.label,
        email,
        phone,
        password
      });

      alert("Registration Successful!");
      console.log("Signup Success:", response.data);
      onClose();
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setErrors({ apiError: error.response?.data?.message || "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 overflow-auto mt-10">
      <div className="bg-white p-12 md:p-14 rounded-xl shadow-2xl w-full max-w-xl relative mx-auto max-h-[90vh] overflow-auto">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl transition-all duration-300" onClick={onClose}>
          ✖
        </button>
  
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#4A60E3] mb-6">Create Your Account</h2>
  
        {/* Error Message */}
        {errors.apiError && <p className="text-red-500 text-center mb-4">{errors.apiError}</p>}
  
        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#4A60E3]" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
  
          <div className="space-y-2">
            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#4A60E3]">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
              <option value="Rather Not Say">Rather Not Say</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
  
          <div className="space-y-2">
            <Select options={countries} value={country} onChange={setCountry} placeholder="Select Country"
              className="w-full text-black" />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
  
          <div className="space-y-2">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#4A60E3]" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
  
          <div className="space-y-2">
            <input type="text" placeholder="Phone Number (10 digits)" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#4A60E3]" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
  
          <div className="space-y-2">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#4A60E3]" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
  
          <div className="space-y-2">
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#4A60E3]" />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
  
          {/* Submit Button */}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#4A60E3] text-white font-bold rounded-lg hover:bg-[#3A50D3] transition-all duration-300">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
  
}  

export default SignUp;