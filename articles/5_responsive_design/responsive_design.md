# CSS布局与响应式设计



在移动设备出现之前，人们访问网站需要通过PC端的浏览器来实现。Web前端工程师主要解决的是页面在各型浏览器之间适配的问题。后来，随着平板电脑和智能手机的普及，移动端的访问量呈爆炸式增长，前端工程师面临的问题变成了如何在不同大小的设备上呈现同样的网页。能不能"一次设计，到处适用"，让同一张网页自动适应不同大小屏幕，自动调整布局？让网页在较小的屏幕上也能有较好的用户体验，于是**响应式设计**就应运而生了。在开始后面的技术细节讨论之前，我们一定要抓住一个中心思想：响应式设计的**核心思想**是让你的网站内容在任何设备上都以最佳的方式呈现。

# 一. 准备工作

我们不可能买下市面上所有型号的移动设备来做设计，而是要使用手边的各种服务，比如[在线浏览器适配服务](<https://www.browserstack.com/>)。如果你使用的是Chrome浏览器，那么就可以使用开发者工具中的模拟器来进行移动设备模拟。在Chrome的开发者工具中那个手机图标就是模拟器，单击它就可以打开，并且我们可以通过下拉菜单来选择具体的设备。



![](./simulator.png)



模拟器能自动设置好尺寸和用户代理信息，设备的像素比例并能模拟触控。如果手里面有可供开发调试的手机，我们也可以设置移动设备的远程调试功能。比如如果要适配安卓设备，那么我们就可以准备一台安卓机，USB连接线和开发设备（笔记本电脑）。安卓设备需要设置成开发者模式，然后打开USB调试模式。

接着，在开发设备上打开[inspect](chrome://inspect)页面，然后在安卓设备上用Chrome浏览器打开要调试的页面，用USB连接两个设备，在弹出的对话框中选择确认允许USB调试。在开发设备上就能看到已连接的设备了，我们可以在开发设备上对安卓设备进行各种操作，也可以看到移动设备上打开的页面，相当于把移动设备的屏幕投射到开发使用的笔记本电脑上。在笔记本电脑上进行的操作可以同步在两台设备上显示。



# 二. 像素与视口

在移动设备上访问网页时，我们常常会遇到一种很不愉快的用户体验：整个网页被缩放以适应较小的设备屏幕，一切都变小了，字变小了，图片变小了，最要命的是连按钮都变小了，虽然看上去页面和PC端一样，但什么都看不清点不了，这是因为没有遵循响应式页面设计：窄屏幕设备（比如移动设备）在一个虚拟视口中渲染页面，这个虚拟视口通常比屏幕要宽，例如，如果移动设备的屏幕宽度为640`px`，那么如果以980`px`的虚拟视口来渲染网页，就需要缩小页面来适应640`px`的窗口大小，这就是页面看起来小的原因。要想理解响应式设计，我们先要来重新认识一下像素与视口的概念。

## 2.1 像素

> A pixel is not a pixel

首先我们要来厘清"像素"的概念。在不同的上下文中所指的"像素"可能具有不同的含义。对于浏览器而言使用的像素是CSS样式代码中使用的逻辑像素，叫"CSS像素"，属于Web编程中的概念。1个CSS像素在不同的设备上对应的物理像素可能不同，这是由设备像素比（Device Pixel Ratio）决定的。设备像素则指的是设备的物理像素，单位是`px`。所以当我们说某某移动设备的分辨率为1920*1080像素时，这里的像素实际上指的就是物理像素。

## 2.2 视口（viewport）

浏览器的视口（viewport）是可以看到Web内容的窗口区域。通常与渲染出的页面大小是不同的，除非你通过某种方式告诉浏览器你的网页将会在更小的屏幕上显示，否则浏览器不会知道。所以如果我们要在不同的设备上获得一致的视觉体验，我们就需要：

1. 设置设备像素比DPR
2. 设置视口viewport

设置设备像素比和视口的方法就是在html中为head元素增加viewport标签：

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

上面这行代码允许网页宽度自动调整：网页的默认宽度为屏幕宽度，原始缩放比例为1:1，即网页初始大小占屏幕面积100%。与此对应的，也有`height`和`device-height`属性，可以对视口高度进行调整，但不常用。只要把缩放比例控制到1:1，此后我们在页面布局时就只需要关心CSS像素即可。



一种响应式设计的技巧是"从小处开始"。准备多套设计稿，先从最小屏幕开始设计，然后更大一点的，逐步加大。从最小屏幕开始设计，可以对页面内容优先级进行排序，在设计的时候就考虑需要对用户展示哪些重要信息，不容易漏掉重要的信息，这对优化性能也有帮助，最后，把针对多种屏幕尺寸的设计使用媒体查询联系起来即可。

# 三. CSS布局初探

在CSS中控制布局最重要的属性是`display`属性。各种各样的新式布局都从设置它开始，比如我们后面要讲到的弹性（flex）布局和网格（grid）布局。这里先不讨论这些 高大上的布局，我们先来打好基础。所有的元素都有一个默认的display值：block和inline。block表示该元素为块级元素，这类元素会重新开始一行并尽量撑满容器（即其父元素）；inline表示该元素为行内元素，它不打乱段落的布局，可以用来在段落中包裹一些内容。display属性有一些比较tricky的小技巧，比如如果设置为none则可以在不删除元素的情况下隐藏元素，这种隐藏是不占据显示空间的，即如果你不查看网页源代码你完全感觉不到这个元素的存在。

即然可以避免元素从左到右撑满容器，那么通过设定max-width为固定值并设置左右外边距，我们就能将元素居中显示，剩余的部分将被平均分为两块分列元素的两边：

```css
.box {
  max-width: 600px;
  margin: 0 auto;
}
```

CSS的基础模型是盒子模型，当我们设置元素尺寸时内边距和边框的大小会对元素的尺寸造成影响，这是因为默认的box-sizing属性是content-box，为了避免做各种心算，我们可以设置border-box使内边距和边框不增加宽度：

```css
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
```

## 3.1 position定位

position属性可以用来实现各种复杂的布局，主要有三种：相对，固定和绝对。如果不设置这个属性，那么它的默认值就是static。**如果我们使用其他任何值设置了元素的这个属性，我们就称这个元素为positioned**，记住这句话很重要，因为绝对定位会用到这个概念。

### 3.1.1 相对定位

通过设置position为relative来实现相对定位。这个元素的top，right，bottom和left属性会使得元素偏离正常位置，其他元素的位置不会受其影响来弥补它偏移后留出的空隙：

```css
.relative1 {
  position: relative;
}
.relative2 {
  position: relative;
  top: -20px;
  left: 20px;
  background-color: white;
  width: 500px;
}
```

![](./relative.png)

### 3.1.2 固定定位

通过设置position为fixed来实现固定定位。固定定位是相对于视口定位的，无论你怎么拖动滚动条，它永远都显示在相对于视口的一个位置上（脱离文档流）。

```css
.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
  background-color: white;
}
```

### 3.1.3 绝对定位

通过设置position为absolute来实现绝对定位。如果绝对定位元素的祖先元素是positioned的，它就相对于该祖先元素绝对定位，否则将相对于body元素绝对定位并随页面滚动而移动。

```css
.relative {
  position: relative;
  width: 600px;
  height: 400px;
}
.absolute {
  position: absolute;
  top: 120px;
  right: 0;
  width: 300px;
  height: 200px;
}
```

![](./absolute.png)

## 3.2 浮动属性

在没有出现flex和grid布局前的黑暗年代里，float属性主要用来实现布局，而现在它主要用来实现文字环绕图片：

```css
img {
  float: right;
  margin: 0 0 1em 1em;
}
```

![](./float.png)

但是在使用float属性时经常需要解决一些稀奇古怪的问题，比如需要将其他元素移动到浮动元素下面避免覆盖，或者避免浮动元素溢出到容器的外面。clear属性可以用来移动到浮动元素的下面：

![](./clear1.png)

```css
.box {
  float: left;
  width: 200px;
  height: 100px;
  margin: 1em;
}
.after-box {
  clear: left;
}
```

![](./clear2.png)

而overflow属性可以避免浮动元素溢出到容器的外面。比如下面这种情况，这个图片比包含它的元素要高， 因为它是浮动的，所以它就溢出到了容器外面：

![](./clearfix1.png)

加入下面的CSS样式就好多了：

```css
.clearfix {
  overflow: auto;
}
```

![](./clearfix2.png)

## 3.3 百分比宽度和相对大小

相对宽度是一种相对于父容器的计量单位。响应式设计需要采用相对宽度，不能使用绝对宽度，因为网页会根据页面宽度调整布局，所以编写CSS的时候我们指定`width`要使用百分比：

```css
width: 100%
```

或者：

```css
width: auto
```

字体也只能使用`em`这样的相对大小单位：

```css
body {
	font: normal 100% Helvetica, Arial, sans-serif;
}

h1 {
	font-size: 1.5em; 
}

small {
  font-size: 0.875em;
}
```

对于页面上的输入控件（例如按钮）至少要保证48 * 48px的大小，并设定外边距为40px，这样才能保证按钮不至于太小而不能被手指点击到。还可以使用max-width和min-width来限制最大/最小宽度。

## 3.4 媒体查询

媒体查询（media query）要解决的问题就是在不同的设备上应用不同的CSS样式。媒体查询可以根据设备的宽度，高度或者像素比来应用不同的样式，可以修改从背景图片到页面布局的任何内容。只需要在页面里添加额外的样式表，并附上媒体查询即可：

```html
<link rel="stylesheet" media="screen and (min-width: 300px)" href="patterns.css">
```

下面就来详细介绍下媒体查询的使用方法。

### 3.4.1 基本媒体查询

媒体查询最基本的用法就是在新的CSS文件链接时使用，例如我们指定当宽度至少为500px时使用over500.css，就可以这样写：

```html
<link rel="stylesheet" media="screen and (min-width:500px)" href="over500.css">
```

另外一种方法就是在CSS文件中使用`@media`标签嵌入：

```css
@media screen and (min-width: 500px) {
  body { background-color: green; }
}
```

两种方法各有利弊，第一种方法可能会产生很多小的css文件，并需要多次http请求；而第二种方法使用的http请求更少，但产生的CSS文件更大。无论如何都要避免使用`@import`，因为这种方式影响性能。

### 3.4.2 断点

媒体查询用于页面改变布局的发生点称为断点，这是前端工程师完成响应式设计的基本手段。那么，要在哪里设置断点呢？一个指导原则是根据内容来设置断点，让页面内容来告诉我什么时候该设置断点。

在页面设计时，首先设置好视口和默认样式，然后将窗口设置成尽可能的窄，当我们不断增加网页宽度时，会发现某个位置适合设置断点，我们将该位置的分辨率记下并设计新样式。然后继续拉宽窗口，然后在下一个适合设置断点的位置引入新的CSS样式文件，直到完成为止。还可以编写控制的更精细的复杂查询，比如要求宽度在500px以上，600px以下时起作用，那么可以这样写：

```css
@media screen and (min-width: 500px) and (max-width: 600px) {
  color: green;
}
```

## 3.5 其他常用布局技巧

我们可以通过将display属性设置为inline-block来实现铺满浏览器的小格子：

```css
.box2 {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin: 1em;
}
```

![](./inline-block.png)

以及使用新的CSS属性column实现文字多列布局：

```css
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

![](./column.png)

# 四. 弹性框布局

flex布局可以很轻松的实现以往需要各种复杂技巧才能实现的页面布局。开启flex布局的方式很简单，直接将元素的display属性设置为flex即可，此时其子元素的float，clear和vertical-align会失效。对块级元素可以设置flex，对行内元素同样可以使用inline-flex。下面先讲解基本概念和各种属性，然后我们通过实战来展示一下flex布局的强大。

## 4.1 基本概念

![](./flex-basic.png)

采用flex布局的元素称为flex容器（以下简称容器）。容器中所有的子元素被称为flex项（item，以下简称项）。容器中有两个轴：主轴（main）和交叉轴（cross）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项默认沿主轴排列。单个项占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

## 4.2 容器属性

### 4.2.1 flex-direction

![](./flex-direction.png)

flex-direction属性决定main轴的方向，它有4个值：

1. row：水平方向，起点左端
2. row-reverse：水平方向，起点右端
3. column：垂直方向，起点上端
4. Column-reverse：垂直方向，起点下端

### 4.2.2 flex-wrap

![](flex-wrap.png)

flex-wrap属性决定轴线排不下如何换行，nowrap表示不换行：

![](./nowrap.png)

wrap表示换行，第一行在上方：

![](./wrap.png)

wrap-reverse表示换行，第一行在下方：

![](./wrap-reverse.png)

### 4.2.3 flex-flow

flex-flow属性是是flex-direction和flex-wrap的简写，默认值为row nowrap。

### 4.2.4 justify-content

justify-content属性决定项在主轴的对齐方式，有五个值：

1. flex-start：左对齐（默认）
2. flex-end：右对齐
3. center：居中
4. space-between：两端对齐，项之间间隔相等
5. space-around：每个项两侧的间隔相等，所以项之间的间隔比项与边框的间隔大一倍

![](./justify-content.png)



### 4.2.5 align-items

![](./align-items.png)

align-items属性决定项在交叉轴如何对齐，有如下五个值：

1. flex-start：交叉轴的起点对齐。

2. flex-end：交叉轴的终点对齐。

3. center：交叉轴的中点对齐。

4. baseline: 项目的第一行文字的基线对齐。

5. stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### 4.2.6 align-content

![](./align-content.png)

align-content属性决定多根轴线的对齐方式，如果项只有一根轴线，该属性不起作用。

1. flex-start：与交叉轴的起点对齐。

2. flex-end：与交叉轴的终点对齐。

3. center：与交叉轴的中点对齐。

4. space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。

5. space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

6. stretch（默认值）：轴线占满整个交叉轴。

## 4.3 项属性

## 4.4 布局实战

## 4.5 布局模式

### 4.5.1 掉落列模型

```html
<div class="container">
  <div class="box dark_blue"></div>
  <div class="box light_blue"></div>
  <div class="box green"></div>
</div>
```

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 100%;
}
```

```css
@media screen and (min-width: 450px) {
  .dark_blue {
    width: 25%;
  }
  .light_blue {
    width: 75%;
  }
}
```

```css
@media screen and (min-width: 550px) {
  .dark_blue, .green {
    width: 25%;
  }
  .light_blue {
    width: 50%;
  }
}
```

### 4.5.2 大体流动模型

```html
<div class="container">
  <div class="box dark_blue"></div>
  <div class="box light_blue"></div>
  <div class="box green"></div>
  <div class="box red"></div>
  <div class="box orange"></div>
</div>
```

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 100%;
}
```

```css
@media screen and (min-width: 450px) {
  .light_blue, .green {
    width: 50%;
  }
}
```

```css
@media screen and (min-width: 550px) {
  .dark_blue, .light_blue {
    width: 25%;
  }
  .green, .red, .orange {
    width: 33.333333%;
  }
}
```

当视口宽度大于700px时，增加外边距

```css
@media screen and (min-width: 700px) {
  .container {
    width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

### 4.5.3 活动布局模型

```html
<div class="container">
  <div class="box dark_blue"></div>
  <div class="container" id="container2">
    <div class="box light_blue"></div>
    <div class="box green"></div>
  </div>
  <div class="box red"></div>
</div>
```

```css
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 100%;
}
```

```css
@media screen and (min-width: 500px) {
  .dark_blue {
    width: 50%;
  }
  #container2 {
    width: 50%;
  }
}
```

```css
@media screen and (min-width: 600px) {
  .dark_blue {
    width: 25%;
    order: 1;
  }
  #container2 {
    width: 50%;
  }
  .red {
    width: 25%;
    order: -1;
  }
}
```

### 4.5.4 画布溢出模型

```html
<nav id="drawer" class="dark_blue"></nav>
<main class="light_blue"></main>
```

```css
html, body, main {
  height: 100%;
  width: 100%; 
}

nav {
  width: 300px;
  height: 100%;
  position: absolute;
  /* 该变换将抽屉移出画布. */
  transform: translate(-300px, 0);
  /* 我们还可以为抽屉添加动画。 */
  transition: transform 0.3s ease;
}

nav.open {
  transform: translate(0, 0);
}
```

```css
@media screen and (min-width: 600px) {
  nav {
    position: relative;
    transform: translate(0, 0);
  }
  
  body {
    display: flex;
    flex-flow: row nowrap;
  }
  main {
    width: auto;
    flex-grow: 1;
  }
}
```

```javascript
var menu = document.querySelector('#menu');
var main = document.querySelector('main');
var drawer = document.querySelector('#drawer');

menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open');
  e.stopPropagation();
});

main.addEventListener('click', function() {
  drawer.classList.remove('open');
});
```

网格布局

响应式设计中的表格和字体

响应式设计中的图片

# 参考文献

[在移动浏览器中使用viewport元标签控制布局](<https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag>)

[响应式网页设计](<http://www.ruanyifeng.com/blog/2012/05/responsive_web_design.html>)

[学习CSS布局](<http://zh.learnlayout.com/>)

[Udacity前端工程师纳米学位](<https://cn.udacity.com/fend>)

[Flex布局教程：语法篇](<http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>)

[Flex布局教程：实例篇](<http://www.ruanyifeng.com/blog/2015/07/flex-examples.html>)







