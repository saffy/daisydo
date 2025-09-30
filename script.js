class ColorPalette {
    constructor() {
        this.colors = [
            { name: 'primary', value: '#3b82f6' },
            { name: 'secondary', value: '#6366f1' },
            { name: 'accent', value: '#8b5cf6' },
            { name: 'neutral', value: '#374151' },
            { name: 'base-100', value: '#ffffff' },
            { name: 'base-200', value: '#f3f4f6' },
            { name: 'base-300', value: '#e5e7eb' },
            { name: 'info', value: '#06b6d4' },
            { name: 'success', value: '#10b981' },
            { name: 'warning', value: '#f59e0b' },
            { name: 'error', value: '#ef4444' },
            { name: 'surface', value: '#f9fafb' }
        ];
        
        this.draggedElement = null;
        this.draggedIndex = null;
        
        this.init();
    }
    
    init() {
        this.renderPalette();
        this.generateTailwindConfig();
    }
    
    renderPalette() {
        const palette = document.getElementById('colorPalette');
        palette.innerHTML = '';
        
        this.colors.forEach((color, index) => {
            const colorItem = this.createColorItem(color, index);
            palette.appendChild(colorItem);
        });
    }
    
    createColorItem(color, index) {
        const item = document.createElement('div');
        item.className = 'color-item bg-white rounded-lg p-4 shadow-md border border-gray-200';
        item.draggable = true;
        item.dataset.index = index;
        
        item.innerHTML = `
            <div class="color-preview mb-3" style="background-color: ${color.value}"></div>
            <div class="text-center">
                <div class="color-name text-sm font-medium text-gray-800">${color.name}</div>
                <div class="text-xs text-gray-500 mt-1">${color.value}</div>
            </div>
        `;
        
        // Add drag event listeners
        item.addEventListener('dragstart', (e) => this.handleDragStart(e));
        item.addEventListener('dragend', (e) => this.handleDragEnd(e));
        item.addEventListener('dragover', (e) => this.handleDragOver(e));
        item.addEventListener('drop', (e) => this.handleDrop(e));
        item.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        item.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        
        // Add click to edit color functionality
        const colorPreview = item.querySelector('.color-preview');
        colorPreview.addEventListener('click', () => this.editColor(index));
        
        return item;
    }
    
    handleDragStart(e) {
        this.draggedElement = e.target;
        this.draggedIndex = parseInt(e.target.dataset.index);
        
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        
        // Remove drag-over class from all items
        document.querySelectorAll('.color-item').forEach(item => {
            item.classList.remove('drag-over');
        });
        
        this.draggedElement = null;
        this.draggedIndex = null;
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        if (e.target.closest('.color-item') && e.target.closest('.color-item') !== this.draggedElement) {
            e.target.closest('.color-item').classList.add('drag-over');
        }
    }
    
    handleDragLeave(e) {
        if (e.target.closest('.color-item')) {
            e.target.closest('.color-item').classList.remove('drag-over');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        
        const dropTarget = e.target.closest('.color-item');
        if (!dropTarget || dropTarget === this.draggedElement) {
            return;
        }
        
        const dropIndex = parseInt(dropTarget.dataset.index);
        
        // Reorder the colors array
        this.reorderColors(this.draggedIndex, dropIndex);
        
        // Re-render the palette
        this.renderPalette();
        
        // Update the Tailwind config
        this.generateTailwindConfig();
    }
    
    reorderColors(fromIndex, toIndex) {
        const movedColor = this.colors.splice(fromIndex, 1)[0];
        this.colors.splice(toIndex, 0, movedColor);
    }
    
    editColor(index) {
        const color = this.colors[index];
        const newValue = prompt(`Edit color value for "${color.name}":`, color.value);
        
        if (newValue && this.isValidColor(newValue)) {
            this.colors[index].value = newValue;
            this.renderPalette();
            this.generateTailwindConfig();
        } else if (newValue) {
            alert('Please enter a valid color value (hex, rgb, hsl, or color name)');
        }
    }
    
    isValidColor(color) {
        // Basic color validation
        const validHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const validRgb = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
        const validRgba = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;
        const validHsl = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
        
        return validHex.test(color) || validRgb.test(color) || validRgba.test(color) || validHsl.test(color);
    }
    
    generateTailwindConfig() {
        const config = {
            theme: {
                extend: {
                    colors: {}
                }
            }
        };
        
        this.colors.forEach(color => {
            config.theme.extend.colors[color.name] = color.value;
        });
        
        const configString = `module.exports = ${JSON.stringify(config, null, 2)}`;
        document.getElementById('tailwindConfig').innerHTML = `<code>${configString}</code>`;
    }
}

// Initialize the color palette when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ColorPalette();
});