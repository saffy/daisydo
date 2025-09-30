import { useColorPalette } from '../../hooks/useColorPalette';
import { generateDaisyUITheme, copyToClipboard } from '../../utils/color';
import { Button } from '../ui/Button';
import { useState } from 'react';

export function ThemeVisualizer() {
  const { colors } = useColorPalette();
  const [exportCopied, setExportCopied] = useState(false);
  
  const daisyTheme = generateDaisyUITheme(colors);

  const handleExportTheme = async () => {
    const themeConfig = {
      "custom-theme": daisyTheme
    };
    
    const configString = `// Add this to your tailwind.config.js daisyUI themes array
${JSON.stringify(themeConfig, null, 2)}`;
    
    const success = await copyToClipboard(configString);
    if (success) {
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 3000);
    }
  };

  return (
    <div className="h-1/2 w-full bg-base-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">Theme Preview</h2>
          <div className="flex gap-4 items-center">
            <Button onClick={handleExportTheme} variant="primary">
              {exportCopied ? 'Theme Copied!' : 'Export DaisyUI Theme'}
            </Button>
            <div className="text-sm text-base-content/70">
              Press <kbd className="kbd kbd-sm">Space</kbd> to randomize colors
            </div>
          </div>
        </div>

        {/* Theme preview components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buttons */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Buttons</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Form Elements</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Text input" className="input input-bordered w-full" />
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Checkbox</span>
                    <input type="checkbox" className="checkbox checkbox-primary" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Color Palette</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(daisyTheme).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border border-base-300"
                      style={{ backgroundColor: value }}
                    />
                    <span className="text-xs font-mono">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Alerts</h3>
              <div className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Your theme colors look great!</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Progress</h3>
              <div className="space-y-2">
                <progress className="progress progress-primary w-full" value="70" max="100"></progress>
                <progress className="progress progress-secondary w-full" value="40" max="100"></progress>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Stats</h3>
              <div className="stats stats-vertical">
                <div className="stat">
                  <div className="stat-title">Colors</div>
                  <div className="stat-value text-primary">5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}