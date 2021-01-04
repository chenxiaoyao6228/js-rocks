// import { arrayToTree, curriedAdd, myBind,  myApply, myCall, get } from './index.start.js'
import {
  arrayToTree,
  curriedAdd,
  myBind,
  myApply,
  myCall,
  get
} from './index.finish.js'

test('array to tree', () => {
  let input = [
    {
      id: 1,
      val: '学校',
      parentId: null
    },
    {
      id: 2,
      val: '班级1',
      parentId: 1
    },
    {
      id: 3,
      val: '班级2',
      parentId: 1
    },
    {
      id: 4,
      val: '学生1',
      parentId: 2
    },
    {
      id: 5,
      val: '学生2',
      parentId: 3
    },
    {
      id: 6,
      val: '学生3',
      parentId: 3
    }
  ]
  let output = {
    id: 1,
    val: '学校',
    children: [
      {
        id: 2,
        val: '班级1',
        children: [
          {
            id: 4,
            val: '学生1',
            children: []
          },
          {
            id: 5,
            val: '学生2',
            children: []
          }
        ]
      },
      {
        id: 3,
        val: '班级2',
        children: [
          {
            id: 6,
            val: '学生3',
            children: []
          }
        ]
      }
    ]
  }
  let result = arrayToTree(input)
  expect(JSON.stringify(result).length).toEqual(JSON.stringify(output).length)
})
test('currying', () => {
  let res1 = curriedAdd(1)(2)(3)()
  let res2 = curriedAdd(1, 2)(3)(4, 5)()
  expect(res1).toEqual(6)
  expect(res2).toEqual(15)
})
test('myBind', () => {
  const module = {
    x: 42,
    getX: function() {
      return this.x
    },
    unboundAddToX: function(y) {
      return this.x + y
    }
  }
  let unboundGetX = module.getX
  expect(() => {
    unboundGetX()
  }).toThrow()
  let boundGetX = myBind(unboundGetX, module)
  expect(boundGetX()).toEqual(42)

  let unboundAddToX = module.unboundAddToX
  expect(() => {
    unboundAddToX(2)
  }).toThrow()
  let boundAddToX = myBind(unboundAddToX, module)
  expect(boundAddToX(2)).toEqual(44)
})

describe('myCall', () => {
  beforeEach(() => {
    Function.prototype.myCall = myCall
  })
  afterEach(() => {
    Function.prototype.myCall = null
  })
  test('myCall', () => {
    let person = { firstName: 'York' }
    var getFullName = function(lastName) {
      return this.firstName + ' ' + lastName
    }
    expect(getFullName.myCall(person, 'Chan')).toEqual('York Chan')
  })
})

describe('myApply', () => {
  beforeEach(() => {
    Function.prototype.myApply = myApply
  })
  afterEach(() => {
    Function.prototype.myApply = null
  })
  test('myApply', () => {
    function greet(lastName) {
      return 'Hello ' + this.firstName + ' ' + lastName + '!'
    }
    let context = { firstName: 'York' }
    let res = greet.myApply(context, ['Chan'])
    expect(res).toEqual('Hello York Chan!')
  })
})

describe('lodash get method', () => {
  test('should return undefined when not found instead of throwing errors', () => {
    let object = { a: { b: { c: 1 } } }
    expect(get(object, 'b')).toEqual(undefined)
    expect(get(object, 'a.c')).toEqual(undefined)
    expect(get(object, 'a.b.d')).toEqual(undefined)
    expect(get(object, 'a.c.d')).toEqual(undefined)
  })
  test('should support object property as array', () => {
    var object = { a: [{ b: { c: 3 } }] }
    expect(get(object, 'a[0].b.c')).toEqual(3)
    expect(get(object, 'a[0].b.d')).toEqual(undefined)
    expect(get(object, 'a[0].c.d')).toEqual(undefined)
    expect(get(object, 'a[1]')).toEqual(undefined)
    expect(get(object, 'a[1].b')).toEqual(undefined)
  })
  test('should support path as array', () => {
    var object = { a: [{ b: { c: 3 } }] }
    expect(get(object, ['a', '0', 'b', 'c'])).toEqual(3)
    expect(get(object, ['a', '0', 'b', 'd'])).toEqual(undefined)
  })
  test('should support explicitly pass default value', () => {
    var object = { a: [{ b: { c: 3 } }] }
    expect(get(object, 'b', 'default')).toEqual('default')
    expect(get(object, 'a.b.c', 'default')).toEqual('default')
    expect(get(object, ['a', '1', 'b', 'c'], 'default')).toEqual('default')
  })
})
