# Quick Start Commands

## 1. Install Dependencies
```bash
npm install
```

## 2. Development Build (with watch mode)
```bash
npm run esbuild-watch
```

## 3. Launch in Debug Mode
- Open the folder in VS Code
- Press **F5** to start debugging

## 4. Testing the Extension
After launching in debug mode:
1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Open API Tester"
3. Select the command
4. The API Tester panel will open

## 5. Build for Production
```bash
npm run vscode:prepublish
```

## 6. Package Extension for Distribution
```bash
npm install -g @vscode/vsce
vsce package
```

## 7. Publish to VS Code Marketplace

### First Time Setup:
```bash
# Create publisher account at https://marketplace.visualstudio.com/manage/publishers
# Create Personal Access Token at https://dev.azure.com/
# Update "publisher" field in package.json

vsce login your-publisher-name
```

### Publish:
```bash
# Update version in package.json
vsce publish major
# or
vsce publish minor
# or
vsce publish patch
```

## Project Structure
- `src/` - TypeScript source code
- `media/` - CSS and JavaScript for webview UI
- `package.json` - Extension manifest
- `tsconfig.json` - TypeScript config

## Key Files
- `src/extension.ts` - Extension entry point
- `src/panels/ApiTesterPanel.ts` - Main webview panel
- `media/main.js` - Client-side request logic
- `media/main.css` - Styling
