import { VNode } from '../../../typings';

export function shouldComponentUpdate(preVNode: VNode, nextVNode: VNode) {
  const { props: preProps } = preVNode;
  const { props: nextProps } = nextVNode;
  for (const key in preProps) {
    if (preProps[key] !== nextProps[key]) {
      return true;
    }
  }
  return false;
}
