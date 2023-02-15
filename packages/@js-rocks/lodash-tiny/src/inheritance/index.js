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

// 定义类, new的时候调用construct
// extend方法实现继承, 继承要调用super方法,要通过instanceOf检测
// 静态方法实现
function Class(classDefinition) {
  if (!classDefinition) throw 'should provide class definition'

  // 返回目标类的构造函数
  function getClassBase() {
    return function Base() {
      this.construct.apply(this, arguments)
    }
  }
  var Base = getClassBase()

  // 为目标类添加原型成员
  function createClassDefinition(classDefinition) {
    var parent = this.prototype['parent'] || (this.prototype['parent'] = {})
    for (var prop in classDefinition) {
      if (prop === 'statics') {
        for (var sprop in classDefinition.statics) {
          this[sprop] = classDefinition.statics[sprop]
        }
      } else {
        if (typeof classDefinition[prop] === 'function') {
          var parentMethod = this.prototype[prop]
          parent[prop] = parentMethod
        }
        this.prototype[prop] = classDefinition[prop]
      }
    }
  }
  createClassDefinition.call(Base, classDefinition)

  Base.extend = function(classDefinition) {
    var ChildClass = getClassBase()
    ChildClass.prototype = new this() // 父类的实例作为子类的prototype
    createClassDefinition.call(ChildClass, classDefinition)
    ChildClass.extend = this.extend
    return ChildClass
  }

  return Base
}

function instanceOf(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype // 取 R 的显示原型
  L = L.__proto__ // 取 L 的隐式原型
  while (L) {
    if (O === L) {
      // 当 O 严格等于 L 时，返回 true
      return true
    }
    L = L.__proto__
  }
  return false
}

export { myNew, Class, instanceOf }
