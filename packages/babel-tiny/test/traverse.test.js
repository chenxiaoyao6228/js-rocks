const { parse } = require('../src/parser');
const traverse = require('../src/traverse');

describe('traverse', () => {
  describe('visitor ', () => {
    test('should visit every node type', () => {
      const code = `
      const a = 1;
      const b = 2
      function add(a,b){
          return a + b
      }
      const result = add(a, b)
      console.log('result', result)
  `;

      const ast = parse(code);

      const NodeNames = [
        'Program',
        'VariableDeclaration',
        'CallExpression',
        'VariableDeclarator',
        'ExpressionStatement',
        'Identifier',
        'FunctionDeclaration',
        'BlockStatement',
        'ReturnStatement',
        'BinaryExpression'
      ];
      const visitors = {};
      NodeNames.forEach(name => {
        visitors[name] = jest.fn();
      });

      // fileter NotExistNodeNames nodename
      const _visitors = {};
      const NotExistNodeNames = ['haha'];
      NotExistNodeNames.forEach(name => {
        _visitors[name] = jest.fn();
      });

      traverse(ast, visitors);

      Object.keys(visitors).forEach(key => {
        const _fn = visitors[key];
        expect(_fn).toHaveBeenCalled();
      });

      Object.keys(_visitors).forEach(key => {
        const _fn = _visitors[key];
        expect(_fn).not.toHaveBeenCalled();
      });
    });
    test('should support enter and exit', () => {
      const code = `
      function add(a,b){
          return a + b
      }`;

      const ast = parse(code);
      let count = 0;
      traverse(ast, {
        Program: {
          enter (path) {
            count++;
          },
          exit (path) {
            count++;
          }
        },
        FunctionDeclaration () {
          count++;
        }
      });
      expect(count).toEqual(3);
    });
  });
  test('Scope and bindings', () => {
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
