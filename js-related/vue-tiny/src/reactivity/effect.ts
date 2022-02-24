// let b = a + 1
// 期待b跟着a变化的而变化, 那么势必要拦截a的更新操作
let activeEffect: ReactiveEffect | null = null;
const targetMap = new Map();

class ReactiveEffect {
  private _fn: Function;
  private active = true;
  deps: Set<ReactiveEffect>[] = [];
  scheduler?: Function;
  onStop?: Function;
  constructor(fn: Function, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }
  run() {
    activeEffect = this;
    return this._fn();
  }
  stop() {
    if (this.active) {
      cleanUpEffect(this);
      this.onStop && this.onStop();
      this.active = false;
    }
  }
}

function cleanUpEffect(effect: ReactiveEffect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect);
  });
}

export function track(target: Record<any, any>, key: symbol | string) {
  // target -> key -> deps (array of runners)
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  dep.add(activeEffect);
  activeEffect?.deps.push(dep);
}

export function trigger(target: Record<any, any>, key: symbol | string) {
  let depsMap = targetMap.get(target);
  let deps = depsMap.get(key);
  for (const dep of deps) {
    if (dep?.scheduler) {
      dep.scheduler();
    } else {
      dep?.run();
    }
  }
  activeEffect = null;
}

type EffectOption = {
  scheduler?: Function;
  onStop?: Function;
};

export default function effect(fn: Function, options: EffectOption = {}) {
  const { scheduler, onStop } = options;
  const _effect = new ReactiveEffect(fn, scheduler);
  _effect.onStop = onStop;
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner: any) {
  // find runner from our dep and remove it
  // the problem is how to find effect since it is one of the depedency of deps
  // this solution is to attach _effect to runner when run effect()
  return runner.effect.stop();
}
