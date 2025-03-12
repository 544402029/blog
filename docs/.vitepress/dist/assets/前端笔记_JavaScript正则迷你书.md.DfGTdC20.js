import{_ as s,c as i,o as a,a3 as t}from"./chunks/framework.47i9LX9H.js";const g=JSON.parse('{"title":"JavaScript正则迷你书","description":"","frontmatter":{},"headers":[],"relativePath":"前端笔记/JavaScript正则迷你书.md","filePath":"前端笔记/JavaScript正则迷你书.md"}'),e={name:"前端笔记/JavaScript正则迷你书.md"},h=t(`<h1 id="javascript正则迷你书" tabindex="-1">JavaScript正则迷你书 <a class="header-anchor" href="#javascript正则迷你书" aria-label="Permalink to &quot;JavaScript正则迷你书&quot;">​</a></h1><h2 id="匹配攻略" tabindex="-1">匹配攻略 <a class="header-anchor" href="#匹配攻略" aria-label="Permalink to &quot;匹配攻略&quot;">​</a></h2><h3 id="范围表示法" tabindex="-1">范围表示法 <a class="header-anchor" href="#范围表示法" aria-label="Permalink to &quot;范围表示法&quot;">​</a></h3><p>比如<code>[123456abcdefGHIJKLM]</code>，可以写成<code>[1-6a-fG-M]</code>。用连字符-来省略和简写。</p><h3 id="排除字符组" tabindex="-1">排除字符组 <a class="header-anchor" href="#排除字符组" aria-label="Permalink to &quot;排除字符组&quot;">​</a></h3><p>纵向模糊匹配，还有一种情形就是，某位字符可以是任何东西，但就不能是&quot;a&quot;、&quot;b&quot;、&quot;c&quot;。</p><p>此时就是排除字符组（反义字符组）的概念。例如<code>[^abc]</code>，表示是一个除&quot;a&quot;、&quot;b&quot;、&quot;c&quot;之外的任意一个字符。字符组的第一位放^（脱字符），表示求反的概念。</p><h4 id="常见的简写形式" tabindex="-1">常见的简写形式: <a class="header-anchor" href="#常见的简写形式" aria-label="Permalink to &quot;常见的简写形式:&quot;">​</a></h4><ul><li><code>\\d</code>就是<code>[0-9]</code>。表示是一位数字。记忆方式：其英文是digit（数字）。</li><li><code>\\D</code>就是<code>[^0-9]</code>。表示除数字外的任意字符。</li><li><code>\\w</code>就是<code>[0-9a-zA-Z_]</code>。表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。</li><li><code>\\W</code>是<code>[^0-9a-zA-Z_]</code>。非单词字符。</li><li><code>\\s</code>是<code>[ \\t\\v\\n\\r\\f]</code>。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。</li><li><code>\\S</code>是<code>[^ \\t\\v\\n\\r\\f]</code>。 非空白符。</li><li><code>.</code>就是[^\\n\\r\\u2028\\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号...中的每个点，都可以理解成占位符，表示任何类似的东西。</li></ul><p>如果要匹配任意字符怎么办？可以使用<code>[\\d\\D]</code>、<code>[\\w\\W]</code>、<code>[\\s\\S]</code>和<code>[^]</code>中任何的一个。</p><h3 id="贪婪匹配和惰性匹配" tabindex="-1">贪婪匹配和惰性匹配 <a class="header-anchor" href="#贪婪匹配和惰性匹配" aria-label="Permalink to &quot;贪婪匹配和惰性匹配&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> regex </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">{2,5}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;123 1234 12345 123456&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">( string.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(regex) ); </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; [&quot;123&quot;, &quot;1234&quot;, &quot;12345&quot;, &quot;12345&quot;]</span></span></code></pre></div><p>其中正则<code>/\\d{2,5}/</code>，表示数字连续出现2到5次。会匹配2位、3位、4位、5位连续数字。但是其是贪婪的，它会尽可能多的匹配。你能给我6个，我就要5个。你能给我3个，我就3要个。反正只要在能力范围内，越多越好。</p><p>我们知道有时贪婪不是一件好事。而惰性匹配，就是尽可能少的匹配：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> regex </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">{2,5}?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;123 1234 12345 123456&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">( string.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(regex) ); </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; [&quot;12&quot;, &quot;12&quot;, &quot;34&quot;, &quot;12&quot;, &quot;34&quot;, &quot;12&quot;, &quot;34&quot;, &quot;56&quot;]</span></span></code></pre></div><p>其中<code>/\\d{2,5}?/</code>表示，虽然2到5次都行，当2个就够的时候，就不在往下尝试了。</p><p>对惰性匹配的记忆方式是：量词后面加个问号，问一问你知足了吗，你很贪婪吗？</p>`,17),n=[h];function l(o,p,d,k,r,c){return a(),i("div",null,n)}const E=s(e,[["render",l]]);export{g as __pageData,E as default};
