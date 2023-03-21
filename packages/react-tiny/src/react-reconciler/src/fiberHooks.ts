import { FiberNode } from './fiber';

// execute function component and relative hooks
export function renderWithHooks(wip: FiberNode) {
  const Component = wip.type;
  const props = wip.pendingProps;
  const children = Component(props);
  return children;
}
