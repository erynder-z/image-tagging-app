import './StartScreen.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartScreen({ initializeGame }) {
  const navigate = useNavigate();

  const toggleGameStart = (e) => {
    e.preventDefault();
    initializeGame();
    navigate('/gameimage');
  };

  return (
    <div className="start-screen">
      <h3>Something</h3>
      <form action="input" onSubmit={toggleGameStart}>
        {/*  <input
          type="text"
          placeholder="enter your name"
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
        /> */}

        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default StartScreen;

StartScreen.propTypes = {
  initializeGame: PropTypes.func.isRequired
};
