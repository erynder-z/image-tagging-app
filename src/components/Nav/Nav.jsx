import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import image1 from '../../assets/target1.png';
import image2 from '../../assets/target2.png';
import image3 from '../../assets/target3.png';
import Timer from '../Timer/Timer';

function Nav({ targets, isGameActive, mustResetTimer }) {
  return (
    <nav className="nav">
      <div className="target-overview">
        <img src={image1} alt="target1" className={` ${targets[0].found ? 'found' : null}`} />
        <img src={image2} alt="target2" className={` ${targets[1].found ? 'found' : null}`} />
        <img src={image3} alt="target3" className={` ${targets[2].found ? 'found' : null}`} />
      </div>
      <Timer isGameActive={isGameActive} mustResetTimer={mustResetTimer} />
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/startgame">Play</Link>
      </ul>
    </nav>
  );
}

export default Nav;

Nav.propTypes = {
  targets: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired, PropTypes.bool.isRequired)
  ).isRequired,
  isGameActive: PropTypes.bool.isRequired,
  mustResetTimer: PropTypes.bool.isRequired
};
