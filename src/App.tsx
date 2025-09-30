import { useState } from 'react';
import { ColorPalette } from './components/color-palette/ColorPalette';
import { ThemeVisualizer } from './components/theme-visualizer/ThemeVisualizer';
import { Drawer } from './components/ui/Drawer';
import { Toolbar } from './components/ui/Toolbar';
import { useColorPalette } from './hooks/useColorPalette';

function App() {
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const { randomizeColors } = useColorPalette();

  return (
    <div className="min-h-screen bg-base-100 relative">
      {/* Header */}
      <div className="absolute top-4 left-4 z-20">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
          DaisyDo
        </h1>
        <p className="text-sm text-white/80 drop-shadow">
          Tailwind Theme Generator
        </p>
      </div>

      {/* Toolbar */}
      <Toolbar 
        onOpenThemeVisualizer={() => setIsThemeDrawerOpen(true)}
        onRandomizeColors={randomizeColors}
      />

      {/* Keyboard shortcut hint */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
          Press <kbd className="kbd kbd-xs bg-white/20 text-white border-white/30">Space</kbd> to randomize colors
        </div>
      </div>

      {/* Color Palette - Full Screen */}
      <ColorPalette />
      
      {/* Theme Visualizer Drawer */}
      <Drawer
        isOpen={isThemeDrawerOpen}
        onClose={() => setIsThemeDrawerOpen(false)}
        title="Theme Preview"
      >
        <ThemeVisualizer />
      </Drawer>
    </div>
  );
}

export default App
