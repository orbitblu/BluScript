class Tokenizer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {
        while (this.position < this.input.length) {
            const char = this.input[this.position];

            // Skip whitespace and newlines
            if (/\s/.test(char)) {
                this.position++;
                continue;
            }

            // Handle comments
            if (char === '/' && this.input[this.position + 1] === '/') {
                while (this.position < this.input.length && this.input[this.position] !== '\n') {
                    this.position++;
                }
                continue;
            }

            // Handle special characters
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

            // Handle identifiers (keywords)
            if (/[A-Z]/.test(char)) {
                let value = '';
                while (this.position < this.input.length && /[A-Z]/.test(this.input[this.position])) {
                    value += this.input[this.position];
                    this.position++;
                }
                this.tokens.push({ type: 'IDENTIFIER', value });
                continue;
            }

            // Handle values
            if (/[a-zA-Z0-9\/]/.test(char)) {
                let value = '';
                while (this.position < this.input.length && 
                       !/[{}:\n]/.test(this.input[this.position])) {
                    value += this.input[this.position];
                    this.position++;
                }
                this.tokens.push({ type: 'VALUE', value: value.trim() });
                continue;
            }

            this.position++;
        }
        return this.tokens;
    }
}

class Parser {
    constructor(input) {
        this.input = input;
    }

    parse() {
        const lines = this.input.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
        const commands = [];
        let currentCommand = null;

        lines.forEach(line => {
            line = line.trim();
            if (line.includes('{')) {
                const [type] = line.split('{');
                currentCommand = {
                    type: type.trim(),
                    parameters: {}
                };
            } else if (line === '}' && currentCommand) {
                commands.push(currentCommand);
                currentCommand = null;
            } else if (currentCommand && line.includes(':')) {
                const [key, ...valueParts] = line.split(':').map(part => part.trim());
                const value = valueParts.join(':').trim();
                
                if (currentCommand.parameters[key]) {
                    if (!Array.isArray(currentCommand.parameters[key])) {
                        currentCommand.parameters[key] = [currentCommand.parameters[key]];
                    }
                    currentCommand.parameters[key].push(value);
                } else {
                    currentCommand.parameters[key] = value;
                }
            }
        });

        return commands;
    }
}

class HTMLGenerator {
    generateNavbar(command) {
        const { parameters } = command;
        let html = '<nav class="navbar">\n';
        
        if (parameters.BRAND) {
            html += `  <div class="brand">${parameters.BRAND}</div>\n`;
        }
        
        html += '  <div class="nav-content">\n';
        html += '    <ul class="nav-links">\n';
        if (parameters.LINK) {
            const links = Array.isArray(parameters.LINK) ? parameters.LINK : [parameters.LINK];
            links.forEach(link => {
                const [text, url] = link.split(':').map(part => part.trim());
                html += `      <li><a href="${url}">${text}</a></li>\n`;
            });
        }
        html += '    </ul>\n';
        
        if (parameters.BUTTON) {
            html += '    <div class="nav-buttons">\n';
            const buttons = Array.isArray(parameters.BUTTON) ? parameters.BUTTON : [parameters.BUTTON];
            buttons.forEach(button => {
                const [text, url, style] = button.split(':').map(part => part.trim());
                html += `      <a href="${url}" class="btn btn-${style || 'primary'}">${text}</a>\n`;
            });
            html += '    </div>\n';
        }
        
        html += '  </div>\n</nav>';
        return html;
    }

    generateLoginPage(command) {
        const { parameters } = command;
        let html = '<div class="login-container">\n';
        
        if (parameters.TITLE) {
            html += `  <h2 class="login-title">${parameters.TITLE}</h2>\n`;
        }
        
        html += `  <form action="${parameters.ACTION || '#'}" method="POST">\n`;
        
        if (parameters.FIELD) {
            const fields = Array.isArray(parameters.FIELD) ? parameters.FIELD : [parameters.FIELD];
            fields.forEach(field => {
                const [name, label] = field.split(':').map(part => part.trim());
                const type = name.toLowerCase().includes('password') ? 'password' : 'text';
                html += `    <div class="form-group">\n`;
                html += `      <label for="${name}">${label}</label>\n`;
                html += `      <input type="${type}" id="${name}" name="${name}" required>\n`;
                html += `    </div>\n`;
            });
        }
        
        const buttonText = parameters.BUTTON ? parameters.BUTTON.split(':')[0].trim() : 'Submit';
        const buttonStyle = parameters.BUTTON ? parameters.BUTTON.split(':')[2]?.trim() || 'primary' : 'primary';
        html += `    <button type="submit" class="btn btn-${buttonStyle}">${buttonText}</button>\n`;
        
        if (parameters.FOOTER) {
            const [text, url] = parameters.FOOTER.split(':').map(part => part.trim());
            html += `    <div class="form-footer">\n`;
            html += `      <a href="${url}">${text}</a>\n`;
            html += `    </div>\n`;
        }
        
        html += '  </form>\n</div>';
        return html;
    }
}

export { Parser, HTMLGenerator };