# 现代JavaScript语言

这篇文章主要介绍如何编写面向对象的JavaScript。我们先从现代JavaScript语言的基本概念开始介绍，然后讲解this关键字。在有了这两个基础之后，我们将正式认识JavaScript语言中的面向对象编程：封装，继承和多态。这篇文章的第二部分将介绍ES6语法，其本质是语法糖，抹上一层语法糖会使得你的JS看起来更甜，这一部分也会介绍箭头函数，也就是其他编程语言中大名鼎鼎的Lambda表达式，但不会过多的涉及函数式编程的概念。最后，介绍异步的JavaScript，比如怎样使用JS向服务端发送异步请求，然后获得并处理结果。看完这篇文章后，你将对JavaScript这门编程语言有成体系化的理解。对于以后理解和掌握基于JS的其他语言，比如TypeScript都会很有帮助。

就让我们开始新的旅程吧！

# 一. 面向对象的JavaScript

基础概念部分将介绍几个重要的基本概念：作用域，执行上下文，闭包和this关键字。通过掌握作用域的知识，我们能够把握程序中什么变量在什么位置范围是有效的，而离开了那个范围之后就会失效。之后跟着一小段程序示例，我们一步一步推导执行上下文是怎么在内存中为变量建立内存模型的，弄清楚这两个概念就能够对编程有更深入的理解。最后，会介绍闭包(closure)这个稍微有点难理解的概念。搞懂这些概念对于学习任何编程语言都是有帮助的，你可以轻而易举地将在JS这里学到的知识迁移到其他任何编程语言中。this关键字是JS中另一个比较复杂的概念，也是用的不好容易出bug的地方，但只要我们在理解的过程中注意把握一个关键概念，很多看似纷繁复杂的东西就能迎刃而解。

在上述基本概念的基础上，我们将从封装，继承和多态入手，学习在JavaScript中进行面向对象编程的各种模式和技巧。乍一看很复杂，没有别的编程语言那么直观，但是不要担心，后面会有甜甜的语法糖来帮你减轻知识负担。

## 1.1 基础概念

### 1.1.1 作用域

JS中第一个重要的概念是作用域。在程序中可以通过变量名访问一个变量而不产生错误的区域，叫做这个变量的词法作用域。初始的作用域被称为全局作用域，任何在函数外面定义的变量，都具备全局作用域：

```javascript
var hero = aHero();
```

全局作用域是在多个js文件中共享的，也就是说在这个文件中访问另一个文件中定义的全局变量是完全合法的。在全局作用域的基础上，每次我们新定义一个函数，在这个花括号包围的函数体中就会创造出一个新的词法作用域。在这个词法作用域中定义的变量的生命周期就比全局作用域中的要小得多。这里要注意：1. 函数体中可以访问全局变量；2. 函数体可以访问在函数中定义的变量，但离开了函数体就不能被访问了；4. 如果所定义的变量a和全局作用域中的变量b重名，那么变量a就会覆盖掉变量b，直到离开函数所在的词法作用域。

在ES6语法出现之前，定义变量的最佳实践是使用var关键字，缺少var关键字变量会变成全局作用域：

```javascript
var hero = aHero();
var newSaga = function() {
  foil = afoil();
}
log(foil); // OK
```

这容易产生问题，因为此时foil自动变成全局变量，具有全局作用域，这将对阅读代码的人造成很大的困惑，所以在任何时候都要避免这样做。**一定要注意**，只有函数定义会创建新的词法作用域，条件和循环语句则不会，比如下面这段代码，在条件判断语句中定义的变量具有的是全局作用域，这是与其他编程语言不同的地方，要注意：

```javascript
var hero = aHero();
if (checkSomething()) {
  var foil = afoil();
}
log(foil); // OK
```

词法作用域是**静态**的概念，不用运行程序凭肉眼就能判断。一旦程序开始执行，解释器就会在内存中构建自己的存储系统存放变量名和对应的值，专业一点的说法叫**内存模型**。内存模型会形成自己的作用域，称为**执行上下文（execution context）**。不同于词法作用域，执行上下文是一边运行一边动态构建的，以下面这段代码为例，一步一步跟踪看看执行过程中解释器是怎么建立起执行上下文的：

```javascript
var hero = aHero();
var newSaga = function() {
  var foil = afoil();
  var saga = function() {
    var deed = aDeed();
    log(hero+deed+foil);
  };
  saga();
  saga();
}
newSaga();
newSaga();
```

在执行第一行代码之前，解释器会在内存中创建一个全局的执行上下文，对应全局作用域，因此都用浅绿色的区块来表示，如下图：

![](./execution_context_1.png)

代码的前两行是变量定义，因此对应的执行上下文中会创建两个变量，hero变量指向字符串，newSaga变量指向一个函数定义，因为这里只是定义而没有执行，所以执行上下文会暂时忽略函数内部，而不会建立新的执行上下文，要记住，函数只有在执行的时候才会建立执行上下文。

![](./execution_context_2.png)
​			

当代码执行到第一个`newSaga()`时开始执行函数调用，此时内存中将为这个函数创建一个新的执行上下文，如下图中红色区块所示。我们来看一下当一行一行执行红色部分代码时，新的执行上下文是怎么一步一步创建起来的。

![](./execution_context_3.png)

当执行函数中的代码时，变量的定义会在内存中建立起一一映射的模型，我们在`newSaga()`函数中定义了两个变量`foil`和`saga`，其中saga存储的是另一个新的函数定义。因此这里也将暂时忽略而不会在内存中创建新的执行上下文。

![](./execution_context_4.png)

接着，开始执行`newSaga()`函数中的`saga()`函数，此时内存中新建了蓝色部分的新的执行上下文。定义变量`deed`时会在蓝色区块中建立相应的变量映射。

![](./execution_context_5.png)

代码执行到`log(hero+deed+foil)`时，会由内向外查找变量的定义。先从蓝色的执行上下文中查找，发现找不到`hero`变量，于是向上一层，在红色部分查找，还是没有找到。最后再向上一层，在绿色部分找到了变量`hero`的定义。

![](./execution_context_6.png)

查找变量`deed`要容易一些，因为它的定义就在当前的执行上下文中，所以直接就能定位到了：

![](./execution_context_7.png)

查找变量`foil`，需要向上一层在红色的执行上下文中找到：

![](./execution_context_8.png)

`log()`函数输出结果为"GalEyesCow"，第一个`saga()`函数调用执行完毕。

![](./execution_context_9.png)

完成上面这些步骤，可能你还是没看出来词法作用域和执行上下文有什么区别。对比左右两张图，好像差不多都一样的，但是一旦开始执行第二个`saga()`函数调用，你就知道执行上下文不同于词法作用域的地方了。

![](./execution_context_10.png)

执行第二个`saga()`函数时，它会动态的创建新的执行上下文，与新的函数调用相对应。新的蓝色区块对应着第二次函数调用，它创建了一个新的`deed`变量，在内存中对应的值为"Tips"。

![](./execution_context_11.png)

当再次执行到`log(hero+deed+foil)`函数调用时，仍然会重复上面的步骤，由内向外在不同的执行上下文中查找各变量的定义，并输出"GalTipsCow"。

![](./execution_context_12.png)

此时，第一个`newSaga()`函数算是执行完毕了，当我们再次执行第二个`newSaga()`函数时，就会重复上面的步骤，建立第二个红色+蓝色的执行上下文。

![](./execution_context_13.png)

同样地，会输出"GalRubsCat"和"GalRobsCat"。注意这里的两个红色区块中都创建了诸如`foil`，`saga`和 `deed`等变量，但它们在内存中对应的值是不一样的。

![](./execution_context_14.png)

通过单步执行来观察执行上下文的创建过程，我们能深入理解程序是如何执行的，也更能深刻理解变量是怎么被定位到的，关键就是要记住**每执行一次函数就会创建一个新execution context**。

### 1.1.2 闭包

闭包(Closure)是一个与作用域有关的高级概念。简单地说，就是能访问到其外围作用域变量的函数，此时外围作用域已经执行结束了。这个概念看起来有些复杂，但如果我们使用上面的执行上下文来观察代码的执行过程，就能弄懂它的核心原理，这里先记住一句话：**新context永远被创建在定义它的函数context中**。示例代码如下：

```javascript
var sagas = [];
var hero = aHero();
var newSaga = function() {
  var foil = aFoil();
  sagas.push(function() {
    var deed = aDeed();
    log(hero+deed+foil);
  });
};
newSaga();
sagas[0]();
sagas[0]();
newSaga();
sagas[0]();
sagas[1]();
sagas[0]();
```

还是老办法，我们自己来模拟一遍解释器执行代码的顺序。首先，解释器会在内存中建立全局执行上下文：

![](./closure1.png)

前两行定义变量，解释器会在内存中分别建立变量的映射关系。

![](./closure2.png)

变量`newSaga`定义了一个函数体，在该函数体中定义了一个变量`foil`。然后向全局变量`sagas`数组中放入了一个函数对象。所以解释器会暂时忽略掉红色和蓝色部分，建立新的变量映射。

![](./closure3.png)

接下来正式调用`newSaga()`函数，函数在调用时会创建新的执行上下文，如下图中红色区块所示。

![](./closure4.png)

定义变量`foil`时，在红色区块的执行上下文中创建了变量映射。

![](./closure5.png)

接下来，将新创建的函数对象放入到sagas数组中，`newSaga()`函数执行结束。

![](./closure6.png)

接下来，第一次执行函数对象`sagas[0]()`，创建蓝色区块表示的执行上下文。

![](./closure7.png)

一旦我们定义变量`deed`，蓝色区块的执行上下文中就会建立对应的变量映射。

![](./closure8.png)

`log(hero+deed+foil)`函数会打印输出对应的值"BoyEyesRat"。

![](./closure9.png)​	

当第二次执行`sagas[0]()`函数时，将创建新的执行上下文，如下图中第二个蓝色区块所示。

![](./closure10.png)

按照同样的函数执行流程，这里会建立新的`deed`变量的内存映射。然后打印输出"BoyDigsRat"。

![](./closure11.png)

当我们第二次执行`newSaga()`函数时，会创建一个新的执行上下文，如下图中第二个红色区块所示。在这个红色区块中解释器建立了第二个`foil`变量的内存映射。	

![](./closure12.png)

这个时候，如果我们再一次执行`sagas[0]()`函数会怎样？你觉得解释器会把它放到什么位置？其实和上面一样，解释器**一定会在原来定义它的执行上下文中创建新的执行上下文**，所以这里的函数调用仍然在第一个红色区块表示的执行上下文中创建了新的执行上下文，并将值为"Pins"的`deed`变量建立在里面，因为这个函数当初就是在这个执行上下文中被定义的，如下图所示。

![](./closure13.png)

聪明的你肯定判断出来了，因为这里的`sagas[1]()`函数是在第二个红色区块表示的执行上下文中被创建的，因此这里的调用会在第二个红色执行上下文中创建新的执行上下文。

![](./closure14.png)

在新的蓝色执行上下文中，将创建新的变量`deed`，并得到值"Gets"，函数打印输出"BoyGetsET"。

![](./closure15.png)

最后一步再次执行了`sagas[0]()`，这个函数的执行仍然会在第一个红色区块表示的执行上下文中创建新的执行上下文，并创建新的变量`deed`，这次它的值为"Eats"。

![](./closure16.png)

所以最后这一次函数调用，将打印输出"BoyEatsRat"。

![](./closure17.png)

只要能把握"**解释器会在原来定义它的执行上下文中创建新的执行上下文**"这个核心，就能理解闭包这个概念。​

### 1.1.3 this关键字

每一个面向对象的编程语言都有一种方式来指定一个变量来表示当前对象。和很多编程语言一样，JavaScript使用this关键字来表示当前对象；和很多编程语言不一样，JavaScript的this关键字是一个很容易被误解的概念。把握一个关键概念this关键字绑定问题就好理解了：调用时确定。即**直到调用的那一刻（位置）才确定**，下面我们通过一个例子来看this绑定的7种规则。示例代码如下：

```javascript
var fn = function(one, two) {
  log(this, one, two);
};
var r={}, g={}, b={};
```

#### 1.1.3.1 规则一："the left of dot" rule

如果函数作为对象成员方法通过`obj.fn(x, y)`的方式调用，那么this关键字将绑定为obj对象。举例：

```javascript
r.method = fn;
r.method(g, b); // 此时this关键字被绑定为对象r
```

#### 1.1.3.2 规则二：直接调用

如果是下面这种情况就有意思了：

```javascript
fn(g, b);
```

答案是：this将被绑定为全局对象`<global>`，但如果是strict模式，则为`undefined`。

#### 1.1.3.3 规则三：call()/apply()

如果对象r并没有叫fn的属性，我们是不能通过`r.fn()`的方式去访问的，这个时候可以使用`fn.call()`的形式，`call()`会重写调用规则，以下两种形式中this关键字的绑定规则都会被改写：

```javascript
fn.call(r, g, b); // this --> r
r.method.call(y, g, b); // this --> y
```

比如下面定义的这两个函数，可以使用`.call()`方法：

```javascript
var product = function(num, b) {
  return num * b;
};

var double = function() {
  return product(this, 2);
};

double.call(3); // 3 --> this
```

#### 1.1.3.4 函数作为回调传递给其他函数

如果将fn传递给`setTimeout()`函数又会怎么样呢：

```javascript
setTimeout(fn, 1000);
```

从这行代码仍然是看不出来的，我们的原则还是要从函数调用的那一刻进行判断，所以这里需要查看`setTimeout()`的源代码。

```javascript
var setTimeout = function(cb, ms) { // 这里只是setTimeout的模拟代码
  waitSomehow(ms);
  cb();
}
```

直接作为回调函数调用的话`one`和`two`没有绑定任何变量，所以是`undefined`。此时this关键字将被绑定为全局对象`<global>`。下面再看一种比较tricky的情况：

```javascript
setTimeout(r.method, 1000);
```

可能有人会觉得`method`方法是`r`对象的属性，这样传参this参数会不会和`r`有什么关系？答案是否定的，因为关键还是在函数被调用的那一刻来判断this的绑定，因此这里仍然是`<global>`全局对象，而且这里的参数`one`和`two`仍然被绑定为undefined，正确的做法应该是再增加一个函数对象，并在函数对象中进行方法调用：

```javascript
setTimeout(function() {
  r.method(g, b);
}, 1000);
```

此时this关键字绑定为`r`，`one`绑定为`g`，`two`绑定为`b`。而下面这种在全局作用域直接访问this关键字的行为，this将被绑定为`undefined`：

```javascript
log(this);
```

#### 1.1.3.5 规则五：new r.method(g, b)

```javascript
new r.method(g, b);
```

此时this关键字将因为`new`的作用而被绑定到一个后台自动创建的匿名对象上，因为每一次new都会生成新对象。

#### 1.1.3.6 规则六：fn.bind()
fn.bind()创建新函数，this将永久地被绑定到了bind的第一个参数：

```javascript
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

#### 1.1.3.7 规则七：箭头函数

箭头函数表达式中`this`关键字的绑定取决于这个函数在代码中的位置，它会根据当前上下文继承this。先看一个普通函数的例子：

```javascript
// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  setTimeout(function() {
    this.scoops++;
    console.log('scoop added!');
  }, 500);
};

const dessert = new IceCream();
dessert.addScoop();
```

这段代码执行后，dessert.scoops的值并不是1，而是0。为什么呢？因为半毫秒后`setTimeout()`回调的函数中，this绑定的是全局对象，所以实际上创建了一个`scoops`变量，默认值为`undefined`，`++`之后变为`NaN`。解决这个问题的方法之一是使用闭包：

```javascript
// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  const cone = this; // 设置this给cone变量
  setTimeout(function() {
    cone.scoops++; // 引用cone变量
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

这里`dessert.addScoop()`在调用时`this`绑定为`dessert`，我们在`addScoop()`成员函数中将其赋值给cone。而传递给`setTimeout()`函数的回调是一个闭包，因此`scoops`成员变量得到正确的自增。使用箭头函数表达式，能一步到位解决这个问题，因为箭头函数会根据它在代码中的位置自动绑定this，箭头函数内和箭头函数外的this是一样的：

```javascript
// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  setTimeout(() => { // 一个箭头函数被传递给setTimeout
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

这里传递给`setTimeout()`函数的是一个箭头函数，它从周围上下文中继承的this关键字绑定了dessert对象，因此可行。但如果我们将 `addScoop()` 方法改为箭头函数就不可行了：

```javascript
// 构造函数
function IceCream() {
    this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = () => { // addScoop 现在是一个箭头函数
  setTimeout(() => {
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

这里的箭头函数从周围上下文继承到的this绑定给了全局对象，传递给`setTimeout()`的函数中的`this`也成了全局对象。

## 1.2 面向对象

其实你早就在JavaScript中用上对象了，只是你一直都没感觉到而已。JS这个编程语言和Python很像，都是**万物皆对象**的语言，甚至**函数本身也是一个特殊的对象**。我们将从各种设计模式入手来学习一下在JS中进行面向对象编程的基本方法以及它们的优劣。JS的面向对象编程一共有如下几种常见方法：**原型链**，**对象修饰器**，**函数类**，**原型类**和**伪类模式**，此外我们还需要掌握**超类**，**子类**以及**伪类子类**等知识。

### 1.2.1 原型链

如果想让两个对象拥有一些相同的属性，使用拷贝是一种效率不高的做法，既不节省内存又存在重复的代码。JavaScript提供的**原型链（prototype chain）**就是用来解决这个问题的方法，它使得一个对象拥有另一个对象的全部属性。熟悉其他编程语言的同学应该从它的名字上感受到它是怎么实现的：不是通过拷贝，而是通过"链"的方式将字段查找委派给其他对象。我们从一个例子开始讨论：

```javascript
var gold = {a:1};
log(gold.a); // 1
log(gold.z); // undefined
```

当我们访问对象中的某个属性时，解释器会查找该对象中是否有这个属性，如果有就返回值，如果没有就返回undefined。现在我们需要定义另一个和`gold`很相似的变量`blue`，如果我们使用`extend()`函数以拷贝的方式来实现，那么以这种方式定义的变量`blue`就只有在拷贝的那一刻与`gold`相同，之后它们就是完全不同的两个变量了：

```javascript
var gold = {a:1};
log(gold.a); // 1
log(gold.z); // undefined

var blue = extend({}, gold); // 很多JS库都带有extend()函数
blue.b = 2;
log(blue.a) // 1
```

当然，如果此时我们输出`blue.a`的值，解释器一定会在该变量上找到这个属性并输出，因为这个属性是复制过来的。但使用原型链的方式创建的新对象，则和原来的对象之间建立了某种联系：解释器一旦在新对象上找不到对应的属性，就会沿着这条链到之前的对象上去寻找，使用原型链创建对象的方法很简单，调用`Object.create()`函数，该函数的参数就是被"链接”的对象：

```javascript
var rose = Object.create(gold);
rose.b = 2;
log(rose.a);
```

如果要在`rose`对象上查找`a`属性，解释器如果找不到就跑到`gold`对象上去找并输出值。与复制粘贴相比，原型链创建的对象会与被链接的对象持续保持这样的"关系"。如果此时我们在`gold`变量上新增一个属性`z`，当我们访问`blue`对象上的`z`属性时就无法访问到它，但是`rose`对象却可以：

```javascript
gold.z = 3;
log(blue.z); // undefined
log(rose.z); // 3
```

原型链非常有用，实际上JavaScript中所有的对象都会链接到一个最高层级的对象，它为所有的对象提供了通用的基本方法，它被称作**对象原型(object prototype)**。当我们访问一个对象的`.toString()`属性时，将沿着这个链一路访问到对象原型，然后访问这个函数，被解释器查找的对象在点号的左边。得益于this关键字的动态绑定，我们总能访问到正确的对象。对象原型中还有其他一些很有用的辅助方法，比如`.constructor`可以用于确认创建某个对象时使用了哪个函数。JavaScript中的一些特殊对象还拥有一些所有对象基本属性之外的其他特性，比如数组对象就拥有`.indexOf()`和`.slice()`方法。这些方法存储在数组原型中，数组原型自身链接到对象原型上。数组原型甚至会定义自己的`.constructor`和`.toString()`属性，当访问这些属性时，解释器一旦查找到对应的属性就不会再往上查找了。说到这里，熟悉其他编程语言的同学应该也看出来了，这不就是传说中的**继承(inheritance)**么，这是一种共享代码和节约内存的有效方式。

### 1.2.2 对象修饰器

**对象修饰器(object decorator)**是一种最简单和最直观的对象创建模式。以一个小游戏为例，这个游戏中有很多车辆，玩家需要避开这些行驶中的车辆。这个游戏系统需要记录很多运动实体的数据。我们可以从游戏中的车辆入手进行代码编写。

```javascript
var amy = {loc: 1};
amy.loc++;
var ben = {loc: 9};
ben.loc++;
```

这么写代码可能会比较累，如果我们要创建很多对象，而这些对象看起来都差不多怎么办？不管用什么语言编写代码，我们一定要注意尽量**避免重复的代码**，一旦发现代码中出现重复的痕迹，就要及时着手重构：

```javascript
var move = function(car) {
  car.loc++;
};

var amy = {loc: 1};
move(amy);
var ben = {loc: 9};
move(ben);
```

看上去重构并没有什么明显的效果，我们虽然把重复的代码提取到一个函数中，但代码量似乎还增加了。这种提取重复代码的重构是不是没有意义呢？其实不是，它至少有两点好处。首先，如果你在开发的是一款真实的游戏，可能`move()`函数不会有这么简单，如果它很复杂怎么办？

```javascript
var move = function(car) {
  removeCarFromScreen(car.loc);
  addDustSwirlToScreen(car.loc);
  car.loc++;
  addCarToScreen(car.loc);
};
```

你不想每次都为汽车对象重复敲一遍上面的代码对吧；其次，如果你需要修改汽车移动的代码，那么只改一个地方是最好的了，如果代码散步在各个角落，你只要改漏一个地方，程序就可能会出bug。所以还是把重复代码提取到一个地方比较好。

除了`move()`函数，汽车对象的创建也是重复的代码，可以提取到一个我们称为修饰器的函数中。这里的`carlike()`函数传入两个参数，`obj`表示被修饰的对象，`loc`表示要修饰的内容，这个函数为obj对象添加了一个loc属性然后返回，相当于obj对象被"装饰"了一个新属性。

```javascript
var carlike = function(obj, loc) {
  obj.loc = loc;
  return obj;
};

var move = function(car) {
  car.loc++;
};

var amy = carlike({}, 1);
move(amy);
var ben = carlike({}, 9);
move(ben);
```

函数其实也是属性的一种，如果我们想用方法调用`amy.move()`的方式来调用`move()`函数，那么结合之前我们讨论过的this关键字绑定，上面的代码就还需要进一步重构。

```javascript
var carlike = function(obj, loc) {
  obj.loc = loc;
  obj.move = move
  return obj;
};

var move = function() {
  this.loc++;
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

注意，这里的`move`是一个函数对象，它作为属性被赋值给多个对象的move属性，在函数被调用的那一刻，this关键字会被绑定到不同的对象上。所以多个对象实际上共用一个move函数对象。但是，把一个函数成员定义在全局作用域而不是对象里面，多多少少看起来有些奇怪。看上去代码应该重构成下面这个样子比较好：

```javascript
var carlike = function(obj, loc) {
  obj.loc = loc;
  obj.move = function() {
    obj.loc++;
  };
  return obj;
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

但这么写代码会有一个乍一看不太容易发现的问题。原来我们是在全局作用域定义一个`move()`函数，然后把它赋值给对象修饰函数，所以被修饰过的对象都共用同一个函数对象，但现在我们把函数对象的定义放到了对象修饰函数中，这就会导致一个问题：每次我们通过调用`carlike()`函数去修饰对象时，都会在该函数作用域中创建一个新的函数对象。请注意，函数也是一种特殊对象，因此每次修饰得到的对象虽然`move()`方法是相同的，但在内存中却是不同的对象，如果创建了大量的汽车对象就会占用一些不必要的内存空间，是一种资源浪费。对于这个问题，对象修饰模式无法有效解决，我们还要想其他的办法。

### 1.2.3 函数类

**函数（functional class）**类是一种可用于创建大量相似对象的强大函数，它是对上面讨论的对象修饰器的一种拓展，它使用函数将方法应用到任何对象身上。对象修饰模式是通过传入对象进行修饰实现的，函数类则自行创建对象，这样的函数被称为构造函数，通常以大写的形式表示，它创建的对象被称为实例。

```javascript
var Car = function(loc) {
  var obj = {loc: loc};
  obj.move = function() {
    obj.loc++;
  };
  return obj;
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

单纯的函数类并没有解决重复创建函数对象的问题，解决方法是将函数定义移到外面去，我们称它为**函数共享模式(functional shared pattern)**，其实上面已经见过这个方法了。

```javasc
var Car = function(loc) {
  var obj = {loc: loc};
  obj.move = move;
  return obj;
};

var move = function() {
    this.loc++;
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

这样写有个不好的地方就是每次定义新的函数，就先得在下面定义好函数体，然后再修改上面的构造函数，如果函数很多的话很容易忘记，比如下面这样的：

```javascript
var Car = function(loc) {
  var obj = {loc: loc};
  obj.move = move;
  obj.on = on;
  obj.off = off;
  return obj;
};

var move = function() {
    this.loc++;
};

var on = function() { /*...*/ }
var off = function() { /*...*/ }

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

有一种办法可以解决，就是将所有的函数定义放到`methods`对象中，然后使用`extend()`函数。这样每次添加新函数时只需要修改`methods`对象就可以了。

```javascript
var Car = function(loc) {
  var obj = {loc: loc};
 	extend(obj, methods);
  return obj;
};

var methods = {
  move: function() {
    this.loc++;
  }
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

但是把`methods`对象定义到全局作用域并不是一种很好的做法，况且不熟悉代码的人并不知道这里的methods到底要绑定给哪个对象。还记得前面说过，函数也是一种特殊的对象吗？这里我们可以把methods作为函数对象的属性进行存储，问题就解决了：

```javascript
var Car = function(loc) {
  var obj = {loc: loc};
 	extend(obj, Car.methods);
  return obj;
};

Car.methods = {
  move: function() {
    this.loc++;
  }
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

### 1.2.4 原型类

上面这种函数共享模式的实现方式在性能上还可以进一步提高。我们使用了`extend()`函数，它本质上是一种复制粘贴，我们可以使用原型链来进一步提高性能，还记得吗，原型链使得对象的属性访问可以委托给其他的对象，所以原型对象需要存储所有的共享方法。

```javascript
var Car = function(loc) {
  var obj = Object.create(Car.methods); // 委派给Car.methods
  obj.loc = loc;
  return obj;
};

Car.methods = {
  move: function() {
    this.loc++;
  }
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

建立一个包含各种方法的对象然后把它作为属性绑定到构造函数这种模式普遍存在，所以JS语言干脆对它提供特别的支持，即**原型类（prototype class）**。任何时候当创建一个函数对象时，它都会自动附加一个对象属性作为存储方法的容器，它的名字叫`.prototype`。

```javascript
var Car = function(loc) {
  var obj = Object.create(Car.prototype); // 委派给Car.prototype
  obj.loc = loc;
  return obj;
};

Car.prototype.move = function() {
  this.loc++;
};

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();
```

每个`.prototype`对象都拥有一个`.constructor`属性，该属性指向它所附属的函数，在这里就是`Car()`函数了。所有使用`Car()`函数创建的对象，其`.constructor`属性都指向`Car()`函数，比如`amy.constructor`。另外，`instanceof`运算符的工作原理就是判断右侧对象的.prototype对象属性是否能在左侧对象的原型链中出现。比如`log(amy instanceof Car)`会判断`Car.prototype`是否出现在`amy`对象的原型链中。

### 1.2.5 伪类模式

有了上面的基础，理解**伪类模式（pseudo class）**就简单了。之所以叫伪类，是因为它模仿了其他语言中的类系统，解释器提供了语法上的便利。JavaScript提供了一个关键字`new`，一旦我们在任何函数调用之前使用了该关键字，该函数就会以一种特殊的方式——构造模式运行，解释器会帮你编写一部分代码。

```javascript
var Car = function(loc) {
  // this = Object.create(Car.prototype); 解释器自动生成
  this.loc = loc;
  // return this; 解释器自动生成
}

Car.prototype.move = function() {
  this.loc++;
}

var amy = new Car(1);
amy.move();
var ben = new Car(9);
ben.move();
```

这里不再需要自己手动创建对象并输出了，解释器会帮你做好这一切。看上去伪类模式只是在原来的基础上提供了一层薄薄的语法糖，让你少些两行代码而已。但实际上解释器在背后还做了很多针对伪类模式的性能优化工作。

上面所有这些类的定义方式都有一个共同点。它们都可以分为两个部分，一个是定义所有类都相似的部分，比如都有成员函数`move()`；一个是创造的对象区别于其他对象的部分，比如构造函数中的参数loc，每个`Car`对象的参数`loc`都取不同的值。这对于理解下面要讨论到的子类非常重要。

### 1.2.6 超类和子类

**子类(subclassing)**是一种代码共享的高级方式，运用这种方式类被整理成了树状的层次结构，熟悉其他语言的同学马上就能反应过来，这里其实在讨论的是面向对象中的**继承**。我们先来看看，如果不用继承会怎么样。还是上面那个例子，现在我们要在游戏中增加新的车型——警车（Cop），区别于原来的货车(Van)，它们分别都有自己独有的方法`grab()`和`call()`，也有一些共同的方法，于是代码就被重构成下面这个样子：

```javascript
var Van = function(loc) {
  var obj = {loc: loc};
  obj.move() = function() {
    obj.loc++;
  };
  obj.grab = function() { /*...*/ };
  return obj;
};

var Cop = function(loc) {
  var obj = {loc: loc};
  obj.move = function() {
    obj.loc++;
  };
  obj.call = function() { /*...*/ };
  return obj;
};

var amy = Van(1);
amy.move();
var ben = Van(9);
ben.move();
var cal = Cop(2);
cal.move();
cal.call();
```

除了各自特有的函数，其他的全是重复代码，要重构这些不断重复出现的代码，就需要使用子类这种重要的特性，把共同的属性抽取出来放到超类，然后从超类派生子类。

```javascript
var Car = function(loc) {
  var obj = {loc: loc};
  obj.move = function() {
    obj.loc++;
  };
  return obj;
};

var Van = function(loc) {
  var obj = Car(loc);
  obj.grab = function() { /*...*/ };
  return obj;
};

var Cop = function(loc) {
  var obj = Car(loc);
  obj.call = function() { /*...*/ };
  return obj;
};

var amy = Van(1);
amy.move();
var ben = Van(9);
ben.move();
var cal = Cop(2);
cal.move();
cal.call();
```

### 1.2.7 伪类子类

以functional class的方式编写的类要实现超类和子类其实挺容易的，但就如前面描述的，这样的实现方式会重复创建函数对象，效率不高。我们还是要考虑以伪类模式实现。为伪类模式添加超类和子类，要复杂一些。下面让我们来探索下如何在伪类模式上实现继承关系。还是沿用上面的例子，不过这了我们使用一些新的示例代码：

```javascript
var zed = new Car(3);
zed.move();

var amy = new Van(9);
amy.move();
amy.grab();
```

我们先来实现`Car`基类：

```javascript
var Car = function(loc) {
  this.loc = loc;
};

Car.prototype.move = function() {
  this.loc++;
};
```

现在，我们要来实现`Van`这个子类，现在先来看一些错误的示例，第一种错误示例就是简单的复制粘贴：

```javascript
var Car = function(loc) {
  this.loc = loc;
};

Car.prototype.move = function() {
  this.loc++;
};

var Van = function(loc) {
  this.loc = loc; // *bad practice*
};
```

这么写，既出现了重复代码，又在内存中出现了大量拷贝，这不是我们想要的实现方式。另外一种错误写法是：

```javascript
var Car = function(loc) {
  this.loc = loc;
};

Car.prototype.move = function() {
  this.loc++;
};

var Van = function(loc) {
  // this = Object.create(Van.prototype);
  new Car(loc); // *bad practice*
  // return this;
};
```

这么写问题更严重。回忆一下，一旦使用`new`关键字就会以构造模式运行，`new Car(loc)`返回的对象会被立即丢弃掉，然后上面注释中解释器生成的代码会返回，然而这个对象绝对不会带上`loc`属性。有人会觉得，那么下面这样写总可以了吧：

```javascript
var Van = function(loc) {
  this = new Car(loc); // *bad practice*
};
```

可惜的是，JS不允许像这样给this赋值，所以如果这么写就直接报错了。那如果不加`new`关键字行不行呢：

```javascript
var Van = function(loc) {
  Car(loc); // *bad practice*
};
```

答案是：还是不行。如果像这样写代码，在`Car()`函数中的this会被绑定到全局对象`<global>`。回顾一下上面我们罗列的各种`this`关键字的绑定规则，其实答案就在第三条规则上：使用`.call()`调用，改变this关键字的绑定方式：

```javascript
var Car = function(loc) {
  this.loc = loc;
};

Car.prototype.move = function() {
  this.loc++;
};

var Van = function(loc) {
  Car.call(this, loc);
};
```

但是当运行`amy.move()`的时候仍然会报错，因为这个方法仅仅在`Car.prototype`上可用。`amy`这个对象并没有委托到`Car.prototype`上。是的，它的确委托到了`Van.prototype`，但`Van.prototype`自己委托到了`Object.prototype`原型对象上，与`Car.prototype`毫无关系。

前面我们指出，类的定义其实包含了两个部分，一个是所有类都相似的部分，一个是类的对象区别于其他对象的部分。现在后者已经建立了联系，子类`Van`的构造函数会调用到基类`Car`的构造函数，而前者的联系还没有建立，我们还需要将子类原型与父类的原型建立联系，使得子类继承父类原型中定义的方法。但是下面的这种写法却是错误的：

```javascript
Van.prototype = Car.prototype;
```

JS是个"一切皆对象"的语言，这样的赋值只能使得两个类的`.prototype`属性指向同一个对象，这样一来加在`Car`上的方法一定会存在于`Van`中，反之亦然。这就错了，子类的方法出现在了父类中。正确的做法应该是这样：

```javascript
Van.prototype = Object.create(Car.prototype);
// 定义子类特有的函数
Van.prototype.move = function() { /*...*/ };
```

但是这里有一个微妙的问题，光是这样还不够，当我们重新给`Van.prototype`赋值后，它原有的`.constructor`，就没有了，这里还需要重新赋值回来，所以正确做法应该是这样：

```javascript
Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;
Van.prototype.move = function() { /*...*/ };
```

这就介绍完了JavaScript面向对象的各种特性了，函数类和原型类还是比较容易的，最难的是伪类模式，稍微不注意就容易出错，似乎在JS中进行面向对象编程要比在其他语言中更困难一些呢，但别担心，这门语言本身也在不断的发展和进化，后来当ES6语法出现之后，定义类变得比以前要容易很多了！从ES6开始，JavaScript语言引入了大量的新语法糖，使得面向对象编程像其他语言那样简洁优美，不用考虑太多内部实现。这也是下一部分要介绍的内容。

# 二. ECMAScript 6

天不生ES6，万古如长夜。

ECMAScript 6对JavaScript语言做出了很多重大的更新，添加了很多甜甜的语法糖，让你的编程更顺心。从这里开始我们将介绍ES6语法的3个内容：**语法**，**函数**和**内置功能**。掌握ES6语法是理解现代JavaScript编程的核心。

## 2.1 ES6语法
### 2.1.1 声明变量的新方式

在原来，我们只能使用`var`关键字来声明变量，但这种声明方式会存在被称为`hoisting`的问题，即变量的声明会被提升到头部——如果是全局作用域，则是作用域头部；如果是函数作用域，则是函数头部。如果声明的时候不小心进行了赋值，就会出现微妙的不易被察觉的bug，举个例子：

```javascript
function getClothing(isCold) {
  if (isCold) {
    var freezing = "Grab a jacket!";
  } else {
    var hot = "It's a shorts kind of day.";
    console.log(freezing);
  }
}
```

上面这个函数，如果以`getClothing(false)`的方式调用，`freezing`变量会输出`undefined`，而不是"Grab a jacket"。这段代码会存在被称为"提升"的现象，解释器会这样解读这段代码：

```javascript
function getClothing(isCold) {
  var freezing, hot;
  if (isCold) {
    freezing = "Grab a jacket!";
  } else {
    hot = "It's a shorts kind of day.";
    console.log(freezing);
  }
}
```

这就是输出`undefined`的真正原因。ES6引入了`let`和`const`来分别声明变量和常量：

```javascript
function getClothing(isCold) {
  if (isCold) {
    let freezing = "Grab a jacket!";
  } else {
    let hot = "It's a shorts kind of day.";
    console.log(freezing);
  }
}
```

解释器在运行时会报错`ReferenceError:freezing is not defined`。因为在`else`代码块中并没有定义`freezing`这个变量。关于`let`和`const`还有一些其他规则：

* 使用`let`声明的变量可以重新赋值但不能在同一作用域内重新声明；
* 使用`const`声明的常量必须赋值，它们不能在同一作用域内重新声明，也不能重新赋值。

`const`是声明变量最严格的方式，一旦赋值不能被改变，最佳实践是一直使用`const`声明变量，这样就知道该变量在整个生命周期内都不会发生改变，如果需要更新，改成`let`就可以了。

### 2.1.2 模板字面量

使用`+`来拼接字符串是一种很麻烦的方式，特别是连接多个字符串的时候很容易晕。ES6针对这个问题引入了**模板字面量**，可以在字符串字面量中嵌入表达式，字面量使用反引号表示，使用`${expression}`嵌入表达式，事实上表达式不仅仅可以用来引用变量。你可以在嵌入式表达式中进行运算、调用函数和使用循环。举例：

```javascript
const student = {
  name: 'Richard Kalehoff',
  guardian: 'Mr. Kalehoff'
};

const teacher = {
  name: 'Mrs. Wilson',
  room: 'N231'
}

let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;
```

模板字面量的真正强大之处是进行多行现实，反引号中的换行都会被原封不动的保留，换行符也是字符串的一部分：

```javascript
var note = `${teacher.name},

	Please execute ${student.name}.
	He is recovering from the flu.

	Thank you,
	${student.guardian}`;
```

### 2.1.3 解构

ES6中支持从数组和对象中提取值然后赋给单独的变量，在其他编程语言中又被称为**模式匹配**。例如下面这段代码是从数组中提取值：

```javascript
const point = [10, 25, -34];

const x = point[0];
const y = point[1];
const z = point[2];

console.log(x, y, z);
```

而这段代码则是从对象中提取值：

```javascript
const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const type = gemstone.type;
const color = gemstone.color;
const karat = gemstone.karat;

console.log(type, color, karat);
```

如果使用解构，代码看起来就要清爽的多，代码量也会更小，下面这段代码演示了数组解构：

```javascript
const point = [10, 25, -34];

const [x, y, z] = point;

console.log(x, y, z);
```

方括号 `[]` 表示被解构的数组，`x`、`y` 和 `z` 表示要将数组中的值存储在其中的变量。在解构数组时，还可以忽略值。例如，`const [x, , z] = point;` *忽略了* `y` 坐标。可以像这样结构对象的值：

```javascript
const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const {type, color, karat} = gemstone;

console.log(type, color, karat);
```

其中花括号`{}`表示解构对象，`type`，`color`和`karat`表示要将对象中的属性存储到哪个变量。也可以指定某个值而忽略其他的值，比如`let {color} = gemstone `。

### 2.1.4 简写

定义对象时，如果对象的属性和变量同名，那么可能省略掉重复的变量名称，例如下面的代码：

```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type: type,
  color: color,
  carat: carat
};

console.log(gemstone);
```

可以简写成：

```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = { type, color, carat };

console.log(gemstone);
```

对象中添加方法也可以简写，例如：

```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type,
  color,
  carat,
  calculateWorth: function() {
    // 将根据类型(type)，颜色(color)和克拉(carat)计算宝石(gemstone)的价值
  }
};
```

`function`关键字是多余的，可以直接写成这样：

```javascript
let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};
```

### 2.1.5 迭代

在编程中，逐个获取项的过程被称为迭代。之前我们用for循环遍历数组就是一种迭代：

```javascript 
const years = ['1999', '2001', '2013', '2016'];
for (let i = 0; i < years.length; i++) {
  console.log(years[i]);
}
```

ES6新增了一个被称作[iterable protocol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)的新接口，允许自定义对象的迭代方式。任何定义了该接口的对象就可以使用`for..of`的方式来迭代。String，Array，Map和Set都实现了该接口。原来的`for..in`循环有一个很大的缺陷：如果向数组中添加了额外的方法(或另一对象)，这些属性也会出现在循环中，这是很可怕的：

```javascript
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

> 打印：
>
> *0*
> *1*
> *2*
> *3*
> *4*
> *5*
> *6*
> *7*
> *8*
> *9*
> *function() {*
>  *for (let i = 0; i < this.length; i++) {*
>   *this[i] = this[i].toFixed(2);*
>  *}*
>
> *}*

所以循环访问数组时并不建议使用`for..in`循环。强大的`for..of`循环用于循环访问任何可迭代数据类型：

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```

> 打印
>
> *0*
> *1*
> *2*
> *3*
> *4*
> *5*
> *6*
> *7*
> *8*
> *9*

使用`for..of`可以随时停止或退出循环：

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}
```

> 打印：
>
> *1*
> *3*
> *5*
> *7*
> *9*

可以向对象中添加新的属性，`for..of`循环只访问对象中的值。

```javascript
Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```

> 打印：
>
> *0*
> *1*
> *2*
> *3*
> *4*
> *5*
> *6*
> *7*
> *8*
> *9*

### 2.1.6 …运算符

展开运算用三个连续的点表示，可以将数组或集合之类的展开为多个元素。举个例子，如果我们要将多个数组连接在一起，原先要使用`Array`的`concat()`方法：

```javascript
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);
```

使用展开运算符：

```javascript
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = [...fruits, ...vegetables];
console.log(produce);
```

`…`运算符还可以作为**剩余参数**，将多个不定数量的元素绑定为数组。第一种情形是结合上面讨论的解构做变量赋值的时候：

```javascript
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
```

> 打印：*20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]*

第二种情形是定义可变参数函数的时候，比如一个接受任意长度参数的`sum()`函数，无论传入多少个值都应该返回累加的总和：

```javascript
function sum(...nums) {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}

sum(1, 2);
sum(10, 36, 7, 84, 90, 110);
sum(-23, 3000, 575000);
```

# 2.2 ES6函数
### 2.2.1 箭头函数表达式

箭头函数其实就是其他编程语言中大名鼎鼎的lambda表达式，是一种可以就地定义的匿名函数。请对比一下使用普通函数和使用箭头函数将数组内容转为大写的写法：

```javascript
// 使用普通函数
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) { 
  return name.toUpperCase();
});

// 使用箭头函数
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
```

如果箭头函数表达式有0个或多个参数，就需要使用圆括号把参数括起来：

```javascript
// 空参数列表需要括号
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();

// 多个参数需要括号
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
```

如果箭头函数主体只有一行，那么可以将其写成表达式形式并省略`return`，称为**简写主体语法**，函数主体周围没有花括号，自动返回表达式；否则如果主体有多行代码，可以使用**常规主体语法**，函数主体放在花括号内并使用`return`语句返回内容。

```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});
```

### 2.2.2 默认参数函数

ES6中定义函数参数可以指定参数的默认值：

```javascript
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```

默认参数可以和解构结合在一起创建函数，一种是解构数组，另一种是解构对象，但仍然有一些微妙的问题需要注意。首先，可以向下面这样解构数组：

```javascript
function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
```

但我们却不能`createGrid()`这样去调用该函数，因为该函数需要传入数组进行结构，但我们却没有传参，需要对整个数组参数提供默认值：

```javascript
function createGrid([width = 5, height = 5] = []) {
  return `Generating a grid of ${width} by ${height}`;
}
```

解构对象的时候也存在同样的问题：

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
```

**优先使用对象默认值进行对象解构**，因为它可以选择性地忽略某些项，比如下面这段代码，如果我想使用`scoops`的默认值但是更改`toppings`，就只需要使用`toppings`传入一个对象：

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }

createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
```

如果使用数组默认值进行解构，则需要以一种奇怪的方式进行调用，因为数组是基于位置的：

```javascript
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }

createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);
```

### 2.2.3 类

ES6提供了一些新的关键字，使得我们可以用一种更简洁清晰的方式进行面向对象的编程，但一定要记住，JS内核的底层机制仍然没有任何变化。在语法糖的背后仍然是以函数+原型继承的方式来实现的。ES5中实现一个类，我们要这么写：

```javascript
function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;
}

// 由所有实例 "继承" 的方法
Plane.prototype.startEngines = function () {
  console.log('starting engines...');
  this.enginesActive = true;
};

const richardsPlane = new Plane(1);
richardsPlane.startEngines();

const jamesPlane = new Plane(4);
jamesPlane.startEngines();
```

使用ES6，抹上一层薄薄的语法糖：

```javascript
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
  
  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }
}
```

上面的代码还演示了类的静态方法的使用，可以直接在`Plane`类中直接访问`badWeather()`方法：

```javascript
Plane.badWeather([plane1, plane2, plane3]);
```

在ES5中定义类的继承关系要写一大段代码且很容易漏掉一些细节导致出错：

```javascript
function Tree(size, leaves) {
  this.size = size || 10;
  this.leaves = leaves || {spring: 'green', summer: 'green', fall: 'orange', winter: null};
  this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
  this.leafColor = this.leaves[season];
  if (season === 'spring') {
    this.size += 1;
  }
}

function Maple (syrupQty, size, leaves) {
  Tree.call(this, size, leaves);
  this.syrupQty = syrupQty || 15;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple; // 容易忘记

Maple.prototype.changeSeason = function(season) {
  Tree.prototype.changeSeason.call(this, season);
  if (season === 'spring') {
    this.syrupQty += 1;
  }
}

Maple.prototype.gatherSyrup = function() {
  this.syrupQty -= 3;
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```

使用ES6，就简洁的多了：

```javascript
class Tree {
  constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }

  changeSeason(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
      this.size += 1;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, leaves) {
    super(size, leaves); // super必须在this之前被调用
    this.syrupQty = syrupQty;
  }

  changeSeason(season) {
    super.changeSeason(season);
    if (season === 'spring') {
      this.syrupQty += 1;
    }
  }

  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```

## 2.3 ES6内置功能
### 2.3.1 符号类型

符号类型是一种新加入的基本数据类型，是不可变的，常用来标识对象属性。用`Symbol()`加上一个可选的字符串描述来定义：

```javasc
const sym1 = Symbol('apple');
console.log(sym1);
```

> 输出：*Symbol(apple)*

标识符每次都会新创建，就算描述相同也不会相等：

```javascript
const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3); // false
```

用来标识对象属性的时候能够标识相同的对象而不会相互覆盖：

```javascript
const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
```

> 输出：*Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}*

符号类型可以用在可迭代协议和迭代器协议中。它类似于其他语言中的接口，只要你自定义的对象中提供了相应的方法，你就可以控制它们的迭代方式，有一种设计模式就叫"迭代器模式"。前面我们提到，满足可迭代协议的对象可以使用`for..of`进行遍历：

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
  console.log(digit);
}
```

`digits`是Array对象，Array对象实现了**可迭代接口(Iterable Protocol)**，也就是定义了迭代器方法，这个方法定义对象如何被迭代。迭代器方法可通过`[Symbol.iterator]`获得，它被定义为一个无参数函数，它返回一个迭代器对象，迭代器对象遵守**迭代器协议**。

迭代器协议定义对象生成一系列值的标准方式，通过调用`next()`方法来完成这个流程。可迭代的对象访问`[Symbol.iterator]`中定义的迭代器方法获得一个迭代器对象。该迭代器对象执行`next()`方法，该方法每次返回包含两个属性的对象：

1. `value`：表示对象内值序列的下个值的数据
2. `done`：表示迭代器是否已循环访问完值序列的布尔值
   * 如果 done 为 *true*，则迭代器已到达值序列的末尾处，`value`可省略
   * 如果 done 为 *false*，则迭代器能够生成值序列中的下一个值

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
```

> ```javascript
> Object {value: 0, done: false}
> Object {value: 1, done: false}
> Object {value: 2, done: false}
> ```

再看一个给自定义对象编写迭代器的例子：

```javascript
const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185
};

james[Symbol.iterator] = function() {
    return {
        next: function() {
            const keys = Object.keys(james);
            const i = this.index++;
            return {value: james[keys[i]], key: keys[i], done: this.index === keys.length}
        },
        index: 0
    };
};

const iterator = james[Symbol.iterator]();

console.log(iterator.next().value); // 'James'
console.log(iterator.next().value); // `5'10`
console.log(iterator.next().value); // 185
```

### 2.3.2 Set类型

Set类型和数学意义上的集合相同，它不基于索引，不能通过索引位置来访问单个元素，但是它可以不重复地存储基本类型或者对象。可以创建一个空的集合也可以在创建时添加默认值：

```javascript
const games = new Set();
console.log(games); // 输出：Set {}

const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(games); // 输出：Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}
```

可以使用`add()`和`delete()`方法修改Set，增加或者删除条目：

```javascript
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Super Mario Bros.');

console.log(games); // 输出：Set {'Banjo-Kazooie', 'Mario Kart', 'Banjo-Tooie', 'Age of Empires'}

// 删除所有条目
games.clear()
```

可以查看集合的元素个数，检查是否存在某个条目，或者检索所有值：

```javascript
const months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
// 输出：12
console.log(months.size);

// 输出：true
console.log(months.has('September'));

// 输出：SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}
console.log(months.values());
```

Set类型是内置的可迭代类型，可以使用默认迭代器访问Set中每一项，也可以使用`for..of`来循环访问每一项：

```javascript
const iterator = months.values();
// Object {value: 'January', done: false}
iterator.next();
// Object {value: 'February', done: false}
iterator.next();

// 循环遍历
const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
  console.log(color);
}
```

### 2.3.3 WeakSet类型

WeakSet是一种特殊的集合类型，它只能包含对象，不提供迭代访问的机制，也不能用`clear()`方法清空。使用WeakSet构造函数创建：

```javascript
const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
const student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);
```

JavaScript是带GC的语言，不再被需要的值会被自动回收内存。这里的WeakSet和下面的WeakMap一样，对存储的对象使用的是一种弱类型的引用，当对象被GC释放掉内存时，它在WeakSet中自动消失，不会出现"引用一个已经被释放内存的对象"这样的错误。可以看到`student3`被自动从WeakSet中删除了。

```javascript
student3 = null;
console.log(roster);
```

> *WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'James', age: 26, gender: 'male'}}*

### 2.3.4 Map类型

Map是用于存储键值对的对象，在Python语言中它被称为字典。Map的创建可以使用其构造函数：

```javascript
const employees = new Map();
// 输出：Map {}
console.log(employees);
```

使用`set()`方法向`Map`中添加键值：

```javascript
const employees = new Map();

employees.set('james.parkes@udacity.com', { 
    firstName: 'James',
    lastName: 'Parkes',
    role: 'Content Developer' 
});
employees.set('julia@udacity.com', {
    firstName: 'Julia',
    lastName: 'Van Cleve',
    role: 'Content Developer'
});
employees.set('richard@udacity.com', {
    firstName: 'Richard',
    lastName: 'Kalehoff',
    role: 'Content Developer'
});

// 输出：Map {'james.parkes@udacity.com' => Object {...}, 'julia@udacity.com' => Object {...}, 'richard@udacity.com' => Object {...}}
console.log(employees);
```

要移除键值对，只需要使用`delete()`方法：

```javascript
employees.delete('julia@udacity.com');
employees.delete('richard@udacity.com');
// 输出：Map {'james.parkes@udacity.com' => Object {firstName: 'James', lastName: 'Parkes', role: 'Course Developer'}}
console.log(employees);
```

使用`clear()`方法可以从`Map`中删掉全部的键值对：

```javascript
employees.clear()
// 输出：Map {}
console.log(employees);
```

可以使用`has()`方法来检查某个键值对是否存在，也可以使用`get()`方法来获取某个键对应的值：

```javascript
const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);

// false
console.log(members.has('Xavier'));
// true
console.log(members.has('Marcus'));

// 75.68
console.log(members.get('Evelyn'));
```

有三种方式可以迭代访问`Map`中的键值对，因为`Map`也是内置支持可迭代协议的类型，可以使用`MapIterator`来访问，`.keys()`返回键的迭代器，`.values()`返回值的迭代器：

```javascript
let iteratorObjForKeys = members.keys();
// Object {value: 'Evelyn', done: false}
iteratorObjForKeys.next();
// Object {value: 'Liam', done: false}
iteratorObjForKeys.next();
// Object {value: 'Sophia', done: false}
iteratorObjForKeys.next();

let iteratorObjForValues = members.values();
// Object {value: 75.68, done: false}
iteratorObjForValues.next();
```

使用`for..of`循环：

```javascript
for (const member of members) {
  console.log(member);
}
```

> 输出：
>
> ```javascript
> ['Evelyn', 75.68]
> ['Liam', 20.16]
> ['Sophia', 0]
> ['Marcus', 10.25]
> ```

最后是通过`forEach()`方法，传入回调函数实现：

```javascript
members.forEach((value, key) => console.log(value, key));
```

> 输出：
>
> ```
> 'Evelyn' 75.68
> 'Liam' 20.16
> 'Sophia' 0
> 'Marcus' 10.25
> ```

	### 2.3.5 WeakMap类型

同样地，`WeakMap`类型存在诸多使用上的限制：

1. 只能以对象为键
2. 无法迭代
3. 没有clear()方法

使用`WeakMap`构造函数来创建对象：

```javascript
const book1 = { title: 'Pride and Prejudice', author: 'Jane Austen' };
const book2 = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
const book3 = { title: 'Gulliver's Travels', author: 'Jonathan Swift' };

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);
library.set(book3, true);

console.log(library);
```

> 输出：
>
> *WeakMap {Object {title: 'Pride and Prejudice', author: 'Jane Austen'} => true, Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, Object {title: 'Gulliver's Travels', author: 'Jonathan Swift'} => true}*

和`WeakSet`一样，`WeakMap`与其存储的对象之间是一种弱引用模式，一旦对象被垃圾回收掉，它就会自动从`WeakMap`中删除。不会因为长期持有键值对导致对象无法回收。

### 2.3.6 使用Proxy代理对象

ES6提供代理机制，可以编写代码用一个对象代表另一个对象（目标）。在代理对象上访问的目标对象的属性或者方法都会先被代理对象的`trap`拦着然后处理，只有在没定义对应`trap`的情况下才会让目标对象直接处理。创建代理对象使用构造函数`Proxy()`，传入两个参数，第一个参数表示要代理的目标对象`target`，第二个参数表示所有要被代理的方法构成的处理器`handler`。以下是一个`get trap`的例子：

```javascript
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target);
        console.log(propName);
        return target[propName];
    }
};
const agent = new Proxy(richard, handler);
agent.status; //  (1)打印 richard 对象，(2)打印被访问的​​属性，(3)返回 richard.status 中的文本
```

在最后一行运行时，因为有`get trap`，代理对象会拦截该调用，输出目标对象`target`和被请求的`status`属性，最后返回目标对象上对应的属性值`target[propName]`。`set trap`会截获更改属性的代码，它的`set()`函数有三个参数：目标对象`target`，要修改的属性`propName`和新值`value`：

```javascript
const richard = {status: 'looking for work'};
const handler = {
    set(target, propName, value) {
        if (propName === 'payRate') { // 如果工资正在确定，则需要15%作为佣金。
            value = value * 0.85;
        }
        target[propName] = value;
    }
};
const agent = new Proxy(richard, handler);
agent.payRate = 1000; // 将演员的工资设置为 1,000美元
agent.payRate; // 850美元是演员的实际工资
```

总共有13种`trap`可供选择：

1. [get trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get) - 使 proxy 能处理对属性访问权的调用
2. [set trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set) - 使 proxy 能将属性设为新值
3. [apply trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply) - 使 proxy 能被调用（被代理的对象是函数）
4. [has trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has) - 使 proxy 能使用 `in` 运算符
5. [deleteProperty trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty) - 使 proxy 能确定属性是否被删除
6. [ownKeys trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys) - 使 proxy 能处理当所有键被请求时的情况
7. [construct trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct) - 使 proxy 能处理 proxy 与 `new` 关键字一起使用当做构造函数的情形
8. [defineProperty trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty) - 使 proxy 能处理当 defineProperty 被用于创建新的对象属性的情形
9. [getOwnPropertyDescriptor trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor) - 使 proxy 能获得属性的描述符
10. [preventExtenions trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions) - 使 proxy 能对 proxy 对象调用 `Object.preventExtensions()`
11. [isExtensible trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible) - 使 proxy 能对 proxy 对象调用 `Object.isExtensible`
12. [getPrototypeOf trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf) - 使 proxy 能对 proxy 对象调用 `Object.getPrototypeOf`
13. [setPrototypeOf trap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf) - 使 proxy 能对 proxy 对象调用 `Object.setPrototypeOf`

### 2.3.7 生成器

普通的函数在执行时都会从第一行运行到最后一行，无法中途停止。生成器是一类特殊的函数，它可以提供中途暂停运行，在需要的时候恢复执行的功能。生成器函数的定义是在function关键字的后面加上一个`*`，暂停的功能要配合`yield`关键字来实现。生成器函数的执行只要碰到`yield`就会暂停执行：

```javascript
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log(name);
        yield;
    }

    console.log('the function has ended');
}

const generatorIterator = getEmployee();
// 输出并暂停：
// the function has started
// Amanda
generatorIterator.next();
// 输出并暂停：
// Diego
generatorIterator.next();
```

`yield`关键字还可以向生成器函数外面返回数据，这也就是"生成器"这个名字的由来。下面我们稍微修改下代码，不向控制台输出姓名并暂停，而是让代码返回姓名并暂停：

```javascript
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        yield name;
    }

    console.log('the function has ended');
}

const generatorIterator = getEmployee();
let result = generatorIterator.next();
result.value // 是 "Amanda"

generatorIterator.next().value // 是 "Diego"
generatorIterator.next().value // 是 "Farrin"
```

反过来，使用`next()`函数可以向生成器发送数据：

```javascript
function* displayResponse() {
    const response = yield;
    console.log(`Your response is "${response}"!`);
}

const iterator = displayResponse();

iterator.next(); // 开始运行生成器函数
iterator.next('Hello Udacity Student'); // 将数据发送到生成器中
// 上面的一行打印到控制台：你的响应是 "Hello Udacity Student"！
```

第一次调用`next()`函数，会执行到`yield`关键字然后生成器函数暂停，当第二次调用`next()`函数传入参数时，生成器从上次暂停的位置恢复执行，并将`yield`关键字替换为传入的参数。分析生成器函数的代码一定要抓住"**`yield`关键字会导致生成器函数暂停**"这个关键点，下面来看一个更复杂一点的例子：

```javascript
function* getEmployee() {
    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];
    const facts = [];

    for (const name of names) {
        // yield *出* 每个名称并将返回的数据存储到 facts 数组中
        facts.push(yield name); 
    }

    return facts;
}

const generatorIterator = getEmployee();

// 从生成器中获取第一个名称
let name = generatorIterator.next().value;

// 将数据传入 *并* 获取下一个名称
name = generatorIterator.next(`${name} is cool!`).value; 

// 将数据传入 *并* 获取下一个名称
name = generatorIterator.next(`${name} is awesome!`).value; 

// 将数据传入 *并* 获取下一个名称
name = generatorIterator.next(`${name} is stupendous!`).value; 

// 你懂的
name = generatorIterator.next(`${name} is rad!`).value; 
name = generatorIterator.next(`${name} is impressive!`).value;
name = generatorIterator.next(`${name} is stunning!`).value;
name = generatorIterator.next(`${name} is awe-inspiring!`).value;

// 传递最后一个数据，生成器结束并返回数组
const positions = generatorIterator.next(`${name} is magnificent!`).value; 

// 在自己的行上显示每个名称及其描述
positions.join('\n');
```

生成器函数很容易写错，请看下面这个例子：

```javascript
function* createSundae() {
    const toppings = [];

    toppings.push(yield);
    toppings.push(yield);
    toppings.push(yield);

    return toppings;
}

var it = createSundae();
it.next('hot fudge');
it.next('sprinkles');
it.next('whipped cream');
it.next();
```

`it.next('hot fudge')`运行时触发第一个`yield`关键字然后暂停，然后在`it.next('sprinkles')`运行时恢复，`yield`被替换为“sprinkles”并放入数组，然后触发第二个`yield`关键字暂停，当运行`it.next('whipped cream')`时恢复执行并将`yield`关键字替换为"whipped cream"，然后再次触发`yield`关键字暂停，当最后一次运行`it.next()`时从暂停状态返回，然而此时没有传入任何值，所以`undefined`被放入数组，最后打印出来的是`['sprinkles', 'whipped creasm', undefined]`。

以上就是有关于ES6新特性的一些讨论，当然我们在这里不可能把所有的内容都讨论完，但以上几个点已经能够让你感觉到它的强大了！JS这门语言还在不断的发展，还会有有更多更强大的特性出现。事实上在今天JS已经渗透到了各个领域，后端开发和嵌入式开发现在也能用上它了。下一个部分，我们将集中讨论一下JavaScript的异步特性，毕竟前端是需要通过网络请求与后端进行数据交换的，怎样做到简单高效低延迟，是我们要关注的中心内容。

# 三. 异步的JavaScript

要理解异步的JavaScript，我们先要认识什么是**异步**。要认识什么是异步，我们得先知道什么是**同步**。当你解决可预测问题的时候，编写的代码往往是同步的，比如给数组里的20个数字排序；但是当你解决的问题是**不可预测**的时候，就需要编写异步的代码，比如数组是空的，你需要先向服务器请求并返回20个数字。这里所说的不可预测是指你发出了一个指令或执行了一个动作，但并不会马上得到结果，这个结果会在未来的某个时间发生，你并不知道一个精确的时间，只知道它未来一定会给你一个**结果**，要么是好的结果要么是坏的结果。

这一部分首先将介绍Promise机制，看看JavaScript是怎么处理不可预测任务的。然后我们会专门讨论AJAX这个主题，毕竟对于前端开发而言，最常见的不可预测任务就是网络请求了，我们会讨论三种网络请求的方法：XHR，jQuery和fetch。

## 3.1 处理异步任务的利器：Promise

通过回调（callback）的方式处理异步操作是很常见的用法。回调是一种函数，它将传递给其他的高阶函数，高阶函数完成异步操作后将回调这个函数。但实际问题不会是这么简单的，总有各种各样的情况需要考虑，比如：

1. 如何处理错误？
2. 如何按步骤执行一系列异步操作？

Promise机制很好地考虑了这些细节。它类似于其他语言中的`try..catch`包装器，专门针对一类不可预测的延迟（deferred）或异步（asynchronous）计算任务。Promise有四种状态：

1. fulfilled(resolved)：顺利执行与Promise有关的操作；
2. rejected：与Promise有关的操作执行失败；
3. pending：Promise尚未执行完，还需要等待；
4. settled：Promise要么成功（resolved），要么失败（rejected）；

与普通的事件监听器`Event Listener`不同的是，如果在事件发生后才启动监听器进行监听，事件无法得到处理。但使用Promise，即便Promise已经执行完毕，仍然可以对已发生的事件进行处理，不会丢失信息。但Promise的状态只能被确定一次，第二次将被忽略：

```javascript
new Promise(function(resolve, reject) {
  resolve('hi'); // works
  resolve('bye'); // can't happen a second time
});
```

Promise是在主线程中执行的，如果操作很繁琐仍然会阻塞线程导致停止响应。所以Promise并不是用于执行费时操作的神器，它的作用是解析异步操作得到的结果并作出相应动作。

### 3.1.1 Promise的基本使用

通过向Promise的构造函数传递一个函数来包装异步任务。该函数带有两个参数：`resolve`和`reject`，都是回调函数，其中`reject`可以省略。这两个回调函数用来说明当异步任务正确执行完毕或出现错误时要传递的值。举个例子：

```javascript
new Promise(function(resolve, reject) {
  let value = doSomething();
  if (thingsWorked) {
    resolve(value);
  } else if (somethingWrong) {
    reject();
  }
})
.then(function(value) {
  // success
  return nextThing(value);
})
.catch(rejectFunction);
```

如果执行成功，`resolve()`函数会将`value`值传递给`then()`函数中的回调；如果执行失败，reject()同样会将值传递给`catch()`函数中的回调`rejectFunction`。当然如果什么都不传，那么相应的参数就是`undefined`。如果传递给Promise的函数某处出错了，也会触发`catch()`函数。第三种情况是如果传递的值本身是一个Promise，那么它将首先被执行，然后根据它执行的结果将可能的值传递给`then()`或者`catch()`函数。

### 3.1.2 Promise的高级用法

Promise可以被链式调用，编写代码时我们可以在每一个`then()`函数中一次处理一个小问题，然后一直`then()`下去，直到所有的问题都被解决。这在网络请求中会非常的有用。`fetch()`函数现在得到了很多浏览器的原生支持，它用来向后端发起网络请求获取数据。`fetch()`函数就是建立在原生Promise基础上构建的：

```javascript
fetch('/some/url', {
  method: 'get'
}).then(function(response) {
  // handling response
}).catch(function(err) {
  // handling error
});
```

以下是使用`fetch()`函数发起GET请求并在此基础上解析JSON字符串的示例：

```javascript
function get(url) {
  return fetch(url, {
    method: 'get'
  })
};

function getJSON(url) {
  return get(url).then(function(response) {
    return response.json();
  });
};
```

然后就可以使用这个函数请求服务端加载缩略图并添加搜索头部信息：

```javascript
getJSON('xxx/yyy/zzz/data.json')
.then(function(response) {
  addSearchHeader(response.query);
  return getJSON(response.results[0]);
})
.catch(function() {
  throw Error('Search Request Error');
})
.then(function(data) {
  createPlanetThumb(data);
})
.catch(function(e) {
  addSearchHeader('unknown');
  console.log(e);
});
```

首先`getJSON()`会发起请求并获得结果，如果成功则调用第一个`then()`函数，该函数传入的回调带有参数`response`，表示请求得到的结果，回调函数中将`response.query`添加到搜索头然后再次返回`getJSON(response.results[0])`的结果，这是另一个url。如果失败则第一个`catch()`函数会触发，然后在回调函数中抛出错误。第二次请求成功后得到的数据会传递给第二个`then()`函数中的回调函数，该回调函数调用`createPlanetThumb()`处理数据并加载缩略图。同样地，如果刚才失败了，第二个`catch()`函数会被触发，添加unknown搜索头信息，然后控制台打印错误。

除了上述这样的`then-catch`调用链形式，我们还可以写的更紧凑，对比一下下面两种写法：

```javascript
get('example.json')
.then(resolveFunc)
.catch(rejectFunc);

// 紧凑形式
get('example.json')
.then(resolveFunc)
.then(undefined, rejectFunc);
```

`then()`函数的完整签名如下：

```javascript
get('example.json').then(resolveFunc, rejectFunc).then(...);
```

任何Promise失败都会调用rejectFunc，如果完成则调用resolveFunc，但如果没有传入resolveFunc，这个`then()`就会跳过然后调用下一个`then()`。最佳实践还是使用`then()`和`catch()`分开的形式，因为这样看的要清楚些。另外，这两种形式还有一些细微差别。`then-catch`调用链形式在`then()`回调发生错误时会在紧跟着的`catch()`函数中处理错误。而紧凑形式则需要在下一个`then()`或者`then-catch`调用链中处理。

Promise可以以串行或者并行的方式执行多个请求。在某些场景下，我们需要按顺序请求数据并加载，这个时候就需要按一定的顺序请求数据，加载页面，然后再请求下一个；在另一些场景下，我们可以并行的执行多个网络请求，谁先返回就先加载谁：

```javascript
// 串行模式
getJSON('xxx/yyy/zzz.json')
.then(function(response){
  let sequence = Promise.resolve(); //得到resolve的返回值，也是一个Promise
  response.results.forEach(function(url) {
    sequence = sequence.then(function() { // 用新的Promise覆盖旧的，达到串行执行的目的
      return getJSON(url);
    })
    .then(createPlanetThumb);
  });
})
.catch(function(e) {
  console.log(e);
});

// 并行模式
getJSON('xxx/yyy/zzz.json')
.then(function(response){
  let sequence = Promise.resolve(); //得到resolve的返回值，也是一个Promise
  response.results.forEach(function(url) {
    sequence.then(function() { // 利用这个sequence不断的并发请求数据
      return getJSON(url);
    })
    .then(createPlanetThumb);
  });
})
.catch(function(e) {
  console.log(e);
});
```

还有一种形式的并行请求就是利用数组的`map()`函数：

```javascript
getJSON('xxx/yyy/zzz.json')
.then(function(response){
  response.results.map(function(url) {
    getJSON(url).then(createPlanetThumb);
  });
});
```

Promise还有一个`all()`方法，参数为Promise的数组，表示只有当这里面全部的Promise执行成功才算成功，它的返回值是一个与原始Promise顺序相同的值数组。只要有一个Promise失败，整个调用会立即返回，而不会理会其他的Promise。如果全部成功了，链接的`then()`函数中传入的回调就能以值的数组作为参数：

```javascript
Promise.all(arrayOfPromises)
.then(function(arrayOfValues) { // arrayOfValues is same order as arrayOfPromises
  ...
})
```

让我们来重构一下上面的并行请求代码，使用`all()`：

```javascript
getJSON('xxx/yyy/zzz.json')
.then(function(response){
  let arrayOfPromises = response.results.map(function(url) {
    getJSON(url);
  });
  return Promise.all(arrayOfPromises);
})
.then(function(arrayOfPlanetData) {
  arrayOfPlanetData.forEach(function(planet) {
    createPlanetThumb(planet);
  })
})
.catch(function(error) {
  console.log(error);
});
```

写的再简洁些：

```javascript
getJSON('xxx/yyy/zzz.json')
.then(function(response){
  return Promise.all(response.results.map(getJSON));
})
.then(function(arrayOfPlanetData) {
  arrayOfPlanetData.forEach(function(planet) {
    createPlanetThumb(planet);
  })
})
.catch(function(error) {
  console.log(error);
});
```

## 3.2 AJAX

AJAX的全称，是异步的JavaScript和XML(**A**synchronous **J**avaScript **A**nd **X**ML)，它是一种异步请求数据的概念，其核心理念很简单：异步的通过JavaScript发送请求，然后前端继续完成其他的任务，等数据返回再进行处理。这些请求和返回会在其他线程执行，不会阻塞主线程导致页面卡顿。AJAX可以在不重新加载整个页面的情况下检索并显示检索结果。发送AJAX请求有几种方式，有些需要API Key，有些需要使用OAuth机制，有些可以直接访问，无需任何验证。返回的数据也有几种形式：XML，JSON和HTML。

我们使用**API**与各种数据源交互，API全称为应用编程接口(Application Programming Interface)，由服务端负责提供。比如一些知名网站以API的形式向外提供天气服务，可以查询天气预报数据。可以查阅[API数据库](http://www.programmableweb.com/apis/directory)查找自己感兴趣的内容。

我们首先来看看使用XHR的方式，然后学习jQuery如何生成AJAX请求，最后了解使用fetch API生成异步请求的新方法。

### 3.2.1 XHR方式

JavaScript引擎除了提供`document`，还提供发出异步HTTP请求的方式，即使用`XMLHttpRequest`对象。然后使用`open()`函数打开。它有很多参数，最重要的是前两个参数：

1. HTTP方法
2. 要发送请求的URL

要实际发送请求，需要使用`send()`方法：

```javascript
const asyncRequestObject = new XMLHttpRequest();
asyncRequestObject.open('GET', 'https://unsplash.com');
asyncRequestObject.send();
```

要处理成功的请求，我们还需要给xhr对象的`onload`属性设为处理它的函数，如果没有设置`onload`，则请求的确会返回，但是它什么也不会发生：

```javascript
function handleSuccess() {
  console.log(this.responseText);
}

asyncRequestObject.onload = handleSuccess;
```

要处理错误则需要使用`onerror`属性：

```javascript
function handleError () {
    // 在这个函数中，`this` 值是 XHR 对象
    console.log( '出现错误 😞' );
}

asyncRequestObject.onerror = handleError;

```

如果`onerror`没有设置，那么出现任何错误都不会有提示。你的代码将不知道发生了什么问题，也不知道如何恢复。完整的代码应该这样写：

```javascript
function handleSuccess () { 
  console.log( this.responseText ); 
  // https://unsplash.com/ 的 HTML
}

function handleError () { 
  console.log( '出现错误 😭' );
}
const asyncRequestObject = new XMLHttpRequest();
asyncRequestObject.open('GET', 'https://unsplash.com');
asyncRequestObject.onload = handleSuccess;
asyncRequestObject.onerror = handleError;
// 对某些请求而言，需要设置请求头
// asyncRequestObject.setRequestHeader('Authorization', 'Client-ID <你的客户端id>');
asyncRequestObject.send();
```

一般来说，我们不会直接请求HTML代码，因为不容易解析。时至今日互联网上最流行的数据交换格式就是JSON了，如果我们需要解析JSON数据，可以使用`JSON.parse()`：

```javascript
function handleSuccess () {
   const data = JSON.parse( this.responseText ); // 将数据从 JSON 转换为 JavaScript对象
   console.log( data );
}

asyncRequestObject.onload = handleSuccess;
```

使用XHR意味着要写一堆代码，但下面要介绍的两种方式，却能让我们写更少的代码来实现同样的功能。

### 3.2.2 jQuery方式

我们又和老朋友jQuery见面了，jQuery提供了一个强大的`ajax()`方法来处理所有的异步请求。`ajax()`方法使用方式比较灵活多样：

```javascript
$.ajax(<url-to-fetch>, <a-configuration-object>);

// 或

$.ajax(<just a configuration object>);
```

使用配置对象是一种常用的方式，设置好一切信息就可以了，通过`done()`方法来完成对响应的处理，如果是JSON，将自动转换成JavaScript对象：

```javascript
function handleResponse(data) {
    console.log('the ajax request has finished!');
    console.log(data);
}

$.ajax({
    url: 'https://swapi.co/api/people/1/'
}).done(handleResponse);
```

jQuery 具有很多用来发出异步调用的便捷方法。这些方法是：

- [.get()](http://api.jquery.com/jQuery.get/)
- [.getJSON()](http://api.jquery.com/jQuery.getJSON/)
- [.getScript()](http://api.jquery.com/jQuery.getScript/)
- [.post()](http://api.jquery.com/jQuery.post/)
- [.load()](http://api.jquery.com/load/)

每个方法都会调用 jQuery 的主方法 `.ajax()`。这些方法对请求进行默认的配置，然后再调用 `.ajax()`。

### 3.2.3 fetch方式

fetch是发送网络请求的新方式。前两种方式各有利弊，使用XHR太繁琐，要写一堆代码；使用jQuery需要加载第三方JavaScript库，需要消耗流量并花时间。有没有更好的，原生支持的方式呢？答案就是fetch API！它让资源请求(主要是通过网络)变得更简单，而且从上面的讨论已经知道，fetch底层是由Promise实现的。来看两个fetch发送请求的示例：

```javascript
fetch(
  'https://api.unsplash.com/search/photos?page=1&query=${searchedForText}',
  {
    headers: {
      Authorization: 'Client-ID abc123'
    },
    method: 'POST'
  }
);

////////////////////////////
const requestHeaders = new Headers();
requestHeaders.append('Authorization', 'Client-ID abc123');

fetch(
  'https://api.unsplash.com/search/photos?page=1&query=${searchedForText}',
  {
    headers: requestHeaders,
    method: 'POST'
  }
);
```

它将返回一个Promise，处理响应等同于处理这个Promise：

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(function(response) {
    debugger; // 使用返回的response
});
```

返回的响应是`Response`类型，当fetch请求resolve的时候就会返回该对象。该对象包含关于响应本身的信息，要获取数据则需要访问响应的主体，如果API返回的数据是JSON格式，我们就要调用`json()`：

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(function(response) {
    return response.json();
}).then(addImage);

function addImage(data) {
    let htmlContent = '';
    const firstImage = data.results[0];

    if (firstImage) {
        htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
    } else {
        htmlContent = 'Unfortunately, no image was returned for your search.'
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}
```

`Response`对象上有很多方法，如果请求的是图片，则可以使用`.blob()`方法。如果使用ES6的箭头函数，还能写的更简洁：

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(response => response.json())
.then(addImage);
```

因为返回的是一个Promise，因此处理错误使用`catch()`也是再明显不过的事情了，`catch()`中的回调函数有一个表示错误对象的参数：

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(response => response.json())
.then(addImage)
.catch(e => requestError(e, 'image'));

function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}	
```

# 四. 参考文献

1. [Udacity前端开发纳米学位](https://cn.udacity.com/fend)
2. [JavaScript Promises](https://developers.google.cn/web/fundamentals/primers/promises)