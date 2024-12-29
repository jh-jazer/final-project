// import express from 'express';
// import mysql from 'mysql2/promise';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // Get the current directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(__dirname); // Outputs the directory path

// dotenv.config();

// console.log('GMAIL_USER:', process.env.GMAIL_USER);
// console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? '*****' : 'Not Set');

// const app = express();
// const port = process.env.PORT || 5005;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));

// // MySQL Connection Pool
// const db = mysql.createPool({
//   host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
//   user: '3n4es3nK7WN2Li9.root',
//   password: 'EftaeZlyZ4F96UoG',
//   database: 'enrollment_system',
//   port: 4000,
//   ssl: {
//     ca: fs.readFileSync(process.env.DB_CERT) // Path to the certificate
//   }
// });

// // Test Database Connection
// const testDatabaseConnection = async () => {
//   try {
//     const connection = await db.getConnection(); // Test database connection
//     console.log('Connected to TiDB!');
//   } catch (error) {
//     console.error('Database connection failed:', error.stack);
//     process.exit(1); // Exit if connection fails
//   }
// };

// testDatabaseConnection();

// // --------------------------- Routes ---------------------------

// // 1. Handle favicon.ico request to avoid 500 error
// // Serve the favicon.ico directly if requested
// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
// });

// // 2. Login Route
// app.post('/login', async (req, res) => {
//   const { login_id, password } = req.body;

//   if (!login_id || !password) {
//     return res.status(400).json({ message: 'Missing login ID or password' });
//   }

//   try {
//     const [results] = await db.query('SELECT * FROM login WHERE login_id = ?', [login_id.trim()]);
//     if (results.length === 0) {
//       console.log('No user found for login ID:', login_id);
//       return res.status(401).json({ message: 'Invalid login ID or password' });
//     }

//     const user = results[0];
//     const isMatch = await bcrypt.compare(password, user.login_password);
//     if (isMatch) {
//       return res.status(200).json({ message: 'Login successful' });
//     } else {
//       return res.status(401).json({ message: 'Invalid login ID or password' });
//     }
//   } catch (err) {
//     console.error('Error during login:', err.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // 3. Check if email exists
// app.post('/check-email', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const [rows] = await db.execute('SELECT 1 FROM users WHERE email = ? LIMIT 1', [email]);

//     if (rows.length > 0) {
//       return res.json({ exists: true });
//     } else {
//       return res.json({ exists: false });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred' });
//   }
// });

// // 4. Save Enrollment Data
// app.post('/save-enrollment', async (req, res) => {
//   const { email, enrollmentId, applicantType, preferredProgram, strand } = req.body;

//   try {
//     const [userRows] = await db.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);

//     if (userRows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const userId = userRows[0].id;

//     const [result] = await db.execute('INSERT INTO enrollments (user_id, enrollment_id, applicant_type, preferred_program, strand) VALUES (?, ?, ?, ?, ?)', 
//       [userId, enrollmentId, applicantType, preferredProgram, strand]);

//     return res.json({ success: true, enrollmentId });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while saving enrollment data' });
//   }
// });

// // 5. Nodemailer Transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
//   logger: true,
//   debug: true,
// });

// try {
//   await transporter.verify();
//   console.log('SMTP Server is ready to send emails.');
// } catch (error) {
//   console.error('Email server verification failed:', error);
// }

// // 6. Forgot Password Route
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Missing email address' });
//   }

//   try {
//     const [results] = await db.query('SELECT * FROM login WHERE email = ?', [email.trim()]);
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'No account found with this email address' });
//     }

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
//     const hashedToken = await bcrypt.hash(resetToken, 10);

//     await db.query('UPDATE login SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', 
//       [hashedToken, resetTokenExpiry, email.trim()]);

//     const resetUrl = `https://cvsu-bacoor-system.vercel.app/resetpassword?token=${resetToken}`;
//     const mailOptions = {
//       from: process.env.GMAIL_USER,
//       to: email,
//       subject: 'Password Reset Request',
//       html: `<h1>Password Reset</h1><p>Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, ignore this email.</p>`
//     };

//     transporter.sendMail(mailOptions, (mailErr, info) => {
//       if (mailErr) {
//         console.error('Nodemailer Error:', mailErr);
//         return res.status(500).json({ message: 'Failed to send email' });
//       }
//       console.log('Email sent successfully:', info.response);
//       res.status(200).json({ message: 'Password reset link has been sent to your email' });
//     });
//   } catch (err) {
//     console.error('Error handling forgot password:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // 7. Reset Password Route
// app.post('/resetpassword', async (req, res) => {
//   const { token, newPassword } = req.body;

//   if (!token || !newPassword) {
//     return res.status(400).json({ message: 'Missing token or new password' });
//   }

//   try {
//     const [results] = await db.query('SELECT * FROM login WHERE reset_token IS NOT NULL AND reset_token_expiry > ?', [Date.now()]);

//     if (results.length === 0) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     const user = results.find((u) => bcrypt.compareSync(token, u.reset_token));
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     const [updateResult] = await db.query('UPDATE login SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?', 
//       [hashedPassword, user.email]);

//     if (updateResult.affectedRows === 0) {
//       return res.status(500).json({ message: 'Failed to update password' });
//     }

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (err) {
//     console.error('Error resetting password:', err.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // 8. Root Route
// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Server running at cvsu-system-backend.vercel.app`);
// });
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

console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? '*****' : 'Not Set');

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
  database: 'enrollmentsystem',
  port: 4000,
  ssl: {
    rejectUnauthorized: false  }
});

const testDatabaseConnection = async () => {
  try {
    const connection = await db.getConnection(); // Test database connection
    console.log('Connected to tiDB!');
  } catch (error) {
    console.error('Database connection failed:', error.stack);
    process.exit(1); // Exit if connection fails
  }
};

testDatabaseConnection();







// ----------------------------------- Login Route
app.post('/login', async (req, res) => {
  const { login_id, password } = req.body;

  if (!login_id || !password) {
    return res.status(400).json({ message: 'Missing login ID or password' });
  }

  try {
    const [results] = await db.query('SELECT * FROM login WHERE login_id = ?', [login_id.trim()]);
    if (results.length === 0) {
      console.log('No user found for login ID:', login_id);
      return res.status(401).json({ message: 'Invalid login ID or password' });
    }

    const user = results[0];
    console.log('User fetched:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid login ID or password' });
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});







// ----------------------------------- Nodemailer Transporter
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






// ----------------------------------- Forgot Password Route
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






// ----------------------------------- Reset Password Route
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

    const user = results.find((u) => bcrypt.compareSync(token, u.reset_token));
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [updateResult] = await db.query(
      'UPDATE login SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?',
      [hashedPassword, user.email]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(500).json({ message: 'Failed to update password' });
    }

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


// ----------------------------------- Start Server
app.listen(port, () => {
  console.log(`Server running at cvsu-system-backend.vercel.app`);
});
