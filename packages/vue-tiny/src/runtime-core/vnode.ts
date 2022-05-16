import { ChildrenType, PropsType, ShapeFlags, VNode, VNode_TYPE } from '../../typings/index';

export function createVNode (type: VNode_TYPE, props?: PropsType, children?: ChildrenType): VNode {
  const vnode = {
    type,
    props: props ? props : {},
    children: children ? children : [],
    shapeFlag: getShapeFlag(type),
  };

  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }

  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
    }
  }

  return vnode;
}

function getShapeFlag (type: unknown) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT;
}
