import React from 'react';

const Form = () => {
  return (
    <div className="form-page">
      {/* Header Section */}
      <header>
      <div className="logo">
          <h1>Cavite State University - Bacoor</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
          </ul>
        </nav>
        <h1>Cavite State University - Bacoor Campus</h1>
        <h2>Student Forms</h2>
        <p>Download the forms you need below:</p>
      </header>

      {/* Main Content Section */}
      <main>
        <section className="form-links">
          <h3>Available Forms:</h3>
          <ul>
            <li>
              <a href="/forms/ADDING_DROPPING_CHANGING_OF_SUBJECT_SCHEDULE.pdf" download>
                ADDING/DROPPING/CHANGING OF SUBJECT/SCHEDULE Form
              </a>
            </li>
            <li>
              <a href="/forms/GRADING_SHEET.pdf" download>
                GRADING SHEET Form
              </a>
            </li>
            <li>
              <a href="/forms/LETTER_OF_INTENT.pdf" download>
                LETTER OF INTENT Form
              </a>
            </li>
            <li>
              <a href="/forms/PRE_REGISTRATION_FORM.pdf" download>
                PRE-REGISTRATION FORM
              </a>
            </li>
            <li>
              <a href="/forms/STUDENT_INFORMATION_SHEET.pdf" download>
                STUDENT INFORMATION SHEET
              </a>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 Cavite State University - Bacoor. All Rights Reserved.</p>
        <p>For assistance, please contact the student services department.</p>
      </footer>

      {/* Styles (you can move this to a CSS file if needed) */}
      <style jsx>{`
        .form-page {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        header {
          text-align: center;
          margin-bottom: 40px;
        }
        header h1 {
          font-size: 2.5em;
          color: #2c3e50;
        }
        header h2 {
          font-size: 1.5em;
          color: #34495e;
        }
        header p {
          font-size: 1.1em;
          color: #7f8c8d;
        }
        main {
          margin-bottom: 40px;
        }
        .form-links ul {
          list-style-type: none;
          padding: 0;
        }
        .form-links li {
          margin: 10px 0;
        }
        .form-links a {
          text-decoration: none;
          color: #2980b9;
          font-size: 1.2em;
        }
        .form-links a:hover {
          text-decoration: underline;
        }
        footer {
          text-align: center;
          padding: 10px 0;
          background-color: #ecf0f1;
          font-size: 1em;
        }
        footer p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default Form;
