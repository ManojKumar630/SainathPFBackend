const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email Transporter Configuration (use your Gmail credentials or app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS           // Use App Password (not your Gmail password)
  }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, country, phone, email, message } = req.body;

  if (!name || !country || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const subject = 'Mail From Portfolio';

  const emailContent = `
Subject: ${subject}

Name: ${name}
Country: ${country}
Phone: ${phone}
Email: ${email}
Message: ${message}
`;

  try {
    await transporter.sendMail({
      from: email,
      to: 'manoj63042@gmail.comgit add .
',          // Where you want to receive the message
      subject: subject,
      text: emailContent
    });

    console.log('✅ Email sent successfully');
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
