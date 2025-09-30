/**
 * Utility functions for color manipulation in theme generation
 */

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface OklchColor {
  l: number;
  c: number;
  h: number;
}

// Basic color conversion functions
export function hexToRgb(hex: string): RgbColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("").toLowerCase();
}

// Advanced OKLCH color space functions
export function oklchToRgb(l: number, c: number, h: number): RgbColor {
  // Convert OKLCH to OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  
  // OKLab to linear RGB conversion matrix
  const lr = l + 0.3963377774 * a + 0.2158037573 * b;
  const lg = l - 0.1055613458 * a - 0.0638541728 * b;
  const lb = l - 0.0894841775 * a - 1.2914855480 * b;
  
  // Cube root transformation
  const lrCubed = lr ** 3;
  const lgCubed = lg ** 3;
  const lbCubed = lb ** 3;
  
  // Linear RGB to sRGB conversion with proper gamma correction
  const toSRGB = (linear: number): number => {
    const clamped = Math.max(0, Math.min(1, linear));
    return clamped <= 0.0031308 
      ? 12.92 * clamped 
      : 1.055 * (clamped ** (1/2.4)) - 0.055;
  };
  
  const r = Math.round(toSRGB(lrCubed) * 255);
  const g = Math.round(toSRGB(lgCubed) * 255);
  const bVal = Math.round(toSRGB(lbCubed) * 255);
  
  return { r, g, b: bVal };
}

export function oklchToHex(l: number, c: number, h: number): string {
  const rgb = oklchToRgb(l, c, h);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function generateRandomOklch(): OklchColor {
  return {
    l: 0.3 + Math.random() * 0.6,  // Lightness 30-90%
    c: 0.05 + Math.random() * 0.15, // Chroma 5-20%
    h: Math.random() * 360          // Hue 0-360°
  };
}

// Color manipulation functions
export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  return rgbToHex(newR, newG, newB);
}

export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
  const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
  const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));

  return rgbToHex(newR, newG, newB);
}

// Contrast and accessibility functions
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

export function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';

  const { r, g, b } = rgb;
  const luminance = getRelativeLuminance(r, g, b);
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}