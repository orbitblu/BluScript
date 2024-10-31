// Tokenizer class
class Tokenizer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {
        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (this.isWhitespace(char)) {
                this.position++;
                continue;
            }

            if (this.isLetter(char)) {
                this.tokens.push(this.readIdentifier());
                continue;
            }

            if (char === '{') {
                this.tokens.push({ type: 'LBRACE', value: '{' });
                this.position++;
                continue;
            }

            if (char === '}') {
                this.tokens.push({ type: 'RBRACE', value: '}' });
                this.position++;
                continue;
            }

            if (char === ':') {
                this.tokens.push({ type: 'COLON', value: ':' });
                this.position++;
                continue;
            }

            if (char === '"') {
                this.tokens.push(this.readString());
                continue;
            }

            if (char === '/') {
                let value = char;
                this.position++;
                while (this.position < this.input.length && !this.isWhitespace(this.input[this.position]) && this.input[this.position] !== '}') {
                    value += this.input[this.position];
                    this.position++;
                }
                this.tokens.push({ type: 'STRING', value });
                continue;
            }

            this.position++;
        }

        return this.tokens;
    }

    isWhitespace(char) {
        return /\s/.test(char);
    }

    isLetter(char) {
        return /[a-zA-Z]/.test(char);
    }

    readIdentifier() {
        let identifier = '';
        while (this.position < this.input.length && 
               (/[a-zA-Z_]/.test(this.input[this.position]) || 
                (identifier.length > 0 && /[0-9]/.test(this.input[this.position])))) {
            identifier += this.input[this.position];
            this.position++;
        }
        return { type: 'IDENTIFIER', value: identifier };
    }

    readString() {
        let string = '';
        this.position++; // Skip opening quote
        while (this.position < this.input.length && this.input[this.position] !== '"') {
            string += this.input[this.position];
            this.position++;
        }
        this.position++; // Skip closing quote
        return { type: 'STRING', value: string };
    }
}

// Parser class
class Parser {
    constructor(input) {
        this.tokenizer = new Tokenizer(input);
        this.tokens = [];
        this.currentToken = 0;
    }

    parse() {
        this.tokens = this.tokenizer.tokenize();
        return this.parseCommands();
    }

    parseCommands() {
        const commands = [];
        
        while (this.currentToken < this.tokens.length) {
            const command = this.parseCommand();
            if (command) {
                commands.push(command);
            }
        }

        return commands;
    }

    parseCommand() {
        const token = this.tokens[this.currentToken];
        
        if (token.type !== 'IDENTIFIER') {
            this.currentToken++;
            return null;
        }

        let commandType = token.value;
        this.currentToken++;

        if (this.currentToken < this.tokens.length && 
            this.tokens[this.currentToken].type === 'IDENTIFIER') {
            commandType = `${commandType} ${this.tokens[this.currentToken].value}`;
            this.currentToken++;
        }

        const command = {
            type: commandType.split(' ')[0],
            parameters: {}
        };
        
        if (this.tokens[this.currentToken]?.type === 'LBRACE') {
            this.currentToken++;
            command.parameters = this.parseParameters();
        }

        return command;
    }

    parseParameters() {
        const parameters = {};

        while (this.currentToken < this.tokens.length && 
               this.tokens[this.currentToken].type !== 'RBRACE') {
            const param = this.parseParameter();
            if (param) {
                if (param.key === 'FIELD') {
                    if (!parameters[param.key]) {
                        parameters[param.key] = [];
                    }
                    parameters[param.key].push(param.value);
                } else {
                    parameters[param.key] = param.value;
                }
            }
        }

        this.currentToken++; // Skip closing brace
        return parameters;
    }

    parseParameter() {
        const key = this.tokens[this.currentToken]?.value;
        this.currentToken++;

        if (this.tokens[this.currentToken]?.type !== 'COLON') {
            return null;
        }
        this.currentToken++;

        const value = this.tokens[this.currentToken]?.value;
        this.currentToken++;

        return { key, value };
    }
}

// HTMLGenerator class
class HTMLGenerator {
    generateLoginPage(command) {
        const { parameters } = command;
        let html = '<form';
        
        if (parameters.ACTION) {
            html += ` action="${parameters.ACTION}"`;
        }
        
        html += ' method="POST">\n';

        if (parameters.FIELD) {
            const fields = Array.isArray(parameters.FIELD) ? parameters.FIELD : [parameters.FIELD];
            fields.forEach(field => {
                const type = field.toLowerCase() === 'password' ? 'password' : 'text';
                html += `  <div class="form-group">\n`;
                html += `    <label for="${field.toLowerCase()}">${this.capitalize(field)}</label>\n`;
                html += `    <input type="${type}" id="${field.toLowerCase()}" name="${field.toLowerCase()}" required>\n`;
                html += `  </div>\n`;
            });
        }

        html += '  <button type="submit">Login</button>\n';
        html += '</form>';

        return html;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}

export { Parser, HTMLGenerator };