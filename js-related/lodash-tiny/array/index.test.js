import {
  contains,
  removeAt,
  remove,
  flatten,
  unique,
  compact,
  pluck,
  max,
  min
} from './index.finish'
describe('array related methods', () => {
  test('contains', () => {
    let target = [0, 1, 2]
    expect(contains(target, 2)).toEqual(true)
    expect(contains(target, 3)).toEqual(false)
  })
  test('removeAt', () => {
    let target = [0, 1, 2]
    let result = removeAt(target, 1)
    expect(result).toEqual(true)
    expect(target).toEqual([0, 2])
  })
  test('remove', () => {
    let target = [10, 20, 30]
    let result = remove(target, 20)
    expect(result).toEqual(true)
    expect(target).toEqual([10, 30])
  })
  test('flatten', () => {
    let target = [1, [2, [3, [4]], 5]]
    let result = flatten(target)
    expect(target).toEqual([1, [2, [3, [4]], 5]])
    expect(result).toEqual([1, 2, [3, [4]], 5])
  })
  // 数组去重
  test('unique', () => {
    let target = [0, 1, 1, 2, 2, 3, 4]
    expect(unique(target)).toEqual([0, 1, 2, 3, 4])
  })
  // 去除数组中的undefined和null, 不影响原来的数组
  test('compact', () => {
    let target = [0, 1, false, 2, undefined, 3, 4, null]
    let result = compact(target)
    expect(result).toEqual([0, 1, false, 2, 3, 4])
    expect(target).toEqual([0, 1, false, 2, undefined, 3, 4, null])
  })

  test('pluck', () => {
    var target = [
      { name: 'moe', age: 40 },
      { name: 'larry', age: 50 },
      { name: 'curly', age: 60 },
      { age: 70 }
    ]
    let result = pluck(target, 'name')
    expect(result).toEqual(['moe', 'larry', 'curly'])
  })

  describe('max and min', () => {
    let target = [1, 2, 3, 8, 5, 7]
    var targetWithObj = [
      { name: 'larry', age: 50 },
      { name: 'curly', age: 60 },
      { name: 'moe', age: 40 }
    ]

    describe('max', () => {
      test('without predicate', () => {
        let result = max(target)
        expect(result).toEqual(8)
        expect(target).toEqual([1, 2, 3, 8, 5, 7])
      })

      test('with predicate', () => {
        let result = max(targetWithObj, function(item) {
          return item.age
        })
        expect(result).toEqual({ name: 'curly', age: 60 })
      })
    })
    describe('min', () => {
      test('without predicate', () => {
        let result = min(target)
        expect(result).toEqual(1)
        expect(target).toEqual([1, 2, 3, 8, 5, 7])
      })

      test('with predicate', () => {
        let result = min(targetWithObj, function(item) {
          return item.age
        })
        expect(result).toEqual({ name: 'moe', age: 40 })
      })
    })
  })
})
