<template><div><h1 id="node-js从零开发web-server博客项目-前端晋升全栈工程师必备" tabindex="-1"><a class="header-anchor" href="#node-js从零开发web-server博客项目-前端晋升全栈工程师必备" aria-hidden="true">#</a> Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备</h1>
<h2 id="node-js用途" tabindex="-1"><a class="header-anchor" href="#node-js用途" aria-hidden="true">#</a> Node.js用途</h2>
<p>Node.js是一个JavaScript的运行环境。它一般有两个用途：</p>
<ol>
<li>运行在服务器， 作为web server</li>
<li>运行在本地， 作为打包、构建工具。</li>
</ol>
<h2 id="node-js介绍" tabindex="-1"><a class="header-anchor" href="#node-js介绍" aria-hidden="true">#</a> Node.js介绍</h2>
<h3 id="下载-安装" tabindex="-1"><a class="header-anchor" href="#下载-安装" aria-hidden="true">#</a> 下载 &amp; 安装</h3>
<h4 id="普通安装" tabindex="-1"><a class="header-anchor" href="#普通安装" aria-hidden="true">#</a> 普通安装</h4>
<p>直接在官网下载即可<a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js官网<ExternalLinkIcon/></a></p>
<h4 id="使用nvm" tabindex="-1"><a class="header-anchor" href="#使用nvm" aria-hidden="true">#</a> 使用nvm</h4>
<p>nvm， node.js版本管理工具， 可切换多个node.js版本</p>
<ul>
<li>mac os  使用<code v-pre>brew  install nvm</code>进行安装</li>
</ul>
<p>在<a href="https://brew.sh" target="_blank" rel="noopener noreferrer">brew官网<ExternalLinkIcon/></a>复制首页代码， 去命令行粘贴运行。安装完之后执行<code v-pre>brew  install nvm</code>。</p>
<ul>
<li>windows, github 中搜索nvm-windows， 有下载地址。</li>
</ul>
<h5 id="nvm命令-工作中常用" tabindex="-1"><a class="header-anchor" href="#nvm命令-工作中常用" aria-hidden="true">#</a> nvm命令(工作中常用)：</h5>
<p>nvm(node virsion menage) 可以安装多个node，并切换</p>
<p><code v-pre>nvm list</code> 查看所有node版本</p>
<p><code v-pre>nvm install v10.13.0</code> 安装指定版本</p>
<p><code v-pre>nvm use --delete-prefix 10.13.0</code> 切换到指定版本</p>
<p>如果本地安装了node 需要删掉后重新装nvm 再安装node，这样才能控制全部版本
否则会报错：
node v--delete-prefix.0.0 (64-bit) is not installed.</p>
<h3 id="node-js和javascript的区别" tabindex="-1"><a class="header-anchor" href="#node-js和javascript的区别" aria-hidden="true">#</a> Node.js和JavaScript的区别</h3>
<p>首先写JavaScript和Node.js必须遵守ECMAScript规范。</p>
<p>ECMAScript定义了语法， 保存变量定义， 循环， 判断， 函数， 原型和原型链， 作用域和闭包， 异步。</p>
<p>但是ECMAScript只定义了语法，不能进行以下操作：</p>
<ul>
<li>不能操作DOM， 不能监听事件， 不能发送ajax请求</li>
<li>不能处理http请求， 不能操作文件</li>
<li>即， 只有ECMAScript， 几乎做不了任何实际的项目。</li>
</ul>
<h4 id="javascript" tabindex="-1"><a class="header-anchor" href="#javascript" aria-hidden="true">#</a> JavaScript</h4>
<p>使用了ECMAScript语法规范， 外加Web API， 缺一不可。WEB API包括DOM操作， BOM操作， 事件绑定， Ajax等。 两者结合， 即可完成 浏览器端的任何操作。</p>
<h4 id="node-js" tabindex="-1"><a class="header-anchor" href="#node-js" aria-hidden="true">#</a> Node.js</h4>
<p>使用了ECMAScript语法规范， 外加Node.js API， 缺一不可。Node.js API包括http, 处理文件等。具体参考<a href="http://node.js.cn/api/" target="_blank" rel="noopener noreferrer">Node.js API <ExternalLinkIcon/></a> 两者结合， 即可完成 Server端的任何操作。</p>
<h3 id="common-js" tabindex="-1"><a class="header-anchor" href="#common-js" aria-hidden="true">#</a> common.js</h3>
<p>node应用由模块组成，采用的commonjs模块规范。每一个文件就是一个模块，拥有自己独立的作用域，变量，以及方法等，对其他的模块都不可见。CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。require方法用于加载模块。</p>
<h4 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h4>
<p>a.js</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>function add (a,b){
  return a+b
}

module.exports = add
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>b.js</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const add = require('./a')

const sum = add(10,20)

console.log(sum);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="引入多个" tabindex="-1"><a class="header-anchor" href="#引入多个" aria-hidden="true">#</a> 引入多个</h4>
<p>a.js</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>function add (a,b){
  return a+b
}

function mul (a,b){
  return a*b
}


module.exports = {
  add,
  mul
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>b.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>add<span class="token punctuation">,</span>mul<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./a'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> sum2 <span class="token operator">=</span> <span class="token function">mul</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">,</span>sum2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="前端与server端的区别" tabindex="-1"><a class="header-anchor" href="#前端与server端的区别" aria-hidden="true">#</a> 前端与Server端的区别</h3>
<p>server开发和前端开发的区别： 语言和环境工程思维的不同。</p>
<p>前端开发： 每个客户端 对接一个server端（可能不止一台服务器，可能是一个集群）。前端开发的代码是通过server端下载到本地（客户端），然后在客户端浏览器执行的。</p>
<p>server开发： 它要承接很多客户端的请求，很多请求到了server端，然后server端去处理。</p>
<p>总结的区别：</p>
<ol>
<li>服务稳定性（服务端不可挂）</li>
<li>考虑内存和CPU （优化、扩展）</li>
<li>日志记录（程序运行的报告，没有这个，对程序运行相当于盲人一样~）</li>
<li>安全</li>
<li>集群和服务拆分</li>
</ol>
<h2 id="技术方案" tabindex="-1"><a class="header-anchor" href="#技术方案" aria-hidden="true">#</a> 技术方案</h2>
<h3 id="接口设计" tabindex="-1"><a class="header-anchor" href="#接口设计" aria-hidden="true">#</a> 接口设计</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805084925165.png" alt="image-20220805084925165"></p>
<h2 id="http概述" tabindex="-1"><a class="header-anchor" href="#http概述" aria-hidden="true">#</a> http概述</h2>
<p>问题： 从浏览器输入url到页面渲染都发生了什么？</p>
<p>DNS解析获取到ip地址 -&gt; 建立tcp连接 -&gt; 发送http请求 -&gt; server接受http请求，并处理请求返回数据 -&gt; 客户端接受数据并处理数据（渲染页面，执行js）
中间涉及到到IP协议，ARP协议，OSPF协议</p>
<ol>
<li>IP协议：指定出发地（你的pc）和目的地（服务器）</li>
<li>ARP协议：找到所有路径</li>
<li>OSPF协议：找到最优路径请求资源</li>
</ol>
<h2 id="搭建开发环境" tabindex="-1"><a class="header-anchor" href="#搭建开发环境" aria-hidden="true">#</a> 搭建开发环境</h2>
<h3 id="安装nodemon" tabindex="-1"><a class="header-anchor" href="#安装nodemon" aria-hidden="true">#</a> 安装nodemon</h3>
<p>nodemon 可以实现自动重启</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i nodemon cross-env -D 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成之后在package.json的script命令中输入以下内容</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>"dev":"cross-env NODE_ENV=dev nodemon ./bin/www.js"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后直接在命令行输入<code v-pre>npm run dev</code>即可。</p>
<p><code v-pre>NODE_ENV=dev</code>指的是执行环节是开发环境。在代码中可以通过<code v-pre>process.env.NODE_ENV</code>获取到环境变量。</p>
<h2 id="node-js模块" tabindex="-1"><a class="header-anchor" href="#node-js模块" aria-hidden="true">#</a> Node.js模块</h2>
<h3 id="获取query" tabindex="-1"><a class="header-anchor" href="#获取query" aria-hidden="true">#</a> 获取query</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const querystring = require('querystring')
req.query = querystring.parse(url.split('?')[0])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作" aria-hidden="true">#</a> 文件操作</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const fs = require('fs')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="获取文件路径" tabindex="-1"><a class="header-anchor" href="#获取文件路径" aria-hidden="true">#</a> 获取文件路径</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const path = require('path')
const fileName = path.resolve(__dirname,'file','a.json')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>__diraname：当前目录， file：文件夹， a.json：文件</p>
<h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h2>
<p>首先需要下载 MySql 和 SQLWorkBench。</p>
<p>以下为SQLWorkBench内操作。</p>
<h2 id="查看数据库" tabindex="-1"><a class="header-anchor" href="#查看数据库" aria-hidden="true">#</a> 查看数据库</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>show databases;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085004732.png" alt="image-20220805085004732"></p>
<h3 id="使用数据库" tabindex="-1"><a class="header-anchor" href="#使用数据库" aria-hidden="true">#</a> 使用数据库</h3>
<p>我们想要操作数据库首先要执行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>use blog;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>blog指的是数据库名称。</p>
<p>显示所有数据库表：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>show tables;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="增加数据" tabindex="-1"><a class="header-anchor" href="#增加数据" aria-hidden="true">#</a> 增加数据</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>insert into users(username,`password`,realname) values('zhangsan','123','张三');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果遇到SQL关键字， 我们可以用反引号把它包起来， 如:password</p>
<h4 id="查询数据库" tabindex="-1"><a class="header-anchor" href="#查询数据库" aria-hidden="true">#</a> 查询数据库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>-- select * from users;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>select指的就是查询， <code v-pre>*</code>指的是我把所有的列都查出来。 user指的是表名。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select id,username from users;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以只查询id，和username。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where username='zhangsan';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>增加了查询条件， 只查询username是张三的数据。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where username='zhangsan' and `password`='123';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询username='zhangsan'并且password='123' 的数据。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where username='zhangsan' or `password`='123';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询username='zhangsan'或者password='123' 的数据。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where username like '%zhang%';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只模糊匹配查询username字段有zhang的数据。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where password like '%1%' order by id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据id正序排序。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where password like '%1%' order by id desc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据id倒序排序。</p>
<h4 id="更新数据库" tabindex="-1"><a class="header-anchor" href="#更新数据库" aria-hidden="true">#</a> 更新数据库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>update users set realname='李四2';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把users表的所有realname都改成李四2。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>update users set realname='李四2' where username='lisi';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把users表username=lisi的用户realname改成李四2</p>
<p>如果遇到报错可以执行以下语句：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SET SQL_SAFE_UPDATES=0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据" aria-hidden="true">#</a> 删除数据</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>delete from users where username='lisi';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除username为lisi的数据。</p>
<p>一般情况下我们不会真正的删除数据， 而是在表格增加一个字段<code v-pre>state</code>， 用它来进行判断是否有数据， 也就是一个软删除的技术。（state设置为0或1控制是否删除） 一般它的默认值设为1。</p>
<p>这样做的好处就是它是可以恢复的。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where state='1';
update users set state='0' where username='lisi';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将username=lisi的数据state改为了0， 第一句是查询users表内state为1的数据。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from users where state&lt;>'0';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们想要使用不等于， 请使用<code v-pre>&lt;&gt;</code>小于号和大于号组合，如上。</p>
<h2 id="node-js操作数据库" tabindex="-1"><a class="header-anchor" href="#node-js操作数据库" aria-hidden="true">#</a> Node.js操作数据库</h2>
<p>首先我们需要安装一个插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>index.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mysql <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mysql'</span><span class="token punctuation">)</span>

<span class="token comment">//创建连接对象</span>
<span class="token keyword">const</span> con <span class="token operator">=</span> mysql<span class="token punctuation">.</span><span class="token function">createConnection</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">'localhost'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">'root'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">'yutong9909'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token string">'3306'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">'blog'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//开始连接</span>
con<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">//执行 sql 语句</span>
<span class="token keyword">const</span> sql <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">insert into blogs(title,content,createtime,author) values('标题C','内容C',1583031695880,'zhangsan');</span><span class="token template-punctuation string">`</span></span>
con<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//关闭连接</span>
con<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085046072.png" alt="image-20220805085046072"></p>
<p>连接数据库报错</p>
<p>解决方案：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>use blog;
alter user 'root'@'localhost' identified with mysql_native_password by '123456';
flush privileges;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> cookie</h2>
<h4 id="什么是cookie" tabindex="-1"><a class="header-anchor" href="#什么是cookie" aria-hidden="true">#</a> 什么是cookie？</h4>
<ul>
<li>存储在浏览器的一段字符串（最大5kb）</li>
<li>跨域不共享</li>
<li>格式如 K1=V1;K2=V2;K3=V3;因此可以存储结构化数据。</li>
<li>每次发送http请求， 会将请求域的cookie一起发送给server</li>
<li>server可以修改cookie并返回给</li>
<li>浏览器中也可以通过JavaScript修改cookie（有限制）</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085114341.png" alt="image-20220805085114341"></p>
<h4 id="cookie和token的区别" tabindex="-1"><a class="header-anchor" href="#cookie和token的区别" aria-hidden="true">#</a> cookie和token的区别？</h4>
<p>cookie 是 http 协议的规范，一种标准，即一个工具，你拿 cookie 干嘛都可以，例如课程中我们用 cookie 实现登录。token 是一种业务上的术语，可以理解为密码、秘钥等，不同业务中 token 的格式、使用方式也不同。你可以使用很多种方式来实现 token ，例如 cookie ，http header ，url 参数中，或者 req.body 中。</p>
<h4 id="操作cookie" tabindex="-1"><a class="header-anchor" href="#操作cookie" aria-hidden="true">#</a> 操作cookie</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>path=/代表在所有路由下都可以访问cookie.
httpOnly表示此cookie不可在客户端操作。
expires=${getCookieExpires()}设置了cookie过期时间</p>
<p>过期时间函数</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//获取 cookie 的过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
	return d.toGMTString()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="session" tabindex="-1"><a class="header-anchor" href="#session" aria-hidden="true">#</a> session</h2>
<p>如果我们只用cookie就会有一个问题， cookie存储的个人信息都是暴露在外面的， 别人可以看到。（如你的手机号， 邮箱，用户名，密码等）。而且你其他平台的用户名及密码也有可能是一样的， 这样的话一旦泄露就十分危险。</p>
<p>第二个cookie存储的信息也是非常显现的， 大约为4kb。太多的信息也有可能放不开。</p>
<h4 id="如何解决" tabindex="-1"><a class="header-anchor" href="#如何解决" aria-hidden="true">#</a> 如何解决？</h4>
<p>我们可以在cookie中存储userid，userid可以是一个随机数之类的数字， 非常非常不相关的数字。 server端对应username。我们可以通过一个对象或者集合去查， 查出这个用户名来。</p>
<p><code v-pre>session</code> 是一个统称， 它的解决方案就是用server端存储用户信息。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085144884.png" alt="image-20220805085144884"></p>
<p>如上图： 我们只在浏览器中放一个毫无意义的userid就可以了， 即便用户被截获， 他也不知道userid是什么意思。然后到我们的server中呢？ 首先我们的server是足够安全的，因为他不会来回传输。 只要做好足够的限制， 安全就可以了。server端的空间也是足够大的， 里面可以存储很多的信息。</p>
<h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> redis</h2>
<p>只用session会出现两个问题：</p>
<ol>
<li>进程内存有限， 访问量过大， 内存激增怎么办？</li>
<li>正式上线运行是多线程， 进程之间内存无法共享</li>
</ol>
<h4 id="解决方案radis" tabindex="-1"><a class="header-anchor" href="#解决方案radis" aria-hidden="true">#</a> 解决方案radis</h4>
<ul>
<li>web server 最常用的缓存数据库， 数据存放在内存中</li>
<li>相比 mysql， 访问速度快（内存和硬盘不是一个数量级的）</li>
<li>但是成本更高， 可存储的数据量更小（内存的硬伤）</li>
<li>将web server 和 redis 拆分为两个单独的服务</li>
<li>双方都是独立的， 都是可扩展的（例如都扩展成集群）</li>
<li>（包括 mysql ， 也是一个单独的服务， 也可扩展）</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085202784.png" alt="image-20220805085202784"></p>
<h4 id="为何session适合用-redis" tabindex="-1"><a class="header-anchor" href="#为何session适合用-redis" aria-hidden="true">#</a> 为何session适合用 redis?</h4>
<ul>
<li>session 访问频繁， 对性能要求极高。</li>
<li>session 可不考虑断电丢失数据的问题（内存的硬伤）</li>
<li>session 数据量不会太大（相比于mysql中存储的数据）</li>
</ul>
<h4 id="为何网站数据不适合用redis" tabindex="-1"><a class="header-anchor" href="#为何网站数据不适合用redis" aria-hidden="true">#</a> 为何网站数据不适合用redis？</h4>
<ul>
<li>操作频率不是太高（相比于session操作）</li>
<li>断电不能丢失， 必须保留</li>
<li>数据量太大， 内存成本太高</li>
</ul>
<h3 id="redis安装" tabindex="-1"><a class="header-anchor" href="#redis安装" aria-hidden="true">#</a> redis安装</h3>
<p>https://www.runoob.com/redis/redis-install.html</p>
<p>可参考此网站安装配置。</p>
<h4 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-server.exe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="node-js连接redis" tabindex="-1"><a class="header-anchor" href="#node-js连接redis" aria-hidden="true">#</a> Node.js连接redis</h4>
<p>首先我们需要安装一个redis包。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i redis --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nignx代理-和前端联调" tabindex="-1"><a class="header-anchor" href="#nignx代理-和前端联调" aria-hidden="true">#</a> nignx代理（和前端联调）</h2>
<p>一般前端的接口号会与server接口并不一样， 这时候我们需要一个接口进行代理， 使他们访问相同的接口。</p>
<h3 id="nignx介绍" tabindex="-1"><a class="header-anchor" href="#nignx介绍" aria-hidden="true">#</a> nignx介绍</h3>
<ul>
<li>高性能的web服务器， 开源免费</li>
<li>一般用于做静态服务，负载均衡</li>
<li>还有反向代理</li>
</ul>
<h4 id="什么叫做静态服务呢" tabindex="-1"><a class="header-anchor" href="#什么叫做静态服务呢" aria-hidden="true">#</a> 什么叫做静态服务呢？</h4>
<p>比如说我们做了一个CDN， 就是那种网上放图片，放css文件，放js文件， 或者放静态的集群文件， html文件。只要是服务端不需要解析直接返回那种静态文件都可以用nginx做一个高性能的静态服务。</p>
<h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3>
<p>比如说我们有一个server的集群，集群有5台机器。其中一台是主机器，流量都在主机器上。剩下的那几台怎么去均分流量，怎么去分摊， 怎么让每个机器能平摊各种流量。以至于我们整个集群的负载能到最高。这也可以通过nginx配置。 它内部的一个模块可以做到这些。它可以做一个入口， 流量来了它分配到不同的机器上去，平均分配。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085222095.png" alt="image-20220805085222095"></p>
<h4 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h4>
<p>所谓反向代理就是它是对客户端不可见的代理，就叫反向代理。</p>
<p>server端全部涵盖了，客户端控制不了，对客户端来说它是一个黑盒，这样就叫做反向代理。</p>
<h4 id="正向代理" tabindex="-1"><a class="header-anchor" href="#正向代理" aria-hidden="true">#</a> 正向代理</h4>
<p>和反向代理相反的是正向代理， 比如我们公司的内网， 我们在家里访问不了，我们需要在本地装一个代理工具，然后才能访问。这属于一个正向代理。浏览器客户端能够控制的代理。</p>
<h4 id="nginx使用" tabindex="-1"><a class="header-anchor" href="#nginx使用" aria-hidden="true">#</a> nginx使用</h4>
<p>首先需要进行安装， <a href="http://nginx.org/en/download.html" target="_blank" rel="noopener noreferrer">niginx：下载<ExternalLinkIcon/></a></p>
<p>测试配置文件格式是否正确：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动nginx</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重启nginx</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx.exe -s reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>停止</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -s stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重新打开日志文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx.exe -s reopen
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看nginx版本</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h5>
<p>打开nginx-1.16.1\conf\nginx.conf文件进行配置</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>	    location / {
            proxy_pass: http://localhost:8001;
        }
		location /api/ {
			proxy_pass: http://lcoalhost:8000;
			proxy_set_header HOST $host;
		}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>/表示根目录， 代理到8001。 8001是前端端口
/api标识api接口  代理到8000. 8000是server端端口</p>
<p>后端端口代理需要把host传进去， 因为此时他的host不一样了。</p>
<p>此时在访问http://localhost:8080/（前端）和 http://localhost:8080/api/blog/list（server端）就可以了</p>
<h2 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h2>
<h3 id="sql注入" tabindex="-1"><a class="header-anchor" href="#sql注入" aria-hidden="true">#</a> sql注入</h3>
<p>最原始，最简单的攻击， 从有了web2.0就有了sql注入攻击。</p>
<p>攻击方式： 输入一个sql片段， 最终拼接成一段攻击代码</p>
<p>预防措施： 使用mysql的escape 函数处理输入内容即可</p>
<p>如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mysql <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mysql'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    exec<span class="token punctuation">,</span>
    <span class="token literal-property property">escape</span><span class="token operator">:</span> mysql<span class="token punctuation">.</span>escape
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> exec<span class="token punctuation">,</span> escape <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../db/mysql'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">login</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">username<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    username <span class="token operator">=</span> <span class="token function">escape</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span>
    password <span class="token operator">=</span> <span class="token function">escape</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span>
    <span class="token keyword">const</span> sql <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        select username, realname from users where username='</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>username<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">' and password='</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>password<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">'
    </span><span class="token template-punctuation string">`</span></span>
    <span class="token keyword">return</span> <span class="token function">exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">rows</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> rows<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    login
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xss攻击" tabindex="-1"><a class="header-anchor" href="#xss攻击" aria-hidden="true">#</a> xss攻击</h3>
<p>所谓xss攻击指的就是在网页中写入一段js代码以获取用户信息。</p>
<p>如我新建了一篇博客， 在博客内容中有以下一段js代码，</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;script>console.log(document.cookie);&lt;/script>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我创建成功后， 别人看到这篇博客我就能获取它的cookie信息， 并发送到我的服务器。</p>
<h4 id="预防" tabindex="-1"><a class="header-anchor" href="#预防" aria-hidden="true">#</a> 预防</h4>
<p>首先我们需要安装一个插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i xss
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直接在代码中引入使用</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const xss = require('xss')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>title = xss(escape(title)) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以先使用xss后在使用escape函数。</p>
<h3 id="密码加密" tabindex="-1"><a class="header-anchor" href="#密码加密" aria-hidden="true">#</a> 密码加密</h3>
<ul>
<li>万一数据库被攻破， 最不应该泄露的就是用户信息。</li>
<li>攻击方式： 获取用户名和密码， 再去尝试登录其他系统</li>
<li>预防措施： 将密码加密， 即便拿到密码也不知道明文</li>
</ul>
<p>cryp.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> crypto <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'crypto'</span><span class="token punctuation">)</span>

<span class="token comment">//密匙</span>
<span class="token keyword">const</span> <span class="token constant">SECRET_KEY</span> <span class="token operator">=</span> <span class="token string">'WJiol_8776#'</span>

<span class="token comment">//md5 加密</span>
<span class="token keyword">function</span> <span class="token function">md5</span><span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> md5 <span class="token operator">=</span> crypto<span class="token punctuation">.</span><span class="token function">createHash</span><span class="token punctuation">(</span><span class="token string">'md5'</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> md5<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token string">'hex'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//加密函数</span>
<span class="token keyword">function</span> <span class="token function">genPassword</span><span class="token punctuation">(</span><span class="token parameter">password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">password=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>password<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&amp;key=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">SECRET_KEY</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
    <span class="token keyword">return</span> <span class="token function">md5</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    genPassword
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录时使用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> genPassword <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../utils/cryp'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//生成加密密码</span>
password <span class="token operator">=</span> <span class="token function">genPassword</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span>
password <span class="token operator">=</span> <span class="token function">escape</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token comment">//防止xss攻击</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网站运行流程图" tabindex="-1"><a class="header-anchor" href="#网站运行流程图" aria-hidden="true">#</a> 网站运行流程图</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085249591.png" alt="image-20220805085249591"></p>
<h2 id="express" tabindex="-1"><a class="header-anchor" href="#express" aria-hidden="true">#</a> express</h2>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p>首先需要安装脚手架</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i express-generator -g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建项目：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>express blog-express
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入目录安装npm包</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd blog-express
npm i
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="登录" tabindex="-1"><a class="header-anchor" href="#登录" aria-hidden="true">#</a> 登录</h3>
<p>使用 express-session 和 connect-redis</p>
<p>req.session保存登录信息， 登陆校验做成 express 中间件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i express-session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="使用-1" tabindex="-1"><a class="header-anchor" href="#使用-1" aria-hidden="true">#</a> 使用</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const session = require('express-session');

app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',  //默认配置
    // httpOnly: true,    //默认配置
    maxAge: 24 * 60 * 60 * 1000
  }
}))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用redis" tabindex="-1"><a class="header-anchor" href="#使用redis" aria-hidden="true">#</a> 使用redis</h3>
<p>首先安装以下两个插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i redis connect-redis --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> session <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express-session'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> RedisStore <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'connect-redis'</span><span class="token punctuation">)</span><span class="token punctuation">(</span>session<span class="token punctuation">)</span>

<span class="token keyword">const</span> redisClient <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./db/redis'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sessionStore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">client</span><span class="token operator">:</span> redisClient
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">session</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">secret</span><span class="token operator">:</span> <span class="token string">'WJiol#23123_'</span><span class="token punctuation">,</span><span class="token comment">//秘钥，不可暴露</span>
  <span class="token literal-property property">resave</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">saveUninitialized</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">cookie</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">maxAge</span><span class="token operator">:</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">store</span><span class="token operator">:</span> sessionStore<span class="token comment">//redis存储</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>redis.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> redis <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'redis'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token constant">REDIS_CONF</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../conf/db'</span><span class="token punctuation">)</span>

<span class="token comment">//创建客户端</span>
<span class="token keyword">const</span> redisClient <span class="token operator">=</span>  redis<span class="token punctuation">.</span><span class="token function">createClient</span><span class="token punctuation">(</span><span class="token constant">REDIS_CONF</span><span class="token punctuation">.</span>port<span class="token punctuation">,</span> <span class="token constant">REDIS_CONF</span><span class="token punctuation">.</span>host<span class="token punctuation">)</span>
redisClient<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> redisClient
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="记录日志" tabindex="-1"><a class="header-anchor" href="#记录日志" aria-hidden="true">#</a> 记录日志</h3>
<p>使用脚手架推荐的morgan</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  //开发测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="express中间件原理" tabindex="-1"><a class="header-anchor" href="#express中间件原理" aria-hidden="true">#</a> express中间件原理</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085316017.png" alt="image-20220805085316017"></p>
<h2 id="koa2" tabindex="-1"><a class="header-anchor" href="#koa2" aria-hidden="true">#</a> KOA2</h2>
<h3 id="async-await要点" tabindex="-1"><a class="header-anchor" href="#async-await要点" aria-hidden="true">#</a> async/await要点</h3>
<ol>
<li>await 后面可以追加 promise对象， 获取 resolve 的值</li>
<li>await 必须包裹在 async 函数里面</li>
<li>async 函数执行返回的也是一个promise对象</li>
<li>try-catch 截获 promise 中 reject 的值</li>
</ol>
<h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装</h3>
<p>首先安装脚手架工具</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i koa-generator -g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>koa2 blog-koa2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="登录-1" tabindex="-1"><a class="header-anchor" href="#登录-1" aria-hidden="true">#</a> 登录</h3>
<p>基于 koa-generic-session 和 koa-redis</p>
<p>需要安装3个插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i koa-generic-session koa-redis redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> session <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-generic-session'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> redisStore <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-redis'</span><span class="token punctuation">)</span>

<span class="token comment">//session 配置</span>
app<span class="token punctuation">.</span>keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'WJiol#23123_'</span><span class="token punctuation">]</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">session</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">//配置cookie</span>
  <span class="token literal-property property">cookie</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">httpOnly</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">maxAge</span><span class="token operator">:</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">//配置 redis</span>
  <span class="token literal-property property">store</span><span class="token operator">:</span> <span class="token function">redisStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">all</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">REDIS_CONF</span><span class="token punctuation">.</span>host<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">REDIS_CONF</span><span class="token punctuation">.</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// routes</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>index<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> index<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>users<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> users<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>blog<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> blog<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>session一定要在routes前进行配置</p>
<h3 id="koa2记录日志" tabindex="-1"><a class="header-anchor" href="#koa2记录日志" aria-hidden="true">#</a> koa2记录日志</h3>
<p>安装插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i koa-morgan --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>引入</p>
<p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> morgan <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-morgan'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">ENV</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//开发测试环境</span>
  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">morgan</span><span class="token punctuation">(</span><span class="token string">'dev'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">//线上环境</span>
  <span class="token keyword">const</span> logFileName <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">'logs'</span><span class="token punctuation">,</span><span class="token string">'access.log'</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> writeStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span>logFileName<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">flags</span><span class="token operator">:</span> <span class="token string">'a'</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">morgan</span><span class="token punctuation">(</span><span class="token string">'combined'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">stream</span><span class="token operator">:</span> writeStream
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="上线与配置" tabindex="-1"><a class="header-anchor" href="#上线与配置" aria-hidden="true">#</a> 上线与配置</h2>
<h3 id="pm2" tabindex="-1"><a class="header-anchor" href="#pm2" aria-hidden="true">#</a> pm2</h3>
<h4 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装" aria-hidden="true">#</a> 下载安装</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install pm2 -g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看版本</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 --version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h4>
<p>多种启动方式， 后面跟配置文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 start ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>pm2进程列表</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重启进程</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 restart 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 restart app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>后面跟id或者进程名</p>
<p>停止进程</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 stop app/id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除进程</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 delete app/id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看基本信息</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 info app/id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看进程日志</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 log app/id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>监控cpu和内存信息</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pm2 monit app/id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="常用配置" tabindex="-1"><a class="header-anchor" href="#常用配置" aria-hidden="true">#</a> 常用配置</h4>
<p>pm2.conf.json</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
    "apps": {
        "name": "pm2-test-server",
        "script": "bin/www",
        "watch": true,
        "ignore_watch": [
            "node_modules",
            "logs"
        ],
        "instances": 4,
        "error_file": "logs/err.log",
        "out_file": "logs/out.log",
        "log_date_format": "YYYY-MM-DD HH:mm:ss"
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>name: pm2-test-server  app名称</p>
<p>script: app.js 启动文件</p>
<p>watch: true  上线自动重启。 建议设置为false， 再自己手动重启</p>
<p>innore_watch ： [
&quot;logs&quot;
]
即使logs文件夹内有文件改动也不监听， 不重启</p>
<p>&quot;instances&quot;: 4, 使用4核运行</p>
<p>error_file : &quot;logs/err.log&quot;  错误日志存放 / console.error()</p>
<p>out_file : &quot;logs/out.log&quot; 日志存放 / console.log()</p>
<p>log_date_format :&quot;YYYY-MM-DD HH:mm:ss&quot;  每条日志增加时间戳</p>
</div></template>


