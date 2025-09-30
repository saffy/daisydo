import { useState } from 'react'
import ColorPicker from './ColorPicker'
import CSSExportModal from './CSSExportModal'
import { generateDaisyUICSS } from '../utils/cssGenerator'

const defaultPalette = {
  // Base colors
  'base-100': '#ffffff',
  'base-200': '#f2f2f2',
  'base-300': '#e6e6df',
  'base-content': '#1f2937',
  
  // Primary colors
  'primary': '#3b82f6',
  'primary-content': '#ffffff',
  
  // Secondary colors  
  'secondary': '#f59e0b',
  'secondary-content': '#ffffff',
  
  // Accent colors
  'accent': '#10b981',
  'accent-content': '#ffffff',
  
  // Neutral colors
  'neutral': '#374151',
  'neutral-content': '#ffffff',
  
  // Semantic colors
  'info': '#3b82f6',
  'info-content': '#ffffff',
  'success': '#10b981',
  'success-content': '#ffffff',
  'warning': '#f59e0b',
  'warning-content': '#ffffff',
  'error': '#ef4444',
  'error-content': '#ffffff',
}

const colorSections = [
  {
    title: 'Base Colors',
    colors: ['base-100', 'base-200', 'base-300', 'base-content']
  },
  {
    title: 'Brand Colors',
    colors: ['primary', 'primary-content', 'secondary', 'secondary-content', 'accent', 'accent-content']
  },
  {
    title: 'Neutral Colors',
    colors: ['neutral', 'neutral-content']
  },
  {
    title: 'Semantic Colors',
    colors: ['info', 'info-content', 'success', 'success-content', 'warning', 'warning-content', 'error', 'error-content']
  }
]

function PaletteEditor() {
  const [palette, setPalette] = useState(defaultPalette)
  const [showExportModal, setShowExportModal] = useState(false)
  const [themeName, setThemeName] = useState('light')

  const handleColorChange = (colorKey, value) => {
    setPalette(prev => ({
      ...prev,
      [colorKey]: value
    }))
  }

  const handleExportCSS = () => {
    setShowExportModal(true)
  }

  const generatedCSS = generateDaisyUICSS(palette, themeName)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Theme Controls */}
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Theme Name</span>
              </label>
              <input 
                type="text" 
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                className="input input-bordered w-full max-w-xs" 
                placeholder="Enter theme name" 
              />
            </div>
            <button 
              className="btn btn-primary btn-lg gap-2"
              onClick={handleExportCSS}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {themeName} CSS
            </button>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="grid gap-6">
        {colorSections.map((section) => (
          <div key={section.title} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">{section.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.colors.map((colorKey) => (
                  <ColorPicker
                    key={colorKey}
                    label={colorKey}
                    value={palette[colorKey]}
                    onChange={(value) => handleColorChange(colorKey, value)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS Export Modal */}
      <CSSExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        css={generatedCSS}
        themeName={themeName}
      />
    </div>
  )
}

export default PaletteEditor