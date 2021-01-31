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

export { contains, removeAt, remove, flatten, unique, compact, pluck, max, min }
