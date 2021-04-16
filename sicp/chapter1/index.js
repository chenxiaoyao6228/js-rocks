const abs = Math.abs

function square(a) {
  return a * a
}

function sum_of_square(a, b) {
  return square(a) + square(b)
}
// exercise 1.3

function sum_of_squares_of_larger_two(a, b, c) {
  let res
  // get larger two of three
  let { large, middle } = get_max_two_of_three(a, b, c)
  // return square
  res = sum_of_square(large, middle)
  return res
  function get_max_two_of_three(a, b, c) {
    let large = a,
      middle = b
    if (a < c) {
      if (b < c) {
        large = c
        if (a < b) {
          middle = b
        } else {
          middle = a
        }
      } else {
        large = b
        middle = c
      }
    }
    return { large, middle }
  }
}

// exercise 1.5

// function p() {
//   return p()
// }

// function test(x, y) {
//   return x === 0 ? 0 : y
// }I
// test(0, p()) // maxinum call size exceeded

// ⭐ 1.1.7 牛顿法求平方根
// x为需要求方根值, y为用来猜测的值, 每次使用 (y + x/y)/2的方式进行逼近

function sqrt_iter(guess, x) {
  return good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x)
}

function improve(guess, x) {
  return average(guess, x / guess)
}

function average(x, y) {
  return (x + y) / 2
}

function good_enough(guess, x) {
  return abs(square(guess) - x) < 0.001
}

function sqrt(x) {
  return sqrt_iter(1, x)
}
console.log('sqrt(9)', sqrt(9))

// exercise 1.6
// 使用函数来封装底层的条件操作符
function conditional(predicate, then_clause, else_clause) {
  return predicate ? then_clause : else_clause
}

function sqrt_iter_1(guess, x) {
  return conditional(
    good_enough(guess, x),
    guess,
    sqrt_iter(improve(guess, x), x)
  )
}
function sqrt_1(x) {
  return sqrt_iter_1(1, x)
}

console.log('sqrt_1(9)', sqrt_1(9))

// exercise 1.8 牛顿法求立方根
// 公式: ((x/y^2) + 2y) / 3

function cube_root_iter(guess, x) {
  return good_enough_cube_root(guess, x)
    ? guess
    : cube_root_iter(improve_cube_root(guess, x), x)
}
function improve_cube_root(guess, x) {
  return (x / (guess * guess) + 2 * guess) / 3
}

function good_enough_cube_root(guess, x) {
  return abs(cube(guess) - x) < 0.0000001
}

function cube_root(x) {
  return cube_root_iter(1, x)
}

function cube(x) {
  return x * x * x
}

console.log('cube_root(8)', cube_root(8))

// 小结: 体会函数作为抽象block的形式, 每个函数负责一个功能块

// 对于无法被外部复用的函数,直接定义在函数内部
// 由于函数作用域, x可以直接被内部函数获取
function sqrt_2(x) {
  function sqrt_iter(guess) {
    return good_enough(guess) ? guess : sqrt_iter(improve(guess), x)
  }

  // x省略了
  function improve(guess) {
    return average(guess, x / guess)
  }
  // x省略了
  function good_enough(guess) {
    return abs(square(guess) - x) < 0.001
  }
  function average(x, y) {
    return (x + y) / 2
  }

  return sqrt_iter(1, x)
}

console.log('sqrt_2(9)', sqrt_2(9))

// 1.2 开始讲递归与迭代了

function factorial(n) {
  return n === 1 ? 1 : n * factorial(n - 1)
}

console.log('factorial(5)', factorial(5))

// 尾递归优化
function factorial_tail(n) {
  return factorial_iter(1, 1, n)
  function factorial_iter(product, counter, max_count) {
    return counter > max_count
      ? product
      : factorial_iter(counter * product, counter + 1, max_count)
  }
}
function factorial_tail_1(n) {
  return factorial_iter(1, 1)
  function factorial_iter(product, counter) {
    return counter > n
      ? product
      : factorial_iter(counter * product, counter + 1)
  }
}
console.log('factorial_tail(5)', factorial_tail(5))
console.log('factorial_tail_1(5)', factorial_tail_1(5))

// counting change 换零钱游戏
function count_change(amount) {
  return cc(amount, 5)

  function cc(amount, kinds_of_coins) {
    return amount === 0
      ? 1
      : amount < 0 || kinds_of_coins === 0
      ? 0
      : cc(amount, kinds_of_coins - 1) +
        cc(amount - first_denomination(kinds_of_coins), kinds_of_coins)
  }

  function first_denomination(kinds_of_coins) {
    switch (kinds_of_coins) {
      case 1:
        return 1
      case 2:
        return 5
      case 3:
        return 10
      case 4:
        return 25
      case 5:
        return 50
      default:
        break
    }
  }
}

// exercise 1.11, 写出函数并尝试将递归转为迭代
function fn_recursive(n) {
  return n < 3
    ? n
    : fn_recursive(n - 1) + 2 * fn_recursive(n - 2) + 3 * fn_recursive(n - 3)
}

// base case是2, 因为是递归转迭代,所以我们需要记录对应的fn(n-1),fn(n-2),fn(n-3)的值
// 当n >= 3的时候, 进行移位操作
function fn_iterative(n) {
  function fn_iterative_impl(a, b, c, count) {
    return count === 0
      ? a
      : fn_iterative_impl(a + 2 * b + 3 * c, a, b, count - 1)
  }
  return n < 3 ? n : fn_iterative_impl(2, 1, 0, n - 2)
}

console.log(fn_recursive(10))
console.log(fn_iterative(10))

// exercise 1.12 写一个递归函数计算杨辉三角

function pascal_triangle(row, index) {
  return index > row
    ? false
    : index === 1 || row === index
    ? 1
    : pascal_triangle(row - 1, index - 1) + pascal_triangle(row - 1, index)
}

// 复杂度与增长的阶
// exercise 1.15
/*
function cube(x) {
    return x * x * x;
}
function p(x) {
    return 3 * x - 4 * cube(x);
}
function sine(angle) {
    return ! (abs(angle) > 0.1)
           ? angle
           : p(sine(angle / 3));
}
*/
// sine(12.15)足够小的时候, p被调用了5次
// 复杂度为O(log a)

// 1.2.4

// exercise 1.16
// 实现一个O(log n)的求指数方法, 依据: (b ^ (n/2))^2 = (b ^ 2) ^ (n/2)
// tips: 定义一个变量收集对应的值
function fast_exp_iter(total, base, exp) {
  return exp === 0
    ? total
    : is_even(exp)
    ? fast_exp_iter(total, base * base, exp / 2)
    : fast_exp_iter(total * base, base, exp - 1)
}
function fast_exp(base, exp) {
  return fast_exp_iter(1, base, exp)
}

console.log(fast_exp(2, 5))

// exercise 1.17
// 假定我们使用的语言中并没有实现乘法, 请利用加法的方式实现乘法
function is_even(n) {
  return n % 2 === 0
}

function times(a, b) {
  return b === 0 ? 0 : a + times(a, b - 1)
}

function double(x) {
  return x * 2
}
function halve(x) {
  return x / 2
}

console.log(times(2, 5))

function fast_times(a, b) {
  return b === 0
    ? 0
    : is_even(b)
    ? double(fast_times(a, halve(b)))
    : a + fast_times(a, b - 1)
}

console.log(fast_times(2, 5))

// exercise 1.1.8
//  基于加, 加倍, 折半的运算, 求两数乘积

function fast_times_iter(total, a, b) {
  return b === 1
    ? total + a
    : a === 0 || b === 0
    ? 0
    : is_even(b)
    ? fast_times_iter(total, double(a), halve(b))
    : fast_times_iter(total + a, a, b - 1)
}
function fast(a, b) {
  return fast_times_iter(0, a, b)
}

console.log(fast(2, 5))

// exercise 1.19
// TODO

// 1.2.6 欧几里得算法求最大公约数
// 如果r是a除以b的余数, 那么a和b的公约数正好也是b和r的公约数
// GCD(a, b) = GCD(b, r)

function GCD(a, b) {
  function remainder(a, b) {
    return a % b
  }
  return b == 0 ? a : GCD(b, remainder(a, b))
}
console.log(GCD(10, 25))
console.log(GCD(66, 99))

// TODO  lame定理与exercise 1.20

// 1.2.6 素(质)数检测

// 法一
function is_prime(n) {
  return n <= 1 ? false : n === smallest_divisor(n) // 找到n与2的最小公约数
}
function smallest_divisor(n) {
  return find_smallest_divisor(n, 2)
  function find_smallest_divisor(n, test_divisor) {
    return square(test_divisor) > n
      ? n
      : divides(test_divisor, n)
      ? test_divisor
      : find_smallest_divisor(n, test_divisor + 1)
  }

  function divides(a, b) {
    return b % a === 0
  }
}

// 法二: 费马检测
// 基于费马小定理: 如果n是一个素数,a是除n以外的任意正整数
function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m
}
console.log(expmod(4, 3, 5))

const math_floor = Math.floor
const math_random = Math.random

function fermat_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a
  }
  return try_it(1 + math_floor(math_random() * (n - 1)))
}

// eslint-disable-next-line
console.log('fermat_test(97)', fermat_test(97))

// 进行n次费马检测 => 概率算法
function fast_is_prime(n, times) {
  return times === 0
    ? true
    : fermat_test(n)
    ? fast_is_prime(n, times - 1)
    : false
}

console.log('fast_is_prime(97, 3)', fast_is_prime(97, 3))

// exercise 1.21
console.log('smallest_divisor(199)', smallest_divisor(199))
console.log('smallest_divisor(199)', smallest_divisor(1999))
console.log('smallest_divisor(199)', smallest_divisor(19999))

// exercise 1.22
// 没有任何赋值的过程!!!!
const is_undefined = n => n === undefined
const display = (v, n = 1) => console.log(('' + v).repeat(n))
const get_time = () => Date.now()

console.log('****************************************************************')

function timed_prime_test(n) {
  display(n)
  return start_prime_test(n, get_time())
}
function start_prime_test(n, start_time) {
  return is_prime(n) ? report_prime(get_time() - start_time) : true
}

function report_prime(elapsed_time) {
  display(' *** ')
  return display(elapsed_time)
}

// eslint-disable-next-line
function search_for_primes(start, times) {
  return times === 0
    ? true
    : start > 2 && start % 2 === 0
    ? search_for_primes(start + 1, times)
    : // if we get undefined -> its a prime
    is_undefined(timed_prime_test(start))
    ? search_for_primes(start + 2, times - 1)
    : search_for_primes(start + 2, times)
}

// search_for_primes(10000, 3)
// search_for_primes(100000, 3)
// search_for_primes(1000000, 3);

// TODO 1.23-1.28

// *******************************************

// 1.3 高阶函数
// 1.3.1 函数作为参数
// 观察下面的例子, 实现通用的求和公式

// 计算从a到b的自然数的和
function sum_integers(a, b) {
  return a > b ? 0 : a + sum_integers(a + 1, b)
}
console.log('sum_integers(1, 4)', sum_integers(1, 4))

// 计算从a到b的自然数的立方和
function sum_cubes(a, b) {
  return a > b ? 0 : cube(a) + sum_cubes(a + 1, b)
}

console.log('sum_cubes(1,4)', sum_cubes(1, 4))

// 等差数列
function pi_sum(a, b) {
  return a > b ? 0 : 1 / (a * (a + 2)) + pi_sum(a + 4, b)
}

console.log('pi_sum(1, 11)', pi_sum(1, 11))

// 通用的求和公式, term为当前项, next为下一项
function create_sum(a, b, term, next) {
  function sum(a, b) {
    return a > b ? 0 : term(a) + sum(next(a), b)
  }
  return sum(a, b)
}

const sum_integers_new = (a, b) =>
  create_sum(
    a,
    b,
    a => a,
    a => a + 1
  )

console.log('sum_integers_new(1, 4)', sum_integers_new(1, 4))

const sum_cubes_new = (a, b) =>
  create_sum(
    a,
    b,
    a => cube(a),
    a => a + 1
  )

console.log('sum_cubes_new(1,4)', sum_cubes_new(1, 4))

const pi_sum_new = (a, b) =>
  create_sum(
    a,
    b,
    a => 1 / (a * (a + 2)),
    a => a + 4
  )

console.log('pi_sum_new(1, 11)', pi_sum_new(1, 11))

// 使用上面的sum求定积分
function integral(f, a, b, dx) {
  function add_dx(x) {
    return x + dx
  }
  return create_sum(a + dx / 2, b, f, add_dx) * dx
}

console.log('integral(cube, 0, 1, 0.01)', integral(cube, 0, 1, 0.01))
console.log('integral(cube, 0, 1, 0.001)', integral(cube, 0, 1, 0.001))

// ex1.29 辛普森规则计算积分
function inc(x) {
  return x + 1
}
function identity(x) {
  return x
}
function simpsons_rule_integral(f, a, b, n) {
  function get_h() {
    return (b - a) / n
  }
  function y(k) {
    return f(a + k * get_h())
  }
  function term(k) {
    return k === 0 || k === n ? y(k) : is_even(k) ? 2 * y(k) : 4 * y(k)
  }

  return create_sum(0, n, term, inc) * (get_h() / 3)
}
console.log(
  'simpsons_rule_integral(cube, 0, 1, 0.01)',
  simpsons_rule_integral(cube, 0, 1, 100)
)

// exercise 1.30
// 通用求和公式的迭代写法

function create_sum_iter(a, b, term, next) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result + term(a))
  }
  return iter(a, 0)
}

console.log(
  'create_sum_iter(0, 10, identity, inc)',
  create_sum_iter(0, 10, identity, inc)
)

// 通用的计算求积公式

function product_r(a, b) {
  function create_product_r(a, b, term, next) {
    return a > b ? 1 : term(a) * create_product_r(next(a), b, term, next)
  }
  return create_product_r(a, b, identity, inc)
}

console.log('product_r(1,4,identity,inc)', product_r(1, 4, identity, inc))

function product_iter(a, b, term, next) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), term(a) * result)
  }
  return iter(a, 1)
}
console.log(
  'product_iter(1,4,identity,iter)',
  product_iter(1, 4, identity, inc)
)

console.log('*****************************************')

// 求PI公式
// 关键点: 左右两边同时除以2
// http://c.biancheng.net/cpp/uploads/allimg/141102/1-1411021Q301403.gif
//  分子
// 1 - 2
// 2 - 2
// 3 - 4
// 4 - 4
// 5 - 6
// 6 - 6
// 7 - 8
// 8 - 8
//  分母
// 1 - 1
// 2 - 3
// 3 - 3
// 4 - 5
// 5 - 5
// 6 - 7
// 7 - 7
function approximationToPI(n) {
  function fraction(k) {
    return is_even(k) ? k : k + 1
  }
  function denominator(k) {
    return k === 1 ? 1 : is_even(k) ? k + 1 : k
  }
  function term(k) {
    return fraction(k) / denominator(k)
  }
  return product_iter(1, n, term, inc) * 2
}

console.log('approximationToPI(10)', approximationToPI(10000))

// exercise 1.32
// 基于sum和product的抽象 => accumulate

// 递归
function accumulate_r(combiner, null_value, a, b, term, next) {
  return a > b
    ? null_value
    : combiner(
        term(a),
        accumulate_r(combiner, null_value, next(a), b, term, next)
      )
}
function sum_r_accumulate(a, b, term, next) {
  function plus(x, y) {
    return x + y
  }
  return accumulate_r(plus, 0, a, b, term, next)
}

console.log(
  'sum_r_accumulate(1,10, identity, inc)',
  sum_r_accumulate(1, 10, identity, inc)
)

function product_r_accumulate(a, b, term, next) {
  function multiple(x, y) {
    return x * y
  }
  return accumulate_r(multiple, 1, next(a), b, term, next)
}

console.log(
  'product_r_accumulate(1, 10, identity, inc)',
  product_r_accumulate(1, 10, identity, inc)
)

// 迭代
function accumulate_i(combiner, null_value, a, b, term, next) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), combiner(term(a), result))
  }
  return iter(a, null_value)
}

function plus(x, y) {
  return x + y
}
function sum_i_accumulate(a, b, term, next) {
  return accumulate_i(plus, 0, a, b, term, next)
}

function product_i_accumulate(a, b, term, next) {
  function multiple(x, y) {
    return x * y
  }
  return accumulate_i(multiple, 1, a, b, term, next)
}

console.log(
  'sum_i_accumulate(1,10, identity, inc)',
  sum_i_accumulate(1, 10, identity, inc)
)
console.log(
  'product_i_accumulate(1,10,identity,inc)',
  product_i_accumulate(1, 10, identity, inc)
)

// exercise 1.33
//  带filter的accumulate
function filter_accumulate_r(combiner, null_value, a, b, term, next, filter) {
  return a > b
    ? null_value
    : combiner(
        filter(a) ? term(a) : null_value,
        filter_accumulate_r(
          combiner,
          null_value,
          next(a),
          b,
          term,
          next,
          filter
        )
      )
}

// 求[a,b]间所有素数的平方的和
function sum_of_squares_of_prime(a, b) {
  return filter_accumulate_r(plus, 0, a, b, square, inc, is_prime)
}

console.log('sum_of_squares_of_prime(1,7)', sum_of_squares_of_prime(1, 7)) // 1 + 4 + 9 + 25 + 49

export { sum_of_squares_of_larger_two, count_change, pascal_triangle, is_prime }
