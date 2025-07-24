import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <div className="welcome-box">
        <h1>Welcome to Career Finder</h1>
        <p className="welcome-text">
          Find the best jobs for your skills and education
        </p>
      </div>

      <div className="options-row">
        <div className="option-card">
          <h3>Find Jobs</h3>
          <p>Search for jobs that fit your school results</p>
          <Link to="/search" className="option-link">Start Search</Link>
        </div>

        <div className="option-card">
          <h3>All Jobs List</h3>
          <p>See all available jobs with pay and requirements</p>
          <Link to="/all-careers" className="option-link">View All Jobs</Link>
        </div>

        <div className="option-card">
          <h3>Job Matches</h3>
          <p>Get job ideas based on your school subjects</p>
          <Link to="/search" className="option-link">See Matches</Link>
        </div>
      </div>

      <div className="info-box">
        <h2>About Our Service</h2>
        <div className="info-content">
          <div className="info-text">
            <p>
              Career Finder helps students and job seekers find good jobs. 
              We show you jobs that match what you've studied and your grades.
            </p>
            <p>
              Whether you're still in school or looking to change jobs, 
              we help you understand different jobs and what they pay.
            </p>
          </div>
          <div className="numbers-box">
            <div className="number-item">
              <h4>500+</h4>
              <p>Different Jobs</p>
            </div>
            <div className="number-item">
              <h4>10+</h4>
              <p>Job Types</p>
            </div>
            <div className="number-item">
              <h4>Free</h4>
              <p>No Cost</p>
            </div>
          </div>
        </div>
      </div>

      <div className="start-box">
        <h2>Ready to Start?</h2>
        <p>Begin your job search now!</p>
        <Link to="/search" className="start-button">Begin Search</Link>
      </div>
    </div>
  );
}

export default Home;