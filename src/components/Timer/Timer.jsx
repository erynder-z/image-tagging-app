import './Timer.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer({ isGameActive }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const toggleTimer = () => {
    if (isGameActive === true) {
      setRunning(true);
    } else if (isGameActive === false) {
      setRunning(false);
    }
  };

  useEffect(() => {
    toggleTimer();
  }, [isGameActive]);

  return (
    <div className="timer">
      <div className="numbers">
        <span>{`0${Math.floor((time / 60000) % 60)}`.slice(-2)}:</span>
        <span>{`0${Math.floor((time / 1000) % 60)}`.slice(-2)}</span>
      </div>
    </div>
  );
}

export default Timer;

Timer.propTypes = {
  isGameActive: PropTypes.bool.isRequired
};
