export class MaxPQ {
  constructor() {
    this._heap = [null]
  }
  swim(k) {
    let j
    while (k > 1 && this.less(Math.floor(k / 2), k)) {
      j = Math.floor(k / 2)
      if (this._heap[j] < this._heap[k]) {
        this.swap(j, k)
      }
      k = j
    }
  }
  sink(k) {
    while (2 * k < this._heap.length - 1) {
      let j = 2 * k
      if (j < this._heap.length && this.less(j, j + 1)) j++
      if (!this.less(k, j)) break
      this.swap(k, j)
      k = j
    }
  }
  insert(n) {
    this._heap.push(n)
    this.swim(this._heap.length - 1)
  }
  delMax() {
    let max = this._heap[1]
    this.swap(1, this._heap.length - 1)
    this._heap.pop()
    this.sink(1)
    return max
  }
  less(a, b) {
    return this._heap[a] < this._heap[b]
  }
  swap(a, b) {
    let temp = this._heap[a]
    this._heap[a] = this._heap[b]
    this._heap[b] = temp
  }
}
