import {
  display,
  newline,
  gcd,
  error,
  fast_exp,
  math_max,
  math_min
} from '../lang/source'

const pair = (x, y) => [x, y]
const head = pair => pair[0]
const tail = pair => pair[1]

function add_rat(x, y) {
  return make_rat(
    numer(x) * denom(y) + numer(y) * denom(x),
    denom(x) * denom(y)
  )
}

function sub_rat(x, y) {
  return make_rat(
    numer(x) * denom(y) - numer(y) * denom(x),
    denom(x) * denom(y)
  )
}

function mul_rat(x, y) {
  return make_rat(numer(x) * numer(y), denom(x) * denom(y))
}

function div_rat(x, y) {
  return make_rat(numer(x) * denom(y), numer(y) * denom(x))
}

function equal_rat(x, y) {
  return numer(x) * denom(y) === number(y) * denom(x)
}

function make_rat(x, y) {
  const g = gcd(x, y)
  return pair(x / g, y / g)
}

function numer(x) {
  return head(x)
}

function denom(y) {
  return tail(y)
}

function print_rat(x) {
  let res = numer(x) + '/' + denom(x)
  console.log(res)
  return res
}

const one_half = make_rat(1, 2)
print_rat(one_half)

// const one_third = make_rat(1, 3)
// print_rat(one_third)

// print_rat(add_rat(one_half, one_third))
// print_rat(add_rat(one_third, one_third))

// exercise 2.1
function make_rat_better(x, y) {
  if ((x * y < 0 && y < 0) || (x < 0 && y < 0)) {
    return pair(-x, -y)
  } else {
    return pair(x, y)
  }
}

// exercise 2.2
const make_point = (x, y) => pair(x, y)

const x_point = p => head(p)

const y_point = p => tail(p)

const make_segment = (p1, p2) => pair(p1, p2)

const start_segment = segment => head(segment)

const end_segment = segment => tail(segment)

function mid_point(segment) {
  return make_point(
    (x_point(start_segment(segment)) + x_point(end_segment(segment))) / 2,
    (y_point(start_segment(segment)) + y_point(end_segment(segment))) / 2
  )
}

function print_point(p) {
  console.log(`(${x_point(p)}, ${y_point(p)})`)
}

const p1 = make_point(1, 4)
const p2 = make_point(2, 7)
const segment = make_segment(p1, p2)
const mid_p = mid_point(segment)
print_point(mid_p)

// exercise 2.3 定义矩形的实现, 同时使用2.2的结果计算矩形的周长和面积

// 2.1.3 数据究竟是什么? 过程也可以是数据
// 这里我们使用了过程
function pair_1(x, y) {
  return function(m) {
    return m === 0 ? x : m === 1 ? y : error('error arguments not 0 or 1')
  }
}
function head_1(p) {
  return p(0)
}

function tail_1(p) {
  return p(1)
}

console.log('head_1(pair_1(1,2))', head_1(pair_1(1, 2)))
console.log('tail_1(pair_1(1,2))', tail_1(pair_1(1, 2)))

// exercise 2.4
function pair_2(x, y) {
  return m => m(x, y)
}

function head_2(z) {
  return z((p, q) => p)
}

function tail_2(z) {
  return z((p, q) => q)
}
console.log('head_2(pair_2(1,2))', head_2(pair_2(1, 2)))
console.log('tail_2(pair_2(1,2))', tail_2(pair_2(1, 2)))

// exercise 2.5
// 用非负整数和算术运算符表示pair,head, tail
function pair_3(a, b) {
  return fast_exp(2, a) * fast_exp(3, b)
}
function head_3(p) {
  return p % 2 === 0 ? head_3(p / 2) + 1 : 0
}

function tail_3(p) {
  return p % 3 === 0 ? tail_3(p / 3) + 1 : 0
}
console.log('head_3(pair_3(1,2))', head_3(pair_3(1, 2)))
console.log('tail_3(pair_3(1,2))', tail_3(pair_3(1, 2)))

// ⭐ exercise 2.6 church计数
// 完全使用过程来表示数

const zero = f => x => x
function add_1(n) {
  return f => x => f(n(f)(x))
}
const one = f => x => f(x)
const two = f => x => f(f(x))

function plus(n, m) {
  return f => x => n(f)(m(f)(x))
}

// testing
const three = plus(one, two)
function church_to_number(c) {
  return c(n => n + 1)(0)
}
console.log(church_to_number(zero))
console.log(church_to_number(one))
console.log(church_to_number(two))
console.log(church_to_number(three))

// 2.1.4 区间算术
function make_interval(x, y) {
  return pair(x, y)
}
function lower_bound(i) {
  return head(i)
}
function upper_bound(i) {
  return tail(i)
}
function print_interval(i) {
  let res = `[${lower_bound(i)},${upper_bound(i)}]`
  console.log(res)
  return res
}

function add_interval(x, y) {
  return make_interval(
    lower_bound(x) + lower_bound(y),
    upper_bound(x) + upper_bound(y)
  )
}

print_interval(add_interval(make_interval(1, 2), make_interval(3, 5)))

function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y)
  const p2 = lower_bound(x) * upper_bound(y)
  const p3 = upper_bound(x) * lower_bound(y)
  const p4 = upper_bound(x) * upper_bound(y)
  return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4))
}

print_interval(mul_interval(make_interval(1, 2), make_interval(3, 5)))

function div_interval(x, y) {
  return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)))
}
print_interval(div_interval(make_interval(1, 2), make_interval(3, 5)))

// exercise 2.8
function sub_interval(x, y) {
  return make_interval(
    lower_bound(x) - upper_bound(y),
    upper_bound(x) - lower_bound(y)
  )
}

print_interval(sub_interval(make_interval(1, 2), make_interval(3, 5)))

// TODO exercise 2.9 - 2.16

// 2.2 层次性数据结构与闭包性质
// 序对pair就是一种通用的建筑砖块, 使用它可以构架起不同种类的数据结构来(如数列list和树tree)
const stringify = JSON.stringify
// 2.2.1
function list(...args) {
  return args.length === 0 ? null : pair(args[0], list(...args.slice(1)))
}
console.log(stringify(list(1, 2, 3, 4)))

const one_through_four = list(1, 2, 3, 4)
console.log(head(tail(one_through_four)))

console.log(stringify(pair(5, one_through_four)))

// list 操作
// 根据索引查找元素
function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1)
}

console.log(list_ref(one_through_four, 0))
console.log(list_ref(one_through_four, 1))
console.log(list_ref(one_through_four, 2))
console.log(list_ref(one_through_four, 3))

// length
function is_null(items) {
  return items === null
}
// 递归
function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items))
}

console.log('length(one_through_four)', length(one_through_four))

// 迭代
function length_iter(items) {
  function iter(items, total) {
    return is_null(items) ? total : iter(tail(items), total + 1)
  }
  return iter(items, 0)
}

console.log('length_iter(one_through_four)', length_iter(one_through_four))

// append
function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2))
}

const five_trough_eigth = list(5, 6, 7, 8)
const one_through_eight = append(one_through_four, five_trough_eigth)
console.log('one_through_eight)', stringify(one_through_eight))
console.log('head(one_through_eight))', stringify(head(one_through_eight)))

// last_pair 获取最后一个元素
// function last_pair(items) {
//   return is_null(tail(items)) ? items : last_pair(tail(items))
// }
function last_pair(list) {
  return list_ref(list, length(list) - 1)
}

console.log(last_pair(one_through_eight))

// exercise 2.18
// ⭐ reverse 链表反转
function reverse_naive(items) {
  return is_null(items)
    ? null
    : append(reverse_naive(tail(items)), pair(head(items), null))
}
console.log(stringify(reverse_naive(one_through_four)))

function reverse(items) {
  function reverse_iter(items, result) {
    return is_null(items)
      ? result
      : reverse_iter(tail(items), pair(head(items), result))
  }
  return reverse_iter(items, null)
}

console.log(stringify(reverse(one_through_four)))

// exercise 2.19
function cc(amount, coin_values) {
  return amount === 0
    ? 1
    : amount < 0 || no_more(coin_values)
    ? 0
    : cc(amount, except_first_denomination(coin_values)) +
      cc(amount - first_denomination(coin_values), coin_values)
}

const us_coins = list(100, 50, 25, 10, 5, 1)
const uk_coins = list(100, 50, 20, 10, 5, 2, 1)

function first_denomination(coin_values) {
  return head(coin_values)
}
function except_first_denomination(coin_values) {
  return tail(coin_values)
}
function no_more(coin_values) {
  return is_null(coin_values)
}

console.log('cc(100, us_coins)', cc(100, us_coins))
console.log('cc(100, us_coins)', cc(100, uk_coins))

// ⭐ exercise 2.20
function plus_curried(x) {
  return y => x + y
}
console.log('plus_curried(3)(4)', plus_curried(3)(4))

function brooks(f, list) {
  return is_null(list) ? f : brooks(f(head(list)), tail(list))
}
console.log(
  'brooks(plus_curried, list(3, 4))',
  brooks(plus_curried, list(3, 4))
)

function brooks_curried(items) {
  return brooks(head(items), tail(items))
}

console.log(
  'brooks_curried(list(plus_curried, 3,4)',
  brooks_curried(list(plus_curried, 3, 4))
)
function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)))
}
const inc = x => x + 1
console.log('map(inc, list(1,2,3,4))', stringify(map(inc, list(1, 2, 3, 4))))

// exercise 2.21
const square = x => x * x
function square_list(items) {
  return is_null(items)
    ? null
    : pair(square(head(items)), square_list(tail(items)))
}

console.log('square_list(list(1,2,3,4))', square_list(list(1, 2, 3, 4)))

function square_list_with_map(items) {
  return map(square, items)
}
console.log(
  'square_list_with_map(list(1,2,3,4))',
  square_list_with_map(list(1, 2, 3, 4))
)
// exercise 2.23
function for_each(fn, items) {
  if (is_null(items)) {
    return null
  } else {
    fn(head(items))
    for_each(fn, tail(items))
  }
}
for_each(x => display(x), list(1, 2, 3, 4))

// 2.22 层次性结构
function is_pair(pair) {
  if (is_null(pair)) {
    return false
  }
  try {
    let head = pair[0]
    let tail = pair[1]
    if (!head || !tail) {
      return false
    }
  } catch (error) {
    return false
  }
  return true
}
const x = pair(list(1, 2), list(3, 4))
console.log('length(x)', length(x))

const xx = list(x, x)
console.log('stringify(xx)', stringify(xx))
// length指的是一维的结构

function count_leaves(x) {
  return is_null(x)
    ? 0
    : !is_pair(x)
    ? 1
    : count_leaves(head(x)) + count_leaves(tail(x))
}
console.log(
  'count_leaves(pair(list(1, 2), list(3, 4)))',
  count_leaves(pair(list(1, 2), list(3, 4)))
)

// exercise 2.25 通过head和tail来选出其中的7
// 1. list(1, 3, list(5, 7), 9)
console.log(
  'head(tail(head(tail(tail(list(1, 3, list(5, 7), 9))))))',
  head(tail(head(tail(tail(list(1, 3, list(5, 7), 9))))))
)

// 2. list(list(7))
console.log(
  'stringify(head(head(list(list(7)))))',
  stringify(head(head(list(list(7)))))
)

// 3. list(1, list(2, list(3, list(4, list(5, list(6, 7))))))

const mm = list(1, list(2, list(3, list(4, list(5, list(6, 7))))))
console.log(
  head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(mm))))))))))))
)

// exercise 2.26
/* 
  比较append, pair, list 
  append会把两个链表连接起来, 形成一个单一的链表, 末尾只有一个null
  pair把两个list组合起来, 可以通过head, tail取到
  list(a1,a2...): 把所有的元素通过链条的形式连接起来, 只会处理一级的,最后一个元素为null 
*/

const x1 = list(1, 2, 3)
const y1 = list(4, 5, 6)
console.log('append(x1,y1)', stringify(append(x1, y1)))
console.log('pair(x1,y1)', stringify(pair(x1, y1)))
console.log('list(x1,y1)', stringify(list(x1, y1)))

// ⭐ exercise 2.27 深度反转数结构
// const x = list(list(1, 2), list(3, 4)) => list(list(4, 3), list(2, 1))

function deep_reverse(items) {
  return is_null(items)
    ? null
    : is_pair(items)
    ? append(deep_reverse(tail(items)), pair(deep_reverse(head(items)), null))
    : items
}

// ⭐ exercise 2.28 深度嵌套数据拍平 fringe
function fringe(x) {
  return is_null(x)
    ? null
    : is_pair(x)
    ? append(fringe(head(x), fringe(tail(x))))
    : list(x)
}

export {
  pair,
  head,
  tail,
  make_rat,
  numer,
  denom,
  print_rat,
  make_rat_better,
  list,
  is_pair,
  deep_reverse,
  fringe
}
