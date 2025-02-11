import { useState } from "react";
import axios from "axios";

const ForgotPassword = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serverCode, setServerCode] = useState(""); 
  const [error, setError] = useState("");

  const handleSendCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-code", { email });
      alert("Confirmation code sent to your email!");
      setStep(2);
    } catch (err) {
      setError("Failed to send code. Try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-code", { email, code });
      alert("Code verified successfully!");
      setStep(3);
    } catch (err) {
      setError("Invalid confirmation code.");
    }
  };
  
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", { email, newPassword });
      alert("Password successfully reset! You can now log in.");
      onClose();
    } catch (err) {
      setError("Error resetting password. Try again.");
    }
  };
  

  if (!isOpen) return null; 

  
  const handleClose = () => {
    setStep(1);
    setEmail("");
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
    setServerCode("");
    setError("");
    onClose();  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              onClick={handleSendCode}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Confirmation Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter confirmation code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              onClick={handleVerifyCode}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Verify Code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              onClick={handleResetPassword}
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Reset Password
            </button>
          </>
        )}

        <button onClick={onClose} className="w-full py-2 mt-4 bg-gray-400 text-white rounded hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
