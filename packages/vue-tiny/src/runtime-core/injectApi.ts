/*
 * the basic idea behind is the same as the prototype chain lookup procedure
 */
import { getCurrentInstance } from './component';
import { ComponentInstance } from '../../typings/index';
// set
export function provide (key: string, value: any) {
  const currentInstance = getCurrentInstance() as ComponentInstance;
  currentInstance.provides[key] = value;
}

// lookup
export function inject (key: string) {
  const currentInstance = getCurrentInstance() as ComponentInstance;

  const parentProvides = currentInstance.parent.provides;

  return parentProvides[key];
}
