/**
 * Color naming system for generating descriptive color names
 */

import type { OklchColor } from './colorUtils';

const COLOR_NAMES = [
  'Crimson', 'Scarlet', 'Ruby', 'Cherry', 'Rose', 'Coral', 'Salmon', 'Peach',
  'Orange', 'Amber', 'Gold', 'Honey', 'Yellow', 'Lime', 'Mint', 'Emerald',
  'Forest', 'Teal', 'Cyan', 'Sky', 'Azure', 'Royal', 'Navy', 'Indigo',
  'Violet', 'Purple', 'Magenta', 'Pink', 'Blush', 'Cream', 'Ivory', 'Pearl',
  'Silver', 'Slate', 'Charcoal', 'Ebony', 'Obsidian', 'Shadow', 'Storm', 'Ash'
];

const QUALIFIERS = [
  'Deep', 'Light', 'Bright', 'Dark', 'Soft', 'Vivid', 'Muted', 'Rich',
  'Pale', 'Bold', 'Warm', 'Cool', 'Fresh', 'Dusty', 'Smoky', 'Electric'
];

/**
 * Generate a descriptive color name
 * 
 * TODO: Implement intelligent color naming like coolors.co
 * Ideas for future enhancement:
 * - Analyze hue, saturation, and lightness to determine base color
 * - Use machine learning to map colors to descriptive names
 * - Implement a database of named colors with similarity matching
 * - Consider cultural and contextual color associations
 * - Add support for gradient-based naming (e.g., "sunset orange", "ocean blue")
 */
export function generateColorName(_hex: string, _oklch?: OklchColor): string {
  // Placeholder implementation - random combination for now
  const qualifier = QUALIFIERS[Math.floor(Math.random() * QUALIFIERS.length)];
  const baseName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
  return `${qualifier} ${baseName}`;
}