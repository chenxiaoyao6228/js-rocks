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

// exercise 1.17
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

export { sum_of_squares_of_larger_two, count_change, pascal_triangle }
