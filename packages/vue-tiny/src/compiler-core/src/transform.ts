export function transform(root, options = {}) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);
  createRootCodegen(root);
}

function traverseNode(root: any, context: any = {}) {
  const { nodeTransforms } = context;
  nodeTransforms.forEach(nodeTransform => {
    nodeTransform(root);
  });

  const children = root.children;
  if (children && children.length) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}

function createTransformContext(root, options) {
  return {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };
}

function createRootCodegen(root: any) {
  root.codegenNode = root.children[0];
}
