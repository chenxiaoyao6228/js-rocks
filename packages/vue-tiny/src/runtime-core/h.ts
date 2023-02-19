import {
  ChildrenType,
  ComponentType,
  ElementType,
  PropsType,
  TextNodeType,
} from '../../typings/index';
import { createVNode } from './vnode';

export function h(type: ComponentType & ElementType, props?: PropsType, children?: ChildrenType) {
  return createVNode(type, props, children);
}

export function createTextVNode(text: string) {
  return createVNode('text', {}, text);
}
