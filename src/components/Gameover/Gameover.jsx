import './Gameover.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

function Gameover({ user }) {
  const [formValue, setFormValue] = useState('');
  const [userGameover, setUserGameover] = useState(user);

  const updateUser = (e) => {
    e.preventDefault();
    if (formValue !== '') {
      setUserGameover((prevState) => ({
        ...prevState,
        name: formValue
      }));
    }
  };

  useEffect(() => {
    const unixTimeEnd = Date.now();
    const difference = differenceInSeconds(unixTimeEnd, userGameover.gameStart);
    setUserGameover((prevState) => ({
      ...prevState,
      gameFinish: unixTimeEnd,
      time: difference
    }));
  }, []);

  return (
    <div className="gameover-overlay">
      <div className="gameover-body">
        <h3>Something</h3>
        <h3>you took: {userGameover.time} Seconds</h3>
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
    gameStart: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};
