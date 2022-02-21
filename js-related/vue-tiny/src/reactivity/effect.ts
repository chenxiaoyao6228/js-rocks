// let b = a + 1
// 期待b跟着a变化的而变化, 那么势必要拦截a的更新操作
let activeEffect: ReactiveEffect | null = null;
const targetMap = new Map();

class ReactiveEffect {
  private _fn: Function;
  constructor(fn: Function) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    this._fn();
  }
}

export function track(target: Record<any, any>, key: symbol | string) {
  // target -> key -> deps
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
}

export function trigger(target: Record<any, any>, key: symbol | string) {
  let depsMap = targetMap.get(target);
  let deps = depsMap.get(key);
  for (const dep of deps) {
    dep.run();
  }
  activeEffect = null;
}

export default function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  return _effect;
}
