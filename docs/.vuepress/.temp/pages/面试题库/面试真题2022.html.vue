<template><div><h1 id="面试真题-2022" tabindex="-1"><a class="header-anchor" href="#面试真题-2022" aria-hidden="true">#</a> 面试真题 2022</h1>
<h2 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收" aria-hidden="true">#</a> 垃圾回收</h2>
<h3 id="能聊一下-js-垃圾回收机制吗" tabindex="-1"><a class="header-anchor" href="#能聊一下-js-垃圾回收机制吗" aria-hidden="true">#</a> 能聊一下 js 垃圾回收机制吗？</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token string">"aa"</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码在 fn() 执行后，'aa' 以及 {x:100} 这两个数据将全部回收。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  window<span class="token punctuation">.</span>obj <span class="token operator">=</span> obj<span class="token punctuation">;</span> <span class="token comment">// 垃圾？？ 符合用户预期就不能算是垃圾</span>
<span class="token punctuation">}</span>
<span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码 f2() 执行后， {x:100} 不会被回收， 因为 window 对其还有引用。</p>
<h2 id="js-垃圾回收算法是什么" tabindex="-1"><a class="header-anchor" href="#js-垃圾回收算法是什么" aria-hidden="true">#</a> JS 垃圾回收算法是什么？</h2>
<p>JS 垃圾回收其实就是回收那些函数已经执行完成再也用不到的对象和数据。</p>
<h3 id="引用计数-之前" tabindex="-1"><a class="header-anchor" href="#引用计数-之前" aria-hidden="true">#</a> 引用计数（之前）</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//{ x: 100 } 引用计数+1</span>
<span class="token keyword">let</span> a1 <span class="token operator">=</span> a<span class="token punctuation">;</span> <span class="token comment">//{ x: 100 } 引用计数+1</span>
a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">//{ x: 100 } 引用计数-1</span>
a1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">//{ x: 100 } 引用计数-1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过上面代码执行， { x: 100 } 引用计数变成了 0， 此时就会被清除。</p>
<p>但是引用计数会有一个缺陷，就是循环引用的问题，如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  obj1<span class="token punctuation">.</span>a <span class="token operator">=</span> obj2<span class="token punctuation">;</span>
  obj2<span class="token punctuation">.</span>a <span class="token operator">=</span> obj1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">fn3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时 fn3 执行完， 无法清除数据。</p>
<p>在 IE6-7 有一个经典的内存泄漏 bug，如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// IE6-7 内存泄漏的 bug</span>
<span class="token keyword">var</span> div1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"div1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div1<span class="token punctuation">.</span>a <span class="token operator">=</span> div1<span class="token punctuation">;</span>
div1<span class="token punctuation">.</span>someBigData <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//存储了一个很大的数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内存泄漏指的是非预期的内存无法进行垃圾回收，在预期内的垃圾回收（如闭包，window 挂载）不算内存泄漏。</p>
<h3 id="标记清除-现代" tabindex="-1"><a class="header-anchor" href="#标记清除-现代" aria-hidden="true">#</a> 标记清除（现代）</h3>
<p>标记清除从 JS 根 window 去深度遍历各个属性，遍历完之后，看看能不能得到某个对象。如果得到那就保留，如果得不到，那就删除。</p>
<h2 id="内存泄漏的场景有哪些-vue-为例" tabindex="-1"><a class="header-anchor" href="#内存泄漏的场景有哪些-vue-为例" aria-hidden="true">#</a> 内存泄漏的场景有哪些？（Vue 为例）</h2>
<ul>
<li>全局变量（挂载到 window），函数引用</li>
<li>全局事件，定时器</li>
<li>自定义事件</li>
</ul>
<h2 id="数据结构-算法" tabindex="-1"><a class="header-anchor" href="#数据结构-算法" aria-hidden="true">#</a> 数据结构/算法</h2>
<h3 id="二分查找" tabindex="-1"><a class="header-anchor" href="#二分查找" aria-hidden="true">#</a> 二分查找</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 二分查找（循环）
 * <span class="token keyword">@param</span> <span class="token parameter">arr</span> arr
 * <span class="token keyword">@param</span> <span class="token parameter">target</span> target
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">binarySearch1</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">arr</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">target</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">{</span>
  <span class="token keyword">const</span> length <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> startIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 开始位置</span>
  <span class="token keyword">let</span> endIndex <span class="token operator">=</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 结束位置</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>startIndex <span class="token operator">&lt;=</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> midIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>startIndex <span class="token operator">+</span> endIndex<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> midValue <span class="token operator">=</span> arr<span class="token punctuation">[</span>midIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> midValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 目标值较小，则继续在左侧查找</span>
      endIndex <span class="token operator">=</span> midIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">></span> midValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 目标值较大，则继续在右侧查找</span>
      startIndex <span class="token operator">=</span> midIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 相等，返回</span>
      <span class="token keyword">return</span> midIndex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 二分查找（递归）
 * <span class="token keyword">@param</span> <span class="token parameter">arr</span> arr
 * <span class="token keyword">@param</span> <span class="token parameter">target</span> target
 * <span class="token keyword">@param</span> <span class="token parameter">startIndex</span> start index
 * <span class="token keyword">@param</span> <span class="token parameter">endIndex</span> end index
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">binarySearch2</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">arr</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  startIndex<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  endIndex<span class="token operator">?</span><span class="token operator">:</span> number</span>
<span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">{</span>
  <span class="token keyword">const</span> length <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token comment">// 开始和结束的范围</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>startIndex <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> startIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>endIndex <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> endIndex <span class="token operator">=</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token comment">// 如果 start 和 end 相遇，则结束</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>startIndex <span class="token operator">></span> endIndex<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token comment">// 中间位置</span>
  <span class="token keyword">const</span> midIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>startIndex <span class="token operator">+</span> endIndex<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> midValue <span class="token operator">=</span> arr<span class="token punctuation">[</span>midIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> midValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 目标值较小，则继续在左侧查找</span>
    <span class="token keyword">return</span> <span class="token function">binarySearch2</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> target<span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> midIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">></span> midValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 目标值较大，则继续在右侧查找</span>
    <span class="token keyword">return</span> <span class="token function">binarySearch2</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> target<span class="token punctuation">,</span> midIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> endIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 相等，返回</span>
    <span class="token keyword">return</span> midIndex<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// // // 功能测试</span>
<span class="token comment">// const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]</span>
<span class="token comment">// const target = 40</span>
<span class="token comment">// // console.info(binarySearch2(arr, target))</span>

<span class="token comment">// // 性能测试</span>
<span class="token comment">// console.time('binarySearch1')</span>
<span class="token comment">// for (let i = 0; i &lt; 100 * 10000; i++) {</span>
<span class="token comment">//     binarySearch1(arr, target)</span>
<span class="token comment">// }</span>
<span class="token comment">// console.timeEnd('binarySearch1') // 17ms</span>
<span class="token comment">// console.time('binarySearch2')</span>
<span class="token comment">// for (let i = 0; i &lt; 100 * 10000; i++) {</span>
<span class="token comment">//     binarySearch2(arr, target)</span>
<span class="token comment">// }</span>
<span class="token comment">// console.timeEnd('binarySearch2') // 34ms</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取字符串中连续最多的字符以及次数" tabindex="-1"><a class="header-anchor" href="#获取字符串中连续最多的字符以及次数" aria-hidden="true">#</a> 获取字符串中连续最多的字符以及次数</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">interface</span> <span class="token class-name">IRes</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">char</span><span class="token operator">:</span> string
    <span class="token literal-property property">length</span><span class="token operator">:</span> number
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 求连续最多的字符和次数（嵌套循环）
 * <span class="token keyword">@param</span> <span class="token parameter">str</span> str
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">findContinuousChar1</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">str</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span><span class="token operator">:</span> IRes <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">res</span><span class="token operator">:</span> IRes <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">char</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> length <span class="token operator">=</span> str<span class="token punctuation">.</span>length
    <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> res

    <span class="token keyword">let</span> tempLength <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 临时记录当前连续字符的长度</span>

    <span class="token comment">// O(n)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        tempLength <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 重置</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> str<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                tempLength<span class="token operator">++</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!==</span> str<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">||</span> j <span class="token operator">===</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 不相等，或者已经到了最后一个元素。要去判断最大值</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>tempLength <span class="token operator">></span> res<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    res<span class="token punctuation">.</span>char <span class="token operator">=</span> str<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
                    res<span class="token punctuation">.</span>length <span class="token operator">=</span> tempLength
                <span class="token punctuation">}</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    i <span class="token operator">=</span> j <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// 跳步</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">break</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> res
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 求连续最多的字符和次数（双指针）
 * <span class="token keyword">@param</span> <span class="token parameter">str</span> str
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">findContinuousChar2</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">str</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span><span class="token operator">:</span> IRes <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">res</span><span class="token operator">:</span> IRes <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">char</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> length <span class="token operator">=</span> str<span class="token punctuation">.</span>length
    <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> res

    <span class="token keyword">let</span> tempLength <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 临时记录当前连续字符的长度</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token comment">// O(n)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> str<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            tempLength<span class="token operator">++</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!==</span> str<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">||</span> i <span class="token operator">===</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 不相等，或者 i 到了字符串的末尾</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tempLength <span class="token operator">></span> res<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">.</span>char <span class="token operator">=</span> str<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
                res<span class="token punctuation">.</span>length <span class="token operator">=</span> tempLength
            <span class="token punctuation">}</span>
            tempLength <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// reset</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                j <span class="token operator">=</span> i <span class="token comment">// 让 j “追上” i</span>
                i<span class="token operator">--</span> <span class="token comment">// 细节</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> res
 <span class="token punctuation">}</span>

<span class="token comment">// // 功能测试</span>
<span class="token comment">// const str = 'aabbcccddeeee11223'</span>
<span class="token comment">// console.info(findContinuousChar2(str))</span>

<span class="token comment">// let str = ''</span>
<span class="token comment">// for (let i = 0; i &lt; 100 * 10000; i++) {</span>
<span class="token comment">//     str += i.toString()</span>
<span class="token comment">// }</span>

<span class="token comment">// console.time('findContinuousChar1')</span>
<span class="token comment">// findContinuousChar1(str)</span>
<span class="token comment">// console.timeEnd('findContinuousChar1') // 219ms</span>

<span class="token comment">// console.time('findContinuousChar2')</span>
<span class="token comment">// findContinuousChar2(str)</span>
<span class="token comment">// console.timeEnd('findContinuousChar2') // 228ms</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="快速排序" tabindex="-1"><a class="header-anchor" href="#快速排序" aria-hidden="true">#</a> 快速排序</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 快速排序（使用 splice）
 * <span class="token keyword">@param</span> <span class="token parameter">arr</span> number arr
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">quickSort1</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">arr</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> length <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> arr<span class="token punctuation">;</span>

  <span class="token keyword">const</span> midIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> midValue <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>midIndex<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token literal-property property">left</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token literal-property property">right</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token comment">// 注意：这里不用直接用 length ，而是用 arr.length 。因为 arr 已经被 splice 给修改了</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> midValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 小于 midValue ，则放在 left</span>
      left<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 大于 midValue ，则放在 right</span>
      right<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">quickSort1</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span>midValue<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token function">quickSort1</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 快速排序（使用 slice）
 * <span class="token keyword">@param</span> <span class="token parameter">arr</span> number arr
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">quickSort2</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">arr</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> length <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> arr<span class="token punctuation">;</span>

  <span class="token keyword">const</span> midIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> midValue <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>midIndex<span class="token punctuation">,</span> midIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token literal-property property">left</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token literal-property property">right</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!==</span> midIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> n <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> midValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 小于 midValue ，则放在 left</span>
        left<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 大于 midValue ，则放在 right</span>
        right<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">quickSort2</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span>midValue<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token function">quickSort2</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// // 功能测试</span>
<span class="token comment">// const arr1 = [1, 6, 2, 7, 3, 8, 4, 9, 5]</span>
<span class="token comment">// console.info(quickSort2(arr1))</span>

<span class="token comment">// // 性能测试</span>
<span class="token comment">// const arr1 = []</span>
<span class="token comment">// for (let i = 0; i &lt; 10 * 10000; i++) {</span>
<span class="token comment">//     arr1.push(Math.floor(Math.random() * 1000))</span>
<span class="token comment">// }</span>
<span class="token comment">// console.time('quickSort1')</span>
<span class="token comment">// quickSort1(arr1)</span>
<span class="token comment">// console.timeEnd('quickSort1') // 74ms</span>

<span class="token comment">// const arr2 = []</span>
<span class="token comment">// for (let i = 0; i &lt; 10 * 10000; i++) {</span>
<span class="token comment">//     arr2.push(Math.floor(Math.random() * 1000))</span>
<span class="token comment">// }</span>
<span class="token comment">// console.time('quickSort2')</span>
<span class="token comment">// quickSort2(arr2)</span>
<span class="token comment">// console.timeEnd('quickSort2') // 82ms</span>

<span class="token comment">// // 单独比较 splice 和 slice</span>
<span class="token comment">// const arr1 = []</span>
<span class="token comment">// for (let i = 0; i &lt; 10 * 10000; i++) {</span>
<span class="token comment">//     arr1.push(Math.floor(Math.random() * 1000))</span>
<span class="token comment">// }</span>
<span class="token comment">// console.time('splice')</span>
<span class="token comment">// arr1.splice(5 * 10000, 1)</span>
<span class="token comment">// console.timeEnd('splice')</span>
<span class="token comment">// const arr2 = []</span>
<span class="token comment">// for (let i = 0; i &lt; 10 * 10000; i++) {</span>
<span class="token comment">//     arr2.push(Math.floor(Math.random() * 1000))</span>
<span class="token comment">// }</span>
<span class="token comment">// console.time('slice')</span>
<span class="token comment">// arr2.slice(5 * 10000, 5 * 10000 + 1)</span>
<span class="token comment">// console.timeEnd('slice')</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="千分位格式化" tabindex="-1"><a class="header-anchor" href="#千分位格式化" aria-hidden="true">#</a> 千分位格式化</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 千分位格式化（使用数组）
 * <span class="token keyword">@param</span> <span class="token parameter">n</span> number
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">format1</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">n</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  n <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 只考虑整数</span>

  <span class="token keyword">const</span> s <span class="token operator">=</span> n<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> arr <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> val<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">%</span> <span class="token number">3</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>prev<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> val <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> prev<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> val <span class="token operator">+</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 数字千分位格式化（字符串分析）
 * <span class="token keyword">@param</span> <span class="token parameter">n</span> number
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">format2</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">n</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  n <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 只考虑整数</span>

  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> s <span class="token operator">=</span> n<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> length <span class="token operator">=</span> s<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> j <span class="token operator">=</span> length <span class="token operator">-</span> i<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">%</span> <span class="token number">3</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        res <span class="token operator">=</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> res<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        res <span class="token operator">=</span> <span class="token string">","</span> <span class="token operator">+</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> res<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      res <span class="token operator">=</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// // 功能测试</span>
<span class="token comment">// const n = 10201004050</span>
<span class="token comment">// console.info('format1', format1(n))</span>
<span class="token comment">// console.info('format2', format2(n))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue" tabindex="-1"><a class="header-anchor" href="#vue" aria-hidden="true">#</a> Vue</h2>
<h3 id="你在使用-vue-过程中遇到过哪些坑" tabindex="-1"><a class="header-anchor" href="#你在使用-vue-过程中遇到过哪些坑" aria-hidden="true">#</a> 你在使用 Vue 过程中遇到过哪些坑？</h3>
<p>举例鑫诚热能 会员积分进度条， 直接渲染就是最终的进度，无法出现进度条增加的过渡动画。
使用到了 nexttick/setTimeout , 在 DOM 渲染完成后再设置最终的进度，此时就会出现过渡动画。
可以讲一些源码相关的内容，比如 vue 设置属性并不是每次都触发更新， 而是将这一次所有修改的 watcher 收集， 并在下次事件循环中使用 Promise.then() 进行更新。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">processRate</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
				<span class="token literal-property property">processLine</span><span class="token operator">:</span> <span class="token punctuation">{</span>
					<span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token string">'0%'</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
				<span class="token keyword">const</span> processRate <span class="token operator">=</span> <span class="token number">66</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>processRate <span class="token operator">=</span> processRate
				<span class="token keyword">this</span><span class="token punctuation">.</span>processLine<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>processRate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%</span><span class="token template-punctuation string">`</span></span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue2-和-vue3-和-react-三者的-diff-算法有什么区别" tabindex="-1"><a class="header-anchor" href="#vue2-和-vue3-和-react-三者的-diff-算法有什么区别" aria-hidden="true">#</a> Vue2 和 Vue3 和 React 三者的 diff 算法有什么区别？</h3>
<ul>
<li>React diff （仅右移）</li>
<li>Vue2 双端比较</li>
<li>Vue3 最长递增子序列</li>
</ul>
<h3 id="如何统一监听-vue-组件报错" tabindex="-1"><a class="header-anchor" href="#如何统一监听-vue-组件报错" aria-hidden="true">#</a> 如何统一监听 Vue 组件报错？</h3>
<h4 id="window-onerror" tabindex="-1"><a class="header-anchor" href="#window-onerror" aria-hidden="true">#</a> window.onerror</h4>
<ul>
<li>全局监听所有 JS 错误</li>
<li>是 JS 级别的， 识别不了 Vue 组件信息</li>
<li>捕捉一些 Vue 监听不到的错误</li>
</ul>
<h4 id="errorcaptured" tabindex="-1"><a class="header-anchor" href="#errorcaptured" aria-hidden="true">#</a> errorCaptured</h4>
<ul>
<li>监听所有 <strong>下级</strong> 组件错误</li>
<li>返回 false 会阻止向上传播</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"nav"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">"/"</span><span class="token operator">></span>Home<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">></span> <span class="token operator">|</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">"/about"</span><span class="token operator">></span>About<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token operator">&lt;</span>router<span class="token operator">-</span>view<span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> source<span class="token punctuation">,</span> line<span class="token punctuation">,</span> column<span class="token punctuation">,</span> error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">'window.onerror----'</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span> source<span class="token punctuation">,</span> line<span class="token punctuation">,</span> column<span class="token punctuation">,</span> error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// window.addEventListener('error', event => {</span>
    <span class="token comment">//   console.info('window error', event)</span>
    <span class="token comment">// })</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">errorCaptured</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">'errorCaptured----'</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> info<span class="token punctuation">)</span>
    <span class="token comment">// return false</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="errorhandler" tabindex="-1"><a class="header-anchor" href="#errorhandler" aria-hidden="true">#</a> errorHandler</h4>
<ul>
<li>Vue 全局错误监听，所有组件错误都会汇总到这里</li>
<li>但 errorCaptured 返回 false， 不会传播到这里</li>
<li>如果 errorHandler 监听到错误， 则不会再向 window.error 传递， 两者互斥</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App.vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">"./router"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span>config<span class="token punctuation">.</span><span class="token function-variable function">errorHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"errorHandler----"</span><span class="token punctuation">,</span> error<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">"#app"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="异步错误" tabindex="-1"><a class="header-anchor" href="#异步错误" aria-hidden="true">#</a> 异步错误</h4>
<ul>
<li>异步错误里的回调，errorHandler 监听不到</li>
<li>需要使用 window.onerror</li>
</ul>
<h4 id="答案" tabindex="-1"><a class="header-anchor" href="#答案" aria-hidden="true">#</a> 答案</h4>
<ul>
<li>errorCaptured 监听下级组件错误，返回 false 阻止向上传播，监听一些重要、有风险组件的错误</li>
<li>errorHandler 监听全局 Vue 组件的错误，与 window.onerror 互斥（候补监听）</li>
<li>window.onerror 监听其它 JS 错误， 如 异步（候补监听）</li>
</ul>
<h2 id="prefetch-和-dns-prefetch-分别是什么" tabindex="-1"><a class="header-anchor" href="#prefetch-和-dns-prefetch-分别是什么" aria-hidden="true">#</a> prefetch 和 dns-prefetch 分别是什么</h2>
<h3 id="prefetch" tabindex="-1"><a class="header-anchor" href="#prefetch" aria-hidden="true">#</a> prefetch</h3>
<p>preload 资源在当前页面使用， 会<strong>优先</strong>加载
prefetch 资源在未来页面使用，<strong>空闲时</strong>加载</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/prefetch.png" alt="输入图片说明"></p>
<h3 id="dns-prefetch-和-preconnect" tabindex="-1"><a class="header-anchor" href="#dns-prefetch-和-preconnect" aria-hidden="true">#</a> dns-prefetch 和 preconnect</h3>
<p>dns-prefetch 即 DNS 预查询
preconnect 即 DNS 预连接</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/preload.png" alt="输入图片说明"></p>
<h3 id="答案-1" tabindex="-1"><a class="header-anchor" href="#答案-1" aria-hidden="true">#</a> 答案</h3>
<ul>
<li>prefetch 是资源预获取（和 preload 相关)</li>
<li>dns-prefetch 是 DNS 预查询(和 preconnect 相关)</li>
</ul>
<h2 id="手写-js-深拷贝" tabindex="-1"><a class="header-anchor" href="#手写-js-深拷贝" aria-hidden="true">#</a> 手写 JS 深拷贝</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 深拷贝
 * <span class="token keyword">@param</span> <span class="token parameter">obj</span> obj
 * <span class="token keyword">@param</span> <span class="token parameter">map</span> weakmap 为了避免循环引用
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> any<span class="token punctuation">,</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">"object"</span> <span class="token operator">||</span> obj <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> obj<span class="token punctuation">;</span>

  <span class="token comment">// 避免循环引用</span>
  <span class="token keyword">const</span> objFromMap <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>objFromMap<span class="token punctuation">)</span> <span class="token keyword">return</span> objFromMap<span class="token punctuation">;</span>

  <span class="token keyword">let</span> <span class="token literal-property property">target</span><span class="token operator">:</span> any <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Map</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Map</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> v1 <span class="token operator">=</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> k1 <span class="token operator">=</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
      target<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>k1<span class="token punctuation">,</span> v1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Set</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Set</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> v1 <span class="token operator">=</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
      target<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>v1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Array</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Array</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Object</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> val <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> val1 <span class="token operator">=</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
    target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> target<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// // 功能测试</span>
<span class="token comment">// const a: any = {</span>
<span class="token comment">//     set: new Set([10, 20, 30]),</span>
<span class="token comment">//     map: new Map([['x', 10], ['y', 20]]),</span>
<span class="token comment">//     info: {</span>
<span class="token comment">//         city: '北京'</span>
<span class="token comment">//     },</span>
<span class="token comment">//     fn: () => { console.info(100) }</span>
<span class="token comment">// }</span>
<span class="token comment">// a.self = a</span>
<span class="token comment">// console.log( cloneDeep(a) )</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


