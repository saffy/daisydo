import { test, expect } from '@playwright/test';

// Basic smoke tests that verify the application loads and functions
test.describe('DaisyDo Basic Functionality', () => {
  test('application loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads and has the correct title
    await expect(page).toHaveTitle(/DaisyDo/);
    
    // Verify main elements are present
    await expect(page.getByTestId('app-title')).toBeVisible();
    await expect(page.getByTestId('app-subtitle')).toBeVisible();
    await expect(page.getByTestId('theme-toggle')).toBeVisible();
    await expect(page.getByTestId('primary-color-input')).toBeVisible();
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');
    
    const app = page.getByTestId('app');
    const themeToggle = page.getByTestId('theme-toggle');
    
    // Check initial state
    await expect(app).toHaveClass(/light/);
    
    // Toggle theme
    await themeToggle.click();
    await expect(app).toHaveClass(/dark/);
    
    // Toggle back
    await themeToggle.click();
    await expect(app).toHaveClass(/light/);
  });

  test('color picker functionality', async ({ page }) => {
    await page.goto('/');
    
    const colorInput = page.getByTestId('primary-color-input');
    const colorValue = page.getByTestId('primary-color-value');
    
    // Check initial value
    await expect(colorValue).toHaveText('#3b82f6');
    
    // Change color
    await colorInput.fill('#ff0000');
    await expect(colorValue).toHaveText('#ff0000');
  });
});