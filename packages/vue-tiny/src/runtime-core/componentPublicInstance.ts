import { hasOwn } from '../shared/utils';
import { ComponentInstance } from '../../typings/index';

const publicPropertiesMap = {
  $el: (i: ComponentInstance) => i.vnode.el,
  $slots: (i: ComponentInstance) => i.slots,
};

export const publicInstanceProxyHandlers = {
  get: ({ _: instance }, key: string) => {
    const { setupState, props } = instance;
    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
