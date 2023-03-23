import { processUpdateQueue, UpdateQueue } from './updateQueue';
import { HostRoot, HostComponent, HostText, FunctionComponent } from './workTag';
import { FiberNode } from './fiber';
import { ReactElementType } from '../../shared/ReactTypes';
import { mountChildFibers, reconcileChildFibers } from './childFibers';
import { renderWithHooks } from './fiberHooks';

// Q. how to convert a tree to a linked list

// 1. compare child fiberNode and child element, create new fiber node
// 2. mark side effects
export function beginWork(wip: FiberNode): FiberNode {
  // return child fiber node
  switch (wip.tag) {
    case HostRoot:
      // eg: #root
      return updateHostRoot(wip);
    case FunctionComponent:
      // eg: <App/>
      return updateFunctionComponent(wip);
    case HostComponent:
      // eg: <div/>
      return updateHostComponent(wip);
    case HostText:
      return null;

    default:
      if (__DEV__) {
        console.warn('unimplemented fiber tag');
      }
      break;
  }
  return null;
}
function updateHostRoot(wip: FiberNode) {
  const baseState = wip.memorizedState;
  // action might be a react component that consumes a state
  const updateQueue = wip.updateQueue as UpdateQueue<Element>;
  const pending = updateQueue.shared.pending;
  // when updateQueue recieve a react component, it will just return it as memorizedState
  updateQueue.shared.pending = null;
  // update state
  wip.memorizedState = processUpdateQueue(baseState, pending);

  const nextChildren = wip.memorizedState;
  reconcileChildren(wip, nextChildren);
  return wip.child;
}

function updateFunctionComponent(wip: FiberNode) {
  const children = renderWithHooks(wip);
  // might contains multiple children
  reconcileChildren(wip, children);
  return wip.child;
}

function updateHostComponent(wip: FiberNode) {
  const nextProps = wip.pendingProps;
  const nextChildren = nextProps.Children;
  reconcileChildren(wip, nextChildren);
  return wip;
}

// 🤔: how to determine whether is the first time to render
function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
  const current = wip.alternate;
  if (current === null) {
    wip.child = mountChildFibers(wip, null, children);
  } else {
    wip.child = reconcileChildFibers(wip, current.child, children);
  }
}
