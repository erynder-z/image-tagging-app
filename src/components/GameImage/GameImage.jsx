/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './GameImage.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiExternalLink } from 'react-icons/fi';
import image from '../../assets/wimmelbild.jpg';
import Popupmenu from '../Popupmenu/Popupmenu';

function GameImage({ setRelativeCoordinates, checkTarget, targets, showPopup, togglePopup }) {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

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
      <div className="artist-credits">
        <p>Image created by:</p>

        <a href="https://www.reddit.com/user/IdleMind81/" target="_blank" rel="noopener noreferrer">
          <h2>
            IdleMind81 <FiExternalLink size="1rem" />
          </h2>
        </a>
        <p>and</p>

        <a href="https://www.reddit.com/user/gus_morais" target="_blank" rel="noopener noreferrer">
          <h2>
            Gus Morais <FiExternalLink size="1rem" />
          </h2>
        </a>
        <p>Original Image:</p>
        <a
          href="https://www.reddit.com/r/wimmelbilder/comments/oiabtq/a_scene_from_a_phish_concert/"
          target="_blank"
          rel="noopener noreferrer">
          <h2>
            &quot;A scene from a Phish concert&quot; <FiExternalLink size="1rem" />
          </h2>
        </a>
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
