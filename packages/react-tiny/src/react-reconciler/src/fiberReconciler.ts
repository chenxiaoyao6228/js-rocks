import { createUpdateQueue, createUpdate, enqueueUpdate, UpdateQueue } from './updateQueue';
import { HostRoot } from './workTag';
import { FiberNode, FiberRootNode } from './fiber';
import { Container } from '../../react-dom/src/hostConfig';
import { scheduleUpdateOnFiber } from './workLoop';
import { ReactElementType } from '../../shared/ReactTypes';

//🔺ReactDOM.createRoot(document.querySelector('#root')).render(<App/>)

/*               current                  child
 * fiberRootNode --------> hostRootFiber -------> <App/>
                 <-------                <-------
                 stateNode                 return
 */

// create FiberRoot
export function createContainer(container: Container) {
  const hostRootFiber = new FiberNode(HostRoot, {}, null);
  const fiberRoot = new FiberRootNode(container, hostRootFiber);
  hostRootFiber.updateQueue = createUpdateQueue();

  return {
    render(element: ReactElementType) {
      updateContainer(element, fiberRoot);
    },
  };
}

// ReactDOM.render, setState
export function updateContainer(element: ReactElementType | null, fiberRoot: FiberRootNode) {
  const hostRootFiber = fiberRoot.current;
  const update = createUpdate<ReactElementType | null>(element);

  enqueueUpdate(hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>, update);

  scheduleUpdateOnFiber(hostRootFiber);

  return hostRootFiber;
}
