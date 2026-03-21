# API Tester Extension

A lightweight API testing extension for VS Code that allows you to make HTTP requests directly from your editor and view responses in a formatted panel.

## Features

- **Multiple HTTP Methods**: Support for GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- **Request Builder**: Simple and intuitive interface to build API requests
- **Custom Headers**: Add multiple custom headers to your requests
- **Request Body**: Send JSON, form data, or raw body content
- **Response Viewer**: Beautiful response formatting with syntax highlighting
- **Status Display**: View HTTP status codes and response headers
- **No External Dependencies**: Works entirely within VS Code

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "API Tester"
4. Click Install

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run esbuild`
4. Press F5 to launch the extension in debug mode

## Usage

1. **Open API Tester**: Use Command Palette (Ctrl+Shift+P / Cmd+Shift+P) and search for "Open API Tester"
2. **Select HTTP Method**: Choose from GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS
3. **Enter URL**: Input your API endpoint URL
4. **Add Headers** (Optional): Click "Headers" to expand and add custom headers like Authorization, Content-Type, etc.
5. **Add Body** (Optional): Click "Body" to expand and add request body (for POST, PUT, PATCH)
6. **Send Request**: Click "Send Request" button
7. **View Response**: Response status, headers, and body will appear below

## Development

### Requirements

- Node.js (v14 or higher)
- npm or yarn
- VS Code (v1.75.0 or higher)

### Building

```bash
# Install dependencies
npm install

# Build for development (with source maps)
npm run esbuild

# Build and watch for changes
npm run esbuild-watch

# Build for production (minified)
npm run vscode:prepublish
```

### Running

1. Open the project in VS Code
2. Press F5 to launch the extension in debug mode
3. In the new VS Code window, open Command Palette and run "Open API Tester"

### Publishing to VS Code Marketplace

1. **Create a Publisher Account**: Go to https://marketplace.visualstudio.com/manage/publishers

2. **Install VSCE**: 
   ```bash
   npm install -g @vscode/vsce
   ```

3. **Update package.json**: Set your publisher name:
   ```json
   "publisher": "your-publisher-name"
   ```

4. **Create Personal Access Token**: 
   - Go to https://dev.azure.com/
   - Create a Personal Access Token with "Marketplace (manage)" scope

5. **Login with VSCE**:
   ```bash
   vsce login your-publisher-name
   ```

6. **Package Extension**:
   ```bash
   vsce package
   ```

7. **Publish**:
   ```bash
   vsce publish
   ```

   Or publish a specific version:
   ```bash
   vsce publish major
   vsce publish minor
   vsce publish patch
   ```

### Updating the Extension

To release a new version:

1. Update the version in `package.json`
2. Run `npm run vscode:prepublish`
3. Run `vsce publish`

## Project Structure

```
api-tester/
├── src/
│   ├── extension.ts           # Main extension entry point
│   ├── panels/
│   │   └── ApiTesterPanel.ts  # Webview panel component
│   └── utilities/
│       ├── getUri.ts          # URI utility
│       └── getNonce.ts        # Security nonce generator
├── media/
│   ├── main.css              # Main styles
│   ├── main.js               # Client-side logic
│   ├── reset.css             # CSS reset
│   └── vscode.css            # VS Code theme integration
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration
├── .vscodeignore             # Files to exclude from package
└── README.md                 # This file
```

## Architecture

- **Backend**: TypeScript extension running in Node.js context
- **Frontend**: HTML/CSS/JavaScript webview panel
- **Communication**: VS Code API for inter-process communication

The extension uses the VS Code Webview API to create a custom panel where users can build and send API requests. Requests are sent using the Fetch API (available in the webview context).

## Troubleshooting

### CORS Issues
If you encounter CORS errors when testing APIs:
- This is a browser security feature. The extension runs in a webview with the same restrictions.
- Some APIs may block cross-origin requests. Ask the API provider to add CORS headers.

### Cannot Load Extension
- Ensure all dependencies are installed: `npm install`
- Ensure the extension is built: `npm run esbuild`
- Check that VS Code version is 1.75.0 or higher

### Changes Not Showing
- Rebuild the extension: `npm run esbuild`
- Reload the VS Code window (Ctrl+R / Cmd+R)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues on the GitHub repository.

## License

MIT - See LICENSE file for details

## Support

If you encounter any issues or have feature requests, please open an issue on the GitHub repository.

## Credits

Built with ❤️ for the developer community
