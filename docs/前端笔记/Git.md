# Git 

> 本文为阅读  [《Git 原理详解及实用指南》](https://juejin.cn/book/6844733697996881928) 和 [《Git原理详解与实操指南》](https://www.imooc.com/read/51#catalog) 时所记录笔记，如有兴趣可阅读正版。

## Git常用命令

### 常用命令

#### 初始化仓库

```
git init
```

#### 把远程仓库取到本地

##### 克隆

```
git clone 你刚复制的地址
```

##### 克隆并创建本地文件夹

`httptest` 为本地文件夹名称

```
git clone https://gitee.com/songboy/test201907.git   httptest
```

克隆仓库最后一个版本

```
git clone https://gitee.com/songboy/test201907.git  tempdemo --depth==1
```



#### 添加远程仓库

像这样添加远程仓库是需要进行分别推送的

`github`  是远程仓库自定义的一个名字,  `https://github.com/78778443/gittest.git`  则是的远程仓库地址

```
git remote add github https://github.com/78778443/gittest.git
```



#### 添加远程仓库推送地址

可实现一键推送到两个仓库

```
git remote set-url --add origin https://github.com/78778443/gittest.git
```



#### 查看远程仓库

```
git remote -v
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

##### 添加目录

`app`为目录名称

```
git add app
```

#### 提交代码

##### 提交

```
git commit -m “这是备注信息”
```



##### 冲突解决后提交

```
git commit -a
```

解决冲突后这里提交版本的方式稍微有一些区别，会在`git commit` 后面增加一个`-a`参数，而且不需要`-m`参数；但是执行之后会单独多出一个步骤让你填写冲突解决的备注信息，如下图所示：

![image-20220823103807995](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220823103807995.png)



在上图中会默认生成一些备注信息，你也可以增加或删减部分信息，然后用`:wq`或者`:x`进行保存并退出，退出之后会新增加一个版本，可以使用`git log`命令查看版本记录。



#### 推送到远程仓库

只能推送 `clone` 或者 `pull` 下来的分支

```
git push
```



##### 推送到指定远程仓库

```
git push github
```

##### 指定默认的远程仓库

```
git push -u github 
```



##### 本地创建分支推送到远程仓库

如果是本地创建分支推送到远程仓库，那么需要指定远程仓库的名称(别名) `origin` 以及远程仓库中目标 `branch` 的名字（目标分支需要与本地分支名称相同）。

```
git push origin feature1
```



> 你可以通过 `git config` 指令来设置 `push.default` 的值来改变 `push` 的行为逻辑，例如可以设置为「所有分支都可以用 `git push` 来直接 push，目标自动指向 `origin` 仓库的同名分支」（对应的 `push.default` 值：`current`），或者别的什么行为逻辑，你甚至可以设置为每次执行 `git push` 时就自动把所有本地分支全部同步到远程仓库（虽然这可能有点耗时和危险）。如果希望详细了解，你可以到[这里](https://link.juejin.cn/?target=https%3A%2F%2Fgit-scm.com%2Fdocs%2Fgit-config%23git-config-pushdefault)看看。

##### 强制推送

```
git push origin feature1 -f
```



#### 拉取远程仓库

```
git pull
```



##### 与远程仓库保持一致

 `git fetch` 只会拉取远程分支不进行自动合并

```
git fetch
```



在这条命令中，`--hard` 为 `git reset` 的选项，它的作用是 reset 之后把当前工作的差异部分丢弃掉，完全与目标一致，`origin/master` 则是目标比较分支，命令执行后，返回的信息如下图所示：

![image-20220822174531404](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822174531404.png)

```
git reset --hard origin/master
```



#### 创建分支

```
git branch feature1
```

#### 切换分支

把远程分支在本地创建，可以通过 `git checkout 分支名` 命令进行，这个命令其实是切换分支用的。但当它发现你本地不存在这个分支，会自动找到远程对应的分支然后在本地进行创建，参考命令如下所示：

```
git checkout feature1
```

#### 创建并切换 分支

```
git checkout -b feature1
```

第一次推送的时候指定远程分支名

```
git push --set-upstream origin feature1
```



#### 找回删除的分支

```
git reflog show
```

命令执行之后返回信息如下图所示：

在图中注意看红色框选区域，下面一条是我切换到 `retest` 分支时候记录下来的，另外一条是执行了提交操作，我们把 `commitid` 值 `b52b955` 复制下来。

![image-20220822175612027](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822175612027.png)

接着使用 `git branch 分支名称 commit_id` 方式建立一个新的分支，参考命令如下：

```
git checkout -b  retest_v3  b52b955
```



#####  回滚 reset 操作

如果你不小心使用 `git reset` 回滚了提交记录，想找回之前的提交记录也是可以的；可以 `git reflog` 查看操作历史，找到执行 `git reset` 命令之前 `commitid`，然后 `git reset --hard` 到那个 `commitid` 即可。



##### 从历史版本中找回删除的文件

有时候，我们在某个版本中删除了文件，后来又突然发现需要这个文件，也是可以恢复的；恢复之前首先确定要恢复的文件在哪一个版本（commit）中，假设那个版本号是： 7a4312sd，文件路径为 abc.php 那么参考命如下：

```
git checkout 7a4312sd abc.php
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

##### 强制删除

这种情况如果你确认是要删除这个 `branch` （例如某个未完成的功能被团队确认永久毙掉了，不再做了），可以把 `-d` 改成 `-D`，小写换成大写，就能删除了。

![image-20220819090558290](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220819090558290.png)

##### 删除远程分支

 用 -d 参数把远程仓库的 branch 也删了

```
git push origin -d feature1
```



本地分支存在，远程仓库不存在此分支。 如果想将远程的分支与本地保持一致：

```
git remote prune origin 
```

命令执行之后，返回信息如下图所示：

![image-20220822165353914](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822165353914.png)

Git 会将拉取远程的分支信息与本地的进行对比，当发现远程的分支已经删除，便会对本地的分支进行标注；我们可以使用 Git 的命令查看关联失效的分支，参考命令如下：

```
git branch -vv
```

命令执行之后，返回结果如下图所示：

![image-20220822165427196](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822165427196.png)

在分支列表中，test1 分支后面有一个 `：gone` 的标识，说明远程分支已经被删除，通过这个标识我们能够很清晰的知道该需要删除哪些分支，删除分支的命令参考如下：

```
git branch -d test1
```





#### 查看分支

```
git branch 
```

##### 查看所有分支

```
git branch -a 
```



#### 合并分支

```
git merge branch1
```

#### 取消合并

```
git merge --abort
```



#### 还原版本

**需要注意的是，在使用 `revert` 去恢复某个版本代码时，Git 只会撤销指定版本的代码，而不是指定版本后的所有版本**。比如说你提交了 1、2、3 三个版本，当你撤销版本 2 的时候，会生成版本 4，但是不会对版本 3 产生影响。

```
git revert 6d8feb147973711d08211f953f3d7c463ee1e88f
```





#### 储藏工作目录的改动

##### 储藏

```
git stash
```



##### 取出

###### 取出后移除此 `stash`

```
git stash pop
```

> 注意：没有被 track 的文件（即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 `-u` 参数，它是 `--include-untracked` 的简写。



###### 取出后依旧保留在存储列表

```
git stash apply stash@{0}
```

`git stash apply` 为固定格式，`stash@{0}`为编号，如果想恢复最近的一个改动也可以不填写编号，直接执行命令的前半部分就可以了，如下命令所示：

```
git stash apply
```



##### 移除

```
git stash drop
```



##### 查看列表

```
git stash list
```





#### 查看日志

使用 `git reflog` 可以查看 Git 的操作的日志，`git log` 只能查看版本日志

`reflog` 默认查看 `HEAD` 的移动历史，除此之外，也可以手动加上名称来查看其他引用的移动历史，例如某个 `branch`：

```
git reflog master
```



### 忽略文件

`.gitignore` 文件支持通配符，当你在文件中添加一些忽略规则之后，可能匹配过于宽松，导致某一个文件无法提交到 git ;这个时候你有两种方式来处理，

或者你发现，可能是 `.gitignore` 写得有问题，需要找出来到底哪个规则写错了，可以用`git check-ignore`命令检查：

```
git check-ignore -v 文件名
```

Git 会告诉我们，`.gitignore` 的第 1 行规则忽略了该文件，于是我们就可以知道应该修订哪个规则。

![image-20220822155747884](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822155747884.png)



除了修改 `.gitignore` 文件的规则之外还可以使用强制添加的方式，如下图所示

![image-20220822155840891](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822155840891.png)

如果你确实想添加该文件，可以用 `-f` 强制添加到 Git：

```
git add -f .DS_Store
```



#### 忽略已存在的文件

先在 `.gitignore` 中设置该文件为忽略，然后执行删除缓存命令

```
git rm --cached test2/index.php
```





### 配置信息

#### 临时记住密码

如果你不想每次都输入 git 的认证信息，可以设置缓存认证数据，默认记住 15 分钟，如下命令所示：

```
git config –-global credential.helper cache
```

如果你想缓存更长时间，也可以指定缓存时长，比如下面是自定义配置记住 1 小时的命令：

```
git config credential.helper ‘cache –timeout=3600’
```



#### 永久记住密码

如果觉得一遍遍地输入密码很烦，可以输入执行这行代码把密码保存起来。

```
git config credential.helper store
```

在这之后你只需要再输入一次密码， Git 就会把你的密码保存下来，这之后就再也不用输入了。但是「安全性低」，因为这条指令会让 Git 把你的密码以明文形式保存在你的电脑上。

命令执行完毕之后，会在当前用户主目录的`.gitconfig`文件中新增一项配置，配置如下所示

```
[credential]
    helper = store
```

也可按照以上说明直接修改配置文件。如果加上 `--global`则直接在全局配置。



#### 查看昵称

```
git config user.name
```

#### 查看邮箱

```
git config user.email
```

#### 配置昵称

```
git config --global user.name "你的昵称"
```



#### 修改配置信息

在配置中如果不小心配置错了，或者后面想修改配置的时候，是不能通过重复执行上面的设置昵称命令，来修改昵称的，邮箱修改同理。如果你多次设置昵称，它会在命令执行后提示你无法重复配置或者可能不给你提示，但是这种情况会导致一个 key 配置了多个 value 的问题。

不过，修改的时候，可以通过特定的方式去修改，这里我介绍两种方法， 第一种是通过命令行，第二种是通过修改配置文件。

##### 命令行修改配置

通过命令行修改的方式比较简单，直接执行以下的命令即可
修改昵称参考命令如下：

```
git config --global --replace-all user.name "your user name"
```



修改邮箱地址参考命令如下：

```
git config --global --replace-all user.email"your user email"
```



##### 修改配置文件

修改文件的方式，主要是修改位于主目录下`.gitconfig` 文件。在 Linux 和 Mac 中，可以通过 vim 命令进行直接编辑，比如`vim ~/.gitconfig` ；Windows 系统同样位于用户主目录下，假设你当前的用户是`administrator`，那么对应的配置文件的路径应该是 `C:\Users\administrator\.gitconfig`，可以直接使用记事本修改里边的 name 或者 email。

如果之前已经配置过昵称和邮箱的情况下，当使用 vim 或者记事本打开配置文件之后，可以看到如下配置：

```
[user]
        name = daxia
        email = 78778443@qq.com
```

在如果有重复的 name 或 email，可以将其删掉，只剩下一个就好。修改完，通过 git bash 输入 `git config –list`可以查看是否修改成功了。



#### 忽略文件权限

##### 当前版本库

```
git config core.filemode false
```

全局

```
git config --global core.fileMode false
```

在配置文件中，如果看到`fileMode false`则代表配置成功，如下图所示：

![image-20220822155230504](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822155230504.png)







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



## 刚刚提交的代码，发现写错了怎么办？



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

### 小结

这一节的内容是撤销最新的提交，方式是通过 `reset --hard`：

```css
git reset --hard 目标commit
```





## reset 的本质——不止可以撤销提交

前面讲到，在最新的 `commit` 写错时，可以用 `reset --hard` 来把 `commit` 撤销：

```css
git reset --hard HEAD^
```

> 用这行代码可以撤销掉当前 `commit`

在这节里，就对 `reset` 多说点，说说它的本质，说说它在撤销提交之外的用途。

### reset 的本质：移动 HEAD 以及它所指向的 branch

实质上，`reset` 这个指令虽然可以用来撤销 `commit` ，但它的实质行为并不是撤销，而是移动 `HEAD` ，并且「捎带」上 `HEAD` 所指向的 `branch`（如果有的话）。也就是说，`reset` 这个指令的行为其实和它的字面意思 "reset"（重置）十分相符：它是用来重置 `HEAD` 以及它所指向的 `branch` 的位置的。

而 `reset --hard HEAD^` 之所以起到了撤销 `commit` 的效果，是因为它把 `HEAD` 和它所指向的 `branch` 一起移动到了当前 `commit` 的父 `commit` 上，从而起到了「撤销」的效果：



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe19c8a3235853~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



> Git 的历史只能往回看，不能向未来看，所以把 `HEAD` 和 `branch` 往回移动，就能起到撤回 `commit` 的效果。

所以同理，`reset --hard` 不仅可以撤销提交，还可以用来把 `HEAD` 和 `branch` 移动到其他的任何地方。

```css
git reset --hard branch2
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb605b0de~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



不过……`reset` 后面总是跟着的那个 `--hard` 是什么意思呢？

`reset` 指令可以重置 `HEAD` 和 `branch` 的位置，不过在重置它们的同时，对工作目录可以选择不同的操作，而对工作目录的操作的不同，就是通过 `reset` 后面跟的参数来确定的。



### reset --hard：重置工作目录

`reset --hard` 会在重置 `HEAD` 和 `branch` 的同时，重置工作目录里的内容。当你在 `reset` 后面加了 `--hard` 参数时，你的工作目录里的内容会被完全重置为和 `HEAD` 的新位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。

例如你在上次 `commit` 之后又对文件做了一些改动：

```lua
git status
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5a0e894~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



然后，你执行了 `reset` 并附上了 `--hard` 参数：

```css
git reset --hard HEAD^
```

你的 `HEAD` 和当前 `branch` 切到上一条 `commit` 的同时，你工作目录里的新改动也一起全都消失了，不管它们是否被放进暂存区：

```lua
git status
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5dbef68~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



可以看到，在 `reset --hard` 后，所有的改动都被擦掉了。

### reset --soft：保留工作目录

`reset --soft` 会在重置 `HEAD` 和 `branch` 时，保留工作目录和暂存区中的内容，并把重置 `HEAD` 所带来的新的差异放进暂存区。

什么是「重置 `HEAD` 所带来的新的差异」？就是这里：



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5c6a249~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



由于 `HEAD` 从 `4` 移动到了 `3`，而且在 `reset` 的过程中工作目录的内容没有被清理掉，所以 `4` 中的改动在 `reset` 后就也成了工作目录新增的「工作目录和 `HEAD` 的差异」。这就是上面一段中所说的「重置 `HEAD` 所带来的差异」。

所以在同样的情况下：

```lua
git status
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5a0e894~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



假设此时当前 `commit` 的改动内容是新增了 `laughters.txt` 文件：

```sql
git show --stat
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb7cdd727~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



如果这时你执行：

```css
git reset --soft HEAD^
```

那么除了 `HEAD` 和它所指向的 `branch1` 被移动到 `HEAD^` 之外，原先 `HEAD` 处 `commit` 的改动（也就是那个 `laughters.txt` 文件）也会被放进暂存区：

```lua
git status
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb7e6e40b~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



这就是 `--soft` 和 `--hard` 的区别：`--hard` 会清空工作目录的改动，而 `--soft` 则会保留工作目录的内容，并把因为保留工作目录内容所带来的新的文件差异放进暂存区。

### reset 不加参数：保留工作目录，并清空暂存区

`reset` 如果不加参数，那么默认使用 `--mixed` 参数。它的行为是：保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 `reset` 所导致的新的文件差异，都会被放进工作目录。简而言之，就是「把所有差异都混合（mixed）放在工作目录中」。

还以同样的情况为例：

```lua
git status
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb5a0e894~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



> 修改了 `games.txt` 和 `shopping list.txt`，并把 `games.txt` 放进了暂存区。

```sql
git show --stat
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333cb7cdd727~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



> 最新的 `commit` 中新增了 `laughters.txt` 文件。

这时如果你执行无参数的 `reset`：

```perl
git reset HEAD^
```

工作目录的内容和 `--soft` 一样会被保留，但和 `--soft` 的区别在于，它会把暂存区清空：

```lua
git status
```



![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/15fe333d086f9754~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.webp)



### 小结

本节内容讲了 `reset` 指令的本质：重置 `HEAD` 以及它所指向的 `branch` 的位置。同时，介绍了 `reset` 的三种参数：

1. `--hard`：重置位置的同时，清空工作目录的所有改动；
2. `--soft`：重置位置的同时，保留工作目录和暂存区的内容，并把重置 `HEAD` 的位置所导致的新的文件差异放进暂存区。
3. `--mixed`（默认）：重置位置的同时，保留工作目录的内容，并清空暂存区。

除了上面这三种参数，还有一些没有列出的较为不常用的参数；另外除了我讲的功能外，`reset` 其实也还有一些别的功能和用法。不过 `reset` 最关键的功能、用法和本质原理就是上面这些了，想了解更多的话，可以去官网了解一下。





## SSH拉取

现在我们再来看看`SSH`方式，相比`HTTP(S)`来说更加安全,因为`SSH`方式使用的是非对称加密，采用公钥与私钥的方式，不过相对来说配置起来会麻烦一些；好处是一次配置之后，后续不需要每次都进行认证，也更加安全。



`sshtest` 为本地文件夹名称

```
git clone git@gitee.com:songboy/test201907.git  sshtest
```

回车执行后，会提示需要权限验证，返回信息如下所示：

```
➜  ~ git clone git@gitee.com:songboy/test201907.git  sshtest
Cloning into 'sshtest'...
The authenticity of host 'gitee.com (218.11.0.86)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'gitee.com,218.11.0.86' (ECDSA) to the list of known hosts.
git@gitee.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

因为并没有配置公钥与私钥，所以拉取代码并没有成功。



### 创建一个ssh key

通过 ssh 协议拉取代码首先要保证当前用户的主目录存在一个`.ssh`的文件夹，并且里面已经存在私钥文件，如果没有的话我们可以通过`ssh-keygen`，生成一份公钥与私钥，如下命令所示：

```
➜  ~ ssh-keygen
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
```



在执行命令的交互中，可以直接回车使用默认选项，最终会在当前用户目录下生成公钥和私钥，查看生成的公钥的命令为`cat ~/.ssh/id_rsa.pub`,在返回的信息中可以看到类似如下信息：

```
➜  ~ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC65v2fz8/7N8/dw3sfjIkxav75MdLKLDTvTIs1XMj3PItPUXdUgsr7RR2WfpJUbtkU6xGAxF9SpNFw275ithvk85qx6PebQxfTTzqypawNwAOMy4CAOsRNybQWp//whtWfCUR2TvVtOQErq9ISEYhi+YQgoRg2ykYz9VZj8cFz99/Gtb3ApN3oHtqD9qcGUDPvL7MKjta3qrAX4KZHM++8FXz0qYrDgz9J/8+oLSebC6MOJiPuc7ut0rfICKaAU7XS4xvU39sNtES/j531AB/Xixb/ufaMPUKhIdASmUFP1WFoVU4268mtW1dZ99t6AsdQ9X2wjNI1QAVX/lJQe2Ox root@93268ac888a1
```



### 添加公钥到服务器

当确认公钥和私钥生成完毕之后，我们还需要将公钥放到远程的 git 仓库中去，在码云的版本库中，右上角有一个管理，在管理页面的左侧菜单中有一个添加公钥的选项，我们将上面的公钥内容复制进去，如下图所示

![image-20220822154147733](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220822154147733.png)



### 拉取代码

当公钥添加进去之后，就已经完成了权限配置，此时我们再次使用ssh方式拉取代码，就不会提示没有权限，执行结果如下所示

```
➜  ~ git clone git@gitee.com:songboy/test201907.git  sshtest
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
```

可以看到在代码执行之后，代码已经拉取完成。



### 更新代码

ssh 方式更新代码命令和上面的 http 方式拉取代码命令一致，同样需要在 sshtest 目录下执行命令：`git pull`，然后可以看到git成功的拉取到了代码

```
➜  sshtest git:(master) git pull
Already up to date.
```







