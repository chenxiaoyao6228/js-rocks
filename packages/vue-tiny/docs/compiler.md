# Compiler

## State transition diagram

## When the state machine stops

When the parser encounters a start tag, it pushes the tag into the parent stack and starts a new state machine. The parser stops the currently running state machine when it encounters an end label and there is a start label node with the same name in the parent stack.

```js
function isEnd(context, ancestors) {
  //💥: Termination condition : 1. input source empty 2. when encounter end tag of parent
  if (!context.source.length) {
    return true;
  }
  const parent = ancestors[ancestors.length - 1];
  if (parent && context.source.startsWith(`</${parent.tag}`)) {
    return true;
  }

  return false;
}
```

## Runtime compiler

### Q1: How is the runtime compiler work

```js
// import all the function from runtime-dom(eg: toDisplayString, createElementVNode, etc)
import * as runtimeDom from './runtime-dom';

function compileToFunction(template) {
  const { code } = baseCompile(template);
  const render = new Function('Vue', code)(runtimeDom);
  return render;
}
// store it to the global compiler variable
registerRuntimeCompiler(compileToFunction);
```

our template

```js
const ast = baseParse('{{message}}');
```

which will be compiled into

```js
`"const { toDisplayString:_toDisplayString } = Vue
return function render(_ctx,_cache){return _toDisplayString(_ctx.message)}"`;
```

The `Vue` variable is injected by calling

```js
const render = new Function('Vue', code)(runtimeDom); // all exported value will be assigned to `Vue`
```

The `new Function` example from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)

```js
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 6)); // a = 2, b = 6
```

### Q2: When to compile the template

Q: When to register the runtime compiler?

A: after init setup(all data are prepared)

```js
function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (compiler && !Component.render) {
    if (Component.template) {
      Component.render = compiler(Component.template);
    }
  }
  instance.render = Component.render;
}
```

The call stack is as follows:

```js
(anonymous) (VM296:3)
compileToFunction (vue-tiny.esm.js:1243)
finishComponentSetup (vue-tiny.esm.js:322)
handleSetupResult (vue-tiny.esm.js:316)
setupStatefulComponent (vue-tiny.esm.js:309)
setupComponent (vue-tiny.esm.js:297)
mountComponent (vue-tiny.esm.js:674)
processComponent (vue-tiny.esm.js:655)
patch (vue-tiny.esm.js:433)
render (vue-tiny.esm.js:417)
mount (vue-tiny.esm.js:382)
(anonymous) (main.js:6)
```
