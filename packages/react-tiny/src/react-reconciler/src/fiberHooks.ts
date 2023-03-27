import { createUpdate, createUpdateQueue, UpdateQueue, enqueueUpdate } from './updateQueue';
import { FiberNode } from './fiber';
import internals from '../../shared/internals';
import { Dispatch, Dispatcher } from '../../react/src/currentDispatcher';
import { Action } from '../../shared/ReactTypes';
import { scheduleUpdateOnFiber } from './workLoop';

let currentlyRenderingFiber: FiberNode | null = null;
let workInProgressHook: Hook | null = null;

const { currentDispatcher } = internals;

interface Hook {
  memorizedState: any;
  updateQueue: any;
  next: Hook | null; // linkedList structure
}

// execute function component and relative hooks
export function renderWithHooks(wip: FiberNode) {
  // assignment
  currentlyRenderingFiber = wip;

  // reset
  wip.memorizedState = null;

  const current = wip.alternate;
  if (current) {
    // udpate
  } else {
    // mount
    currentDispatcher.current = HookDispacherOnMount;
  }

  const Component = wip.type;
  const props = wip.pendingProps;
  const children = Component(props);

  // reset
  currentlyRenderingFiber = null;
  return children;
}

const HookDispacherOnMount: Dispatcher = {
  useState: mountState,
};

function mountState<State>(initialState: State | Action<State>): [State, Dispatch<State>] {
  const hook = mountWorkInProgressHook();

  let memorizedState = null;
  if (initialState instanceof Function) {
    memorizedState = initialState();
  } else {
    memorizedState = initialState;
  }

  const queue = createUpdateQueue();
  hook.updateQueue = queue;

  const dispatch = dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    hook.updateQueue,
    initialState
  );

  return [memorizedState, dispatch];
}

function dispatchSetState<State>(
  fiber: FiberNode,
  updateQueue: UpdateQueue<State>,
  action: Action<State>
) {
  const update = createUpdate(action);
  enqueueUpdate(updateQueue, update);
  scheduleUpdateOnFiber(fiber);

  // compare with root render()
  //   const update = createUpdate<ReactElementType | null>(element);
  // enqueueUpdate(hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>, update);
  // scheduleUpdateOnFiber(hostRootFiber);
}

function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memorizedState: null,
    updateQueue: null,
    next: null,
  };
  // the first hooks on mount, create a linkedList node
  if (workInProgressHook === null) {
    if (currentlyRenderingFiber === null) {
      throw new Error('please call hook in function component');
    } else {
      workInProgressHook = hook;
      currentlyRenderingFiber.memorizedState = workInProgressHook;
    }
  } else {
    // the rest hook on mount, form a linkList
    workInProgressHook.next = hook;
    workInProgressHook = hook;
  }
  return workInProgressHook;
}
