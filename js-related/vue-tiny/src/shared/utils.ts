export function isObject(obj: Record<string, any>) {
  return obj != null && typeof obj === "object";
}
