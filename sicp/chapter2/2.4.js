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
  pair
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

//方法1: 使用无需列表来代表集合
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
