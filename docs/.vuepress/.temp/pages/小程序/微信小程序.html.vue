<template><div><h2 id="微信小程序" tabindex="-1"><a class="header-anchor" href="#微信小程序" aria-hidden="true">#</a> 微信小程序：</h2>
<h3 id="vscode的插件推荐" tabindex="-1"><a class="header-anchor" href="#vscode的插件推荐" aria-hidden="true">#</a> vscode的插件推荐</h3>
<p>minapp插件很好用。</p>
<h3 id="小程序组织结构" tabindex="-1"><a class="header-anchor" href="#小程序组织结构" aria-hidden="true">#</a> 小程序组织结构</h3>
<p>小程序下有三个全局文件，<code v-pre>app.json</code>全局配置文件，<code v-pre>app.wxss</code>全局样式文件，<code v-pre>app.js</code>全局业务文件， 三个文件名字不能更改！</p>
<p>小程序可以有多个Page页面所组成。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805084802731.png" alt="image-20220805084802731"></p>
<p><code v-pre>project.config.json</code>小程序根据用户环境生成的配置文件， 我们不需要关注。</p>
<p>所有页面都要在<code v-pre>app.json</code>文件中有配置， 没有配置的页面不会进行显示。</p>
<h3 id="前端设计稿" tabindex="-1"><a class="header-anchor" href="#前端设计稿" aria-hidden="true">#</a> 前端设计稿</h3>
<p>以Iphone6为标准：  750 *  1334</p>
<ul>
<li>小程序设计稿依据：</li>
</ul>
<p>以iphone6为基准，宽度为750个物理像素，对应逻辑分辨率为375pt，高度为667 * 2 个物理像素，即1334个物理像素 对应逻辑分辨率为667pt</p>
<div class="custom-container tip">
<p class="custom-container-title">备注</p>
<p>物理像素的尺寸并不是真实物理尺寸，没有长度概念，指代的是像素点的个数（点是没有尺寸概念的）</p>
<p>px不会自适应，在所有屏幕上大小不变，rpx会根据屏幕自适应，以iphone6为基准的前提下(屏幕显示宽度为375pt)
在css中写px，和iphone6的pt 是1:1的关系，如375px对应了375pt</p>
<p>写rpx，则是2:1的关系，如750rpx对应了375pt</p>
</div>
<h3 id="自定义事件激活" tabindex="-1"><a class="header-anchor" href="#自定义事件激活" aria-hidden="true">#</a> 自定义事件激活</h3>
<ul>
<li>首先在页面写一个事件 <code v-pre>bind:like=&quot;onLike&quot;</code>，在对应的 js 内写入相应事件函数</li>
</ul>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;v-like class=&quot;like&quot; bind:like=&quot;onLike&quot; count=&quot;{{likeCount}}&quot; isLike=&quot;{{likeStatus}}&quot;&gt;&lt;/v-like&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>组件内</li>
</ul>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;view bindtap=&quot;onLike&quot; class=&quot;container&quot;&gt;
	&lt;image class=&quot;icon&quot; src=&quot;{{isLike?like:disLike}}&quot;&gt;&lt;/image&gt;
	&lt;text class=&quot;like-num&quot;&gt;{{count}}&lt;/text&gt;
&lt;/view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">onLike</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> behavior <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>isLike <span class="token operator">?</span> <span class="token string">'like'</span> <span class="token operator">:</span> <span class="token string">'cancel'</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">triggerEvent</span><span class="token punctuation">(</span><span class="token string">'like'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        behavior
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="observer函数应用-修改组件属性" tabindex="-1"><a class="header-anchor" href="#observer函数应用-修改组件属性" aria-hidden="true">#</a> observer函数应用（修改组件属性）</h3>
<p>监听组件属性变化时触发</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">properties</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">index</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span>String<span class="token punctuation">,</span>
    <span class="token function-variable function">observer</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">,</span> changedPath</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">let</span> val <span class="token operator">=</span> newVal <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token operator">?</span><span class="token string">'0'</span><span class="token operator">+</span>newVal<span class="token operator">:</span>newVal
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">_index</span><span class="token operator">:</span>val
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意千万不要在 <code v-pre>observer</code> 中修改自身属性值， 可增加一个 data 属性 <code v-pre>_index</code> 作为修改变量的值.</p>
<h3 id="组件继承-behavior" tabindex="-1"><a class="header-anchor" href="#组件继承-behavior" aria-hidden="true">#</a> 组件继承-Behavior</h3>
<p>作用： 可以在多个组件内共用一段代码</p>
<p>写法：</p>
<p>先建立一个js文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> classicBeh <span class="token operator">=</span> <span class="token function">Behavior</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">properties</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">img</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">content</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">hidden</span><span class="token operator">:</span> Boolean
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>
  classicBeh
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在组件内使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>
  classicBeh
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../classic-beh'</span>

<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">behaviors</span><span class="token operator">:</span> <span class="token punctuation">[</span>classicBeh<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="页面传值" tabindex="-1"><a class="header-anchor" href="#页面传值" aria-hidden="true">#</a> 页面传值</h3>
<ul>
<li>传值：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token doc-comment comment">/**
   * 组件的方法列表
   */</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">onTap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">const</span> bid <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>properties<span class="token punctuation">.</span>book<span class="token punctuation">.</span>id
      wx<span class="token punctuation">.</span><span class="token function">navigateTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/pages/book-detail/index?bid=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>bid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>接收：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> bid <span class="token operator">=</span> options<span class="token punctuation">.</span>bid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="slot插槽使用" tabindex="-1"><a class="header-anchor" href="#slot插槽使用" aria-hidden="true">#</a> slot插槽使用</h3>
<ul>
<li>在组件内开启插槽</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">multipleSlots</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在组件内定义插槽</li>
</ul>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;view class=&quot;container tag-class&quot; bind:tap=&quot;onClick&quot;&gt;
	&lt;text class=&quot;comment&quot;&gt;{{text}}&lt;/text&gt;
	&lt;slot name=&quot;after&quot;&gt;&lt;/slot&gt;
&lt;/view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在页面中使用</li>
</ul>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;v-tag text=&quot;{{item.content}}&quot; tag-class=&quot;{{tool.highlight(index)}}&quot;&gt;
  &lt;text class=&quot;num&quot; slot=&quot;after&quot;&gt;{{'+'+item.nums}}&lt;/text&gt;
&lt;/v-tag&gt;
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>slot 名字与组件内 slot 的 name 相同即可，可写入多个插槽，name 要不一样</p>
<h3 id="自定义组件样式" tabindex="-1"><a class="header-anchor" href="#自定义组件样式" aria-hidden="true">#</a> 自定义组件样式</h3>
<h4 id="hack方式" tabindex="-1"><a class="header-anchor" href="#hack方式" aria-hidden="true">#</a> hack方式</h4>
<p>小程序目前不支持自定义组件的样式， 可以先选中某个组件元素，再向下寻找想要设置样式的子元素进行设置， 尽量使用子元素选择器，以免影响后代元素样式，如下：</p>
<div class="language-wxss ext-wxss line-numbers-mode"><pre v-pre class="language-wxss"><code>.comment-container&gt;v-tag:nth-child(1)&gt;view {
  background-color: #fffbdd;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="外部样式" tabindex="-1"><a class="header-anchor" href="#外部样式" aria-hidden="true">#</a> 外部样式</h4>
<p>可以使用 index 获取 for 循环中的第几个元素，这里利用了 wxs 的方式根据 index 来确定不同的类名。</p>
<ul>
<li>页面wxml：</li>
</ul>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;block wx:for=&quot;{{util.limit(shortComment,10)}}&quot; wx:key=&quot;content&quot;&gt;
  &lt;v-tag text=&quot;{{item.content}}&quot; tag-class=&quot;{{tool.highlight(index)}}&quot;&gt;
    &lt;text class=&quot;num&quot; slot=&quot;after&quot;&gt;{{'+'+item.nums}}&lt;/text&gt;
  &lt;/v-tag&gt;
&lt;/block&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;wxs module=&quot;tool&quot;&gt;
	var highlight = function(index){
		if(index===0){
			return 'ex-tag1'
		}
		if(index===1){
			return 'ex-tag2'
		}
		return ''
	}

	module.exports = {
		highlight:highlight
	}
&lt;/wxs&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>页面wxss：</li>
</ul>
<div class="language-wxss ext-wxss line-numbers-mode"><pre v-pre class="language-wxss"><code>.ex-tag1 {
  background-color: #fffbdd !important;
}

.ex-tag2 {
  background-color: #eefbff !important;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不用 <code v-pre>!important</code> 要记的提升样式的优先级， 保证修改的样式生效。</p>
<ul>
<li>组件wxml：</li>
</ul>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;view class=&quot;container tag-class&quot; bind:tap=&quot;onClick&quot;&gt;
	&lt;text class=&quot;comment&quot;&gt;{{text}}&lt;/text&gt;
	&lt;slot name=&quot;after&quot;&gt;&lt;/slot&gt;
&lt;/view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>组件js：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">externalClasses</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'tag-class'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wxs的使用" tabindex="-1"><a class="header-anchor" href="#wxs的使用" aria-hidden="true">#</a> WXS的使用</h3>
<p>wxs基本与ES5相同， 但也有细微的差别， 比如不能使用ES6的<code v-pre>const</code>等。可以用它来写过滤器。</p>
<p>先创建一个 <strong>filter.wxs</strong> 文件， 在文件写入一下， 使用的是<code v-pre>module.export</code>， 而不是ES6的<code v-pre>export</code>。而且文件名后缀是 <code v-pre>wxs</code>， 而不是 <code v-pre>js</code>。</p>
<p>fiter.wxs</p>
<div class="language-wxs ext-wxs line-numbers-mode"><pre v-pre class="language-wxs"><code>var format = function (text) {
  if (!text) {
    return
  }
  var reg = getRegExp('\\\\n', 'g')
  return text.replace(reg, '\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;')
}

var limit = function (array, length) {
  return array.slice(0, length)
}

module.exports = {
  format: format,
  limit: limit
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在需要引入的wxml文件中</li>
</ul>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;wxs src=&quot;../../utils/filter.wxs&quot; module=&quot;util&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用方式如下：</p>
<div class="language-wxml ext-wxml line-numbers-mode"><pre v-pre class="language-wxml"><code>&lt;block wx:for=&quot;{{util.limit(shortComment,10)}}&quot; wx:key=&quot;content&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


