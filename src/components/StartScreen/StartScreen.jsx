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
      <h3>Something</h3>
      <div className="startscreen-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, repudiandae ipsam sunt
        excepturi praesentium autem veritatis natus, minima totam minus odio quas. Vitae, iusto
        explicabo.
      </div>
      <h4>Find these three guys:</h4>
      <div className="startscreen-target-overview">
        <img src={image1} alt="target1" className="target-image" />
        <img src={image2} alt="target2" className="target-image" />
        <img src={image3} alt="target3" className="target-image" />
      </div>
      <form action="input" onSubmit={toggleGameStart}>
        <button className="startBtn" type="submit">
          Start
        </button>
      </form>
    </div>
  );
}

export default StartScreen;

StartScreen.propTypes = {
  initializeGame: PropTypes.func.isRequired
};
