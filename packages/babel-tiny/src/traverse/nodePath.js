class NodePath {
  constructor (node, parentNode, parentPath, key, listKey) {
    this.node = node;
    this.parentNode = parentNode;
    this.parentPath = parentPath;
    this.key = key;
    this.listKey = listKey;
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
    console.log('this.parentPath.node.type', this.parentPath.node.type);
    let parent = this.parentPath;
    while (parent && !callback(parent)) {
      parent = this.parentPath;
    }
    return parent;
  }
}

module.exports = NodePath;
