import { ComponentInstance } from '../typings/index';
import { shallowReadonly } from '../reactivity/reactive';

export function initProps (instance: ComponentInstance) {
  instance.props = shallowReadonly(instance.vnode.props || {});
}
