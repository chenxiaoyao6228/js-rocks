// @babel/types

// mark node properties that can be traverse
const astDefinationsMap = new Map();

astDefinationsMap.set('Program', {
  visitor: ['body'],
  isBlock: true,
});
astDefinationsMap.set('VariableDeclaration', {
  visitor: ['declarations'],
});
astDefinationsMap.set('VariableDeclarator', {
  visitor: ['id', 'init'],
});
astDefinationsMap.set('Identifier', {});
astDefinationsMap.set('NumericLiteral', {});
astDefinationsMap.set('FunctionDeclaration', {
  visitor: ['id', 'params', 'body'],
  isBlock: true,
});
astDefinationsMap.set('BlockStatement', {
  visitor: ['body'],
});
astDefinationsMap.set('ReturnStatement', {
  visitor: ['argument'],
});
astDefinationsMap.set('BinaryExpression', {
  visitor: ['left', 'right'],
});
astDefinationsMap.set('ExpressionStatement', {
  visitor: ['expression'],
});
astDefinationsMap.set('CallExpression', {
  visitor: ['callee', 'arguments'],
});

module.exports = {
  visitorKeys: astDefinationsMap,
};
