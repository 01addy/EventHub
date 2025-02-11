import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password
  },
});

// Email options
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "8858sinpra@gmail.com", // Replace with your test email
  subject: "Test Email",
  text: "This is a test email from your Event Management platform.",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Email sending failed:", error);
  } else {
    console.log("✅ Email sent successfully:", info.response);
  }
});
