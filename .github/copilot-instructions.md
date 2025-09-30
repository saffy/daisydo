# Copilot Instructions for DaisyDo

## Repository Overview

**DaisyDo** is a modern, visual theme generator for Tailwind CSS built with React and TypeScript. This is a single-page application that allows users to interactively customize themes with real-time preview, including light/dark mode toggle and custom color picker functionality.

### Tech Stack & Dependencies
- **React 18** - UI framework with modern hooks
- **TypeScript** - Type safety and development experience
- **Vite** - Build tool and dev server (fast development)
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing framework
- **ESLint** - Code linting (⚠️ configuration missing)

### Project Size & Scope
- Small to medium-sized project (~30 source files)
- Single-page React application
- Comprehensive test coverage (unit + e2e)
- No backend dependencies
- Static deployment ready

## Build & Validation Instructions

### Prerequisites
- **Node.js version 16 or higher** - Required for all operations
- **npm** - Package manager (npm install required before any operations)

### Essential Commands (Run in Order)

1. **Always install dependencies first:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   # Uses: tsc -b && vite build
   # Takes: ~1-2 seconds
   # Output: dist/ directory with production files
   ```

3. **Run unit tests (recommended before changes):**
   ```bash
   npm run test:run
   # All tests: npm test (watch mode)
   # With UI: npm run test:ui
   # With coverage: npm run test:coverage
   # Takes: ~1-2 seconds, 19 tests should pass
   ```

4. **Start development server:**
   ```bash
   npm run dev
   # Starts on: http://localhost:5173
   # Takes: ~0.2 seconds to start
   # Auto-reloads on file changes
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   # Must run 'npm run build' first
   ```

### ⚠️ Known Issues & Workarounds

#### ESLint Configuration Missing
- **Issue**: `npm run lint` fails with "ESLint couldn't find an eslint.config.js file"
- **Impact**: Linting not functional, but doesn't block builds or tests
- **Workaround**: Skip linting or create eslint.config.js if code style changes needed
- **Command that fails**: `npm run lint`

#### Playwright Browser Installation
- **Issue**: `npm run test:install` may fail due to download issues
- **Workaround**: E2E tests require browser installation, may need retry or manual setup
- **Alternative**: Focus on unit tests which work reliably

### Testing Procedures

#### Unit Tests (Reliable - Always Use)
```bash
# Run all unit tests (preferred for validation)
npm run test:run

# Run in watch mode during development
npm test
```
- **Location**: `tests/unit/`
- **Coverage**: Component behavior, theme switching, color utilities
- **All 19 tests should pass consistently**

#### End-to-End Tests (May Require Setup)
```bash
# Install browsers first (may fail)
npm run test:install

# Run e2e tests
npm run test:e2e
# With UI: npm run test:e2e:ui
# Headed mode: npm run test:e2e:headed
```
- **Location**: `tests/e2e/`
- **Requires**: Playwright browsers installed
- **Tests**: Visual regression, theme switching, responsive design

## Project Layout & Architecture

### Root Structure
```
├── src/                    # Source code
│   ├── App.tsx            # Main component (theme state, UI logic)
│   ├── App.css            # Styling (theme-aware CSS)
│   ├── main.tsx           # React entry point
│   ├── index.css          # Global styles
│   └── utils/             # Utility functions
│       └── colorUtils.ts  # Color manipulation helpers
├── tests/
│   ├── unit/              # Vitest unit tests
│   ├── e2e/               # Playwright e2e tests
│   └── setup.ts           # Test configuration
├── public/                # Static assets
├── dist/                  # Build output (generated)
└── Configuration files (see below)
```

### Key Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration and test setup
- `playwright.config.ts` - E2E test configuration
- `tsconfig.json` - TypeScript compiler settings
- `.gitignore` - Git ignore patterns

### Application Architecture
The app follows a simple React architecture:
- **Single component**: `App.tsx` contains all state management
- **State**: Theme (light/dark) and primary color
- **Styling**: CSS-in-JS via inline styles + CSS classes
- **Testing**: Component-based testing with test data attributes

### Critical Files for Changes
- `src/App.tsx` - Main application logic and UI
- `src/App.css` - Theme-aware styling
- `src/utils/colorUtils.ts` - Color manipulation functions
- `tests/unit/App.test.tsx` - Component tests
- `tests/unit/colorUtils.test.ts` - Utility function tests

## Development Workflow

### Making Changes
1. **Always run `npm install` first**
2. **Start dev server**: `npm run dev` for live preview
3. **Run unit tests frequently**: `npm run test:run`
4. **Build before finalizing**: `npm run build`
5. **Focus on unit tests** - they're reliable and comprehensive

### Validation Steps
1. ✅ Unit tests pass (`npm run test:run`)
2. ✅ Build succeeds (`npm run build`)
3. ✅ Dev server starts (`npm run dev`)
4. ⚠️ Skip `npm run lint` (broken configuration)
5. 🔄 E2E tests optional (setup issues)

### Common Development Tasks
- **Add new colors**: Modify color utilities in `src/utils/colorUtils.ts`
- **Change UI**: Update `src/App.tsx` and corresponding CSS
- **Add features**: Follow existing patterns in `App.tsx`
- **Update tests**: Maintain test coverage in `tests/unit/`

### Performance Notes
- **Fast commands**: `npm run build` (~1-2s), `npm test` (~1-2s)
- **Dev server**: Very fast startup and hot reload
- **Slow operations**: E2E test setup and runs

## GitHub Workflows & CI
Currently **no GitHub Actions workflows** are configured. Any CI/CD should focus on:
1. `npm install`
2. `npm run build`
3. `npm run test:run`
4. Skip `npm run lint` until ESLint config is fixed

## Trust These Instructions
These instructions are comprehensive and tested. Only search for additional information if:
1. Commands listed here fail unexpectedly
2. New dependencies are added
3. The repository structure changes significantly

Always prefer the documented commands and workflows above to minimize exploration time and avoid command failures.