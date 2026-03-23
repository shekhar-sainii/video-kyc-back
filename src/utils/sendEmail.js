const nodemailer = require("nodemailer");
const dns = require("dns");
require("dotenv").config();

const transporterConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  family: 4, // Force IPv4
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    // Manually resolve to IPv4 to bypass Render's IPv6 preference
    const { address } = await dns.promises.lookup("smtp.gmail.com", { family: 4 });
    const transporter = nodemailer.createTransport({
      ...transporterConfig,
      host: address, // Use the resolved IP directly
    });

    await transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error in sendEmail:", error);
    // Fallback to original hostname if lookup fails
    const transporter = nodemailer.createTransport(transporterConfig);
    await transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
};

module.exports = sendEmail;