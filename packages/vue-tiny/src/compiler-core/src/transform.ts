export function transform(ast, options) {
  traverseNode(ast, options);
}
function traverseNode(ast: any, options) {
  const { nodeTransforms } = options;
  nodeTransforms.forEach(nodeTransform => {
    nodeTransform(ast);
  });

  const children = ast.children;
  if (children && children.length) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, options);
    }
  }
}
