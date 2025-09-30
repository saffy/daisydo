import { useState, useCallback, useEffect } from 'react';
import type { ColorInfo } from '../types';
import { generateColorPalette, generateRandomOklch, oklchToHex } from '../utils/color';

export function useColorPalette() {
  const [colors, setColors] = useState<ColorInfo[]>(() => generateColorPalette());

  // Randomize unlocked colors
  const randomizeColors = useCallback(() => {
    setColors(prevColors =>
      prevColors.map(color => {
        if (color.isLocked) return color;
        
        const newOklch = generateRandomOklch();
        return {
          ...color,
          oklch: newOklch,
          hex: oklchToHex(newOklch),
        };
      })
    );
  }, []);

  // Toggle lock state of a color
  const toggleColorLock = useCallback((colorId: string) => {
    setColors(prevColors =>
      prevColors.map(color =>
        color.id === colorId
          ? { ...color, isLocked: !color.isLocked }
          : color
      )
    );
  }, []);

  // Keyboard event handler for spacebar
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        randomizeColors();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [randomizeColors]);

  return {
    colors,
    randomizeColors,
    toggleColorLock,
  };
}