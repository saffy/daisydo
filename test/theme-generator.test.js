import { test } from 'node:test';
import assert from 'node:assert';
import { DaisyDoThemeGenerator } from '../src/index.js';
import { DEFAULT_THEME_CONFIG } from '../src/theme-config.js';

test('DaisyDoThemeGenerator creates with default config', () => {
  const generator = new DaisyDoThemeGenerator();
  const config = generator.getConfig();
  
  assert.deepStrictEqual(config, DEFAULT_THEME_CONFIG);
});

test('DaisyDoThemeGenerator creates with custom config', () => {
  const customConfig = {
    colors: {
      primary: '#ff0000'
    },
    radius: {
      box: 2
    }
  };
  
  const generator = new DaisyDoThemeGenerator(customConfig);
  const config = generator.getConfig();
  
  assert.strictEqual(config.colors.primary, '#ff0000');
  assert.strictEqual(config.radius.box, 2);
  // Should still have default values for non-overridden properties
  assert.strictEqual(config.colors.secondary, DEFAULT_THEME_CONFIG.colors.secondary);
});

test('generateCSS returns valid CSS string', () => {
  const generator = new DaisyDoThemeGenerator();
  const css = generator.generateCSS();
  
  assert.strictEqual(typeof css, 'string');
  assert.ok(css.includes(':root {'));
  assert.ok(css.includes('--p:'));
  assert.ok(css.includes('--s:'));
  assert.ok(css.includes('--a:'));
  assert.ok(css.includes('--n:'));
  assert.ok(css.includes('--b1:'));
  assert.ok(css.includes('--rounded-box:'));
  assert.ok(css.includes('--border-btn:'));
});

test('generateTheme returns valid DaisyUI theme object', () => {
  const generator = new DaisyDoThemeGenerator();
  const theme = generator.generateTheme('test-theme');
  
  assert.ok(theme['test-theme']);
  
  const themeData = theme['test-theme'];
  
  // Check required DaisyUI properties
  const requiredProps = [
    'primary', 'primary-content', 'primary-focus',
    'secondary', 'secondary-content', 'secondary-focus',
    'accent', 'accent-content', 'accent-focus',
    'neutral', 'neutral-content', 'neutral-focus',
    'base-100', 'base-200', 'base-300', 'base-content',
    'info', 'info-content',
    'success', 'success-content',
    'warning', 'warning-content',
    'error', 'error-content'
  ];
  
  requiredProps.forEach(prop => {
    assert.ok(themeData.hasOwnProperty(prop), `Missing theme property: ${prop}`);
  });
});

test('export function works for CSS format', () => {
  const generator = new DaisyDoThemeGenerator();
  const exported = generator.export('css');
  
  assert.strictEqual(typeof exported, 'string');
  assert.ok(exported.includes(':root {'));
});

test('export function works for JSON format', () => {
  const generator = new DaisyDoThemeGenerator();
  const exported = generator.export('json', 'test-theme');
  
  assert.strictEqual(typeof exported, 'string');
  
  // Should be valid JSON
  const parsed = JSON.parse(exported);
  assert.ok(parsed['test-theme']);
});

test('updateConfig updates configuration correctly', () => {
  const generator = new DaisyDoThemeGenerator();
  
  generator.updateConfig({
    colors: { primary: '#00ff00' },
    radius: { box: 1.5 }
  });
  
  const config = generator.getConfig();
  assert.strictEqual(config.colors.primary, '#00ff00');
  assert.strictEqual(config.radius.box, 1.5);
});

test('invalid configuration throws error', () => {
  assert.throws(() => {
    new DaisyDoThemeGenerator({
      radius: { box: -1 } // Invalid radius value
    });
  });
});