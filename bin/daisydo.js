#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { DaisyDoThemeGenerator } from '../index.js';

const VERSION = '1.0.0';

function showHelp() {
  console.log(`
DaisyDo Theme Generator v${VERSION}
Tailwind Theme Generator a.k.a Daisy Daisy Give Me Your Answer Do

Usage:
  daisydo [options] [config-file]

Options:
  -h, --help          Show this help message
  -v, --version       Show version number
  -o, --output FILE   Output file (default: stdout)
  -f, --format FORMAT Export format: css, json, or html (default: css)
  -t, --theme NAME    Theme name for JSON export (default: custom)
  --init              Create a sample configuration file

Examples:
  daisydo                           # Generate default theme CSS
  daisydo config.json               # Generate theme from config file
  daisydo -f json -t my-theme       # Generate JSON theme object
  daisydo -f html -t "My Theme"     # Generate HTML preview page
  daisydo -o theme.css config.json  # Save CSS to file
  daisydo -o preview.html -f html   # Save HTML preview to file
  daisydo --init                    # Create sample config.json

Configuration file format (JSON):
{
  "colors": {
    "primary": "#570df8",
    "secondary": "#f000b8",
    "accent": "#37cdbe",
    "neutral": "#3d4451",
    "base": "#ffffff",
    "info": "#3abff8",
    "success": "#36d399",
    "warning": "#fbbd23",
    "error": "#f87272"
  },
  "radius": {
    "selector": 0.5,
    "field": 0.25,
    "box": 1
  },
  "effects": {
    "depth3d": false,
    "noise": false
  },
  "border": 1,
  "fieldSize": 0.25
}
`);
}

function showVersion() {
  console.log(`DaisyDo v${VERSION}`);
}

async function createSampleConfig() {
  const sampleConfig = {
    colors: {
      primary: "#570df8",
      secondary: "#f000b8", 
      accent: "#37cdbe",
      neutral: "#3d4451",
      base: "#ffffff",
      info: "#3abff8",
      success: "#36d399",
      warning: "#fbbd23",
      error: "#f87272"
    },
    radius: {
      selector: 0.5,
      field: 0.25,
      box: 1
    },
    effects: {
      depth3d: false,
      noise: false
    },
    border: 1,
    fieldSize: 0.25
  };
  
  const filename = 'daisydo-config.json';
  
  if (existsSync(filename)) {
    console.error(`Error: ${filename} already exists`);
    process.exit(1);
  }
  
  try {
    await writeFile(filename, JSON.stringify(sampleConfig, null, 2));
    console.log(`✅ Created sample configuration: ${filename}`);
    console.log(`Edit the file and run: daisydo ${filename}`);
  } catch (error) {
    console.error(`Error creating config file: ${error.message}`);
    process.exit(1);
  }
}

async function loadConfig(configFile) {
  try {
    const content = await readFile(configFile, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading config file ${configFile}: ${error.message}`);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  let outputFile = null;
  let format = 'css';
  let themeName = 'custom';
  let configFile = null;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '-h':
      case '--help':
        showHelp();
        return;
        
      case '-v':
      case '--version':
        showVersion();
        return;
        
      case '--init':
        await createSampleConfig();
        return;
        
      case '-o':
      case '--output':
        if (i + 1 >= args.length) {
          console.error('Error: --output requires a filename');
          process.exit(1);
        }
        outputFile = args[++i];
        break;
        
      case '-f':
      case '--format':
        if (i + 1 >= args.length) {
          console.error('Error: --format requires a format (css or json)');
          process.exit(1);
        }
        format = args[++i];
        if (!['css', 'json', 'html'].includes(format)) {
          console.error('Error: format must be css, json, or html');
          process.exit(1);
        }
        break;
        
      case '-t':
      case '--theme':
        if (i + 1 >= args.length) {
          console.error('Error: --theme requires a theme name');
          process.exit(1);
        }
        themeName = args[++i];
        break;
        
      default:
        if (arg.startsWith('-')) {
          console.error(`Error: Unknown option ${arg}`);
          process.exit(1);
        }
        if (!configFile) {
          configFile = arg;
        } else {
          console.error('Error: Multiple config files specified');
          process.exit(1);
        }
        break;
    }
  }
  
  try {
    let config = {};
    
    if (configFile) {
      if (!existsSync(configFile)) {
        console.error(`Error: Config file ${configFile} not found`);
        process.exit(1);
      }
      config = await loadConfig(configFile);
    }
    
    const generator = new DaisyDoThemeGenerator(config);
    const output = generator.export(format, themeName);
    
    if (outputFile) {
      await writeFile(outputFile, output);
      console.log(`✅ Theme exported to ${outputFile}`);
    } else {
      console.log(output);
    }
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch(error => {
  console.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});