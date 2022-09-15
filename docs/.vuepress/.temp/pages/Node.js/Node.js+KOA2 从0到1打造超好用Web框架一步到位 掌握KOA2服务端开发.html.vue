<template><div><h1 id="node-js-koa2" tabindex="-1"><a class="header-anchor" href="#node-js-koa2" aria-hidden="true">#</a> Node.js+KOA2</h1>
<h2 id="koa中间件" tabindex="-1"><a class="header-anchor" href="#koa中间件" aria-hidden="true">#</a> Koa中间件</h2>
<p>中间件其实就是个函数。</p>
<p>怎么让函数注册为中间件呢？</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085621783.png" alt="image-20220805085621783"></p>
<p>一般我们都把中间件定义在app.use()内， 定义为一个箭头函数。</p>
<p>如何连续调用中间件函数?</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
 <span class="token comment">//ctx 表示上下文，next 表示下一个中间件函数，use方法中的这两个参数，都是node集成好的对象。</span>
 <span class="token comment">//比如这里有两个中间件函数，但是node默认只调用第一个中间件函数，如何调用下一个中间件函数，就需要使用next函数</span>
 <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="洋葱模型" tabindex="-1"><a class="header-anchor" href="#洋葱模型" aria-hidden="true">#</a> 洋葱模型</h2>
<p>在使用中间件时， 请务必加上<code v-pre>async</code>和<code v-pre>awit</code>， 这样能保证洋葱模型的正常执行。</p>
<p>next()返回的一定是一个promise！！！</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085642810.png" alt="image-20220805085642810"></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085656449.png" alt="image-20220805085656449"></p>
<h3 id="async与await" tabindex="-1"><a class="header-anchor" href="#async与await" aria-hidden="true">#</a> async与await</h3>
<p><code v-pre>await</code>主要是用来求值的， 相当于一个求值关键字， 可以代替<code v-pre>then</code>直接将promise结果返回， 如下：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085711675.png" alt="image-20220805085711675"></p>
<p>当然后面也可以写表达式， 不仅仅是Promise</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085731399.png" alt="image-20220805085731399"></p>
<p>await能堆promise直接求值， 也能阻塞程序运行， 将原本异步的代码变成同步。等待异步代码返回后再继续执行。</p>
<p>但阻塞时也可以继续执行其它的代码， 并不影响其它代码进行执行。</p>
<h4 id="async的意义" tabindex="-1"><a class="header-anchor" href="#async的意义" aria-hidden="true">#</a> async的意义</h4>
<p>带有<code v-pre>async</code>声明的函数返回值会被强制包装成<code v-pre>promise</code>对象，</p>
<h4 id="为什么要在中间件前面加一个async关键字" tabindex="-1"><a class="header-anchor" href="#为什么要在中间件前面加一个async关键字" aria-hidden="true">#</a> 为什么要在中间件前面加一个<code v-pre>async</code>关键字？</h4>
<p>不仅仅是为了中间件强制要求要返回一个<code v-pre>promise</code>， 因为不使用<code v-pre>async</code>也可以返回<code v-pre>promise</code>，<code v-pre>koa</code>已经处理了，返回的就是<code v-pre>promise</code>。  主要是因为内部使用了<code v-pre>await</code>， 必须要使用<code v-pre>async</code>来声明函数， 否则就会报错了！</p>
<h3 id="为什么一定要保证洋葱模型" tabindex="-1"><a class="header-anchor" href="#为什么一定要保证洋葱模型" aria-hidden="true">#</a> 为什么一定要保证洋葱模型？</h3>
<p>保证洋葱模型必须要在中间件函数前增加async， 并且next()前添加await。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085748434.png" alt="image-20220805085748434"></p>
<p>为什么我们非要保证洋葱模型呢？</p>
<p>中间件函数执行是有顺序的， 假如我需要在第一个中间件函数内写一段逻辑代码，它有一个前提条件就是必须等后面所有的中间件函数执行完。 比如用它来进行计时。计算所有中间件执行完所需时间。那么我怎么才能知道后面的中间件函数执行完呢？洋葱模型就能解决这个问题。它以next()为分界线，next()之前的代码说明后续的中间件还没有执行。但是next()之后的代码说明后面的中间件已经执行完了。</p>
<h3 id="洋葱模型如何进行传值" tabindex="-1"><a class="header-anchor" href="#洋葱模型如何进行传值" aria-hidden="true">#</a> 洋葱模型如何进行传值？</h3>
<p>将需要传的值直接写在上下文环境的属性就就可以传递值了， 但是请务必保证是洋葱模型。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085800508.png" alt="image-20220805085800508"></p>
<h2 id="路由系统" tabindex="-1"><a class="header-anchor" href="#路由系统" aria-hidden="true">#</a> 路由系统</h2>
<p>我们需要使用一个插件来对路由进行管理<code v-pre>koa-router</code>。</p>
<h3 id="api版本" tabindex="-1"><a class="header-anchor" href="#api版本" aria-hidden="true">#</a> api版本</h3>
<p>我们如果需要兼容老版本的api，一般会带有一个版本号， 有以下几种方式进行携带：</p>
<ol>
<li>路径</li>
<li>查询参数</li>
<li>header</li>
</ol>
<h3 id="自动重启" tabindex="-1"><a class="header-anchor" href="#自动重启" aria-hidden="true">#</a> 自动重启</h3>
<p>自动重启需要安装nodemon插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i nodemon -g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成执行</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nodemon app.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="断点调试" tabindex="-1"><a class="header-anchor" href="#断点调试" aria-hidden="true">#</a> 断点调试</h3>
<p>如果想要断点调试直接在vscode内按F5或者直接点击爬虫并运行代码即可。</p>
<p>但是想要自动重启程序并加入断点调试怎么做呢？</p>
<p>我们需要添加一个配置：</p>
<p>launch.json</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 使用 IntelliSense 了解相关属性。 </span>
    <span class="token comment">// 悬停以查看现有属性的描述。</span>
    <span class="token comment">// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.2.0"</span><span class="token punctuation">,</span>
    <span class="token property">"configurations"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"node"</span><span class="token punctuation">,</span>
            <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"nodemon"</span><span class="token punctuation">,</span>
            <span class="token property">"runtimeExecutable"</span><span class="token operator">:</span> <span class="token string">"nodemon"</span><span class="token punctuation">,</span>
            <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${workspaceFolder}/app.js"</span><span class="token punctuation">,</span>
            <span class="token property">"restart"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">"console"</span><span class="token operator">:</span> <span class="token string">"integratedTerminal"</span><span class="token punctuation">,</span>
            <span class="token property">"internalConsoleOptions"</span><span class="token operator">:</span> <span class="token string">"neverOpen"</span><span class="token punctuation">,</span>
            <span class="token property">"skipFiles"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"&lt;node_internals>/**"</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token punctuation">{</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"node"</span><span class="token punctuation">,</span>
            <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"启动程序"</span><span class="token punctuation">,</span>
            <span class="token property">"skipFiles"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"&lt;node_internals>/**"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${workspaceFolder}\\app.js"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"node"</span><span class="token punctuation">,</span>
            <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"当前文件"</span><span class="token punctuation">,</span>
            <span class="token property">"skipFiles"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"&lt;node_internals>/**"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${file}"</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&quot;program&quot;: &quot;${file}&quot;  指的是启动当前文件  点开需要调试的文件并运行即可</p>
<p>如果想添加nodemon启动程序， 可以在右下角点击添加配置， 选择nodemon安装程序</p>
<h3 id="自动加载路由" tabindex="-1"><a class="header-anchor" href="#自动加载路由" aria-hidden="true">#</a> 自动加载路由</h3>
<p>我们如果想要实现自动加载路由， 首先需要安装一个插件，requireDirectory</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i require-directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先在初始化文件或者app.js内引入</p>
<p>init.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> requireDirectory <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'require-directory'</span><span class="token punctuation">)</span>

   <span class="token keyword">const</span> apiDirectory <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/app/api</span><span class="token template-punctuation string">`</span></span>
	<span class="token function">requireDirectory</span><span class="token punctuation">(</span>module<span class="token punctuation">,</span>apiDirectory<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token literal-property property">visit</span><span class="token operator">:</span>whenLoadModule
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">function</span> <span class="token function">whenLoadModule</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Router</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			InitManager<span class="token punctuation">.</span>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>module, 模块， 固定参数
第二个参数为路由目录路径（如果是它的上级目录， 比如api，他下面有v1,v2,v3文件夹， 里面存放各个版本路由， 这时候v1,v2,v3的路由都能被加载）
第三个数为一个对象。 里面的visit可以接受一个回调函数，回调函数内对每个路由进行了判断， 只要是	Router路由就进行注册。</p>
<div class="custom-container danger">
<p class="custom-container-title">注意</p>
<p>在路由文件内导出时要注意， 请以<code v-pre>module.exports = router</code>方式进行导出。 如果是其他方式， 判断的方式也要进行改变。</p>
</div>
<h3 id="koa为什么会返回not-found" tabindex="-1"><a class="header-anchor" href="#koa为什么会返回not-found" aria-hidden="true">#</a> KOA为什么会返回Not Found？</h3>
<p>一般来说是因为ctx.body没有返回任何值</p>
<h3 id="怎么导入配置文件" tabindex="-1"><a class="header-anchor" href="#怎么导入配置文件" aria-hidden="true">#</a> 怎么导入配置文件？</h3>
<p>在根目录创建一个文件夹， 并创建一个js文件， 使用ES6的方法到处 <code v-pre>module.exports</code></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085821879.png" alt="image-20220805085821879"></p>
<p>在初始化方法内写一个静态方法进行引入</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085837647.png" alt="image-20220805085837647"></p>
<p>使用</p>
<p>一般来说不用再用<code v-pre>else</code>，<code v-pre>throw</code>抛出错误就会停止运行</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085854081.png" alt="image-20220805085854081"></p>
<h3 id="前缀" tabindex="-1"><a class="header-anchor" href="#前缀" aria-hidden="true">#</a> 前缀</h3>
<p>为路由添加一个前缀， 可以避免写相同的路径</p>
<p>user.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">prefix</span><span class="token operator">:</span><span class="token string">'/v1/user'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参数校验" tabindex="-1"><a class="header-anchor" href="#参数校验" aria-hidden="true">#</a> 参数校验</h2>
<h3 id="获取参数" tabindex="-1"><a class="header-anchor" href="#获取参数" aria-hidden="true">#</a> 获取参数</h3>
<p>目的：拒绝非法参数，向客户端返回明确提示信息</p>
<p>参数的方式一般有4种</p>
<ul>
<li>URL 中冒号 + 参数名 获取用ctx.params</li>
<li>URL 后问号  获取用ctx.request.query</li>
<li>header 获取用ctx.request.header</li>
<li>body  获取用ctx.request.body</li>
</ul>
<p>获取body要引入插件</p>
<p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> parser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-bodyparser'</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">parser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理" aria-hidden="true">#</a> 异常处理</h2>
<h3 id="全局异常处理" tabindex="-1"><a class="header-anchor" href="#全局异常处理" aria-hidden="true">#</a> 全局异常处理</h3>
<p>使用中间件来捕获异常错误</p>
<p>exception.js</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085910036.png" alt="image-20220805085910036"></p>
<p>未知异常：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085936059.png" alt="image-20220805085936059"></p>
<p>在app.js中引入</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> catchError <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./middlewares/exception'</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>catchError<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义异常基类" tabindex="-1"><a class="header-anchor" href="#定义异常基类" aria-hidden="true">#</a> 定义异常基类</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">HttpException</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span><span class="token punctuation">{</span>
    
    <span class="token function">constructor</span><span class="token punctuation">(</span>msg<span class="token operator">=</span><span class="token string">'服务器异常'</span><span class="token punctuation">,</span>errorCode<span class="token operator">=</span><span class="token number">10000</span><span class="token punctuation">,</span>code<span class="token operator">=</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>errorCode <span class="token operator">=</span> errorCode
        <span class="token keyword">this</span><span class="token punctuation">.</span>code <span class="token operator">=</span> code
        <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> msg
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085951330.png" alt="image-20220805085951330"></p>
<h2 id="lin-validator使用指南" tabindex="-1"><a class="header-anchor" href="#lin-validator使用指南" aria-hidden="true">#</a> Lin-Validator使用指南</h2>
<p>依赖于第三方库lodash、validator以及jsonwebtoken</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install lodash validator jsonwebtoken -S

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以直接 npm i lin-mizar，用lin-cms的核心库。 功能更多。</p>
<p>可参考：<a href="http://doc.cms.7yue.pro/lin/server/koa/validator.html#%E7%B1%BB%E6%A0%A1%E9%AA%8C" target="_blank" rel="noopener noreferrer"> 校验器
<ExternalLinkIcon/></a></p>
<h2 id="数据库" tabindex="-1"><a class="header-anchor" href="#数据库" aria-hidden="true">#</a> 数据库</h2>
<h3 id="关系型数据库与非关系型数据库" tabindex="-1"><a class="header-anchor" href="#关系型数据库与非关系型数据库" aria-hidden="true">#</a> 关系型数据库与非关系型数据库</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090011851.png" alt="image-20220805090011851"></p>
<h3 id="新建连接" tabindex="-1"><a class="header-anchor" href="#新建连接" aria-hidden="true">#</a> 新建连接</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090029255.png" alt="image-20220805090029255"></p>
<h4 id="修改连接密码" tabindex="-1"><a class="header-anchor" href="#修改连接密码" aria-hidden="true">#</a> 修改连接密码</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090040060.png" alt="image-20220805090040060"></p>
<p>如果不行请把root的都修改一下</p>
<h3 id="新建数据库" tabindex="-1"><a class="header-anchor" href="#新建数据库" aria-hidden="true">#</a> 新建数据库</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090326009.png" alt="image-20220805090326009"></p>
<h3 id="数据库操作插件" tabindex="-1"><a class="header-anchor" href="#数据库操作插件" aria-hidden="true">#</a> 数据库操作插件</h3>
<p>首先设置配置文件：</p>
<p>config.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">//prod</span>
    <span class="token literal-property property">environment</span><span class="token operator">:</span><span class="token string">'dev'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">database</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">dbName</span><span class="token operator">:</span><span class="token string">'island'</span><span class="token punctuation">,</span><span class="token comment">//数据库名</span>
        <span class="token literal-property property">host</span><span class="token operator">:</span><span class="token string">'localhost'</span><span class="token punctuation">,</span><span class="token comment">//数据库IP地址</span>
        <span class="token literal-property property">port</span><span class="token operator">:</span><span class="token string">'3306'</span><span class="token punctuation">,</span><span class="token comment">//端口</span>
        <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token string">'root'</span><span class="token punctuation">,</span><span class="token comment">//用户名</span>
        <span class="token literal-property property">password</span><span class="token operator">:</span><span class="token string">'888888'</span><span class="token comment">//密码</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">security</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">secretKey</span><span class="token operator">:</span><span class="token string">"abcdefg"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">expiresIn</span><span class="token operator">:</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">24</span><span class="token operator">*</span><span class="token number">30</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">wx</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">appId</span><span class="token operator">:</span><span class="token string">'wx'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">appSecret</span><span class="token operator">:</span><span class="token string">'c'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">loginUrl</span><span class="token operator">:</span><span class="token string">'https://api.weixin.qq.com/sns/jscode2session?appid=%s&amp;secret=%s&amp;js_code=%s&amp;grant_type=authorization_code'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>db.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Sequelize <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'sequelize'</span><span class="token punctuation">)</span>
<span class="token comment">//引入配置文件</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    dbName<span class="token punctuation">,</span>
    host<span class="token punctuation">,</span>
    port<span class="token punctuation">,</span>
    user<span class="token punctuation">,</span>
    password
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../config/config'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>database

<span class="token comment">//@dbName 数据库名</span>
<span class="token comment">//@user 用户名</span>
<span class="token comment">//@password 密码</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span>dbName<span class="token punctuation">,</span>user<span class="token punctuation">,</span>password<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">dialect</span><span class="token operator">:</span><span class="token string">'mysql'</span><span class="token punctuation">,</span><span class="token comment">//操作数据库类型  mysql需要安装mysql2</span>
    host<span class="token punctuation">,</span>
    port<span class="token punctuation">,</span>
    <span class="token literal-property property">logging</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//输出操作数据库记录</span>
    <span class="token literal-property property">timezone</span><span class="token operator">:</span><span class="token string">'+08:00'</span><span class="token punctuation">,</span><span class="token comment">//以北京时间来记录操作时间</span>
    <span class="token literal-property property">define</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">timestamps</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//创建createdAt updatedAt字段,false不创建</span>
        <span class="token literal-property property">paranoid</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//创建deletedAt字段,fase不创建</span>
        <span class="token literal-property property">createdAt</span><span class="token operator">:</span><span class="token string">'created_at'</span><span class="token punctuation">,</span><span class="token comment">//修改createdAt名称,更符合数据库字段规范</span>
        <span class="token literal-property property">updatedAt</span><span class="token operator">:</span><span class="token string">'updated_at'</span><span class="token punctuation">,</span><span class="token comment">//修改updatedAt名称</span>
        <span class="token literal-property property">deletedAt</span><span class="token operator">:</span><span class="token string">'deleted_at'</span><span class="token punctuation">,</span><span class="token comment">//修改deletedAt名称</span>
        <span class="token literal-property property">underscored</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//驼峰转下划线</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

sequelize<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">force</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token comment">//上线一定一定不要设置为true， true会自动删除数据库后再新建</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    sequelize
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建用户模型" tabindex="-1"><a class="header-anchor" href="#创建用户模型" aria-hidden="true">#</a> 创建用户模型</h4>
<p>user.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> bcrypt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcryptjs'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>sequelize<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../core/db'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>Sequelize<span class="token punctuation">,</span>Model<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'sequelize'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>

User<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">//主键不能为空， 不能重复</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">INTEGER</span><span class="token punctuation">,</span><span class="token comment">//内置类型，对应mysql的一种类型</span>
        <span class="token literal-property property">primaryKey</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//设置数据库主键</span>
        <span class="token literal-property property">autoIncrement</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//自动增长id编号</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nickname</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span><span class="token comment">//内置类型，对应mysql的一种类型</span>
    <span class="token literal-property property">email</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//最大64位</span>
        <span class="token literal-property property">unique</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//保持唯一</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span><span class="token comment">//内置类型，对应mysql的一种类型</span>
        <span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">const</span> salt <span class="token operator">=</span> bcrypt<span class="token punctuation">.</span><span class="token function">genSaltSync</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token keyword">const</span> psw <span class="token operator">=</span> bcrypt<span class="token punctuation">.</span><span class="token function">hashSync</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span>salt<span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setDataValue</span><span class="token punctuation">(</span><span class="token string">'password'</span><span class="token punctuation">,</span>psw<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">openid</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//限制长度 最大64位</span>
        <span class="token literal-property property">unique</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//保持唯一</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    sequelize<span class="token punctuation">,</span>
    <span class="token literal-property property">tableName</span><span class="token operator">:</span><span class="token string">'user'</span><span class="token comment">//表格名字</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    User
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sequelize新增数据" tabindex="-1"><a class="header-anchor" href="#sequelize新增数据" aria-hidden="true">#</a> Sequelize新增数据</h3>
<p>user.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> bcrypt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcryptjs'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>sequelize<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../core/db'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>Sequelize<span class="token punctuation">,</span>Model<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'sequelize'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span><span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">verifyEmailPassword</span><span class="token punctuation">(</span><span class="token parameter">email<span class="token punctuation">,</span>plainPassword</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">where</span><span class="token operator">:</span><span class="token punctuation">{</span>
                email
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">global<span class="token punctuation">.</span>errs<span class="token punctuation">.</span>AuthFailed</span><span class="token punctuation">(</span><span class="token string">'账号不存在'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">const</span> correct <span class="token operator">=</span> bcrypt<span class="token punctuation">.</span><span class="token function">compareSync</span><span class="token punctuation">(</span>
            plainPassword<span class="token punctuation">,</span>user<span class="token punctuation">.</span>password
        <span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>correct<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">global<span class="token punctuation">.</span>errs<span class="token punctuation">.</span>AuthFailed</span><span class="token punctuation">(</span><span class="token string">'密码不正确'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> user
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">getUserByOpenid</span><span class="token punctuation">(</span><span class="token parameter">openid</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">where</span><span class="token operator">:</span><span class="token punctuation">{</span>
                openid
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> user
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">registerByOpenid</span><span class="token punctuation">(</span><span class="token parameter">openid</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            openid
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

User<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">//主键不能为空， 不能重复</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">INTEGER</span><span class="token punctuation">,</span><span class="token comment">//内置类型，对应mysql的一种类型</span>
        <span class="token literal-property property">primaryKey</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//设置数据库主键</span>
        <span class="token literal-property property">autoIncrement</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//自动增长id编号</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nickname</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span><span class="token comment">//内置类型，对应mysql的一种类型</span>
    <span class="token literal-property property">email</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//最大64位</span>
        <span class="token literal-property property">unique</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//保持唯一</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span><span class="token comment">//内置类型，对应mysql的一种类型</span>
        <span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//盐加密</span>
            <span class="token keyword">const</span> salt <span class="token operator">=</span> bcrypt<span class="token punctuation">.</span><span class="token function">genSaltSync</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token comment">//加密成本,一般设置为10</span>
            <span class="token keyword">const</span> psw <span class="token operator">=</span> bcrypt<span class="token punctuation">.</span><span class="token function">hashSync</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span>salt<span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setDataValue</span><span class="token punctuation">(</span><span class="token string">'password'</span><span class="token punctuation">,</span>psw<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">openid</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span>Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//限制长度 最大64位</span>
        <span class="token literal-property property">unique</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//保持唯一</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    sequelize<span class="token punctuation">,</span>
    <span class="token literal-property property">tableName</span><span class="token operator">:</span><span class="token string">'user'</span><span class="token comment">//表格名字</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    User
<span class="token punctuation">}</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="令牌与权限" tabindex="-1"><a class="header-anchor" href="#令牌与权限" aria-hidden="true">#</a> 令牌与权限</h2>
<h3 id="token令牌" tabindex="-1"><a class="header-anchor" href="#token令牌" aria-hidden="true">#</a> token令牌</h3>
<p>首先要引入插件jsonwebtoken</p>
<p>util.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> jwt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'jsonwebtoken'</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/***
 * 
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">findMembers</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">instance<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    prefix<span class="token punctuation">,</span>
    specifiedType<span class="token punctuation">,</span>
    filter
<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 递归函数</span>
    <span class="token keyword">function</span> <span class="token function">_find</span><span class="token punctuation">(</span><span class="token parameter">instance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//基线条件（跳出递归）</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

        <span class="token keyword">let</span> names <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
        names <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// 过滤掉不满足条件的属性或方法名</span>
            <span class="token keyword">return</span> <span class="token function">_shouldKeep</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">...</span>names<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token function">_find</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">_shouldKeep</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>filter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">filter</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>prefix<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>specifiedType<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">[</span>value<span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">specifiedType</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token function">_find</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">generateToken</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">uid<span class="token punctuation">,</span> scope</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> secretKey <span class="token operator">=</span> global<span class="token punctuation">.</span>config<span class="token punctuation">.</span>security<span class="token punctuation">.</span>secretKey
    <span class="token keyword">const</span> expiresIn <span class="token operator">=</span> global<span class="token punctuation">.</span>config<span class="token punctuation">.</span>security<span class="token punctuation">.</span>expiresIn
    <span class="token comment">//jwt.sign生成令牌</span>
    <span class="token comment">//第一个参数 {} payload 可以放入自定义信息</span>
    <span class="token comment">//第二个参数 secretKey 私有钥匙  自己定义</span>
    <span class="token comment">//第三个参数  可选配置项</span>
    <span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        uid<span class="token punctuation">,</span>
        scope
    <span class="token punctuation">}</span><span class="token punctuation">,</span>secretKey<span class="token punctuation">,</span><span class="token punctuation">{</span>
        expiresIn
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> token
<span class="token punctuation">}</span>



module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    findMembers<span class="token punctuation">,</span>
    generateToken<span class="token punctuation">,</span>
<span class="token punctuation">}</span>



<span class="token comment">// const generateToken = function (uid, scope) {</span>
<span class="token comment">//     const secretKey = global.config.security.secretKey</span>
<span class="token comment">//     const expiresIn = global.config.security.expiresIn</span>
<span class="token comment">//     const token = jwt.sign({</span>
<span class="token comment">//         uid,</span>
<span class="token comment">//         scope</span>
<span class="token comment">//     }, secretKey, {</span>
<span class="token comment">//         expiresIn: expiresIn</span>
<span class="token comment">//     })</span>
<span class="token comment">//     return token</span>
<span class="token comment">// }</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">//prod</span>
    <span class="token literal-property property">environment</span><span class="token operator">:</span><span class="token string">'dev'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">database</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">dbName</span><span class="token operator">:</span><span class="token string">'island'</span><span class="token punctuation">,</span><span class="token comment">//数据库名</span>
        <span class="token literal-property property">host</span><span class="token operator">:</span><span class="token string">'localhost'</span><span class="token punctuation">,</span><span class="token comment">//数据库IP地址</span>
        <span class="token literal-property property">port</span><span class="token operator">:</span><span class="token string">'3306'</span><span class="token punctuation">,</span><span class="token comment">//端口</span>
        <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token string">'root'</span><span class="token punctuation">,</span><span class="token comment">//用户名</span>
        <span class="token literal-property property">password</span><span class="token operator">:</span><span class="token string">'888888'</span><span class="token comment">//密码</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">security</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">secretKey</span><span class="token operator">:</span><span class="token string">"abcdefg"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">expiresIn</span><span class="token operator">:</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">24</span><span class="token operator">*</span><span class="token number">30</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">wx</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">appId</span><span class="token operator">:</span><span class="token string">'wx8476e68f02a076e0'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">appSecret</span><span class="token operator">:</span><span class="token string">'c45121c9efc0454e20aa930238b32cf1'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">loginUrl</span><span class="token operator">:</span><span class="token string">'https://api.weixin.qq.com/sns/jscode2session?appid=%s&amp;secret=%s&amp;js_code=%s&amp;grant_type=authorization_code'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>api&gt;v1&gt;token.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-router'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    NotEmptyValidator<span class="token punctuation">,</span>
    TokenValidator
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../validators/validator'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    LoginType
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../lib/enum'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    User
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../models/user'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    generateToken
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../../core/util'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    Auth
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../../middlewares/auth'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    WXManager
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../services/wx'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">'/v1/token'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">TokenValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token keyword">let</span> token<span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.type'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> LoginType<span class="token punctuation">.</span><span class="token constant">USER_EMAIL</span><span class="token operator">:</span>
            token <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">emailLogin</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.account'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.secret'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> LoginType<span class="token punctuation">.</span><span class="token constant">USER_MINI_PROGRAM</span><span class="token operator">:</span>
            token <span class="token operator">=</span> <span class="token keyword">await</span> WXManager<span class="token punctuation">.</span><span class="token function">codeToToken</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.account'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> LoginType<span class="token punctuation">.</span><span class="token constant">ADMIN_EMAIL</span><span class="token operator">:</span>
            <span class="token keyword">break</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">global<span class="token punctuation">.</span>errs<span class="token punctuation">.</span>ParameterException</span><span class="token punctuation">(</span><span class="token string">'没有相应的处理函数'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        token
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/verify'</span><span class="token punctuation">,</span><span class="token keyword">async</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">NotEmptyValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> Auth<span class="token punctuation">.</span><span class="token function">verifyToken</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.token'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        result
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">emailLogin</span><span class="token punctuation">(</span><span class="token parameter">account<span class="token punctuation">,</span> secret</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span>
    User<span class="token punctuation">.</span><span class="token function">verifyEmailPassword</span><span class="token punctuation">(</span>account<span class="token punctuation">,</span> secret<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">generateToken</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> Auth<span class="token punctuation">.</span><span class="token constant">USER</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="token验证和权限分级" tabindex="-1"><a class="header-anchor" href="#token验证和权限分级" aria-hidden="true">#</a> token验证和权限分级</h3>
<p>安装basic-auth插件</p>
<p>auth.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> jwt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'jsonwebtoken'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> basicAuth <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'basic-auth'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">Auth</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">level</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//权限分级</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>level <span class="token operator">=</span> level <span class="token operator">||</span> <span class="token number">1</span>
        Auth<span class="token punctuation">.</span><span class="token constant">USER</span>  <span class="token operator">=</span> <span class="token number">8</span><span class="token comment">//普通用户</span>
        Auth<span class="token punctuation">.</span><span class="token constant">ADMIN</span> <span class="token operator">=</span> <span class="token number">16</span><span class="token comment">//管理员</span>
        Auth<span class="token punctuation">.</span><span class="token constant">SUPER_ADMIN</span> <span class="token operator">=</span> <span class="token number">32</span><span class="token comment">//超级管理员</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">get</span> <span class="token function">m</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">async</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">const</span> userToken <span class="token operator">=</span> <span class="token function">basicAuth</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>req<span class="token punctuation">)</span><span class="token comment">//获取token</span>
            <span class="token keyword">let</span> errMsg <span class="token operator">=</span> <span class="token string">'token不合法'</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>userToken <span class="token operator">||</span> <span class="token operator">!</span>userToken<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">global<span class="token punctuation">.</span>errs<span class="token punctuation">.</span>Forbbiden</span><span class="token punctuation">(</span>errMsg<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">//验证JWT令牌</span>
               <span class="token keyword">var</span> decode <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">verity</span><span class="token punctuation">(</span>userToken<span class="token punctuation">.</span>name<span class="token punctuation">,</span>global<span class="token punctuation">.</span>config<span class="token punctuation">.</span>security<span class="token punctuation">.</span>secretKey<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//判断是哪种类型的token失效</span>
                <span class="token comment">//已过期</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string">'TokenExpiredError'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    errMsg <span class="token operator">=</span> <span class="token string">'token已过期'</span>
                <span class="token punctuation">}</span>
                <span class="token comment">//不合法</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">global<span class="token punctuation">.</span>errs<span class="token punctuation">.</span>Forbbiden</span><span class="token punctuation">(</span>errMsg<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>decode<span class="token punctuation">.</span>scope <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>level<span class="token punctuation">)</span><span class="token punctuation">{</span>
                errMsg <span class="token operator">=</span> <span class="token string">'权限不足'</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">global<span class="token punctuation">.</span>errs<span class="token punctuation">.</span>Forbbiden</span><span class="token punctuation">(</span>errMsg<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

            ctx<span class="token punctuation">.</span>auth <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">uid</span><span class="token operator">:</span>decode<span class="token punctuation">.</span>uid<span class="token punctuation">,</span>
                <span class="token literal-property property">scope</span><span class="token operator">:</span>decode<span class="token punctuation">.</span>scope
            <span class="token punctuation">}</span>

            <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token function">verifyToken</span><span class="token punctuation">(</span><span class="token parameter">token</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            jwt<span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span>global<span class="token punctuation">.</span>config<span class="token punctuation">.</span>security<span class="token punctuation">.</span>secretKey<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    Auth
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>classic.js</p>
<p>使用token验证</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-router'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">prefix</span><span class="token operator">:</span><span class="token string">'/v1/classic'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>Auth<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../../middlewares/auth'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>PositiveIntegerValidator<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../validators/validator'</span><span class="token punctuation">)</span>
<span class="token comment">//ew Auth().m不需要加括号，必须放在async前面 ，传入数字9代表当前路由权限级别</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/latest'</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Auth</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">.</span>m<span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> ctx<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>uid
<span class="token punctuation">}</span><span class="token punctuation">)</span>


module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>token.js</p>
<p>权限分级</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-router'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    NotEmptyValidator<span class="token punctuation">,</span>
    TokenValidator
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../validators/validator'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    LoginType
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../lib/enum'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    User
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../models/user'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    generateToken
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../../core/util'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    Auth
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../../middlewares/auth'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
    WXManager
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../../services/wx'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">'/v1/token'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">TokenValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token keyword">let</span> token<span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.type'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> LoginType<span class="token punctuation">.</span><span class="token constant">USER_EMAIL</span><span class="token operator">:</span>
            token <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">emailLogin</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.account'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.secret'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> LoginType<span class="token punctuation">.</span><span class="token constant">USER_MINI_PROGRAM</span><span class="token operator">:</span>
            token <span class="token operator">=</span> <span class="token keyword">await</span> WXManager<span class="token punctuation">.</span><span class="token function">codeToToken</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.account'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> LoginType<span class="token punctuation">.</span><span class="token constant">ADMIN_EMAIL</span><span class="token operator">:</span>
            <span class="token keyword">break</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">global<span class="token punctuation">.</span>errs<span class="token punctuation">.</span>ParameterException</span><span class="token punctuation">(</span><span class="token string">'没有相应的处理函数'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        token
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/verify'</span><span class="token punctuation">,</span><span class="token keyword">async</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">NotEmptyValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> Auth<span class="token punctuation">.</span><span class="token function">verifyToken</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'body.token'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        result
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">emailLogin</span><span class="token punctuation">(</span><span class="token parameter">account<span class="token punctuation">,</span> secret</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span>
    User<span class="token punctuation">.</span><span class="token function">verifyEmailPassword</span><span class="token punctuation">(</span>account<span class="token punctuation">,</span> secret<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">generateToken</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> Auth<span class="token punctuation">.</span><span class="token constant">USER</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


