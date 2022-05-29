/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './GameImage.css';
import React, { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import image from '../../assets/wimmelbild.jpg';
import Popupmenu from '../Popupmenu/Popupmenu';

function GameImage({ database }) {
  const highlighter = useRef();
  const [clickX, setClickX] = useState();
  const [clickY, setClickY] = useState();
  const [targetX, setTargetX] = useState();
  const [targetY, setTargetY] = useState();
  const [showPopup, setShowPopup] = useState(false);

  /*   const targets = [
    { name: 'target1', coords: [10, 39, 13, 42] },
    { name: 'target2', coords: [81, 43, 84, 45] },
    { name: 'target3', coords: [32, 48, 36, 51] }
  ]; */

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

  const checkTarget = async (proposedTarget) => {
    const getData = async () => {
      const docRef = doc(database, 'targets', proposedTarget);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        /*        console.log('Document data:', docSnap.data()); */
        return docSnap.data().coords;
      }
      console.log('No such document!');
      return null;
    };

    const target = await getData();

    const targetX1 = target[0];
    const targetY1 = target[1];
    const targetX2 = target[2];
    const targetY2 = target[3];
    const proposedX = targetX;
    const proposedY = targetY;
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
      {showPopup && <Popupmenu position={[clickX, clickY]} checkTarget={checkTarget} />}
    </div>
  );
}

export default GameImage;

GameImage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  database: PropTypes.object.isRequired
};
