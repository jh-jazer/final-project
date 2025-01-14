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



app.get('/api/appointments', async (req, res) => {
  try {
    const [appointments] = await db.query('SELECT * FROM appointments');
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Define the endpoint to get available slots by date
app.get('/api/available-slots', async (req, res) => {
  const { date } = req.query;  // Get the date from the query parameters

  // Validate required field
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  try {
    // SQL query to fetch appointments for the given date
    const query = `
      SELECT 
        time_period, 
        available_slots 
      FROM appointments
      WHERE date = ?;
    `;

    // Execute query with the provided date
    const [rows] = await db.execute(query, [date]);

    // Handle case where no records are found
    if (rows.length === 0) {
      console.log(`No available slots found for date: ${date}`);
      return res.status(404).json({ error: 'No available appointments found for the given date.' });
    }

    // Initialize counters for available slots
    let morningSlots = 0;
    let afternoonSlots = 0;

    // Process each appointment record
    rows.forEach(appointment => {
      // Check if the appointment is for the morning and has available slots
      if (appointment.time_period === 'morning' && appointment.available_slots > 0) {
        morningSlots += appointment.available_slots;
      }
      // Check if the appointment is for the afternoon and has available slots
      if (appointment.time_period === 'afternoon' && appointment.available_slots > 0) {
        afternoonSlots += appointment.available_slots;
      }
    });

    // Send the available slots as the response
    res.status(200).json({
      morning: morningSlots,
      afternoon: afternoonSlots,
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Define the endpoint to update slot count for a given date and time period
app.patch('/update_slot_count', async (req, res) => {
  const { date, timePeriod } = req.body;  // Get the date and time period from the request body

  // Validate required fields
  if (!date || !timePeriod) {
    return res.status(400).json({ error: 'Date and time period are required' });
  }

  try {
    // SQL query to decrement the available slot count
    const query = `
      UPDATE appointments 
      SET available_slots = available_slots - 1
      WHERE date = ? AND time_period = ? AND available_slots > 0;
    `;

    // Execute the query with the provided date and time period
    const [result] = await db.execute(query, [date, timePeriod]);

    // Check if any rows were affected (i.e., slots were available)
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: `No available slots left for ${timePeriod} on ${date}.` });
    }

    // If the slot count was successfully decremented
    res.status(200).json({ message: `Slot count updated successfully for ${timePeriod} on ${date}.` });
  } catch (err) {
    // Handle any database errors
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Update available slots for a specific appointment
app.put('/api/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;
  const { available_slots } = req.body; // Get available_slots from the request body
  
  if (!available_slots || isNaN(available_slots)) {
    return res.status(400).json({ message: 'Available slots must be a valid number.' });
  }
  try {
    // Update the available slots in the database for the specified appointment
    const [result] = await db.query(
      'UPDATE appointments SET available_slots = ? WHERE id = ?',
      [available_slots, appointmentId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    // Send the updated appointment as the response
    const [updatedAppointment] = await db.query(
      'SELECT * FROM appointments WHERE id = ?',
      [appointmentId]
    );
    res.status(200).json(updatedAppointment[0]);
  } catch (err) {
    console.error('Error updating available slots:', err);
    res.status(500).json({ message: 'Error updating available slots' });
  }
});
app.post('/submit_appointment', async (req, res) => {
  let {
    enrollment_id,  // Enrollment ID (foreign key)
    scheduled_date, // Date of schedule
    time_period     // Time period ("morning" or "afternoon")
  } = req.body;

  // Validate that required fields are present
  if (!enrollment_id || !scheduled_date || !time_period) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Ensure time_period is either "morning" or "afternoon"
  if (!['morning', 'afternoon'].includes(time_period.toLowerCase())) {
    return res.status(400).send({ error: 'Invalid time period. Must be either "morning" or "afternoon"' });
  }

  // SQL query to insert form data into the schedule_info table
  const query = `
    REPLACE INTO applicant_schedule (
      enrollment_id, scheduled_date, time_period
    ) VALUES (?, ?, ?);
  `;

  const values = [
    enrollment_id,  // Foreign key: enrollment_id
    scheduled_date, // Date of schedule
    time_period     // Time period (either morning or afternoon)
  ];

  try {
    // Execute the query to insert data
    const [result] = await db.execute(query, values);

    console.log('Schedule data inserted successfully');
    res.status(201).json({ message: 'Schedule updated successfully!' });

  } catch (err) {
    // Catch any errors that occur during the execution of the query
    console.error('Error inserting data:', err);
    res.status(500).send({ error: 'Failed to submit schedule data' });
  }
});

// Define the endpoint to get simplified educational info by enrollment_id
app.get('/api/getSchedule', async (req, res) => {
  const { enrollment_id } = req.query;

  // Validate required field
  if (!enrollment_id) {
    return res.status(400).json({ error: 'Enrollment ID is required' });
  }

  try {
    // SQL query to fetch simplified educational information
    const query = `
      SELECT 
        enrollment_id, 
        scheduled_date, 
        time_period
      FROM applicant_schedule
      WHERE enrollment_id = ?;
    `;

    // Execute query and get results
    const [rows] = await db.execute(query, [enrollment_id]);

    // Handle case where no records are found
    if (rows.length === 0) {
      console.log(`No educational info found for enrollment_id: ${enrollment_id}`);
      return res.status(404).json({ error: 'Educational info not found' });
    }

    // Respond with the fetched data
    res.json(rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Define the endpoint to get educational info by enrollment_id
app.get('/api/getEducationInfo', async (req, res) => {
  const { enrollment_id } = req.query;

  // Validate required field
  if (!enrollment_id) {
    return res.status(400).json({ error: 'Enrollment ID is required' });
  }

  try {
    // SQL query to fetch educational information
    const query = `
      SELECT 
        enrollment_id, 
        elementarySchoolName, 
        elementarySchoolAddress, 
        elementarySchoolYearGraduated, 
        highSchoolName, 
        highSchoolAddress, 
        highSchoolYearGraduated, 
        seniorHighSchoolName, 
        seniorHighSchoolAddress, 
        seniorHighSchoolYearGraduated, 
        collegeName, 
        collegeAddress, 
        collegeYearGraduated, 
        collegeDegree
      FROM student_educational_info
      WHERE enrollment_id = ?;
    `;

    // Execute query and get results
    const [rows] = await db.execute(query, [enrollment_id]);

    // Handle case where no records are found
    if (rows.length === 0) {
      console.log(`No educational info found for enrollment_id: ${enrollment_id}`);
      return res.status(404).json({ error: 'Educational info not found' });
    }

    // Respond with the fetched data
    res.json(rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/submit_education', async (req, res) => {
  try {
    let {
      enrollment_id, 
      elementarySchoolName,
      elementarySchoolAddress,
      elementarySchoolYearGraduated,
      highSchoolName,
      highSchoolAddress,
      highSchoolYearGraduated,
      seniorHighSchoolName,
      seniorHighSchoolAddress,
      seniorHighSchoolYearGraduated,
      collegeName,
      collegeAddress,
      collegeYearGraduated,
      collegeDegree,
    } = req.body;

    // Validate required field
    if (!enrollment_id) {
      return res.status(400).json({ error: 'Missing required field: enrollment_id' });
    }

    // Ensure optional fields default to null if undefined
    elementarySchoolName = elementarySchoolName || null;
    elementarySchoolAddress = elementarySchoolAddress || null;
    elementarySchoolYearGraduated = elementarySchoolYearGraduated || null;
    highSchoolName = highSchoolName || null;
    highSchoolAddress = highSchoolAddress || null;
    highSchoolYearGraduated = highSchoolYearGraduated || null;
    seniorHighSchoolName = seniorHighSchoolName || null;
    seniorHighSchoolAddress = seniorHighSchoolAddress || null;
    seniorHighSchoolYearGraduated = seniorHighSchoolYearGraduated || null;
    collegeName = collegeName || null;
    collegeAddress = collegeAddress || null;
    collegeYearGraduated = collegeYearGraduated || null;
    collegeDegree = collegeDegree || null;

    // SQL query to insert or update educational info
    const query = `
      REPLACE INTO student_educational_info (
        enrollment_id, elementarySchoolName, elementarySchoolAddress, elementarySchoolYearGraduated,
        highSchoolName, highSchoolAddress, highSchoolYearGraduated,
        seniorHighSchoolName, seniorHighSchoolAddress, seniorHighSchoolYearGraduated,
        collegeName, collegeAddress, collegeYearGraduated, collegeDegree
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      enrollment_id,
      elementarySchoolName,
      elementarySchoolAddress,
      elementarySchoolYearGraduated,
      highSchoolName,
      highSchoolAddress,
      highSchoolYearGraduated,
      seniorHighSchoolName,
      seniorHighSchoolAddress,
      seniorHighSchoolYearGraduated,
      collegeName,
      collegeAddress,
      collegeYearGraduated,
      collegeDegree,
    ];

    // Execute the query
    const [result] = await db.execute(query, values);

    console.log('Educational info inserted/updated successfully:', result);
    res.status(201).json({ message: 'Educational info updated successfully!' });

  } catch (err) {
    console.error('Error inserting/updating educational info:', err);
    res.status(500).json({ error: 'Failed to submit educational info' });
  }
});


// Define the endpoint to get user details by enrollment_id
app.get('/api/getFamilyInfo', async (req, res) => {
  const { enrollment_id } = req.query;

  if (!enrollment_id) {
    return res.status(400).json({ error: 'Enrollment ID is required' });
  }

  try {
    const query = `
    SELECT 
      enrollment_id, 
      father_name AS fatherName, 
      father_occupation AS fatherOccupation, 
      father_contact AS fatherContact, 
      isFatherNotApplicable, 
      mother_name AS motherName, 
      mother_occupation AS motherOccupation, 
      mother_contact AS motherContact, 
      isMotherNotApplicable, 
      guardian_name AS guardianName, 
      guardian_occupation AS guardianOccupation, 
      guardian_contact AS guardianContact, 
      num_of_siblings AS numberOfSiblings, 
      family_annual_income AS familyIncome
    FROM student_family_profile
    WHERE enrollment_id = ?;
  `;
  
    
    const [rows] = await db.execute(query, [enrollment_id]);

    if (rows.length === 0) {
      console.log(`No user found for enrollment_id: ${enrollment_id}`);
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/submit_family', async (req, res) => {
  try {
    let {
      enrollment_id,  // Enrollment ID (foreign key)
      fatherName,
      fatherOccupation,
      fatherContact,
      isFatherNotApplicable,
      motherName,
      motherOccupation,
      motherContact,
      isMotherNotApplicable,
      guardianName,
      guardianOccupation,
      guardianContact,
      numberOfSiblings,
      familyIncome,
    } = req.body;

    // Validate that required fields are present
    if (!enrollment_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Ensure optional fields are not undefined, defaulting as necessary
    fatherName = fatherName || null;
    fatherOccupation = fatherOccupation || null;
    fatherContact = fatherContact || null;
    isFatherNotApplicable = isFatherNotApplicable || false;

    motherName = motherName || null;
    motherOccupation = motherOccupation || null;
    motherContact = motherContact || null;
    isMotherNotApplicable = isMotherNotApplicable || false;

    guardianName = guardianName || null;
    guardianOccupation = guardianOccupation || null;
    guardianContact = guardianContact || null;
    numberOfSiblings = numberOfSiblings || null;
    familyIncome = familyIncome || null;

    // SQL query
    const query = `
      REPLACE INTO student_family_profile (
        enrollment_id, father_name, father_occupation, father_contact, isFatherNotApplicable, 
        mother_name, mother_occupation, mother_contact, isMotherNotApplicable, 
        guardian_name, guardian_occupation, guardian_contact, 
        num_of_siblings, family_annual_income
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      enrollment_id, fatherName, fatherOccupation, fatherContact, isFatherNotApplicable,
      motherName, motherOccupation, motherContact, isMotherNotApplicable,
      guardianName, guardianOccupation, guardianContact,
      numberOfSiblings, familyIncome,
    ];

    // Execute the query
    const [result] = await db.execute(query, values);

    console.log('Family data inserted successfully:', result);
    res.status(201).json({ message: 'Family application updated successfully!' });

  } catch (err) {
    console.error('Error inserting family data:', err);
    res.status(500).json({ error: 'Failed to submit family form data' });
  }
});

// Get all Personal Info
app.get('/api/personalInfo', async (req, res) => {
  try {
    const [personalInfo] = await db.query('SELECT * FROM student_personal_info');
    res.status(200).json(personalInfo);
  } catch (err) {
    console.error('Error fetching Personal Info:', err);
    res.status(500).json({ message: 'Error fetching enrollments' });
  }
});

// Define the endpoint to get user details by enrollment_id
app.get('/api/getPersonalInfo', async (req, res) => {
  const { enrollment_id } = req.query;

  if (!enrollment_id) {
    return res.status(400).json({ error: 'Enrollment ID is required' });
  }

  try {
    const query = `
      SELECT 
        enrollment_id, fname AS givenName, lname AS familyName, mname AS middleName,
        suffix, lrn, sex, bday AS dob, civil_status AS civilStatus, religion,
        nationality, contact AS contactNumber, house_number AS houseNumber,
        street_subdivision AS streetAddress, region, province, municipality,
        zip_code AS zipCode, country
      FROM student_personal_info
      WHERE enrollment_id = ?;
    `;
    
    const [rows] = await db.execute(query, [enrollment_id]);

    if (rows.length === 0) {
      console.log(`No user found for enrollment_id: ${enrollment_id}`);
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/submit_personal', async (req, res) => {
  let {
    enrollment_id,
    givenName,
    familyName,
    middleName,
    suffix,
    lrn,
    sex,
    dob,
    civilStatus,
    religion,
    nationality,
    contactNumber,
    houseNumber,
    streetAddress,
    region,
    province,
    municipality,
    zipCode,
    country,
  } = req.body;

  // Validate required fields
  if (!enrollment_id || !givenName || !familyName || !lrn || !sex || !dob) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Set optional fields to null if undefined
  middleName = middleName || null;
  suffix = suffix || null;
  civilStatus = civilStatus || null;
  religion = religion || null;
  nationality = nationality || null;
  contactNumber = contactNumber || null;
  houseNumber = houseNumber || null;
  streetAddress = streetAddress || null;
  region = region || null;
  province = province || null;
  municipality = municipality || null;
  zipCode = zipCode || null;
  country = country || null;

  // Validate LRN format (12 digits)
  const lrnPattern = /^\d{12}$/;
  if (!lrnPattern.test(lrn)) {
    return res.status(400).send({ error: 'LRN must be a 12-digit number' });
  }

  const query = `
    REPLACE INTO student_personal_info (
      enrollment_id, fname, lname, mname, suffix, lrn, sex, bday, civil_status, religion, nationality,
      contact, house_number, street_subdivision, region, province, municipality, zip_code, country
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    enrollment_id, givenName, familyName, middleName, suffix, lrn, sex, dob,
    civilStatus, religion, nationality, contactNumber, houseNumber,
    streetAddress, region, province, municipality, zipCode, country,
  ];

  try {
    // Await the database query execution
    const [result] = await db.execute(query, values);
    
    // Log success and send a response after a short delay if necessary
    console.log('Data inserted successfully:', result);

    // Explicitly send the response after a short delay
    setTimeout(() => {
      return res.status(201).send({ message: 'Application updated successfully!' });
    }, 3000); // Optional delay of 3 seconds
  } catch (err) {
    console.error('Error inserting data:', err);
    return res.status(500).send({ error: 'Failed to submit form data' });
  }
});




app.delete('/api/enrollments_delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log("DELETE request received for ID:", id);

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    // Using raw SQL query with db.query
    const [result] = await db.query('DELETE FROM enrollments WHERE id = ?', [id]);

    // Check if any rows were affected (deleted)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ message: 'Error deleting enrollment' });
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

// Get all enrollee
app.get('/api/enrollee', async (req, res) => {
  try {
    const [enrollments] = await db.query('SELECT * FROM enrollments');
    res.status(200).json(enrollments);
  } catch (err) {
    console.error('Error fetching enrollments:', err);
    res.status(500).json({ message: 'Error fetching enr0llments' });
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



app.get('/api/getEmployeeInfo', async (req, res) => {
  let { employee_id } = req.query;

  // Log incoming request data for debugging
  console.log("Received Employee ID:", employee_id);

  // Ensure employee_id is correctly parsed as an integer
  employee_id = parseInt(employee_id, 10);

  // Validate employee_id
  if (!Number.isInteger(employee_id) || employee_id <= 0) {
    return res.status(400).json({ error: 'A valid Employee ID is required as a positive integer' });
  }

  try {
    const query = `
      SELECT 
        full_name,
        employee_type,
        email,
        phone_number,
        address,
        dob,
        emergency_contact,
        status
      FROM employees
      WHERE employee_id = ?;
    `;

    const [rows] = await db.execute(query, [employee_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Employee info not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

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

//get all applciation
app.get('/api/application', async (req, res) => {
  try {
    const [application] = await db.query('SELECT * FROM application');
    res.status(200).json(application);
  } catch (err) {
    console.error('Error fetching application:', err);
    res.status(500).json({ message: 'Error fetching application' });
  }
})

app.get('/api/otherInfo/:enrollment_id', async (req, res) => {
  const {enrollment_id} = req.params;
  try {
    const [personalInfo] = await db.query('SELECT * FROM student_personal_info WHERE enrollment_id = ?', [enrollment_id]);
    const [familyBackground] = await db.query('SELECT * FROM student_family_profile WHERE enrollment_id = ?', [enrollment_id]);
    const [educationalBackground] = await db.query('SELECT * FROM student_educational_info WHERE enrollment_id = ?', [enrollment_id]);

    res.status(200).json({
      personalInfo,
      familyBackground,
      educationalBackground,
    });
  } catch (err) {
    console.error('Error fetching other info:', err);
    res.status(500).json({ message: 'Error fetching other info' });
  }
});

app.get('/api/numberOfPeoplePerRoles', async (req, res )=> {
  try{
    const [numOfApplicants] = await db.query('select COUNT(*) from enrollments');
    const [numOfStudents] = await db.query('select COUNT(*) from students');
    const [numOfEmployees] = await db.query('select COUNT(*) from employees');
    res.status(200).json({
      numOfApplicants,
      numOfStudents,
      numOfEmployees
    })
  }
  catch (error){
    console.error('Error fetching number of people per role:', error);
    res.status(500).json({ message: 'Error fetching number of people per role' });
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
    const [studentResults] = await db.query('SELECT * FROM students inner join enrollments on students.enrollment_id = enrollments.enrollment_id WHERE student_id = ?', [login_id]);

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
            program: student.preferred_program,
            enrollment_id: student.enrollment_id,
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


app.get('/api/getGrades/:enrollmentId/:courseCode', async (req, res) => {
  const { enrollmentId, courseCode } = req.params;

  try {
    const [grade] = await db.query(
      'SELECT * FROM student_courses INNER JOIN courses ON course_id = courses.id WHERE student_id = ? AND courses.code = ?',
      [enrollmentId, courseCode]
    );

    if (grade.length > 0) {
      res.status(200).json(grade);
    } else {
      res.status(404).json({ message: 'No grades found for this enrollment ID and course code.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching grades.' });
  }
});





app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(port, () => {
  console.log(`Server running locally at http://localhost:${port}`);
});
