import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.c9f640fb.js";const p={},t=e(`<h1 id="koa2" tabindex="-1"><a class="header-anchor" href="#koa2" aria-hidden="true">#</a> Koa2</h1><h2 id="\u521B\u5EFA\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u9879\u76EE" aria-hidden="true">#</a> \u521B\u5EFA\u9879\u76EE\uFF1A</h2><p>-e \u6307\u7684\u662F\u4F7F\u7528ejs\u6A21\u677F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>koa2 -e \u9879\u76EE\u540D\u79F0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u6570\u636E\u5E93\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u64CD\u4F5C" aria-hidden="true">#</a> \u6570\u636E\u5E93\u64CD\u4F5C</h2><h3 id="\u67E5\u8BE2\u8868" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u8868" aria-hidden="true">#</a> \u67E5\u8BE2\u8868</h3><p><code>*</code>\u53F7\u4EE3\u8868\u67E5\u8BE2\u6240\u6709\u5217</p><p><code>select * from users;</code></p><h4 id="\u67E5\u8BE2username-nickname" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2username-nickname" aria-hidden="true">#</a> \u67E5\u8BE2username\uFF0Cnickname</h4><p><code>select username,nickname from users;</code></p><h4 id="id\u5012\u5E8F\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#id\u5012\u5E8F\u67E5\u8BE2" aria-hidden="true">#</a> id\u5012\u5E8F\u67E5\u8BE2</h4><p><code>select * from blogs order by id desc;</code></p><h4 id="\u67E5\u8BE2\u603B\u5171\u51E0\u6761\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u603B\u5171\u51E0\u6761\u6570\u636E" aria-hidden="true">#</a> \u67E5\u8BE2\u603B\u5171\u51E0\u6761\u6570\u636E</h4><p><code>select count(*) as </code>count<code> from blogs;</code></p><p>\u5EFA\u8BAE\u4F7F\u7528id\u67E5\u8BE2\uFF0C\u67E5\u8BE2\u6240\u6709\u5217\u6027\u80FD\u7A0D\u5DEE\u3002 <code>select count(id) as </code>count<code> from blogs;</code></p><h4 id="\u5206\u9875\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u5206\u9875\u67E5\u8BE2" aria-hidden="true">#</a> \u5206\u9875\u67E5\u8BE2</h4><p>\u4ECE\u6E38\u68072\u67E5\u8BE22\u6761\u6570\u636E <code>select * from blogs order by id desc limit 2 offset 2;</code></p><h3 id="\u6CE8\u91CA" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u91CA" aria-hidden="true">#</a> \u6CE8\u91CA</h3><p><code>-- </code>\u4E3A\u6CE8\u91CA</p><p><code>-- select * from users;</code></p><h3 id="\u63D2\u5165\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u63D2\u5165\u6570\u636E" aria-hidden="true">#</a> \u63D2\u5165\u6570\u636E</h3><p>\u9700\u8981\u6CE8\u610F\uFF0C <code>password</code>\u4E3A\u5173\u952E\u5B57\uFF0C \u9700\u8981\u4F7F\u7528\`\`\u8FDB\u884C\u5305\u88F9</p><p><code>insert into users(username,</code>password<code>,nickname)values(&#39;lisi&#39;,&#39;123&#39;,&#39;\u674E\u56DB&#39;);</code></p><h3 id="\u66F4\u65B0\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u66F4\u65B0\u6570\u636E" aria-hidden="true">#</a> \u66F4\u65B0\u6570\u636E</h3><p>\u66F4\u65B0id\u4E3A1\u7684\u6570\u636E\uFF0C \u4E0D\u52A0\u5C06\u4F1A\u66F4\u65B0\u6240\u6709\u6570\u636E\u3002</p><p><code>update blogs set content=&#39;\u5185\u5BB91\u5185\u5BB91&#39;where id=4;</code></p><h3 id="\u5220\u9664\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u6570\u636E" aria-hidden="true">#</a> \u5220\u9664\u6570\u636E</h3><p>\u540C\u66F4\u65B0\u6570\u636E\u4E00\u6837\uFF0C \u4E0D\u52A0where\u6761\u4EF6\u5C06\u5220\u9664\u5168\u90E8\u3002</p><p><code>delete from users where id=3;</code></p><h3 id="\u5916\u952E" tabindex="-1"><a class="header-anchor" href="#\u5916\u952E" aria-hidden="true">#</a> \u5916\u952E</h3><p>\u4E3A\u4E86\u9632\u6B62\u6570\u636E\u5E93\u63D2\u5165\u65E0\u6548\u6570\u636E\uFF0C \u5982\u535A\u5BA2\u8868\uFF0C \u5982\u679C\u4E0D\u5B58\u5728userid=9\u7684\u7528\u6237\uFF0C \u7136\u800C\u5374\u5728\u53D1\u8868\u535A\u5BA2\u65F6\u4F20\u5165\u4E86userid=9\u7684\u7528\u6237\uFF0C \u8FD9\u65F6\u4F1A\u5728\u6570\u636E\u5E93\u5C42\u9762\u8FDB\u884C\u62A5\u9519\u3002</p><p>\u5982\u679C\u6B64\u65F6\u5220\u9664userid=1\u7684\u7528\u6237\uFF0C\u4E5F\u4F1A\u8FDE\u5E26\u628Ablogs\u8868\u4E2D\u6240\u6709\u5173\u4E8Euserid=1\u53D1\u8868\u7684\u535A\u5BA2\u5220\u9664\u3002</p><p>\u5177\u4F53\u64CD\u4F5C\uFF1A</p><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090750267.png" alt="image-20220805090750267"></p><p>\u5728blogs\u8868\u4E2D\u5C06userid\u4E0Euser\u8868\u4E2Did\u8FDB\u884C\u4E86\u5173\u8054</p><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090803593.png" alt="image-20220805090803593"></p><h3 id="\u8FDE\u8868\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u8868\u67E5\u8BE2" aria-hidden="true">#</a> \u8FDE\u8868\u67E5\u8BE2</h3><p>\u4E0D\u4E00\u5B9A\u6709\u5916\u952E\uFF0C \u4F46\u4E00\u822C\u4F1A\u6709\u5916\u952E\u7EA6\u675F\u3002 <code>select * from blogs inner join users on users.id=blogs.userid;</code></p><h4 id="\u67E5\u8BE2\u7279\u5B9A\u5B57\u6BB5" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u7279\u5B9A\u5B57\u6BB5" aria-hidden="true">#</a> \u67E5\u8BE2\u7279\u5B9A\u5B57\u6BB5</h4><p>\u67E5\u8BE2\u4E86blogs\u6240\u6709\u5217\uFF0C users\u7684username\u548Cnickname <code>select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid;</code></p><h4 id="\u6761\u4EF6\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u6761\u4EF6\u67E5\u8BE2" aria-hidden="true">#</a> \u6761\u4EF6\u67E5\u8BE2</h4><p>\u67E5\u8BE2username=lisi\u7684\u6570\u636E <code>select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid where users.username=&#39;lisi&#39;;</code></p><h2 id="sequelize" tabindex="-1"><a class="header-anchor" href="#sequelize" aria-hidden="true">#</a> sequelize</h2><h3 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h3><p><code> npm i mysql2 sequelize -d</code></p><h3 id="\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u63A5" aria-hidden="true">#</a> \u8FDE\u63A5</h3><p>seq.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> Sequelize <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;sequelize&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> conf <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">dialect</span><span class="token operator">:</span> <span class="token string">&#39;mysql&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7EBF\u4E0A\u73AF\u5883\uFF0C\u4F7F\u7528\u8FDE\u63A5\u6C60</span>
<span class="token comment">// conf.pool = {</span>
<span class="token comment">//     max: 5, //\u8FDE\u63A5\u6C60\u4E2D\u6700\u5927\u7684\u8FDE\u63A5\u6570\u91CF</span>
<span class="token comment">//     min: 0, //\u6700\u5C0F</span>
<span class="token comment">//     idle: 10000 //\u5982\u679C\u4E00\u4E2A\u8FDE\u63A5\u6C60 10s \u4E4B\u5185\u6CA1\u6709\u4F7F\u7528\uFF0C\u5219\u91CA\u653E</span>
<span class="token comment">// }</span>

<span class="token keyword">const</span> seq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token string">&#39;koa2_weibo_db&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;666666&#39;</span><span class="token punctuation">,</span> conf<span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> seq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u521B\u5EFA\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u6A21\u578B" aria-hidden="true">#</a> \u521B\u5EFA\u6A21\u578B</h3><p>module.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> Sequelize <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;sequelize&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> seq <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./seq&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// \u521B\u5EFA User \u6A21\u578B\u3002\u6570\u636E\u8868\u7684\u540D\u5B57\u662F users</span>
<span class="token keyword">const</span> User <span class="token operator">=</span> seq<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// id\u4F1A\u81EA\u52A8\u521B\u5EFA\uFF0C\u5E76\u8BBE\u4E3A\u4E3B\u952E\uFF0C\u81EA\u589E</span>
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
        <span class="token literal-property property">comment</span><span class="token operator">:</span> <span class="token string">&#39;\u6635\u79F0&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// \u521B\u5EFAblog\u6A21\u578B</span>
<span class="token keyword">const</span> Blog <span class="token operator">=</span> seq<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;blog&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
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

<span class="token comment">// \u5916\u952E\u5173\u8054(\u5148\u67E5\u8BE2\u535A\u5BA2\uFF0C\u7136\u540E\u67E5\u8BE2\u8BE5\u535A\u5BA2\u76F8\u5173\u7684\u7528\u6237\u4FE1\u606F)</span>
Blog<span class="token punctuation">.</span><span class="token function">belongsTo</span><span class="token punctuation">(</span>User<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u521B\u5EFA\u5916\u952E Blog.userId -&gt; User.id</span>
    <span class="token literal-property property">foreignKey</span><span class="token operator">:</span> <span class="token string">&#39;userId&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// \u5916\u952E\u5173\u8054\u7B2C2\u79CD\u65B9\u5F0F(\u5148\u67E5\u8BE2\u7528\u6237\u4FE1\u606F\uFF0C\u7136\u540E\u67E5\u8BE2\u5230\u7528\u6237\u53D1\u5E03\u7684\u535A\u5BA2)</span>
User<span class="token punctuation">.</span><span class="token function">hasMany</span><span class="token punctuation">(</span>Blog<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u521B\u5EFA\u5916\u952E Blog.userId -&gt; User.id</span>
    <span class="token literal-property property">foreignKey</span><span class="token operator">:</span> <span class="token string">&#39;userId&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    User<span class="token punctuation">,</span>
    Blog
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u540C\u6B65" tabindex="-1"><a class="header-anchor" href="#\u540C\u6B65" aria-hidden="true">#</a> \u540C\u6B65</h3><p>sync.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> seq <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./seq&#39;</span><span class="token punctuation">)</span>

<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./model&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// \u6D4B\u8BD5\u8FDE\u63A5</span>
seq<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;auth ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;auth err&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// \u6267\u884C\u540C\u6B65</span>
seq<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">force</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;sync ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u589E\u52A0\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u589E\u52A0\u6570\u636E" aria-hidden="true">#</a> \u589E\u52A0\u6570\u636E</h3><p>create.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Blog<span class="token punctuation">,</span> User <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./model&#39;</span><span class="token punctuation">)</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u521B\u5EFA\u7528\u6237</span>
    <span class="token keyword">const</span> zhangsan <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">&#39;zhangsan&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">nickName</span><span class="token operator">:</span> <span class="token string">&#39;\u5F20\u4E09&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// insert into users (...) values (...)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;zhangsan&#39;</span><span class="token punctuation">,</span> zhangsan<span class="token punctuation">.</span>dataValues<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u67E5\u8BE2\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u6570\u636E" aria-hidden="true">#</a> \u67E5\u8BE2\u6570\u636E</h3><p>select.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Blog<span class="token punctuation">,</span> User <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./model&#39;</span><span class="token punctuation">)</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// const zhangsan = await User.findOne({</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         userName: &#39;zhangsan&#39;</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(&#39;zhangsan&#39;, zhangsan.dataValues);</span>


    <span class="token comment">// \u67E5\u8BE2\u7279\u5B9A\u7684\u5217</span>
    <span class="token comment">// const zhangsanName = await User.findOne({</span>
    <span class="token comment">//     attributes: [&#39;userName&#39;, &#39;nickName&#39;],</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         userName: &#39;zhangsan&#39;</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(&#39;zhangsanName&#39;, zhangsanName.dataValues);</span>


    <span class="token comment">// \u67E5\u8BE2\u4E00\u4E2A\u5217\u8868</span>
    <span class="token comment">// const zhangsanBlogList = await Blog.findAll({</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         userId: 1</span>
    <span class="token comment">//     },</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         [&#39;id&#39;, &#39;desc&#39;]</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>

    <span class="token comment">// console.log(&#39;zhangsanBlogList&#39;, zhangsanBlogList.map(blog =&gt; blog.dataValues));</span>


    <span class="token comment">// \u5206\u9875</span>
    <span class="token comment">// const blogPageList = await Blog.findAll({</span>
    <span class="token comment">//     limit: 2,//\u9650\u5236\u672C\u6B21\u67E5\u8BE22\u6761</span>
    <span class="token comment">//     offset: 2,//\u8DF3\u8FC7\u591A\u5C11\u6761</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         [&#39;id&#39;, &#39;desc&#39;]</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(&#39;blogPageList&#39;, blogPageList.map(blog =&gt; blog.dataValues));</span>

    <span class="token comment">// \u67E5\u8BE2\u603B\u6570 \uFF08\u4E00\u822C\u5F00\u53D1\u7528\u8BE5Api\uFF09</span>
    <span class="token comment">// const blogListAndCount = await Blog.findAndCountAll({</span>
    <span class="token comment">//     limit: 2,//\u9650\u5236\u672C\u6B21\u67E5\u8BE22\u6761</span>
    <span class="token comment">//     offset: 2,//\u8DF3\u8FC7\u591A\u5C11\u6761</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         [&#39;id&#39;, &#39;desc&#39;]</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(&#39;blogListAndCount&#39;, blogListAndCount.count, blogListAndCount.rows.map(blog =&gt; blog.dataValues));</span>


    <span class="token comment">// \u8FDE\u8868\u67E5\u8BE2</span>
    <span class="token comment">// const blogListWithUser = await Blog.findAndCountAll({</span>
    <span class="token comment">//     order: [</span>
    <span class="token comment">//         [&#39;id&#39;, &#39;desc&#39;]</span>
    <span class="token comment">//     ],</span>
    <span class="token comment">//     include: [</span>
    <span class="token comment">//         {</span>
    <span class="token comment">//             model: User,</span>
    <span class="token comment">//             attributes: [&#39;userName&#39;, &#39;nickName&#39;],</span>
    <span class="token comment">//             where: {</span>
    <span class="token comment">//                 userName: &#39;zhangsan&#39;</span>
    <span class="token comment">//             }</span>
    <span class="token comment">//         }</span>
    <span class="token comment">//     ]</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(</span>
    <span class="token comment">//     &#39;blogListWithUser&#39;,</span>
    <span class="token comment">//     blogListWithUser.count,</span>
    <span class="token comment">//     blogListWithUser.rows.map(blog =&gt; {</span>
    <span class="token comment">//         const blogVal = blog.dataValues</span>
    <span class="token comment">//         blogVal.user = blogVal.user.dataValues</span>
    <span class="token comment">//         return blogVal</span>
    <span class="token comment">//     })</span>
    <span class="token comment">// );</span>


    <span class="token comment">// \u8FDE\u8868\u67E5\u8BE22</span>
    <span class="token keyword">const</span> userListWithBlog <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findAndCountAll</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">attributes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;userName&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;nickName&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">include</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">model</span><span class="token operator">:</span> Blog
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
        <span class="token string">&#39;userListWithBlog&#39;</span><span class="token punctuation">,</span>
        userListWithBlog<span class="token punctuation">.</span>count<span class="token punctuation">,</span>
        userListWithBlog<span class="token punctuation">.</span>rows<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">user</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> userVal <span class="token operator">=</span> user<span class="token punctuation">.</span>dataValues
            userVal<span class="token punctuation">.</span>blogs <span class="token operator">=</span> userVal<span class="token punctuation">.</span>blogs<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">blog</span> <span class="token operator">=&gt;</span> blog<span class="token punctuation">.</span>dataValues<span class="token punctuation">)</span>
            <span class="token keyword">return</span> userVal
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4FEE\u6539\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u6570\u636E" aria-hidden="true">#</a> \u4FEE\u6539\u6570\u636E</h3><p>update.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> User <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./model&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> updateRes <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">nickName</span><span class="token operator">:</span> <span class="token string">&#39;\u5F20\u4E09\u6CD5\u5916\u72C2\u5F92&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">where</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">&#39;zhangsan&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;updateRes...&#39;</span><span class="token punctuation">,</span> updateRes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5220\u9664\u6570\u636E-1" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u6570\u636E-1" aria-hidden="true">#</a> \u5220\u9664\u6570\u636E</h3><p>delete.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> User<span class="token punctuation">,</span> Blog <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./model&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5220\u9664\u4E00\u6761\u535A\u5BA2</span>
    <span class="token comment">// const delRes = await Blog.destroy({</span>
    <span class="token comment">//     where: {</span>
    <span class="token comment">//         id: &#39;5&#39;</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(&#39;delRes...&#39;, delRes);</span>

    <span class="token comment">// \u5220\u9664\u4E00\u4E2A\u7528\u6237</span>
    <span class="token keyword">const</span> delUserRes <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">where</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;delUserRes&#39;</span><span class="token punctuation">,</span> delUserRes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jest\u5355\u5143\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#jest\u5355\u5143\u6D4B\u8BD5" aria-hidden="true">#</a> jest\u5355\u5143\u6D4B\u8BD5</h2><h3 id="\u5B89\u88C5-1" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-1" aria-hidden="true">#</a> \u5B89\u88C5</h3><p><code>npm i jest -D</code></p><h3 id="\u6267\u884C\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u6267\u884C\u547D\u4EE4" aria-hidden="true">#</a> \u6267\u884C\u547D\u4EE4</h3><p>--runInBand : \u6309\u987A\u5E8F\u6267\u884C --forceExit \uFF1A \u6D4B\u8BD5\u5B8C\u9000\u51FA --colors \uFF1A \u6309\u989C\u8272\u533A\u5206\u8F93\u51FA\uFF0C\u53EF\u89C6\u5316\u8F83\u597D</p><p><code>&quot;test&quot;: &quot;cross-env NODE_ENV=test jest --runInBand --forceExit --colors&quot;</code></p><h3 id="\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a> \u4F7F\u7528</h3><p>\u5728\u6839\u76EE\u5F55\u521B\u5EFAtest\u6587\u4EF6\u5939</p><p>demo.test.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;10+20 \u5E94\u8BE5\u7B49\u4E8E30&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,76),o=[t];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","Koa2\u65B0\u6D6A\u535A\u5BA2.html.vue"]]);export{d as default};
