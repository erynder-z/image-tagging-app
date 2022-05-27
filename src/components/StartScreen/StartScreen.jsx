import './StartScreen.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartScreen({ saveName }) {
  const [formValue, setFormValue] = useState('');
  const navigate = useNavigate();

  const passName = (e) => {
    e.preventDefault();
    if (formValue !== '') {
      saveName(formValue);
      navigate('/gameimage');
    }
  };

  return (
    <div className="start-screen">
      <h3>Something</h3>
      <form action="input" onSubmit={passName}>
        <input
          type="text"
          placeholder="enter your name"
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
        />

        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default StartScreen;

StartScreen.propTypes = {
  saveName: PropTypes.func.isRequired
};
