import './StartScreen.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/target1.png';
import image2 from '../../assets/target2.png';
import image3 from '../../assets/target3.png';

function StartScreen({ initializeGame }) {
  const navigate = useNavigate();

  const toggleGameStart = (e) => {
    e.preventDefault();
    initializeGame();
    navigate('/gameimage');
  };

  return (
    <div className="startscreen-container">
      <div className="bg-image" />
      <div className="startscreen-content-container">
        <div className="startscreen-content">
          <h1>How to play</h1>
          <h3>Find these three guys:</h3>
          <div className="startscreen-target-overview">
            <img src={image1} alt="target1" className="target-image" />
            <img src={image2} alt="target2" className="target-image" />
            <img src={image3} alt="target3" className="target-image" />
          </div>
          <h3>Are you quick enough to make it into the top 10??? </h3>
          <form action="input" onSubmit={toggleGameStart}>
            <button className="startBtn" type="submit">
              Start
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;

StartScreen.propTypes = {
  initializeGame: PropTypes.func.isRequired
};
