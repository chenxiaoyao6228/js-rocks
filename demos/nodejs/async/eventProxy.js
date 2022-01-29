// definition
class Proxy {
  constructor() {
    this._callbacks = [];
  }
  all() {}
  tail() {}
  after(eventName, times) {}
  emit() {}
  trigger() {}
  fail() {
    // 类似Promise.reject
  }
  done() {
    // 类似Promise.finally
  }
}

// usage

let proxy = new EventProxy();

proxy.all(
  "template",
  "data",
  "resources",
  function (template, data, resources) {
    console.log("template,data, resources", template, data, resources);
  }
);

setTimeout(() => {
  proxy.emit("template", "template-");
}, 100);
setTimeout(() => {
  proxy.emit("data", "data-");
}, 300);
setTimeout(() => {
  proxy.emit("resources", "resources-");
}, 200);
