// Color utility functions
function hexToLuminance(hex) {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    // Apply gamma correction
    const toLinear = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    
    const rLinear = toLinear(r);
    const gLinear = toLinear(g);
    const bLinear = toLinear(b);
    
    // Calculate luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function getContrastRatio(color1, color2) {
    const lum1 = hexToLuminance(color1);
    const lum2 = hexToLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
}

function getBestTextColor(backgroundColor) {
    const whiteContrast = getContrastRatio(backgroundColor, '#ffffff');
    const blackContrast = getContrastRatio(backgroundColor, '#000000');
    return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

// Color scheme management
let currentColorScheme = {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#8b5cf6',
    neutral: '#374151',
    background: '#f8fafc'
};

function updateColorScheme() {
    currentColorScheme = {
        primary: document.getElementById('primary').value,
        secondary: document.getElementById('secondary').value,
        accent: document.getElementById('accent').value,
        neutral: document.getElementById('neutral').value,
        background: document.getElementById('background').value
    };
}

// SVG UI mockup generator
function generateUIMockup(colors) {
    const primaryText = getBestTextColor(colors.primary);
    const secondaryText = getBestTextColor(colors.secondary);
    const accentText = getBestTextColor(colors.accent);
    const neutralText = getBestTextColor(colors.neutral);
    const backgroundText = getBestTextColor(colors.background);
    
    return `
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="800" height="600" fill="${colors.background}"/>
            
            <!-- Header -->
            <rect x="0" y="0" width="800" height="80" fill="${colors.primary}"/>
            <text x="40" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${primaryText}">Your App Name</text>
            <text x="40" y="55" font-family="Arial, sans-serif" font-size="14" fill="${primaryText}" opacity="0.8">Dashboard</text>
            
            <!-- Navigation -->
            <rect x="40" y="50" width="120" height="20" rx="10" fill="${primaryText}" opacity="0.2"/>
            
            <!-- Main Content Area -->
            <rect x="40" y="120" width="500" height="300" rx="12" fill="white" stroke="${colors.neutral}" stroke-width="1" opacity="0.1"/>
            
            <!-- Card 1 -->
            <rect x="60" y="140" width="140" height="100" rx="8" fill="white" stroke="${colors.neutral}" stroke-width="1" opacity="0.2"/>
            <rect x="70" y="150" width="120" height="8" rx="4" fill="${colors.secondary}"/>
            <text x="70" y="175" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="${colors.neutral}">Revenue</text>
            <text x="70" y="195" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.secondary}">$24,500</text>
            <text x="70" y="215" font-family="Arial, sans-serif" font-size="12" fill="${colors.neutral}" opacity="0.7">+12% from last month</text>
            
            <!-- Card 2 -->
            <rect x="220" y="140" width="140" height="100" rx="8" fill="white" stroke="${colors.neutral}" stroke-width="1" opacity="0.2"/>
            <rect x="230" y="150" width="120" height="8" rx="4" fill="${colors.accent}"/>
            <text x="230" y="175" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="${colors.neutral}">Users</text>
            <text x="230" y="195" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.accent}">1,249</text>
            <text x="230" y="215" font-family="Arial, sans-serif" font-size="12" fill="${colors.neutral}" opacity="0.7">+5% from last month</text>
            
            <!-- Card 3 -->
            <rect x="380" y="140" width="140" height="100" rx="8" fill="white" stroke="${colors.neutral}" stroke-width="1" opacity="0.2"/>
            <rect x="390" y="150" width="120" height="8" rx="4" fill="${colors.primary}"/>
            <text x="390" y="175" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="${colors.neutral}">Orders</text>
            <text x="390" y="195" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.primary}">642</text>
            <text x="390" y="215" font-family="Arial, sans-serif" font-size="12" fill="${colors.neutral}" opacity="0.7">+18% from last month</text>
            
            <!-- Chart Area -->
            <rect x="60" y="260" width="460" height="140" rx="8" fill="white" stroke="${colors.neutral}" stroke-width="1" opacity="0.2"/>
            <text x="70" y="285" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="${colors.neutral}">Performance Chart</text>
            
            <!-- Mock Chart Lines -->
            <polyline points="80,350 120,330 160,320 200,340 240,310 280,300 320,320 360,290 400,280 440,300 480,285" 
                     stroke="${colors.primary}" stroke-width="3" fill="none"/>
            <polyline points="80,370 120,360 160,350 200,365 240,340 280,335 320,345 360,325 400,315 440,330 480,320" 
                     stroke="${colors.secondary}" stroke-width="2" fill="none" opacity="0.7"/>
            
            <!-- Sidebar -->
            <rect x="580" y="120" width="180" height="350" rx="12" fill="white" stroke="${colors.neutral}" stroke-width="1" opacity="0.1"/>
            <text x="600" y="145" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="${colors.neutral}">Quick Actions</text>
            
            <!-- Action Buttons -->
            <rect x="600" y="160" width="140" height="36" rx="6" fill="${colors.primary}"/>
            <text x="615" y="181" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="${primaryText}">New Project</text>
            
            <rect x="600" y="210" width="140" height="36" rx="6" fill="transparent" stroke="${colors.secondary}" stroke-width="2"/>
            <text x="625" y="231" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="${colors.secondary}">View Reports</text>
            
            <rect x="600" y="260" width="140" height="36" rx="6" fill="${colors.accent}"/>
            <text x="620" y="281" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="${accentText}">Settings</text>
            
            <!-- List Items -->
            <text x="600" y="325" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="${colors.neutral}">Recent Activity</text>
            <circle cx="610" cy="345" r="4" fill="${colors.secondary}"/>
            <text x="625" y="350" font-family="Arial, sans-serif" font-size="12" fill="${colors.neutral}">New user registered</text>
            <circle cx="610" cy="365" r="4" fill="${colors.accent}"/>
            <text x="625" y="370" font-family="Arial, sans-serif" font-size="12" fill="${colors.neutral}">Payment received</text>
            <circle cx="610" cy="385" r="4" fill="${colors.primary}"/>
            <text x="625" y="390" font-family="Arial, sans-serif" font-size="12" fill="${colors.neutral}">Order completed</text>
            
            <!-- Footer -->
            <rect x="0" y="520" width="800" height="80" fill="${colors.neutral}"/>
            <text x="40" y="545" font-family="Arial, sans-serif" font-size="14" fill="${neutralText}">© 2024 Your App Name</text>
            <text x="40" y="565" font-family="Arial, sans-serif" font-size="12" fill="${neutralText}" opacity="0.7">Built with DaisyDo Theme Generator</text>
        </svg>
    `;
}

// Main visualization function
function generateVisualization() {
    updateColorScheme();
    const uiPreview = document.getElementById('ui-preview');
    const mockupSVG = generateUIMockup(currentColorScheme);
    
    uiPreview.innerHTML = mockupSVG;
    uiPreview.classList.add('active');
    
    // Smooth scroll to visualization
    document.querySelector('.visualizer-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize with default colors on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to color inputs for real-time updates
    const colorInputs = document.querySelectorAll('.color-input');
    colorInputs.forEach(input => {
        input.addEventListener('change', generateVisualization);
    });
    
    // Generate initial visualization
    generateVisualization();
});

// Load example color schemes
function loadExampleScheme(scheme) {
    const schemes = {
        'dark': {
            primary: '#6366f1',
            secondary: '#06b6d4',
            accent: '#f59e0b',
            neutral: '#374151',
            background: '#111827'
        },
        'warm': {
            primary: '#f59e0b',
            secondary: '#ef4444',
            accent: '#8b5cf6',
            neutral: '#78716c',
            background: '#fef7ed'
        },
        'cool': {
            primary: '#0ea5e9',
            secondary: '#10b981',
            accent: '#6366f1',
            neutral: '#475569',
            background: '#f0f9ff'
        },
        'monochrome': {
            primary: '#374151',
            secondary: '#6b7280',
            accent: '#9ca3af',
            neutral: '#1f2937',
            background: '#f9fafb'
        }
    };
    
    if (schemes[scheme]) {
        Object.keys(schemes[scheme]).forEach(key => {
            document.getElementById(key).value = schemes[scheme][key];
        });
        generateVisualization();
    }
}