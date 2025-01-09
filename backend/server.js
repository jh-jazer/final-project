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
const router = express.Router();  // Create an Express Router instance

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

app.delete('/api/enrollments/:id', async (req, res) => {
  const { id } = req.params;
  console.log("DELETE request received for ID:", id);

  try {
    const result = await db('enrollments').where('id', id).del();
    console.log("Deletion result:", result);
    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).send("Enrollment not found");
    }
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).send("Server error");
  }
});



app.get('/api/enrollments', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM enrollments WHERE LOWER(email) = LOWER(?)', [email]);
    if (rows.length === 0) {
      console.log(`No enrollee found for email: ${email}`);
      return res.status(404).json({ error: 'Enrollee not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Endpoint to check if email already exists
app.post("/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await db.execute('SELECT * FROM enrollments WHERE email = ?', [email]);
    if (existingUser[0].length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
// Endpoint to check if enrollmentId already exists
app.post('/check-enrollment-id', async (req, res) => {
  const { enrollmentId } = req.body;
  try {
    // Query the database to check if the enrollmentId already exists
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM enrollments WHERE enrollment_id = ?', [enrollmentId]);
    const exists = rows[0].count > 0;
    res.json({ exists });
  } catch (error) {
    console.error('Error checking enrollment ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Endpoint to save the enrollment data
app.post("/save-enrollment", async (req, res) => {
  const { email, enrollmentId, applicantType, preferredProgram, strand, seniorHighTrack } = req.body;
  // Validate required fields
  if (!email || !enrollmentId || !applicantType || !preferredProgram ) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    // Check if enrollmentId already exists (optional validation)
    const [existingEnrollment] = await db.execute('SELECT * FROM enrollments WHERE enrollment_id = ?', [enrollmentId]);
    if (existingEnrollment.length > 0) {
      return res.status(400).json({ success: false, message: "Enrollment ID already exists" });
    }
    // Insert the new enrollment data into the database
    await db.execute('INSERT INTO enrollments (email, enrollment_id, applicant_type, preferred_program, strand, senior_high_track) VALUES (?, ?, ?, ?, ?, ?)', 
      [email, enrollmentId, applicantType, preferredProgram, strand, seniorHighTrack]);
    return res.json({ success: true, message: "Enrollment saved successfully!" });
  } catch (err) {
    console.error("Error saving enrollment:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


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
  const { student_id, full_name, student_type, program_id, email, phone_number, dob, emergency_contact, status, password } = req.body;
  
  // Check for required fields
  if (!full_name || !student_type || !program_id || !email) {
    return res.status(400).json({ message: 'Missing required fields: full_name, student_type, program_id, and email are required.' });
  }

  // Optional validation for email format (basic example)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    // Check if program_id exists in the programs table
    const [programs] = await db.query('SELECT id FROM programs WHERE id = ?', [program_id]);
    if (programs.length === 0) {
      return res.status(400).json({ message: 'Invalid program_id. Program not found.' });
    }

    // Insert the student if the program exists
    const [result] = await db.query(
      'INSERT INTO students (student_id, full_name, student_type, program_id, email, phone_number, dob, emergency_contact, status, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [student_id, full_name, student_type, program_id, email, phone_number, dob, emergency_contact, status, password]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: 'Failed to insert student into the database.' });
    }

    res.status(201).json({ student_id: result.insertId, full_name, student_type, program_id });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ message: `Error adding student: ${err.message}` });
  }
});

// Update a student's details
app.put('/api/students/:student_id', async (req, res) => {
  const { student_id } = req.params;
  const { full_name, student_type, program_id, email, phone_number, dob, emergency_contact, status } = req.body;

  // Basic field validation
  if (!full_name || !student_type || !email) {
    return res.status(400).json({ message: 'Missing required fields: full_name, student_type, and email are required.' });
  }

  // Optional validation for email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    // Check if program_id exists in the programs table before updating
    const [programs] = await db.query('SELECT id FROM programs WHERE id = ?', [program_id]);
    if (programs.length === 0) {
      return res.status(400).json({ message: 'Invalid program_id. Program not found.' });
    }

    // Update student details in the database
    const [result] = await db.query(
      'UPDATE students SET full_name = ?, student_type = ?, program_id = ?, email = ?, phone_number = ?, dob = ?, emergency_contact = ?, status = ? WHERE student_id = ?',
      [full_name, student_type, program_id, email, phone_number, dob, emergency_contact, status, student_id]
    );

    // Check if the student exists and was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully' });
  } catch (err) {
    console.error('Error updating student:', err);
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
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Error deleting student' });
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

app.post('/api/login', async (req, res) => {
  const { login_id, password } = req.body;

  if (!login_id || !password) {
    return res.status(400).json({ message: 'Login ID and password are required.' });
  }

  try {
    // Check the students table first
    const [studentResults] = await db.query('SELECT * FROM students WHERE student_id = ?', [login_id]);

    if (studentResults.length > 0) {
      const student = studentResults[0];
      const isPasswordCorrect = await bcrypt.compare(password, student.password);
      
      if (isPasswordCorrect) {
        return res.status(200).json({
          message: 'Login successful',
          user: {
            id: student.student_id,
            full_name: student.full_name,
            role: 'Student',
            type: student.student_type,
            other: student.program,
          },
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
    }

    // Check the employees table if not found in students
    const [employeeResults] = await db.query('SELECT * FROM employees WHERE employee_id = ?', [login_id]);

    if (employeeResults.length > 0) {
      const employee = employeeResults[0];
      const isPasswordCorrect = await bcrypt.compare(password, employee.password);
      
      if (isPasswordCorrect) {
        return res.status(200).json({
          message: 'Login successful',
          user: {
            id: employee.employee_id,
            full_name: employee.full_name,
            role: 'Employee',
            type: employee.employee_type,
            other: employee.email,

          },
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
    }

    // If login_id is not found in either table
    return res.status(404).json({ message: 'User not found.' });

  } catch (error) {
    console.error('Login error:', error);
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
app.post('/api/forgotpassword', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing email address' });
  }

  try {
    console.log('Checking email:', email);

    const [results] = await db.query(
      `
      SELECT 'students' AS table_name, email FROM students WHERE email = ?
      UNION
      SELECT 'employees' AS table_name, email FROM employees WHERE email = ?
      `,
      [email.trim(), email.trim()]
    );

    console.log('Query results:', results);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    const tableName = results[0].table_name;
    console.log('Table name identified:', tableName);

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' ');
    const hashedToken = await bcrypt.hash(resetToken, 10);

    await db.query(
      `UPDATE ${tableName} SET reset_token = ?, reset_token_expiry = ? WHERE email = ?`,
      [hashedToken, resetTokenExpiry, email.trim()]
    );

    console.log('Reset token updated in the database');

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
        console.error('Email sending failed:', mailErr);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      res.status(200).json({ message: 'The password reset link has been sent to your email' });
    });
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
});


//Reset Password Route
app.post('/api/resetpassword', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  try {
    const [results] = await db.query(`
      SELECT 'students' AS table_name, email, reset_token 
      FROM students 
      WHERE reset_token_expiry > NOW() AND reset_token IS NOT NULL
      UNION
      SELECT 'employees' AS table_name, email, reset_token 
      FROM employees 
      WHERE reset_token_expiry > NOW() AND reset_token IS NOT NULL
    `);

    let user;
    for (const result of results) {
      if (await bcrypt.compare(token, result.reset_token)) {
        user = result;
        break;
      }
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(`
      UPDATE ${user.table_name} 
      SET password = ?, reset_token = NULL, reset_token_expiry = NULL 
      WHERE email = ?
    `, [hashedPassword, user.email]);

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/api/get_instructor_info', async (req, res) => {
  try {
    // Query the database
    const [rows] = await db.query('SELECT * FROM instructors');
    
    // Send the result back to the frontend
    res.status(200).json({
      message: 'Query successful',
      instructors: rows
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/api/add_instructor", async (req, res) => {
  try {
    const { instructor_name, department, email, phone, courses } = req.body;

    // Insert the new instructor into the database
    const sql = `
      INSERT INTO instructors (instructor_name, department, email, phone, courses)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      instructor_name,
      department,
      email,
      phone,
      courses, // Store courses as a JSON string
    ]);

    // Send back the inserted instructor with the new ID
    const newInstructor = {
      id: result.insertId,
      instructor_name,
      department,
      email,
      phone,
      courses,
    };

    res.status(201).json(newInstructor);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.put("/api/update_instructor", async (req, res) => {
  const { instructor_id, instructor_name, department, email, phone, courses } = req.body; // Get updated data from the request body
  try {
    // Update the instructor in the database
    const sql = `
      UPDATE instructors
      SET instructor_name = ?, department = ?, email = ?, phone = ?, courses = ?
      WHERE instructor_id = ?
    `;

    const [result] = await db.query(sql, [
      instructor_name,
      department,
      email,
      phone,
      courses, // Store courses as a JSON string
      instructor_id, // Use the ID to identify which record to update
    ]);

    if (result.affectedRows === 0) {
      // If no rows were updated, return a 404 (instructor not found)
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Send back the updated instructor data
    const updatedInstructor = {
      id: instructor_id,
      instructor_name,
      department,
      email,
      phone,
      courses,
    };

    res.status(200).json(updatedInstructor); // Send back the updated instructor
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/delete_instructor", async (req, res) => {
  const { id } = req.query; // Get the instructor ID from the query parameter

  try {
    const sql = `DELETE FROM instructors WHERE instructor_id = ?`;
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(port, () => {
  console.log(`Server running locally at http://localhost:${port}`);
});