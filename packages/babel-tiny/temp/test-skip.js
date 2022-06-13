const { parse } = require('../src/parser');
const traverse = require('../src/traverse');

const code = `
    function add(a,b){
        return a + b
    }
`;

const ast = parse(code);

traverse(ast, {
  Program: {
    enter (path) {
      path.skip();
    },
  },
  FunctionDeclaration (path) {
    console.log('should not see this line');
  },
});
