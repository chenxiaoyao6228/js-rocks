import { ComponentInstance, SetupState, VNode } from '../../typings/index';
import { initProps } from './componentProps';
import { publicInstanceProxyHandlers } from './componentPublicInstance';
import { emit } from './componentEmit';
import { initSlots } from './componentSlots';
import { shallowReadonly } from '../reactivity/reactive';

export function createComponentInstance (vnode: VNode): ComponentInstance {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    emit: (name: string) => {},
  };

  component.emit = emit.bind(null, component);

  return component;
}

export function setupComponent (instance: ComponentInstance) {
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);
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
    const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit });

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult (instance: ComponentInstance, setupResult: SetupState) {
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup (instance: ComponentInstance) {
  const Component = instance.type;
  instance.render = Component.render;
}
