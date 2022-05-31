/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './GameImage.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import image from '../../assets/wimmelbild.jpg';
import Popupmenu from '../Popupmenu/Popupmenu';

function GameImage({ setRelativeCoordinates, checkTarget, targets, showPopup, togglePopup }) {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  /* const [showPopup, setShowPopup] = useState(false); */

  const getClickCoordinates = (e) => {
    setClickCoordinates({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setRelativeCoordinates({
      x: Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100),
      y: Math.round((e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100)
    });
  };

  return (
    <div className="game">
      <div
        className="image-container"
        onClick={(e) => {
          getClickCoordinates(e);
          togglePopup();
        }}
        role="grid"
        tabIndex={0}>
        <img src={image} alt="a wimmelbild" />
      </div>
      {showPopup && (
        <Popupmenu
          position={[clickCoordinates.x, clickCoordinates.y]}
          checkTarget={checkTarget}
          targets={targets}
        />
      )}
    </div>
  );
}

export default GameImage;

GameImage.propTypes = {
  setRelativeCoordinates: PropTypes.func.isRequired,
  checkTarget: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired, PropTypes.bool.isRequired)
  ).isRequired,
  showPopup: PropTypes.bool.isRequired,
  togglePopup: PropTypes.func.isRequired
};
