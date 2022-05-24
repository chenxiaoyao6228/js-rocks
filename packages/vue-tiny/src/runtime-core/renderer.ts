import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import { VNode, HTMLNameTag, ShapeFlags, ComponentInstance } from '../../typings/index';
import effect from '../reactivity/effect';
import { EMPTY_OBJ } from '../shared/utils';

export function createRenderer (options: {
  createElement: (...args: any) => void;
  patchProp: (...args: any) => void;
  insert: (...args: any) => void;
}) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render (vnode: VNode, container: HTMLElement) {
    // how to define this type when parent might be  instance or null
    patch(null, vnode, container, {} as ComponentInstance);
  }

  function patch (n1: any, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
    // console.log('n1, n2---', n1, n2);
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

  function processComponent (n1: any, n2: VNode, container: HTMLElement, parent: ComponentInstance) {
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

    // handle props, slots, and setup state
    setupComponent(instance);

    setupRenderEffect(instance, vnode, container);
  }

  /*
   * wrap function in effect so that  render function will be trigger after
   * every tracked value changed
   */
  function setupRenderEffect (instance: any, initialVNode: any, container: any) {
    effect(() => {
      // mount
      if (instance.isMounted) {
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        patch(null, subTree, container, instance);
        initialVNode.el = subTree.el;
        instance.isMounted = false;
      } else {
        // update
        console.log('update');
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        const prevTree = instance.subTree;
        instance.subTree = subTree;
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
    // patchProp
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    // console.log('oldProps, newProps-------', oldProps, newProps);
    const el = (n2.el = n1.el);
    patchProp(el, oldProps, newProps);
  }

  function patchProp (el, oldProps, newProps) {
    // console.log('oldProps, newProps', oldProps, newProps);
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const oldProp = oldProps[key];
        const newProp = newProps[key];

        if (oldProp !== newProp) {
          hostPatchProp(el, key, oldProp, newProp);
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }
  }

  function mountElement (vnode: VNode, container: HTMLElement, parent: ComponentInstance) {
    const el = (vnode.el = hostCreateElement(vnode.type as HTMLNameTag));

    const { children, shapeFlag } = vnode;

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = vnode.children as string;
    } else if (Array.isArray(children)) {
      mountChilren(vnode, el, parent);
    }
    const { props } = vnode;
    for (const key in props) {
      const val = props[key];
      hostPatchProp(el, key, null, val);
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
