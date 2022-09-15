<template><div><h1 id="linux命令" tabindex="-1"><a class="header-anchor" href="#linux命令" aria-hidden="true">#</a> linux命令</h1>
<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2>
<h3 id="本地登录线上机器" tabindex="-1"><a class="header-anchor" href="#本地登录线上机器" aria-hidden="true">#</a> 本地登录线上机器</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ssh work@192.168.10.21
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>work是用户名  192.168.10.21是线上机器IP地址</p>
<p>输入命令后就可以输入密码了， 密码输入成功后就可以登录到linux线上机或测试机</p>
<h3 id="查看文件夹" tabindex="-1"><a class="header-anchor" href="#查看文件夹" aria-hidden="true">#</a> 查看文件夹</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看文件夹所有文件" tabindex="-1"><a class="header-anchor" href="#查看文件夹所有文件" aria-hidden="true">#</a> 查看文件夹所有文件</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ls -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令可以看到隐藏的文件， 比如.babelrc。 一般.开头的都是隐藏文件。</p>
<h3 id="创建文件" tabindex="-1"><a class="header-anchor" href="#创建文件" aria-hidden="true">#</a> 创建文件</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir abc.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建了名为<code v-pre>abc.txt</code>的文件。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>touch d.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建了名为<code v-pre>d.js</code>的文件。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vi d.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有则创建d.js， 有的话直接打开vim编辑器。</p>
<h3 id="vim编辑器" tabindex="-1"><a class="header-anchor" href="#vim编辑器" aria-hidden="true">#</a> vim编辑器</h3>
<p>新建完之后需要点击i， 进入INSERT模式。 表示可以输入了。</p>
<h4 id="退出insert" tabindex="-1"><a class="header-anchor" href="#退出insert" aria-hidden="true">#</a> 退出INSERT</h4>
<p>点击左上角ESC可退出INSERT模式。</p>
<h4 id="写入保存" tabindex="-1"><a class="header-anchor" href="#写入保存" aria-hidden="true">#</a> 写入保存</h4>
<p>输入<code v-pre>:w</code></p>
<p>点击回车保存。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094806265.png" alt="image-20220805094806265"></p>
<p>输入<code v-pre>:q</code></p>
<p>点击回车就可以退出了。</p>
<p>输入<code v-pre>:q!</code>可以直接强制退出， 不用保存。(写完代码不想用了可以这样做)</p>
<h3 id="查看文件所有内容" tabindex="-1"><a class="header-anchor" href="#查看文件所有内容" aria-hidden="true">#</a> 查看文件所有内容</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看头部内容" tabindex="-1"><a class="header-anchor" href="#查看头部内容" aria-hidden="true">#</a> 查看头部内容</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>head package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看尾部内容" tabindex="-1"><a class="header-anchor" href="#查看尾部内容" aria-hidden="true">#</a> 查看尾部内容</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tail package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查找文件内容关键字" tabindex="-1"><a class="header-anchor" href="#查找文件内容关键字" aria-hidden="true">#</a> 查找文件内容关键字</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>grep "babel" package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查找babel关键字在package.json中的位置</p>
<h3 id="删除文件夹" tabindex="-1"><a class="header-anchor" href="#删除文件夹" aria-hidden="true">#</a> 删除文件夹</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rm -rf abc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加上-rf可以递归的删除文件夹， 防止删除不彻底。</p>
<h3 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件" aria-hidden="true">#</a> 删除文件</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rm a1.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除a1.js文件</p>
<h3 id="移动路径" tabindex="-1"><a class="header-anchor" href="#移动路径" aria-hidden="true">#</a> 移动路径</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时路径移动到当前路径下的dist目录</p>
<h3 id="重命名文件名称" tabindex="-1"><a class="header-anchor" href="#重命名文件名称" aria-hidden="true">#</a> 重命名文件名称</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mv index.html index1.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把文件index.html改为index1.html</p>
<h3 id="移动文件" tabindex="-1"><a class="header-anchor" href="#移动文件" aria-hidden="true">#</a> 移动文件</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mv bundle.js ../bundle.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把bundle.js移动到了上级目录。</p>
<p>可以使用Tab键填满文件名</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mv bundle.js dist/bundle.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从当前目录的bundle.js移动回dist目录</p>
<h3 id="回到上级目录" tabindex="-1"><a class="header-anchor" href="#回到上级目录" aria-hidden="true">#</a> 回到上级目录</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd ../
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="拷贝文件" tabindex="-1"><a class="header-anchor" href="#拷贝文件" aria-hidden="true">#</a> 拷贝文件</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cp a.js a1.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>拷贝a.js, 文件命名为a1.js</p>
</div></template>


