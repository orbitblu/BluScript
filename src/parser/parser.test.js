import { expect, test } from 'vitest';
import { Parser } from './parser.js';

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