import './GameImage.css';
import React, { useEffect, useState } from 'react';
import image from '../../assets/wimmelbild.jpg';

function GameImage() {
  const [coordinateX, setCoordinateX] = useState(0);
  const [coordinateY, setCoordinateY] = useState(0);

  const getCoordinates = (e) => {
    setCoordinateX(e.nativeEvent.offsetX);
    setCoordinateY(e.nativeEvent.offsetY);
  };

  useEffect(() => {
    console.log(`"X: " ${coordinateX} "//" "Y: " ${coordinateY}`);
  }, [coordinateX]);

  return (
    <div className="game">
      <div
        className="image-container"
        onClick={(e) => {
          getCoordinates(e);
        }}
        onKeyDown={(e) => {
          getCoordinates(e);
        }}
        role="grid"
        tabIndex={0}>
        <img src={image} alt="a wimmelbild" />
      </div>
    </div>
  );
}

export default GameImage;
