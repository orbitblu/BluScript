# BluScript

**Version:** 0.1.1

A lightweight Domain-Specific Language (DSL) for generating static HTML components with a clean, declarative syntax.

## Current Features (v0.1.1)

- Static HTML component generation
- Support for navigation bars and login forms
- Syntax highlighting for BluScript code
- Basic styling system with CSS variables
- Demo application

## Installation

```bash
npm install bluscript
```

## Quick Start

```javascript
import { Parser, HTMLGenerator } from 'bluscript';
// Define your components using BluScript syntax
const code = `NAVBAR { BRAND: My App LINK: Home: / BUTTON: Login: /login: primary}`;
// Generate HTML
const parser = new Parser(code);
const ast = parser.parse();
const generator = new HTMLGenerator();
const html = generator.generateNavbar(ast[0]);
```

## Component Types

### Navigation Bar

```bluscript
NAVBAR {
  BRAND: Text to display
  LINK: Label: /url
  BUTTON: Label: /url: style
}
```

### Login Form

```bluscript
LOGIN PAGE {
  TITLE: Form Title
  FIELD: fieldname: Label
  AUTH: JWT
  ACTION: /api/endpoint
  BUTTON: Submit: primary
  FOOTER: Text: /url
}
```

## Demo

To run the demo application:

```bash
cd bluscript-demo
npm install
npm run serve
```

## Project Structure

```plaintext
bluscript/
├── src/                # Source files
├── dist/               # Compiled files
├── bluscript-demo/     # Demo application
└── test/               # Test files
```

## Limitations (v0.1.1)

- Static HTML generation only
- No built-in routing
- No form handling
- Limited component types (navbar and login form only)

## Coming in v0.1.2

- Client-side routing with history API
- Form validation and submission handling
- Additional components (cards, modals, tables)
- Dynamic component updates
- Event handling system
- CLI tool for project scaffolding

## License

MIT License - see the [LICENSE](LICENSE) file for details
```