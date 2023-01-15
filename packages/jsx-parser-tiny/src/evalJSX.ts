class JSXEvaluator {
  str: string;
  constructor (str: string, config?: any) {
    this.str = str;
  }
  eval (context) {}
  genTag () {}
  genPros () {}
  genChildren () {}
}

function evalJSX (str: string, context: any) {
  const evaluator = new JSXEvaluator(str, {});
  const result = evaluator.eval(context);
  return result;
}
