import parse from './parser';
import type { AST, Dictionary } from './parser';

interface Config {
  pragma: string;
}

const DefaultConfig = {
  pragma: '_jsx.createElement',
};

class JSXEvaluator {
  str: string;
  config: Config;
  constructor(str: string, config?: Config) {
    this.str = str;
    this.config = { ...DefaultConfig, ...config };
  }
  eval(ast: AST) {
    let res = 'return ';
    res += this.genTag(ast);
    return res;
  }
  genTag(node: AST): string {
    const props = this.genPros(node.props || {});
    const children = this.genChildren(node.children || []);

    const res = `${this.config.pragma}('${node.type}', ${props}, '${JSON.stringify(children)}')`;
    return res;
  }
  genPros(props: Dictionary<any>) {
    if (Object.keys(props).length) return {};
    let res = '{';
    for (const key in props) {
      res += key + ':' + this.genPropValue(props[key]) + ',\n';
    }
    res += '}';
    return res;
  }
  genPropValue(val: any) {
    return val;
  }
  genChildren(children: AST[]) {
    if (!children.length) return [];
    const _children = [];
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.type === '#text') {
        _children.push(node.nodeValue);
      } else if (node.type === '#jsx') {
        _children.push(node.nodeValue);
      } else {
        _children.push(this.genTag(node));
      }
      return _children;
    }
  }
}

export function createJSXParser({ createElement }: { createElement: any }) {
  if (!createElement) {
    throw new Error('createElement required');
  }

  window._jsx = {
    createElement,
  };

  // createElement will be used when eval string
  return function (str: string) {
    const evaluator = new JSXEvaluator(str);
    const ast = parse(str);
    const code = evaluator.eval(ast);
    const fn = Function(code);
    const result = fn.call({ count: 1 });
    return result;
  };
}
