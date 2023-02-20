const { SourceMapGenerator } = require('source-map');
// Acorn Parser will remove  white spaces during parsing
class Printer {
  constructor(source, fileName) {
    this.text = '';
    this.sourceMapGenerator = new SourceMapGenerator({
      file: fileName + '.map.json',
    });
    this.fileName = fileName;
    this.sourceMapGenerator.setSourceContent(fileName, source);
    this.printLine = 1;
    this.printColumn = 0;
  }
  addMapping(node) {
    if (node.loc) {
      this.sourceMapGenerator.addMapping({
        generated: {
          line: this.printLine,
          column: this.printColumn,
        },
        source: this.fileName,
        original: node.loc && node.loc.start,
      });
    }
  }
  print(node) {
    this.node = node;
    this[this.node.type](this.node);
    return this.text;
  }
  space() {
    this.text += ' ';
    this.printColumn++;
  }
  nextLine() {
    this.text += '\n';
    this.printLine++;
    this.printColumn = 0;
  }
  endLine() {
    this.text += ';';
  }
  Program(node) {
    this.addMapping(node);
    // console.log('node in program', node);
    node.body.forEach(n => {
      this[n.type](n) + ';';
      this.printColumn++;
      this.nextLine();
    });
  }
  CallExpression(node) {
    this.addMapping(node);
    this.text += node.callee.name;
    this.text += '(';
    node.arguments.forEach((param, index) => {
      this[param.type](param);
      if (index !== node.arguments.length - 1) {
        this.text += ',';
        this.space();
      }
    });
    this.text += ')';
  }

  ExpressionStatement(node) {
    this.addMapping(node);
    // console.log('node in ExpressionStatement', node);
    this[node.expression.type](node.expression);
  }
  VariableDeclaration(node) {
    this.addMapping(node);
    // VariableDeclaration might contains multiple declarations
    // eg: const a=1, b=2;
    // the init node might be an Binary Expression
    this.text += node.kind;
    this.space();
    node.declarations.forEach((declaratorNode, index) => {
      if (index !== 0) {
        this.text += ',';
        this.printColumn++;
      }
      // console.log('declaratorNode', declaratorNode);
      this[declaratorNode.id.type](declaratorNode.id);
      this.space();
      this.text += '=';
      this.space();
      this[declaratorNode.init.type](declaratorNode.init);
      this.printColumn++;
    });
    this.endLine();
  }
  VariableDeclarator(node) {
    this.addMapping(node);
    // console.log('node in VariableDeclarator', node);
  }
  Literal(node) {
    this.addMapping(node);
    // console.log('node in Literal', node);
    this.text += node.raw;
  }
  Identifier(node) {
    this.addMapping(node);
    this.text += node.name;
  }
  BinaryExpression(node) {
    this.addMapping(node);
    // console.log('node in BinaryExpression', node);
    this[node.left.type](node.left);
    this.space();
    this.text += node.operator;
    this.space();
    this[node.right.type](node.right);
  }
  FunctionDeclaration(node) {
    this.addMapping(node);
    this.text += 'function';
    this.space();
    // function name
    this[node.id.type](node.id);

    this.text += '(';

    // function params
    node.params.forEach((param, index) => {
      this[param.type](param);
      if (index !== node.params.length - 1) {
        this.text += ',';
        this.space();
      }
    });
    this.text += '){';
    this.nextLine();
    // function body
    this[node.body.type](node.body);

    this.nextLine();
    this.text += '};';
  }
  FunctionExpression(node) {
    this.addMapping(node);
    // console.log('node in  FunctionExpression', node);
  }
  BlockStatement(node) {
    this.addMapping(node);
    node.body.forEach(n => {
      this[n.type](n);
    });
  }
  ReturnStatement(node) {
    this.addMapping(node);
    this.text += 'return';
    this.space();
    this[node.argument.type](node.argument);
    this.endLine();
  }
  EmptyStatement(node) {}
  ForStatement(node) {
    this.addMapping(node);
    this.text += 'for(';
    this[node.init.type](node.init);
    // this.text += ';';
    this.space();
    this[node.test.type](node.test);
    this.text += ';';
    this.space();
    this[node.update.type](node.update);
    this.text += '){';
    this.nextLine();
    this.text += '}';
  }
  UpdateExpression(node) {
    this.addMapping(node);
    // console.log('UpdateExpression', node);
    if (node.prefix === true) {
      this.text += node.operator;
      this[node.argument.type](node.argument);
    } else {
      this[node.argument.type](node.argument);
      this.text += node.operator;
    }
  }
  // FIXME: more statement: forof forin, while, switch, trycatch, debugger, throw, continue ...
}

class Generator extends Printer {
  constructor(source, fileName) {
    super(source, fileName);
  }

  generate(node) {
    this[node.type](node);
    return {
      code: this.text,
      map: this.sourceMapGenerator.toString(),
    };
  }
}

function generate(node, source, fileName) {
  return new Generator(source, fileName).generate(node);
}

module.exports = generate;
