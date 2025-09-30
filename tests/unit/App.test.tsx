import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../../src/App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByTestId('app-title')).toHaveTextContent('DaisyDo')
    expect(screen.getByTestId('app-subtitle')).toHaveTextContent('Tailwind Theme Generator')
  })

  it('has light theme by default', () => {
    render(<App />)
    const app = screen.getByTestId('app')
    expect(app).toHaveClass('bg-gray-50', 'text-gray-900')
  })

  it('toggles theme when button is clicked', () => {
    render(<App />)
    const themeToggle = screen.getByTestId('theme-toggle')
    const app = screen.getByTestId('app')

    expect(app).toHaveClass('bg-gray-50', 'text-gray-900')
    expect(themeToggle).toHaveTextContent('light')

    fireEvent.click(themeToggle)

    expect(app).toHaveClass('bg-gray-900', 'text-white')
    expect(themeToggle).toHaveTextContent('dark')
  })

  it('updates primary color when color input changes', () => {
    render(<App />)
    const colorInput = screen.getByTestId('primary-color-input')
    const colorValue = screen.getByTestId('primary-color-value')
    const colorPreview = screen.getByTestId('color-preview')

    expect(colorValue).toHaveTextContent('#3b82f6')
    expect(colorPreview).toHaveStyle('background-color: rgb(59, 130, 246)')

    fireEvent.change(colorInput, { target: { value: '#ff0000' } })

    expect(colorValue).toHaveTextContent('#ff0000')
    expect(colorPreview).toHaveStyle('background-color: rgb(255, 0, 0)')
  })

  it('renders all required UI elements', () => {
    render(<App />)
    
    expect(screen.getByTestId('app-title')).toBeInTheDocument()
    expect(screen.getByTestId('app-subtitle')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('primary-color-input')).toBeInTheDocument()
    expect(screen.getByTestId('primary-color-value')).toBeInTheDocument()
    expect(screen.getByTestId('preview-section')).toBeInTheDocument()
    expect(screen.getByTestId('color-preview')).toBeInTheDocument()
    expect(screen.getByTestId('sample-button')).toBeInTheDocument()
    expect(screen.getByTestId('sample-card')).toBeInTheDocument()
  })

  it('applies primary color to sample button', () => {
    render(<App />)
    const colorInput = screen.getByTestId('primary-color-input')
    const sampleButton = screen.getByTestId('sample-button')

    fireEvent.change(colorInput, { target: { value: '#00ff00' } })

    expect(sampleButton).toHaveStyle('background-color: rgb(0, 255, 0)')
  })
})