import { myBind } from './'

describe('myBind', () => {
  test('should bound to context', () => {
    const module = {
      x: 42,
      getX: function() {
        return this.x
      },
      unboundAddToX: function(y) {
        return this.x + y
      }
    }
    let unboundGetX = module.getX
    expect(() => {
      unboundGetX()
    }).toThrow()
    let boundGetX = myBind(unboundGetX, module)
    expect(boundGetX()).toEqual(42)

    let unboundAddToX = module.unboundAddToX
    expect(() => {
      unboundAddToX(2)
    }).toThrow()
    let boundAddToX = myBind(unboundAddToX, module)
    expect(boundAddToX(2)).toEqual(44)
  })
})
