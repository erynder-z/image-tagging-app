import './Gameover.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function Gameover({ user }) {
  const [formValue, setFormValue] = useState('');
  const [userGameover, setUserGameover] = useState(user);

  const updateUser = (e) => {
    e.preventDefault();
    if (formValue !== '') {
      setUserGameover({});
    }
  };

  useEffect(() => {
    setUserGameover((prevState) => ({
      ...prevState,
      gameFinish: Date.now()
    }));
  }, []);

  return (
    <div className="gameover-overlay">
      <div className="gameover-body">
        <h3>Something</h3>
        <form
          action="input"
          onSubmit={(e) => {
            updateUser(e);
          }}>
          <input
            type="text"
            placeholder="enter your name"
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Gameover;

Gameover.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gameStart: PropTypes.number.isRequired,
    gameFinish: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};
