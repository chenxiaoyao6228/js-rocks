const { parse } = require('../../parser');
const traverse = require('../index');

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

traverse(ast, {
  Program: {
    enter () {
      console.log('enter program');
    },
  },
  VariableDeclaration () {
    console.log('enter VariableDeclaration');
  },
  CallExpression () {
    console.log('enter CallExpression');
  },
  VariableDeclarator () {
    console.log('enter VariableDeclarator');
  },
  ExpressionStatement () {
    console.log('enter ExpressionStatement');
  },
  Identifier () {
    console.log('enter Identifier');
  },
  FunctionDeclaration () {
    console.log('enter FunctionDeclaration');
  },
  BlockStatement () {
    console.log('enter BlockStatement');
  },
  ReturnStatement () {
    console.log('enter ReturnStatement');
  },
  BinaryExpression () {
    console.log('enter BinaryExpression');
  },
});
