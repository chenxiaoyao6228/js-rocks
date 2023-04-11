import { FiberNode } from '../../react-reconciler/src/fiber';
import { HostText } from '../../react-reconciler/src/workTag';

export type Container = any;
export type Instance = any;
export type TextInstance = any;

export const createInstance = (type: string, props: any): Instance => {
  const element = document.createElement(type);
  // TODO: update props
  return element;
};

export const createTextInstance = (content: string): Instance => {
  return document.createTextNode(content);
};

export const appendChildToContainer = (child: Instance, container: Container) => {
  container.appendChild(child);
};

export const appendInitialChild = (parent: Instance, child: Instance) => {
  parent.appendChild(child);
};

export const commitUpdate = (fiber: FiberNode) => {
  switch (fiber.tag) {
    case HostText: {
      const text = fiber.memoizedProps.content;
      return commitTextUpdate(fiber.stateNode, text);
    }

    default:
      if (__DEV__) {
        console.warn('unimplemented commitUpdate');
      }
      break;
  }
};

export const commitTextUpdate = (textInstance: TextInstance, content: string) => {
  textInstance.textContent = content;
};

export const removeChild = (child: Instance | TextInstance, container: Container) => {
  container.removeChild(child);
};
