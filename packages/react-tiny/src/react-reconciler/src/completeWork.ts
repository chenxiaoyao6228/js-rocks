import { Flags, NoFlags } from './fiberFlag';
import {
  appendChildToContainer,
  appendInitialChild,
  createTextInstance,
  Instance,
} from './../../react-dom/src/hostConfig';
import { createInstance } from '../../react-dom/src/hostConfig';
import { FiberNode } from './fiber';
import { FunctionComponent, HostComponent, HostRoot, HostText } from './workTag';

/*
 * function of completeWork
 * create or update dom node
 *  - The first layer of the child nodes is inserted into the current node from the bottom up
 * collect dom attributes
 *  - collect effect list from bottom to top
 */
export function completeWork(wip: FiberNode) {
  const newProps = wip.pendingProps;
  const current = wip.alternate;

  switch (wip.tag) {
    case HostRoot:
      bubbleProperties(wip);

      break;
    case HostComponent:
      if (current !== null && wip.stateNode !== null) {
        // update
      } else {
        // create element with host api
        const instance = createInstance(wip.type, newProps);

        // append the first layer of the child node
        appendAllChildren(instance, wip);

        wip.stateNode = instance;
      }
      bubbleProperties(wip);
      break;
    case HostText:
      if (current !== null && wip.stateNode !== null) {
        // update
      } else {
        // mount
        const instance = createTextInstance(wip.type, newProps);
        wip.stateNode = instance;
      }
      bubbleProperties(wip);

      break;
    case FunctionComponent:
      break;
    default:
      if (__DEV__) {
        console.log('unhandle completeWork wip.type', wip.type);
      }
      break;
  }
}

function appendAllChildren(parent: Instance, wip: FiberNode) {
  // traverse all child element in the dom tree

  // append firstChild
  let node = wip.child;
  while (node !== null) {
    if (node.tag === HostComponent || node.tag === HostText) {
      appendInitialChild(parent, node?.stateNode);
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === wip) {
      return;
    }

    // append sibling
    while (node.sibling === null) {
      if (node.return === null || node.return === wip) {
        return;
      }
      node = node?.sibling;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

// record child effect and pass it to parent
// so we can fast determine whether one the commit process
function bubbleProperties(wip) {
  let subTreeFlags = NoFlags;
  let child = wip.child;

  while (child !== null) {
    subTreeFlags |= child.subTreeFlags;
    subTreeFlags |= child.flags;

    child.return = wip;
    child = child.sibling;
  }
  wip.subTreeFlags |= subTreeFlags;
}
