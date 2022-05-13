export interface VNode {
  type: ComponentType & ElementType;
  props?: PropsType;
  children?: ChildrenType;
}

export interface ComponentType {
  setup: (props: PropsType) => Record<string, any>;
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
  props: PropsType;
  render?: () => VNode;
  proxy?: typeof Proxy;
}
