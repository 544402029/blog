import{_ as s,c as a,o as i,a3 as n}from"./chunks/framework.47i9LX9H.js";const o=JSON.parse('{"title":"1. 修改属性需要每次都更新吗？","description":"","frontmatter":{},"headers":[],"relativePath":"vue源码/vue源码day3.md","filePath":"vue源码/vue源码day3.md"}'),p={name:"vue源码/vue源码day3.md"},e=n(`<blockquote><p>今天主要来学习计算属性的具体实现。下面代码示例部分只做参考，具体完整代码可以在<a href="https://gitee.com/l544402029/vue3-source-code" target="_blank" rel="noreferrer">vue3源码解读: 手写vue3核心源码，内含详细解读 (gitee.com)</a>内查看。</p></blockquote><h1 id="_1-修改属性需要每次都更新吗" tabindex="-1">1. 修改属性需要每次都更新吗？ <a class="header-anchor" href="#_1-修改属性需要每次都更新吗" aria-label="Permalink to &quot;1. 修改属性需要每次都更新吗？&quot;">​</a></h1><p>src/1.reactive.html</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { reactive, effect } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;../js/reactivity&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;jw&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  age: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  address: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;zz&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  user: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    post: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;qd&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  flag: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> state2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> state3</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(state2);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> runner</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;runner&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        app.innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> state3.name;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// state3.name = 1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// state3.name = 2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// state3.name = 3</span></span></code></pre></div><p>如上代码所示，我们修改了3次 name 属性，如果不作任何处理一定会更新3次，而只有最后一次结果是我们需要的，这样无疑是浪费性能的。我们需要把它们进行合并更新。</p><p>js/reactivity/effect.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let isFlushing = false;</span></span>
<span class="line"><span>const runner = effect(</span></span>
<span class="line"><span>    () =&gt; {</span></span>
<span class="line"><span>        console.log(&quot;runner&quot;);</span></span>
<span class="line"><span>        // state3.user 如果这个也是对象，我们应该针对这个对象进行代理</span></span>
<span class="line"><span>        // 懒代理</span></span>
<span class="line"><span>        app.innerHTML = state3.name;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        //     调度执行</span></span>
<span class="line"><span>        scheduler() {// effect.run()</span></span>
<span class="line"><span>            if (!isFlushing) {</span></span>
<span class="line"><span>                Promise.resolve().then(() =&gt; {</span></span>
<span class="line"><span>                    //     异步更新</span></span>
<span class="line"><span>                    runner();</span></span>
<span class="line"><span>                    isFlushing = false;</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>                isFlushing = true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>);</span></span></code></pre></div><p>js/reactivity/handler.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> triggerEffects</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">effects</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (effects) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    effects </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">effects];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    effects.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 当前正在执行的和现在正要执行的是同一个我就屏蔽掉</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (activeEffect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> effect) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (effect.scheduler) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // 有 scheduler 应该先执行 scheduler</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          effect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">scheduler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          effect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 里边有删除 + 添加的逻辑</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>我们可以把是否渲染的逻辑交给用户，首先定义了isFlushing 是否更新变量，在 effect 函数第二个参数传入对象。</p><p>scheduler 是用户自定义的渲染逻辑，如果用户传入 scheduler 优先执行 scheduler，执行 scheduler 的同时，将 isFlushing 状态改为正在更新，这样下次更新 state3.name 不会再次进入，利用 promise 异步的方式执行 effect.run() 重新渲染，这时候同步代码已经执行完毕了， name 渲染出来的就只能是3了。</p><p>这个原理类似于防抖，只执行最后一次的结果。</p><h1 id="_2-深度代理" tabindex="-1">2 深度代理 <a class="header-anchor" href="#_2-深度代理" aria-label="Permalink to &quot;2 深度代理&quot;">​</a></h1><p>src/1.reactive.html</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    user: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        post: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;qd&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> state3</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(state2);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> runner</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;runner&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // state3.user 如果这个也是对象，我们应该针对这个对象进行代理</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 懒代理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        app.innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> state3.user.post;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">state3.user.post </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hd&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>由于我们只做了一层代理，访问 state3.user 和 修改 state3,user 是可以更新的，也就是说 <code>state3.user = {post:&#39;ad&#39;}</code> 是可以更新的。</p><p>如果对象的属性内有对象， 我们也应该针对于这个对象进行代理。这也是一个懒代理，也就是说只有读取到这个属性才进行代理，还没被读取的时候是不进行代理的。</p><p>js/reactivity/handler.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, key, receiver) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 走到这里说明已经是代理对象, 可返回true</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ReactiveFlags.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IS_REACTIVE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // console.log(&#39;取值的时候关联effect&#39;)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  track</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, key);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Reflect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, key, receiver);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(result)) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 如果取到的是对象，则需要继续将这个对象作为代理对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(result);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span></code></pre></div><h1 id="_3-effect-是什么" tabindex="-1">3. effect 是什么？ <a class="header-anchor" href="#_3-effect-是什么" aria-label="Permalink to &quot;3. effect 是什么？&quot;">​</a></h1><p>effect 是 vue 比较偏底层的方法，我们常用的 computed, watch, watchEffect 都是基于 effect 去实现的，就像搭积木一样。</p><h1 id="_4-计算属性的特点" tabindex="-1">4. 计算属性的特点 <a class="header-anchor" href="#_4-计算属性的特点" aria-label="Permalink to &quot;4. 计算属性的特点&quot;">​</a></h1><ul><li>1） 不访问这个属性就不计算</li><li>2） 计算属性得有同步的返回值，不能异步</li><li>3） 如果依赖的值不变也不重新计算</li><li>4） 计算属性不能修改本身的值，可以去修改其它属性</li><li>5） 可以在模板中使用</li></ul><h1 id="_5-计算属性实现" tabindex="-1">5. 计算属性实现 <a class="header-anchor" href="#_5-计算属性实现" aria-label="Permalink to &quot;5. 计算属性实现&quot;">​</a></h1><h2 id="核心实现代码" tabindex="-1">核心实现代码 <a class="header-anchor" href="#核心实现代码" aria-label="Permalink to &quot;核心实现代码&quot;">​</a></h2><p>src/2.computed.html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const state = reactive({</span></span>
<span class="line"><span>  firstName: &quot;j&quot;,</span></span>
<span class="line"><span>  lastName: &quot;w&quot;,</span></span>
<span class="line"><span>  age: 30,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>const fullName = computed({</span></span>
<span class="line"><span>  get: () =&gt; {</span></span>
<span class="line"><span>    console.log(&quot;computed&quot;);</span></span>
<span class="line"><span>    return state.firstName + state.lastName;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  set: (val) =&gt; {</span></span>
<span class="line"><span>    console.log(val);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 计算属性也是一个effect， 依赖的状态会收集计算属性的 effect</span></span>
<span class="line"><span>// 计算属性会触发它收集的 effect</span></span>
<span class="line"><span></span></span>
<span class="line"><span>effect(() =&gt; {</span></span>
<span class="line"><span>  // 计算属性也可以收集effect</span></span>
<span class="line"><span>  console.log(&quot;计算属性也可以收集effect&quot;);</span></span>
<span class="line"><span>  // 多次获取计算属性，依赖属性未发生变化，只计算一次（this._dirty的作用）</span></span>
<span class="line"><span>  console.log(fullName.value);</span></span>
<span class="line"><span>  console.log(fullName.value);</span></span>
<span class="line"><span>  console.log(fullName.value);</span></span>
<span class="line"><span>  console.log(fullName.value);</span></span></code></pre></div><p>js/reactivity/computed.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 计算属性是一个effect，会让 getter 中的属性去收集这个 effect</span></span>
<span class="line"><span>this.effect = new ReactiveEffect(getter, () =&gt; {</span></span>
<span class="line"><span>    //   ...</span></span>
<span class="line"><span>    this._dirty = true // 让计算属性标记为脏值</span></span>
<span class="line"><span>    // 当 getter 触发依赖更新的时候，也重新触发 计算属性 的依赖更新</span></span>
<span class="line"><span>    triggerEffects(this.dep)</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>get value() {</span></span>
<span class="line"><span>    if (activeEffect) {</span></span>
<span class="line"><span>        //   value =&gt; [effect, effect, effect]</span></span>
<span class="line"><span>        trackEffects(this.dep)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (this._dirty) {</span></span>
<span class="line"><span>        this._dirty = false;</span></span>
<span class="line"><span>        // 取值让 getter 执行拿到返回值，作为计算属性旳值</span></span>
<span class="line"><span>        // 当取计算属性的时候, 让 getter 执行触发依赖收集</span></span>
<span class="line"><span>        this._value = this.effect.run();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return this._value;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>计算属性就是一个 effect， 在执行 effect 的时候，读取计算属性触发 get 访问器，将当前 activeEffect 加入到当前计算属性的依赖里。 在计算属性 get 方法内部依赖触发更新时，我们也让计算属性触发依赖更新。</p><h2 id="计算属性的不同点" tabindex="-1">计算属性的不同点 <a class="header-anchor" href="#计算属性的不同点" aria-label="Permalink to &quot;计算属性的不同点&quot;">​</a></h2><p>计算属性的不同点是在于 值对应effect， 而不是对象属性对应 effect</p><p>对象名字对应effect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Map1 = {({name: &#39;jw&#39;,age:30}):Map2}</span></span>
<span class="line"><span>Map2 = {name: new Set([effect, effect])}</span></span></code></pre></div><p>计算属性对应effect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>value =&gt; [effect, effect, effect]</span></span></code></pre></div><h2 id="多次获取计算属性" tabindex="-1">多次获取计算属性 <a class="header-anchor" href="#多次获取计算属性" aria-label="Permalink to &quot;多次获取计算属性&quot;">​</a></h2><p>多次获取计算属性，依赖属性未发生变化，只计算一次（this._dirty的作用）</p><p>在创建计算属性的时候，增加 <code>_dirty</code> 变量记录是否为脏值，第一次取值为 fasle, 执行 计算属性的 get 方法，然后将它改为 false, 当第二次进来因为 false 就不会再执行了。只有 get 内部的依赖触发重新更新时，将它再改为 true，这时候就又能执行了。</p><p>​</p>`,40),l=[e];function t(h,k,c,r,E,d){return i(),a("div",null,l)}const y=s(p,[["render",t]]);export{o as __pageData,y as default};
