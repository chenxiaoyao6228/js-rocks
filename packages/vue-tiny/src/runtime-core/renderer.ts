import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import {
  VNode,
  HTMLNameTag,
  ChildrenType,
  ShapeFlags,
  ComponentInstance,
} from '../../typings/index';
import effect from '../reactivity/effect';

export function createRenderer (options: {
  createElement: (...args: any) => void;
  patchProps: (...args: any) => void;
  insert: (...args: any) => void;
}) {
  const {
    createElement: hostCreateElement,
    patchProps: hostPatchProps,
    insert: hostInsert,
  } = options;

  function render (vnode: VNode, container: HTMLElement) {
    // how to define this type when parent might be  instance or null
    patch(null, vnode, container, {} as ComponentInstance);
  }

  function patch (n1: any, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
    // distinguish normal html element and component
    const { shapeFlag, type } = n2;

    switch (type) {
      case 'fragment':
        processFragment(n1, n2, container, parent);
        break;

      case 'text':
        processTextNode(n1, n2, container, parent);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parent);
        }
        break;
    }
  }

  function processComponent (n1, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
    if (!n1) {
      console.log('mountComponent-------');
      mountComponent(n2, container, parent);
    } else {
      console.log('patchComponent------');
      patchComponent(n1, n2, container, parent);
    }
  }

  function patchComponent (n1: any, n2: VNode, container: HTMLElement, parent: ComponentInstance) {}

  function mountComponent (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    // only init instance once
    const instance = createComponentInstance(vnode, parent);

    setupComponent(instance);

    setupRenderEffect(instance, container);
  }

  function setupRenderEffect (instance: any, container: any) {
    // trigger render after tracked value changed
    effect(() => {
      if (instance.isMounted) {
        instance.isMounted = false;
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        patch(null, subTree, container, instance);
      } else {
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        console.log('subTree', subTree);
        const prevTree = instance.subTree;
        console.log('prevTree', prevTree);

        patch(prevTree, subTree, container, instance);
      }
    });
  }

  function processElement (n1: any, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
    if (!n1) {
      mountElement(n2, container, parent);
    } else {
      patchElement(n1, n2, container, parent);
    }
  }

  function patchElement (n1: VNode, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
    console.log('patchElement');
    console.log('n1', n1);
    console.log('n2', n2);
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
        hostPatchProps(el, key, value);
      }
    }
    hostInsert(container, el);
  }

  function mountChilren (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    const children = vnode.children as VNode[];
    children.forEach((c: VNode) => {
      patch(null, c, container, parent);
    });
  }

  function processFragment (n1, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
    mountChilren(n2, container, parent);
  }

  function processTextNode (n1, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
    const textNode = (n2.el = document.createTextNode(n2.children as string));
    hostInsert(container, textNode);
  }

  return {
    createApp: createAppAPI(render),
  };
}
