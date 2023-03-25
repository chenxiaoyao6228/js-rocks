import { REACT_ELEMENT_TYPE } from './../../shared/ReactSymbol';
import { HostText } from './workTag';
import { ReactElementType } from '../../shared/ReactTypes';
import { FiberNode, createFiberFromElement } from './fiber';
import { Placement } from './fiberFlag';

/**
 * return the next child fiber or null
 * @param {boolean} flag
 * @return {FiberNode}
 */
function ChildReconciler(shouldTrackEffects: boolean) {
  function reconcileSingleElement(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild?: ReactElementType
  ) {
    // createFiberNode
    const fiber = createFiberFromElement(newChild);
    fiber.return = returnFiber;
    return fiber;
  }

  function reconcileSingleTextNode(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild?: ReactElementType
  ) {
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
