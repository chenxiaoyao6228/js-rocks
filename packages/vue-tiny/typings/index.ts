export const enum ShapeFlags {
  ELEMENT = 1, // 0001
  STATEFUL_COMPONENT = 1 << 1, // 0010
  TEXT_CHILDREN = 1 << 2, // 0100
  ARRAY_CHILDREN = 1 << 3, // 1000
  SLOT_CHILDREN = 1 << 4,
}

export type FragmentNodeTYpe = 'fragment';
export type TextNodeType = 'text';

export type VNode_TYPE = ComponentType | ElementType | FragmentNodeTYpe | TextNodeType;

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
export type ArrayChildrenType = VNode[];
export type TextChildren = string;
export type ChildrenType = ArrayChildrenType | TextChildren;

export interface VNode {
  name?: string;
  type: VNode_TYPE;
  props: PropsType;
  children: ChildrenType;
  next: ComponentInstance;
  component: ComponentInstance | null;
  shapeFlag: ShapeFlags;
  el?: HTMLElement;
  key?: string;
}

export interface ComponentInstance {
  vnode: VNode;
  type: ComponentType & ElementType;
  next: VNode | null;
  setupState: SetupState;
  emit: emitFn;
  props: PropsType;
  slots: {};
  render?: () => VNode;
  update: () => void;
  proxy?: typeof Proxy;
  parent: ComponentInstance;
  provides: Record<string, any>;
}
