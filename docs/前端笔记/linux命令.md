# linux命令

## 常用命令

### 本地登录线上机器

```
ssh work@192.168.10.21
```

work是用户名  192.168.10.21是线上机器IP地址

输入命令后就可以输入密码了， 密码输入成功后就可以登录到linux线上机或测试机

### 查看文件夹

```
ls
```

#### 查看文件夹所有文件

```
ls -a
```

此命令可以看到隐藏的文件， 比如.babelrc。 一般.开头的都是隐藏文件。

### 创建文件

```
mkdir abc.txt
```

创建了名为`abc.txt`的文件。

```
touch d.js
```

创建了名为`d.js`的文件。

```
vi d.js
```

如果没有则创建d.js， 有的话直接打开vim编辑器。

### vim编辑器

新建完之后需要点击i， 进入INSERT模式。 表示可以输入了。



#### 退出INSERT

点击左上角ESC可退出INSERT模式。

#### 写入保存

输入`:w`



点击回车保存。

![image-20220805094806265](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094806265.png)

输入`:q`



点击回车就可以退出了。

输入`:q!`可以直接强制退出， 不用保存。(写完代码不想用了可以这样做)

### 查看文件所有内容

```
cat package.json
```

#### 查看头部内容

```
head package.json
```

#### 查看尾部内容

```
tail package.json
```

### 查找文件内容关键字

```
grep "babel" package.json
```

查找babel关键字在package.json中的位置

### 删除文件夹

```
rm -rf abc
```

加上-rf可以递归的删除文件夹， 防止删除不彻底。

### 删除文件

```
rm a1.js
```

删除a1.js文件

### 移动路径

```
cd dist
```

此时路径移动到当前路径下的dist目录

### 重命名文件名称

```
mv index.html index1.html
```

把文件index.html改为index1.html

### 移动文件

```
mv bundle.js ../bundle.js
```

把bundle.js移动到了上级目录。 

可以使用Tab键填满文件名

```
mv bundle.js dist/bundle.js
```

从当前目录的bundle.js移动回dist目录

### 回到上级目录

```
cd ../
```

### 拷贝文件

```
cp a.js a1.js
```

拷贝a.js, 文件命名为a1.js