/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './GameImage.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import image from '../../assets/wimmelbild.jpg';
import Popupmenu from '../Popupmenu/Popupmenu';
import Highlighter from '../Highlighter/Highlighter';

function GameImage({ setRelativeCoordinates, checkTarget }) {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);

  const getClickCoordinates = (e) => {
    setClickCoordinates({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setRelativeCoordinates({
      x: Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100),
      y: Math.round((e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100)
    });
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
      <Highlighter />
      {showPopup && (
        <Popupmenu position={[clickCoordinates.x, clickCoordinates.y]} checkTarget={checkTarget} />
      )}
    </div>
  );
}

export default GameImage;

GameImage.propTypes = {
  setRelativeCoordinates: PropTypes.func.isRequired,
  checkTarget: PropTypes.func.isRequired
};
