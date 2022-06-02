import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from './baseHandler';
import { isObject } from '@js-rocks/lodash-tiny';

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export function reactive (raw: Record<any, any>) {
  return createActiveObject(raw, mutableHandlers);
}

export function isReactive (obj) {
  // 需要触发proxy的getter
  return !!obj[ReactiveFlags.IS_REACTIVE];
}

export const isProxy = obj => {
  return isReactive(obj) || isReadonly(obj);
};

// props are immutable and can be wrap with this api
export function shallowReadonly (raw: Record<any, any>) {
  return createActiveObject(raw, shallowReadonlyHandlers);
}

export function readonly (raw: Record<any, any>) {
  return createActiveObject(raw, readonlyHandlers);
}

export function isReadonly (obj) {
  return !!obj[ReactiveFlags.IS_READONLY];
}

function createActiveObject (raw: any, baseHandler: any) {
  if (!isObject(raw)) {
    console.warn(`${raw} must be an object`);
    return raw;
  }
  return new Proxy(raw, baseHandler);
}
