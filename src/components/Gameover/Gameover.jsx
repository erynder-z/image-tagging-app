import './Gameover.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';
import { query, collection, getDocs, orderBy, limit, setDoc, doc } from 'firebase/firestore';
import { FiUploadCloud } from 'react-icons/fi';
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

    if (formValue !== '' && formValue.length <= 20) {
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
    // grab highscores from database
    const getHighscores = async () => {
      const highscoresRef = collection(database, 'highscores');
      const q = query(highscoresRef, orderBy('time'), limit(10));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((document) => document.data());
    };

    const fetchedHighscores = await getHighscores();

    return checkHighscores(userGameover, fetchedHighscores);
  };
  // upload highscore to database
  const uploadHighscore = async (usr) => {
    await setDoc(doc(database, 'highscores', usr.id), {
      id: usr.id,
      name: usr.name,
      gameStart: usr.gameStart,
      gameFinish: usr.gameFinish,
      time: usr.time
    });
  };

  // update user object on component mount
  useEffect(() => {
    updateUserObject();
  }, []);

  // run check for user highscore gamefinish time has been updated
  useEffect(() => {
    if (userGameover.gameFinish !== '') {
      isUserscoreHighscore();
    }
  }, [userGameover.gameFinish]);

  // run upload highscore function when user object has been updated with submitted user name
  useEffect(() => {
    if (isNameEntered) {
      uploadHighscore(userGameover);
      setIsHighscore(false);
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
        <h3>
          You finished in {formattedMinutes}:{formattedSeconds}!
        </h3>
        {isHighscore === true && (
          <>
            <h4>Congratulations! You made it into the Top 10!</h4>
            <div className="highscore-input-container">
              <form
                action="input"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}>
                <input
                  type="text"
                  placeholder="enter your name (max. 20 characters)"
                  value={formValue}
                  onChange={(e) => {
                    setFormValue(e.target.value);
                  }}
                />

                <button type="submit">
                  Submit&nbsp; <FiUploadCloud />
                </button>
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
        )}{' '}
        <div
          className="returnBtn"
          onClick={() => {
            resetGame();
          }}
          onKeyDown={() => {
            resetGame();
          }}
          role="button"
          tabIndex={0}>
          <Link to="/">Return to welcome screen</Link>
        </div>
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
