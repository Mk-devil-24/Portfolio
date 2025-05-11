import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css'; // make sure this import is correct

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navigation">
      <Link to="/" className={currentPath === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link to="/about" className={currentPath === '/about' ? 'active' : ''}>
        About
      </Link>
      <Link to="/projects" className={currentPath === '/projects' ? 'active' : ''}>
        Projects
      </Link>
      <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>
        Contact
      </Link>
    </nav>
  );
}

export default Navigation;
