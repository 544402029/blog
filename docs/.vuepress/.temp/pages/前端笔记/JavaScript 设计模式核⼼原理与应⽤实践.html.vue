<template><div><h1 id="javascript-设计模式核心原理与应用实践" tabindex="-1"><a class="header-anchor" href="#javascript-设计模式核心原理与应用实践" aria-hidden="true">#</a> JavaScript 设计模式核⼼原理与应⽤实践</h1>
<h2 id="设计原则" tabindex="-1"><a class="header-anchor" href="#设计原则" aria-hidden="true">#</a> 设计原则</h2>
<p>SOLID</p>
<ul>
<li>单一功能原则（Single Responsibility Principle）</li>
<li>开放封闭原则（Opened Closed Principle）</li>
<li>里式替换原则（Liskov Substitution Principle）</li>
<li>接口隔离原则（Interface Segregation Principle）</li>
<li>依赖反转原则（Dependency Inversion Principle）</li>
</ul>
<h3 id="核心思想——封装变化" tabindex="-1"><a class="header-anchor" href="#核心思想——封装变化" aria-hidden="true">#</a> 核心思想——封装变化</h3>
<p>设计模式出现的背景，是软件设计的复杂度日益飙升。软件设计越来越复杂的“罪魁祸首”，就是<strong>变化</strong>。</p>
<p>但在实际开发中，不发生变化的代码可以说是不存在的。我们能做的只有将这个变化造成的影响<strong>最小化</strong> —— <strong>将变与不变分离，确保变化的部分灵活、不变的部分稳定</strong>。
这个过程，就叫“封装变化”；这样的代码，就是我们所谓的“健壮”的代码，它可以经得起变化的考验。而设计模式出现的意义，就是帮我们写出这样的代码。</p>
<h3 id="设计模式的术" tabindex="-1"><a class="header-anchor" href="#设计模式的术" aria-hidden="true">#</a> 设计模式的术</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805093228638.png" alt="image-20220805093228638"></p>
<p>设计模式的核心思想，就是“封装变化”。确实如此，无论是创建型、结构型还是行为型，这些具体的设计模式都是在用自己的方式去封装不同类型的变化 —— 创建型模式封装了创建对象过程中的变化，比如下节的工厂模式，它做的事情就是将创建对象的过程抽离；结构型模式封装的是对象之间组合方式的变化，目的在于灵活地表达对象间的配合与依赖关系；而行为型模式则将是对象千变万化的行为进行抽离，确保我们能够更安全、更方便地对行为进行更改。
封装变化，封装的正是软件中那些不稳定的要素，它是一种防患于未然的行为 —— 提前抽离了变化，就为后续的拓展提供了无限的可能性，如此，我们才能做到在变化到来的时候从容不迫。</p>
<h2 id="工厂模式-创建型" tabindex="-1"><a class="header-anchor" href="#工厂模式-创建型" aria-hidden="true">#</a> 工厂模式（创建型）</h2>
<h2 id="工厂模式·简单工厂" tabindex="-1"><a class="header-anchor" href="#工厂模式·简单工厂" aria-hidden="true">#</a> 工厂模式·简单工厂</h2>
<p>区分“变与不变”</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">name <span class="token punctuation">,</span> age<span class="token punctuation">,</span> career<span class="token punctuation">,</span> work</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
    <span class="token keyword">this</span><span class="token punctuation">.</span>career <span class="token operator">=</span> career
    <span class="token keyword">this</span><span class="token punctuation">.</span>work <span class="token operator">=</span> work
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Factory</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> career</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> work
    <span class="token keyword">switch</span><span class="token punctuation">(</span>career<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'coder'</span><span class="token operator">:</span>
            work <span class="token operator">=</span>  <span class="token punctuation">[</span><span class="token string">'写代码'</span><span class="token punctuation">,</span><span class="token string">'写系分'</span><span class="token punctuation">,</span> <span class="token string">'修Bug'</span><span class="token punctuation">]</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> <span class="token string">'product manager'</span><span class="token operator">:</span>
            work <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'订会议室'</span><span class="token punctuation">,</span> <span class="token string">'写PRD'</span><span class="token punctuation">,</span> <span class="token string">'催更'</span><span class="token punctuation">]</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> <span class="token string">'boss'</span><span class="token operator">:</span>
            work <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'喝茶'</span><span class="token punctuation">,</span> <span class="token string">'看报'</span><span class="token punctuation">,</span> <span class="token string">'见客户'</span><span class="token punctuation">]</span>
        <span class="token keyword">case</span> <span class="token string">'xxx'</span><span class="token operator">:</span>
            <span class="token comment">// 其它工种的职责分配</span>
            <span class="token operator">...</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> career<span class="token punctuation">,</span> work<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工厂模式·抽象工厂" tabindex="-1"><a class="header-anchor" href="#工厂模式·抽象工厂" aria-hidden="true">#</a> 工厂模式·抽象工厂</h2>
<p>理解“开放封闭”</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MobilePhoneFactory</span> <span class="token punctuation">{</span>
  <span class="token comment">// 提供操作系统的接口</span>
  <span class="token function">createOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"抽象工厂方法不允许直接调用，你需要将我重写！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 提供硬件的接口</span>
  <span class="token function">createHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"抽象工厂方法不允许直接调用，你需要将我重写！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体工厂继承自抽象工厂</span>
<span class="token keyword">class</span> <span class="token class-name">FakeStarFactory</span> <span class="token keyword">extends</span> <span class="token class-name">MobilePhoneFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 提供安卓系统实例</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AndroidOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">createHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 提供高通硬件实例</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">QualcommHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义操作系统这类产品的抽象产品类</span>
<span class="token keyword">class</span> <span class="token class-name">OS</span> <span class="token punctuation">{</span>
  <span class="token function">controlHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"抽象产品方法不允许直接调用，你需要将我重写！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体操作系统的具体产品类</span>
<span class="token keyword">class</span> <span class="token class-name">AndroidOS</span> <span class="token keyword">extends</span> <span class="token class-name">OS</span> <span class="token punctuation">{</span>
  <span class="token function">controlHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我会用安卓的方式去操作硬件"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">AppleOS</span> <span class="token keyword">extends</span> <span class="token class-name">OS</span> <span class="token punctuation">{</span>
  <span class="token function">controlHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我会用🍎的方式去操作硬件"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义手机硬件这类产品的抽象产品类</span>
<span class="token keyword">class</span> <span class="token class-name">HardWare</span> <span class="token punctuation">{</span>
  <span class="token comment">// 手机硬件的共性方法，这里提取了“根据命令运转”这个共性</span>
  <span class="token function">operateByOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"抽象产品方法不允许直接调用，你需要将我重写！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体硬件的具体产品类</span>
<span class="token keyword">class</span> <span class="token class-name">QualcommHardWare</span> <span class="token keyword">extends</span> <span class="token class-name">HardWare</span> <span class="token punctuation">{</span>
  <span class="token function">operateByOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我会用高通的方式去运转"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MiWare</span> <span class="token keyword">extends</span> <span class="token class-name">HardWare</span> <span class="token punctuation">{</span>
  <span class="token function">operateByOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我会用小米的方式去运转"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 这是我的手机</span>
<span class="token keyword">const</span> myPhone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FakeStarFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 让它拥有操作系统</span>
<span class="token keyword">const</span> myOS <span class="token operator">=</span> myPhone<span class="token punctuation">.</span><span class="token function">createOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 让它拥有硬件</span>
<span class="token keyword">const</span> myHardWare <span class="token operator">=</span> myPhone<span class="token punctuation">.</span><span class="token function">createHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)</span>
myOS<span class="token punctuation">.</span><span class="token function">controlHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 唤醒硬件(输出‘我会用高通的方式去运转’)</span>
myHardWare<span class="token punctuation">.</span><span class="token function">operateByOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假如有一天，FakeStar 过气了，我们需要产出一款新机投入市场，这时候怎么办？我们是不是<strong>不需要对抽象工厂 MobilePhoneFactory 做任何修改</strong>，只需要拓展它的种类：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">newStarFactory</span> <span class="token keyword">extends</span> <span class="token class-name">MobilePhoneFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 操作系统实现代码</span>
  <span class="token punctuation">}</span>
  <span class="token function">createHardWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 硬件实现代码</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="单例模式-创建型" tabindex="-1"><a class="header-anchor" href="#单例模式-创建型" aria-hidden="true">#</a> 单例模式（创建型）</h1>
<p>Vuex 的数据管理哲学</p>
<p><strong>保证一个类仅有一个实例，并提供一个访问它的全局访问点</strong>，这样的模式就叫做单例模式。</p>
<h2 id="es6-版" tabindex="-1"><a class="header-anchor" href="#es6-版" aria-hidden="true">#</a> ES6 版</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">SingleDog</span> <span class="token punctuation">{</span>
  <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是一个单例对象"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是否已经new过1个实例</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>SingleDog<span class="token punctuation">.</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 若这个唯一的实例不存在，那么先创建它</span>
      SingleDog<span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SingleDog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果这个唯一的实例已经存在，则直接返回</span>
    <span class="token keyword">return</span> SingleDog<span class="token punctuation">.</span>instance<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> s1 <span class="token operator">=</span> SingleDog<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> s2 <span class="token operator">=</span> SingleDog<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// true</span>
s1 <span class="token operator">===</span> s2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="闭包版" tabindex="-1"><a class="header-anchor" href="#闭包版" aria-hidden="true">#</a> 闭包版</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">SingleDog</span> <span class="token punctuation">{</span>
  <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是一个单例对象"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是否已经new过1个实例</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>SingleDog<span class="token punctuation">.</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 若这个唯一的实例不存在，那么先创建它</span>
      SingleDog<span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SingleDog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果这个唯一的实例已经存在，则直接返回</span>
    <span class="token keyword">return</span> SingleDog<span class="token punctuation">.</span>instance<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> s1 <span class="token operator">=</span> SingleDog<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> s2 <span class="token operator">=</span> SingleDog<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// true</span>
s1 <span class="token operator">===</span> s2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vuex-如何确保-store-的唯一性" tabindex="-1"><a class="header-anchor" href="#vuex-如何确保-store-的唯一性" aria-hidden="true">#</a> Vuex 如何确保 Store 的唯一性</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 安装vuex插件</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将store注入到Vue实例中</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">"#app"</span><span class="token punctuation">,</span>
  store<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过调用 Vue.use()方法，我们安装了 Vuex 插件。Vuex 插件是一个对象，它在内部实现了一个 install 方法，这个方法会在插件安装时被调用，从而把 Store 注入到 Vue 实例里去。也就是说每 install 一次，都会尝试给 Vue 实例注入一个 Store。
在 install 方法里，有一段逻辑和我们楼上的 getInstance 非常相似的逻辑：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> Vue <span class="token comment">// 这个Vue的作用和楼上的instance作用一样</span>
<span class="token operator">...</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">install</span> <span class="token punctuation">(</span><span class="token parameter">_Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Vue <span class="token operator">&amp;&amp;</span> _Vue <span class="token operator">===</span> Vue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>
        <span class="token string">'[vuex] already installed. Vue.use(Vuex) should be called only once.'</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 若没有，则为这个Vue实例对象install一个唯一的Vuex</span>
  Vue <span class="token operator">=</span> _Vue
  <span class="token comment">// 将Vuex的初始化逻辑写进Vue的钩子函数里</span>
  <span class="token function">applyMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="面试真题" tabindex="-1"><a class="header-anchor" href="#面试真题" aria-hidden="true">#</a> 面试真题</h2>
<h3 id="实现一个-storage" tabindex="-1"><a class="header-anchor" href="#实现一个-storage" aria-hidden="true">#</a> 实现一个 Storage</h3>
<h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h4>
<p>描述</p>
<blockquote>
<h4 id="实现-storage-使得该对象为单例-基于-localstorage-进行封装。实现方法-setitem-key-value-和-getitem-key-。" tabindex="-1"><a class="header-anchor" href="#实现-storage-使得该对象为单例-基于-localstorage-进行封装。实现方法-setitem-key-value-和-getitem-key-。" aria-hidden="true">#</a> 实现 Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。</h4>
</blockquote>
<h4 id="静态方法版本" tabindex="-1"><a class="header-anchor" href="#静态方法版本" aria-hidden="true">#</a> 静态方法版本</h4>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="闭包版-1" tabindex="-1"><a class="header-anchor" href="#闭包版-1" aria-hidden="true">#</a> 闭包版</h4>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现一个全局的模态框" tabindex="-1"><a class="header-anchor" href="#实现一个全局的模态框" aria-hidden="true">#</a> 实现一个全局的模态框</h2>
<h4 id="描述" tabindex="-1"><a class="header-anchor" href="#描述" aria-hidden="true">#</a> 描述</h4>
<blockquote>
<h4 id="实现一个全局唯一的-modal-弹框" tabindex="-1"><a class="header-anchor" href="#实现一个全局唯一的-modal-弹框" aria-hidden="true">#</a> 实现一个全局唯一的 Modal 弹框</h4>
</blockquote>
<h4 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> </h4>
<h4 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">"en"</span><span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">"UTF-8"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span>单例模式弹框<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>style<span class="token operator">></span>
    #modal <span class="token punctuation">{</span>
        <span class="token literal-property property">height</span><span class="token operator">:</span> 200px<span class="token punctuation">;</span>
        <span class="token literal-property property">width</span><span class="token operator">:</span> 200px<span class="token punctuation">;</span>
        line<span class="token operator">-</span>height<span class="token operator">:</span> 200px<span class="token punctuation">;</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> fixed<span class="token punctuation">;</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">50</span><span class="token operator">%</span><span class="token punctuation">;</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">50</span><span class="token operator">%</span><span class="token punctuation">;</span>
        <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token function">translate</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">50</span><span class="token operator">%</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">50</span><span class="token operator">%</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token literal-property property">border</span><span class="token operator">:</span> 1px solid black<span class="token punctuation">;</span>
        text<span class="token operator">-</span>align<span class="token operator">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
	<span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">'open'</span><span class="token operator">></span>打开弹框<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
	<span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">'close'</span><span class="token operator">></span>关闭弹框<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 核心逻辑，这里采用了闭包思路来实现单例模式</span>
    <span class="token keyword">const</span> Modal <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token keyword">let</span> modal <span class="token operator">=</span> <span class="token keyword">null</span>
    	<span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>modal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            	modal <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span>
            	modal<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">'我是一个全局唯一的Modal'</span>
            	modal<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token string">'modal'</span>
            	modal<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'none'</span>
            	document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>modal<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> modal
    	<span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 点击打开按钮展示模态框</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'open'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理</span>
    	<span class="token keyword">const</span> modal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Modal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	modal<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'block'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 点击关闭按钮隐藏模态框</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'close'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token keyword">const</span> modal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Modal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	<span class="token keyword">if</span><span class="token punctuation">(</span>modal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	    modal<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'none'</span>
    	<span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="原型设计模式-创建型" tabindex="-1"><a class="header-anchor" href="#原型设计模式-创建型" aria-hidden="true">#</a> 原型设计模式（创建型）</h1>
<p>谈 Prototype 无小事</p>
<h3 id="原型" tabindex="-1"><a class="header-anchor" href="#原型" aria-hidden="true">#</a> 原型</h3>
<p>在 JavaScript 中，每个构造函数都拥有一个 prototype 属性，它指向构造函数的原型对象，这个原型对象中有一个 constructor 属性指回构造函数；每个实例都有一个<strong>proto</strong>属性，当我们使用构造函数去创建实例时，实例的<strong>proto</strong>属性就会指向构造函数的原型对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个Dog构造函数</span>
<span class="token keyword">function</span> <span class="token function">Dog</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Dog</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">eat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"肉骨头真好吃"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 使用Dog构造函数创建dog实例</span>
<span class="token keyword">const</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">"旺财"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码里的几个实体之间就存在着这样的关系：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805093835167.png" alt="image-20220805093835167"></p>
<h3 id="原型链" tabindex="-1"><a class="header-anchor" href="#原型链" aria-hidden="true">#</a> 原型链</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 输出"肉骨头真好吃"</span>
dog<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 输出"[object Object]"</span>
dog<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>明明没有在 dog 实例里手动定义 eat 方法和 toString 方法，它们还是被成功地调用了。这是因为当我试图访问一个 JavaScript 实例的属性/方法时，它首先搜索这个实例本身；当发现实例没有定义对应的属性/方法时，它会转而去搜索实例的原型对象；如果原型对象中也搜索不到，它就去搜索原型对象的原型对象，这个搜索的轨迹，就叫做原型链。
以我们的 eat 方法和 toString 方法的调用过程为例，它的搜索过程就是这样子的：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805093903839.png" alt="image-20220805093903839"></p>
<p>楼上这些彼此相连的 prototype，就组成了一个原型链。 注： 几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例，除了 Object.prototype（当然，如果我们手动用 Object.create(null)创建一个没有任何原型的对象，那它也不是 Object 的实例）。
以上为大家介绍了原型、原型链等 JavaScript 中核心的基础知识。这些不仅是基础中的基础，也是面试中的重点。此外在面试中，一些面试官可能会刻意混淆 JavaScript 中原型范式和强类型语言中原型模式的区别，当他们这么做的时候不一定是因为对语言、对设计模式的理解有问题，而很有可能是为了考察你<strong>对象的深拷贝</strong>。</p>
<h3 id="对象的深拷贝" tabindex="-1"><a class="header-anchor" href="#对象的深拷贝" aria-hidden="true">#</a> 对象的深拷贝</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果是 值类型 或 null，则直接return</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">"object"</span> <span class="token operator">||</span> obj <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 定义结果对象</span>
  <span class="token keyword">let</span> copy <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// 如果对象是数组，则定义结果数组</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    copy <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 遍历对象的key</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果key是对象的自有属性</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 递归调用深拷贝方法</span>
      copy<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> copy<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用深拷贝方法，若属性为值类型，则直接返回；若属性为引用类型，则递归遍历。这就是我们在解这一类题时的核心的方法。</p>
<h1 id="装饰器模式-结构型" tabindex="-1"><a class="header-anchor" href="#装饰器模式-结构型" aria-hidden="true">#</a> 装饰器模式（结构型）</h1>
<p>对象装上它，就像开了挂
装饰器模式，又名装饰者模式。它的定义是“在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求”。</p>
<p><strong>不关心它现有的业务逻辑是啥样的，只对它已有的功能做个拓展，只关心拓展出来的那部分新功能如何实现。</strong></p>
<p>核心思想就是只进行添加，不修改原有逻辑。遵循了单一职责原则。</p>
<h1 id="适配器模式-结构型" tabindex="-1"><a class="header-anchor" href="#适配器模式-结构型" aria-hidden="true">#</a> 适配器模式（结构型）</h1>
<p>兼容代码就是一把梭</p>
<p>适配器模式通过<strong>把一个类的接口变换成客户端所期待的另一种接口</strong>，可以帮我们解决<strong>不兼容</strong>的问题。</p>
<p>举例手机的耳机插孔</p>
<p>旧的 Ajax 方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 发送get请求</span>
<span class="token function">Ajax</span><span class="token punctuation">(</span>
  <span class="token string">"get"</span><span class="token punctuation">,</span>
  url地址<span class="token punctuation">,</span>
  post入参<span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 成功的回调逻辑</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 失败的回调逻辑</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对老代码进行适配</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Ajax适配器函数，入参与旧接口保持一致</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">AjaxAdapter</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> success<span class="token punctuation">,</span> failed</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> type <span class="token operator">=</span> type<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> result<span class="token punctuation">;</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 实际的请求全部由新接口发起</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">"GET"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> HttpUtils<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">"POST"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> HttpUtils<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 假设请求成功对应的状态码是1</span>
    result<span class="token punctuation">.</span>statusCode <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> success
      <span class="token operator">?</span> <span class="token function">success</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">failed</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>statusCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 捕捉网络错误</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>failed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">failed</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>statusCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 用适配器适配旧的Ajax方法</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">Ajax</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> success<span class="token punctuation">,</span> failed</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">AjaxAdapter</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> success<span class="token punctuation">,</span> failed<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="代理模式-结构型" tabindex="-1"><a class="header-anchor" href="#代理模式-结构型" aria-hidden="true">#</a> 代理模式（结构型）</h1>
<p>代理模式，式如其名——在某些情况下，出于种种考虑/限制，一个对象<strong>不能直接访问</strong>另一个对象，需要一个<strong>第三者</strong>（代理）牵线搭桥从而间接达到访问目的，这样的模式就是代理模式。</p>
<h2 id="es6-中的-proxy" tabindex="-1"><a class="header-anchor" href="#es6-中的-proxy" aria-hidden="true">#</a> ES6 中的 Proxy</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>

<span class="token comment">// 普通私密信息</span>
<span class="token keyword">const</span> baseInfo <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">,</span> <span class="token string">'career'</span><span class="token punctuation">]</span>
<span class="token comment">// 最私密信息</span>
<span class="token keyword">const</span> privateInfo <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'avatar'</span><span class="token punctuation">,</span> <span class="token string">'phone'</span><span class="token punctuation">]</span>

<span class="token comment">// 用户（同事A）对象实例</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token punctuation">(</span>一些必要的个人信息<span class="token punctuation">)</span>
    <span class="token literal-property property">isValidated</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">isVIP</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 规定礼物的数据结构由type和value组成</span>
<span class="token keyword">const</span> present <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'巧克力'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">60</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 为用户增开presents字段存储礼物</span>
<span class="token keyword">const</span> girl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 姓名</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'小美'</span><span class="token punctuation">,</span>
  <span class="token comment">// 自我介绍</span>
  <span class="token literal-property property">aboutMe</span><span class="token operator">:</span> <span class="token string">'...'</span>（大家自行脑补吧）
  <span class="token comment">// 年龄</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">24</span><span class="token punctuation">,</span>
  <span class="token comment">// 职业</span>
  <span class="token literal-property property">career</span><span class="token operator">:</span> <span class="token string">'teacher'</span><span class="token punctuation">,</span>
  <span class="token comment">// 假头像</span>
  <span class="token literal-property property">fakeAvatar</span><span class="token operator">:</span> <span class="token string">'xxxx'</span><span class="token punctuation">(</span>新垣结衣的图片地址）
  <span class="token comment">// 真实头像</span>
  <span class="token literal-property property">avatar</span><span class="token operator">:</span> <span class="token string">'xxxx'</span><span class="token punctuation">(</span>自己的照片地址<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// 手机号</span>
  <span class="token literal-property property">phone</span><span class="token operator">:</span> <span class="token number">123456</span><span class="token punctuation">,</span>
  <span class="token comment">// 礼物数组</span>
  <span class="token literal-property property">presents</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 拒收50块以下的礼物</span>
  <span class="token literal-property property">bottomValue</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
  <span class="token comment">// 记录最近一次收到的礼物</span>
  <span class="token literal-property property">lastPresent</span><span class="token operator">:</span> present<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 掘金婚介所推出了小礼物功能</span>
<span class="token keyword">const</span> JuejinLovers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>girl<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">girl<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>baseInfo<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token operator">!==</span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>user<span class="token punctuation">.</span>isValidated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'您还没有完成验证哦'</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//...(此处省略其它有的没的各种校验逻辑)</span>

    <span class="token comment">// 此处我们认为只有验证过的用户才可以购买VIP</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>isValidated <span class="token operator">&amp;&amp;</span> privateInfo<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token operator">!==</span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>user<span class="token punctuation">.</span>isVIP<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'只有VIP才可以查看该信息哦'</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">girl<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 最近一次送来的礼物会尝试赋值给lastPresent字段</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'lastPresent'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>val<span class="token punctuation">.</span>value <span class="token operator">&lt;</span> girl<span class="token punctuation">.</span>bottomValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'sorry，您的礼物被拒收了'</span><span class="token punctuation">)</span>
          <span class="token keyword">return</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 如果没有拒收，则赋值成功，同时并入presents数组</span>
      girl<span class="token punctuation">.</span>lastPresent <span class="token operator">=</span> val
      girl<span class="token punctuation">.</span>presents <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>girl<span class="token punctuation">.</span>presents<span class="token punctuation">,</span> val<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件代理" tabindex="-1"><a class="header-anchor" href="#事件代理" aria-hidden="true">#</a> 事件代理</h2>
<p>事件代理，可能是代理模式最常见的一种应用方式，也是一道实打实的高频面试题。它的场景是一个父元素下有多个子元素，像这样：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ie=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>事件代理<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>father<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>链接1号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>链接2号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>链接3号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>链接4号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>链接5号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>链接6号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>// 假如不用代理模式，我们将循环安装监听函数 const aNodes =
document.getElementById('father').getElementsByTagName('a') const aLength =
aNodes.length for(let i=0;i&lt;aLength;i++) { aNodes[i].addEventListener('click',
function(e) { e.preventDefault() alert(`我是${aNodes[i].innerText}`) }) }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑到事件本身具有“冒泡”的特性，当我们点击 a 元素时，点击事件会“冒泡”到父元素 div 上，从而被监听到。如此一来，点击事件的监听函数只需要在 div 元素上被绑定一次即可，而不需要在子元素上被绑定 N 次——这种做法就是事件代理，它可以很大程度上提高我们代码的性能。</p>
<h3 id="事件代理的实现" tabindex="-1"><a class="header-anchor" href="#事件代理的实现" aria-hidden="true">#</a> 事件代理的实现</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 获取父元素</span>
<span class="token keyword">const</span> father <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"father"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 给父元素安装一次监听函数</span>
father<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 识别是否是目标子元素</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>tagName <span class="token operator">===</span> <span class="token string">"A"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 以下是监听函数的函数体</span>
    e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">我是</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>innerText<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种做法下，我们的点击操作并不会直接触及目标子元素，而是由父元素对事件进行处理和分发、间接地将其作用于子元素，因此这种操作从模式上划分属于代理模式。</p>
<h2 id="缓存代理" tabindex="-1"><a class="header-anchor" href="#缓存代理" aria-hidden="true">#</a> 缓存代理</h2>
<p>缓存代理比较好理解，它应用于一些计算量较大的场景里。在这种场景下，我们需要“用空间换时间”——当我们需要用到某个已经计算过的值的时候，不想再耗时进行二次计算，而是希望能从内存里去取出现成的计算结果。这种场景下，就需要一个代理来帮我们在进行计算的同时，进行计算结果的缓存了。
一个比较典型的例子，是对传入的参数进行求和：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// addAll方法会对你传入的所有参数做求和操作</span>
<span class="token keyword">const</span> <span class="token function-variable function">addAll</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"进行了一次新计算"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">+=</span> arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 为求和方法创建代理</span>
<span class="token keyword">const</span> proxyAddAll <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 求和结果的缓存池</span>
  <span class="token keyword">const</span> resultCache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 将入参转化为一个唯一的入参字符串</span>
    <span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 检查本次入参是否有对应的计算结果</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>args <span class="token keyword">in</span> resultCache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果有，则返回缓存池里现成的结果</span>
      <span class="token keyword">return</span> resultCache<span class="token punctuation">[</span>args<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>resultCache<span class="token punctuation">[</span>args<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">addAll</span><span class="token punctuation">(</span><span class="token operator">...</span>arguments<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把这个方法丢进控制台，尝试同一套入参两次，结果喜人：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094028579.png" alt="image-20220805094028579">
我们发现 proxyAddAll 针对重复的入参只会计算一次，这将大大节省计算过程中的时间开销。现在我们有 6 个入参，可能还看不出来，当我们针对大量入参、做反复计算时，缓存代理的优势将得到更充分的凸显。</p>
<h2 id="保护代理" tabindex="-1"><a class="header-anchor" href="#保护代理" aria-hidden="true">#</a> 保护代理</h2>
<p>开婚介所的时候，为了保护用户的私人信息，我们会在同事哥访问小美的年龄的时候，去校验同事哥是否已经通过了我们的实名认证；为了确保<s>婚介所的利益</s>同事哥确实是一位有诚意的男士，当他想获取小美的联系方式时，我们会校验他是否具有 VIP 资格。所谓“保护代理”，就是在访问层面做文章，在 getter 和 setter 函数里去进行校验和拦截，确保一部分变量是安全的。
值得一提的是，上节中我们提到的 Proxy，它本身就是为拦截而生的，所以我们目前实现保护代理时，考虑的首要方案就是 ES6 中的 Proxy。</p>
<h1 id="策略模式-行为型" tabindex="-1"><a class="header-anchor" href="#策略模式-行为型" aria-hidden="true">#</a> 策略模式（行为型）</h1>
<p>重构小能手，拆分“胖逻辑”</p>
<p>定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。</p>
<p>原先的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">askPrice</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理预热价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"pre"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.9</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 处理大促价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"onSale"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">30</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 处理返场价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"back"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">50</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> originPrice<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 处理尝鲜价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"fresh"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.5</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 处理新人价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"newUser"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">50</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> originPrice<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单一功能改造" tabindex="-1"><a class="header-anchor" href="#单一功能改造" aria-hidden="true">#</a> 单一功能改造</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 处理预热价</span>
<span class="token keyword">function</span> <span class="token function">prePrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">20</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.9</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 处理大促价</span>
<span class="token keyword">function</span> <span class="token function">onSalePrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">30</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 处理返场价</span>
<span class="token keyword">function</span> <span class="token function">backPrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">50</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> originPrice<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 处理尝鲜价</span>
<span class="token keyword">function</span> <span class="token function">freshPrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">askPrice</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理预热价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"pre"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">prePrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 处理大促价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"onSale"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">onSalePrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 处理返场价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"back"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">backPrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 处理尝鲜价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"fresh"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">freshPrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里，在单一功能原则的指引下，我们已经解决了一半的问题。
我们现在来捋一下，其实这个询价逻辑整体上来看只有两个关键动作：</p>
<blockquote>
<p>询价逻辑的分发 ——&gt; 询价逻辑的执行</p>
</blockquote>
<p>在改造的第一步，我们已经把“询价逻辑的执行”给摘了出去，并且实现了不同询价逻辑之间的解耦。接下来，我们就要拿“分发”这个动作开刀。</p>
<h2 id="开放封闭改造" tabindex="-1"><a class="header-anchor" href="#开放封闭改造" aria-hidden="true">#</a> 开放封闭改造</h2>
<p>剩下一半的问题是啥呢？就是咱们上面说的那个新人价的问题——这会儿我要想给 askPrice 增加新人询价逻辑，我该咋整？我只能这么来：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 处理预热价</span>
<span class="token keyword">function</span> <span class="token function">prePrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">20</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.9</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 处理大促价</span>
<span class="token keyword">function</span> <span class="token function">onSalePrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">30</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 处理返场价</span>
<span class="token keyword">function</span> <span class="token function">backPrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">50</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> originPrice<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 处理尝鲜价</span>
<span class="token keyword">function</span> <span class="token function">freshPrice</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">askPrice</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理预热价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"pre"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">prePrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 处理大促价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"onSale"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">onSalePrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 处理返场价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"back"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">backPrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 处理尝鲜价</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">"fresh"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">freshPrice</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 askPrice 里面，我们新增了一个 if-else 判断。可以看出，这样其实还是在修改 askPrice 的函数体，没有实现“对扩展开放，对修改封闭”的效果。
那么我们应该怎么做？我们仔细想想，楼上用了这么多 if-else，我们的目的到底是什么？是不是就是为了把 询价标签-询价函数 这个映射关系给明确下来？那么在 JS 中，有没有什么既能够既帮我们明确映射关系，同时不破坏代码的灵活性的方法呢？答案就是<strong>对象映射</strong>！
咱们完全可以把询价算法全都收敛到一个对象里去嘛：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义一个询价处理器对象</span>
<span class="token keyword">const</span> priceProcessor <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">pre</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.9</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">onSale</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">30</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">back</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>originPrice <span class="token operator">>=</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> originPrice <span class="token operator">-</span> <span class="token number">50</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> originPrice<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">fresh</span><span class="token punctuation">(</span><span class="token parameter">originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> originPrice <span class="token operator">*</span> <span class="token number">0.5</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们想使用其中某个询价算法的时候：通过标签名去定位就好了：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 询价函数</span>
<span class="token keyword">function</span> <span class="token function">askPrice</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> originPrice</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> priceProcessor<span class="token punctuation">[</span>tag<span class="token punctuation">]</span><span class="token punctuation">(</span>originPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="状态模式-行为型" tabindex="-1"><a class="header-anchor" href="#状态模式-行为型" aria-hidden="true">#</a> 状态模式（行为型）</h1>
<p>状态模式和策略模式宛如一对孪生兄弟——它们长得很像、解决的问题也可以说没啥本质上的差别。</p>
<blockquote>
<p>状态模式主要解决的是当控制一个对象状态的条件表达式过于复杂时的情况。把状态的判断逻辑转移到表示不同状态的一系列类中，可以把复杂的判断逻辑简化。</p>
</blockquote>
<h2 id="一台咖啡机的诞生" tabindex="-1"><a class="header-anchor" href="#一台咖啡机的诞生" aria-hidden="true">#</a> 一台咖啡机的诞生</h2>
<p>旧代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">CoffeeMaker</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/</span>
    <span class="token comment">// 初始化状态，没有切换任何咖啡模式</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">"init"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 关注咖啡机状态切换函数</span>
  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录当前状态</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"american"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这里用 console 代指咖啡制作流程的业务逻辑</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我只吐黑咖啡"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"latte"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">给黑咖啡加点奶</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"vanillaLatte"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"黑咖啡加点奶再加香草糖浆"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"mocha"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"黑咖啡加点奶再加点巧克力"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="职责分离" tabindex="-1"><a class="header-anchor" href="#职责分离" aria-hidden="true">#</a> 职责分离</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">CoffeeMaker</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/</span>
    <span class="token comment">// 初始化状态，没有切换任何咖啡模式</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">"init"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录当前状态</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"american"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这里用 console 代指咖啡制作流程的业务逻辑</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">americanProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"latte"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">latteProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"vanillaLatte"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">vanillaLatteProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token string">"mocha"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">mochaProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">americanProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我只吐黑咖啡"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">latteProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">americanProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"加点奶"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">vanillaLatteProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">latteProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"再加香草糖浆"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">mochaProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">latteProcress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"再加巧克力"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> mk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CoffeeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mk<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token string">"latte"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开放封闭" tabindex="-1"><a class="header-anchor" href="#开放封闭" aria-hidden="true">#</a> 开放封闭</h2>
<p>复用的问题解决了，if-else 却仍然活得好好的。
现在咱们假如要增加”气泡美式“这个咖啡品种，就不得不去修改 changeState 的函数逻辑，这违反了开放封闭的原则。
同时，一个函数里收敛这么多判断，也着实不够体面。咱们现在要像策略模式一样，想办法把咖啡机状态和咖啡制作工序之间的映射关系（也就是咱们上节谈到的分发过程）用一个更优雅地方式做掉。如果你策略模式掌握得足够好，你会第一时间反映出对象映射的方案：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> stateToProcessor <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">american</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我只吐黑咖啡"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">latte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">american</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"加点奶"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">vanillaLatte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">latte</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"再加香草糖浆"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mocha</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">latte</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"再加巧克力"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">CoffeeMaker</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/</span>
    <span class="token comment">// 初始化状态，没有切换任何咖啡模式</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">"init"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 关注咖啡机状态切换函数</span>
  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录当前状态</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token comment">// 若状态不存在，则返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>stateToProcessor<span class="token punctuation">[</span>state<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    stateToProcessor<span class="token punctuation">[</span>state<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> mk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CoffeeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mk<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token string">"latte"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们这么做时，其实已经实现了一个 js 版本的状态模式。
但这里有一点大家需要引起注意：这种方法仅仅是看上去完美无缺，其中却暗含一个非常重要的隐患——stateToProcessor 里的工序函数，感知不到咖啡机的内部状况。</p>
<h2 id="策略与状态的辨析" tabindex="-1"><a class="header-anchor" href="#策略与状态的辨析" aria-hidden="true">#</a> 策略与状态的辨析</h2>
<p>怎么理解这个问题？大家知道，策略模式是对算法的封装。算法和状态对应的行为函数虽然本质上都是行为，但是算法的独立性可高多了。
比如说我一个询价算法，我只需要读取一个数字，我就能啪啪三下五除二给你吐出另一个数字作为返回结果——它和计算主体之间可以是分离的，我们只要关注计算逻辑本身就可以了。
但状态可不一样了。拿咱们咖啡机来说，为了好懂，咱写代码的时候把真正咖啡的制作工序用 console 来表示了。但大家都知道，做咖啡要考虑的东西可太多了。 比如咱们做拿铁，拿铁里的牛奶从哪来，是不是从咖啡机的某个储物空间里去取？再比如我们行为函数是不是应该时刻感知咖啡机每种原材料的用量、进而判断自己的工序还能不能如期执行下去？这就决定了行为函数必须能很方便地拿到咖啡机这个主体的各种信息——它必须得对主体有感知才行。
策略模式和状态模式确实是相似的，它们都封装行为、都通过委托来实现行为分发。
但策略模式中的行为函数是”潇洒“的行为函数，它们不依赖调用主体、互相平行、各自为政，井水不犯河水。而<strong>状态模式中的行为函数，首先是和状态主体之间存在着关联，由状态主体把它们串在一起；另一方面，正因为关联着同样的一个（或一类）主体，所以不同状态对应的行为函数可能并不会特别割裂。</strong></p>
<h2 id="进一步改造" tabindex="-1"><a class="header-anchor" href="#进一步改造" aria-hidden="true">#</a> 进一步改造</h2>
<p>按照我们这一通描述，当务之急是要把咖啡机和它的状态处理函数建立关联。
把状态-行为映射对象作为主体类对应实例的一个属性添加进去就行了：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">CoffeeMaker</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/</span>
    <span class="token comment">// 初始化状态，没有切换任何咖啡模式</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">"init"</span><span class="token punctuation">;</span>
    <span class="token comment">// 初始化牛奶的存储量</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>leftMilk <span class="token operator">=</span> <span class="token string">"500ml"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  stateToProcessor <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">that</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">,</span>
    <span class="token function">american</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 尝试在行为函数里拿到咖啡机实例的信息并输出</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"咖啡机现在的牛奶存储量是:"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>that<span class="token punctuation">.</span>leftMilk<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我只吐黑咖啡"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">latte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">american</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"加点奶"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">vanillaLatte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">latte</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"再加香草糖浆"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">mocha</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">latte</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"再加巧克力"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// 关注咖啡机状态切换函数</span>
  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>stateToProcessor<span class="token punctuation">[</span>state<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stateToProcessor<span class="token punctuation">[</span>state<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> mk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CoffeeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mk<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token string">"latte"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此一来，我们就可以在 stateToProcessor 轻松拿到咖啡机的实例对象，进而感知咖啡机这个主体了。</p>
<h1 id="观察者模式-行为型" tabindex="-1"><a class="header-anchor" href="#观察者模式-行为型" aria-hidden="true">#</a> 观察者模式（行为型）</h1>
<p>鬼故事：产品经理拉了一个钉钉群</p>
<blockquote>
<p>观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。 —— Graphic Design Patterns</p>
</blockquote>
<h1 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义发布者类</span>
<span class="token keyword">class</span> <span class="token class-name">Publisher</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Publisher created'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 增加订阅者</span>
  <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Publisher.add invoked'</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>observer<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 移除订阅者</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Publisher.remove invoked'</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">===</span> observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 通知所有订阅者</span>
  <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Publisher.notify invoked'</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">observer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      observer<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token comment">// 定义订阅者类</span>
<span class="token keyword">class</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Observer created'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Observer.update invoked'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token comment">// 定义订阅者类</span>
<span class="token keyword">class</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Observer created'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Observer.update invoked'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">DeveloperObserver</span> <span class="token keyword">extends</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 需求文档一开始还不存在，prd初始为空对象</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prdState <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'DeveloperObserver created'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 重写一个具体的update方法</span>
    <span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">publisher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'DeveloperObserver.update invoked'</span><span class="token punctuation">)</span>
        <span class="token comment">// 更新需求文档</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prdState <span class="token operator">=</span> publisher<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 调用工作函数</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">work</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// work方法，一个专门搬砖的方法</span>
    <span class="token function">work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取需求文档</span>
        <span class="token keyword">const</span> prd <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prdState
        <span class="token comment">// 开始基于需求文档提供的信息搬砖。。。</span>
        <span class="token operator">...</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'996 begins...'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">DeveloperObserver</span> <span class="token keyword">extends</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 需求文档一开始还不存在，prd初始为空对象</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prdState <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'DeveloperObserver created'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 重写一个具体的update方法</span>
    <span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">publisher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'DeveloperObserver.update invoked'</span><span class="token punctuation">)</span>
        <span class="token comment">// 更新需求文档</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prdState <span class="token operator">=</span> publisher<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 调用工作函数</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">work</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// work方法，一个专门搬砖的方法</span>
    <span class="token function">work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取需求文档</span>
        <span class="token keyword">const</span> prd <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prdState
        <span class="token comment">// 开始基于需求文档提供的信息搬砖。。。</span>
        <span class="token operator">...</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'996 begins...'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="面试真题-1" tabindex="-1"><a class="header-anchor" href="#面试真题-1" aria-hidden="true">#</a> 面试真题</h2>
<h3 id="vue-数据双向绑定-响应式系统-的实现原理" tabindex="-1"><a class="header-anchor" href="#vue-数据双向绑定-响应式系统-的实现原理" aria-hidden="true">#</a> Vue 数据双向绑定（响应式系统）的实现原理</h3>
<h4 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h4>
<p>Vue 框架是热门的渐进式 JavaScript 框架。在 Vue 中，当我们修改状态时，视图会随之更新，这就是 Vue 的数据双向绑定（又称响应式原理）。数据双向绑定是 Vue 最独特的特性之一。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094105245.png" alt="image-20220805094105245"></p>
<p>在 Vue 中，每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新——这是一个典型的观察者模式。这道面试题考察了受试者对 Vue 底层原理的理解、对观察者模式的实现能力以及一系列重要的 JS 知识点，具有较强的综合性和代表性。</p>
<p>值得注意的是，在面试过程中，面试官多数情况下不会要求大家写出完整的响应式原理实现代码，而是要求你“说说自己的理解”。</p>
<p>在 Vue 数据双向绑定的实现逻辑里，有这样三个关键角色：</p>
<ul>
<li>observer（监听器）：注意，此 observer 非彼 observer。在我们上节的解析中，observer 作为设计模式中的一个角色，代表“订阅者”。但在 Vue 数据双向绑定的角色结构里，所谓的 observer 不仅是一个数据监听器，它还需要对监听到的数据进行<strong>转发</strong>——也就是说它<strong>同时还是一个发布者</strong>。</li>
<li>watcher（订阅者）：observer 把数据转发给了<strong>真正的订阅者</strong>——watcher 对象。watcher 接收到新的数据后，会去更新视图。</li>
<li>compile（编译器）：MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，指令的数据初始化、订阅者的创建这些“杂活”也归它管~</li>
</ul>
<p>这三者的配合过程如图所示：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094133281.png" alt="image-20220805094133281">
OK，实现方案搞清楚了，下面我们给整个流程中<strong>涉及到发布-订阅这一模式的代码</strong>来个特写：</p>
<h3 id="核心代码" tabindex="-1"><a class="header-anchor" href="#核心代码" aria-hidden="true">#</a> 核心代码</h3>
<h4 id="实现-observer" tabindex="-1"><a class="header-anchor" href="#实现-observer" aria-hidden="true">#</a> 实现 observer</h4>
<p>首先我们需要实现一个方法，这个方法会对需要监听的数据对象进行遍历、给它的属性加上定制的 getter 和 setter 函数。这样但凡这个对象的某个属性发生了改变，就会触发 setter 函数，进而通知到订阅者。这个 setter 函数，就是我们的监听器：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// observe方法遍历并包装对象属性</span>
<span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 若target是一个对象，则遍历它</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> target <span class="token operator">===</span> <span class="token string">"object"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// defineReactive方法会给目标属性装上“监听器”</span>
      <span class="token function">defineReactive</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义defineReactive方法</span>
<span class="token keyword">function</span> <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历</span>
  <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 为当前属性安装监听器</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// 可枚举</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 不可配置</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 监听器函数</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>target<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">属性的</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">属性从</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>val<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">值变成了了</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      val <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面实现订阅者 Dep：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义订阅者类Dep</span>
<span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化订阅队列</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 增加订阅者</span>
  <span class="token function">addSub</span><span class="token punctuation">(</span><span class="token parameter">sub</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 通知订阅者（是不是所有的代码都似曾相识？）</span>
  <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">sub</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      sub<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以改写 defineReactive 中的 setter 方法，在监听器里去通知订阅者了：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 监听当前属性</span>
  <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 通知所有订阅者</span>
      dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现一个-event-bus-event-emitter" tabindex="-1"><a class="header-anchor" href="#实现一个-event-bus-event-emitter" aria-hidden="true">#</a> 实现一个 Event Bus/ Event Emitter</h2>
<p>Event Bus（Vue、Flutter 等前端框架中有出镜）和 Event Emitter（Node 中有出镜）出场的“剧组”不同，但是它们都对应一个共同的角色——<strong>全局事件总线</strong>。
全局事件总线，严格来说不能说是观察者模式，而是发布-订阅模式（具体的概念甄别我们会在下个小节着重讲）。它在我们日常的业务开发中应用非常广。
上节开篇我说过，如果只能考一个设计模式的面试题，我一定会出观察者模式。
这句话接着往下说，如果只能选一道题，那这道题一定是 Event Bus/Event Emitter 的代码实现——我都说这么清楚了，这个知识点到底要不要掌握、需要掌握到什么程度，就看各位自己的了。</p>
<h3 id="在-vue-中使用-event-bus-来实现组件间的通讯" tabindex="-1"><a class="header-anchor" href="#在-vue-中使用-event-bus-来实现组件间的通讯" aria-hidden="true">#</a> 在 Vue 中使用 Event Bus 来实现组件间的通讯</h3>
<p>Event Bus/Event Emitter 作为全局事件总线，它起到的是一个<strong>沟通桥梁</strong>的作用。我们可以把它理解为一个事件中心，我们所有事件的订阅/发布都不能由订阅方和发布方“私下沟通”，必须要委托这个事件中心帮我们实现。
在 Vue 中，有时候 A 组件和 B 组件中间隔了很远，看似没什么关系，但我们希望它们之间能够通信。这种情况下除了求助于 Vuex 之外，我们还可以通过 Event Bus 来实现我们的需求。
创建一个 Event Bus（本质上也是 Vue 实例）并导出：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> EventBus <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> EventBus<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在主文件里引入 EventBus，并挂载到全局：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> bus <span class="token keyword">from</span> <span class="token string">"EventBus的文件路径"</span><span class="token punctuation">;</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>bus <span class="token operator">=</span> bus<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>订阅事件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 这里func指someEvent这个事件的监听函数</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">$on</span><span class="token punctuation">(</span><span class="token string">"someEvent"</span><span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>发布（触发）事件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 这里params指someEvent这个事件被触发时回调函数接收的入参</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">"someEvent"</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>大家会发现，整个调用过程中，没有出现具体的发布者和订阅者（比如上节的 PrdPublisher 和 DeveloperObserver），全程只有 bus 这个东西一个人在疯狂刷存在感。这就是全局事件总线的特点——所有事件的发布/订阅操作，必须经由事件中心，禁止一切“私下交易”！
下面，我们就一起来实现一个 Event Bus（注意看注释里的解析）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">EventEmitter</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// handlers是一个map，用于存储事件与回调之间的对应关系</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>handlers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数</span>
  <span class="token function">on</span><span class="token punctuation">(</span><span class="token parameter">eventName<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 先检查一下目标事件名有没有对应的监听函数队列</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果没有，那么首先初始化一个监听函数队列</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 把回调函数推入目标事件的监听函数队列里去</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数</span>
  <span class="token function">emit</span><span class="token punctuation">(</span><span class="token parameter">eventName<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 检查目标事件是否有监听函数队列</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题</span>
      <span class="token keyword">const</span> handlers <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 如果有，则逐个调用队列里的回调函数</span>
      handlers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">callback</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 移除某个事件回调队列里的指定回调函数</span>
  <span class="token function">off</span><span class="token punctuation">(</span><span class="token parameter">eventName<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> callbacks <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> callbacks<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      callbacks<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 为事件注册单次监听器</span>
  <span class="token function">once</span><span class="token punctuation">(</span><span class="token parameter">eventName<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 对回调函数进行包装，使其执行完毕自动被移除</span>
    <span class="token keyword">const</span> <span class="token function-variable function">wrapper</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">cb</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span>eventName<span class="token punctuation">,</span> wrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span>eventName<span class="token punctuation">,</span> wrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在日常的开发中，大家用到 EventBus/EventEmitter 往往提供比这五个方法多的多的多的方法。但在面试过程中，如果大家能够完整地实现出这五个方法，已经非常可以说明问题了，因此楼上这个 EventBus 希望大家可以熟练掌握。</p>
<h2 id="观察者模式与发布-订阅模式的区别是什么" tabindex="-1"><a class="header-anchor" href="#观察者模式与发布-订阅模式的区别是什么" aria-hidden="true">#</a> 观察者模式与发布-订阅模式的区别是什么？</h2>
<p>在面试过程中，一些对细节比较在意的面试官可能会追问观察者模式与发布-订阅模式的区别。这个问题可能会引发一些同学的不适，因为在大量参考资料以及已出版的纸质书籍中，都会告诉大家“发布-订阅模式和观察者模式是同一个东西的两个名字”。本书在前文的叙述中，也没有突出强调两者的区别。其实这两个模式，要较起真来，确实不能给它们划严格的等号。
为什么大家都喜欢给它们强行划等号呢？这是因为就算划了等号，也不影响我们正常使用，毕竟两者在核心思想、运作机制上没有本质的差别。但考虑到这个问题确实可以成为面试题的一个方向，此处我们还是单独拿出来讲一下。
回到我们上文的例子里。韩梅梅把所有的开发者拉了一个群，直接把需求文档丢给每一位群成员，这种<strong>发布者直接触及到订阅者</strong>的操作，叫观察者模式。但如果韩梅梅没有拉群，而是把需求文档上传到了公司统一的需求平台上，需求平台感知到文件的变化、自动通知了每一位订阅了该文件的开发者，这种<strong>发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作，叫做发布-订阅模式</strong>。
相信大家也已经看出来了，观察者模式和发布-订阅模式之间的区别，在于是否存在第三方、发布者能否直接感知订阅者（如图所示）。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094256032.png" alt="image-20220805094256032"></p>
<p>在我们见过的这些例子里，韩梅梅拉钉钉群的操作，就是典型的观察者模式；而通过 EventBus 去实现事件监听/发布，则属于发布-订阅模式。
既生瑜，何生亮？既然有了观察者模式，为什么还需要发布-订阅模式呢？
大家思考一下：为什么要有观察者模式？观察者模式，解决的其实是模块间的耦合问题，有它在，即便是两个分离的、毫不相关的模块，也可以实现数据通信。但观察者模式仅仅是减少了耦合，<strong>并没有完全地解决耦合问题</strong>——被观察者必须去维护一套观察者的集合，这些观察者必须实现统一的方法供被观察者调用，两者之间还是有着说不清、道不明的关系。
而发布-订阅模式，则是快刀斩乱麻了——发布者完全不用感知订阅者，不用关心它怎么实现回调方法，事件的注册和触发都发生在独立于双方的第三方平台（事件总线)上。发布-订阅模式下，实现了完全地解耦。
但这并不意味着，发布-订阅模式就比观察者模式“高级”。在实际开发中，我们的模块解耦诉求<strong>并非总是需要它们完全解耦</strong>。如果两个模块之间本身存在关联，且这种关联是稳定的、必要的，那么我们使用观察者模式就足够了。而在模块与模块之间独立性较强、且没有必要单纯为了数据通信而强行为两者制造依赖的情况下，我们往往会倾向于使用发布-订阅模式。</p>
<h1 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式" aria-hidden="true">#</a> 迭代器模式</h1>
<h2 id="实现一个迭代器生成函数" tabindex="-1"><a class="header-anchor" href="#实现一个迭代器生成函数" aria-hidden="true">#</a> 实现一个迭代器生成函数</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 编写一个迭代器生成函数</span>
<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">iteratorGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token string">"1号选手"</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token string">"2号选手"</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token string">"3号选手"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> iterator <span class="token operator">=</span> <span class="token function">iteratorGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个生成器函数并没有什么难度，但在面试的过程中，面试官往往对生成器这种语法糖背后的实现逻辑更感兴趣。下面我们要做的，不仅仅是写一个迭代器对象，而是用 ES5 去写一个能够生成迭代器对象的迭代器生成函数（解析在注释里）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义生成器函数，入参是任意集合</span>
<span class="token keyword">function</span> <span class="token function">iteratorGenerator</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// idx记录当前访问的索引</span>
  <span class="token keyword">var</span> idx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token comment">// len记录传入集合的长度</span>
  <span class="token keyword">var</span> len <span class="token operator">=</span> list<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token comment">// 自定义next方法</span>
    <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果索引还没有超出集合长度，done为false</span>
      <span class="token keyword">var</span> done <span class="token operator">=</span> idx <span class="token operator">>=</span> len<span class="token punctuation">;</span>
      <span class="token comment">// 如果done为false，则可以继续取值</span>
      <span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token operator">!</span>done <span class="token operator">?</span> list<span class="token punctuation">[</span>idx<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

      <span class="token comment">// 将当前值与遍历是否完毕（done）返回</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">done</span><span class="token operator">:</span> done<span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> value<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> iterator <span class="token operator">=</span> <span class="token function">iteratorGenerator</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"1号选手"</span><span class="token punctuation">,</span> <span class="token string">"2号选手"</span><span class="token punctuation">,</span> <span class="token string">"3号选手"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


