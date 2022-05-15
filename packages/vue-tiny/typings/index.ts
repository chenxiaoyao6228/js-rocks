export interface VNode {
  type: ComponentType & ElementType;
  props?: PropsType;
  children: ChildrenType;
}

type emitFn = (eventName: string) => void;

export interface ContextType {
  emit: emitFn;
}

export interface ComponentType {
  setup: (props: PropsType, context: ContextType) => Record<string, any>;
  render: () => VNode;
}
export type SetupState = Record<string, any>;
export type HTMLNameTag = keyof HTMLElementDeprecatedTagNameMap;
export type ElementType = HTMLNameTag; // div, span, el

export type PropsType = Record<string, any>; // style class
export type ChildrenType = VNode[] | string;

export interface ComponentInstance {
  vnode: VNode;
  type: ComponentType & ElementType;
  setupState: SetupState;
  emit: emitFn;
  props: PropsType;
  slots: {};
  render?: () => VNode;
  proxy?: typeof Proxy;
}
