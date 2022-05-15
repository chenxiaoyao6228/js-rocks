export function isObject (obj: Record<string, any>) {
  return obj != null && typeof obj === 'object';
}

export function capitalize (str: string) {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

export const hasChange = (val: Object, newValue: Object) => {
  return !Object.is(val, newValue);
};

export function hasOwn (obj: Object, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
