# JavaScript编程

本文是对JavaScript语言的一次系统的总结。全文一共分为5个部分。第一部分先介绍最基本的语言基础，比如条件语句，循环语句，函数，基本的数据结构等等。第二步介绍jQuery，掌握了jQuery基本技术就能够随心所欲地对页面元素进行各种操作。第三部分介绍面向对象的JavaScript，这部分将系统的介绍如何使用JS来实现我们在其他OOP语言中常见的编程范式：封装，继承和多态，以及不太好理解的this关键字。第四部分介绍ES6语法，其本质是语法糖，抹上一层语法糖会使得你的JS看起来更优美，在这一节会介绍箭头函数，也就是其他编程语言中的Lambda表达式。第五部分介绍JavaScript的异步特性，比如怎样使用JS发送异步请求，然后获得并处理结果。

看完这篇文章后，你将对JavaScript这门编程语言有成体系化的理解。对于以后理解和掌握基于JS的其他语言，比如CoffeeScript和TypeScript都很有帮助。

# 一. JavaScript入门

JavaScript语言诞生于1995年，Brendan Eich仅用了10天时间就创造了它，这门语言最初的目的是为网页添加交互式和动态特性。现在这门语言已经可以用在后端开发甚至嵌入式领域了。现代JavaScript语言的发展已经加入ECMA标准化，按照年份来命名，比如ES2016和ES2017等等。

所有的浏览器都内置了JavaScript引擎。我们可以通过各大浏览器的开发者工具中的控制台(console)来运行JS程序，可以通过`console.log()`在控制台打印信息。

## 1.1 不同浏览器上的开发工具

### 1.1.1 Google Chrome

Chrome 开发者工具是 Google Chrome 中内置的网页编辑和调试工具。[这篇文章](https://developers.google.cn/web/tools/chrome-devtools/)是介绍开发者工具的官方文档。

要打开 Chrome 开发者工具，右键单击任意页面元素，并选择检查（Inspect），或者打开浏览器窗口右上角的 Chrome 菜单并选择"更多工具 (More Tools)" --"开发者工具（Developer Tools）"。或者你可以使用快捷方式 `⌘ + ⌥ + I` （Mac） 或 `Ctrl + ⇧ + I` （Linux）。

### 1.1.2 Mozilla Firefox

Firefox 开发者工具让你可以在台式机和手机上检查、编辑及调试 HTML、CSS 和 JavaScript。你也可以下载 Firefox Developer Edition 版的 Firefox，它专为开发者定制，具有最新的 Firefox 功能和开发者试验工具。

要学习更多内容，请查看[官方文档](https://developer.mozilla.org/zh-CN/docs/Tools)。要打开 Firefox 开发者工具，右键单击任意页面 元素并选择“检查元素（Inspect Element）”，或者打开浏览器窗口右上角的 Firefox 菜单并选择“开发者（Developer）”。 或者，你可以使用快捷方式 `⌘ + ⌥ + I`（Mac）或 `Ctrl + ⇧ + I`（Windows/Linux）。

### 1.1.3 Safari

对于 Mac 用户，Safari 自带有 Web Inspector，这是一个强大的工具，能够轻松地修改、调试和优化网站，以便在两个平台上同时获得最佳的性能和兼容性。要学习更多内容，请查看[官方文档](https://developer.apple.com/safari/tools/)。

要访问 Safari 的网页开发工具，请在 Safari 的高级首选项中启用"开发（Develop）菜单"。启用后，可右键单击任意页面元素并选择"检查元素（Inspect Element）"以打开 Web 开发工具，或者使用快捷方式 `⌘ + ⌥ + I`。



## 1.2 数据类型与变量

JavaScript中的数据类型包含数值，字符串，布尔类型和特殊类型，有时候类型之间还会有隐式类型转换。

### 1.2.1 基本数据类型

JavaScript中的数值类型包含各种正负整数和小数，可以进行各种常见的加减乘除算术运算：

| 运算符 |       含义       |
| :----: | :--------------: |
|   +    |        加        |
|   -    |        减        |
|   *    |        乘        |
|   /    |        除        |
|   %    | 求余数(保留整数) |
|   ++   |       累加       |
|   --   |       递减       |

可以对数字进行各种大于，小于或等于的比较：

| **运算符** |  **含义**  |
| :--------: | :--------: |
|     <      |    小于    |
|     >      |    大于    |
|     <=     | 小于或等于 |
|     >=     | 大于或等于 |
|     ==     |    等于    |
|     !=     |   不等于   |

JS中的注释语句有两种：单行注释和多行注释。

```javascript
// 这是一条单行注释

/*
这是
一条多行
注释
*/
```

JS中的字符串要用单引号或者双引号引起来。很多开发指南都建议字符串使用单引号。字符串有很多运算，比如加法运算符`+`表示字符串连接，如果字符串和数值数据之间用`+`号连接，那么得到的结果会自动转换成字符串。

字符串还可以像数组一样被索引，比如`James[0]`返回字符"J"，这种索引是从0开始的，如果字符串的长度为n，那么最后一个字符的索引为n-1。可以使用length来获得字符串的长度，可以使用replace函数替换其中一部分字符。

和其他编程语言一样，有一些特殊字符在使用时需要转义，比如在字符串中带入双引号，就需要使用反斜杠\进行转义：

```javascript
console.log("The man whispered, \"please speak to me.\"");
```

一些需要转义的特殊字符：

| **代码** |  **字符**   |
| :------: | :---------: |
|    \     | \ (反斜杠)  |
|    \"    | '' (双引号) |
|    \'    | ' (单引号)  |
|    \n    |   newline   |
|    \t    |     tab     |

字符串之间是可以进行比较的，这种比较是区分大小写的：

```javascript
"Yes" == "yes" // false
'Y' != 'y' // true
```

比较的结果只能是true或者false，这也是一种重要的基本数据类型：布尔型。

有三种特殊的类型是需要注意的：null，undefined和NaN。null是一种表示"value of nothing"的数据类型，即”空值“。undefined是一种表示"absence of value"的数据类型，即"缺少值"。NaN表示"not a number"，即"非数字"，这在数字运算存在错误时被返回，比如试图给负数求平方根运算。

类型之间可能会有些你看不见的"隐式类型转换"：

```javascript
"1" == 1; // true
0 == false; // true
```

在其他编程语言中也会有这种现象的发生。JS引擎解析代码的时候会自动转换相应的数据类型，比如上面提到的字符串类型与数值相加，数值就会被自动转换成字符串。使用==或者!=运算时也会发生这样的转换，所以如果要比较值是否相等，最好使用**绝对相等**运算符===和!==，举例：

```javascript
"1" === 1 // false
0 === false // false
```

### 1.2.2 变量

对于JS这样的弱类型语言而言，它的变量可以被赋值为任何类型，包括基础类型和后面要提到的类类型，甚至也可以是函数。JS的变量命名遵循驼峰规则，并使用var来定义：

```javascript
var name = 'Richard';
```

这只是基本的定义变量的方式，然而var定义的变量有一些微妙的地方，现代JavaScript语言推荐使用let来定义具有块级作用于的变量。

## 1.3 条件语句

JavaScript中的条件语句就两种：if和switch，搭配各种逻辑运算符使用更佳。

### 1.3.1 if语句

if语句可以根据条件是否成立来决定是否执行某段代码：

```javascript
if (/* 这个表达式为真 */) {
  // 运行这段代码
} else {
  // 运行这段代码
}
```

else代码块是可以不要的，可以根据表达式是否为真来决定该运行哪段代码：

```javascript
var a = 1;
var b = 2;

if (a > b) {
  console.log("a大于b");
} else {
  console.log("a小于或等于b");
}
```

> 输出："a小于或等于b"。

如果一次判断不够，还可以多写几个else if：

```javascript
var weather = "sunny";

if (weather === "snow") {
  console.log("Bring a coat.");
} else if (weather === "rain") {
  console.log("Bring a rain jacket.");
} else {
  console.log("Wear what you have on.");
}
```

> **输出：** Wear what you have on.

### 1.3.2 逻辑运算符

JavaScript中的基本逻辑运算符有三种：AND，OR和NOT。分别使用`&&`，`||`和`!`表示。其实就是离散数学中的"真值表"：

1. value1 && value2：如果 `value1` **和** `value2` 都为 `true`，则返回 `true`
2. value1 || value2：如果 `value1` **或** `value2`为 `true`，则返回 `true`
3. !value1：返回 `value1` 的**相反值**。如果 `value1` 为 `true`，则 `!value1` 为 `false`

一定注意逻辑运算符遵循**短路求值**原则：只要逻辑运算符会尽可能快的返回真值，比如对于value1 || value2而言，如果value1求值为true，那么value2就不会再求值了，因为此时该表达式的值一定是true，不需要再判断了。

另外一个要注意的问题是JS中的有些值放在布尔表达式中求值时会被固定的求值为真或假，下面的值都会被求值为真：

* true
* -42
* "pizza"
* {}
* []

下面的值都会被求值为假：

* false
* null
* undefined
* 0
* NaN
* ""

JS还衍生出了一种运算符叫三元运算符，可以帮助避免写出冗长的if else语句：

```javascript
conditional ? (if condition is true) : (if condition is false)
```

如果条件为真则执行冒号前面的语句，否则执行冒号后面的语句。

```javascript
var isGoing = true;
var color = isGoing ? "green" : "red";
console.log(color);
```

> **输出**：green

### 1.3.3 switch语句

如果代码中重复出现大量的if语句，每个条件都给予相同的值，那么用switch语句改写好了：

```javascript
if (option === 1) {
  console.log("You selected option 1.");
} else if (option === 2) {
  console.log("You selected option 2.");
} else if (option === 3) {
  console.log("You selected option 3.");
} else if (option === 4) {
  console.log("You selected option 4.");
} else if (option === 5) {
  console.log("You selected option 5.");
} else if (option === 6) {
  console.log("You selected option 6.");
}
```

改写成：

```javascript
switch (option) {
  case 1:
    console.log("You selected option 1.");
    break;
  case 2:
    console.log("You selected option 2.");
    break;
  case 3:
    console.log("You selected option 3.");
    break;
  case 4:
    console.log("You selected option 4.");
    break;
  case 5:
    console.log("You selected option 5.");
    break;
  case 6:
    console.log("You selected option 6.");
    break; // technically, not needed
}
```

注意这里每个分支都要有break语句，否则当表达式的值满足某个分支时，该分支下面的语句都会被执行一遍（fall through问题）。当没有任何与switch表达式相符的值时，可以默认执行default分支：

```javascript
var prize = "";

switch (winner) {
  case 1:
    prize += "a trip for two to the Bahamas and ";
  case 2:
    prize += "a four piece furniture set.";
    break;
  case 3:
    prize += "a smartwatch and ";
  default:
    prize += "tickets to the circus.";
}

console.log("You've won " + prize);
```

## 1.4 循环

循环语句重复一定次数地执行特定的操作。JS的循环有两种：while循环和for循环。当你掌握了循环，程序设计的三种基本结构就配齐了：顺序，条件和循环。任何循环都具有以下三大部分：

1. **何时开始：**设置循环的代码 — 例如定义某个变量的起始值。
2. **何时停止：**测试循环是否继续的逻辑条件。
3. **如何转到下一项：** 递增或递减步骤 — 例如，`x = x * 3` 或 `x = x - 1`

### 1.4.1 while循环

举例：

```javascript
var start = 0; // 何时开始
while (start < 10) { // 何时停止
  console.log(start);
  start = start + 2; // 如何进入下一项
}
```

> **输出：**
> *0*
> *2*
> *4*
> *6*
> *8*

循环可以和上面介绍的条件语句一起使用，一个满足以下要求的 `while` 循环：

- 从数字 1 循环访问到 20
- 如果数字可以被 3 整除，则输出 “Julia”
- 如果可以被 5 整除，则输出 “James”
- 如果可以同时被 3 和 5 整除，则输出 “JuliaJames”
- 如果不能被 3 或 5 整除，则输出该数字

可以这么写：

```javascript
var x = 1;

while (x <= 20) {
    // check divisibility
    // print Julia, James, or JuliaJames
    // increment x
    if (x % 3 === 0 && x % 5 === 0) {
        console.log('JuliaJames');
    } else if (x % 3 === 0) {
        console.log('Julia');
    } else if (x % 5 === 0) {
        console.log('James');
    } else {
        console.log(x);
    }
    x = x + 1;
}
```

### 1.4.2 for循环

for循环基本结构：

```javascript
for ( start; stop; step ) {
  // code
}
```

下面这个 for 循环输出了 0-5 的每个值：

```javascript
for (var i = 0; i < 6; i = i + 1) {
  console.log("Printing out i = " + i);
}
```

> *Printing out i = 0*
> *Printing out i = 1*
> *Printing out i = 2*
> *Printing out i = 3*
> *Printing out i = 4*
> *Printing out i = 5*

循环还可以嵌套：

```javascript
for (var x = 0; x < 5; x = x + 1) {
  for (var y = 0; y < 3; y = y + 1) {
    console.log(x + "," + y);
  }
}
```

> **输出**：
> *0, 0*
> *0, 1*
> *0, 2*
> *1, 0*
> *1, 1*
> *1, 2*
> *2, 0*
> *2, 1*
> *2, 2*
> *3, 0*
> *3, 1*
> *3, 2*
> *4, 0*
> *4, 1*
> *4, 2*

循环中可以使用类似C语言的自增自减运算符：

```javascript
x++ or ++x // 等同于 x = x + 1 
x-- or --x // 等同于 x = x - 1
x += 3 // 等同于 x = x + 3
x -= 6 // 等同于 x = x - 6
x *= 2 // 等同于 x = x * 2
x /= 5 // 等同于 x = x / 5
```

## 1.5 函数

函数是用来封装重复代码块的基本结构。随着代码越写越长，有些代码会出现越来越多的重复，这个时候我们就需要把重复的代码抽象出来封装成函数，通过调用函数来实现对应的功能。如果需求有变动，修改一处总比到处修改要好，这也是提高代码健壮性的一种策略。

### 1.5.1 参数和返回值

函数将一段代码封装起来，并在程序中使用。函数可以具有一个参数，表示该函数的输入：

```javascript
function reverseString(reverseMe) {
  // 反转一个字符串的代码！
}
```

多个参数用逗号分隔开：

```javascript
function doubleGreeting(name, otherName) {
  // 向两人问好的代码！
}
```

函数也可以没有任何参数。直接封装代码并执行某项功能，直接把小括号留空就行了：

```javascript
function sayHello() {
  var message = "Hello!";
  console.log(message);
}
```

如果没有返回值，函数的输出结果就是undefined。如果需要返回结果，那么就要使用return语句：

```javascript
function sayHello() {
  var message = "Hello!";
  return message; // 返回message而不是打印message
}
```

注意区分parameter和argument的概念。parameter是形参，出现在函数声明中，相反argument是值，它出现在函数的调用代码中。

### 1.5.2 作用域

一旦引入函数，就会存在作用域的问题。在任何编程语言中，作用域都是一个容易出现微妙错误，难以debug的基础概念。它的内涵是表示某个标识符(变量或函数名)在部分程序片段中是否可见或可被访问。

JS中有三种不同类型的作用域：全局作用域，函数作用域和ES6要引入的块作用域。在所有函数之外定义的标识符具有**全局作用域**，可以在程序的任何位置使用，程序中所有函数的内部都能访问到它。如果标识符是在函数内部定义的，那么该变量具有**函数作用域**，该函数内部任何位置都能访问到它，包括该函数内部定义的其他函数。

JS引擎在查找标识符时遵循从内向外的查找模式。它首先查看该标识符是否在当前函数中定义，如果找到了则到此为止；如果没找到就查看外面一层，一直持续到达全局作用域。如果仍然找不到，就会返回错误。如果函数内部出现了与全局标识符同名的标识符，则会在函数内发生作用域覆盖，只能访问到函数内定义的那个标识符。

在任何编程语言中都是不推荐使用全局变量的，一来全局变量会跟其他相同名字的变量产生 冲突，二来在多线程环境下，全局变量的读写容易产生bug。

JS中海油一个叫"**提升(hoisting)**"的特性也会导致比较微妙的错误。在执行任何代码前，所有的函数声明都被提升到当前作用域的顶部。比如下面这个函数：

```javascript
findAverage(5, 9);
function findAverage(x, y) {
  var answer = (x + y) / 2;
  return answer;
}
```

JS引擎在解析这行代码时，会将函数的定义提升到当前作用域的顶部，因此先调用函数后定义函数是被允许的。提升还会发生在**变量的声明**上，比如下面这段代码：

```javascript
function sayGreeting() {
  console.log(greeting);
  var greeting = "hello";
}
```

> **输出**：undefined

输出的结果居然是undefined，怎么回事？原因是提升仅对变量的声明起作用，也就是说上面这段代码相当于：

```javascript
function sayGreeting() {
  var greeting;
  console.log(greeting);
  greeting = "hello";
}
```

声明虽然提升到了函数作用域的顶部，但赋值语句还停留在原地，这就是输出undefined的原因。最佳实践是在脚本顶部声明函数和变量，这样代码的外观和执行方式就保持一致了。

### 1.5.3 函数表达式

函数表达式，顾名思义，将函数作为表达式来使用：

```javascript
var meow = function(max) {
  var catMessage = "";
  for (var i = 0; i < max; i++) {
    catMessage += "meow";
  }
  return catMessage;
}
```

函数可以赋值给一个变量，之后就可以用这个变量来调用函数。函数表达式有三种模式。**函数可以作为参数**，此时作为参数的函数有一个专门的名字叫**回调(callback)**：

```javascript
// 函数表达式 catSays
var catSays = function(max) {
  var catMessage = "";
  for (var i = 0; i < max; i++) {
    catMessage += "meow ";
  }
  return catMessage;
};

// 函数声明 helloCat 接受一个回调
function helloCat(callbackFunc) {
  return "Hello " + callbackFunc(3);
}

// catSays 作为回调函数传入
helloCat(catSays);
```

函数表达式可以有名称，称为**命名函数表达式**，直接使用变量名而不是函数名来调用它：

```javascript
var favoriteMovie = function movie() {
  return "the fountain";
}

favouriteMovie();
```

如果尝试使用函数名调用它，会返回引用错误。最后一种模式被称为内联函数表达式，即就地定义函数：

```javascript
function movies(messageFunction, name) {
  messageFunction(name);
}

// 调用 movies 函数，传入一个函数和电影名称
movies(function displayFavorite(movieName) {
  console.log("My favorite movie is " + movieName);
}, "Finding Nemo");
```

当你不需要重复使用该函数时，这么定义是最方便的。

## 1.6 数组

数组是一种非常常见的顺序存储结构。这节会介绍数组如何创建和访问，并介绍它的一些常用的方法。

### 1.6.1 数组的创建和访问

定义新数组的方法是列出各个值，用逗号分隔然后放在方括号`[]`里。

```javascript
// 用三个字符串创建一个 `donuts` 数组
var donuts = ["glazed", "powdered", "jelly"];
```

作为弱类型语言，还可以混搭：

```javascript
var mixedData = ["abcd", 1, true, undefined, null, "all the things"];
```

还可以嵌套：

```javascript
var arraysInArrays = [
  [1, 2, 3], 
  ["Julia", "James"], 
  [true, false, true, false]
];
```

数组的访问使用索引来实现，索引从0开始，如果数组长度为n，那么最后一个元素的索引为n-1。

```javascript
var donuts = ["glazed", "powdered", "sprinkled"];
console.log(donuts[0]); 
```

如果访问了不存在的元素，JS将返回undefined，其他语言会报下标越界错误。

```javascript
// `donuts` 数组中的第四个元素不存在！
console.log(donuts[3]); 
```

### 1.6.2 数组作为对象

数组作为特殊的**对象**，提供了大量实用的属性和方法。Array.length属性可用于了解数组长度：

```javascript
var donuts = ["glazed", "powdered", "sprinkled"];
console.log(donuts.length);
```

> 输出结果：3

注意，字符串也有length属性，同样可以`"James".length`进行访问。

如果想修改数组，可以使用push()和pop()方法。push()方法在数组的末尾添加元素：

```javascript
var donuts = ["glazed", "chocolate frosted", "Boston creme", "glazed cruller", "cinnamon sugar", "sprinkled"];
donuts.push("powdered"); 
```

> **返回：**7
> **donuts 数组：**["glazed", "chocolate frosted", "Boston creme", "glazed cruller", "cinnamon sugar", "sprinkled", "powdered"]

pop()方法从数组末尾删除元素，并返回已经被删除的元素：

```javascript
var donuts = ["glazed", "chocolate frosted", "Boston creme", "glazed cruller", "cinnamon sugar", "sprinkled", "powdered"];

donuts.pop(); // 从 "donuts" 数组的末尾弹出 "powdered"
donuts.pop(); // 从 "donuts" 数组的末尾弹出 "sprinkled"
donuts.pop(); // 从 "donuts" 数组的末尾弹出 "cinnamon sugar"
```

splice()函数可以向数组的任意位置添加和删除元素，第1个参数表示要从哪个索引开始更改数组，第2个参数表示要删除的元素数量 ，剩下的参数表示要添加的元素：

```javascript
var donuts = ["glazed", "chocolate frosted", "Boston creme", "glazed cruller"];
// 删除索引1处的 "chocolate frosted" ，并从索引1开始添加 "chocolate cruller" 和 "creme de leche"
donuts.splice(1, 1, "chocolate cruller", "creme de leche"); 
```

还可以使用负索引倒着修改数组：

```javascript
var donuts = ["cookies", "cinnamon sugar", "creme de leche"];

// ["cookies", "chocolate frosted", "glazed", "cinnamon sugar", "creme de leche"]
donuts.splice(-2, 0, "chocolate frosted", "glazed");
```

可以查阅[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)来查阅数组的所有内置方法。

可以对数组进行循环，循环的方式有三种：基本for循环，forEach循环和map。基本for循环就是for循环结合length来遍历数组：

```javascript
var donuts = ["jelly donut", "chocolate donut", "glazed donut"];

// 变量 `i` 用来遍历数组中的每个元素
for (var i = 0; i < donuts.length; i++) {
    donuts[i] += " hole";
    donuts[i] = donuts[i].toUpperCase();
}
```

还可以用forEach()方法来遍历数组，它的参数是一个内联函数表达式，该函数表达式接受3个参数：element，index，array。第1个参数表示数组中的元素，第2个参数表示该元素在数组中的索引，第3个参数表示目标数组，但后两个参数是可以省略的：

```javascript
var donuts = ["jelly donut", "chocolate donut", "glazed donut"];

donuts.forEach(function(donut) {
  donut += " hole";
  donut = donut.toUpperCase();
  console.log(donut);
});
```

> **输出：**
> *JELLY DONUT HOLE*
> *CHOCOLATE DONUT HOLE*
> *GLAZED DONUT HOLE*

如果需要得到遍历修改过的新数组，那么不能用forEach()，因为它的返回值为undefined，但是可以使用更强大的map()方法 通过现有数组创建一个新数组，该方法是从函数式编程思想中得来的：

```javascript
var donuts = ["jelly donut", "chocolate donut", "glazed donut"];

var improvedDonuts = donuts.map(function(donut) {
  donut += " hole";
  donut = donut.toUpperCase();
  return donut;
});
```

> **donuts 数组：**["jelly donut", "chocolate donut", "glazed donut"]
> **improvedDonuts 数组：**["JELLY DONUT HOLE", "CHOCOLATE DONUT HOLE", "GLAZED DONUT HOLE"]

如果在数组中存储了数组，就成了多维数组。

```javascript
var donutBox = [
  ["glazed", "chocolate glazed", "cinnamon"],
  ["powdered", "sprinkled", "glazed cruller"],
  ["chocolate cruller", "Boston creme", "creme de leche"]
];
```

使用多重循环来遍历数组：

```javascript
for (var row = 0; row < donutBox.length; row++) {
  // 这里，donutBox[row].length 指的是当前被循环的甜甜圈(donut)数组的长度
  for (var column = 0; column < donutBox[row].length; column++) {
    console.log(donutBox[row][column]);
  }
}
```

## 1.7 对象

对象是JS中强大的特性，它允许将相关属性和方法封装到一个被称为"类"的容器中使用。实际上在JS中万物皆对象，函数也不过是一个callable的对象。可以使用typeof运算符来返回后面数据类型的名称：

```javascript
typeof "hello" // 返回 "string"
typeof true // 返回 "boolean"
typeof [1, 2, 3] // 返回 "object"（数组是一种对象类型）
typeof function hello() { } // 返回 "function"
```

对象的创建可以采用字面值记法：

```javascript
var sister = {
  name: "Sarah", 
  age: 23,
  parents: [ "alice", "andy" ],
  siblings: ["julia"],
  favoriteColor: "purple",
  pets: true,
  paintPicture: function() { return "Sarah paints!"; }
};
```

注意：

* “键”（表示**属性**或**方法**名称）和它的“值”用**冒号**隔开了

* 键值对用**逗号**隔开

* 整个对象包含在花括号 `{ }` 里。

访问属性可以使用括号记法：`sister["parents"]`也可以使用点记法：`sister.parents`。点记法更符合面向对象的使用习惯。创建对象的时候要遵守命名约定，否则会出现错误，要避免的做法：

1. 不要使用引号包围属性名称；
2. 不要使用数字作为属性名称的第1个字符；
3. 不要在属性名称中使用空格和连字符；

最好是使用驼峰命名法。

# 二. jQuery入门

jQuery是JavaScript库，它通过选择器操纵DOM（文档对象模型），jQuery存在的原因是纯JS操作DOM其实并不方便，比如我想给id为parent的元素添加一个子元素div，原生的JS写法如下：

```javascript
var div = document.createNode('div');
div.innerHTML = "hello udacity";
var parent = document.querySelector('#parent');
parent.appendChild(div);
```

但如果使用jQuery，一行就搞定了，可以说是"write less, do more"：

```javascript
$('parent').append('<div>hello udacity</div>');
```

jQuery解决了各种浏览器兼容问题，所以开发人员只需要关注要实现的功能即可。jQuery一大特点就是反复出现的美元符号`$`，在jQuery中它代表一个指向与之前相同的JavaScript对象的指针。`$`返回一个类数组的对象，称为jQuery collection，通过它调用jQuery各种功能。

## 2.1 文档对象模型和选择器

DOM是一种树形结构，全称是"文档对象模型(Document Object Model)"。我们编写的HTML代码最终会被浏览器解析成一棵被称为DOM的树型数据结构，jQuery通过选择并操作DOM中的元素来为网页增加动态效果。

### 2.1.1 jQuery的引入

jQuery的引入通过script标签实现，有三种方式：

```html
<!-- 本地 -->
<script src='js/jquery.min.js'></script>
<!-- jQuery官方 -->
<script src='//code.jquery.com/jquery-1.11.1.min.js'></script>
<!-- 通过CDN(推荐做法) -->
<script src='//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
```

### 2.1.2 jQuery的套路

用jQuery操作网页的套路就是"先选择器选择，然后调用函数实现功能"。只要把握好这个方法，一切都迎刃而解了。如果传递的参数为字符串，jQuery对象就会为我们选择对应的元素，就像CSS那样：

```javascript
// 标签选择
$('tag')
// 类选择
$('.class')
// id选择
$('#id')
```

所有能在CSS中使用的选择器都能在jQuery中使用，举个例子：

```javascript
// select all the li elements
var listElements = $('li');
// select all elements of class green
var articleItems = $('.article-item');
// select an element with id nav
var nav = $('#nav');
// select multiple elements at a time
$("#topContacts, #footerContacts").append(…);
```

## 2.2 使用jQuery动态修改网页

jQuery本质上还是一个JavaScript的库，它提供了很多很强大的功能。通过它我们可以动态地操作DOM，添加删除元素，修改元素的属性和内容，在各种特殊点上执行某个函数。都说HTML用来表现网页的信息结构，CSS用来渲染网页的外观，那么JavaScript正是通过动态操作DOM来为网页添加功能，这是它起作用的根本原因。不管是用jQuery也好，还是用React，Vue和AngularJS这些库也好，它们最根本的本质还是通过操作DOM来修改网页的表现形式从而实现交互式网页。

### 2.2.1 用jQuery遍历DOM

jQuery提供了一系列的函数，可以实现更复杂的操作，比如在DOM中遍历各个元素。学过数据结构的同学对这些函数的名字肯定不陌生。

parent()方法可以选择直接父元素（只向上回溯一层）；如果要选择任一父元素，可以使用parents()函数，参数为父元素的名称，就可以遍历所有的父元素；children()方法能够返回所有的直接子元素，只向下遍历了一层；同样地，如果需要选择任一子元素，就需要find()方法；最后，siblings()方法能够返回当前元素的所有兄弟元素。

### 2.2.2 用jQuery修改类和CSS属性

addClass()函数可以为选中的元素添加一个类属性，比如`$('#item').addClass('blue')`为id为item的元素添加类"blue"。

toggleClass()函数可以根据元素的状态决定增加或者移除class属性，比如移除Article #2的featured类属性。

```javascript
featured = $('.featured');
featured.toggleClass('featured');
```

next()函数返回元素后面的直接兄弟元素，比如为Article #3添加featured类名。

```javascript
var article2 = $('.featured');
var article3 = article2.next();
article2.toggleClass('featured');
article3.toggleClass('featured');
```

可以使用attr()函数来修改元素的属性值，它有两种签名：attr(attributeName)用于读取属性值，attr(attributeName, value)用于设置属性值，比如为第一个a元素增加href属性值。

```javascript
var navList = $('.nav-list');
var firstItem = navList.children().first();
var link = firstItem.find('a');
link.attr('href', '#1');
```

还可以使用css()来轻松地获取和修改CSS代码。要注意，使用JS来修改CSS实际上是添加了内嵌的CSS，即修改元素的style属性。实际开发过程中还是要权衡一下是否有必要这么做，还是说可以通过CSS解决问题。css(propertyName)可以获取CSS属性值，css(propertyName, value)可以设置属性值。比如将article-items的 字号设置为20px。

```javascript
articleItems = $('.article-item');
articleItems.css('font-size', '20px');
```

### 2.2.3 用jQuery修改元素内容

除了可以遍历DOM，读写DOM元素的属性，我们还可以使用jQuery来修改元素的内容，有两种方法可以获取标签中的数据：html()和text()函数。html()会返回目标元素下所有子元素的内容，包括标签在内，但text()函数返回的内容会去掉所有的标签。比如想要实现把文本输入框内容设置为h1标题的内容，就可以这么写：

```javascript
$('#input').on('change', function() {
  var val, h1;
  val = $('#input').val();
  h1 = $('.articles').children('h1');
  h1.text(val);
})
```

当id为input的元素内容发生改变时将回调该匿名内嵌函数，该函数从input元素中取出内容，然后将它设置到h1元素中。val()函数获取所匹配元素集合中第一个元素的值，或者也可以设置所有匹配到的元素的值。

### 2.2.4 用jQuery修改网页元素

使用jQuery还可以动态地添加和删除DOM中的元素。我们先来看看如何使用remove()函数删除元素，举个例子，将Article #1中的无序列表移除：

```javascript
var articleItems, ul;
articleItems = $('.article-item');
ul = articleItems.find('ul');
ul.remove();
```

jQuery还可以一行代码实现创建新的DOM节点并把它们添加到DOM，有4种常见的方法：append()，prepend()，insertBefore()和insertAfter()。

append()和preprend()可以为元素增加子元素，前者将子元素作为最后一个元素添加，后者将子元素作为第一个元素添加：

```javascript
var firstArticleItem;
firstArticleItem = $('.article-item').first();
firstArticleItem.append('<img src="http://placepuppy.it/200/300"');
firstArticleItem.prepend('<img src="http://placepuppy.it/200/300"');
```

insertBefore()和insertAfter()为元素添加兄弟元素，也是一个添加到前面，一个添加到后面。

### 2.2.5 用jQuery实现迭代访问

each()方法能够用来循环访问jQuery集合，对集合中的每个元素执行一个回调函数。在回调函数中如果想对一个传入的DOM元素调用任意的jQuery方法，需要使用`$(this)`来获取循环中的当前元素。举个例子，为网页中所有的p元素增加字数统计：

```javascript
$('p').each(function() {
  var text = $(this).text();
  $(this).text(text + ' ' + text.length);
});
```

这种回调函数的使用模式还会在前后端的各种库和框架中看到。比如jQuery还有一个功能是传递一个函数给jQuery对象，也就是美元符号，来实现在DOM构建完成之后的document.ready上立即执行这个回调函数。

这么做有什么意义呢？文档的head标签中外部JS文件会先于body加载并立即执行，如果这段JS语言想要操作页面上的一些DOM元素，会因为这些DOM元素还没出现而不进行任何操作。我们可以在body的底部包含脚本，但这意味着页面的渲染可能会因为下载并加载JS导致延迟。

也就是说在这个场景下我们需要对一个函数进行延迟调用，解决的方法就是向jQuery对象传递一个函数，这个函数会在构建完DOM后调用：

```javascript
$(function(){
    // 做有趣的事情
});
```

下一节要介绍的内容会大量涉及到回调函数这一主题。

## 2.3 jQuery的事件监听机制

事件监听机制让我们可以对用户浏览网页时的行为进行自动响应。通过监听事件并作出响应（回调函数）来实现交互式网页。这一节将介绍的浏览器事件对理解jQuery乃至于后面更高级的前端框架有很大帮助。**事件**是指发生在特定时间的特定动作，在浏览器渲染出来的页面上，你每移动一次鼠标，点击一次页面，按一下按钮或者拖动一个元素，都会产生可能不止一个事件。比如就拿按钮来打个比方，我将鼠标移动到按钮上，按下按钮，再移开，至少会触发以下事件：

1. 鼠标进入按钮控件
2. 鼠标悬停
3. 鼠标按下
4. 鼠标单击
5. 鼠标释放
6. 鼠标离开按钮控件

我们可以给每个事件塞一个回调函数，让这个事件触发时自动执行这个函数来实现我们想要的功能。Chrome浏览器提供了一个只能在控制台中使用的函数monitorEvents()，只要给这个函数传递一个元素，就能在控制台看到这个元素触发了哪些事件。具体可以参考[monitorEvents()文档](https://developers.google.com/web/tools/chrome-devtools/console/events)。事件通常可以分为以下几个类别：

1. 资源事件
2. 网络事件
3. Websocket事件
4. 会话历史事件
5. CSS动画事件
6. CSS过渡事件
7. 表单事件
8. 打印事件
9. 文本写作事件
10. 视图事件
11. ……

你想得到的想不到的各种事件，浏览器已经全部准备好了。[这里](https://developer.mozilla.org/zh-CN/docs/Web/Events#Categories)有一份完整的事件列表可供参考。

### 2.3.1 jQuery事件监听要素

在jQuery中使用三个要素来监听和响应事件：

1. 要监听的目标对象；
2. 要响应的事件；
3. 要采取的动作；

比如下面这行代码就包含了这三个要素，my-input就是要监听的目标对象，keypress是要响应的事件，而这里定义的回调函数就是我们要采取的动作：

```javascript
$('#my-input').on('keypress', function() {
  $('body').css('background-color', '#2727FF');
});
```

我们在回调函数中对事件作出响应通常需要对事件本身进行处理，所以这里的回调函数实际上带了一个参数：事件对象。这个对象包括了很多可在函数中使用的信息，常被引用为e，evt或者event。event对象中的target属性就代表了发生该事件的目标元素，它很有用，比如我们设置当artcle元素 被点击时背景色变为红色，就可以这样写了：

```javascript
$( 'article' ).on( 'click', function( evt ) {
    $( evt.target ).css( 'background', 'red' );
});
```

此时只有那个被点击的元素才会改变颜色。另一个比较有用的是preventDefault()方法。比如我有一个叫myAnchor的链接，我只想在点击时将日志记录到控制台，而不想定向到新的页面，就可以用这个方法阻止默认操作：

```javascript
$( '#myAnchor' ).on( 'click', function( evt ) {
    evt.preventDefault();
    console.log( 'You clicked a link!' );
});
```

其他用途包括：

- `event.keyCode` ：了解按下了哪个键；
- `event.pageX` 和 `event.pageY` ：了解在页面上的哪个位置进行了单击， 用于分析跟踪；
- `event.type` ：在侦听目标的多个事件时非常有用；

更多有关事件对象的内容，请查阅以下文档：

- [jQuery 的事件 对象](https://api.jquery.com/category/events/event-object/)
- [event.target 属性](https://api.jquery.com/event.target/)
- [DOM 级别 3 事件](http://www.w3.org/TR/DOM-Level-3-Events/)

on()函数是个万精油函数，只要传递进事件名称就能监听特定的事件，但jQuery还提供了大量的便捷方法可供使用：

```javascript
// 按键事件
$('input').keypress(function() {});
// 单击事件
$('input').click(function() {});
// 内容发生改变事件
$('input').change(function() {});
```

详细的便捷方法列表，可查阅[官方文档](http://api.jquery.com/category/events/)了解。

### 2.3.2 高级用法：事件代理

**事件代理**的原理是一种事件的向上传播机制，通过父元素监听任意子孙元素事件。在什么时候我们会用到事件代理呢？主要有两种场景：1. 要监听的目标对象在设置监听时还不存在；2. 有大量的监听对象需要设置监听器。

下面这段代码属于第一种情况：

```javascript
$( 'article' ).on( 'click', function() {
  $( 'body' ).addClass( 'selected' );   
});

$( 'body' ).append( '<article> <h1>新文章的附加文章</h1> <p>内容 </p> </article>' );
```

click事件监听器设置在前，body中添加article在后。事件监听器在设置的时候页面上如果还没有article元素，那么这次设置就会扑个空：在还没出现的元素上设置了click监听器，因此是无效的，没有设置上。但如果我们使用事件代理，将监听器设置在目标元素的父元素上，就可以顺利实现了，我们向on()方法额外传递一个参数，表示检查单击事件发生时目标是否为某元素：

```javascript
$( '.container' ).on( 'click', 'article', function() { … });
```

该代码使得 jQuery 关注 `.container` 元素的单击次数，如果单击事件发生，则检查单击事件的目标是否为 `article` 元素。

另一种情况是，如果页面上有1000个列表项：

```html
<ul id="rooms">
    <li>Room 1</li>
    <li>Room 2</li>
            .
            .
            .
    <li>Room 999</li>
    <li>Room 1000</li>
</ul>
```

如果我们要给这1000个列表项设置监听器，那就会产生1000个事件监听器：

```javascript
$( '#rooms li' ).on( 'click', function() {
    ...
});
```

更好的做法是在一个元素上设置事件代理监听器，当事件发生时检查元素是否为列表项：

```javascript
$( '#rooms' ).on( 'click', 'li', function() {
    ...
});
```

事件代理的优点就在于能响应新创建的元素并能合并监听器数量。

# 三. 面向对象的JavaScript

​	基础概念
​		作用域
​			词法作用域
​				最佳实践
​					var
​				缺少var关键字变量会变成全局作用域
​				规则
​					函数定义创建新词法作用域
​					条件和循环语句**不创建**新作用域
​			内存作用域（execution context）
​				栈帧结构
​				每执行一次函数就会创建一个新execution context
​		闭包
​			新context永远被创建在定义它的函数context中
​		this关键字
​			把握关键
​				调用时
​					直到调用的那一刻（位置）才确定
​			绑定规则
​				规则一
​					调用时的对象——"the left of dot" rule
​						the object found to the left of the dot where the containing function is called
​				规则二
​					直接调用
​						global
​						strict mode
​							undefined
​				规则三
​					fn.call(r, g, b)
​						this <-- r
​				规则四
​					作为callback
​						global
​				规则五
​					new r.method(g, b)
​						后台自动创建的新object
​				规则六
​					fn.bind()
​						创建新函数，this将永久地被绑定到了bind的第一个参数
​				规则七
​					箭头函数
​						根据当前上下文继承this
​	面向对象
​		把握关键
​			everything is an **OBJECT**
​			function is a special **OBJECT**
​		三大特性
​			封装
​				本质
​					bundling of data and their accessors
​				机制
​					原始方式
​						要创建多个对象怎么办？
​							通过函数
​								object decorator
​									为对象添加新属性
​									缺点
​										函数多次拷贝
​								functional class
​									自己创建对象
​									创建新对象的特殊函数被称为类
​									缺点
​										函数多次拷贝
​										解决方案
​											functional shared pattern
​												将函数定义移到外面去
​												Constructor.methods
​								constructor pattern
​									new运算符
​									解释器构造
​										this = Object.create(Class.prototype);
​										return this;
​								prototype pattern
​									constructor func.prototype
​								prototype class
​									组合
​										functional class
​										prototype pattern
​								pseudo class
​									constructor pattern
​									prototype pattern
​			继承
​				本质
​					effective code reuse
​				机制
​					prototype chain
​						Object.create(obj)
​							create an empty object whose .prototype === obj
​						对象之间建立“链”式关联
​							顶层对象
​								Object.prototype
​									提供所有对象共享属性和方法
​									constructor
​							数组原型
​								Array.prototype
​				实现
​					functional class
​						抽取公共代码
​					pseudo class
​						构造子类
​							继承属性
​								.call()
​									calls a function with a given **this**
​									相当于其他语言中的Super()
​							继承方法
​								原型委托
​									Sub.prototype = Object.create(Super.prototype);
​							恢复子类构造函数
​								.prototype.constructor
​									Sub.prototype.constructor = Sub;
​							定义自己特有的方法
​			多态
​				本质
​					same interface but different implementaions
​				机制
​					prototype lookup
​						链式向上查找
​						一旦找到即停止回溯
​						instanceof运算符

# 四. ECMAScript 6
​	ES6语法
​		声明变量
​			var
​				存在hoisting
​					全局作用域
​					函数作用域
​				不再使用
​			let/const
​				{}块作用域
​				let
​					可以再次赋值
​					不可再次声明
​				const
​					不可再次赋值
​					不可再次声明
​		模板字面量
​			举例
​				let greetings = `Hello, my name is ${name}`;
​			换行符也被当做字面量一部分
​			${}强大功能
​				运算
​				调用函数
​				使用循环
​		解构
​			其实就是模式匹配
​			数组
​				const [x, y, z] = point;
​					可选择性忽略
​			对象
​				const {type, color, karat} = gemstone;
​		对象字面量简写
​			同名变量不必重复写
​			function关键字可省略
​		迭代
​			for..of循环
​				iterable protocol
​					String
​					Array
​					Map
​					Set
​		...运算符
​			展开运算
​				将Array和Set展开成单个元素
​					拼接数组
​						[...fruits, ...vegetables]
​			剩余参数
​				将不定数量的元素表示为数组
​				可变参数函数
​	ES6函数
​		箭头函数表达式
​			简练主体语法
​			块体语法
​			this关键字
​				取决于这个函数在代码中的位置
​				从周围上下文继承了this值
​		默认参数函数
​			解构
​				数组
​					function createGrid([width = 5, height = 5] = [])
​				对象
​					function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {})
​		类
​			语法糖
​				函数
​				原型继承
​			继承关系
​				extends
​				super
​					既可当函数
​					又可当对象
​	ES6内置功能
​		符号类型
​			唯一标识符
​			常用于
​				唯一标识对象属性
​		迭代协议
​			iterable
​				自定义迭代行为
​				用于for..of
​				[Symbol.iterator]
​					返回
​						iterator
​			iterator
​				实现了next()函数的对象
​					0参
​					返回一个对象
​						done
​						value
​		Set
​			创建
​				new Set()
​			修改
​				add()
​				delete()
​				clear()
​			检查
​				has()
​				size
​			迭代
​				for..of
​				values()
​					SetIterator
​			WeakSet
​				只能包含对象
​				无法迭代
​				没有clear()
​				垃圾回收时自动删除
​		Map
​			创建
​				new Map()
​			修改
​				set()
​				delete()
​				clear()
​			检查
​				has()
​			迭代
​				MapIterator
​					keys()
​					values()
​				for..of
​				forEach()
​			WeakMap
​				只能以对象为键
​				无法迭代
​				没有clear()方法
​				垃圾回收时自动删除
​		Promise
​			异步执行的任务
​				状态
​					pending
​						fulfilled
​						rejected
​			执行完成通知
​				成功
​					resolve()
​				失败
​					reject()
​				执行回调
​					then()
​		Proxy
​			一个对象代表另一个对象
​				处理另一个对象所有交互
​			创建
​				new Proxy(被代理的对象, 处理程序)
​			处理程序
​				由各种trap组成
​		生成器
​			可暂停的函数
​				yield
​					向外面发送
​					从外面接收
​			function*
​	ES6专业开发者
​		Polyfill
​			修补功能，为浏览器提供支持
​				SVG
​				Canvas
​				网络存储
​					本地存储
​					会话存储
​				视频
​				HTML5 元素
​				无障碍功能
​				Web Sockets
​		Babel
​			转译器（transpiler）

HTML Canvas
	基础
	从像素到动画
		requestAnimationFrame

# 五. 异步的JavaScript
​	Promise
​		用途
​			try..catch wrapper for
​				unpredictable task
​					asynchronous
​					deferred
​		状态
​			pending
​				settled ONCE
​					fulfilled
​					rejected
​		使用
​			wrapping
​				封装异步任务
​					主线程执行
​						阻塞
​				new Promise(func)
​					func
​						resolve param
​						reject param
​			thening
​				fulfilled
​					resolve()
​				回调
​					action
​			catching
​				rejected
​					reject()
​				回调
​					recovering
​			链式调用
​				promises
​					forEach
​					map
​				Promise.all()
​					全部执行成功才算成功
​	AJAX
​		用途
​			异步获取数据
​				XML
​				JSON
​				HTML
​			无需更新全部页面
​		通过XHR
​			请求
​				new XMLHttpRequest()
​				.open()
​				.onload
​				.onerror
​				.send()
​			响应
​				.responseText
​		通过jQuery
​			.ajax()
​			便利方法
​				get()
​				getJSON()
​				getScript()
​				post()
​				load()
​		通过fetch
​			基于Promise