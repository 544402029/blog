<template><div><h2 id="node-js" tabindex="-1"><a class="header-anchor" href="#node-js" aria-hidden="true">#</a> Node.js</h2>
<h2 id="node-js-是什么" tabindex="-1"><a class="header-anchor" href="#node-js-是什么" aria-hidden="true">#</a> Node.js 是什么？</h2>
<ul>
<li>nodejs 是基于 Chrome V8 引擎（相当于是一个解释器）的 JavaScript 运行环境。</li>
<li>nodejs 出现之前， js 只能在浏览器运行。（浏览器也相当于是一个运行环境）</li>
<li>nodejs 出现之后，js 可以在任何安装 nodejs 的环境运行。</li>
</ul>
<h2 id="和前端-js-有何区别" tabindex="-1"><a class="header-anchor" href="#和前端-js-有何区别" aria-hidden="true">#</a> 和前端 js 有何区别？</h2>
<h3 id="语法方面" tabindex="-1"><a class="header-anchor" href="#语法方面" aria-hidden="true">#</a> 语法方面</h3>
<ul>
<li>都使用 ES 语法（变量如何定义，函数如何定义， if/else , for 循环， class 语法层面的东西）</li>
<li>前端 js 使用 JS WEB API</li>
<li>nodejs 使用 node API</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/jsyufa.png" alt="输入图片说明"></p>
<h3 id="应用层面" tabindex="-1"><a class="header-anchor" href="#应用层面" aria-hidden="true">#</a> 应用层面</h3>
<ul>
<li>前端 js 用于网页， 在浏览器运行</li>
<li>nodejs 可用于服务端， 如开发 web server</li>
<li>nodejs 也可用于本机， 如 webpack 等本机的打包工具</li>
</ul>
<h2 id="nodejs-如何调试" tabindex="-1"><a class="header-anchor" href="#nodejs-如何调试" aria-hidden="true">#</a> nodejs 如何调试</h2>
<p>可以使用 vscode 的运行调试工具进行打断点以及 debugger</p>
<h2 id="当前文件和当前目录的路径-如何获取" tabindex="-1"><a class="header-anchor" href="#当前文件和当前目录的路径-如何获取" aria-hidden="true">#</a> 当前文件和当前目录的路径， 如何获取</h2>
<ul>
<li>__filename</li>
<li>__dirname</li>
<li>两个都是全局变量</li>
</ul>
<h2 id="commonjs-和-es6-module-的区别" tabindex="-1"><a class="header-anchor" href="#commonjs-和-es6-module-的区别" aria-hidden="true">#</a> commonjs 和 ES6 Module 的区别</h2>
<ul>
<li>语法不同</li>
<li>commonjs 是动态引入，执行时引入</li>
<li>ES6 Module 是静态引入，编译时引入</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yufabutonmga.png" alt="输入图片说明"></p>
<h2 id="path-resolve-和-path-join-的区别" tabindex="-1"><a class="header-anchor" href="#path-resolve-和-path-join-的区别" aria-hidden="true">#</a> path.resolve 和 path.join 的区别</h2>
<ul>
<li>两者都是用于拼接文件路径</li>
<li>path.resolve 获取绝对路径</li>
<li>path.join 获取相对路径</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/zhiojielaiba.png" alt="输入图片说明"></p>
<h2 id="事件循环-event-loop-在-nodejs-和浏览器的区别浏览器的区别" tabindex="-1"><a class="header-anchor" href="#事件循环-event-loop-在-nodejs-和浏览器的区别浏览器的区别" aria-hidden="true">#</a> 事件循环 event loop 在 nodejs 和浏览器的区别浏览器的区别</h2>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/loopsxun.png" alt="输入图片说明"></p>
<h2 id="cookie-如何实现登录" tabindex="-1"><a class="header-anchor" href="#cookie-如何实现登录" aria-hidden="true">#</a> cookie 如何实现登录？</h2>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/co0okiedn.png" alt="输入图片说明"></p>
<h2 id="session-和-cookie-的关系" tabindex="-1"><a class="header-anchor" href="#session-和-cookie-的关系" aria-hidden="true">#</a> session 和 cookie 的关系</h2>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/session-cookie.png" alt="输入图片说明"></p>
<h2 id="session-为何需要存储在-redis-中" tabindex="-1"><a class="header-anchor" href="#session-为何需要存储在-redis-中" aria-hidden="true">#</a> session 为何需要存储在 redis 中？</h2>
<ul>
<li>进程有内存限制</li>
<li>进程的内存是相互隔离的</li>
</ul>
<h2 id="请描述-koa2-和-express-的中间件机制" tabindex="-1"><a class="header-anchor" href="#请描述-koa2-和-express-的中间件机制" aria-hidden="true">#</a> 请描述 koa2 和 express 的中间件机制</h2>
<ul>
<li>从代码来看，中间件就是一个函数</li>
<li>从业务来看，中间件则是一个独立的模块</li>
<li>模块拆分，模块流传，即可完成复杂的功能</li>
</ul>
<h2 id="请描述-koa2-洋葱圈模型" tabindex="-1"><a class="header-anchor" href="#请描述-koa2-洋葱圈模型" aria-hidden="true">#</a> 请描述 koa2 洋葱圈模型</h2>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yangcongquan.png" alt="输入图片说明"></p>
<h2 id="nodejs-线上环境为何开启多进程" tabindex="-1"><a class="header-anchor" href="#nodejs-线上环境为何开启多进程" aria-hidden="true">#</a> nodejs 线上环境为何开启多进程？</h2>
<ul>
<li>高效使用多核 CPU</li>
<li>充分利用服务器内存</li>
<li>最终： 压榨服务器， 不浪费资源</li>
</ul>
</div></template>


