const { parse } = require('../src/parser');
const traverse = require('../src/traverse');

describe('traverse', () => {
  it('Scope and bindings', () => {
    const code = `
      const a = 1
      const b = 2
      function increment(num){
        return num + 1
      }
      increment(a)
    `;
    const ast = parse(code);
    traverse(ast, {
      Program (path) {
        Object.entries(path.scope.bindings).forEach(([id, binding]) => {
          if (!binding.referenced) {
            binding.path.remove();
          }
        });
      },
      FunctionDeclaration (path) {
        Object.entries(path.scope.bindings).forEach(([id, binding]) => {
          if (!binding.referenced) {
            binding.path.remove();
          }
        });
      }
    });
    expect(ast.body[1].declarations).toHaveLength(0);
  });
});
