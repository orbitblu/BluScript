export class Tokenizer {
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
          // Read the rest of the path
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