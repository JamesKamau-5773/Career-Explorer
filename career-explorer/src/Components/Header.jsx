import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>CAREER EXPLORER</h1>
      <div className="header-content">
        <nav className="nav">
          <Link to="/" className="link">Home</Link>
          <Link to="/search" className="link">Search</Link>
          <Link to="/all-careers" className="link">All Careers</Link>
          <Link to="/filtered-careers" className="link">Filtered Results</Link>
          <Link to="/contacts" className="link">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;