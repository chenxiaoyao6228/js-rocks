class Printer {
  constructor (node) {
    this.node = node;
    this.text = '';
  }
  print () {
    this[this.node.type](this.node);
    return this.text;
  }
  Program (node) {
    // console.log('node in program', node);
    node.body.forEach(n => {
      this.text += this[n.type](n);
    });
    return this.text;
  }
  ExpressionStatement (node) {
    // console.log('node in ExpressionStatement', node);
    return this[node.expression.type](node.expression);
  }
  Literal (node) {
    // console.log('node in Literal', node);
    return node.value;
  }
}

function generate (node) {
  const printer = new Printer(node);
  return printer.print(node);
}

module.exports = generate;
