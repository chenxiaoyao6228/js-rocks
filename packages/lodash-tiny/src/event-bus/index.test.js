import EventBus from '.';

describe('eventBus', () => {
  let bus;
  beforeEach(() => {
    bus = new EventBus();
  });
  test('on and emit', () => {
    let taskASpy = jest.fn();
    let taskBSpy = jest.fn();
    bus.on('task-a', taskASpy);
    bus.on('task-b', taskBSpy);
    bus.emit('task-a');
    expect(taskASpy).toHaveBeenCalled();
    expect(taskBSpy).not.toHaveBeenCalled();
    bus.emit('task-b');
    expect(taskBSpy).toHaveBeenCalled();
  });
  test('once', () => {
    let fn = jest.fn();
    bus.once('task-a', fn);
    bus.emit('task-a');
    expect(fn).toHaveBeenCalledTimes(1);
    bus.emit('task-a');
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('off', () => {
    let fnA1 = jest.fn();
    let fnA2 = jest.fn();
    bus.on('task-a', fnA1);
    bus.on('task-a', fnA2);
    bus.emit('task-a');
    expect(fnA1).toHaveBeenCalledTimes(1);
    expect(fnA2).toHaveBeenCalledTimes(1);
    bus.off('task-a', fnA1);
    bus.emit('task-a');
    expect(fnA1).toHaveBeenCalledTimes(1);
    expect(fnA2).toHaveBeenCalledTimes(2);
  });
});
