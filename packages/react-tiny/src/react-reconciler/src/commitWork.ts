import { Container, appendChildToContainer } from './../../react-dom/src/hostConfig';
import { HostComponent, HostRoot, HostText } from './workTag';
import { MutationMask, NoFlags, Placement } from './fiberFlag';
import { FiberNode, FiberRootNode } from './fiber';

let nextEffect: FiberNode | null = null;

export const commitMutationEffect = (finishedWork: FiberNode) => {
  nextEffect = finishedWork;

  while (nextEffect !== null) {
    // DFS to find the exact child that contains effect
    const child: FiberNode | null = nextEffect.child;

    if ((nextEffect.subtreeFlags & MutationMask) !== NoFlags && child !== null) {
      nextEffect = child;
    } else {
      up: while (nextEffect !== null) {
        commitMutationEffectOnFiber(nextEffect);
        const sibling: FiberNode | null = nextEffect.sibling;

        if (sibling !== null) {
          nextEffect = sibling;
          break up;
        }
        nextEffect = nextEffect.return;
      }
    }
  }
};

// Handle the exact node that has effect
const commitMutationEffectOnFiber = (finishedWork: FiberNode) => {
  const flags = finishedWork.flags;
  // Placement
  if ((flags & Placement) !== NoFlags) {
    completePlacement(finishedWork);
  }

  // Update

  // ChildDeletion
};

const completePlacement = (finishedWork: FiberNode) => {
  if (__DEV__) {
    console.warn('completePlacement', finishedWork);
  }
  // parent DOM
  const hostParent = getHostParent(finishedWork);
  // finisedWork
  appentPlacementNodeIntoContainer(finishedWork, hostParent);
};

const getHostParent = (fiber: FiberNode) => {
  let parent = fiber.return;
  while (parent) {
    const parentTag = parent.tag;

    if (parentTag === HostComponent) {
      return parent.stateNode as Container;
    }
    if (parentTag === HostRoot) {
      return (parent.stateNode as FiberRootNode).container;
    }
    parent = parent.return;
  }
  if (__DEV__) {
    console.warn('cannot find host parent');
  }
};

const appentPlacementNodeIntoContainer = (finishedWork: FiberNode, hostParent: Container) => {
  if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
    appendChildToContainer(finishedWork.stateNode, hostParent);
    return;
  }
  const child = finishedWork.child;
  if (child !== null) {
    appentPlacementNodeIntoContainer(child, hostParent);
    let sibling = child.sibling;
    while (sibling !== null) {
      appentPlacementNodeIntoContainer(sibling, hostParent);
      sibling = sibling.sibling;
    }
  }
};
