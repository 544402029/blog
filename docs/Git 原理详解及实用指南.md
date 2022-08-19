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

```
git log
```

#### 查看工作目录当前状态

```
git status
```

#### 添加到暂存区

```
git add shopping\ list.txt
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

