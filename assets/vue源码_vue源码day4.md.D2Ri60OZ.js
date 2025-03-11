import{_ as s,c as a,o as n,a3 as p}from"./chunks/framework.47i9LX9H.js";const g=JSON.parse('{"title":"1. watch 和 computed 的区别","description":"","frontmatter":{},"headers":[],"relativePath":"vue源码/vue源码day4.md","filePath":"vue源码/vue源码day4.md"}'),e={name:"vue源码/vue源码day4.md"},l=p(`<blockquote><p>今天主要来学习watch和ref的具体实现。下面代码示例部分只做参考，具体完整代码可以在<a href="https://gitee.com/l544402029/vue3-source-code" target="_blank" rel="noreferrer">vue3源码解读: 手写vue3核心源码，内含详细解读 (gitee.com)</a>内查看。</p></blockquote><h1 id="_1-watch-和-computed-的区别" tabindex="-1">1. watch 和 computed 的区别 <a class="header-anchor" href="#_1-watch-和-computed-的区别" aria-label="Permalink to &quot;1. watch 和 computed 的区别&quot;">​</a></h1><ol><li>computed 目的在于计算新值，有缓存</li><li>watch 目的在于监控属性的变化做某一件事</li></ol><h1 id="_2-watch监听简单类型为什么要包装成方法" tabindex="-1">2. watch监听简单类型为什么要包装成方法？ <a class="header-anchor" href="#_2-watch监听简单类型为什么要包装成方法" aria-label="Permalink to &quot;2. watch监听简单类型为什么要包装成方法？&quot;">​</a></h1><p>因为如果直接写 state.firstName 的话，取的是字符串，无法监听，所以需要包装成方法，利用effect触发依赖收集。</p><h1 id="_3-watch-核心实现" tabindex="-1">3. watch 核心实现 <a class="header-anchor" href="#_3-watch-核心实现" aria-label="Permalink to &quot;3. watch 核心实现&quot;">​</a></h1><h2 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-label="Permalink to &quot;代码&quot;">​</a></h2><p>js/reactivity/watch.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function traverse(source, seen = new Set()) {</span></span>
<span class="line"><span>    if (!isObject(source)) {</span></span>
<span class="line"><span>        return source</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 对象嵌套互相引用，如果已经有了，直接返回</span></span>
<span class="line"><span>    if (seen.has(source)) {</span></span>
<span class="line"><span>        return source</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    seen.add(source)</span></span>
<span class="line"><span>    for (let k in source) {</span></span>
<span class="line"><span>        // 这里访问了对象中得1所有属性，触发依赖收集</span></span>
<span class="line"><span>        traverse(source[k], seen)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return source</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function watch(source, cb, options) {</span></span>
<span class="line"><span>    doWatch(source, cb, options)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function doWatch(source, cb, options) {</span></span>
<span class="line"><span>    let getter</span></span>
<span class="line"><span>    if (isReactive(source)) {</span></span>
<span class="line"><span>        // 要进行依赖收集</span></span>
<span class="line"><span>        getter = () =&gt; traverse(source)</span></span>
<span class="line"><span>    } else if (isFunction(source)) {</span></span>
<span class="line"><span>        getter = source</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    let oldValue</span></span>
<span class="line"><span>    let clean</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const onCleanup = (fn) =&gt; {</span></span>
<span class="line"><span>        clean = fn</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    const job = () =&gt; {</span></span>
<span class="line"><span>        if (cb) {</span></span>
<span class="line"><span>            if (clean) clean()</span></span>
<span class="line"><span>            const newValue = effect.run()</span></span>
<span class="line"><span>            cb(newValue, oldValue, onCleanup)</span></span>
<span class="line"><span>            oldValue = newValue</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            effect.run()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    const effect = new ReactiveEffect(getter, job)</span></span>
<span class="line"><span>    if (options &amp;&amp; options.immediate) {</span></span>
<span class="line"><span>        job()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    oldValue = effect.run()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="_4-竟态问题" tabindex="-1">4. 竟态问题 <a class="header-anchor" href="#_4-竟态问题" aria-label="Permalink to &quot;4. 竟态问题&quot;">​</a></h1><h2 id="问题场景" tabindex="-1">问题场景 <a class="header-anchor" href="#问题场景" aria-label="Permalink to &quot;问题场景&quot;">​</a></h2><p>考虑这么一个场景，有一个搜索框，如百度搜索框，实时监听输入内容请求接口。我们发送了3次请求，第一个请求接口耗时3s返回， 第二个请求耗时2s返回，第三个请求耗时1s返回，如果我们不作处理，那么必然返回第一个请求接口的内容。而我们实际需要的是第三个请求内容。</p><p>watch 的解决方案就是如果有新请求进来就清空上次的操作。这个原理类似于防抖。</p><h2 id="自行实现" tabindex="-1">自行实现 <a class="header-anchor" href="#自行实现" aria-label="Permalink to &quot;自行实现&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let timer = 4000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function getData(data) {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        setTimeout(() =&gt; {</span></span>
<span class="line"><span>            resolve(data);</span></span>
<span class="line"><span>        }, (timer -= 1000));</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let arr = []; // 用于存储上一次的清理操作</span></span>
<span class="line"><span>// 什么是闭包?</span></span>
<span class="line"><span>// 我定义函数的作用域与执行函数的作用域不是同一个</span></span>
<span class="line"><span>watch(</span></span>
<span class="line"><span>    () =&gt; state.age,</span></span>
<span class="line"><span>    async function (newVal, oldVal, onCleanup) {</span></span>
<span class="line"><span>        // 自行实现</span></span>
<span class="line"><span>        // while (arr.length &gt; 0) {</span></span>
<span class="line"><span>        //   let fn = arr.shift();</span></span>
<span class="line"><span>        //   fn();</span></span>
<span class="line"><span>        // }</span></span>
<span class="line"><span>        let flag = true;</span></span>
<span class="line"><span>        arr.push(function () {</span></span>
<span class="line"><span>            flag = false</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>        let r = await getData(newVal);</span></span>
<span class="line"><span>        flag &amp;&amp; (app.innerHTML = r);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        flush: &quot;sync&quot;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>state.age = 100; // 请求3s返回 100</span></span>
<span class="line"><span>state.age = 200; // 请求2s返回 200</span></span>
<span class="line"><span>state.age = 300; // 请求1s返回 300</span></span></code></pre></div><p>首先第一次进来, arr.length 为 0， 不会执行 while， 接着定义 flag 为 true。添加闭包函数放入数组，函数内执行 flag 为 false。 接着等待 getData 异步返回。接着下次请求进来，执行了上次闭包函数将第一次的 flag 变为 false。 等到同步代码执行完成， 异步开始执行 第一次的 flag 已经变为 false， 就不会执行接下来的操作了。</p><p>简单来说， 就是每个回调有自己的 flag，当执行下一个回调 改变上一个 flag 状态。</p><h2 id="源码实现" tabindex="-1">源码实现 <a class="header-anchor" href="#源码实现" aria-label="Permalink to &quot;源码实现&quot;">​</a></h2><p>js/reactivity/watch.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let clean</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const onCleanup = (fn) =&gt; {</span></span>
<span class="line"><span>    clean = fn</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const job = () =&gt; {</span></span>
<span class="line"><span>    if (cb) {</span></span>
<span class="line"><span>        if (clean) clean()</span></span>
<span class="line"><span>        const newValue = effect.run()</span></span>
<span class="line"><span>        cb(newValue, oldValue, onCleanup)</span></span>
<span class="line"><span>        oldValue = newValue</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        effect.run()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="步骤图" tabindex="-1">步骤图 <a class="header-anchor" href="#步骤图" aria-label="Permalink to &quot;步骤图&quot;">​</a></h2><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224092851424.png" alt="image-20250224092851424"></p><p>如果 getData 这一步为同步就不行了， 如果实际开发中，请把它包装成异步代码。</p><h1 id="_5-watcheffect" tabindex="-1">5. watchEffect <a class="header-anchor" href="#_5-watcheffect" aria-label="Permalink to &quot;5. watchEffect&quot;">​</a></h1><p>其实watchEffect 就是 effect。基于 watch 进行实现。</p><p>js/reactivity/watch.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export function watchEffect(effect, options) {</span></span>
<span class="line"><span>    doWatch(effect, null, options)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="_6-ref-的实现" tabindex="-1">6. ref 的实现 <a class="header-anchor" href="#_6-ref-的实现" aria-label="Permalink to &quot;6. ref 的实现&quot;">​</a></h1><h2 id="核心源码" tabindex="-1">核心源码 <a class="header-anchor" href="#核心源码" aria-label="Permalink to &quot;核心源码&quot;">​</a></h2><p>js/reactivity/ref.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import {toReactive} from &quot;./reactive.js&quot;;</span></span>
<span class="line"><span>import {activeEffect} from &quot;./effect.js&quot;;</span></span>
<span class="line"><span>import {trackEffects, triggerEffects} from &quot;./handler.js&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function ref(value) {</span></span>
<span class="line"><span>    return new RefImpl(value)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class RefImpl {</span></span>
<span class="line"><span>    // 内部采用类的属性访问器 -》 Object.defineProperty</span></span>
<span class="line"><span>    constructor(rawValue) {</span></span>
<span class="line"><span>        this.rawValue = rawValue</span></span>
<span class="line"><span>        this._value = toReactive(rawValue)</span></span>
<span class="line"><span>        this.dep = new Set()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    get value() {</span></span>
<span class="line"><span>        if (activeEffect) {</span></span>
<span class="line"><span>            trackEffects(this.dep)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return this._value</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    set value(newValue) {</span></span>
<span class="line"><span>        if (newValue !== this.rawValue) {</span></span>
<span class="line"><span>            this.rawValue = newValue</span></span>
<span class="line"><span>            this._value = toReactive(newValue)</span></span>
<span class="line"><span>            triggerEffects(this.dep)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ref 代理的实现</span></span>
<span class="line"><span>class ObjectRefImpl {</span></span>
<span class="line"><span>    constructor(object, key) {</span></span>
<span class="line"><span>        this.object = object</span></span>
<span class="line"><span>        this.key = key</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    get value() {</span></span>
<span class="line"><span>        return this.object[this.key]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    set value(newValue) {</span></span>
<span class="line"><span>        this.object[this.key] = newValue</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function toRef(object, key) {</span></span>
<span class="line"><span>    return new ObjectRefImpl(object, key)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function toRefs(object) {</span></span>
<span class="line"><span>    const ret = {}</span></span>
<span class="line"><span>    for (const key in object) {</span></span>
<span class="line"><span>        ret[key] = toRef(object, key)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return ret</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="_7-reactive-readonly" tabindex="-1">7. reactive，readonly <a class="header-anchor" href="#_7-reactive-readonly" aria-label="Permalink to &quot;7. reactive，readonly&quot;">​</a></h1><p>vue3中reactive 有几种变体 reactive shallowReactive readonly() shallowReadonly</p><p>被readonly代理过的，再被reactive进行代理直接返回readonly的结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// let obj = { name: &#39;jw&#39; };</span></span>
<span class="line"><span>// let proxy1 = readonly(obj); // 由于仅读属性无法修改。就算包了reactive也无意义</span></span>
<span class="line"><span>// let proxy2 = reactive(proxy1);  // 如果对象已经是仅读的代理还有意义吗</span></span>
<span class="line"><span>// console.log(proxy1 === proxy2); // true</span></span></code></pre></div><p>如果调用过reactive后，依然可以调用readonly</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let obj = { name: &#39;jw&#39; };</span></span>
<span class="line"><span>readonly(reactive(obj)); // 如果调用过reactive后，依然可以调用readonly</span></span></code></pre></div><h1 id="_8-真实源码探索" tabindex="-1">8. 真实源码探索 <a class="header-anchor" href="#_8-真实源码探索" aria-label="Permalink to &quot;8. 真实源码探索&quot;">​</a></h1><p>src/6.example.html</p><ol><li>收集索引</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import {computed, reactive, watchEffect, effect, watch, ref, toRef, toRefs} from &quot;../js/vue.esm-browser.prod.js&quot;</span></span>
<span class="line"><span>const arr = reactive([1])</span></span>
<span class="line"><span>effect(() =&gt; {</span></span>
<span class="line"><span>    // 通过索引可以访问收集依赖，track arr 0</span></span>
<span class="line"><span>    console.log(arr[3]) // 这里没有收集length</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>arr[0] = 2 // 收集的arr[3], 触发不了依赖更新</span></span>
<span class="line"><span>arr.length = 0 // 修改长度要触发索引的触发 改的是length（真实源码内更新length也会触发依赖更新）</span></span>
<span class="line"><span>// arr[3] = 1</span></span></code></pre></div><p>2）长度收集</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const arr = reactive([1])</span></span>
<span class="line"><span>effect(() =&gt; {</span></span>
<span class="line"><span>    // 通过索引访问可以收集依赖</span></span>
<span class="line"><span>    console.log(arr.length)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>arr[100] = 2 // 修改索引, 如果添加应该触发长度更新</span></span></code></pre></div><ol start="3"><li>数组方法</li></ol><p>访问变异方法会访问数组的长度，会对长度进行依赖，这里我们停止收集调用方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    const arr = reactive([])</span></span>
<span class="line"><span>    effect(() =&gt; {</span></span>
<span class="line"><span>        console.log(&#39;effect1&#39;)</span></span>
<span class="line"><span>        arr.push({}) // 会收集length</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    effect(() =&gt; {</span></span>
<span class="line"><span>        console.log(&#39;effect2&#39;)</span></span>
<span class="line"><span>        arr.push({}) // 会收集length 相互更新对方依赖死循环</span></span>
<span class="line"><span>        // 解决方案就是在effect这里边对length不收集</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    arr.push(1) // 修改length</span></span></code></pre></div><h1 id="_9-拆包" tabindex="-1">9. 拆包 <a class="header-anchor" href="#_9-拆包" aria-label="Permalink to &quot;9. 拆包&quot;">​</a></h1><p>src/5.ref.html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    const state1 = reactive({</span></span>
<span class="line"><span>        name: &#39;jw&#39;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    const state2 = reactive({</span></span>
<span class="line"><span>        age: 30</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    const r = proxyRefs({...toRefs(state1), ...toRefs(state2)})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    watchEffect(() =&gt; {</span></span>
<span class="line"><span>        app.innerHTML = r.name.value + r.age.value</span></span>
<span class="line"><span>    })</span></span></code></pre></div><p>js/reactivity/ref.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// ref 代理的实现</span></span>
<span class="line"><span>class ObjectRefImpl {</span></span>
<span class="line"><span>    constructor(object, key) {</span></span>
<span class="line"><span>        this.object = object</span></span>
<span class="line"><span>        this.key = key</span></span>
<span class="line"><span>        this.__v_isRef = true</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    get value() {</span></span>
<span class="line"><span>        // 类似 vue2 的 _data</span></span>
<span class="line"><span>        return this.object[this.key]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    set value(newValue) {</span></span>
<span class="line"><span>        this.object[this.key] = newValue</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function toRef(object, key) {</span></span>
<span class="line"><span>    return new ObjectRefImpl(object, key)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function toRefs(object) {</span></span>
<span class="line"><span>    const ret = {}</span></span>
<span class="line"><span>    for (const key in object) {</span></span>
<span class="line"><span>        ret[key] = toRef(object, key)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return ret</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function proxyRefs(target) {</span></span>
<span class="line"><span>    return new Proxy(target, {</span></span>
<span class="line"><span>        get(target, key, receiver) {</span></span>
<span class="line"><span>            let r = Reflect.get(target, key, receiver)</span></span>
<span class="line"><span>            // 每个响应式对象都有 __v_isRef 属性， 如果有则去取下边的value， 没有则直接取本身</span></span>
<span class="line"><span>            return r.__v_isRef ? r.value : r</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        set(target, key, value, receiver) {</span></span>
<span class="line"><span>            const oldValue = target[key]</span></span>
<span class="line"><span>            if (oldValue.__v_isRef) {</span></span>
<span class="line"><span>                oldValue.value = value</span></span>
<span class="line"><span>                return true</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                return Reflect.set(target, key, value, receiver)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>toRefs 相当于代理了 reactive 对象，取它的值就相当于是取 reactive 的值， 这一点和 vue2 中的 this.xx 代理 this.data.xx 很像， this.xx 就去找 this.data.xx 内的属性。</p><p>拆包也是类似的，如果访问响应式对象，就去取它下边的value，设置同理。这也就是我们为什么不用在模板中加.value。</p>`,53),t=[l];function c(i,o,r,h,u,d){return n(),a("div",null,t)}const v=s(e,[["render",c]]);export{g as __pageData,v as default};
