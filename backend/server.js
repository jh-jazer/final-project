import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get the directory of the current module using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the certificate
const certificatePath = path.join(__dirname, 'certificate.pem');

// Check if the certificate file exists
if (fs.existsSync(certificatePath)) {
  console.log('Certificate file exists.');
} else {
  console.error('Certificate file does not exist at the given path:', certificatePath);
}

// MySQL Connection Pool
const db = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  user: '3n4es3nK7WN2Li9.root',
  password: 'EftaeZlyZ4F96UoG',
  database: 'enrollment_system',
  port: 4000,
  ssl: {
    ca: fs.readFileSync(certificatePath),  // Use the correct path for the certificate
  },
});

// Test the database connection
const testDatabaseConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to TiDB!');
  } catch (error) {
    console.error('Database connection failed:', error.stack);
    process.exit(1);
  }
};

testDatabaseConnection();

// Employee Routes
// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM employees');
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
  const { full_name, role, email, phone_number, address, dob, emergency_contact, status } = req.body;
  
  if (!full_name || !role || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO employees (full_name, role, email, phone_number, address, dob, emergency_contact, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [full_name, role, email, phone_number, address, dob, emergency_contact, status]
    );
    res.status(201).json({ id: result.insertId, full_name, role, email });
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ message: 'Error adding employee' });
  }
});

// Update an employee's details
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, role, email, phone_number, address, dob, emergency_contact, status } = req.body;

  if (!full_name || !role || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await db.query(
      'UPDATE employees SET full_name = ?, role = ?, email = ?, phone_number = ?, address = ?, dob = ?, emergency_contact = ?, status = ? WHERE id = ?',
      [full_name, role, email, phone_number, address, dob, emergency_contact, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ message: 'Error updating employee' });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Error deleting employee' });
  }
});


// Nodemailer Transporter setup
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

app.get("/", (_, res) => {
	res.json("good mourning.");
});

app.post('/login', async (req, res) => {
  const { login_id, password } = req.body;

  if (!login_id || !password) {
    return res.status(400).json({ message: 'Missing login ID or password' });
  }

  try {
    const [results] = await db.query('SELECT * FROM login WHERE login_id = ?', [login_id.trim()]);
    if (results.length === 0) {
      console.log('No user found for login ID:', login_id);
      return res.status(401).json({ message: 'Invalid login credentials' });  // General message for security
    }

    const user = results[0];
    console.log('User fetched:', user);

    const isMatch = await bcrypt.compare(password, user.login_password);
    if (isMatch) {
      // Optionally, generate a session or JWT token here
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid login credentials' }); // General message for security
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Verify the email server is ready to send emails
const verifyEmailServer = async () => {
  try {
    await transporter.verify();
    console.log('SMTP Server is ready to send emails.');
  } catch (error) {
    console.error('Email server verification failed:', error);
  }
};

verifyEmailServer();

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

    const resetUrl = `https://cvsu-bacoor-system.vercel.app/resetpassword?token=${resetToken}`;
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
        return res.status(500).json({ message: 'Failed to send email' });
      }
      res.status(200).json({ message: 'The Password reset link has been sent to your email' });
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
    const [results] = await db.query(
      'SELECT * FROM login WHERE reset_token IS NOT NULL AND reset_token_expiry > ?',
      [Date.now()]
    );

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await Promise.all(
      results.map(async (u) => {
        const isTokenValid = await bcrypt.compare(token, u.reset_token);
        return isTokenValid ? u : null;
      })
    ).then((users) => users.filter(Boolean))[0];

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      'UPDATE login SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?',
      [hashedPassword, user.email]
    );

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(port, () => {
  console.log(`Server running at https://cvsu-backend-system.vercel.app/login`);
});
