/*
 * the basic idea behind is the same as the prototype chain lookup procedure
 */
import { getCurrentInstance } from './component';
import { ComponentInstance } from '../../typings/index';
// set
export function provide(key: string, value: any) {
  const currentInstance = getCurrentInstance() as ComponentInstance;
  if (currentInstance) {
    let { provides } = currentInstance;

    const parentProvides = currentInstance.parent.provides;
    //  utilize prototyp chain lookup

    if (provides === currentInstance.parent.provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }

    provides[key] = value;
  }
}

// lookup
export function inject(key: string, defaultValue: any) {
  const currentInstance = getCurrentInstance() as ComponentInstance;
  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides;
    return parentProvides[key] || defaultValue;
  }
}
