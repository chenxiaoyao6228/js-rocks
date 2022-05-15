import { ChildrenType, ComponentInstance } from '../../typings/index';

export function initSlots (instance: ComponentInstance, children: ChildrenType) {
  instance.slots = Array.isArray(children) ? children : [children];
}
