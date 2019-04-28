# JavaScript编程

本文是对JavaScript语言的一次系统的总结。全文一共分为5个部分。第一部分先介绍最基本的语言基础，比如条件语句，循环语句，函数，基本的数据结构等等。第二步介绍jQuery，掌握了jQuery基本技术就能够随心所欲地对页面元素进行各种操作。第三部分介绍面向对象的JavaScript，这部分将系统的介绍如何使用JS来实现我们在其他OOP语言中常见的编程范式：封装，继承和多态，以及不太好理解的this关键字。第四部分介绍ES6语法，其本质是语法糖，抹上一层语法糖会使得你的JS看起来更优美，在这一节会介绍箭头函数，也就是其他编程语言中的Lambda表达式。第五部分介绍JavaScript的异步特性，比如怎样使用JS发送异步请求，然后获得并处理结果。

看完这篇文章后，你将对JavaScript这门编程语言有成体系化的理解。对于以后理解和掌握基于JS的其他语言，比如CoffeeScript和TypeScript都很有帮助。

# 一. JavaScript入门

​	入门
​		诞生
​			1995年
​			Brendan Eich
​		版本
​			ES2016
​			ES2017
​		控制台
​			console.log
​	数据类型和变量
​		数值
​		字符串
​			+
​			索引
​			转义
​			比较
​			方法
​				replace
​		Boolean
​		特殊
​			null
​				value of nothing
​			undefined
​				absence of value
​			NaN
​		隐式类型转换
​			===
​	条件语句
​		if语句
​			逻辑运算
​				AND
​				OR
​				NOT
​			真值
​				true
​				-42
​				"pizza"
​				{}
​				[]
​			假值
​				false
​				null
​				undefined
​				0
​				NaN
​				""
​			特殊形式
​				三元运算
​		switch语句
​			fall through 问题
​	循环
​		while
​		for
​			for..in
​			forEach
​	函数
​		用途
​			封装重复代码
​		参数
​			parameter
​				变量
​			argument
​				值
​		返回值
​			return
​		作用域
​			全局
​			函数
​			从内向外
​				覆盖
​			var关键字
​			提升
​				函数声明
​					但函数赋值不会提升
​				变量声明
​					但变量赋值不会提升
​				最佳实践
​					在脚本顶部声明函数和变量
​		一等公民
​			高阶函数
​				函数作为参数
​			匿名函数
​	数组
​		创建
​			数组字面量
​		访问
​			索引
​		特殊对象
​			属性
​				length
​			方法
​				push
​				pop
​				splice
​				forEach
​				map
​		多维数组
​	对象
​		创建
​			对象字面量
​				键值对
​			封装
​				不同数据类型
​		命名
​			camelCase

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