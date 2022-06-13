// @babel/traverse
const { astDefinationsMap } = require('../types');
const NodePath = require('./nodePath');

// traverse the whole tree with dfs algorithm
// key and listKey is used to path node manipulation api
function traverse (currentNode, userDefinedVisitors, parent, parentPath, key, listKey) {
  // can be a pure function or an object with enter, exit
  let visitorFns = userDefinedVisitors[currentNode.type] || {};

  // enter currentNode
  if (typeof visitorFns === 'function') {
    visitorFns = {
      enter: visitorFns,
    };
  }

  const currentPath = new NodePath(currentNode, parent, parentPath, key, listKey);

  // traver current node
  visitorFns.enter && visitorFns.enter(currentPath);

  if (currentNode.__shouldSkip) {
    delete this.node__shouldSkip;
    return;
  }

  // traverse all children
  // TODO complete all node definitions
  const definitionOfNode = astDefinationsMap.get(currentNode.type);
  if (definitionOfNode && definitionOfNode.visitableKeys) {
    // eg: the Program node has a body which contains a list of nodes that can be traverse
    // eg: VariableDeclarator => ['id', 'init']
    definitionOfNode.visitableKeys.forEach(key => {
      const visitableProps = currentNode[key];
      if (Array.isArray(visitableProps)) {
        visitableProps.forEach((childNode, index) => {
          traverse(childNode, userDefinedVisitors, currentNode, currentPath, key, index);
        });
      } else {
        traverse(visitableProps, userDefinedVisitors, currentNode, currentPath, key);
      }
    });
  }

  // exit currentNode after traverse all children
  visitorFns.exit && visitorFns.exit(currentPath);
}

module.exports = traverse;
