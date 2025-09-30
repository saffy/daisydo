import { useState } from 'react';
import { generateRandomOklch, oklchToHex, getContrastColor } from '../utils/colorUtils';
import { generateColorName } from '../utils/colorNamer';
import type { OklchColor } from '../utils/colorUtils';
import './ColorPalette.css';

interface ColorBlockProps {
  hex: string;
  colorName: string;
  contrastColor: string;
  onClick: () => void;
}

function ColorBlock({ hex, colorName, contrastColor, onClick }: ColorBlockProps) {
  return (
    <div 
      className="color-block"
      style={{ backgroundColor: hex }}
      onClick={onClick}
    >
      <div className="color-info" style={{ color: contrastColor }}>
        <div className="hex-code">{hex}</div>
        <div className="color-name">{colorName}</div>
      </div>
    </div>
  );
}

export default function ColorPalette() {
  const [colors, setColors] = useState<OklchColor[]>(() => 
    Array.from({ length: 5 }, () => generateRandomOklch())
  );

  const generatePalette = () => {
    setColors(Array.from({ length: 5 }, () => generateRandomOklch()));
  };

  const copyToClipboard = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      // TODO: Add toast notification for copy feedback
    } catch (err) {
      console.error('Failed to copy color: ', err);
    }
  };

  return (
    <div className="color-palette-container">
      <div className="color-palette">
        {colors.map((oklchColor, index) => {
          const hex = oklchToHex(oklchColor.l, oklchColor.c, oklchColor.h);
          const contrastColor = getContrastColor(hex);
          const colorName = generateColorName(hex, oklchColor);
          
          return (
            <ColorBlock
              key={`${hex}-${index}`}
              hex={hex}
              colorName={colorName}
              contrastColor={contrastColor}
              onClick={() => copyToClipboard(hex)}
            />
          );
        })}
      </div>
      
      <div className="palette-controls">
        <button onClick={generatePalette} className="generate-button">
          Generate New Palette
        </button>
      </div>
    </div>
  );
}
