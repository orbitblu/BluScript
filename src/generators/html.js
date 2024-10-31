export class HTMLGenerator {
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