import { expect, test } from 'vitest';
import { Parser } from './parser.js';
import { HTMLGenerator } from '../generators/html.js';

test('parses login page command', () => {
  const input = `
    LOGIN PAGE {
      FIELD: username
      FIELD: password
      AUTH: JWT
      ACTION: /login
    }
  `;

  const parser = new Parser(input);
  const result = parser.parse();

  expect(result).toHaveLength(1);
  expect(result[0].type).toBe('LOGIN');
  expect(result[0].parameters).toEqual({
    FIELD: ['username', 'password'],
    AUTH: 'JWT',
    ACTION: '/login'
  });
});

test('parses navbar command', () => {
  const input = `
    NAVBAR {
      LINK: Home: /
      LINK: About: /about
      LINK: Contact: /contact
    }
  `;

  const parser = new Parser(input);
  const result = parser.parse();

  expect(result).toHaveLength(1);
  expect(result[0].type).toBe('NAVBAR');
  expect(result[0].parameters).toEqual({
    LINK: ['Home: /', 'About: /about', 'Contact: /contact']
  });
});

test('generates navbar HTML', () => {
  const command = {
    type: 'NAVBAR',
    parameters: {
      LINK: ['Home: /', 'About: /about', 'Contact: /contact']
    }
  };

  const htmlGenerator = new HTMLGenerator();
  const html = htmlGenerator.generateNavbar(command);

  const expectedHtml = 
`<nav class="navbar">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`;

  expect(html).toBe(expectedHtml);
});