import { ColorPalette } from './components/color-palette/ColorPalette';
import { ThemeVisualizer } from './components/theme-visualizer/ThemeVisualizer';

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
          DaisyDo
        </h1>
        <p className="text-sm text-white/80 drop-shadow">
          Tailwind Theme Generator
        </p>
      </div>

      {/* Color Palette - Top Half */}
      <ColorPalette />
      
      {/* Theme Visualizer - Bottom Half */}
      <ThemeVisualizer />
    </div>
  );
}

export default App
