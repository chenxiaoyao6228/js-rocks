import { REACT_ELEMENT_TYPE } from './../../shared/ReactSymbol';
import { HostText } from './workTag';
import { Props, ReactElementType } from '../../shared/ReactTypes';
import { FiberNode, createFiberFromElement, createWorkInProgress } from './fiber';
import { ChildDeletion, Placement } from './fiberFlag';

/**
 * return the next child fiber or null
 * @param {boolean} flag
 * @return {FiberNode}
 */
function ChildReconciler(shouldTrackEffects: boolean) {
  function deleteChild(returnFiber: FiberNode, childToDelete: FiberNode) {
    if (!shouldTrackEffects) {
      return;
    }
    const deletions = returnFiber.deletions;
    if (deletions === null) {
      returnFiber.deletions = [childToDelete];
      returnFiber.flags |= ChildDeletion;
    } else {
      deletions.push(childToDelete);
    }
  }
  function reconcileSingleElement(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild?: ReactElementType
  ) {
    const key = newChild.key;
    work: if (currentFiber !== null) {
      // update process
      if (currentFiber.key === key) {
        // key equal
        if (newChild.$$typeof === REACT_ELEMENT_TYPE) {
          if (currentFiber.type === newChild.type) {
            // type equal
            const existing = useFiber(currentFiber, newChild.props);
            existing.return = returnFiber;
            return existing;
          }
          // delete old fiber
          deleteChild(returnFiber, currentFiber);
          break work;
        } else {
          if (__DEV__) {
            console.warn('reconcileSingleElement: unimplemented reconciler type: ');
            break work;
          }
        }
      } else {
        // delete old fiber
        deleteChild(returnFiber, currentFiber);
      }
    }
    // createFiberNode
    const fiber = createFiberFromElement(newChild);
    fiber.return = returnFiber;
    return fiber;
  }

  function useFiber(fiber: FiberNode, pendingProps: Props): FiberNode {
    const clone = createWorkInProgress(fiber, pendingProps);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function reconcileSingleTextNode(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild?: ReactElementType
  ) {
    if (currentFiber !== null) {
      // update
      if (currentFiber.tag === HostText) {
        const existing = useFiber(currentFiber, { content: newChild });
        existing.return = returnFiber;
        return existing;
      }
      deleteChild(returnFiber, currentFiber);
    }
    const fiber = new FiberNode(HostText, { content: newChild }, null);
    fiber.return = returnFiber;
    return fiber;
  }

  // use bit operation to mark side effect
  function placeSingleChild(fiber: FiberNode) {
    if (shouldTrackEffects && fiber.alternate === null) {
      fiber.flags = fiber.flags | Placement;
    }
    return fiber;
  }

  return function reconcileChildFibers(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild?: ReactElementType
  ) {
    // check newChildType
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFiber, newChild));

        default:
          if (__DEV__) {
            console.warn('reconcileChildFibers: unimplemented reconciler type: ');
          }
          break;
      }
    }
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFiber, newChild));
    }
    return null;
  };
}

export const mountChildFibers = ChildReconciler(false);
export const reconcileChildFibers = ChildReconciler(true);
