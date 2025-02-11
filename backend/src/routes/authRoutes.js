import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import User from "../models/Users.js";
import { sendCode } from "../utils/sendCode.js";
import bcrypt from "bcryptjs";

const router = express.Router();
const codeStorage = new Map();

// Signup route
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

// Send Reset Code
router.post("/send-code", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const code = await sendCode(email);
      codeStorage.set(email, code); 
  
      res.status(200).json({ message: "Code sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

// Send Verify Code
router.post("/verify-code", (req, res) => {
    const { email, code } = req.body;
  
    if (codeStorage.get(email) === code) {
      codeStorage.delete(email); 
      res.status(200).json({ message: "Code verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid code" });
    }
  });
  
// Reset Password
  router.post("/reset-password", async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ message: "User not found" });
        
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt); 
      await user.save();
  
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

export default router;
