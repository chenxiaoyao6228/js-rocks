import eventBus from './'

describe('eventBus', () => {
  let bus
  beforeEach(() => {
    bus = new eventBus()
  })
  test('on and emit', () => {
    let taskASpy = jest.fn()
    let taskBSpy = jest.fn()
    bus.on('task-a', () => {
      taskASpy()
    })
    bus.on('task-b', () => {
      taskBSpy()
    })
    bus.emit('task-a')
    expect(taskASpy).toHaveBeenCalled()
    expect(taskBSpy).not.toHaveBeenCalled()
    bus.emit('task-b')
    expect(taskBSpy).toHaveBeenCalled()
  })
  test('once', () => {
    let fn = jest.fn()
    bus.once('task-a', () => {
      fn()
    })
    bus.emit('task-a')
    expect(fn).toHaveBeenCalledTimes(1)
    bus.emit('task-a')
    expect(fn).toHaveBeenCalledTimes(1)
  })
  test('off', () => {
    let fn = jest.fn()
    bus.on('task-a', () => {
      fn()
    })
    bus.emit('task-a')
    expect(fn).toHaveBeenCalledTimes(1)
    bus.off('task-a')
    bus.emit('task-a')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
