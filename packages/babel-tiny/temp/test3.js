const { parse } = require('../src/parser');
const traverse = require('../src/traverse');

const code = `
    const a = 1;
     const b = 2;
    function add(a,b){
        return a + b
    }
    const result = add(a, b)
    console.log('result', result)
`;

const ast = parse(code);

traverse(ast, {
  Program (path) {
    console.log('Program----------');
  },
  Identifier: {
    exit (path) {
      console.log('path.node.type', path.node.type);
      path.node.name = 'b';
      let currentPath = path;
      while (currentPath) {
        currentPath = currentPath.parentPath;
      }
    },
  },
  FunctionDeclaration (path) {
    console.log('FunctionDeclaration----------');
  },
  // acorn does not defined NumericLiteral
  Literal (path) {
    console.log('NumericLiteral----------');
    // path.replaceWith({ type: 'Identifier', name: 'bbbbbbb' });
  },
});

console.log(JSON.stringify(ast, null, 2));
