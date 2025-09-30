import { writeFile } from 'fs/promises';
import { DaisyDoThemeGenerator } from '../index.js';

console.log('=== HTML Preview Generation Example ===');

// Create a custom theme
const generator = new DaisyDoThemeGenerator({
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

// Generate HTML preview
const html = generator.generatePreview('Coral Sunset Theme');

try {
  await writeFile('/tmp/coral-sunset-theme.html', html);
  console.log('✅ HTML preview generated: /tmp/coral-sunset-theme.html');
  console.log('Open this file in a web browser to see the theme preview!');
  
  // Also generate via CLI export method
  const htmlViaExport = generator.export('html', 'Export Test Theme');
  await writeFile('/tmp/export-test-theme.html', htmlViaExport);
  console.log('✅ HTML via export method: /tmp/export-test-theme.html');
  
} catch (error) {
  console.error('Error writing HTML files:', error.message);
}

console.log('\n=== HTML Preview Example Complete ===');