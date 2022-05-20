<a name="tOdFe"></a>

##

<a name="Ej4gW"></a>

## Node.js 是什么？

- nodejs 是基于 Chrome V8 引擎（相当于是一个解释器）的 JavaScript 运行环境。
- nodejs 出现之前， js 只能在浏览器运行。（浏览器也相当于是一个运行环境）
- nodejs 出现之后，js 可以在任何安装 nodejs 的环境运行。

<a name="SUV0J"></a>

## 和前端 js 有何区别？

<a name="vACVb"></a>

### 语法方面

- 都使用 ES 语法（变量如何定义，函数如何定义， if/else , for 循环， class 语法层面的东西）
- 前端 js 使用 JS WEB API
- nodejs 使用 node API

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1644415072161-403eff16-7688-47d8-b8ae-7b84f6f7ded0.png#clientId=u9155181a-9c54-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=612&id=u842f6e80&margin=%5Bobject%20Object%5D&name=image.png&originHeight=612&originWidth=984&originalType=binary&ratio=1&rotation=0&showTitle=false&size=266087&status=done&style=none&taskId=u806dc393-1b85-4955-a025-59d7e96c893&title=&width=984)

<a name="Q0Zbx"></a>

### 应用层面

- 前端 js 用于网页， 在浏览器运行
- nodejs 可用于服务端， 如开发 web server
- nodejs 也可用于本机， 如 webpack 等本机的打包工具

<a name="gf1wn"></a>

## nodejs 如何调试

可以使用 vscode 的运行调试工具进行打断点以及 debugger

<a name="yK9z4"></a>

## 当前文件和当前目录的路径， 如何获取

- \_\_filename
- \_\_dirname
- 两个都是全局变量

<a name="bfGQS"></a>

## commonjs 和 ES6 Module 的区别

- 语法不同
- commonjs 是动态引入，执行时引入
- ES6 Module 是静态引入，编译时引入

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1644416401106-615d30e4-115d-411d-acbb-7fa7920cc261.png#clientId=u9155181a-9c54-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=630&id=u67814872&margin=%5Bobject%20Object%5D&name=image.png&originHeight=630&originWidth=1374&originalType=binary&ratio=1&rotation=0&showTitle=false&size=237642&status=done&style=none&taskId=u06b0703f-0b03-4210-974f-14e8f5d50b3&title=&width=1374)

<a name="KmYPU"></a>

## path.resolve 和 path.join 的区别

- 两者都是用于拼接文件路径
- path.resolve 获取绝对路径
- path.join 获取相对路径

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1644416761853-3c398d02-e07f-4987-adbb-d2b0a3bad60e.png#clientId=u9155181a-9c54-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=254&id=u0d1c07d3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=254&originWidth=1464&originalType=binary&ratio=1&rotation=0&showTitle=false&size=180075&status=done&style=none&taskId=u56eba69b-3c26-482c-a3bd-ccd8d73de0f&title=&width=1464)

<a name="RlDlG"></a>

## 事件循环 event loop 在 nodejs 和浏览器的区别浏览器的区别

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1644419489147-97403106-b5a9-4e72-b8cc-5f4295cedf27.png#clientId=u9155181a-9c54-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=821&id=ua48a9ca0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=821&originWidth=1451&originalType=binary&ratio=1&rotation=0&showTitle=false&size=124921&status=done&style=none&taskId=u79bd4aaa-a4b0-4bc7-987a-dddcc7be62c&title=&width=1451)

<a name="T6wJd"></a>

## cookie 如何实现登录？

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1644496380575-6b9f9e4a-8b14-4775-9d31-51e39b484352.png#clientId=ufde30651-27c9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=752&id=u757bf217&margin=%5Bobject%20Object%5D&name=image.png&originHeight=752&originWidth=1333&originalType=binary&ratio=1&rotation=0&showTitle=false&size=205115&status=done&style=none&taskId=uf245cf7e-c30a-45eb-88d6-30522533d62&title=&width=1333)

<a name="ZYd0b"></a>

## session 和 cookie 的关系

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1644496438480-04d00ffa-d6b1-4261-9135-86273ca1df89.png#clientId=ufde30651-27c9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=706&id=uef92862e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=706&originWidth=1499&originalType=binary&ratio=1&rotation=0&showTitle=false&size=210972&status=done&style=none&taskId=u651aeef1-3b51-4615-880a-2626282ef2f&title=&width=1499)

<a name="dhCpu"></a>

## session 为何需要存储在 redis 中？

- 进程有内存限制
- 进程的内存是相互隔离的

<a name="C4qwR"></a>

## 请描述 koa2 和 express 的中间件机制

- 从代码来看，中间件就是一个函数
- 从业务来看，中间件则是一个独立的模块
- 模块拆分，模块流传，即可完成复杂的功能

<a name="WiNeA"></a>

## 请描述 koa2 洋葱圈模型

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1644497271920-f528fd04-9a5b-4297-843a-92c81aa130bb.png#clientId=ufde30651-27c9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=625&id=u9db8630a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=625&originWidth=1390&originalType=binary&ratio=1&rotation=0&showTitle=false&size=385831&status=done&style=none&taskId=u42712c59-5d50-4e15-85c6-2a10d8a947d&title=&width=1390)

<a name="cOjaB"></a>

## nodejs 线上环境为何开启多进程？

- 高效使用多核 CPU
- 充分利用服务器内存
- 最终： 压榨服务器， 不浪费资源
