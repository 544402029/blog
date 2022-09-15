<template><div><h1 id="javascript正则迷你书" tabindex="-1"><a class="header-anchor" href="#javascript正则迷你书" aria-hidden="true">#</a> JavaScript正则迷你书</h1>
<h2 id="匹配攻略" tabindex="-1"><a class="header-anchor" href="#匹配攻略" aria-hidden="true">#</a> 匹配攻略</h2>
<h3 id="范围表示法" tabindex="-1"><a class="header-anchor" href="#范围表示法" aria-hidden="true">#</a> 范围表示法</h3>
<p>比如<code v-pre>[123456abcdefGHIJKLM]</code>，可以写成<code v-pre>[1-6a-fG-M]</code>。用连字符-来省略和简写。</p>
<h3 id="排除字符组" tabindex="-1"><a class="header-anchor" href="#排除字符组" aria-hidden="true">#</a> 排除字符组</h3>
<p>纵向模糊匹配，还有一种情形就是，某位字符可以是任何东西，但就不能是&quot;a&quot;、&quot;b&quot;、&quot;c&quot;。</p>
<p>此时就是排除字符组（反义字符组）的概念。例如<code v-pre>[^abc]</code>，表示是一个除&quot;a&quot;、&quot;b&quot;、&quot;c&quot;之外的任意一个字符。字符组的第一位放^（脱字符），表示求反的概念。</p>
<h4 id="常见的简写形式" tabindex="-1"><a class="header-anchor" href="#常见的简写形式" aria-hidden="true">#</a> 常见的简写形式:</h4>
<ul>
<li><code v-pre>\d</code>就是<code v-pre>[0-9]</code>。表示是一位数字。记忆方式：其英文是digit（数字）。</li>
<li><code v-pre>\D</code>就是<code v-pre>[^0-9]</code>。表示除数字外的任意字符。</li>
<li><code v-pre>\w</code>就是<code v-pre>[0-9a-zA-Z_]</code>。表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。</li>
<li><code v-pre>\W</code>是<code v-pre>[^0-9a-zA-Z_]</code>。非单词字符。</li>
<li><code v-pre>\s</code>是<code v-pre>[ \t\v\n\r\f]</code>。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。</li>
<li><code v-pre>\S</code>是<code v-pre>[^ \t\v\n\r\f]</code>。 非空白符。</li>
<li><code v-pre>.</code>就是[^\n\r\u2028\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号...中的每个点，都可以理解成占位符，表示任何类似的东西。</li>
</ul>
<p>如果要匹配任意字符怎么办？可以使用<code v-pre>[\d\D]</code>、<code v-pre>[\w\W]</code>、<code v-pre>[\s\S]</code>和<code v-pre>[^]</code>中任何的一个。</p>
<h3 id="贪婪匹配和惰性匹配" tabindex="-1"><a class="header-anchor" href="#贪婪匹配和惰性匹配" aria-hidden="true">#</a> 贪婪匹配和惰性匹配</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> regex <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d{2,5}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">var</span> string <span class="token operator">=</span> <span class="token string">"123 1234 12345 123456"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> string<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// => ["123", "1234", "12345", "12345"]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中正则<code v-pre>/\d{2,5}/</code>，表示数字连续出现2到5次。会匹配2位、3位、4位、5位连续数字。但是其是贪婪的，它会尽可能多的匹配。你能给我6个，我就要5个。你能给我3个，我就3要个。反正只要在能力范围内，越多越好。</p>
<p>我们知道有时贪婪不是一件好事。而惰性匹配，就是尽可能少的匹配：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> regex <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d{2,5}?</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">var</span> string <span class="token operator">=</span> <span class="token string">"123 1234 12345 123456"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> string<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// => ["12", "12", "34", "12", "34", "12", "34", "56"]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code v-pre>/\d{2,5}?/</code>表示，虽然2到5次都行，当2个就够的时候，就不在往下尝试了。</p>
<p>对惰性匹配的记忆方式是：量词后面加个问号，问一问你知足了吗，你很贪婪吗？</p>
</div></template>


