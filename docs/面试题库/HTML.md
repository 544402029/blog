---
prev: 
    text: '通信类'
    link: '/面试题库/通信类'
next: 
    text: 'CSS'
    link: '/面试题库/CSS'
---

# HTML

## W3C 标准



### WEB 标准以及 W3C 标准是什么?

1. 标签闭合
1. 标签小写
1. 不乱嵌套
1. 使用外链 css 和 js
1. 结构行为表现的分离



## 语义化



### 谈谈你对语义化的理解？

- 用**正确**的标签做正确的事情！
- 语义化就是让页面的**内容结构化**，便于对浏览器、搜索引擎解析。
- 在没有样式 CSS 情况下也以一种**文档格式显**示，并且是容易阅读的。
- **搜索引擎**的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。
- **源代码**更容易阅读、维护、理解。



## xhtml 和 html

- 一个是功能上的差别
  - 主要是 XHTML 可兼容各大浏览器、手机以及 PDA，并且浏览器也能快速正确地编译网页
- 另外是书写习惯的差别
  - XHTML 元素必须被正确地嵌套，闭合，区分大小写，文档必须拥有根元素



## global attribute



### HTML 全局属性(global attribute)有哪些？

- `id`: 元素 id，文档内唯一
- `class`: 为元素设置类标识
- `style`: 行内 css 样式
- `title`: 元素相关的建议信息
- `lang`: 元素内容的的语言
- `data-*`: 为元素增加自定义属性
- `draggable`: 设置元素是否可拖拽



## HTML5



### 什么是 DOCTYPE 及作用？

```html
<!DOCTYPE html>
```

- DOCTYPE: 是用来声明文档类型和 DTD 规范的
- DTD: 定义文档类型，浏览器会根据它来决定用哪种协议来解析以及切换浏览器模式。

HTML4.0 有传统模式和严格模式。

传统模式包含所有 HTML 元素和属性，包括展示性和弃用的元素。（如 `font`）

严格模式包含所有 HTML 元素和属性，但不包括展示性和弃用的元素。（如 `font`）



### HTML5 为什么只需要写 <!DOCTYPE html>？

- HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要`DOCTYPE`来规范浏览器的行为
- 而 HTML4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器所使用的文档类型



### html5 有哪些新特性？

HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加

- 绘画 `canvas`
- 用于媒介回放的 `video` 和 `audio` 元素
- 本地离线存储 `localStorage` ,`sessionStorage`
- 语意化更好的内容元素，比如`article`、`footer`、`header`、`nav`、`section`
- 表单控件，`date`、`time`、`email`、`url`、`search`
- 新的技术`webworker`, `websocket`



### html5 有移除的元素?

- 纯表现的元素：`basefont`，`font`, `big`，`center`，`s`
- 对可用性产生负面影响的元素：`frame`



### Canvas 和 SVG 有什么区别？

- `svg`输出的图形是**矢量图形**，它绘制出来的每一个图形元素都是独立的 DOM 节点，能够方便的绑定事件或用来修改。,也可以修改参数来自由放大缩小，不会**失真和有锯齿**。
- 而`canvas`输出**标量画布**，就像一张图片一样，放大会失真或者锯齿

---
