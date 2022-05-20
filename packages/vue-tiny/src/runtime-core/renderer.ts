import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import {
  VNode,
  HTMLNameTag,
  ChildrenType,
  ShapeFlags,
  ComponentInstance,
} from '../../typings/index';

export function createRenderer (options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render (vnode: VNode, container: HTMLElement) {
    // how to define this type when parent might be  instance or null
    patch(vnode, container, {} as ComponentInstance);
  }

  function patch (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    // distinguish normal html element and component
    const { shapeFlag, type } = vnode;

    switch (type) {
      case 'fragment':
        processFragment(vnode, container, parent);
        break;

      case 'text':
        processTextNode(vnode, container, parent);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parent);
        }
        break;
    }
  }

  function processComponent (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    mountComponent(vnode, container, parent);
  }

  function mountComponent (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    const instance = createComponentInstance(vnode, parent);

    setupComponent(instance);

    setupRenderEffect(instance, container);
  }

  function setupRenderEffect (instance: any, container: any) {
    // render function return vnode element
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);

    patch(subTree, container, instance);
  }
  function processElement (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    mountElement(vnode, container, parent);
  }

  const isEvenAttr = (key: string) => /^on[A-Z]/.test(key);

  function mountElement (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    const el = (vnode.el = hostCreateElement(vnode.type as HTMLNameTag));

    const { children, props, shapeFlag } = vnode;

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = vnode.children as string;
    } else if (Array.isArray(children)) {
      mountChilren(vnode, el, parent);
    }
    for (const key in props) {
      const value = props[key];
      if (isEvenAttr(key)) {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
      } else {
        hostPatchProp(el, key, value);
      }
    }
    hostInsert(container, el);
  }

  function mountChilren (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    const children = vnode.children as VNode[];
    children.forEach((v: VNode) => {
      patch(v, container, parent);
    });
  }

  function processFragment (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    mountChilren(vnode, container, parent);
  }

  function processTextNode (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    const textNode = (vnode.el = document.createTextNode(vnode.children as string));
    hostInsert(container, textNode);
  }

  return {
    createApp: createAppAPI(render),
  };
}
