import './GameImage.css';
import React from 'react';
import image from '../../assets/wimmelbild.jpg';

function GameImage() {
  return (
    <div className="game">
      <div className="image-container">
        <img src={image} alt="a wimmelbild" />
      </div>
    </div>
  );
}

export default GameImage;
