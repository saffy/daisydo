import { DaisyDoThemeGenerator, createThemeGenerator } from '../index.js';

console.log('=== DaisyDo Theme Generator Example ===\n');

// Example 1: Using default configuration
console.log('1. Default Theme:');
const defaultGenerator = new DaisyDoThemeGenerator();
console.log('Default CSS Variables:');
console.log(defaultGenerator.generateCSS());

// Example 2: Custom color scheme
console.log('\n2. Custom Color Scheme:');
const customGenerator = createThemeGenerator({
  colors: {
    primary: '#ff6b6b',    // Coral red
    secondary: '#4ecdc4',  // Teal
    accent: '#45b7d1',     // Blue
    neutral: '#96ceb4',    // Sage green
    base: '#ffeaa7',       // Light yellow
    info: '#74b9ff',       // Blue
    success: '#00b894',    // Green
    warning: '#fdcb6e',    // Orange
    error: '#e17055'       // Red-orange
  },
  radius: {
    selector: 1,    // More rounded selectors
    field: 0.5,     // Medium rounded fields
    box: 2          // Very rounded boxes
  },
  effects: {
    depth3d: true,  // Enable 3D effects
    noise: false
  },
  border: 2,        // Thicker borders
  fieldSize: 0.3125 // Larger field size
});

console.log('Custom theme CSS:');
console.log(customGenerator.generateCSS());

// Example 3: Generate DaisyUI theme object for Tailwind config
console.log('\n3. DaisyUI Theme Object for Tailwind Config:');
const themeObject = customGenerator.generateTheme('my-custom-theme');
console.log(JSON.stringify(themeObject, null, 2));

// Example 4: Export theme to different formats
console.log('\n4. Export Examples:');
console.log('Export as CSS:');
console.log(customGenerator.export('css'));

console.log('\nExport as JSON:');
console.log(customGenerator.export('json', 'exported-theme'));

// Example 5: Dynamic theme updates
console.log('\n5. Dynamic Theme Updates:');
const dynamicGenerator = new DaisyDoThemeGenerator();

console.log('Original primary color CSS:');
console.log(dynamicGenerator.export('css').split('\n').find(line => line.includes('--p:')));

// Update the theme
dynamicGenerator.updateConfig({
  colors: { primary: '#8b5cf6' }, // Purple
  radius: { box: 0 }              // No rounded corners
});

console.log('Updated primary color CSS:');
console.log(dynamicGenerator.export('css').split('\n').find(line => line.includes('--p:')));

console.log('\n=== Example Complete ===');