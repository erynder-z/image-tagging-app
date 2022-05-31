import './Gameover.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';

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
    // returns date-fns Duration-object: https://date-fns.org/v2.28.0/docs/Duration
    const difference = intervalToDuration({ start: userGameover.gameStart, end: unixTimeEnd });
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
        <h3>
          you took: {userGameover.time.minutes}:{userGameover.time.seconds}:
          {userGameover.time.milliseconds}
        </h3>
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
    gameFinish: PropTypes.string.isRequired,
    time: PropTypes.shape({
      minutes: PropTypes.string.isRequired,
      seconds: PropTypes.string.isRequired
    }),
    id: PropTypes.string.isRequired
  }).isRequired
};
