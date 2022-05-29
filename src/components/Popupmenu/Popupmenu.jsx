/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Popupmenu.css';
import PropTypes from 'prop-types';
import React from 'react';
import image1 from '../../assets/target1.png';
import image2 from '../../assets/target2.png';
import image3 from '../../assets/target3.png';

function Popupmenu({ position, checkTarget }) {
  const posX = position[0];
  const posY = position[1];

  return (
    <div
      className="popup-menu"
      style={{
        display: 'flex',
        top: `${posY + 40}px`,
        left: `${posX + 25}px `
      }}>
      <ul>
        <li>
          <img
            src={image1}
            alt="target1"
            onClick={() => {
              checkTarget('target1');
            }}
          />
        </li>
        <li>
          <img
            src={image2}
            alt="target2"
            onClick={() => {
              checkTarget('target2');
            }}
          />
        </li>
        <li>
          <img
            src={image3}
            alt="target3"
            onClick={() => {
              checkTarget('target3');
            }}
          />
        </li>
      </ul>
    </div>
  );
}

export default Popupmenu;

Popupmenu.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkTarget: PropTypes.func.isRequired
};
