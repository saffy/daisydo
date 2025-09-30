import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  rgbToHex,
  lightenColor,
  darkenColor,
  getContrastColor,
} from '../../src/utils/colorUtils'

describe('colorUtils', () => {
  describe('hexToRgb', () => {
    it('converts hex color to RGB object', () => {
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
      expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 })
      expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 })
      expect(hexToRgb('#3b82f6')).toEqual({ r: 59, g: 130, b: 246 })
    })

    it('handles hex without # prefix', () => {
      expect(hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('returns null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull()
      expect(hexToRgb('#xyz')).toBeNull()
      expect(hexToRgb('')).toBeNull()
    })
  })

  describe('rgbToHex', () => {
    it('converts RGB values to hex string', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff')
      expect(rgbToHex(59, 130, 246)).toBe('#3b82f6')
    })
  })

  describe('lightenColor', () => {
    it('lightens a color by the specified percentage', () => {
      const originalColor = '#808080' // Medium gray
      const lightenedColor = lightenColor(originalColor, 50)
      
      // Should be lighter than original
      const original = hexToRgb(originalColor)!
      const lightened = hexToRgb(lightenedColor)!
      
      expect(lightened.r).toBeGreaterThan(original.r)
      expect(lightened.g).toBeGreaterThan(original.g)
      expect(lightened.b).toBeGreaterThan(original.b)
    })

    it('returns original color for invalid hex', () => {
      expect(lightenColor('invalid', 50)).toBe('invalid')
    })

    it('handles 100% lightening (should approach white)', () => {
      const result = lightenColor('#000000', 100)
      expect(result).toBe('#ffffff')
    })
  })

  describe('darkenColor', () => {
    it('darkens a color by the specified percentage', () => {
      const originalColor = '#808080' // Medium gray
      const darkenedColor = darkenColor(originalColor, 50)
      
      // Should be darker than original
      const original = hexToRgb(originalColor)!
      const darkened = hexToRgb(darkenedColor)!
      
      expect(darkened.r).toBeLessThan(original.r)
      expect(darkened.g).toBeLessThan(original.g)
      expect(darkened.b).toBeLessThan(original.b)
    })

    it('returns original color for invalid hex', () => {
      expect(darkenColor('invalid', 50)).toBe('invalid')
    })

    it('handles 100% darkening (should be black)', () => {
      const result = darkenColor('#ffffff', 100)
      expect(result).toBe('#000000')
    })
  })

  describe('getContrastColor', () => {
    it('returns black for light colors', () => {
      expect(getContrastColor('#ffffff')).toBe('#000000') // White
      expect(getContrastColor('#ffff00')).toBe('#000000') // Yellow
      expect(getContrastColor('#00ffff')).toBe('#000000') // Cyan
    })

    it('returns white for dark colors', () => {
      expect(getContrastColor('#000000')).toBe('#ffffff') // Black
      expect(getContrastColor('#0000ff')).toBe('#ffffff') // Blue
      expect(getContrastColor('#800080')).toBe('#ffffff') // Purple
    })

    it('returns black for invalid hex', () => {
      expect(getContrastColor('invalid')).toBe('#000000')
    })
  })
})