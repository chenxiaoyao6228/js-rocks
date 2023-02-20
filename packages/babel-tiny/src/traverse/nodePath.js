const { astDefinationsMap, validationFns } = require('../types');
const Scope = require('./Scope');
class NodePath {
  constructor(node, parentNode, parentPath, key, listKey) {
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
  get scope() {
    // for performance reason,  only create scope when user request
    if (this.__scope) {
      return this.__scope;
    }
    const isBlock = this.isBlock();
    const parentScope = this.parentPath && this.parentPath.scope;
    return (this.__scope = isBlock ? new Scope(parentScope, this) : parentScope);
  }
  isBlock() {
    return astDefinationsMap.get(this.node.type).isBlock;
  }
  replaceWith(node) {
    if (this.listKey >= 0) {
      this.parentNode[this.key].splice(this.listKey, 1, this.node);
    } else {
      this.parentNode[this.key] = node;
    }
  }
  remove() {
    if (this.listKey != undefined) {
      this.parentNode[this.key].splice(this.listKey, 1);
    } else {
      this.parentNode[this.key] = null;
    }
  }
  find(callback) {
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
  findParent(callback) {
    let parent = this.parentPath;
    while (parent && !callback(parent)) {
      parent = parent.parentPath;
    }
    return parent;
  }
  skip() {
    this.node.__shouldSkip = true;
  }
  // attention:  skip  current node and only traverse its children,
  traverse(userDefinedVisitors) {
    const traverse = require('./index');
    const definitionOfNode = astDefinationsMap.get(this.node.type);
    if (definitionOfNode && definitionOfNode.visitableKeys) {
      // eg: the Program node has a body which contains a list of nodes that can be traverse
      // eg: VariableDeclarator => ['id', 'init']
      definitionOfNode.visitableKeys.forEach(key => {
        const visitableProps = this.node[key];

        if (visitableProps === undefined) return;

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
