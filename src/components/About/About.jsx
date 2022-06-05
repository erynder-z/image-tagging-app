import './About.css';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

function About() {
  return (
    <div className="about-container">
      <div className="bg-image" />
      <div className="about-content-container">
        <div className="about-content">
          <div className="about-body">
            <div className="about-upper">
              <h1>About</h1>
              <h3 className="about-list">This app uses the following:</h3>

              <li>React</li>
              <li>Google Firebase</li>
              <li>React Icons</li>
              <li>Uniqid-library</li>
              <li>Proptypes library</li>
              <li>Date-fns library</li>
            </div>
            <div className="about-middle">
              <h3 className="about-app">App by:</h3>
              <h2>
                <a href="https://github.com/erynder-z" target="_blank" rel="noopener noreferrer">
                  Erynder-Z <FaGithub size="1em" />
                </a>
              </h2>
            </div>
            <div className="about-lower">
              <h3 className="about-image">Image created by:</h3>
              <a
                href="https://www.reddit.com/user/IdleMind81/"
                target="_blank"
                rel="noopener noreferrer">
                <h2>
                  IdleMind81 <FiExternalLink size="1rem" />
                </h2>
              </a>
              <p>and</p>

              <a
                href="https://www.reddit.com/user/gus_morais"
                target="_blank"
                rel="noopener noreferrer">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
