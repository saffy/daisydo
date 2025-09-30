/**
 * HTML Preview Generator for DaisyDo Themes
 * Generates HTML preview pages to visualize themes
 */

/**
 * Generate HTML preview page with theme
 * @param {Object} themeConfig - Theme configuration
 * @param {string} themeName - Name of the theme
 * @returns {string} Complete HTML page with theme preview
 */
export function generateHTMLPreview(themeConfig, themeName = 'DaisyDo Theme') {
  const css = generatePreviewCSS(themeConfig);
  
  return `<!DOCTYPE html>
<html lang="en" data-theme="custom">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${themeName} - DaisyDo Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.7/dist/full.min.css" rel="stylesheet" type="text/css" />
  <style>
    ${css}
  </style>
</head>
<body>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <div class="navbar bg-base-200 shadow-lg">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl text-base-content">${themeName}</a>
      </div>
      <div class="flex-none">
        <button class="btn btn-primary">Primary</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto p-8 space-y-8">
      
      <!-- Theme Info -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-base-content">Theme Preview: ${themeName}</h2>
          <p class="text-base-content">Generated with DaisyDo Theme Generator using OKLCH color space</p>
        </div>
      </div>

      <!-- Color Palette -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Primary Colors -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-base-content">Primary Colors</h3>
            <div class="space-y-2">
              <div class="btn btn-primary w-full">Primary Button</div>
              <div class="btn btn-secondary w-full">Secondary</div>
              <div class="btn btn-accent w-full">Accent</div>
              <div class="btn btn-neutral w-full">Neutral</div>
            </div>
          </div>
        </div>

        <!-- Semantic Colors -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-base-content">Semantic Colors</h3>
            <div class="space-y-2">
              <div class="btn btn-info w-full">Info</div>
              <div class="btn btn-success w-full">Success</div>
              <div class="btn btn-warning w-full">Warning</div>
              <div class="btn btn-error w-full">Error</div>
            </div>
          </div>
        </div>

        <!-- Form Elements -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-base-content">Form Elements</h3>
            <div class="space-y-2">
              <input type="text" placeholder="Text Input" class="input input-bordered w-full" />
              <select class="select select-bordered w-full">
                <option>Select Option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <textarea placeholder="Textarea" class="textarea textarea-bordered w-full h-20"></textarea>
            </div>
          </div>
        </div>

        <!-- Indicators -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-base-content">Indicators</h3>
            <div class="space-y-4">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Checkbox</span>
                  <input type="checkbox" checked="checked" class="checkbox checkbox-primary" />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Toggle</span>
                  <input type="checkbox" class="toggle toggle-primary" checked />
                </label>
              </div>
              <div class="space-x-2">
                <div class="badge badge-primary">Primary</div>
                <div class="badge badge-secondary">Secondary</div>
                <div class="badge badge-accent">Accent</div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <!-- Feedback Messages -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Info: This is an informational message.</span>
          </div>
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Success: Operation completed successfully!</span>
          </div>
        </div>
        <div class="space-y-4">
          <div class="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <span>Warning: Please check your input.</span>
          </div>
          <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error: Something went wrong!</span>
          </div>
        </div>
      </div>

      <!-- Theme Configuration Display -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title text-base-content">Theme Configuration</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 class="font-bold text-base-content mb-2">Border Radius</h4>
              <ul class="text-base-content">
                <li>Box: ${themeConfig.radius?.box || 1}rem</li>
                <li>Field: ${themeConfig.radius?.field || 0.25}rem</li>
                <li>Selector: ${themeConfig.radius?.selector || 0.5}rem</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-base-content mb-2">Effects</h4>
              <ul class="text-base-content">
                <li>3D Depth: ${themeConfig.effects?.depth3d ? 'Enabled' : 'Disabled'}</li>
                <li>Noise: ${themeConfig.effects?.noise ? 'Enabled' : 'Disabled'}</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-base-content mb-2">Sizing</h4>
              <ul class="text-base-content">
                <li>Border: ${themeConfig.border || 1}px</li>
                <li>Field Size: ${themeConfig.fieldSize || 0.25}rem</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="footer footer-center p-10 bg-base-200 text-base-content">
      <div>
        <p>Generated with <strong>DaisyDo Theme Generator</strong></p>
        <p>Using OKLCH color space for beautiful, perceptually uniform colors</p>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Generate CSS for the preview with theme variables
 * @param {Object} themeConfig - Theme configuration
 * @returns {string} CSS with theme variables
 */
function generatePreviewCSS(themeConfig) {
  // Import the theme generator to get CSS variables
  // We'll need to import this dynamically to avoid circular dependencies
  return `
    [data-theme="custom"] {
      ${generateInlineCSS(themeConfig)}
    }
    
    /* Additional preview-specific styles */
    .container {
      max-width: 1200px;
    }
    
    /* Smooth transitions for theme demonstration */
    * {
      transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }
  `;
}

/**
 * Generate inline CSS variables from theme config
 * @param {Object} themeConfig - Theme configuration
 * @returns {string} CSS variables
 */
function generateInlineCSS(themeConfig) {
  // This is a simplified version - in practice we'd import from theme-generator
  // but we want to avoid circular imports
  const colors = themeConfig.colors || {};
  
  return `
    --p: 281 72% 49%;
    --pc: 0 0% 100%;
    --pf: 0 0% 90%;
    --s: 343 69% 64%;
    --sc: 0 0% 0%;
    --sf: 0 0% 20%;
    --a: 185 31% 77%;
    --ac: 0 0% 0%;
    --af: 0 0% 20%;
    --n: 263 6% 39%;
    --nc: 0 0% 100%;
    --nf: 0 0% 90%;
    --b1: 0 0% 100%;
    --b2: 0 0% 100%;
    --b3: 0 0% 85%;
    --bc: 0 0% 0%;
    --in: 232 34% 76%;
    --inc: 0 0% 0%;
    --su: 163 38% 77%;
    --suc: 0 0% 0%;
    --wa: 83 41% 83%;
    --wac: 0 0% 0%;
    --er: 22 41% 71%;
    --erc: 0 0% 0%;
    --rounded-box: ${themeConfig.radius?.box || 1}rem;
    --rounded-btn: ${themeConfig.radius?.field || 0.25}rem;
    --rounded-badge: ${themeConfig.radius?.selector || 0.5}rem;
    --border-btn: ${themeConfig.border || 1}px;
    --animation-btn: ${themeConfig.effects?.depth3d ? '0.25s' : '0.1s'};
    --animation-input: 0.2s;
    --tab-border: ${themeConfig.border || 1}px;
    --tab-radius: ${themeConfig.radius?.selector || 0.5}rem;
  `;
}