# Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备


## Node.js用途

Node.js是一个JavaScript的运行环境。它一般有两个用途：

1. 运行在服务器， 作为web server
2. 运行在本地， 作为打包、构建工具。



## Node.js介绍

### 下载 & 安装

#### 普通安装

直接在官网下载即可[Node.js官网](https://nodejs.org/en/)

#### 使用nvm

nvm， node.js版本管理工具， 可切换多个node.js版本

- mac os  使用`brew  install nvm`进行安装

在[brew官网](https://brew.sh)复制首页代码， 去命令行粘贴运行。安装完之后执行`brew  install nvm`。

- windows, github 中搜索nvm-windows， 有下载地址。

##### nvm命令(工作中常用)：

nvm(node virsion menage) 可以安装多个node，并切换

`nvm list` 查看所有node版本

`nvm install v10.13.0` 安装指定版本

`nvm use --delete-prefix 10.13.0` 切换到指定版本

如果本地安装了node 需要删掉后重新装nvm 再安装node，这样才能控制全部版本
否则会报错：
node v--delete-prefix.0.0 (64-bit) is not installed.





### Node.js和JavaScript的区别

首先写JavaScript和Node.js必须遵守ECMAScript规范。

ECMAScript定义了语法， 保存变量定义， 循环， 判断， 函数， 原型和原型链， 作用域和闭包， 异步。

但是ECMAScript只定义了语法，不能进行以下操作： 
- 不能操作DOM， 不能监听事件， 不能发送ajax请求
- 不能处理http请求， 不能操作文件
- 即， 只有ECMAScript， 几乎做不了任何实际的项目。

#### JavaScript

使用了ECMAScript语法规范， 外加Web API， 缺一不可。WEB API包括DOM操作， BOM操作， 事件绑定， Ajax等。 两者结合， 即可完成 浏览器端的任何操作。


#### Node.js

使用了ECMAScript语法规范， 外加Node.js API， 缺一不可。Node.js API包括http, 处理文件等。具体参考[Node.js API ](http://node.js.cn/api/) 两者结合， 即可完成 Server端的任何操作。

### common.js

node应用由模块组成，采用的commonjs模块规范。每一个文件就是一个模块，拥有自己独立的作用域，变量，以及方法等，对其他的模块都不可见。CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。require方法用于加载模块。

#### 使用
a.js
```
function add (a,b){
  return a+b
}

module.exports = add
```

b.js
```
const add = require('./a')

const sum = add(10,20)

console.log(sum);
```

#### 引入多个

a.js
```
function add (a,b){
  return a+b
}

function mul (a,b){
  return a*b
}


module.exports = {
  add,
  mul
}
```

b.js

```js
const {add,mul} = require('./a')

const sum = add(10,20)

const sum2 = mul(10,20)

console.log(sum,sum2);
```





### 前端与Server端的区别

server开发和前端开发的区别： 语言和环境工程思维的不同。

前端开发： 每个客户端 对接一个server端（可能不止一台服务器，可能是一个集群）。前端开发的代码是通过server端下载到本地（客户端），然后在客户端浏览器执行的。

server开发： 它要承接很多客户端的请求，很多请求到了server端，然后server端去处理。

总结的区别：

1. 服务稳定性（服务端不可挂）
2. 考虑内存和CPU （优化、扩展）
3. 日志记录（程序运行的报告，没有这个，对程序运行相当于盲人一样~）
4. 安全
5. 集群和服务拆分

## 技术方案

### 接口设计

![image-20220805084925165](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805084925165.png)


## http概述

问题： 从浏览器输入url到页面渲染都发生了什么？

DNS解析获取到ip地址 -> 建立tcp连接 -> 发送http请求 -> server接受http请求，并处理请求返回数据 -> 客户端接受数据并处理数据（渲染页面，执行js）
中间涉及到到IP协议，ARP协议，OSPF协议

1. IP协议：指定出发地（你的pc）和目的地（服务器）
2. ARP协议：找到所有路径
3. OSPF协议：找到最优路径请求资源


## 搭建开发环境

### 安装nodemon

nodemon 可以实现自动重启

```
npm i nodemon cross-env -D 
```

安装完成之后在package.json的script命令中输入以下内容

```
"dev":"cross-env NODE_ENV=dev nodemon ./bin/www.js"
```

之后直接在命令行输入`npm run dev`即可。

`NODE_ENV=dev`指的是执行环节是开发环境。在代码中可以通过`process.env.NODE_ENV`获取到环境变量。


## Node.js模块

### 获取query

```
const querystring = require('querystring')
req.query = querystring.parse(url.split('?')[0])
```

### 文件操作

```
const fs = require('fs')
```

### 获取文件路径

```
const path = require('path')
const fileName = path.resolve(__dirname,'file','a.json')
```

\__diraname：当前目录， file：文件夹， a.json：文件



## 数据库操作

首先需要下载 MySql 和 SQLWorkBench。

以下为SQLWorkBench内操作。

## 查看数据库

```
show databases;
```
![image-20220805085004732](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085004732.png)


### 使用数据库
我们想要操作数据库首先要执行：

```
use blog;
```

blog指的是数据库名称。

显示所有数据库表：

```
show tables;
```

#### 增加数据

```
insert into users(username,`password`,realname) values('zhangsan','123','张三');
```

如果遇到SQL关键字， 我们可以用反引号把它包起来， 如:password


#### 查询数据库

```
-- select * from users;
```
select指的就是查询， `*`指的是我把所有的列都查出来。 user指的是表名。


```
select id,username from users;
```
也可以只查询id，和username。



```
select * from users where username='zhangsan';
```

增加了查询条件， 只查询username是张三的数据。

```
select * from users where username='zhangsan' and `password`='123';
```

查询username='zhangsan'并且password='123' 的数据。

```
select * from users where username='zhangsan' or `password`='123';
```

查询username='zhangsan'或者password='123' 的数据。

```
select * from users where username like '%zhang%';
```

只模糊匹配查询username字段有zhang的数据。

```
select * from users where password like '%1%' order by id;
```
根据id正序排序。

```
select * from users where password like '%1%' order by id desc;
```

根据id倒序排序。

#### 更新数据库

```
update users set realname='李四2';
```

把users表的所有realname都改成李四2。

```
update users set realname='李四2' where username='lisi';
```
把users表username=lisi的用户realname改成李四2



如果遇到报错可以执行以下语句：

```
SET SQL_SAFE_UPDATES=0;
```

#### 删除数据

```
delete from users where username='lisi';
```
删除username为lisi的数据。

一般情况下我们不会真正的删除数据， 而是在表格增加一个字段`state`， 用它来进行判断是否有数据， 也就是一个软删除的技术。（state设置为0或1控制是否删除） 一般它的默认值设为1。

这样做的好处就是它是可以恢复的。

```
select * from users where state='1';
update users set state='0' where username='lisi';
```
将username=lisi的数据state改为了0， 第一句是查询users表内state为1的数据。


```
select * from users where state<>'0';
```

如果我们想要使用不等于， 请使用`<>`小于号和大于号组合，如上。

## Node.js操作数据库


首先我们需要安装一个插件

```
npm i mysql
```

index.js


```js
const mysql = require('mysql')

//创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yutong9909',
    port: '3306',
    database: 'blog'
})

//开始连接
con.connect()

//执行 sql 语句
const sql = `insert into blogs(title,content,createtime,author) values('标题C','内容C',1583031695880,'zhangsan');`
con.query(sql, (err, result) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(result);
})

//关闭连接
con.end()
```


![image-20220805085046072](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085046072.png)


连接数据库报错

解决方案：

```
use blog;
alter user 'root'@'localhost' identified with mysql_native_password by '123456';
flush privileges;
```

## cookie

#### 什么是cookie？

- 存储在浏览器的一段字符串（最大5kb）
- 跨域不共享
- 格式如 K1=V1;K2=V2;K3=V3;因此可以存储结构化数据。
- 每次发送http请求， 会将请求域的cookie一起发送给server
- server可以修改cookie并返回给
- 浏览器中也可以通过JavaScript修改cookie（有限制）

![image-20220805085114341](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085114341.png)


#### cookie和token的区别？

cookie 是 http 协议的规范，一种标准，即一个工具，你拿 cookie 干嘛都可以，例如课程中我们用 cookie 实现登录。token 是一种业务上的术语，可以理解为密码、秘钥等，不同业务中 token 的格式、使用方式也不同。你可以使用很多种方式来实现 token ，例如 cookie ，http header ，url 参数中，或者 req.body 中。


#### 操作cookie

```
res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
```

path=/代表在所有路由下都可以访问cookie.
httpOnly表示此cookie不可在客户端操作。
expires=${getCookieExpires()}设置了cookie过期时间


过期时间函数

```
//获取 cookie 的过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
	return d.toGMTString()
}
```

## session

如果我们只用cookie就会有一个问题， cookie存储的个人信息都是暴露在外面的， 别人可以看到。（如你的手机号， 邮箱，用户名，密码等）。而且你其他平台的用户名及密码也有可能是一样的， 这样的话一旦泄露就十分危险。

第二个cookie存储的信息也是非常显现的， 大约为4kb。太多的信息也有可能放不开。

#### 如何解决？

我们可以在cookie中存储userid，userid可以是一个随机数之类的数字， 非常非常不相关的数字。 server端对应username。我们可以通过一个对象或者集合去查， 查出这个用户名来。

`session` 是一个统称， 它的解决方案就是用server端存储用户信息。

![image-20220805085144884](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085144884.png)

如上图： 我们只在浏览器中放一个毫无意义的userid就可以了， 即便用户被截获， 他也不知道userid是什么意思。然后到我们的server中呢？ 首先我们的server是足够安全的，因为他不会来回传输。 只要做好足够的限制， 安全就可以了。server端的空间也是足够大的， 里面可以存储很多的信息。

## redis

只用session会出现两个问题：

1. 进程内存有限， 访问量过大， 内存激增怎么办？
2. 正式上线运行是多线程， 进程之间内存无法共享

#### 解决方案radis

- web server 最常用的缓存数据库， 数据存放在内存中
- 相比 mysql， 访问速度快（内存和硬盘不是一个数量级的）
- 但是成本更高， 可存储的数据量更小（内存的硬伤）
- 将web server 和 redis 拆分为两个单独的服务
- 双方都是独立的， 都是可扩展的（例如都扩展成集群）
- （包括 mysql ， 也是一个单独的服务， 也可扩展）

![image-20220805085202784](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085202784.png)


#### 为何session适合用 redis?

- session 访问频繁， 对性能要求极高。
- session 可不考虑断电丢失数据的问题（内存的硬伤）
- session 数据量不会太大（相比于mysql中存储的数据）

#### 为何网站数据不适合用redis？

- 操作频率不是太高（相比于session操作）
- 断电不能丢失， 必须保留
- 数据量太大， 内存成本太高

### redis安装

https://www.runoob.com/redis/redis-install.html

可参考此网站安装配置。

#### 启动

```
redis-server.exe
```


#### Node.js连接redis

首先我们需要安装一个redis包。

```
npm i redis --save
```


## nignx代理（和前端联调）

一般前端的接口号会与server接口并不一样， 这时候我们需要一个接口进行代理， 使他们访问相同的接口。

### nignx介绍

- 高性能的web服务器， 开源免费
- 一般用于做静态服务，负载均衡
- 还有反向代理

#### 什么叫做静态服务呢？

比如说我们做了一个CDN， 就是那种网上放图片，放css文件，放js文件， 或者放静态的集群文件， html文件。只要是服务端不需要解析直接返回那种静态文件都可以用nginx做一个高性能的静态服务。

### 负载均衡

比如说我们有一个server的集群，集群有5台机器。其中一台是主机器，流量都在主机器上。剩下的那几台怎么去均分流量，怎么去分摊， 怎么让每个机器能平摊各种流量。以至于我们整个集群的负载能到最高。这也可以通过nginx配置。 它内部的一个模块可以做到这些。它可以做一个入口， 流量来了它分配到不同的机器上去，平均分配。

![image-20220805085222095](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085222095.png)

#### 反向代理

所谓反向代理就是它是对客户端不可见的代理，就叫反向代理。

server端全部涵盖了，客户端控制不了，对客户端来说它是一个黑盒，这样就叫做反向代理。

#### 正向代理

和反向代理相反的是正向代理， 比如我们公司的内网， 我们在家里访问不了，我们需要在本地装一个代理工具，然后才能访问。这属于一个正向代理。浏览器客户端能够控制的代理。

#### nginx使用

首先需要进行安装， [niginx：下载](http://nginx.org/en/download.html)


测试配置文件格式是否正确：
```
nginx -t
```

启动nginx

```
start nginx
```

重启nginx
```
nginx.exe -s reload
```

停止

```
nginx -s stop
```

重新打开日志文件

```
nginx.exe -s reopen
```

查看nginx版本

```
nginx -v
```

##### 配置

打开nginx-1.16.1\conf\nginx.conf文件进行配置

```
	    location / {
            proxy_pass: http://localhost:8001;
        }
		location /api/ {
			proxy_pass: http://lcoalhost:8000;
			proxy_set_header HOST $host;
		}
```

/表示根目录， 代理到8001。 8001是前端端口
/api标识api接口  代理到8000. 8000是server端端口

后端端口代理需要把host传进去， 因为此时他的host不一样了。

此时在访问

[前端]: http://localhost:8080/
[server端]: http://localhost:8080/api/blog/list
就可以了


## 安全

### sql注入

最原始，最简单的攻击， 从有了web2.0就有了sql注入攻击。

攻击方式： 输入一个sql片段， 最终拼接成一段攻击代码

预防措施： 使用mysql的escape 函数处理输入内容即可

如下：


```javascript
const mysql = require('mysql')
module.exports = {
    exec,
    escape: mysql.escape
}
```

使用：

```javascript{1,3,4}
const { exec, escape } = require('../db/mysql')
const login = (username, password) => {
    username = escape(username)
    password = escape(password)
    const sql = `
        select username, realname from users where username='${username}' and password='${password}'
    `
    return exec(sql).then(rows => {
        return rows[0]
    })
}

module.exports = {
    login
}
```


### xss攻击

所谓xss攻击指的就是在网页中写入一段js代码以获取用户信息。

如我新建了一篇博客， 在博客内容中有以下一段js代码，

```
<script>console.log(document.cookie);</script>
```
然后我创建成功后， 别人看到这篇博客我就能获取它的cookie信息， 并发送到我的服务器。

#### 预防

首先我们需要安装一个插件

```
npm i xss
```

直接在代码中引入使用

```
const xss = require('xss')
```

使用：
```
title = xss(escape(title)) 
```

可以先使用xss后在使用escape函数。


### 密码加密

- 万一数据库被攻破， 最不应该泄露的就是用户信息。
- 攻击方式： 获取用户名和密码， 再去尝试登录其他系统
- 预防措施： 将密码加密， 即便拿到密码也不知道明文


cryp.js

```javascript
const crypto = require('crypto')

//密匙
const SECRET_KEY = 'WJiol_8776#'

//md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

//加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}
```

登录时使用：

```javascript
const { genPassword } = require('../utils/cryp')
```

```javascript
//生成加密密码
password = genPassword(password)
password = escape(password)//防止xss攻击
```


### 网站运行流程图

![image-20220805085249591](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085249591.png)



## express

### 安装

首先需要安装脚手架

```
npm i express-generator -g
```

创建项目：

```
express blog-express
```
进入目录安装npm包

```
cd blog-express
npm i
```

启动

```
npm start
```


### 登录

使用 express-session 和 connect-redis

req.session保存登录信息， 登陆校验做成 express 中间件

```
npm i express-session
```

#### 使用

```
const session = require('express-session');

app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',  //默认配置
    // httpOnly: true,    //默认配置
    maxAge: 24 * 60 * 60 * 1000
  }
}))
```


### 使用redis


首先安装以下两个插件
```
npm i redis connect-redis --save
```


app.js
```javascript{2,3-6,14}
const session = require('express-session');
const RedisStore = require('connect-redis')(session)

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJiol#23123_',//秘钥，不可暴露
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore//redis存储
}))
```

redis.js

```javascript
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient =  redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

module.exports = redisClient
```

### 记录日志

使用脚手架推荐的morgan

```
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  //开发测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
```

### express中间件原理

![image-20220805085316017](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805085316017.png)


## KOA2

### async/await要点

1. await 后面可以追加 promise对象， 获取 resolve 的值
2. await 必须包裹在 async 函数里面
3. async 函数执行返回的也是一个promise对象
4. try-catch 截获 promise 中 reject 的值


### 安装

首先安装脚手架工具

```
npm i koa-generator -g
```


```
koa2 blog-koa2
```

### 登录

基于 koa-generic-session 和 koa-redis

需要安装3个插件

```
npm i koa-generic-session koa-redis redis
```

app.js

```javascript
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

//session 配置
app.keys = ['WJiol#23123_']
app.use(session({
  //配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  //配置 redis
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
```

session一定要在routes前进行配置


### koa2记录日志

安装插件

```
npm i koa-morgan --save
```

引入

app.js
```javascript
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')
```

app.js
```javascript
const ENV = process.env.NODE_ENV
if (ENV !== 'production'){
  //开发测试环境
  app.use(morgan('dev'));
} else {
  //线上环境
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

```

## 上线与配置

### pm2

#### 下载安装


```
npm install pm2 -g
```


查看版本

```
pm2 --version
```

#### 常用命令


多种启动方式， 后面跟配置文件
```
pm2 start ...
```


pm2进程列表
```
pm2 list
```

重启进程
```
pm2 restart 0
```
或者
```
pm2 restart app
```
后面跟id或者进程名


停止进程

```
pm2 stop app/id
```

删除进程

```
pm2 delete app/id
```

查看基本信息

```
pm2 info app/id
```

查看进程日志

```
pm2 log app/id
```

监控cpu和内存信息

```
pm2 monit app/id
```

#### 常用配置


pm2.conf.json

```
{
    "apps": {
        "name": "pm2-test-server",
        "script": "bin/www",
        "watch": true,
        "ignore_watch": [
            "node_modules",
            "logs"
        ],
        "instances": 4,
        "error_file": "logs/err.log",
        "out_file": "logs/out.log",
        "log_date_format": "YYYY-MM-DD HH:mm:ss"
    }
}
```


name: pm2-test-server  app名称

script: app.js 启动文件

watch: true  上线自动重启。 建议设置为false， 再自己手动重启

innore_watch ： [
	"logs"
]
即使logs文件夹内有文件改动也不监听， 不重启

"instances": 4, 使用4核运行

error_file : "logs/err.log"  错误日志存放 / console.error()

out_file : "logs/out.log" 日志存放 / console.log()

log_date_format :"YYYY-MM-DD HH:mm:ss"  每条日志增加时间戳

