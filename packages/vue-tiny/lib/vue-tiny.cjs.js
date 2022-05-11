'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createComponentInstance (vnode) {
  var component = {
    vnode: vnode,
    type: vnode.type,
  };
  return component;
}
function setupComponent (instance) {
  // TODO
  // initProps()
  // initSlots()
  setupStatefulComponent(instance);
}
function setupStatefulComponent (instance) {
  var Component = instance.type;
  var setup = Component.setup;
  if (setup) {
    var setupResult = setup();
    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult (instance, setupResult) {
  // function Object
  // TODO function
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }
  finishComponentSetup(instance);
}
function finishComponentSetup (instance) {
  var Component = instance.type;
  instance.render = Component.render;
}

function render (vnode, container) {
  patch(vnode, container);
}
function patch (vnode, container) {
  console.log('vnode', vnode);
  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else {
    processComponent(vnode, container);
  }
}
function processComponent (vnode, container) {
  mountComponent(vnode, container);
}
function mountComponent (vnode, container) {
  var instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}
function setupRenderEffect (instance, container) {
  var subTree = instance.render();
  patch(subTree, container);
}
function processElement (vnode, container) {
  mountElement(vnode, container);
}
function mountElement (vnode, container) {
  var el = document.createElement(vnode.type);
  var children = vnode.children,
    props = vnode.props;
  if (typeof children === 'string') {
    el.textContent = vnode.children;
  } else if (Array.isArray(children)) {
    mountChilren(vnode, container);
  }
  for (var key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      var value = props[key];
      el.setAttribute(key, value);
    }
  }
  container.append(el);
}
function mountChilren (vnode, container) {
  vnode.children.forEach(function (v) {
    patch(v, container);
  });
}

function createVNode (type, props, children) {
  var vnode = {
    type: type,
    props: props,
    children: children,
  };
  return vnode;
}

function createApp (rootComponent) {
  return {
    mount: function (rootContainer) {
      var vnode = createVNode(rootComponent);
      render(vnode, rootContainer);
    },
  };
}

function h (type, props, children) {
  return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
