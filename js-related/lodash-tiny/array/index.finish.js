import { isFunction } from '../types/index'
function contains(target, item) {
  return target.indexOf(item) > -1
}

function removeAt(target, index) {
  // !!将一个对象转化为布尔值
  return !!target.splice(index, 1).length
}

function remove(target, item) {
  let index = target.indexOf(item)
  if (~index) {
    return removeAt(target, index)
  }
  return false
}

// 数组拍平
function flatten(target) {
  let result = []
  target.forEach(function(item) {
    if (Array.isArray(item)) {
      result = result.concat(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// 数组去重
function unique(target) {
  // 法1: 数组->集合->数组
  // return Array.from(new Set(target))

  // 法2: 使用一个对象来保存出现过的元素, 不支持元素为对象, 除非用Symbol和Map
  let result = []
  let hasShown = Object.create(null)
  target.forEach(function(item) {
    if (!hasShown[item]) {
      hasShown[item] = true
      result.push(item)
    }
  })
  return result
}

// 去除数组中的undefined和null, 不影响原来的数组
function compact(target) {
  return target.filter(function(item) {
    return item != null
  })
}

function pluck(target, key) {
  let result = []
  target.forEach(function(item) {
    if (Object.hasOwnProperty.call(item, key)) {
      result.push(item[key])
    }
  })
  return result
}

function minOrMax(target, predicate, comparator) {
  let result = target[0]
  let defaultPredicate = function(item) {
    return item
  }
  predicate = predicate || defaultPredicate

  target.forEach(function(item) {
    if (comparator(predicate(item), predicate(result))) {
      result = item
    }
  })
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
  let result = {}

  let iterator = isFunction(val)
    ? val
    : function(obj) {
        return obj[val]
      }
  target.forEach(function(value, index) {
    let key = iterator(value, index)
    ;(result[key] || (result[key] = [])).push(value)
  })

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
  let result = target.slice()
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (result[i] === array[j]) {
        result.splice(i, 1)
        i--
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

export {
  contains,
  removeAt,
  remove,
  flatten,
  unique,
  compact,
  pluck,
  max,
  min,
  groupBy,
  sortBy,
  union,
  intersect,
  diff
}
