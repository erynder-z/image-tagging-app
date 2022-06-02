import './Scoreboard.css';
import React from 'react';
import { query, collection, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import database from '../Firebase/Firebase';

function Scoreboard() {
  const highscoresRef = collection(database, 'highscores');
  const q = query(highscoresRef, orderBy('time'));
  const [highscores] = useCollectionData(q, { idField: 'id' });

  return (
    <div className="scoreboard-container">
      <h1>Scoreboard</h1>
      <div className="scoreboard">
        {highscores &&
          highscores.map((highscore) => (
            <div key={highscore.id.toString()} className="scoreboard-item">
              <div className="scoreboard-index">{highscores.indexOf(highscore) + 1}.</div>

              <div className="scoreboard-item-name">{highscore.name}</div>
              <div className="scoreboard-item-time">
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

export default Scoreboard;
