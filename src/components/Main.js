import React from 'react';

import '../assets/styles/Main.css';

const Main = ({ data, handleClick }) => {
    return (
        <main className="main">
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
        </main>
    );
};

export default Main;
