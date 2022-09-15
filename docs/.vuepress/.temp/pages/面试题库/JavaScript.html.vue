<template><div><h2 id="js" tabindex="-1"><a class="header-anchor" href="#js" aria-hidden="true">#</a> JS</h2>
<h3 id="js-规范" tabindex="-1"><a class="header-anchor" href="#js-规范" aria-hidden="true">#</a> JS 规范</h3>
<h4 id="说几条写-javascript-的基本规范" tabindex="-1"><a class="header-anchor" href="#说几条写-javascript-的基本规范" aria-hidden="true">#</a> 说几条写 JavaScript 的基本规范？</h4>
<ul>
<li>不要在同一行声明多个变量</li>
<li>请使用<code v-pre>===/!==</code>来比较<code v-pre>true/false</code>或者数值</li>
<li>使用对象字面量替代<code v-pre>new Array</code>这种形式</li>
<li>不要使用全局函数</li>
<li><code v-pre>Switch</code>语句必须带有<code v-pre>default</code>分支</li>
<li><code v-pre>If</code>语句必须使用大括号</li>
<li><code v-pre>for-in</code>循环中的变量 应该使用<code v-pre>let</code>关键字明确限定作用域，从而避免作用域污染</li>
</ul>
<h4 id="w3c-对-js-的规定有哪些" tabindex="-1"><a class="header-anchor" href="#w3c-对-js-的规定有哪些" aria-hidden="true">#</a> W3C 对 JS 的规定有哪些?</h4>
<ul>
<li>DOM</li>
<li>BOM</li>
<li>事件绑定</li>
<li>ajax 请求(包括 http 协议)</li>
<li>存储</li>
</ul>
<h3 id="变量类型" tabindex="-1"><a class="header-anchor" href="#变量类型" aria-hidden="true">#</a> 变量类型</h3>
<h4 id="原始类型有哪些" tabindex="-1"><a class="header-anchor" href="#原始类型有哪些" aria-hidden="true">#</a> 原始类型有哪些？</h4>
<p>字符串（<code v-pre>String</code>）、数值（<code v-pre>Number</code>）、布尔值（<code v-pre>Boolean</code>）、<code v-pre>Undefined</code>、<code v-pre>Null</code>、 <code v-pre>symbol</code></p>
<p>占用空间固定，保存在栈中，存储的是值。</p>
<p>原始类型存储的是值，是没有函数可以调用的。之所以 <code v-pre>'1'.toString()</code> 可以被调用，是因为它做了一层封装。被强制转换成了 <code v-pre>String</code> 类型，也就是对象类型,   所以可以调用<code v-pre>toString</code>函数。</p>
<p><code v-pre>string</code> 类型是不可变的，无论你在 <code v-pre>string</code> 类型上调用何种方法，都不会对值有改变。</p>
<h4 id="对象类型有哪些" tabindex="-1"><a class="header-anchor" href="#对象类型有哪些" aria-hidden="true">#</a> 对象类型有哪些？</h4>
<p>对象（<code v-pre>Object</code>）、数组（<code v-pre>Array</code>）、函数（<code v-pre>Function</code>）</p>
<p>占用空间不固定，地址存在栈内存，值保存在堆中, 复制的是地址, 指向同一块内存空间。 使用 <code v-pre>instanceof</code> 检测数据类型</p>
<h4 id="为什么值类型赋值是直接赋值-而引用类型是直接赋值一个内存地址" tabindex="-1"><a class="header-anchor" href="#为什么值类型赋值是直接赋值-而引用类型是直接赋值一个内存地址" aria-hidden="true">#</a> 为什么值类型赋值是直接赋值， 而引用类型是直接赋值一个内存地址？</h4>
<p>主要考虑到性能/存储问题，因为值类型占用空间比较少。它可以直接赋值， 不会对性能造成太大影响。而一般来说， 引用类型存储的空间占用较大，不好管理。如果我们直接复制会导致复制过程非常慢。所以说， 计算机所有的程序，所有的代码，所有的语言，都是采用这种方式。</p>
<h4 id="原始类型和对象类型区别" tabindex="-1"><a class="header-anchor" href="#原始类型和对象类型区别" aria-hidden="true">#</a> 原始类型和对象类型区别?</h4>
<ol>
<li>原始类型存储的是值,保留在栈内存(空间固定)，相等都要重新创建一份</li>
<li>对象类型存储的是指针，保留在堆内存(空间不固定)，相等时引用的是同一份指针</li>
</ol>
<h4 id="typeof-都能识别哪些类型" tabindex="-1"><a class="header-anchor" href="#typeof-都能识别哪些类型" aria-hidden="true">#</a> typeof 都能识别哪些类型？</h4>
<ul>
<li>识别除了<code v-pre>null</code>之外的所有值类型</li>
<li>识别函数</li>
<li>判断是否是引用类型（不可再细分）</li>
</ul>
<h4 id="类数组和数组的区别是什么" tabindex="-1"><a class="header-anchor" href="#类数组和数组的区别是什么" aria-hidden="true">#</a> 类数组和数组的区别是什么？</h4>
<p>类数组: 拥有 length 属性，不具有数组所具有的方法。</p>
<h4 id="类数组如何转换为数组" tabindex="-1"><a class="header-anchor" href="#类数组如何转换为数组" aria-hidden="true">#</a> 类数组如何转换为数组？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//第一种方法</span>
<span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arrayLike<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//第二种方法</span>
<span class="token punctuation">[</span><span class="token operator">...</span>arrayLike<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">//第三种方法:</span>
Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>arrayLike<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="js-内置函数是什么" tabindex="-1"><a class="header-anchor" href="#js-内置函数是什么" aria-hidden="true">#</a> JS 内置函数是什么?</h4>
<p>内置函数: <code v-pre>Object</code>, <code v-pre>Array</code> , <code v-pre>Function</code> , <code v-pre>Boolean</code> , <code v-pre>Number</code> , <code v-pre>String</code> , <code v-pre>Date</code> , <code v-pre>RegExp</code> , <code v-pre>Error</code> , <code v-pre>Json</code> .</p>
<p>作用: 作为构造器函数</p>
<h4 id="函数参数是对象会发生什么" tabindex="-1"><a class="header-anchor" href="#函数参数是对象会发生什么" aria-hidden="true">#</a> 函数参数是对象会发生什么?</h4>
<p>函数参数是对象指针的副本，当参数重新分配对象时，参数的指针会发生变化。两个变量的值也会不相同</p>
<h4 id="null-和-undefined-的区别是什么" tabindex="-1"><a class="header-anchor" href="#null-和-undefined-的区别是什么" aria-hidden="true">#</a> null 和 undefined 的区别是什么?</h4>
<ul>
<li><code v-pre>null</code>表示空对象指针
<ul>
<li>如果定义的变量准备用来保存对象，那么最好初始化为<code v-pre>null</code></li>
</ul>
</li>
<li><code v-pre>undefined</code>表示未赋值的变量</li>
<li>在使用<code v-pre>==</code>会发生类型转换.导致相等</li>
</ul>
<h4 id="null-是对象嘛" tabindex="-1"><a class="header-anchor" href="#null-是对象嘛" aria-hidden="true">#</a> null 是对象嘛？</h4>
<p>null 并不是对象类型 。虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。</p>
<h4 id="instanceof-的原理" tabindex="-1"><a class="header-anchor" href="#instanceof-的原理" aria-hidden="true">#</a> instanceof 的原理:</h4>
<p>沿着原型链一层一层向上找, 看是否能找到对应的<code v-pre>prototype</code></p>
<h4 id="自己实现一个-instanceof" tabindex="-1"><a class="header-anchor" href="#自己实现一个-instanceof" aria-hidden="true">#</a> 自己实现一个 instanceof</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span><span class="token parameter">left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> prototype <span class="token operator">=</span> right<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
  left <span class="token operator">=</span> left<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> left <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prototype <span class="token operator">===</span> left<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    left <span class="token operator">=</span> left<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="怎么实现浅拷贝" tabindex="-1"><a class="header-anchor" href="#怎么实现浅拷贝" aria-hidden="true">#</a> 怎么实现浅拷贝？</h4>
<p>浅拷贝是指只拷贝所有属性到新对象,如果属性值是对象,只拷贝地址.</p>
<p>浅拷贝通过<code v-pre>object.assign()</code>,扩展运算符<code v-pre>...</code>来解决</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> newObj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newObj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>obj <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="怎么实现深拷贝" tabindex="-1"><a class="header-anchor" href="#怎么实现深拷贝" aria-hidden="true">#</a> 怎么实现深拷贝？</h4>
<ul>
<li>通过 JSON.parse(JSON.stringify(object)) 来解决</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> newObj <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是：会忽略 <code v-pre>undefined</code>、 <code v-pre>symbol</code>、不能序列化函数、不能解决循环引用的对象</p>
<h3 id="类型转换" tabindex="-1"><a class="header-anchor" href="#类型转换" aria-hidden="true">#</a> 类型转换</h3>
<h4 id="哪些情况下会发生类型转换" tabindex="-1"><a class="header-anchor" href="#哪些情况下会发生类型转换" aria-hidden="true">#</a> 哪些情况下会发生类型转换?</h4>
<ul>
<li>==</li>
<li>逻辑运算符</li>
<li>if</li>
<li>字符串拼接</li>
</ul>
<p>首先我们要知道，在 JS 中类型转换只有三种情况，分别是：</p>
<ul>
<li>转换为布尔值</li>
<li>转换为数字</li>
<li>转换为字符串</li>
</ul>
<p><strong>类型转换表格</strong></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/boolean.png" alt="输入图片说明"></p>
<h4 id="转-boolean" tabindex="-1"><a class="header-anchor" href="#转-boolean" aria-hidden="true">#</a> 转 Boolean</h4>
<p>在条件判断时，除了 <code v-pre>undefined</code>，<code v-pre>null</code>， <code v-pre>false</code>，<code v-pre>NaN</code>， <code v-pre>''</code>， <code v-pre>0</code>， <code v-pre>-0</code>，其他所有值都转为 <code v-pre>true</code>，包括所有对象。</p>
<h4 id="javascript-中如何进行隐式类型转换" tabindex="-1"><a class="header-anchor" href="#javascript-中如何进行隐式类型转换" aria-hidden="true">#</a> JavaScript 中如何进行隐式类型转换？</h4>
<p>首先要介绍 <code v-pre>ToPrimitive</code> 方法，这是 JavaScript 中每个值隐含的自带的方法，用来将值 （无论是基本类型值还是对象）转换为基本类型值。如果值为基本类型，则直接返回值本身；如果值为对象，其看起来大概是这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@obj</span> 需要转换的对象
 * <span class="token keyword">@type</span> 期望的结果类型
 */</span>
<span class="token function">ToPrimitive</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="type-的值为-number-或者-string。" tabindex="-1"><a class="header-anchor" href="#type-的值为-number-或者-string。" aria-hidden="true">#</a> <code v-pre>type</code> 的值为 <code v-pre>number</code> 或者 <code v-pre>string</code>。</h5>
<p>当 <code v-pre>type</code> 为 <code v-pre>number</code> 时规则如下：</p>
<ol>
<li>调用 <code v-pre>obj</code> 的 <code v-pre>valueOf</code> 方法，如果为原始值，则返回，否则下一步；</li>
<li>调用 <code v-pre>obj</code> 的 <code v-pre>toString</code> 方法，后续同上；</li>
<li>抛出 <code v-pre>TypeError</code> 异常</li>
</ol>
<h5 id="当-type-为-string-时规则如下" tabindex="-1"><a class="header-anchor" href="#当-type-为-string-时规则如下" aria-hidden="true">#</a> 当 <code v-pre>type</code> 为 <code v-pre>string</code> 时规则如下：</h5>
<ol>
<li>调用 <code v-pre>obj</code> 的 <code v-pre>toString</code> 方法，如果为原始值，则返回，否则下一步；</li>
<li>调用 <code v-pre>obj</code> 的 <code v-pre>valueOf</code> 方法，后续同上；</li>
<li>抛出 <code v-pre>TypeError</code> 异常。</li>
</ol>
<p>可以看出两者的主要区别在于调用 <code v-pre>toString</code> 和 <code v-pre>valueOf</code> 的先后顺序。默认情况下：</p>
<ol>
<li>如果对象为 <code v-pre>Date</code> 对象，则 <code v-pre>type</code> 默认为 <code v-pre>string</code>；</li>
<li>其他情况下，<code v-pre>type</code> 默认为 <code v-pre>number</code>。</li>
</ol>
<p>而 JavaScript 中的隐式类型转换主要发生在 <code v-pre>+、-、*、/</code> 以及 <code v-pre>==、&gt;、&lt;</code> 这些运算符之间。而这些运算符只能操作基本类型值，所以在进行这些运算前的第一步就是将两边的值用 <code v-pre>ToPrimitive</code> 转换成基本类型，再进行操作。</p>
<h4 id="四则运算符" tabindex="-1"><a class="header-anchor" href="#四则运算符" aria-hidden="true">#</a> 四则运算符</h4>
<p>加法运算符不同于其他几个运算符，它有以下几个特点：</p>
<ul>
<li>运算中其中一方为字符串，那么就会把另一方也转换为字符串</li>
<li>如果一方不是字符串或者数字，那么会将它转换为数字或者字符串</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">1</span> <span class="token operator">+</span> <span class="token string">"1"</span><span class="token punctuation">;</span> <span class="token comment">// '11'</span>
<span class="token boolean">true</span> <span class="token operator">+</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token number">4</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// "41,2,3"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你对于答案有疑问的话，请看解析：</p>
<ul>
<li>对于第一行代码来说，触发特点一，所以将数字 1 转换为字符串，得到结果 '11'</li>
<li>对于第二行代码来说，触发特点二，所以将 true 转为数字 1</li>
<li>对于第三行代码来说，触发特点二，所以将数组通过 toString 转为字符串 1,2,3，得到结果 41,2,3</li>
</ul>
<p>另外对于加法还需要注意这个表达式 'a' + + 'b'</p>
<p><code v-pre>'a' + + 'b' // -&gt; &quot;aNaN&quot;</code></p>
<p>因为<code v-pre>+ 'b'</code> 等于 <code v-pre>NaN</code>，所以结果为 <code v-pre>&quot;aNaN&quot;</code>，你可能也会在一些代码中看到过 <code v-pre>+ '1'</code> 的形式来快速获取 number 类型。</p>
<p>除了加法运算，只要其中一方为数字，另一方必定转为数字。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">4</span> <span class="token operator">*</span> <span class="token string">"3"</span><span class="token punctuation">;</span> <span class="token comment">// 12</span>
<span class="token number">4</span> <span class="token operator">*</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token number">4</span> <span class="token operator">*</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符" aria-hidden="true">#</a> 比较运算符</h4>
<ol>
<li>如果是对象，就通过 toPrimitive 转换对象</li>
<li>如果是字符串，就通过 unicode 字符索引来比较</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"1"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
a <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上代码中，因为<code v-pre>a</code>是对象，所以会通过 <code v-pre>valueOf</code> 转换为原始类型再比较值。</p>
<h4 id="和-有什么区别" tabindex="-1"><a class="header-anchor" href="#和-有什么区别" aria-hidden="true">#</a> == 和 === 有什么区别？</h4>
<p>首先使用 <code v-pre>==</code> 是会发生隐式类型转换的。 一般只有判断一个变量是不是<code v-pre>null</code>和<code v-pre>undefined</code>时会使用<code v-pre>==</code>。其它地方一律用<code v-pre>===</code>。</p>
<p><code v-pre>==</code>运算流程图</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yuansuanliuchengtu.png" alt="输入图片说明"></p>
<h3 id="json" tabindex="-1"><a class="header-anchor" href="#json" aria-hidden="true">#</a> JSON</h3>
<h4 id="怎么理解-json" tabindex="-1"><a class="header-anchor" href="#怎么理解-json" aria-hidden="true">#</a> 怎么理解 json?</h4>
<p>是内置的 js 对象,也是一种数据格式</p>
<p>它有两个方法:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">11</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//把对象变成字符串</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">"{a:10,b:11}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//把字符串变成对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="xml-与-json-的区别" tabindex="-1"><a class="header-anchor" href="#xml-与-json-的区别" aria-hidden="true">#</a> XML 与 JSON 的区别?</h4>
<p>JSON 数据体积小 , 传递快 , 与 JavaScript 交互更加方便 , 容易解析 。</p>
<p>但是数据描述性差 , 不如 XML</p>
<h3 id="dom" tabindex="-1"><a class="header-anchor" href="#dom" aria-hidden="true">#</a> DOM</h3>
<h4 id="dom-的本质" tabindex="-1"><a class="header-anchor" href="#dom-的本质" aria-hidden="true">#</a> DOM 的本质?</h4>
<blockquote>
<p>DOM: Document Object Model 文档对象模型。</p>
<p>HTML 代码就是一个字符串，但是浏览器已经把字符串结构化成树形结构了。</p>
</blockquote>
<p>DOM 本质就是浏览器拿到 HTML 代码后，DOM 把 HTML 代码结构化成浏览器及 JS 可识别的模型 。</p>
<h4 id="dom-是哪种数据结构" tabindex="-1"><a class="header-anchor" href="#dom-是哪种数据结构" aria-hidden="true">#</a> DOM 是哪种数据结构?</h4>
<p>它是从 HTML 文件解译出来的一棵 DOM <strong>树形结构</strong>。</p>
<h4 id="dom-结构操作有哪些" tabindex="-1"><a class="header-anchor" href="#dom-结构操作有哪些" aria-hidden="true">#</a> DOM 结构操作有哪些？</h4>
<ul>
<li>新增节点 <code v-pre>document.createElement(node)</code></li>
<li>获取父元素 <code v-pre>childNode.parentElement</code></li>
<li>获取子元素 <code v-pre>parentNode.childNodes</code></li>
<li>删除节点 <code v-pre>parentNode.removeChild(childNode)</code></li>
</ul>
<h4 id="childnodes-和-children-的区别" tabindex="-1"><a class="header-anchor" href="#childnodes-和-children-的区别" aria-hidden="true">#</a> childNodes 和 children 的区别?</h4>
<p><code v-pre>childNodes</code> 属性返回所有的节点，包括文本节点、注释节点；</p>
<p><code v-pre>children</code> 属性只返回元素节点；</p>
<h4 id="attribute-和-property-有何区别" tabindex="-1"><a class="header-anchor" href="#attribute-和-property-有何区别" aria-hidden="true">#</a> Attribute 和 property 有何区别?</h4>
<ul>
<li><code v-pre>attribute</code> (自定义)属性在 HTML 上设置修改， 会直接反应到 HTML 上， 两者同步。</li>
<li><code v-pre>porperty</code> (固有)属性可以看做是 DOM 对象的键值对， 用点操作符对他们进行操作。 实际编程中， 基本的 DOM 操作都是使用 <code v-pre>peoperty</code> 的点操作符。</li>
<li>对于 HTML 的标准属性来说，<code v-pre>attribute</code>和<code v-pre>property</code>是同步的，是会自动更新的</li>
<li>对于自定义的属性来说，它们是不同步的</li>
</ul>
<h4 id="offsetwidth-offsetheight-clientwidth-clientheight-与-scrollwidth-scrollheight-的区别" tabindex="-1"><a class="header-anchor" href="#offsetwidth-offsetheight-clientwidth-clientheight-与-scrollwidth-scrollheight-的区别" aria-hidden="true">#</a> offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别?</h4>
<ul>
<li><code v-pre>offsetWidth/offsetHeight</code>返回值包含<code v-pre>content</code> + <code v-pre>padding</code> + <code v-pre>border</code></li>
<li><code v-pre>clientWidth/clientHeight</code>返回值只包含<code v-pre>content</code> + <code v-pre>padding</code></li>
<li><code v-pre>scrollWidth/scrollHeight</code>返回值包含<code v-pre>content</code>+ <code v-pre>padding</code> + 溢出内容的尺寸</li>
</ul>
<h3 id="作用域和闭包" tabindex="-1"><a class="header-anchor" href="#作用域和闭包" aria-hidden="true">#</a> 作用域和闭包</h3>
<h4 id="作用域是什么" tabindex="-1"><a class="header-anchor" href="#作用域是什么" aria-hidden="true">#</a> 作用域是什么？</h4>
<p><strong>一个函数的父级作用域是在它定义的时候的作用域，而非它执行时候的作用域。</strong></p>
<p>作用域其实就是代表了一个变量合法的使用范围。如果超出了范围就会报错。</p>
<p>作用域分为局部作用域和全局作用域，处在局部作用域里面可以访问到全局作用域的变量，而在局部作用域外面就访问不到局部作用域里面所声明的变量。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/zuoyongyu.png" alt="输入图片说明"></p>
<h4 id="作用域链是什么" tabindex="-1"><a class="header-anchor" href="#作用域链是什么" aria-hidden="true">#</a> 作用域链是什么?</h4>
<p>在局部作用域访问变量 , 如果访问不到 , 自由变量会一直向父级作用域寻找，这样的链条称之为作用域链。</p>
<h4 id="自由变量是什么" tabindex="-1"><a class="header-anchor" href="#自由变量是什么" aria-hidden="true">#</a> 自由变量是什么？</h4>
<ul>
<li>一个变量在当前作用域没有定义， 但被使用了。</li>
<li>向上级作用域， 一层一层依次寻找， 直到找到为止。</li>
<li>如果到全局作用域都没找到， 则报错 <code v-pre>xx is not defined</code></li>
</ul>
<h4 id="什么是闭包呢" tabindex="-1"><a class="header-anchor" href="#什么是闭包呢" aria-hidden="true">#</a> 什么是闭包呢?</h4>
<p>闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  window<span class="token punctuation">.</span><span class="token function-variable function">B</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 JS 中，<strong>闭包存在的意义就是让我们可以间接访问函数内部的变量。</strong></p>
<p>两道考题：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">print</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无论出什么样的考题， 我们都一定要记住！</p>
<p><strong>所有的自由变量的查找， 是在函数定义的地方向上级作用域查找， 而不是在执行的地方！！！</strong></p>
<h4 id="闭包有哪些优点和缺点" tabindex="-1"><a class="header-anchor" href="#闭包有哪些优点和缺点" aria-hidden="true">#</a> 闭包有哪些优点和缺点?</h4>
<p>优点: 封装性强，使得变量始终保持在内存中。</p>
<p>缺点: 内存的消耗导致的性能问题（不用的闭包设置为<code v-pre>null</code>清除闭包）</p>
<h4 id="闭包使用场景" tabindex="-1"><a class="header-anchor" href="#闭包使用场景" aria-hidden="true">#</a> 闭包使用场景?</h4>
<p>使用场景:</p>
<ul>
<li>函数作为<strong>返回值</strong></li>
<li>函数作为<strong>参数</strong>传递</li>
</ul>
<h4 id="循环中使用闭包解决-var-定义函数的问题" tabindex="-1"><a class="header-anchor" href="#循环中使用闭包解决-var-定义函数的问题" aria-hidden="true">#</a> 循环中使用闭包解决 var 定义函数的问题?</h4>
<ul>
<li>闭包解决方案</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> j <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用 setTimeout 的第三个参数</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span>
    <span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">,</span>
    i
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>let 解决方案（推荐）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实际开发中闭包的应用有哪些" tabindex="-1"><a class="header-anchor" href="#实际开发中闭包的应用有哪些" aria-hidden="true">#</a> 实际开发中闭包的应用有哪些？</h4>
<ul>
<li>隐藏数据， 只提供 API</li>
<li>做一个简单的 cache 工具</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//闭包隐藏数据，只提供API</span>
<span class="token keyword">function</span> <span class="token function">createCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//闭包中的数据被隐藏， 不被外界访问</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> data<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token function">createCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="内存泄漏" tabindex="-1"><a class="header-anchor" href="#内存泄漏" aria-hidden="true">#</a> 内存泄漏</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/neicunxielou.png" alt="输入图片说明"></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/neicunxielou2.png" alt="输入图片说明"></p>
<h3 id="this-全解析" tabindex="-1"><a class="header-anchor" href="#this-全解析" aria-hidden="true">#</a> this 全解析</h3>
<blockquote>
<p>this 取值是在执行的时候确认的， 而不是在定义的时候。</p>
</blockquote>
<h4 id="this-有哪几种调用方式" tabindex="-1"><a class="header-anchor" href="#this-有哪几种调用方式" aria-hidden="true">#</a> this 有哪几种调用方式？</h4>
<ul>
<li>作为普通函数</li>
<li>作为 <code v-pre>call, apply, bind</code></li>
<li>作为对象方法调用</li>
<li>在 class 方法中调用</li>
<li>箭头函数</li>
</ul>
<h4 id="this-有哪些使用场景" tabindex="-1"><a class="header-anchor" href="#this-有哪些使用场景" aria-hidden="true">#</a> this 有哪些使用场景?</h4>
<ol>
<li>作为对象属性执行</li>
<li>作为构造函数执行</li>
<li>作为普通函数执行</li>
<li><code v-pre>call apply bind</code></li>
</ol>
<h4 id="this-指向如何判断" tabindex="-1"><a class="header-anchor" href="#this-指向如何判断" aria-hidden="true">#</a> this 指向如何判断?</h4>
<ul>
<li>函数直接调用指向<code v-pre>window</code></li>
<li>对象调用,<code v-pre>this</code>指向调用的对象</li>
<li><code v-pre>new</code>方式直接指向它的实例对象</li>
<li>箭头函数无<code v-pre>this</code>,取决于上下文的<code v-pre>this</code></li>
<li><code v-pre>bind</code>的<code v-pre>this</code>永远指向第一次指定的对象</li>
</ul>
<h4 id="this-优先级" tabindex="-1"><a class="header-anchor" href="#this-优先级" aria-hidden="true">#</a> this 优先级</h4>
<ol>
<li><code v-pre>new</code>优先级最高</li>
<li><code v-pre>bind</code>次之</li>
<li>然后是<code v-pre>obj.foo()</code>对象调用</li>
<li>最后是<code v-pre>foo（）</code>直接调用，同时箭头函数 <code v-pre>this</code>一旦绑定，不会再改变</li>
</ol>
<h4 id="以下代码-this-指向谁" tabindex="-1"><a class="header-anchor" href="#以下代码-this-指向谁" aria-hidden="true">#</a> 以下代码 this 指向谁？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"table"</span> onclick<span class="token operator">=</span><span class="token string">"callback()"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个调用场景适用于将函数用作独立函数调用，<code v-pre>callback</code> 中的 <code v-pre>this</code> 在非严格模式下指向 <code v-pre>windows</code>，严格模式下指向<code v-pre>undefined</code>。</p>
<p>如果想要打印当前元素,需要在调用 <code v-pre>callback(this)</code> 时添加上 <code v-pre>this</code> 参数。</p>
<h4 id="写出打印结果-并解释为什么" tabindex="-1"><a class="header-anchor" href="#写出打印结果-并解释为什么" aria-hidden="true">#</a> 写出打印结果，并解释为什么？</h4>
<ol>
<li></li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> length <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token function-variable function">method</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token string">"l"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一次打印 1， 此时 <code v-pre>this</code> 指向 <code v-pre>window</code> , <code v-pre>window.length</code> 指的是 <code v-pre>frame</code> <code v-pre>iframe</code>的窗口数量。</p>
<p>第二次打印 2， 此时 <code v-pre>this</code> 指向 <code v-pre>arguments</code> 对象。 此时 <code v-pre>arguments</code> 参数长度是 2。</p>
<ol start="2">
<li></li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"o1"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>text<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> o2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"o2"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> o1<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> o3 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"o3"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> fn <span class="token operator">=</span> o1<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o1<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o2<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o3<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答案是：o1、o1、undefined</p>
<ol start="3">
<li></li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token string">"Lucas"</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将会输出 Lucas，也就是说此时 instance 是返回的目标对象实例 this。<br />结论：如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。</p>
<h3 id="原型与原型链" tabindex="-1"><a class="header-anchor" href="#原型与原型链" aria-hidden="true">#</a> 原型与原型链</h3>
<h4 id="原型与原型链的理解-它们有什么特点" tabindex="-1"><a class="header-anchor" href="#原型与原型链的理解-它们有什么特点" aria-hidden="true">#</a> 原型与原型链的理解,它们有什么特点?</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yuanxinglian.png" alt="输入图片说明"></p>
<p><strong>原型:</strong></p>
<p>每个函数都有一个<code v-pre>prototype</code>属性, 这个属性指向的就是原型。 每一个实例对象都有一个 <code v-pre>__proto__</code> （隐式原型）,它指向的就是构造函数的原型。</p>
<p><strong>原型链:</strong></p>
<ul>
<li>当调用一个对象的属性时 , 如果自身对象未找到 , 会去对象的<code v-pre>__proto__</code>属性(隐式原型对象)里去找 。</li>
<li>然后原型本身也是一个对象 , 拥有<code v-pre>__proto__</code> 属性 , 所以会继续向上查找 。</li>
<li>一直找到<code v-pre>Object.prototype.proto===null</code>， 这样的链条称之为原型链。</li>
</ul>
<p><strong>原型链的特点:</strong></p>
<p>原型对象上的方法是被不同实例共有的 . 当我们修改原型时，与之相关的对象也会继承这一改变。</p>
<h4 id="new-的原理是什么" tabindex="-1"><a class="header-anchor" href="#new-的原理是什么" aria-hidden="true">#</a> new 的原理是什么？</h4>
<ul>
<li>新生成了一个对象</li>
<li>链接到原型</li>
<li>构造函数执行，绑定 <code v-pre>this</code></li>
<li>如果构造函数返回了一个对象，那么会取代 new 出来的结果。</li>
<li>如果构造函数没有返回对象，那么返回新生成的对象。</li>
</ul>
<p>对于对象来说，其实都是通过 <code v-pre>new</code> 产生的，无论是 <code v-pre>function Foo() 还是 let a = { b : 1 }</code></p>
<h4 id="通过-new-的方式创建对象和通过字面量创建有什么区别" tabindex="-1"><a class="header-anchor" href="#通过-new-的方式创建对象和通过字面量创建有什么区别" aria-hidden="true">#</a> 通过 new 的方式创建对象和通过字面量创建有什么区别?</h4>
<p>区别:</p>
<p>更推荐使用字面量的方式创建对象（无论性能上还是可读性）。</p>
<p>因为你使用 <code v-pre>new Object()</code> 的方式创建对象需要通过作用域链一层层找到 <code v-pre>Object</code>，但是你使用字面量的方式就没这个问题。</p>
<h3 id="面向对象" tabindex="-1"><a class="header-anchor" href="#面向对象" aria-hidden="true">#</a> 面向对象</h3>
<h4 id="面向对象编程思想" tabindex="-1"><a class="header-anchor" href="#面向对象编程思想" aria-hidden="true">#</a> 面向对象编程思想？</h4>
<p>使用<strong>对象</strong>，<strong>类</strong>，<strong>继承</strong>，<strong>封装</strong>等基本概念来进行程序设计</p>
<h4 id="什么是面向对象编程及面向过程编程" tabindex="-1"><a class="header-anchor" href="#什么是面向对象编程及面向过程编程" aria-hidden="true">#</a> 什么是面向对象编程及面向过程编程？</h4>
<ul>
<li>面向过程就是分析出解决问题的步骤，然后用函数把这些步骤一步一步实现，使用的时候依次调用。</li>
<li>面向对象是以功能来划分问题，建立对象的目的不是为了完成一个步骤，而是把步骤统一封装在对象内，对外统一提供调用接口。</li>
</ul>
<h4 id="面向对象的异同和优缺点" tabindex="-1"><a class="header-anchor" href="#面向对象的异同和优缺点" aria-hidden="true">#</a> 面向对象的异同和优缺点</h4>
<ul>
<li>优点
<ul>
<li>易维护
<ul>
<li>采用面向对象思想设计的结构，可读性高，由于继承的存在，即使改变需求，那么维护也只是在局部模块，维护非常方便。</li>
</ul>
</li>
<li>易扩展</li>
<li>复用性、继承性高.</li>
</ul>
</li>
</ul>
<h4 id="创建对象有几种方法" tabindex="-1"><a class="header-anchor" href="#创建对象有几种方法" aria-hidden="true">#</a> 创建对象有几种方法?</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//字面量</span>
<span class="token keyword">var</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"o1"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//类的实例化</span>
<span class="token keyword">var</span> o1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"o1"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//构造函数</span>
<span class="token keyword">var</span> <span class="token function-variable function">O</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> o2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">O</span><span class="token punctuation">(</span><span class="token string">"o2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Obejct.create()</span>
<span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"o3"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> o3 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="如何声明一个类" tabindex="-1"><a class="header-anchor" href="#如何声明一个类" aria-hidden="true">#</a> 如何声明一个类?</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Animal</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//实例化</span>

<span class="token comment">//ES6</span>
<span class="token keyword">class</span> <span class="token class-name">Animal2</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Animal2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//实例化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="如何实现继承-继承有哪几种方式" tabindex="-1"><a class="header-anchor" href="#如何实现继承-继承有哪几种方式" aria-hidden="true">#</a> 如何实现继承?继承有哪几种方式?</h4>
<ul>
<li>构造函数实现继承:
<ul>
<li>缺点: 无法继承父类原型对象上的属性方法</li>
</ul>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//无法继承say方法</span>
<span class="token comment">//Parent.prototype.say=function(){};</span>

<span class="token keyword">function</span> <span class="token function">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Parent</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//把父类的this指向新创建的实例</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">"child"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>原型链继承:
<ul>
<li>缺点 : 原型链上的原型对象是共用的, 原型对象某个属性发生改变， 所有的实例也会随之改变</li>
</ul>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Parent1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"parent1"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Child1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">"child1"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Child1</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Parent1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Child1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>组合继承:</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Parent1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"parent1"</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>play <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Child1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Parent1</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">"child1"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//父级的构造函数执行了两次,并把父类的constructor也继承了，浪费内存。(组合继承1)</span>
<span class="token comment">//Child1.prototype=new Parent1();</span>
<span class="token comment">//无法判断实例对象的直接构造函数是哪一个,此时constructor指向父类。(组合继承2)</span>
<span class="token comment">//Child1.prototype=Parent1.prototype;</span>
<span class="token class-name">Child1</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Parent1</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Child1</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> Child1<span class="token punctuation">;</span>
<span class="token keyword">var</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child1</span><span class="token punctuation">(</span><span class="token string">"child1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child1</span><span class="token punctuation">(</span><span class="token string">"child2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c1<span class="token punctuation">.</span>play<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c1<span class="token punctuation">.</span>play<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//[1, 2, 3, "4"]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c2<span class="token punctuation">.</span>play<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 3]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>ES6 (Class 类继承):</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"parent"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child</span><span class="token punctuation">(</span><span class="token string">"child1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child</span><span class="token punctuation">(</span><span class="token string">"child2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c1<span class="token punctuation">.</span>type<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"child"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c1<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//["parent", "child"]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c2<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//["parent"]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c1<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//child1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h3>
<h4 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Man</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">alertName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Factory</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Man</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Factory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">"yck"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">alertName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以想象一个场景。假设有一份很复杂的代码需要用户去调用，但是用户并不关心这些复杂的代码，只需要你提供给我一个接口去调用，用户只负责传递需要的参数，至于这些参数怎么使用，内部有什么逻辑是不关心的，只需要你最后返回我一个实例。这个构造过程就是工厂。</p>
<p>工厂起到的作用就是隐藏了创建实例的复杂度，只需要提供一个接口，简单清晰。</p>
<p>在 Vue 源码中，你也可以看到工厂模式的使用，比如创建异步组件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createComponent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">Ctor</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span>Component<span class="token operator">></span> <span class="token operator">|</span> Function <span class="token operator">|</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token operator">?</span>VNodeData<span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">></span><span class="token punctuation">,</span>
  tag<span class="token operator">?</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token operator">|</span> Array<span class="token operator">&lt;</span>VNode<span class="token operator">></span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// 逻辑处理...</span>

  <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue-component-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>Ctor<span class="token punctuation">.</span>cid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token operator">:</span> <span class="token string">""</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    data<span class="token punctuation">,</span>
    <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    context<span class="token punctuation">,</span>
    <span class="token punctuation">{</span> Ctor<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> listeners<span class="token punctuation">,</span> tag<span class="token punctuation">,</span> children <span class="token punctuation">}</span><span class="token punctuation">,</span>
    asyncFactory
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> vnode<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们可以看到我们只需要调用 <code v-pre>createComponent</code> 传入参数就能创建一个组件实例，但是创建这个实例是很复杂的一个过程，工厂帮助我们隐藏了这个复杂的过程，只需要一句代码调用就能实现功能。</p>
<h4 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h4>
<p>单例模式很常用，比如全局缓存、全局状态管理等等这些只需要一个对象，就可以使用单例模式。</p>
<p>单例模式的核心就是保证全局只有一个对象可以访问。因为 JS 是门无类的语言，所以别的语言实现单例的方式并不能套入 JS 中，我们只需要用一个变量确保实例只创建一次就行，以下是如何实现单例模式的例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Singleton<span class="token punctuation">.</span>getInstance <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> instance<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> s1 <span class="token operator">=</span> Singleton<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> Singleton<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s1 <span class="token operator">===</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Vuex 源码中，你也可以看到单例模式的使用，虽然它的实现方式不大一样，通过一个外部变量来控制只安装一次 Vuex</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> Vue<span class="token punctuation">;</span> <span class="token comment">// bind on install</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">_Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Vue <span class="token operator">&amp;&amp;</span> _Vue <span class="token operator">===</span> Vue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果发现 Vue 有值，就不重新创建实例了</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  Vue <span class="token operator">=</span> _Vue<span class="token punctuation">;</span>
  <span class="token function">applyMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="发布-订阅模式" tabindex="-1"><a class="header-anchor" href="#发布-订阅模式" aria-hidden="true">#</a> 发布-订阅模式</h4>
<p>发布-订阅模式也叫做观察者模式。通过一对一或者一对多的依赖关系，当对象发生改变时，订阅方都会收到通知。在现实生活中，也有很多类似场景，比如我需要在购物网站上购买一个产品，但是发现该产品目前处于缺货状态，这时候我可以点击有货通知的按钮，让网站在产品有货的时候通过短信通知我。</p>
<p>在实际代码中其实发布-订阅模式也很常见，比如我们点击一个按钮触发了点击事件就是使用了该模式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>ul id<span class="token operator">=</span><span class="token string">"ul"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
<span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">let</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#ul'</span><span class="token punctuation">)</span>
    ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Vue 中，如何实现响应式也是使用了该模式。对于需要实现响应式的对象来说，在 <code v-pre>get</code> 的时候会进行依赖收集，当改变了对象的属性时，就会触发派发更新。</p>
<h4 id="实现一个-storage" tabindex="-1"><a class="header-anchor" href="#实现一个-storage" aria-hidden="true">#</a> 实现一个 Storage</h4>
<p>实现 Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。</p>
<p>首先要记起来 getInstance 方法和 instance 这个变量是干啥的。最好能把闭包的版本也写出来！</p>
<ul>
<li>实现：静态方法版</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义Storage</span>
<span class="token keyword">class</span> <span class="token class-name">Storage</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是否已经new过1个实例</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Storage<span class="token punctuation">.</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 若这个唯一的实例不存在，那么先创建它</span>
      Storage<span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Storage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果这个唯一的实例已经存在，则直接返回</span>
    <span class="token keyword">return</span> Storage<span class="token punctuation">.</span>instance<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">getItem</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">setItem</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> storage1 <span class="token operator">=</span> Storage<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> storage2 <span class="token operator">=</span> Storage<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

storage1<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"李雷"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 李雷</span>
storage1<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 也是李雷</span>
storage2<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 返回true</span>
storage1 <span class="token operator">===</span> storage2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>实现： 闭包版</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上</span>
<span class="token keyword">function</span> <span class="token function">StorageBase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">StorageBase</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getItem</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">StorageBase</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setItem</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 以闭包的形式创建一个引用自由变量的构造函数</span>
<span class="token keyword">const</span> Storage <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断自由变量是否为null</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果为null则new出唯一实例</span>
      instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StorageBase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果</span>
<span class="token keyword">const</span> storage1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Storage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> storage2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Storage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

storage1<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"李雷"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 李雷</span>
storage1<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 也是李雷</span>
storage2<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 返回true</span>
storage1 <span class="token operator">===</span> storage2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实现一个全局的模态框" tabindex="-1"><a class="header-anchor" href="#实现一个全局的模态框" aria-hidden="true">#</a> 实现一个全局的模态框</h4>
<p>实现一个全局唯一的 Modal 弹框</p>
<p>记住 getInstance 方法、记住 instance 变量、记住闭包和静态方法</p>
<ul>
<li>ES6 版本</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>单例模式弹框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">#modal</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>open<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>打开弹框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>close<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>关闭弹框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 核心逻辑，这里采用了闭包思路来实现单例模式</span>
    <span class="token keyword">class</span> <span class="token class-name">Modal</span> <span class="token punctuation">{</span>
      <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dom <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Modal<span class="token punctuation">.</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"我是一个全局唯一的Modal"</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token string">"modal"</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"none"</span><span class="token punctuation">;</span>
          document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">.</span>showModal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">.</span>hideModal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          Modal<span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> Modal<span class="token punctuation">.</span>instance<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"block"</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"none"</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 点击打开按钮展示模态框</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理</span>
      <span class="token keyword">const</span> modal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Modal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      modal<span class="token punctuation">.</span><span class="token function">showModal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 点击关闭按钮隐藏模态框</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"close"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> modal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Modal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>modal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        modal<span class="token punctuation">.</span><span class="token function">hideModal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>ES5 版本</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>单例模式弹框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">#modal</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>open<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>打开弹框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>close<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>关闭弹框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 核心逻辑，这里采用了闭包思路来实现单例模式</span>
    <span class="token keyword">const</span> Modal <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> modal <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>modal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          modal <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          modal<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"我是一个全局唯一的Modal"</span><span class="token punctuation">;</span>
          modal<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token string">"modal"</span><span class="token punctuation">;</span>
          modal<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"none"</span><span class="token punctuation">;</span>
          document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>modal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> modal<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 点击打开按钮展示模态框</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理</span>
      <span class="token keyword">const</span> modal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Modal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      modal<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"block"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 点击关闭按钮隐藏模态框</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"close"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> modal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Modal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>modal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        modal<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"none"</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模块化" tabindex="-1"><a class="header-anchor" href="#模块化" aria-hidden="true">#</a> 模块化</h3>
<h4 id="为什么要使用模块化" tabindex="-1"><a class="header-anchor" href="#为什么要使用模块化" aria-hidden="true">#</a> 为什么要使用模块化？</h4>
<ul>
<li>解决命名冲突</li>
<li>提供复用性</li>
<li>提高代码可维护性</li>
</ul>
<p><strong>立即执行函数</strong></p>
<p>在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">globalVariable</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  globalVariable<span class="token punctuation">.</span><span class="token function-variable function">test</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// ... 声明各种变量、函数都不会污染全局作用域</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>globalVariable<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>AMD 和 CMD</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// AMD</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"./a"</span><span class="token punctuation">,</span> <span class="token string">"./b"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 加载模块完毕可以使用</span>
  a<span class="token punctuation">.</span><span class="token function">do</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  b<span class="token punctuation">.</span><span class="token function">do</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// CMD</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 加载模块</span>
  <span class="token comment">// 可以把 require 写在函数体的任意地方实现延迟加载</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./a"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  a<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>CommonJS</strong></p>
<p>CommonJS 最早是 Node 在使用，目前也仍然广泛使用，比如在 Webpack 中你就能见到它，当然目前在 Node 中的模块管理已经和 CommonJS 有一些区别了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// or</span>
exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// b.js</span>
<span class="token keyword">var</span> module <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./a.js"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// -> log 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 CommonJS 还是会使用到的，所以这里会对一些疑难点进行解析</p>
<p>先说 <code v-pre>require</code> 吧:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> module <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./a.js"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
<span class="token comment">// 这里其实就是包装了一层立即执行函数，这样就不会污染全局变量了，</span>
<span class="token comment">// 重要的是 module 这里，module 是 Node 独有的一个变量</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// module 基本实现</span>
<span class="token keyword">var</span> module <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"xxxx"</span><span class="token punctuation">,</span> <span class="token comment">// 我总得知道怎么去找到他吧</span>
  <span class="token literal-property property">exports</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// exports 就是个空对象</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 这个是为什么 exports 和 module.exports 用法相似的原因</span>
<span class="token keyword">var</span> exports <span class="token operator">=</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">load</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 导出的东西</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  module<span class="token punctuation">.</span>exports <span class="token operator">=</span> a<span class="token punctuation">;</span>
  <span class="token keyword">return</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 然后当我 require 的时候去找到独特的</span>
<span class="token comment">// id，然后将要使用的东西用立即执行函数包装下，over</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外虽然 <code v-pre>exports</code> 和 <code v-pre>module.exports</code> 用法相似，但是不能对 <code v-pre>exports</code> 直接赋值。因为 <code v-pre>var exports = module.exports</code> 这句代码表明了 <code v-pre>exports</code> 和 <code v-pre>module.exports</code> 享有相同地址，通过改变对象的属性值会对两者都起效，但是如果直接对 <code v-pre>exports</code> 赋值就会导致两者不再指向同一个内存地址，修改并不会对 <code v-pre>module.exports</code> 起效。</p>
<p><strong>ES Module</strong></p>
<p>ES Module 是原生实现的模块化方案，与 CommonJS 有以下几个区别：</p>
<ul>
<li>CommonJS 支持<strong>动态导入</strong>，也就是 <code v-pre>require(\${path}/xx.js)</code> ，后者目前不支持，但是已有提案</li>
<li>CommonJS 是<strong>同步导入</strong>，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是<strong>异步导入</strong>，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响</li>
<li>CommonJS 在导出时都是<strong>值拷贝</strong>，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个<strong>内存地址</strong>，所以导入值会跟随导出值变化</li>
<li>ES Module 会编译成 require/exports 来执行的</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 引入模块 API</span>
<span class="token keyword">import</span> <span class="token constant">XXX</span> <span class="token keyword">from</span> <span class="token string">"./a.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">XXX</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./a.js"</span><span class="token punctuation">;</span>
<span class="token comment">// 导出模块 API</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map-filter-reduce" tabindex="-1"><a class="header-anchor" href="#map-filter-reduce" aria-hidden="true">#</a> map, filter, reduce</h3>
<h4 id="map-filter-reduce-各自有什么作用" tabindex="-1"><a class="header-anchor" href="#map-filter-reduce-各自有什么作用" aria-hidden="true">#</a> map, filter, reduce 各自有什么作用？</h4>
<p><strong>map</strong></p>
<p><code v-pre>map</code> 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后放入到新的数组中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=></span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -> [2, 3, 4]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外 <code v-pre>map</code> 的回调函数接受三个参数，分别是当前索引元素，索引，原数组</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>parseInt<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>第一轮遍历 <code v-pre>parseInt('1', 0) -&gt; 1</code></li>
<li>第二轮遍历 <code v-pre>parseInt('2', 1) -&gt; NaN</code></li>
<li>第三轮遍历 <code v-pre>parseInt('3', 2) -&gt; NaN</code></li>
</ul>
<p><strong>filter</strong></p>
<p>filter 的作用也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> newArray <span class="token operator">=</span> array<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> item <span class="token operator">!==</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArray<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 4]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和 <code v-pre>map</code> 一样，<code v-pre>filter</code> 的回调函数也接受三个参数，用处也相同。</p>
<p><strong>reduce</strong></p>
<p>最后我们来讲解 <code v-pre>reduce</code> 这块的内容，同时也是最难理解的一块内容。<code v-pre>reduce</code> 可以将数组中的元素通过回调函数最终转换为一个值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> sum <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> current</span><span class="token punctuation">)</span> <span class="token operator">=></span> acc <span class="token operator">+</span> current<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 reduce 来说，它接受两个参数，分别是回调函数和初始值，接下来我们来分解上述代码中 <code v-pre>reduce</code> 的过程</p>
<ul>
<li>首先初始值为 <code v-pre>0</code>，该值会在执行第一次回调函数时作为第一个参数传入</li>
<li>回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数</li>
<li>在一次执行回调函数时，当前值和初始值相加得出结果 <code v-pre>1</code>，该结果会在第二次执行回调函数时当做第一个参数传入</li>
<li>所以在第二次执行回调函数时，相加的值就分别是 <code v-pre>1</code> 和 <code v-pre>2</code>，以此类推，循环结束后得到结果 <code v-pre>6</code></li>
</ul>
<h3 id="事件机制" tabindex="-1"><a class="header-anchor" href="#事件机制" aria-hidden="true">#</a> 事件机制</h3>
<h4 id="dom-事件级别" tabindex="-1"><a class="header-anchor" href="#dom-事件级别" aria-hidden="true">#</a> DOM 事件级别?</h4>
<ul>
<li>DOM0 （缺点:后定义的事件会被覆盖之前定义的事件）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>DOM2</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>DOM3 相较于 DOM2 增加了一些鼠标，键盘事件</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"keyup"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为什么没有 DOM1 事件呢？ 因为 DOM1 没有设计事件方面的东西。</p>
<h4 id="dom-事件模型是什么" tabindex="-1"><a class="header-anchor" href="#dom-事件模型是什么" aria-hidden="true">#</a> DOM 事件模型是什么?</h4>
<p>捕获和冒泡</p>
<h4 id="什么是事件流" tabindex="-1"><a class="header-anchor" href="#什么是事件流" aria-hidden="true">#</a> 什么是事件流?？</h4>
<p>一个完整的事件流分三个阶段：捕获 &gt; 目标元素 &gt; 冒泡</p>
<p><a name="616cac2b"></a></p>
<h4 id="事件的触发过程是怎么样的" tabindex="-1"><a class="header-anchor" href="#事件的触发过程是怎么样的" aria-hidden="true">#</a> 事件的触发过程是怎么样的？</h4>
<p>事件触发过程:</p>
<p>从<code v-pre>window</code> 捕获 &gt; <code v-pre>document</code> &gt; <code v-pre>html</code>(<code v-pre>document.documentElement</code>) &gt; <code v-pre>body</code> &gt; ... &gt; 目标元素 &gt; 然后再依次冒泡到<code v-pre>window</code></p>
<ul>
<li>window 往事件触发处传播，遇到注册的捕获事件会触发</li>
<li>传播到事件触发处时触发注册的事件</li>
<li>从事件触发处往 window 传播，遇到注册的冒泡事件会触发</li>
</ul>
<p><strong>如果给一个 body 中的子节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。</strong></p>
<h4 id="event-对象的常见应用" tabindex="-1"><a class="header-anchor" href="#event-对象的常见应用" aria-hidden="true">#</a> Event 对象的常见应用</h4>
<ol>
<li><code v-pre>event.preventDefault()</code>：阻止默认事件；</li>
<li><code v-pre>event.stopPropagation()</code>：阻止冒泡事件；(其实也可以阻止捕获)</li>
<li><code v-pre>event.stoplmmediatePropagation()</code>：事件响应优先级 阻止相同事件类型监听函数执行。如先后定义 A,B 两个点击事件， a 使用此方法后 b 事件将不再执行。</li>
<li><code v-pre>event.currentTarget</code>：当前绑定事件的元素；</li>
<li><code v-pre>event.target</code>：当前被点击的元素；</li>
</ol>
<h4 id="怎么模拟一个事件" tabindex="-1"><a class="header-anchor" href="#怎么模拟一个事件" aria-hidden="true">#</a> 怎么模拟一个事件？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建事件</span>
<span class="token keyword">let</span> myEvent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span><span class="token string">"pingan"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">detail</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"wangpingan"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加适当的事件监听器</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"pingan"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">pingan事件触发，是 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>e<span class="token punctuation">.</span>detail<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 触发。</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"leo2"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 派发事件</span>
  window<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>myEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="怎么注册事件" tabindex="-1"><a class="header-anchor" href="#怎么注册事件" aria-hidden="true">#</a> 怎么注册事件？</h4>
<p>通常我们使用 <code v-pre>addEventListener</code> 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 <code v-pre>useCapture</code> 参数来说，该参数默认值为 <code v-pre>false</code> ，<code v-pre>useCapture</code> 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性</p>
<ul>
<li><code v-pre>capture</code>：布尔值，和 <code v-pre>useCapture</code> 作用一样</li>
<li><code v-pre>once</code>：布尔值，值为 <code v-pre>true</code> 表示该回调只会调用一次，调用后会移除监听</li>
<li><code v-pre>passive</code>：布尔值，表示永远不会调用 <code v-pre>preventDefault</code></li>
</ul>
<p>一般来说，如果我们只希望事件只触发在目标上，这时候可以使用 <code v-pre>stopPropagation</code> 来阻止事件的进一步传播。通常我们认为 <code v-pre>stopPropagation</code> 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。<code v-pre>stopImmediatePropagation</code> 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。</p>
<h4 id="知道什么是事件代理吗" tabindex="-1"><a class="header-anchor" href="#知道什么是事件代理吗" aria-hidden="true">#</a> 知道什么是事件代理吗？</h4>
<p>把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是 DOM 元素的事件冒泡。</p>
<p>如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>ul id<span class="token operator">=</span><span class="token string">"ul"</span><span class="token operator">></span>
	<span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
    <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
	<span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
	<span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
	<span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
<span class="token operator">&lt;</span>script<span class="token operator">></span>
	<span class="token keyword">let</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#ul'</span><span class="token punctuation">)</span>
	ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事件代理的方式相较于直接给目标注册事件来说，有以下优点：</p>
<ul>
<li>节省内存</li>
<li>不需要给子节点注销事件</li>
<li>代码简洁</li>
</ul>
<h3 id="异步" tabindex="-1"><a class="header-anchor" href="#异步" aria-hidden="true">#</a> 异步</h3>
<h4 id="如何理解-js-单线程" tabindex="-1"><a class="header-anchor" href="#如何理解-js-单线程" aria-hidden="true">#</a> 如何理解 js 单线程?</h4>
<p>同一时间只能干一件事</p>
<h4 id="什么是任务队列" tabindex="-1"><a class="header-anchor" href="#什么是任务队列" aria-hidden="true">#</a> 什么是任务队列?</h4>
<p>有同步任务和异步任务</p>
<p><code v-pre>seTimeout</code>是异步任务 , 执行到异步任务要挂起</p>
<p>同步任务执行完再执行异步任务</p>
<h4 id="什么是同步-对比异步-举个例子" tabindex="-1"><a class="header-anchor" href="#什么是同步-对比异步-举个例子" aria-hidden="true">#</a> 什么是同步(对比异步)?举个例子?</h4>
<p>同步：浏览器向服务器请求，用户看到页面，<strong>重新发个请求</strong> , 请求完，页面刷新，新内容才出现。</p>
<p>异步：浏览器向服务器请求，用户正常操作，浏览器<strong>后端进行请求</strong>。请求完，页面不刷新，新内容也会出现。</p>
<p>同步会阻塞代码运行,异步不会</p>
<p><code v-pre>alert</code>同步,<code v-pre>seTimeout</code>异步</p>
<h4 id="什么时候需要异步" tabindex="-1"><a class="header-anchor" href="#什么时候需要异步" aria-hidden="true">#</a> 什么时候需要异步?</h4>
<p>在发生等待的情况下 , 程序仍然需要执行其他操作 , 不能阻塞程序运行</p>
<h4 id="异步使用场景有哪些" tabindex="-1"><a class="header-anchor" href="#异步使用场景有哪些" aria-hidden="true">#</a> 异步使用场景有哪些?</h4>
<ol>
<li>定时任务</li>
<li>网络请求: <code v-pre>ajax</code> , <code v-pre>img</code>加载, 脚本等文件加载和下载</li>
<li>事件绑定</li>
</ol>
<h4 id="单线程和异步" tabindex="-1"><a class="header-anchor" href="#单线程和异步" aria-hidden="true">#</a> 单线程和异步</h4>
<ul>
<li>JS 是单线程语言， 只能同时做一件事</li>
<li>JS 和 DOM 渲染共用同一个线程， 因为 JS 可修改 DOM 结构。</li>
<li>遇到等待（网络请求，定时任务）不能卡住</li>
<li>需要异步</li>
<li>回调 callback 函数形式</li>
</ul>
<h4 id="什么是执行栈" tabindex="-1"><a class="header-anchor" href="#什么是执行栈" aria-hidden="true">#</a> 什么是执行栈？</h4>
<p>可以把执行栈认为是一个存储函数调用的<strong>栈结构</strong>，遵循先进后出的原则。</p>
<p>当我们使用递归的时候，因为栈可存放的函数是有<strong>限制</strong>的，一旦存放了过多的函数且没有得到释放的话，就会出现爆栈的问题。</p>
<h4 id="解释一下什么是-event-loop" tabindex="-1"><a class="header-anchor" href="#解释一下什么是-event-loop" aria-hidden="true">#</a> 解释一下什么是 Event Loop ？</h4>
<h4 id="事件循环执行顺序" tabindex="-1"><a class="header-anchor" href="#事件循环执行顺序" aria-hidden="true">#</a> 事件循环执行顺序？</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/shijianxunhuan.png" alt="输入图片说明"></p>
<p>Event Loop 执行顺序如下所示：</p>
<ul>
<li>首先执行同步代码，这属于宏任务</li>
<li>当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行</li>
<li>执行所有微任务</li>
<li>当执行完所有微任务后，如有必要会渲染页面</li>
<li>然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数</li>
</ul>
<p>微任务包括 process.nextTick ，promise ，MutationObserver，其中 process.nextTick 为 Node 独有。<br />宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。<br />这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。</p>
<h4 id="并发-concurrency-和并行-parallelism-区别" tabindex="-1"><a class="header-anchor" href="#并发-concurrency-和并行-parallelism-区别" aria-hidden="true">#</a> 并发（concurrency）和并行（parallelism）区别？</h4>
<p>这两个名词确实是很多人都常会混淆的知识点。其实混淆的原因可能只是两个名词在中文上的相似，在英文上来说完全是不同的单词。</p>
<p>并发是宏观概念，我分别有任务 A 和任务 B，<strong>在一段时间内通过任务间的切换完成了这两个任务</strong>，这种情况就可以称之为并发。</p>
<p>并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。<strong>同时完成多个任务的情况就可以称之为并行</strong>。</p>
<h4 id="什么是回调函数" tabindex="-1"><a class="header-anchor" href="#什么是回调函数" aria-hidden="true">#</a> 什么是回调函数？</h4>
<p>回调函数是一段可执行的代码，它作为参数传给其他代码，方便需要的时候复用这段代码。</p>
<p>以下代码就是一个回调函数的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理逻辑</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是回调函数有一个致命的弱点，就是容易写出回调地狱（Callback hell）。假设多个请求存在依赖性，你可能就会写出如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理逻辑</span>
  <span class="token function">ajax</span><span class="token punctuation">(</span>url1<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理逻辑</span>
    <span class="token function">ajax</span><span class="token punctuation">(</span>url2<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 处理逻辑</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样写起来不利于阅读和维护。</p>
<h4 id="回调函数有什么优缺点" tabindex="-1"><a class="header-anchor" href="#回调函数有什么优缺点" aria-hidden="true">#</a> 回调函数有什么优缺点？</h4>
<p><strong>优点:</strong></p>
<ul>
<li>避免重复代码。</li>
</ul>
<p><strong>缺点</strong></p>
<ul>
<li>不能使用 <code v-pre>try catch</code> 捕获错误，</li>
<li>不能直接<code v-pre>return</code>。</li>
<li>容易写出回调地狱</li>
</ul>
<h5 id="回调地狱的根本问题" tabindex="-1"><a class="header-anchor" href="#回调地狱的根本问题" aria-hidden="true">#</a> 回调地狱的根本问题：</h5>
<ol>
<li>嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身</li>
<li>嵌套函数一多，就很难处理错误</li>
</ol>
<h4 id="回调的特点" tabindex="-1"><a class="header-anchor" href="#回调的特点" aria-hidden="true">#</a> 回调的特点:</h4>
<ul>
<li>不会立刻执行</li>
<li>是闭包</li>
<li><code v-pre>this</code> 指向是调用它的上下文，并不是回调函数的上下文</li>
<li>允许传递多个回调</li>
<li>可以嵌套</li>
</ul>
<h4 id="回调的应用场景" tabindex="-1"><a class="header-anchor" href="#回调的应用场景" aria-hidden="true">#</a> 回调的应用场景</h4>
<ul>
<li>异步编程。</li>
<li>事件监听。</li>
<li><code v-pre>setTimeout</code>、<code v-pre>setInterval</code> 方法。</li>
</ul>
<h4 id="如何解决回调地狱问题" tabindex="-1"><a class="header-anchor" href="#如何解决回调地狱问题" aria-hidden="true">#</a> 如何解决回调地狱问题？</h4>
<ul>
<li>Promise，</li>
<li>async/await</li>
</ul>
<h4 id="promise-是什么" tabindex="-1"><a class="header-anchor" href="#promise-是什么" aria-hidden="true">#</a> Promise 是什么?</h4>
<p>Promise 是异步编程的一种解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大。</p>
<h4 id="promise-的特点是什么" tabindex="-1"><a class="header-anchor" href="#promise-的特点是什么" aria-hidden="true">#</a> Promise 的特点是什么？</h4>
<p><code v-pre>Promise</code> 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复。</p>
<p>特点: <code v-pre>Promise</code>有三种状态,一旦执行不可更改</p>
<ol>
<li>等待中（<code v-pre>pending</code>）</li>
<li>完成了 （<code v-pre>resolved</code>）</li>
<li>拒绝了（<code v-pre>rejected</code>）</li>
</ol>
<h4 id="promise-分别有什么优缺点" tabindex="-1"><a class="header-anchor" href="#promise-分别有什么优缺点" aria-hidden="true">#</a> Promise 分别有什么优缺点？</h4>
<ul>
<li>优点: 解决回调地狱。</li>
<li>缺点: 无法取消 promise, 错误需要回调函数捕获</li>
</ul>
<h4 id="什么是-promise-链" tabindex="-1"><a class="header-anchor" href="#什么是-promise-链" aria-hidden="true">#</a> 什么是 Promise 链？</h4>
<p><code v-pre>Promise</code> 每次调用 <code v-pre>then</code> 之后返回的都是一个全新的 <code v-pre>Promise</code>，如果你在 <code v-pre>then</code> 中 使用了 <code v-pre>return</code>，那么 <code v-pre>return</code> 的值会被 <code v-pre>Promise.resolve()</code> 包装。这样就实现了链式调用。</p>
<h4 id="promise-构造函数执行和-then-函数执行有什么区别" tabindex="-1"><a class="header-anchor" href="#promise-构造函数执行和-then-函数执行有什么区别" aria-hidden="true">#</a> Promise 构造函数执行和 then 函数执行有什么区别？</h4>
<p>当我们在构造 <code v-pre>Promise</code> 的时候，构造函数内部的代码是立即执行的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"new Promise"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"finifsh"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// new Promise -> finifsh</span>
Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// => 1</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 包装成 Promise.resolve(2)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// => 2</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="async-及-await-的特点-它们的优点和缺点分别是什么" tabindex="-1"><a class="header-anchor" href="#async-及-await-的特点-它们的优点和缺点分别是什么" aria-hidden="true">#</a> async 及 await 的特点，它们的优点和缺点分别是什么？</h4>
<p><strong>特点</strong></p>
<p>一个函数如果加上 <code v-pre>async</code> ，那么该函数就会返回一个 Promise</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">"1"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -> Promise {&lt;resolved>: "1"}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>async</code> 就是将函数返回值使用 <code v-pre>Promise.resolve()</code> 包裹了下，和 <code v-pre>then</code> 中处理返回值一样，并且 <code v-pre>await</code> 只能配套 <code v-pre>async</code> 使用</p>
<p><strong>优势：</strong></p>
<p>处理 <code v-pre>then</code> 的调用链，能够更清晰准确的写出代码，不用写一大堆 <code v-pre>then</code>。</p>
<p><strong>缺点：</strong></p>
<p><code v-pre>await</code> 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 <code v-pre>await</code> 会导致性能上的降低。</p>
<h4 id="await-原理是什么" tabindex="-1"><a class="header-anchor" href="#await-原理是什么" aria-hidden="true">#</a> await 原理是什么？</h4>
<p><code v-pre>async</code> 函数是 Generator 函数的语法糖。使用 关键字 <code v-pre>async</code> 来表示，在函数内部使用 <code v-pre>await</code> 来表示异步。</p>
<p>想较于 Generator，Async 函数的改进在于下面四点：</p>
<ul>
<li>内置执行器。Generator 函数的执行必须依靠执行器，而 Aysnc 函数自带执行器，调用方式跟普通函数的调用一样</li>
<li>更好的语义。<code v-pre>async</code> 和 <code v-pre>await</code> 相较于 * 和 <code v-pre>yield</code> 更加语义化</li>
<li>更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象。而 <code v-pre>async</code> 函数的 <code v-pre>await</code> 命令后面则可以是 <code v-pre>Promise</code> 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）</li>
<li>返回值是 Promise。<code v-pre>async</code> 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 <code v-pre>then()</code> 方法进行调用</li>
</ul>
<h4 id="settimeout、setinterval、requestanimationframe-各有什么特点" tabindex="-1"><a class="header-anchor" href="#settimeout、setinterval、requestanimationframe-各有什么特点" aria-hidden="true">#</a> setTimeout、setInterval、requestAnimationFrame 各有什么特点？</h4>
<p>异步编程当然少不了定时器了，常见的定时器函数有 <code v-pre>setTimeout</code>、<code v-pre>setInterval</code>、<code v-pre>requestAnimationFrame</code>。我们先来讲讲最常用的<code v-pre>setTimeout</code>，很多人认为 <code v-pre>setTimeout</code> 是延时多久，那就应该是多久后执行。</p>
<p>其实这个观点是错误的，因为 JS 是单线程执行的，如果前面的代码影响了性能，就会导致 <code v-pre>setTimeout</code> 不会按期执行。当然了，我们可以通过代码去修正 <code v-pre>setTimeout</code>，从而使定时器相对准确</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> period <span class="token operator">=</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> startTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> end <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> period<span class="token punctuation">;</span>
<span class="token keyword">let</span> interval <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> currentInterval <span class="token operator">=</span> interval<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  count<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token comment">// 代码执行所消耗的时间</span>
  <span class="token keyword">let</span> offset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token punctuation">(</span>startTime <span class="token operator">+</span> count <span class="token operator">*</span> interval<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> diff <span class="token operator">=</span> end <span class="token operator">-</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> h <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>diff <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> hdiff <span class="token operator">=</span> diff <span class="token operator">%</span> <span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> m <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>hdiff <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> mdiff <span class="token operator">=</span> hdiff <span class="token operator">%</span> <span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> s <span class="token operator">=</span> mdiff <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> sCeil <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> sFloor <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 得到下一次循环所消耗的时间</span>
  currentInterval <span class="token operator">=</span> interval <span class="token operator">-</span> offset<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    <span class="token string">"时："</span> <span class="token operator">+</span> h<span class="token punctuation">,</span>
    <span class="token string">"分："</span> <span class="token operator">+</span> m<span class="token punctuation">,</span>
    <span class="token string">"毫秒："</span> <span class="token operator">+</span> s<span class="token punctuation">,</span>
    <span class="token string">"秒向上取整："</span> <span class="token operator">+</span> sCeil<span class="token punctuation">,</span>
    <span class="token string">"代码执行时间："</span> <span class="token operator">+</span> offset<span class="token punctuation">,</span>
    <span class="token string">"下次循环间隔"</span> <span class="token operator">+</span> currentInterval
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">setTimeout</span><span class="token punctuation">(</span>loop<span class="token punctuation">,</span> currentInterval<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span>loop<span class="token punctuation">,</span> currentInterval<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>setInterval</code>，其实这个函数作用和 <code v-pre>setTimeout</code> 基本一致，只是该函数是每隔一段时间执行一次回调函数。</p>
<p>通常来说不建议使用 setInterval。</p>
<p>第一，它和 <code v-pre>setTimeout</code> 一样，不能保证在预期的时间执行任务。</p>
<p>第二，它存在执行累积的问题.</p>
<p>如果你有循环定时器的需求，其实完全可以通过 <code v-pre>requestAnimationFrame</code> 来实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span> interval</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer<span class="token punctuation">;</span>
  <span class="token keyword">const</span> now <span class="token operator">=</span> Date<span class="token punctuation">.</span>now<span class="token punctuation">;</span>
  <span class="token keyword">let</span> startTime <span class="token operator">=</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> endTime <span class="token operator">=</span> startTime<span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">loop</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    timer <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>loop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    endTime <span class="token operator">=</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime <span class="token operator">>=</span> interval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      startTime <span class="token operator">=</span> endTime <span class="token operator">=</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">callback</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  timer <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>loop<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> timer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">timer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  a<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token function">cancelAnimationFrame</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先 <code v-pre>requestAnimationFrame</code> 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题，当然你也可以通过该函数来实现 setTimeout。</p>
<h3 id="进程与线程" tabindex="-1"><a class="header-anchor" href="#进程与线程" aria-hidden="true">#</a> 进程与线程</h3>
<h4 id="进程与线程区别-js-单线程带来的好处" tabindex="-1"><a class="header-anchor" href="#进程与线程区别-js-单线程带来的好处" aria-hidden="true">#</a> 进程与线程区别？JS 单线程带来的好处？</h4>
<p><strong>区别</strong></p>
<p>进程相当于一个程序，线程是更小的单位，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。</p>
<p>当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。</p>
<p><strong>单线程带来的好处：</strong></p>
<p>JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是互斥的。因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI。</p>
<p>得益于 JS 是单线程运行的，可以达到<strong>节省内存，节约上下文切换时间，没有锁的问题。</strong></p>
<p>当然前面两点在服务端中更容易体现，对于锁的问题，形象的来说就是当我读取一个数字 15 的时候，同时有两个操作对数字进行了加减，这时候结果就出现了错误。解决这个问题也不难，只需要在读取的时候加锁，直到读取完毕之前都不能进行写入操作。</p>
<h3 id="变量提升" tabindex="-1"><a class="header-anchor" href="#变量提升" aria-hidden="true">#</a> 变量提升</h3>
<h4 id="什么是提升" tabindex="-1"><a class="header-anchor" href="#什么是提升" aria-hidden="true">#</a> 什么是提升?</h4>
<p>js 执行时会把<code v-pre>var</code>声明，函数声明 , <code v-pre>argument</code> 提到作用域顶部。</p>
<p>函数声明优于<code v-pre>var</code>变量声明。</p>
<p>提升是为了解决函数之间相互调用的问题。</p>
<h4 id="什么是暂时性死区" tabindex="-1"><a class="header-anchor" href="#什么是暂时性死区" aria-hidden="true">#</a> 什么是暂时性死区?</h4>
<p><code v-pre>let</code>，<code v-pre>const</code>在声明前使用会报错，这个行为称之为暂时性死区。</p>
<h4 id="var-let-const-有什么区别" tabindex="-1"><a class="header-anchor" href="#var-let-const-有什么区别" aria-hidden="true">#</a> var,let,const 有什么区别?</h4>
<ol>
<li><code v-pre>let</code>，<code v-pre>const</code>声明不会挂载在<code v-pre>window</code>上。var 声明会挂载到<code v-pre>window</code>上。</li>
<li><code v-pre>let</code>，<code v-pre>const</code>不能重复声明, var 可以重复声明。</li>
<li><code v-pre>let</code>，<code v-pre>const</code>不存在变量提升, var 存在变量提升。</li>
<li><code v-pre>let</code>，<code v-pre>const</code>只在块级作用域有效。</li>
<li><code v-pre>const</code>常量一旦声明时必须赋值 , 且不能修改 。<code v-pre>let</code> <code v-pre>var</code>是变量， 可以进行修改。</li>
</ol>
<h3 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> Class</h3>
<h4 id="class-本质" tabindex="-1"><a class="header-anchor" href="#class-本质" aria-hidden="true">#</a> class 本质？</h4>
<ul>
<li>本质是函数, js 中并不存在类，<code v-pre>class</code>只是语法糖， 使用<code v-pre>prototype</code></li>
</ul>
<h4 id="class-与普通的构造函数有什么区别" tabindex="-1"><a class="header-anchor" href="#class-与普通的构造函数有什么区别" aria-hidden="true">#</a> Class 与普通的构造函数有什么区别?</h4>
<ul>
<li>在<strong>语法</strong>上更贴合面向对象的写法</li>
<li>在<strong>继承</strong>上更容易阅读理解</li>
</ul>
<h4 id="class-如何实现继承" tabindex="-1"><a class="header-anchor" href="#class-如何实现继承" aria-hidden="true">#</a> class 如何实现继承？</h4>
<p><code v-pre>class</code> 实现继承的核心在于使用 <code v-pre>extends</code> 表明继承自哪个父类。</p>
<p>子类构造函数中必须调用<code v-pre>super</code>才能传参数</p>
<h3 id="es6-常用方法" tabindex="-1"><a class="header-anchor" href="#es6-常用方法" aria-hidden="true">#</a> Es6 常用方法</h3>
<h4 id="es6-常用的方法有哪些" tabindex="-1"><a class="header-anchor" href="#es6-常用的方法有哪些" aria-hidden="true">#</a> Es6 常用的方法有哪些?</h4>
<ul>
<li>let 和 const</li>
<li>解构赋值</li>
<li>扩展运算</li>
<li>promise</li>
<li>模板字符串</li>
<li>箭头函数</li>
<li>class</li>
<li>Reflect</li>
<li>Module(模块化)</li>
<li>async/await</li>
</ul>
<h3 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h3>
<h4 id="箭头函数与普通函数有什么区别" tabindex="-1"><a class="header-anchor" href="#箭头函数与普通函数有什么区别" aria-hidden="true">#</a> 箭头函数与普通函数有什么区别?</h4>
<ol>
<li>语法更加简洁</li>
<li>不会创建自己的<code v-pre>this</code></li>
<li>call | apply | bind 无法改变箭头函数中 this 的指向</li>
<li>不存在<code v-pre>arguments</code>对象</li>
<li>没有原型属性</li>
<li>不能当作构造函数，不能用作<code v-pre>Generator</code>函数 (不能使用<code v-pre>yield</code>命令)</li>
</ol>
<h3 id="综合考察题" tabindex="-1"><a class="header-anchor" href="#综合考察题" aria-hidden="true">#</a> 综合考察题</h3>
<h4 id="为什么-0-1-0-2-0-3" tabindex="-1"><a class="header-anchor" href="#为什么-0-1-0-2-0-3" aria-hidden="true">#</a> 为什么 0.1 + 0.2 != 0.3</h4>
<p>先说原因，因为 JS 采用 **IEEE 754 双精度版本（64 位）**标准，并且只要采用 IEEE 754 的语言都有该问题。</p>
<p>JS 采用的浮点数标准却会裁剪掉我们的数字。会造成精度丢失。</p>
<p>解决方案：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0.3</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="请写出以下代码的打印顺序" tabindex="-1"><a class="header-anchor" href="#请写出以下代码的打印顺序" aria-hidden="true">#</a> 请写出以下代码的打印顺序</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
Foo<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

Foo<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2</span>

<span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//4</span>
<span class="token comment">//考察了变量提升，输出4是由于函数和var被提升到最顶部，但函数是直接把函数体全部提升，而var只是声明，未赋值。执行下来赋值时已经将函数覆盖</span>

<span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1</span>
<span class="token comment">//考察作用域：首先执行Foo()，getName由于是全局声明，重新赋值getName，Foo返回this(即window)。然后执行的就是this.getName();结果为1</span>
<span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1 同上</span>

<span class="token keyword">new</span> <span class="token class-name">Foo<span class="token punctuation">.</span>getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2</span>
<span class="token comment">//考察运算符优先级 .是19  new在.之后   先执行Foo.getName()在执行new</span>
<span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3</span>
<span class="token comment">//先计算. , .把前后分割，开始执行new Foo() , 然后找getName方法</span>
<span class="token keyword">new</span> <span class="token class-name">new</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3</span>
<span class="token comment">//先计算. , .把前后分割，new.foo()带参数优先级19，new是18，执行new Foo.getName()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h3>
</div></template>


