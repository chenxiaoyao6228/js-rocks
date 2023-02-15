export function isObject(obj: Record<string, any>) {
  return obj != null && typeof obj === "object";
}

export const hasChange = (val, newValue) => {
  return !Object.is(val, newValue);
};
