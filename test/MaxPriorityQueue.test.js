import { MaxPQ } from '../src/MaxPriorityQueue'

describe('MaxPQ', () => {
  let pq
  beforeEach(() => {
    pq = new MaxPQ()
  })
  afterEach(() => {
    pq = null
  })
  test('swim', () => {
    pq._heap = [null, 19, 18, 14, 16, 15, 17, 13]
    pq.swim(6)
    expect(pq._heap).toEqual([null, 19, 18, 17, 16, 15, 14, 13])
  })
  test('sink', () => {
    pq._heap = [null, 19, 18, 14, 16, 15, 17, 13]
    pq.sink(3)
    expect(pq._heap).toEqual([null, 19, 18, 17, 16, 15, 14, 13])
  })
  test('insert', () => {
    pq._heap = [null, 19, 18, 17, 16, 15, 14, 13]
    pq.insert(20)
    expect(pq._heap).toEqual([null, 20, 19, 17, 18, 15, 14, 13, 16])
  })
  test('delMax', () => {
    pq._heap = [null, 20, 19, 17, 18, 15, 14, 13, 16]
    pq.delMax()
    expect(pq._heap).toEqual([null, 19, 18, 17, 16, 15, 14, 13])
  })
})
