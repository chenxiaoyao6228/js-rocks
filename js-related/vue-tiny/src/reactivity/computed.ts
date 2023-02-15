import effect, { ReactiveEffect } from "./effect";

class ComputedRefImp {
  private _getter: any;
  private _value: any;
  private _dirty: boolean;
  private _effect: ReactiveEffect;
  constructor(getter: Function) {
    this._getter = getter;
    this._dirty = true;
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }

  get value() {
    // set firty flag the effect value changes => Effect
    if (this._dirty) {
      this._value = this._effect.run();
      this._dirty = false;
    }
    return this._value;
  }
}

// compted: should only compute when needed, will cache the old value
export const computed = (getter: Function) => {
  return new ComputedRefImp(getter);
};
