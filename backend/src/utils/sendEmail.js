import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to, subject, text) => {
  try {
    console.log(` Preparing to send email to: ${to}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Registration Successful!!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd;">
        <h2 style="color: #4CAF50;">🎉 Registration Successful!</h2>
        <p>Hello,</p>
        <p>You have successfully registered your account in <strong>EventHub</strong> event!</p>
        <p> Create a new Event or Enroll in an event now!!</p>
        <p style="margin-top: 10px;">We look forward to seeing you at the event!</p>
        <p>Best Regards,</p>
        <p><strong>EventHub Team</strong></p>
      </div>
    `,
  };

    const info = await transporter.sendMail(mailOptions);
    console.log(` Email sent successfully to ${to}: ${info.response}`);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};

export const sendEnrollmentConfirmation = async (email, eventDetails) => {
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
    subject: `Enrollment Confirmation for ${eventDetails.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd;">
        <h2 style="color: #4CAF50;">🎉 Enrollment Confirmed!</h2>
        <p>Hello,</p>
        <p>You have successfully enrolled in the <strong>${eventDetails.name}</strong> event!</p>
        <p><strong>Event Type:</strong> ${eventDetails.type}</p>
        <p><strong>Description:</strong> ${eventDetails.description}</p>
        <p><strong>Date:</strong> ${eventDetails.date}</p>
        <img src="${eventDetails.image}" alt="Event Image" style="width: 100%; max-width: 500px; height: auto; border-radius: 10px; margin-top: 10px;">
        <p style="margin-top: 10px;">We look forward to seeing you at the event!</p>
        <p>Best Regards,</p>
        <p><strong>EventHub Team</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
