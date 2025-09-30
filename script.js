class ThemeGenerator {
    constructor() {
        this.colors = [];
        this.lockedStates = [false, false, false, false, false]; // All unlocked by default
        this.container = document.querySelector('.colors-container');
        
        this.initializeColors();
        this.render();
        this.bindEvents();
    }

    // Generate a random hex color
    generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Initialize with 5 random colors
    initializeColors() {
        this.colors = Array(5).fill().map(() => this.generateRandomColor());
    }

    // Check if a color is light or dark for text contrast
    isLightColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
    }

    // Toggle lock state for a color
    toggleLock(index) {
        this.lockedStates[index] = !this.lockedStates[index];
        this.render();
    }

    // Randomize colors (but keep locked ones)
    randomizeColors() {
        this.colors = this.colors.map((color, index) => {
            return this.lockedStates[index] ? color : this.generateRandomColor();
        });
        this.render();
    }

    // Render the color boxes
    render() {
        this.container.innerHTML = '';
        
        this.colors.forEach((color, index) => {
            const isLocked = this.lockedStates[index];
            const isLight = this.isLightColor(color);
            const textColor = isLight ? '#1f2937' : '#ffffff';
            
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;
            colorBox.style.color = textColor;
            
            colorBox.innerHTML = `
                <div class="lock-icon" data-index="${index}">
                    ${isLocked ? this.getLockIcon() : this.getUnlockIcon()}
                </div>
                <div class="color-code">${color.toUpperCase()}</div>
                <div class="lock-status">${isLocked ? 'Locked' : 'Unlocked'}</div>
            `;
            
            this.container.appendChild(colorBox);
        });

        // Bind click events to lock icons
        this.container.querySelectorAll('.lock-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.toggleLock(index);
            });
        });
    }

    // Lock icon SVG
    getLockIcon() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        `;
    }

    // Unlock icon SVG
    getUnlockIcon() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h16.5A2.25 2.25 0 0022.5 19.5v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        `;
    }

    // Bind keyboard events
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent page scrolling
                this.randomizeColors();
            }
        });
    }
}

// Initialize the theme generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ThemeGenerator();
});