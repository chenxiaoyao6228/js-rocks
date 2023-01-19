import parse from './parser';
import  type {AST, Dictionary} from './parser';

interface Config {
  pragma: string;
}

const DefaultConfig = {
  pragma: '_jsx.createElement'
};

class JSXEvaluator {
  str: string;
  config: Config;
  constructor (str: string, config?: Config) {
    this.str = str;
    this.config = { ...DefaultConfig, ...config };
  }
  eval (ast: AST) {
    return this.genTag(ast);
  }
  genTag (node: AST): string{
    const props = this.genPros(node.props || {});
    const children = this.genChildren(node.children || []);
    const res = `return ${this.config.pragma}('${node.type}', ${props}, ${children})`;
    return res;
  }
  genPros (props:Dictionary<any>) {
    if(Object.keys(props).length) return {};
    let res = '{';
    for(const key in props){
      res += key + ':' + this.genPropValue(props[key]) + ',\n';
    }
    res += '}';
    return res;
  }
  genPropValue (val: any){
    return val;
  }
  genChildren (children: AST[]) {
    if(!children.length) return '';
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
     if(node.type === '#text'){
      return node.nodeValue;
     }
     if(node.type === '#jsx'){
      //
     }
     return this.genTag(node);
    }
  }
}



export function createJSXParser ({createElement}: {
  createElement: any;
}) {

  if(!createElement){
    throw new Error('createElement required');
  }

  const _global = global ? global : window;

  _global._jsx = {
    createElement
  };

  // createElement will be used when eval string
  return function (str: string) {
    const evaluator = new JSXEvaluator(str);
    const ast = parse(str);
    const code = evaluator.eval(ast);
    const fn =  Function(code);
    const result = fn();
    return result;
  };
}