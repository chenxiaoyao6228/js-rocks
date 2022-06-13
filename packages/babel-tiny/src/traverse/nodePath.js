class NodePath {
  constructor (node, parentNode, parentPath) {
    this.node = node;
    this.parent = parentNode;
    this.parentPath = parentPath;
  }
  replaceWith (node) {
    this.node = node;
  }
}

module.exports = NodePath;
