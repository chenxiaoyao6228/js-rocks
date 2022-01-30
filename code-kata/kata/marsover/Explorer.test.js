import Explorer from './Explorer'
describe('explorer', () => {
  let explorer
  beforeEach(() => {
    explorer = new Explorer()
    explorer.init(0, 0, 'N')
    expect(explorer.x).toBe(0)
    expect(explorer.y).toBe(0)
    expect(explorer.dir).toBe('N')
    // 坐标方向为(x,y) => (E, N)
    explorer.search(1000, 500)
    expect(explorer.searchLength).toBe(1000)
    expect(explorer.searchWidth).toBe(500)
  })
  afterEach(() => {
    explorer = null
  })
  test('turn', () => {
    explorer.turn('l')
    expect(explorer.dir).toBe('W')
    explorer.turn('l')
    expect(explorer.dir).toBe('S')
    explorer.turn('l')
    expect(explorer.dir).toBe('E')
    explorer.turn('l')
    expect(explorer.dir).toBe('N')
    explorer.turn('r')
    expect(explorer.dir).toBe('E')
    explorer.turn('r')
    expect(explorer.dir).toBe('S')
    explorer.turn('r')
    expect(explorer.dir).toBe('W')
    explorer.turn('r')
    expect(explorer.dir).toBe('N')
  })
  test('head north and move', () => {
    explorer.dir = 'N'
    explorer.move('f', 50)
    expect(explorer.y).toBe(50)
    explorer.move('b', 50)
    expect(explorer.y).toBe(0)
  })
  test('head south and move', () => {
    explorer.dir = 'S'
    explorer.move('f', 50)
    expect(explorer.y).toBe(-50)
    explorer.move('b', 50)
    expect(explorer.y).toBe(0)
  })
  test('head east and move', () => {
    explorer.dir = 'E'
    explorer.move('f', 50)
    expect(explorer.x).toBe(50)
    explorer.move('b', 50)
    expect(explorer.x).toBe(0)
  })
  test('head west and move', () => {
    explorer.dir = 'W'
    explorer.move('f', 50)
    expect(explorer.x).toBe(-50)
    explorer.move('b', 50)
    expect(explorer.x).toBe(0)
  })
  test('report location', () => {
    explorer.move('f', 100)
    expect(explorer.report()).toEqual([0, 100])
    explorer.move('f', 100)
    expect(explorer.report()).toEqual([0, 200])
    explorer.turn('r')
    explorer.move('f', 100)
    expect(explorer.report()).toEqual([100, 200])
  })
})
