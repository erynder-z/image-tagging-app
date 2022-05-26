import './App.css';
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

  return <div className="App">Something</div>;
}

export default App;
