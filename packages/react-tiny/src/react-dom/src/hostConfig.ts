export type Container = any;
export type Instance = any;

export const createInstance = (type: string, props: any): Instance => {
  const element = document.createElement(type);
  // TODO: update props
  return element;
};

export const createTextInstance = (content: string, props: any): Instance => {
  return document.createTextNode(content);
};

export const appendChildToContainer = (child: Instance, container: Container) => {
  container.appendChild(child);
};

export const appendInitialChild = (parent: Instance, child: Instance) => {
  parent.appendChild(child);
};
