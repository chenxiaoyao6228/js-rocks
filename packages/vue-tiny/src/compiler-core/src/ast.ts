import { CREATE_ELEMENT_VNODE } from './runtimeHelpers';

export const enum NodeTypes {
  INTERPOLATION = 'INTERPOLATION',
  SIMPLE_EXPRESSION = 'SIMPLE_EXPRESSION',
  ELEMENT = 'ELEMENT',
  TEXT = 'TEXT',
  ROOT = 'ROOT',
  COMPOUND_EXPRESSION = 'COMPOUND_EXPRESSION',
}

export function createVNodeCall(context, tag, props, children) {
  context.helper(CREATE_ELEMENT_VNODE);

  return {
    type: NodeTypes.ELEMENT,
    tag,
    props,
    children,
  };
}
