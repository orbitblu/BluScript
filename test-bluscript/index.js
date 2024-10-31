import { Parser, HTMLGenerator } from 'bluscript';

const code = `
LOGIN PAGE {
    FIELD: username
    FIELD: email
    FIELD: password
    AUTH: JWT
    ACTION: /api/login
}`;

console.log('BluScript Code:\n');
console.log(code);
console.log('\n-------------------\n');

const parser = new Parser(code);
const ast = parser.parse();
const htmlGenerator = new HTMLGenerator();

ast.forEach(command => {
    if (command.type === 'LOGIN') {
        console.log('Parsed AST:\n');
        console.log(JSON.stringify(command, null, 2));
        console.log('\n-------------------\n');

        const html = htmlGenerator.generateLoginPage(command);
        console.log('Generated HTML:\n');
        console.log(html);
    }
});