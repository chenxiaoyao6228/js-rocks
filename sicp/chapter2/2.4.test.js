import { list } from '../lang/source'
import {
  adjoin_set_by_tree,
  tree_to_list_1,
  tree_to_list_2,
  list_to_tree
} from './2.4'

function make_set_of_tree_by_list(...args) {
  let set = null
  args.forEach(item => {
    set = adjoin_set_by_tree(item, set)
  })
  return set
}

describe('tree_to_list', () => {
  let tree = make_set_of_tree_by_list(2, 4, 7, 3, 5)
  let result = [2, [3, [4, [5, [7, null]]]]]
  test('tree_to_list_1', () => {
    let origin = tree_to_list_1(tree)
    expect(origin).toEqual(result)
  })

  test('tree_to_list_2', () => {
    let origin = tree_to_list_2(tree)
    expect(origin).toEqual(result)
  })

  test('list_to_tree', () => {
    let ls = list(1, 2, 3, 4, 5)
    let origin = list_to_tree(ls)
    let res = [
      3,
      [
        [1, [null, [[2, [null, [null, null]]], null]]],
        [[4, [null, [[5, [null, [null, null]]], null]]], null]
      ]
    ]
    expect(origin).toEqual(res)
  })
})
