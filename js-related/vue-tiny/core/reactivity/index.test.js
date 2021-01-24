import { reactive, effectWatch } from './'

describe('reactive', () => {
  test('reactive and effectWatch', () => {
    let person = reactive({
      age: 19
    })
    let double
    let triple
    effectWatch(() => {
      double = person.age * 2
      triple = person.age * 3
    })
    person.age = 20
    expect(double).toEqual(40)
    expect(triple).toEqual(60)
  })
})
