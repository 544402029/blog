<template><div><h2 id="vue3" tabindex="-1"><a class="header-anchor" href="#vue3" aria-hidden="true">#</a> Vue3</h2>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1622731226157.png" alt="Vue3升级说明"></p>
<h3 id="vue3-升级内容" tabindex="-1"><a class="header-anchor" href="#vue3-升级内容" aria-hidden="true">#</a> Vue3 升级内容？</h3>
<ul>
<li>全部用 TS 重写（响应式、vdom、模板编译等）</li>
<li>性能提升，（打包出来的）代码量减少</li>
<li>会调整部分 API</li>
</ul>
<h3 id="vue3-比-vue2-有什么优势" tabindex="-1"><a class="header-anchor" href="#vue3-比-vue2-有什么优势" aria-hidden="true">#</a> Vue3 比 Vue2 有什么优势？</h3>
<ul>
<li>性能更好</li>
<li>体积更小</li>
<li>更好的 TS 支持（Vue3 采用 TS 开发）</li>
<li>更好的代码组织</li>
<li>更好的逻辑抽离</li>
<li>更多新功能</li>
</ul>
<h3 id="vue3-生命周期和-vue2-生命周期有什么区别" tabindex="-1"><a class="header-anchor" href="#vue3-生命周期和-vue2-生命周期有什么区别" aria-hidden="true">#</a> Vue3 生命周期和 Vue2 生命周期有什么区别？</h3>
<h4 id="options-api-生命周期" tabindex="-1"><a class="header-anchor" href="#options-api-生命周期" aria-hidden="true">#</a> Options API 生命周期</h4>
<ul>
<li>beforeDestory 改为 beforeUnmount</li>
<li>destroyed 改为 unmounted</li>
<li>其它沿用 Vue2 生命周期</li>
</ul>
<h3 id="composition-api-带来了什么" tabindex="-1"><a class="header-anchor" href="#composition-api-带来了什么" aria-hidden="true">#</a> Composition API 带来了什么？</h3>
<ul>
<li>更好的代码组织</li>
<li>更好的逻辑复用</li>
<li>更好的类型推导</li>
</ul>
<p>更适用于大型项目，复杂页面。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1647919440656-41f4ebb6-ae41-4a53-9dbc-e2ce9d9ba69f.png" alt=""></p>
<p>其中 this.a, this.fn1 按照正常 js 规范是通过 this.data.a, this.method.fn 去访问。但是在 vue2 做了一层代理， 导致直接在 this 下就可以访问。这样非常不利于类型推导。</p>
<h3 id="如何理解-ref-toref-和-torefs" tabindex="-1"><a class="header-anchor" href="#如何理解-ref-toref-和-torefs" aria-hidden="true">#</a> 如何理解 ref toRef 和 toRefs</h3>
<h4 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> ref</h4>
<ul>
<li>生成值类型的响应式数据</li>
<li>可用于模板和 reactive</li>
<li>通过 .value 修改值</li>
</ul>
<h4 id="toref" tabindex="-1"><a class="header-anchor" href="#toref" aria-hidden="true">#</a> toref</h4>
<ul>
<li>针对一个响应式对象（reactive 封装）的 prop</li>
<li>创建一个 ref， 具有响应式</li>
<li>两者保持引用关系</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>toRef demo <span class="token operator">-</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>ageRef<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">-</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>state<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>state<span class="token punctuation">.</span>age<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> toRef<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ToRef'</span><span class="token punctuation">,</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'双越'</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">const</span> age1 <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span>age <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token comment">// // toRef 如果用于普通对象（非响应式对象），产出的结果不具备响应式</span>
        <span class="token comment">// const state = {</span>
        <span class="token comment">//     age: 20,</span>
        <span class="token comment">//     name: '双越'</span>
        <span class="token comment">// }</span>

        <span class="token keyword">const</span> ageRef <span class="token operator">=</span> <span class="token function">toRef</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> <span class="token string">'age'</span><span class="token punctuation">)</span>

        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            state<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">25</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">)</span>

        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            ageRef<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">30</span> <span class="token comment">// .value 修改值</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            state<span class="token punctuation">,</span>
            ageRef
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="torefs" tabindex="-1"><a class="header-anchor" href="#torefs" aria-hidden="true">#</a> toRefs</h4>
<ul>
<li>将响应式对象( reactive 封装) 转换为普通对象</li>
<li>对象的每个 prop 都是对应的 ref</li>
<li>两者保持引用关系</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>toRefs demo <span class="token punctuation">{</span><span class="token punctuation">{</span>age<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> toRef<span class="token punctuation">,</span> toRefs<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ToRefs'</span><span class="token punctuation">,</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'双越'</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">const</span> stateAsRefs <span class="token operator">=</span> <span class="token function">toRefs</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token comment">// 将响应式对象，变成普通对象</span>

        <span class="token comment">// const { age: ageRef, name: nameRef } = stateAsRefs // 每个属性，都是 ref 对象</span>
        <span class="token comment">// return {</span>
        <span class="token comment">//     ageRef,</span>
        <span class="token comment">//     nameRef</span>
        <span class="token comment">// }</span>

        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            state<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">25</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">)</span>
        <span class="token comment">// 直接返回return{state}是不具有响应式变化的</span>
        <span class="token keyword">return</span> stateAsRefs
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ref-toref-和-torefs-的最佳使用方式" tabindex="-1"><a class="header-anchor" href="#ref-toref-和-torefs-的最佳使用方式" aria-hidden="true">#</a> ref toRef 和 toRefs 的最佳使用方式</h3>
<ul>
<li>用 reactive 做对象的响应式, 用 ref 做值类型响应式</li>
<li>setup 中返回 toRefs(state) , 或者 toRef(state，'xxX' )</li>
<li>ref 的变量命名都用 xxxRef</li>
<li>合成函数返回响应式对象时,使用 toRefs</li>
</ul>
<h3 id="为何需要-ref" tabindex="-1"><a class="header-anchor" href="#为何需要-ref" aria-hidden="true">#</a> 为何需要 ref</h3>
<ul>
<li>返回值类型, 会丢失响应式</li>
<li>如在 setup、computed、 合成函数,都有可能返回值类型</li>
<li>Vue 如不定义 ref ,用户将自造 ref ,反而混乱</li>
</ul>
<p>proxy 只能针对对象，对值类型是无能为力的。</p>
<h3 id="为何需要-value" tabindex="-1"><a class="header-anchor" href="#为何需要-value" aria-hidden="true">#</a> 为何需要 .value</h3>
<ul>
<li>ref 是一个对象(不丢失响应式) , value 存储值</li>
<li>通过.value 属性的 get 和 set 实现响应式</li>
<li>用于模板、reactive 时,不需要.value ,其他情况都需要</li>
</ul>
<h3 id="为何需要-toref-和-torefs" tabindex="-1"><a class="header-anchor" href="#为何需要-toref-和-torefs" aria-hidden="true">#</a> 为何需要 toRef 和 toRefs ?</h3>
<ul>
<li>初衷:不丢失响应式的情况下, 把对象数据<strong>解构/扩散</strong></li>
<li>前提:针对的是响应式对象( reactive 封装的)非普通对象</li>
<li>注意: <strong>不创造</strong>响应式, 而是<strong>延续</strong>响应式</li>
</ul>
<h3 id="vue3-升级了哪些重要功能" tabindex="-1"><a class="header-anchor" href="#vue3-升级了哪些重要功能" aria-hidden="true">#</a> vue3 升级了哪些重要功能</h3>
<ul>
<li>createApp</li>
<li>emits 属性</li>
<li>多事件</li>
<li>Fragment</li>
<li>移除 .sync</li>
<li>生命周期</li>
<li>异步组件的写法</li>
<li>移除 filter</li>
<li>Teleport</li>
<li>Suspense</li>
<li>Composition API</li>
</ul>
<h4 id="createapp" tabindex="-1"><a class="header-anchor" href="#createapp" aria-hidden="true">#</a> createApp</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173555752.png" alt="image-20220808173555752"></p>
<h4 id="emits-属性" tabindex="-1"><a class="header-anchor" href="#emits-属性" aria-hidden="true">#</a> emits 属性</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173620004.png" alt="image-20220808173620004"></p>
<h4 id="多事件处理" tabindex="-1"><a class="header-anchor" href="#多事件处理" aria-hidden="true">#</a> 多事件处理</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173646903.png" alt="image-20220808173646903"></p>
<h4 id="fragment" tabindex="-1"><a class="header-anchor" href="#fragment" aria-hidden="true">#</a> Fragment</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173733270.png" alt="image-20220808173733270"></p>
<h4 id="移除-sync" tabindex="-1"><a class="header-anchor" href="#移除-sync" aria-hidden="true">#</a> 移除 .sync</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173805261.png" alt="image-20220808173805261"></p>
<h4 id="异步组件的写法" tabindex="-1"><a class="header-anchor" href="#异步组件的写法" aria-hidden="true">#</a> 异步组件的写法</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173900335.png" alt="image-20220808173900335"></p>
<h4 id="移除-filter" tabindex="-1"><a class="header-anchor" href="#移除-filter" aria-hidden="true">#</a> 移除 filter</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173917433.png" alt="image-20220808173917433"></p>
<h4 id="teleport" tabindex="-1"><a class="header-anchor" href="#teleport" aria-hidden="true">#</a> Teleport</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173939272.png" alt="image-20220808173939272"></p>
<h4 id="suspense" tabindex="-1"><a class="header-anchor" href="#suspense" aria-hidden="true">#</a> Suspense</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174002376.png" alt="image-20220808174002376"></p>
<h4 id="composition-api" tabindex="-1"><a class="header-anchor" href="#composition-api" aria-hidden="true">#</a> Composition API</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174021740.png" alt="image-20220808174021740"></p>
<h3 id="watch-和-watcheffect-的区别" tabindex="-1"><a class="header-anchor" href="#watch-和-watcheffect-的区别" aria-hidden="true">#</a> watch 和 watchEffect 的区别</h3>
<ul>
<li>两者都可监听 data 属性变化</li>
<li>watch 需要明确监听哪个属性</li>
<li>watchEffect 会根据其中的属性, 自动监听其变化</li>
</ul>
<h3 id="setup-中如何获取组件实例" tabindex="-1"><a class="header-anchor" href="#setup-中如何获取组件实例" aria-hidden="true">#</a> setup 中如何获取组件实例</h3>
<ul>
<li>在 setup 和其他 Composition API 中没有 this</li>
<li>可通过 getCurrentInstance 获取当前实例</li>
<li>若使用 Options API 可照常使用 this</li>
</ul>
<h3 id="vue3-为何比-vue2-快" tabindex="-1"><a class="header-anchor" href="#vue3-为何比-vue2-快" aria-hidden="true">#</a> Vue3 为何比 Vue2 快</h3>
<ul>
<li>Proxy 响应式</li>
<li>PatchFlag</li>
<li>hoistStatic</li>
<li>cacheHandler</li>
<li>SSR 优化</li>
<li>tree-shaking</li>
</ul>
<h4 id="patchflag" tabindex="-1"><a class="header-anchor" href="#patchflag" aria-hidden="true">#</a> PatchFlag</h4>
<ul>
<li>编译模板时,动态节点做标记</li>
<li>标记,分为不同的类型,如 TEXT PROPS</li>
<li>diff 算法时，可以区分静态节点,以及不同类型的动态节点</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174120035.png" alt="image-20220808174120035"></p>
<h4 id="hoiststatic" tabindex="-1"><a class="header-anchor" href="#hoiststatic" aria-hidden="true">#</a> HoistStatic</h4>
<ul>
<li>将静态节点的定义,提升到父作用域,缓存起来</li>
<li>多个相邻的静态节点,会被合并起来</li>
<li>典型的拿空间换时间的优化策略</li>
</ul>
<p>将静态节点的定义,提升到父作用域,缓存起来</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174151576.png" alt="image-20220808174151576"></p>
<p>多个相邻的静态节点,会被合并起来<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174233992.png" alt="image-20220808174233992"></p>
<h4 id="cachehandler" tabindex="-1"><a class="header-anchor" href="#cachehandler" aria-hidden="true">#</a> CacheHandler</h4>
<ul>
<li>缓存事件</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174304798.png" alt="image-20220808174304798"></p>
<h4 id="ssr-优化" tabindex="-1"><a class="header-anchor" href="#ssr-优化" aria-hidden="true">#</a> SSR 优化</h4>
<ul>
<li>静态节点直接输出, 绕过了 vdom</li>
<li>动态节点, 还是需要动态渲染</li>
</ul>
<p>类似 HoistStatic</p>
<ul>
<li><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174327021.png" alt="image-20220808174327021"></li>
</ul>
<h4 id="tree-shaking-的优化" tabindex="-1"><a class="header-anchor" href="#tree-shaking-的优化" aria-hidden="true">#</a> Tree-shaking 的优化</h4>
<ul>
<li>编译时, 根据不同的情况,引入不同的 API</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174356872.png" alt="image-20220808174356872"></p>
<h3 id="vite-是什么" tabindex="-1"><a class="header-anchor" href="#vite-是什么" aria-hidden="true">#</a> Vite 是什么？</h3>
<ul>
<li>一个前端打包工具, Vue 作者发起的项目</li>
<li>借助 Vue 的影响力,发展较快,和 webpack 竞争</li>
<li>优势:开发环境下无需打包,启动快</li>
</ul>
<h3 id="vite-为什么启动非常快" tabindex="-1"><a class="header-anchor" href="#vite-为什么启动非常快" aria-hidden="true">#</a> Vite 为什么启动非常快</h3>
<ul>
<li>开发环境使用 ES6 Module， 无需打包一非常快</li>
<li>生产环境使用 rollup , 并不会快很多</li>
</ul>
<h4 id="es-module-在浏览器中的应用" tabindex="-1"><a class="header-anchor" href="#es-module-在浏览器中的应用" aria-hidden="true">#</a> ES Module 在浏览器中的应用</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174426879.png" alt="image-20220808174426879"></p>
<p>外链</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174448402.png" alt="image-20220808174448402"></p>
<p>远程引入</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174520247.png" alt="image-20220808174520247"></p>
<p>动态引入<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174540438.png" alt="image-20220808174540438"></p>
<h3 id="composition-api-和-react-hooks-的对比" tabindex="-1"><a class="header-anchor" href="#composition-api-和-react-hooks-的对比" aria-hidden="true">#</a> Composition API 和 React Hooks 的对比</h3>
<ul>
<li>前者 setup 只会被调用一次,而后者函数会被多次调用</li>
<li>前者无需 useMemo useCallback ,因为 setup 只调用一次</li>
<li>前者无需顾虑调用顺序, 而后者需要保证 hooks 的顺序一致</li>
<li>前者 reactive + ref 比后者 useState 要难理解</li>
</ul>
<h3 id="composition-api-给-vue-带来了什么" tabindex="-1"><a class="header-anchor" href="#composition-api-给-vue-带来了什么" aria-hidden="true">#</a> Composition API 给 Vue 带来了什么？</h3>
<ul>
<li>提高了组件的复用性和可读性</li>
</ul>
<h3 id="vue3-和-jsx-基本使用" tabindex="-1"><a class="header-anchor" href="#vue3-和-jsx-基本使用" aria-hidden="true">#</a> Vue3 和 JSX-基本使用</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>p @click<span class="token operator">=</span><span class="token string">"changeFlag"</span><span class="token operator">></span>Demo <span class="token punctuation">{</span><span class="token punctuation">{</span>flagRef<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>child a<span class="token operator">=</span><span class="token string">"abc"</span> v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"flagRef"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>child<span class="token operator">></span>
    <span class="token operator">&lt;</span>ul<span class="token operator">></span>
        <span class="token operator">&lt;</span>li v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"item in state.list"</span> <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"item"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> Child <span class="token keyword">from</span> <span class="token string">'./Child'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Demo'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> Child <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> flagRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

        <span class="token keyword">function</span> <span class="token function">changeFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            flagRef<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token operator">!</span>flagRef<span class="token punctuation">.</span>value
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            flagRef<span class="token punctuation">,</span>
            changeFlag<span class="token punctuation">,</span>
            state
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>ref<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> countRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
        <span class="token comment">// return ()=>{</span>
        <span class="token comment">//     return &lt;p>demo12 {countRef.value}&lt;/p></span>
        <span class="token comment">// }</span>
        <span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">&lt;</span>p<span class="token operator">></span>demo1<span class="token punctuation">.</span>vue <span class="token punctuation">{</span>countRef<span class="token punctuation">.</span>value<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span><span class="token comment">//jsx</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> render
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Child <span class="token keyword">from</span> <span class="token string">"./Child"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> flagRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">changeFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    flagRef<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token operator">!</span>flagRef<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"a1"</span><span class="token punctuation">,</span> <span class="token string">"b1"</span><span class="token punctuation">,</span> <span class="token string">"c1"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>p onClick<span class="token operator">=</span><span class="token punctuation">{</span>changeFlag<span class="token punctuation">}</span><span class="token operator">></span>demo1 <span class="token punctuation">{</span>flagRef<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
        <span class="token punctuation">{</span>flagRef<span class="token punctuation">.</span>value <span class="token operator">&amp;&amp;</span> <span class="token operator">&lt;</span>Child a<span class="token operator">=</span><span class="token punctuation">{</span>flagRef<span class="token punctuation">.</span>value<span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>Child<span class="token operator">></span><span class="token punctuation">}</span>

        <span class="token operator">&lt;</span>ul<span class="token operator">></span>
          <span class="token punctuation">{</span>state<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
            <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
          <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> render<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 1. setup 函数</span>
<span class="token comment">// 2. 组件的配置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token operator">&lt;</span>p<span class="token operator">></span>Child <span class="token punctuation">{</span>props<span class="token punctuation">.</span>a<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> render<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue3-和-jsx-jsx-和-template-的区别" tabindex="-1"><a class="header-anchor" href="#vue3-和-jsx-jsx-和-template-的区别" aria-hidden="true">#</a> Vue3 和 JSX-JSX 和 template 的区别</h3>
<ul>
<li>JSX 本质就是 js 代码, 可以使用 js 的任何能力</li>
<li>template 只能嵌入简单的 js 表达式,其他需要指令,如 v-if</li>
<li>JSX 已经成为 ES 规范, template 还是 Vue 自家规范</li>
<li>都会被编译为 js 代码( render 函数)</li>
</ul>
<h3 id="vue3-和-jsx-slot" tabindex="-1"><a class="header-anchor" href="#vue3-和-jsx-slot" aria-hidden="true">#</a> Vue3 和 JSX-slot</h3>
<h4 id="tabs-jsx" tabindex="-1"><a class="header-anchor" href="#tabs-jsx" aria-hidden="true">#</a> tabs-jsx</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>tabs <span class="token keyword">default</span><span class="token operator">-</span>active<span class="token operator">-</span>key<span class="token operator">=</span><span class="token string">"1"</span> @change<span class="token operator">=</span><span class="token string">"onTabsChange"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>tab<span class="token operator">-</span>panel key<span class="token operator">=</span><span class="token string">"1"</span> title<span class="token operator">=</span><span class="token string">"title1"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>div<span class="token operator">></span>tab panel content <span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tab<span class="token operator">-</span>panel<span class="token operator">></span>
        <span class="token operator">&lt;</span>tab<span class="token operator">-</span>panel key<span class="token operator">=</span><span class="token string">"2"</span> title<span class="token operator">=</span><span class="token string">"title2"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>div<span class="token operator">></span>tab panel content <span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tab<span class="token operator">-</span>panel<span class="token operator">></span>
        <span class="token operator">&lt;</span>tab<span class="token operator">-</span>panel key<span class="token operator">=</span><span class="token string">"3"</span> title<span class="token operator">=</span><span class="token string">"title3"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>div<span class="token operator">></span>tab panel content <span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tab<span class="token operator">-</span>panel<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>tabs<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> Tabs <span class="token keyword">from</span> <span class="token string">'./Tabs.jsx'</span>
<span class="token keyword">import</span> TabPanel <span class="token keyword">from</span> <span class="token string">'./TabPanel'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> Tabs<span class="token punctuation">,</span> TabPanel <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function">onTabsChange</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'tab changed'</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Tabs"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"defaultActiveKey"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">emits</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"change"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> children <span class="token operator">=</span> context<span class="token punctuation">.</span>slots<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> titles <span class="token operator">=</span> children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">panel</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> key<span class="token punctuation">,</span> title <span class="token punctuation">}</span> <span class="token operator">=</span> panel<span class="token punctuation">.</span>props <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        key<span class="token punctuation">,</span>
        title<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 当前 actKey</span>
    <span class="token keyword">const</span> actKey <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>defaultActiveKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">changeActKey</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      actKey<span class="token punctuation">.</span>value <span class="token operator">=</span> key<span class="token punctuation">;</span>
      context<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">"change"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// jsx</span>
    <span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div<span class="token operator">></span>
          <span class="token punctuation">{</span><span class="token comment">/* 渲染 buttons */</span><span class="token punctuation">}</span>
          <span class="token punctuation">{</span>titles<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">titleInfo</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> key<span class="token punctuation">,</span> title <span class="token punctuation">}</span> <span class="token operator">=</span> titleInfo<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>
              <span class="token operator">&lt;</span>button
                key<span class="token operator">=</span><span class="token punctuation">{</span>key<span class="token punctuation">}</span>
                style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> actKey<span class="token punctuation">.</span>value <span class="token operator">===</span> key <span class="token operator">?</span> <span class="token string">"blue"</span> <span class="token operator">:</span> <span class="token string">"#333"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
                onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">changeActKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">}</span>
              <span class="token operator">></span>
                <span class="token punctuation">{</span>title<span class="token punctuation">}</span>
              <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span>div<span class="token operator">></span>
          <span class="token punctuation">{</span>children<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">panel</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> key <span class="token punctuation">}</span> <span class="token operator">=</span> panel<span class="token punctuation">.</span>props <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>actKey<span class="token punctuation">.</span>value <span class="token operator">===</span> key<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 匹配上 key ，则显示</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 否则，隐藏</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> render<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>slot<span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'TabPanel'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'key'</span><span class="token punctuation">,</span> <span class="token string">'title'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用-jsx-实现作用域-slot" tabindex="-1"><a class="header-anchor" href="#使用-jsx-实现作用域-slot" aria-hidden="true">#</a> 使用 JSX 实现作用域 slot</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Child <span class="token keyword">from</span> <span class="token string">"./Child"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>p<span class="token operator">></span>msg<span class="token operator">:</span> <span class="token punctuation">{</span>msg<span class="token punctuation">}</span> <span class="token number">123123</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>p<span class="token operator">></span>Demo <span class="token operator">-</span> <span class="token constant">JSX</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
        <span class="token operator">&lt;</span>Child render<span class="token operator">=</span><span class="token punctuation">{</span>render<span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>Child<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"render"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msgRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">"作用域插槽 Child - JSX"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">{</span>props<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>msgRef<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue3-script-setup" tabindex="-1"><a class="header-anchor" href="#vue3-script-setup" aria-hidden="true">#</a> Vue3-script-setup</h3>
<h4 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h4>
<ul>
<li>顶级变量、自定义组件, 可以直接用于模板</li>
<li>可正常使用 ref， reactive， computed 等能力</li>
<li>和其他 <code v-pre>&lt;script&gt;</code> 同时使用</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>script setup<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> reactive<span class="token punctuation">,</span> toRefs<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> Child1 <span class="token keyword">from</span> <span class="token string">'./Child1'</span>
<span class="token keyword">import</span> Child2 <span class="token keyword">from</span> <span class="token string">'./Child2'</span>
<span class="token keyword">import</span> Child3 <span class="token keyword">from</span> <span class="token string">'./Child3'</span>

<span class="token keyword">const</span> countRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">addCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    countRef<span class="token punctuation">.</span>value<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'双越'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">toRefs</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">onChange</span><span class="token punctuation">(</span><span class="token parameter">info</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'on change'</span><span class="token punctuation">,</span> info<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">onDelete</span><span class="token punctuation">(</span><span class="token parameter">info</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'on delete'</span><span class="token punctuation">,</span> info<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> child3Ref <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 拿到 Child3 组件的一些数据</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>child3Ref<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>child3Ref<span class="token punctuation">.</span>value<span class="token punctuation">.</span>a<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>child3Ref<span class="token punctuation">.</span>value<span class="token punctuation">.</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>p @click<span class="token operator">=</span><span class="token string">"addCount"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>countRef<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>child<span class="token operator">-</span><span class="token number">1</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>child<span class="token operator">-</span><span class="token number">1</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>hr<span class="token operator">></span>

    <span class="token operator">&lt;</span>child<span class="token operator">-</span><span class="token number">2</span> <span class="token operator">:</span>name<span class="token operator">=</span><span class="token string">"name"</span> <span class="token operator">:</span>age<span class="token operator">=</span><span class="token string">"countRef"</span> @change<span class="token operator">=</span><span class="token string">"onChange"</span> @<span class="token keyword">delete</span><span class="token operator">=</span><span class="token string">"onDelete"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>child<span class="token operator">-</span><span class="token number">2</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>hr<span class="token operator">></span>

    <span class="token operator">&lt;</span>child<span class="token operator">-</span><span class="token number">3</span> ref<span class="token operator">=</span><span class="token string">"child3Ref"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>child<span class="token operator">-</span><span class="token number">3</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="defineprops-和-defineemits" tabindex="-1"><a class="header-anchor" href="#defineprops-和-defineemits" aria-hidden="true">#</a> defineProps 和 defineEmits</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script setup<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineProps<span class="token punctuation">,</span> defineEmits <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token comment">// 定义属性</span>
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> Number
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 定义事件</span>
<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token string">'delete'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">deleteHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'delete'</span><span class="token punctuation">,</span> <span class="token string">'aaa'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>Child2 <span class="token operator">-</span> name<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>age<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"$emit('change', 'bbb')"</span><span class="token operator">></span>change<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"deleteHandler"</span><span class="token operator">></span><span class="token keyword">delete</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="defineexpose" tabindex="-1"><a class="header-anchor" href="#defineexpose" aria-hidden="true">#</a> defineExpose</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script setup<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> defineExpose <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">101</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">201</span>

<span class="token function">defineExpose</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    a<span class="token punctuation">,</span>
    b
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>Child3<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


