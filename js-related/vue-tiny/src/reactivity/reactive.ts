import { mutableHandlers, readonlyHandlers } from "./baseHandler";

export default function reactive(raw: Record<any, any>) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(target: Record<any, any>) {
  return createActiveObject(target, readonlyHandlers);
}

function createActiveObject(raw: any, baseHandler: any) {
  return new Proxy(raw, baseHandler);
}
