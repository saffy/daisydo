import type { ColorInfo } from '../types';

// Generate random OKLCH color
export function generateRandomOklch(): string {
  const lightness = Math.random() * 0.6 + 0.2; // 20% - 80%
  const chroma = Math.random() * 0.3 + 0.05; // 5% - 35%
  const hue = Math.random() * 360;
  
  return `oklch(${(lightness * 100).toFixed(2)}% ${chroma.toFixed(3)} ${hue.toFixed(2)})`;
}

// Convert OKLCH to approximate HEX (simplified conversion for display)
export function oklchToHex(oklch: string): string {
  // This is a simplified conversion - in a real app you'd want a proper color library
  // For now, we'll generate a representative hex color based on the OKLCH values
  const match = oklch.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) return '#000000';
  
  const [, l, c, h] = match.map(Number);
  
  // Simplified conversion - you might want to use a library like culori for accurate conversion
  const hueRad = (h * Math.PI) / 180;
  const r = Math.max(0, Math.min(255, Math.round(255 * (l / 100 + c * Math.cos(hueRad)))));
  const g = Math.max(0, Math.min(255, Math.round(255 * (l / 100 + c * Math.cos(hueRad + 2.094)))));
  const b = Math.max(0, Math.min(255, Math.round(255 * (l / 100 + c * Math.cos(hueRad + 4.189)))));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Generate a palette of colors
export function generateColorPalette(): ColorInfo[] {
  return Array.from({ length: 5 }, (_, index) => ({
    id: `color-${index}`,
    oklch: generateRandomOklch(),
    hex: '',
    isLocked: false,
  })).map(color => ({
    ...color,
    hex: oklchToHex(color.oklch),
  }));
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

// Adjust lightness of OKLCH color
function adjustLightness(oklch: string, adjustment: number): string {
  const match = oklch.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) return oklch;
  
  const [, l, c, h] = match;
  const newLightness = Math.max(0, Math.min(100, parseFloat(l) + adjustment * 100));
  
  return `oklch(${newLightness.toFixed(2)}% ${c} ${h})`;
}