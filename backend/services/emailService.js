import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

// Reusable transporter — configure with real SMTP credentials in .env when needed.
// This is a stub wired up for future features (email verification, forgot password).
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Smart Task Manager" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    // Don't crash the request if email fails — log it and move on.
    logger.error("Email send failed:", error.message);
  }
};