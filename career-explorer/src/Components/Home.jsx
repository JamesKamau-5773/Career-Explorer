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

     