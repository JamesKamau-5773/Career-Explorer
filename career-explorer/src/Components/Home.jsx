import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <div className="welcome-box">
        <h1>Welcome to Career Finder</h1>
        <p className="welcome-text">
          Find the best careers for your skills and education
        </p>
      </div>

      <div className="options-row">
        <div className="option-card">
          <h3>Find Careers</h3>
          <p>Search for careers that fit your school results</p>
        </div>

        <div className="option-card">
          <h3>All Careers List</h3>
          <p>See all available careers with pay and requirements</p>
        </div>

        <div className="option-card">
          <h3>Career Matches</h3>
          <p>Get career ideas based on your school subjects</p>
        </div>
      </div>

      <div className="info-box">
        <h2>About Our Service</h2>
        <div className="info-content">
          <div className="info-text">
            <p>
              Career Finder helps students and career seekers find good careers.
              We show you careers that match what you've studied and your grades.
            </p>
            <p>
              Whether you're still in school or looking to change careers,
              we help you understand different careers and what they pay.
            </p>
          </div>
        </div>
      </div>

      <div className="start-box">
        <h2>Ready to Start?</h2>
        <p>Begin your career search now!</p>
      </div>
    </div>
  );
}

export default Home;