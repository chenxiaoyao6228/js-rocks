const { parse } = require('../src/parser');
const traverse = require('../src/traverse');
const generate = require('../src/generate');

describe('generate', () => {
  test('can generate const a = 1', () => {
    const code = `const a = 1;
    `;
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate multiple VariableDeclaration', () => {
    const code = 'const a = 1,b = 2;';
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate newline', () => {
    const code = 'const a = 1;\nconst b = 2;';
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate binary expressions', () => {
    const code = 'const a = 1 + 2;';
    const ast = parse(code);
    const newCode = generate(ast);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate function expression', () => {
    const code = `
      function add(a, b){\nreturn a + b;\n};
    `;
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate call expression', () => {
    const code = `
      sum(a, b)
    `;
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate Boolean literal', () => {
    const code = 'const a = true;';
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate Null literal', () => {
    const code = 'const a = null;';
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
  test('can generate Regex literal', () => {
    const code = 'const a = /^[a-z]+/;';
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
  // statement
  test('can generate for statement', () => {
    const code = 'for(var i = 0; i < 10; i++){\n}';
    console.log('code', code);
    const ast = parse(code);
    const newCode = generate(ast);
    console.log('newCode', newCode);
    expect(newCode.trim()).toEqual(code.trim());
  });
});
