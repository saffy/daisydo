import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DaisyDo/);
});

test('displays main heading and subtitle', async ({ page }) => {
  await page.goto('/');

  // Check main heading
  await expect(page.getByTestId('app-title')).toHaveText('DaisyDo');
  await expect(page.getByTestId('app-subtitle')).toHaveText('Tailwind Theme Generator');
});

test('theme toggle functionality', async ({ page }) => {
  await page.goto('/');

  const app = page.getByTestId('app');
  const themeToggle = page.getByTestId('theme-toggle');

  // Check initial state (light theme)
  await expect(app).toHaveClass(/light/);
  await expect(themeToggle).toHaveText('light');

  // Toggle to dark theme
  await themeToggle.click();
  await expect(app).toHaveClass(/dark/);
  await expect(themeToggle).toHaveText('dark');

  // Toggle back to light theme
  await themeToggle.click();
  await expect(app).toHaveClass(/light/);
  await expect(themeToggle).toHaveText('light');
});

test('color picker functionality', async ({ page }) => {
  await page.goto('/');

  const colorInput = page.getByTestId('primary-color-input');
  const colorValue = page.getByTestId('primary-color-value');
  const colorPreview = page.getByTestId('color-preview');
  const sampleButton = page.getByTestId('sample-button');

  // Check initial color
  await expect(colorValue).toHaveText('#3b82f6');

  // Change color
  await colorInput.fill('#ff0000');
  
  // Verify color value is updated
  await expect(colorValue).toHaveText('#ff0000');
  
  // Verify visual elements reflect the color change
  await expect(colorPreview).toHaveCSS('background-color', 'rgb(255, 0, 0)');
  await expect(sampleButton).toHaveCSS('background-color', 'rgb(255, 0, 0)');
});

test('visual regression - light theme snapshot', async ({ page }) => {
  await page.goto('/');
  
  // Ensure we're in light theme
  const themeToggle = page.getByTestId('theme-toggle');
  const toggleText = await themeToggle.textContent();
  if (toggleText === 'dark') {
    await themeToggle.click();
  }

  // Take screenshot for visual regression testing
  await expect(page).toHaveScreenshot('light-theme.png');
});

test('visual regression - dark theme snapshot', async ({ page }) => {
  await page.goto('/');
  
  // Switch to dark theme
  const themeToggle = page.getByTestId('theme-toggle');
  const toggleText = await themeToggle.textContent();
  if (toggleText === 'light') {
    await themeToggle.click();
  }

  // Take screenshot for visual regression testing
  await expect(page).toHaveScreenshot('dark-theme.png');
});

test('visual regression - custom color snapshot', async ({ page }) => {
  await page.goto('/');
  
  // Set a custom color
  const colorInput = page.getByTestId('primary-color-input');
  await colorInput.fill('#9333ea'); // Purple color
  
  // Take screenshot with custom color
  await expect(page).toHaveScreenshot('custom-color-theme.png');
});

test('responsive layout - mobile view', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // Check that all elements are still visible and accessible
  await expect(page.getByTestId('app-title')).toBeVisible();
  await expect(page.getByTestId('theme-toggle')).toBeVisible();
  await expect(page.getByTestId('primary-color-input')).toBeVisible();
  await expect(page.getByTestId('preview-section')).toBeVisible();

  // Take mobile screenshot
  await expect(page).toHaveScreenshot('mobile-view.png');
});

test('accessibility - keyboard navigation', async ({ page }) => {
  await page.goto('/');

  // Test keyboard navigation
  await page.keyboard.press('Tab'); // Should focus on theme toggle
  await expect(page.getByTestId('theme-toggle')).toBeFocused();

  await page.keyboard.press('Tab'); // Should focus on color input
  await expect(page.getByTestId('primary-color-input')).toBeFocused();

  // Test theme toggle with keyboard
  await page.keyboard.press('Shift+Tab'); // Go back to theme toggle
  await expect(page.getByTestId('theme-toggle')).toBeFocused();
  
  await page.keyboard.press('Enter'); // Should toggle theme
  const app = page.getByTestId('app');
  await expect(app).toHaveClass(/dark/);
});