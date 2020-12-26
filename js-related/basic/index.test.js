// import { arrayToTree, curriedAdd } from './index.start.js'
import { arrayToTree, curriedAdd } from './index.finish.js'

describe('basic', () => {
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
})
