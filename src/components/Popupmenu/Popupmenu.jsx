import './Popupmenu.css';
import PropTypes from 'prop-types';
import React from 'react';

function Popupmenu({ position }) {
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
        <li>Char1</li>
        <li>Char2</li>
        <li>Char3</li>
      </ul>
    </div>
  );
}

export default Popupmenu;

Popupmenu.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};
