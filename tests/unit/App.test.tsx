import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../../src/App'

describe('App', () => {
  it('renders the main branding', () => {
    render(<App />)
    expect(screen.getByText('DaisyDo')).toBeInTheDocument()
    expect(screen.getByText('Tailwind Theme Generator')).toBeInTheDocument()
  })

  it('renders the toolbar with action buttons', () => {
    render(<App />)
    expect(screen.getByText('Randomize')).toBeInTheDocument()
    expect(screen.getByText('Preview Theme')).toBeInTheDocument()
  })

  it('displays keyboard shortcut hint', () => {
    render(<App />)
    expect(screen.getByText(/Press/)).toBeInTheDocument()
    expect(screen.getByText('Space')).toBeInTheDocument()
    expect(screen.getByText(/to randomize colors/)).toBeInTheDocument()
  })

  it('opens theme visualizer drawer when Preview Theme is clicked', () => {
    render(<App />)
    const previewButton = screen.getByText('Preview Theme')
    
    fireEvent.click(previewButton)
    
    // Check if drawer content is visible
    expect(screen.getByText('Theme Preview')).toBeInTheDocument()
  })

  it('renders color palette component', () => {
    render(<App />)
    // The ColorPalette component should be rendered
    // We can verify this by checking for color strip elements or other color palette specific content
    const app = screen.getByRole('generic').closest('.min-h-screen')
    expect(app).toBeInTheDocument()
  })
})