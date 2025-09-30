class PaletteAdjuster {
    constructor() {
        // Default palette colors (sample Tailwind-style colors)
        this.originalPalette = [
            '#ef4444', // red-500
            '#f97316', // orange-500
            '#eab308', // yellow-500
            '#22c55e', // green-500
            '#06b6d4', // cyan-500
            '#3b82f6', // blue-500
            '#8b5cf6', // violet-500
            '#ec4899', // pink-500
            '#6b7280', // gray-500
            '#1f2937'  // gray-800
        ];
        
        this.currentPalette = [...this.originalPalette];
        this.adjustments = {
            hue: 0,
            saturation: 0,
            brightness: 0,
            temperature: 0
        };
        
        this.init();
    }
    
    init() {
        this.renderPalette();
        this.setupEventListeners();
        this.setupSliders();
        this.generateTailwindConfig();
    }
    
    setupEventListeners() {
        // Popup controls
        document.getElementById('adjustPaletteBtn').addEventListener('click', () => {
            document.getElementById('adjustmentPopup').style.display = 'flex';
        });
        
        document.getElementById('closePopupBtn').addEventListener('click', () => {
            document.getElementById('adjustmentPopup').style.display = 'none';
        });
        
        // Click outside popup to close
        document.getElementById('adjustmentPopup').addEventListener('click', (e) => {
            if (e.target.id === 'adjustmentPopup') {
                document.getElementById('adjustmentPopup').style.display = 'none';
            }
        });
        
        // Button controls
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetAdjustments();
        });
        
        document.getElementById('applyBtn').addEventListener('click', () => {
            document.getElementById('adjustmentPopup').style.display = 'none';
        });
        
        // Input field listeners
        ['hue', 'saturation', 'brightness', 'temperature'].forEach(type => {
            const input = document.getElementById(`${type}Input`);
            input.addEventListener('input', (e) => {
                this.updateAdjustment(type, parseFloat(e.target.value));
            });
        });
    }
    
    setupSliders() {
        ['hue', 'saturation', 'brightness', 'temperature'].forEach(type => {
            const track = document.querySelector(`.${type}-gradient`);
            const thumb = document.getElementById(`${type}Thumb`);
            
            let isDragging = false;
            
            const handleMove = (e) => {
                if (!isDragging) return;
                
                const rect = track.getBoundingClientRect();
                const percentage = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100));
                
                let value;
                if (type === 'hue') {
                    value = (percentage / 100) * 360;
                } else {
                    value = (percentage - 50) * 2; // -100 to +100
                }
                
                this.updateAdjustment(type, value);
                thumb.style.left = percentage + '%';
            };
            
            thumb.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault();
            });
            
            track.addEventListener('click', (e) => {
                const rect = track.getBoundingClientRect();
                const percentage = (e.clientX - rect.left) / rect.width * 100;
                
                let value;
                if (type === 'hue') {
                    value = (percentage / 100) * 360;
                } else {
                    value = (percentage - 50) * 2;
                }
                
                this.updateAdjustment(type, value);
                thumb.style.left = percentage + '%';
            });
            
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });
    }
    
    updateAdjustment(type, value) {
        this.adjustments[type] = value;
        
        // Update input field
        document.getElementById(`${type}Input`).value = Math.round(value);
        
        // Update slider position
        const thumb = document.getElementById(`${type}Thumb`);
        let percentage;
        if (type === 'hue') {
            percentage = (value / 360) * 100;
        } else {
            percentage = (value / 2) + 50; // Convert -100 to +100 range to 0-100%
        }
        thumb.style.left = Math.max(0, Math.min(100, percentage)) + '%';
        
        // Apply adjustments and update palette
        this.applyAdjustments();
    }
    
    applyAdjustments() {
        this.currentPalette = this.originalPalette.map(color => {
            return this.adjustColor(color, this.adjustments);
        });
        
        this.renderPalette();
        this.generateTailwindConfig();
    }
    
    adjustColor(hexColor, adjustments) {
        // Convert hex to HSL
        const hsl = this.hexToHsl(hexColor);
        
        // Apply hue adjustment (additive)
        hsl.h = (hsl.h + adjustments.hue) % 360;
        if (hsl.h < 0) hsl.h += 360;
        
        // Apply saturation adjustment
        hsl.s = Math.max(0, Math.min(100, hsl.s + adjustments.saturation));
        
        // Apply brightness adjustment
        hsl.l = Math.max(0, Math.min(100, hsl.l + adjustments.brightness));
        
        // Apply temperature adjustment (affects both hue and saturation slightly)
        if (adjustments.temperature !== 0) {
            const tempFactor = adjustments.temperature / 100;
            if (tempFactor > 0) {
                // Warmer - shift towards orange/red
                hsl.h = (hsl.h + tempFactor * 20) % 360;
                hsl.s = Math.max(0, Math.min(100, hsl.s + tempFactor * 10));
            } else {
                // Cooler - shift towards blue
                hsl.h = (hsl.h + tempFactor * 30) % 360;
                if (hsl.h < 0) hsl.h += 360;
            }
        }
        
        // Convert back to hex
        return this.hslToHex(hsl);
    }
    
    hexToHsl(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse RGB
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: h * 360,
            s: s * 100,
            l: l * 100
        };
    }
    
    hslToHex(hsl) {
        const h = hsl.h / 360;
        const s = hsl.s / 100;
        const l = hsl.l / 100;
        
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        const toHex = (c) => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }
    
    resetAdjustments() {
        this.adjustments = {
            hue: 0,
            saturation: 0,
            brightness: 0,
            temperature: 0
        };
        
        // Reset UI elements
        ['hue', 'saturation', 'brightness', 'temperature'].forEach(type => {
            const input = document.getElementById(`${type}Input`);
            const thumb = document.getElementById(`${type}Thumb`);
            
            input.value = 0;
            thumb.style.left = type === 'hue' ? '0%' : '50%';
        });
        
        // Reset palette
        this.currentPalette = [...this.originalPalette];
        this.renderPalette();
        this.generateTailwindConfig();
    }
    
    renderPalette() {
        const container = document.getElementById('paletteContainer');
        container.innerHTML = '';
        
        this.currentPalette.forEach((color, index) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            
            // Add click to copy functionality
            swatch.addEventListener('click', () => {
                navigator.clipboard.writeText(color).then(() => {
                    // Show brief feedback
                    const originalTitle = swatch.title;
                    swatch.title = 'Copied!';
                    setTimeout(() => {
                        swatch.title = originalTitle;
                    }, 1000);
                });
            });
            
            container.appendChild(swatch);
        });
    }
    
    generateTailwindConfig() {
        const config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: this.lightenColor(this.currentPalette[0], 0.9),
                            100: this.lightenColor(this.currentPalette[0], 0.8),
                            200: this.lightenColor(this.currentPalette[0], 0.6),
                            300: this.lightenColor(this.currentPalette[0], 0.4),
                            400: this.lightenColor(this.currentPalette[0], 0.2),
                            500: this.currentPalette[0],
                            600: this.darkenColor(this.currentPalette[0], 0.1),
                            700: this.darkenColor(this.currentPalette[0], 0.2),
                            800: this.darkenColor(this.currentPalette[0], 0.3),
                            900: this.darkenColor(this.currentPalette[0], 0.4),
                        },
                        secondary: {
                            500: this.currentPalette[1],
                        },
                        accent: {
                            500: this.currentPalette[2],
                        }
                    }
                }
            }
        };
        
        document.getElementById('tailwindConfig').textContent = JSON.stringify(config, null, 2);
    }
    
    lightenColor(hex, factor) {
        const hsl = this.hexToHsl(hex);
        hsl.l = Math.min(100, hsl.l + (100 - hsl.l) * factor);
        return this.hslToHex(hsl);
    }
    
    darkenColor(hex, factor) {
        const hsl = this.hexToHsl(hex);
        hsl.l = Math.max(0, hsl.l * (1 - factor));
        return this.hslToHex(hsl);
    }
}

// Initialize the palette adjuster when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PaletteAdjuster();
});