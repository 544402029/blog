<template><div><h1 id="koa2" tabindex="-1"><a class="header-anchor" href="#koa2" aria-hidden="true">#</a> Koa2</h1>
<h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目：</h2>
<p>-e 指的是使用ejs模板</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>koa2 -e 项目名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h2>
<h3 id="查询表" tabindex="-1"><a class="header-anchor" href="#查询表" aria-hidden="true">#</a> 查询表</h3>
<p><code v-pre>*</code>号代表查询所有列</p>
<p><code v-pre>select * from users;</code></p>
<h4 id="查询username-nickname" tabindex="-1"><a class="header-anchor" href="#查询username-nickname" aria-hidden="true">#</a> 查询username，nickname</h4>
<p><code v-pre>select username,nickname from users;</code></p>
<h4 id="id倒序查询" tabindex="-1"><a class="header-anchor" href="#id倒序查询" aria-hidden="true">#</a> id倒序查询</h4>
<p><code v-pre>select * from blogs order by id desc;</code></p>
<h4 id="查询总共几条数据" tabindex="-1"><a class="header-anchor" href="#查询总共几条数据" aria-hidden="true">#</a> 查询总共几条数据</h4>
<p><code v-pre>select count(*) as </code>count<code v-pre> from blogs;</code></p>
<p>建议使用id查询，查询所有列性能稍差。
<code v-pre>select count(id) as </code>count<code v-pre> from blogs;</code></p>
<h4 id="分页查询" tabindex="-1"><a class="header-anchor" href="#分页查询" aria-hidden="true">#</a> 分页查询</h4>
<p>从游标2查询2条数据
<code v-pre>select * from blogs order by id desc limit 2 offset 2;</code></p>
<h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3>
<p><code v-pre>-- </code>为注释</p>
<p><code v-pre>-- select * from users;</code></p>
<h3 id="插入数据" tabindex="-1"><a class="header-anchor" href="#插入数据" aria-hidden="true">#</a> 插入数据</h3>
<p>需要注意， <code v-pre>password</code>为关键字， 需要使用``进行包裹</p>
<p><code v-pre>insert into users(username,</code>password<code v-pre>,nickname)values('lisi','123','李四');</code></p>
<h3 id="更新数据" tabindex="-1"><a class="header-anchor" href="#更新数据" aria-hidden="true">#</a> 更新数据</h3>
<p>更新id为1的数据， 不加将会更新所有数据。</p>
<p><code v-pre>update blogs set content='内容1内容1'where id=4;</code></p>
<h3 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据" aria-hidden="true">#</a> 删除数据</h3>
<p>同更新数据一样， 不加where条件将删除全部。</p>
<p><code v-pre>delete from users where id=3;</code></p>
<h3 id="外键" tabindex="-1"><a class="header-anchor" href="#外键" aria-hidden="true">#</a> 外键</h3>
<p>为了防止数据库插入无效数据， 如博客表， 如果不存在userid=9的用户， 然而却在发表博客时传入了userid=9的用户， 这时会在数据库层面进行报错。</p>
<p>如果此时删除userid=1的用户，也会连带把blogs表中所有关于userid=1发表的博客删除。</p>
<p>具体操作：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090750267.png" alt="image-20220805090750267"></p>
<p>在blogs表中将userid与user表中id进行了关联</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090803593.png" alt="image-20220805090803593"></p>
<h3 id="连表查询" tabindex="-1"><a class="header-anchor" href="#连表查询" aria-hidden="true">#</a> 连表查询</h3>
<p>不一定有外键， 但一般会有外键约束。
<code v-pre>select * from blogs inner join users on users.id=blogs.userid;</code></p>
<h4 id="查询特定字段" tabindex="-1"><a class="header-anchor" href="#查询特定字段" aria-hidden="true">#</a> 查询特定字段</h4>
<p>查询了blogs所有列， users的username和nickname
<code v-pre>select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid;</code></p>
<h4 id="条件查询" tabindex="-1"><a class="header-anchor" href="#条件查询" aria-hidden="true">#</a> 条件查询</h4>
<p>查询username=lisi的数据
<code v-pre>select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid where users.username='lisi';</code></p>
<h2 id="sequelize" tabindex="-1"><a class="header-anchor" href="#sequelize" aria-hidden="true">#</a> sequelize</h2>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p><code v-pre> npm i mysql2 sequelize -d</code></p>
<h3 id="连接" tabindex="-1"><a class="header-anchor" href="#连接" aria-hidden="true">#</a> 连接</h3>
<p>seq.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Sequelize <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'sequelize'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> conf <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">'localhost'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">dialect</span><span class="token operator">:</span> <span class="token string">'mysql'</span>
<span class="token punctuation">}</span>

<span class="token comment">// 线上环境，使用连接池</span>
<span class="token comment">// conf.pool = {</span>
<span class="token comment">//     max: 5, //连接池中最大的连接数量</span>
<span class="token comment">//     min: 0, //最小</span>
<span class="token comment">//     idle: 10000 //如果一个连接池 10s 之内没有使用，则释放</span>
<span class="token comment">// }</span>

<span class="token keyword">const</span> seq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token string">'koa2_weibo_db'</span><span class="token punctuation">,</span> <span class="token string">'root'</span><span class="token punctuation">,</span> <span class="token string">'666666'</span><span class="token punctuation">,</span> conf<span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> seq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建模型" tabindex="-1"><a class="header-anchor" href="#创建模型" aria-hidden="true">#</a> 创建模型</h3>
<p>module.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Sequelize <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'sequelize'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> seq <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./seq'</span><span class="token punctuation">)</span>

<span class="token comment">// 创建 User 模型。数据表的名字是 users</span>
<span class="token keyword">const</span> User <span class="token operator">=</span> seq<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// id会自动创建，并设为主键，自增</span>
    <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span><span class="token comment">//varchar(255)</span>
        <span class="token literal-property property">allowNull</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
        <span class="token literal-property property">allowNull</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nickName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
        <span class="token literal-property property">comment</span><span class="token operator">:</span> <span class="token string">'昵称'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 创建blog模型</span>
<span class="token keyword">const</span> Blog <span class="token operator">=</span> seq<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'blog'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
        <span class="token literal-property property">allowNull</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> Sequelize<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
        <span class="token literal-property property">allowNull</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> Sequelize<span class="token punctuation">.</span><span class="token constant">INTEGER</span><span class="token punctuation">,</span>
        <span class="token literal-property property">allowNull</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 外键关联(先查询博客，然后查询该博客相关的用户信息)</span>
Blog<span class="token punctuation">.</span><span class="token function">belongsTo</span><span class="token punctuation">(</span>User<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建外键 Blog.userId -> User.id</span>
    <span class="token literal-property property">foreignKey</span><span class="token operator">:</span> <span class="token string">'userId'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 外键关联第2种方式(先查询用户信息，然后查询到用户发布的博客)</span>
User<span class="token punctuation">.</span><span class="token function">hasMany</span><span class="token punctuation">(</span>Blog<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建外键 Blog.userId -> User.id</span>
    <span class="token literal-property property">foreignKey</span><span class="token operator">:</span> <span class="token string">'userId'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    User<span class="token punctuation">,</span>
    Blog
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="同步" tabindex="-1"><a class="header-anchor" href="#同步" aria-hidden="true">#</a> 同步</h3>
<p>sync.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> seq <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./seq'</span><span class="token punctuation">)</span>

<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./model'</span><span class="token punctuation">)</span>

<span class="token comment">// 测试连接</span>
seq<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'auth ok'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'auth err'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 执行同步</span>
seq<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">force</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'sync ok'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="增加数据" tabindex="-1"><a class="header-anchor" href="#增加数据" aria-hidden="true">#</a> 增加数据</h3>
<p>create.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Blog<span class="token punctuation">,</span> User <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./model'</span><span class="token punctuation">)</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建用户</span>
    <span class="token keyword">const</span> zhangsan <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">'zhangsan'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">'123'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">nickName</span><span class="token operator">:</span> <span class="token string">'张三'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// insert into users (...) values (...)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'zhangsan'</span><span class="token punctuation">,</span> zhangsan<span class="token punctuation">.</span>dataValues<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询数据" tabindex="-1"><a class="header-anchor" href="#查询数据" aria-hidden="true">#</a> 查询数据</h3>
<p>select.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Blog<span class="token punctuation">,</span> User <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./model'</span><span class="token punctuation">)</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// const zhangsan = await User.findOne({</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         userName: 'zhangsan'</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log('zhangsan', zhangsan.dataValues);</span>


    <span class="token comment">// 查询特定的列</span>
    <span class="token comment">// const zhangsanName = await User.findOne({</span>
    <span class="token comment">//     attributes: ['userName', 'nickName'],</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         userName: 'zhangsan'</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log('zhangsanName', zhangsanName.dataValues);</span>


    <span class="token comment">// 查询一个列表</span>
    <span class="token comment">// const zhangsanBlogList = await Blog.findAll({</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         userId: 1</span>
    <span class="token comment">//     },</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         ['id', 'desc']</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>

    <span class="token comment">// console.log('zhangsanBlogList', zhangsanBlogList.map(blog => blog.dataValues));</span>


    <span class="token comment">// 分页</span>
    <span class="token comment">// const blogPageList = await Blog.findAll({</span>
    <span class="token comment">//     limit: 2,//限制本次查询2条</span>
    <span class="token comment">//     offset: 2,//跳过多少条</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         ['id', 'desc']</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log('blogPageList', blogPageList.map(blog => blog.dataValues));</span>

    <span class="token comment">// 查询总数 （一般开发用该Api）</span>
    <span class="token comment">// const blogListAndCount = await Blog.findAndCountAll({</span>
    <span class="token comment">//     limit: 2,//限制本次查询2条</span>
    <span class="token comment">//     offset: 2,//跳过多少条</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         ['id', 'desc']</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log('blogListAndCount', blogListAndCount.count, blogListAndCount.rows.map(blog => blog.dataValues));</span>


    <span class="token comment">// 连表查询</span>
    <span class="token comment">// const blogListWithUser = await Blog.findAndCountAll({</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         ['id', 'desc']</span>
    <span class="token comment">//     ],</span>
    <span class="token comment">//     include: [</span>
    <span class="token comment">//         {</span>
    <span class="token comment">//             model: User,</span>
    <span class="token comment">//             attributes: ['userName', 'nickName'],</span>
    <span class="token comment">//             where: {</span>
    <span class="token comment">//                 userName: 'zhangsan'</span>
    <span class="token comment">//             }</span>
    <span class="token comment">//         }</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(</span>
    <span class="token comment">//     'blogListWithUser',</span>
    <span class="token comment">//     blogListWithUser.count,</span>
    <span class="token comment">//     blogListWithUser.rows.map(blog => {</span>
    <span class="token comment">//         const blogVal = blog.dataValues</span>
    <span class="token comment">//         blogVal.user = blogVal.user.dataValues</span>
    <span class="token comment">//         return blogVal</span>
    <span class="token comment">//     })</span>
    <span class="token comment">// );</span>


    <span class="token comment">// 连表查询2</span>
    <span class="token keyword">const</span> userListWithBlog <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findAndCountAll</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">attributes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'userName'</span><span class="token punctuation">,</span> <span class="token string">'nickName'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">include</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">model</span><span class="token operator">:</span> Blog
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
        <span class="token string">'userListWithBlog'</span><span class="token punctuation">,</span>
        userListWithBlog<span class="token punctuation">.</span>count<span class="token punctuation">,</span>
        userListWithBlog<span class="token punctuation">.</span>rows<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">user</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> userVal <span class="token operator">=</span> user<span class="token punctuation">.</span>dataValues
            userVal<span class="token punctuation">.</span>blogs <span class="token operator">=</span> userVal<span class="token punctuation">.</span>blogs<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">blog</span> <span class="token operator">=></span> blog<span class="token punctuation">.</span>dataValues<span class="token punctuation">)</span>
            <span class="token keyword">return</span> userVal
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改数据" tabindex="-1"><a class="header-anchor" href="#修改数据" aria-hidden="true">#</a> 修改数据</h3>
<p>update.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> User <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./model'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> updateRes <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">nickName</span><span class="token operator">:</span> <span class="token string">'张三法外狂徒'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">where</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">'zhangsan'</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'updateRes...'</span><span class="token punctuation">,</span> updateRes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除数据-1" tabindex="-1"><a class="header-anchor" href="#删除数据-1" aria-hidden="true">#</a> 删除数据</h3>
<p>delete.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> User<span class="token punctuation">,</span> Blog <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./model'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 删除一条博客</span>
    <span class="token comment">// const delRes = await Blog.destroy({</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         id: '5'</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log('delRes...', delRes);</span>

    <span class="token comment">// 删除一个用户</span>
    <span class="token keyword">const</span> delUserRes <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">where</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'delUserRes'</span><span class="token punctuation">,</span> delUserRes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jest单元测试" tabindex="-1"><a class="header-anchor" href="#jest单元测试" aria-hidden="true">#</a> jest单元测试</h2>
<h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装</h3>
<p><code v-pre>npm i jest -D</code></p>
<h3 id="执行命令" tabindex="-1"><a class="header-anchor" href="#执行命令" aria-hidden="true">#</a> 执行命令</h3>
<p>--runInBand : 按顺序执行
--forceExit ： 测试完退出
--colors ： 按颜色区分输出，可视化较好</p>
<p><code v-pre>&quot;test&quot;: &quot;cross-env NODE_ENV=test jest --runInBand --forceExit --colors&quot;</code></p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>在根目录创建test文件夹</p>
<p>demo.test.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'10+20 应该等于30'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


