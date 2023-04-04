import React, { useState, useEffect, useRef } from 'react';

import './assets/styles/App.css';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ImportedImages from './components/Images';

function App() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [images, setImages] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameover, setGameover] = useState(false);

    const initCycle = useRef(true);

    const loadImages = () => {
        const importedImages = ImportedImages();
        return importedImages.map((element) => {
            return new Promise((resolve) => {
                const img = new Image();

                img.onload = () => {
                    setImages((prevArray) => [...prevArray, img]);
                    resolve(element);
                };

                img.src = element;
            });
        });
    };

    useEffect(() => {
        if (initCycle.current) {
            Promise.all(loadImages())
                .then(() => setLoad(true))
                .catch((err) => console.log(err));
        }
        initCycle.current = false;
    }, []);

    useEffect(() => {
        const initData = () => {
            const dataContainer = [];

            images.forEach((element) => {
                // Get the file name by splitting the URL on the '/'
                const src = element.src;
                const srcContent = src.split('/');
                const parts = srcContent[srcContent.length - 1];

                // Remove the file extension by splitting on the '.' and taking the first part
                const imageNameParts = parts.split('.');
                const imageName = imageNameParts[0];
                const name =
                    imageName.charAt(0).toUpperCase() + imageName.slice(1);
                dataContainer.push({ src, name, isClick: false });
            });
            return dataContainer;
        };

        if (load) {
            setData(initData());
        }
    }, [load, images]);

    useEffect(() => {
        if (score === 12) {
            setGameover(true);
        }
    }, [score]);

    const shuffleCards = (newDataArray) => {
        const currentArray = newDataArray.map((element) => {
            return { ...element };
        });
        const shuffleArray = [];

        for (let i = data.length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            shuffleArray.push(currentArray[randomIndex]);
            currentArray.splice(randomIndex, 1);
        }

        // return shuffleArray;
        return newDataArray;
    };

    const handleClick = (e) => {
        e.preventDefault();

        const name = e.target.parentNode.lastChild.textContent;
        let newData = data.map((element) => {
            return { ...element };
        });

        for (let i = 0; i < newData.length; i++) {
            if (newData[i].name === name) {
                if (newData[i].isClick) {
                    if (bestScore < score) {
                        setBestScore(score);
                    }
                    setScore(0);
                    newData = newData.map((element) => {
                        return { ...element, isClick: false };
                    });
                } else {
                    setScore(score + 1);
                    newData[i].isClick = true;
                }
                break;
            }
        }
        setData(shuffleCards(newData));
    };

    const handleRestartClick = (e) => {
        e.preventDefault();

        let newData = data.map((element) => {
            return { ...element };
        });

        newData = newData.map((element) => {
            return { ...element, isClick: false };
        });

        setData(newData);
        setScore(0);
        setBestScore(0);
        setGameover(false);
    };

    return (
        <div className="App">
            <Header score={score} bestScore={bestScore} />
            <Main
                data={data}
                handleClick={handleClick}
                handleRestartClick={handleRestartClick}
                gameover={gameover}
            />
            <Footer />
        </div>
    );
}

export default App;
