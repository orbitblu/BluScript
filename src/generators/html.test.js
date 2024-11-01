import { expect, test } from 'vitest';
import { HTMLGenerator } from './html.js';

test('generates login page HTML', () => {
  const command = {
    type: 'LOGIN',
    parameters: {
      FIELD: ['username', 'password'],
      AUTH: 'JWT',
      ACTION: '/login'
    }
  };

  const htmlGenerator = new HTMLGenerator();
  const html = htmlGenerator.generateLoginPage(command);

  const expectedHtml = 
`<form action="/login" method="POST">
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" required>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required>
  </div>
  <button type="submit">Login</button>
</form>`;

  expect(html).toBe(expectedHtml);
});