export const EMPTY_OBJ = {};

export const hasChange = (val: Object, newValue: Object) => {
  return !Object.is(val, newValue);
};

export function hasOwn (obj: Object, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
