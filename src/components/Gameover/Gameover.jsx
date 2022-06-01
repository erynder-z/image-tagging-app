import './Gameover.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';
import { query, collection, getDocs, orderBy, limit } from 'firebase/firestore';
import Highscores from '../Highscores/Highscores';
import database from '../Firebase/Firebase';

function Gameover({ user, resetGame }) {
  const [formValue, setFormValue] = useState('');
  const [userGameover, setUserGameover] = useState(user);
  const [isHighscore, setIsHighscore] = useState(false);

  const updateUser = (e) => {
    e.preventDefault();
    if (formValue !== '') {
      setUserGameover((prevState) => ({
        ...prevState,
        name: formValue
      }));
    }
  };

  const updateUserObject = () => {
    const unixTimeEnd = Date.now();
    // returns date-fns Duration-object: https://date-fns.org/v2.28.0/docs/Duration
    const difference = intervalToDuration({ start: userGameover.gameStart, end: unixTimeEnd });
    setUserGameover((prevState) => ({
      ...prevState,
      gameFinish: unixTimeEnd,
      time: difference
    }));
  };

  const isUserscoreHighscore = async () => {
    const checkHighscores = (userScoreObject, onlineScoresArray) => {
      const slower = (onlineScoreObject) =>
        onlineScoreObject.gameFinish - onlineScoreObject.gameStart >
        userScoreObject.gameFinish - userScoreObject.gameStart;
      if (onlineScoresArray.some(slower)) {
        setIsHighscore(true);
      }
    };
    const getHighscores = async () => {
      const highscoresRef = collection(database, 'highscores');
      const q = query(highscoresRef, orderBy('time'), limit(10));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    };

    const checked = await getHighscores();

    return checkHighscores(userGameover, checked);
  };

  useEffect(() => {
    updateUserObject();
  }, []);

  useEffect(() => {
    if (userGameover.gameFinish !== '') {
      isUserscoreHighscore();
    }
  }, [userGameover.gameFinish]);

  const formattedMinutes = userGameover.time.minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  const formattedSeconds = userGameover.time.seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  return (
    <div className="gameover-overlay">
      <div className="gameover-body">
        <h3>Something</h3>
        <Link
          to="/"
          onClick={() => {
            resetGame();
          }}>
          Return to Main
        </Link>
        <h3>
          your time: {formattedMinutes}:{formattedSeconds}
        </h3>
        {isHighscore === true && (
          <>
            <h3>Congratulations! You got a highscore!</h3>
            <div className="highscore-input-container">
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
          </>
        )}
        {isHighscore === false && <h3>Sorry, no highscore!</h3>}
        <Highscores />
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
  }).isRequired,
  resetGame: PropTypes.func.isRequired
};
