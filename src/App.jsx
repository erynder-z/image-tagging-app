import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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
  // eslint-disable-next-line no-unused-vars
  const database = getFirestore(app);
  const [user, setUser] = useState({
    name: 'Jack',
    gamStartTime: 1,
    id: 'someID'
  });

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
        <Route path="/gameimage" element={<GameImage user={user} />} />
        {/*   <Route path="/something" element={<Something />} /> */}
      </Routes>
    </div>
  );
}

export default App;
