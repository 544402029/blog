# Git 原理详解及实用指南

> 本文为阅读[Git 原理详解及实用指南](https://juejin.cn/book/6844733697996881928)而来，如有兴趣可阅读正版。



## Git账号密码保存

如果觉得一遍遍地输入密码很烦，可以输入执行这行代码把密码保存起来。

```
git config credential.helper store
```

在这之后你只需要再输入一次密码， Git 就会把你的密码保存下来，这之后就再也不用输入了。但是「安全性低」，因为这条指令会让 Git 把你的密码以明文形式保存在你的电脑上。



## Git常用命令

#### 把远程仓库取到本地

```
git clone 你刚复制的地址
```

#### 查看仓库提交历史

##### 查看历史

```
git log
```

##### 查看详细改动历史

```
git log -p
```

##### 查看大致改动历史

```
git log --stat
```

##### 查看当前 `commit`

```
git show
```

##### 查看任意 `commit`

在 `show` 后面加上这个 `commit` 的引用（`branch` 或 `HEAD` 标记）或它的 `SHA-1` 码：

```
git show 5e68b0d8
```

##### 查看指定 commit 中的指定文件

在 `commit` 的引用或 `SHA-1` 后输入文件名：

```
git show 5e68b0d8 shopping\ list.txt
```

##### 查看未提交的内容

###### 比对暂存区和上一条提交

使用 `git diff --staged` 可以显示暂存区和上一条提交之间的不同。换句话说，这条指令可以让你看到「如果你立即输入 `git commit`，你将会提交什么」：

```
git diff --staged
```

###### 比对工作目录和暂存区

使用 `git diff` （不加选项参数）可以显示工作目录和暂存区之间的不同。换句话说，这条指令可以让你看到「如果你现在把所有文件都 `add`，你会向暂存区中增加哪些内容」：

```
git diff
```

###### 比对工作目录和上一条提交

使用 `git diff HEAD` 可以显示工作目录和上一条提交之间的不同，它是上面这二者的内容相加。换句话说，这条指令可以让你看到「如果你现在把所有文件都 `add` 然后 `git commit`，你将会提交什么」（不过需要注意，没有被 Git 记录在案的文件（即从来没有被 add 过 的文件，untracked files 并不会显示出来。为什么？因为对 Git 来说它并不存在啊）。

```
git diff HEAD
```

实质上，如果你把 `HEAD` 换成别的 `commit`，也可以显示当前工作目录和这条 `commit` 的区别。



#### 查看工作目录当前状态

```
git status
```

#### 添加到暂存区

##### 添加某个文件

```
git add shopping\ list.txt
```

##### 添加全部文件

```
git add .
```

#### 提交

```
git commit
```

#### 推送到远程仓库

只能推送 `clone` 或者 `pull` 下来的分支

```
git push
```

##### 本地创建分支推送到远程仓库

如果是本地创建分支推送到远程仓库，那么需要指定远程仓库的名称(别名) `origin` 以及远程仓库中目标 `branch` 的名字（目标分支需要与本地分支名称相同）。

```
git push origin feature1
```



> 你可以通过 `git config` 指令来设置 `push.default` 的值来改变 `push` 的行为逻辑，例如可以设置为「所有分支都可以用 `git push` 来直接 push，目标自动指向 `origin` 仓库的同名分支」（对应的 `push.default` 值：`current`），或者别的什么行为逻辑，你甚至可以设置为每次执行 `git push` 时就自动把所有本地分支全部同步到远程仓库（虽然这可能有点耗时和危险）。如果希望详细了解，你可以到[这里](https://link.juejin.cn/?target=https%3A%2F%2Fgit-scm.com%2Fdocs%2Fgit-config%23git-config-pushdefault)看看。



#### 拉取远程仓库

```
git pull
```

#### 创建分支

```
git branch feature1
```

#### 切换 分支

```
git checkout feature1
```

#### 创建并切换 分支

```
git checkout -b feature1
```

#### 删除分支

##### 删除本地分支

```
git branch -d feature1
```

1. `HEAD` 指向的 `branch` 不能删除。如果要删除 `HEAD` 指向的 `branch`，需要先用 `checkout` 把 `HEAD` 指向其他地方。
2. 由于 Git 中的 `branch` 只是一个引用，所以删除 `branch` 的操作也只会删掉这个引用，并不会删除任何的 `commit`。（不过如果一个 `commit` 不在任何一个 `branch` 的「路径」上，或者换句话说，如果没有任何一个 `branch` 可以回溯到这条 `commit`（也许可以称为野生 `commit`？），那么在一定时间后，它会被 Git 的回收机制删除掉。）
3. 出于安全考虑，没有被合并到 `master` 过的 `branch` 在删除时会失败（因为怕你误删掉「未完成」的 `branch` 啊）：

![image-20220819090528371](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220819090528371.png)

这种情况如果你确认是要删除这个 `branch` （例如某个未完成的功能被团队确认永久毙掉了，不再做了），可以把 `-d` 改成 `-D`，小写换成大写，就能删除了。

![image-20220819090558290](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220819090558290.png)

##### 删除远程分支

 用 -d 参数把远程仓库的 branch 也删了

```
git push origin -d feature1
```



#### 合并分支

```
git merge branch1
```

#### 取消合并

```
git merge --abort
```







## rebase

不喜欢使用 `merge` 可以考虑使用此种方式进行提交

### rebase——在新位置重新提交

`rebase` 的意思是，给你的 `commit` 序列重新设置基础点（也就是父 `commit`）。展开来说就是，把你指定的 `commit` 以及它所在的 `commit` 串，以指定的目标 `commit` 为基础，依次重新提交一次。例如下面这个 `merge`：

```
git merge branch1
```

![15fdea7b6646a1f3_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fdea7b6646a1f3_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp)

如果把 `merge` 换成 `rebase`，可以这样操作：

```shell
git checkout branch1
git rebase master
```

![1600abd620a8e28c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1600abd620a8e28c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp)

另外，在 `rebase` 之后，记得切回 `master` 再 `merge` 一下，把 `master` 移到最新的 `commit`：

```
git checkout master
git merge branch1
```

![160149e054fe485c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/160149e054fe485c_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp)



> 为什么要从 `branch1` 来 `rebase`，然后再切回 `master` 再 `merge` 一下这么麻烦，而不是直接在 `master` 上执行 `rebase`？
>
> 从图中可以看出，`rebase` 后的 `commit` 虽然内容和 `rebase` 之前相同，但它们已经是不同的 `commits` 了。如果直接从 `master` 执行 `rebase` 的话，就会是下面这样：
>
> ![16014b5a6919c0b7_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/16014b5a6919c0b7_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp)
>
> 这就导致 `master` 上之前的两个最新 `commit` 被剔除了。如果这两个 `commit` 之前已经在中央仓库存在，这就会导致没法 `push` 了：
>
> 所以，为了避免和远端仓库发生冲突，一般不要从 `master` 向其他 `branch` 执行 `rebase` 操作。而如果是 `master` 以外的 `branch` 之间的 `rebase`（比如 `branch1` 和 `branch2` 之间），就不必这么多费一步，直接 `rebase` 就好。



需要说明的是，`rebase` 是站在需要被 `rebase` 的 `commit` 上进行操作，这点和 `merge` 是不同的。



# 刚刚提交的代码，发现写错了怎么办？



刚提交了一个代码，发现有几个字写错了：



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fdf01882286d88~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



怎么修复？

当场再写一个修复这几个错别字的 `commit`？可以是可以，不过还有一个更加优雅和简单的解决方法：`commit -—amend`。

"amend" 是「修正」的意思。在提交时，如果加上 `--amend` 参数，Git 不会在当前 `commit` 上增加 `commit`，而是会把当前 `commit` 里的内容和暂存区（stageing area）里的内容合并起来后创建一个新的 `commit`，**用这个新的 `commit` 把当前 `commit` 替换掉**。所以 `commit --amend` 做的事就是它的字面意思：对最新一条 `commit` 进行修正。

具体地，对于上面这个错误，你就可以把文件中的错别字修改好之后，输入：

```shell
git add 笑声.txt
git commit --amend
```

Git 会把你带到提交信息编辑界面。可以看到，提交信息默认是当前提交的提交信息。你可以修改或者保留它，然后保存退出。然后，你的最新 `commit` 就被更新了。

![15fdf0187f2f4b2d_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fdf0187f2f4b2d_tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp)

需要注意的：

1. `commit --amend` 并不是直接修改原 `commit` 的内容，而是生成一条新的 `commit`, 替换掉原 `commit` 。

2. `git commit --amend` 只针对提交到本地仓库的有效,  需要git push -f才能推送至远程仓库。
3. 慎用此功能，一般情况下在当前 `commit` 修改提交即可。



## 比错还错，想直接丢弃刚写的提交？

有的时候，刚写完的 `commit` 写得实在太烂，连自己的都看不下去，与其修改它还不如丢掉重写。这种情况，就可以用 `reset` 来丢弃最新的提交。

### reset --hard 丢弃最新的提交

比如你刚写了一个 `commit`：



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a6101d7f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)





![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a2f08fa1~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



写完回头看了看，你觉得「不行这得重新写」。那么你可以用 `reset --hard` 来撤销这条 `commit`。

```css
git reset --hard HEAD^
```

> HEAD 表示 HEAD^ 往回数一个位置的 `commit` ，上节刚说过，记得吧？

`HEAD^` 表示你要恢复到哪个 `commit`。因为你要撤销最新的一个 `commit`，所以你需要恢复到它的父 `commit` ，也就是 `HEAD^`。那么在这行之后，你的最新一条就被撤销了：



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a3235853~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



不过，就像图上显示的，你被撤销的那条提交并没有消失，只是你不再用到它了。如果你在撤销它之前记下了它的 `SHA-1` 码，那么你还可以通过 `SHA-1` 来找到他它。

## 小结

这一节的内容是撤销最新的提交，方式是通过 `reset --hard`：

```css
git reset --hard 目标commit
```

