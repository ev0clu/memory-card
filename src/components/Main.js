import React from 'react';

import '../assets/styles/Main.css';

const Main = ({ data }) => {
    return (
        <main className="main">
            {data.map((element, index) => {
                return (
                    <div
                        key={`card${index}`}
                        className="card-group"
                        data-index={index}
                    >
                        <img src={element.src} alt={element.name} />
                        <p className="hero-name">{element.name}</p>
                    </div>
                );
            })}
        </main>
    );
};

export default Main;
