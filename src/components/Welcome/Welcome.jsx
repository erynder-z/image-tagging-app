import './Welcome.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Welcome({ resetGame }) {
  return (
    <div className="welcome-container">
      <h1>Welcome</h1>
      <div className="welcome-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aspernatur sunt
        voluptate qui repellat? Sapiente, omnis commodi? Reiciendis in eligendi esse recusandae
        minima. Placeat dolor dolores eius laudantium vitae totam ut accusamus magnam reiciendis aut
        voluptates sunt corporis temporibus consequatur odio, exercitationem nisi est delectus ullam
        eveniet numquam? Assumenda, hic?
      </div>
      <div
        className="gameBtn"
        onClick={() => {
          resetGame();
        }}
        onKeyDown={() => {
          resetGame();
        }}
        role="button"
        tabIndex={0}>
        <Link to="/startgame">To game</Link>
      </div>
    </div>
  );
}

export default Welcome;

Welcome.propTypes = {
  resetGame: PropTypes.func.isRequired
};
