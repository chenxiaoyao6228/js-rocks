import {
  Container,
  appendChildToContainer,
  commitUpdate,
  removeChild,
} from './../../react-dom/src/hostConfig';
import { FunctionComponent, HostComponent, HostRoot, HostText } from './workTag';
import { ChildDeletion, MutationMask, NoFlags, Placement, Update } from './fiberFlag';
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
    finishedWork.flags &= ~Placement;
  }

  // Update
  if ((flags & Update) !== NoFlags) {
    commitUpdate(finishedWork);
    finishedWork.flags &= ~Update;
  }

  // ChildDeletion
  if ((flags & ChildDeletion) !== NoFlags) {
    const deletions = finishedWork.deletions;
    if (deletions !== null) {
      deletions.forEach(childToDelete => {
        commitDeletion(childToDelete);
      });
    }
    finishedWork.flags &= ~ChildDeletion;
  }
};

const commitDeletion = (childToDelete: FiberNode) => {
  let rootHostNode: FiberNode | null = null;

  // find childNode recursively
  commitNestedComponent(childToDelete, unmountFiber => {
    switch (unmountFiber.tag) {
      case HostComponent:
        // TODO: unbind ref
        if (rootHostNode === null) {
          rootHostNode = unmountFiber;
        }
        return;
      case HostText:
        if (rootHostNode === null) {
          rootHostNode = unmountFiber;
        }
        return;
      case FunctionComponent:
        // TODO: useEffect unmount
        break;
      default:
        if (__DEV__) {
          console.warn('unhandle unmountFiber.tag', unmountFiber.tag);
        }
        break;
    }
  });

  // remove hostComponentDom
  if (rootHostNode !== null) {
    const hostParent = getHostParent(rootHostNode);
    if (hostParent !== null) {
      removeChild(hostParent, rootHostNode.stateNode);
    }
  }
  childToDelete.return = null;
  childToDelete.child = null;
};

const commitNestedComponent = (root: FiberNode, onCommitUnmount: (fiber: FiberNode) => void) => {
  let node = root;
  while (true) {
    onCommitUnmount(node);
    if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === root) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === root) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
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
