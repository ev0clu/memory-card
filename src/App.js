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

    return (
        <div className="App">
            <Header score={score} bestScore={bestScore} />
            <Main data={data} />
            <Footer />
        </div>
    );
}

export default App;
