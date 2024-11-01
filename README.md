# BluScript

Version: **1.0.1**

A lightweight Domain-Specific Language (DSL) for generating static HTML components with a clean, declarative syntax.

## Current Features (v1.0.1)
- Static HTML component generation
- Support for navigation bars and login forms
- Syntax highlighting for BluScript code
- Basic styling system

## Installation

```bash
npm install bluscript
```

## Quick Start

```javascript
import { Parser, HTMLGenerator } from 'bluscript';

// Define your components using BluScript syntax
const code = NAVBAR { BRAND: My App LINK: Home: / BUTTON: Login: /login: primary};

// Generate HTML from BluScript code
const parser = new Parser(code);
const ast = parser.parse();
const generator = new HTMLGenerator();
const html = generator.generateNavbar(ast[0]);

## Syntax

### Navigation Bar

NAVBAR {
  BRAND: Test to display
  LINK: Label: /url
  BUTTON: Label: /url: style
}

### Login Form

LOGIN PAGE {
  TITLE: Form Title
  FIELD: fieldname: Label
  AUTH: JWT
  ACTION: /api/endpoint
  BUTTON: Submit: primary
  FOOTER: Text: /url

}

## Generated HTML Example

```html
<nav class="navbar">
  <div class="nav-content">
    <div class="brand">My App</div>
    <div class="nav-links">
      <a href="/">Home</a>
    </div>
    <div class="nav-buttons">
      <a href="/login" class="btn btn-primary">Login</a>
    </div>
  </div>
</nav>
```

## Limitations (v1.0.1)
- Static HTML generation only
- No built-in routing
- No form handling
- Limited component types (navbar and login form only)

## Coming in v1.0.2
- Client-side routing
- Form submission handling
- Additional component types
- Dynamic component updates
- Event handling system

## License

MIT License - see the [LICENSE](LICENSE) file for details