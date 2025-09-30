/**
 * DaisyDo - Tailwind Theme Generator
 * Main entry point for the theme generation system
 */

export * from './color-utils.js';
export * from './theme-config.js';
export * from './theme-generator.js';

import { createThemeConfig, validateThemeConfig } from './theme-config.js';
import { generateCSSVariables, generateDaisyUITheme } from './theme-generator.js';

/**
 * Main theme generator class
 */
export class DaisyDoThemeGenerator {
  constructor(config = {}) {
    this.config = createThemeConfig(config);
    
    const validation = validateThemeConfig(this.config);
    if (!validation.isValid) {
      throw new Error(`Invalid theme configuration: ${validation.errors.join(', ')}`);
    }
  }
  
  /**
   * Update theme configuration
   * @param {Object} newConfig - New configuration values
   */
  updateConfig(newConfig) {
    this.config = createThemeConfig({ ...this.config, ...newConfig });
    
    const validation = validateThemeConfig(this.config);
    if (!validation.isValid) {
      throw new Error(`Invalid theme configuration: ${validation.errors.join(', ')}`);
    }
  }
  
  /**
   * Generate CSS variables for the theme
   * @returns {string} CSS variables string
   */
  generateCSS() {
    return generateCSSVariables(this.config);
  }
  
  /**
   * Generate DaisyUI theme object
   * @param {string} themeName - Name for the theme
   * @returns {Object} DaisyUI theme object
   */
  generateTheme(themeName = 'custom') {
    return generateDaisyUITheme(this.config, themeName);
  }
  
  /**
   * Export theme to file
   * @param {string} format - Export format ('css' or 'json')
   * @param {string} themeName - Theme name (for JSON export)
   * @returns {string} Formatted theme data
   */
  export(format = 'css', themeName = 'custom') {
    switch (format.toLowerCase()) {
      case 'css':
        return this.generateCSS();
      case 'json':
        return JSON.stringify(this.generateTheme(themeName), null, 2);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
  
  /**
   * Get current configuration
   * @returns {Object} Current theme configuration
   */
  getConfig() {
    return { ...this.config };
  }
}

/**
 * Convenience function to create a theme generator
 * @param {Object} config - Theme configuration
 * @returns {DaisyDoThemeGenerator} Theme generator instance
 */
export function createThemeGenerator(config = {}) {
  return new DaisyDoThemeGenerator(config);
}