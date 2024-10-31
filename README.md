# BluScript

A lightweight Domain-Specific Language (DSL) for generating web components.

## Installation

```bash
npm install bluscript
```

## Quick Start

```javascript
import { Parser, HTMLGenerator } from 'bluscript';

const code = `
LOGIN PAGE {
  FIELD: username
  FIELD: password
  AUTH: JWT
  ACTION: /login
}
`;

const parser = new Parser(code);
const ast = parser.parse();
const htmlGenerator = new HTMLGenerator();

ast.forEach(command => {
  if (command.type === 'LOGIN') {
    const html = htmlGenerator.generateLoginPage(command);
    console.log(html);
  }
});
```

## Syntax

### LOGIN PAGE

Creates a login form with specified fields and configuration.

```
LOGIN PAGE {
  FIELD: username
  FIELD: password
  AUTH: JWT
  ACTION: /login
}
```

Parameters:
- `FIELD`: Input field (can be specified multiple times)
- `AUTH`: Authentication method
- `ACTION`: Form submission endpoint

Generated HTML example:
```html
<form action="/login" method="POST">
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" required>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required>
  </div>
  <button type="submit">Login</button>
</form>
```

## API Reference

### Parser

```javascript
const parser = new Parser(code);
const ast = parser.parse();
```

### HTMLGenerator

```javascript
const generator = new HTMLGenerator();
const html = generator.generateLoginPage(command);
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details