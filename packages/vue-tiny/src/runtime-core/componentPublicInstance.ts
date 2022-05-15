import { hasOwn } from '../shared/utils';

export const publicInstanceProxyHandlers = {
  get: ({ _: instance }, key: string) => {
    const { setupState, props } = instance;
    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }
  },
};
