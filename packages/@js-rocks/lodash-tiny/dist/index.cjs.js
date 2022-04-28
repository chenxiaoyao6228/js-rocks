'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 类型判断函数
 * JS中原生的数据判断typeof和instanceOf非常不靠谱
 * 基础数据类型: String, Number, Null, Undefined, NaN, Boolean, Symbol
 * 符合数据类型: Function,Object, Array(ArrayLike), Regex, Error, Date
 * 此外,还要考虑宿主对象Window等不在ECMA规范内的东西
 */

// 基础判断
function isNaN(obj) {
  return obj !== obj
}
function isUndefined(obj) {
  return obj === void 0
}

function isNull(obj) {
  return obj === null
}

function isString(obj) {
  return typeof obj === 'string'
}

function isNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj) // typeof NaN === 'number'
}

function isBoolean(obj) {
  return typeof obj === 'boolean'
}

function isSymbol(obj) {
  return typeof obj === 'symbol'
}

// 复合数据, 可以用Object.prototype.toString处理
function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]'
}
function isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]'
}
function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]'
}
function isError(obj) {
  return Object.prototype.toString.call(obj) === '[object Error]'
}

/*----------------*/
// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(obj) {
  return obj === Object(obj) // 排除null
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
function isPlainObject(obj) {
  if (obj === null) return false
  if (!(typeof obj === 'object')) {
    return false
  }
  if (Object.getPrototypeOf(obj) === null) return true // 处理Object.create(null)
  return Object.getPrototypeOf(obj) === Object.prototype
}

function isArray(obj) {
  return isObject(obj) && typeof obj.sort === 'function' //Douglas Crockford
}

/**
 * 类数组
 * - 数组
 * - dom collections
 *
 * @param {*} obj
 * @return {*}
 */
function isArrayLike(obj) {
  if (isWindow(obj) || isFunction(obj)) {
    return false
  }
  return isObject(obj) && obj.length >= 0
}

function isWindow(obj) {
  return isObject(obj) && obj === obj.window
}

/**
 * 数组转树
 *
 * @param {*} input
 * @return {*}
 */
function arrayToTree(input) {
  let obj;
  for (let item of input) {
    if (!item.parentId) obj = item;
    const children = input.filter(it => it.parentId === item.id);
    item.children = children || [];
    delete item.parentId;
  }
  return obj
}

/**
 * 实现curriedAdd(1)(2)(3)()
 *
 * @param {*} args
 * @return {*}
 */
function add(...args) {
  //求和
  return args.reduce((a, b) => a + b)
}
function currying(fn, args = []) {
  return function temp(...innerArgs) {
    if (innerArgs.length > 0) {
      // 收集后面传入的参数
      args = [...args, ...innerArgs];
      // 返回函数供后面可以继续调用
      return temp
    } else {
      const val = fn.apply(this, args);
      // 清空参数数组，为了保证下次执行函数可以继续迭代
      args = [];
      return val
    }
  }
}
const curriedAdd = currying(add);

/**
 * 实现一个bind方法
 *
 * @export
 * @param {*} fn
 * @param {*} context
 * @return {*}
 */
// function myBind(fn, context) {
//   return function() {
//     return fn.apply(context, arguments)
//   }
// }

// export function myBind(fn, context) {
//   return function(...args) {
//     return fn.apply(context, args)
//   }
// }

/**
 * 实现call方法
 *
 * @param {*} context
 * @return {*}
 */
// function myCall(context) {
//   context[this.name] = this //通过函数的name属性可以拿到函数名
//   var args = []
//   for (var i = 1, len = arguments.length; i < len; i++) {
//     args.push('arguments[' + i + ']')
//   }
//   var result = eval('context[this.name](' + args + ')')
//   delete context[this.name]
//   return result
// }

/**
 * 实现apply方法
 *
 * @param {*} context
 * @param {*} arr
 * @return {*}
 */
// function myApply(context, arr) {
//   context[this.name] = this //通过函数的name属性可以拿到函数名
//   var args = []
//   for (var i = 0, len = arr.length; i < len; i++) {
//     args.push('arr[' + i + ']')
//   }
//   var result = eval('context[this.name](' + args + ')')
//   delete context[this.name]
//   return result
// }

/**
 * 实现一个get方法,获取对象中的属性,若无,返回undefined
 *
 * @param {*} object: 要查询的对象
 * @param {*} path: 查询路径
 */
function get(object, path, defaultValue) {
  let pathArr;
  if (typeof path === 'string') {
    path = path.replace(/\[(\d+)\]/g, '.$1');
    pathArr = path.split('.');
  } else {
    pathArr = path;
  }
  let p = pathArr.shift();
  let res = object[p];
  while (pathArr.length > 0) {
    let p = pathArr.shift();
    res = res === undefined ? Object(res)[p] : res[p];
  }
  if (res === undefined && defaultValue) {
    res = defaultValue;
  }
  return res
}

// 最简单的方法: JSON.stringify
// 常规: 递归
function deepClone(obj) {
  if (!isObject(obj) && !isArray(obj)) return
  let result = isArray(obj) ? [] : {};

  if (isObject(obj)) {
    for (let key in obj) {
      if (isObject(obj[key]) || isArray(obj[key])) {
        result[key] = deepClone(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  } else if (isArray(obj)) {
    let res = [];
    obj.forEach((item, index) => {
      if (isArray(item) || isObject(obj)) {
        res[index] = deepClone(item);
      } else {
        res[index] = item;
      }
    });
    return res
  }
  return result
}

function stringify(obj) {
  if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
    return value(obj)
  }

  return (
    '{' +
    Object.keys(obj)
      .map(function(k) {
        return typeof obj[k] === 'function'
          ? null
          : '"' + k + '":' + value(obj[k])
      })
      .filter(function(i) {
        return i
      }) +
    '}'
  )
  function value(val) {
    switch (typeof val) {
      case 'string':
        return '"' + val.replace(/\\/g, '\\\\').replace('"', '\\"') + '"'
      case 'number':
      case 'boolean':
        return '' + val
      case 'function':
        return 'null'
      case 'object':
        if (val instanceof Date) return '"' + val.toISOString() + '"'
        if (val instanceof Array) return '[' + val.map(value).join(',') + ']'
        if (val === null) return 'null'
        return stringify(val)
    }
  }
}

function removeAt(target, index) {
  // !!将一个对象转化为布尔值
  return !!target.splice(index, 1).length
}

function remove(target, item) {
  let index = target.indexOf(item);
  if (~index) {
    return removeAt(target, index)
  }
  return false
}

function flattenDeep(arr = [], res = []) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flattenDeep(item, []));
    } else {
      res.push(item);
    }
  });
  return res
}
// 数组去重
function unique(target) {
  // 法1: 数组->集合->数组
  // return Array.from(new Set(target))

  // 法2: 使用一个对象来保存出现过的元素, 不支持元素为对象, 除非用Symbol和Map
  let result = [];
  let hasShown = Object.create(null);
  target.forEach(function(item) {
    if (!hasShown[item]) {
      hasShown[item] = true;
      result.push(item);
    }
  });
  return result
}

// 去除数组中的undefined和null, 不影响原来的数组
function compact(target) {
  return target.filter(function(item) {
    return item != null
  })
}

function pluck(target, key) {
  let result = [];
  target.forEach(function(item) {
    if (Object.hasOwnProperty.call(item, key)) {
      result.push(item[key]);
    }
  });
  return result
}

function minOrMax(target, predicate, comparator) {
  let result = target[0];
  let defaultPredicate = function(item) {
    return item
  };
  predicate = predicate || defaultPredicate;

  target.forEach(function(item) {
    if (comparator(predicate(item), predicate(result))) {
      result = item;
    }
  });
  return result
}

function max(target, predicate) {
  return minOrMax(target, predicate, function(a, b) {
    return a > b
  })
}

function min(target, predicate) {
  return minOrMax(target, predicate, function(a, b) {
    return a < b
  })
}

function groupBy(target, val) {
  let result = {};

  let iterator = isFunction(val)
    ? val
    : function(obj) {
        return obj[val]
      };
  target.forEach(function(value, index) {
    let key = iterator(value, index)
    ;(result[key] || (result[key] = [])).push(value);
  });

  return result
}

// 取并集
function union(target, array) {
  return unique(target.concat(array))
}

// 取交集
function intersect(target, array) {
  return target.filter(function(n) {
    return ~array.indexOf(n)
  })
}

// 取补集
function diff(target, array) {
  let result = target.slice();
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (result[i] === array[j]) {
        result.splice(i, 1);
        i--;
        break
      }
    }
  }
  return result
}

// ⭐ 根据指定的条件进行排序, 常用于对象数组
function sortBy(target, key) {
  function by(key) {
    return function(a, b) {
      return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    }
  }
  return target.sort(by(key))
}

// https://stackoverflow.com/questions/43182667/why-does-javascript-new-dateyear-month-0-getdate-return-the-number-of-day
function getDaysInMonth(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return res
}

function isLeapYear(date) {
  // 二月有29天的为闰年
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), 2, 0).getDate() === 29;
  return res
}

function getFirstDateInQuarter(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);
  return res
}
function getLastDateInQuarter(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3 + 3, 0);
  return res
}

function getFirstDateInMonth(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), date.getMonth(), 1);
  return res
}
function getLastDateInMonth(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return res
}

function getPeriod(start, end) {
  start = convertToDate(start);
  end = convertToDate(end);
  return Math.abs(start * 1 - end * 1) / 60 / 60 / 1000 / 24
}

function convertToDate(date) {
  return isDate(date) ? date : new Date(date)
}

// v1
// export function pipe(...fns) {
//   return arg => {
//     let res = arg
//     fns.forEach(fn => {
//       res = fn.call(null, res)
//     })
//     return res
//   }
// }

/**
 * pipe函数
 *
 * @export
 * @param {*} fns
 * @return {*}
 */
function pipe(...fns) {
  return arg => {
    return fns.reduce((acc, fn) => fn(acc), arg)
  }
}

/**
 * partial
 *
 * @param {*} fn
 * @return {*}
 */
function partial(fn) {
  let partialArgs = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
  return function() {
    let args = partialArgs.concat([].slice.call(arguments));
    return fn.apply(fn, args)
  }
}

/**
 * partialRight
 *
 * @param {*} fn
 * @return {*}
 */
function partialRight(fn) {
  let partialArgs = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
  return function() {
    let args = [].slice.call(arguments).concat(partialArgs);
    return fn.apply(fn, args)
  }
}

// function repeat(target, n) {
//   return new Array(n + 1).join(target)
// }

/**
 * 重复字符串n次
 *
 * @param {*} target
 * @param {*} n
 * @return {*}
 */
function repeat(target, n) {
  var s = target,
    total = '';
  while (n > 0) {
    if (n % 2 === 1) {
      total += s;
    }
    if (n == 1) break
    s += s;
    n = n >> 1;
  }
  return total
}

/**
 * 用filling填补target, 长度不超过n
 *
 * @param {*} target
 * @param {*} n
 * @param {*} filling
 * @return {*}
 */
function padStart(target, n, filling) {
  if (target.length >= n) return target
  var res;
  filling = filling || ' ';
  var lenToFill = n - target.length;
  var textToFill = new Array(n).join(filling).substr(0, lenToFill);
  res = textToFill + target;
  return res
}

function padEnd(target, n, filling) {
  if (target.length >= n) return target
  var res;
  filling = filling || ' ';
  var lenToFill = n - target.length;
  var textToFill = new Array(n).join(filling).substr(0, lenToFill);
  res = target + textToFill;
  return res
}

/**
 * 字符串去空格
 *
 * @param {*} target
 * @return {*}
 */
function trimStart(target) {
  return target.replace(/^\s+/, '')
}
function trimEnd(target) {
  return target.replace(/\s+$/, '')
}
function trim(target) {
  return target.replace(/\s+(\w+)\s*/, '$1')
}

/**
 * 下划线处理
 *
 * @param {*} target
 * @return {*}
 */
function underscored(target) {
  return target
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/-/g, '_')
    .toLowerCase()
}

/**
 * 连字符
 *
 * @param {*} target
 * @return {*}
 */
function dasherize(target) {
  return target
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

/**
 * 首字母大写, 其余小写
 *
 * @param {*} target
 * @return {*}
 */
function capitalize(target) {
  return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()
}

/**
 * 驼峰式
 *
 * @param {*} target
 * @return {*}
 */
function camelize(target) {
  if (target.indexOf('_') < 0 && target.indexOf('_') < 0) {
    return target
  }
  return target.replace(/[-_][^-_]/g, function(match) {
    return match.charAt(1).toUpperCase()
  })
}

/**
 *   是否在头部包含子字符串
 *
 * @param {*} target
 * @param {*} search
 * @param {*} start
 * @return {*}
 */
function startsWith(target, search, start) {
  var pos = start > 0 ? start : 0;
  return (
    String.prototype.substring.call(target, pos, pos + search.length) === search
  )
}

/**
 *   是否在尾部包含子字符串
 *
 * @param {*} target
 * @param {*} search
 * @param {*} start
 * @return {*}
 */
function endsWith(target, search, len) {
  if (len === undefined || len > target.length) {
    len = target.length;
  }
  return (
    String.prototype.substring.call(target, len - search.length, len) === search
  )
}

exports.arrayToTree = arrayToTree;
exports.camelize = camelize;
exports.capitalize = capitalize;
exports.compact = compact;
exports.curriedAdd = curriedAdd;
exports.dasherize = dasherize;
exports.deepClone = deepClone;
exports.diff = diff;
exports.endsWith = endsWith;
exports.flattenDeep = flattenDeep;
exports.get = get;
exports.getDaysInMonth = getDaysInMonth;
exports.getFirstDateInMonth = getFirstDateInMonth;
exports.getFirstDateInQuarter = getFirstDateInQuarter;
exports.getLastDateInMonth = getLastDateInMonth;
exports.getLastDateInQuarter = getLastDateInQuarter;
exports.getPeriod = getPeriod;
exports.groupBy = groupBy;
exports.intersect = intersect;
exports.isArray = isArray;
exports.isArrayLike = isArrayLike;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isError = isError;
exports.isFunction = isFunction;
exports.isLeapYear = isLeapYear;
exports.isNaN = isNaN;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isRegExp = isRegExp;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.isUndefined = isUndefined;
exports.isWindow = isWindow;
exports.max = max;
exports.min = min;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.partial = partial;
exports.partialRight = partialRight;
exports.pipe = pipe;
exports.pluck = pluck;
exports.remove = remove;
exports.removeAt = removeAt;
exports.repeat = repeat;
exports.sortBy = sortBy;
exports.startsWith = startsWith;
exports.stringify = stringify;
exports.trim = trim;
exports.trimEnd = trimEnd;
exports.trimStart = trimStart;
exports.underscored = underscored;
exports.union = union;
exports.unique = unique;
