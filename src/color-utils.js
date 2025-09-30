import { oklch, formatHex, clampChroma } from 'culori';

/**
 * Color utilities for OKLCH color space manipulation
 * Provides functions to create lighter, darker, and more saturated color variants
 */

/**
 * Convert a color to OKLCH format
 * @param {string} color - Color in any format (hex, rgb, etc.)
 * @returns {Object} OKLCH color object
 */
export function toOklch(color) {
  return oklch(color);
}

/**
 * Convert OKLCH color back to hex
 * @param {Object} oklchColor - OKLCH color object
 * @returns {string} Hex color string
 */
export function toHex(oklchColor) {
  return formatHex(oklchColor);
}

/**
 * Create a lighter variant of a color
 * @param {string} color - Base color
 * @param {number} amount - Lightness increase (0-1, default 0.1)
 * @returns {string} Lighter color in hex format
 */
export function lighten(color, amount = 0.1) {
  const oklchColor = toOklch(color);
  if (!oklchColor) return color;
  
  return toHex({
    ...oklchColor,
    l: Math.min(1, oklchColor.l + amount)
  });
}

/**
 * Create a darker variant of a color
 * @param {string} color - Base color
 * @param {number} amount - Lightness decrease (0-1, default 0.1)
 * @returns {string} Darker color in hex format
 */
export function darken(color, amount = 0.1) {
  const oklchColor = toOklch(color);
  if (!oklchColor) return color;
  
  return toHex({
    ...oklchColor,
    l: Math.max(0, oklchColor.l - amount)
  });
}

/**
 * Create a more saturated variant of a color
 * @param {string} color - Base color
 * @param {number} amount - Chroma increase (0-0.4, default 0.05)
 * @returns {string} More saturated color in hex format
 */
export function saturate(color, amount = 0.05) {
  const oklchColor = toOklch(color);
  if (!oklchColor) return color;
  
  const newColor = {
    ...oklchColor,
    c: oklchColor.c + amount
  };
  
  return toHex(clampChroma(newColor, 'oklch'));
}

/**
 * Create a less saturated variant of a color
 * @param {string} color - Base color
 * @param {number} amount - Chroma decrease (0-0.4, default 0.05)
 * @returns {string} Less saturated color in hex format
 */
export function desaturate(color, amount = 0.05) {
  const oklchColor = toOklch(color);
  if (!oklchColor) return color;
  
  return toHex({
    ...oklchColor,
    c: Math.max(0, oklchColor.c - amount)
  });
}

/**
 * Generate a set of color variants from a base color
 * @param {string} baseColor - Base color
 * @returns {Object} Object containing color variants
 */
export function generateColorVariants(baseColor) {
  return {
    base: baseColor,
    lighter: lighten(baseColor, 0.15),
    light: lighten(baseColor, 0.08),
    dark: darken(baseColor, 0.08),
    darker: darken(baseColor, 0.15),
    saturated: saturate(baseColor, 0.08),
    desaturated: desaturate(baseColor, 0.08)
  };
}

/**
 * Calculate appropriate contrast color (light or dark)
 * @param {string} color - Background color
 * @returns {string} Contrasting text color (hex)
 */
export function getContrastColor(color) {
  const oklchColor = toOklch(color);
  if (!oklchColor) return '#000000';
  
  // Use lightness to determine if we need light or dark text
  return oklchColor.l > 0.6 ? '#000000' : '#ffffff';
}

/**
 * Generate content color variants for readable text
 * @param {string} backgroundColor - Background color to contrast against
 * @returns {Object} Object containing content color variants
 */
export function generateContentColors(backgroundColor) {
  const baseContent = getContrastColor(backgroundColor);
  const oklchBg = toOklch(backgroundColor);
  
  if (!oklchBg) {
    return {
      content: baseContent,
      focus: baseContent
    };
  }
  
  // Create slightly more subtle versions for secondary text
  const isLight = oklchBg.l > 0.6;
  
  return {
    content: baseContent,
    focus: isLight ? 
      toHex({ mode: 'oklch', l: 0.2, c: 0, h: 0 }) : // Dark gray for light backgrounds
      toHex({ mode: 'oklch', l: 0.9, c: 0, h: 0 })   // Light gray for dark backgrounds
  };
}