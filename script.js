/**
 * DaisyDo Theme Generator - Main JavaScript
 * Implements undo/redo functionality with state management
 */

class ThemeGenerator {
    constructor() {
        // Undo/Redo system configuration
        this.MAX_HISTORY = 50; // Sane limit for history states
        this.history = []; // Array to store theme states
        this.currentIndex = -1; // Current position in history
        
        // Initial theme state
        this.initialState = {
            primaryColor: '#3b82f6',
            secondaryColor: '#10b981',
            accentColor: '#f59e0b',
            backgroundColor: '#f9fafb',
            fontFamily: 'sans',
            fontSize: 'text-base'
        };
        
        // DOM element references
        this.elements = {
            undoBtn: document.getElementById('undoBtn'),
            redoBtn: document.getElementById('redoBtn'),
            historyCounter: document.getElementById('historyCounter'),
            primaryColor: document.getElementById('primaryColor'),
            secondaryColor: document.getElementById('secondaryColor'),
            accentColor: document.getElementById('accentColor'),
            backgroundColor: document.getElementById('backgroundColor'),
            fontFamily: document.getElementById('fontFamily'),
            fontSize: document.getElementById('fontSize'),
            preview: document.getElementById('preview'),
            generatedConfig: document.getElementById('generatedConfig'),
            copyBtn: document.getElementById('copyBtn')
        };
        
        this.init();
    }
    
    init() {
        // Save initial state to history
        this.saveState(this.initialState);
        
        // Bind event listeners
        this.bindEvents();
        
        // Update UI with initial state
        this.updatePreview();
        this.updateGeneratedConfig();
        this.updateHistoryUI();
        
        console.log('DaisyDo Theme Generator initialized with undo/redo functionality');
    }
    
    bindEvents() {
        // Undo/Redo button events
        this.elements.undoBtn.addEventListener('click', () => this.undo());
        this.elements.redoBtn.addEventListener('click', () => this.redo());
        
        // Theme control events
        this.elements.primaryColor.addEventListener('input', (e) => this.handleThemeChange('primaryColor', e.target.value));
        this.elements.secondaryColor.addEventListener('input', (e) => this.handleThemeChange('secondaryColor', e.target.value));
        this.elements.accentColor.addEventListener('input', (e) => this.handleThemeChange('accentColor', e.target.value));
        this.elements.backgroundColor.addEventListener('input', (e) => this.handleThemeChange('backgroundColor', e.target.value));
        this.elements.fontFamily.addEventListener('change', (e) => this.handleThemeChange('fontFamily', e.target.value));
        this.elements.fontSize.addEventListener('change', (e) => this.handleThemeChange('fontSize', e.target.value));
        
        // Copy button event
        this.elements.copyBtn.addEventListener('click', () => this.copyToClipboard());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    this.undo();
                } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
                    e.preventDefault();
                    this.redo();
                }
            }
        });
    }
    
    /**
     * Handle theme property changes and save state
     */
    handleThemeChange(property, value) {
        const currentState = this.getCurrentState();
        const newState = { ...currentState, [property]: value };
        
        // Save new state to history
        this.saveState(newState);
        
        // Update UI
        this.updatePreview();
        this.updateGeneratedConfig();
        this.updateHistoryUI();
    }
    
    /**
     * Get current theme state from form inputs
     */
    getCurrentState() {
        return {
            primaryColor: this.elements.primaryColor.value,
            secondaryColor: this.elements.secondaryColor.value,
            accentColor: this.elements.accentColor.value,
            backgroundColor: this.elements.backgroundColor.value,
            fontFamily: this.elements.fontFamily.value,
            fontSize: this.elements.fontSize.value
        };
    }
    
    /**
     * Save a new state to history
     */
    saveState(state) {
        // Remove any future states if we're not at the end of history
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }
        
        // Add new state
        this.history.push({ ...state });
        this.currentIndex++;
        
        // Enforce history limit
        if (this.history.length > this.MAX_HISTORY) {
            this.history.shift();
            this.currentIndex--;
        }
        
        console.log(`State saved. History: ${this.currentIndex + 1}/${this.history.length}`);
    }
    
    /**
     * Undo to previous state
     */
    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            const state = this.history[this.currentIndex];
            this.applyState(state);
            this.updateHistoryUI();
            console.log(`Undo performed. Current state: ${this.currentIndex + 1}/${this.history.length}`);
        }
    }
    
    /**
     * Redo to next state
     */
    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            const state = this.history[this.currentIndex];
            this.applyState(state);
            this.updateHistoryUI();
            console.log(`Redo performed. Current state: ${this.currentIndex + 1}/${this.history.length}`);
        }
    }
    
    /**
     * Apply a theme state to the form controls
     */
    applyState(state) {
        this.elements.primaryColor.value = state.primaryColor;
        this.elements.secondaryColor.value = state.secondaryColor;
        this.elements.accentColor.value = state.accentColor;
        this.elements.backgroundColor.value = state.backgroundColor;
        this.elements.fontFamily.value = state.fontFamily;
        this.elements.fontSize.value = state.fontSize;
        
        this.updatePreview();
        this.updateGeneratedConfig();
    }
    
    /**
     * Update the history UI (buttons and counter)
     */
    updateHistoryUI() {
        // Update button states
        this.elements.undoBtn.disabled = this.currentIndex <= 0;
        this.elements.redoBtn.disabled = this.currentIndex >= this.history.length - 1;
        
        // Update counter
        this.elements.historyCounter.textContent = `${this.currentIndex + 1}/${this.MAX_HISTORY} states`;
        
        // Add visual feedback
        if (this.elements.undoBtn.disabled) {
            this.elements.undoBtn.classList.add('opacity-50');
        } else {
            this.elements.undoBtn.classList.remove('opacity-50');
        }
        
        if (this.elements.redoBtn.disabled) {
            this.elements.redoBtn.classList.add('opacity-50');
        } else {
            this.elements.redoBtn.classList.remove('opacity-50');
        }
    }
    
    /**
     * Update the live preview with current theme
     */
    updatePreview() {
        const state = this.getCurrentState();
        const preview = this.elements.preview;
        
        // Apply CSS custom properties for preview
        preview.style.setProperty('--primary-color', state.primaryColor);
        preview.style.setProperty('--secondary-color', state.secondaryColor);
        preview.style.setProperty('--accent-color', state.accentColor);
        preview.style.setProperty('--background-color', state.backgroundColor);
        
        // Apply font settings
        const fontFamilyMap = {
            'sans': 'ui-sans-serif, system-ui, sans-serif',
            'serif': 'ui-serif, Georgia, serif',
            'mono': 'ui-monospace, monospace'
        };
        
        preview.style.setProperty('--font-family', fontFamilyMap[state.fontFamily]);
        
        // Update preview background
        preview.style.backgroundColor = state.backgroundColor;
    }
    
    /**
     * Update the generated Tailwind config
     */
    updateGeneratedConfig() {
        const state = this.getCurrentState();
        
        const config = {
            theme: {
                extend: {
                    colors: {
                        primary: state.primaryColor,
                        secondary: state.secondaryColor,
                        accent: state.accentColor,
                        background: state.backgroundColor
                    },
                    fontFamily: {
                        display: state.fontFamily === 'sans' ? ['Inter', 'sans-serif'] :
                                state.fontFamily === 'serif' ? ['Georgia', 'serif'] :
                                ['Fira Code', 'monospace']
                    },
                    fontSize: {
                        'theme-base': state.fontSize === 'text-sm' ? '14px' :
                                    state.fontSize === 'text-lg' ? '18px' : '16px'
                    }
                }
            }
        };
        
        this.elements.generatedConfig.textContent = JSON.stringify(config, null, 2);
    }
    
    /**
     * Copy generated config to clipboard
     */
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.elements.generatedConfig.textContent);
            
            // Visual feedback
            const originalText = this.elements.copyBtn.textContent;
            this.elements.copyBtn.textContent = '✅ Copied!';
            this.elements.copyBtn.classList.add('bg-green-500');
            this.elements.copyBtn.classList.remove('bg-blue-500');
            
            setTimeout(() => {
                this.elements.copyBtn.textContent = originalText;
                this.elements.copyBtn.classList.remove('bg-green-500');
                this.elements.copyBtn.classList.add('bg-blue-500');
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy to clipboard. Please select and copy manually.');
        }
    }
    
    /**
     * Reset theme to initial state (for debugging/testing)
     */
    reset() {
        this.history = [];
        this.currentIndex = -1;
        this.saveState(this.initialState);
        this.applyState(this.initialState);
        this.updateHistoryUI();
        console.log('Theme reset to initial state');
    }
}

// Initialize the theme generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.themeGenerator = new ThemeGenerator();
    
    // Add reset button for testing (can be removed in production)
    console.log('DaisyDo Theme Generator loaded. Use window.themeGenerator.reset() to reset the theme.');
});