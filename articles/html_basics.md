# HTML基础语法总结

HTML是超文本标记语言，在Web开发三大语言中负责描述内容和结构，目前该语言标准已经发展到了HTML5。这篇文章对HTML的基础知识进行一个简要的总结。内容包括：

1. HTML的树形结构
2. 元素

## 一. HTML

### 1.1 语言结构

不同于其他的编程语言，HTML是一种DSL（Domain Specific Language，领域特定语言），这种语言专门用来结构化地描述网页的内容。它提供一种语义信息让浏览器很快明白整个超文本内容的框架结构。HTML是用树形结构来描述内容的，学过数据结构的同学能立马明白过来，只要是树形结构就一定存在两种关系：父子关系（parent-child)和兄弟关系(siblings)。举个例子大家就明白了：

```html
<div>
    <h1>Article Title</h1>
    <p>Paragraph of text.</p>
<div>
```

上面这小段HTML代码中，div元素就是父节点，它有两个子节点h1和p。而h1和p之间互为兄弟关系。如下图所示：

![](./html_tree.png)

所以HTML的元素是可以像这样嵌套包含的，就像一个容器一样，如果要用百分比来表示大小，那么这个百分比永远只根据最近的父元素进行计算。

### 1.2 现代HTML5标准模板

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body></body>
</html>
```

DOCTYPE描述HTML的类型。类型决定渲染模式，除了HTML5的标准模式外，还有为了兼容旧版本的怪异模式和接近标准模式。你看到的99%的网页都是属于标准模式的，对于渲染模式的进一步说明，可以参考[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)。

html元素是根节点，包含head元素和body元素。head元素描述了有关站点的元信息。常见的元信息有4类：title，link，script和meta。title是文档的标题，显示在浏览器标签页上。link指定了页面要用到的相关CSS文件。script用来引用相关的JavaScript文件。meta作用比较多样化，首先它可以用来指定字符集编码，一般是utf-8，例如：`<meta charset="utf-8">`，其次，它可以用来说明关键字，作者和描述，这对搜索引擎优化（SEO）起作用，例如`<meta name="description" content="This is what my website is all about!">`。

最后body元素包含了用户能够看到的网页的实际内容。一个完整的例子：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Web 开发博客文章</title>
    </head>
    <body>
        <h1>2016 年最火爆的工作 #2：Web 开发</h1>
        <p>By <em><strong>Christopher Watkins</strong><em> <p>
        <p>2016 年 1 月 19 日</p>
    
        <figure>
            <img src="http://i1.wp.com/blog.udacity.com/wp-content/uploads/2016/01/Slack-for-iOS-Upload.jpg" alt="Web Developer">
            <figcaption>
                Web 开发这个岗位究竟为什么会如此热门？原因其实并不复杂！ 简单来说，Web 开发者所做的正是创造我们将要体验的……网站。每个浏览网络的人都希望能够有更好的网页体验，如果你认同这句话，那么你应该同样认同每个浏览网络的人都希望 Web 开发者可以做出很棒的开发工作。用人公司当然也知道这一点，因此他们热衷于招聘优秀的 Web 开发者，保证自己的网站能为用户带来最佳体验。这也就是说，众多网站和用户意味着众多招聘需求。这个岗位真的非常火热！🔥
            </figcaption>
        </figure>
    </body>
</html>
```

## 二. Element

认识了HTML的结构，下面我们来观察一下组成这些结构的基本单元，元素（Element）。

```
<a href="https://www.udacity.com">优达学城</a>
```

每个元素都由一个opening部分和一个closing部分组成，中间放置的是内容（content）。元素的属性（attributes）说明写在opening中，例如这里的href属性。每个元素都有一个特定的标签，每种标签都有自己的语义，比如这里的标签`a`表示超链接，标签`img`表示图像等等。我们要根据内容选择有意义的标签，尽量避免[div soup](https://www.pluralsight.com/blog/software-development/html5-web-components-overview)：

> The HTML <div> element is the generic container for flow content, which does not inherently represent anything. It can be used to group elements for styling purposes…or because they share attribute values ... It should be used only when no other semantic element is appropriate.

完整的HTML5元素，请参考[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)。