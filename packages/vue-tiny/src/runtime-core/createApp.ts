import { createVNode } from './vnode';
import { ComponentType } from '../../typings/index';

export function createAppAPI (render: Function) {
  return function createApp (rootComponent: ComponentType) {
    return {
      mount (rootContainer: HTMLElement) {
        const vnode = createVNode(rootComponent, {}, []);
        render(vnode, rootContainer);
      },
    };
  };
}
