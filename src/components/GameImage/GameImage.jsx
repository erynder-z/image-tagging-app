/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './GameImage.css';
import React, { useEffect, useState, useRef } from 'react';
import image from '../../assets/wimmelbild.jpg';

function GameImage() {
  const highlightBox = useRef();
  const [coordinateX, setCoordinateX] = useState();
  const [coordinateY, setCoordinateY] = useState();

  const getCoordinates = (e) => {
    setCoordinateX(e.nativeEvent.offsetX);
    setCoordinateY(e.nativeEvent.offsetY);
  };

  useEffect(() => {
    if (coordinateX && coordinateY) {
      highlightBox.current.style.display = 'block';
    }
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
        <div
          className="highlightBox"
          ref={highlightBox}
          style={{ top: `calc(${coordinateY}px + 10vh - 25px)`, left: `${coordinateX - 25}px` }}
        />
      </div>
    </div>
  );
}

export default GameImage;
