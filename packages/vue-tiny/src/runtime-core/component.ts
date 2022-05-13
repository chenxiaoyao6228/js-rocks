import { ComponentInstance, SetupState, VNode } from '../typings/index';
import { initProps } from './publicProps';

export function createComponentInstance (vnode: VNode): ComponentInstance {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
  };
  return component;
}

export function setupComponent (instance: ComponentInstance) {
  // TODO
  initProps(instance);
  // initSlots()
  setupStatefulComponent(instance);
}

function setupStatefulComponent (instance: ComponentInstance) {
  const rawObj = {};
  instance.proxy = new Proxy(rawObj, {
    get: (target, key: string) => {
      const { setupState, props } = instance;
      if (key in setupState) {
        return setupState[key];
      } else if (key in props) {
        return props[key];
      }
    },
  });

  const Component = instance.type;

  const { setup } = Component;

  if (setup) {
    // in order to get `this` when calling this, we have to proxy this value
    const setupResult = setup(instance.props);

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult (instance: ComponentInstance, setupResult: SetupState) {
  // function Object
  // TODO function
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup (instance: ComponentInstance) {
  const Component = instance.type;
  instance.render = Component.render;
}
