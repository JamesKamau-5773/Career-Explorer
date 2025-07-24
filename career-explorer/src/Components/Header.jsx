import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>CAREER EXPLORER</h1>
      <div className="header-content">
        <nav className="nav">
          <Link to="/" className="link">Home</Link>
          <Link to="/search" className="link">Search</Link>
          <Link to="/careers" className="link">All Careers</Link>
          <Link to="/contact" className="link">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;