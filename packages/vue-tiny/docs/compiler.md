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
