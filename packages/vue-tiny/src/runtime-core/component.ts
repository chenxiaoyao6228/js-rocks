import { ComponentInstance, SetupState, VNode } from '../../typings/index';
import { initProps } from './componentProps';
import { publicInstanceProxyHandlers } from './componentPublicInstance';
import { emit } from './componentEmit';
import { initSlots } from './componentSlots';
import { shallowReadonly } from '../reactivity/reactive';
import { proxyRefs } from '../reactivity';

let currentInstance: ComponentInstance | null = null;
export function getCurrentInstance () {
  return currentInstance;
}

function setCurrentInstance (instance: ComponentInstance) {
  currentInstance = instance;
}

const isRootInstance = (instance: ComponentInstance) => Object.keys(instance).length === 0;
export function createComponentInstance (
  vnode: VNode,
  parent: ComponentInstance
): ComponentInstance {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    emit: (name: string) => {},
    parent: parent,
    provides: isRootInstance(parent) ? {} : parent.provides,
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
    setCurrentInstance(instance);
    // in order to get `this` when calling this, we have to proxy this value
    const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit });
    setCurrentInstance(null);
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult (instance: ComponentInstance, setupResult: SetupState) {
  if (typeof setupResult === 'object') {
    instance.setupState = proxyRefs(setupResult);
  }

  finishComponentSetup(instance);
}

function finishComponentSetup (instance: ComponentInstance) {
  const Component = instance.type;
  instance.render = Component.render;
}
