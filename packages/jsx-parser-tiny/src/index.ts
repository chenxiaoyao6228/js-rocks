interface Node {
  type: string
  value: string
}

class Lexer {
  text: string;
  index: number;
  tokens: Node[];
  constructor (text: string) {
    this.text = text;
    this.index = 0;
    this.tokens = [];
  }
  lex () {
    while(this.index < this.text.length){
      const ch  = this.text.charAt(this.index);
      if(ch === '<'){
        this.readOpenTag();
      }
      this.index++;
    }
  }
  readOpenTag () {
     const ncname = '[a-zA-Z_][\\w\\-\\.]*';
     const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
     const startTagOpen = new RegExp(`^<${qnameCapture}`);
     const start = this.text.match(startTagOpen);
     console.log('start', start);
     if (start) {
       const tagName = start[1];
       this.tokens.push({ type: tagName, value: start[1] });
     }
  }
}

class AstBuilder {
  lexer: Lexer;
  constructor (lexer: Lexer) {
    this.lexer = lexer;
  }
  ast () {
    const tokens = this.lexer.lex();
  }
}

class Compiler {
  astBuilder: AstBuilder;
  constructor (astBuilder: AstBuilder) {
    this.astBuilder = astBuilder;
  }
  compile () {
    const ast = this.astBuilder.ast();
    // 根据ast生成c函数
    return 1;
  }
}

function parse (text:string) {
  const lexer = new Lexer(text);
  const astBuilder = new AstBuilder(lexer);
  const compiler = new Compiler(astBuilder);
  return compiler.compile();
}

export default parse;
