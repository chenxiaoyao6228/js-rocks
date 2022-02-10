## Classes

### 基本

```ts
class Point {
  x = 0;
  y = 0;
}
```

`--strictPropertyInitialization`, class 中声明的属性必须要在 constructor 中初始化

```ts
class GoodGreeter {
  name: string;
  constructor() {
    this.name = "hello";
  }
}
```

getters/setters

> 请注意，没有额外逻辑的字段支持的 get/set 对在 JavaScript 中很少有用。如果您不需要在 get/set 操作期间添加额外的逻辑，则可以公开公共字段。

### implements

可以用接口来约束类的实现

```ts
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping(): void {
    console.log("lalalla-------");
  }
}

class Ball implements Pingable {
  pong(): void {
    console.log("lalalla-------"); //报错
  }
}
```

implements 没有改变 class 的类型, 不会检查内部的函数

```ts
interface Checkable {
  check(name: string): boolean;
}
class NameChecker implements Checkable {
  check(s) {
    //Parameter 's' implicitly has an 'any' type. Notice no error here
    return s.toLowercse() === "ok";
  }
}
```

### extends

继承父类的子类拥有父类的所有属性和方法

ps: extends参见`extend`的笔记, 表示**两个集合的所属关系**, 下面的例子中, `Dog`是`Animal`的子集 

```ts
class Animal {
  move() {
    console.log("Moving along!");
  }
}
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
const d = new Dog(); // Base class method
d.move(); // Derived class method
d.woof(3);
```
