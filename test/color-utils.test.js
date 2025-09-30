import { test } from 'node:test';
import assert from 'node:assert';
import { 
  lighten, 
  darken, 
  saturate, 
  desaturate, 
  generateColorVariants, 
  getContrastColor 
} from '../src/color-utils.js';

test('lighten function creates lighter colors', () => {
  const baseColor = '#570df8';
  const lighterColor = lighten(baseColor, 0.1);
  
  assert.strictEqual(typeof lighterColor, 'string');
  assert.ok(lighterColor.startsWith('#'));
  assert.notStrictEqual(lighterColor, baseColor);
});

test('darken function creates darker colors', () => {
  const baseColor = '#570df8';
  const darkerColor = darken(baseColor, 0.1);
  
  assert.strictEqual(typeof darkerColor, 'string');
  assert.ok(darkerColor.startsWith('#'));
  assert.notStrictEqual(darkerColor, baseColor);
});

test('saturate function creates more saturated colors', () => {
  const baseColor = '#570df8';
  const saturatedColor = saturate(baseColor, 0.05);
  
  assert.strictEqual(typeof saturatedColor, 'string');
  assert.ok(saturatedColor.startsWith('#'));
});

test('desaturate function creates less saturated colors', () => {
  const baseColor = '#570df8';
  const desaturatedColor = desaturate(baseColor, 0.05);
  
  assert.strictEqual(typeof desaturatedColor, 'string');
  assert.ok(desaturatedColor.startsWith('#'));
});

test('generateColorVariants creates all required variants', () => {
  const baseColor = '#570df8';
  const variants = generateColorVariants(baseColor);
  
  const expectedKeys = ['base', 'lighter', 'light', 'dark', 'darker', 'saturated', 'desaturated'];
  
  expectedKeys.forEach(key => {
    assert.ok(variants.hasOwnProperty(key), `Missing variant: ${key}`);
    assert.strictEqual(typeof variants[key], 'string');
    assert.ok(variants[key].startsWith('#'));
  });
  
  assert.strictEqual(variants.base, baseColor);
});

test('getContrastColor returns appropriate contrast colors', () => {
  const lightColor = '#ffffff';
  const darkColor = '#000000';
  
  const contrastForLight = getContrastColor(lightColor);
  const contrastForDark = getContrastColor(darkColor);
  
  assert.strictEqual(contrastForLight, '#000000');
  assert.strictEqual(contrastForDark, '#ffffff');
});