/**
 * 类型判断函数
 * JS中原生的数据判断typeof和instanceOf非常不靠谱
 * 基础数据类型: String, Number, Null, Undefined, NaN, Boolean, Symbol
 * 符合数据类型: Function,Object, Array(ArrayLike), Regex, Error, Date
 * 此外,还要考虑宿主对象Window等不在ECMA规范内的东西
 */

// 基础判断
function isNaN (obj) {
  return obj !== obj;
}
function isUndefined (obj) {
  return obj === void 0;
}

function isNull (obj) {
  return obj === null;
}

function isString (obj) {
  return typeof obj === 'string';
}

function isNumber (obj) {
  return typeof obj === 'number' && !isNaN(obj); // typeof NaN === 'number'
}

function isBoolean (obj) {
  return typeof obj === 'boolean';
}

function isSymbol (obj) {
  return typeof obj === 'symbol';
}

// 复合数据, 可以用Object.prototype.toString处理
function isFunction (obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}
function isDate (obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}
function isRegExp (obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}
function isError (obj) {
  return Object.prototype.toString.call(obj) === '[object Error]';
}

/*----------------*/
// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject (obj) {
  return obj === Object(obj); // 排除null
}

// function isObject(val) {
//   if (val === null) { return false;}
//   return ( (typeof val === 'function') || (typeof val === 'object') );
// }

/**
 * 判断是否为纯净的JavaScript对象,非Date等,非BOM,DOM,也不是用户自定义的"类"生成的对象
 * 最初用于深拷贝
 *
 * @param {*} obj
 */
function isPlainObject (obj) {
  if (obj === null) return false;
  if (!(typeof obj === 'object')) {
    return false;
  }
  if (Object.getPrototypeOf(obj) === null) return true; // 处理Object.create(null)
  return Object.getPrototypeOf(obj) === Object.prototype;
}

function isArray (obj) {
  return isObject(obj) && typeof obj.sort === 'function'; //Douglas Crockford
}

/**
 * 类数组
 * - 数组
 * - dom collections
 *
 * @param {*} obj
 * @return {*}
 */
function isArrayLike (obj) {
  if (isWindow(obj) || isFunction(obj)) {
    return false;
  }
  return isObject(obj) && obj.length >= 0;
}

function isWindow (obj) {
  return isObject(obj) && obj === obj.window;
}

function isBlob (object) {
  return object.toString() === '[object Blob]';
}
function isFile (object) {
  return object.toString() === '[object File]';
}
function isFormData (object) {
  return object.toString() === '[object FormData]';
}

function isJsonLike (data) {
  if (data.match(/^\{(?!\{)/)) {
    return data.match(/\}$/);
  } else if (data.match(/^\[/)) {
    return data.match(/\]$/);
  }
}

export {
  isNaN,
  isUndefined,
  isNull,
  isBoolean,
  isString,
  isNumber,
  isSymbol,
  isFunction,
  isDate,
  isRegExp,
  isError,
  isArray,
  isObject,
  isPlainObject,
  isArrayLike,
  isWindow,
  isBlob,
  isFile,
  isFormData,
  isJsonLike
};
