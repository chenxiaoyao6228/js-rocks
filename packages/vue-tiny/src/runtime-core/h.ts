import { ChildrenType, ComponentType, ElementType, PropsType } from '../typings/index';
import { createVNode } from './vnode';

export function h (type: ComponentType & ElementType, props?: PropsType, children?: ChildrenType) {
  return createVNode(type, props, children);
}
