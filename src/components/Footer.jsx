import React, { useState, useEffect } from 'react';
import CustomizePopup from './CustomizePopup';

function Footer() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        // Saat güncelleme işlevi
        const updateClock = () => {
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0'); // Saati 2 basamaklı yapar
            const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Dakikayı 2 basamaklı yapar
            setTime(`${hours}:${minutes}`);
        };

        updateClock(); // İlk başta saat ayarlanır

        const intervalId = setInterval(updateClock, 1000); // Her saniye güncellenir

        return () => clearInterval(intervalId); // Bileşen kaldırıldığında interval temizlenir
    }, []);

    const handleCustomizeClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSaveSettings = (settings) => {
        localStorage.setItem('bgSettings', JSON.stringify(settings));
        window.location.reload(); // Ayarları uygulamak için sayfayı yeniden yükleyin
    };

    return (
        <div className='footer-container'>
            <div className="clock">
                {time} {/* Saat burada gösterilecek */}
            </div>
            <div className="customize-container">
                <a href="#" onClick={handleCustomizeClick}><i className="bi bi-gear-fill"></i> Özelleştir</a>
                {isPopupOpen && (
                    <CustomizePopup onSave={handleSaveSettings} onClose={handleClosePopup} />
                )}
            </div>
        </div>
    );
}

export default Footer;
