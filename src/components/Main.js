import React from 'react';

import '../assets/styles/Main.css';

const Main = ({ data, handleClick, gameover, handleRestartClick }) => {
    return (
        <main className="main">
            {!gameover && (
                <div className="gameboard">
                    {data.map((element, index) => {
                        return (
                            <div
                                key={`card${index}`}
                                className="card-group"
                                onClick={handleClick}
                            >
                                <img src={element.src} alt={element.name} />
                                <div className="hero-name">{element.name}</div>
                            </div>
                        );
                    })}
                </div>
            )}
            {gameover && (
                <div className="gameover-board">
                    <div className="gameover">
                        <p>You win!</p>
                        <button onClick={handleRestartClick}>
                            Restart
                        </button>{' '}
                    </div>
                </div>
            )}
        </main>
    );
};

export default Main;
