import { NodeTypes } from './ast';

export function generate(ast) {
  const context = createCodeGenContext();
  const { push } = context;

  push('return ');

  const args = ['_ctx', '_cache'];
  push(`function render(${args.join(',')}){`);

  push('return ');

  genNode(ast.codegenNode, context);

  push('}');

  return { code: context.code };
}

function genNode(node: any, context: any) {
  const { push } = context;
  push(`'${node.content}'`);
}

function createCodeGenContext() {
  const context = {
    code: '',
    push: function (str) {
      context.code += str;
    },
  };
  return context;
}
