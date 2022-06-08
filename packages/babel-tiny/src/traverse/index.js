// @babel/traverse
const { visitorKeys } = require('../types');

// traverse the whole tree with dfs algorithm
function traverse (node, visitors) {
  console.log('node.type', node.type);
  const definition = visitorKeys.get(node.type);

  const visitorFn = visitors[node.type];

  if (!visitorFn) {
    return;
  }
  // enter currentNode
  if (typeof visitorFn === 'function') {
    visitorFn.enter = visitorFn;
  }
  visitorFn.enter && visitorFn.enter();

  if (definition.visitor) {
    definition.visitor.forEach(v => {
      // eg: the Program node has a body node that can be traverse
      const prop = node[v];
      if (Array.isArray(prop)) {
        prop.forEach(p => {
          traverse(p, visitors);
        });
      }
      traverse(prop, visitors);
    });
  }

  // exit currentNode
  visitorFn.exit && visitorFn.exit();
}

module.exports = traverse;
