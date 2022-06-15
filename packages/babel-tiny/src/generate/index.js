// Acorn Parser will remove  white spaces during parsing
class Printer {
  constructor (node) {
    this.node = node;
    this.text = '';
  }
  print () {
    this[this.node.type](this.node);
    return this.text;
  }
  space () {
    this.text += ' ';
  }
  nextLine () {
    this.text += '\n';
  }
  Program (node) {
    // console.log('node in program', node);
    node.body.forEach(n => {
      this[n.type](n);
      this.nextLine();
    });
  }

  ExpressionStatement (node) {
    // console.log('node in ExpressionStatement', node);
    this[node.expression.type](node.expression);
  }
  VariableDeclaration (node) {
    // VariableDeclaration might contains multiple declarations
    // eg: const a=1, b=2;
    // the init node might be an Binary Expression
    this.text += node.kind;
    this.space();
    node.declarations.forEach((declaratorNode, index) => {
      if (index !== 0) {
        this.text += ',';
      }
      // console.log('declaratorNode', declaratorNode);
      this[declaratorNode.id.type](declaratorNode.id);
      this.space();
      this.text += '=';
      this.space();
      this[declaratorNode.init.type](declaratorNode.init);
    });
    this.text += ';';
  }
  VariableDeclarator (node) {
    // console.log('node in VariableDeclarator', node);
  }
  Literal (node) {
    // console.log('node in Literal', node);
    this.text += node.raw;
  }
  Identifier (node) {
    this.text += node.name;
  }
  BinaryExpression (node) {
    // console.log('node in BinaryExpression', node);
    this[node.left.type](node.left);
    this.space();
    this.text += node.operator;
    this.space();
    this[node.right.type](node.right);
  }
}

function generate (node) {
  const printer = new Printer(node);
  return printer.print(node);
}

module.exports = generate;
