import { isArray } from '@js-rocks/lodash-tiny';
import { ChildrenType, ComponentInstance, ShapeFlags } from '../../typings/index';

export function initSlots (instance: ComponentInstance, children: ChildrenType) {
  // slots
  const { vnode } = instance;
  if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
}

function normalizeObjectSlots (children: any, slots: any) {
  for (const key in children) {
    const value = children[key];
    slots[key] = props => normalizeSlotValue(value(props));
  }
}

function normalizeSlotValue (value) {
  return isArray(value) ? value : [value];
}
