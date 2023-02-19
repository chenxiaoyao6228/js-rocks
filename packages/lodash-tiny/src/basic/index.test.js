// import { arrayToTree, curriedAdd, myBind,  myApply, myCall, get, deepClone} from './index.start.js'
import {
  arrayToTree,
  curriedAdd,
  // myBind,
  // myApply,
  // myCall,
  get,
  deepClone,
  stringify,
} from './index.js';

test('array to tree', () => {
  let input = [
    {
      id: 1,
      val: '学校',
      parentId: null,
    },
    {
      id: 2,
      val: '班级1',
      parentId: 1,
    },
    {
      id: 3,
      val: '班级2',
      parentId: 1,
    },
    {
      id: 4,
      val: '学生1',
      parentId: 2,
    },
    {
      id: 5,
      val: '学生2',
      parentId: 3,
    },
    {
      id: 6,
      val: '学生3',
      parentId: 3,
    },
  ];
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
            children: [],
          },
          {
            id: 5,
            val: '学生2',
            children: [],
          },
        ],
      },
      {
        id: 3,
        val: '班级2',
        children: [
          {
            id: 6,
            val: '学生3',
            children: [],
          },
        ],
      },
    ],
  };
  let result = arrayToTree(input);
  expect(JSON.stringify(result)).toHaveLength(JSON.stringify(output).length);
});
test('currying', () => {
  let res1 = curriedAdd(1)(2)(3)();
  let res2 = curriedAdd(1, 2)(3)(4, 5)();
  expect(res1).toEqual(6);
  expect(res2).toEqual(15);
});
// test('myBind', () => {
//   const module = {
//     x: 42,
//     getX: function() {
//       return this.x
//     },
//     unboundAddToX: function(y) {
//       return this.x + y
//     }
//   }
//   let unboundGetX = module.getX
//   expect(() => {
//     unboundGetX()
//   }).toThrow()
//   let boundGetX = myBind(unboundGetX, module)
//   expect(boundGetX()).toEqual(42)

//   let unboundAddToX = module.unboundAddToX
//   expect(() => {
//     unboundAddToX(2)
//   }).toThrow()
//   let boundAddToX = myBind(unboundAddToX, module)
//   expect(boundAddToX(2)).toEqual(44)
// })

// describe('myCall', () => {
//   beforeEach(() => {
//     Function.prototype.myCall = myCall
//   })
//   afterEach(() => {
//     Function.prototype.myCall = null
//   })
//   test('myCall', () => {
//     let person = { firstName: 'York' }
//     var getFullName = function(lastName) {
//       return this.firstName + ' ' + lastName
//     }
//     expect(getFullName.myCall(person, 'Chan')).toEqual('York Chan')
//   })
// })

// describe('myApply', () => {
//   beforeEach(() => {
//     Function.prototype.myApply = myApply
//   })
//   afterEach(() => {
//     Function.prototype.myApply = null
//   })
//   test('myApply', () => {
//     function greet(lastName) {
//       return 'Hello ' + this.firstName + ' ' + lastName + '!'
//     }
//     let context = { firstName: 'York' }
//     let res = greet.myApply(context, ['Chan'])
//     expect(res).toEqual('Hello York Chan!')
//   })
// })

describe('lodash get method', () => {
  test('should return undefined when not found instead of throwing errors', () => {
    let object = { a: { b: { c: 1 } } };
    expect(get(object, 'b')).toEqual(undefined);
    expect(get(object, 'a.c')).toEqual(undefined);
    expect(get(object, 'a.b.d')).toEqual(undefined);
    expect(get(object, 'a.c.d')).toEqual(undefined);
  });
  test('should support object property as array', () => {
    let object = { a: [{ b: { c: 3 } }] };
    expect(get(object, 'a[0].b.c')).toEqual(3);
    expect(get(object, 'a[0].b.d')).toEqual(undefined);
    expect(get(object, 'a[0].c.d')).toEqual(undefined);
    expect(get(object, 'a[1]')).toEqual(undefined);
    expect(get(object, 'a[1].b')).toEqual(undefined);
  });
  test('should support path as array', () => {
    let object = { a: [{ b: { c: 3 } }] };
    expect(get(object, ['a', '0', 'b', 'c'])).toEqual(3);
    expect(get(object, ['a', '0', 'b', 'd'])).toEqual(undefined);
  });
  test('should support explicitly pass default value', () => {
    let object = { a: [{ b: { c: 3 } }] };
    expect(get(object, 'b', 'default')).toEqual('default');
    expect(get(object, 'a.b.c', 'default')).toEqual('default');
    expect(get(object, ['a', '1', 'b', 'c'], 'default')).toEqual('default');
  });
});

test('deepClone', () => {
  let testObj = {
    a: 2,
    b: {
      'b-1': 1,
    },
    c: [
      'c-1',
      {
        'c-2': 'c-2',
      },
    ],
    d: {
      'd-1': [['d-1-1']],
    },
  };

  let clonedObj = deepClone(testObj);
  expect(JSON.stringify(clonedObj)).toEqual(JSON.stringify(testObj));
});

// thanks https://gist.github.com/andrew8088/6f53af9579266d5c62c8
describe('stringify', function () {
  function check(o) {
    return function () {
      expect(stringify(o)).toEqual(JSON.stringify(o));
    };
  }

  test('string', check('andrew'));
  test('string with special chars', check('this"is a \\test'));
  test('number', check(10));
  test('true', check(true));
  test('false', check(false));
  test('null', check(null));
  test('array', check(['one', 'two', 1, { name: 'andrew' }]));
  test('empty object', check({}));
  test('string prop', check({ name: 'andrew' }));
  test('number prop', check({ name: 'andrew', age: 24 }));
  test('boolean prop', check({ name: 'andrew', age: 24, married: false, single: true }));
  test(
    'date prop',
    check({
      name: 'andrew',
      age: 24,
      married: false,
      single: true,
      date: new Date(),
    })
  );
  test('array prop of strings', check({ array: ['one', 'two'] }));
  test(
    'array prop of differing values',
    check({ array: ['one', 2, false, null, { value: 'five', or: 2 }] })
  );
  test('null prop', check({ array: ['one', 'two'], nothing: null }));
  test(
    'object prop',
    check({
      name: 'andrew',
      address: { streetAddress: '21st street', city: 'New York', state: 'NY' },
    })
  );
  test('functions', check({ name: 'andrew', doSomething: function () {} }));
  test('functions in array property', check({ name: 'andrew', doSomething: [function () {}] }));
});
