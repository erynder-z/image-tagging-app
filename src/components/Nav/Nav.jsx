import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';
import image1 from '../../assets/target1.png';
import image2 from '../../assets/target2.png';
import image3 from '../../assets/target3.png';
import Timer from '../Timer/Timer';

function Nav({ targets, isGameActive, toggleResetTimer, foundEffect, mistakeEffect, resetGame }) {
  return (
    <nav
      className={`nav ${foundEffect ? 'foundEffect' : null} ${
        mistakeEffect ? 'mistakeEffect' : null
      }`}>
      {isGameActive && (
        <>
          <div className="target-overview">
            <img src={image1} alt="target1" className={` ${targets[0].found ? 'found' : null}`} />
            <img src={image2} alt="target2" className={` ${targets[1].found ? 'found' : null}`} />
            <img src={image3} alt="target3" className={` ${targets[2].found ? 'found' : null}`} />
          </div>
          <Timer isGameActive={isGameActive} toggleResetTimer={toggleResetTimer} />
        </>
      )}
      {!isGameActive && (
        <div className="logo">
          .find(
          <BiSearchAlt />)
        </div>
      )}
      <ul className="nav-links">
        <Link
          to="/startgame"
          onClick={() => {
            resetGame();
          }}>
          Play
        </Link>
        <Link
          to="/leaderboard"
          onClick={() => {
            resetGame();
          }}>
          Leaderboard
        </Link>
        <Link
          to="/about"
          onClick={() => {
            resetGame();
          }}>
          About
        </Link>
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
  toggleResetTimer: PropTypes.bool.isRequired,
  foundEffect: PropTypes.bool.isRequired,
  mistakeEffect: PropTypes.bool.isRequired,
  resetGame: PropTypes.func.isRequired
};
