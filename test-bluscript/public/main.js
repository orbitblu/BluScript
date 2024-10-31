import { Parser, HTMLGenerator } from '../node_modules/bluscript/dist/index.js';

const code = `
LOGIN PAGE {
    FIELD: username
    FIELD: email
    FIELD: password
    AUTH: JWT
    ACTION: /api/login
}`;

// Display the BluScript code
document.getElementById('code').textContent = code;

// Parse and render the form
const parser = new Parser(code);
const ast = parser.parse();
const htmlGenerator = new HTMLGenerator();

ast.forEach(command => {
    if (command.type === 'LOGIN') {
        const html = htmlGenerator.generateLoginPage(command);
        document.getElementById('app').innerHTML = html;
    }
});