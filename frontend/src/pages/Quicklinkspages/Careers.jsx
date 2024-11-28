import React from 'react';
import '../QuicklinkspagesCSS/Careers.css'; // Include a CSS file for styling

const Careers = () => {
  return (
    <div className="careers-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>Cavite State University - Bacoor</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        <section className="careers-intro">
          <h2>Join Our Team!</h2>
          <p>Explore career opportunities with Cavite State University - Bacoor Campus. We are looking for talented individuals who are passionate about making a difference in education and contributing to the growth of our community.</p>
        </section>

        <section className="job-listings">
          <h3>Current Job Openings</h3>
          <ul className="job-list">
            <li>
              <h4>Assistant Professor - Computer Science</h4>
              <p>We are seeking a dedicated individual to teach and conduct research in the field of Computer Science.</p>
              <button className="apply-btn">Apply Now</button>
            </li>
            <li>
              <h4>Administrative Assistant</h4>
              <p>Provide administrative support and assist in various office tasks at the Bacoor campus.</p>
              <button className="apply-btn">Apply Now</button>
            </li>
            <li>
              <h4>Library Assistant</h4>
              <p>Assist in the daily operations of the university's library and provide excellent service to students and staff.</p>
              <button className="apply-btn">Apply Now</button>
            </li>
            <li>
              <h4>Laboratory Technician - Biology Department</h4>
              <p>Assist in the management and maintenance of lab equipment and supplies for the Biology department.</p>
              <button className="apply-btn">Apply Now</button>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Cavite State University - Bacoor. All Rights Reserved.</p>
        <nav>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default Careers;
