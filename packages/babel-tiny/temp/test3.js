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
    // console.log('Program----------');
  },
  Identifier: {
    exit (path) {
      path.node.name = 'b';
      let currentPath = path;
      while (currentPath) {
        currentPath = currentPath.parentPath;
      }
    },
  },
  // test findParent
  FunctionDeclaration (path) {
    // console.log('FunctionDeclaration----------');
    if (
      path.findParent(parent => {
        console.log('findParent node upwards--', parent.node.type);
        return parent.node.type === 'Program';
      })
    ) {
      console.log('found program node-------', path.node.type);
    }
  },
  // acorn does not defined NumericLiteral
  Literal (path) {
    if (
      path.find(parent => {
        console.log('finding node upwards--', parent.node.type);
        return parent.node.type === 'Program';
      })
    ) {
      console.log('found program node-------', path.node.type);
    }
    // console.log('NumericLiteral----------');
    // path.replaceWith({ type: 'Identifier', name: 'bbbbbbb' });
  },
});

// console.log(JSON.stringify(ast, null, 2));
