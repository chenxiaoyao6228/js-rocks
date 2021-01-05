import { myNew, Class } from './index.finish'

test('myNew', () => {
  function Person(name) {
    this.name = name
  }
  let child = myNew(Person)('york')
  expect(child).toBeDefined()
  expect(child instanceof Person).toEqual(true)
  expect(child.name).toEqual('york')
})

describe('Class', () => {
  let Animal, createDog
  beforeEach(() => {
    Animal = Class({
      construct: function(name) {
        this.name = name
      },
      statics: {
        TYPE: 'Animal'
      },
      shout() {
        return this.name
      }
    })
    createDog = function() {
      let Dog = Animal.extend({
        construct: function(name, age) {
          this.age = age
        }
      })
      let dog = new Dog('hachi', 9)
      return {
        dog,
        Dog
      }
    }
  })
  test('should return a constructor function when called', () => {
    let fn = Class({})
    expect(typeof fn).toEqual('function')
  })
  test('should add method defined in classDefinition to prototype', () => {
    expect(Animal.prototype).toBeDefined()
    expect(Animal.prototype.construct).toBeDefined()
    expect(Animal.prototype.shout).toBeDefined()
  })
  test('should call the contruct function when call new', () => {
    let animal = new Animal('animal')
    expect(typeof animal).toEqual('object')
    expect(animal.name).toEqual('animal')
  })
  describe('extend method', () => {
    test('should return a constructor function', () => {
      let { Dog } = createDog()
      expect(typeof Dog).toEqual('function')
      let Husky = Dog.extend({
        construct(name, age, fur) {
          this.fur = fur
        }
      })
      let husky = new Husky('husky', 9, 'grey')
      expect(typeof Husky).toEqual('function')
      expect(husky.fur).toEqual('grey')
    })
    test('should add method defined in classDefinition to ChildClass prototype', () => {
      let { Dog } = createDog()
      expect(Dog.prototype).toBeDefined()
      expect(Dog.prototype.construct).toBeDefined()
      expect(Dog.prototype.shout).toBeDefined()
    })
    test('should call the child contruct function when call new ', () => {
      let { dog } = createDog()
      expect(dog.age).toEqual(9)
    })
    test('should call parent method when child method is not defined', () => {
      let Dog = Animal.extend({
        construct: function(name, age) {
          this.parent.construct.apply(this, arguments)
          this.age = age
        }
      })
      let dog = new Dog('hachi', 9)
      expect(dog.shout()).toEqual('hachi')
    })
  })
  test('static method', () => {
    expect(Animal.TYPE).toEqual('Animal')
    let Dog = Animal.extend({
      construct: function(name, age) {
        this.age = age
      },
      statics: {
        TYPE: 'Dog'
      }
    })
    expect(Dog.TYPE).toEqual('Dog')
  })
})
