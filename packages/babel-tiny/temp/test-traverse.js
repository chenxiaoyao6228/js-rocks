const { parse } = require('../src/parser');
const traverse = require('../src/traverse');

const code = `
    import {intl} from 'intl'
    function add(a,b){
        return a + b
    }
`;

const ast = parse(code, {
  sourceType: 'module',
});

traverse(ast, {
  Program: {
    enter (path) {
      path.traverse({
        ImportDeclaration () {
          console.log('ImportDeclaration is traversed');
        },
      });
    },
  },
});
