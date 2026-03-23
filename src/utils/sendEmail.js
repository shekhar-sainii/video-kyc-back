const nodemailer = require("nodemailer");
const dns = require("dns");
require("dotenv").config();

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { address } = await dns.promises.lookup("smtp.gmail.com", { family: 4 });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,

      tls: {
        rejectUnauthorized: false,
        servername: "smtp.gmail.com",
      },

      getSocket: (options, callback) => {
        const net = require("net");
        const socket = net.connect(options.port, address);
        callback(null, { connection: socket });
      },
    });

    await transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
  }
};

module.exports = sendEmail;