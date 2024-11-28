import React from 'react';
import '../QuicklinkspagesCSS/Quicklinkpages.css'
// Header Component
const Header = () => (
  <header>
    <nav>
      <h1>Cavite State University - Bacoor</h1>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  </header>
);

// Footer Component
const Footer = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} Cavite State University - Bacoor</p>
    <p>All rights reserved.</p>
  </footer>
);

// Academic Programs Page Component
const AcademicProg = () => {
  return (
    <div className="academic-programs-page">
      <Header />
      <main>
        <section className="undergraduate-programs">
          <h2>Undergraduate Programs</h2>
          <ul>
            <li>Bachelor of Science in Computer Science</li>
            <li>Bachelor of Science in Information Technology</li>
            <li>Bachelor of Science in Business Administration</li>
            <li>Bachelor of Science in Engineering</li>
            <li>Bachelor of Science in Agriculture</li>
            {/* Add more undergraduate programs as needed */}
          </ul>
        </section>

        <section className="non-degree-programs">
          <h2>Non-Degree Programs</h2>
          <ul>
            <li>Technical Vocational Courses</li>
            <li>Certificate Programs in IT</li>
            <li>Short-term Business Courses</li>
            <li>Online Certificate Programs</li>
            {/* Add more non-degree programs as needed */}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AcademicProg;
