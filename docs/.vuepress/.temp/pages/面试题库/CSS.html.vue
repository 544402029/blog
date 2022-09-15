<template><div><h2 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> CSS</h2>
<h3 id="css-单位" tabindex="-1"><a class="header-anchor" href="#css-单位" aria-hidden="true">#</a> css 单位</h3>
<h4 id="解释一下-css-里的两个单位-em-和-rem-你一般怎么使用它们" tabindex="-1"><a class="header-anchor" href="#解释一下-css-里的两个单位-em-和-rem-你一般怎么使用它们" aria-hidden="true">#</a> 解释一下 CSS 里的两个单位：em 和 rem，你一般怎么使用它们？</h4>
<p>1em，等于本元素的字体大小，所以在不同的元素里 1em 的绝对大小是不一样的。</p>
<p>而 1rem，等于根元素的字体大小，在一个页面中，无论在哪个元素上 1rem 都是一样的。</p>
<p>em 适合于用在需要大小需要跟随字体变化的属性上，比如 padding、margin、height、width 等等，元素继承了不同的字体大小，这些属性最好也能跟着变化；</p>
<p>大多数人可能会认为 em 相对于父元素的字体大小，但是实际上取决于应用在什么 CSS 属性上。对于 font-size 来说，em 相对于父元素的字体大小；<code v-pre>line-height</code> 中，em 却相对于自身字体的大小。</p>
<p>rem 适用于字体，这样就可以通过改变根元素的字体大小来改变整个页面的字体大小。</p>
<h4 id="px-em-rem-的区别" tabindex="-1"><a class="header-anchor" href="#px-em-rem-的区别" aria-hidden="true">#</a> px， em， rem 的区别？</h4>
<ul>
<li>px 是相对长度单位。像素 px 是相对于显示器屏幕分辨率而言的。</li>
<li>em 是相对长度单位。相对于当前对象内文本的字体尺寸;（参考物是父元素的 font-size）。如当前父元素的字体尺寸未设置，则相对于浏览器的默认字体尺寸</li>
<li>rem 是相对于 HTML 根元素的字体大小（font-size）来计算的长度单位。</li>
</ul>
<h4 id="相对于谁" tabindex="-1"><a class="header-anchor" href="#相对于谁" aria-hidden="true">#</a> % 相对于谁</h4>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wp</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>第一处 50% 是指 .wrap 相对定位元素宽度和高度的 50%，而 <code v-pre>transform</code> 中的 50% 是指自身元素的宽高的一半。</li>
<li>对于设置绝对定位 <code v-pre>position absolute</code> 的元素，我们可以使用 <code v-pre>left</code> <code v-pre>right</code> 表示其偏移量，我们把这个元素的祖先元素中第一个存在定位属性的元素成为参照物元素，其中的 % 是相对于参照物的，<code v-pre>left</code> 相对于参照物的 <code v-pre>width</code>，<code v-pre>top</code> 相对于这个参照物的 <code v-pre>height</code>。</li>
<li>对于设置相对定位 <code v-pre>position relative</code> 的元素，% 的数值是相对与自身的，left 相对于自己的 width，top 相对于自己的 height。</li>
<li>对于设置固定定位 <code v-pre>position fixed</code> 的元素，% 的数值是相对于视口的，left 相对于视口的 width，top 相对于视口的 height。</li>
<li><code v-pre>margin</code> 和 <code v-pre>padding</code> 当中的 % 非常特殊，它是相对于父元素的宽度。没错，<code v-pre>margin-top: 30%</code>，相当于父元素宽度的 30%。</li>
<li><code v-pre>font-size</code> 的 %相对于父元素的字体大小。</li>
<li><code v-pre>line-height</code> 设置行高时，如果单位为 %，则相对于该元素的 <code v-pre>font-size</code> 数值。</li>
<li><code v-pre>text-indent</code> 这个属性可以设置首行缩进，当使用 % 时，它是相对于父元素的 <code v-pre>width</code>。</li>
<li><code v-pre>border-radius: 50%</code>得到一个圆形，因此不难发现这里的 % 也是相对于自身宽高的。</li>
<li><code v-pre>background-size</code> 的百分比和 <code v-pre>border-radius</code> 一样，也是相对于自身的宽高。</li>
<li><code v-pre>transform</code> 的 <code v-pre>translate</code> 属性 % 是相对于自身的宽高，这也是我们上述代码能够实现居中的原因。</li>
</ul>
<h3 id="布局方式" tabindex="-1"><a class="header-anchor" href="#布局方式" aria-hidden="true">#</a> 布局方式</h3>
<h4 id="什么是-flex-写出常见属性-以及作用" tabindex="-1"><a class="header-anchor" href="#什么是-flex-写出常见属性-以及作用" aria-hidden="true">#</a> 什么是 flex？写出常见属性，以及作用？</h4>
<p>flex：弹性布局。</p>
<p>常见属性及作用：</p>
<ul>
<li>flex-direction 属性决定主轴的方向（即项目的排列方向）。</li>
<li>justify-content 属性定义了项目在主轴上的对齐方式。</li>
<li>align-items 属性定义项目在交叉轴上如何对齐。</li>
<li>align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</li>
</ul>
<p>项目属性：</p>
<ul>
<li>order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。</li>
<li>flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。</li>
<li>align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。</li>
</ul>
<h4 id="display-有哪些值-说明他们的作用" tabindex="-1"><a class="header-anchor" href="#display-有哪些值-说明他们的作用" aria-hidden="true">#</a> display 有哪些值？说明他们的作用？</h4>
<ul>
<li>none：   元素不会被显示</li>
<li>block： 此元素将显示为块级元素，此元素前后会带有换行符。</li>
<li>inline： 默认。此元素会被显示为内联元素，元素前后没有换行符。</li>
<li>inline-block： 像行内元素一样显示，但其内容像块类型元素一样显示。可以设置宽高，可以设置 margin 和 padding。</li>
<li>flex： 弹性盒子布局</li>
<li>inline-flex：内联的弹性盒子布局</li>
<li>table： 此元素会作为块级表格来显示（类似 <code v-pre>&lt;table&gt;</code>），表格前后带有换行符。</li>
<li>inline-table： 此元素会作为内联表格来显示（类似 <code v-pre>&lt;table&gt;</code>），表格前后没有换行符。</li>
<li>table-row： 此元素会作为一个表格行显示（类似 <code v-pre>&lt;tr&gt;</code>）。</li>
<li>table-cell：此元素会作为一个表格单元格显示（类似 <code v-pre>&lt;td&gt;</code> 和 <code v-pre>&lt;th&gt;</code>）</li>
<li>grid： 网格布局</li>
<li>inherit 规定应该从父元素继承 display 属性的值。</li>
</ul>
<h4 id="隐藏一个元素有多少种方法" tabindex="-1"><a class="header-anchor" href="#隐藏一个元素有多少种方法" aria-hidden="true">#</a> 隐藏一个元素有多少种方法？</h4>
<ol>
<li><code v-pre>display:none;</code></li>
<li><code v-pre>opacity:0;</code></li>
<li><code v-pre>visibility：hidden;</code></li>
<li><code v-pre>position:absolute;clip(0,0,0,0);</code></li>
<li><code v-pre>overflow:hidden;</code></li>
<li><code v-pre>width: 0px;height: 0px;</code></li>
</ol>
<h4 id="display-none-与-visibility-hidden区别在哪" tabindex="-1"><a class="header-anchor" href="#display-none-与-visibility-hidden区别在哪" aria-hidden="true">#</a> <code v-pre>display: none</code> 与 <code v-pre>visibility: hidden</code>区别在哪？</h4>
<p>联系：它们都能让元素不可见</p>
<p>区别：</p>
<ol>
<li><code v-pre>display:none</code>会让元素完全从渲染树中消失，渲染的时候<strong>不占据任何空间</strong>；<code v-pre>visibility: hidden</code>不会让元素从渲染树消失，渲染元素<strong>继续占据空间</strong>，只是内容不可见</li>
<li><code v-pre>display: none</code>是<strong>非继承属性</strong>，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；<code v-pre>visibility: hidden</code><strong>是继承属性</strong>，子孙节点消失由于继承了 hidden，通过设置<code v-pre>visibility: visible</code>可以让子孙节点显示</li>
<li>修改常规流中元素的<code v-pre>display</code>通常会造成文档<strong>回流</strong>。修改<code v-pre>visibility</code>属性只会造成本元素的<strong>重绘</strong>。</li>
<li><strong>读屏器</strong>不会读取<code v-pre>display: none</code>元素内容；会读取<code v-pre>visibility: hidden</code>元素内容</li>
</ol>
<h3 id="浮动" tabindex="-1"><a class="header-anchor" href="#浮动" aria-hidden="true">#</a> 浮动</h3>
<h4 id="行内元素float-left后是否变为块级元素" tabindex="-1"><a class="header-anchor" href="#行内元素float-left后是否变为块级元素" aria-hidden="true">#</a> 行内元素<code v-pre>float:left</code>后是否变为块级元素？</h4>
<p>浮动后，行内元素不会成为块状元素，但是可以设置宽高。行内元素要想变成块状元素，占一行，直接设置<code v-pre>display:block</code>。但如果元素设置了浮动后再设置<code v-pre>display:block</code>那就不会占一行</p>
<h4 id="为什么要清除浮动" tabindex="-1"><a class="header-anchor" href="#为什么要清除浮动" aria-hidden="true">#</a> 为什么要清除浮动？</h4>
<p>不清除浮动会发生高度塌陷：</p>
<p>父元素不写高度时，子元素写了浮动后，父元素会发生高度塌陷。</p>
<h4 id="清除浮动有几种方式" tabindex="-1"><a class="header-anchor" href="#清除浮动有几种方式" aria-hidden="true">#</a> 清除浮动有几种方式？</h4>
<ol>
<li>添加空 div，在浮动元素下方添加空 div，并给该元素写 CSS 样式<code v-pre>clear:both</code></li>
</ol>
<ul>
<li>优点： 简单，代码少，浏览器支持好，不容易出现怪问题</li>
<li>缺点： 页面浮动布局多，就要增加很多空 div</li>
</ul>
<ol start="2">
<li>父级设置高度</li>
</ol>
<ul>
<li>优点：简单，代码少</li>
<li>缺点： 只适合高度固定的布局</li>
</ul>
<ol start="3">
<li>父级同时浮动（需要给父级同级元素添加浮动）</li>
</ol>
<ul>
<li>优点： 无</li>
<li>缺点： 产生新的浮动问题</li>
</ul>
<ol start="4">
<li>给父级添加<code v-pre>overflow:hidden</code> 清除浮动方法</li>
</ol>
<ul>
<li>优点： 简单，代码少，浏览器支持好</li>
<li>缺点： 不能和 position 配合使用，因为超出的尺寸的会被隐藏</li>
</ul>
<ol start="5">
<li>父级元素定义 after 伪类 （现在主流方法，推荐使用）</li>
</ol>
<ul>
<li>优点： 浏览器支持好，不容易出现怪问题</li>
<li>缺点： 代码多</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.fix:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">//兼容ie6,7
.fix</span> <span class="token punctuation">{</span>
  *<span class="token property">zoom</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="css-盒模型" tabindex="-1"><a class="header-anchor" href="#css-盒模型" aria-hidden="true">#</a> CSS 盒模型</h3>
<h4 id="介绍一下标准的-css-的盒子模型-低版本-ie-的盒子模型有什么不同的" tabindex="-1"><a class="header-anchor" href="#介绍一下标准的-css-的盒子模型-低版本-ie-的盒子模型有什么不同的" aria-hidden="true">#</a> 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？</h4>
<ul>
<li>标准模型<code v-pre>width</code>不计算<code v-pre>padding</code>和<code v-pre>border</code></li>
<li>IE 模型<code v-pre>width</code>计算<code v-pre>padding</code>和<code v-pre>border</code>。</li>
</ul>
<p><code v-pre>box-sizing</code> : <code v-pre>content-box</code>(标准模型-默认)/<code v-pre>border-box</code>(IE 模型)</p>
<h4 id="js-中如何获取盒模型宽高" tabindex="-1"><a class="header-anchor" href="#js-中如何获取盒模型宽高" aria-hidden="true">#</a> js 中如何获取盒模型宽高?</h4>
<ol>
<li><code v-pre>dom.style.width</code>（只能取内联宽高)</li>
<li><code v-pre>dom.currentStyle.width</code> (浏览器渲染之后的取值，只有 IE 支持)</li>
<li><code v-pre>window.getComputedStyle(dom).width</code> (浏览器渲染之后的取值，兼容性更好)</li>
<li><code v-pre>dom.getBoundingClientRect().width/height/left/top</code> (常用于计算位置)</li>
</ol>
<h3 id="bfc" tabindex="-1"><a class="header-anchor" href="#bfc" aria-hidden="true">#</a> BFC</h3>
<h4 id="什么是-bfc-概念" tabindex="-1"><a class="header-anchor" href="#什么是-bfc-概念" aria-hidden="true">#</a> 什么是 BFC?(概念)</h4>
<p>块级格式化上下文</p>
<h4 id="对-bfc-规范的理解" tabindex="-1"><a class="header-anchor" href="#对-bfc-规范的理解" aria-hidden="true">#</a> 对 BFC 规范的理解？</h4>
<p>它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用</p>
<h4 id="bfc-的原理" tabindex="-1"><a class="header-anchor" href="#bfc-的原理" aria-hidden="true">#</a> BFC 的原理？</h4>
<ol>
<li>同一 BFC 内块级元素之间的垂直方向边距会发生重叠。</li>
<li>浮动元素区域不会与 BFC 重叠</li>
<li>BFC 在页面上是一个独立的容器，外面的元素不会影响里面的元素，里面的元素也不会影响外面的元素</li>
<li>计算 BFC 高度时，浮动元素也会参与计算</li>
</ol>
<h4 id="如何创建-bfc" tabindex="-1"><a class="header-anchor" href="#如何创建-bfc" aria-hidden="true">#</a> 如何创建 BFC？</h4>
<ul>
<li><code v-pre>&lt;html&gt;</code> 根元素。</li>
<li><code v-pre>float</code> 的值不为 <code v-pre>none</code> 。</li>
<li><code v-pre>overflow</code> 值不为 <code v-pre>visible</code> 的块元素。</li>
<li>绝对定位元素（元素的 <code v-pre>position</code> 为 <code v-pre>absolute</code> 或 <code v-pre>fixed</code>）</li>
<li><code v-pre>display</code> 的值为 <code v-pre>table-cell</code>、 <code v-pre>table-caption</code> 和 <code v-pre>inline-block</code> 中的任何一个。</li>
</ul>
<h4 id="bfc-使用场景" tabindex="-1"><a class="header-anchor" href="#bfc-使用场景" aria-hidden="true">#</a> BFC 使用场景?</h4>
<ol>
<li>解决垂直方向的边距重叠</li>
<li>清除浮动</li>
</ol>
<h3 id="重绘-repaint-和回流-reflow" tabindex="-1"><a class="header-anchor" href="#重绘-repaint-和回流-reflow" aria-hidden="true">#</a> 重绘（Repaint）和回流（Reflow）</h3>
<p>重绘和回流会在我们设置节点样式时频繁出现，同时也会很大程度上影响性能。</p>
<h4 id="重绘与回流" tabindex="-1"><a class="header-anchor" href="#重绘与回流" aria-hidden="true">#</a> 重绘与回流</h4>
<ul>
<li>重绘(Repaint)是当节点需要更改外观而不会影响布局的，比如改变 <code v-pre>color</code> 就叫称为重绘</li>
<li>回流(Reflow)是布局或者几何属性需要改变就称为回流。</li>
</ul>
<p>回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。</p>
<p><strong>以下几个动作可能会导致性能问题：</strong></p>
<ul>
<li>改变 <code v-pre>window</code> 大小</li>
<li>改变字体</li>
<li>添加或删除样式</li>
<li>文字改变</li>
<li>定位或者浮动</li>
<li>盒模型</li>
</ul>
<p>并且很多人不知道的是，重绘和回流其实也和 Eventloop 有关。</p>
<ol>
<li>当 Eventloop 执行完 Microtasks（微任务） 后，会判断 <code v-pre>document</code> 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次。</li>
<li>然后判断是否有 <code v-pre>resize</code> 或者 <code v-pre>scroll</code> 事件，有的话会去触发事件，所以 <code v-pre>resize</code> 和 <code v-pre>scroll</code> 事件也是至少 16ms 才会触发一次，并且自带节流功能。</li>
<li>判断是否触发了 media query(媒体查询)</li>
<li>更新动画并且发送事件</li>
<li>判断是否有全屏操作事件</li>
<li>执行 <code v-pre>requestAnimationFrame</code> 回调</li>
<li>执行 <code v-pre>IntersectionObserver</code> 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好</li>
<li>更新界面</li>
<li>以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 <code v-pre>requestIdleCallback</code> 回调。</li>
</ol>
<p>以上内容来自于 <a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model" target="_blank" rel="noopener noreferrer">HTML 文档<ExternalLinkIcon/></a>。</p>
<h4 id="减少-重绘与回流" tabindex="-1"><a class="header-anchor" href="#减少-重绘与回流" aria-hidden="true">#</a> 减少 重绘与回流</h4>
<ol>
<li>使用 <code v-pre>transform</code> 替代 <code v-pre>top</code></li>
<li>使用 <code v-pre>visibility</code> 替换 <code v-pre>display: none</code> (前者只会引起重绘，后者会引发回流)</li>
<li>不要把节点的属性值放在一个循环里当成循环里的变量</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取 offsetTop 会导致回流，因为需要去获取正确的值</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">".test"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>offsetTop<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>不要使用 <code v-pre>table</code> 布局，可能很小的一个小改动会造成整个 <code v-pre>table</code> 的重新布局</li>
<li>动画实现的速度的选择，动画速度越快，回流次数越多，可以选择使用 <code v-pre>requestAnimationFrame</code></li>
<li>CSS 选择符<strong>从右往左</strong>匹配查找，避免节点层级过多</li>
<li>将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 <code v-pre>video</code> 标签来说，浏览器会自动将该节点变为图层;<br />以下常用属性可以生成新图层:
<ul>
<li><code v-pre>will-change</code></li>
<li><code v-pre>video、iframe</code> 标签</li>
</ul>
</li>
<li>不要重复添加 DOM， 如果有多个操作合并在一起添加到页面</li>
</ol>
<h3 id="fouc" tabindex="-1"><a class="header-anchor" href="#fouc" aria-hidden="true">#</a> FOUC</h3>
<h4 id="什么是-fouc-如何避免" tabindex="-1"><a class="header-anchor" href="#什么是-fouc-如何避免" aria-hidden="true">#</a> 什么是 FOUC?如何避免?</h4>
<p><code v-pre>Flash Of Unstyled Content</code>：用户定义样式表加载之前浏览器使用默认样式显示文档，CSS 样式加载后再次渲染文档，造成页面闪烁。</p>
<p>解决方法：把样式表放到文档的 head</p>
<h3 id="css-sprite" tabindex="-1"><a class="header-anchor" href="#css-sprite" aria-hidden="true">#</a> css sprite</h3>
<h4 id="css-sprite-是什么-有什么优缺点" tabindex="-1"><a class="header-anchor" href="#css-sprite-是什么-有什么优缺点" aria-hidden="true">#</a> css sprite 是什么,有什么优缺点</h4>
<p>概念：将多个小图片拼接到一个图片中。通过<code v-pre>background-position</code>和元素尺寸调节显示需要的背景图案。</p>
<p>优点：</p>
<ul>
<li>减少 HTTP 请求数，提高页面加载速度</li>
<li>减少图片大小</li>
<li>更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现</li>
</ul>
<p>缺点：</p>
<ul>
<li>图片合并麻烦</li>
<li>维护麻烦，修改一个图片可能需要从新布局整个图片，样式</li>
</ul>
<h4 id="css3" tabindex="-1"><a class="header-anchor" href="#css3" aria-hidden="true">#</a> CSS3</h4>
<h4 id="css3-有哪些新特性" tabindex="-1"><a class="header-anchor" href="#css3-有哪些新特性" aria-hidden="true">#</a> CSS3 有哪些新特性</h4>
<ul>
<li>新增各种 CSS 选择器</li>
<li>边框圆角 <code v-pre>border-radius</code></li>
<li>多列布局</li>
<li>阴影和反射</li>
<li>文字特效<code v-pre>text-shadow</code></li>
<li>线性渐变</li>
<li>旋转<code v-pre>transform</code></li>
<li>过渡<code v-pre>transition</code></li>
<li>动画<code v-pre>animation</code></li>
</ul>
<h4 id="css3-新增伪类有那些" tabindex="-1"><a class="header-anchor" href="#css3-新增伪类有那些" aria-hidden="true">#</a> CSS3 新增伪类有那些？</h4>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>* <span class="token property">p</span><span class="token punctuation">:</span>first-of-type 选择属于其父元素的首个&lt;p>元素的每个&lt;p> 元素。
* <span class="token property">p</span><span class="token punctuation">:</span>last-of-type 选择属于其父元素的最后 &lt;p> 元素的每个&lt;p> 元素。
* <span class="token property">p</span><span class="token punctuation">:</span>only-of-type 选择属于其父元素唯一的 &lt;p>元素的每个 &lt;p> 元素。
* <span class="token property">p</span><span class="token punctuation">:</span>only-child 选择属于其父元素的唯一子元素的每个 &lt;p> 元素。
* <span class="token property">p</span><span class="token punctuation">:</span><span class="token function">nth-child</span><span class="token punctuation">(</span>2<span class="token punctuation">)</span> 选择属于其父元素的第二个子元素的每个 &lt;p> 元素。
* <span class="token punctuation">:</span>before 在元素之前添加内容
* <span class="token punctuation">:</span>after 在元素之后添加内容<span class="token punctuation">,</span>也可以用来做清除浮动。
* <span class="token punctuation">:</span>enabled 选择器匹配每个启用的的元素（主要用于表单元素）。
* <span class="token punctuation">:</span>disabled 控制表单控件的禁用状态。
* <span class="token punctuation">:</span>checked 单选框或复选框被选中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="笔试题" tabindex="-1"><a class="header-anchor" href="#笔试题" aria-hidden="true">#</a> 笔试题</h3>
<h4 id="如何用-css-实现一行文字后面-的情况" tabindex="-1"><a class="header-anchor" href="#如何用-css-实现一行文字后面-的情况" aria-hidden="true">#</a> 如何用 css 实现一行文字后面...的情况?</h4>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> //超出隐藏
<span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span> //不允许换行
<span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span> //超出部分用...代替
//多行的情况请添加如下设置
<span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
<span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span> //多行情况下可以设置哪一行多余部分用...代替。这里设置的是第一行
<span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="css3-如何实现-0-5px-的细线" tabindex="-1"><a class="header-anchor" href="#css3-如何实现-0-5px-的细线" aria-hidden="true">#</a> css3 如何实现 0.5px 的细线?</h4>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.line</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.line:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #000000<span class="token punctuation">;</span>
  <span class="token property">-webkit-transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span> //在Y轴缩小一半
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>line<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="css-如何实现三角形" tabindex="-1"><a class="header-anchor" href="#css-如何实现三角形" aria-hidden="true">#</a> css 如何实现三角形?</h4>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">span</span> <span class="token punctuation">{</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 40px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 40px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> 40px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 40px solid #ff0000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="宽高已知-如何实现-div-水平垂直居中" tabindex="-1"><a class="header-anchor" href="#宽高已知-如何实现-div-水平垂直居中" aria-hidden="true">#</a> 宽高已知，如何实现 div 水平垂直居中?</h4>
<h5 id="第一种方案" tabindex="-1"><a class="header-anchor" href="#第一种方案" aria-hidden="true">#</a> 第一种方案</h5>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.content</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> -50px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="第二种方案" tabindex="-1"><a class="header-anchor" href="#第二种方案" aria-hidden="true">#</a> 第二种方案</h5>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box div</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>水平垂直居中<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="宽高未知-如何实现-div-水平垂直居中" tabindex="-1"><a class="header-anchor" href="#宽高未知-如何实现-div-水平垂直居中" aria-hidden="true">#</a> 宽高未知，如何实现 div 水平垂直居中?</h4>
<h5 id="第一种方案-1" tabindex="-1"><a class="header-anchor" href="#第一种方案-1" aria-hidden="true">#</a> 第一种方案</h5>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.content</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="flex-解决方案" tabindex="-1"><a class="header-anchor" href="#flex-解决方案" aria-hidden="true">#</a> flex 解决方案:</h5>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.content</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="假设高度已知-请写出三栏布局-圣杯布局-其中左栏、右栏宽度各为-100px-中间自适应" tabindex="-1"><a class="header-anchor" href="#假设高度已知-请写出三栏布局-圣杯布局-其中左栏、右栏宽度各为-100px-中间自适应" aria-hidden="true">#</a> 假设高度已知，请写出三栏布局(圣杯布局)，其中左栏、右栏宽度各为 100px，中间自适应</h4>
<p>以下布局如果条件是高度未知,依然适用的布局有 flex, table 布局。</p>
<ul>
<li>浮动:
<ul>
<li>缺点：脱离文档流，需清除浮动。处理不好会带来很多问题。</li>
<li>优点：兼容性好。</li>
</ul>
</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
    .box1 div</span><span class="token punctuation">{</span>
      <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box1 .left</span><span class="token punctuation">{</span>
        <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box1 .right</span><span class="token punctuation">{</span>
        <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box1 .center</span><span class="token punctuation">{</span>
        <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 0 100px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
&lt;/style>
&lt;section class=<span class="token string">"box1"</span>>
    &lt;div class=<span class="token string">"left"</span>>&lt;/div>
    &lt;div class=<span class="token string">"right"</span>>&lt;/div>
    &lt;div class=<span class="token string">"center"</span>>浮动自适应部分&lt;/div>
&lt;/section>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>绝对定位:
<ul>
<li>缺点：绝对定位脱离文档流，导致了其子元素都脱离了文档流，可使用性很差。</li>
<li>优点：快捷！</li>
</ul>
</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
    .box2</span><span class="token punctuation">{</span>
        <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box2 div</span><span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
        <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box2 .left</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box2 .center</span><span class="token punctuation">{</span>
        <span class="token property">left</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">right</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box2 .right</span><span class="token punctuation">{</span>
        <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
&lt;/style>
&lt;section class=<span class="token string">"box2"</span>>
    &lt;div class=<span class="token string">"left"</span>> &lt;/div>
    &lt;div class=<span class="token string">"center"</span>>绝对定位自适应部分&lt;/div>
    &lt;div class=<span class="token string">"right"</span>>&lt;/div>
&lt;/section>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>flex:
<ul>
<li>缺点：只兼容到 ie9。</li>
<li>优点：比较完美的方案。</li>
</ul>
</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
    .box3</span><span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box3 .left</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box3 .center</span><span class="token punctuation">{</span>
        <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box3 .right</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

&lt;/style>
&lt;section class=<span class="token string">"box3"</span>>
    &lt;div class=<span class="token string">"left"</span>>&lt;/div>
    &lt;div class=<span class="token string">"center"</span>>flex自适应部分&lt;/div>
    &lt;div class=<span class="token string">"right"</span>>&lt;/div>
&lt;/section>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>表格:
<ul>
<li>缺点：多栏布局时，某个单元格高度超出，会使其他单元格高度一起增加。操作繁琐，SEO 不友好。</li>
<li>优点：兼容性好，兼容 ie8。</li>
</ul>
</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
    .box4</span> <span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box4 div</span><span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box4 .left</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box4 .center</span><span class="token punctuation">{</span>
        <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box4 .right</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">min-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
&lt;/style>
&lt;section class=<span class="token string">"box4"</span>>
    &lt;div class=<span class="token string">"left"</span>>&lt;/div>
    &lt;div class=<span class="token string">"center"</span>>表格自适应部分&lt;/div>
    &lt;div class=<span class="token string">"right"</span>>&lt;/div>
&lt;/section>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>网格布局:
<ul>
<li>优点:新技术，代码量少</li>
<li>缺点:兼容性不好， 不兼容 IE</li>
</ul>
</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
    .box5</span><span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token property">grid-template-rows</span><span class="token punctuation">:</span>50px<span class="token punctuation">;</span>
        <span class="token property">grid-template-columns</span><span class="token punctuation">:</span>100px auto  100px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box5 .left</span><span class="token punctuation">{</span>
        <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box5 .center</span><span class="token punctuation">{</span>
        <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.box5 .right</span><span class="token punctuation">{</span>
        <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
&lt;/style>
&lt;section class=<span class="token string">"box5"</span>>
    &lt;div class=<span class="token string">"left"</span>>&lt;/div>
    &lt;div class=<span class="token string">"center"</span>>网格自适应部分&lt;/div>
    &lt;div class=<span class="token string">"right"</span>>&lt;/div>
&lt;/section>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="如何实现下图九宫格的效果-鼠标滑过边框显示红色" tabindex="-1"><a class="header-anchor" href="#如何实现下图九宫格的效果-鼠标滑过边框显示红色" aria-hidden="true">#</a> 如何实现下图九宫格的效果?鼠标滑过边框显示红色?</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/jiugongge.png" alt="输入图片说明"></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wrap li</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-flex<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 4px solid #ccc<span class="token punctuation">;</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -4px<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> -4px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wrap li:nth-child(3n + 1)</span> <span class="token punctuation">{</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wrap li:nth-child(1),
.wrap li:nth-child(2),
.wrap li:nth-child(3)</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wrap li:hover</span> <span class="token punctuation">{</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


