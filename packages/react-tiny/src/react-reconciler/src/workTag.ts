export type WorkTag =
  | typeof FunctionComponent
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText;

// Note: React may run in different host environments
export const FunctionComponent = 'FunctionComponent';
// rootNode, eg: '#root'
export const HostRoot = 'HostRoot';
// <div>
export const HostComponent = 'HostComponent';
// textNode
export const HostText = 'HostText';
