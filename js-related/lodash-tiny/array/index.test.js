import {
  contains,
  removeAt,
  remove,
  flattenDeep,
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
  test('flattenDeep', () => {
    let target = [1, [2, [3, [4]], 5]]
    let res = flattenDeep(target)
    expect(res).toEqual([1, 2, 3, 4, 5])
  })

  test('unique', () => {
    let target = [0, 1, 1, 2, 2, 3, 4]
    expect(unique(target)).toEqual([0, 1, 2, 3, 4])
  })
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
  describe('groupBy', () => {
    test('property shorthand', () => {
      let result = groupBy(['one', 'two', 'three'], 'length')
      expect(result).toEqual({ '3': ['one', 'two'], '5': ['three'] })
    })
    test('with predicate', () => {
      let result = groupBy([6.1, 4.2, 6.3], Math.floor)
      expect(result).toEqual({ '4': [4.2], '6': [6.1, 6.3] })
    })
  })
  test('union', () => {
    expect(union([2], [1, 2])).toEqual([2, 1])
  })
  test('intersect', () => {
    expect(intersect([2, 1], [2, 3])).toEqual([2])
  })
  test('diff', () => {
    expect(diff([2, 1], [2, 3])).toEqual([1])
  })
  describe('sortBy', () => {
    let users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 }
    ]
    test('with string iteratee', () => {
      let res = sortBy(users, 'user')
      expect(res).toEqual([
        { user: 'barney', age: 36 },
        { user: 'barney', age: 34 },
        { user: 'fred', age: 48 },
        { user: 'fred', age: 40 }
      ])
    })
  })
})
