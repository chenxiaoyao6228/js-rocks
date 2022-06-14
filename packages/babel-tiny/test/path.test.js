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
      cmaVersion: '2020'
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
      }
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
        }
      },
      FunctionDeclaration (path) {
        fn();
      }
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
      sourceType: 'module'
    });

    traverse(ast, {
      Program: {
        enter (path) {
          path.traverse({
            ImportDeclaration () {
              fn();
            }
          });
        }
      }
    });
    expect(fn).toHaveBeenCalled();
  });
  test('path.findParent', () => {
    const code = `
    function add(a,b){
        return a + b
    }`;

    const ast = parse(code);
    let fn = jest.fn();
    let count = 0;
    traverse(ast, {
      FunctionDeclaration (path) {
        if (
          path.findParent(parent => {
            count++;
            return parent.node.type === 'Program';
          })
        ) {
          fn();
        }
      }
    });
    expect(fn).toHaveBeenCalled();
    expect(count).toEqual(1);
  });
  test('path.find', () => {
    const code = `
    function add(a,b){
        return a + b
    }`;
    let fn = jest.fn();
    let count = 0;
    const ast = parse(code);
    traverse(ast, {
      FunctionDeclaration (path) {
        if (
          path.find(parent => {
            count++;
            return parent.node.type === 'Program';
          })
        ) {
          fn();
        }
      }
    });
    expect(fn).toHaveBeenCalled();
    expect(count).toEqual(2);
  });
});
