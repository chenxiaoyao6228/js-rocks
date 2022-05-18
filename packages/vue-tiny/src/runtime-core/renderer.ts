import { createComponentInstance, setupComponent } from './component';
import { VNode, HTMLNameTag, ChildrenType, ShapeFlags } from '../../typings/index';

export function render (vnode: VNode, container: HTMLElement) {
  patch(vnode, container);
}

function patch (vnode: VNode, container: HTMLElement) {
  // distinguish normal html element and component
  const { shapeFlag, type } = vnode;

  switch (type) {
    case 'fragment':
      processFragment(vnode, container);
      break;

    case 'text':
      processTextNode(vnode, container);
      break;
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container);
      }
      break;
  }
}

function processComponent (vnode: VNode, container: HTMLElement) {
  mountComponent(vnode, container);
}

function mountComponent (vnode: VNode, container: HTMLElement) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect (instance: any, container: any) {
  // render function return vnode element
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  patch(subTree, container);
}
function processElement (vnode: VNode, container: HTMLElement) {
  mountElement(vnode, container);
}

const isEvenAttr = (key: string) => /^on[A-Z]/.test(key);

function mountElement (vnode: VNode, container: HTMLElement) {
  const el = (vnode.el = document.createElement(vnode.type as HTMLNameTag));

  const { children, props, shapeFlag } = vnode;

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = vnode.children as string;
  } else if (Array.isArray(children)) {
    mountChilren(vnode, el);
  }
  for (const key in props) {
    const value = props[key];
    if (isEvenAttr(key)) {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else {
      el.setAttribute(key, value);
    }
  }
  container.append(el);
}

function mountChilren (vnode: VNode, container: HTMLElement) {
  const children = vnode.children as VNode[];
  children.forEach((v: VNode) => {
    patch(v, container);
  });
}

function processFragment (vnode: VNode, container: HTMLElement) {
  mountChilren(vnode, container);
}

function processTextNode (vnode: VNode, container: HTMLElement) {
  const textNode = (vnode.el = document.createTextNode(vnode.children as string));
  container.append(textNode);
}
