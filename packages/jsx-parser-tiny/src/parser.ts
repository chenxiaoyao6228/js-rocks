export type Dictionary<T> = Record<string, T>;

export interface AST {
  type: string;
  children?: AST[];
  props?: Dictionary<any>;
  nodeValue?: string;
}

class Stack {
  private _stack: any[];
  constructor(initialValue?: any[]) {
    this._stack = initialValue || [];
  }
  peek() {
    return this._stack[this._stack.length - 1];
  }
  push(item: any) {
    this._stack.push(item);
  }
  pop() {
    this._stack.pop();
  }
}

const tagName = '[a-zA-Z_][\\w\\-\\.]*';
const tagNameCapture = `((?:${tagName}\\:)?${tagName})`;
const startTagOpenRegx = new RegExp(`^<${tagNameCapture}`);
const attrRegx = /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagCloseRegx = /^\s*(\/?)>/;
const endTagRegx = new RegExp(`^<\\/${tagNameCapture}[^>]*>`);
const commentTagRegx = /^<!--([^<>]*)-->/;

class JSXParser {
  text: string;
  stack: Stack;
  ret: AST[] = [];
  constructor(text: string) {
    this.text = text;
    this.stack = new Stack();
  }
  parse(): AST {
    while (this.text) {
      let textEnd = this.text.indexOf('<');
      if (textEnd === 0) {
        //  commentTag(<!-- x -->)
        if (this.parseCommentTag()) {
          continue;
        }
        // endTag(</>),
        if (this.parseEndTag()) {
          continue;
        }
        // startTag(<div id="id1" class="class1">)
        if (this.parseStartTag()) {
          continue;
        }
        // <<1<</div>
      }
      let text, rest, next;
      if (textEnd > 0) {
        rest = this.text.slice(textEnd);
        // if not match any tag, that means '<' is as part of the raw text
        while (
          !endTagRegx.test(rest) &&
          !startTagOpenRegx.test(rest) &&
          !commentTagRegx.test(rest)
        ) {
          next = rest.indexOf('<', 1);
          if (next < 0) {
            break;
          }
          textEnd += next;
          rest = this.text.slice(textEnd);
        }
        text = this.text.substring(0, textEnd);
        if (text.indexOf('{') === -1) {
          this.addNode({
            type: '#text',
            nodeValue: text,
          });
        } else {
          // jsxExpression '<div>xx{111}yy{222}zz</div>'
          const tagRE = /\{((?:.|\n)+?)\}/g;
          if (!tagRE.test(text)) {
            return;
          }
          let lastIndex = (tagRE.lastIndex = 0);
          let match, index;
          while ((match = tagRE.exec(text))) {
            index = match.index;
            // add text that before {
            if (index > lastIndex) {
              this.addNode({
                type: '#text',
                nodeValue: text.slice(lastIndex, index),
              });
            }
            this.addNode({
              type: '#jsx',
              nodeValue: match[1].trim(),
            });
            lastIndex = index + match[0].length;
          }
          if (lastIndex < text.length) {
            this.addNode({
              type: '#text',
              nodeValue: text.slice(lastIndex),
            });
          }
        }
        this.advanceBy(textEnd);
        continue;
      }
      if (textEnd < 0) {
        // pure text
        this.addNode({
          type: '#text',
          nodeValue: this.text,
        });
        this.text = '';
      }
    }
    return this.ret[0];
  }
  parseEndTag() {
    const endTagMatch = this.text.match(endTagRegx);
    if (endTagMatch) {
      this.advanceBy(endTagMatch[0].length);
      this.stack.pop();
      return endTagMatch;
    }
  }
  parseCommentTag() {
    const commentTagMatch = this.text.match(commentTagRegx);
    if (commentTagMatch) {
      this.addNode({
        type: '#comment',
        nodeValue: commentTagMatch[1].trim(),
      });
      this.advanceBy(commentTagMatch[0].length);
      return commentTagMatch;
    }
  }
  parseStartTag() {
    // parse: startTag(nodeName, attrs, startTagEnd(selfClose)) and endTag
    const startTagMatch = this.text.match(startTagOpenRegx);
    if (startTagMatch) {
      const tagName = startTagMatch[1];
      const node = {
        type: tagName,
        props: {},
        children: [],
      };
      this.addNode(node); // add children to parent
      this.stack.push(node); // add children first and then push to stack
      this.advanceBy(startTagMatch[0].length);
      // parse attributes
      let end, attr;
      while (!(end = this.text.match(startTagCloseRegx)) && (attr = this.text.match(attrRegx))) {
        const attrMatch = this.text.match(attrRegx);
        if (attrMatch) {
          const attrName = attrMatch[1];
          const attrVal = attrMatch[3];
          node.props[attrName] = attrVal;
          this.advanceBy(attrMatch[0].length);
        }
      }
      // parse startCloseTag
      const endTagMatch = this.text.match(startTagCloseRegx);
      if (endTagMatch) {
        if (endTagMatch[1] === '/') {
          this.stack.pop();
        }
        this.advanceBy(endTagMatch[0].length);
      }
      return startTagMatch;
    }
  }
  addNode(node: AST) {
    const peek = this.stack.peek();
    if (peek && peek.children) {
      peek.children.push(node);
    } else {
      this.ret.push(node);
    }
  }
  advanceBy(length: number) {
    this.text = this.text.slice(length);
  }
}

function parse(text: string) {
  return new JSXParser(text).parse();
}

export default parse;
