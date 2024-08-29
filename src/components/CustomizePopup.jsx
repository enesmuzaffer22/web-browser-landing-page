import React, { useState, useEffect } from 'react';

function CustomizePopup({ onSave, onClose }) {
  const [bgOption, setBgOption] = useState('color');
  const [color, setColor] = useState('#ffffff');
  const [gradientColors, setGradientColors] = useState({
    color1: '#000000',
    color2: '#ffffff'
  });
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [isImageValid, setIsImageValid] = useState(true); // Resim geçerli mi?

  // bgOption değiştiğinde isImageValid'i sıfırla
  useEffect(() => {
    if (bgOption !== 'image') {
      setIsImageValid(true);
      setError('');
    }
  }, [bgOption]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const maxSizeMB = 3; // Maksimum dosya boyutu (MB)
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // MB'yi byte'a çevir

    if (file) {
      if (file.size > maxSizeBytes) {
        setError(`Dosya boyutu ${maxSizeMB} MB'den büyük olmamalıdır.`);
        setIsImageValid(false); // Kaydet butonunu devre dışı bırak
      } else {
        setError(''); // Hata mesajını temizle
        setIsImageValid(true); // Kaydet butonunu etkinleştir
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result;
          setImage(base64String);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleSave = () => {
    let settings = {};
    switch (bgOption) {
      case 'color':
        settings = { option: 'color', color };
        break;
      case 'image':
        settings = { option: 'image', image };
        break;
      case 'gradient':
        settings = { option: 'gradient', gradientColors };
        break;
      default:
        break;
    }
    onSave(settings);
    onClose();
  };

  // "Kaydet" butonunun etkinliği, arka plan seçeneğine bağlı olarak değişir
  const isSaveEnabled = bgOption === 'image' ? isImageValid : true;

  return (
    <div className="customize-popup">
      <h2>Arkaplan Ayarları</h2>

      <div className="input-container">
        <label>
          <input type="radio" value="color" checked={bgOption === 'color'} onChange={() => setBgOption('color')} />
          Düz Renk
        </label>
        {bgOption === 'color' && (
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        )}

        <label>
          <input type="radio" value="image" checked={bgOption === 'image'} onChange={() => setBgOption('image')} />
          Resim Yükle
        </label>
        {bgOption === 'image' && (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} className='upload-file'/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </>
        )}

        <label>
          <input type="radio" value="gradient" checked={bgOption === 'gradient'} onChange={() => setBgOption('gradient')} />
          Gradient
        </label>
        {bgOption === 'gradient' && (
          <>
            <input type="color" value={gradientColors.color1} onChange={(e) => setGradientColors({ ...gradientColors, color1: e.target.value })} />
            <input type="color" value={gradientColors.color2} onChange={(e) => setGradientColors({ ...gradientColors, color2: e.target.value })} />
          </>
        )}

        <div className="button-container">
          <button onClick={handleSave} disabled={!isSaveEnabled}>Kaydet</button>
          <button onClick={onClose}>İptal</button>
        </div>
      </div>
    </div>
  );
}

export default CustomizePopup;
