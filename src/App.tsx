import { useState } from 'react'
import ColorPalette from './components/ColorPalette'

function App() {
  const [theme, setTheme] = useState('light')
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`} data-testid="app">
      <header className="text-center py-8 bg-white dark:bg-gray-800 shadow-sm mb-8">
        <h1 data-testid="app-title" className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          DaisyDo
        </h1>
        <p data-testid="app-subtitle" className="text-lg text-gray-600 dark:text-gray-300">
          Tailwind Theme Generator
        </p>
      </header>
      
      <main className="max-w-7xl mx-auto px-4">
        <div className="mb-8 max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="theme-toggle" className="font-medium">Theme:</label>
            <button 
              id="theme-toggle"
              data-testid="theme-toggle"
              onClick={toggleTheme}
              className="px-4 py-2 border-2 border-current bg-transparent rounded hover:bg-current hover:text-white transition-colors capitalize"
            >
              {theme}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="primary-color" className="font-medium">Primary Color:</label>
            <div className="flex items-center gap-2">
              <input
                id="primary-color"
                data-testid="primary-color-input"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-8 border-none rounded cursor-pointer"
              />
              <span data-testid="primary-color-value" className="font-mono text-sm">
                {primaryColor}
              </span>
            </div>
          </div>
        </div>

        <ColorPalette />

        <section className="mt-12 text-center" data-testid="preview-section">
          <h2 className="text-2xl font-semibold mb-6">Theme Preview</h2>
          <div 
            className="w-24 h-24 mx-auto mb-6 rounded-lg flex items-center justify-center text-white font-medium shadow-lg" 
            data-testid="color-preview"
            style={{ backgroundColor: primaryColor }}
          >
            Primary Color Sample
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            <button 
              className="px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:-translate-y-1 transition-transform" 
              data-testid="sample-button"
              style={{ backgroundColor: primaryColor }}
            >
              Sample Button
            </button>
            <div className={`p-6 min-w-48 rounded-lg backdrop-blur-sm border ${
              theme === 'dark' 
                ? 'bg-white/10 border-white/20' 
                : 'bg-black/5 border-black/10'
            }`} data-testid="sample-card">
              <h3 className="text-lg font-semibold mb-2">Sample Card</h3>
              <p className="opacity-80">This is a sample card component</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App