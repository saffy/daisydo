import { useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`app ${theme}`} data-testid="app">
      <header className="app-header">
        <h1 data-testid="app-title">DaisyDo</h1>
        <p data-testid="app-subtitle">Tailwind Theme Generator</p>
      </header>
      
      <main className="theme-controls">
        <div className="control-group">
          <label htmlFor="theme-toggle">Theme:</label>
          <button 
            id="theme-toggle"
            data-testid="theme-toggle"
            onClick={toggleTheme}
            className="toggle-button"
          >
            {theme}
          </button>
        </div>
        
        <div className="control-group">
          <label htmlFor="primary-color">Primary Color:</label>
          <input
            id="primary-color"
            data-testid="primary-color-input"
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="color-input"
          />
          <span data-testid="primary-color-value">{primaryColor}</span>
        </div>
      </main>

      <section className="preview-section" data-testid="preview-section">
        <h2>Theme Preview</h2>
        <div 
          className="color-preview" 
          data-testid="color-preview"
          style={{ backgroundColor: primaryColor }}
        >
          Primary Color Sample
        </div>
        <div className="sample-components">
          <button 
            className="sample-button" 
            data-testid="sample-button"
            style={{ backgroundColor: primaryColor }}
          >
            Sample Button
          </button>
          <div className="sample-card" data-testid="sample-card">
            <h3>Sample Card</h3>
            <p>This is a sample card component</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App