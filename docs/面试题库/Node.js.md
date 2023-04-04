---
prev: Webpack
next: 其它
---

## Node.js

## Node.js 是什么？

- nodejs 是基于 Chrome V8 引擎（相当于是一个解释器）的 JavaScript 运行环境。
- nodejs 出现之前， js 只能在浏览器运行。（浏览器也相当于是一个运行环境）
- nodejs 出现之后，js 可以在任何安装 nodejs 的环境运行。



## 和前端 js 有何区别？



### 语法方面

- 都使用 ES 语法（变量如何定义，函数如何定义， if/else , for 循环， class 语法层面的东西）
- 前端 js 使用 JS WEB API
- nodejs 使用 node API

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/jsyufa.png)



### 应用层面

- 前端 js 用于网页， 在浏览器运行
- nodejs 可用于服务端， 如开发 web server
- nodejs 也可用于本机， 如 webpack 等本机的打包工具



## nodejs 如何调试

可以使用 vscode 的运行调试工具进行打断点以及 debugger



## 当前文件和当前目录的路径， 如何获取

- \_\_filename
- \_\_dirname
- 两个都是全局变量



## commonjs 和 ES6 Module 的区别

- 语法不同
- commonjs 是动态引入，执行时引入
- ES6 Module 是静态引入，编译时引入

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yufabutonmga.png)



## path.resolve 和 path.join 的区别

- 两者都是用于拼接文件路径
- path.resolve 获取绝对路径
- path.join 获取相对路径

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/zhiojielaiba.png)



## 事件循环 event loop 在 nodejs 和浏览器的区别浏览器的区别

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/loopsxun.png)



## cookie 如何实现登录？

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/co0okiedn.png)



## session 和 cookie 的关系

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/session-cookie.png)



## session 为何需要存储在 redis 中？

- 进程有内存限制
- 进程的内存是相互隔离的



## 请描述 koa2 和 express 的中间件机制

- 从代码来看，中间件就是一个函数
- 从业务来看，中间件则是一个独立的模块
- 模块拆分，模块流传，即可完成复杂的功能



## 请描述 koa2 洋葱圈模型

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yangcongquan.png)



