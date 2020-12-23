/**
 * 数组转树
 *
 * @param {*} input
 * @return {*}
 */
function arrayToTree(input) {
  let obj
  for (let item of input) {
    if (!item.parentId) obj = item
    const children = input.filter(it => it.parentId === item.id)
    item.children = children || []
    delete item.parentId
  }
  return obj
}

/**
 * 实现curriedAdd(1)(2)(3)()
 *
 * @param {*} args
 * @return {*}
 */
function add(...args) {
  //求和
  return args.reduce((a, b) => a + b)
}
function currying(fn, args = []) {
  return function temp(...innerArgs) {
    if (innerArgs.length > 0) {
      // 收集后面传入的参数
      args = [...args, ...innerArgs]
      // 返回函数供后面可以继续调用
      return temp
    } else {
      const val = fn.apply(this, args)
      // 清空参数数组，为了保证下次执行函数可以继续迭代
      args = []
      return val
    }
  }
}
const curriedAdd = currying(add)

export { arrayToTree, curriedAdd }
