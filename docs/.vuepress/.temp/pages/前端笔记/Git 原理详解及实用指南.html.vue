<template><div><h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h1>
<blockquote>
<p>本文为阅读  <a href="https://juejin.cn/book/6844733697996881928" target="_blank" rel="noopener noreferrer">《Git 原理详解及实用指南》<ExternalLinkIcon/></a> 和 <a href="https://www.imooc.com/read/51#catalog" target="_blank" rel="noopener noreferrer">《Git原理详解与实操指南》<ExternalLinkIcon/></a> 时所记录笔记，如有兴趣可阅读正版。</p>
</blockquote>
<h2 id="git常用命令" tabindex="-1"><a class="header-anchor" href="#git常用命令" aria-hidden="true">#</a> Git常用命令</h2>
<h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3>
<h4 id="初始化仓库" tabindex="-1"><a class="header-anchor" href="#初始化仓库" aria-hidden="true">#</a> 初始化仓库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="把远程仓库取到本地" tabindex="-1"><a class="header-anchor" href="#把远程仓库取到本地" aria-hidden="true">#</a> 把远程仓库取到本地</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone 你刚复制的地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看仓库提交历史" tabindex="-1"><a class="header-anchor" href="#查看仓库提交历史" aria-hidden="true">#</a> 查看仓库提交历史</h4>
<h5 id="查看历史" tabindex="-1"><a class="header-anchor" href="#查看历史" aria-hidden="true">#</a> 查看历史</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看详细改动历史" tabindex="-1"><a class="header-anchor" href="#查看详细改动历史" aria-hidden="true">#</a> 查看详细改动历史</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git log -p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看大致改动历史" tabindex="-1"><a class="header-anchor" href="#查看大致改动历史" aria-hidden="true">#</a> 查看大致改动历史</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git log --stat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看当前-commit" tabindex="-1"><a class="header-anchor" href="#查看当前-commit" aria-hidden="true">#</a> 查看当前 <code v-pre>commit</code></h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git show
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看任意-commit" tabindex="-1"><a class="header-anchor" href="#查看任意-commit" aria-hidden="true">#</a> 查看任意 <code v-pre>commit</code></h5>
<p>在 <code v-pre>show</code> 后面加上这个 <code v-pre>commit</code> 的引用（<code v-pre>branch</code> 或 <code v-pre>HEAD</code> 标记）或它的 <code v-pre>SHA-1</code> 码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git show 5e68b0d8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看指定-commit-中的指定文件" tabindex="-1"><a class="header-anchor" href="#查看指定-commit-中的指定文件" aria-hidden="true">#</a> 查看指定 commit 中的指定文件</h5>
<p>在 <code v-pre>commit</code> 的引用或 <code v-pre>SHA-1</code> 后输入文件名：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git show 5e68b0d8 shopping\ list.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看未提交的内容" tabindex="-1"><a class="header-anchor" href="#查看未提交的内容" aria-hidden="true">#</a> 查看未提交的内容</h5>
<h6 id="比对暂存区和上一条提交" tabindex="-1"><a class="header-anchor" href="#比对暂存区和上一条提交" aria-hidden="true">#</a> 比对暂存区和上一条提交</h6>
<p>使用 <code v-pre>git diff --staged</code> 可以显示暂存区和上一条提交之间的不同。换句话说，这条指令可以让你看到「如果你立即输入 <code v-pre>git commit</code>，你将会提交什么」：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git diff --staged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="比对工作目录和暂存区" tabindex="-1"><a class="header-anchor" href="#比对工作目录和暂存区" aria-hidden="true">#</a> 比对工作目录和暂存区</h6>
<p>使用 <code v-pre>git diff</code> （不加选项参数）可以显示工作目录和暂存区之间的不同。换句话说，这条指令可以让你看到「如果你现在把所有文件都 <code v-pre>add</code>，你会向暂存区中增加哪些内容」：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git diff
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="比对工作目录和上一条提交" tabindex="-1"><a class="header-anchor" href="#比对工作目录和上一条提交" aria-hidden="true">#</a> 比对工作目录和上一条提交</h6>
<p>使用 <code v-pre>git diff HEAD</code> 可以显示工作目录和上一条提交之间的不同，它是上面这二者的内容相加。换句话说，这条指令可以让你看到「如果你现在把所有文件都 <code v-pre>add</code> 然后 <code v-pre>git commit</code>，你将会提交什么」（不过需要注意，没有被 Git 记录在案的文件（即从来没有被 add 过 的文件，untracked files 并不会显示出来。为什么？因为对 Git 来说它并不存在啊）。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git diff HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实质上，如果你把 <code v-pre>HEAD</code> 换成别的 <code v-pre>commit</code>，也可以显示当前工作目录和这条 <code v-pre>commit</code> 的区别。</p>
<h4 id="查看工作目录当前状态" tabindex="-1"><a class="header-anchor" href="#查看工作目录当前状态" aria-hidden="true">#</a> 查看工作目录当前状态</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="添加到暂存区" tabindex="-1"><a class="header-anchor" href="#添加到暂存区" aria-hidden="true">#</a> 添加到暂存区</h4>
<h5 id="添加某个文件" tabindex="-1"><a class="header-anchor" href="#添加某个文件" aria-hidden="true">#</a> 添加某个文件</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git add shopping\ list.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="添加全部文件" tabindex="-1"><a class="header-anchor" href="#添加全部文件" aria-hidden="true">#</a> 添加全部文件</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git add .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="提交" tabindex="-1"><a class="header-anchor" href="#提交" aria-hidden="true">#</a> 提交</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="推送到远程仓库" tabindex="-1"><a class="header-anchor" href="#推送到远程仓库" aria-hidden="true">#</a> 推送到远程仓库</h4>
<p>只能推送 <code v-pre>clone</code> 或者 <code v-pre>pull</code> 下来的分支</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="本地创建分支推送到远程仓库" tabindex="-1"><a class="header-anchor" href="#本地创建分支推送到远程仓库" aria-hidden="true">#</a> 本地创建分支推送到远程仓库</h5>
<p>如果是本地创建分支推送到远程仓库，那么需要指定远程仓库的名称(别名) <code v-pre>origin</code> 以及远程仓库中目标 <code v-pre>branch</code> 的名字（目标分支需要与本地分支名称相同）。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push origin feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>你可以通过 <code v-pre>git config</code> 指令来设置 <code v-pre>push.default</code> 的值来改变 <code v-pre>push</code> 的行为逻辑，例如可以设置为「所有分支都可以用 <code v-pre>git push</code> 来直接 push，目标自动指向 <code v-pre>origin</code> 仓库的同名分支」（对应的 <code v-pre>push.default</code> 值：<code v-pre>current</code>），或者别的什么行为逻辑，你甚至可以设置为每次执行 <code v-pre>git push</code> 时就自动把所有本地分支全部同步到远程仓库（虽然这可能有点耗时和危险）。如果希望详细了解，你可以到<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgit-scm.com%2Fdocs%2Fgit-config%23git-config-pushdefault" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>看看。</p>
</blockquote>
<h5 id="强制推送" tabindex="-1"><a class="header-anchor" href="#强制推送" aria-hidden="true">#</a> 强制推送</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push origin feature1 -f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="拉取远程仓库" tabindex="-1"><a class="header-anchor" href="#拉取远程仓库" aria-hidden="true">#</a> 拉取远程仓库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git pull
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="创建分支" tabindex="-1"><a class="header-anchor" href="#创建分支" aria-hidden="true">#</a> 创建分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="切换-分支" tabindex="-1"><a class="header-anchor" href="#切换-分支" aria-hidden="true">#</a> 切换 分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="创建并切换-分支" tabindex="-1"><a class="header-anchor" href="#创建并切换-分支" aria-hidden="true">#</a> 创建并切换 分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout -b feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h4>
<h5 id="删除本地分支" tabindex="-1"><a class="header-anchor" href="#删除本地分支" aria-hidden="true">#</a> 删除本地分支</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch -d feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li><code v-pre>HEAD</code> 指向的 <code v-pre>branch</code> 不能删除。如果要删除 <code v-pre>HEAD</code> 指向的 <code v-pre>branch</code>，需要先用 <code v-pre>checkout</code> 把 <code v-pre>HEAD</code> 指向其他地方。</li>
<li>由于 Git 中的 <code v-pre>branch</code> 只是一个引用，所以删除 <code v-pre>branch</code> 的操作也只会删掉这个引用，并不会删除任何的 <code v-pre>commit</code>。（不过如果一个 <code v-pre>commit</code> 不在任何一个 <code v-pre>branch</code> 的「路径」上，或者换句话说，如果没有任何一个 <code v-pre>branch</code> 可以回溯到这条 <code v-pre>commit</code>（也许可以称为野生 <code v-pre>commit</code>？），那么在一定时间后，它会被 Git 的回收机制删除掉。）</li>
<li>出于安全考虑，没有被合并到 <code v-pre>master</code> 过的 <code v-pre>branch</code> 在删除时会失败（因为怕你误删掉「未完成」的 <code v-pre>branch</code> 啊）：</li>
</ol>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220819090528371.png" alt="image-20220819090528371"></p>
<p>这种情况如果你确认是要删除这个 <code v-pre>branch</code> （例如某个未完成的功能被团队确认永久毙掉了，不再做了），可以把 <code v-pre>-d</code> 改成 <code v-pre>-D</code>，小写换成大写，就能删除了。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220819090558290.png" alt="image-20220819090558290"></p>
<h5 id="删除远程分支" tabindex="-1"><a class="header-anchor" href="#删除远程分支" aria-hidden="true">#</a> 删除远程分支</h5>
<p>用 -d 参数把远程仓库的 branch 也删了</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push origin -d feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git merge branch1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="取消合并" tabindex="-1"><a class="header-anchor" href="#取消合并" aria-hidden="true">#</a> 取消合并</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git merge --abort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="储藏工作目录的改动" tabindex="-1"><a class="header-anchor" href="#储藏工作目录的改动" aria-hidden="true">#</a> 储藏工作目录的改动</h4>
<h5 id="储藏" tabindex="-1"><a class="header-anchor" href="#储藏" aria-hidden="true">#</a> 储藏</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="取出" tabindex="-1"><a class="header-anchor" href="#取出" aria-hidden="true">#</a> 取出</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>注意：没有被 track 的文件（即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 <code v-pre>-u</code> 参数，它是 <code v-pre>--include-untracked</code> 的简写。就像这样：</p>
</blockquote>
<h4 id="查看移动历史" tabindex="-1"><a class="header-anchor" href="#查看移动历史" aria-hidden="true">#</a> 查看移动历史</h4>
<p><code v-pre>reflog</code> 默认查看 <code v-pre>HEAD</code> 的移动历史，除此之外，也可以手动加上名称来查看其他引用的移动历史，例如某个 <code v-pre>branch</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git reflog master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置信息" tabindex="-1"><a class="header-anchor" href="#配置信息" aria-hidden="true">#</a> 配置信息</h3>
<h4 id="git账号密码保存" tabindex="-1"><a class="header-anchor" href="#git账号密码保存" aria-hidden="true">#</a> Git账号密码保存</h4>
<p>如果觉得一遍遍地输入密码很烦，可以输入执行这行代码把密码保存起来。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config credential.helper store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这之后你只需要再输入一次密码， Git 就会把你的密码保存下来，这之后就再也不用输入了。但是「安全性低」，因为这条指令会让 Git 把你的密码以明文形式保存在你的电脑上。</p>
<h4 id="查看昵称" tabindex="-1"><a class="header-anchor" href="#查看昵称" aria-hidden="true">#</a> 查看昵称</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config user.name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看邮箱" tabindex="-1"><a class="header-anchor" href="#查看邮箱" aria-hidden="true">#</a> 查看邮箱</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config user.email
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="配置昵称" tabindex="-1"><a class="header-anchor" href="#配置昵称" aria-hidden="true">#</a> 配置昵称</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global user.name "你的昵称"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="rebase" tabindex="-1"><a class="header-anchor" href="#rebase" aria-hidden="true">#</a> rebase</h2>
<p>不喜欢使用 <code v-pre>merge</code> 可以考虑使用此种方式进行提交</p>
<h3 id="rebase——在新位置重新提交" tabindex="-1"><a class="header-anchor" href="#rebase——在新位置重新提交" aria-hidden="true">#</a> rebase——在新位置重新提交</h3>
<p><code v-pre>rebase</code> 的意思是，给你的 <code v-pre>commit</code> 序列重新设置基础点（也就是父 <code v-pre>commit</code>）。展开来说就是，把你指定的 <code v-pre>commit</code> 以及它所在的 <code v-pre>commit</code> 串，以指定的目标 <code v-pre>commit</code> 为基础，依次重新提交一次。例如下面这个 <code v-pre>merge</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git merge branch1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fdea7b6646a1f3_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp" alt="15fdea7b6646a1f3_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0"></p>
<p>如果把 <code v-pre>merge</code> 换成 <code v-pre>rebase</code>，可以这样操作：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout branch1
<span class="token function">git</span> rebase master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1600abd620a8e28c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp" alt="1600abd620a8e28c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0"></p>
<p>另外，在 <code v-pre>rebase</code> 之后，记得切回 <code v-pre>master</code> 再 <code v-pre>merge</code> 一下，把 <code v-pre>master</code> 移到最新的 <code v-pre>commit</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout master
git merge branch1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/160149e054fe485c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp" alt="160149e054fe485c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0"></p>
<blockquote>
<p>为什么要从 <code v-pre>branch1</code> 来 <code v-pre>rebase</code>，然后再切回 <code v-pre>master</code> 再 <code v-pre>merge</code> 一下这么麻烦，而不是直接在 <code v-pre>master</code> 上执行 <code v-pre>rebase</code>？</p>
<p>从图中可以看出，<code v-pre>rebase</code> 后的 <code v-pre>commit</code> 虽然内容和 <code v-pre>rebase</code> 之前相同，但它们已经是不同的 <code v-pre>commits</code> 了。如果直接从 <code v-pre>master</code> 执行 <code v-pre>rebase</code> 的话，就会是下面这样：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/16014b5a6919c0b7_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp" alt="16014b5a6919c0b7_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0"></p>
<p>这就导致 <code v-pre>master</code> 上之前的两个最新 <code v-pre>commit</code> 被剔除了。如果这两个 <code v-pre>commit</code> 之前已经在中央仓库存在，这就会导致没法 <code v-pre>push</code> 了：</p>
<p>所以，为了避免和远端仓库发生冲突，一般不要从 <code v-pre>master</code> 向其他 <code v-pre>branch</code> 执行 <code v-pre>rebase</code> 操作。而如果是 <code v-pre>master</code> 以外的 <code v-pre>branch</code> 之间的 <code v-pre>rebase</code>（比如 <code v-pre>branch1</code> 和 <code v-pre>branch2</code> 之间），就不必这么多费一步，直接 <code v-pre>rebase</code> 就好。</p>
</blockquote>
<p>需要说明的是，<code v-pre>rebase</code> 是站在需要被 <code v-pre>rebase</code> 的 <code v-pre>commit</code> 上进行操作，这点和 <code v-pre>merge</code> 是不同的。</p>
<h2 id="刚刚提交的代码-发现写错了怎么办" tabindex="-1"><a class="header-anchor" href="#刚刚提交的代码-发现写错了怎么办" aria-hidden="true">#</a> 刚刚提交的代码，发现写错了怎么办？</h2>
<p>刚提交了一个代码，发现有几个字写错了：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fdf01882286d88~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>怎么修复？</p>
<p>当场再写一个修复这几个错别字的 <code v-pre>commit</code>？可以是可以，不过还有一个更加优雅和简单的解决方法：<code v-pre>commit -—amend</code>。</p>
<p>&quot;amend&quot; 是「修正」的意思。在提交时，如果加上 <code v-pre>--amend</code> 参数，Git 不会在当前 <code v-pre>commit</code> 上增加 <code v-pre>commit</code>，而是会把当前 <code v-pre>commit</code> 里的内容和暂存区（stageing area）里的内容合并起来后创建一个新的 <code v-pre>commit</code>，<strong>用这个新的 <code v-pre>commit</code> 把当前 <code v-pre>commit</code> 替换掉</strong>。所以 <code v-pre>commit --amend</code> 做的事就是它的字面意思：对最新一条 <code v-pre>commit</code> 进行修正。</p>
<p>具体地，对于上面这个错误，你就可以把文件中的错别字修改好之后，输入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> 笑声.txt
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Git 会把你带到提交信息编辑界面。可以看到，提交信息默认是当前提交的提交信息。你可以修改或者保留它，然后保存退出。然后，你的最新 <code v-pre>commit</code> 就被更新了。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fdf0187f2f4b2d_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp" alt="15fdf0187f2f4b2d_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0"></p>
<p>需要注意的：</p>
<ol>
<li>
<p><code v-pre>commit --amend</code> 并不是直接修改原 <code v-pre>commit</code> 的内容，而是生成一条新的 <code v-pre>commit</code>, 替换掉原 <code v-pre>commit</code> 。</p>
</li>
<li>
<p><code v-pre>git commit --amend</code> 只针对提交到本地仓库的有效,  需要git push -f才能推送至远程仓库。</p>
</li>
<li>
<p>慎用此功能，一般情况下在当前 <code v-pre>commit</code> 修改提交即可。</p>
</li>
</ol>
<h2 id="比错还错-想直接丢弃刚写的提交" tabindex="-1"><a class="header-anchor" href="#比错还错-想直接丢弃刚写的提交" aria-hidden="true">#</a> 比错还错，想直接丢弃刚写的提交？</h2>
<p>有的时候，刚写完的 <code v-pre>commit</code> 写得实在太烂，连自己的都看不下去，与其修改它还不如丢掉重写。这种情况，就可以用 <code v-pre>reset</code> 来丢弃最新的提交。</p>
<h3 id="reset-hard-丢弃最新的提交" tabindex="-1"><a class="header-anchor" href="#reset-hard-丢弃最新的提交" aria-hidden="true">#</a> reset --hard 丢弃最新的提交</h3>
<p>比如你刚写了一个 <code v-pre>commit</code>：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a6101d7f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a2f08fa1~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>写完回头看了看，你觉得「不行这得重新写」。那么你可以用 <code v-pre>reset --hard</code> 来撤销这条 <code v-pre>commit</code>。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>git reset --hard HEAD^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>HEAD 表示 HEAD^ 往回数一个位置的 <code v-pre>commit</code> ，上节刚说过，记得吧？</p>
</blockquote>
<p><code v-pre>HEAD^</code> 表示你要恢复到哪个 <code v-pre>commit</code>。因为你要撤销最新的一个 <code v-pre>commit</code>，所以你需要恢复到它的父 <code v-pre>commit</code> ，也就是 <code v-pre>HEAD^</code>。那么在这行之后，你的最新一条就被撤销了：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a3235853~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>不过，就像图上显示的，你被撤销的那条提交并没有消失，只是你不再用到它了。如果你在撤销它之前记下了它的 <code v-pre>SHA-1</code> 码，那么你还可以通过 <code v-pre>SHA-1</code> 来找到他它。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2>
<p>这一节的内容是撤销最新的提交，方式是通过 <code v-pre>reset --hard</code>：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>git reset --hard 目标commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="reset-的本质——不止可以撤销提交" tabindex="-1"><a class="header-anchor" href="#reset-的本质——不止可以撤销提交" aria-hidden="true">#</a> reset 的本质——不止可以撤销提交</h2>
<p>前面讲到，在最新的 <code v-pre>commit</code> 写错时，可以用 <code v-pre>reset --hard</code> 来把 <code v-pre>commit</code> 撤销：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>git reset --hard HEAD^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>用这行代码可以撤销掉当前 <code v-pre>commit</code></p>
</blockquote>
<p>在这节里，就对 <code v-pre>reset</code> 多说点，说说它的本质，说说它在撤销提交之外的用途。</p>
<h3 id="reset-的本质-移动-head-以及它所指向的-branch" tabindex="-1"><a class="header-anchor" href="#reset-的本质-移动-head-以及它所指向的-branch" aria-hidden="true">#</a> reset 的本质：移动 HEAD 以及它所指向的 branch</h3>
<p>实质上，<code v-pre>reset</code> 这个指令虽然可以用来撤销 <code v-pre>commit</code> ，但它的实质行为并不是撤销，而是移动 <code v-pre>HEAD</code> ，并且「捎带」上 <code v-pre>HEAD</code> 所指向的 <code v-pre>branch</code>（如果有的话）。也就是说，<code v-pre>reset</code> 这个指令的行为其实和它的字面意思 &quot;reset&quot;（重置）十分相符：它是用来重置 <code v-pre>HEAD</code> 以及它所指向的 <code v-pre>branch</code> 的位置的。</p>
<p>而 <code v-pre>reset --hard HEAD^</code> 之所以起到了撤销 <code v-pre>commit</code> 的效果，是因为它把 <code v-pre>HEAD</code> 和它所指向的 <code v-pre>branch</code> 一起移动到了当前 <code v-pre>commit</code> 的父 <code v-pre>commit</code> 上，从而起到了「撤销」的效果：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a3235853~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<blockquote>
<p>Git 的历史只能往回看，不能向未来看，所以把 <code v-pre>HEAD</code> 和 <code v-pre>branch</code> 往回移动，就能起到撤回 <code v-pre>commit</code> 的效果。</p>
</blockquote>
<p>所以同理，<code v-pre>reset --hard</code> 不仅可以撤销提交，还可以用来把 <code v-pre>HEAD</code> 和 <code v-pre>branch</code> 移动到其他的任何地方。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>git reset --hard branch2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb605b0de~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>不过……<code v-pre>reset</code> 后面总是跟着的那个 <code v-pre>--hard</code> 是什么意思呢？</p>
<p><code v-pre>reset</code> 指令可以重置 <code v-pre>HEAD</code> 和 <code v-pre>branch</code> 的位置，不过在重置它们的同时，对工作目录可以选择不同的操作，而对工作目录的操作的不同，就是通过 <code v-pre>reset</code> 后面跟的参数来确定的。</p>
<h3 id="reset-hard-重置工作目录" tabindex="-1"><a class="header-anchor" href="#reset-hard-重置工作目录" aria-hidden="true">#</a> reset --hard：重置工作目录</h3>
<p><code v-pre>reset --hard</code> 会在重置 <code v-pre>HEAD</code> 和 <code v-pre>branch</code> 的同时，重置工作目录里的内容。当你在 <code v-pre>reset</code> 后面加了 <code v-pre>--hard</code> 参数时，你的工作目录里的内容会被完全重置为和 <code v-pre>HEAD</code> 的新位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。</p>
<p>例如你在上次 <code v-pre>commit</code> 之后又对文件做了一些改动：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code>git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5a0e894~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>然后，你执行了 <code v-pre>reset</code> 并附上了 <code v-pre>--hard</code> 参数：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>git reset --hard HEAD^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你的 <code v-pre>HEAD</code> 和当前 <code v-pre>branch</code> 切到上一条 <code v-pre>commit</code> 的同时，你工作目录里的新改动也一起全都消失了，不管它们是否被放进暂存区：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code>git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5dbef68~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>可以看到，在 <code v-pre>reset --hard</code> 后，所有的改动都被擦掉了。</p>
<h3 id="reset-soft-保留工作目录" tabindex="-1"><a class="header-anchor" href="#reset-soft-保留工作目录" aria-hidden="true">#</a> reset --soft：保留工作目录</h3>
<p><code v-pre>reset --soft</code> 会在重置 <code v-pre>HEAD</code> 和 <code v-pre>branch</code> 时，保留工作目录和暂存区中的内容，并把重置 <code v-pre>HEAD</code> 所带来的新的差异放进暂存区。</p>
<p>什么是「重置 <code v-pre>HEAD</code> 所带来的新的差异」？就是这里：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5c6a249~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>由于 <code v-pre>HEAD</code> 从 <code v-pre>4</code> 移动到了 <code v-pre>3</code>，而且在 <code v-pre>reset</code> 的过程中工作目录的内容没有被清理掉，所以 <code v-pre>4</code> 中的改动在 <code v-pre>reset</code> 后就也成了工作目录新增的「工作目录和 <code v-pre>HEAD</code> 的差异」。这就是上面一段中所说的「重置 <code v-pre>HEAD</code> 所带来的差异」。</p>
<p>所以在同样的情况下：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code>git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5a0e894~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>假设此时当前 <code v-pre>commit</code> 的改动内容是新增了 <code v-pre>laughters.txt</code> 文件：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>git <span class="token keyword">show</span> <span class="token comment">--stat</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb7cdd727~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>如果这时你执行：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>git reset --soft HEAD^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么除了 <code v-pre>HEAD</code> 和它所指向的 <code v-pre>branch1</code> 被移动到 <code v-pre>HEAD^</code> 之外，原先 <code v-pre>HEAD</code> 处 <code v-pre>commit</code> 的改动（也就是那个 <code v-pre>laughters.txt</code> 文件）也会被放进暂存区：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code>git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb7e6e40b~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<p>这就是 <code v-pre>--soft</code> 和 <code v-pre>--hard</code> 的区别：<code v-pre>--hard</code> 会清空工作目录的改动，而 <code v-pre>--soft</code> 则会保留工作目录的内容，并把因为保留工作目录内容所带来的新的文件差异放进暂存区。</p>
<h3 id="reset-不加参数-保留工作目录-并清空暂存区" tabindex="-1"><a class="header-anchor" href="#reset-不加参数-保留工作目录-并清空暂存区" aria-hidden="true">#</a> reset 不加参数：保留工作目录，并清空暂存区</h3>
<p><code v-pre>reset</code> 如果不加参数，那么默认使用 <code v-pre>--mixed</code> 参数。它的行为是：保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 <code v-pre>reset</code> 所导致的新的文件差异，都会被放进工作目录。简而言之，就是「把所有差异都混合（mixed）放在工作目录中」。</p>
<p>还以同样的情况为例：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code>git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5a0e894~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<blockquote>
<p>修改了 <code v-pre>games.txt</code> 和 <code v-pre>shopping list.txt</code>，并把 <code v-pre>games.txt</code> 放进了暂存区。</p>
</blockquote>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>git <span class="token keyword">show</span> <span class="token comment">--stat</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb7cdd727~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<blockquote>
<p>最新的 <code v-pre>commit</code> 中新增了 <code v-pre>laughters.txt</code> 文件。</p>
</blockquote>
<p>这时如果你执行无参数的 <code v-pre>reset</code>：</p>
<div class="language-perl ext-perl line-numbers-mode"><pre v-pre class="language-perl"><code>git reset HEAD<span class="token operator">^</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>工作目录的内容和 <code v-pre>--soft</code> 一样会被保留，但和 <code v-pre>--soft</code> 的区别在于，它会把暂存区清空：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code>git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333d086f9754~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp" alt="img"></p>
<h2 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h2>
<p>本节内容讲了 <code v-pre>reset</code> 指令的本质：重置 <code v-pre>HEAD</code> 以及它所指向的 <code v-pre>branch</code> 的位置。同时，介绍了 <code v-pre>reset</code> 的三种参数：</p>
<ol>
<li><code v-pre>--hard</code>：重置位置的同时，清空工作目录的所有改动；</li>
<li><code v-pre>--soft</code>：重置位置的同时，保留工作目录和暂存区的内容，并把重置 <code v-pre>HEAD</code> 的位置所导致的新的文件差异放进暂存区。</li>
<li><code v-pre>--mixed</code>（默认）：重置位置的同时，保留工作目录的内容，并清空暂存区。</li>
</ol>
<p>除了上面这三种参数，还有一些没有列出的较为不常用的参数；另外除了我讲的功能外，<code v-pre>reset</code> 其实也还有一些别的功能和用法。不过 <code v-pre>reset</code> 最关键的功能、用法和本质原理就是上面这些了，想了解更多的话，可以去官网了解一下。</p>
</div></template>


