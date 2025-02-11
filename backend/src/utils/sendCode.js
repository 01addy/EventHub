import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendCode = async (email) => {
  try {
    const code = generateCode(); // Generate OTP
    console.log(` Sending code ${code} to ${email}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);
    return code;
  } catch (error) {
    console.error(" Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
