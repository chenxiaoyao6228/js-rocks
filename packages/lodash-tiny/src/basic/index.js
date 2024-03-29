import { isArray, isObject } from '../types';
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
  return obj;
}

/**
 * 实现curriedAdd(1)(2)(3)()
 *
 * @param {*} args
 * @return {*}
 */
function add(...args) {
  //求和
  return args.reduce((a, b) => a + b);
}
function currying(fn, args = []) {
  return function temp(...innerArgs) {
    if (innerArgs.length > 0) {
      // 收集后面传入的参数
      args = [...args, ...innerArgs];
      // 返回函数供后面可以继续调用
      return temp;
    } else {
      const val = fn.apply(this, args);
      // 清空参数数组，为了保证下次执行函数可以继续迭代
      args = [];
      return val;
    }
  };
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
  return res;
}

// 最简单的方法: JSON.stringify
// 常规: 递归
function deepClone(obj) {
  if (!isObject(obj) && !isArray(obj)) return;
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
    return res;
  }
  return result;
}

function stringify(obj) {
  if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
    return value(obj);
  }

  return (
    '{' +
    Object.keys(obj)
      .map(function (k) {
        return typeof obj[k] === 'function' ? null : '"' + k + '":' + value(obj[k]);
      })
      .filter(function (i) {
        return i;
      }) +
    '}'
  );
  function value(val) {
    switch (typeof val) {
      case 'string':
        return '"' + val.replace(/\\/g, '\\\\').replace('"', '\\"') + '"';
      case 'number':
      case 'boolean':
        return '' + val;
      case 'function':
        return 'null';
      case 'object':
        if (val instanceof Date) return '"' + val.toISOString() + '"';
        if (val instanceof Array) return '[' + val.map(value).join(',') + ']';
        if (val === null) return 'null';
        return stringify(val);
    }
  }
}

export {
  // myBind,
  // myApply,
  // myCall,
  arrayToTree,
  curriedAdd,
  get,
  deepClone,
  stringify,
};
