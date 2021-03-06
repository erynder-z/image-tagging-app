import './Highscores.css';
import React from 'react';
import { query, collection, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import database from '../Firebase/Firebase';

function Highscores() {
  const highscoresRef = collection(database, 'highscores');
  const q = query(highscoresRef, orderBy('time'), limit(10));
  const [highscores] = useCollectionData(q, { idField: 'id' });

  return (
    <div className="highscores-container">
      <div className="highscore-container">
        {highscores &&
          highscores.map((highscore) => (
            <div key={highscore.id.toString()} className="highscore-item">
              <div className="highscore-item-name">{highscore.name}</div>
              <div className="highscore-item-time">
                {highscore.time.minutes.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })}
                :
                {highscore.time.seconds.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Highscores;
