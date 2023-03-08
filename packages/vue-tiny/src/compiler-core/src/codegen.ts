import { isString } from '@js-rocks/lodash-tiny';
import { NodeTypes } from './ast';
import { CREATE_ELEMENT_VNODE, helperMapName, TO_DISPLAY_STRING } from './runtimeHelpers';

export function generate(ast) {
  // console.log('ast', ast);
  const context = createCodeGenContext();
  const { push } = context;

  genFunctionPreamble(ast, context);

  push('return ');

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
    case NodeTypes.ELEMENT:
      genElement(node, context);
      break;
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context);
      break;
    default:
      break;
  }
}

function genCompoundExpression(node: any, context: any) {
  const { push } = context;
  const children = node.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isString(child)) {
      push(child);
    } else {
      genNode(child, context);
    }
  }
}

function genElement(node: any, context: any) {
  const { push, helper } = context;
  const { tag, children, props } = node;
  push(`${helper(CREATE_ELEMENT_VNODE)}(`);
  genNodeList(genNullable([tag, props, children]), context);
  push(')');
}

function genNodeList(nodes, context) {
  const { push } = context;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (isString(node)) {
      push(node);
    } else {
      genNode(node, context);
    }

    if (i < nodes.length - 1) {
      push(', ');
    }
  }
}

function genNullable(args: any) {
  return args.map(arg => arg || 'null');
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
