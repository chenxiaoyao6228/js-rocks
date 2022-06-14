// @babel/types

// mark node properties that can be traverse
const astDefinationsMap = new Map();

astDefinationsMap.set('Program', {
  visitableKeys: ['body'],
  isBlock: true,
});
astDefinationsMap.set('ImportDeclaration', {
  visitableKeys: ['source', 'specifiers'],
});

astDefinationsMap.set('ImportSpecifier', {
  visitableKeys: ['imported', 'local'],
});

astDefinationsMap.set('VariableDeclaration', {
  visitableKeys: ['declarations'],
});
astDefinationsMap.set('VariableDeclarator', {
  visitableKeys: ['id', 'init'],
});

astDefinationsMap.set('Identifier', {});
astDefinationsMap.set('Literal', {});
astDefinationsMap.set('StringLiteral', {});
astDefinationsMap.set('NumericLiteral', {
  visitableKeys: [],
});
astDefinationsMap.set('FunctionDeclaration', {
  visitableKeys: ['id', 'params', 'body'],
  isBlock: true,
});
astDefinationsMap.set('BlockStatement', {
  visitableKeys: ['body'],
});
astDefinationsMap.set('ReturnStatement', {
  visitableKeys: ['argument'],
});
astDefinationsMap.set('BinaryExpression', {
  visitableKeys: ['left', 'right'],
});
astDefinationsMap.set('ExpressionStatement', {
  visitableKeys: ['expression'],
});
astDefinationsMap.set('CallExpression', {
  visitableKeys: ['callee', 'arguments'],
});

const validationFns = {};
for (let name of astDefinationsMap.keys()) {
  validationFns['is' + name] = function (node) {
    return node.type === name;
  };
}

module.exports = {
  astDefinationsMap,
  validationFns,
};
