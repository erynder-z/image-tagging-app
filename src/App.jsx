import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Nav from './components/Nav/Nav';
import StartScreen from './components/StartScreen/StartScreen';
import Welcome from './components/Welcome/Welcome';
import GameImage from './components/GameImage/GameImage';

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCqCILWNPOCj8Vs28TnwOBr0q4Nn8fKaaM',
    authDomain: 'photo-tagging-app-b49b6.firebaseapp.com',
    projectId: 'photo-tagging-app-b49b6',
    storageBucket: 'photo-tagging-app-b49b6.appspot.com',
    messagingSenderId: '734066780108',
    appId: '1:734066780108:web:f14d48eb1a47e687bb9f69'
  };

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);
  const [user, setUser] = useState({
    name: 'Jack',
    gamStartTime: 1,
    id: 'someID'
  });
  const [relativeX, setRelativeX] = useState();
  const [relativeY, setRelativeY] = useState();
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

  const checkTarget = async (proposedTarget) => {
    const getData = async () => {
      const docRef = doc(database, 'targets', proposedTarget);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().coords;
      }
      console.log('No such document!');
      return null;
    };

    const target = targets.find((item) => item.name === proposedTarget);
    const targetCoords = await getData();

    const targetX1 = targetCoords[0];
    const targetY1 = targetCoords[1];
    const targetX2 = targetCoords[2];
    const targetY2 = targetCoords[3];

    if (
      relativeX >= targetX1 &&
      relativeX <= targetX2 &&
      relativeY >= targetY1 &&
      relativeY <= targetY2
    ) {
      console.log(`found ${target.name}`);
      markFound(target);
    } else {
      console.log('false');
    }
  };

  const saveName = (formValue) => {
    setUser({
      name: formValue,
      gamStartTime: Date.now(),
      id: 'someID'
    });
  };

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/startgame"
          element={
            <StartScreen
              user={user}
              saveName={(formValue) => {
                saveName(formValue);
              }}
            />
          }
        />
        <Route
          path="/gameimage"
          element={
            <GameImage
              user={user}
              setRelativeX={setRelativeX}
              setRelativeY={setRelativeY}
              checkTarget={checkTarget}
            />
          }
        />
        {/*   <Route path="/something" element={<Something />} /> */}
      </Routes>
    </div>
  );
}

export default App;
