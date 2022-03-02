import { trackEffect, triggerEffect } from "./effect";

class RefImp {
  private _value;
  public dep;
  constructor(value) {
    this._value = value;
    this.dep = new Set();
  }
  get value() {
    trackEffect(this.dep);
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    triggerEffect(this.dep);
  }
}

export const ref = (value) => {
  const res = new RefImp(value);
  return res;
};
