import { ReactElementType } from './../../../dist/shared/ReactTypes.d';
import { Key, Props } from '../../shared/ReactTypes';
import { Flags, NoFlags } from './fiberFlag';
// TODO: use typescript alias to import hostConfig from other packages
import { Container } from '../../react-dom/src/hostConfig';
import { HostComponent, WorkTag, FunctionComponent, HostText } from './workTag';

export class FiberNode {
  tag: WorkTag;
  /*
   * get type from ReactElement
   * For FunctionalComponent, type is the function itself
   * For HostComponent, type is the element type, eg: 'div'
   */
  type: any;
  key: Key;
  ref: any;

  stateNode: any;

  // property that forms tree structure
  return: FiberNode | null;
  child: FiberNode | null;
  sibling: FiberNode | null;
  index: number;

  // props that before working unit
  pendingProps: Props | null;
  memoizedProps: Props | null;
  alternative: FiberNode | null;
  updateQueue: unknown;
  alternative: FiberNode | null;

  flags: Flags;
  subtreeFlags: Flags;
  memoizedState: any;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // instance
    this.tag = tag;
    this.type = null;
    this.key = key;
    this.ref = null;

    this.stateNode = null;

    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;

    this.alternative = null;

    // work unit
    this.pendingProps = pendingProps;
    // props that after working unit
    this.memoizedProps = null;
    this.updateQueue = null;
  }
}

export class FiberRootNode {
  container: Container;
  current: FiberNode | null;
  finishedWork: FiberNode | null;
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container;
    this.current = hostRootFiber;
    this.finishedWork = null;
    hostRootFiber.stateNode = this;
  }
}

// create wip from the current and reused some old properties
export const createWorkInProgress = (current: FiberNode, pendingProps: Props): FiberNode => {
  let wip = current.alternative;
  if (wip === null) {
    // mount
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.stateNode = current.stateNode;

    wip.alternative = current;
    current.alternative = wip;
  } else {
    // update
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
    wip.subtreeFlags = NoFlags;
  }
  wip.type = current.type;
  wip.updateQueue = current.updateQueue;
  wip.child = current.child;
  wip.memoizedProps = current.memoizedProps;
  wip.memoizedState = current.memoizedState;

  return wip;
};

// JSX type: Element, FunctionComponent, Fragment, Text, ...
export const createFiberFromElement = (element: ReactElementType) => {
  const { type, props, key } = element;
  let fiberType: WorkTag = FunctionComponent;

  if (typeof type === 'string') {
    fiberType = HostText;
  } else if (typeof type !== 'function' && __DEV__) {
    console.warn('createFiberFromElement: unknown type: ' + type);
  }
  const fiber = new FiberNode(fiberType, props, key);
  fiber.type = type;
  return fiber;
};
