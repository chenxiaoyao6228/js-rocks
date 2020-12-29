import { myNew } from './index.finish'

test('myNew', () => {
  function Person(name) {
    this.name = name
  }
  let child = myNew(Person)('york')
  expect(child).toBeDefined()
  expect(child instanceof Person).toEqual(true)
  expect(child.name).toEqual('york')
})
