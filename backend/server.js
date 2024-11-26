import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5005; // Backend server port (adjust if necessary)

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',      // Replace if running on another host
  user: 'root',           // Your database username
  password: '',      // Your database password
  database: 'enrollmentdatabase', // Your database name
  port: 3306,             // Default MySQL/MariaDB port; confirm if it's different
});


db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL Server');
});

// Login Route
app.post('/login', (req, res) => {
  const { ID, password } = req.body;

  console.log('Received ID:', ID);
  console.log('Received Password:', password);

  // Validate input
  if (!ID || !password) {
    return res.status(400).json({ message: 'Missing ID or password' });
  }

  // Query to check credentials
  const query = 'SELECT * FROM login WHERE ID = ?';
db.query(query, [ID.trim()], (err, results) => {
  if (err) {
    console.error('Database query error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  if (results.length === 0) {
    console.error(`No user found for ID: ${ID}`);
    return res.status(401).json({ message: 'Invalid ID or password' });
  }

  const user = results[0];
  console.log('Database User:', user);
  console.log('Entered Password:', password);
  console.log('Stored Password:', user.password);

  if (password === user.password) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    console.error('Password mismatch');
    return res.status(401).json({ message: 'Invalid ID or password' });
  }
});

});


// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});