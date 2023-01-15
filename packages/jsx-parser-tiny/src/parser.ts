type Dictionary<T> = Record<string, T>;

interface AST {
  type: string;
  props: Dictionary<any>;
  children: AST[];
  unarySlash?: boolean;
}

class Stack {
  private _stack: any[];
  constructor (initialValue?: any[]) {
    this._stack = initialValue || [];
  }
  peek () {
    return this._stack[this._stack.length - 1];
  }
  push (item: any) {
    this._stack.push(item);
  }
  pop () {
    this._stack.pop();
  }
}

class JSXParser {
  text: string;
  stack: Stack;
  ret: AST[] = [];
  constructor (text: string) {
    this.text = text;
    this.stack = new Stack();
  }
  parse () {
    while (this.text) {
      console.log('this.text in while---', this.text);
      const textEnd = this.text.indexOf('<');
      if (textEnd === 0) {
        // could be startTag, endTag, commentTag
        this.readStartTag();
      }
      if (textEnd > 0) {
        // handle text
      }
      if (textEnd < 0) {
        // pure text
      }
    }
    return this.ret[0];
  }
  addNode (node: AST) {
    const peek = this.stack.peek();
    if (peek && peek.children) {
      peek.children.push(node);
    } else {
      this.ret.push(node);
    }
  }
  advance (length: number) {
    this.text = this.text.slice(length);
  }
  readStartTag () {
    // parse: startTag(nodeName, attrs, startTagEnd(selfClose)) and endTag
    // handle startTag
    const ncname = '[a-zA-Z_][\\w\\-\\.]*';
    const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
    const startTagOpen = new RegExp(`^<${qnameCapture}`);
    const matchRes = this.text.match(startTagOpen);
    if (matchRes) {
      const tagName = matchRes[1];
      const node = {
        type: tagName,
        props: {},
        children: []
      };
      this.addNode(node); // add children to parent
      this.stack.push(node); // add children first and then push to stack
      this.advance(matchRes[0].length);
      // parse attributes
      this.readAttrs(node);
      // parse startCloseTag
      this.readStartTagClose(node);
    }
    // handle endTag
    const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
    const endTagMatch = '</div>'.match(endTag);
    if (endTagMatch) {
      this.advance(endTagMatch[0].length);
      this.stack.pop();
    }
  }
  readAttrs (node: AST) {
    // const attrReg = /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    // console.log('this.text', this.text);
    // const matchRes = this.text.match(attrReg);
    // if (matchRes) {
    //   this.text = this.text.replace(matchRes[0], '');
    // }
  }
  readStartTagClose (node: AST) {
    const startTagClose = /^\s*(\/?)>/;
    const matchRes = this.text.match(startTagClose);
    if (matchRes) {
      // node.unarySlash = matchRes[1] === '/';
      this.advance(matchRes[0].length);
    }
  }
}

function parse (text: string) {
  return new JSXParser(text).parse();
}

export default parse;
