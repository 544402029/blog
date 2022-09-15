<template><div><h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h1>
<blockquote>
<p>本文为阅读  <a href="https://juejin.cn/book/6844733697996881928" target="_blank" rel="noopener noreferrer">《Git 原理详解及实用指南》<ExternalLinkIcon/></a> 和 <a href="https://www.imooc.com/read/51#catalog" target="_blank" rel="noopener noreferrer">《Git原理详解与实操指南》<ExternalLinkIcon/></a> 时所记录笔记，如有兴趣可阅读正版。</p>
</blockquote>
<h2 id="git常用命令" tabindex="-1"><a class="header-anchor" href="#git常用命令" aria-hidden="true">#</a> Git常用命令</h2>
<h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3>
<h4 id="初始化仓库" tabindex="-1"><a class="header-anchor" href="#初始化仓库" aria-hidden="true">#</a> 初始化仓库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="把远程仓库取到本地" tabindex="-1"><a class="header-anchor" href="#把远程仓库取到本地" aria-hidden="true">#</a> 把远程仓库取到本地</h4>
<h5 id="克隆" tabindex="-1"><a class="header-anchor" href="#克隆" aria-hidden="true">#</a> 克隆</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone 你刚复制的地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="克隆并创建本地文件夹" tabindex="-1"><a class="header-anchor" href="#克隆并创建本地文件夹" aria-hidden="true">#</a> 克隆并创建本地文件夹</h5>
<p><code v-pre>httptest</code> 为本地文件夹名称</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://gitee.com/songboy/test201907.git   httptest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>克隆仓库最后一个版本</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://gitee.com/songboy/test201907.git  tempdemo --depth==1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="添加远程仓库" tabindex="-1"><a class="header-anchor" href="#添加远程仓库" aria-hidden="true">#</a> 添加远程仓库</h4>
<p>像这样添加远程仓库是需要进行分别推送的</p>
<p><code v-pre>github</code>  是远程仓库自定义的一个名字,  <code v-pre>https://github.com/78778443/gittest.git</code>  则是的远程仓库地址</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git remote add github https://github.com/78778443/gittest.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="添加远程仓库推送地址" tabindex="-1"><a class="header-anchor" href="#添加远程仓库推送地址" aria-hidden="true">#</a> 添加远程仓库推送地址</h4>
<p>可实现一键推送到两个仓库</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git remote set-url --add origin https://github.com/78778443/gittest.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看远程仓库" tabindex="-1"><a class="header-anchor" href="#查看远程仓库" aria-hidden="true">#</a> 查看远程仓库</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git remote -v
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="添加目录" tabindex="-1"><a class="header-anchor" href="#添加目录" aria-hidden="true">#</a> 添加目录</h5>
<p><code v-pre>app</code>为目录名称</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git add app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="提交代码" tabindex="-1"><a class="header-anchor" href="#提交代码" aria-hidden="true">#</a> 提交代码</h4>
<h5 id="提交" tabindex="-1"><a class="header-anchor" href="#提交" aria-hidden="true">#</a> 提交</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git commit -m “这是备注信息”
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="冲突解决后提交" tabindex="-1"><a class="header-anchor" href="#冲突解决后提交" aria-hidden="true">#</a> 冲突解决后提交</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git commit -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决冲突后这里提交版本的方式稍微有一些区别，会在<code v-pre>git commit</code> 后面增加一个<code v-pre>-a</code>参数，而且不需要<code v-pre>-m</code>参数；但是执行之后会单独多出一个步骤让你填写冲突解决的备注信息，如下图所示：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220823103807995.png" alt="image-20220823103807995"></p>
<p>在上图中会默认生成一些备注信息，你也可以增加或删减部分信息，然后用<code v-pre>:wq</code>或者<code v-pre>:x</code>进行保存并退出，退出之后会新增加一个版本，可以使用<code v-pre>git log</code>命令查看版本记录。</p>
<h4 id="推送到远程仓库" tabindex="-1"><a class="header-anchor" href="#推送到远程仓库" aria-hidden="true">#</a> 推送到远程仓库</h4>
<p>只能推送 <code v-pre>clone</code> 或者 <code v-pre>pull</code> 下来的分支</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="推送到指定远程仓库" tabindex="-1"><a class="header-anchor" href="#推送到指定远程仓库" aria-hidden="true">#</a> 推送到指定远程仓库</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push github
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="指定默认的远程仓库" tabindex="-1"><a class="header-anchor" href="#指定默认的远程仓库" aria-hidden="true">#</a> 指定默认的远程仓库</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push -u github 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="与远程仓库保持一致" tabindex="-1"><a class="header-anchor" href="#与远程仓库保持一致" aria-hidden="true">#</a> 与远程仓库保持一致</h5>
<p><code v-pre>git fetch</code> 只会拉取远程分支不进行自动合并</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git fetch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这条命令中，<code v-pre>--hard</code> 为 <code v-pre>git reset</code> 的选项，它的作用是 reset 之后把当前工作的差异部分丢弃掉，完全与目标一致，<code v-pre>origin/master</code> 则是目标比较分支，命令执行后，返回的信息如下图所示：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822174531404.png" alt="image-20220822174531404"></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git reset --hard origin/master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="创建分支" tabindex="-1"><a class="header-anchor" href="#创建分支" aria-hidden="true">#</a> 创建分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="切换分支" tabindex="-1"><a class="header-anchor" href="#切换分支" aria-hidden="true">#</a> 切换分支</h4>
<p>把远程分支在本地创建，可以通过 <code v-pre>git checkout 分支名</code> 命令进行，这个命令其实是切换分支用的。但当它发现你本地不存在这个分支，会自动找到远程对应的分支然后在本地进行创建，参考命令如下所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="创建并切换-分支" tabindex="-1"><a class="header-anchor" href="#创建并切换-分支" aria-hidden="true">#</a> 创建并切换 分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout -b feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第一次推送的时候指定远程分支名</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push --set-upstream origin feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="找回删除的分支" tabindex="-1"><a class="header-anchor" href="#找回删除的分支" aria-hidden="true">#</a> 找回删除的分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git reflog show
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令执行之后返回信息如下图所示：</p>
<p>在图中注意看红色框选区域，下面一条是我切换到 <code v-pre>retest</code> 分支时候记录下来的，另外一条是执行了提交操作，我们把 <code v-pre>commitid</code> 值 <code v-pre>b52b955</code> 复制下来。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822175612027.png" alt="image-20220822175612027"></p>
<p>接着使用 <code v-pre>git branch 分支名称 commit_id</code> 方式建立一个新的分支，参考命令如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout -b  retest_v3  b52b955
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="回滚-reset-操作" tabindex="-1"><a class="header-anchor" href="#回滚-reset-操作" aria-hidden="true">#</a> 回滚 reset 操作</h5>
<p>如果你不小心使用 <code v-pre>git reset</code> 回滚了提交记录，想找回之前的提交记录也是可以的；可以 <code v-pre>git reflog</code> 查看操作历史，找到执行 <code v-pre>git reset</code> 命令之前 <code v-pre>commitid</code>，然后 <code v-pre>git reset --hard</code> 到那个 <code v-pre>commitid</code> 即可。</p>
<h5 id="从历史版本中找回删除的文件" tabindex="-1"><a class="header-anchor" href="#从历史版本中找回删除的文件" aria-hidden="true">#</a> 从历史版本中找回删除的文件</h5>
<p>有时候，我们在某个版本中删除了文件，后来又突然发现需要这个文件，也是可以恢复的；恢复之前首先确定要恢复的文件在哪一个版本（commit）中，假设那个版本号是： 7a4312sd，文件路径为 abc.php 那么参考命如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout 7a4312sd abc.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h4>
<h5 id="删除本地分支" tabindex="-1"><a class="header-anchor" href="#删除本地分支" aria-hidden="true">#</a> 删除本地分支</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch -d feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li><code v-pre>HEAD</code> 指向的 <code v-pre>branch</code> 不能删除。如果要删除 <code v-pre>HEAD</code> 指向的 <code v-pre>branch</code>，需要先用 <code v-pre>checkout</code> 把 <code v-pre>HEAD</code> 指向其他地方。</li>
<li>由于 Git 中的 <code v-pre>branch</code> 只是一个引用，所以删除 <code v-pre>branch</code> 的操作也只会删掉这个引用，并不会删除任何的 <code v-pre>commit</code>。（不过如果一个 <code v-pre>commit</code> 不在任何一个 <code v-pre>branch</code> 的「路径」上，或者换句话说，如果没有任何一个 <code v-pre>branch</code> 可以回溯到这条 <code v-pre>commit</code>（也许可以称为野生 <code v-pre>commit</code>？），那么在一定时间后，它会被 Git 的回收机制删除掉。）</li>
<li>出于安全考虑，没有被合并到 <code v-pre>master</code> 过的 <code v-pre>branch</code> 在删除时会失败（因为怕你误删掉「未完成」的 <code v-pre>branch</code> 啊）：</li>
</ol>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220819090528371.png" alt="image-20220819090528371"></p>
<h5 id="强制删除" tabindex="-1"><a class="header-anchor" href="#强制删除" aria-hidden="true">#</a> 强制删除</h5>
<p>这种情况如果你确认是要删除这个 <code v-pre>branch</code> （例如某个未完成的功能被团队确认永久毙掉了，不再做了），可以把 <code v-pre>-d</code> 改成 <code v-pre>-D</code>，小写换成大写，就能删除了。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220819090558290.png" alt="image-20220819090558290"></p>
<h5 id="删除远程分支" tabindex="-1"><a class="header-anchor" href="#删除远程分支" aria-hidden="true">#</a> 删除远程分支</h5>
<p>用 -d 参数把远程仓库的 branch 也删了</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push origin -d feature1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>本地分支存在，远程仓库不存在此分支。 如果想将远程的分支与本地保持一致：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git remote prune origin 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令执行之后，返回信息如下图所示：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822165353914.png" alt="image-20220822165353914"></p>
<p>Git 会将拉取远程的分支信息与本地的进行对比，当发现远程的分支已经删除，便会对本地的分支进行标注；我们可以使用 Git 的命令查看关联失效的分支，参考命令如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch -vv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令执行之后，返回结果如下图所示：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822165427196.png" alt="image-20220822165427196"></p>
<p>在分支列表中，test1 分支后面有一个 <code v-pre>：gone</code> 的标识，说明远程分支已经被删除，通过这个标识我们能够很清晰的知道该需要删除哪些分支，删除分支的命令参考如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch -d test1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看分支" tabindex="-1"><a class="header-anchor" href="#查看分支" aria-hidden="true">#</a> 查看分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看所有分支" tabindex="-1"><a class="header-anchor" href="#查看所有分支" aria-hidden="true">#</a> 查看所有分支</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git branch -a 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git merge branch1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="取消合并" tabindex="-1"><a class="header-anchor" href="#取消合并" aria-hidden="true">#</a> 取消合并</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git merge --abort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="还原版本" tabindex="-1"><a class="header-anchor" href="#还原版本" aria-hidden="true">#</a> 还原版本</h4>
<p><strong>需要注意的是，在使用 <code v-pre>revert</code> 去恢复某个版本代码时，Git 只会撤销指定版本的代码，而不是指定版本后的所有版本</strong>。比如说你提交了 1、2、3 三个版本，当你撤销版本 2 的时候，会生成版本 4，但是不会对版本 3 产生影响。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git revert 6d8feb147973711d08211f953f3d7c463ee1e88f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="储藏工作目录的改动" tabindex="-1"><a class="header-anchor" href="#储藏工作目录的改动" aria-hidden="true">#</a> 储藏工作目录的改动</h4>
<h5 id="储藏" tabindex="-1"><a class="header-anchor" href="#储藏" aria-hidden="true">#</a> 储藏</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="取出" tabindex="-1"><a class="header-anchor" href="#取出" aria-hidden="true">#</a> 取出</h5>
<h6 id="取出后移除此-stash" tabindex="-1"><a class="header-anchor" href="#取出后移除此-stash" aria-hidden="true">#</a> 取出后移除此 <code v-pre>stash</code></h6>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>注意：没有被 track 的文件（即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 <code v-pre>-u</code> 参数，它是 <code v-pre>--include-untracked</code> 的简写。</p>
</blockquote>
<h6 id="取出后依旧保留在存储列表" tabindex="-1"><a class="header-anchor" href="#取出后依旧保留在存储列表" aria-hidden="true">#</a> 取出后依旧保留在存储列表</h6>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash apply stash@{0}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>git stash apply</code> 为固定格式，<code v-pre>stash@{0}</code>为编号，如果想恢复最近的一个改动也可以不填写编号，直接执行命令的前半部分就可以了，如下命令所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash apply
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="移除" tabindex="-1"><a class="header-anchor" href="#移除" aria-hidden="true">#</a> 移除</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash drop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="查看列表" tabindex="-1"><a class="header-anchor" href="#查看列表" aria-hidden="true">#</a> 查看列表</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git stash list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看日志" tabindex="-1"><a class="header-anchor" href="#查看日志" aria-hidden="true">#</a> 查看日志</h4>
<p>使用 <code v-pre>git reflog</code> 可以查看 Git 的操作的日志，<code v-pre>git log</code> 只能查看版本日志</p>
<p><code v-pre>reflog</code> 默认查看 <code v-pre>HEAD</code> 的移动历史，除此之外，也可以手动加上名称来查看其他引用的移动历史，例如某个 <code v-pre>branch</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git reflog master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="忽略文件" tabindex="-1"><a class="header-anchor" href="#忽略文件" aria-hidden="true">#</a> 忽略文件</h3>
<p><code v-pre>.gitignore</code> 文件支持通配符，当你在文件中添加一些忽略规则之后，可能匹配过于宽松，导致某一个文件无法提交到 git ;这个时候你有两种方式来处理，</p>
<p>或者你发现，可能是 <code v-pre>.gitignore</code> 写得有问题，需要找出来到底哪个规则写错了，可以用<code v-pre>git check-ignore</code>命令检查：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git check-ignore -v 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Git 会告诉我们，<code v-pre>.gitignore</code> 的第 1 行规则忽略了该文件，于是我们就可以知道应该修订哪个规则。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822155747884.png" alt="image-20220822155747884"></p>
<p>除了修改 <code v-pre>.gitignore</code> 文件的规则之外还可以使用强制添加的方式，如下图所示</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822155840891.png" alt="image-20220822155840891"></p>
<p>如果你确实想添加该文件，可以用 <code v-pre>-f</code> 强制添加到 Git：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git add -f .DS_Store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="忽略已存在的文件" tabindex="-1"><a class="header-anchor" href="#忽略已存在的文件" aria-hidden="true">#</a> 忽略已存在的文件</h4>
<p>先在 <code v-pre>.gitignore</code> 中设置该文件为忽略，然后执行删除缓存命令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git rm --cached test2/index.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置信息" tabindex="-1"><a class="header-anchor" href="#配置信息" aria-hidden="true">#</a> 配置信息</h3>
<h4 id="临时记住密码" tabindex="-1"><a class="header-anchor" href="#临时记住密码" aria-hidden="true">#</a> 临时记住密码</h4>
<p>如果你不想每次都输入 git 的认证信息，可以设置缓存认证数据，默认记住 15 分钟，如下命令所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config –-global credential.helper cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你想缓存更长时间，也可以指定缓存时长，比如下面是自定义配置记住 1 小时的命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config credential.helper ‘cache –timeout=3600’
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="永久记住密码" tabindex="-1"><a class="header-anchor" href="#永久记住密码" aria-hidden="true">#</a> 永久记住密码</h4>
<p>如果觉得一遍遍地输入密码很烦，可以输入执行这行代码把密码保存起来。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config credential.helper store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这之后你只需要再输入一次密码， Git 就会把你的密码保存下来，这之后就再也不用输入了。但是「安全性低」，因为这条指令会让 Git 把你的密码以明文形式保存在你的电脑上。</p>
<p>命令执行完毕之后，会在当前用户主目录的<code v-pre>.gitconfig</code>文件中新增一项配置，配置如下所示</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[credential]
    helper = store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可按照以上说明直接修改配置文件。如果加上 <code v-pre>--global</code>则直接在全局配置。</p>
<h4 id="查看昵称" tabindex="-1"><a class="header-anchor" href="#查看昵称" aria-hidden="true">#</a> 查看昵称</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config user.name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看邮箱" tabindex="-1"><a class="header-anchor" href="#查看邮箱" aria-hidden="true">#</a> 查看邮箱</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config user.email
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="配置昵称" tabindex="-1"><a class="header-anchor" href="#配置昵称" aria-hidden="true">#</a> 配置昵称</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global user.name "你的昵称"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="修改配置信息" tabindex="-1"><a class="header-anchor" href="#修改配置信息" aria-hidden="true">#</a> 修改配置信息</h4>
<p>在配置中如果不小心配置错了，或者后面想修改配置的时候，是不能通过重复执行上面的设置昵称命令，来修改昵称的，邮箱修改同理。如果你多次设置昵称，它会在命令执行后提示你无法重复配置或者可能不给你提示，但是这种情况会导致一个 key 配置了多个 value 的问题。</p>
<p>不过，修改的时候，可以通过特定的方式去修改，这里我介绍两种方法， 第一种是通过命令行，第二种是通过修改配置文件。</p>
<h5 id="命令行修改配置" tabindex="-1"><a class="header-anchor" href="#命令行修改配置" aria-hidden="true">#</a> 命令行修改配置</h5>
<p>通过命令行修改的方式比较简单，直接执行以下的命令即可
修改昵称参考命令如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global --replace-all user.name "your user name"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改邮箱地址参考命令如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global --replace-all user.email"your user email"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h5>
<p>修改文件的方式，主要是修改位于主目录下<code v-pre>.gitconfig</code> 文件。在 Linux 和 Mac 中，可以通过 vim 命令进行直接编辑，比如<code v-pre>vim ~/.gitconfig</code> ；Windows 系统同样位于用户主目录下，假设你当前的用户是<code v-pre>administrator</code>，那么对应的配置文件的路径应该是 <code v-pre>C:\Users\administrator\.gitconfig</code>，可以直接使用记事本修改里边的 name 或者 email。</p>
<p>如果之前已经配置过昵称和邮箱的情况下，当使用 vim 或者记事本打开配置文件之后，可以看到如下配置：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[user]
        name = daxia
        email = 78778443@qq.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在如果有重复的 name 或 email，可以将其删掉，只剩下一个就好。修改完，通过 git bash 输入 <code v-pre>git config –list</code>可以查看是否修改成功了。</p>
<h4 id="忽略文件权限" tabindex="-1"><a class="header-anchor" href="#忽略文件权限" aria-hidden="true">#</a> 忽略文件权限</h4>
<h5 id="当前版本库" tabindex="-1"><a class="header-anchor" href="#当前版本库" aria-hidden="true">#</a> 当前版本库</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config core.filemode false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>全局</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global core.fileMode false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在配置文件中，如果看到<code v-pre>fileMode false</code>则代表配置成功，如下图所示：</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822155230504.png" alt="image-20220822155230504"></p>
<h2 id="rebase" tabindex="-1"><a class="header-anchor" href="#rebase" aria-hidden="true">#</a> rebase</h2>
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
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
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
<h3 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h3>
<p>本节内容讲了 <code v-pre>reset</code> 指令的本质：重置 <code v-pre>HEAD</code> 以及它所指向的 <code v-pre>branch</code> 的位置。同时，介绍了 <code v-pre>reset</code> 的三种参数：</p>
<ol>
<li><code v-pre>--hard</code>：重置位置的同时，清空工作目录的所有改动；</li>
<li><code v-pre>--soft</code>：重置位置的同时，保留工作目录和暂存区的内容，并把重置 <code v-pre>HEAD</code> 的位置所导致的新的文件差异放进暂存区。</li>
<li><code v-pre>--mixed</code>（默认）：重置位置的同时，保留工作目录的内容，并清空暂存区。</li>
</ol>
<p>除了上面这三种参数，还有一些没有列出的较为不常用的参数；另外除了我讲的功能外，<code v-pre>reset</code> 其实也还有一些别的功能和用法。不过 <code v-pre>reset</code> 最关键的功能、用法和本质原理就是上面这些了，想了解更多的话，可以去官网了解一下。</p>
<h2 id="ssh拉取" tabindex="-1"><a class="header-anchor" href="#ssh拉取" aria-hidden="true">#</a> SSH拉取</h2>
<p>现在我们再来看看<code v-pre>SSH</code>方式，相比<code v-pre>HTTP(S)</code>来说更加安全,因为<code v-pre>SSH</code>方式使用的是非对称加密，采用公钥与私钥的方式，不过相对来说配置起来会麻烦一些；好处是一次配置之后，后续不需要每次都进行认证，也更加安全。</p>
<p><code v-pre>sshtest</code> 为本地文件夹名称</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone git@gitee.com:songboy/test201907.git  sshtest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>回车执行后，会提示需要权限验证，返回信息如下所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>➜  ~ git clone git@gitee.com:songboy/test201907.git  sshtest
Cloning into 'sshtest'...
The authenticity of host 'gitee.com (218.11.0.86)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'gitee.com,218.11.0.86' (ECDSA) to the list of known hosts.
git@gitee.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为并没有配置公钥与私钥，所以拉取代码并没有成功。</p>
<h3 id="创建一个ssh-key" tabindex="-1"><a class="header-anchor" href="#创建一个ssh-key" aria-hidden="true">#</a> 创建一个ssh key</h3>
<p>通过 ssh 协议拉取代码首先要保证当前用户的主目录存在一个<code v-pre>.ssh</code>的文件夹，并且里面已经存在私钥文件，如果没有的话我们可以通过<code v-pre>ssh-keygen</code>，生成一份公钥与私钥，如下命令所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>➜  ~ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):
Created directory '/root/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:288AB3QWkp0hB5TOwzTCzkZTnLlO7IZ6YEgXpmXSLF0 root@93268ac888a1
The key's randomart image is:
+---[RSA 2048]----+
|   + oE+BB*+     |
|  o O =.O*o      |
|   B = O.o       |
|  o . + O.       |
| . o . =S..      |
|  . o . +=       |
|   . o .. o      |
|    . .    +     |
|     .      o    |
+----[SHA256]-----+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行命令的交互中，可以直接回车使用默认选项，最终会在当前用户目录下生成公钥和私钥，查看生成的公钥的命令为<code v-pre>cat ~/.ssh/id_rsa.pub</code>,在返回的信息中可以看到类似如下信息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>➜  ~ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC65v2fz8/7N8/dw3sfjIkxav75MdLKLDTvTIs1XMj3PItPUXdUgsr7RR2WfpJUbtkU6xGAxF9SpNFw275ithvk85qx6PebQxfTTzqypawNwAOMy4CAOsRNybQWp//whtWfCUR2TvVtOQErq9ISEYhi+YQgoRg2ykYz9VZj8cFz99/Gtb3ApN3oHtqD9qcGUDPvL7MKjta3qrAX4KZHM++8FXz0qYrDgz9J/8+oLSebC6MOJiPuc7ut0rfICKaAU7XS4xvU39sNtES/j531AB/Xixb/ufaMPUKhIdASmUFP1WFoVU4268mtW1dZ99t6AsdQ9X2wjNI1QAVX/lJQe2Ox root@93268ac888a1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加公钥到服务器" tabindex="-1"><a class="header-anchor" href="#添加公钥到服务器" aria-hidden="true">#</a> 添加公钥到服务器</h3>
<p>当确认公钥和私钥生成完毕之后，我们还需要将公钥放到远程的 git 仓库中去，在码云的版本库中，右上角有一个管理，在管理页面的左侧菜单中有一个添加公钥的选项，我们将上面的公钥内容复制进去，如下图所示</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822154147733.png" alt="image-20220822154147733"></p>
<h3 id="拉取代码" tabindex="-1"><a class="header-anchor" href="#拉取代码" aria-hidden="true">#</a> 拉取代码</h3>
<p>当公钥添加进去之后，就已经完成了权限配置，此时我们再次使用ssh方式拉取代码，就不会提示没有权限，执行结果如下所示</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>➜  ~ git clone git@gitee.com:songboy/test201907.git  sshtest
Cloning into 'sshtest'...
The authenticity of host 'gitee.com (218.11.0.86)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'gitee.com,218.11.0.86' (ECDSA) to the list of known hosts.
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 4 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (4/4), done.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到在代码执行之后，代码已经拉取完成。</p>
<h3 id="更新代码" tabindex="-1"><a class="header-anchor" href="#更新代码" aria-hidden="true">#</a> 更新代码</h3>
<p>ssh 方式更新代码命令和上面的 http 方式拉取代码命令一致，同样需要在 sshtest 目录下执行命令：<code v-pre>git pull</code>，然后可以看到git成功的拉取到了代码</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>➜  sshtest git:(master) git pull
Already up to date.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


