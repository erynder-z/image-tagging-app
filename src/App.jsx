import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import uniqid from 'uniqid';
import Nav from './components/Nav/Nav';
import StartScreen from './components/StartScreen/StartScreen';
import Welcome from './components/Welcome/Welcome';
import GameImage from './components/GameImage/GameImage';
import database from './components/Firebase/Firebase';
import Gameover from './components/Gameover/Gameover';
import About from './components/About/About';
import Leaderboard from './components/Leaderboard/Leaderboard';

function App() {
  const [user, setUser] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [toggleResetTimer, setToggleResetTimer] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [foundEffect, setFoundEffect] = useState(false);
  const [mistakeEffect, setMistakeEffect] = useState(false);
  const [relativeCoordinates, setRelativeCoordinates] = useState({ x: 0, y: 0 });
  const [targets, setTargets] = useState([
    {
      name: 'target1',
      found: false
    },
    {
      name: 'target2',
      found: false
    },
    {
      name: 'target3',
      found: false
    }
  ]);

  const initializeGame = () => {
    setUser({
      name: '',
      gameStart: Date.now(),
      gameFinish: '',
      time: { minutes: '', seconds: '' },
      id: uniqid()
    });
    setIsGameActive(true);
  };

  const resetGame = () => {
    setUser({});
    setTargets([
      {
        name: 'target1',
        found: false
      },
      {
        name: 'target2',
        found: false
      },
      {
        name: 'target3',
        found: false
      }
    ]);
    setGameOver(false);
    setIsGameActive(false);
    setToggleResetTimer(!toggleResetTimer);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleFoundEffect = () => {
    setFoundEffect(true);
    setTimeout(() => {
      setFoundEffect(false);
    }, 250);
  };

  const toggleMistakeEffect = () => {
    setMistakeEffect(true);
    setTimeout(() => {
      setMistakeEffect(false);
    }, 250);
  };

  const markFound = (target) => {
    setTargets(
      [...targets].map((object) => {
        if (object.name === target.name) {
          return {
            ...object,
            found: true
          };
        }
        return object;
      })
    );
  };

  const gameOverCheck = () => targets.every((object) => object.found === true);

  // check if user clicked on a target
  const checkTarget = async (proposedTarget) => {
    // grab data from database
    const getData = async () => {
      const docRef = doc(database, 'targets', proposedTarget);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().coords;
      }
      console.log('No such document!');
      return null;
    };

    // get the target, the user chose from the popup menu
    const target = targets.find((item) => item.name === proposedTarget);
    const targetCoords = await getData();

    // define coordinates of an imaginary rectangle around the target
    const targetX1 = targetCoords[0];
    const targetY1 = targetCoords[1];
    const targetX2 = targetCoords[2];
    const targetY2 = targetCoords[3];

    // check if user click coordinates are inside the imaginary rectangle
    if (
      relativeCoordinates.x >= targetX1 &&
      relativeCoordinates.x <= targetX2 &&
      relativeCoordinates.y >= targetY1 &&
      relativeCoordinates.y <= targetY2
    ) {
      toggleFoundEffect();
      markFound(target);
    } else {
      toggleMistakeEffect();
    }
    togglePopup();
  };

  useEffect(() => {
    // check for gameover whenever the user found a target
    setGameOver(gameOverCheck());
  }, [targets]);

  useEffect(() => {
    // stop timer when gameOver is toggled
    setIsGameActive(false);
  }, [gameOver]);

  return (
    <div className="App">
      <Nav
        targets={targets}
        isGameActive={isGameActive}
        toggleResetTimer={toggleResetTimer}
        foundEffect={foundEffect}
        mistakeEffect={mistakeEffect}
        resetGame={resetGame}
      />
      <Routes>
        <Route path="/" element={<Welcome resetGame={resetGame} />} />
        <Route path="/startgame" element={<StartScreen initializeGame={initializeGame} />} />
        <Route
          path="/gameimage"
          element={
            !user.id ? (
              <Navigate replace to="/" />
            ) : (
              <GameImage
                targets={targets}
                setRelativeCoordinates={setRelativeCoordinates}
                checkTarget={checkTarget}
                showPopup={showPopup}
                togglePopup={togglePopup}
              />
            )
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      {gameOver && <Gameover user={user} resetGame={resetGame} />}
    </div>
  );
}

export default App;
