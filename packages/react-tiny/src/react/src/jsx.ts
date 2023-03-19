import { REACT_ELEMENT_TYPE } from '../../shared/ReactSymbol';
import { ElementType, Key, Props, ReactElementType, Ref } from '../../shared/ReactTypes';

const ReactElement = function (type: ReactElementType, key: Key, ref: Ref, props: Props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    key,
    ref,
    props,
    __mark: 'js-rocks',
  };
  return element;
};

export function jsx(type: ElementType, config: any, ...maybeChildren: any) {
  const props: Props = {};

  let key: Key = null;
  let ref: Ref = null;
  for (const propName in config) {
    // filter key and ref, others will serve as props
    const val = config[propName];
    if (propName === 'key') {
      if (val !== undefined) {
        key = `${val}`;
      }
    } else if (propName === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
    } else if ({}.hasOwnProperty.call(config, propName)) {
      props[propName] = val;
    }
  }

  const maybeChildrenLength = maybeChildren.length;
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren;
    }
  }
  return ReactElement(type, key, ref, props);
}

export const jsxDev = jsx;
