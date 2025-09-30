/**
 * Comprehensive color utility functions for theme generation
 * Combines accurate OKLCH conversion with palette generation
 */

import type { ColorInfo } from '../types';

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

// Advanced OKLCH color space functions with accurate conversion
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

export function oklchToHex(l: number, c: number, h: number): string;
export function oklchToHex(oklch: string): string;
export function oklchToHex(lOrOklch: number | string, c?: number, h?: number): string {
  if (typeof lOrOklch === 'string') {
    // Parse OKLCH string format: oklch(50% 0.15 180)
    const match = lOrOklch.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/);
    if (!match) return '#000000';
    const [, l, cVal, hVal] = match.map(Number);
    const rgb = oklchToRgb(l / 100, cVal, hVal);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  } else {
    // Direct parameters
    const rgb = oklchToRgb(lOrOklch, c!, h!);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }
}

// Generate random OKLCH color (object format)
export function generateRandomOklch(): OklchColor {
  return {
    l: 0.3 + Math.random() * 0.6,  // Lightness 30-90%
    c: 0.05 + Math.random() * 0.15, // Chroma 5-20%
    h: Math.random() * 360          // Hue 0-360°
  };
}

// Generate random OKLCH color string for CSS
export function generateRandomOklchString(): string {
  const lightness = Math.random() * 0.6 + 0.2; // 20% - 80%
  const chroma = Math.random() * 0.3 + 0.05; // 5% - 35%
  const hue = Math.random() * 360;
  
  return `oklch(${(lightness * 100).toFixed(2)}% ${chroma.toFixed(3)} ${hue.toFixed(2)})`;
}

// Generate a palette of colors
export function generateColorPalette(): ColorInfo[] {
  return Array.from({ length: 5 }, (_, index) => ({
    id: `color-${index}`,
    oklch: generateRandomOklchString(),
    hex: '',
    isLocked: false,
  })).map(color => ({
    ...color,
    hex: oklchToHex(color.oklch),
  }));
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

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

// Generate DaisyUI theme from color palette
export function generateDaisyUITheme(colors: ColorInfo[]) {
  const [primary, secondary, accent, neutral, base] = colors;
  
  return {
    primary: primary.oklch,
    secondary: secondary.oklch,
    accent: accent.oklch,
    neutral: neutral.oklch,
    'base-100': base.oklch,
    'base-200': adjustLightness(base.oklch, -0.05),
    'base-300': adjustLightness(base.oklch, -0.1),
  };
}

// Adjust lightness of OKLCH color string
function adjustLightness(oklch: string, adjustment: number): string {
  const match = oklch.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) return oklch;
  
  const [, l, c, h] = match;
  const newLightness = Math.max(0, Math.min(100, parseFloat(l) + adjustment * 100));
  
  return `oklch(${newLightness.toFixed(2)}% ${c} ${h})`;
}