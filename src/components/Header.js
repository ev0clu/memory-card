import React from 'react';
import '../assets/styles/Header.css';

const Header = (prop) => {
  const { score, bestScore } = prop;
  return (
    <header className="header">
      <h1>Dota 2 Memory Game</h1>
      <div className="score-container">
        <div className="score">Score: {score}</div>
        <div className="best-score">Best Score: {bestScore}</div>
      </div>
    </header>
  );
};

export default Header;
