import { PropsType, slotChildren } from '../../../typings/index';
import { createVNode } from '../vnode';

export function renderSlots (slots: slotChildren, name: string, props: PropsType) {
  const slot = slots[name];

  if (slot) {
    if (typeof slot === 'function') {
      return createVNode('div', {}, slot(props));
    }
  }
}
