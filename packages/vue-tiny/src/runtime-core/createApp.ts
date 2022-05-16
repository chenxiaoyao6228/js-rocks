import { render } from './renderer';
import { createVNode } from './vnode';
import { ComponentType } from '../../typings/index';

export function createApp (rootComponent: ComponentType) {
  return {
    mount (rootContainer: HTMLElement) {
      const vnode = createVNode(rootComponent, {}, []);

      render(vnode, rootContainer);
    },
  };
}
