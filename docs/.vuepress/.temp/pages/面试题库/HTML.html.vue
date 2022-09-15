<template><div><h2 id="html" tabindex="-1"><a class="header-anchor" href="#html" aria-hidden="true">#</a> HTML</h2>
<h3 id="w3c-标准" tabindex="-1"><a class="header-anchor" href="#w3c-标准" aria-hidden="true">#</a> W3C 标准</h3>
<h4 id="web-标准以及-w3c-标准是什么" tabindex="-1"><a class="header-anchor" href="#web-标准以及-w3c-标准是什么" aria-hidden="true">#</a> WEB 标准以及 W3C 标准是什么?</h4>
<ol>
<li>标签闭合</li>
<li>标签小写</li>
<li>不乱嵌套</li>
<li>使用外链 css 和 js</li>
<li>结构行为表现的分离</li>
</ol>
<h3 id="语义化" tabindex="-1"><a class="header-anchor" href="#语义化" aria-hidden="true">#</a> 语义化</h3>
<h4 id="谈谈你对语义化的理解" tabindex="-1"><a class="header-anchor" href="#谈谈你对语义化的理解" aria-hidden="true">#</a> 谈谈你对语义化的理解？</h4>
<ul>
<li>用<strong>正确</strong>的标签做正确的事情！</li>
<li>语义化就是让页面的<strong>内容结构化</strong>，便于对浏览器、搜索引擎解析。</li>
<li>在没有样式 CSS 情况下也以一种<strong>文档格式显</strong>示，并且是容易阅读的。</li>
<li><strong>搜索引擎</strong>的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。</li>
<li><strong>源代码</strong>更容易阅读、维护、理解。</li>
</ul>
<h3 id="xhtml-和-html" tabindex="-1"><a class="header-anchor" href="#xhtml-和-html" aria-hidden="true">#</a> xhtml 和 html</h3>
<ul>
<li>一个是功能上的差别
<ul>
<li>主要是 XHTML 可兼容各大浏览器、手机以及 PDA，并且浏览器也能快速正确地编译网页</li>
</ul>
</li>
<li>另外是书写习惯的差别
<ul>
<li>XHTML 元素必须被正确地嵌套，闭合，区分大小写，文档必须拥有根元素</li>
</ul>
</li>
</ul>
<h3 id="global-attribute" tabindex="-1"><a class="header-anchor" href="#global-attribute" aria-hidden="true">#</a> global attribute</h3>
<h4 id="html-全局属性-global-attribute-有哪些" tabindex="-1"><a class="header-anchor" href="#html-全局属性-global-attribute-有哪些" aria-hidden="true">#</a> HTML 全局属性(global attribute)有哪些？</h4>
<ul>
<li><code v-pre>id</code>: 元素 id，文档内唯一</li>
<li><code v-pre>class</code>: 为元素设置类标识</li>
<li><code v-pre>style</code>: 行内 css 样式</li>
<li><code v-pre>title</code>: 元素相关的建议信息</li>
<li><code v-pre>lang</code>: 元素内容的的语言</li>
<li><code v-pre>data-*</code>: 为元素增加自定义属性</li>
<li><code v-pre>draggable</code>: 设置元素是否可拖拽</li>
</ul>
<h3 id="html5" tabindex="-1"><a class="header-anchor" href="#html5" aria-hidden="true">#</a> HTML5</h3>
<h4 id="什么是-doctype-及作用" tabindex="-1"><a class="header-anchor" href="#什么是-doctype-及作用" aria-hidden="true">#</a> 什么是 DOCTYPE 及作用？</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>DOCTYPE: 是用来声明文档类型和 DTD 规范的</li>
<li>DTD: 定义文档类型，浏览器会根据它来决定用哪种协议来解析以及切换浏览器模式。</li>
</ul>
<p>HTML4.0 有传统模式和严格模式。</p>
<p>传统模式包含所有 HTML 元素和属性，包括展示性和弃用的元素。（如 <code v-pre>font</code>）</p>
<p>严格模式包含所有 HTML 元素和属性，但不包括展示性和弃用的元素。（如 <code v-pre>font</code>）</p>
<h4 id="html5-为什么只需要写" tabindex="-1"><a class="header-anchor" href="#html5-为什么只需要写" aria-hidden="true">#</a> HTML5 为什么只需要写 <!DOCTYPE html>？</h4>
<ul>
<li>HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要<code v-pre>DOCTYPE</code>来规范浏览器的行为</li>
<li>而 HTML4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器所使用的文档类型</li>
</ul>
<h4 id="html5-有哪些新特性" tabindex="-1"><a class="header-anchor" href="#html5-有哪些新特性" aria-hidden="true">#</a> html5 有哪些新特性？</h4>
<p>HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加</p>
<ul>
<li>绘画 <code v-pre>canvas</code></li>
<li>用于媒介回放的 <code v-pre>video</code> 和 <code v-pre>audio</code> 元素</li>
<li>本地离线存储 <code v-pre>localStorage</code> ,<code v-pre>sessionStorage</code></li>
<li>语意化更好的内容元素，比如<code v-pre>article</code>、<code v-pre>footer</code>、<code v-pre>header</code>、<code v-pre>nav</code>、<code v-pre>section</code></li>
<li>表单控件，<code v-pre>date</code>、<code v-pre>time</code>、<code v-pre>email</code>、<code v-pre>url</code>、<code v-pre>search</code></li>
<li>新的技术<code v-pre>webworker</code>, <code v-pre>websocket</code></li>
</ul>
<h4 id="html5-有移除的元素" tabindex="-1"><a class="header-anchor" href="#html5-有移除的元素" aria-hidden="true">#</a> html5 有移除的元素?</h4>
<ul>
<li>纯表现的元素：<code v-pre>basefont</code>，<code v-pre>font</code>, <code v-pre>big</code>，<code v-pre>center</code>，<code v-pre>s</code></li>
<li>对可用性产生负面影响的元素：<code v-pre>frame</code></li>
</ul>
<h4 id="canvas-和-svg-有什么区别" tabindex="-1"><a class="header-anchor" href="#canvas-和-svg-有什么区别" aria-hidden="true">#</a> Canvas 和 SVG 有什么区别？</h4>
<ul>
<li><code v-pre>svg</code>输出的图形是<strong>矢量图形</strong>，它绘制出来的每一个图形元素都是独立的 DOM 节点，能够方便的绑定事件或用来修改。,也可以修改参数来自由放大缩小，不会<strong>失真和有锯齿</strong>。</li>
<li>而<code v-pre>canvas</code>输出<strong>标量画布</strong>，就像一张图片一样，放大会失真或者锯齿</li>
</ul>
<hr>
</div></template>


