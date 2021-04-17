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

export { pair, head, tail, make_rat, numer, denom, print_rat, make_rat_better }
