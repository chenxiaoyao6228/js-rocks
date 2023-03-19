import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workingProgress: FiberNode | null = null;
const current: FiberNode | null = null;

function perpareFreshStack(fiber: FiberNode) {
  workingProgress = fiber;
}

function renderRoot(root: FiberNode) {
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
}

function workLoop() {
  while (workingProgress !== null) {
    performUnitOfWork(workingProgress);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);
  // update props
  fiber.memerizedProps = fiber.pendingProps;

  if (next === null) {
    // have reached the leaf node and should go back
    compileUnitOfWork(fiber);
  } else {
    workingProgress = next;
  }
}

function compileUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;
  do {
    completeWork(node);
    const sibling = node.sibling;
    if (sibling !== null) {
      workingProgress = sibling;
      return;
    }
    node = node.return;
    workingProgress = node;
  } while (node !== null);
}
