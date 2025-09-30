// Color utility functions
class ColorUtils {
    // Convert OKLCH to RGB with improved accuracy
    static oklchToRgb(l, c, h) {
        // Convert OKLCH to OKLab
        const hRad = (h * Math.PI) / 180;
        const a = c * Math.cos(hRad);
        const b = c * Math.sin(hRad);
        
        // OKLab to linear RGB conversion matrix
        const lr = l + 0.3963377774 * a + 0.2158037573 * b;
        const lg = l - 0.1055613458 * a - 0.0638541728 * b;
        const lb = l - 0.0894841775 * a - 1.2914855480 * b;
        
        // Cube root transformation
        const lrCubed = lr ** 3;
        const lgCubed = lg ** 3;
        const lbCubed = lb ** 3;
        
        // Linear RGB to sRGB conversion with proper gamma correction
        const toSRGB = (linear) => {
            const clamped = Math.max(0, Math.min(1, linear));
            return clamped <= 0.0031308 
                ? 12.92 * clamped 
                : 1.055 * (clamped ** (1/2.4)) - 0.055;
        };
        
        const r = Math.round(toSRGB(lrCubed) * 255);
        const g = Math.round(toSRGB(lgCubed) * 255);
        const bVal = Math.round(toSRGB(lbCubed) * 255);
        
        return { r, g, b: bVal };
    }
    
    // Convert RGB to hex
    static rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("").toUpperCase();
    }
    
    // Convert OKLCH to hex
    static oklchToHex(l, c, h) {
        const rgb = this.oklchToRgb(l, c, h);
        return this.rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    
    // Calculate relative luminance for contrast calculation
    static getRelativeLuminance(r, g, b) {
        const sRGB = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    }
    
    // Get contrast color (white or black) based on background
    static getContrastColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        const luminance = this.getRelativeLuminance(r, g, b);
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
    
    // Generate a random OKLCH color
    static generateRandomOklch() {
        return {
            l: 0.3 + Math.random() * 0.6,  // Lightness 30-90%
            c: 0.05 + Math.random() * 0.15, // Chroma 5-20%
            h: Math.random() * 360          // Hue 0-360°
        };
    }
}

// Color naming system (placeholder with TODO for enhancement)
class ColorNamer {
    static colorNames = [
        'Crimson', 'Scarlet', 'Ruby', 'Cherry', 'Rose', 'Coral', 'Salmon', 'Peach',
        'Orange', 'Amber', 'Gold', 'Honey', 'Yellow', 'Lime', 'Mint', 'Emerald',
        'Forest', 'Teal', 'Cyan', 'Sky', 'Azure', 'Royal', 'Navy', 'Indigo',
        'Violet', 'Purple', 'Magenta', 'Pink', 'Blush', 'Cream', 'Ivory', 'Pearl',
        'Silver', 'Slate', 'Charcoal', 'Ebony', 'Obsidian', 'Shadow', 'Storm', 'Ash'
    ];
    
    static qualifiers = [
        'Deep', 'Light', 'Bright', 'Dark', 'Soft', 'Vivid', 'Muted', 'Rich',
        'Pale', 'Bold', 'Warm', 'Cool', 'Fresh', 'Dusty', 'Smoky', 'Electric'
    ];
    
    // TODO: Implement intelligent color naming like coolors.co
    // Ideas for future enhancement:
    // - Analyze hue, saturation, and lightness to determine base color
    // - Use machine learning to map colors to descriptive names
    // - Implement a database of named colors with similarity matching
    // - Consider cultural and contextual color associations
    // - Add support for gradient-based naming (e.g., "sunset orange", "ocean blue")
    static generateColorName(hex, oklch) {
        // Placeholder implementation - random combination for now
        const qualifier = this.qualifiers[Math.floor(Math.random() * this.qualifiers.length)];
        const baseName = this.colorNames[Math.floor(Math.random() * this.colorNames.length)];
        return `${qualifier} ${baseName}`;
    }
}

// Main color palette application
class ColorPalette {
    constructor() {
        this.paletteContainer = document.getElementById('color-palette');
        this.generateButton = document.getElementById('generate-palette');
        this.colors = [];
        
        this.init();
    }
    
    init() {
        this.generateButton.addEventListener('click', () => this.generatePalette());
        this.generatePalette(); // Generate initial palette
    }
    
    generatePalette() {
        // Generate 5 random OKLCH colors
        this.colors = Array.from({ length: 5 }, () => ColorUtils.generateRandomOklch());
        this.renderPalette();
    }
    
    renderPalette() {
        this.paletteContainer.innerHTML = '';
        
        this.colors.forEach((oklchColor, index) => {
            const hex = ColorUtils.oklchToHex(oklchColor.l, oklchColor.c, oklchColor.h);
            const contrastColor = ColorUtils.getContrastColor(hex);
            const colorName = ColorNamer.generateColorName(hex, oklchColor);
            
            const colorBlock = this.createColorBlock(hex, colorName, contrastColor);
            this.paletteContainer.appendChild(colorBlock);
        });
    }
    
    createColorBlock(hex, colorName, contrastColor) {
        const block = document.createElement('div');
        block.className = 'color-block';
        block.style.backgroundColor = hex;
        
        // Add click to copy functionality
        block.addEventListener('click', () => {
            navigator.clipboard.writeText(hex).then(() => {
                this.showCopyFeedback(block);
            });
        });
        
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';
        colorInfo.style.color = contrastColor;
        
        const hexCode = document.createElement('div');
        hexCode.className = 'hex-code';
        hexCode.textContent = hex;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'color-name';
        nameElement.textContent = colorName;
        
        colorInfo.appendChild(hexCode);
        colorInfo.appendChild(nameElement);
        block.appendChild(colorInfo);
        
        return block;
    }
    
    showCopyFeedback(block) {
        const original = block.style.transform;
        block.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            block.style.transform = original;
        }, 150);
        
        // Could add a toast notification here in the future
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ColorPalette();
});