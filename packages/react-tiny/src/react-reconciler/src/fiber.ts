import { Key, Props } from '../../shared/ReactTypes';
import { Flags } from './fiberFlag';
import { WorkTag } from './workTag';

export class FiberNode {
  tag: WorkTag;
  /*
   * get type from ReactElement
   * For FunctionalComponent, type is the function itself
   * For HostComponent, type is the element type, eg: 'div'
   */
  type: any;
  key: Key;
  ref: any;

  stateNode: any;

  // property that forms tree structure
  return: FiberNode | null;
  child: FiberNode | null;
  sibling: FiberNode | null;
  index: number;

  // props that before working unit
  pendingProps: Props | null;
  memerizedProps: Props | null;
  alternate: FiberNode | null;

  flag: Flags;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // instance
    this.tag = tag;
    this.type = null;
    this.key = key;
    this.ref = null;

    this.stateNode = null;

    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;

    // work unit
    this.pendingProps = pendingProps;
    // props that after working unit
    this.memerizedProps = null;
  }
}
