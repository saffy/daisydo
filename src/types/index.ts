export interface ColorInfo {
  id: string;
  oklch: string;
  hex: string;
  isLocked: boolean;
}

export interface DaisyUITheme {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  'base-100': string;
  'base-200'?: string;
  'base-300'?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
}

export interface ThemeConfig {
  name: string;
  colors: DaisyUITheme;
}