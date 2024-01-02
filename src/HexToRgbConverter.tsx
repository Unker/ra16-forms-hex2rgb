import React, { useState } from 'react';
import './HexToRgbConverter.css'

// Convert HEX to RGB
const hexToRgb = (hex: string): string => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const HexToRgbConverter: React.FC = () => {
  const [inputHex, setInputHex] = useState<string>('');
  // const [hexColor, setHexColor] = useState<string>('');
  const [rgbColor, setRgbColor] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputHex(input);

    // если количество символов меньше 7, то ничего не делаем
    if (input.length >= 7) {
      if (input[0] !== '#') {
        setError(true);
        return;
      }

      const hexColor = input.substring(1);
      const isValidHex = /^[0-9A-Fa-f]{6}$/.test(hexColor);
      console.log(hexColor);

      if (isValidHex) {
        setError(false);
        setRgbColor(hexToRgb(hexColor));
        console.log('valid');
      } else {
        setError(true);
        setRgbColor(null);
      }
    }

  };

  return (
    <div 
      className="centered"
      style={{
        backgroundColor: error ? 'red' : rgbColor,
      }}
    >
      <input type="text" value={inputHex} onChange={handleHexInputChange} />

      <div className="rgb-container">
        <span>
          {error ? (
            "Ошибка!"
          ) : (
            rgbColor
          )}
        </span>
      </div>
    </div>
  );
};

export default HexToRgbConverter;