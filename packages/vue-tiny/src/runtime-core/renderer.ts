import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import {
  VNode,
  HTMLNameTag,
  ShapeFlags,
  ComponentInstance,
  PropsType,
  ArrayChildrenType,
  TextChildren,
} from '../../typings/index';
import effect from '../reactivity/effect';
import { EMPTY_OBJ } from '../shared/utils';

export function createRenderer (options: {
  createElement: (...args: any) => HTMLElement;
  patchProp: (...args: any) => void;
  insert: (...args: any) => void;
  remove: (...args: any) => void;
  setElementText: (...args: any) => void;
}) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options;

  function render (vnode: VNode, container: HTMLElement) {
    // how to define this type when parent might be  instance or null
    patch(null, vnode, container, {} as ComponentInstance);
  }

  function patch (
    n1: any,
    n2: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    // distinguish normal html element and component
    const { shapeFlag, type } = n2;

    switch (type) {
      case 'fragment':
        processFragment(n1, n2, container, parent, anchor);
        break;

      case 'text':
        processTextNode(n1, n2, container, parent, anchor);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parent, anchor);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parent, anchor);
        }
        break;
    }
  }

  function processComponent (
    n1: any,
    n2: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    if (!n1) {
      console.log('mountComponent-------');
      mountComponent(n2, container, parent, anchor);
    } else {
      console.log('patchComponent------');
      patchComponent(n1, n2, container, parent, anchor);
    }
  }

  function patchComponent (
    n1: any,
    n2: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {}

  function mountComponent (
    vnode: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    // only init instance once
    const instance = createComponentInstance(vnode, parent);

    // handle props, slots, and setup state
    setupComponent(instance);

    setupRenderEffect(instance, vnode, container, anchor);
  }

  /*
   * wrap function in effect so that  render function will be trigger after
   * every tracked value changed
   */
  function setupRenderEffect (
    instance: any,
    initialVNode: any,
    container: any,
    anchor?: HTMLElement
  ) {
    effect(() => {
      // mount
      if (instance.isMounted) {
        console.log('init');
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        patch(null, subTree, container, instance, anchor);
        initialVNode.el = subTree.el;
        instance.isMounted = false;
      } else {
        // update
        console.log('update');
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevTree = instance.subTree;
        instance.subTree = subTree;
        patch(prevTree, subTree, container, instance, anchor);
      }
    });
  }

  function processElement (
    n1: any,
    n2: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    if (!n1) {
      mountElement(n2, container, parent, anchor);
    } else {
      patchElement(n1, n2, container, parent, anchor);
    }
  }

  function patchElement (
    n1: VNode,
    n2: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    // patchProp
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    // console.log('oldProps, newProps-------', oldProps, newProps);
    const el = (n2.el = n1.el) as HTMLElement;

    patchChilren(n1, n2, el, parent, anchor);

    patchProp(el, oldProps, newProps);
  }

  function patchProp (el: HTMLElement, oldProps: PropsType, newProps: PropsType) {
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

  function mountElement (
    vnode: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    const el = hostCreateElement(vnode.type as HTMLNameTag);

    vnode.el = el;

    const { children, shapeFlag } = vnode;

    // how to narrow this
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children as TextChildren;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el, parent, anchor);
    }
    const { props } = vnode;
    for (const key in props) {
      const val = props[key];
      hostPatchProp(el, key, null, val);
    }
    hostInsert(container, el, anchor);
  }

  function mountChildren (
    children: ArrayChildrenType,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    children.forEach((c: VNode) => {
      patch(null, c, container, parent, anchor);
    });
  }

  function processFragment (
    n1: VNode,
    n2: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    mountChildren(n2, container, parent, anchor);
  }

  function processTextNode (
    n1: VNode,
    n2: VNode,
    container: HTMLElement,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    // TODO: replace custom textElement creator
    const textNode = (n2.el = document.createTextNode(n2.children as string));
    hostInsert(container, textNode, anchor);
  }

  function patchChilren (
    n1: VNode,
    n2: VNode,
    container: any,
    parent: ComponentInstance,
    anchor?: HTMLElement
  ) {
    const oldFlag = n1.shapeFlag;
    const newFlag = n2.shapeFlag;
    const c1 = n1.children;
    const c2 = n2.children;
    // pay attention not to use &&
    if (newFlag & ShapeFlags.TEXT_CHILDREN) {
      // text -> array
      if (oldFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(container, c1);
      }
      if (c1 !== c2) {
        hostSetElementText(container, c2);
      }
    } else {
      // text -> text
      if (oldFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, '');
        mountChildren(c2, container, parent, anchor);
      } else {
        // array -> array
        patchKeyChildren(c1, c2, container, parent, anchor);
      }
    }
  }

  function patchKeyChildren (
    c1: ArrayChildrenType,
    c2: ArrayChildrenType,
    container: HTMLElement,
    parent: ComponentInstance,
    parentAnchor?: HTMLElement
  ) {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;

    // left-side comparision
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i];
      if (isSameType(n1, n2)) {
        patch(n1, n2, container, parent, parentAnchor);
      } else {
        break;
      }
      i++;
    }

    // right-side comparision
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2];
      if (isSameType(n1, n2)) {
        patch(n1, n2, container, parent, parentAnchor);
      } else {
        break;
      }
      e1--;
      e2--;
    }

    // newChildren.length > oldChildren.length, insert new node with anchor
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : undefined;
        while (i <= e2) {
          patch(null, c2[i], container, parent, anchor);
          i++;
        }
      }
    }

    function isSameType (n1: VNode, n2: VNode) {
      return n1.type === n2.type && n1.key === n2.key;
    }
  }

  function unmountChildren (parent: any, children: any) {
    children.forEach((child: any) => {
      hostRemove(parent, child.el);
    });
  }
  return {
    createApp: createAppAPI(render),
  };
  // all function should be wrapped inside
}
