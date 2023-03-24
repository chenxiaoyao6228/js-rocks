import { MutationMask, NoFlags } from './fiberFlag';
import { HostRoot } from './workTag';
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { commitMutationEffect } from './commitWork';

let workingProgress: FiberNode | null = null;
const current: FiberNode | null = null;

function perpareFreshStack(root: FiberRootNode) {
  workingProgress = createWorkInProgress(root.current, {});
}

// link workLoop and updateQueue
export function scheduleUpdateOnFiber(fiber: FiberNode) {
  const fiberRoot = markUpdateFromFiberToRoot(fiber);
  renderRoot(fiberRoot);
}

function markUpdateFromFiberToRoot(fiber: FiberNode): FiberRootNode | null {
  let node = fiber;
  while (node.return) {
    node = node.return;
  }
  if (node.tag === HostRoot) {
    // hostRootFiber.stateNode ---> fiberRootNode
    return node.stateNode;
  }
  return null;
}

function renderRoot(root: FiberRootNode) {
  // initialization
  perpareFreshStack(root);
  // start workLoop
  do {
    try {
      workLoop();
      break;
    } catch (error) {
      console.warn('reconciler error', error);
      workingProgress = null;
    }
    // eslint-disable-next-line no-constant-condition
  } while (true);

  const finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;

  // execute commit based on all child flags
  commitRoot(root);
}

function workLoop() {
  while (workingProgress !== null) {
    performUnitOfWork(workingProgress);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);
  // update props
  fiber.memoizedProps = fiber.pendingProps;

  if (next === null) {
    // have reached the leaf node and should go back
    compileUnitOfWork(fiber);
  } else {
    workingProgress = next;
  }
}

// find unit
function compileUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;
  console.log('node', node);
  do {
    // handle node
    completeWork(node);

    // handle sibling
    // 🤔: when to generate the sibling node
    const sibling = node.sibling;
    if (sibling !== null) {
      workingProgress = sibling;
      return;
    }
    // handleParent
    node = node.return;
    workingProgress = node;
  } while (node !== null);
}

function commitRoot(root: FiberRootNode) {
  const finishedWork = root.finishedWork;

  if (finishedWork == null) {
    return;
  }

  if (__DEV__) {
    console.log('start the commit process');
  }

  root.finishedWork = null;

  // check subTree effects and execute
  const subTreeHasEffect = (finishedWork.subtreeFlags & MutationMask) !== NoFlags;
  const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;
  if (subTreeHasEffect || rootHasEffect) {
    // before mutation
    // mutation
    root.current = finishedWork;
    commitMutationEffect(finishedWork);
    // layout
  } else {
    root.current = finishedWork;
  }
}
