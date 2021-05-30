import {
  is_undefined,
  is_boolean,
  is_string,
  is_number,
  is_function,
  is_null,
  is_pair,
  head,
  tail,
  list,
  error,
  stringify,
  accumulate,
  pair,
  append,
  math_floor,
  length
} from '../lang/source'

function member(item, list) {
  return is_null(item) || is_null(list)
    ? null
    : item === head(list)
    ? true
    : member(item, tail(list))
}

console.log(
  'member("apple", list("pear", "banana", "prune"))',
  member('apple', list('pear', 'banana', 'prune'))
)

// exersice 2.54
function equal(xs, ys) {
  return is_pair(xs)
    ? is_pair(ys) && equal(head(xs), head(ys)) && equal(tail(xs), tail(ys))
    : is_null(xs)
    ? is_null(ys)
    : is_number(xs)
    ? is_number(ys) && xs === ys
    : is_boolean(xs)
    ? is_boolean(ys) && ((xs && ys) || (!xs && !ys))
    : is_string(xs)
    ? is_string(xs) && xs === ys
    : is_undefined(xs)
    ? is_undefined(ys)
    : is_function(ys) && xs === ys
}
console.log(
  'equal(list("this", "is", "a", "list"), list("this", "is", "a", "list"))',
  equal(list('this', 'is', 'a', 'list'), list('this', 'is', 'a', 'list'))
)

// 2.3.2
function is_variable(x) {
  return is_string(x)
}

function is_same_variable(v1, v2) {
  return is_variable(v1) && is_variable(v2) && v1 === v2
}

function is_sum(x) {
  return is_pair(x) && head(x) === '+'
}

function make_sum(a1, a2) {
  return list('+', a1, a2)
}

function make_product(m1, m2) {
  return list('*', m1, m2)
}

function addend(s) {
  return head(tail(s))
}

function augend(s) {
  return head(tail(tail(s)))
}

function is_product(x) {
  return is_pair(x) && head(x) === '*'
}

function multiplier(s) {
  return head(tail(s))
}

function multiplicand(s) {
  return head(tail(tail(s)))
}

function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp)
    ? make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp)
    ? make_sum(
        make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product(deriv(multiplier(exp), variable), multiplicand(exp))
      )
    : error(exp, 'unknown expression type -- deriv')
}

console.log(
  "deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x')",
  deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x')
)

function number_equal(exp, num) {
  return is_number(exp) && exp === num
}

function make_sum_new(a1, a2) {
  return number_equal(a1, 0)
    ? a2
    : number_equal(a2, 0)
    ? a1
    : is_number(a1) && is_number(a2)
    ? a1 + a2
    : list('+', a1, a2)
}

function make_product_new(m1, m2) {
  return number_equal(m1, 0) || number_equal(m2, 0)
    ? 0
    : number_equal(m1, 1)
    ? m2
    : number_equal(m2, 1)
    ? m1
    : is_number(m1) && is_number(m2)
    ? m1 * m2
    : list('*', m1, m2)
}

console.log('make_product_new(2, 3)', make_product_new(2, 3))
console.log('make_product_new(0, 3)', make_product_new(0, 3))
console.log('make_product_new(1, 3)', make_product_new(1, 3))

// exercise 2.56
function base(e) {
  return head(tail(e))
}
function exponent(e) {
  return head(tail(tail(e)))
}
function make_exponent(base, exp) {
  return number_equal(exp, 0)
    ? 1
    : number_equal(exp, 1)
    ? base
    : list('**', base, exp)
}
function is_exponent(x) {
  return is_pair(x) && head(x) === '**'
}

export function deriv_new(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp) // 和式
    ? make_sum_new(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp) // 积式
    ? make_sum_new(
        make_product_new(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product_new(deriv(multiplier(exp), variable), multiplicand(exp))
      )
    : is_exponent(exp) // 指式
    ? make_product_new(
        make_product_new(
          exponent(exp),
          make_exponent(base(exp), exponent(exp) - 1)
        ),
        deriv(base(exp), variable)
      )
    : error(exp, 'unknown expression type -- deriv')
}

console.log(
  "deriv_new(list('**', 'x', 4), 'x')-----",
  stringify(deriv_new(list('**', 'x', 4), 'x'))
)

// exercise 2.57
export function augend_new(s) {
  return accumulate(make_sum_new, 0, tail(tail(s)))
}
export function multiplicand_new(s) {
  return accumulate(make_product_new, 1, tail(tail(s)))
}

export function deriv_new_2(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp) // 和式
    ? make_sum_new(
        deriv(addend(exp), variable),
        deriv(augend_new(exp), variable)
      )
    : is_product(exp) // 积式
    ? make_sum_new(
        make_product_new(
          multiplier(exp),
          deriv(multiplicand_new(exp), variable)
        ),
        make_product_new(
          deriv(multiplier(exp), variable),
          multiplicand_new(exp)
        )
      )
    : is_exponent(exp) // 指式
    ? make_product_new(
        make_product_new(
          exponent(exp),
          make_exponent(base(exp), exponent(exp) - 1)
        ),
        deriv(base(exp), variable)
      )
    : error(exp, 'unknown expression type -- deriv')
}

console.log(
  "deriv_new_2(list('*', 'x', 'y', list('+', 'x', 3)), 'x')-----",
  stringify(deriv_new_2(list('*', 'x', 'y', list('+', 'x', 3)), 'x'))
)

// 2.3.3 代表集合
// 使用多种方式来代表集合， 体现数据结构的选择对结果产生的影响

//方法1: 使用无序列表来代表集合
function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : x === head(set)
    ? true
    : is_element_of_set(x, tail(set))
}

console.log(
  'is_element_of_set(1, list(1,2,3,4))',
  stringify(is_element_of_set(1, list(1, 2, 3, 4)))
)
console.log(
  'is_element_of_set(5, list(1,2,3,4))',
  stringify(is_element_of_set(5, list(1, 2, 3, 4)))
)

function adjoin_set(x, set) {
  return is_element_of_set(x, set) ? set : pair(x, set)
}

console.log('adjoin_set(1, list(2,3))', stringify(adjoin_set(1, list(2, 3))))

// 取交集
function intersection_set(set1, set2) {
  return is_null(set1) || is_null(set2)
    ? null
    : is_element_of_set(head(set1), set2)
    ? pair(head(set1), intersection_set(tail(set1), set2))
    : intersection_set(tail(set1), set2)
}

console.log(
  'intersection_set(list(1,3,4), list(2,3,4,5))',
  stringify(intersection_set(list(1, 3, 4), list(2, 3, 4, 5)))
)

console.log(
  intersection_set(
    adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
    adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))
  )
)

// 去并集
function union_set(set1, set2) {
  return is_null(set1)
    ? set2
    : adjoin_set(head(set1), union_set(tail(set1), set2))
}

console.log(
  stringify(
    union_set(
      adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
      adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))
    )
  )
)

// exercise 2.60  重复的无序列表来表示集合
function is_element_of_set_with_duplicate(x, set) {
  return is_element_of_set(x, set)
}

function adjoin_set_with_duplicate(x, set) {
  return is_null(x) ? set : pair(x, set)
}

console.log(
  'adjoin_set_with_duplicate(1, list(1, 2, 3, 4))',
  stringify(adjoin_set_with_duplicate(1, list(1, 2, 3, 4)))
)

function intersection_set_with_duplicate(set1, set2) {
  return intersection_set(set1, set2)
}

function union_set_with_duplicate(set1, set2) {
  return append(set1, set2)
}

console.log(
  'union_set_with_duplicate(adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),adjoin_set(10, adjoin_set(15, adjoin_set(20, null))))',
  stringify(
    union_set_with_duplicate(
      adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
      adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))
    )
  )
)

// 2. 集合作为有序列表
function is_element_of_set_ordered_list(x, set) {
  return is_null(set)
    ? false
    : x < head(set)
    ? false
    : x === head(set)
    ? true
    : is_element_of_set_ordered_list(x, tail(set))
}

console.log(
  'is_element_of_set_ordered_list(2, list(1,2,3, 4))',
  stringify(is_element_of_set_ordered_list(2, list(1, 2, 3, 4)))
)

function intersection_set_with_ordered_list(set1, set2) {
  return is_null(set1) || is_null(set2)
    ? null
    : head(set1) < head(set2)
    ? pair(head(set1), intersection_set_with_ordered_list(tail(set1), set2))
    : head(set1) === head(set2)
    ? pair(
        head(set1),
        intersection_set_with_ordered_list(tail(set1), tail(set2))
      )
    : intersection_set_with_ordered_list(set1, tail(set2))
}

console.log(
  'intersection_set_with_ordered_list(list(3,4,5), list(1,2,3))',
  stringify(intersection_set_with_ordered_list(list(3, 4, 5), list(1, 2, 3)))
)

// exercise 2.61
function adjoin_set_with_ordered_list(x, set) {
  return is_null(set)
    ? list(x)
    : x === head(x)
    ? set
    : x < head(set)
    ? pair(x, set)
    : pair(head(set), adjoin_set_with_ordered_list(x, tail(set)))
}

console.log(
  'stringify(adjoin_set_with_ordered_list(4, list(2, 3, 5)))',
  stringify(adjoin_set_with_ordered_list(4, list(2, 3, 5)))
)

// exercise 2.6,2
function union_set_with_ordered_list(set1, set2) {
  if (is_null(set1)) {
    return set2
  } else if (is_null(set2)) {
    return set1
  } else {
    let head1 = head(set1)
    let head2 = head(set2)
    if (head1 < head2) {
      return pair(head(set1), union_set_with_ordered_list(tail(set1), set2))
    } else if (head1 === head2) {
      return pair(head1, union_set_with_ordered_list(tail(set1), tail(set2)))
    } else {
      return union_set_with_ordered_list(set1, tail(set2))
    }
  }
}

console.log(
  'union_set_with_ordered_list(list(1, 2, 3, 4), list(2, 3, 4, 5))',
  stringify(union_set_with_ordered_list(list(1, 2, 3, 4), list(2, 3, 4, 5)))
)

// 集合作为二叉树
function entry(tree) {
  return head(tree)
}

function left_branch(tree) {
  return head(tail(tree))
}

function right_branch(tree) {
  return head(tail(tail(tree)))
}

function make_tree(entry, left, right) {
  return list(entry, left, right)
}

export function is_element_of_set_by_tree(x, set) {
  return is_null(set)
    ? false
    : x === entry(set)
    ? true
    : x < entry(set)
    ? is_element_of_set_by_tree(x, left_branch(set))
    : is_element_of_set_by_tree(x, right_branch(set))
}

// [2, [3, null,null], [1,null,null]] -> 4
// 如果小的话，加入到left_branch中, 打的话加入到right_branch

export function adjoin_set_by_tree(x, set) {
  return is_null(set)
    ? make_tree(x, null, null)
    : x === entry(set)
    ? set
    : x < entry(set)
    ? make_tree(
        entry(set),
        adjoin_set_by_tree(x, left_branch(set)),
        right_branch(set)
      )
    : // x > entry(set)
      make_tree(
        entry(set),
        left_branch(set),
        adjoin_set_by_tree(x, right_branch(set))
      )
}

// exercise 2.6.3
export function tree_to_list_1(tree) {
  return is_null(tree)
    ? null
    : append(
        tree_to_list_1(left_branch(tree)),
        pair(entry(tree), tree_to_list_1(right_branch(tree)))
      )
}

export function tree_to_list_2(tree) {
  function copy_to_list(tree, result_list) {
    return is_null(tree)
      ? result_list
      : copy_to_list(
          left_branch(tree),
          pair(entry(tree), copy_to_list(right_branch(tree), result_list))
        )
  }
  return copy_to_list(tree, null)
}

// transform an orderd tree to a balanced binary tree
export function list_to_tree(elements) {
  return head(partial_tree(elements, length(elements)))
}

function partial_tree(elts, n) {
  if (n === 0) {
    return pair(null, elts)
  } else {
    const left_size = math_floor((n - 1) / 2)
    const left_result = partial_tree(elts, left_size)
    const left_tree = head(left_result)
    const non_left_elts = tail(left_result)
    const right_size = n - (left_size + 1)
    const this_entry = head(non_left_elts)
    const right_result = partial_tree(tail(non_left_elts), right_size)
    const right_tree = head(right_result)
    const remaining_elts = tail(right_result)
    return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts)
  }
}

// 数据库查找与集合
export function look_up(given_key, set_of_records) {
  return is_null(set_of_records)
    ? false
    : given_key === head(set_of_records)
    ? true
    : look_up(given_key, tail(set_of_records))
}
