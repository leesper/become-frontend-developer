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



## 1.5 函数

入门
		
	
	
	循环
		while
		for
			for..in
			forEach
	函数
		用途
			封装重复代码
		参数
			parameter
				变量
			argument
				值
		返回值
			return
		作用域
			全局
			函数
			从内向外
				覆盖
			var关键字
			提升
				函数声明
					但函数赋值不会提升
				变量声明
					但变量赋值不会提升
				最佳实践
					在脚本顶部声明函数和变量
		一等公民
			高阶函数
				函数作为参数
			匿名函数
	数组
		创建
			数组字面量
		访问
			索引
		特殊对象
			属性
				length
			方法
				push
				pop
				splice
				forEach
				map
		多维数组
	对象
		创建
			对象字面量
				键值对
			封装
				不同数据类型
		命名
			camelCase

# 二. jQuery入门

​	操纵DOM的利器
​		write less, do more
​		兼容浏览器
​	引入
​	选择器
​		tag
​		.class

​        `#id`

​		...
​		一次选中多个元素
​			`$("#topContacts, #footerContacts").append(…);`
​	常用
​		遍历
​			parent
​			parents
​			children
​			find
​			siblings
​		操作
​			addClass
​			toggleClass
​			next
​			attr
​			css
​			内容
​				html
​				text
​				val
​			remove
​			添加
​				append
​				prepend
​				insertBefore
​				insertAfter
​			each
​			构建DOM完成后执行
​				$(function)
​	事件监听
​		三要素
​			target
​			event
​				convenient 方法
​			action
​		event对象
​			target
​				事件目标页面元素
​			preventDefault
​			keyCode
​			坐标
​				pageX
​				pageY
​			type
​		事件代理
​			原理
​				event propagation(bubbling up)
​				向上传递
​			通过父节点监听任意后代节点事件
​			优点
​				能响应新创建的元素
​				合并listener数量

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