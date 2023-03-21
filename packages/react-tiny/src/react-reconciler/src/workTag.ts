export type WorkTag =
  | typeof FunctionComponent
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText;

// Note: React may run in different host environments
export const FunctionComponent = 0;
// rootNode, eg: '#root'
export const HostRoot = 3;
// <div>
export const HostComponent = 5;
// textNode
export const HostText = 6;
