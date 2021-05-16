const is_undefined = n => n === undefined
const is_null = n => n === null
const is_number = n => typeof n === 'number'
const is_boolean = n => typeof n === 'boolean'
const is_string = n => typeof n === 'string'
const is_function = n => typeof n === 'function'

const display = (v, n = 1) => console.log(('' + v).repeat(n))
const stringify = JSON.stringify
const get_time = () => Date.now()

const abs = Math.abs
const math_floor = Math.floor
const math_random = Math.random
const math_cos = Math.cos
const log = Math.log
const math_PI = Math.PI
const math_log2 = Math.log
const math_max = Math.max
const math_min = Math.min

function gcd(a, b) {
  function remainder(a, b) {
    return a % b
  }
  return b == 0 ? a : gcd(b, remainder(a, b))
}

function error(err) {
  return new Error(err)
}

function fast_exp(base, exp) {
  function fast_exp_iter(total, base, exp) {
    function is_even(n) {
      return n % 2 === 0
    }
    return exp === 0
      ? total
      : is_even(exp)
      ? fast_exp_iter(total, base * base, exp / 2)
      : fast_exp_iter(total * base, base, exp - 1)
  }
  return fast_exp_iter(1, base, exp)
}

function accumulate(fn, init, list) {
  return is_null(list) ? init : fn(head(list), accumulate(fn, init, tail(list)))
}

// cp2
const pair = (x, y) => [x, y]
const head = pair => pair[0]
const tail = pair => pair[1]
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
function list(...args) {
  return args.length === 0 ? null : pair(args[0], list(...args.slice(1)))
}
function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2))
}

function length(list) {
  return is_null(list)
    ? null
    : head(list) && is_null(tail(list))
    ? 1
    : 1 + length(tail(list))
}

export {
  is_undefined,
  display,
  get_time,
  abs,
  gcd,
  error,
  fast_exp,
  log,
  math_PI,
  math_log2,
  math_floor,
  math_random,
  math_cos,
  math_min,
  math_max,
  is_boolean,
  is_string,
  is_number,
  is_function,
  is_null,
  pair,
  is_pair,
  head,
  tail,
  list,
  stringify,
  accumulate,
  append,
  length
}
