const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isArray(val: any): val is Array<any> {
  return toString.call(val) === '[object Array]'
}

export function isString(val: any): val is string {
  return typeof val === 'string'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}