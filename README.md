# DaisyDo
**Tailwind Theme Generator** - Daisy Daisy Give Me Your Answer Do

A web-based Tailwind CSS theme generator with powerful undo/redo functionality for seamless theme development.

![DaisyDo Screenshot](https://github.com/user-attachments/assets/e4b9a110-ecf9-46f9-9fb2-21526711cc42)

## Features

### 🎨 Theme Customization
- **Color Palette**: Configure primary, secondary, accent, and background colors
- **Typography**: Choose from sans-serif, serif, or monospace font families
- **Font Sizing**: Select from small, base, or large text sizes
- **Live Preview**: See your theme changes in real-time with sample components

### ↶ ↷ Undo/Redo System
- **50-State History**: Track up to 50 theme modifications with intelligent memory management
- **Visual Feedback**: Button states clearly indicate available actions
- **Keyboard Shortcuts**: Use `Ctrl+Z` for undo and `Ctrl+Y` for redo
- **Session-Based**: History resets on page refresh for clean sessions
- **State Counter**: Always know your position in the history (e.g., "3/50 states")

### 🛠 Developer Tools
- **Generated Config**: Automatically generates Tailwind CSS configuration
- **Copy to Clipboard**: One-click copy of your theme configuration
- **JSON Format**: Clean, properly formatted output ready for use

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saffy/daisydo.git
   cd daisydo
   ```

2. **Start a local server**:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js
   npx serve .
   
   # Or any other static file server
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8000`

## How to Use

### Basic Theme Creation
1. Adjust colors using the color pickers in the "Theme Colors" section
2. Select typography options in the "Typography" section  
3. Watch the "Live Preview" update in real-time
4. Copy the generated Tailwind config when satisfied

### Using Undo/Redo
- **Undo**: Click the "↶ Undo" button or press `Ctrl+Z`
- **Redo**: Click the "↷ Redo" button or press `Ctrl+Y`
- **Track Progress**: Monitor your position with the state counter (e.g., "15/50 states")
- **Fresh Start**: Refresh the page to clear history and start over

### Generated Configuration
The tool outputs a complete Tailwind CSS configuration object:

```javascript
{
  "theme": {
    "extend": {
      "colors": {
        "primary": "#3b82f6",
        "secondary": "#10b981", 
        "accent": "#f59e0b",
        "background": "#f9fafb"
      },
      "fontFamily": {
        "display": ["Inter", "sans-serif"]
      },
      "fontSize": {
        "theme-base": "16px"
      }
    }
  }
}
```

## Technical Implementation

### Undo/Redo Architecture
- **State Management**: Each theme change creates a new state in the history array
- **Memory Efficiency**: Limited to 50 states to prevent memory bloat
- **Smart Navigation**: Tracks current position and manages forward/backward navigation
- **Session Isolation**: History is cleared on page load, ensuring clean sessions

### Browser Compatibility
- Modern browsers with ES6+ support
- CSS Custom Properties for theming
- Keyboard event handling for shortcuts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
