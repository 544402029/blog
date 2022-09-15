<template><div><h1 id="vue全家桶应用" tabindex="-1"><a class="header-anchor" href="#vue全家桶应用" aria-hidden="true">#</a> VUE全家桶应用</h1>
<h2 id="koa基础" tabindex="-1"><a class="header-anchor" href="#koa基础" aria-hidden="true">#</a> koa基础</h2>
<p>首先要保证我们已经全局安装KOA2的脚手架工具<code v-pre>koa-generator</code>。</p>
<p>然后我们先利用脚手架创建一个ejs模板引擎。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>koa2 -e koa2-learn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着进行<code v-pre>npm i</code>安装所有依赖包。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install --update-binary
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动项目：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm start koa2-learn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mongoose和redis基础" tabindex="-1"><a class="header-anchor" href="#mongoose和redis基础" aria-hidden="true">#</a> Mongoose和Redis基础</h2>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p>首先安装<strong>mongoDB</strong>和可视化工具<strong>RoBo 3T</strong>。</p>
<p>按照<a href="https://www.runoob.com/mongodb/mongodb-window-install.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/mongodb/mongodb-window-install.html<ExternalLinkIcon/></a>网站进行配置启动</p>
<p>检测<strong>mongoDB</strong>是否安装成功，需执行以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>which mongod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们需要安装<code v-pre>mongoose</code>插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i mongoose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来我们在项目根文件夹创建dbs文件夹， 创建 config.js 文件。目录如下：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090436497.png" alt="image-20220805090436497"></p>
<p>config.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">dbs</span><span class="token operator">:</span> <span class="token string">'mongodb://127.0.0.1:27017/dbs'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>person.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//文件名就是对应的表明， 所以不要随便命名</span>
<span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongoose'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//建数据表</span>
<span class="token keyword">let</span> personSchema <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">mongoose<span class="token punctuation">.</span>Schema</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> Number
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> mongoose<span class="token punctuation">.</span><span class="token function">model</span><span class="token punctuation">(</span><span class="token string">'Person'</span><span class="token punctuation">,</span> personSchema<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> views <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-views'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> json <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> onerror <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-onerror'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> bodyparser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-bodyparser'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> logger <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-logger'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pv <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./middleware/koa-pv'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongoose'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> dbConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dbs/config'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./routes/index'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./routes/users'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// error handler</span>
<span class="token function">onerror</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// middlewares</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token function">bodyparser</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">enableTypes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'json'</span><span class="token punctuation">,</span> <span class="token string">'form'</span><span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">pv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-static'</span><span class="token punctuation">)</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token function">views</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/views'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extension</span><span class="token operator">:</span> <span class="token string">'ejs'</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// logger</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> start <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ctx<span class="token punctuation">.</span>method<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ctx<span class="token punctuation">.</span>url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> - </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ms<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">ms</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// routes</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>index<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> index<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>users<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> users<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//连接数据库</span>
mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>dbConfig<span class="token punctuation">.</span>dbs<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">useNewUrlParser</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// error-handling</span>
app<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'server error'</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> app<span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>users.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-router'</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Person <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../dbs/models/person'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">prefix</span><span class="token punctuation">(</span><span class="token string">'/users'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'this is a users response!'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/bar'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'this is a users/bar response'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/addPerson'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">.</span>age
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> code<span class="token punctuation">;</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">//保存数据</span>
    <span class="token keyword">await</span> person<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    code <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    code <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
    code
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/getPerson'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> Person<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">.</span>name <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> results <span class="token operator">=</span> <span class="token keyword">await</span> Person<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">.</span>name <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    result<span class="token punctuation">,</span>
    results
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/updatePerson'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> Person<span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">.</span>name
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">.</span>age
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
    result
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/removePerson'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> Person<span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">.</span>name
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
    result
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们访问一下这个接口, 在命令行输入以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -d 'name=lilei&amp;age=27' http://localhost:3000/addPerson
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>curl</code>是一个 Nginx 命令， <code v-pre>-d</code> 是 post 方式， <code v-pre>name=lilei&amp;age=27'</code>是数据项， <code v-pre> http://localhost:3000/addPerson</code> 是访问地址。</p>
<p>也可以选择使用 postman 来访问接口。</p>
<p>这样我们就把数据写入到数据库了。</p>
<h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h2>
<p>我们需要先安装两个中间件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i koa-generic-session koa-redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>koa-generic-session 主要用来操作 session , koa-redis 主要用来链接 redis的。</p>
<p>在app.js内引入</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> views <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-views'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> json <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> onerror <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-onerror'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> bodyparser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-bodyparser'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> logger <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-logger'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> session <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-generic-session'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Redis <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-redis'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pv <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./middleware/koa-pv'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongoose'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> dbConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dbs/config'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./routes/index'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./routes/users'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// error handler</span>
<span class="token function">onerror</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//加密信息</span>
app<span class="token punctuation">.</span>keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'keys'</span><span class="token punctuation">,</span> <span class="token string">'keyskeys'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">//链接redis</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token function">session</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">store</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Redis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// middlewares</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token function">bodyparser</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">enableTypes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'json'</span><span class="token punctuation">,</span> <span class="token string">'form'</span><span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">pv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-static'</span><span class="token punctuation">)</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token function">views</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/views'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extension</span><span class="token operator">:</span> <span class="token string">'ejs'</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// logger</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> start <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ctx<span class="token punctuation">.</span>method<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ctx<span class="token punctuation">.</span>url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> - </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ms<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">ms</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// routes</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>index<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> index<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>users<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> users<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//连接数据库</span>
mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>dbConfig<span class="token punctuation">.</span>dbs<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">useNewUrlParser</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// error-handling</span>
app<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'server error'</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> app<span class="token punctuation">;</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nuxt-js基础" tabindex="-1"><a class="header-anchor" href="#nuxt-js基础" aria-hidden="true">#</a> Nuxt.js基础</h2>
<h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装</h3>
<p>首先创建一个以 koa2 +  nuxt.js  为模板的项目。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vue init nuxt-community/koa-template nuxt-learn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090521381.png" alt="image-20220805090521381"></p>
<p>search.vue</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>page<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Page is search<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">layout</span><span class="token operator">:</span> <span class="token string">'search'</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>layout目录下就是模板， 我们可以使用模板， layout 就是设置你要使用哪个模板</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>layout-search<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>search template<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nuxt</span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span><span class="token punctuation">></span></span>search footer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.layout-search</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nuxt 相当于是 vue 内的 router-view 。</p>
<p>default.vue是默认模板， 如果不设置 layout ， 那么使用的就是这个。</p>
<p>输出结果：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090543428.png" alt="image-20220805090543428"></p>
<p>以上只是静态的数据， 如果想要动态数据需要进行其他配置。</p>
<h3 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染" aria-hidden="true">#</a> 服务端渲染</h3>
<p>文件目录：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090556136.png" alt="image-20220805090556136"></p>
<p>search.vue</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>page<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) of list<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
        {{item}}
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">layout</span><span class="token operator">:</span> <span class="token string">'search'</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">asyncData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>status<span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>list<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'http://localhost:3000/city/list'</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> list <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>city.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">'koa-router'</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">'/city'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/list'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'北京'</span><span class="token punctuation">,</span> <span class="token string">'天津'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就可以直接在网页源代码中看到获取的城市数据了。</p>
<h2 id="项目实战" tabindex="-1"><a class="header-anchor" href="#项目实战" aria-hidden="true">#</a> 项目实战</h2>
<h3 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h3>
<p>首先全局安装<code v-pre>npx</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> npm i -g npx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建项目：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npx create-nuxt-app mt-app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用babel</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server/index.js --exec babel-node",
    "generate": "nuxt generate"
  },
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行命令后加 <code v-pre> --exec babel-node</code></p>
<p>安装插件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> npm i babel-preset-es2015
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建配置文件 <code v-pre>.babelrc</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
  "presets": ["es2015"]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果出现 babel-node 不是执行命令， 请执行以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> npm i babel-cli -S
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="安装css预处理器loader" tabindex="-1"><a class="header-anchor" href="#安装css预处理器loader" aria-hidden="true">#</a> 安装css预处理器loader</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i sass-loader node-sass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h2>
<h3 id="导入数据库" tabindex="-1"><a class="header-anchor" href="#导入数据库" aria-hidden="true">#</a> 导入数据库</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mongoimport -d student -c areas areas.dat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>遇到mongoimport命令无效</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090632863.png" alt="image-20220805090632863"></p>
<p>环境变量有这个 系统会自动去这个路径下面找</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090651374.png" alt="image-20220805090651374"></p>
<p>也可以参考<a href="https://blog.csdn.net/YUHUI01/article/details/80862425" target="_blank" rel="noopener noreferrer">mongodb——设置为全局环境变量
<ExternalLinkIcon/></a>此博客设置全局变量。</p>
</div></template>


