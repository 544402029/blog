<template><div><h1 id="css-常用代码片段" tabindex="-1"><a class="header-anchor" href="#css-常用代码片段" aria-hidden="true">#</a> css 常用代码片段</h1>
<h2 id="隐藏滚动条或更改滚动条样式" tabindex="-1"><a class="header-anchor" href="#隐藏滚动条或更改滚动条样式" aria-hidden="true">#</a> 隐藏滚动条或更改滚动条样式</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/*css主要部分的样式*/</span><span class="token comment">/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/</span>
<span class="token selector">::-webkit-scrollbar</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span> <span class="token comment">/*对垂直流动条有效*/</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span> <span class="token comment">/*对水平流动条有效*/</span>
<span class="token punctuation">}</span>

<span class="token comment">/*定义滚动条的轨道颜色、内阴影及圆角*/</span>
<span class="token selector">::-webkit-scrollbar-track</span><span class="token punctuation">{</span>
    <span class="token property">-webkit-box-shadow</span><span class="token punctuation">:</span> inset 0 0 6px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> rosybrown<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*定义滑块颜色、内阴影及圆角*/</span>
<span class="token selector">::-webkit-scrollbar-thumb</span><span class="token punctuation">{</span> 
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 7px<span class="token punctuation">;</span>
    <span class="token property">-webkit-box-shadow</span><span class="token punctuation">:</span> inset 0 0 6px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #E8E8E8<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*定义两端按钮的样式*/</span>
<span class="token selector">::-webkit-scrollbar-button</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span>cyan<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*定义右下角汇合处的样式*/</span>
<span class="token selector">::-webkit-scrollbar-corner</span> <span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span>khaki<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检测横屏竖屏" tabindex="-1"><a class="header-anchor" href="#检测横屏竖屏" aria-hidden="true">#</a> 检测横屏竖屏</h2>
<p>第一种：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"resize"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>orientation <span class="token operator">===</span> <span class="token number">180</span> <span class="token operator">||</span> window<span class="token punctuation">.</span>orientation <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'竖屏'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>orientation <span class="token operator">===</span> <span class="token number">90</span> <span class="token operator">||</span> window<span class="token punctuation">.</span>orientation <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">90</span> <span class="token punctuation">)</span><span class="token punctuation">{</span> 
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'横屏'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">orientation</span><span class="token punctuation">:</span> portrait<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/*竖屏样式代码*/</span>
<span class="token punctuation">}</span> 
<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">orientation</span><span class="token punctuation">:</span> landscape<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/*横屏样式代码.*/</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="移动响应式设置" tabindex="-1"><a class="header-anchor" href="#移动响应式设置" aria-hidden="true">#</a> 移动响应式设置</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>单位适配：</p>
<p>不考虑兼容性：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 基于UI width=750px DPR=2的页面 */</span>
<span class="token selector">html</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>100vw / 7.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑兼容性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/* 基于UI width=375px DPR=2的页面 */</span>
<span class="token operator">!</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> t</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> n <span class="token operator">=</span> t<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span>
        d <span class="token operator">=</span> e<span class="token punctuation">.</span>devicePixelRatio <span class="token operator">||</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> e <span class="token operator">=</span> n<span class="token punctuation">.</span>clientWidth <span class="token operator">/</span> <span class="token number">3.75</span><span class="token punctuation">;</span>
        n<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> e <span class="token operator">+</span> <span class="token string">"px"</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">e</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span>body <span class="token operator">?</span> t<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token string">"16px"</span> <span class="token operator">:</span> t<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"DOMContentLoaded"</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"resize"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"pageshow"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span>persisted <span class="token operator">&amp;&amp;</span> <span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token operator">&lt;=</span> d<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> o <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"body"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            a <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span>style<span class="token punctuation">.</span>border <span class="token operator">=</span> <span class="token string">".5px solid transparent"</span><span class="token punctuation">,</span> o<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> n<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token operator">===</span> a<span class="token punctuation">.</span>offsetHeight <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"hairlines"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> n<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> document<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/* 基于UI width=750px DPR=2的页面 */</span>
<span class="token keyword">function</span> <span class="token function">AutoResponse</span><span class="token punctuation">(</span><span class="token parameter">width <span class="token operator">=</span> <span class="token number">750</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> target <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>clientWidth <span class="token operator">>=</span> <span class="token number">600</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token string">"80px"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> target<span class="token punctuation">.</span>clientWidth <span class="token operator">/</span> width <span class="token operator">*</span> <span class="token number">100</span> <span class="token operator">+</span> <span class="token string">"px"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">AutoResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="点击元素禁止产生背景或边框" tabindex="-1"><a class="header-anchor" href="#点击元素禁止产生背景或边框" aria-hidden="true">#</a> 点击元素禁止产生背景或边框</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">-webkit-tap-highlight-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="禁止长按链接与图片弹出菜单" tabindex="-1"><a class="header-anchor" href="#禁止长按链接与图片弹出菜单" aria-hidden="true">#</a> 禁止长按链接与图片弹出菜单</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">-webkit-touch-callout</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="禁止用户选中文字" tabindex="-1"><a class="header-anchor" href="#禁止用户选中文字" aria-hidden="true">#</a> 禁止用户选中文字</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">-webkit-user-select</span><span class="token punctuation">:</span>none<span class="token punctuation">;</span> 
<span class="token property">user-select</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="取消-input-输入时-英文首字母的默认大写" tabindex="-1"><a class="header-anchor" href="#取消-input-输入时-英文首字母的默认大写" aria-hidden="true">#</a> 取消 input 输入时，英文首字母的默认大写</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">autocapitalize</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>off<span class="token punctuation">"</span></span> <span class="token attr-name">autocorrect</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>off<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="视频全屏播放" tabindex="-1"><a class="header-anchor" href="#视频全屏播放" aria-hidden="true">#</a> 视频全屏播放</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>video</span> <span class="token attr-name">x-webkit-airplay</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">webkit-playsinline</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">preload</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>auto<span class="token punctuation">"</span></span> <span class="token attr-name">autoplay</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>video</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="开启硬件加速" tabindex="-1"><a class="header-anchor" href="#开启硬件加速" aria-hidden="true">#</a> 开启硬件加速</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>transform: translate3d(0,0,0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="怎么让-chrome-支持小于-12px-的文字" tabindex="-1"><a class="header-anchor" href="#怎么让-chrome-支持小于-12px-的文字" aria-hidden="true">#</a> 怎么让 Chrome 支持小于 12px 的文字？</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">-webkit-text-size-adjust</span><span class="token punctuation">:</span>none<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="文字超出隐藏并显示省略号" tabindex="-1"><a class="header-anchor" href="#文字超出隐藏并显示省略号" aria-hidden="true">#</a> 文字超出隐藏并显示省略号</h2>
<h4 id="单行省略" tabindex="-1"><a class="header-anchor" href="#单行省略" aria-hidden="true">#</a> 单行省略</h4>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.ell</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span>200rpx<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="多行省略" tabindex="-1"><a class="header-anchor" href="#多行省略" aria-hidden="true">#</a> 多行省略</h4>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">word-break</span><span class="token punctuation">:</span> break-all<span class="token punctuation">;</span>
<span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
<span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
<span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="控制div内的元素自动换行" tabindex="-1"><a class="header-anchor" href="#控制div内的元素自动换行" aria-hidden="true">#</a> 控制div内的元素自动换行</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">word-wrap</span><span class="token punctuation">:</span> break-word<span class="token punctuation">;</span>
<span class="token property">word-break</span><span class="token punctuation">:</span> break-all<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重置浏览器样式" tabindex="-1"><a class="header-anchor" href="#重置浏览器样式" aria-hidden="true">#</a> 重置浏览器样式</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */</span>

<span class="token comment">/* Document
   ========================================================================== */</span>

<span class="token comment">/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */</span>

<span class="token selector">html</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1.15<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">-webkit-text-size-adjust</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Sections
   ========================================================================== */</span>

<span class="token comment">/**
 * Remove the margin in all browsers.
 */</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Render the `main` element consistently in IE.
 */</span>

<span class="token selector">main</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */</span>

<span class="token selector">h1</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0.67em 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Grouping content
   ========================================================================== */</span>

<span class="token comment">/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */</span>

<span class="token selector">hr</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */</span>

<span class="token selector">pre</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> monospace<span class="token punctuation">,</span> monospace<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Text-level semantics
   ========================================================================== */</span>

<span class="token comment">/**
 * Remove the gray background on active links in IE 10.
 */</span>

<span class="token selector">a</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */</span>

<span class="token selector">abbr[title]</span> <span class="token punctuation">{</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> underline<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> underline dotted<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */</span>

<span class="token selector">b,
strong</span> <span class="token punctuation">{</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bolder<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */</span>

<span class="token selector">code,
kbd,
samp</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> monospace<span class="token punctuation">,</span> monospace<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Add the correct font size in all browsers.
 */</span>

<span class="token selector">small</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 80%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */</span>

<span class="token selector">sub,
sup</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 75%<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> baseline<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">sub</span> <span class="token punctuation">{</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> -0.25em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">sup</span> <span class="token punctuation">{</span>
  <span class="token property">top</span><span class="token punctuation">:</span> -0.5em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Embedded content
   ========================================================================== */</span>

<span class="token comment">/**
 * Remove the border on images inside links in IE 10.
 */</span>

<span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Forms
   ========================================================================== */</span>

<span class="token comment">/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */</span>

<span class="token selector">button,
input,
optgroup,
select,
textarea</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1.15<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */</span>

<span class="token selector">button,
input</span> <span class="token punctuation">{</span> <span class="token comment">/* 1 */</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */</span>

<span class="token selector">button,
select</span> <span class="token punctuation">{</span> <span class="token comment">/* 1 */</span>
  <span class="token property">text-transform</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Correct the inability to style clickable types in iOS and Safari.
 */</span>

<span class="token selector">button,
[type="button"],
[type="reset"],
[type="submit"]</span> <span class="token punctuation">{</span>
  <span class="token property">-webkit-appearance</span><span class="token punctuation">:</span> button<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Remove the inner border and padding in Firefox.
 */</span>

<span class="token selector">button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner</span> <span class="token punctuation">{</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Restore the focus styles unset by the previous rule.
 */</span>

<span class="token selector">button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring</span> <span class="token punctuation">{</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 1px dotted ButtonText<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Correct the padding in Firefox.
 */</span>

<span class="token selector">fieldset</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0.35em 0.75em 0.625em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */</span>

<span class="token selector">legend</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">color</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/* 3 */</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */</span>

<span class="token selector">progress</span> <span class="token punctuation">{</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> baseline<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Remove the default vertical scrollbar in IE 10+.
 */</span>

<span class="token selector">textarea</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */</span>

<span class="token selector">[type="checkbox"],
[type="radio"]</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */</span>

<span class="token selector">[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */</span>

<span class="token selector">[type="search"]</span> <span class="token punctuation">{</span>
  <span class="token property">-webkit-appearance</span><span class="token punctuation">:</span> textfield<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">outline-offset</span><span class="token punctuation">:</span> -2px<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */</span>

<span class="token selector">[type="search"]::-webkit-search-decoration</span> <span class="token punctuation">{</span>
  <span class="token property">-webkit-appearance</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */</span>

<span class="token selector">::-webkit-file-upload-button</span> <span class="token punctuation">{</span>
  <span class="token property">-webkit-appearance</span><span class="token punctuation">:</span> button<span class="token punctuation">;</span> <span class="token comment">/* 1 */</span>
  <span class="token property">font</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span> <span class="token comment">/* 2 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Interactive
   ========================================================================== */</span>

<span class="token comment">/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */</span>

<span class="token selector">details</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
 * Add the correct display in all browsers.
 */</span>

<span class="token selector">summary</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> list-item<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Misc
   ========================================================================== */</span>

<span class="token comment">/**
 * Add the correct display in IE 10+.
 */</span>

<span class="token selector">template</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Add the correct display in IE 10.
 */</span>

<span class="token selector">[hidden]</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文字下沉效果" tabindex="-1"><a class="header-anchor" href="#文字下沉效果" aria-hidden="true">#</a> 文字下沉效果</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>恭喜你中了88元红包！<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn verticle-mode<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>领<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.btn</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #a78252<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #ddc390<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 85px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 85px<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 85px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 6px solid #ddc390<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">box-shadow</span><span class="token punctuation">:</span> inset 0 0 0 1px #d6b681<span class="token punctuation">,</span> 0 1px<span class="token punctuation">,</span> 0 2px<span class="token punctuation">,</span> 0 3px<span class="token punctuation">,</span> 0 4px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">-webkit-transition</span><span class="token punctuation">:</span> border-color .25s<span class="token punctuation">,</span> background-color .25s<span class="token punctuation">;</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> border-color .25s<span class="token punctuation">,</span> background-color .25s<span class="token punctuation">;</span>    
    <span class="token property">font-size</span><span class="token punctuation">:</span> 42px<span class="token punctuation">;</span>
    <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn:active</span> <span class="token punctuation">{</span>
    <span class="token property">text-indent</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.verticle-mode</span> <span class="token punctuation">{</span>
    <span class="token property">writing-mode</span><span class="token punctuation">:</span> tb-rl<span class="token punctuation">;</span>
    <span class="token property">-webkit-writing-mode</span><span class="token punctuation">:</span> vertical-rl<span class="token punctuation">;</span>      
    <span class="token property">writing-mode</span><span class="token punctuation">:</span> vertical-rl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文字字符不被选中" tabindex="-1"><a class="header-anchor" href="#文字字符不被选中" aria-hidden="true">#</a> 文字字符不被选中</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">article</span> <span class="token punctuation">{</span>
　 <span class="token property">-webkit-user-select</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
　 <span class="token property">-moz-user-select</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
　 <span class="token property">-ms-user-select</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
　 <span class="token property">user-select</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
　 <span class="token property">cursor</span><span class="token punctuation">:</span> default<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="outline与镂空效果" tabindex="-1"><a class="header-anchor" href="#outline与镂空效果" aria-hidden="true">#</a> outline与镂空效果</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>crop-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>剪裁（仅演示移动）<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>crop<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cropArea<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>crop-area<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preview-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>预览<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preview<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>previewImg<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.crop-box,
.preview-box</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">vertical-align</span><span class="token punctuation">:</span> top<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.crop,
.preview</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.crop-area,
.preview</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.crop-area</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 88px<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 56px<span class="token punctuation">;</span>
    <span class="token property">outline</span><span class="token punctuation">:</span> 256px solid #000<span class="token punctuation">;</span>
    <span class="token property">outline</span><span class="token punctuation">:</span> 256px solid <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>about:blank<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to top<span class="token punctuation">,</span> transparent<span class="token punctuation">,</span> transparent<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">alpha</span><span class="token punctuation">(</span>opacity=50<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">cursor</span><span class="token punctuation">:</span> move<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">:root .crop-area</span> <span class="token punctuation">{</span>
    <span class="token property">filter</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.crop img,
.preview img</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 256px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 192px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.preview img</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> -88px<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> -56px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> elCropArea <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#cropArea'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> elPreviewImg <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#previewImg'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

elCropArea<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'mousedown'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">moving</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> elCropArea<span class="token punctuation">.</span><span class="token function">position</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>left<span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> elCropArea<span class="token punctuation">.</span><span class="token function">position</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>top<span class="token punctuation">,</span>
        <span class="token literal-property property">x</span><span class="token operator">:</span> event<span class="token punctuation">.</span>pageX<span class="token punctuation">,</span>
        <span class="token literal-property property">y</span><span class="token operator">:</span> event<span class="token punctuation">.</span>pageY
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">$</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">mousemove</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>moving<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 移动距离</span>
            <span class="token keyword">var</span> moveX <span class="token operator">=</span> event<span class="token punctuation">.</span>pageX <span class="token operator">-</span> data<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
            <span class="token keyword">var</span> moveY <span class="token operator">=</span> event<span class="token punctuation">.</span>pageY <span class="token operator">-</span> data<span class="token punctuation">.</span>y<span class="token punctuation">;</span>

            <span class="token comment">// 目标坐标</span>
            <span class="token keyword">var</span> left <span class="token operator">=</span> data<span class="token punctuation">.</span>left <span class="token operator">+</span> moveX<span class="token punctuation">;</span>
            <span class="token keyword">var</span> top <span class="token operator">=</span> data<span class="token punctuation">.</span>top <span class="token operator">+</span> moveY<span class="token punctuation">;</span>

            <span class="token comment">// 边界判断</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token number">80</span> <span class="token operator">></span> <span class="token number">256</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                left <span class="token operator">=</span> <span class="token number">176</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">+</span> <span class="token number">80</span> <span class="token operator">></span> <span class="token number">192</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                top <span class="token operator">=</span> <span class="token number">112</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 重定位</span>
            elCropArea<span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">left</span><span class="token operator">:</span> left<span class="token punctuation">,</span>
                <span class="token literal-property property">top</span><span class="token operator">:</span> top
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            elPreviewImg<span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">*</span> left<span class="token punctuation">,</span>
                <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">*</span> top
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">mouseup</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data<span class="token punctuation">.</span>moving <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="white-space-nowrap与水平列表切换" tabindex="-1"><a class="header-anchor" href="#white-space-nowrap与水平列表切换" aria-hidden="true">#</a> white-space:nowrap与水平列表切换</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>prev<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-prev<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>往前<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>next<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-next<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>往后<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 30px auto<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box > ul</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> left .2s<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box > ul > li</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 128px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 2px 5px<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> .95<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #999<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn[href]</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn-prev</span> <span class="token punctuation">{</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn-next</span> <span class="token punctuation">{</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> elePrev <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'prev'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  eleNext <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'next'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> eleBox <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> eleUl <span class="token operator">=</span> eleBox<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'ul'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>elePrev <span class="token operator">&amp;&amp;</span> eleNext <span class="token operator">&amp;&amp;</span> eleBox <span class="token operator">&amp;&amp;</span> eleUl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> maxX <span class="token operator">=</span> eleBox<span class="token punctuation">.</span>clientWidth <span class="token operator">-</span> eleBox<span class="token punctuation">.</span>scrollWidth<span class="token punctuation">;</span>

  elePrev<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> href <span class="token operator">=</span> elePrev<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'href'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>href<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      eleUl<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token string">'0px'</span><span class="token punctuation">;</span>
      elePrev<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">'href'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      eleNext<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'href'</span><span class="token punctuation">,</span> <span class="token string">'javascript:'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  eleNext<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> href <span class="token operator">=</span> eleNext<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'href'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>href<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      eleUl<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> maxX <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">;</span>
      eleNext<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">'href'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      elePrev<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'href'</span><span class="token punctuation">,</span> <span class="token string">'javascript:'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文字飞入效果" tabindex="-1"><a class="header-anchor" href="#文字飞入效果" aria-hidden="true">#</a> 文字飞入效果</h2>
<p>不适用于IE浏览器</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我是标题文字内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.title</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 8em<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> textIn 1s both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> textIn</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">letter-spacing</span><span class="token punctuation">:</span> -200px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">60%</span> <span class="token punctuation">{</span>
    <span class="token property">letter-spacing</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
    <span class="token property">letter-spacing</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用系统字体" tabindex="-1"><a class="header-anchor" href="#使用系统字体" aria-hidden="true">#</a> 使用系统字体</h2>
<p>网页字体会跟随使用设备的系统默认字体改变</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">html</span> <span class="token punctuation">{</span> <span class="token property">font</span><span class="token punctuation">:</span> menu<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">body</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css-常用字体" tabindex="-1"><a class="header-anchor" href="#css-常用字体" aria-hidden="true">#</a> css 常用字体</h2>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094949217.png" alt="image-20220805094949217"></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805095005983.png" alt="image-20220805095005983"></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805095015586.png" alt="image-20220805095015586"></p>
<h2 id="弹窗蒙层显示隐藏" tabindex="-1"><a class="header-anchor" href="#弹窗蒙层显示隐藏" aria-hidden="true">#</a> 弹窗蒙层显示隐藏</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 显示</span>
<span class="token keyword">var</span> widthBar <span class="token operator">=</span> <span class="token number">17</span><span class="token punctuation">,</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">==</span> <span class="token string">'number'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
　  widthBar <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">-</span> root<span class="token punctuation">.</span>clientWidth<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>overflow <span class="token operator">=</span> <span class="token string">'hidden'</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>borderRight <span class="token operator">=</span> widthBar <span class="token operator">+</span> <span class="token string">'px solid transparent'</span><span class="token punctuation">;</span>
<span class="token comment">//隐藏</span>
<span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">;</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>overflow <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>borderRight <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="text-align实现的右外侧定位效果" tabindex="-1"><a class="header-anchor" href="#text-align实现的右外侧定位效果" aria-hidden="true">#</a> text-align实现的右外侧定位效果</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>constr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>alignright<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle.png<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>backtop.png<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.constr</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 80%<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alignright</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alignright:before</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">"\2002"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.follow</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
    <span class="token property">bottom</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.follow > img</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="focus锚点定位和overflow的选项卡切换效果" tabindex="-1"><a class="header-anchor" href="#focus锚点定位和overflow的选项卡切换效果" aria-hidden="true">#</a> focus锚点定位和overflow的选项卡切换效果</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>one<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>two<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>three<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>four<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>link<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>one<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>two<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>three<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>four<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 20em<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 10em<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ddd<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.list</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.list > input</span> <span class="token punctuation">{</span> 
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span> 
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span> <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">clip</span><span class="token punctuation">:</span> <span class="token function">rect</span><span class="token punctuation">(</span>0 0 0 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'label.click'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">removeAttr</span><span class="token punctuation">(</span><span class="token string">'for'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
　 <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'.box'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scrollTop</span><span class="token punctuation">(</span>xxx<span class="token punctuation">)</span><span class="token punctuation">;</span>　　<span class="token string">'xxx'</span>表示滚动数值
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置input-的placeholder的字体样式" tabindex="-1"><a class="header-anchor" href="#设置input-的placeholder的字体样式" aria-hidden="true">#</a> 设置input 的placeholder的字体样式</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">input::-webkit-input-placeholder</span> <span class="token punctuation">{</span>    <span class="token comment">/* Chrome/Opera/Safari */</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">input::-moz-placeholder</span> <span class="token punctuation">{</span> <span class="token comment">/* Firefox 19+ */</span>  
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">input:-ms-input-placeholder</span> <span class="token punctuation">{</span> <span class="token comment">/* IE 10+ */</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">input:-moz-placeholder</span> <span class="token punctuation">{</span> <span class="token comment">/* Firefox 18- */</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置input聚焦时的样式</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">input:focus</span> <span class="token punctuation">{</span>   
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>取消input的边框</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">input</span><span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表格边框合并" tabindex="-1"><a class="header-anchor" href="#表格边框合并" aria-hidden="true">#</a> 表格边框合并</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">table,tr,td</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span> 1px solid #333<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">table</span><span class="token punctuation">{</span>
  <span class="token property">border-collapse</span><span class="token punctuation">:</span> collapse<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义滚动槽" tabindex="-1"><a class="header-anchor" href="#自定义滚动槽" aria-hidden="true">#</a> 自定义滚动槽</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">::-webkit-scrollbar</span> <span class="token punctuation">{</span>　　 <span class="token comment">/* 血槽宽度 */</span>
　 <span class="token property">width</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">::-webkit-scrollbar-thumb</span> <span class="token punctuation">{</span>　　 <span class="token comment">/* 拖动条 */</span>
　 <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.3<span class="token punctuation">)</span><span class="token punctuation">;</span>
　 <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">::-webkit-scrollbar-track</span> <span class="token punctuation">{</span>　　 <span class="token comment">/* 背景槽 */</span>
　 <span class="token property">background-color</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
　 <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="页面滚动条不发生晃动技巧" tabindex="-1"><a class="header-anchor" href="#页面滚动条不发生晃动技巧" aria-hidden="true">#</a> 页面滚动条不发生晃动技巧</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">html</span> <span class="token punctuation">{</span>
　 <span class="token property">overflow-y</span><span class="token punctuation">:</span> scroll<span class="token punctuation">;</span>　 <span class="token comment">/* for IE8 */</span>
<span class="token punctuation">}</span>
<span class="token selector">:root</span> <span class="token punctuation">{</span>
　 <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
　 <span class="token property">overflow-x</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">:root body</span> <span class="token punctuation">{</span>
　 <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
　 <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
　 <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于vertical-align的纯css定位弹框" tabindex="-1"><a class="header-anchor" href="#基于vertical-align的纯css定位弹框" aria-hidden="true">#</a> 基于vertical-align的纯CSS定位弹框</h2>
<p>改变浏览器尺寸，或者修改内容尺寸可以发现弹框永远居中</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dialog<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>内容占位<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token comment">/* for IE8 */</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>data:image/png;base64,iVB...g==<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
    <span class="token comment">/* for IE9+ */</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.5<span class="token punctuation">)</span><span class="token punctuation">,</span> none<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 99<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container:after</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.dialog</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">white-space</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="小图标对齐" tabindex="-1"><a class="header-anchor" href="#小图标对齐" aria-hidden="true">#</a> 小图标对齐</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>1. 空标签后面跟随文本<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>2. 标签里面有“删除”文本<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>随便什么文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>3. 字号变大<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>large<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>删除
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>large<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>随便什么文字
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span> 
    <span class="token property">width</span><span class="token punctuation">:</span>20px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span>20px<span class="token punctuation">;</span> 
    <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span> 
    <span class="token property">letter-spacing</span><span class="token punctuation">:</span> -1em<span class="token punctuation">;</span> 
    <span class="token property">text-indent</span><span class="token punctuation">:</span> -999em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon:before</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span><span class="token string">'\3000'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon-delete</span> <span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>delete.png<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.large</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="小三角图标垂直居中" tabindex="-1"><a class="header-anchor" href="#小三角图标垂直居中" aria-hidden="true">#</a> 小三角图标垂直居中</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>zhangxinxu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-arrow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.icon-arrow</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 1ex<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>/images/5/arrow.png<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="等腰三角形" tabindex="-1"><a class="header-anchor" href="#等腰三角形" aria-hidden="true">#</a> 等腰三角形</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
　 <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
　 <span class="token property">border</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>
　 <span class="token property">border-color</span><span class="token punctuation">:</span> #f30 transparent transparent<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="加号上传按钮" tabindex="-1"><a class="header-anchor" href="#加号上传按钮" aria-hidden="true">#</a> 加号上传按钮</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add<span class="token punctuation">"</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>继续上传<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  添加图片
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.add</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 76px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 76px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #ccc<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 2px dashed<span class="token punctuation">;</span>
    <span class="token property">text-indent</span><span class="token punctuation">:</span> -12em<span class="token punctuation">;</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> color .25s<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.add:hover</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #34538b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.add::before, .add::after</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.add::before</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">border-top</span><span class="token punctuation">:</span> 4px solid<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> -2px 0 0 -10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.add::after</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">border-left</span><span class="token punctuation">:</span> 4px solid<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> -10px 0 0 -2px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="列表两端对齐效果" tabindex="-1"><a class="header-anchor" href="#列表两端对齐效果" aria-hidden="true">#</a> 列表两端对齐效果</h2>
<p>不考虑IE8:</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">li:nth-of-type(3n)</span> <span class="token punctuation">{</span>
　  <span class="token property">margin-right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IE8:</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">ul</span> <span class="token punctuation">{</span>
　  <span class="token property">margin-right</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">ul > li</span> <span class="token punctuation">{</span>
　  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
　  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
　  <span class="token property">margin-right</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css实现双层圆点" tabindex="-1"><a class="header-anchor" href="#css实现双层圆点" aria-hidden="true">#</a> css实现双层圆点</h2>
<p>效果图：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805095042145.png" alt="image-20220805095042145"></p>
<p>10倍大小模拟</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.icon-dot</span> <span class="token punctuation">{</span>
　  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
　  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
　  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
　  <span class="token property">border</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>　　
　  <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
　  <span class="token property">background-color</span><span class="token punctuation">:</span> currentColor<span class="token punctuation">;</span>
　  <span class="token property">background-clip</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css实现三道杠-分类图标" tabindex="-1"><a class="header-anchor" href="#css实现三道杠-分类图标" aria-hidden="true">#</a> css实现三道杠(分类图标)</h2>
<p>效果图：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805095059804.png" alt="image-20220805095059804"></p>
<p>10倍大小模拟</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.icon-menu</span> <span class="token punctuation">{</span>
　  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
　  <span class="token property">width</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
　  <span class="token property">padding</span><span class="token punctuation">:</span> 35px 0<span class="token punctuation">;</span>
　  <span class="token property">border-top</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>
　  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 10px solid<span class="token punctuation">;</span>
　  <span class="token property">background-color</span><span class="token punctuation">:</span> currentColor<span class="token punctuation">;</span>
　  <span class="token property">background-clip</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种方式：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.icon-menu</span> <span class="token punctuation">{</span>
　 <span class="token property">width</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
　 <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
　 <span class="token property">border-top</span><span class="token punctuation">:</span> 60px double<span class="token punctuation">;</span>
　 <span class="token property">border-bottom</span><span class="token punctuation">:</span> 20px solid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模拟button按钮" tabindex="-1"><a class="header-anchor" href="#模拟button按钮" aria-hidden="true">#</a> 模拟button按钮</h2>
<div class="language-tip ext-tip line-numbers-mode"><pre v-pre class="language-tip"><code>节选自《css世界》4.2.3节，可在所有浏览器下按钮高度都是40像素。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">button</span> <span class="token punctuation">{</span>
　 <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
　 <span class="token property">clip</span><span class="token punctuation">:</span> <span class="token function">rect</span><span class="token punctuation">(</span>0 0 0 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">label</span> <span class="token punctuation">{</span> 
　 <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
　 <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
　 <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>button按钮火狐浏览器控制padding</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">button::-moz-focus-inner</span> <span class="token punctuation">{</span> 
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ie7浏览器button按钮控制</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">button</span> <span class="token punctuation">{</span> <span class="token property">overflow</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="占位图" tabindex="-1"><a class="header-anchor" href="#占位图" aria-hidden="true">#</a> 占位图</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;img>
img</span> <span class="token punctuation">{</span> 
  <span class="token property">visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> 
  <span class="token punctuation">}</span>
<span class="token selector">img[src]</span> <span class="token punctuation">{</span> 
  <span class="token property">visibility</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>

<span class="token selector">img</span> <span class="token punctuation">{</span> 
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span> 
  <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;img>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图片alt展示" tabindex="-1"><a class="header-anchor" href="#图片alt展示" aria-hidden="true">#</a> 图片alt展示</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">img::after</span> <span class="token punctuation">{</span> 
  <span class="token comment">/* 生成alt信息 */</span> 
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>alt<span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token comment">/* 尺寸和定位 */</span> 
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> 
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> 
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> 
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.5<span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>100%<span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token comment">/* 来点过渡动画效果 */</span> 
  <span class="token property">transition</span><span class="token punctuation">:</span> transform .2s<span class="token punctuation">;</span> <span class="token punctuation">}</span> 
  <span class="token selector">img:hover::after</span> <span class="token punctuation">{</span> 
    <span class="token comment">/* alt信息显示 */</span> 
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="宽高定比图" tabindex="-1"><a class="header-anchor" href="#宽高定比图" aria-hidden="true">#</a> 宽高定比图</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span> 
  <span class="token property">padding</span><span class="token punctuation">:</span> 10% 50%<span class="token punctuation">;</span> 
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token selector">.box > img</span> <span class="token punctuation">{</span> 
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> 
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> 
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> 
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> 
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="管道符" tabindex="-1"><a class="header-anchor" href="#管道符" aria-hidden="true">#</a> 管道符</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">a + a:before</span> <span class="token punctuation">{</span>
　  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
　  <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
　  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 3px 1px<span class="token punctuation">;</span>
　  <span class="token property">margin-left</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
　  <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid gray<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;a href=<span class="token string">""</span>>登录&lt;/a>&lt;a href=<span class="token string">""</span>>注册&lt;/a>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="闭合符号" tabindex="-1"><a class="header-anchor" href="#闭合符号" aria-hidden="true">#</a> 闭合符号</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.ask:before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span><span class="token string">'提问：“'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token selector">.answer:before</span> <span class="token punctuation">{</span>
<span class="token property">content</span><span class="token punctuation">:</span><span class="token string">'回答：“'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.ask:after,
.answer:after</span> <span class="token punctuation">{</span>
<span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'”'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="加载loading" tabindex="-1"><a class="header-anchor" href="#加载loading" aria-hidden="true">#</a> 加载loading</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>正在加载中<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dot</span><span class="token punctuation">></span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dot</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">dot</span> <span class="token punctuation">{</span>
<span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token property">height</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
<span class="token property">line-height</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token property">vertical-align</span><span class="token punctuation">:</span> -.25em<span class="token punctuation">;</span>
<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">dot::before</span> <span class="token punctuation">{</span>
<span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'...\A..\A.'</span><span class="token punctuation">;</span>
<span class="token property">white-space</span><span class="token punctuation">:</span> pre-wrap<span class="token punctuation">;</span>
<span class="token property">animation</span><span class="token punctuation">:</span> dot 3s infinite step-start both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> dot</span> <span class="token punctuation">{</span>
<span class="token selector">33%</span> <span class="token punctuation">{</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-2em<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">66%</span> <span class="token punctuation">{</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-1em<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reset-css" tabindex="-1"><a class="header-anchor" href="#reset-css" aria-hidden="true">#</a> reset.css</h2>
<p>重置浏览器默认样式</p>
<p>其中<code v-pre>touch-action: manipulation;</code>主要用来解决移动端 300ms 延迟问题。以前可以使用 fastclick 插件解决此问题， 之后可以直接使用此属性解决该问题，更加方便。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@charset</span> <span class="token string">"utf-8"</span><span class="token punctuation">;</span></span>
<span class="token selector">html</span> <span class="token punctuation">{</span>
  <span class="token property">touch-action</span><span class="token punctuation">:</span> manipulation<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">body,
ul,
ol,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
figure,
form,
fieldset,
legend,
input,
textarea,
button,
p,
blockquote,
th,
td,
pre,
xmp</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">body,
input,
textarea,
button,
select,
pre,
xmp,
tt,
code,
kbd,
samp</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1.5<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> tahoma<span class="token punctuation">,</span> arial<span class="token punctuation">,</span> <span class="token string">'Hiragino Sans GB'</span><span class="token punctuation">,</span> simsun<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">h1,
h2,
h3,
h4,
h5,
h6,
small,
big,
input,
textarea,
button,
select</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">h1,
h2,
h3,
h4,
h5,
h6</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> tahoma<span class="token punctuation">,</span> arial<span class="token punctuation">,</span> <span class="token string">'Hiragino Sans GB'</span><span class="token punctuation">,</span> <span class="token string">'微软雅黑'</span><span class="token punctuation">,</span> simsun<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">h1,
h2,
h3,
h4,
h5,
h6,
b,
strong</span> <span class="token punctuation">{</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">address,
cite,
dfn,
em,
i,
optgroup,
var</span> <span class="token punctuation">{</span>
  <span class="token property">font-style</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table</span> <span class="token punctuation">{</span>
  <span class="token property">border-collapse</span><span class="token punctuation">:</span> collapse<span class="token punctuation">;</span>
  <span class="token property">border-spacing</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">caption,
th</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">ul,
ol,
menu</span> <span class="token punctuation">{</span>
  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">fieldset,
img</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img,
object,
input,
textarea,
button,
select</span> <span class="token punctuation">{</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">article,
aside,
footer,
header,
section,
nav,
figure,
figcaption,
hgroup,
details,
menu</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">audio,
canvas,
video</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  *<span class="token property">display</span><span class="token punctuation">:</span> inline<span class="token punctuation">;</span>
  *<span class="token property">zoom</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">blockquote:before,
blockquote:after,
q:before,
q:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'\0020'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">textarea</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">resize</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">input,
textarea,
button,
select,
a</span> <span class="token punctuation">{</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 0 none<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">button::-moz-focus-inner,
input::-moz-focus-inner</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">mark</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">a,
ins,
s,
u,
del</span> <span class="token punctuation">{</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">sup,
sub</span> <span class="token punctuation">{</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> baseline<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">html</span> <span class="token punctuation">{</span>
  <span class="token property">overflow-x</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">-webkit-tap-highlight-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> Arial<span class="token punctuation">,</span> <span class="token string">'Microsoft Yahei'</span><span class="token punctuation">,</span> <span class="token string">'Helvetica Neue'</span><span class="token punctuation">,</span> Helvetica<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 0.28em<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">-webkit-text-size-adjust</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">hr</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0.02rem<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0.1rem 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> medium none<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 0.02rem solid #cacaca<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">a</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #25a4bb<span class="token punctuation">;</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span> 
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="border-css-解决移动端-1px-问题" tabindex="-1"><a class="header-anchor" href="#border-css-解决移动端-1px-问题" aria-hidden="true">#</a> border.css(解决移动端 1px 问题)</h2>
<p>由于某些机型分辨率过高,会导致 1px 变成 2-多 px 像素的问题,引用 bordercss 解决</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@charset</span> <span class="token string">"utf-8"</span><span class="token punctuation">;</span></span>
<span class="token selector">.border,
.border-top,
.border-right,
.border-bottom,
.border-left,
.border-topbottom,
.border-rightleft,
.border-topleft,
.border-rightbottom,
.border-topright,
.border-bottomleft</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border::before,
.border-top::before,
.border-right::before,
.border-bottom::before,
.border-left::before,
.border-topbottom::before,
.border-topbottom::after,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::before,
.border-topleft::after,
.border-rightbottom::before,
.border-rightbottom::after,
.border-topright::before,
.border-topright::after,
.border-bottomleft::before,
.border-bottomleft::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'\0020'</span><span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* border
 * 因，边框是由伪元素区域遮盖在父级
 * 故，子级若有交互，需要对子级设置
 * 定位 及 z轴
 */</span>
<span class="token selector">.border::before</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #eaeaea<span class="token punctuation">;</span>
  <span class="token property">transform-origin</span><span class="token punctuation">:</span> 0 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-top::before,
.border-bottom::before,
.border-topbottom::before,
.border-topbottom::after,
.border-topleft::before,
.border-rightbottom::after,
.border-topright::before,
.border-bottomleft::before</span> <span class="token punctuation">{</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-right::before,
.border-left::before,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::after,
.border-rightbottom::before,
.border-topright::after,
.border-bottomleft::after</span> <span class="token punctuation">{</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before</span> <span class="token punctuation">{</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid #eaeaea<span class="token punctuation">;</span>
  <span class="token property">transform-origin</span><span class="token punctuation">:</span> 0 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-right::before,
.border-rightbottom::before,
.border-rightleft::before,
.border-topright::after</span> <span class="token punctuation">{</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> 1px solid #eaeaea<span class="token punctuation">;</span>
  <span class="token property">transform-origin</span><span class="token punctuation">:</span> 100% 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::before</span> <span class="token punctuation">{</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid #eaeaea<span class="token punctuation">;</span>
  <span class="token property">transform-origin</span><span class="token punctuation">:</span> 0 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-left::before,
.border-topleft::after,
.border-rightleft::after,
.border-bottomleft::after</span> <span class="token punctuation">{</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid #eaeaea<span class="token punctuation">;</span>
  <span class="token property">transform-origin</span><span class="token punctuation">:</span> 0 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before</span> <span class="token punctuation">{</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-right::before,
.border-rightleft::after,
.border-rightbottom::before,
.border-topright::after</span> <span class="token punctuation">{</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::after</span> <span class="token punctuation">{</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border-left::before,
.border-rightleft::before,
.border-topleft::after,
.border-bottomleft::before</span> <span class="token punctuation">{</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">max--moz-device-pixel-ratio</span><span class="token punctuation">:</span> 1.49<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">-webkit-max-device-pixel-ratio</span><span class="token punctuation">:</span> 1.49<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">max-device-pixel-ratio</span><span class="token punctuation">:</span> 1.49<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">max-resolution</span><span class="token punctuation">:</span> 143dpi<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">max-resolution</span><span class="token punctuation">:</span> 1.49dppx<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/* 默认值，无需重置 */</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">min--moz-device-pixel-ratio</span><span class="token punctuation">:</span> 1.5<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max--moz-device-pixel-ratio</span><span class="token punctuation">:</span> 2.49<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">-webkit-min-device-pixel-ratio</span><span class="token punctuation">:</span> 1.5<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">-webkit-max-device-pixel-ratio</span><span class="token punctuation">:</span> 2.49<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">min-device-pixel-ratio</span><span class="token punctuation">:</span> 1.5<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-device-pixel-ratio</span><span class="token punctuation">:</span> 2.49<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">min-resolution</span><span class="token punctuation">:</span> 144dpi<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-resolution</span><span class="token punctuation">:</span> 239dpi<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">min-resolution</span><span class="token punctuation">:</span> 1.5dppx<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-resolution</span><span class="token punctuation">:</span> 2.49dppx<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.border::before</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200%<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.border-top::before,
  .border-bottom::before,
  .border-topbottom::before,
  .border-topbottom::after,
  .border-topleft::before,
  .border-rightbottom::after,
  .border-topright::before,
  .border-bottomleft::before</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.border-right::before,
  .border-left::before,
  .border-rightleft::before,
  .border-rightleft::after,
  .border-topleft::after,
  .border-rightbottom::before,
  .border-topright::after,
  .border-bottomleft::after</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleX</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">min--moz-device-pixel-ratio</span><span class="token punctuation">:</span> 2.5<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">-webkit-min-device-pixel-ratio</span><span class="token punctuation">:</span> 2.5<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">min-device-pixel-ratio</span><span class="token punctuation">:</span> 2.5<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">min-resolution</span><span class="token punctuation">:</span> 240dpi<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token property">min-resolution</span><span class="token punctuation">:</span> 2.5dppx<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.border::before</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300%<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.33333<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.border-top::before,
  .border-bottom::before,
  .border-topbottom::before,
  .border-topbottom::after,
  .border-topleft::before,
  .border-rightbottom::after,
  .border-topright::before,
  .border-bottomleft::before</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.33333<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.border-right::before,
  .border-left::before,
  .border-rightleft::before,
  .border-rightleft::after,
  .border-topleft::after,
  .border-rightbottom::before,
  .border-topright::after,
  .border-bottomleft::after</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleX</span><span class="token punctuation">(</span>0.33333<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图片等比例自动缩放" tabindex="-1"><a class="header-anchor" href="#图片等比例自动缩放" aria-hidden="true">#</a> 图片等比例自动缩放</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">max-height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css-实现宽高比例一致的图形" tabindex="-1"><a class="header-anchor" href="#css-实现宽高比例一致的图形" aria-hidden="true">#</a> css 实现宽高比例一致的图形</h2>
<p>可防止图片抖动</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">padding-bottom</span><span class="token punctuation">:</span> 26.7%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css-实现定宽高比" tabindex="-1"><a class="header-anchor" href="#css-实现定宽高比" aria-hidden="true">#</a> css 实现定宽高比</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.div1</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000000<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.div1:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token property">padding-top</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="清除浮动" tabindex="-1"><a class="header-anchor" href="#清除浮动" aria-hidden="true">#</a> 清除浮动</h2>
<div class="custom-container tip">
<p class="custom-container-title">提醒</p>
<p>.fix 应该用在包含浮动子元素的父级元素上，不要滥用</p>
</div>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.fix:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">//兼容ie6,7
.fix</span> <span class="token punctuation">{</span>
  *<span class="token property">zoom</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="透明border妙用" tabindex="-1"><a class="header-anchor" href="#透明border妙用" aria-hidden="true">#</a> 透明border妙用</h2>
<p>当我们有控制点击的图标时， 可以使用 <code v-pre>border</code> 透明色增加点击区域， 比 <code v-pre>padding</code> 增加区域效果更好，不会撑开间距，造成定位不准的问题。</p>
<h2 id="min-height妙用" tabindex="-1"><a class="header-anchor" href="#min-height妙用" aria-hidden="true">#</a> min-height妙用</h2>
<p>min-height初始值为auto 可以用来设置大一些来做动画效果</p>
<h2 id="inline-block的bug" tabindex="-1"><a class="header-anchor" href="#inline-block的bug" aria-hidden="true">#</a> inline-block的bug</h2>
<p>使用<code v-pre>inline-block</code>会使父元素高度不正常,要慎用!!!</p>
<p>可以给父元素添加<code v-pre>font-size:0</code>解决,或者使用用<code v-pre>float</code>或者<code v-pre>flex</code>布局.</p>
<h2 id="css布局" tabindex="-1"><a class="header-anchor" href="#css布局" aria-hidden="true">#</a> CSS布局</h2>
<h3 id="单侧固定" tabindex="-1"><a class="header-anchor" href="#单侧固定" aria-hidden="true">#</a> 单侧固定</h3>
<p>左侧使用width+float   右侧使用padding-left</p>
<h3 id="水平居中" tabindex="-1"><a class="header-anchor" href="#水平居中" aria-hidden="true">#</a> 水平居中</h3>
<ol>
<li>
<p>父元素设置<code v-pre>text-align: center;</code>, 子元素设置<code v-pre>display: inline-block;</code>。</p>
<ul>
<li>优点：兼容性好</li>
<li>缺点：<code v-pre>text-align: center;</code>具有继承性，导致子元素的文本也是居中显示。</li>
</ul>
</li>
<li>
<p>子元素设置<code v-pre>margin: 0 auto;</code>。</p>
<ul>
<li>只要对子元素进行设置就可以实现水平方向局中布局效果</li>
<li>如果子元素脱离文档流，导致 <code v-pre>margin</code> 属性的值无效。</li>
</ul>
</li>
<li>
<p>父元素设置<code v-pre>position: relative;</code>,子元素设置<code v-pre>position: absolute;left: 50%;transform: translateX(-50%);</code></p>
<ul>
<li>优点：父元素是否脱离文档流，不影响子元素水平居中效果。</li>
<li>缺点： <code v-pre>transform</code> 属性是 CSS3 新增属性， 浏览器支持情况不好</li>
</ul>
</li>
<li>
<p>父元素设置<code v-pre>display: flex;justify-content: center;</code>。</p>
<ul>
<li>优点： 布局简单， 只需在父元素进行设置</li>
<li>缺点： 浏览器支持情况不好</li>
</ul>
</li>
</ol>
<h3 id="垂直居中" tabindex="-1"><a class="header-anchor" href="#垂直居中" aria-hidden="true">#</a> 垂直居中</h3>
<ol>
<li>
<p>父元素设置 <code v-pre>display: table-cell;vertical-align: middle;</code> 。</p>
<ul>
<li>优点： 浏览器兼容性比较好</li>
<li>缺点： <code v-pre>vertical-align: middle;</code>, 导致父元素的文本也是居中显示。</li>
</ul>
</li>
<li>
<p>父元素设置<code v-pre>position: relative;</code>, 子元素设置<code v-pre>position: absolute;top: 50%;transform: translateY(-50%);</code></p>
<ul>
<li>优点：父元素是否脱离文档流，不影响子元素垂直居中效果。</li>
<li>缺点： <code v-pre>transform</code> 属性是 CSS3 新增属性， 浏览器支持情况不好</li>
</ul>
</li>
<li>
<p>父元素设置<code v-pre>display: flex;align-items: center;</code></p>
<ul>
<li>优点： 布局简单， 只需在父元素进行设置</li>
<li>缺点： 浏览器支持情况不好</li>
</ul>
</li>
</ol>
<h3 id="水平垂直居中布局" tabindex="-1"><a class="header-anchor" href="#水平垂直居中布局" aria-hidden="true">#</a> 水平垂直居中布局</h3>
<ol>
<li>
<p>父元素设置<code v-pre>display: table-cell;vertical-align: middle;</code>， 子元素设置<code v-pre>margin: 0 auto;</code></p>
<ul>
<li>缺点：如果子元素脱离文档流，导致 <code v-pre>margin</code> 属性的值无效。<code v-pre>vertical-align: middle;</code>, 导致父元素的文本也是居中显示。</li>
<li>优点: 兼容性好</li>
</ul>
</li>
<li>
<p>父元素设置<code v-pre>position: relative;</code>,子元素设置<code v-pre>position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);</code></p>
<ul>
<li>优点： 父元素是否脱离文档流，不影响子元素垂直居中效果。</li>
<li>缺点： 浏览器支持情况不好</li>
</ul>
</li>
</ol>
<h3 id="多列布局" tabindex="-1"><a class="header-anchor" href="#多列布局" aria-hidden="true">#</a> 多列布局</h3>
<p>左边定宽右边自适应</p>
<ol>
<li>float</li>
</ol>
<p>两列代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>    .left,
    .right {
      height: 50px;
    }
    .left {
      float: left;
      width: 100px;
      background: #ecdaec;
    }
    .right {
      float: right;
      width: calc(100% - 100px) ;
      background: #8080ff;
    }
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三列代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.left,
    .right,
    .center</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.left</span> <span class="token punctuation">{</span>
      <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #ecdaec<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.center</span><span class="token punctuation">{</span>
      <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #009e0d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.right</span> <span class="token punctuation">{</span>
      <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>100% - 250px<span class="token punctuation">)</span> <span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #8080ff<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>优点：</p>
<ul>
<li>实现方式简单</li>
</ul>
<p>缺点：</p>
<ul>
<li>浏览器兼容性不好</li>
<li>由于子元素脱离文档流会导致父元素没有高度</li>
</ul>
<ol start="2">
<li>float + overflow</li>
</ol>
<p>两列代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>    .left,
    .right {
      height: 50px;
    }
    .left {
      float: left;
      width: 100px;
      background: #ecdaec;
    }
    .right {
      background: #8080ff;
      overflow: hidden;
    }
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三列代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.left,
    .right,
    .center</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.left</span> <span class="token punctuation">{</span>
      <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #ecdaec<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.center</span><span class="token punctuation">{</span>
      <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #800080<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.right</span> <span class="token punctuation">{</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #8080ff<span class="token punctuation">;</span>
      <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>优点：</p>
<ul>
<li>实现简单</li>
</ul>
<p>缺点：</p>
<ul>
<li>使自适应元素开启了 overflow：hidden</li>
</ul>
<ol start="3">
<li>table 值相关</li>
</ol>
<p>两列代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.box</span><span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
      <span class="token property">table-layout</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span><span class="token comment">/* 列宽由表格宽度和列宽度设定。处理双边框 */</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.left,
    .right</span> <span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.left</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #ecdaec<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.right</span> <span class="token punctuation">{</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #8080ff<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三列代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.box</span><span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
      <span class="token property">table-layout</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span><span class="token comment">/* 列宽由表格宽度和列宽度设定。 */</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.left,
    .right,
    .center</span> <span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.left</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #ecdaec<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.center</span><span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #ff0080<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.right</span> <span class="token punctuation">{</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #8080ff<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>优点：</p>
<ul>
<li>浏览器兼容性好</li>
</ul>
<p>缺点:</p>
<p>所有元素的 display 属性设置为 table 相关值， 受到相应制约。（单元格自动分配空间， 双边框， 一个单元格增加高度其它单元格也会增加高度）</p>
<h3 id="圣杯布局-三行三列布局" tabindex="-1"><a class="header-anchor" href="#圣杯布局-三行三列布局" aria-hidden="true">#</a> 圣杯布局（三行三列布局）</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">body</span> <span class="token punctuation">{</span>
            <span class="token property">min-width</span><span class="token punctuation">:</span> 700px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.header,
        .footer</span> <span class="token punctuation">{</span>
            <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.container</span> <span class="token punctuation">{</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0 220px 0 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.left,
        .middle,
        .right</span> <span class="token punctuation">{</span>
            <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
            <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
            <span class="token property">min-height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.left</span> <span class="token punctuation">{</span>
            <span class="token property">margin-left</span><span class="token punctuation">:</span> -100%<span class="token punctuation">;</span>
            <span class="token property">left</span><span class="token punctuation">:</span> -200px<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.right</span> <span class="token punctuation">{</span>
            <span class="token property">margin-left</span><span class="token punctuation">:</span> -220px<span class="token punctuation">;</span>
            <span class="token property">right</span><span class="token punctuation">:</span> -220px<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 220px<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #30a457<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.middle</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #1a5acd<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>header<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>middle<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>middle<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
                这是页面的主体内容 这是页面的主体内容 这是页面的主体内容 这是页面的主体内容 这是页面的主体内容 这是页面的主体内容 这是页面的主体内容 这是页面的主体内容
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>left<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
                这是页面的左边 这是页面的左边 这是页面的左边 这是页面的左边 这是页面的左边 这是页面的左边
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>right<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
                这是页面的右边 这是页面的右边 这是页面的右边 这是页面的右边
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>footer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="双飞翼布局" tabindex="-1"><a class="header-anchor" href="#双飞翼布局" aria-hidden="true">#</a> 双飞翼布局</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">body</span> <span class="token punctuation">{</span>
            <span class="token property">min-width</span><span class="token punctuation">:</span> 700px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.header,
        .footer</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #333<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.sub,
        .main,
        .extra</span> <span class="token punctuation">{</span>
            <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
            <span class="token property">min-height</span><span class="token punctuation">:</span> 130px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.sub</span> <span class="token punctuation">{</span>
            <span class="token property">margin-left</span><span class="token punctuation">:</span> -100%<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.extra</span> <span class="token punctuation">{</span>
            <span class="token property">margin-left</span><span class="token punctuation">:</span> -220px<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 220px<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #1a5acd<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.main</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.main-inner</span> <span class="token punctuation">{</span>
            <span class="token property">margin-left</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">margin-right</span><span class="token punctuation">:</span> 220px<span class="token punctuation">;</span>
            <span class="token property">min-height</span><span class="token punctuation">:</span> 130px<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #30a457<span class="token punctuation">;</span>
            <span class="token property">word-break</span><span class="token punctuation">:</span> break-all<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.footer</span> <span class="token punctuation">{</span>
            <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>header<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main-inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>main<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
                这是页面的主体内容
                这是页面的主体内容
                这是页面的主体内容
                这是页面的主体内容
                这是页面的主体内容
                这是页面的主体内容
                这是页面的主体内容
                这是页面的主体内容
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sub<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>sub<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
            这是页面的左边
            这是页面的左边
            这是页面的左边
            这是页面的左边
            这是页面的左边
            这是页面的左边
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>extra<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>extra<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
            这是页面的右边
            这是页面的右边
            这是页面的右边
            这是页面的右边
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>footer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="等分布局" tabindex="-1"><a class="header-anchor" href="#等分布局" aria-hidden="true">#</a> 等分布局</h3>
<h4 id="float" tabindex="-1"><a class="header-anchor" href="#float" aria-hidden="true">#</a> float</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.parent-fix</span> <span class="token punctuation">{</span>
      <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">#parent</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>

      <span class="token property">margin-left</span><span class="token punctuation">:</span> -10px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col1,
    .col2,
    .col3,
    .col4</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 25%<span class="token punctuation">;</span>
      <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>

      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>

      <span class="token property">padding-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.inner</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col1 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> hotpink<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col2 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col3 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col4 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent-fix<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 作为父级容器 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="table" tabindex="-1"><a class="header-anchor" href="#table" aria-hidden="true">#</a> table</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">#parent-fix</span> <span class="token punctuation">{</span>
      <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">#parent</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 1434px<span class="token punctuation">;</span>
      <span class="token comment">/* &lt;table> */</span>
      <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>

      <span class="token property">margin-left</span><span class="token punctuation">:</span> -10px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col1,
    .col2,
    .col3,
    .col4</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>

      <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>

      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
      <span class="token property">padding-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.inner</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col1 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> hotpink<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col2 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col3 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col4 .inner</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent-fix<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 作为父级容器 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="等高布局" tabindex="-1"><a class="header-anchor" href="#等高布局" aria-hidden="true">#</a> 等高布局</h3>
<h3 id="方式1-padding-margin-适合多栏" tabindex="-1"><a class="header-anchor" href="#方式1-padding-margin-适合多栏" aria-hidden="true">#</a> 方式1 padding+margin (适合多栏)</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>colLeft<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>column-left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>正方观点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>观点1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>colRight<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>column-right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>反方观点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>观点1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>leftMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多正方观点<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rightMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多反方观点<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.column-left,
.column-right</span> <span class="token punctuation">{</span>
    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> -9999px<span class="token punctuation">;</span>
    <span class="token property">padding-bottom</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.column-left</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #34538b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.column-right</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #cd0000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">Tips</p>
<p>如果项目无须兼容IE6、IE7,推荐使用 <code v-pre>table-cell</code> 实现等高布局。</p>
</div>
<h3 id="方式2-border方式-适合2-3栏" tabindex="-1"><a class="header-anchor" href="#方式2-border方式-适合2-3栏" aria-hidden="true">#</a> 方式2：border方式（适合2-3栏）</h3>
<p>此方法与用 <code v-pre>margin+padding</code> 实现的等高布局相比更加稳健，不会出现锚点定位带来的问题，但同样它也是有局限性的。</p>
<p>首先，由于 <code v-pre>border</code> 不支持百分比宽度,因此，适给至少一栏是定宽的布局。当然,如果不考虑IE8浏览器，可以试试使用 <code v-pre>vw</code>单位，其可实现近似的百分比宽度效果。</p>
<p>其次，等高布局的栏目有限制。因为一个元素的边框数目是有限的，基本上, <code v-pre>border</code>等高布局只能满足2 ~ 3栏的情况，除非正好是比例的，那还可以使用<code v-pre>border-style:double</code>实现最多7栏布局, 但这只是理论上而已。所以，一旦等高布局栏目过多,则建议使用
<code v-pre>table-cell</code>等高布局或者<code v-pre>margin</code>负值等高布局。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>导航1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>模块1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多导航<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>moduleMore<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>更多模块<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 导航背景区border创建 */</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span> 
  <span class="token property">border-left</span><span class="token punctuation">:</span> 150px solid #333<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 清除浮动影响，不能使用overflow:hidden */</span>
<span class="token selector">.box:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 布局主结构 */</span>
<span class="token selector">.box > nav</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -150px<span class="token punctuation">;</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box > section</span> <span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 导航列表和模块列表 */</span>
<span class="token selector">.nav</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.module</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="margin与一栏定宽的两栏自适应布局" tabindex="-1"><a class="header-anchor" href="#margin与一栏定宽的两栏自适应布局" aria-hidden="true">#</a> margin与一栏定宽的两栏自适应布局</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>左侧固定<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>img<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>DOM文档流中，图片定宽在左侧，文字内容在右侧，和视觉呈现的前后顺序一致。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>右侧固定-DOM顺序相反<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>img<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>DOM文档流中，图片定宽在左侧，视觉上却在右侧，顺序表现不一致。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>右侧固定-DOM顺序和视觉一致<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-right-same<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>full<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>DOM文档流中，图片定宽在右侧，视觉呈现也在右侧，顺便表现此时一致。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>img<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.img</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 128px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 左浮动 */</span>
<span class="token selector">.box-left > img</span> <span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-left > p</span> <span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 右浮动，但图片DOM在前 */</span>
<span class="token selector">.box-right > img</span> <span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-right > p</span> <span class="token punctuation">{</span>
    <span class="token property">margin-right</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 右浮动，图片DOM在后，和视觉表现一致 */</span>
<span class="token selector">.box-right-same > .full</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-right-same > .full > p</span> <span class="token punctuation">{</span>
    <span class="token property">margin-right</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-right-same > img</span> <span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -128px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="css3多列布局" tabindex="-1"><a class="header-anchor" href="#css3多列布局" aria-hidden="true">#</a> CSS3多列布局</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">#parent,
    #parent2,
    #parent3</span> <span class="token punctuation">{</span>
      <span class="token comment">/* column-count: 4;
      column-width: 300px; */</span>

      <span class="token property">columns</span><span class="token punctuation">:</span> 4 300px<span class="token punctuation">;</span>

      <span class="token property">column-gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>

      <span class="token comment">/* column-rule-width: 5px;
      column-rule-color: tomato;
      column-rule-style: double; */</span>

      <span class="token property">column-rule</span><span class="token punctuation">:</span> 5px tomato double<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col1,
    .col2,
    .col3,
    .col4,
    .col5</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col1,
    .col6</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> hotpink<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col2,
    .col7</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col3.col8</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col4,
    .col9</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col5</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> tomato<span class="token punctuation">;</span>

      <span class="token property">column-span</span><span class="token punctuation">:</span> all<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.col6,
    .col7,
    .col8,
    .col9</span> <span class="token punctuation">{</span>
      <span class="token property">column-fill</span><span class="token punctuation">:</span> balance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- 作为父级容器 --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col5<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col6<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum possimus aliquid nostrum provident
      est esse necessitatibus mollitia error, tempore voluptate nobis odio alias, ab animi reprehenderit repellat
      perferendis voluptas rerum!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col7<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, quibusdam vel! Provident consequatur
      voluptates quibusdam consectetur architecto! Ut eaque aspernatur quibusdam incidunt nobis ipsam quidem, quod
      ullam, velit officia necessitatibus!
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dicta officia porro error
      suscipit. Nostrum, deleniti laborum. Sed odit, nemo, ducimus dolores rem reprehenderit soluta ipsam nesciunt id
      unde accusamus.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col9<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>imooc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全屏布局" tabindex="-1"><a class="header-anchor" href="#全屏布局" aria-hidden="true">#</a> 全屏布局</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">html,
    body</span> <span class="token punctuation">{</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">header</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>

      <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>

      <span class="token property">background-color</span><span class="token punctuation">:</span> lightgray<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.content</span> <span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
      <span class="token property">bottom</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>

      <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>

      <span class="token property">background-color</span><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.content .left</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>

      <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
      <span class="token property">bottom</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>

      <span class="token property">background-color</span><span class="token punctuation">:</span> lightcoral<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.content .right</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 1000px<span class="token punctuation">;</span>
      <span class="token property">margin-left</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> greenyellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">footer</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>

      <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
      <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>

      <span class="token property">background-color</span><span class="token punctuation">:</span> lightslategray<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


