/**
 * 实现一个myNew方法
 * var p = myNew(Person)("allen");
 * p.name; //"allen"
 * @param {*} Constructor
 */
function myNew(Constructor) {
  return (...args) => {
    let instance = { __proto__: Constructor.prototype }
    Constructor.apply(instance, args)
    return instance
  }
}

export { myNew }
