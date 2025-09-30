import { useColorPalette } from '../../hooks/useColorPalette';
import { generateDaisyUITheme, copyToClipboard } from '../../utils/colorUtils';
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={handleExportTheme} variant="primary" className="w-full">
          {exportCopied ? 'Theme Copied!' : 'Export DaisyUI Theme'}
        </Button>
      </div>

      {/* Theme preview components */}
      <div className="space-y-6">
        {/* Color Swatches */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Color Palette</h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(daisyTheme).map(([name, value]) => (
                <div key={name} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border border-base-300 flex-shrink-0"
                    style={{ backgroundColor: value }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs font-mono text-base-content/70 truncate">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
            <div className="stats stats-vertical w-full">
              <div className="stat">
                <div className="stat-title">Colors</div>
                <div className="stat-value text-primary">5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}