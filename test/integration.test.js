import { test } from 'node:test';
import assert from 'node:assert';
import { DaisyDoThemeGenerator, generateColorVariants } from '../index.js';

test('Integration: Complete theme generation workflow', () => {
  // Test the complete workflow from config to output
  const config = {
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
      selector: 1,
      field: 0.5,
      box: 2
    },
    effects: {
      depth3d: true,
      noise: false
    },
    border: 2,
    fieldSize: 0.3125
  };
  
  const generator = new DaisyDoThemeGenerator(config);
  
  // Test CSS generation
  const css = generator.generateCSS();
  assert.ok(css.includes(':root {'));
  assert.ok(css.includes('--p:'));
  assert.ok(css.includes('--rounded-box: 2rem'));
  assert.ok(css.includes('--border-btn: 2px'));
  assert.ok(css.includes('--animation-btn: 0.25s')); // 3D effect enabled
  
  // Test theme object generation
  const theme = generator.generateTheme('integration-test');
  assert.ok(theme['integration-test']);
  assert.strictEqual(theme['integration-test']['primary'], '#ff6b6b');
  assert.strictEqual(theme['integration-test']['--rounded-box'], '2rem');
  assert.strictEqual(theme['integration-test']['--btn-focus-scale'], '0.95'); // 3D effect
  
  // Test HTML preview generation
  const html = generator.generatePreview('Integration Test Theme');
  assert.ok(html.includes('<!DOCTYPE html>'));
  assert.ok(html.includes('Integration Test Theme'));
  assert.ok(html.includes('daisyui'));
  
  // Test all export formats
  const cssExport = generator.export('css');
  const jsonExport = generator.export('json', 'test-theme');
  const htmlExport = generator.export('html', 'Test Theme');
  
  assert.strictEqual(typeof cssExport, 'string');
  assert.ok(cssExport.includes(':root'));
  
  assert.strictEqual(typeof jsonExport, 'string');
  const parsedJson = JSON.parse(jsonExport);
  assert.ok(parsedJson['test-theme']);
  
  assert.strictEqual(typeof htmlExport, 'string');
  assert.ok(htmlExport.includes('<!DOCTYPE html>'));
});

test('Integration: OKLCH color variations work correctly', () => {
  const baseColor = '#570df8'; // Purple
  const variants = generateColorVariants(baseColor);
  
  // All variants should be valid hex colors
  Object.values(variants).forEach(color => {
    assert.ok(typeof color === 'string');
    assert.ok(color.startsWith('#'));
    assert.strictEqual(color.length, 7); // #RRGGBB format
  });
  
  // Base should be unchanged
  assert.strictEqual(variants.base, baseColor);
  
  // Variants should be different from base
  assert.notStrictEqual(variants.lighter, baseColor);
  assert.notStrictEqual(variants.darker, baseColor);
  assert.notStrictEqual(variants.saturated, baseColor);
  assert.notStrictEqual(variants.desaturated, baseColor);
});

test('Integration: Theme validation works correctly', () => {
  // Valid config should work
  assert.doesNotThrow(() => {
    new DaisyDoThemeGenerator({
      colors: { primary: '#ff0000' },
      radius: { box: 1 }
    });
  });
  
  // Invalid config should throw
  assert.throws(() => {
    new DaisyDoThemeGenerator({
      radius: { box: -1 } // Invalid radius
    });
  });
  
  assert.throws(() => {
    new DaisyDoThemeGenerator({
      border: 5 // Invalid border size
    });
  });
});

test('Integration: Dynamic theme updates preserve state correctly', () => {
  const generator = new DaisyDoThemeGenerator();
  
  const originalCSS = generator.generateCSS();
  
  // Update configuration
  generator.updateConfig({
    colors: { primary: '#00ff00' },
    radius: { box: 2 }
  });
  
  const updatedCSS = generator.generateCSS();
  
  // CSS should be different
  assert.notStrictEqual(originalCSS, updatedCSS);
  
  // Updated values should be present
  assert.ok(updatedCSS.includes('--rounded-box: 2rem'));
  
  // Get config should reflect changes
  const config = generator.getConfig();
  assert.strictEqual(config.colors.primary, '#00ff00');
  assert.strictEqual(config.radius.box, 2);
  
  // Non-updated values should still be defaults
  assert.strictEqual(config.colors.secondary, '#f000b8');
});