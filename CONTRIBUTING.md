# Contributing to API Tester

Thank you for your interest in contributing to the API Tester extension! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/api-tester.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

## Development Setup

```bash
# Install dependencies
npm install

# Start development build with watch mode
npm run esbuild-watch

# Open project in VS Code and press F5 to debug
```

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Format code with consistent indentation (2 spaces)

## Testing Your Changes

1. Build the extension: `npm run esbuild`
2. Press F5 in VS Code to launch debug session
3. Test your changes in the new VS Code window
4. Check for console errors (View > Toggle Developer Tools)

## Submitting Changes

1. Commit your changes with clear commit messages
2. Push to your fork
3. Create a Pull Request with a description of your changes
4. Wait for review and feedback

## Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Include a clear description of what changed and why
- Add any relevant issue numbers (e.g., "Fixes #123")
- Ensure code builds without errors
- Test your changes thoroughly

## Feature Requests

To suggest a new feature:
1. Check if it's already been requested in GitHub Issues
2. Open a new issue with the "enhancement" label
3. Describe the use case and expected behavior
4. Provide examples if possible

## Bug Reports

To report a bug:
1. Check if it's already been reported
2. Open a new issue with the "bug" label
3. Provide steps to reproduce
4. Include your VS Code version and OS
5. Attach error messages or screenshots

## Release Process

Maintainers will handle releases. When a new version is ready:
1. Update `package.json` version
2. Update `CHANGELOG.md`
3. Create a git tag
4. Publish to VS Code Marketplace using `vsce publish`

## Questions?

- Check existing GitHub Issues and Discussions
- Open a new discussion for questions
- Review the README for common troubleshooting

Thank you for contributing! 🎉
