import { ComponentInstance, SetupState, VNode } from '../../typings/index';
import { initProps } from './publicProps';
import { publicInstanceProxyHandlers } from './componentPublicInstance';
import { emit } from './componentEmit';

export function createComponentInstance (vnode: VNode): ComponentInstance {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: name => {},
  };

  component.emit = emit.bind(null, component);

  return component;
}

export function setupComponent (instance: ComponentInstance) {
  // TODO
  initProps(instance);
  // initSlots()
  setupStatefulComponent(instance);
}

function setupStatefulComponent (instance: ComponentInstance) {
  instance.proxy = new Proxy(
    {
      _: instance,
    },
    publicInstanceProxyHandlers
  );

  const Component = instance.type;

  const { setup } = Component;

  if (setup) {
    // in order to get `this` when calling this, we have to proxy this value
    const setupResult = setup(instance.props, { emit: instance.emit });

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
