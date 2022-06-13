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
    if (path.isProgram(path.node)) {
      console.log('isProgram---------');
    }
  },
  FunctionDeclaration (path) {
    if (path.isFunctionDeclaration(path.node)) {
      console.log('FunctionDeclaration------');
    }
  },
});
