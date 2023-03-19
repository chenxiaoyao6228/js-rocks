export type ElementType = any;
export type Props = any;
export type Key = any;
export type Ref = any;

export interface ReactElementType {
  $$typeof: Symbol | number;
  type: ElementType;
  props: Props;
  key: Key;
  ref: Ref;
  // custom key for debug
  __mark: string;
}
