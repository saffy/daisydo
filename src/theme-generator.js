import { generateColorVariants, generateContentColors, toOklch } from './color-utils.js';

/**
 * DaisyUI Theme Generator
 * Generates CSS variables and theme configurations for DaisyUI
 */

/**
 * Convert hex color to HSL values for CSS
 * @param {string} hexColor - Hex color string
 * @returns {string} HSL values for CSS (e.g., "270 100% 50%")
 */
function hexToHslValues(hexColor) {
  const oklchColor = toOklch(hexColor);
  if (!oklchColor) return '0 0% 0%';
  
  // Convert OKLCH to HSL for CSS compatibility
  // This is a simplified conversion - in production you might want more precise conversion
  const { l, c, h } = oklchColor;
  
  // Convert to HSL-like values
  const lightness = Math.round(l * 100);
  const saturation = Math.round(Math.min(100, c * 250)); // Approximate conversion
  const hue = Math.round(h || 0);
  
  return `${hue} ${saturation}% ${lightness}%`;
}

/**
 * Generate base color variants using OKLCH color space
 * @param {Object} colors - Base colors from theme config
 * @returns {Object} Object containing all color variants
 */
export function generateThemeColors(colors) {
  const themeColors = {};
  
  // Generate variants for each primary color
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'].includes(colorName)) {
      const variants = generateColorVariants(colorValue);
      const contentColors = generateContentColors(colorValue);
      
      themeColors[colorName] = {
        ...variants,
        ...contentColors
      };
    } else if (colorName === 'base') {
      // Base colors need special handling for different levels
      const variants = generateColorVariants(colorValue);
      const contentColors = generateContentColors(colorValue);
      
      themeColors.base = {
        100: variants.base,        // Main background
        200: variants.light,       // Card/modal background  
        300: variants.darker,      // Border color
        content: contentColors.content
      };
    }
  });
  
  return themeColors;
}

/**
 * Generate CSS custom properties for DaisyUI theme
 * @param {Object} themeConfig - Complete theme configuration
 * @returns {string} CSS custom properties string
 */
export function generateCSSVariables(themeConfig) {
  const colors = generateThemeColors(themeConfig.colors);
  
  let css = ':root {\n';
  
  // Color variables
  css += '  /* Primary Colors */\n';
  css += `  --p: ${hexToHslValues(colors.primary.base)};\n`;
  css += `  --pc: ${hexToHslValues(colors.primary.content)};\n`;
  css += `  --pf: ${hexToHslValues(colors.primary.focus)};\n`;
  
  css += '  /* Secondary Colors */\n';
  css += `  --s: ${hexToHslValues(colors.secondary.base)};\n`;
  css += `  --sc: ${hexToHslValues(colors.secondary.content)};\n`;
  css += `  --sf: ${hexToHslValues(colors.secondary.focus)};\n`;
  
  css += '  /* Accent Colors */\n';
  css += `  --a: ${hexToHslValues(colors.accent.base)};\n`;
  css += `  --ac: ${hexToHslValues(colors.accent.content)};\n`;
  css += `  --af: ${hexToHslValues(colors.accent.focus)};\n`;
  
  css += '  /* Neutral Colors */\n';
  css += `  --n: ${hexToHslValues(colors.neutral.base)};\n`;
  css += `  --nc: ${hexToHslValues(colors.neutral.content)};\n`;
  css += `  --nf: ${hexToHslValues(colors.neutral.focus)};\n`;
  
  css += '  /* Base Colors */\n';
  css += `  --b1: ${hexToHslValues(colors.base[100])};\n`;
  css += `  --b2: ${hexToHslValues(colors.base[200])};\n`;
  css += `  --b3: ${hexToHslValues(colors.base[300])};\n`;
  css += `  --bc: ${hexToHslValues(colors.base.content)};\n`;
  
  css += '  /* Semantic Colors */\n';
  css += `  --in: ${hexToHslValues(colors.info.base)};\n`;
  css += `  --inc: ${hexToHslValues(colors.info.content)};\n`;
  
  css += `  --su: ${hexToHslValues(colors.success.base)};\n`;
  css += `  --suc: ${hexToHslValues(colors.success.content)};\n`;
  
  css += `  --wa: ${hexToHslValues(colors.warning.base)};\n`;
  css += `  --wac: ${hexToHslValues(colors.warning.content)};\n`;
  
  css += `  --er: ${hexToHslValues(colors.error.base)};\n`;
  css += `  --erc: ${hexToHslValues(colors.error.content)};\n`;
  
  // Radius variables
  css += '  /* Radius Variables */\n';
  css += `  --rounded-box: ${themeConfig.radius.box}rem;\n`;
  css += `  --rounded-btn: ${themeConfig.radius.field}rem;\n`;
  css += `  --rounded-badge: ${themeConfig.radius.selector}rem;\n`;
  
  // Border variables
  css += '  /* Border Variables */\n';
  css += `  --border-btn: ${themeConfig.border}px;\n`;
  
  // Animation and effects
  css += '  /* Animation Variables */\n';
  css += `  --animation-btn: ${themeConfig.effects.depth3d ? '0.25s' : '0.1s'};\n`;
  css += `  --animation-input: 0.2s;\n`;
  
  // Tab variables
  css += '  /* Tab Variables */\n';
  css += `  --tab-border: ${themeConfig.border}px;\n`;
  css += `  --tab-radius: ${themeConfig.radius.selector}rem;\n`;
  
  css += '}\n';
  
  return css;
}

/**
 * Generate complete DaisyUI theme object
 * @param {Object} themeConfig - Theme configuration
 * @param {string} themeName - Name of the theme
 * @returns {Object} Complete DaisyUI theme object
 */
export function generateDaisyUITheme(themeConfig, themeName = 'custom') {
  const colors = generateThemeColors(themeConfig.colors);
  
  return {
    [themeName]: {
      'primary': colors.primary.base,
      'primary-content': colors.primary.content,
      'primary-focus': colors.primary.focus,
      
      'secondary': colors.secondary.base,
      'secondary-content': colors.secondary.content,
      'secondary-focus': colors.secondary.focus,
      
      'accent': colors.accent.base,
      'accent-content': colors.accent.content,
      'accent-focus': colors.accent.focus,
      
      'neutral': colors.neutral.base,
      'neutral-content': colors.neutral.content,
      'neutral-focus': colors.neutral.focus,
      
      'base-100': colors.base[100],
      'base-200': colors.base[200],
      'base-300': colors.base[300],
      'base-content': colors.base.content,
      
      'info': colors.info.base,
      'info-content': colors.info.content,
      
      'success': colors.success.base,
      'success-content': colors.success.content,
      
      'warning': colors.warning.base,
      'warning-content': colors.warning.content,
      
      'error': colors.error.base,
      'error-content': colors.error.content,
      
      '--rounded-box': `${themeConfig.radius.box}rem`,
      '--rounded-btn': `${themeConfig.radius.field}rem`,
      '--rounded-badge': `${themeConfig.radius.selector}rem`,
      '--animation-btn': themeConfig.effects.depth3d ? '0.25s' : '0.1s',
      '--animation-input': '0.2s',
      '--btn-text-case': 'uppercase',
      '--btn-focus-scale': themeConfig.effects.depth3d ? '0.95' : '1',
      '--border-btn': `${themeConfig.border}px`,
      '--tab-border': `${themeConfig.border}px`,
      '--tab-radius': `${themeConfig.radius.selector}rem`
    }
  };
}