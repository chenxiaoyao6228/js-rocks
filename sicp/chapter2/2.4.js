function member(item, list){
  return is_null(item) ? null : item === Head(list) ? true : member(item, tail(list))
}

console.log('member("apple", list("pear", "banana", "prune"))', member("apple", list("pear", "banana", "prune")))


// exersice 2.54
function equal(xs, ys) {
  return is_pair(xs)
          ? (is_pair(ys) &&
            equal(head(xs), head(ys)) && 
            equal(tail(xs), tail(ys)))
          : is_null(xs)
          ? is_null(ys)
          : is_number(xs)
          ? (is_number(ys) && xs === ys)
          : is_boolean(xs)
          ? (is_boolean(ys) && ((xs && ys) || (!xs && !ys)))
          : is_string(xs)
          ? (is_string(xs) && xs === ys)
          : is_undefined(xs)
          ? is_undefined(ys)
          : (is_function(ys) && xs === ys);
}
console.log('equal(list("this", "is", "a", "list"), list("this", "is", "a", "list"))', equal(list("this", "is", "a", "list"), 
list("this", "is", "a", "list")))


// 2.3.2

function is_variable(x) {
  return is_string(x);
}

function is_same_variable(v1, v2) {
  return is_variable(v1) &&
         is_variable(v2) && v1 === v2;
}

function is_sum(x) {
  return is_pair(x) && head(x) === "+";
}

function make_sum(a1, a2) {
  return list("+", a1, a2);
}

function make_product(m1, m2) {
  return list("*", m1, m2);
}

function addend(s) {
  return head(tail(s));
}

function augend(s) {
  return head(tail(tail(s)));
}

function is_product(x) {
  return is_pair(x) && head(x) === "*";
}

function multiplier(s) {
  return head(tail(s));
}

function multiplicand(s) {
  return head(tail(tail(s)));
}

function deriv(exp, variable) {
  return is_number(exp)
         ? 0
         : is_variable(exp)
         ? is_same_variable(exp, variable) ? 1 : 0
         : is_sum(exp)
         ? make_sum(deriv(addend(exp), variable),
                    deriv(augend(exp), variable))
         : is_product(exp)
         ? make_sum(make_product(multiplier(exp),
                                 deriv(multiplicand(exp),
                                       variable)),
                    make_product(deriv(multiplier(exp),
                                       variable),
                                 multiplicand(exp)))
         : error(exp, "unknown expression type -- deriv");
}

deriv(list("*", list("*", "x", "y"), list("+", "x", 3)), "x");

// exercise 2.56
function number_equal(exp, num) {
  return is_number(exp) && exp === num;
}

function base(e) {
  return head(tail(e));
}
function exponent(e) {
  return head(tail(tail(e)));
}
function make_exp(base, exp) {
  return number_equal(exp, 0)
         ? 1
         : number_equal(exp, 1)
           ? base
           : list("**", base, exp);
}
function is_exp(x) {
  return is_pair(x) && head(x) ==="**";
}

function deriv(exp, variable) {
  return is_number(exp)
         ? 0
         : is_variable(exp)
           ? (is_same_variable(exp, variable) ? 1 : 0)
           : is_sum(exp)
             ? make_sum(deriv(addend(exp), variable),
                        deriv(augend(exp), variable))
             : is_product(exp)
               ? make_sum(make_product(multiplier(exp),
                              deriv(multiplicand(exp),
                                    variable)),
                          make_product(deriv(multiplier(exp),
                                             variable),
                              multiplicand(exp)))
               : is_exp(exp)
                 ? make_product(make_product(exponent(exp),
                                    make_exp(
                                        base(exp),
                                        exponent(exp) - 1)),
              deriv(base(exp), variable))
                 : error(exp, "unknown expression type -- deriv");
}

deriv(list("**", "x", 4), "x");


// exercise 2.57
function augend(s) {
  return accumulate(make_sum, 0, tail(tail(s)));
}
function multiplicand(s) {
  return accumulate(make_product, 1, tail(tail(s)));
}