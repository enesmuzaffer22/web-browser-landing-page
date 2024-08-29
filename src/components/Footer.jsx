import React, { useState } from 'react';
import CustomizePopup from './CustomizePopup';

function Footer() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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
            <a href="#" onClick={handleCustomizeClick}><i className="bi bi-gear-fill"></i> Özelleştir</a>
            {isPopupOpen && (
                <CustomizePopup onSave={handleSaveSettings} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default Footer;
