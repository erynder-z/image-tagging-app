import './Welcome.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Welcome({ resetGame }) {
  return (
    <div className="welcome-container">
      <div className="bg-image" />
      <div className="welcome-content-container">
        <div className="welcome-content">
          <div className="welcome-body">
            <h1> Welcome to .find()</h1>
            <h3>
              A small hidden object game written in JavaScript featuring backend validation and
              online highscores!
            </h3>
          </div>
          <Link to="/startgame">
            {' '}
            <div
              className="gameBtn"
              onClick={() => {
                resetGame();
              }}
              onKeyDown={() => {
                resetGame();
              }}
              role="button"
              tabIndex={0}>
              To game
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

Welcome.propTypes = {
  resetGame: PropTypes.func.isRequired
};
