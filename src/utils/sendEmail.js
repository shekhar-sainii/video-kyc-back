const nodemailer = require("nodemailer");
const dns = require("dns");
require("dotenv").config();

// Force IPv4 resolution order
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
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
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"No Reply" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;