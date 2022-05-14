import { ChildrenType, ComponentType, ElementType, PropsType, VNode } from '../../typings/index';

export function createVNode (
  type: ComponentType & ElementType,
  props?: PropsType,
  children?: ChildrenType
): VNode {
  const vnode = {
    type,
    props,
    children,
  };

  return vnode;
}
