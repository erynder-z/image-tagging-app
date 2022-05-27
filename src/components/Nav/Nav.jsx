import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav">
      <h3>Something</h3>
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/startgame">Play</Link>
      </ul>
    </nav>
  );
}

export default Nav;
