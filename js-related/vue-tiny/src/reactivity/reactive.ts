import { mutableHandlers, readonlyHandlers } from "./baseHandler";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}

export default function reactive(raw: Record<any, any>) {
  return createActiveObject(raw, mutableHandlers);
}

export function isReactive(obj) {
  // 需要触发proxy的getter
  return !!obj[ReactiveFlags.IS_REACTIVE];
}

export function readonly(target: Record<any, any>) {
  return createActiveObject(target, readonlyHandlers);
}

function createActiveObject(raw: any, baseHandler: any) {
  return new Proxy(raw, baseHandler);
}
