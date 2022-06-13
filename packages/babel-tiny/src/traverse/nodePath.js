const { astDefinationsMap, validationFns } = require('../types');
class NodePath {
  constructor (node, parentNode, parentPath, key, listKey) {
    this.node = node;
    this.parentNode = parentNode;
    this.parentPath = parentPath;
    this.key = key;
    this.listKey = listKey;

    Object.keys(validationFns).forEach(key => {
      if (key.startsWith('is')) {
        this[key] = validationFns[key].bind(this, node);
      }
    });
  }
  replaceWith (node) {
    if (this.listKey) {
      this.parentNode.splice(this.listKey, 1, this.node);
    } else {
      this.parentNode[this.key] = node;
    }
  }
  remove (node) {
    if (this.listKey) {
      this.parentNode.splice(this.listKey, 1);
    } else {
      this.parentNode[this.key] = node;
    }
  }
  find (callback) {
    let parent = this;
    while (parent && !callback(parent)) {
      if (parent.parentPath) {
        parent = parent.parentPath;
      } else {
        return null;
      }
    }
    return parent;
  }
  // findParentPath does not include the current node
  findParent (callback) {
    let parent = this.parentPath;
    while (parent && !callback(parent)) {
      parent = this.parentPath;
    }
    return parent;
  }
  skip () {
    this.node.__shouldSkip = true;
  }
  // attention:  skip  current node and only traverse its children,
  traverse (userDefinedVisitors) {
    const traverse = require('./index');
    const definitionOfNode = astDefinationsMap.get(this.node.type);
    if (definitionOfNode && definitionOfNode.visitableKeys) {
      // eg: the Program node has a body which contains a list of nodes that can be traverse
      // eg: VariableDeclarator => ['id', 'init']
      definitionOfNode.visitableKeys.forEach(key => {
        const visitableProps = this.node[key];
        if (Array.isArray(visitableProps)) {
          visitableProps.forEach(childNode => {
            traverse(childNode, userDefinedVisitors, this.node, this);
          });
        } else {
          traverse(visitableProps, userDefinedVisitors, this.node, this);
        }
      });
    }
  }
}

module.exports = NodePath;
