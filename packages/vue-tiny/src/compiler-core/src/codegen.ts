import { NodeTypes } from './ast';
import { helperMapName, TO_DISPLAY_STRING } from './runtimeHelpers';

export function generate(ast) {
  // console.log('ast', ast);
  const context = createCodeGenContext();
  const { push } = context;

  genFunctionPreamble(ast, context);

  const args = ['_ctx', '_cache'];
  push(`function render(${args.join(',')}){`);

  push('return ');

  genNode(ast.codegenNode, context);

  push('}');

  return { code: context.code };
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.SIMPLE_EXPRESSION:
      genSimpleExpression(node, context);
      break;

    case NodeTypes.TEXT:
      genText(node, context);
      break;

    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context);
      break;
    default:
      break;
  }
}

function createCodeGenContext() {
  const context = {
    code: '',
    push: function (str) {
      context.code += str;
    },
    helper(key) {
      return `_${helperMapName[key]}`;
    },
  };
  return context;
}

/*
const { toDisplayString as _toDisplayString, openBlock as _openBlock} = "vue"

return function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, _toDisplayString(_ctx.message), 1))
}
*/
function genInterpolation(node, context) {
  const { push, helper } = context;
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(')');
}

function genSimpleExpression(node, context) {
  const { push } = context;
  push(`${node.content}`);
}

function genText(node, context) {
  const { push } = context;
  push(`'${node.content}'`);
}

function genFunctionPreamble(ast, context: { code: string; push: (str: any) => void }) {
  const { push } = context;
  const VueBinging = 'Vue';
  const aliasHelper = s => `${helperMapName[s]}:_${helperMapName[s]}`;
  if (ast.helpers.length > 0) {
    push(`const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinging}`);
  }
  push('\n');
}
