/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './GameImage.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import image from '../../assets/wimmelbild.jpg';
import Popupmenu from '../Popupmenu/Popupmenu';

function GameImage({ setRelativeX, setRelativeY, checkTarget }) {
  const [clickX, setClickX] = useState();
  const [clickY, setClickY] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const getClickCoordinates = (e) => {
    setClickX(e.nativeEvent.offsetX);
    setClickY(e.nativeEvent.offsetY);
    setRelativeX(Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100));
    setRelativeY(Math.round((e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100));
  };

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="game">
      <div
        className="image-container"
        onClick={(e) => {
          getClickCoordinates(e);
          handleClick();
        }}
        role="grid"
        tabIndex={0}>
        <img src={image} alt="a wimmelbild" />
      </div>
      {showPopup && <Popupmenu position={[clickX, clickY]} checkTarget={checkTarget} />}
    </div>
  );
}

export default GameImage;

GameImage.propTypes = {
  setRelativeX: PropTypes.func.isRequired,
  setRelativeY: PropTypes.func.isRequired,
  checkTarget: PropTypes.func.isRequired
};
