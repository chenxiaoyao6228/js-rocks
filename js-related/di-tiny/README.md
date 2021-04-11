# dependency-injection-tiny

## 导语

> 学习《build-your-own-angular》的时候学到了**依赖注入**的概念，为了更加深入理解， 找了许多资料，本文简单介绍了依赖注入，并提供了许多外链， 个人觉得不错， 特此分享。
> 原文来自[A quick intro to Dependency Injection: what it is, and when to use it](https://medium.com/free-code-camp/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f)，版权归原作者所有

## 简介

> 在软件工程中， **依赖注入**是指一种使用一个对象(或者静态方法)为另外一个对象提供依赖的技术。一个依赖可以是一个可用作服务的方法。

上面是维基百科对**依赖注入**的解释，并不容易理解， 我们换个方式来理解这个概念。

在开始理解**依赖注入**的概念之前， 我们先来了解一下编程中的**依赖**：

> 当 A 类使用了 B 类中的某些功能的时候，我们就说 B 类是 A 类的一个依赖

![](https://miro.medium.com/max/700/1*0P-1JhnUaZeobDUAajIbhA.jpeg)

在 Java 中， 在开始使用其他类的方法之前，我们必须为该类创建实例。(比如 A 类需要创建 B 类的实例)

因此， **将创建实例的任务交给其他人去做，直接使用生成的依赖的方式就称之为依赖注入**

![](https://miro.medium.com/max/1000/1*TF-VdAgPfcD497kAW77Ukg.png)

## 为什么要使用依赖注入

假设我们有一个包含了许多属性如 wheels, engine 的 car 类

```java
class Car {
  private Wheels wheel = new AWheels();
  private Battery battery = new ABattery();
  ....
}
```

这里的 Car 类负责创建依赖的对象。现在新需求来了，我们希望未来将 A 轮子换成 B 轮子。

上述的方案下， 我们需要重新创建带有 B 轮子的 Car 类， 但如果使用**依赖注入**的方式， 我们可以在运行的时候改变轮子， 因为依赖是在运行的时候被注入的而不是编译的时候。

你可以将**依赖注入**看成代码中的中间人, 其主要职责是代替 Car 类创建需要的轮子对象并传递给 Car 类。

## 三种依赖注入的方式

1. 构造器注入：依赖通过一个类构造器提供
2. setter 注入：客户端暴露一个给注入器(injector)注入依赖的 setter 方法
3. 接口注入：依赖提供了一个 injector 方法，为传入的任意客户端注入依赖。 客户端必须实现一个接受依赖的 setter 方法。

```java
class Car{
  private Wheels wheel;
  private Battery battery;

/*在代码中的某处我们初始化该类的依赖
下面是两种基于依赖注入的实现方式
*/
// 基于Constructor
Car(Wheel wh, Battery bt) {
  this.wh = wh;
  this.bt = bt;
}
// 基于Setter
void setWheel(Wheel wh){
  this.wh = wh;
}
...
...
// 剩余代码
}
```

总结起来**依赖注入**的职责就是

1. 创建对象
2. 了解类依赖的对象
3. 为类提供这些对象

如果这些对象发生了变化， 那么**依赖注入**会负责处理这些变化， 并将合适的对象传递给类本身。

## 控制反转-依赖注入的背后逻辑

这表明类不应该静态配置其依赖项，而是由外部的其他类进行配置。

这也是由[Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin?source=post_page---------------------------)提出的五大面向对象设计原则 SOLID 中的第五个原则--类应该抽象而不是具体的结构（简单来说，硬编码）

根据该原则， 一个类应该将关注点放在满足职责上， 而不必关心如何创建履行这些职责的对象。这也就是依赖注入发挥的作用: 它为类提供所需的对象。

注： 如果你想要了解更多有关 SOLID 原则你可以点击[这里](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design?source=post_page---------------------------#toc-single-responsibility-principle)

## 依赖注入的优点

1. 易于单元测试
2. 减少冗余代码， 初始化依赖的工作交由 injector 模块完成
3. 应用程序易于扩展。
4. 有助于实现松耦合，这在应用程序编程中很重要

## 依赖注入的缺点

1. 学习起来有点复杂，如果过度使用会导致管理问题和其他问题。
2. 许多编译时错误就能发现的错误到运行时才会被发现
3. 依赖注入框架通过反射和动态编程来实现，这可能会妨碍 0IDE 自动化的使用，例如“查找引用”，“显示调用层次结构”和安全重构.

你可以实现自己的依赖注入框架或者使用第三方的库

实现了依赖注入的库或者框架

- [Spring (Java)](https://www.tutorialspoint.com/spring/spring_dependency_injection.htm?source=post_page---------------------------)
- [Google Guice (Java)](https://github.com/google/guice?source=post_page---------------------------)
- [Dagger (Java and Android)](http://square.github.io/dagger/?source=post_page---------------------------)
- [Castle Windsor (.NET)](https://github.com/castleproject/Windsor?source=post_page---------------------------)
- [Unity(.NET)](https://www.microsoft.com/en-us/download/details.aspx?id=39944&source=post_page---------------------------)

两个 javascript 的依赖注入框架

- [Di-Ninja](https://di-ninja.github.io/di-ninja/?source=post_page---------------------------)
- [knifecycle](https://github.com/nfroidure/knifecycle?source=post_page---------------------------)

要了解有关依赖注入的更多信息，您可以查看以下资源：

- [Java Dependency Injection — DI Design Pattern Example Tutorial — JournalDev](https://www.journaldev.com/2394/java-dependency-injection-design-pattern-example-tutorial?source=post_page---------------------------)
- [Using dependency injection in Java — Introduction — Tutorial — Vogella](http://www.vogella.com/tutorials/DependencyInjection/article.html?source=post_page---------------------------)
- [Inversion of Control Containers and the Dependency Injection pattern — Martin Fowler](https://www.martinfowler.com/articles/injection.html?source=post_page---------------------------)

## 参考

[Tero Parviainen Build Your Own AngularJS HD](https://www.youtube.com/watch?v=3ju-32Bcx1Q&ab_channel=ScotlandJS)
