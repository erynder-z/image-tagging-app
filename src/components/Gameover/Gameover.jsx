import './Gameover.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';
import { query, collection, getDocs, orderBy, limit, setDoc, doc } from 'firebase/firestore';
import Highscores from '../Highscores/Highscores';
import database from '../Firebase/Firebase';

function Gameover({ user, resetGame }) {
  const [formValue, setFormValue] = useState('');
  const [userGameover, setUserGameover] = useState(user);
  const [isHighscore, setIsHighscore] = useState(false);
  const [isNameEntered, setIsNameEntered] = useState(false);

  // update user object when name is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValue !== '') {
      setUserGameover((prevState) => ({
        ...prevState,
        name: formValue
      }));
      setIsNameEntered(true);
    }
  };

  // add user finish time and convert to readable time
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

  // check if any score in the database is slower than the user score
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
      return querySnapshot.docs.map((document) => document.data());
    };
    // grab highscores from database
    const checked = await getHighscores();

    return checkHighscores(userGameover, checked);
  };

  const uploadHighscore = async (usr) => {
    await setDoc(doc(database, 'highscores', usr.id), {
      id: usr.id,
      name: usr.name,
      gameStart: usr.gameStart,
      gameFinish: usr.gameFinish,
      time: usr.time
    });
  };

  useEffect(() => {
    updateUserObject();
  }, []);

  useEffect(() => {
    if (userGameover.gameFinish !== '') {
      isUserscoreHighscore();
    }
  }, [userGameover.gameFinish]);

  useEffect(() => {
    if (isNameEntered) {
      uploadHighscore(userGameover);
      setIsHighscore(false);
      /* console.log(userGameover); */
    }
  }, [isNameEntered]);

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
                  handleSubmit(e);
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
        {isHighscore === false && isNameEntered === false && (
          <div className="no-highscore-container">
            <h3>Sorry, no highscore!</h3>
            <Highscores />
          </div>
        )}
        {isHighscore === false && isNameEntered === true && (
          <div className="no-highscore-container">
            <h3>Nice!</h3>
            <Highscores />
          </div>
        )}
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
