<template><div><h1 id="vue-使用" tabindex="-1"><a class="header-anchor" href="#vue-使用" aria-hidden="true">#</a> vue 使用</h1>
<h2 id="搭建项目" tabindex="-1"><a class="header-anchor" href="#搭建项目" aria-hidden="true">#</a> 搭建项目</h2>
<p>首先需要安装 node，git</p>
<p>创建码云仓库</p>
<h4 id="生成公钥" tabindex="-1"><a class="header-anchor" href="#生成公钥" aria-hidden="true">#</a> 生成公钥</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ssh-keygen -t rsa -C "544402029@qq.com"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>和码云注册邮箱地址一样</p>
<h4 id="获取公钥" tabindex="-1"><a class="header-anchor" href="#获取公钥" aria-hidden="true">#</a> 获取公钥</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat ~/.ssh/id_rsa.pub
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="添加公钥" tabindex="-1"><a class="header-anchor" href="#添加公钥" aria-hidden="true">#</a> 添加公钥</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090910386.png" alt="image-20220805090910386"></p>
<h4 id="克隆仓库" tabindex="-1"><a class="header-anchor" href="#克隆仓库" aria-hidden="true">#</a> 克隆仓库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone git@gitee.com:l544402029/Travel.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="创建-vue" tabindex="-1"><a class="header-anchor" href="#创建-vue" aria-hidden="true">#</a> 创建 vue</h4>
<p>安装脚手架</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install -g @vue/cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建 vue 项目</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vue create Travel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="推送到远程仓库" tabindex="-1"><a class="header-anchor" href="#推送到远程仓库" aria-hidden="true">#</a> 推送到远程仓库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git add .
git commit -m 'init project'
git push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mvvm-模式" tabindex="-1"><a class="header-anchor" href="#mvvm-模式" aria-hidden="true">#</a> MVVM 模式</h2>
<h3 id="mvp-模式" tabindex="-1"><a class="header-anchor" href="#mvp-模式" aria-hidden="true">#</a> MVP 模式</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090929624.png" alt="image-20220805090929624"></p>
<p>首先我们要了解一下 MVP 模式， 代码分为三层。 Model 层（也就是我们所说的数据层）， Presenter 呈现层(业务逻辑相关的控制层)， View 层（视图层，页面上的 DOM 展示）。</p>
<p>当我们视图上的按钮被点击时， 控制器里的代码会执行， 控制器里面的代码负责了所有的业务逻辑。控制器可以去调用模型层去发<code v-pre>ajax</code>请求，或者控制器处理业务逻辑之后， 控制器会通过<code v-pre>DOM</code>操作再来改变视图。</p>
<p>使用 MVP 模式我们大部分代码都是操作 DOM。可以说是面向 DOM 开发。</p>
<h3 id="mvvm-模式-1" tabindex="-1"><a class="header-anchor" href="#mvvm-模式-1" aria-hidden="true">#</a> MVVM 模式</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090942901.png" alt="image-20220805090942901"></p>
<p>MVVM 模式也有 Model 层来存储数据， 有 View（视图层）来显示数据， 但是没有 Presenter（控制器）层， 它有一个 ViewModel 层。ViewModel 层不需要我们自己编写， 它是 vue 自带的。</p>
<p>使用 MVVM 模式， 我们不需要关注 ViewModel 层， 它是 vue 内置的。我们只需要关注 View 层和 Model 层。对于 MVVM 模式， 编码的重点一部分是在 View 层， 一部分是在 Model 层。 使用这种模式大部分是在操作数据， DOM 操作大大减少， 减少了代码量， 可是说是面向数据开发。</p>
<p>在我们更改视图或者操作数据的时候，vm 层会对相应数据或者视图进行更新，不进行 dom 操作，在 vm 层中的实现主要使用了 es5 的<code v-pre>Object.defineProperty()</code>和虚拟 dom 的一个机制。</p>
<h4 id="关键点" tabindex="-1"><a class="header-anchor" href="#关键点" aria-hidden="true">#</a> 关键点：</h4>
<ol>
<li>mvvm 和 mvp 都是前端的设计模式，都是前后端分离后所特有的模式</li>
<li>前后端分离前是 mvc 模式，主要业务逻辑集中在后端，连页面的渲染都是在后端</li>
<li>mvvm 和 mvp 其实都是取代了 mvc 中的 v，即后端不需要渲染页面了，而是把需要渲染给页面的数据以 json 形式传给前端 mvvm 或 mvp 中的 m，vm 或 p 再把这些数据传给 v 进行页面渲染</li>
<li>由于前端渲染会降低 SEO，所以网站首页可以采取后端渲染</li>
</ol>
<h2 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h2>
<p>组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。</p>
<h3 id="组件间传值" tabindex="-1"><a class="header-anchor" href="#组件间传值" aria-hidden="true">#</a> 组件间传值</h3>
<h4 id="子组件向父组件传值" tabindex="-1"><a class="header-anchor" href="#子组件向父组件传值" aria-hidden="true">#</a> 子组件向父组件传值</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091003354.png" alt="image-20220805091003354"></p>
<p>在子组件接受父组件传过来的值时， 只能用但是不能来修改。 之所以有这样一个单向数据流的概念， 是因为父组件传过来的值有可能被其他组件使用。你修改了这个子组件的数据， 不仅影响这个组件， 有可能对其他组件造成影响。</p>
<h4 id="非父子组件传值" tabindex="-1"><a class="header-anchor" href="#非父子组件传值" aria-hidden="true">#</a> 非父子组件传值</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091026417.png" alt="image-20220805091026417"></p>
<h3 id="vue-实例" tabindex="-1"><a class="header-anchor" href="#vue-实例" aria-hidden="true">#</a> vue 实例</h3>
<h4 id="数据与方法" tabindex="-1"><a class="header-anchor" href="#数据与方法" aria-hidden="true">#</a> 数据与方法</h4>
<p>当数据改变时，视图会进行重渲染。<strong>值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的。</strong> 也就是说如果你添加一个新的属性将不会触发任何视图的更新。</p>
<p>如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。</p>
<h4 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期" aria-hidden="true">#</a> 生命周期</h4>
<p>生命周期函数就是 vue 实例在某一个时间点自动执行的函数。</p>
<p>生命周期钩子的 this 上下文指向调用它的 Vue 实例。</p>
<div class="custom-container danger">
<p class="custom-container-title">注意</p>
<p>不要在选项属性或回调上使用箭头函数，比如 created: () =&gt; console.log(this.a) 或 vm.$watch('a', newValue =&gt; this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。</p>
</div>
<h4 id="计算属性-方法和侦听器" tabindex="-1"><a class="header-anchor" href="#计算属性-方法和侦听器" aria-hidden="true">#</a> 计算属性， 方法和侦听器</h4>
<h5 id="计算属性" tabindex="-1"><a class="header-anchor" href="#计算属性" aria-hidden="true">#</a> 计算属性</h5>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091100765.png" alt="image-20220805091100765"></p>
<p>计算属性拥有缓存机制， 在计算所需要的的变量没有变化时会一直使用， 不会进行更新。 只有当需要的变量发生变化才会进行更新。</p>
<p>计算属性，方法， 侦听器都可以使用的情况， 我们应该优先使用计算属性, 性能更高。</p>
<h5 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h5>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091114399.png" alt="image-20220805091114399"></p>
<p>方法没有缓存机制， 每次都会进行更新。</p>
<h5 id="侦听器" tabindex="-1"><a class="header-anchor" href="#侦听器" aria-hidden="true">#</a> 侦听器</h5>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091137999.png" alt="image-20220805091137999"></p>
<p>侦听器会在监听的变量发生变化时更新数据。</p>
<h4 id="vue-条件渲染" tabindex="-1"><a class="header-anchor" href="#vue-条件渲染" aria-hidden="true">#</a> vue 条件渲染</h4>
<h5 id="key-值的作用" tabindex="-1"><a class="header-anchor" href="#key-值的作用" aria-hidden="true">#</a> key 值的作用</h5>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091153167.png" alt="image-20220805091153167"></p>
<p>如果加上<code v-pre>key</code>值， vue 就知道它是页面上唯一的元素。 如果两个元素<code v-pre>key</code>值不同， 他就不会复用之前的元素。</p>
<h2 id="模板语法" tabindex="-1"><a class="header-anchor" href="#模板语法" aria-hidden="true">#</a> 模板语法</h2>
<h4 id="动态参数" tabindex="-1"><a class="header-anchor" href="#动态参数" aria-hidden="true">#</a> 动态参数</h4>
<p>在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>[someAttr]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span><span class="token punctuation">></span></span> ... <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="列表渲染" tabindex="-1"><a class="header-anchor" href="#列表渲染" aria-hidden="true">#</a> 列表渲染</h2>
<p>有时你可能需要为已有对象赋值多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>userProfile<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">27</span><span class="token punctuation">,</span>
  <span class="token literal-property property">favoriteColor</span><span class="token operator">:</span> <span class="token string">"Vue Green"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你应该这样做：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>vm<span class="token punctuation">.</span>userProfile <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> vm<span class="token punctuation">.</span>userProfile<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">27</span><span class="token punctuation">,</span>
  <span class="token literal-property property">favoriteColor</span><span class="token operator">:</span> <span class="token string">"Vue Green"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遇到请求地址是<code v-pre>/api</code>可以自动转发到<code v-pre>/static/mock</code>。</p>
<h2 id="项目联调" tabindex="-1"><a class="header-anchor" href="#项目联调" aria-hidden="true">#</a> 项目联调</h2>
<p>把后端请求的地址填写在这里即可</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091210702.png" alt="image-20220805091210702"></p>
<h2 id="mixin" tabindex="-1"><a class="header-anchor" href="#mixin" aria-hidden="true">#</a> mixin</h2>
<p>如果我们的业务代码内有很多相同的逻辑代码， 这时候我们可以考虑使用 mixin， 它可以做到让我们写一套代码在多个地方使用。</p>
<p>创建 mixin.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapGetters<span class="token punctuation">,</span> mapMutations<span class="token punctuation">,</span> mapActions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuex"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> playMode <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"common/js/config"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> shuffle <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"common/js/util"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> playlistMixin <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token function">mapGetters</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"playlist"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handlePlaylist</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>playlist<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">activated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handlePlaylist</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>playlist<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">playlist</span><span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handlePlaylist</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handlePlaylist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"component must implement handlePlaylist method"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在业务代码内引入此文件" tabindex="-1"><a class="header-anchor" href="#在业务代码内引入此文件" aria-hidden="true">#</a> 在业务代码内引入此文件</h4>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>import {playlistMixin} from 'common/js/mixin' export default { mixins:
[playlistMixin], }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做就可以把业务代码和 playlistMixin 进行融合。 如果组件内有相同方法， 会覆盖掉 mixin 中的方法。</p>
<h2 id="vuex" tabindex="-1"><a class="header-anchor" href="#vuex" aria-hidden="true">#</a> vuex</h2>
<p>首先我们可以在 store 文件夹下创建 index.js 作为总入口。 引入 4 个文件。action.js, getter.js, mutation.js, state.js。</p>
<p>其中 state 用来存放数据， getter 用来获取数据， 它相当于是一个计算属性。
mutation 修改数据， action 可以异步的操作数据， 还可以打包 mutation 的修改。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091225777.png" alt="image-20220805091225777"></p>
<h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h3>
<p>index.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">"vuex"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> actions <span class="token keyword">from</span> <span class="token string">"./action"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> getters <span class="token keyword">from</span> <span class="token string">"./getters"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> state <span class="token keyword">from</span> <span class="token string">"./state"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> mutations <span class="token keyword">from</span> <span class="token string">"./mutations"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> createLogger <span class="token keyword">from</span> <span class="token string">"vuex/dist/logger"</span><span class="token punctuation">;</span>

Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> debug <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">"production"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  state<span class="token punctuation">,</span>
  getters<span class="token punctuation">,</span>
  actions<span class="token punctuation">,</span>
  mutations<span class="token punctuation">,</span>
  <span class="token literal-property property">strict</span><span class="token operator">:</span> debug<span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> debug <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token function">createLogger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>state.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> playMode <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"common/js/config"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> loadSearch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"common/js/cache"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">singer</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">playing</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fullScreen</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">playlist</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">sequenceList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> playMode<span class="token punctuation">.</span>sequence<span class="token punctuation">,</span>
  <span class="token literal-property property">currentIndex</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">disc</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">topList</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">searchHistory</span><span class="token operator">:</span> <span class="token function">loadSearch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">playHistory</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">favoriteList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> state<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>getter.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">singer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>singer<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">playing</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>playing<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">fullScreen</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>fullScreen<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">playlist</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>playlist<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">sequenceList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>sequenceList<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">mode</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>mode<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">currentIndex</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>currentIndex<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">currentSong</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> state<span class="token punctuation">.</span>playlist<span class="token punctuation">[</span>state<span class="token punctuation">.</span>currentIndex<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">playHistory</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> state<span class="token punctuation">.</span>playHistory<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">song</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Song</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">favoriteList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> state<span class="token punctuation">.</span>favoriteList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">song</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Song</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">disc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>disc<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">topList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>topList<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">searchHistory</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>searchHistory<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般修改数据， 我们会创建一个 js 文件专门存放修改数据的变量名， 防止出错。</p>
<p>mutation-types.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_SINGER</span> <span class="token operator">=</span> <span class="token string">"SET_SINGER"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_PLAYING_STATE</span> <span class="token operator">=</span> <span class="token string">"SET_PLAYING_STATE"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_FULL_SCREEN</span> <span class="token operator">=</span> <span class="token string">"SET_FULL_SCREEN"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_PLAYLIST</span> <span class="token operator">=</span> <span class="token string">"SET_PLAYLIST"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_SEQUENCE_LIST</span> <span class="token operator">=</span> <span class="token string">"SET_SEQUENCE_LIST"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_PLAY_MODE</span> <span class="token operator">=</span> <span class="token string">"SET_PLAY_MODE"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_CURRENT_INDEX</span> <span class="token operator">=</span> <span class="token string">"SET_CURRENT_INDEX"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_PLAY_HISTORY</span> <span class="token operator">=</span> <span class="token string">"SET_PLAY_HISTORY"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_FAVORITE_LIST</span> <span class="token operator">=</span> <span class="token string">"SET_FAVORITE_LIST"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_DISC</span> <span class="token operator">=</span> <span class="token string">"SET_DISC"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_TOP_LIST</span> <span class="token operator">=</span> <span class="token string">"SET_TOP_LIST"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SET_SEARCH_HISTORY</span> <span class="token operator">=</span> <span class="token string">"SET_SEARCH_HISTORY"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mutations.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> types <span class="token keyword">from</span> <span class="token string">"./mutation-types"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> mutations <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_SINGER</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> singer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>singer <span class="token operator">=</span> singer<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYING_STATE</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> flag</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>playing <span class="token operator">=</span> flag<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEQUENCE_LIST</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> flag</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>playing <span class="token operator">=</span> flag<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_FULL_SCREEN</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> flag</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>fullScreen <span class="token operator">=</span> flag<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYLIST</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>playlist <span class="token operator">=</span> list<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEQUENCE_LIST</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>sequenceList <span class="token operator">=</span> list<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAY_MODE</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> mode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>mode <span class="token operator">=</span> mode<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_CURRENT_INDEX</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>currentIndex <span class="token operator">=</span> index<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAY_HISTORY</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> history</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>playHistory <span class="token operator">=</span> history<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_FAVORITE_LIST</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>favoriteList <span class="token operator">=</span> list<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_DISC</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> disc</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>disc <span class="token operator">=</span> disc<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_TOP_LIST</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> topList</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>topList <span class="token operator">=</span> topList<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEARCH_HISTORY</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> history</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> mutations<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>action.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> types <span class="token keyword">from</span> <span class="token string">"./mutation-types"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> playMode <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"common/js/config"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> shuffle <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"common/js/util"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  saveSearch<span class="token punctuation">,</span>
  clearSearch<span class="token punctuation">,</span>
  deleteSearch<span class="token punctuation">,</span>
  savePlay<span class="token punctuation">,</span>
  saveFavorite<span class="token punctuation">,</span>
  deleteFavorite<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"common/js/cache"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">list<span class="token punctuation">,</span> song</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> list<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> item<span class="token punctuation">.</span>id <span class="token operator">===</span> song<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">selectPlay</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit<span class="token punctuation">,</span> state <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> list<span class="token punctuation">,</span> index <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEQUENCE_LIST</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>state<span class="token punctuation">.</span>mode <span class="token operator">===</span> playMode<span class="token punctuation">.</span>random<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> randomList <span class="token operator">=</span> <span class="token function">shuffle</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYLIST</span><span class="token punctuation">,</span> randomList<span class="token punctuation">)</span><span class="token punctuation">;</span>
    index <span class="token operator">=</span> <span class="token function">findIndex</span><span class="token punctuation">(</span>randomList<span class="token punctuation">,</span> list<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYLIST</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_CURRENT_INDEX</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_FULL_SCREEN</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYING_STATE</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">randomPlay</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> list <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAY_MODE</span><span class="token punctuation">,</span> playMode<span class="token punctuation">.</span>random<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEQUENCE_LIST</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> randomList <span class="token operator">=</span> <span class="token function">shuffle</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYLIST</span><span class="token punctuation">,</span> randomList<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_CURRENT_INDEX</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_FULL_SCREEN</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYING_STATE</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">insertSong</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit<span class="token punctuation">,</span> state <span class="token punctuation">}</span><span class="token punctuation">,</span> song</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> playlist <span class="token operator">=</span> state<span class="token punctuation">.</span>playlist<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> sequenceList <span class="token operator">=</span> state<span class="token punctuation">.</span>sequenceList<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> currentIndex <span class="token operator">=</span> state<span class="token punctuation">.</span>currentIndex<span class="token punctuation">;</span>
  <span class="token comment">// 记录当前歌曲</span>
  <span class="token keyword">let</span> currentSong <span class="token operator">=</span> playlist<span class="token punctuation">[</span>currentIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 查找当前列表中是否有待插入的歌曲并返回其索引</span>
  <span class="token keyword">let</span> fpIndex <span class="token operator">=</span> <span class="token function">findIndex</span><span class="token punctuation">(</span>playlist<span class="token punctuation">,</span> song<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 因为是插入歌曲，所以索引+1</span>
  currentIndex<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token comment">// 插入这首歌到当前索引位置</span>
  playlist<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>currentIndex<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> song<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 如果已经包含了这首歌</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fpIndex <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果当前插入的序号大于列表中的序号</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentIndex <span class="token operator">></span> fpIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      playlist<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>fpIndex<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      currentIndex<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      playlist<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>fpIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> currentSIndex <span class="token operator">=</span> <span class="token function">findIndex</span><span class="token punctuation">(</span>sequenceList<span class="token punctuation">,</span> currentSong<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> fsIndex <span class="token operator">=</span> <span class="token function">findIndex</span><span class="token punctuation">(</span>sequenceList<span class="token punctuation">,</span> song<span class="token punctuation">)</span><span class="token punctuation">;</span>

  sequenceList<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>currentSIndex<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> song<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>fsIndex <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentSIndex <span class="token operator">></span> fsIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sequenceList<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>fsIndex<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      sequenceList<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>fsIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYLIST</span><span class="token punctuation">,</span> playlist<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEQUENCE_LIST</span><span class="token punctuation">,</span> sequenceList<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_CURRENT_INDEX</span><span class="token punctuation">,</span> currentIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_FULL_SCREEN</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_PLAYING_STATE</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">saveSearchHistory</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> query</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEARCH_HISTORY</span><span class="token punctuation">,</span> <span class="token function">saveSearch</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">deleteSearchHistory</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> query</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEARCH_HISTORY</span><span class="token punctuation">,</span> <span class="token function">deleteSearch</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">clearSearchHistory</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">SET_SEARCH_HISTORY</span><span class="token punctuation">,</span> <span class="token function">clearSearch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>import {mapGetters, mapMutations} from 'vuex'


		...mapGetters([
			'fullScreen',
			'playlist',
			'currentSong',
			'playing',
			'currentIndex',
			'mode',
			'sequenceList'
		]),

	  back() {
        this.setFullScreen(false)
      },


      ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN',
        setPlayingState:'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlaylist: 'SET_PLAYLIST'
      })

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>action</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>	import {mapActions} from 'vuex'

	  this.selectPlay({
          list: this.songs,
          index
        })

      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


