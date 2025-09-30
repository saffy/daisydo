/**
 * Theme configuration and default values for DaisyUI theme generation
 */

/**
 * Default primary colors - these are the 5 base colors mentioned in the requirements
 */
export const DEFAULT_PRIMARY_COLORS = {
  primary: '#570df8',    // Purple - action buttons, highlights, toggles
  secondary: '#f000b8',  // Pink - secondary buttons
  accent: '#37cdbe',     // Teal - accent buttons, labels
  neutral: '#3d4451',    // Gray - generic buttons, labels, chat bubbles
  base: '#ffffff'        // White - page background, box background, borders
};

/**
 * Default semantic colors for forms and feedback
 */
export const DEFAULT_SEMANTIC_COLORS = {
  info: '#3abff8',       // Blue - info messages
  success: '#36d399',    // Green - success messages
  warning: '#fbbd23',    // Yellow - warning messages
  error: '#f87272'       // Red - error messages  
};

/**
 * Radius options for different UI elements
 */
export const RADIUS_OPTIONS = [0, 0.25, 0.5, 1, 2]; // rem values

/**
 * Border width options
 */
export const BORDER_OPTIONS = [0.5, 1, 1.5, 2]; // px values

/**
 * Field base size options
 */
export const FIELD_SIZE_OPTIONS = [0.1875, 0.21875, 0.25, 0.28125, 0.3125]; // rem values (3px to 5px)

/**
 * Default theme configuration
 */
export const DEFAULT_THEME_CONFIG = {
  colors: {
    ...DEFAULT_PRIMARY_COLORS,
    ...DEFAULT_SEMANTIC_COLORS
  },
  radius: {
    selector: 0.5,  // rem
    field: 0.25,    // rem  
    box: 1          // rem
  },
  effects: {
    depth3d: false,   // 3D depth effect
    noise: false      // noise effect
  },
  border: 1,          // px
  fieldSize: 0.25     // rem
};

/**
 * Create a new theme configuration with custom values
 * @param {Object} customConfig - Custom configuration object
 * @returns {Object} Complete theme configuration
 */
export function createThemeConfig(customConfig = {}) {
  return {
    ...DEFAULT_THEME_CONFIG,
    ...customConfig,
    colors: {
      ...DEFAULT_THEME_CONFIG.colors,
      ...(customConfig.colors || {})
    },
    radius: {
      ...DEFAULT_THEME_CONFIG.radius,
      ...(customConfig.radius || {})
    },
    effects: {
      ...DEFAULT_THEME_CONFIG.effects,
      ...(customConfig.effects || {})
    }
  };
}

/**
 * Validate theme configuration
 * @param {Object} config - Theme configuration to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export function validateThemeConfig(config) {
  const errors = [];
  
  // Check required colors
  const requiredColors = ['primary', 'secondary', 'accent', 'neutral', 'base', 'info', 'success', 'warning', 'error'];
  for (const colorName of requiredColors) {
    if (!config.colors?.[colorName]) {
      errors.push(`Missing required color: ${colorName}`);
    }
  }
  
  // Check radius values
  if (config.radius) {
    for (const [key, value] of Object.entries(config.radius)) {
      if (typeof value !== 'number' || value < 0 || value > 3) {
        errors.push(`Invalid radius value for ${key}: ${value} (must be 0-3 rem)`);
      }
    }
  }
  
  // Check border value
  if (config.border && (typeof config.border !== 'number' || config.border < 0.5 || config.border > 2)) {
    errors.push(`Invalid border value: ${config.border} (must be 0.5-2 px)`);
  }
  
  // Check field size
  if (config.fieldSize && (typeof config.fieldSize !== 'number' || config.fieldSize < 0.1875 || config.fieldSize > 0.3125)) {
    errors.push(`Invalid fieldSize value: ${config.fieldSize} (must be 0.1875-0.3125 rem)`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}