/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './GameImage.css';
import React, { useEffect, useState, useRef } from 'react';
import image from '../../assets/wimmelbild.jpg';
import Popupmenu from '../Popupmenu/Popupmenu';

function GameImage() {
  const highlighter = useRef();
  const [clickX, setClickX] = useState();
  const [clickY, setClickY] = useState();
  const [targetX, setTargetX] = useState();
  const [targetY, setTargetY] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const target = [32, 48, 36, 51];

  const getCoordinates = (e) => {
    const getClickX = e.nativeEvent.offsetX;
    const getClickY = e.nativeEvent.offsetY;
    const getTargetX = Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100);
    const getTargetY = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    setClickX(getClickX);
    setClickY(getClickY);
    setTargetX(getTargetX);
    setTargetY(getTargetY);
  };

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  const checkTarget = (targetX1, targetY1, targetX2, targetY2, proposedX, proposedY) => {
    if (
      proposedX >= targetX1 &&
      proposedX <= targetX2 &&
      proposedY >= targetY1 &&
      proposedY <= targetY2
    ) {
      console.log('true');
    } else {
      console.log('false');
    }
  };

  useEffect(() => {
    if (clickX && clickY) {
      highlighter.current.style.display = 'block';
      checkTarget(target[0], target[1], target[2], target[3], targetX, targetY);
    }
  }, [clickX]);

  return (
    <div className="game">
      <div
        className="image-container"
        onClick={(e) => {
          getCoordinates(e);
          handleClick();
        }}
        onKeyDown={(e) => {
          getCoordinates(e);
        }}
        role="grid"
        tabIndex={0}>
        <img src={image} alt="a wimmelbild" />
        <div
          className="highlighter"
          ref={highlighter}
          style={{
            top: `calc(${clickY}px + 10vh - 20px)`,
            left: `${clickX - 20}px`
          }}
        />
      </div>
      {showPopup && <Popupmenu position={[clickX, clickY]} />}
    </div>
  );
}

export default GameImage;
