const is_undefined = n => n === undefined
const display = (v, n = 1) => console.log(('' + v).repeat(n))
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
  math_max
}
