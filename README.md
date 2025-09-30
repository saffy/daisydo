# DaisyDo 🌼
**Tailwind Theme Generator a.k.a Daisy Daisy Give Me Your Answer Do**

A powerful theme generation system for DaisyUI that uses the OKLCH color space to create beautiful, accessible color schemes with automatic variants and comprehensive theming options.

## Features

- 🎨 **OKLCH Color Space**: Advanced color manipulation using the perceptually uniform OKLCH color space
- 🌈 **Automatic Color Variants**: Generate lighter, darker, and more saturated versions of your base colors
- 📦 **Complete DaisyUI Support**: Full compatibility with DaisyUI's color system and CSS variables
- ⚙️ **Customizable UI Properties**: Configure radius, borders, effects, and field sizes
- 🔧 **Multiple Export Formats**: Export as CSS variables or DaisyUI theme objects
- ✅ **Built-in Validation**: Comprehensive theme configuration validation
- 🚀 **Zero Dependencies**: Only uses the lightweight `culori` library for color manipulation

## Installation

```bash
npm install daisydo
```

## Quick Start

```javascript
import { DaisyDoThemeGenerator } from 'daisydo';

// Create a theme generator with default settings
const generator = new DaisyDoThemeGenerator();

// Generate CSS variables
const css = generator.generateCSS();
console.log(css);

// Generate DaisyUI theme object for Tailwind config
const theme = generator.generateTheme('my-theme');
console.log(theme);
```

## Advanced Usage

### Custom Color Scheme

```javascript
import { createThemeGenerator } from 'daisydo';

const generator = createThemeGenerator({
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
    selector: 1,    // Checkbox, toggle, badge radius (rem)
    field: 0.5,     // Button, input, select, tab radius (rem)
    box: 2          // Card, modal, alert radius (rem)
  },
  effects: {
    depth3d: true,  // Enable 3D depth effects
    noise: false    // Disable noise effects
  },
  border: 2,        // Border width (px)
  fieldSize: 0.3125 // Field base size (rem)
});
```

### Dynamic Theme Updates

```javascript
const generator = new DaisyDoThemeGenerator();

// Update theme configuration
generator.updateConfig({
  colors: { primary: '#8b5cf6' },
  radius: { box: 0 }
});

// Export updated theme
const updatedCSS = generator.export('css');
```

## Color System

DaisyDo uses **5 primary colors** as specified in the requirements:

1. **Primary** - Action buttons, highlights, toggle on color
2. **Secondary** - Secondary button color
3. **Accent** - Accent buttons, accent label backgrounds
4. **Neutral** - Generic buttons, labels, chat bubble backgrounds
5. **Base** - Page background, box backgrounds, border colors

Plus **4 semantic colors** for form elements and feedback:

- **Info** - Informational messages (typically blue)
- **Success** - Success messages (typically green)  
- **Warning** - Warning messages (typically yellow)
- **Error** - Error messages (typically red)

### Automatic Color Variants

Each color automatically generates variants using OKLCH color space:

- `lighter` - 15% lighter
- `light` - 8% lighter  
- `base` - Original color
- `dark` - 8% darker
- `darker` - 15% darker
- `saturated` - More saturated
- `desaturated` - Less saturated
- `content` - High contrast text color
- `focus` - Focus state color

## UI Customization Options

### Radius Options
- **Selector** (checkbox, toggle, badge): 0rem, 0.25rem, 0.5rem, 1rem, 2rem
- **Field** (button, input, select, tab): 0rem, 0.25rem, 0.5rem, 1rem, 2rem  
- **Box** (card, modal, alert): 0rem, 0.25rem, 0.5rem, 1rem, 2rem

### Border Options
- Width: 0.5px to 2px

### Field Size Options  
- Base size: 0.1875rem to 0.3125rem (equivalent to 3px to 5px)

### Effects
- **3D Depth**: Boolean - adds depth effects to buttons and interactions
- **Noise**: Boolean - adds noise texture effects

## API Reference

### `DaisyDoThemeGenerator`

Main theme generator class.

#### Constructor
```javascript
new DaisyDoThemeGenerator(config?)
```

#### Methods

- `generateCSS()` - Generate CSS variables string
- `generateTheme(themeName)` - Generate DaisyUI theme object
- `export(format, themeName?)` - Export theme ('css' or 'json')
- `updateConfig(newConfig)` - Update theme configuration
- `getConfig()` - Get current configuration

### Utility Functions

```javascript
import { 
  lighten, 
  darken, 
  saturate, 
  desaturate, 
  generateColorVariants,
  getContrastColor 
} from 'daisydo';

// Create color variants
const variants = generateColorVariants('#570df8');
// Result: { base, lighter, light, dark, darker, saturated, desaturated }

// Manual color manipulation
const lighter = lighten('#570df8', 0.1);
const darker = darken('#570df8', 0.1);
const saturated = saturate('#570df8', 0.05);
```

## CSS Variables Output

DaisyDo generates comprehensive CSS variables compatible with DaisyUI:

```css
:root {
  /* Primary Colors */
  --p: 281 72% 49%;
  --pc: 0 0% 100%;
  --pf: 0 0% 90%;
  
  /* Secondary Colors */
  --s: 343 69% 64%;
  --sc: 0 0% 0%;
  --sf: 0 0% 20%;
  
  /* Base Colors */
  --b1: 0 0% 100%;
  --b2: 0 0% 100%;
  --b3: 0 0% 85%;
  --bc: 0 0% 0%;
  
  /* UI Variables */
  --rounded-box: 1rem;
  --rounded-btn: 0.25rem;
  --border-btn: 1px;
  /* ... and many more */
}
```

## Integration with Tailwind CSS

Add the generated theme to your `tailwind.config.js`:

```javascript
import { createThemeGenerator } from 'daisydo';

const generator = createThemeGenerator({
  // your theme config
});

const themes = generator.generateTheme('my-custom-theme');

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      ...themes
    ],
  },
}
```

## Examples

See the `examples/` directory for more comprehensive usage examples.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
