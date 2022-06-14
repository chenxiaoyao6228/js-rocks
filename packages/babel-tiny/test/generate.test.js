const { parse } = require('../src/parser');
const traverse = require('../src/traverse');
const generate = require('../src/generate');

describe('generate', () => {
  test('can generate a number', () => {
    const code = '666';
    const ast = parse(code);
    const newCode = generate(ast);
    expect(code).toEqual(newCode);
  });
});
