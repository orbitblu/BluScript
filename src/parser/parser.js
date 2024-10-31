import { Tokenizer } from './tokenizer.js';

export class Parser {
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

    // Check for multi-word commands (e.g., "LOGIN PAGE")
    if (this.currentToken < this.tokens.length && 
        this.tokens[this.currentToken].type === 'IDENTIFIER') {
      commandType = `${commandType} ${this.tokens[this.currentToken].value}`;
      this.currentToken++;
    }

    // For "LOGIN PAGE", we only want to store "LOGIN" as the type
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