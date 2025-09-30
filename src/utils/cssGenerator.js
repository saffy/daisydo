// Utility functions for color conversion
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToOklab(r, g, b) {
  // Normalize RGB values to 0-1 range
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Convert sRGB to linear RGB
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert linear RGB to OKLab
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  };
}

function oklabToOklch(L, a, b) {
  const C = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * 180 / Math.PI;
  if (h < 0) h += 360;
  
  return {
    L: L,
    C: C,
    h: h
  };
}

function hexToOklch(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return { L: 0, C: 0, h: 0 };
  
  const oklab = rgbToOklab(rgb.r, rgb.g, rgb.b);
  const oklch = oklabToOklch(oklab.L, oklab.a, oklab.b);
  
  return {
    L: Math.max(0, Math.min(1, oklch.L)) * 100, // Convert to percentage
    C: Math.max(0, oklch.C),
    h: isNaN(oklch.h) ? 0 : oklch.h
  };
}

function formatOklch(oklch) {
  const L = Math.round(oklch.L * 10) / 10;
  const C = Math.round(oklch.C * 1000) / 1000;
  const h = Math.round(oklch.h * 1000) / 1000;
  
  return `oklch(${L}% ${C} ${h})`;
}

export function generateDaisyUICSS(palette, themeName = 'light') {
  const isLight = themeName.toLowerCase().includes('light') || 
                  themeName.toLowerCase() === 'default' ||
                  (!themeName.toLowerCase().includes('dark') && !themeName.toLowerCase().includes('night'));

  const css = `@plugin "daisyui/theme" {
  name: "${themeName}";
  default: ${themeName === 'light' ? 'true' : 'false'};
  prefersdark: ${isLight ? 'false' : 'true'};
  color-scheme: "${isLight ? 'light' : 'dark'}";
  --color-base-100: ${formatOklch(hexToOklch(palette['base-100']))};
  --color-base-200: ${formatOklch(hexToOklch(palette['base-200']))};
  --color-base-300: ${formatOklch(hexToOklch(palette['base-300']))};
  --color-base-content: ${formatOklch(hexToOklch(palette['base-content']))};
  --color-primary: ${formatOklch(hexToOklch(palette['primary']))};
  --color-primary-content: ${formatOklch(hexToOklch(palette['primary-content']))};
  --color-secondary: ${formatOklch(hexToOklch(palette['secondary']))};
  --color-secondary-content: ${formatOklch(hexToOklch(palette['secondary-content']))};
  --color-accent: ${formatOklch(hexToOklch(palette['accent']))};
  --color-accent-content: ${formatOklch(hexToOklch(palette['accent-content']))};
  --color-neutral: ${formatOklch(hexToOklch(palette['neutral']))};
  --color-neutral-content: ${formatOklch(hexToOklch(palette['neutral-content']))};
  --color-info: ${formatOklch(hexToOklch(palette['info']))};
  --color-info-content: ${formatOklch(hexToOklch(palette['info-content']))};
  --color-success: ${formatOklch(hexToOklch(palette['success']))};
  --color-success-content: ${formatOklch(hexToOklch(palette['success-content']))};
  --color-warning: ${formatOklch(hexToOklch(palette['warning']))};
  --color-warning-content: ${formatOklch(hexToOklch(palette['warning-content']))};
  --color-error: ${formatOklch(hexToOklch(palette['error']))};
  --color-error-content: ${formatOklch(hexToOklch(palette['error-content']))};
  --radius-selector: 0.5rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 1;
  --noise: 0;
}`;

  return css;
}