import { ChildrenType, ComponentType, ElementType, PropsType, VNode } from '../../typings/index';

export function createVNode (
  type: ComponentType & ElementType,
  props?: PropsType,
  children?: ChildrenType
): VNode {
  const vnode = {
    type,
    props: props ? props : {},
    children: children ? children : [],
  };

  return vnode;
}
