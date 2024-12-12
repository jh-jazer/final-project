import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import fs from "fs";

dotenv.config();
const app = express();
const port = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const db = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  user: '3n4es3nK7WN2Li9.root',
  password: 'EftaeZlyZ4F96UoG',
  database: 'test',
  port: 4000,
  ssl: {
    ca: fs.readFileSync('./certificate.pem')  // Path to the certificate
  }

});

try {
  const connection = await db.getConnection(); // Test database connection
  console.log('Connected to tiDB');
} catch (error) {
  console.error('Database connection failed:', error.stack);
  process.exit(1); // Exit if connection fails
}

// Login Route
app.post('/login', async (req, res) => {
  const { ID, password } = req.body;

  if (!ID || !password) {
    return res.status(400).json({ message: 'Missing ID or password' });
  }

  try {
    // Fetch user by ID
    const [results] = await db.query('SELECT * FROM login WHERE ID = ?', [ID.trim()]);
    if (results.length === 0) {
      console.log('No user found for ID:', ID);
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const user = results[0];
    console.log('User fetched:', user);

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Plain password:', password);
    console.log('Hashed password:', user.password);
    console.log('Password match:', isMatch);

    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  logger: true,
  debug: true,
});

try {
  await transporter.verify();
  console.log('SMTP Server is ready to send emails.');
} catch (error) {
  console.error('Email server verification failed:', error);
}

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing email address' });
  }

  try {
    const [results] = await db.query('SELECT * FROM login WHERE email = ?', [email.trim()]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    const hashedToken = await bcrypt.hash(resetToken, 10);

    await db.query(
      'UPDATE login SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
      [hashedToken, resetTokenExpiry, email.trim()]
    );

    const resetUrl = `http://localhost:5173/resetpassword?token=${resetToken}`;
    console.log(`Generated Reset URL: ${resetUrl}`);
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, ignore this email.</p>
      `,
    };

    transporter.sendMail(mailOptions, (mailErr, info) => {
      if (mailErr) {
        console.error('Nodemailer Error:', mailErr);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ message: 'Password reset link has been sent to your email' });
    });
  } catch (err) {
    console.error('Error handling forgot password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset Password Route
app.post('/resetpassword', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Missing token or new password' });
  }

  try {
    // Retrieve user based on the token
    const [results] = await db.query('SELECT * FROM login WHERE reset_token IS NOT NULL');
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = results.find((u) => bcrypt.compareSync(token, u.reset_token));
    if (!user || Date.now() > user.reset_token_expiry) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database and clear the reset token
    await db.query(
      'UPDATE login SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE ID = ?',
      [hashedPassword, user.ID]
    );

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
