// @babel/types

// mark node properties that can be traverse
const astDefinationsMap = new Map();

astDefinationsMap.set('Program', {
  visitableKeys: ['body'],
  isBlock: true,
});
astDefinationsMap.set('VariableDeclaration', {
  visitableKeys: ['declarations'],
});
astDefinationsMap.set('VariableDeclarator', {
  visitableKeys: ['id', 'init'],
});

astDefinationsMap.set('Identifier', {});
astDefinationsMap.set('Literal', {});
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

module.exports = {
  astDefinationsMap,
};
