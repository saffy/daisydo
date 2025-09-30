# DaisyDo
Tailwind Theme Generator a.k.a Daisy Daisy Give Me Your Answer Do

A modern, visual theme generator for Tailwind CSS built with React and TypeScript.

## Features

- 🎨 **Visual Theme Generation**: Interactive theme customization with real-time preview
- 🌙 **Light/Dark Mode Toggle**: Switch between light and dark themes
- 🎯 **Color Picker**: Choose custom primary colors for your theme
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- ⚡ **Fast Development**: Built with Vite for lightning-fast development experience

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saffy/daisydo.git
cd daisydo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Testing

This project includes comprehensive testing setup with both unit tests and end-to-end tests.

### Unit Tests

Unit tests are powered by **Vitest** and **React Testing Library**:

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

Unit tests cover:
- Component rendering and behavior
- Theme switching functionality  
- Color picker interactions
- Utility functions for color manipulation

### End-to-End Tests

E2E tests are powered by **Playwright** for comprehensive visual and functional testing:

```bash
# Install Playwright browsers (first time only)
npm run test:install

# Run e2e tests
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui

# Run e2e tests in headed mode (visible browser)
npm run test:e2e:headed
```

E2E tests include:
- **Visual regression testing** with screenshot comparisons
- **Theme switching** verification across different browsers
- **Color picker functionality** testing
- **Responsive layout** testing on mobile viewports
- **Accessibility testing** with keyboard navigation

### Test Structure

```
tests/
├── unit/                 # Unit tests with Vitest
│   ├── App.test.tsx     # Main app component tests
│   └── colorUtils.test.ts # Color utility function tests
├── e2e/                 # End-to-end tests with Playwright
│   └── app.spec.ts      # E2E test scenarios
└── setup.ts             # Test setup configuration
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing framework
- **ESLint** - Code linting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure everything works (`npm test && npm run test:e2e`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the ISC License.
