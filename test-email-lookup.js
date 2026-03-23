const nodemailer = require("nodemailer");
const dns = require("dns");
require("dotenv").config();

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
  lookup: (hostname, options, callback) => {
    console.log(`Looking up hostname: ${hostname}`);
    dns.lookup(hostname, { ...options, family: 4 }, (err, address, family) => {
        console.log(`Resolved ${hostname} to ${address} (family: ${family})`);
        callback(err, address, family);
    });
  },
});

async function testConnection() {
  console.log("Testing connection with custom lookup function...");
  try {
    const info = await transporter.verify();
    console.log("Connection successful:", info);
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

testConnection();
