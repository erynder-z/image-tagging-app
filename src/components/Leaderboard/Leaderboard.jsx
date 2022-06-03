import './Leaderboard.css';
import React from 'react';
import { query, collection, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import database from '../Firebase/Firebase';

function Leaderboard() {
  const highscoresRef = collection(database, 'highscores');
  const q = query(highscoresRef, orderBy('time'));
  const [highscores] = useCollectionData(q, { idField: 'id' });

  return (
    <div className="leaderboard-container">
      <div className="bg-image" />
      <div className="leaderboard-content-container">
        <div className="leaderboard-content">
          <h1>Leaderboard</h1>
          <div className="leaderboard">
            {highscores &&
              highscores.map((highscore) => (
                <div key={highscore.id.toString()} className="leaderboard-item">
                  <div className="leaderboard-index">{highscores.indexOf(highscore) + 1}.</div>

                  <div className="leaderboard-item-name">{highscore.name}</div>
                  <div className="leaderboard-item-time">
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
      </div>
    </div>
  );
}

export default Leaderboard;
