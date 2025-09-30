import { useState } from 'react'
import PaletteEditor from './components/PaletteEditor'

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">DaisyDo</h1>
          <p className="text-base-content/70">Tailwind Theme Generator</p>
          <p className="text-base-content/60 text-sm">Daisy Daisy Give Me Your Answer Do</p>
        </div>
        <PaletteEditor />
      </div>
    </div>
  )
}

export default App
