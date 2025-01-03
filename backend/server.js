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
  const { employee_id, full_name, employee_type, email, phone_number, address, dob, emergency_contact, status, password } = req.body;
  
  if (!full_name || !employee_type || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO employees (employee_id, full_name, employee_type, email, phone_number, address, dob, emergency_contact, status, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [employee_id, full_name, employee_type, email, phone_number, address, dob, emergency_contact, status, password]
    );
    res.status(201).json({ employee_id: result.insertId, full_name, employee_type, email });
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ message: 'Error adding employee' });
  }
});

// Update an employee's details
app.put('/api/employees/:employee_id', async (req, res) => {
  const { employee_id } = req.params;
  const { full_name, employee_type, email, phone_number, address, dob, emergency_contact, status } = req.body;

  // Basic field validation
  if (!full_name || !employee_type || !email) {
    return res.status(400).json({ message: 'Missing required fields: full_name, employee_type, and email are required.' });
  }

  // Optional validation for email format (basic example, improve as needed)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    // Update employee details in the database
    const [result] = await db.query(
      'UPDATE employees SET full_name = ?, employee_type = ?, email = ?, phone_number = ?, address = ?, dob = ?, emergency_contact = ?, status = ? WHERE employee_id = ?',
      [full_name, employee_type, email, phone_number, address, dob, emergency_contact, status, employee_id]
    );

    // Check if the employee exists and was updated
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
app.delete('/api/employees/:employee_id', async (req, res) => {
  const { employee_id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM employees WHERE employee_id = ?', [employee_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

// Student Routes
// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const [students] = await db.query('SELECT * FROM students');
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Add a new Student
app.post('/api/students', async (req, res) => {
  const { student_id, full_name, student_type, program, email, phone_number, dob, emergency_contact, status, password } = req.body;
  
  // Check for required fields
  if (!full_name || !student_type || !program || !email) {
    return res.status(400).json({ message: 'Missing required fields: full_name, student_type, program, and email are required.' });
  }

  // Optional validation for email format (basic example)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO students (student_id, full_name, student_type, program, email, phone_number, dob, emergency_contact, status, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [student_id, full_name, student_type, program, email, phone_number, dob, emergency_contact, status, password]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: 'Failed to insert student into the database.' });
    }

    res.status(201).json({ student_id: result.insertId, full_name, student_type, program });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ message: `Error adding student: ${err.message}` });
  }
});


// Update a student's details
app.put('/api/students/:student_id', async (req, res) => {
  const { student_id } = req.params;
  const { full_name, student_type, program, email, phone_number, dob, emergency_contact, status } = req.body;

  // Basic field validation
  if (!full_name || !student_type || !email) {
    return res.status(400).json({ message: 'Missing required fields: full_name, student_type, and email are required.' });
  }

  // Optional validation for email format (basic example, improve as needed)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    // Update student details in the database
    const [result] = await db.query(
      'UPDATE students SET full_name = ?, student_type = ?, program = ?, email = ?,  phone_number = ?, dob = ?, emergency_contact = ?, status = ? WHERE student_id = ?',
      [full_name, student_type, program, email, phone_number,  dob, emergency_contact, status, student_id]
    );

    // Check if the student exists and was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully' });
  } catch (err) {
    console.error('Error updating Student:', err);
    res.status(500).json({ message: 'Error updating student' });
  }
});


// Delete a Student
app.delete('/api/students/:student_id', async (req, res) => {
  const { student_id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM students WHERE student_id = ?', [student_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting Student:', err);
    res.status(500).json({ message: 'Error deleting Student' });
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
	res.json("di ako natutuwa.");
});

app.post('/api/login', async (req, res) => {
  const { login_id, password } = req.body;

  if (!student_id || !password) {
    return res.status(400).json({ message: 'Student ID and password are required.' });
  }

  try {
    // First, check the students table for the student_id
    const queryStudents = 'SELECT * FROM students WHERE student_id = ?';
    const [studentResults] = await db.query(queryStudents, [login_id]);

    if (studentResults.length > 0) {
      // If the student is found, check the password
      const student = studentResults[0];
      const isPasswordCorrect = await bcrypt.compare(password, student.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Return student info upon successful login
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: student.student_id,
          full_name: student.full_name,
          role: 'Student',
        },
      });
    }

    // If student is not found, check the employees table
    const queryEmployees = 'SELECT * FROM employees WHERE employee_id = ?';
    const [employeeResults] = await db.query(queryEmployees, [login_id]);

    if (employeeResults.length > 0) {
      // If the employee is found, check the password
      const employee = employeeResults[0];
      const isPasswordCorrect = await bcrypt.compare(password, employee.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Return employee info upon successful login
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: employee.employee_id,
          full_name: employee.full_name,
          role: 'Employee',
        },
      });
    }

    // If no user is found in either table
    return res.status(404).json({ message: 'User not found.' });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
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
