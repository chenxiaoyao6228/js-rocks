class Dep {
  constructor() {
    this.effects = new Set()
  }
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
  }
  notice() {
    this.effects.forEach(effect => {
      effect() // effect调用的时候不需要传入dep.value
    })
  }
}

let targetMap = new Map()

function getDeps(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

export function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      // 要为每一个key进行依赖收集
      let dep = getDeps(target, key)
      // 依赖收集
      dep.depend()
      // 返回值
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      let dep = getDeps(target, key)
      let result = Reflect.set(target, key, value)
      // 通知
      dep.notice()
      return result
    }
  })
}

let currentEffect
export function effectWatch(effect) {
  currentEffect = effect
  effect()
  currentEffect = null
}
