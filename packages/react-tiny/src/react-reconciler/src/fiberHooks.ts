import {
  createUpdate,
  createUpdateQueue,
  UpdateQueue,
  enqueueUpdate,
  processUpdateQueue,
} from './updateQueue';
import { FiberNode } from './fiber';
import internals from '../../shared/internals';
import { Dispatch, Dispatcher } from '../../react/src/currentDispatcher';
import { Action } from '../../shared/ReactTypes';
import { scheduleUpdateOnFiber } from './workLoop';

let currentlyRenderingFiber: FiberNode | null = null;
let workInProgressHook: Hook | null = null;
let currentHook: Hook | null = null;

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
    currentDispatcher.current = HookDispatcherOnUpdate;
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

const HookDispatcherOnUpdate: Dispatcher = {
  useState: updateState,
};

function updateState<State>(): [State, Dispatch<State>] {
  const hook = updateWorkInProgressHook();

  // calculate new state
  const queue = hook.updateQueue as UpdateQueue<State>;
  const pending = queue.shared.pending;

  if (pending !== null) {
    const memorizedState = processUpdateQueue(hook.memorizedState, pending);
    hook.memorizedState = memorizedState;
  }
  return [hook.memorizedState, queue.dispatch as Dispatch<State>];
}

function mountState<State>(initialState: State | Action<State>): [State, Dispatch<State>] {
  const hook = mountWorkInProgressHook();

  let memorizedState = null;
  if (initialState instanceof Function) {
    memorizedState = initialState();
  } else {
    memorizedState = initialState;
  }

  hook.memorizedState = memorizedState;

  const queue = createUpdateQueue();
  hook.updateQueue = queue;

  // @ts-expect-error TODO: fix this
  const dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, hook.updateQueue);

  queue.dispatch = dispatch;

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
function updateWorkInProgressHook(): Hook {
  let nextCurentHook: Hook | null = null;

  if (currentHook === null) {
    // the first hooks on update, create a linkedList node
    const current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurentHook = current?.memorizedState;
    } else {
      nextCurentHook = null;
    }
  } else {
    // the rest hook on update, form a linkList
    nextCurentHook = currentHook.next;
  }

  if (nextCurentHook === null) {
    throw new Error('please call hook in function component');
  }
  currentHook = nextCurentHook as Hook;
  const newHook: Hook = {
    memorizedState: currentHook.memorizedState,
    updateQueue: currentHook.updateQueue,
    next: null,
  };
  if (workInProgressHook === null) {
    workInProgressHook = newHook;
    currentlyRenderingFiber.memorizedState = workInProgressHook;
  } else {
    workInProgressHook.next = newHook;
    workInProgressHook = newHook;
  }
  return workInProgressHook;
}
