import { createComponentInstance, setupComponent } from './component';
import { isObject } from '../shared/utils';

export function render (vnode, container) {
  patch(vnode, container);
}

function patch (vnode, container) {
  console.log('vnode', vnode);
  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else {
    processComponent(vnode, container);
  }
}

function processComponent (vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent (vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect (instance: any, container: any) {
  const subTree = instance.render();

  patch(subTree, container);
}
function processElement (vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement (vnode: any, container: any) {
  const el = document.createElement(vnode.type);

  const { children, props } = vnode;

  if (typeof children === 'string') {
    el.textContent = vnode.children;
  } else if (Array.isArray(children)) {
    mountChilren(vnode, container);
  }
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];
      el.setAttribute(key, value);
    }
  }
  container.append(el);
}

function mountChilren (vnode: any, container: any) {
  vnode.children.forEach(v => {
    patch(v, container);
  });
}
