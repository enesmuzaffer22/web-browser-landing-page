import React, { useEffect, useState } from 'react';
import LandingPage from "./pages/LandingPage";
import style from './style/main.scss';

function App() {
    const [bgStyle, setBgStyle] = useState({});

    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem('bgSettings'));
        if (settings) {
            switch (settings.option) {
                case 'color':
                    setBgStyle({ backgroundColor: settings.color });
                    break;
                case 'image':
                    setBgStyle({ backgroundImage: `url(${settings.image})` });
                    break;
                case 'gradient':
                    setBgStyle({
                        background: `linear-gradient(to right, ${settings.gradientColors.color1}, ${settings.gradientColors.color2})`,
                    });
                    break;
                default:
                    break;
            }
        } else {
            // Default background image if no settings are found
            setBgStyle({ backgroundImage: 'url(/web_bg.png)' });
        }
    }, []);

    return (
        <div className="App" style={bgStyle}>
            <LandingPage />
        </div>
    );
}

export default App;
