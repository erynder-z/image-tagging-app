/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Popupmenu.css';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import image1 from '../../assets/target1.png';
import image2 from '../../assets/target2.png';
import image3 from '../../assets/target3.png';

function Popupmenu({ position, checkTarget, targets }) {
  const highlighter = useRef();
  const posX = position[0];
  const posY = position[1];

  return (
    <div className="popup-container">
      <div
        className="highlighter"
        ref={highlighter}
        style={{
          top: `calc(${posY - 25}px + 10vh)`,
          left: `${posX - 24}px`
        }}
      />
      <div
        className="popup-menu"
        style={{
          display: 'flex',
          top: `${posY + 140}px`,
          left: `${posX - 28.5}px `
        }}>
        <ul>
          <li className={`${targets[0].found ? 'popup-found' : null}`}>
            <img
              src={image1}
              alt="target1"
              onClick={
                !targets[0].found
                  ? () => {
                      checkTarget('target1');
                    }
                  : null
              }
            />
          </li>
          <li className={`${targets[1].found ? 'popup-found' : null}`}>
            <img
              src={image2}
              alt="target2"
              onClick={
                !targets[1].found
                  ? () => {
                      checkTarget('target2');
                    }
                  : null
              }
            />
          </li>
          <li className={`${targets[2].found ? 'popup-found' : null}`}>
            <img
              src={image3}
              alt="target3"
              onClick={
                !targets[2].found
                  ? () => {
                      checkTarget('target3');
                    }
                  : null
              }
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Popupmenu;

Popupmenu.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkTarget: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired, PropTypes.bool.isRequired)
  ).isRequired
};
