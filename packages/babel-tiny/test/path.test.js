const { parse } = require('../src/parser');
const traverse = require('../src/traverse');

describe('NodePath', () => {
  test('test path.isXX', () => {
    const isProgramFn = jest.fn();
    const isFunctionDeclarationFn = jest.fn();
    const code = `
    function add(a,b){
        return a + b
    }`;
    const ast = parse(code, {
      cmaVersion: '2020',
    });

    traverse(ast, {
      Program (path) {
        if (path.isProgram(path.node)) {
          isProgramFn();
        }
      },
      FunctionDeclaration (path) {
        if (path.isFunctionDeclaration(path.node)) {
          isFunctionDeclarationFn();
        }
      },
    });
    expect(isProgramFn).toHaveBeenCalled();
    expect(isFunctionDeclarationFn).toHaveBeenCalled();
  });
  test('path.skip', () => {
    const fn = jest.fn();
    const code = `
    function add(a,b){
        return a + b
    }`;

    const ast = parse(code);

    traverse(ast, {
      Program: {
        enter (path) {
          path.skip();
        },
      },
      FunctionDeclaration (path) {
        fn();
      },
    });
    expect(fn).not.toHaveBeenCalled();
  });
  test('path.traverse', () => {
    const fn = jest.fn();
    const code = `
    import {intl} from 'intl'
    function add(a,b){
        return a + b
    }`;
    const ast = parse(code, {
      sourceType: 'module',
    });

    traverse(ast, {
      Program: {
        enter (path) {
          path.traverse({
            ImportDeclaration () {
              fn();
            },
          });
        },
      },
    });
    expect(fn).toHaveBeenCalled();
  });
});
