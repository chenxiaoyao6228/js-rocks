class ComputedRefImp {
  constructor(getter) {
    this._getter = getter;
  }
  get value() {
    return this._getter();
  }
}

// computed will cache the current value
export const computed = (getter) => {
  return new ComputedRefImp(getter);
};
