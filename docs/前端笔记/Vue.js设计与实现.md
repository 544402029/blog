# Vue.js设计与实现

> 本篇为看《Vue.js设计与实现》的记录笔记。

## 第 1 章　权衡的艺术

### 1.1　命令式和声明式

命令式特点式关注过程，声明式更加关注结果。



*声明式框架内部一定也是命令式的，只不过Vue.js 帮我们封装了**过程**，而暴漏给用户的更加**声明式**。*



### 1.2　性能与可维护性的权衡

**声明式代码的性能不优于命令式代码的性能**。

**命令式**

```
div.textContent = 'hello vue3' // 直接修改
```

性能最好



**声明式**

```
<!-- 之前： -->
<div @click="() => alert('ok')">hello world</div>
<!-- 之后： -->
<div @click="() => alert('ok')">hello vue3</div>
```

　对于框架来说，为了实现最优的更新性能，它需要找到前后的差异并只更新变化的地方，但是最终完成这次更新的代码仍然是：

```
div.textContent = 'hello vue3' // 直接修改
```

如果我们把直接修改的性能消耗定义为 A，把找出差异的性能消耗定义为 B，那么有：

- 命令式代码的更新性能消耗 = A
- 声明式代码的更新性能消耗 = B + A

当找出差异的性能消耗为 0 时，声明式代码与命令式代码的性能相同，但是无法做到超越，**毕竟框架本身就是封装了命令式代码才实现了面向用户的声明式**。这符合前文中给出的性能结论：**声明式代码的性能不优于命令式代码的性能**。



**命令式优于声明式，为什么选择声明式设计方案？**

*原因在于声明式代码可维护性更强。命令式代码开发时，我们要手动完成DOM的创建、更新、删除等工作，维护实现目标的整个过程。而声明式代码展示的是我们要的**结果**，看上去更加直观。至于过程，由框架内部为我们封装好，让代码**在保持可维护性的同时让性能损失最小化**。*



### 1.3　虚拟 DOM 的性能到底如何

前文说到，**声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗**，因此，如果我们能够最小化**找出差异的性能消耗**，就可以让声明式代码的性能无限接近命令式代码的性能。而所谓的虚拟 DOM，就是为了**最小化**找出差异这一步的性能消耗而出现的。



在大部分情况下，**我们很难写出绝对优化的命令式代码**，尤其是当应用程序的规模很大的时候，即使你写出了极致优化的代码，也一定耗费了巨大的精力，这时的投入产出比其实并不高。



*命令式代码理论上限很高，下限很低。上限也需要大量精力。*

*声明式下限很高，性能不会太差。*



**怎么逼近命令式代码的性能呢？这其实就是虚拟 DOM 要解决的问题。**



**比较 `innerHTML` 和虚拟 DOM 的性能**

- 创建页面时：

 `innerHTML` 创建页面的性能：**HTML 字符串拼接的计算量 + `innerHTML` 的 DOM 计算量**。

虚拟 DOM 在创建页面时的性能：**创建 JavaScript 对象的计算量 + 创建真实 DOM 的计算量**。



![image-20230508172857597](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230508172857597.png)





- 更新页面时：

![image-20230508173135884](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230508173135884.png)

可以发现，在更新页面时，虚拟 DOM 在 JavaScript 层面的运算要比创建页面时多出一个 Diff 的性能消耗，然而它毕竟也是 JavaScript 层面的运算，所以不会产生数量级的差异。再观察 DOM 层面的运算，可以发现虚拟 DOM 在更新页面时只会更新必要的元素，但 `innerHTML` 需要全量更新。这时虚拟 DOM 的优势就体现出来了。



　　另外，我们发现，当更新页面时，影响虚拟 DOM 的性能因素与影响 `innerHTML` 的性能因素不同。对于虚拟 DOM 来说，无论页面多大，都只会更新变化的内容，而对于 `innerHTML` 来说，页面越大，就意味着更新时的性能消耗越大。





![图 1-5](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230508173346867.png)

**图 1-5　`innerHTML`、虚拟 DOM 以及原生 JavaScript 在更新页面时的性能**



有没有办法做到，既声明式地描述 UI，又具备原生 JavaScript 的性能呢？看上去有点儿鱼与熊掌兼得的意思，我们会在下一章中继续讨论。



### 1.4　运行时和编译时

![image-20250306115858666](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250306115858666.png)

**图 1-6　把 HTML 标签编译成树型结构的数据对象**



​		首先是纯运行时的框架。由于它没有编译的过程，因此我们没办法分析用户提供的内容，但是如果加入编译步骤，可能就大不一样了，我们可以分析用户提供的内容，看看哪些内容未来可能会改变，哪些内容永远不会改变，这样我们就可以在编译的时候提取这些信息，然后将其传递给 `Render` 函数，`Render` 函数得到这些信息之后，就可以做进一步的优化了。然而，假如我们设计的框架是纯编译时的，那么它也可以分析用户提供的内容。由于不需要任何运行时，而是直接编译成可执行的 JavaScript 代码，因此性能可能会更好，但是这种做法有损灵活性，即用户提供的内容必须编译后才能用。



## 第 2 章　框架设计的核心要素

### 2.5　特性开关

为了兼容 Vue.js 2，在 Vue.js 3 中仍然可以使用选项 API 的方式编写代码。但是如果明确知道自己不会使用选项 API，用户就可以使用 `__VUE_OPTIONS_API__` 开关来关闭该特性，这样在打包的时候 Vue.js 的这部分代码就不会包含在最终的资源中，从而**减小资源体积**。



*性能优化时可讲。*



### 2.6　错误处理

可以看到，代码变得简洁多了。但简洁不是目的，这么做真正的好处是，我们能为用户提供统一的错误处理接口，如以下代码所示：

```js
01 // utils.js
02 let handleError = null
03 export default {
04   foo(fn) {
05     callWithErrorHandling(fn)
06   },
07   // 用户可以调用该函数注册统一的错误处理函数
08   registerErrorHandler(fn) {
09     handleError = fn
10   }
11 }
12 function callWithErrorHandling(fn) {
13   try {
14     fn && fn()
15   } catch (e) {
16     // 将捕获到的错误传递给用户的错误处理程序
17     handleError(e)
18   }
19 }
```

　　我们提供了 `registerErrorHandler` 函数，用户可以使用它注册错误处理程序，然后在 `callWithErrorHandling` 函数内部捕获错误后，把错误传递给用户注册的错误处理程序。

　　这样用户侧的代码就会非常简洁且健壮：

```js
01 import utils from 'utils.js'
02 // 注册错误处理程序
03 utils.registerErrorHandler((e) => {
04   console.log(e)
05 })
06 utils.foo(() => {/*...*/})
07 utils.bar(() => {/*...*/})
```

　　这时错误处理的能力完全由用户控制，用户既可以选择忽略错误，也可以调用上报程序将错误上报给监控系统。

　　实际上，这就是 Vue.js 错误处理的原理，你可以在源码中搜索到 `callWithErrorHandling` 函数。另外，在 Vue.js 中，我们也可以注册统一的错误处理函数：

```js
01 import App from 'App.vue'
02 const app = createApp(App)
03 app.config.errorHandler = () => {
04   // 错误处理程序
05 }
```



## 第 3 章　Vue.js 3 的设计思路

### 3.1　声明式地描述 UI

　　那么，使用模板和 JavaScript 对象描述 UI 有何不同呢？答案是：使用 JavaScript 对象描述 UI 更加灵活。举个例子，假如我们要表示一个标题，根据标题级别的不同，会分别采用 `h1`~`h6` 这几个标签，如果用 JavaScript 对象来描述，我们只需要使用一个变量来代表 `h` 标签即可：

```js
01 // h 标签的级别
02 let level = 3
03 const title = {
04   tag: `h${level}`, // h3 标签
05 }
```

### 3.2　初识渲染器

现在我们已经了解了什么是虚拟 DOM，它其实就是用 JavaScript 对象来描述真实的 DOM 结构。那么，虚拟 DOM 是如何变成真实 DOM 并渲染到浏览器页面中的呢？这就用到了我们接下来要介绍的：渲染器。

![image-20250306150342362](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250306150342362.png)

**图 3-1　渲染器的作用**

```js
01 const vnode = {
02   tag: 'div',
03   props: {
04     onClick: () => alert('hello')
05   },
06   children: 'click me'
07 }
```

　接下来，我们需要编写一个**渲染器**，把上面这段虚拟 DOM 渲染为真实 DOM：

```js
01 function renderer(vnode, container) {
02   // 使用 vnode.tag 作为标签名称创建 DOM 元素
03   const el = document.createElement(vnode.tag)
04   // 遍历 vnode.props，将属性、事件添加到 DOM 元素
05   for (const key in vnode.props) {
06     if (/^on/.test(key)) {
07       // 如果 key 以 on 开头，说明它是事件
08       el.addEventListener(
09         key.substr(2).toLowerCase(), // 事件名称 onClick ---> click
10         vnode.props[key] // 事件处理函数
11       )
12     }
13   }
14
15   // 处理 children
16   if (typeof vnode.children === 'string') {
17     // 如果 children 是字符串，说明它是元素的文本子节点
18     el.appendChild(document.createTextNode(vnode.children))
19   } else if (Array.isArray(vnode.children)) {
20     // 递归地调用 renderer 函数渲染子节点，使用当前元素 el 作为挂载点
21     vnode.children.forEach(child => renderer(child, el))
22   }
23
24   // 将元素添加到挂载点下
25   container.appendChild(el)
26 }
```

　现在我们回过头来分析渲染器 `renderer` 的实现思路，总体来说分为三步。

- 创建元素：把 `vnode.tag` 作为标签名称来创建 DOM 元素。
- 为元素添加属性和事件：遍历 `vnode.props` 对象，如果 `key` 以 `on` 字符开头，说明它是一个事件，把字符 `on` 截取掉后再调用 `toLowerCase` 函数将事件名称小写化，最终得到合法的事件名称，例如 `onClick` 会变成 `click`，最后调用 `addEventListener` 绑定事件处理函数。
- 处理 `children`：如果 `children` 是一个数组，就递归地调用 `renderer` 继续渲染，注意，此时我们要把刚刚创建的元素作为挂载点（父节点）；如果 `children` 是字符串，则使用 `createTextNode` 函数创建一个文本节点，并将其添加到新创建的元素内。



### 3.3　组件的本质

　其实虚拟 DOM 除了能够描述真实 DOM 之外，还能够描述组件。例如使用 `{ tag: 'div' }` 来描述 `<div>` 标签，但是组件并不是真实的 DOM 元素，那么如何使用虚拟 DOM 来描述呢？想要弄明白这个问题，就需要先搞清楚组件的本质是什么。一句话总结：**组件就是一组 DOM 元素的封装**，这组 DOM 元素就是组件要渲染的内容，因此我们可以定义一个函数来代表组件，而函数的返回值就代表组件要渲染的内容：

```js
01 const MyComponent = function () {
02   return {
03     tag: 'div',
04     props: {
05       onClick: () => alert('hello')
06     },
07     children: 'click me'
08   }
09 }
```

　　可以看到，组件的返回值也是虚拟 DOM，它代表组件要渲染的内容。搞清楚了组件的本质，我们就可以定义用虚拟 DOM 来描述组件了。很简单，我们可以让虚拟 DOM 对象中的 `tag` 属性来存储组件函数：

```js
01 const vnode = {
02   tag: MyComponent
03 }
```

```js
01 function renderer(vnode, container) {
02   if (typeof vnode.tag === 'string') {
03     // 说明 vnode 描述的是标签元素
04     mountElement(vnode, container)
05   } else if (typeof vnode.tag === 'function') {
06     // 说明 vnode 描述的是组件
07     mountComponent(vnode, container)
08   }
09 }
```

　　再来看 `mountComponent` 函数是如何实现的：

```js
01 function mountComponent(vnode, container) {
02   // 调用组件函数，获取组件要渲染的内容（虚拟 DOM）
03   const subtree = vnode.tag()
04   // 递归地调用 renderer 渲染 subtree
05   renderer(subtree, container)
06 }
```



### 3.4　模板的工作原理

　无论是手写虚拟 DOM（渲染函数）还是使用模板，都属于声明式地描述 UI，并且 Vue.js 同时支持这两种描述 UI 的方式。上文中我们讲解了虚拟 DOM 是如何渲染成真实 DOM 的，那么模板是如何工作的呢？这就要提到 Vue.js 框架中的另外一个重要组成部分：**编译器**。

　以我们熟悉的 .vue 文件为例，一个 .vue 文件就是一个组件，如下所示：

```js
01 <template>
02   <div @click="handler">
03     click me
04   </div>
05 </template>
06
07 <script>
08 export default {
09   data() {/* ... */},
10   methods: {
11     handler: () => {/* ... */}
12   }
13 }
14 </script>
```

其中 `<template>` 标签里的内容就是模板内容，编译器会把模板内容编译成渲染函数并添加到 `<script>` 标签块的组件对象上，所以最终在浏览器里运行的代码就是：

```js
01 export default {
02   data() {/* ... */},
03   methods: {
04     handler: () => {/* ... */}
05   },
06   render() {
07     return h('div', { onClick: handler }, 'click me')
08   }
09 }
```

　　所以，无论是使用模板还是直接手写渲染函数，对于一个组件来说，它要渲染的内容最终都是通过渲染函数产生的，然后**渲染器**再把渲染函数返回的虚拟 DOM 渲染为真实 DOM，这就是模板的工作原理，也是 Vue.js 渲染页面的流程。

　　**编译器**是一个比较大的话题，后面我们会着重讲解，这里大家只需要清楚编译器的作用及角色即可。

### 3.5　Vue.js 是各个模块组成的有机整体

```js
01 render() {
02   return {
03     tag: 'div',
04     props: {
05       id: 'foo',
06       class: cls
07     },
08     patchFlags: 1 // 假设数字 1 代表 class 是动态的
09   }
10 }
```

　　如上面的代码所示，在生成的虚拟 DOM 对象中多出了一个 `patchFlags` 属性，我们假设数字 `1` 代表“ `class` 是动态的”，这样渲染器看到这个标志时就知道：“哦，原来只有 `class` 属性会发生改变。”对于渲染器来说，就相当于省去了寻找变更点的工作量，性能自然就提升了。

*性能优化时可讲。*

### 3.6　总结

虚拟 DOM 要比模板更加灵活，但模板要比虚拟 DOM 更加直观。

渲染器的作用是，把虚拟 DOM 对象渲染为真实 DOM 元素。它的工作原理是，递归地遍历虚拟 DOM 对象，并调用原生 DOM API 来完成真实 DOM 的创建。渲染器的精髓在于后续的更新，它会通过 Diff 算法找出变更点，并且只会更新需要更新的内容。

组件其实就是一组虚拟 DOM 元素的封装，会先获取组件要渲染的内容，即执行组件的渲染函数并得到其返回值，我们称之为 `subtree`，最后再递归地调用渲染器将 `subtree` 渲染出来即可。

Vue.js 的模板会被一个叫作编译器的程序编译为渲染函数。



## 第 4 章　响应系统的作用与实现

### 4.2　响应式数据的基本实现

- 当副作用函数 `effect` 执行时，会触发字段 `obj.text` 的**读取**操作；
- 当修改 `obj.text` 的值时，会触发字段 `obj.text` 的**设置**操作。

![image-20230510153331414](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230510153331414.png)

　接着，当设置 `obj.text` 时，再把副作用函数 `effect` 从“桶”里取出并执行即可

![image-20230510153443975](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230510153443975.png)

**把副作用函数从“桶”内取出并执行**



### 4.3　设计一个完善的响应系统

　接下来我们就根据如上思路，采用 `Proxy` 来实现：

```js
01 // 用一个全局变量存储被注册的副作用函数
02 let activeEffect
03 // effect 函数用于注册副作用函数
04 function effect(fn) {
05   // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
06   activeEffect = fn
07   // 执行副作用函数
08   fn()
09 }
```



```js
01 effect(
02   // 一个匿名的副作用函数
03   () => {
04     document.body.innerText = obj.text
05   }
06 )
```



```js
01 const obj = new Proxy(data, {
02   get(target, key) {
03     // 将 activeEffect 中存储的副作用函数收集到“桶”中
04     if (activeEffect) {  // 新增
05       bucket.add(activeEffect)  // 新增
06     }  // 新增
07     return target[key]
08   },
09   set(target, key, newVal) {
10     target[key] = newVal
11     bucket.forEach(fn => fn())
12     return true
13   }
14 })
```



```js
01 effect(
02   // 匿名副作用函数
03   () => {
04     console.log('effect run') // 会打印 2 次
05     document.body.innerText = obj.text
06   }
07 )
08
09 setTimeout(() => {
10   // 副作用函数中并没有读取 notExist 属性的值
11   obj.notExist = 'hello vue3'
12 }, 1000)
```





```js
01 effect(function effectFn() {
02   document.body.innerText = obj.text
03 })
```

　在这段代码中存在三个角色：

- 被操作（读取）的代理对象 `obj`；
- 被操作（读取）的字段名 `text`；
- 使用 `effect` 函数注册的副作用函数 `effectFn`。



　　如果在不同的副作用函数中读取了两个不同对象的不同属性：

```js
01 effect(function effectFn1() {
02   obj1.text1
03 })
04 effect(function effectFn2() {
05   obj2.text2
06 })
```



那么关系如下：

```js
01 target1
02     └── text1
03         └── effectFn1
04 target2
05     └── text2
06         └── effectFn2
```



```js
01 // 存储副作用函数的桶
02 const bucket = new WeakMap()
```



```js
01 const obj = new Proxy(data, {
02   // 拦截读取操作
03   get(target, key) {
04     // 没有 activeEffect，直接 return
05     if (!activeEffect) return target[key]
06     // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
07     let depsMap = bucket.get(target)
08     // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
09     if (!depsMap) {
10       bucket.set(target, (depsMap = new Map()))
11     }
12     // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
13     // 里面存储着所有与当前 key 相关联的副作用函数：effects
14     let deps = depsMap.get(key)
15     // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
16     if (!deps) {
17       depsMap.set(key, (deps = new Set()))
18     }
19     // 最后将当前激活的副作用函数添加到“桶”里
20     deps.add(activeEffect)
21
22     // 返回属性值
23     return target[key]
24   },
25   // 拦截设置操作
26   set(target, key, newVal) {
27     // 设置属性值
28     target[key] = newVal
29     // 根据 target 从桶中取得 depsMap，它是 key --> effects
30     const depsMap = bucket.get(target)
31     if (!depsMap) return
32     // 根据 key 取得所有副作用函数 effects
33     const effects = depsMap.get(key)
34     // 执行副作用函数
35     effects && effects.forEach(fn => fn())
36   }
37 })
```



从这段代码可以看出构建数据结构的方式，我们分别使用了 `WeakMap`、`Map` 和 `Set`：

- `WeakMap` 由 `target --> Map` 构成；
- `Map` 由 `key --> Set` 构成。

其中 `WeakMap` 的键是原始对象 `target`，`WeakMap` 的值是一个 `Map` 实例，而 `Map` 的键是原始对象 `target` 的 `key`，`Map` 的值是一个由副作用函数组成的 `Set`



![图 4-3](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230510155659664.png)

 **图 4-3　`WeakMap`、`Map` 和 `Set` 之间的关系**

　　为了方便描述，我们把图 4-3 中的 `Set` 数据结构所存储的副作用函数集合称为 `key` 的**依赖集合**。





搞清了它们之间的关系，我们有必要解释一下这里为什么要使用 `WeakMap`，这其实涉及 `WeakMap` 和 `Map` 的区别，我们用一段代码来讲解：



```
01 const map = new Map();
02 const weakmap = new WeakMap();
03
04 (function(){
05     const foo = {foo: 1};
06     const bar = {bar: 2};
07
08     map.set(foo, 1);
09     weakmap.set(bar, 2);
10 })()
```



　　首先，我们定义了 `map` 和 `weakmap` 常量，分别对应 `Map` 和 `WeakMap` 的实例。接着定义了一个立即执行的函数表达式（IIFE），在函数表达式内部定义了两个对象：`foo` 和 `bar`，这两个对象分别作为 `map` 和 `weakmap` 的 `key`。当该函数表达式执行完毕后，对于对象 `foo` 来说，它仍然作为 `map` 的 `key` 被引用着，因此**垃圾回收器**（grabage collector）不会把它从内存中移除，我们仍然可以通过 `map.keys` 打印出对象 `foo`。然而对于对象 `bar` 来说，由于 `WeakMap` 的 `key` 是弱引用，它不影响垃圾回收器的工作，所以一旦表达式执行完毕，垃圾回收器就会把对象 `bar` 从内存中移除，并且我们无法获取 `weakmap` 的 `key` 值，也就无法通过 `weakmap` 取得对象 `bar`。

　　简单地说，`WeakMap` 对 `key` 是弱引用，不影响垃圾回收器的工作。据这个特性可知，一旦 `key` 被垃圾回收器回收，那么对应的键和值就访问不到了。所以 `WeakMap` 经常用于存储那些只有当 `key` 所引用的对象存在时（没有被回收）才有价值的信息，例如上面的场景中，如果 `target` 对象没有任何引用了，说明用户侧不再需要它了，这时垃圾回收器会完成回收任务。但如果使用 `Map` 来代替 `WeakMap`，那么即使用户侧的代码对 `target` 没有任何引用，这个 `target` 也不会被回收，最终可能导致内存溢出。

### 4.4　分支切换与 `cleanup`

　　首先，我们需要明确分支切换的定义，如下面的代码所示：

```
01 const data = { ok: true, text: 'hello world' }
02 const obj = new Proxy(data, { /* ... */ })
03
04 effect(function effectFn() {
05   document.body.innerText = obj.ok ? obj.text : 'not'
06 })
```

　　在 `effectFn` 函数内部存在一个三元表达式，根据字段 `obj.ok` 值的不同会执行不同的代码分支。当字段 `obj.ok` 的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换。

　　分支切换可能会产生遗留的副作用函数。

![图 4-6](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250306163705874.png)

**图 4-6　断开副作用函数与响应式数据之间的联系**

　　当副作用函数执行完毕后，会重新建立联系，但在新的联系中不会包含遗留的副作用函数，即图 4-5 所描述的那样。所以，如果我们能做到每次副作用函数执行前，将其从相关联的依赖集合中移除，那么问题就迎刃而解了。

![图 4-7](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250306163941074.png)

**图 4-7　对依赖集合的收集**

　　有了这个联系后，我们就可以在每次副作用函数执行时，根据 `effectFn.deps` 获取所有相关联的依赖集合，进而将副作用函数从依赖集合中移除



### 4.5　嵌套的 `effect` 与 `effect` 栈

　　　`effect` 是可以发生嵌套的，例如：

```js
01 effect(function effectFn1() {
02   effect(function effectFn2() { /* ... */ })
03   /* ... */
04 })
```

　　在上面这段代码中，`effectFn1` 内部嵌套了 `effectFn2`，`effectFn1` 的执行会导致 `effectFn2` 的执行。那么，什么场景下会出现嵌套的 `effect` 呢？拿 Vue.js 来说，实际上 Vue.js 的渲染函数就是在一个 `effect` 中执行的：

```js
01 // Foo 组件
02 const Foo = {
03   render() {
04     return /* ... */
05   }
06 }
```

　　在一个 `effect` 中执行 `Foo` 组件的渲染函数：

```js
01 effect(() => {
02   Foo.render()
03 })
```

　　当组件发生嵌套时，例如 `Foo` 组件渲染了 `Bar` 组件：

```js
01 // Bar 组件
02 const Bar = {
03   render() { /* ... */ },
04 }
05 // Foo 组件渲染了 Bar 组件
06 const Foo = {
07   render() {
08     return <Bar /> // jsx 语法
09   },
10 }
```

此时就发生了 `effect` 嵌套，它相当于：

```js
01 effect(() => {
02   Foo.render()
03   // 嵌套
04   effect(() => {
05     Bar.render()
06   })
07 })
```

　

这个例子说明了为什么 `effect` 要设计成可嵌套的。接下来，我们需要搞清楚，如果 `effect` 不支持嵌套会发生什么？实际上，按照前文的介绍与实现来看，我们所实现的响应系统并不支持 `effect` 嵌套，可以用下面的代码来测试一下：

```js
01 // 原始数据
02 const data = { foo: true, bar: true }
03 // 代理对象
04 const obj = new Proxy(data, { /* ... */ })
05
06 // 全局变量
07 let temp1, temp2
08
09 // effectFn1 嵌套了 effectFn2
10 effect(function effectFn1() {
11   console.log('effectFn1 执行')
12
13   effect(function effectFn2() {
14     console.log('effectFn2 执行')
15     // 在 effectFn2 中读取 obj.bar 属性
16     temp2 = obj.bar
17   })
18   // 在 effectFn1 中读取 obj.foo 属性
19   temp1 = obj.foo
20 })
```



在上面这段代码中，`effectFn1` 内部嵌套了 `effectFn2`，很明显，`effectFn1` 的执行会导致 `effectFn2` 的执行。需要注意的是，我们在 `effectFn2` 中读取了字段 `obj.bar`，在 `effectFn1` 中读取了字段 `obj.foo`，并且 `effectFn2` 的执行先于对字段 `obj.foo` 的读取操作。在理想情况下，我们希望副作用函数与对象属性之间的联系如下：



```js
01 data
02   └── foo
03     └── effectFn1
04   └── bar
05     └── effectFn2
```



在这种情况下，我们希望当修改 `obj.foo` 时会触发 `effectFn1` 执行。由于 `effectFn2` 嵌套在 `effectFn1` 里，所以会间接触发 `effectFn2` 执行，而当修改 `obj.bar` 时，只会触发 `effectFn2` 执行。但结果不是这样的，我们尝试修改 `obj.foo` 的值，会发现输出为：



```js
01 'effectFn1 执行'
02 'effectFn2 执行'
03 'effectFn2 执行'
```



　一共打印三次，前两次分别是副作用函数 `effectFn1` 与 `effectFn2` 初始执行的打印结果，到这一步是正常的，问题出在第三行打印。我们修改了字段 `obj.foo` 的值，发现 `effectFn1` 并没有重新执行，反而使得 `effectFn2` 重新执行了，这显然不符合预期。



　　问题出在哪里呢？其实就出在我们实现的 `effect` 函数与 `activeEffect` 上。观察下面这段代码：

```js
01 // 用一个全局变量存储当前激活的 effect 函数
02 let activeEffect
03 function effect(fn) {
04   const effectFn = () => {
05     cleanup(effectFn)
06     // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
07     activeEffect = effectFn
08     fn()
09   }
10   // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
11   effectFn.deps = []
12   // 执行副作用函数
13   effectFn()
14 }
```



　我们用全局变量 `activeEffect` 来存储通过 `effect` 函数注册的副作用函数，这意味着同一时刻 `activeEffect` 所存储的副作用函数只能有一个。当副作用函数发生嵌套时，内层副作用函数的执行会覆盖 `activeEffect` 的值，并且永远不会恢复到原来的值。这时如果再有响应式数据进行依赖收集，即使这个响应式数据是在外层副作用函数中读取的，它们收集到的副作用函数也都会是内层副作用函数，这就是问题所在。

　　为了解决这个问题，我们需要一个副作用函数栈 `effectStack`，在副作用函数执行时，将当前副作用函数压入栈中，待副作用函数执行完毕后将其从栈中弹出，并始终让 `activeEffect` 指向栈顶的副作用函数。这样就能做到一个响应式数据只会收集直接读取其值的副作用函数，而不会出现互相影响的情况，如以下代码所示：



```js
01 // 用一个全局变量存储当前激活的 effect 函数
02 let activeEffect
03 // effect 栈
04 const effectStack = []  // 新增
05
06 function effect(fn) {
07   const effectFn = () => {
08     cleanup(effectFn)
09     // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
10     activeEffect = effectFn
11     // 在调用副作用函数之前将当前副作用函数压入栈中
12     effectStack.push(effectFn)  // 新增
13     fn()
14     // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
15     effectStack.pop()  // 新增
16     activeEffect = effectStack[effectStack.length - 1]  // 新增
17   }
18   // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
19   effectFn.deps = []
20   // 执行副作用函数
21   effectFn()
22 }
```



　我们定义了 `effectStack` 数组，用它来模拟栈，`activeEffect` 没有变化，它仍然指向当前正在执行的副作用函数。不同的是，当前执行的副作用函数会被压入栈顶，这样当副作用函数发生嵌套时，栈底存储的就是外层副作用函数，而栈顶存储的则是内层副作用函数，如图所示。

![image-20230511145505231](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230511145505231.png)



　当内层副作用函数 `effectFn2` 执行完毕后，它会被弹出栈，并将副作用函数 `effectFn1` 设置为 `activeEffect`，如图 4-9 所示。

![**图 4-9**](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250306213932688.png)



如此一来，响应式数据就只会收集直接读取其值的副作用函数作为依赖，从而避免发生错乱。



### 4.6　避免无限递归循环

​		实现一个完善的响应系统要考虑诸多细节。而本节要介绍的无限递归循环就是其中之一，还是举个例子：

```js
01 const data = { foo: 1 }
02 const obj = new Proxy(data, { /*...*/ })
03
04 effect(() => obj.foo++)
```

　　

​		可以看到，在 `effect` 注册的副作用函数内有一个自增操作 `obj.foo++`，该操作会引起栈溢出：

```js
01 Uncaught RangeError: Maximum call stack size exceeded
```



　　为什么会这样呢？接下来我们就尝试搞清楚这个问题，并提供解决方案。

　　实际上，我们可以把 `obj.foo++` 这个自增操作分开来看，它相当于：

```js
01 effect(() => {
02   // 语句
03   obj.foo = obj.foo + 1
04 })
```



　在这个语句中，既会读取 `obj.foo` 的值，又会设置 `obj.foo` 的值，而这就是导致问题的根本原因。我们可以尝试推理一下代码的执行流程：首先读取 `obj.foo` 的值，这会触发 `track` 操作，将当前副作用函数收集到“桶”中，接着将其加 `1` 后再赋值给 `obj.foo`，此时会触发 `trigger` 操作，即把“桶”中的副作用函数取出并执行。但问题是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执行。这样会导致无限递归地调用自己，于是就产生了栈溢出。

　　解决办法并不难。通过分析这个问题我们能够发现，读取和设置操作是在同一个副作用函数内进行的。此时无论是 `track` 时收集的副作用函数，还是 `trigger` 时要触发执行的副作用函数，都是 `activeEffect`。基于此，我们可以在 `trigger` 动作发生时增加守卫条件：**如果 `trigger` 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行**，如以下代码所示：

```js
01 function trigger(target, key) {
02   const depsMap = bucket.get(target)
03   if (!depsMap) return
04   const effects = depsMap.get(key)
05
06   const effectsToRun = new Set()
07   effects && effects.forEach(effectFn => {
08     // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
09     if (effectFn !== activeEffect) {  // 新增
10       effectsToRun.add(effectFn)
11     }
12   })
13   effectsToRun.forEach(effectFn => effectFn())
14   // effects && effects.forEach(effectFn => effectFn())
15 }
```

　　这样我们就能够避免无限递归调用，从而避免栈溢出。



### 4.8　计算属性 `computed` 与 `lazy`



当读取计算属性的值时，我们可以手动调用 `track` 函数进行追踪；当计算属性依赖的响应式数据发生变化时，我们可以手动调用 `trigger` 函数触发响应：

```js
01 function computed(getter) {
02   let value
03   let dirty = true
04
05   const effectFn = effect(getter, {
06     lazy: true,
07     scheduler() {
08       if (!dirty) {
09         dirty = true
10         // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
11         trigger(obj, 'value')
12       }
13     }
14   })
15
16   const obj = {
17     get value() {
18       if (dirty) {
19         value = effectFn()
20         dirty = false
21       }
22       // 当读取 value 时，手动调用 track 函数进行追踪
23       track(obj, 'value')
24       return value
25     }
26   }
27
28   return obj
29 }
```

　　如以上代码所示，当读取一个计算属性的 `value` 值时，我们手动调用 `track` 函数，把计算属性返回的对象 `obj` 作为 `target`，同时作为第一个参数传递给 `track` 函数。当计算属性所依赖的响应式数据变化时，会执行调度器函数，在调度器函数内手动调用 `trigger` 函数触发响应即可。



### 4.9　`watch` 的实现原理



那么如何获得新值与旧值呢？这需要充分利用 `effect` 函数的 `lazy` 选项，如以下代码所示：

```js
01 function watch(source, cb) {
02   let getter
03   if (typeof source === 'function') {
04     getter = source
05   } else {
06     getter = () => traverse(source)
07   }
08   // 定义旧值与新值
09   let oldValue, newValue
10   // 使用 effect 注册副作用函数时，开启 lazy 选项，并把返回值存储到 effectFn 中以便后续手动调用
11   const effectFn = effect(
12     () => getter(),
13     {
14       lazy: true,
15       scheduler() {
16         // 在 scheduler 中重新执行副作用函数，得到的是新值
17         newValue = effectFn()
18         // 将旧值和新值作为回调函数的参数
19         cb(newValue, oldValue)
20         // 更新旧值，不然下一次会得到错误的旧值
21         oldValue = newValue
22       }
23     }
24   )
25   // 手动调用副作用函数，拿到的值就是旧值
26   oldValue = effectFn()
27 }
```

　　在这段代码中，最核心的改动是使用 `lazy` 选项创建了一个懒执行的 `effect`。注意上面代码中最下面的部分，我们手动调用 `effectFn` 函数得到的返回值就是旧值，即第一次执行得到的值。当变化发生并触发 `scheduler` 调度函数执行时，会重新调用 `effectFn` 函数并得到新值，这样我们就拿到了旧值与新值，接着将它们作为参数传递给回调函数 `cb` 就可以了。最后一件非常重要的事情是，不要忘记使用新值更新旧值：`oldValue = newValue`，否则在下一次变更发生时会得到错误的旧值。



### 4.11　过期的副作用

　竞态问题通常在多进程或多线程编程中被提及，前端工程师可能很少讨论它，但在日常工作中你可能早就遇到过与竞态问题相似的场景，举个例子：

```js
01 let finalData
02
03 watch(obj, async () => {
04   // 发送并等待网络请求
05   const res = await fetch('/path/to/request')
06   // 将请求结果赋值给 data
07   finalData = res
08 })
```

![图 4-12](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250307013051705.png)**图 4-12　请求过期**

**图 4-12　请求过期**



## 第 7 章　渲染器的设计

### 7.3　自定义渲染器

自定义渲染器并不是“黑魔法”，它只是通过抽象的手段，让核心代码不再依赖平台特有的 API，再通过支持个性化配置的能力来实现跨平台。



### 7.4　总结

　　在本章中，我们首先介绍了渲染器与响应系统的关系。利用响应系统的能力，我们可以做到，当响应式数据变化时自动完成页面更新（或重新渲染）。同时我们注意到，这与渲染器的具体实现无关。我们实现了一个极简的渲染器，它只能利用 `innerHTML` 属性将给定的 HTML 字符串内容设置到容器中。

　　接着，我们讨论了与渲染器相关的基本名词和概念。渲染器的作用是把虚拟 DOM 渲染为特定平台上的真实元素，我们用英文 renderer 来表达渲染器。虚拟 DOM 通常用英文 virtual DOM 来表达，有时会简写成 `vdom` 或 `vnode`。渲染器会执行挂载和打补丁操作，对于新的元素，渲染器会将它挂载到容器内；对于新旧 `vnode` 都存在的情况，渲染器则会执行打补丁操作，即对比新旧 `vnode`，只更新变化的内容。

　　最后，我们讨论了自定义渲染器的实现。在浏览器平台上，渲染器可以利用 DOM API 完成 DOM 元素的创建、修改和删除。为了让渲染器不直接依赖浏览器平台特有的 API，我们将这些用来创建、修改和删除元素的操作抽象成可配置的对象。用户可以在调用 `createRenderer` 函数创建渲染器的时候指定自定义的配置对象，从而实现自定义的行为。我们还实现了一个用来打印渲染器操作流程的自定义渲染器，它不仅可以在浏览器中运行，还可以在 Node.js 中运行。



## 第 8 章　挂载与更新	

### 8.1　挂载子节点和元素的属性

### 8.2　HTML Attributes 与 DOM Properties

　　理解 HTML Attributes 和 DOM Properties 之间的差异和关联非常重要，这能够帮助我们合理地设计虚拟节点的结构，更是正确地为元素设置属性的关键。

　　我们从最基本的 HTML 说起。给出如下 HTML 代码：

```
01 <input id="my-input" type="text" value="foo" />
```

　　HTML Attributes 指的就是定义在 HTML 标签上的属性，这里指的就是 `id="my-input"`、`type="text"` 和 `value="foo"`。当浏览器解析这段 HTML 代码后，会创建一个与之相符的 `DOM` 元素对象，我们可以通过 JavaScript 代码来读取该 DOM 对象：

```
01 const el = document.querySelector('#my-input')
```

　　这个 DOM 对象会包含很多**属性**（properties），如图 8-1 所示。

![图 8-1](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250309132305234.png)

**图 8-1　DOM 对象下的属性**

　　这些属性就是所谓的 DOM Properties。很多 HTML Attributes 在 DOM 对象上有与之同名的 DOM Properties，例如 `id="my-input"` 对应 `el.id`，`type="text"` 对应 `el.type`，`value="foo"` 对应 `el.value` 等。但 DOM Properties 与 HTML Attributes 的名字不总是一模一样的，例如：

```
01 <div class="foo"></div>
```

　　`class="foo"` 对应的 DOM Properties 则是 `el.className`。另外，并不是所有 HTML Attributes 都有与之对应的 DOM Properties，例如：

```
01 <div aria-valuenow="75"></div>
```

`aria-*` 类的 HTML Attributes 就没有与之对应的 DOM Properties。

　　类似地，也不是所有 DOM Properties 都有与之对应的 HTML Attributes，例如可以用 `el.textContent` 来设置元素的文本内容，但并没有与之对应的 HTML Attributes 来完成同样的工作。

　　HTML Attributes 的值与 DOM Properties 的值之间是有关联的，例如下面的 HTML 片段：

```
01 <div id="foo"></div>
```

　　这个片段描述了一个具有 `id` 属性的 `div` 标签。其中，`id="foo"` 对应的 DOM Properties 是 `el.id`，并且值为字符串 `'foo'`。我们把这种 HTML Attributes 与 DOM Properties 具有相同名称（即 `id`）的属性看作直接映射。但并不是所有 HTML Attributes 与 DOM Properties 之间都是直接映射的关系，例如：

```
01 <input value="foo" />
```

　　这是一个具有 `value` 属性的 `input` 标签。如果用户没有修改文本框的内容，那么通过 `el.value` 读取对应的 DOM Properties 的值就是字符串 `'foo'`。而如果用户修改了文本框的值，那么 `el.value` 的值就是当前文本框的值。例如，用户将文本框的内容修改为 `'bar'`，那么：

```
01 console.log(el.value) // 'bar'
```

　　但如果运行下面的代码，会发生“奇怪”的现象：

```
01 console.log(el.getAttribute('value')) // 仍然是 'foo'
02 console.log(el.value) // 'bar'
```

　　可以发现，用户对文本框内容的修改并不会影响 `el.getAttribute('value')` 的返回值，这个现象蕴含着 HTML Attributes 所代表的意义。实际上，HTML Attributes 的作用是设置与之对应的 DOM Properties 的初始值。一旦值改变，那么 DOM Properties 始终存储着当前值，而通过 `getAttribute` 函数得到的仍然是初始值。

　　但我们仍然可以通过 `el.defaultValue` 来访问初始值，如下面的代码所示：

```
01 el.getAttribute('value') // 仍然是 'foo'
02 el.value // 'bar'
03 el.defaultValue // 'foo'
```

　　这说明一个 HTML Attributes 可能关联多个 DOM Properties。例如在上例中，`value="foo"` 与 `el.value` 和 `el.defaultValue` 都有关联。

　　虽然我们可以认为 HTML Attributes 是用来设置与之对应的 DOM Properties 的初始值的，但有些值是受限制的，就好像浏览器内部做了默认值校验。如果你通过 HTML Attributes 提供的默认值不合法，那么浏览器会使用内建的合法值作为对应 DOM Properties 的默认值，例如：

```
01 <input type="foo" />
```

　　我们知道，为 `<input/>` 标签的 `type` 属性指定字符串 `'foo'` 是不合法的，因此浏览器会矫正这个不合法的值。所以当我们尝试读取 `el.type` 时，得到的其实是矫正后的值，即字符串 `'text'`，而非字符串 `'foo'`：

```
01 console.log(el.type) // 'text'
```

　　从上述分析来看，HTML Attributes 与 DOM Properties 之间的关系很复杂，但其实我们只需要记住一个核心原则即可：**HTML Attributes 的作用是设置与之对应的 DOM Properties 的初始值**。



### 8.12　总结

　　在本章中，我们首先讨论了如何挂载子节点，以及节点的属性。对于子节点，只需要递归地调用 `patch` 函数完成挂载即可。而节点的属性比想象中的复杂，它涉及两个重要的概念：HTML Attributes 和 DOM Properties。为元素设置属性时，我们不能总是使用 `setAttribute` 函数，也不能总是通过元素的 DOM Properties 来设置。至于如何正确地为元素设置属性，取决于被设置属性的特点。例如，表单元素的 `el.form` 属性是只读的，因此只能使用 `setAttribute` 函数来设置。

　　接着，我们讨论了特殊属性的处理。以 `class` 为例，Vue.js 对 `class` 属性做了增强，它允许我们为 `class` 指定不同类型的值。但在把这些值设置给 DOM 元素之前，要对值进行正常化。我们还讨论了为元素设置 `class` 的三种方式及其性能情况。其中，`el.className` 的性能最优，所以我们选择在 `patchProps` 函数中使用 `el.className` 来完成 `class` 属性的设置。除了 `class` 属性之外，Vue.js 也对 `style` 属性做了增强，所以 `style` 属性也需要做类似的处理。

　　然后，我们讨论了卸载操作。一开始，我们直接使用 `innerHTML` 来清空容器元素，但是这样存在诸多问题。

- 容器的内容可能是由某个或多个组件渲染的，当卸载操作发生时，应该正确地调用这些组件的 `beforeUnmount`、`unmounted` 等生命周期函数。
- 即使内容不是由组件渲染的，有的元素存在自定义指令，我们应该在卸载操作发生时正确地执行对应的指令钩子函数。
- 使用 `innerHTML` 清空容器元素内容的另一个缺陷是，它不会移除绑定在 DOM 元素上的事件处理函数。

　　因此，我们不能直接使用 `innerHTML` 来完成卸载任务。为了解决这些问题，我们封装了 `unmount` 函数。该函数是以一个 `vnode` 的维度来完成卸载的，它会根据 `vnode.el` 属性取得该虚拟节点对应的真实 DOM，然后调用原生 DOM API 完成 DOM 元素的卸载。这样做还有两点额外的好处。

- 在 `unmount` 函数内，我们有机会调用绑定在 DOM 元素上的指令钩子函数，例如 `beforeUnmount`、`unmounted` 等。
- 当 `unmount` 函数执行时，我们有机会检测虚拟节点 `vnode` 的类型。如果该虚拟节点描述的是组件，则我们也有机会调用组件相关的生命周期函数。

　　而后，我们讨论了 `vnode` 类型的区分。渲染器在执行更新时，需要优先检查新旧 `vnode` 所描述的内容是否相同。只有当它们所描述的内容相同时，才有打补丁的必要。另外，即使它们描述的内容相同，我们也需要进一步检查它们的类型，即检查 `vnode.type` 属性值的类型，据此判断它描述的具体内容是什么。如果类型是字符串，则它描述的是普通标签元素，这时我们会调用 `mountElement` 和 `patchElement` 来完成挂载和打补丁；如果类型是对象，则它描述的是组件，这时需要调用 `mountComponent` 和 `patchComponent` 来完成挂载和打补丁。

　　我们还讲解了事件的处理。首先介绍了如何在虚拟节点中描述事件，我们把 `vnode.props` 对象中以字符串 `on` 开头的属性当作事件对待。接着，我们讲解了如何绑定和更新事件。在更新事件的时候，为了提升性能，我们伪造了 `invoker` 函数，并把真正的事件处理函数存储在 `invoker.value` 属性中，当事件需要更新时，只更新 `invoker.value` 的值即可，这样可以避免一次 `removeEventListener` 函数的调用。

　　我们还讲解了如何处理事件与更新时机的问题。解决方案是，利用事件处理函数被绑定到 DOM 元素的时间与事件触发时间之间的差异。我们需要**屏蔽所有绑定时间晚于事件触发时间的事件处理函数的执行**。

　　之后，我们讨论了子节点的更新。我们对虚拟节点中的 `children` 属性进行了规范化，规定 `vnode.children` 属性只能有如下三种类型。

- 字符串类型：代表元素具有文本子节点。
- 数组类型：代表元素具有一组子节点。
- `null`：代表元素没有子节点。

　　在更新时，新旧 `vnode` 的子节点都有可能是以上三种情况之一，所以在执行更新时一共要考虑九种可能，即图 8-5 所展示的那样。但落实到代码中，我们并不需要罗列所有情况。另外，当新旧 `vnode` 都具有一组子节点时，我们采用了比较笨的方式来完成更新，即卸载所有旧子节点，再挂载所有新子节点。更好的做法是，通过 Diff 算法比较新旧两组子节点，试图最大程度复用 DOM 元素。我们会在后续章节中详细讲解 Diff 算法的工作原理。

　　我们还讨论了如何使用虚拟节点来描述文本节点和注释节点。我们利用了 `symbol` 类型值的唯一性，为文本节点和注释节点分别创建唯一标识，并将其作为 `vnode.type` 属性的值。

　　最后，我们讨论了 `Fragment` 及其用途。渲染器渲染 `Fragment` 的方式类似于渲染普通标签，不同的是，`Fragment` 本身并不会渲染任何 DOM 元素。所以，只需要渲染一个 `Fragment` 的所有子节点即可。



## 第 9 章　简单 Diff 算法

### 9.1　减少 DOM 操作的性能开销

图 9-1 是整个更新过程的示意图，其中**菱形**代表新子节点，**矩形**代表旧子节点，**圆形**代表真实 DOM 节点。

![图 9-1](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250309170036467.png)

**图 9-1　仅更新文本子节点**



　这种做法虽然能够减少 DOM 操作次数，但问题也很明显。在上面的代码中，我们通过遍历旧的一组子节点，并假设新的一组子节点的数量与之相同，只有在这种情况下，这段代码才能正确地工作。但是，新旧两组子节点的数量未必相同。当新的一组子节点的数量少于旧的一组子节点的数量时，意味着有些节点在更新后应该被卸载，如图 9-2 所示。

![图 9-2](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250309170127137.png)

**图 9-2　卸载已经不存在的节点**



　　在图 9-2 中，旧的一组子节点中一共有 4 个 `p` 标签，而新的一组子节点中只有 3 个 `p` 标签。这说明，在更新过程中，需要将不存在的 `p` 标签卸载。类似地，新的一组子节点的数量也可能比旧的一组子节点的数量多，如图 9-3 所示。

![图 9-3](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250309170304384.png)

**图 9-3　挂载新的节点**

　　在图 9-3 中，新的一组子节点比旧的一组子节点多了一个 `p` 标签。在这种情况下，我们应该挂载新增节点。



　通过上面的分析我们意识到，在进行新旧两组子节点的更新时，不应该总是遍历旧的一组子节点或遍历新的一组子节点，而是应该遍历其中长度较短的那一组。这样，我们才能够尽可能多地调用 `patch` 函数进行更新。接着，再对比新旧两组子节点的长度，如果新的一组子节点更长，则说明有新子节点需要挂载，否则说明有旧子节点需要卸载。最终实现如下：

```js
01 function patchChildren(n1, n2, container) {
02   if (typeof n2.children === 'string') {
03     // 省略部分代码
04   } else if (Array.isArray(n2.children)) {
05     const oldChildren = n1.children
06     const newChildren = n2.children
07     // 旧的一组子节点的长度
08     const oldLen = oldChildren.length
09     // 新的一组子节点的长度
10     const newLen = newChildren.length
11     // 两组子节点的公共长度，即两者中较短的那一组子节点的长度
12     const commonLength = Math.min(oldLen, newLen)
13     // 遍历 commonLength 次
14     for (let i = 0; i < commonLength; i++) {
15       patch(oldChildren[i], newChildren[i], container)
16     }
17     // 如果 newLen > oldLen，说明有新子节点需要挂载
18     if (newLen > oldLen) {
19       for (let i = commonLength; i < newLen; i++) {
20         patch(null, newChildren[i], container)
21       }
22     } else if (oldLen > newLen) {
23       // 如果 oldLen > newLen，说明有旧子节点需要卸载
24       for (let i = commonLength; i < oldLen; i++) {
25         unmount(oldChildren[i])
26       }
27     }
28   } else {
29     // 省略部分代码
30   }
31 }
```

　　这样，无论新旧两组子节点的数量关系如何，渲染器都能够正确地挂载或卸载它们。



### 9.2　DOM 复用与 `key` 的作用

在上一节中，我们通过减少 DOM 操作的次数，提升了更新性能。但这种方式仍然存在可优化的空间。举个例子，假设新旧两组子节点的内容如下：

```
01 // oldChildren
02 [
03   { type: 'p' },
04   { type: 'div' },
05   { type: 'span' }
06 ]
07
08 // newChildren
09 [
10   { type: 'span' },
11   { type: 'p' },
12   { type: 'div' }
13 ]
```

　　如果使用上一节介绍的算法来完成上述两组子节点的更新，则需要 6 次 DOM 操作。

- 调用 `patch` 函数在旧子节点 `{ type: 'p' }` 与新子节点 `{ type: 'span' }` 之间打补丁，由于两者是不同的标签，所以 `patch` 函数会卸载 `{ type: 'p' }`，然后再挂载 `{ type: 'span' }`，这需要执行 2 次 DOM 操作。
- 与第 1 步类似，卸载旧子节点 `{ type: 'div' }`，然后再挂载新子节点 `{ type: 'p' }`，这也需要执行 2 次 DOM 操作。
- 与第 1 步类似，卸载旧子节点 `{ type: 'span' }`，然后再挂载新子节点 `{ type: 'div' }`，同样需要执行 2 次 DOM 操作。

　　因此，一共进行 6 次 DOM 操作才能完成上述案例的更新。但是，观察新旧两组子节点，很容易发现，二者只是顺序不同。所以最优的处理方式是，通过 DOM 的移动来完成子节点的更新，这要比不断地执行子节点的卸载和挂载性能更好。但是，想要通过 DOM 的移动来完成更新，必须要保证一个前提：新旧两组子节点中的确存在可复用的节点。这个很好理解，如果新的子节点没有在旧的一组子节点中出现，就无法通过移动节点的方式完成更新。所以现在问题变成了：应该如何确定新的子节点是否出现在旧的一组子节点中呢？拿上面的例子来说，怎么确定新的一组子节点中第 1 个子节点 `{ type: 'span' }` 与旧的一组子节点中第 3 个子节点相同呢？一种解决方案是，通过 `vnode.type` 来判断，只要 `vnode.type` 的值相同，我们就认为两者是相同的节点。但这种方式并不可靠，思考如下例子：

```JS
01 // oldChildren
02 [
03   { type: 'p', children: '1' },
04   { type: 'p', children: '2' },
05   { type: 'p', children: '3' }
06 ]
07
08 // newChildren
09 [
10   { type: 'p', children: '3' },
11   { type: 'p', children: '1' },
12   { type: 'p', children: '2' }
13 ]
```

　　观察上面两组子节点，我们发现，这个案例可以通过移动 DOM 的方式来完成更新。但是所有节点的 `vnode.type` 属性值都相同，这导致我们无法确定新旧两组子节点中节点的对应关系，也就无法得知应该进行怎样的 DOM 移动才能完成更新。这时，我们就需要引入额外的 `key` 来作为 `vnode` 的标识，如下面的代码所示：

```JS
01 // oldChildren
02 [
03   { type: 'p', children: '1', key: 1 },
04   { type: 'p', children: '2', key: 2 },
05   { type: 'p', children: '3', key: 3 }
06 ]
07
08 // newChildren
09 [
10   { type: 'p', children: '3', key: 3 },
11   { type: 'p', children: '1', key: 1 },
12   { type: 'p', children: '2', key: 2 }
13 ]
```

　　`key` 属性就像虚拟节点的“身份证”号，只要两个虚拟节点的 `type` 属性值和 `key` 属性值都相同，那么我们就认为它们是相同的，即可以进行 DOM 的复用。图 9-4 展示了有 `key` 和 无 `key` 时新旧两组子节点的映射情况。

![图 9-4](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250309172633643.png)

**图 9-4　有 `key` 与无 `key`**

　由图 9-4 可知，如果没有 `key`，我们无法知道新子节点与旧子节点间的映射关系，也就无法知道应该如何移动节点。有 `key` 的话情况则不同，我们根据子节点的 `key` 属性，能够明确知道新子节点在旧子节点中的位置，这样就可以进行相应的 DOM 移动操作了。



### 9.3　找到需要移动的元素

　　我们再来看看另外一个例子，如图 9-6 所示。

![图 9-6](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/050.jpg)

**图 9-6　节点顺序变化**

　　同样，我们根据图 9-6 中给出的例子再次执行更新算法，看看这一次会有什么不同。

- 第一步：取新的一组子节点中的第一个节点 `p-3`，它的 `key` 为 3。尝试在旧的一组子节点中找到具有相同 `key` 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 `2`。

- 第二步：取新的一组子节点中的第二个节点 `p-1`，它的 `key` 为 1。尝试在旧的一组子节点中找到具有相同 `key` 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 `0`。

  到了这一步我们发现，索引值递增的顺序被打破了。节点 `p-1` 在旧 `children` 中的索引是 `0`，它小于节点 `p-3` 在旧 `children` 中的索引 `2`。这说明**节点** `p-1` **在旧** `children` **中排在节点** `p-3` **前面，但在新的** `children` **中，它排在节点** `p-3` **后面**。因此，我们能够得出一个结论：**节点** `p-1` **对应的真实** DOM **需要移动**。

- 第三步：取新的一组子节点中的第三个节点 `p-2`，它的 `key` 为 2。尝试在旧的一组子节点中找到具有相同 `key` 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 `1`。

  到了这一步我们发现，节点 `p-2` 在旧 `children` 中的索引 `1` 要小于节点 `p-3` 在旧 `children` 中的索引 `2`。这说明，**节点** `p-2` **在旧** `children` **中排在节点** `p-3` **前面，但在新的** `children` **中，它排在节点** `p-3` **后面。因此，节点** `p-2` **对应的真实** DOM **也需要移动**。

以上就是 Diff 算法在执行更新的过程中，判断节点是否需要移动的方式。在上面的例子中，我们得出了节点 `p-1` 和节点 `p-2` 需要移动的结论。这是因为它们在旧 `children` 中的索引要小于节点 `p-3` 在旧 `children` 中的索引。如果我们按照先后顺序记录在寻找节点过程中所遇到的位置索引，将会得到序列：`2`、`0`、`1`。可以发现，这个序列不具有递增的趋势。



　　其实我们可以将节点 `p-3` 在旧 `children` 中的索引定义为：**在旧** `children` **中寻找具有相同** `key` **值节点的过程中，遇到的最大索引值**。如果在后续寻找的过程中，存在索引值比当前遇到的最大索引值还要小的节点，则意味着该节点需要移动。



我们可以用 `lastIndex` 变量存储整个寻找过程中遇到的最大索引值，如下面的代码所示：

```js
01 function patchChildren(n1, n2, container) {
02   if (typeof n2.children === 'string') {
03     // 省略部分代码
04   } else if (Array.isArray(n2.children)) {
05     const oldChildren = n1.children
06     const newChildren = n2.children
07
08     // 用来存储寻找过程中遇到的最大索引值
09     let lastIndex = 0
10     for (let i = 0; i < newChildren.length; i++) {
11       const newVNode = newChildren[i]
12       for (let j = 0; j < oldChildren.length; j++) {
13         const oldVNode = oldChildren[j]
14         if (newVNode.key === oldVNode.key) {
15           patch(oldVNode, newVNode, container)
16           if (j < lastIndex) {
17             // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex，
18             // 说明该节点对应的真实 DOM 需要移动
19           } else {
20             // 如果当前找到的节点在旧 children 中的索引不小于最大索引值，
21             // 则更新 lastIndex 的值
22             lastIndex = j
23           }
24           break // 这里需要 break
25         }
26       }
27     }
28
29   } else {
30     // 省略部分代码
31   }
32 }
```

　如以上代码及注释所示，如果新旧节点的 `key` 值相同，说明我们在旧 `children` 中找到了可复用 DOM 的节点。此时我们用该节点在旧 `children` 中的索引 `j` 与 `lastIndex` 进行比较，如果 `j` 小于 `lastIndex`，说明当前 `oldVNode` 对应的真实 DOM 需要移动，否则说明不需要移动。但此时应该将变量 `j` 的值赋给变量 `lastIndex`，以保证寻找节点的过程中，变量 `lastIndex` 始终存储着当前遇到的最大索引值。

　　现在，我们已经找到了需要移动的节点，下一节我们将讨论如何移动节点，从而完成节点顺序的更新。



### 9.4　如何移动元素



当更新操作发生时，渲染器会调用 `patchElement` 函数在新旧虚拟节点之间进行打补丁。回顾一下 `patchElement` 函数的代码，如下：

```
01 function patchElement(n1, n2) {
02   // 新的 vnode 也引用了真实 DOM 元素
03   const el = n2.el = n1.el
04   // 省略部分代码
05 }
```

　　可以看到，`patchElement` 函数首先将旧节点的 `n1.el` 属性赋值给新节点的 `n2.el` 属性。这个赋值语句的真正含义其实就是 DOM 元素的**复用**。在复用了 DOM 元素之后，新节点也将持有对真实 DOM 的引用，如图 9-8 所示。

![img](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/052.jpg)

**图 9-8　使新的子节点也引用真实 DOM 元素**



可以看到，无论是新子节点还是旧子节点，都存在对真实 DOM 的引用，在此基础上，我们就可以进行 DOM 移动操作了。

　　为了阐述具体应该怎样移动 DOM 节点，我们仍然引用上一节的更新案例，如图 9-9 所示。

![图 9-9 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/053.jpg)**图 9-9　新旧子节点的关系**



　它的更新步骤如下。

- 第一步：取新的一组子节点中第一个节点 `p-3`，它的 `key` 为 3，尝试在旧的一组子节点中找到具有相同 `key` 值的可复用节点。发现能够找到，并且该节点在旧的一组子节点中的索引为 `2`。此时变量 `lastIndex` 的值为 `0`，索引 `2` 不小于 `0`，所以节点 `p-3` 对应的真实 DOM 不需要移动，但需要更新变量 `lastIndex` 的值为 `2`。

- 第二步：取新的一组子节点中第二个节点 `p-1`，它的 `key` 为 1，尝试在旧的一组子节点中找到具有相同 `key` 值的可复用节点。发现能够找到，并且该节点在旧的一组子节点中的索引为 `0`。此时变量 `lastIndex` 的值为 `2`，索引 `0` 小于 `2`，所以节点 `p-1` 对应的真实 DOM 需要移动。

  到了这一步，我们发现，节点 `p-1` 对应的真实 DOM 需要移动，但应该移动到哪里呢？我们知道，**新** `children` **的顺序其实就是更新后真实 DOM 节点应有的顺序**。所以节点 `p-1` 在新 `children` 中的位置就代表了真实 DOM 更新后的位置。由于节点 `p-1` 在新 `children` 中排在节点 `p-3` 后面，所以我们应该**把节点** `p-1` **所对应的真实** DOM **移动到节点** `p-3` **所对应的真实** DOM **后面**。移动后的结果如图 9-10 所示。

  可以看到，这样操作之后，此时真实 DOM 的顺序为 `p-2`、`p-3`、`p-1`。

- 第三步：取新的一组子节点中第三个节点 `p-2`，它的 `key` 为 2。尝试在旧的一组子节点中找到具有相同 `key` 值的可复用节点。发现能够找到，并且该节点在旧的一组子节点中的索引为 `1`。此时变量 `lastIndex` 的值为 `2`，索引 `1` 小于 `2`，所以节点 `p-2` 对应的真实 DOM 需要移动。

![图 9-10](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/054.jpg)

**图 9-10　把节点 `p-1` 对应的真实 DOM 移动到节点 `p-3` 对应的真实 DOM 后面**

　　第三步与第二步类似，节点 `p-2` 对应的真实 DOM 也需要移动。同样，由于节点 `p-2` 在新 `children` 中排在节点 `p-1` 后面，所以我们应该把节点 `p-2` 对应的真实 DOM 移动到节点 `p-1` 对应的真实 DOM 后面。移动后的结果如图 9-11 所示。

![图 9-11 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/055.jpg)

**图 9-11　把节点 `p-2` 对应的真实 DOM 移动到节点 `p-1` 对应的真实 DOM 后面**



　	经过这一步移动操作之后，我们发现，真实 DOM 的顺序与新的一组子节点的顺序相同了：`p-3`、`p-1`、`p-2`。至此，更新操作完成。



　	接下来，我们着手实现代码。其实并不复杂，如下面 `patchChildren` 函数的代码所示：

```js
01 function patchChildren(n1, n2, container) {
02   if (typeof n2.children === 'string') {
03     // 省略部分代码
04   } else if (Array.isArray(n2.children)) {
05     const oldChildren = n1.children
06     const newChildren = n2.children
07
08     let lastIndex = 0
09     for (let i = 0; i < newChildren.length; i++) {
10       const newVNode = newChildren[i]
11       let j = 0
12       for (j; j < oldChildren.length; j++) {
13         const oldVNode = oldChildren[j]
14         if (newVNode.key === oldVNode.key) {
15           patch(oldVNode, newVNode, container)
16           if (j < lastIndex) {
17             // 代码运行到这里，说明 newVNode 对应的真实 DOM 需要移动
18             // 先获取 newVNode 的前一个 vnode，即 prevVNode
19             const prevVNode = newChildren[i - 1]
20             // 如果 prevVNode 不存在，则说明当前 newVNode 是第一个节点，它不需要移动
21             if (prevVNode) {
22               // 由于我们要将 newVNode 对应的真实 DOM 移动到 prevVNode 所对应真实 DOM 后面，
23               // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
24               const anchor = prevVNode.el.nextSibling
25               // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面，
26               // 也就是 prevVNode 对应真实 DOM 的后面
27               insert(newVNode.el, container, anchor)
28             }
29           } else {
30             lastIndex = j
31           }
32           break
33         }
34       }
35     }
36
37   } else {
38     // 省略部分代码
39   }
40 }
```

　在上面这段代码中，如果条件 `j < lastIndex` 成立，则说明当前 `newVNode` 所对应的真实 DOM 需要移动。根据前文的分析可知，我们需要获取当前 `newVNode` 节点的前一个虚拟节点，即 `newChildren[i - 1]`，然后使用 `insert` 函数完成节点的移动，其中 `insert` 函数依赖浏览器原生的 `insertBefore` 函数，如下面的代码所示：

```js
01 const renderer = createRenderer({
02   // 省略部分代码
03
04   insert(el, parent, anchor = null) {
05     // insertBefore 需要锚点元素 anchor
06     parent.insertBefore(el, anchor)
07   }
08
09   // 省略部分代码
10 })
```



### 9.5　添加新元素

　本节我们将讨论添加新节点的情况，如图 9-12 所示。

![图 9-12](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/056.jpg)

**图 9-12　新增节点 `p-4`**

　　观察图 9-12 可知，在新的一组子节点中，多出来一个节点 `p-4`，它的 `key` 值为 `4`，该节点在旧的一组子节点不存在，因此应该将其视为新增节点。对于新增节点，在更新时我们应该正确地将它挂载，这主要分为两步：

- 想办法找到新增节点；
- 将新增节点挂载到正确位置。

　首先，我们来看一下如何找到新增节点。为了搞清楚这个问题，我们需要根据图 9-12 中给出的例子模拟执行简单 Diff 算法的逻辑。在此之前，我们需要弄清楚新旧两组子节点与真实 DOM 元素的当前状态，如图 9-13 所示。

![图 9-13](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/057.jpg)

**图 9-13　新旧两组子节点与真实 DOM 元素的当前状态**

　　接着，我们开始模拟执行简单 Diff 算法的更新逻辑。

- 第一步：取新的一组子节点中第一个节点 `p-3`，它的 `key` 值为 3，尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 `2`。此时，变量 `lastIndex` 的值为 `0`，索引值 `2` 不小于 `lastIndex` 的值 `0`，所以节点 `p-3` 对应的真实 DOM 不需要移动，但是需要将变量 `lastIndex` 的值更新为 `2`。

- 第二步：取新的一组子节点中第二个节点 `p-1`，它的 `key` 值为 1，尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 `0`。此时变量 `lastIndex` 的值为 `2`，索引值 `0` 小于 `lastIndex` 的值 `2`，所以节点 `p-1` 对应的真实 DOM 需要移动，并且应该移动到节点 `p-3` 对应的真实 DOM 后面。经过这一步的移动操作后，真实 DOM 的状态如图 9-14 所示。

  ![图 9-14 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/058.jpg)

  **图 9-14　真实 DOM 的当前状态**

  此时真实 DOM 的顺序为 `p-2`、`p-3`、`p-1`。

- 第三步：取新的一组子节点中第三个节点 `p-4`，它的 `key` 值为 4，尝试在旧的一组子节点中寻找可复用的节点。由于在旧的一组子节点中，没有 `key` 值为 4 的节点，因此渲染器会把节点 `p-4` 看作新增节点并挂载它。那么，应该将它挂载到哪里呢？为了搞清楚这个问题，我们需要观察节点 `p-4` 在新的一组子节点中的位置。由于节点 `p-4` 出现在节点 `p-1` 后面，所以我们应该把节点 `p-4` 挂载到节点 `p-1` 所对应的真实 DOM 后面。在经过这一步挂载操作之后，真实 DOM 的状态如图 9-15 所示。

  ![图 9-15](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/059.jpg)

  **图 9-15　真实 DOM 的当前状态**

  此时真实 DOM 的顺序是：`p-2`、`p-3`、`p-1`、`p-4`，其中 `p-4` 是刚刚挂载的。

- 第四步：取新的一组子节点中第四个节点 `p-2`，它的 `key` 值为 2，尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 `1`。此时变量 `lastIndex` 的值为 `2`，索引值 `1` 小于 `lastIndex` 的值 `2`，所以节点 `p-2` 对应的真实 DOM 需要移动，并且应该移动到节点 `p-4` 对应的真实 DOM 后面。经过这一步移动操作后，真实 DOM 的状态如图 9-16 所示。

  ![图 9-16](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/060.jpg)

  **图 9-16　真实 DOM 的当前状态**

　　此时真实 DOM 的顺序是：`p-3`、`p-1`、`p-4`、`p-2`。至此，真实 DOM 的顺序已经与新的一组子节点的顺序相同了，更新完成。



　　接下来，我们着手实现代码，如下面 `patchChildren` 函数的代码所示：

```js
01 function patchChildren(n1, n2, container) {
02   if (typeof n2.children === 'string') {
03     // 省略部分代码
04   } else if (Array.isArray(n2.children)) {
05     const oldChildren = n1.children
06     const newChildren = n2.children
07
08     let lastIndex = 0
09     for (let i = 0; i < newChildren.length; i++) {
10       const newVNode = newChildren[i]
11       let j = 0
12       // 在第一层循环中定义变量 find，代表是否在旧的一组子节点中找到可复用的节点，
13       // 初始值为 false，代表没找到
14       let find = false
15       for (j; j < oldChildren.length; j++) {
16         const oldVNode = oldChildren[j]
17         if (newVNode.key === oldVNode.key) {
18           // 一旦找到可复用的节点，则将变量 find 的值设为 true
19           find = true
20           patch(oldVNode, newVNode, container)
21           if (j < lastIndex) {
22             const prevVNode = newChildren[i - 1]
23             if (prevVNode) {
24               const anchor = prevVNode.el.nextSibling
25               insert(newVNode.el, container, anchor)
26             }
27           } else {
28             lastIndex = j
29           }
30           break
31         }
32       }
33       // 如果代码运行到这里，find 仍然为 false，
34       // 说明当前 newVNode 没有在旧的一组子节点中找到可复用的节点
35       // 也就是说，当前 newVNode 是新增节点，需要挂载
36       if (!find) {
37         // 为了将节点挂载到正确位置，我们需要先获取锚点元素
38         // 首先获取当前 newVNode 的前一个 vnode 节点
39         const prevVNode = newChildren[i - 1]
40         let anchor = null
41         if (prevVNode) {
42           // 如果有前一个 vnode 节点，则使用它的下一个兄弟节点作为锚点元素
43           anchor = prevVNode.el.nextSibling
44         } else {
45           // 如果没有前一个 vnode 节点，说明即将挂载的新节点是第一个子节点
46           // 这时我们使用容器元素的 firstChild 作为锚点
47           anchor = container.firstChild
48         }
49         // 挂载 newVNode
50         patch(null, newVNode, container, anchor)
51       }
52     }
53
54   } else {
55     // 省略部分代码
56   }
57 }
```

　　观察上面这段代码。首先，我们在外层循环中定义了名为 `find` 的变量，它代表渲染器能否在旧的一组子节点中找到可复用的节点。变量 `find` 的初始值为 `false`，一旦寻找到可复用的节点，则将变量 `find` 的值设置为 `true`。如果内层循环结束后，变量 `find` 的值仍然为 `false`，则说明当前 `newVNode` 是一个全新的节点，需要挂载它。为了将节点挂载到正确位置，我们需要先获取锚点元素：找到 `newVNode` 的前一个虚拟节点，即 `prevVNode`，如果存在，则使用它对应的真实 DOM 的下一个兄弟节点作为锚点元素；如果不存在，则说明即将挂载的 `newVNode` 节点是容器元素的第一个子节点，此时应该使用容器元素的 `container.firstChild` 作为锚点元素。最后，将锚点元素 `anchor` 作为 `patch` 函数的第四个参数，调用 `patch` 函数完成节点的挂载。

　　但由于目前实现的 `patch` 函数还不支持传递第四个参数，所以我们需要调整 `patch` 函数的代码，如下所示：

```js
01 // patch 函数需要接收第四个参数，即锚点元素
02 function patch(n1, n2, container, anchor) {
03   // 省略部分代码
04
05   if (typeof type === 'string') {
06     if (!n1) {
07       // 挂载时将锚点元素作为第三个参数传递给 mountElement 函数
08       mountElement(n2, container, anchor)
09     } else {
10       patchElement(n1, n2)
11     }
12   } else if (type === Text) {
13     // 省略部分代码
14   } else if (type === Fragment) {
15     // 省略部分代码
16   }
17 }
18
19 // mountElement 函数需要增加第三个参数，即锚点元素
20 function mountElement(vnode, container, anchor) {
21   // 省略部分代码
22
23   // 在插入节点时，将锚点元素透传给 insert 函数
24   insert(el, container, anchor)
25 }
```

### 9.6　移除不存在的元素

在更新子节点时，不仅会遇到新增元素，还会出现元素被删除的情况，如图 9-17 所示。

![图 9-17](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/061.jpg)

**图 9-17　节点被删除的情况**

　　在新的一组子节点中，节点 `p-2` 已经不存在了，这说明该节点被删除了。渲染器应该能找到那些需要删除的节点并正确地将其删除。

　　具体要如何做呢？首先，我们来讨论如何找到需要删除的节点。以图 9-17 为例，我们来分析它的更新步骤。在模拟执行更新逻辑之前，我们需要清楚新旧两组子节点以及真实 DOM 节点的当前状态，如图 9-18 所示。

![图 9-18](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/062.jpg)

**图 9-18　新旧两组子节点与真实 DOM 节点的当前状态**

　　接着，我们开始模拟执行更新的过程。

- 第一步：取新的一组子节点中的第一个节点 `p-3`，它的 `key` 值为 3。尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 `2`。此时变量 `lastIndex` 的值为 `0`，索引 `2` 不小于 `lastIndex` 的值 `0`，所以节点 `p-3` 对应的真实 DOM 不需要移动，但需要更新变量 `lastIndex` 的值为 `2`。
- 第二步：取新的一组子节点中的第二个节点 `p-1`，它的 `key` 值为 1。尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 `0`。此时变量 `lastIndex` 的值为 `2`，索引 `0` 小于 `lastIndex` 的值 `2`，所以节点 `p-1` 对应的真实 DOM 需要移动，并且应该移动到节点 `p-3` 对应的真实 DOM 后面。经过这一步的移动操作后，真实 DOM 的状态如图 9-19 所示。

![图 9-19](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/063.jpg)

**图 9-19　真实 DOM 的当前状态**

　　至此，更新结束。我们发现，节点 `p-2` 对应的真实 DOM 仍然存在，所以需要增加额外的逻辑来删除遗留节点。思路很简单，当基本的更新结束时，我们需要遍历旧的一组子节点，然后去新的一组子节点中寻找具有相同 `key` 值的节点。如果找不到，则说明应该删除该节点，如下面 `patchChildren` 函数的代码所示：

```
01 function patchChildren(n1, n2, container) {
02   if (typeof n2.children === 'string') {
03     // 省略部分代码
04   } else if (Array.isArray(n2.children)) {
05     const oldChildren = n1.children
06     const newChildren = n2.children
07
08     let lastIndex = 0
09     for (let i = 0; i < newChildren.length; i++) {
10       // 省略部分代码
11     }
12
13     // 上一步的更新操作完成后
14     // 遍历旧的一组子节点
15     for (let i = 0; i < oldChildren.length; i++) {
16       const oldVNode = oldChildren[i]
17       // 拿旧子节点 oldVNode 去新的一组子节点中寻找具有相同 key 值的节点
18       const has = newChildren.find(
19         vnode => vnode.key === oldVNode.key
20       )
21       if (!has) {
22         // 如果没有找到具有相同 key 值的节点，则说明需要删除该节点
23         // 调用 unmount 函数将其卸载
24         unmount(oldVNode)
25       }
26     }
27
28   } else {
29     // 省略部分代码
30   }
31 }
```

　　如以上代码及注释所示，在上一步的更新操作完成之后，我们还需要遍历旧的一组子节点，目的是检查旧子节点在新的一组子节点中是否仍然存在，如果已经不存在了，则调用 `unmount` 函数将其卸载。

### 9.7　总结

　　在本章中，我们首先讨论了 Diff 算法的作用。Diff 算法用来计算两组子节点的差异，并试图最大程度地复用 DOM 元素。在上一章中，我们采用了一种简单的方式来更新子节点，即卸载所有旧子节点，再挂载所有新子节点。然而这种更新方式无法对 DOM 元素进行复用，需要大量的 DOM 操作才能完成更新，非常消耗性能。于是，我们对它进行了改进。改进后的方案是，遍历新旧两组子节点中数量较少的那一组，并逐个调用 `patch` 函数进行打补丁，然后比较新旧两组子节点的数量，如果新的一组子节点数量更多，说明有新子节点需要挂载；否则说明在旧的一组子节点中，有节点需要卸载。

　　然后，我们讨论了虚拟节点中 `key` 属性的作用，它就像虚拟节点的“身份证号”。在更新时，渲染器通过 `key` 属性找到可复用的节点，然后尽可能地通过 DOM 移动操作来完成更新，避免过多地对 DOM 元素进行销毁和重建。

　　接着，我们讨论了简单 Diff 算法是如何寻找需要移动的节点的。简单 Diff 算法的核心逻辑是，拿新的一组子节点中的节点去旧的一组子节点中寻找可复用的节点。如果找到了，则记录该节点的位置索引。我们把这个位置索引称为最大索引。在整个更新过程中，如果一个节点的索引值小于最大索引，则说明该节点对应的真实 DOM 元素需要移动。

　　最后，我们通过几个例子讲解了渲染器是如何移动、添加、删除虚拟节点所对应的 DOM 元素的。



## 第 10 章　双端 Diff 算法

### 10.1　双端比较的原理

　　简单 Diff 算法的问题在于，它对 DOM 的移动操作并不是最优的。我们拿上一章的例子来看，如图 10-1 所示。

![图 10-1](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/064.jpg)

**图 10-1　新旧两组子节点及索引**

　　在这个例子中，如果使用简单 Diff 算法来更新它，则会发生两次 DOM 移动操作，如图 10-2 所示。

![图 10-2](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/065.jpg)

**图 10-2　两次 DOM 移动操作完成更新**

　　第一次 DOM 移动操作会将真实 DOM 节点 `p-1` 移动到真实 DOM 节点 `p-3` 后面。第二次移动操作会将真实 DOM 节点 `p-2` 移动到真实 DOM 节点 `p-1` 后面。最终，真实 DOM 节点的顺序与新的一组子节点顺序一致：`p-3`、`p-1`、`p-2`。

　　然而，上述更新过程并非最优解。在这个例子中，其实只需要通过一步 DOM 节点的移动操作即可完成更新，即只需要把真实 DOM 节点 `p-3` 移动到真实 DOM 节点 `p-1` 前面，如图 10-3 所示。

![图 10-3 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/066.jpg)

**图 10-3　把真实 DOM 节点 `p-3` 移动到真实 DOM 节点 `p-1` 前面**

　　可以看到，理论上只需要一次 DOM 移动操作即可完成更新。但简单 Diff 算法做不到这一点，不过本章我们要介绍的双端 Diff 算法可以做到。接下来，我们就来讨论双端 Diff 算法的原理。

　　顾名思义，双端 Diff 算法是一种同时对新旧两组子节点的两个端点进行比较的算法。因此，我们需要四个索引值，分别指向新旧两组子节点的端点，如图 10-4 所示。

![图 10-4](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/067.jpg)

**图 10-4　四个索引值，分别指向新旧两组子节点的端点**

　　用代码来表达四个端点，如下面 `patchChildren` 和 `patchKeyedChildren` 函数的代码所示：

```
01 function patchChildren(n1, n2, container) {
02   if (typeof n2.children === 'string') {
03     // 省略部分代码
04   } else if (Array.isArray(n2.children)) {
05     // 封装 patchKeyedChildren 函数处理两组子节点
06     patchKeyedChildren(n1, n2, container)
07   } else {
08     // 省略部分代码
09   }
10 }
11
12 function patchKeyedChildren(n1, n2, container) {
13   const oldChildren = n1.children
14   const newChildren = n2.children
15   // 四个索引值
16   let oldStartIdx = 0
17   let oldEndIdx = oldChildren.length - 1
18   let newStartIdx = 0
19   let newEndIdx = newChildren.length - 1
20 }
```

　　在上面这段代码中，我们将两组子节点的打补丁工作封装到了 `patchKeyedChildren` 函数中。在该函数内，首先获取新旧两组子节点 `oldChildren` 和 `newChildren`，接着创建四个索引值，分别指向新旧两组子节点的头和尾，即 `oldStartIdx`、`oldEndIdx`、`newStartIdx` 和 `newEndIdx`。有了索引后，就可以找到它所指向的虚拟节点了，如下面的代码所示：

```
01 function patchKeyedChildren(n1, n2, container) {
02   const oldChildren = n1.children
03   const newChildren = n2.children
04   // 四个索引值
05   let oldStartIdx = 0
06   let oldEndIdx = oldChildren.length - 1
07   let newStartIdx = 0
08   let newEndIdx = newChildren.length - 1
09   // 四个索引指向的 vnode 节点
10   let oldStartVNode = oldChildren[oldStartIdx]
11   let oldEndVNode = oldChildren[oldEndIdx]
12   let newStartVNode = newChildren[newStartIdx]
13   let newEndVNode = newChildren[newEndIdx]
14 }
```

其中，`oldStartVNode` 和 `oldEndVNode` 是旧的一组子节点中的第一个节点和最后一个节点，`newStartVNode` 和 `newEndVNode` 则是新的一组子节点的第一个节点和最后一个节点。有了这些信息之后，我们就可以开始进行双端比较了。怎么比较呢？如图 10-5 所示。

![图 10-5 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/068.jpg)

**图 10-5　双端比较的方式**

　　在双端比较中，每一轮比较都分为四个步骤，如图 10-5 中的连线所示。

- 第一步：比较旧的一组子节点中的第一个子节点 `p-1` 与新的一组子节点中的第一个子节点 `p-4`，看看它们是否相同。由于两者的 `key` 值不同，因此不相同，不可复用，于是什么都不做。
- 第二步：比较旧的一组子节点中的最后一个子节点 `p-4` 与新的一组子节点中的最后一个子节点 `p-3`，看看它们是否相同。由于两者的 `key` 值不同，因此不相同，不可复用，于是什么都不做。
- 第三步：比较旧的一组子节点中的第一个子节点 `p-1` 与新的一组子节点中的最后一个子节点 `p-3`，看看它们是否相同。由于两者的 `key` 值不同，因此不相同，不可复用，于是什么都不做。
- 第四步：比较旧的一组子节点中的最后一个子节点 `p-4` 与新的一组子节点中的第一个子节点 `p-4`。由于它们的 `key` 值相同，因此可以进行 DOM 复用。

　　可以看到，我们在第四步时找到了相同的节点，这说明它们对应的真实 DOM 节点可以复用。对于可复用的 DOM 节点，我们只需要通过 DOM 移动操作完成更新即可。那么应该如何移动 DOM 元素呢？为了搞清楚这个问题，我们需要分析第四步比较过程中的细节。我们注意到，第四步是比较旧的一组子节点的最后一个子节点与新的一组子节点的第一个子节点，发现两者相同。这说明：**节点** `p-4` **原本是最后一个子节点，但在新的顺序中，它变成了第一个子节点**。换句话说，节点 `p-4` 在更新之后应该是第一个子节点。对应到程序的逻辑，可以将其翻译为：**将索引** `oldEndIdx` **指向的虚拟节点所对应的真实 DOM 移动到索引** `oldStartIdx` **指向的虚拟节点所对应的真实 DOM 前面**。如下面的代码所示：

```
01 function patchKeyedChildren(n1, n2, container) {
02   const oldChildren = n1.children
03   const newChildren = n2.children
04   // 四个索引值
05   let oldStartIdx = 0
06   let oldEndIdx = oldChildren.length - 1
07   let newStartIdx = 0
08   let newEndIdx = newChildren.length - 1
09   // 四个索引指向的 vnode 节点
10   let oldStartVNode = oldChildren[oldStartIdx]
11   let oldEndVNode = oldChildren[oldEndIdx]
12   let newStartVNode = newChildren[newStartIdx]
13   let newEndVNode = newChildren[newEndIdx]
14
15   if (oldStartVNode.key === newStartVNode.key) {
16     // 第一步：oldStartVNode 和 newStartVNode 比较
17   } else if (oldEndVNode.key === newEndVNode.key) {
18     // 第二步：oldEndVNode 和 newEndVNode 比较
19   } else if (oldStartVNode.key === newEndVNode.key) {
20     // 第三步：oldStartVNode 和 newEndVNode 比较
21   } else if (oldEndVNode.key === newStartVNode.key) {
22     // 第四步：oldEndVNode 和 newStartVNode 比较
23     // 仍然需要调用 patch 函数进行打补丁
24     patch(oldEndVNode, newStartVNode, container)
25     // 移动 DOM 操作
26     // oldEndVNode.el 移动到 oldStartVNode.el 前面
27     insert(oldEndVNode.el, container, oldStartVNode.el)
28
29     // 移动 DOM 完成后，更新索引值，并指向下一个位置
30     oldEndVNode = oldChildren[--oldEndIdx]
31     newStartVNode = newChildren[++newStartIdx]
32   }
33 }
```

　　在这段代码中，我们增加了一系列的 `if...else if...` 语句，用来实现四个索引指向的虚拟节点之间的比较。拿上例来说，在第四步中，我们找到了具有相同 `key` 值的节点。这说明，原来处于尾部的节点在新的顺序中应该处于头部。于是，我们只需要以头部元素 `oldStartVNode.el` 作为锚点，将尾部元素 `oldEndVNode.el` 移动到锚点前面即可。但需要注意的是，在进行 DOM 的移动操作之前，仍然需要调用 `patch` 函数在新旧虚拟节点之间打补丁。

　　在这一步 DOM 的移动操作完成后，接下来是比较关键的步骤，即更新索引值。由于第四步中涉及的两个索引分别是 `oldEndIdx` 和 `newStartIdx`，所以我们需要更新两者的值，让它们各自朝正确的方向前进一步，并指向下一个节点。图 10-6 给出了更新前新旧两组子节点以及真实 DOM 节点的状态。

![图 10-6](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/069.jpg)

**图 10-6　新旧两组子节点以及真实 DOM 节点的状态**

　　图 10-7 给出了在第四步的比较中，第一步 DOM 移动操作完成后，新旧两组子节点以及真实 DOM 节点的状态。

![图 10-7](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/070.jpg)

**图 10-7　新旧两组子节点以及真实 DOM 节点的状态**



　此时，真实 DOM 节点顺序为 `p-4`、`p-1`、`p-2`、`p-3`，这与新的一组子节点顺序不一致。这是因为 Diff 算法还没有结束，还需要进行下一轮更新。因此，我们需要将更新逻辑封装到一个 `while` 循环中，如下面的代码所示：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   if (oldStartVNode.key === newStartVNode.key) {
03     // 步骤一：oldStartVNode 和 newStartVNode 比较
04   } else if (oldEndVNode.key === newEndVNode.key) {
05     // 步骤二：oldEndVNode 和 newEndVNode 比较
06   } else if (oldStartVNode.key === newEndVNode.key) {
07     // 步骤三：oldStartVNode 和 newEndVNode 比较
08   } else if (oldEndVNode.key === newStartVNode.key) {
09     // 步骤四：oldEndVNode 和 newStartVNode 比较
10     // 仍然需要调用 patch 函数进行打补丁
11     patch(oldEndVNode, newStartVNode, container)
12     // 移动 DOM 操作
13     // oldEndVNode.el 移动到 oldStartVNode.el 前面
14     insert(oldEndVNode.el, container, oldStartVNode.el)
15
16     // 移动 DOM 完成后，更新索引值，指向下一个位置
17     oldEndVNode = oldChildren[--oldEndIdx]
18     newStartVNode = newChildren[++newStartIdx]
19   }
20 }
```

　　由于在每一轮更新完成之后，紧接着都会更新四个索引中与当前更新轮次相关联的索引，所以整个 `while` 循环执行的条件是：头部索引值要小于等于尾部索引值。

　　在第一轮更新结束后循环条件仍然成立，因此需要进行下一轮的比较，如图 10-7 所示。

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-2`，看看它们是否相同。由于两者的 `key` 值不同，不可复用，所以什么都不做。

  这里，我们使用了新的名词：**头部节点**。它指的是头部索引 `oldStartIdx` 和 `newStartIdx` 所指向的节点。

- 第二步：比较旧的一组子节点中的尾部节点 `p-3` 与新的一组子节点中的尾部节点 `p-3`，两者的 `key` 值相同，可以复用。另外，由于两者都处于尾部，因此不需要对真实 DOM 进行移动操作，只需要打补丁即可，如下面的代码所示：

  ```
  01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  02   if (oldStartVNode.key === newStartVNode.key) {
  03     // 步骤一：oldStartVNode 和 newStartVNode 比较
  04   } else if (oldEndVNode.key === newEndVNode.key) {
  05     // 步骤二：oldEndVNode 和 newEndVNode 比较
  06     // 节点在新的顺序中仍然处于尾部，不需要移动，但仍需打补丁
  07     patch(oldEndVNode, newEndVNode, container)
  08     // 更新索引和头尾部节点变量
  09     oldEndVNode = oldChildren[--oldEndIdx]
  10     newEndVNode = newChildren[--newEndIdx]
  11   } else if (oldStartVNode.key === newEndVNode.key) {
  12     // 步骤三：oldStartVNode 和 newEndVNode 比较
  13   } else if (oldEndVNode.key === newStartVNode.key) {
  14     // 步骤四：oldEndVNode 和 newStartVNode 比较
  15     patch(oldEndVNode, newStartVNode, container)
  16     insert(oldEndVNode.el, container, oldStartVNode.el)
  17     oldEndVNode = oldChildren[--oldEndIdx]
  18     newStartVNode = newChildren[++newStartIdx]
  19   }
  20 }
  ```

　　在这一轮更新完成之后，新旧两组子节点与真实 DOM 节点的状态如图 10-8 所示。

![图 10-8](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/071.jpg)

**图 10-8　新旧两组子节点以及真实 DOM 节点的状态**

　　真实 DOM 的顺序相比上一轮没有变化，因为在这一轮的比较中没有对 DOM 节点进行移动，只是对 `p-3` 节点打补丁。接下来，我们再根据图 10-8 所示的状态执行下一轮的比较。

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-2`，看看它们是否相同。由于两者的 `key` 值不同，不可复用，因此什么都不做。
- 第二步：比较旧的一组子节点中的尾部节点 `p-2` 与新的一组子节点中的尾部节点 `p-1`，看看它们是否相同，由于两者的 `key` 值不同，不可复用，因此什么都不做。
- 第三步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的尾部节点 `p-1`。两者的 `key` 值相同，可以复用。

　　在第三步的比较中，我们找到了相同的节点，这说明：**节点** `p-1` **原本是头部节点，但在新的顺序中，它变成了尾部节点**。因此，我们需要将节点 `p-1` 对应的真实 DOM 移动到旧的一组子节点的尾部节点 `p-2` 所对应的真实 DOM 后面，同时还需要更新相应的索引到下一个位置，如图 10-9 所示。

![图 10-9](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/072.jpg)

**图 10-9　新旧两组子节点以及真实 DOM 节点的状态**

　　这一步的代码实现如下：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   if (oldStartVNode.key === newStartVNode.key) {
03   } else if (oldEndVNode.key === newEndVNode.key) {
04     patch(oldEndVNode, newEndVNode, container)
05     oldEndVNode = oldChildren[--oldEndIdx]
06     newEndVNode = newChildren[--newEndIdx]
07   } else if (oldStartVNode.key === newEndVNode.key) {
08     // 调用 patch 函数在 oldStartVNode 和 newEndVNode 之间打补丁
09     patch(oldStartVNode, newEndVNode, container)
10     // 将旧的一组子节点的头部节点对应的真实 DOM 节点 oldStartVNode.el 移动到
11     // 旧的一组子节点的尾部节点对应的真实 DOM 节点后面
12     insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
13     // 更新相关索引到下一个位置
14     oldStartVNode = oldChildren[++oldStartIdx]
15     newEndVNode = newChildren[--newEndIdx]
16   } else if (oldEndVNode.key === newStartVNode.key) {
17     patch(oldEndVNode, newStartVNode, container)
18     insert(oldEndVNode.el, container, oldStartVNode.el)
19
20     oldEndVNode = oldChildren[--oldEndIdx]
21     newStartVNode = newChildren[++newStartIdx]
22   }
23 }
```

　　如上面的代码所示，如果旧的一组子节点的头部节点与新的一组子节点的尾部节点匹配，则说明该旧节点所对应的真实 DOM 节点需要移动到尾部。因此，我们需要获取当前尾部节点的下一个兄弟节点作为锚点，即 `oldEndVNode.el.nextSibling`。最后，更新相关索引到下一个位置。

　　通过图 10-9 可知，此时，新旧两组子节点的头部索引和尾部索引发生重合，但仍然满足循环的条件，所以还会进行下一轮的更新。而在接下来的这一轮的更新中，更新步骤也发生了重合。

> 　　第一步：比较旧的一组子节点中的头部节点 `p-2` 与新的一组子节点中的头部节点 `p-2`。发现两者 `key` 值相同，可以复用。但两者在新旧两组子节点中都是头部节点，因此不需要移动，只需要调用 `patch` 函数进行打补丁即可。

　　代码实现如下：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   if (oldStartVNode.key === newStartVNode.key) {
03     // 调用 patch 函数在 oldStartVNode 与 newStartVNode 之间打补丁
04     patch(oldStartVNode, newStartVNode, container)
05     // 更新相关索引，指向下一个位置
06     oldStartVNode = oldChildren[++oldStartIdx]
07     newStartVNode = newChildren[++newStartIdx]
08   } else if (oldEndVNode.key === newEndVNode.key) {
09     patch(oldEndVNode, newEndVNode, container)
10     oldEndVNode = oldChildren[--oldEndIdx]
11     newEndVNode = newChildren[--newEndIdx]
12   } else if (oldStartVNode.key === newEndVNode.key) {
13     patch(oldStartVNode, newEndVNode, container)
14     insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
15
16     oldStartVNode = oldChildren[++oldStartIdx]
17     newEndVNode = newChildren[--newEndIdx]
18   } else if (oldEndVNode.key === newStartVNode.key) {
19     patch(oldEndVNode, newStartVNode, container)
20     insert(oldEndVNode.el, container, oldStartVNode.el)
21
22     oldEndVNode = oldChildren[--oldEndIdx]
23     newStartVNode = newChildren[++newStartIdx]
24   }
25 }
```

　　在这一轮更新之后，新旧两组子节点与真实 DOM 节点的状态如图 10-10 所示。

![图 10-10 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/073.jpg)

**图 10-10　新旧两组子节点以及真实 DOM 节点的状态**

　　此时，真实 DOM 节点的顺序与新的一组子节点的顺序相同了：`p-4`、`p-2`、`p-1`、`p-3`。另外，在这一轮更新完成之后，索引 `newStartIdx` 和索引 `oldStartIdx` 的值都小于 `newEndIdx` 和 `oldEndIdx`，所以循环终止，双端 Diff 算法执行完毕。



### 10.2　双端比较的优势

　　理解了双端比较的原理之后，我们来看看与简单 Diff 算法相比，双端 Diff 算法具有怎样的优势。我们拿第 9 章的例子来看，如图 10-11 所示。

![图 10-11](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/074.jpg)

**图 10-11　新旧两组子节点**

　　图 10-11 给出了新旧两组子节点的节点顺序。当使用简单 Diff 算法对此例进行更新时，会发生两次 DOM 移动操作，如图 10-12 所示。

![图 10-12](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/075.jpg)

**图 10-12　两次 DOM 移动**

　　如果使用双端 Diff 算法对此例进行更新，会有怎样的表现呢？接下来，我们就以双端比较的思路来完成此例的更新，看一看双端 Diff 算法能否减少 DOM 移动操作次数。

　　图 10-13 给出了算法执行之前新旧两组子节点与真实 DOM 节点的状态。

![图 10-13](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/076.jpg)

**图 10-13　新旧两组子节点与真实 DOM 节点的状态**

　　接下来，我们按照双端比较的步骤执行更新。

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-3`，两者 `key` 值不同，不可复用。
- 第二步：比较旧的一组子节点中的尾部节点 `p-3` 与新的一组子节点中的尾部节点 `p-2`，两者 `key` 值不同，不可复用。
- 第三步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的尾部节点 `p-2`，两者 `key` 值不同，不可复用。
- 第四步：比较旧的一组子节点中的尾部节点 `p-3` 与新的一组子节点中的头部节点 `p-3`，发现可以进行复用。

　　可以看到，在第四步的比较中，我们找到了可复用的节点 `p-3`。该节点原本处于所有子节点的尾部，但在新的一组子节点中它处于头部。因此，只需要让节点 `p-3` 对应的真实 DOM 变成新的头部节点即可。在这一步移动操作之后，新旧两组子节点以及真实 DOM 节点的状态如图 10-14 所示。

![图 10-14](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/077.jpg)

**图 10-14　新旧两组子节点与真实 DOM 节点的状态**

　　观察图 10-14 能够发现，在这一轮比较过后，真实 DOM 节点的顺序已经与新的一组子节点的顺序一致了。换句话说，我们完成了更新，不过算法仍然会继续执行。开始下一轮的比较。

> 　　第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-1`，两者的 `key` 值相同，可以复用。但由于两者都处于头部，因此不需要移动，只需要打补丁即可。

　　在这一轮比较过后，新旧两组子节点与真实 DOM 节点的状态如图 10-15 所示。

![图 10-15](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/078.jpg)

**图 10-15　新旧两组子节点与真实 DOM 节点的状态**

　　此时，双端 Diff 算法仍然没有停止，开始新一轮的比较。

> 　　第一步：比较旧的一组子节点中的头部节点 `p-2` 与新的一组子节点中的头部节点 `p-2`，两者的 `key` 值相同，可以复用。但由于两者都处于头部，因此不需要移动，只需要打补丁即可。

　　在这一轮比较过后，新旧两组子节点与真实 DOM 节点的状态如图 10-16 所示。

![图 10-16](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/079.jpg)

**图 10-16　新旧两组子节点与真实 DOM 节点的状态**

　　到这一步后，索引 `newStartIdx` 和 `oldStartIdx` 的值比索引 `newEndIdx` 和 `oldEndIdx` 的值大，于是更新结束。可以看到，对于同样的例子，采用简单 Diff 算法需要两次 DOM 移动操作才能完成更新，而使用双端 Diff 算法只需要一次 DOM 移动操作即可完成更新。



### 10.3　非理想状况的处理方式

　　在上一节的讲解中，我们用了一个比较理想的例子。我们知道，双端 Diff 算法的每一轮比较的过程都分为四个步骤。在上一节的例子中，每一轮比较都会命中四个步骤中的一个，这是非常理想的情况。但实际上，并非所有情况都这么理想，如图 10-17 所示。

![图 10-17](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/080.jpg)

**图 10-17　第一轮比较都无法命中**

　　在这个例子中，新旧两组子节点的顺序如下。

- 旧的一组子节点：`p-1`、`p-2`、`p-3`、`p-4`。
- 新的一组子节点：`p-2`、`p-4`、`p-1`、`p-3`。

　　当我们尝试按照双端 Diff 算法的思路进行第一轮比较时，会发现无法命中四个步骤中的任何一步。

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-2`，不可复用。
- 第二步：比较旧的一组子节点中的尾部节点 `p-4` 与新的一组子节点中的尾部节点 `p-3`，不可复用。
- 第三步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的尾部节点 `p-3`，不可复用。
- 第四步：比较旧的一组子节点中的尾部节点 `p-4` 与新的一组子节点中的头部节点 `p-2`，不可复用。

　　在四个步骤的比较过程中，都无法找到可复用的节点，应该怎么办呢？这时，我们只能通过增加额外的处理步骤来处理这种非理想情况。既然两个头部和两个尾部的四个节点中都没有可复用的节点，那么我们就尝试看看非头部、非尾部的节点能否复用。具体做法是，拿新的一组子节点中的头部节点去旧的一组子节点中寻找，如下面的代码所示：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   if (oldStartVNode.key === newStartVNode.key) {
03     // 省略部分代码
04   } else if (oldEndVNode.key === newEndVNode.key) {
05     // 省略部分代码
06   } else if (oldStartVNode.key === newEndVNode.key) {
07     // 省略部分代码
08   } else if (oldEndVNode.key === newStartVNode.key) {
09     // 省略部分代码
10   } else {
11     // 遍历旧的一组子节点，试图寻找与 newStartVNode 拥有相同 key 值的节点
12     // idxInOld 就是新的一组子节点的头部节点在旧的一组子节点中的索引
13     const idxInOld = oldChildren.findIndex(
14       node => node.key === newStartVNode.key
15     )
16   }
17 }
```

　　在上面这段代码中，我们遍历旧的一组子节点，尝试在其中寻找与新的一组子节点的头部节点具有相同 `key` 值的节点，并将该节点在旧的一组子节点中的索引存储到变量 `idxInOld` 中。这么做的目的是什么呢？想要搞清楚这个问题，本质上需要我们先搞清楚：在旧的一组子节点中，找到与新的一组子节点的头部节点具有相同 `key` 值的节点意味着什么？如图 10-18 所示。

![图 10-18](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/081.jpg)

**图 10-18　在旧子节点中寻找可复用节点**

　　观察图 10-18，当我们拿新的一组子节点的头部节点 `p-2` 去旧的一组子节点中查找时，会在索引为 `1` 的位置找到可复用的节点。这意味着，节点 `p-2` 原本不是头部节点，但在更新之后，它应该变成头部节点。所以我们需要将节点 `p-2` 对应的真实 DOM 节点移动到当前旧的一组子节点的头部节点 `p-1` 所对应的真实 DOM 节点之前。具体实现如下：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   if (oldStartVNode.key === newStartVNode.key) {
03     // 省略部分代码
04   } else if (oldEndVNode.key === newEndVNode.key) {
05     // 省略部分代码
06   } else if (oldStartVNode.key === newEndVNode.key) {
07     // 省略部分代码
08   } else if (oldEndVNode.key === newStartVNode.key) {
09     // 省略部分代码
10   } else {
11     // 遍历旧 children，试图寻找与 newStartVNode 拥有相同 key 值的元素
12     const idxInOld = oldChildren.findIndex(
13       node => node.key === newStartVNode.key
14     )
15     // idxInOld 大于 0，说明找到了可复用的节点，并且需要将其对应的真实 DOM 移动到头部
16     if (idxInOld > 0) {
17       // idxInOld 位置对应的 vnode 就是需要移动的节点
18       const vnodeToMove = oldChildren[idxInOld]
19       // 不要忘记除移动操作外还应该打补丁
20       patch(vnodeToMove, newStartVNode, container)
21       // 将 vnodeToMove.el 移动到头部节点 oldStartVNode.el 之前，因此使用后者作为锚点
22       insert(vnodeToMove.el, container, oldStartVNode.el)
23       // 由于位置 idxInOld 处的节点所对应的真实 DOM 已经移动到了别处，因此将其设置为 undefined
24       oldChildren[idxInOld] = undefined
25       // 最后更新 newStartIdx 到下一个位置
26       newStartVNode = newChildren[++newStartIdx]
27     }
28   }
29 }
```

　　在上面这段代码中，首先判断 `idxInOld` 是否大于 `0`。如果条件成立，则说明找到了可复用的节点，然后将该节点对应的真实 DOM 移动到头部。为此，我们先要获取需要移动的节点，这里的 `oldChildren[idxInOld]` 所指向的节点就是需要移动的节点。在移动节点之前，不要忘记调用 `patch` 函数进行打补丁。接着，调用 `insert` 函数，并以现在的头部节点对应的真实 DOM 节点 `oldStartVNode.el` 作为锚点参数来完成节点的移动操作。当节点移动完成后，还有两步工作需要做。

- 由于处于 `idxInOld` 处的节点已经处理过了（对应的真实 DOM 移到了别处），因此我们应该将 `oldChildren[idxInOld]` 设置为 `undefined`。
- 新的一组子节点中的头部节点已经处理完毕，因此将 `newStartIdx` 前进到下一个位置。

　　经过上述两个步骤的操作后，新旧两组子节点以及真实 DOM 节点的状态如图 10-19 所示。

![图 10-19 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/082.jpg)

**图 10-19　新旧两组子节点以及真实 DOM 节点的状态**

　　此时，真实 DOM 的顺序为：`p-2`、`p-1`、`p-3`、`p-4`。接着，双端 Diff 算法会继续进行，如图 10-20 所示。

![图 10-20](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/083.jpg)

**图 10-20　新旧两组子节点以及真实 DOM 节点的状态**

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-4`，两者 `key` 值不同，不可复用。
- 第二步：比较旧的一组子节点中的尾部节点 `p-4` 与新的一组子节点中的尾部节点 `p-3`，两者 `key` 值不同，不可复用。
- 第三步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的尾部节点 `p-3`，两者 `key` 值不同，不可复用。
- 第四步：比较旧的一组子节点中的尾部节点 `p-4` 与新的一组子节点中的头部节点 `p-4`，两者的 `key` 值相同，可以复用。

　　在这一轮比较的第四步中，我们找到了可复用的节点。因此，按照双端 Diff 算法的逻辑移动真实 DOM，即把节点 `p-4` 对应的真实 DOM 移动到旧的一组子节点中头部节点 `p-1` 所对应的真实 DOM 前面，如图 10-21 所示。

![图 10-21](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/084.jpg)

**图 10-21　移动节点 `p-4`**

　　此时，真实 DOM 节点的顺序是：`p-2`、`p-4`、`p-1`、`p-3`。接着，开始下一轮的比较。

> 　　第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-1`，两者的 `key` 值相同，可以复用。

　　在这一轮比较中，第一步就找到了可复用的节点。由于两者都处于头部，所以不需要对真实 DOM 进行移动，只需要打补丁即可。在这一步操作过后，新旧两组子节点与真实 DOM 节点的状态如图 10-22 所示。

![图 10-22](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/085.jpg)

**图 10-22　新旧两组子节点与真实 DOM 节点的状态**

　　此时，真实 DOM 节点的顺序是：`p-2`、`p-4`、`p-1`、`p-3`。接着，进行下一轮的比较。需要注意的一点是，此时旧的一组子节点的头部节点是 `undefined`。这说明该节点已经被处理过了，因此不需要再处理它了，直接跳过即可。为此，我们需要补充这部分逻辑的代码，具体实现如下：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   // 增加两个判断分支，如果头尾部节点为 undefined，则说明该节点已经被处理过了，直接跳到下一个位置
03   if (!oldStartVNode) {
04     oldStartVNode = oldChildren[++oldStartIdx]
05   } else if (!oldEndVNode) {
06     oldEndVNode = oldChildren[--oldEndIdx]
07   } else if (oldStartVNode.key === newStartVNode.key) {
08     // 省略部分代码
09   } else if (oldEndVNode.key === newEndVNode.key) {
10     // 省略部分代码
11   } else if (oldStartVNode.key === newEndVNode.key) {
12     // 省略部分代码
13   } else if (oldEndVNode.key === newStartVNode.key) {
14     // 省略部分代码
15   } else {
16     const idxInOld = oldChildren.findIndex(
17       node => node.key === newStartVNode.key
18     )
19     if (idxInOld > 0) {
20       const vnodeToMove = oldChildren[idxInOld]
21       patch(vnodeToMove, newStartVNode, container)
22       insert(vnodeToMove.el, container, oldStartVNode.el)
23       oldChildren[idxInOld] = undefined
24       newStartVNode = newChildren[++newStartIdx]
25     }
26
27   }
28 }
```

　　观察上面的代码，在循环开始时，我们优先判断头部节点和尾部节点是否存在。如果不存在，则说明它们已经被处理过了，直接跳到下一个位置即可。在这一轮比较过后，新旧两组子节点与真实 DOM 节点的状态如图 10-23 所示。

![图 10-23 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/086.jpg)

**图 10-23　新旧两组子节点与真实 DOM 节点的状态**

　　现在，四个步骤又重合了，接着进行最后一轮的比较。

> 　　第一步：比较旧的一组子节点中的头部节点 `p-3` 与新的一组子节点中的头部节点 `p-3`，两者的 `key` 值相同，可以复用。

　　在第一步中找到了可复用的节点。由于两者都是头部节点，因此不需要进行 DOM 移动操作，直接打补丁即可。在这一轮比较过后，最终状态如图 10-24 所示。

![图 10-24](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/087.jpg)

**图 10-24　新旧两组子节点与真实 DOM 节点的状态**

　　这时，满足循环停止的条件，于是更新完成。最终，真实 DOM 节点的顺序与新的一组子节点的顺序一致，都是：`p-2`、`p-4`、`p-1`、`p-3`。



### 10.4　添加新元素

　　在 10.3 节中，我们讲解了非理想情况的处理，即在一轮比较过程中，不会命中四个步骤中的任何一步。这时，我们会拿新的一组子节点中的头部节点去旧的一组子节点中寻找可复用的节点，然而并非总能找得到，如图 10-25 的例子所示。

![图 10-25](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/088.jpg)

**图 10-25　新增节点的情况**

　　在这个例子中，新旧两组子节点的顺序如下。

- 旧的一组子节点：`p-1`、`p-2`、`p-3`。
- 新的一组子节点：`p-4`、`p-1`、`p-3`、`p-2`。

　　首先，我们尝试进行第一轮比较，发现在四个步骤的比较中都找不到可复用的节点。于是我们尝试拿新的一组子节点中的头部节点 `p-4` 去旧的一组子节点中寻找具有相同 `key` 值的节点，但在旧的一组子节点中根本就没有 `p-4` 节点，如图 10-26 所示。

![图 10-26](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/089.jpg)

**图 10-26　在旧的一组子节点中找不到可复用的节点**

　　这说明节点 `p-4` 是一个新增节点，我们应该将它挂载到正确的位置。那么应该挂载到哪里呢？很简单，因为节点 `p-4` 是新的一组子节点中的头部节点，所以只需要将它挂载到当前头部节点之前即可。“当前”头部节点指的是，旧的一组子节点中的头部节点所对应的真实 DOM 节点 `p-1`。下面是用来完成挂载操作的代码：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   // 增加两个判断分支，如果头尾部节点为 undefined，则说明该节点已经被处理过了，直接跳到下一个位置
03   if (!oldStartVNode) {
04     oldStartVNode = oldChildren[++oldStartIdx]
05   } else if (!oldEndVNode) {
06     oldEndVNode = newChildren[--oldEndIdx]
07   } else if (oldStartVNode.key === newStartVNode.key) {
08     // 省略部分代码
09   } else if (oldEndVNode.key === newEndVNode.key) {
10     // 省略部分代码
11   } else if (oldStartVNode.key === newEndVNode.key) {
12     // 省略部分代码
13   } else if (oldEndVNode.key === newStartVNode.key) {
14     // 省略部分代码
15   } else {
16     const idxInOld = oldChildren.findIndex(
17       node => node.key === newStartVNode.key
18     )
19     if (idxInOld > 0) {
20       const vnodeToMove = oldChildren[idxInOld]
21       patch(vnodeToMove, newStartVNode, container)
22       insert(vnodeToMove.el, container, oldStartVNode.el)
23       oldChildren[idxInOld] = undefined
24     } else {
25       // 将 newStartVNode 作为新节点挂载到头部，使用当前头部节点 oldStartVNode.el 作为锚点
26       patch(null, newStartVNode, container, oldStartVNode.el)
27     }
28     newStartVNode = newChildren[++newStartIdx]
29   }
30 }
```

　　如上面的代码所示，当条件 `idxInOld > 0` 不成立时，说明 `newStartVNode` 节点是全新的节点。又由于 `newStartVNode` 节点是头部节点，因此我们应该将其作为新的头部节点进行挂载。所以，在调用 `patch` 函数挂载节点时，我们使用 `oldStartVNode.el` 作为锚点。在这一步操作完成之后，新旧两组子节点以及真实 DOM 节点的状态如图 10-27 所示。

![图 10-27 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/090.jpg)

**图 10-27　新旧两组子节点以及真实 DOM 节点的状态**

　　当新节点 `p-4` 挂载完成后，会进行后续的更新，直到全部更新完成为止。但这样就完美了吗？答案是否定的，我们再来看另外一个例子，如图 10-28 所示。

![图 10-28](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/091.jpg)

**图 10-28　新旧两组子节点以及真实 DOM 节点的状态**

　　这个例子与上一个的例子的不同之处在于，我们调整了新的一组子节点的顺序：`p-4`、`p-1`、`p-2`、`p-3`。下面我们按照双端 Diff 算法的思路来执行更新，看看会发生什么。

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-4`，两者的 `key` 值不同，不可以复用。
- 第二步：比较旧的一组子节点中的尾部节点 `p-3` 与新的一组子节点中的尾部节点 `p-3`，两者的 `key` 值相同，可以复用。

　　在第二步中找到了可复用的节点，因此进行更新。更新后的新旧两组子节点以及真实 DOM 节点的状态如图 10-29 所示。

![图 10-29 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/092.jpg)

**图 10-29　新旧两组子节点以及真实 DOM 节点的状态**

　　接着进行下一轮的比较。

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-4`，两者的 `key` 值不同，不可以复用。
- 第二步：比较旧的一组子节点中的尾部节点 `p-2` 与新的一组子节点中的尾部节点 `p-2`，两者的 `key` 值相同，可以复用。

　　我们又在第二步找到了可复用的节点，于是再次进行更新。更新后的新旧两组子节点以及真实 DOM 节点的状态如图 10-30 所示。

![图 10-30](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/093.jpg)

**图 10-30　新旧两组子节点以及真实 DOM 节点的状态**

　　接着，进行下一轮的更新。

- 第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-4`，两者的 `key` 值不同，不可以复用。
- 第二步：比较旧的一组子节点中的尾部节点 `p-1` 与新的一组子节点中的尾部节点 `p-1`，两者的 `key` 值相同，可以复用。

　　还是在第二步找到了可复用的节点，再次进行更新。更新后的新旧两组子节点以及真实 DOM 节点的状态如图 10-31 所示。

![图 10-31](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/094.jpg)

**图 10-31　新旧两组子节点以及真实 DOM 节点的状态**

　　当这一轮更新完毕后，由于变量 `oldStartIdx` 的值大于 `oldEndIdx` 的值，满足更新停止的条件，因此更新停止。但通过观察可知，节点 `p-4` 在整个更新过程中被遗漏了，没有得到任何处理，这说明我们的算法是有缺陷的。为了弥补这个缺陷，我们需要添加额外的处理代码，如下所示：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   // 省略部分代码
03 }
04
05 // 循环结束后检查索引值的情况，
06 if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
07   // 如果满足条件，则说明有新的节点遗留，需要挂载它们
08   for (let i = newStartIdx; i <= newEndIdx; i++) {
09     const anchor = newChildren[newEndIdx + 1] ? newChildren[newEndIdx + 1].el : null;
10     patch(null, newChildren[i], container, anchor);
11   }
12 }
```

　　我们在 `while` 循环结束后增加了一个 `if` 条件语句，检查四个索引值的情况。根据图 10-31 可知，如果条件 `oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx` 成立，说明新的一组子节点中有遗留的节点需要作为新节点挂载。哪些节点是新节点呢？索引值位于 `newStartIdx` 和 `newEndIdx` 这个区间内的节点都是新节点。于是我们开启一个 `for` 循环来遍历这个区间内的节点并逐一挂载。挂载时的锚点仍然使用当前的头部节点 `oldStartVNode.el`，这样就完成了对新增元素的处理。



### 10.5　移除不存在的元素

　　解决了新增节点的问题后，我们再来讨论关于移除元素的情况，如图 10-32 的例子所示。

![图 10-32](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/095.jpg)

**图 10-32　移除节点的情况**

　　在这个例子中，新旧两组子节点的顺序如下。

- 旧的一组子节点：`p-1`、`p-2`、`p-3`。
- 新的一组子节点：`p-1`、`p-3`。

　　可以看到，在新的一组子节点中 `p-2` 节点已经不存在了。为了搞清楚应该如何处理节点被移除的情况，我们还是按照双端 Diff 算法的思路执行更新。

> 　　第一步：比较旧的一组子节点中的头部节点 `p-1` 与新的一组子节点中的头部节点 `p-1`，两者的 `key` 值相同，可以复用。

　　在第一步的比较中找到了可复用的节点，于是执行更新。在这一轮比较过后，新旧两组子节点以及真实 DOM 节点的状态如图 10-33 所示。

![图 10-33](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/096.jpg)

**图 10-33　新旧两组子节点以及真实 DOM 节点的状态**

　　接着，执行下一轮更新。

- 第一步：比较旧的一组子节点中的头部节点 `p-2` 与新的一组子节点中的头部节点 `p-3`，两者的 `key` 值不同，不可以复用。
- 第二步：比较旧的一组子节点中的尾部节点 `p-3` 与新的一组子节点中的尾部节点 `p-3`，两者的 `key` 值相同，可以复用。

　　在第二步中找到了可复用的节点，于是进行更新。更新后的新旧两组子节点以及真实 DOM 节点的状态如图 10-34 所示。

![图 10-34](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/097.jpg)

**图 10-34　新旧两组子节点以及真实 DOM 节点的状态**

　　此时变量 `newStartIdx` 的值大于变量 `newEndIdx` 的值，满足更新停止的条件，于是更新结束。但观察图 10-34 可知，旧的一组子节点中存在未被处理的节点，应该将其移除。因此，我们需要增加额外的代码来处理它，如下所示：

```
01 while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
02   // 省略部分代码
03 }
04
05 if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
06   // 添加新节点
07   // 省略部分代码
08 } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
09   // 移除操作
10   for (let i = oldStartIdx; i <= oldEndIdx; i++) {
11     unmount(oldChildren[i])
12   }
13 }
```

　　与处理新增节点类似，我们在 `while` 循环结束后又增加了一个 `else...if` 分支，用于卸载已经不存在的节点。由图 10-34 可知，索引值位于 `oldStartIdx` 和 `oldEndIdx` 这个区间内的节点都应该被卸载，于是我们开启一个 `for` 循环将它们逐一卸载。



### 10.6　总结

　　本章我们介绍了双端 Diff 算法的原理及其优势。顾名思义，双端 Diff 算法指的是，在新旧两组子节点的四个端点之间分别进行比较，并试图找到可复用的节点。相比简单 Diff 算法，双端 Diff 算法的优势在于，对于同样的更新场景，执行的 DOM 移动操作次数更少。



## 第 11 章　快速 Diff 算法

### 11.1　相同的前置元素和后置元素

　　不同于简单 Diff 算法和双端 Diff 算法，快速 Diff 算法包含预处理步骤，这其实是借鉴了纯文本 Diff 算法的思路。在纯文本 Diff 算法中，存在对两段文本进行预处理的过程。例如，在对两段文本进行 Diff 之前，可以先对它们进行全等比较：

```js
01 if (text1 === text2) return
```

　　这也称为快捷路径。如果两段文本全等，那么就无须进入核心 Diff 算法的步骤了。除此之外，预处理过程还会处理两段文本相同的前缀和后缀。假设有如下两段文本：

```
01 TEXT1: I use vue for app development
02 TEXT2: I use react for app development
```

　　通过肉眼可以很容易发现，这两段文本的头部和尾部分别有一段相同的内容，如图 11-2 所示。

![图 11-2](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/099.jpg)

**图 11-2　文本预处理**

　　图 11-2 突出显示了 `TEXT1` 和 `TEXT2` 中相同的内容。对于内容相同的问题，是不需要进行核心 Diff 操作的。因此，对于 `TEXT1` 和 `TEXT2` 来说，真正需要进行 Diff 操作的部分是：

```
01 TEXT1: vue
02 TEXT2: react
```

　　这实际上是简化问题的一种方式。这么做的好处是，在特定情况下我们能够轻松地判断文本的插入和删除，例如：

```
01 TEXT1: I like you
02 TEXT2: I like you too
```

经过预处理，去掉这两段文本中相同的前缀内容和后缀内容之后，它将变成：

```
01 TEXT1:
02 TEXT2: too
```

　　可以看到，经过预处理后，`TEXT1` 的内容为空。这说明 `TEXT2` 在 `TEXT1` 的基础上增加了字符串 `too`。相反，我们还可以将这两段文本的位置互换：

```
01 TEXT1: I like you too
02 TEXT2: I like you
```

　　这两段文本经过预处理后将变成：

```
01 TEXT1: too
02 TEXT2:
```

　　由此可知，`TEXT2` 是在 `TEXT1` 的基础上删除了字符串 `too`。

　　快速 Diff 算法借鉴了纯文本 Diff 算法中预处理的步骤。以图 11-3 给出的两组子节点为例。

![图 11-3 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/100.jpg)

**图 11-3　新旧两组子节点**

　　这两组子节点的顺序如下。

- 旧的一组子节点：`p-1`、`p-2`、`p-3`。
- 新的一组子节点：`p-1`、`p-4`、`p-2`、`p-3`。

　　通过观察可以发现，两组子节点具有相同的前置节点 `p-1`，以及相同的后置节点 `p-2` 和 `p-3`，如图 11-4 所示。

![图 11-4 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/101.jpg)

**图 11-4　相同的前置节点和后置节点**

　　对于相同的前置节点和后置节点，由于它们在新旧两组子节点中的相对位置不变，所以我们无须移动它们，但仍然需要在它们之间打补丁。

　　对于前置节点，我们可以建立索引 `j`，其初始值为 `0`，用来指向两组子节点的开头，如图 11-5 所示。

![图 11-5](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/102.jpg)

**图 11-5　建立索引 j，指向两组子节点的开头**

　　然后开启一个 `while` 循环，让索引 `j` 递增，直到遇到不相同的节点为止，如下面 `patchKeyedChildren` 函数的代码所示：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 处理相同的前置节点
05   // 索引 j 指向新旧两组子节点的开头
06   let j = 0
07   let oldVNode = oldChildren[j]
08   let newVNode = newChildren[j]
09   // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
10   while (oldVNode.key === newVNode.key) {
11     // 调用 patch 函数进行更新
12     patch(oldVNode, newVNode, container)
13     // 更新索引 j，让其递增
14     j++
15     oldVNode = oldChildren[j]
16     newVNode = newChildren[j]
17   }
18
19 }
```

　　在上面这段代码中，我们使用 `while` 循环查找所有相同的前置节点，并调用 `patch` 函数进行打补丁，直到遇到 `key` 值不同的节点为止。这样，我们就完成了对前置节点的更新。在这一步更新操作过后，新旧两组子节点的状态如图 11-6 所示。

![图 11-6 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/103.jpg)

**图 11-6　处理完前置节点后的状态**

　　这里需要注意的是，当 `while` 循环终止时，索引 `j` 的值为 `1`。接下来，我们需要处理相同的后置节点。由于新旧两组子节点的数量可能不同，所以我们需要两个索引 `newEnd` 和 `oldEnd`，分别指向新旧两组子节点中的最后一个节点，如图 11-7 所示。

![图 11-7](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/104.jpg)

**图 11-7　建立索引，指向两组子节点的最后一个节点**

　　然后，再开启一个 `while` 循环，并从后向前遍历这两组子节点，直到遇到 `key` 值不同的节点为止，如下面的代码所示：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   let j = 0
06   let oldVNode = oldChildren[j]
07   let newVNode = newChildren[j]
08   while (oldVNode.key === newVNode.key) {
09     patch(oldVNode, newVNode, container)
10     j++
11     oldVNode = oldChildren[j]
12     newVNode = newChildren[j]
13   }
14
15   // 更新相同的后置节点
16   // 索引 oldEnd 指向旧的一组子节点的最后一个节点
17   let oldEnd = oldChildren.length - 1
18   // 索引 newEnd 指向新的一组子节点的最后一个节点
19   let newEnd = newChildren.length - 1
20
21   oldVNode = oldChildren[oldEnd]
22   newVNode = newChildren[newEnd]
23
24   // while 循环从后向前遍历，直到遇到拥有不同 key 值的节点为止
25   while (oldVNode.key === newVNode.key) {
26     // 调用 patch 函数进行更新
27     patch(oldVNode, newVNode, container)
28     // 递减 oldEnd 和 nextEnd
29     oldEnd--
30     newEnd--
31     oldVNode = oldChildren[oldEnd]
32     newVNode = newChildren[newEnd]
33   }
34
35 }
```

　　与处理相同的前置节点一样，在 `while` 循环内，需要调用 `patch` 函数进行打补丁，然后递减两个索引 `oldEnd`、`newEnd` 的值。在这一步更新操作过后，新旧两组子节点的状态如图 11-8 所示。

![图 11-8](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/105.jpg)

**图 11-8　处理完后置节点后的状态**

　　由图 11-8 可知，当相同的前置节点和后置节点被处理完毕后，旧的一组子节点已经全部被处理了，而在新的一组子节点中，还遗留了一个未被处理的节点 `p-4`。其实不难发现，节点 `p-4` 是一个新增节点。那么，如何用程序得出“节点 `p-4` 是新增节点”这个结论呢？这需要我们观察三个索引 `j`、`newEnd` 和 `oldEnd` 之间的关系。

- 条件一 `oldEnd < j` 成立：说明在预处理过程中，所有旧子节点都处理完毕了。
- 条件二 `newEnd >= j` 成立：说明在预处理过后，在新的一组子节点中，仍然有未被处理的节点，而这些遗留的节点将被视作**新增节点**。

　　如果条件一和条件二同时成立，说明在新的一组子节点中，存在遗留节点，且这些节点都是新增节点。因此我们需要将它们挂载到正确的位置，如图 11-9 所示。

![图 11-9](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/106.jpg)

**图 11-9　新增节点的情况**

　　在新的一组子节点中，索引值处于 `j` 和 `newEnd` 之间的任何节点都需要作为新的子节点进行挂载。那么，应该怎样将这些节点挂载到正确位置呢？这就要求我们必须找到正确的锚点元素。观察图 11-9 中新的一组子节点可知，新增节点应该挂载到节点 `p-2` 所对应的真实 DOM 前面。所以，节点 `p-2` 对应的真实 DOM 节点就是挂载操作的锚点元素。有了这些信息，我们就可以给出具体的代码实现了，如下所示：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   // 省略部分代码
06
07   // 更新相同的后置节点
08   // 省略部分代码
09
10   // 预处理完毕后，如果满足如下条件，则说明从 j --> newEnd 之间的节点应作为新节点插入
11   if (j > oldEnd && j <= newEnd) {
12     // 锚点的索引
13     const anchorIndex = newEnd + 1
14     // 锚点元素
15     const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
16     // 采用 while 循环，调用 patch 函数逐个挂载新增节点
17     while (j <= newEnd) {
18       patch(null, newChildren[j++], container, anchor)
19     }
20   }
21
22 }
```

　　在上面这段代码中，首先计算锚点的索引值（即 `anchorIndex`）为 `newEnd + 1`。如果小于新的一组子节点的数量，则说明锚点元素在新的一组子节点中，所以直接使用 `newChildren[anchorIndex].el` 作为锚点元素；否则说明索引 `newEnd` 对应的节点已经是尾部节点了，这时无须提供锚点元素。有了锚点元素之后，我们开启了一个 `while` 循环，用来遍历索引 `j` 和索引 `newEnd` 之间的节点，并调用 `patch` 函数挂载它们。

　　上面的案例展示了新增节点的情况，我们再来看看删除节点的情况，如图 11-10 所示。

![图 11-10](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/107.jpg)

**图 11-10　删除节点的情况**

　　在这个例子中，新旧两组子节点的顺序如下。

- 旧的一组子节点：`p-1`、`p-2`、`p-3`。
- 新的一组子节点：`p-1`、`p-3`。

　　我们同样使用索引 `j`、`oldEnd` 和 `newEnd` 进行标记，如图 11-11 所示。

![图 11-11 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/108.jpg)

**图 11-11　在删除节点的情况下，各个索引的关系**

　　接着，对相同的前置节点进行预处理，处理后的状态如图 11-12 所示。

![图 11-12](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/109.jpg)

**图 11-12　处理完前置节点后，各个索引的关系**

　　然后，对相同的后置节点进行预处理，处理后的状态如图 11-13 所示。

![图 11-13 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/110.jpg)

**图 11-13　处理完后置节点后，各个索引的关系**

　　由图 11-13 可知，当相同的前置节点和后置节点全部被处理完毕后，新的一组子节点已经全部被处理完毕了，而旧的一组子节点中遗留了一个节点 `p-2`。这说明，应该卸载节点 `p-2`。实际上，遗留的节点可能有多个，如图 11-14 所示。

![图 11-14 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/111.jpg)

**图 11-14　遗留的节点可能有多个**

　　索引 `j` 和索引 `oldEnd` 之间的任何节点都应该被卸载，具体实现如下：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   // 省略部分代码
06
07   // 更新相同的后置节点
08   // 省略部分代码
09
10   if (j > oldEnd && j <= newEnd) {
11     // 省略部分代码
12   } else if (j > newEnd && j <= oldEnd) {
13     // j -> oldEnd 之间的节点应该被卸载
14     while (j <= oldEnd) {
15       unmount(oldChildren[j++])
16     }
17   }
18
19 }
```

　　在上面这段代码中，我们新增了一个 `else...if` 分支。当满足条件 `j > newEnd && j <= oldEnd` 时，则开启一个 `while` 循环，并调用 `unmount` 函数逐个卸载这些遗留节点。

### 11.2　判断是否需要进行 DOM 移动操作

　　在上一节中，我们讲解了快速 Diff 算法的预处理过程，即处理相同的前置节点和后置节点。但是，上一节给出的例子比较理想化，当处理完相同的前置节点或后置节点后，新旧两组子节点中总会有一组子节点全部被处理完毕。在这种情况下，只需要简单地挂载、卸载节点即可。但有时情况会比较复杂，如图 11-15 中给出的例子。

![图 11-15](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/112.jpg)

**图 11-15　复杂情况下的新旧两组子节点**

　　在这个例子中，新旧两组子节点的顺序如下。

- 旧的一组子节点：`p-1`、`p-2`、`p-3`、`p-4`、`p-6`、`p-5`。
- 新的一组子节点：`p-1`、`p-3`、`p-4`、`p-2`、`p-7`、`p-5`。

　　可以看到，与旧的一组子节点相比，新的一组子节点多出了一个新节点 `p-7`，少了一个节点 `p-6`。这个例子并不像上一节给出的例子那样理想化，我们无法简单地通过预处理过程完成更新。在这个例子中，相同的前置节点只有 `p-1`，而相同的后置节点只有 `p-5`，如图 11-16 所示。

![图 11-16](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/113.jpg)

**图 11-16　复杂情况下仅有少量相同的前置节点和后置节点**

图 11-17 给出了经过预处理后两组子节点的状态。

![图 11-17 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/114.jpg)

**图 11-17　处理完前置节点和后置节点后的状态**

　　可以看到，经过预处理后，无论是新的一组子节点，还是旧的一组子节点，都有部分节点未经处理。这时就需要我们进一步处理。怎么处理呢？其实无论是简单 Diff 算法，还是双端 Diff 算法，抑或本章介绍的快速 Diff 算法，它们都遵循同样的处理规则：

- 判断是否有节点需要移动，以及应该如何移动；
- 找出那些需要被添加或移除的节点。

　　所以接下来我们的任务就是，判断哪些节点需要移动，以及应该如何移动。观察图 11-17 可知，在这种非理想的情况下，当相同的前置节点和后置节点被处理完毕后，索引 `j`、`newEnd` 和 `oldEnd` 不满足下面两个条件中的任何一个：

- `j > oldEnd && j <= newEnd`
- `j > newEnd && j <= oldEnd`

　　因此，我们需要增加新的 `else` 分支来处理图 11-17 所示的情况，如下面的代码所示：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   // 省略部分代码
06
07   // 更新相同的后置节点
08   // 省略部分代码
09
10   if (j > oldEnd && j <= newEnd) {
11     // 省略部分代码
12   } else if (j > newEnd && j <= oldEnd) {
13     // 省略部分代码
14   } else {
15     // 增加 else 分支来处理非理想情况
16   }
17
18 }
```

　　后续的处理逻辑将会编写在这个 `else` 分支内。知道了在哪里编写处理代码，接下来我们讲解具体的处理思路。首先，我们需要构造一个数组 `source`，它的长度等于新的一组子节点在经过预处理之后剩余未处理节点的数量，并且 `source` 中每个元素的初始值都是 `-1`，如图 11-18 所示。

![图 11-18](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/115.jpg)

**图 11-18　构造 `source` 数组**

　　我们可以通过下面的代码完成 `source` 数组的构造：

```js
01 if (j > oldEnd && j <= newEnd) {
02   // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04   // 省略部分代码
05 } else {
06   // 构造 source 数组
07   // 新的一组子节点中剩余未处理节点的数量
08   const count = newEnd - j + 1
09   const source = new Array(count)
10   source.fill(-1)
11 }
```

　　如上面的代码所示。首先，我们需要计算新的一组子节点中剩余未处理节点的数量，即 `newEnd - j + 1`，然后创建一个长度与之相同的数组 `source`，最后使用 `fill` 函数完成数组的填充。那么，数组 `source` 的作用是什么呢？观察图 11-18 可以发现，数组 `source` 中的每一个元素分别与新的一组子节点中剩余未处理节点对应。实际上，`source` 数组将用来存储**新的一组子节点中的节点在旧的一组子节点中的位置索引，后面将会使用它计算出一个最长递增子序列，并用于辅助完成 DOM 移动的操作**，如图 11-19 所示。

![图 11-19](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/116.jpg)

**图 11-19　填充 `source` 数组**

　　图 11-19 展示了填充 `source` 数组的过程。由于 `source` 数组存储的是新子节点在旧的一组子节点中的位置索引，所以有：

- 新的一组子节点中的节点 `p-3` 在旧的一组子节点中的索引为 `2`，因此 `source` 数组的第一个元素值为 `2`；
- 新的一组子节点中的节点 `p-4` 在旧的一组子节点中的索引为 `3`，因此 `source` 数组的第二个元素值为 `3`；
- 新的一组子节点中的节点 `p-2` 在旧的一组子节点中的索引为 `1`，因此 `source` 数组的第三个元素值为 `1`；
- 新的一组子节点中的节点 `p-7` 比较特殊，因为在旧的一组子节点中没有与其 `key` 值相等的节点，所以 `source` 数组的第四个元素值保留原来的 `-1`。

　　我们可以通过两层 `for` 循环来完成 `source` 数组的填充工作，外层循环用于遍历旧的一组子节点，内层循环用于遍历新的一组子节点：

```js
01 if (j > oldEnd && j <= newEnd) {
02   // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04   // 省略部分代码
05 } else {
06   const count = newEnd - j + 1
07   const source = new Array(count)
08   source.fill(-1)
09
10   // oldStart 和 newStart 分别为起始索引，即 j
11   const oldStart = j
12   const newStart = j
13   // 遍历旧的一组子节点
14   for (let i = oldStart; i <= oldEnd; i++) {
15     const oldVNode = oldChildren[i]
16     // 遍历新的一组子节点
17     for (let k = newStart; k <= newEnd; k++) {
18       const newVNode = newChildren[k]
19       // 找到拥有相同 key 值的可复用节点
20       if (oldVNode.key === newVNode.key) {
21         // 调用 patch 进行更新
22         patch(oldVNode, newVNode, container)
23         // 最后填充 source 数组
24         source[k - newStart] = i
25       }
26     }
27   }
28 }
```

　　这里需要注意的是，由于数组 `source` 的索引是从 `0` 开始的，而未处理节点的索引未必从 `0` 开始，所以在填充数组时需要使用表达式 `k - newStart` 的值作为数组的索引值。外层循环的变量 `i` 就是当前节点在旧的一组子节点中的位置索引，因此直接将变量 `i` 的值赋给 `source[k - newStart]` 即可。

　　现在，`source` 数组已经填充完毕，我们后面会用到它。不过在进一步讲解之前，我们需要回头思考一下上面那段用于填充 `source` 数组的代码存在怎样的问题。这段代码中我们采用了两层嵌套的循环，其时间复杂度为 `O(n1 * n2)`，其中 `n1` 和 `n2` 为新旧两组子节点的数量，我们也可以使用 `O(n^2)` 来表示。当新旧两组子节点的数量较多时，两层嵌套的循环会带来性能问题。出于优化的目的，我们可以为新的一组子节点构建一张**索引表**，用来存储节点的 `key` 和节点位置索引之间的映射，如图 11-20 所示。

![图 11-20](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/117.jpg)

**图 11-20　使用索引表填充 `source` 数组**

　　有了索引表，我们就可以利用它快速地填充 `source` 数组，如下面的代码所示：

```js
01 if (j > oldEnd && j <= newEnd) {
02   // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04   // 省略部分代码
05 } else {
06   const count = newEnd - j + 1
07   const source = new Array(count)
08   source.fill(-1)
09
10   // oldStart 和 newStart 分别为起始索引，即 j
11   const oldStart = j
12   const newStart = j
13   // 构建索引表
14   const keyIndex = {}
15   for(let i = newStart; i <= newEnd; i++) {
16     keyIndex[newChildren[i].key] = i
17   }
18   // 遍历旧的一组子节点中剩余未处理的节点
19   for(let i = oldStart; i <= oldEnd; i++) {
20     oldVNode = oldChildren[i]
21     // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
22     const k = keyIndex[oldVNode.key]
23
24     if (typeof k !== 'undefined') {
25       newVNode = newChildren[k]
26       // 调用 patch 函数完成更新
27       patch(oldVNode, newVNode, container)
28       // 填充 source 数组
29       source[k - newStart] = i
30     } else {
31       // 没找到
32       unmount(oldVNode)
33     }
34   }
35 }
```

　　在上面这段代码中，同样使用了两个 `for` 循环，不过它们不再是嵌套的关系，所以能够将代码的时间复杂度降至 `O(n)`。其中，第一个 `for` 循环用来构建索引表，索引表存储的是节点的 `key` 值与节点在新的一组子节点中位置索引之间的映射，第二个 `for` 循环用来遍历旧的一组子节点。可以看到，我们拿旧子节点的 `key` 值去索引表 `keyIndex` 中查找该节点在新的一组子节点中的位置，并将查找结果存储到变量 `k` 中。如果 `k` 存在，说明该节点是可复用的，所以我们调用 `patch` 函数进行打补丁，并填充 `source` 数组；否则说明该节点已经不存在于新的一组子节点中了，这时我们需要调用 `unmount` 函数卸载它。

　　上述流程执行完毕后，`source` 数组已经填充完毕了。接下来我们应该思考的是，如何判断节点是否需要移动。实际上，快速 Diff 算法判断节点是否需要移动的方法与简单 Diff 算法类似，如下面的代码所示：

```js
01 if (j > oldEnd && j <= newEnd) {
02   // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04   // 省略部分代码
05 } else {
06   // 构造 source 数组
07   const count = newEnd - j + 1  // 新的一组子节点中剩余未处理节点的数量
08   const source = new Array(count)
09   source.fill(-1)
10
11   const oldStart = j
12   const newStart = j
13   // 新增两个变量，moved 和 pos
14   let moved = false
15   let pos = 0
16
17   const keyIndex = {}
18   for(let i = newStart; i <= newEnd; i++) {
19     keyIndex[newChildren[i].key] = i
20   }
21   for(let i = oldStart; i <= oldEnd; i++) {
22     oldVNode = oldChildren[i]
23     const k = keyIndex[oldVNode.key]
24
25     if (typeof k !== 'undefined') {
26       newVNode = newChildren[k]
27       patch(oldVNode, newVNode, container)
28       source[k - newStart] = i
29       // 判断节点是否需要移动
30       if (k < pos) {
31         moved = true
32       } else {
33         pos = k
34       }
35     } else {
36       unmount(oldVNode)
37     }
38   }
39 }
```

　　在上面这段代码中，我们新增了两个变量 `moved` 和 `pos`。前者的初始值为 `false`，代表是否需要移动节点，后者的初始值为 `0`，代表遍历旧的一组子节点的过程中遇到的最大索引值 `k`。我们在讲解简单 Diff 算法时曾提到，如果在遍历过程中遇到的索引值呈现递增趋势，则说明不需要移动节点，反之则需要。所以在第二个 `for` 循环内，我们通过比较变量 `k` 与变量 `pos` 的值来判断是否需要移动节点。

　　除此之外，我们还需要一个数量标识，代表**已经更新过的节点数量**。我们知道，**已经更新过的节点数量**应该小于新的一组子节点中需要更新的节点数量。一旦前者超过后者，则说明有多余的节点，我们应该将它们卸载，如下面的代码所示：

```js
01 if (j > oldEnd && j <= newEnd) {
02   // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04   // 省略部分代码
05 } else {
06   // 构造 source 数组
07   const count = newEnd - j + 1
08   const source = new Array(count)
09   source.fill(-1)
10
11   const oldStart = j
12   const newStart = j
13   let moved = false
14   let pos = 0
15   const keyIndex = {}
16   for(let i = newStart; i <= newEnd; i++) {
17     keyIndex[newChildren[i].key] = i
18   }
19   // 新增 patched 变量，代表更新过的节点数量
20   let patched = 0
21   for(let i = oldStart; i <= oldEnd; i++) {
22     oldVNode = oldChildren[i]
23     // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
24     if (patched <= count) {
25       const k = keyIndex[oldVNode.key]
26       if (typeof k !== 'undefined') {
27         newVNode = newChildren[k]
28         patch(oldVNode, newVNode, container)
29         // 每更新一个节点，都将 patched 变量 +1
30         patched++
31         source[k - newStart] = i
32         if (k < pos) {
33           moved = true
34         } else {
35           pos = k
36         }
37       } else {
38         // 没找到
39         unmount(oldVNode)
40       }
41     } else {
42       // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
43       unmount(oldVNode)
44     }
45   }
46 }
```

　　在上面这段代码中，我们增加了 `patched` 变量，其初始值为 `0`，代表更新过的节点数量。接着，在第二个 `for` 循环中增加了判断 `patched <= count`，如果此条件成立，则正常执行更新，并且每次更新后都让变量 `patched` 自增；否则说明剩余的节点都是多余的，于是调用 `unmount` 函数将它们卸载。

　　现在，我们通过判断变量 `moved` 的值，已经能够知道是否需要移动节点，同时也处理了很多边界条件。接下来我们讨论如何移动节点。

### 11.3　如何移动元素

　　在上一节中，我们实现了两个目标。

- 判断是否需要进行 DOM 移动操作。我们创建了变量 `moved` 作为标识，当它的值为 `true` 时，说明需要进行 DOM 移动操作。
- 构建 `source` 数组。该数组的长度等于新的一组子节点**去掉**相同的前置/后置节点后，剩余未处理节点的数量。`source` 数组中存储着新的一组子节点中的节点在旧的一组子节点中的位置，后面我们会根据 `source` 数组计算出一个**最长递增子序列**，用于 DOM 移动操作。

　　接下来，我们讨论如何进行 DOM 移动操作，如下面的代码所示：

```js
01 if (j > oldEnd && j <= newEnd) {
02   // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04   // 省略部分代码
05 } else {
06   // 省略部分代码
07   for(let i = oldStart; i <= oldEnd; i++) {
08     // 省略部分代码
09   }
10
11   if (moved) {
12     // 如果 moved 为真，则需要进行 DOM 移动操作
13   }
14 }
```

　　在上面这段代码中，我们在 `for` 循环后增加了一个 `if` 判断分支。如果变量 `moved` 的值为 `true`，则说明需要进行 DOM 移动操作，所以用于 DOM 移动操作的逻辑将编写在该 `if` 语句块内。

　　为了进行 DOM 移动操作，我们首先要根据 `source` 数组计算出它的最长递增子序列。`source` 数组仍然取用在 11.2 节中给出的例子，如图 11-21 所示。

![图 11-21](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/118.jpg)

**图 11-21　用于计算 `source` 数组的递增子序列的例子**

　　在这个例子中，我们计算出 `source` 数组为 `[2, 3, 1, -1]`。那么，该数组的最长递增子序列是什么呢？这就需要我们了解最长递增子序列的概念。为此，我们先要搞清楚什么是一个序列的递增子序列。简单来说，给定一个数值序列，找到它的一个子序列，并且该子序列中的值是递增的，子序列中的元素在原序列中不一定连续。一个序列可能有很多个递增子序列，其中最长的那一个就称为最长递增子序列。举个例子，假设给定数值序列 `[ 0, 8, 4, 12 ]`，那么它的最长递增子序列就是 `[0, 8, 12]`。当然，对于同一个数值序列来说，它的最长递增子序列可能有多个，例如 `[0, 4, 12]` 也是本例的答案之一。

　　理解了什么是最长递增子序列，接下来我们就可以求解 `source` 数组的最长递增子序列了，如下面的代码所示：

```js
01 if (moved) {
02   // 计算最长递增子序列
03   const seq = lis(sources) // [ 0, 1 ]
04 }
```

　　在上面这段代码中，我们使用 `lis` 函数计算一个数组的最长递增子序列。`lis` 函数接收 `source` 数组作为参数，并返回 `source` 数组的最长递增子序列之一。在上例中，你可能疑惑为什么通过 `lis` 函数计算得到的是 `[0, 1]`？实际上，`source` 数组 `[2, 3, 1, -1]` 的最长递增子序列应该是 `[2, 3]`，但我们得到的结果是 `[0, 1]`，这是为什么呢？这是因为 `lis` 函数的返回结果是最长递增子序列中的元素在 `source` 数组中的位置索引，如图 11-22 所示。

![图 11-22 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/119.jpg)

**图 11-22　递增子序列中存储的是 `source` 数组内元素的位置索引**

　　因为 `source` 数组的最长递增子序列为 `[2, 3]`，其中元素 `2` 在该数组中的索引为 `0`，而数组 `3` 在该数组中的索引为 `1`，所以最终结果为 `[0, 1]`。

　　有了最长递增子序列的索引信息后，下一步要重新对节点进行编号，如图 11-23 所示。

![图 11-23](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/120.jpg)

**图 11-23　重新对节点进行编号后的状态**

　　观察图 11-23，在编号时，我们忽略了经过预处理的节点 `p-1` 和 `p-5`。所以，索引为 `0` 的节点是 `p-2`，而索引为 `1` 节点是 `p-3`，以此类推。重新编号是为了让子序列 `seq` 与新的索引值产生对应关系。其实，最长递增子序列 `seq` 拥有一个非常重要的意义。以上例来说，子序列 `seq` 的值为 `[0, 1]`，它的含义是：**在新的一组子节点中，重新编号后索引值为 `0` 和 `1` 的这两个节点在更新前后顺序没有发生变化**。换句话说，重新编号后，索引值为 `0` 和 `1` 的节点不需要移动。在新的一组子节点中，节点 `p-3` 的索引为 `0`，节点 `p-4` 的索引为 `1`，所以节点 `p-3` 和 `p-4` 所对应的真实 DOM 不需要移动。换句话说，只有节点 `p-2` 和 `p-7` 可能需要移动。

　　为了完成节点的移动，我们还需要创建两个索引值 `i` 和 `s`：

- 用索引 `i` 指向新的一组子节点中的最后一个节点；
- 用索引 `s` 指向最长递增子序列中的最后一个元素。

　　如图 11-24 所示。

![图 11-24](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/121.jpg)

**图 11-24　建立索引 `s` 和 `i`，分别指向子序列和索引的最后一个位置**

　　观察图 11-24，为了简化图示，我们在去掉了旧的一组子节点以及无关的线条和变量。接下来，我们将开启一个 `for` 循环，让变量 `i` 和 `s` 按照图 11-24 中箭头的方向移动，如下面的代码所示：

```js
01 if (moved) {
02   const seq = lis(sources)
03
04   // s 指向最长递增子序列的最后一个元素
05   let s = seq.length - 1
06   // i 指向新的一组子节点的最后一个元素
07   let i = count - 1
08   // for 循环使得 i 递减，即按照图 11-24 中箭头的方向移动
09   for (i; i >= 0; i--) {
10     if (i !== seq[s]) {
11       // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
12     } else {
13       // 当 i === seq[s] 时，说明该位置的节点不需要移动
14       // 只需要让 s 指向下一个位置
15       s--
16     }
17   }
18 }
```

其中，`for` 循环的目的是让变量 `i` 按照图 11-24 中箭头的方向移动，以便能够逐个访问新的一组子节点中的节点，这里的变量 `i` 就是节点的索引。在 `for` 循环内，判断条件 `i !== seq[s]`，如果节点的索引 `i` 不等于 `seq[s]` 的值，则说明该节点对应的真实 DOM 需要移动，否则说明当前访问的节点不需要移动，但这时变量 `s` 需要按照图 11-24 中箭头的方向移动，即让变量 `s` 递减。

　　接下来我们就按照上述思路执行更新。初始时索引 `i` 指向节点 `p-7`。由于节点 `p-7` 对应的 `source` 数组中相同位置的元素值为 `-1`，所以我们应该将节点 `p-7` 作为全新的节点进行挂载，如下面的代码所示：

```js
01 if (moved) {
02   const seq = lis(sources)
03
04   // s 指向最长递增子序列的最后一个元素
05   let s = seq.length - 1
06   // i 指向新的一组子节点的最后一个元素
07   let i = count - 1
08   // for 循环使得 i 递减，即按照图 11-24 中箭头的方向移动
09   for (i; i >= 0; i--) {
10     if (source[i] === -1) {
11       // 说明索引为 i 的节点是全新的节点，应该将其挂载
12       // 该节点在新 children 中的真实位置索引
13       const pos = i + newStart
14       const newVNode = newChildren[pos]
15       // 该节点的下一个节点的位置索引
16       const nextPos = pos + 1
17       // 锚点
18       const anchor = nextPos < newChildren.length
19         ? newChildren[nextPos].el
20         : null
21       // 挂载
22       patch(null, newVNode, container, anchor)
23     } else if (i !== seq[s]) {
24       // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
25     } else {
26       // 当 i === seq[s] 时，说明该位置的节点不需要移动
27       // 只需要让 s 指向下一个位置
28       s--
29     }
30   }
31 }
```

　　如果 `source[i]` 的值为 `-1`，则说明索引为 `i` 的节点是全新的节点，于是我们调用 `patch` 函数将其挂载到容器中。这里需要注意的是，由于索引 `i` 是重新编号后的，因此为了得到真实索引值，我们需要计算表达式 `i + newStart` 的值。

　　新节点创建完毕后，`for` 循环已经执行了一次，此时索引 `i` 向上移动一步，指向了节点 `p-2`，如图 11-25 所示。

![图 11-25 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/122.jpg)

**图 11-25　节点以及索引的当前状态**

　　接着，进行下一轮 `for` 循环，步骤如下。

- 第一步：`source[i]` 是否等于 `-1`？很明显，此时索引 `i` 的值为 `2`，`source[2]` 的值等于 `1`，因此节点 `p-2` 不是全新的节点，不需要挂载它，进行下一步的判断。
- 第二步：`i !== seq[s]` 是否成立？此时索引 `i` 的值为 `2`，索引 `s` 的值为 `1`。因此 `2 !== seq[1]` 成立，节点 `p-2` 所对应的真实 DOM 需要移动。

　　在第二步中，我们知道了节点 `p-2` 所对应的真实 DOM 应该移动。实现代码如下：

```js
01 if (moved) {
02   const seq = lis(sources)
03
04   // s 指向最长递增子序列的最后一个元素
05   let s = seq.length - 1
06   let i = count - 1
07   for (i; i >= 0; i--) {
08     if (source[i] === -1) {
09       // 省略部分代码
10     } else if (i !== seq[s]) {
11       // 说明该节点需要移动
12       // 该节点在新的一组子节点中的真实位置索引
13       const pos = i + newStart
14       const newVNode = newChildren[pos]
15       // 该节点的下一个节点的位置索引
16       const nextPos = pos + 1
17       // 锚点
18       const anchor = nextPos < newChildren.length
19         ? newChildren[nextPos].el
20         : null
21       // 移动
22       insert(newVNode.el, container, anchor)
23     } else {
24       // 当 i === seq[s] 时，说明该位置的节点不需要移动
25       // 并让 s 指向下一个位置
26       s--
27     }
28   }
29 }
```

　　可以看到，移动节点的实现思路类似于挂载全新的节点。不同点在于，移动节点是通过 `insert` 函数来完成的。

　　接着，进行下一轮的循环。此时索引 `i` 指向节点 `p-4`，如图 11-26 所示。

![ 11-26](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/123.jpg)

**图 11-26　节点以及索引的当前状态**

　　更新过程仍然分为三个步骤。

- 第一步：判断表达式 `source[i]` 的值是否等于 `-1`？很明显，此时索引 `i` 的值为 `1`，表达式 `source[1]` 的值等于 `3`，条件不成立。所以节点 `p-4` 不是全新的节点，不需要挂载它。接着进行下一步判断。
- 第二步：判断表达式 `i !== seq[s]` 是否成立？此时索引 `i` 的值为 `1`，索引 `s` 的值为 `1`。这时表达式 `1 === seq[1]` 为真，所以条件 `i !== seq[s]` 也不成立。
- 第三步：由于第一步和第二步中的条件都不成立，所以代码会执行最终的 `else` 分支。这意味着，节点 `p-4` 所对应的真实 DOM 不需要移动，但我们仍然需要让索引 `s` 的值递减，即 `s--`。

　　经过三步判断之后，我们得出结论：节点 `p-4` 不需要移动。于是进行下一轮循环，此时的状态如图 11-27 所示。

![图 11-27](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/124.jpg)

**图 11-27　节点以及索引的当前状态**

　　由图 11-27 可知，此时索引 `i` 指向节点 `p-3`。我们继续进行三个步骤的判断。

- 第一步：判断表达式 `source[i]` 的值是否等于 `-1`？很明显，此时索引 `i` 的值为 `0`，表达式 `source[0]` 的值等于 `2`，所以节点 `p-3` 不是全新的节点，不需要挂载它，接着进行下一步判断。
- 第二步：判断表达式 `i !== seq[s]` 是否成立？此时索引 `i` 的值为 `0`，索引 `s` 的值也为 `0`。这时表达式 `0 === seq[0]` 为真，因此条件也不成立，最终将执行 `else` 分支的代码，也就是第三步。
- 第三步：到了这里，意味着节点 `p-3` 所对应的真实 DOM 也不需要移动。

　　在这一轮更新完成之后，循环将会停止，更新完成。

　　需要强调的是，关于给定序列的递增子序列的求法不在本书的讲解范围内，网络上有大量文章讲解了这方面的内容，读者可以自行查阅。如下是用于求解给定序列的最长递增子序列的代码，取自 Vue.js 3：

```js
01 function getSequence(arr) {
02   const p = arr.slice()
03   const result = [0]
04   let i, j, u, v, c
05   const len = arr.length
06   for (i = 0; i < len; i++) {
07     const arrI = arr[i]
08     if (arrI !== 0) {
09       j = result[result.length - 1]
10       if (arr[j] < arrI) {
11         p[i] = j
12         result.push(i)
13         continue
14       }
15       u = 0
16       v = result.length - 1
17       while (u < v) {
18         c = ((u + v) / 2) | 0
19         if (arr[result[c]] < arrI) {
20           u = c + 1
21         } else {
22           v = c
23         }
24       }
25       if (arrI < arr[result[u]]) {
26         if (u > 0) {
27           p[i] = result[u - 1]
28         }
29         result[u] = i
30       }
31     }
32   }
33   u = result.length
34   v = result[u - 1]
35   while (u-- > 0) {
36     result[u] = v
37     v = p[v]
38   }
39   return result
40 }
```

### 11.4　总结

　　快速 Diff 算法在实测中性能最优。它借鉴了文本 Diff 中的预处理思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新节点或者卸载已经不存在的节点来完成更新，则需要根据节点的索引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。



## 第 12 章　组件的实现原理

## 第 14 章　内建组件和模块

### 14.1　KeepAlive 组件的实现原理

#### 14.1.1　组件的激活与失活

　　KeepAlive 一词借鉴于 HTTP 协议。在 HTTP 协议中，KeepAlive 又称 **HTTP 持久连接**（HTTP persistent connection），其作用是允许多个请求或响应共用一个 TCP 连接。在没有 KeepAlive 的情况下，一个 HTTP 连接会在每次请求/响应结束后关闭，当下一次请求发生时，会建立一个新的 HTTP 连接。频繁地销毁、创建 HTTP 连接会带来额外的性能开销，KeepAlive 就是为了解决这个问题而生的。

HTTP 中的 KeepAlive 可以避免连接频繁地销毁/创建，与 HTTP 中的 KeepAlive 类似，Vue.js 内建的 KeepAlive 组件可以避免一个组件被频繁地销毁/重建。假设我们的页面中有一组 `<Tab>` 组件，如下面的代码所示：

```vue
01 <template>
02   <Tab v-if="currentTab === 1">...</Tab>
03   <Tab v-if="currentTab === 2">...</Tab>
04   <Tab v-if="currentTab === 3">...</Tab>
05 </template>
```

　　可以看到，根据变量 `currentTab` 值的不同，会渲染不同的 `<Tab>` 组件。当用户频繁地切换 Tab 时，会导致不停地卸载并重建对应的 `<Tab>` 组件。为了避免因此产生的性能开销，可以使用 KeepAlive 组件来解决这个问题，如下面的代码所示：

```vue
01 <template>
02   <!-- 使用 KeepAlive 组件包裹 -->
03   <KeepAlive>
04     <Tab v-if="currentTab === 1">...</Tab>
05     <Tab v-if="currentTab === 2">...</Tab>
06     <Tab v-if="currentTab === 3">...</Tab>
07   </KeepAlive>
08 </template>
```

　　这样，无论用户怎样切换 `<Tab>` 组件，都不会发生频繁的创建和销毁，因而会极大地优化对用户操作的响应，尤其是在大组件场景下，优势会更加明显。那么，KeepAlive 组件的实现原理是怎样的呢？其实 KeepAlive 的本质是缓存管理，再加上特殊的挂载/卸载逻辑。

　首先，KeepAlive 组件的实现需要渲染器层面的支持。这是因为被 KeepAlive 的组件在卸载时，我们不能真的将其卸载，否则就无法维持组件的当前状态了。正确的做法是，将被 KeepAlive 的组件从原容器搬运到另外一个隐藏的容器中，实现“假卸载”。当被搬运到隐藏容器中的组件需要再次被“挂载”时，我们也不能执行真正的挂载逻辑，而应该把该组件从隐藏容器中再搬运到原容器。这个过程对应到组件的生命周期，其实就是 `activated` 和 `deactivated`。

　　图 14-1 描述了“卸载”和“挂载”一个被 KeepAlive 的组件的过程。

![图 14-1](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/125.jpg)

**图 14-1　“卸载”和“挂载”一个被 KeepAlive 的组件的过程**



　　如图 14-1 所示，“卸载”一个被 KeepAlive 的组件时，它并不会真的被卸载，而会被移动到一个隐藏容器中。当重新“挂载”该组件时，它也不会被真的挂载，而会被从隐藏容器中取出，再“放回”原来的容器中，即页面中。

一个最基本的 KeepAlive 组件实现起来并不复杂，如下面的代码所示：

```js
01 const KeepAlive = {
02   // KeepAlive 组件独有的属性，用作标识
03   __isKeepAlive: true,
04   setup(props, { slots }) {
05     // 创建一个缓存对象
06     // key: vnode.type
07     // value: vnode
08     const cache = new Map()
09     // 当前 KeepAlive 组件的实例
10     const instance = currentInstance
11     // 对于 KeepAlive 组件来说，它的实例上存在特殊的 keepAliveCtx 对象，该对象由渲染器注入
12     // 该对象会暴露渲染器的一些内部方法，其中 move 函数用来将一段 DOM 移动到另一个容器中
13     const { move, createElement } = instance.keepAliveCtx
14
15     // 创建隐藏容器
16     const storageContainer = createElement('div')
17
18     // KeepAlive 组件的实例上会被添加两个内部函数，分别是 _deActivate 和 _activate
19     // 这两个函数会在渲染器中被调用
20     instance._deActivate = (vnode) => {
21       move(vnode, storageContainer)
22     }
23     instance._activate = (vnode, container, anchor) => {
24       move(vnode, container, anchor)
25     }
26
27     return () => {
28       // KeepAlive 的默认插槽就是要被 KeepAlive 的组件
29       let rawVNode = slots.default()
30       // 如果不是组件，直接渲染即可，因为非组件的虚拟节点无法被 KeepAlive
31       if (typeof rawVNode.type !== 'object') {
32         return rawVNode
33       }
34
35       // 在挂载时先获取缓存的组件 vnode
36       const cachedVNode = cache.get(rawVNode.type)
37       if (cachedVNode) {
38         // 如果有缓存的内容，则说明不应该执行挂载，而应该执行激活
39         // 继承组件实例
40         rawVNode.component = cachedVNode.component
41         // 在 vnode 上添加 keptAlive 属性，标记为 true，避免渲染器重新挂载它
42         rawVNode.keptAlive = true
43       } else {
44         // 如果没有缓存，则将其添加到缓存中，这样下次激活组件时就不会执行新的挂载动作了
45         cache.set(rawVNode.type, rawVNode)
46       }
47
48       // 在组件 vnode 上添加 shouldKeepAlive 属性，并标记为 true，避免渲染器真的将组件卸载
49       rawVNode.shouldKeepAlive = true
50       // 将 KeepAlive 组件的实例也添加到 vnode 上，以便在渲染器中访问
51       rawVNode.keepAliveInstance = instance
52
53       // 渲染组件 vnode
54       return rawVNode
55     }
56   }
57 }
```

　　从上面的实现中可以看到，与普通组件的一个较大的区别在于，KeepAlive 组件与渲染器的结合非常深。首先，KeepAlive 组件本身并不会渲染额外的内容，它的渲染函数最终只返回需要被 KeepAlive 的组件，我们把这个需要被 KeepAlive 的组件称为“内部组件”。KeepAlive 组件会对“内部组件”进行操作，主要是在“内部组件”的 `vnode` 对象上添加一些标记属性，以便渲染器能够据此执行特定的逻辑。这些标记属性包括如下几个。

- `shouldKeepAlive`：该属性会被添加到“内部组件”的 `vnode` 对象上，这样当渲染器卸载“内部组件”时，可以通过检查该属性得知“内部组件”需要被 KeepAlive。于是，渲染器就不会真的卸载“内部组件”，而是会调用 `_deActivate` 函数完成搬运工作，如下面的代码所示：

  ```js
  01 // 卸载操作
  02 function unmount(vnode) {
  03   if (vnode.type === Fragment) {
  04     vnode.children.forEach(c => unmount(c))
  05     return
  06   } else if (typeof vnode.type === 'object') {
  07     // vnode.shouldKeepAlive 是一个布尔值，用来标识该组件是否应该被 KeepAlive
  08     if (vnode.shouldKeepAlive) {
  09       // 对于需要被 KeepAlive 的组件，我们不应该真的卸载它，而应调用该组件的父组件，
  10       // 即 KeepAlive 组件的 _deActivate 函数使其失活
  11       vnode.keepAliveInstance._deActivate(vnode)
  12     } else {
  13       unmount(vnode.component.subTree)
  14     }
  15     return
  16   }
  17   const parent = vnode.el.parentNode
  18   if (parent) {
  19     parent.removeChild(vnode.el)
  20   }
  21 }
  ```

  可以看到，`unmount` 函数在卸载组件时，会检测组件是否应该被 KeepAlive，从而执行不同的操作。

- `keepAliveInstance`：“内部组件”的 `vnode` 对象会持有 KeepAlive 组件实例，在 `unmount` 函数中会通过 `keepAliveInstance` 来访问 `_deActivate` 函数。

- `keptAlive`：“内部组件”如果已经被缓存，则还会为其添加一个 `keptAlive` 标记。这样当“内部组件”需要重新渲染时，渲染器并不会重新挂载它，而会将其激活，如下面 `patch` 函数的代码所示：

  ```js
  01 function patch(n1, n2, container, anchor) {
  02   if (n1 && n1.type !== n2.type) {
  03     unmount(n1)
  04     n1 = null
  05   }
  06
  07   const { type } = n2
  08
  09   if (typeof type === 'string') {
  10     // 省略部分代码
  11   } else if (type === Text) {
  12     // 省略部分代码
  13   } else if (type === Fragment) {
  14     // 省略部分代码
  15   } else if (typeof type === 'object' || typeof type === 'function') {
  16     // component
  17     if (!n1) {
  18       // 如果该组件已经被 KeepAlive，则不会重新挂载它，而是会调用 _activate 来激活它
  19       if (n2.keptAlive) {
  20         n2.keepAliveInstance._activate(n2, container, anchor)
  21       } else {
  22         mountComponent(n2, container, anchor)
  23       }
  24     } else {
  25       patchComponent(n1, n2, anchor)
  26     }
  27   }
  28 }
  ```

  可以看到，如果组件的 `vnode` 对象中存在 `keptAlive` 标识，则渲染器不会重新挂载它，而是会通过 `keepAliveInstance._activate` 函数来激活它。

  我们再来看一下用于激活组件和失活组件的两个函数：

  ```js
  01 const { move, createElement } = instance.keepAliveCtx
  02
  03 instance._deActivate = (vnode) => {
  04   move(vnode, storageContainer)
  05 }
  06 instance._activate = (vnode, container, anchor) => {
  07   move(vnode, container, anchor)
  08 }
  ```

  　　可以看到，失活的本质就是将组件所渲染的内容移动到隐藏容器中，而激活的本质是将组件所渲染的内容从隐藏容器中搬运回原来的容器。另外，上面这段代码中涉及的 `move` 函数是由渲染器注入的，如下面 `mountComponent` 函数的代码所示：

  ```js
  01 function mountComponent(vnode, container, anchor) {
  02   // 省略部分代码
  03
  04   const instance = {
  05     state,
  06     props: shallowReactive(props),
  07     isMounted: false,
  08     subTree: null,
  09     slots,
  10     mounted: [],
  11     // 只有 KeepAlive 组件的实例下会有 keepAliveCtx 属性
  12     keepAliveCtx: null
  13   }
  14
  15   // 检查当前要挂载的组件是否是 KeepAlive 组件
  16   const isKeepAlive = vnode.type.__isKeepAlive
  17   if (isKeepAlive) {
  18     // 在 KeepAlive 组件实例上添加 keepAliveCtx 对象
  19     instance.keepAliveCtx = {
  20       // move 函数用来移动一段 vnode
  21       move(vnode, container, anchor) {
  22         // 本质上是将组件渲染的内容移动到指定容器中，即隐藏容器中
  23         insert(vnode.component.subTree.el, container, anchor)
  24       },
  25       createElement
  26     }
  27   }
  28
  29   // 省略部分代码
  30 }
  ```

  　　至此，一个最基本的 KeepAlive 组件就完成了。

### 14.4　总结

　　在本章中，我们介绍了 Vue.js 内建的三个组件，即 KeepAlive 组件、Teleport 组件和 Transition 组件。它们的共同特点是，与渲染器的结合非常紧密，因此需要框架提供底层的实现与支持。

　　KeepAlive 组件的作用类似于 HTTP 中的持久链接。它可以避免组件实例不断地被销毁和重建。KeepAlive 的基本实现并不复杂。当被 KeepAlive 的组件“卸载”时，渲染器并不会真的将其卸载掉，而是会将该组件搬运到一个隐藏容器中，从而使得组件可以维持当前状态。当被 KeepAlive 的组件“挂载”时，渲染器也不会真的挂载它，而是将它从隐藏容器搬运到原容器。

　　我们还讨论了 KeepAlive 的其他能力，如匹配策略和缓存策略。`include` 和 `exclude` 这两个选项用来指定哪些组件需要被 KeepAlive，哪些组件不需要被 KeepAlive。默认情况下，`include` 和 `exclude` 会匹配组件的 `name` 选项。但是在具体实现中，我们可以扩展匹配能力。对于缓存策略，Vue.js 默认采用“最新一次访问”。为了让用户能自行实现缓存策略，我们还介绍了正在讨论中的提案。

　　接着，我们讨论了 Teleport 组件所要解决的问题和它的实现原理。Teleport 组件可以跨越 DOM 层级完成渲染，这在很多场景下非常有用。在实现 Teleport 时，我们将 Teleport 组件的渲染逻辑从渲染器中分离出来，这么做有两点好处：

- 可以避免渲染器逻辑代码“膨胀”；
- 可以利用 Tree-Shaking 机制在最终的 bundle 中删除 Teleport 相关的代码，使得最终构建包的体积变小。

　　Teleport 组件是一个特殊的组件。与普通组件相比，它的组件选项非常特殊，例如 `__isTeleport` 选型和 `process` 选项等。这是因为 Teleport 本质上是渲染器逻辑的合理抽象，它完全可以作为渲染器的一部分而存在。

　　最后，我们讨论了 Transition 组件的原理与实现。我们从原生 DOM 过渡开始，讲解了如何使用 JavaScript 为 DOM 元素添加进场动效和离场动效。在此过程中，我们将实现动效的过程分为多个阶段，即 `beforeEnter`、`enter`、`leave` 等。Transition 组件的实现原理与为原生 DOM 添加过渡效果的原理类似，我们将过渡相关的钩子函数定义到虚拟节点的 `vnode.transition` 对象中。渲染器在执行挂载和卸载操作时，会优先检查该虚拟节点是否需要进行过渡，如果需要，则会在合适的时机执行 `vnode.transition` 对象中定义的过渡相关钩子函数。



## 第 15 章　编译器核心技术概览

### 15.1　模板 DSL 的编译器

　编译器其实只是一段程序，它用来将“一种语言 A”翻译成“另外一种语言 B”。其中，语言 A 通常叫作**源代码**（source code），语言 B 通常叫作**目标代码**（object code 或 target code）。编译器将源代码翻译为目标代码的过程叫作**编译**（compile）。



​		对于 Vue.js 模板编译器来说，源代码就是组件的模板，而目标代码是能够在浏览器平台上运行的 JavaScript 代码，或其他拥有 JavaScript 运行时的平台代码，如图 15-2 所示。

![图 15-2](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/128.jpg)

**图 15-2　Vue.js 模板编译器的目标代码是 JavaScript 代码**



　 可以看到，Vue.js 模板编译器的目标代码其实就是渲染函数。详细而言，Vue.js 模板编译器会首先对模板进行词法分析和语法分析，得到模板 AST。接着，将模板 AST **转换**（transform）成 JavaScript AST。最后，根据 JavaScript AST 生成 JavaScript 代码，即渲染函数代码。图 15-3 给出了 Vue.js 模板编译器的工作流程。

![图 15-3](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/129.jpg)

**图 15-3　Vue.js 模板编译器的工作流程**



　　AST 是 abstract syntax tree 的首字母缩写，即抽象语法树。所谓模板 AST，其实就是用来描述模板的抽象语法树。举个例子，假设我们有如下模板：

```vue
01 <div>
02   <h1 v-if="ok">Vue Template</h1>
03 </div>
```

　　这段模板会被编译为如下所示的 AST：

```js
01 const ast = {
02   // 逻辑根节点
03   type: 'Root',
04   children: [
05     // div 标签节点
06     {
07       type: 'Element',
08       tag: 'div',
09       children: [
10         // h1 标签节点
11         {
12           type: 'Element',
13           tag: 'h1',
14           props: [
15             // v-if 指令节点
16             {
17               type: 'Directive', // 类型为 Directive 代表指令
18               name: 'if'，       // 指令名称为 if，不带有前缀 v-
19               exp: {
20                 // 表达式节点
21                 type: 'Expression',
22                 content: 'ok'
23               }
24             }
25           ]
26         }
27       ]
28     }
29   ]
30 }
```

　　可以看到，AST 其实就是一个具有层级结构的对象。模板 AST 具有与模板同构的嵌套结构。每一棵 AST 都有一个逻辑上的根节点，其类型为 `Root`。模板中真正的根节点则作为 `Root` 节点的 `children` 存在。观察上面的 `AST`，我们可以得出如下结论。

- 不同类型的节点是通过节点的 `type` 属性进行区分的。例如标签节点的 `type` 值为 `'Element'`。
- 标签节点的子节点存储在其 `children` 数组中。
- 标签节点的属性节点和指令节点会存储在 `props` 数组中。
- 不同类型的节点会使用不同的对象属性进行描述。例如指令节点拥有 `name` 属性，用来表达指令的名称，而表达式节点拥有 `content` 属性，用来描述表达式的内容。

　　我们可以通过封装 `parse` 函数来完成对模板的词法分析和语法分析，得到模板 AST，如图 15-4 所示。

![图 15-4](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/130.jpg)

**图 15-4　`parse` 函数的作用**



　我们也可以用下面的代码来表达模板解析的过程：

```vue
01 const template = `
02   <div>
03     <h1 v-if="ok">Vue Template</h1>
04   </div>
05 `
06
07 const templateAST = parse(template)
```

　　可以看到，`parse` 函数接收字符串模板作为参数，并将解析后得到的 AST 作为返回值返回。

　　有了模板 AST 后，我们就可以对其进行语义分析，并对模板 AST 进行转换了。什么是语义分析呢？举几个例子。

- 检查 `v-else` 指令是否存在相符的 `v-if` 指令。
- 分析属性值是否是静态的，是否是常量等。
- 插槽是否会引用上层作用域的变量。
- ……

在语义分析的基础上，我们即可得到模板 AST。接着，我们还需要将模板 AST 转换为 JavaScript AST。因为 Vue.js 模板编译器的最终目标是生成渲染函数，而渲染函数本质上是 JavaScript 代码，所以我们需要将模板 AST 转换成用于描述渲染函数的 JavaScript AST。

　　我们可以封装 `transform` 函数来完成模板 AST 到 JavaScript AST 的转换工作，如图 15-5 所示。

![图 15-5](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/131.jpg)

**图 15-5　`transform` 函数的作用**

　　同样，我们也可以用下面的代码来表达：

```vue
01 const templateAST = parse(template)
02 const jsAST = transform(templateAST)
```



　　有了 JavaScript AST 后，我们就可以根据它生成渲染函数了，这一步可以通过封装 `generate` 函数来完成，如图 15-6 所示。

![图 15-6 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/132.jpg)

**图 15-6　`generate` 函数的作用**

　　我们也可以用下面的代码来表达代码生成的过程：

```
01 const templateAST = parse(template)
02 const jsAST = transform(templateAST)
03 const code = generate(jsAST)
```

　　在上面这段代码中，`generate` 函数会将渲染函数的代码以字符串的形式返回，并存储在 `code` 常量中。图 15-7 给出了完整的流程。

![图 15-7](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/133.jpg)

**图 15-7　将 Vue.js 模板编译为渲染函数的完整流程**



### 15.2　`parser` 的实现原理与状态机

　　在上一节中，我们讲解了 Vue.js 模板编译器的基本结构和工作流程，它主要由三个部分组成：

- 用来将模板字符串解析为模板 AST 的解析器（`parser`）；
- 用来将模板 AST 转换为 JavaScript AST 的转换器（`transformer`）；
- 用来根据 JavaScript AST 生成渲染函数代码的生成器（`generator`）。

　　本节，我们将详细讨论解析器 `parser` 的实现原理。



　　解析器的入参是字符串模板，解析器会逐个读取字符串模板中的字符，并根据一定的规则将整个字符串切割为一个个 Token。这里的 Token 可以视作词法记号，后续我们将使用 Token 一词来代表词法记号进行讲解。举例来说，假设有这样一段模板：

```
01 <p>Vue</p>
```

解析器会把这段字符串模板切割为三个 Token。

- 开始标签：`<p>`。
- 文本节点：`Vue`。
- 结束标签：`</p>`。

　　那么，解析器是如何对模板进行切割的呢？依据什么规则？这就不得不提到有限状态自动机。千万不要被这个名词吓到，它理解起来并不难。所谓“有限状态”，就是指有限个状态，而“自动机”意味着随着字符的输入，解析器会自动地在不同状态间迁移。拿上面的模板来说，当我们分析这段模板字符串时，`parse` 函数会逐个读取字符，状态机会有一个初始状态，我们记为“初始状态 1”。图 15-8 给出了状态迁移的过程。

![图 15-8 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/134.jpg)

**图 15-8　解析器的状态机图**

　　我们用自然语言来描述图 15-8 给出的状态迁移过程。

- 状态机始于“初始状态 1”。
- 在“初始状态 1”下，读取模板的第一个字符 `<`，状态机会进入下一个状态，即“标签开始状态 2”。
- 在“标签开始状态 2”下，读取下一个字符 `p`。由于字符 `p` 是字母，所以状态机会进入“标签名称状态 3”。
- 在“标签名称状态 3”下，读取下一个字符 `>`，此时状态机会从“标签名称状态 3”迁移回“初始状态 1”，并记录在“标签名称状态”下产生的标签名称 `p`。
- 在“初始状态 1”下，读取下一个字符 `V`，此时状态机会进入“文本状态 4”。
- 在“文本状态 4”下，继续读取后续字符，直到遇到字符 `<` 时，状态机会再次进入“标签开始状态 2”，并记录在“文本状态 4”下产生的文本内容，即字符串“`Vue`”。
- 在“标签开始状态 2”下，读取下一个字符 `/`，状态机会进入“结束标签状态 5”。
- 在“结束标签状态 5”下，读取下一个字符 `p`，状态机会进入“结束标签名称状态 6”。
- 在“结束标签名称状态 6”下，读取最后一个字符 `>`，它是结束标签的闭合字符，于是状态机迁移回“初始状态 1”，并记录在“结束标签名称状态 6”下生成的结束标签名称。

　　经过这样一系列的状态迁移过程之后，我们最终就能够得到相应的 Token 了。观察图 15-8 可以发现，有的圆圈是单线的，而有的圆圈是双线的。双线代表此时状态机是一个合法的 Token。



可以看到，在“初始状态”（Data State）下，当遇到字符 `<` 时，状态机会迁移到 `tag open state`，即“标签开始状态”。如果遇到字符 `<` 以外的字符，规范中也都有对应的说明，应该让状态机迁移到怎样的状态。不过 Vue.js 的模板作为一个 DSL，并非必须遵守该规范。但 Vue.js 的模板毕竟是类 HTML 的实现，因此，尽可能按照规范来做，不会有什么坏处。更重要的一点是，规范中已经定义了非常详细的状态迁移过程，这对于我们编写解析器非常有帮助。

　　按照有限状态自动机的状态迁移过程，我们可以很容易地编写对应的代码实现。因此，有限状态自动机可以帮助我们完成对模板的**标记化**（tokenized），最终我们将得到一系列 Token。图 15-8 中描述的状态机的实现如下：

```
01 // 定义状态机的状态
02 const State = {
03   initial: 1,    // 初始状态
04   tagOpen: 2,    // 标签开始状态
05   tagName: 3,    // 标签名称状态
06   text: 4,       // 文本状态
07   tagEnd: 5,     // 结束标签状态
08   tagEndName: 6  // 结束标签名称状态
09 }
10 // 一个辅助函数，用于判断是否是字母
11 function isAlpha(char) {
12   return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
13 }
14
15 // 接收模板字符串作为参数，并将模板切割为 Token 返回
16 function tokenize(str) {
17   // 状态机的当前状态：初始状态
18   let currentState = State.initial
19   // 用于缓存字符
20   const chars = []
21   // 生成的 Token 会存储到 tokens 数组中，并作为函数的返回值返回
22   const tokens = []
23   // 使用 while 循环开启自动机，只要模板字符串没有被消费尽，自动机就会一直运行
24   while(str) {
25     // 查看第一个字符，注意，这里只是查看，没有消费该字符
26     const char = str[0]
27     // switch 语句匹配当前状态
28     switch (currentState) {
29       // 状态机当前处于初始状态
30       case State.initial:
31         // 遇到字符 <
32         if (char === '<') {
33           // 1. 状态机切换到标签开始状态
34           currentState = State.tagOpen
35           // 2. 消费字符 <
36           str = str.slice(1)
37         } else if (isAlpha(char)) {
38           // 1. 遇到字母，切换到文本状态
39           currentState = State.text
40           // 2. 将当前字母缓存到 chars 数组
41           chars.push(char)
42           // 3. 消费当前字符
43           str = str.slice(1)
44         }
45         break
46       // 状态机当前处于标签开始状态
47       case State.tagOpen:
48         if (isAlpha(char)) {
49           // 1. 遇到字母，切换到标签名称状态
50           currentState = State.tagName
51           // 2. 将当前字符缓存到 chars 数组
52           chars.push(char)
53           // 3. 消费当前字符
54           str = str.slice(1)
55         } else if (char === '/') {
56           // 1. 遇到字符 /，切换到结束标签状态
57           currentState = State.tagEnd
58           // 2. 消费字符 /
59           str = str.slice(1)
60         }
61         break
62       // 状态机当前处于标签名称状态
63       case State.tagName:
64         if (isAlpha(char)) {
65           // 1. 遇到字母，由于当前处于标签名称状态，所以不需要切换状态，
66           // 但需要将当前字符缓存到 chars 数组
67           chars.push(char)
68           // 2. 消费当前字符
69           str = str.slice(1)
70         } else if (char === '>') {
71           // 1.遇到字符 >，切换到初始状态
72           currentState = State.initial
73           // 2. 同时创建一个标签 Token，并添加到 tokens 数组中
74           // 注意，此时 chars 数组中缓存的字符就是标签名称
75           tokens.push({
76             type: 'tag',
77             name: chars.join('')
78           })
79           // 3. chars 数组的内容已经被消费，清空它
80           chars.length = 0
81           // 4. 同时消费当前字符 >
82           str = str.slice(1)
83         }
84         break
85       // 状态机当前处于文本状态
86       case State.text:
87         if (isAlpha(char)) {
88           // 1. 遇到字母，保持状态不变，但应该将当前字符缓存到 chars 数组
89           chars.push(char)
90           // 2. 消费当前字符
91           str = str.slice(1)
92         } else if (char === '<') {
93           // 1. 遇到字符 <，切换到标签开始状态
94           currentState = State.tagOpen
95           // 2. 从 文本状态 --> 标签开始状态，此时应该创建文本 Token，并添加到 tokens 数组
96           // 注意，此时 chars 数组中的字符就是文本内容
97           tokens.push({
98             type: 'text',
99             content: chars.join('')
100           })
101           // 3. chars 数组的内容已经被消费，清空它
102           chars.length = 0
103           // 4. 消费当前字符
104           str = str.slice(1)
105         }
106         break
107       // 状态机当前处于标签结束状态
108       case State.tagEnd:
109         if (isAlpha(char)) {
110           // 1. 遇到字母，切换到结束标签名称状态
111           currentState = State.tagEndName
112           // 2. 将当前字符缓存到 chars 数组
113           chars.push(char)
114           // 3. 消费当前字符
115           str = str.slice(1)
116         }
117         break
118       // 状态机当前处于结束标签名称状态
119       case State.tagEndName:
120         if (isAlpha(char)) {
121           // 1. 遇到字母，不需要切换状态，但需要将当前字符缓存到 chars 数组
122           chars.push(char)
123           // 2. 消费当前字符
124           str = str.slice(1)
125         } else if (char === '>') {
126           // 1. 遇到字符 >，切换到初始状态
127           currentState = State.initial
128           // 2. 从 结束标签名称状态 --> 初始状态，应该保存结束标签名称 Token
129           // 注意，此时 chars 数组中缓存的内容就是标签名称
130           tokens.push({
131             type: 'tagEnd',
132             name: chars.join('')
133           })
134           // 3. chars 数组的内容已经被消费，清空它
135           chars.length = 0
136           // 4. 消费当前字符
137           str = str.slice(1)
138         }
139         break
140     }
141   }
142
143   // 最后，返回 tokens
144   return tokens
145 }
```

　　上面这段代码看上去比较冗长，可优化的点非常多。这段代码高度还原了图 15-8 中展示的状态机，配合代码中的注释会更容易理解。

　　使用上面给出的 `tokenize` 函数来解析模板 `<p>Vue</p>`，我们将得到三个 Token：

```js
01 const tokens = tokenize(`<p>Vue</p>`)
02 // [
03 //   { type: 'tag', name: 'p' },        // 开始标签
04 //   { type: 'text', content: 'Vue' },  // 文本节点
05 //   { type: 'tagEnd', name: 'p' }      // 结束标签
06 // ]
```

　　现在，你已经明白了状态机的工作原理，以及模板编译器将模板字符串切割为一个个 Token 的过程。但拿上述例子来说，我们并非总是需要所有 Token。例如，在解析模板的过程中，结束标签 Token 可以省略。这时，我们就可以调整 `tokenize` 函数的代码，并选择性地忽略结束标签 Token。当然，有时我们也可能需要更多的 Token，这都取决于具体的需求，然后据此灵活地调整代码实现。

　　总而言之，通过有限自动机，我们能够将模板解析为一个个 Token，进而可以用它们构建一棵 AST 了。但在具体构建 AST 之前，我们需要思考能否简化 `tokenize` 函数的代码。实际上，我们可以通过正则表达式来精简 `tokenize` 函数的代码。上文之所以没有从最开始就采用正则表达式来实现，是因为**正则表达式的本质就是有限自动机**。当你编写正则表达式的时候，其实就是在编写有限自动机。



### 15.3　构造 AST

　　实际上，不同用途的编译器之间可能会存在非常大的差异。它们唯一的共同点是，都会将源代码转换成目标代码。但如果深入细节即可发现，不同编译器之间的实现思路甚至可能完全不同，其中就包括 AST 的构造方式。对于通用用途语言（GPL）来说，例如 JavaScript 这样的脚本语言，想要为其构造 AST，较常用的一种算法叫作递归下降算法，这里面需要解决 GPL 层面才会遇到的很多问题，例如最基本的运算符优先级问题。然而，对于像 Vue.js 模板这样的 DSL 来说，首先可以确定的一点是，它不具有运算符，所以也就没有所谓的运算符优先级问题。DSL 与 GPL 的区别在于，GPL 是图灵完备的，我们可以使用 GPL 来实现 DSL。而 DSL 不要求图灵完备，它只需要满足特定场景下的特定用途即可。

　　为 Vue.js 的模板构造 AST 是一件很简单的事。HTML 是一种标记语言，它的格式非常固定，标签元素之间天然嵌套，形成父子关系。因此，一棵用于描述 HTML 的 AST 将拥有与 HTML 标签非常相似的树型结构。举例来说，假设有如下模板：

```
01 <div><p>Vue</p><p>Template</p></div>
```

　　在上面这段模板中，最外层的根节点是 `div` 标签，它有两个 `p` 标签作为子节点。同时，这两个 `p` 标签都具有一个文本节点作为子节点。我们可以将这段模板对应的 AST 设计为：

```
01 const ast = {
02   // AST 的逻辑根节点
03   type: 'Root',
04   children: [
05     // 模板的 div 根节点
06     {
07       type: 'Element',
08       tag: 'div',
09       children: [
10         // div 节点的第一个子节点 p
11         {
12           type: 'Element',
13           tag: 'p',
14           // p 节点的文本节点
15           children: [
16             {
17               type: 'Text',
18               content: 'Vue'
19             }
20           ]
21         },
22         // div 节点的第二个子节点 p
23         {
24           type: 'Element',
25           tag: 'p',
26           // p 节点的文本节点
27           children: [
28             {
29               type: 'Text',
30               content: 'Template'
31             }
32           ]
33         }
34       ]
35     }
36   ]
37 }
```

　　可以看到，AST 在结构上与模板是“同构”的，它们都具有树型结构，如图 15-10 所示。

![图 15-10](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/136.jpg)

**图 15-10　AST 的结构**

　　了解了 AST 的结构，接下来我们的任务是，使用程序根据模板解析后生成的 Token 构造出这样一棵 AST。首先，我们使用上一节讲解的 `tokenize` 函数将本节开头给出的模板进行标记化。解析这段模板得到的 `tokens` 如下所示：

```
01 const tokens = tokenize(`<div><p>Vue</p><p>Template</p></div>`)
```

　　执行上面这段代码，我们将得到如下 `tokens`：

```
01 const tokens = [
02   {type: "tag", name: "div"},          // div 开始标签节点
03   {type: "tag", name: "p"},            // p 开始标签节点
04   {type: "text", content: "Vue"},      // 文本节点
05   {type: "tagEnd", name: "p"},         // p 结束标签节点
06   {type: "tag", name: "p"},            // p 开始标签节点
07   {type: "text", content: "Template"}, // 文本节点
08   {type: "tagEnd", name: "p"},         // p 结束标签节点
09   {type: "tagEnd", name: "div"}        // div 结束标签节点
10 ]
```

　　根据 Token 列表构建 AST 的过程，其实就是对 Token 列表进行扫描的过程。从第一个 Token 开始，顺序地扫描整个 Token 列表，直到列表中的所有 Token 处理完毕。在这个过程中，我们需要维护一个栈 `elementStack`，这个栈将用于维护元素间的父子关系。每遇到一个开始标签节点，我们就构造一个 `Element` 类型的 AST 节点，并将其压入栈中。类似地，每当遇到一个结束标签节点，我们就将当前栈顶的节点弹出。这样，栈顶的节点将始终充当父节点的角色。扫描过程中遇到的所有节点，都会作为当前栈顶节点的子节点，并添加到栈顶节点的 `children` 属性下。

　　还是拿上例来说，图 15-11 给出了在扫描 Token 列表之前，Token 列表、父级元素栈和 AST 三者的状态。

![图 15-11 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/137.jpg)

**图 15-11　Token 列表、父级元素栈和 AST 三者的当前状态**

　　在图 15-11 中，左侧的是 Token 列表，我们将会按照从上到下的顺序扫描 Token 列表，中间和右侧分别展示了栈 `elementStack` 的状态和 AST 的状态。可以看到，它们最初都只有 `Root` 根节点。

　　接着，我们对 Token 列表进行扫描。首先，扫描到第一个 Token，即“开始标签（`div`）”，如图 15-12 所示。

![图 15-12](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/138.jpg)

**图 15-12　Token 列表、父级元素栈和 AST 三者的当前状态**

　　由于当前扫描到的 Token 是一个开始标签节点，因此我们创建一个类型为 `Element` 的 AST 节点 `Element(div)`，然后将该节点作为当前栈顶节点的子节点。由于当前栈顶节点是 `Root` 根节点，所以我们将新建的 `Element(div)` 节点作为 `Root` 根节点的子节点添加到 AST 中，最后将新建的 `Element(div)` 节点压入 `elementStack` 栈。

　　接着，我们扫描下一个 Token，如图 15-13 所示。

![图 15-13](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/139.jpg)

**图 15-13　Token 列表、父级元素栈和 AST 三者的当前状态**

　　扫描到的第二个 Token 也是一个开始标签节点，于是我们再创建一个类型为 `Element` 的 AST 节点 `Element(p)`，然后将该节点作为当前栈顶节点的子节点。由于当前栈顶节点为 `Element(div)` 节点，所以我们将新建的 `Element(p)` 节点作为 `Element(div)` 节点的子节点添加到 AST 中，最后将新建的 `Element(p)` 节点压入 `elementStack` 栈。

　　接着，我们扫描下一个 Token，如图 15-14 所示。

![图 15-14](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/140.jpg)

**图 15-14　Token 列表、父级元素栈和 AST 三者的当前状态**

　　扫描到的第三个 Token 是一个文本节点，于是我们创建一个类型为 `Text` 的 AST 节点 `Text(Vue)`，然后将该节点作为当前栈顶节点的子节点。由于当前栈顶节点为 `Element(p)` 节点，所以我们将新建的 `Text(p)` 节点作为 `Element(p)` 节点的子节点添加到 AST 中。

　　接着，扫描下一个 Token，如图 15-15 所示。

![图 15-15](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/141.jpg)

**图 15-15　Token 列表、父级元素栈和 AST 三者的当前状态**

　　此时扫描到的 Token 是一个结束标签，所以我们需要将栈顶的 `Element(p)` 节点从 `elementStack` 栈中弹出。接着，扫描下一个 Token，如图 15-16 所示。

![图 15-16 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/142.jpg)

**图 15-16　Token 列表、父级元素栈和 AST 三者的当前状态**

　　此时扫描到的 Token 是一个开始标签。我们为它新建一个 AST 节点 `Element(p)`，并将其作为当前栈顶节点 `Element(div)` 的子节点。最后，将 `Element(p)` 压入 `elementStack` 栈中，使其成为新的栈顶节点。

　　接着，扫描下一个 Token，如图 15-17 所示。

![图 15-17 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/143.jpg)

**图 15-17　Token 列表、父级元素栈和 AST 三者的当前状态**

　　此时扫描到的 Token 是一个文本节点，所以只需要为其创建一个相应的 AST 节点 `Text(Template)` 即可，然后将其作为当前栈顶节点 `Element(p)` 的子节点添加到 AST 中。

　　接着，扫描下一个 Token，如图 15-18 所示。

![图 15-18](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/144.jpg)

**图 15-18　Token 列表、父级元素栈和 AST 三者的当前状态**

　　此时扫描到的 Token 是一个结束标签，于是我们将当前的栈顶节点 `Element(p)` 从 `elementStack` 栈中弹出。

　　接着，扫描下一个 Token，如图 15-19 所示。

![图 15-19 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/145.jpg)

**图 15-19　Token 列表、父级元素栈和 AST 三者的当前状态**

　　此时，扫描到了最后一个 Token，它是一个 `div` 结束标签，所以我们需要再次将当前栈顶节点 `Element(div)` 从 `elementStack` 栈中弹出。至此，所有 Token 都被扫描完毕，AST 构建完成。图 15-20 给出了最终状态。

![图 15-20 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/146.jpg)

**图 15-20　Token 列表、父级元素栈和 AST 三者的当前状态**

　　如图 15-20 所示，在所有 Token 扫描完毕后，一棵 AST 就构建完成了。

　　扫描 Token 列表并构建 AST 的具体实现如下：

```
01 // parse 函数接收模板作为参数
02 function parse(str) {
03   // 首先对模板进行标记化，得到 tokens
04   const tokens = tokenize(str)
05   // 创建 Root 根节点
06   const root = {
07     type: 'Root',
08     children: []
09   }
10   // 创建 elementStack 栈，起初只有 Root 根节点
11   const elementStack = [root]
12
13   // 开启一个 while 循环扫描 tokens，直到所有 Token 都被扫描完毕为止
14   while (tokens.length) {
15     // 获取当前栈顶节点作为父节点 parent
16     const parent = elementStack[elementStack.length - 1]
17     // 当前扫描的 Token
18     const t = tokens[0]
19     switch (t.type) {
20       case 'tag':
21         // 如果当前 Token 是开始标签，则创建 Element 类型的 AST 节点
22         const elementNode = {
23           type: 'Element',
24           tag: t.name,
25           children: []
26         }
27         // 将其添加到父级节点的 children 中
28         parent.children.push(elementNode)
29         // 将当前节点压入栈
30         elementStack.push(elementNode)
31         break
32       case 'text':
33         // 如果当前 Token 是文本，则创建 Text 类型的 AST 节点
34         const textNode = {
35           type: 'Text',
36           content: t.content
37         }
38         // 将其添加到父节点的 children 中
39         parent.children.push(textNode)
40         break
41       case 'tagEnd':
42         // 遇到结束标签，将栈顶节点弹出
43         elementStack.pop()
44         break
45     }
46     // 消费已经扫描过的 token
47     tokens.shift()
48   }
49
50   // 最后返回 AST
51   return root
52 }
```

　　上面这段代码很好地还原了上文中介绍的构建 AST 的思路，我们可以使用如下代码对其进行测试：

```
01 const ast = parse(`<div><p>Vue</p><p>Template</p></div>`)
```

　　运行这句代码，我们将得到与本节开头给出的 AST 一致的结果。这里有必要说明一点，当前的实现仍然存在诸多问题，例如无法处理自闭合标签等。



### 15.4　AST 的转换与插件化架构

　　在上一节中，我们完成了模板 AST 的构造。本节，我们将讨论关于 AST 的转换。所谓 AST 的转换，指的是对 AST 进行一系列操作，将其转换为新的 AST 的过程。新的 AST 可以是原语言或原 DSL 的描述，也可以是其他语言或其他 DSL 的描述。例如，我们可以对模板 AST 进行操作，将其转换为 JavaScript AST。转换后的 AST 可以用于代码生成。这其实就是 Vue.js 的模板编译器将模板编译为渲染函数的过程，如图 15-21 所示。

![图 15-21 ](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/147.jpg)

**图 15-21　模板编译器将模板编译为渲染函数的过程**

　　其中 `transform` 函数就是用来完成 AST 转换工作的。

#### 15.4.1　节点的访问

　　为了对 AST 进行转换，我们需要能访问 AST 的每一个节点，这样才有机会对特定节点进行修改、替换、删除等操作。由于 AST 是树型数据结构，所以我们需要编写一个深度优先的遍历算法，从而实现对 AST 中节点的访问。不过，在开始编写转换代码之前，我们有必要编写一个 `dump` 工具函数，用来打印当前 AST 中节点的信息，如下面的代码所示：

```
01 function dump(node, indent = 0) {
02   // 节点的类型
03   const type = node.type
04   // 节点的描述，如果是根节点，则没有描述
05   // 如果是 Element 类型的节点，则使用 node.tag 作为节点的描述
06   // 如果是 Text 类型的节点，则使用 node.content 作为节点的描述
07   const desc = node.type === 'Root'
08     ? ''
09     : node.type === 'Element'
10       ? node.tag
11       : node.content
12
13   // 打印节点的类型和描述信息
14   console.log(`${'-'.repeat(indent)}${type}: ${desc}`)
15
16   // 递归地打印子节点
17   if (node.children) {
18     node.children.forEach(n => dump(n, indent + 2))
19   }
20 }
```

　　我们沿用上一节中给出的例子，看看使用 `dump` 函数会输出怎样的结果：

```
01 const ast = parse(`<div><p>Vue</p><p>Template</p></div>`)
02 console.log(dump(ast))
```

　　运行上面这段代码，将得到如下输出：

```
01 Root:
02 --Element: div
03 ----Element: p
04 ------Text: Vue
05 ----Element: p
06 ------Text: Template
```

　　可以看到，`dump` 函数以清晰的格式来展示 AST 中的节点。在后续编写 AST 的转换代码时，我们将使用 `dump` 函数来展示转换后的结果。

　　接下来，我们将着手实现对 AST 中节点的访问。访问节点的方式是，从 AST 根节点开始，进行深度优先遍历，如下面的代码所示：

```
01 function traverseNode(ast) {
02   // 当前节点，ast 本身就是 Root 节点
03   const currentNode = ast
04   // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
05   const children = currentNode.children
06   if (children) {
07     for (let i = 0; i < children.length; i++) {
08       traverseNode(children[i])
09     }
10   }
11 }
```

　　`traverseNode` 函数用来以深度优先的方式遍历 AST，它的实现与 `dump` 函数几乎相同。有了 `traverseNdoe` 函数之后，我们即可实现对 AST 中节点的访问。例如，我们可以实现一个转换功能，将 AST 中所有 `p` 标签转换为 `h1` 标签，如下面的代码所示：

```
01 function traverseNode(ast) {
02   // 当前节点，ast 本身就是 Root 节点
03   const currentNode = ast
04
05   // 对当前节点进行操作
06   if (currentNode.type === 'Element' && currentNode.tag === 'p') {
07     // 将所有 p 标签转换为 h1 标签
08     currentNode.tag = 'h1'
09   }
10
11   // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
12   const children = currentNode.children
13   if (children) {
14     for (let i = 0; i < children.length; i++) {
15       traverseNode(children[i])
16     }
17   }
18 }
```

　　在上面这段代码中，我们通过检查当前节点的 `type` 属性和 `tag` 属性，来确保被操作的节点是 `p` 标签。接着，我们将符合条件的节点的 `tag` 属性值修改为 `'h1'`，从而实现 `p` 标签到 `h1` 标签的转换。我们可以使用 `dump` 函数打印转换后的 AST 的信息，如下面的代码所示：

```
01 // 封装 transform 函数，用来对 AST 进行转换
02 function transform(ast) {
03   // 调用 traverseNode 完成转换
04   traverseNode(ast)
05   // 打印 AST 信息
06   console.log(dump(ast))
07 }
08
09 const ast = parse(`<div><p>Vue</p><p>Template</p></div>`)
10 transform(ast)
```

　　运行上面这段代码，我们将得到如下输出：

```
01 Root:
02 --Element: div
03 ----Element: h1
04 ------Text: Vue
05 ----Element: h1
06 ------Text: Template
```

　　可以看到，所有 `p` 标签都已经变成了 `h1` 标签。

　　我们还可以对 AST 进行其他转换。例如，实现一个转换，将文本节点的内容重复两次：

```
01 function traverseNode(ast) {
02   // 当前节点，ast 本身就是 Root 节点
03   const currentNode = ast
04
05   // 对当前节点进行操作
06   if (currentNode.type === 'Element' && currentNode.tag === 'p') {
07     // 将所有 p 标签转换为 h1 标签
08     currentNode.tag = 'h1'
09   }
10
11   // 如果节点的类型为 Text
12   if (currentNode.type === 'Text') {
13     // 重复其内容两次，这里我们使用了字符串的 repeat() 方法
14     currentNode.content = currentNode.content.repeat(2)
15   }
16
17   // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
18   const children = currentNode.children
19   if (children) {
20     for (let i = 0; i < children.length; i++) {
21       traverseNode(children[i])
22     }
23   }
24 }
```

　　如上面的代码所示，我们增加了对文本类型节点的处理代码。一旦检查到当前节点的类型为 `Text`，则调用 `repeat(2)` 方法将文本节点的内容重复两次。最终，我们将得到如下输出：

```
01 Root:
02 --Element: div
03 ----Element: h1
04 ------Text: VueVue
05 ----Element: h1
06 ------Text: TemplateTemplate
```

　　可以看到，文本节点的内容全部重复了两次。

　　不过，随着功能的不断增加，`traverseNode` 函数将会变得越来越“臃肿”。这时，我们很自然地想到，能否对节点的操作和访问进行解耦呢？答案是“当然可以”，我们可以使用回调函数的机制来实现解耦，如下面 `traverseNode` 函数的代码所示：

```
01 // 接收第二个参数 context
02 function traverseNode(ast, context) {
03   const currentNode = ast
04
05   // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
06   const transforms = context.nodeTransforms
07   for (let i = 0; i < transforms.length; i++) {
08     // 将当前节点 currentNode 和 context 都传递给 nodeTransforms 中注册的回调函数
09     transforms[i](currentNode, context)
10   }
11
12   const children = currentNode.children
13   if (children) {
14     for (let i = 0; i < children.length; i++) {
15       traverseNode(children[i], context)
16     }
17   }
18 }
```

　　在上面这段代码中，我们首先为 `traverseNode` 函数增加了第二个参数 `context`。关于 `context` 的内容，下文会详细介绍。接着，我们把回调函数存储到 `transforms` 数组中，然后遍历该数组，并逐个调用注册在其中的回调函数。最后，我们将当前节点 `currentNode` 和 `context` 对象分别作为参数传递给回调函数。

　　有了修改后的 `traverseNode` 函数，我们就可以如下所示使用它了：

```
01 function transform(ast) {
02   // 在 transform 函数内创建 context 对象
03   const context = {
04     // 注册 nodeTransforms 数组
05     nodeTransforms: [
06       transformElement, // transformElement 函数用来转换标签节点
07       transformText     // transformText 函数用来转换文本节点
08     ]
09   }
10   // 调用 traverseNode 完成转换
11   traverseNode(ast, context)
12   // 打印 AST 信息
13   console.log(dump(ast))
14 }
```

其中，`transformElement` 函数和 `transformText` 函数的实现如下：

```
01 function transformElement(node) {
02   if (node.type === 'Element' && node.tag === 'p') {
03     node.tag = 'h1'
04   }
05 }
06
07 function transformText(node) {
08   if (node.type === 'Text') {
09     node.content = node.content.repeat(2)
10   }
11 }
```

　　可以看到，解耦之后，节点操作封装到了 `transformElement` 和 `transformText` 这样的独立函数中。我们甚至可以编写任意多个类似的转换函数，只需要将它们注册到 `context.nodeTransforms` 中即可。这样就解决了功能增加所导致的 `traverseNode` 函数“臃肿”的问题。

#### 15.4.2　转换上下文与节点操作

　　在上文中，我们将转换函数注册到 `context.nodeTransforms` 数组中。那么，为什么要使用 `context` 对象呢？直接定义一个数组不可以吗？为了搞清楚这个问题，就不得不提到关于上下文的知识。你可能或多或少听说过关于 Context（上下文）的内容，我们可以把 Context 看作程序在某个范围内的“全局变量”。实际上，上下文并不是一个具象的东西，它依赖于具体的使用场景。我们举几个例子来直观地感受一下。

- 在编写 React 应用时，我们可以使用 `React.createContext` 函数创建一个上下文对象，该上下文对象允许我们将数据通过组件树一层层地传递下去。无论组件树的层级有多深，只要组件在这棵组件树的层级内，那么它就能够访问上下文对象中的数据。
- 在编写 Vue.js 应用时，我们也可以通过 `provide`/`inject` 等能力，向一整棵组件树提供数据。这些数据可以称为上下文。
- 在编写 Koa 应用时，中间件函数接收的 `context` 参数也是一种上下文对象，所有中间件都可以通过 `context` 来访问相同的数据。

　　通过上述三个例子我们能够认识到，上下文对象其实就是程序在某个范围内的“全局变量”。换句话说，我们也可以把全局变量看作全局上下文。

　　回到我们本节讲解的 `context.nodeTransforms` 数组，这里的 `context` 可以看作 AST 转换函数过程中的上下文数据。所有 AST 转换函数都可以通过 `context` 来共享数据。上下文对象中通常会维护程序的当前状态，例如当前转换的节点是哪一个？当前转换的节点的父节点是谁？甚至当前节点是父节点的第几个子节点？等等。这些信息对于编写复杂的转换函数非常有用。所以，接下来我们要做的就是构造转换上下文信息，如下面的代码所示：

```
01 function transform(ast) {
02   const context = {
03     // 增加 currentNode，用来存储当前正在转换的节点
04     currentNode: null,
05     // 增加 childIndex，用来存储当前节点在父节点的 children 中的位置索引
06     childIndex: 0,
07     // 增加 parent，用来存储当前转换节点的父节点
08     parent: null,
09     nodeTransforms: [
10       transformElement,
11       transformText
12     ]
13   }
14
15   traverseNode(ast, context)
16   console.log(dump(ast))
17 }
```

　　在上面这段代码中，我们为转换上下文对象扩展了一些重要信息。

- `currentNode`：用来存储当前正在转换的节点。
- `childIndex`：用来存储当前节点在父节点的 `children` 中的位置索引。
- `parent`：用来存储当前转换节点的父节点。

　　紧接着，我们需要在合适的地方设置转换上下文对象中的数据，如下面 `traverseNode` 函数的代码所示：

```
01 function traverseNode(ast, context) {
02   // 设置当前转换的节点信息 context.currentNode
03   context.currentNode = ast
04
05   const transforms = context.nodeTransforms
06   for (let i = 0; i < transforms.length; i++) {
07     transforms[i](context.currentNode, context)
08   }
09
10   const children = context.currentNode.children
11   if (children) {
12     for (let i = 0; i < children.length; i++) {
13       // 递归地调用 traverseNode 转换子节点之前，将当前节点设置为父节点
14       context.parent = context.currentNode
15       // 设置位置索引
16       context.childIndex = i
17       // 递归地调用时，将 context 透传
18       traverseNode(children[i], context)
19     }
20   }
21 }
```

　　观察上面这段代码，其关键点在于，在递归地调用 `traverseNode` 函数进行子节点的转换之前，我们必须设置 `context.parent` 和 `context.childIndex` 的值，这样才能保证在接下来的递归转换中，`context` 对象所存储的信息是正确的。

　　有了上下文数据后，我们就可以实现节点替换功能了。什么是节点替换呢？在对 AST 进行转换的时候，我们可能希望把某些节点替换为其他类型的节点。例如，将所有文本节点替换成一个元素节点。为了完成节点替换，我们需要在上下文对象中添加 `context.replaceNode` 函数。该函数接收新的 AST 节点作为参数，并使用新节点替换当前正在转换的节点，如下面的代码所示：

```
01 function transform(ast) {
02   const context = {
03     currentNode: null,
04     parent: null,
05     // 用于替换节点的函数，接收新节点作为参数
06     replaceNode(node) {
07       // 为了替换节点，我们需要修改 AST
08       // 找到当前节点在父节点的 children 中的位置：context.childIndex
09       // 然后使用新节点替换即可
10       context.parent.children[context.childIndex] = node
11       // 由于当前节点已经被新节点替换掉了，因此我们需要将 currentNode 更新为新节点
12       context.currentNode = node
13     },
14     nodeTransforms: [
15       transformElement,
16       transformText
17     ]
18   }
19
20   traverseNode(ast, context)
21   console.log(dump(ast))
22 }
```

　　观察上面代码中的 `replaceNode` 函数。在该函数内，我们首先通过 `context.childIndex` 属性取得当前节点的位置索引，然后通过 `context.parent.children` 取得当前节点所在集合，最后配合使用 `context.childIndex` 与 `context.parent.children` 即可完成节点替换。另外，由于当前节点已经替换为新节点了，所以我们应该使用新节点更新 `context.currentNode` 属性的值。

　　接下来，我们就可以在转换函数中使用 `replaceNode` 函数对 AST 中的节点进行替换了。如下面 `transformText` 函数的代码所示，它能够将文本节点转换为元素节点：

```
01 // 转换函数的第二个参数就是 context 对象
02 function transformText(node, context) {
03   if (node.type === 'Text') {
04     // 如果当前转换的节点是文本节点，则调用 context.replaceNode 函数将其替换为元素节点
05     context.replaceNode({
06       type: 'Element',
07       tag: 'span'
08     })
09   }
10 }
```

　　如上面的代码所示，转换函数的第二个参数就是 `context` 对象，所以我们可以在转换函数内部使用该对象上的任意属性或函数。在 `transformText` 函数内部，首先检查当前转换的节点是否是文本节点，如果是，则调用 `context.replaceNode` 函数将其替换为新的 `span` 标签节点。

　　下面的例子用来验证节点替换功能：

```
01 const ast = parse(`<div><p>Vue</p><p>Template</p></div>`)
02 transform(ast)
```

　　运行上面这段代码，其转换前后的结果分别是：

```
01 // 转换前
02 Root:
03 --Element: div
04 ----Element: p
05 ------Text: VueVue
06 ----Element: p
07 ------Text: TemplateTemplate
08
09 // 转换后
10 Root:
11 --Element: div
12 ----Element: h1
13 ------Element: span
14 ----Element: h1
15 ------Element: span
```

　　可以看到，转换后的 AST 中的文本节点全部变为 `span` 标签节点了。

　　除了替换节点，有时我们还希望移除当前访问的节点。我们可以通过实现 `context.removeNode` 函数来达到目的，如下面的代码所示：

```
01 function transform(ast) {
02   const context = {
03     currentNode: null,
04     parent: null,
05     replaceNode(node) {
06       context.currentNode = node
07       context.parent.children[context.childIndex] = node
08     },
09     // 用于删除当前节点。
10     removeNode() {
11       if (context.parent) {
12         // 调用数组的 splice 方法，根据当前节点的索引删除当前节点
13         context.parent.children.splice(context.childIndex, 1)
14         // 将 context.currentNode 置空
15         context.currentNode = null
16       }
17     },
18     nodeTransforms: [
19       transformElement,
20       transformText
21     ]
22   }
23
24   traverseNode(ast, context)
25   console.log(dump(ast))
26 }
```

　　移除当前访问的节点也非常简单，只需要取得其位置索引 `context.childIndex`，再调用数组的 `splice` 方法将其从所属的 `children` 列表中移除即可。另外，当节点被移除之后，不要忘记将 `context.currentNode` 的值置空。这里有一点需要注意，由于当前节点被移除了，所以后续的转换函数将不再需要处理该节点。因此，我们需要对 `traverseNode` 函数做一些调整，如下面的代码所示：

```
01 function traverseNode(ast, context) {
02   context.currentNode = ast
03
04   const transforms = context.nodeTransforms
05   for (let i = 0; i < transforms.length; i++) {
06     transforms[i](context.currentNode, context)
07     // 由于任何转换函数都可能移除当前节点，因此每个转换函数执行完毕后，
08     // 都应该检查当前节点是否已经被移除，如果被移除了，直接返回即可
09     if (!context.currentNode) return
10   }
11
12   const children = context.currentNode.children
13   if (children) {
14     for (let i = 0; i < children.length; i++) {
15       context.parent = context.currentNode
16       context.childIndex = i
17       traverseNode(children[i], context)
18     }
19   }
20 }
```

　　在修改后的 `traverseNode` 函数中，我们增加了一行代码，用于检查 `context.currentNode` 是否存在。由于任何转换函数都可能移除当前访问的节点，所以每个转换函数执行完毕后，都应该检查当前访问的节点是否已经被移除，如果被某个转换函数移除了，则 `traverseNode` 直接返回即可，无须做后续的处理。

　　有了 `context.removeNode` 函数之后，我们即可实现用于移除文本节点的转换函数，如下面的代码所示：

```
01 function transformText(node, context) {
02   if (node.type === 'Text') {
03     // 如果是文本节点，直接调用 context.removeNode 函数将其移除即可
04     context.removeNode()
05   }
06 }
```

　　配合上面的 `transformText` 转换函数，运行下面的用例：

```
01 const ast = parse(`<div><p>Vue</p><p>Template</p></div>`)
02 transform(ast)
```

　　转换前后输出结果是：

```
01 // 转换前
02 Root:
03 --Element: div
04 ----Element: p
05 ------Text: VueVue
06 ----Element: p
07 ------Text: TemplateTemplate
08
09 // 转换后
10 Root:
11 --Element: div
12 ----Element: h1
13 ----Element: h1
```

　　可以看到，在转换后的 AST 中，将不再有任何文本节点。

#### 15.4.3　进入与退出

　　在转换 AST 节点的过程中，往往需要根据其子节点的情况来决定如何对当前节点进行转换。这就要求父节点的转换操作必须等待其所有子节点全部转换完毕后再执行。然而，我们目前设计的转换工作流并不支持这一能力。上文中介绍的转换工作流，是一种从根节点开始、顺序执行的工作流，如图 15-22 所示。

![图 15-22](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/148.jpg)

**图 15-22　顺序执行工作流**

　　从图 15-22 中可以看到，`Root` 根节点第一个被处理，节点层次越深，对它的处理将越靠后。这种顺序处理的工作流存在的问题是，当一个节点被处理时，意味着它的父节点已经被处理完毕了，并且我们无法再回过头重新处理父节点。

　　更加理想的转换工作流应该如图 15-23 所示。

![图 15-23](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/149.jpg)

**图 15-23　更加理想的转换工作流**

　　由图 15-23 可知，对节点的访问分为两个阶段，即进入阶段和退出阶段。当转换函数处于进入阶段时，它会先进入父节点，再进入子节点。而当转换函数处于退出阶段时，则会先退出子节点，再退出父节点。这样，只要我们在退出节点阶段对当前访问的节点进行处理，就一定能够保证其子节点全部处理完毕。

　　为了实现如图 15-23 所示的转换工作流，我们需要重新设计转换函数的能力，如下面 `traverseNode` 函数的代码所示：

```
01 function traverseNode(ast, context) {
02   context.currentNode = ast
03   // 1. 增加退出阶段的回调函数数组
04   const exitFns = []
05   const transforms = context.nodeTransforms
06   for (let i = 0; i < transforms.length; i++) {
07     // 2. 转换函数可以返回另外一个函数，该函数即作为退出阶段的回调函数
08     const onExit = transforms[i](context.currentNode, context)
09     if (onExit) {
10       // 将退出阶段的回调函数添加到 exitFns 数组中
11       exitFns.push(onExit)
12     }
13     if (!context.currentNode) return
14   }
15
16   const children = context.currentNode.children
17   if (children) {
18     for (let i = 0; i < children.length; i++) {
19       context.parent = context.currentNode
20       context.childIndex = i
21       traverseNode(children[i], context)
22     }
23   }
24
25   // 在节点处理的最后阶段执行缓存到 exitFns 中的回调函数
26   // 注意，这里我们要反序执行
27   let i = exitFns.length
28   while (i--) {
29     exitFns[i]()
30   }
31 }
```

　　在上面这段代码中，我们增加了一个数组 `exitFns`，用来存储由转换函数返回的回调函数。接着，在 `traverseNode` 函数的最后，执行这些缓存在 `exitFns` 数组中的回调函数。这样就保证了，**当退出阶段的回调函数执行时，当前访问的节点的子节点已经全部处理过了**。有了这些能力之后，我们在编写转换函数时，可以将转换逻辑编写在退出阶段的回调函数中，从而保证在对当前访问的节点进行转换之前，其子节点一定全部处理完毕了，如下面的代码所示：

```
01 function transformElement(node, context) {
02   // 进入节点
03
04   // 返回一个会在退出节点时执行的回调函数
05   return () => {
06     // 在这里编写退出节点的逻辑，当这里的代码运行时，当前转换节点的子节点一定处理完毕了
07   }
08 }
```

　　另外还有一点需要注意，退出阶段的回调函数是反序执行的。这意味着，如果注册了多个转换函数，则它们的注册顺序将决定代码的执行结果。假设我们注册的两个转换函数分别是 `transformA` 和 `transformB`，如下面的代码所示：

```
01 function transform(ast) {
02   const context = {
03     // 省略部分代码
04
05     // 注册两个转换函数，transformA 先于 transformB
06     nodeTransforms: [
07       transformA,
08       transformB
09     ]
10   }
11
12   traverseNode(ast, context)
13   console.log(dump(ast))
14 }
```

　　在上面这段代码中，转换函数 `transformA` 先于 `transformB` 被注册。这意味着，在执行转换时，`transformA` 的“进入阶段”会先于 `transformB` 的“进入阶段”执行，而 `transformA` 的“退出阶段”将晚于 `transformB` 的“退出阶段”执行：

```
01 -- transformA 进入阶段执行
02 ---- transformB 进入阶段执行
03 ---- transformB 退出阶段执行
04 -- transformA 退出阶段执行
```

　　这么设计的好处是，转换函数 `transformA` 将有机会等待 `transformB` 执行完毕后，再根据具体情况决定应该如何工作。

　　如果将 `transformA` 与 `transformB` 的顺序调换，那么转换函数的执行顺序也将改变：

```
01 -- transformB 进入阶段执行
02 ---- transformA 进入阶段执行
03 ---- transformA 退出阶段执行
04 -- transformB 退出阶段执行
```

　　由此可见，当把转换逻辑编写在转换函数的退出阶段时，不仅能够保证所有子节点全部处理完毕，还能够保证所有后续注册的转换函数执行完毕。



### 15.5　将模板 AST 转为 JavaScript AST15.5

　　在上一节中，我们讨论了如何对 AST 进行转换，并实现了一个基本的插件架构，即通过注册自定义的转换函数实现对 AST 的操作。本节，我们将讨论如何将模板 AST 转换为 JavaScript AST，为后续讲解代码生成做铺垫。

　　为什么要将模板 AST 转换为 JavaScript AST 呢？原因我们已经多次提到：我们需要将模板编译为渲染函数。而渲染函数是由 JavaScript 代码来描述的，因此，我们需要将模板 AST 转换为用于描述渲染函数的 JavaScript AST。

　　以上一节给出的模板为例：

```
01 <div><p>Vue</p><p>Template</p></div>
```

与这段模板等价的渲染函数是：

```
01 function render() {
02   return h('div', [
03     h('p', 'Vue'),
04     h('p', 'Template')
05   ])
06 }
```

　　上面这段渲染函数的 JavaScript 代码所对应的 JavaScript AST 就是我们的转换目标。那么，它对应的 JavaScript AST 是什么样子的呢？与模板 AST 是模板的描述一样，JavaScript AST 是 JavaScript 代码的描述。所以，本质上我们需要设计一些数据结构来描述渲染函数的代码。

　　首先，我们观察上面这段渲染函数的代码。它是一个函数声明，所以我们首先要描述 JavaScript 中的函数声明语句。一个函数声明语句由以下几部分组成。

- `id`：函数名称，它是一个标识符 `Identifier`。
- `params`：函数的参数，它是一个数组。
- `body`：函数体，由于函数体可以包含多个语句，因此它也是一个数组。

　　为了简化问题，这里我们不考虑箭头函数、生成器函数、async 函数等情况。那么，根据以上这些信息，我们就可以设计一个基本的数据结构来描述函数声明语句：

```
01 const FunctionDeclNode = {
02   type: 'FunctionDecl' // 代表该节点是函数声明
03   // 函数的名称是一个标识符，标识符本身也是一个节点
04   id: {
05     type: 'Identifier',
06     name: 'render' // name 用来存储标识符的名称，在这里它就是渲染函数的名称 render
07   },
08   params: [], // 参数，目前渲染函数还不需要参数，所以这里是一个空数组
09   // 渲染函数的函数体只有一个语句，即 return 语句
10   body: [
11     {
12       type: 'ReturnStatement',
13       return: null // 暂时留空，在后续讲解中补全
14     }
15   ]
16 }
```

　　如上面的代码所示，我们使用一个对象来描述一个 JavaScript AST 节点。每个节点都具有 `type` 字段，该字段用来代表节点的类型。对于函数声明语句来说，它的类型是 `FunctionDecl`。接着，我们使用 `id` 字段来存储函数的名称。函数的名称应该是一个合法的标识符，因此 `id` 字段本身也是一个类型为 `Identifier` 的节点。当然，我们在设计 JavaScript AST 的时候，可以根据实际需要进行调整。例如，我们完全可以将 `id` 字段设计为一个字符串类型的值。这样做虽然不完全符合 JavaScript 的语义，但是能够满足我们的需求。对于函数的参数，我们使用 `params` 数组来存储。目前，我们设计的渲染函数还不需要参数，因此暂时设为空数组。最后，我们使用 `body` 字段来描述函数的函数体。一个函数的函数体内可以存在多个语句，所以我们使用一个数组来描述它。该数组内的每个元素都对应一条语句，对于渲染函数来说，目前它只有一个返回语句，所以我们使用一个类型为 `ReturnStatement` 的节点来描述该返回语句。

　　介绍完函数声明语句的节点结构后，我们再来看一下渲染函数的返回值。渲染函数返回的是虚拟 DOM 节点，具体体现在 `h` 函数的调用。我们可以使用 `CallExpression` 类型的节点来描述函数调用语句，如下面的代码所示：

```
01 const CallExp = {
02   type: 'CallExpression',
03   // 被调用函数的名称，它是一个标识符
04   callee: {
05     type: 'Identifier',
06     name: 'h'
07   },
08   // 参数
09   arguments: []
10 }
```

　　类型为 `CallExpression` 的节点拥有两个属性。

- `callee`：用来描述被调用函数的名称，它本身是一个标识符节点。
- `arguments`：被调用函数的形式参数，多个参数的话用数组来描述。

　　我们再次观察渲染函数的返回值：

```
01 function render() {
02   // h 函数的第一个参数是一个字符串字面量
03   // h 函数的第二个参数是一个数组
04   return h('div', [/*...*/])
05 }
```

　　可以看到，最外层的 `h` 函数的第一个参数是一个字符串字面量，我们可以使用类型为 `StringLiteral` 的节点来描述它：

```
01 const Str = {
02   type: 'StringLiteral',
03   value: 'div'
04 }
```

　　最外层的 `h` 函数的第二个参数是一个数组，我们可以使用类型为 `ArrayExpression` 的节点来描述它：

```
01 const Arr = {
02   type: 'ArrayExpression',
03   // 数组中的元素
04   elements: []
05 }
```

　　使用上述 `CallExpression`、`StringLiteral`、`ArrayExpression` 等节点来填充渲染函数的返回值，其最终结果如下面的代码所示：

```
01 const FunctionDeclNode = {
02   type: 'FunctionDecl' // 代表该节点是函数声明
03   // 函数的名称是一个标识符，标识符本身也是一个节点
04   id: {
05     type: 'Identifier',
06     name: 'render' // name 用来存储标识符的名称，在这里它就是渲染函数的名称 render
07   },
08   params: [], // 参数，目前渲染函数还不需要参数，所以这里是一个空数组
09   // 渲染函数的函数体只有一个语句，即 return 语句
10   body: [
11     {
12       type: 'ReturnStatement',
13       // 最外层的 h 函数调用
14       return: {
15         type: 'CallExpression',
16         callee: { type: 'Identifier', name: 'h' },
17         arguments: [
18           // 第一个参数是字符串字面量 'div'
19           {
20             type: 'StringLiteral',
21             value: 'div'
22           },
23           // 第二个参数是一个数组
24           {
25             type: 'ArrayExpression',
26             elements: [
27               // 数组的第一个元素是 h 函数的调用
28               {
29                 type: 'CallExpression',
30                 callee: { type: 'Identifier', name: 'h' },
31                 arguments: [
32                   // 该 h 函数调用的第一个参数是字符串字面量
33                   { type: 'StringLiteral', value: 'p' },
34                   // 第二个参数也是一个字符串字面量
35                   { type: 'StringLiteral', value: 'Vue' },
36                 ]
37               },
38               // 数组的第二个元素也是 h 函数的调用
39               {
40                 type: 'CallExpression',
41                 callee: { type: 'Identifier', name: 'h' },
42                 arguments: [
43                   // 该 h 函数调用的第一个参数是字符串字面量
44                   { type: 'StringLiteral', value: 'p' },
45                   // 第二个参数也是一个字符串字面量
46                   { type: 'StringLiteral', value: 'Template' },
47                 ]
48               }
49             ]
50           }
51         ]
52       }
53     }
54   ]
55 }
```

　　如上面这段 JavaScript AST 的代码所示，它是对渲染函数代码的完整描述。接下来我们的任务是，编写转换函数，将模板 AST 转换为上述 JavaScript AST。不过在开始之前，我们需要编写一些用来创建 JavaScript AST 节点的辅助函数，如下面的代码所示：

```
01 // 用来创建 StringLiteral 节点
02 function createStringLiteral(value) {
03   return {
04     type: 'StringLiteral',
05     value
06   }
07 }
08 // 用来创建 Identifier 节点
09 function createIdentifier(name) {
10   return {
11     type: 'Identifier',
12     name
13   }
14 }
15 // 用来创建 ArrayExpression 节点
16 function createArrayExpression(elements) {
17   return {
18     type: 'ArrayExpression',
19     elements
20   }
21 }
22 // 用来创建 CallExpression 节点
23 function createCallExpression(callee, arguments) {
24   return {
25     type: 'CallExpression',
26     callee: createIdentifier(callee),
27     arguments
28   }
29 }
```

　　有了这些辅助函数，我们可以更容易地编写转换代码。

　　为了把模板 AST 转换为 JavaScript AST，我们同样需要两个转换函数：`transformElement` 和 `transformText`，它们分别用来处理标签节点和文本节点。具体实现如下：

```
01 // 转换文本节点
02 function transformText(node) {
03   // 如果不是文本节点，则什么都不做
04   if (node.type !== 'Text') {
05     return
06   }
07   // 文本节点对应的 JavaScript AST 节点其实就是一个字符串字面量，
08   // 因此只需要使用 node.content 创建一个 StringLiteral 类型的节点即可
09   // 最后将文本节点对应的 JavaScript AST 节点添加到 node.jsNode 属性下
10   node.jsNode = createStringLiteral(node.content)
11 }
12
13 // 转换标签节点
14 function transformElement(node) {
15   // 将转换代码编写在退出阶段的回调函数中，
16   // 这样可以保证该标签节点的子节点全部被处理完毕
17   return () => {
18     // 如果被转换的节点不是元素节点，则什么都不做
19     if (node.type !== 'Element') {
20       return
21     }
22
23     // 1. 创建 h 函数调用语句,
24     // h 函数调用的第一个参数是标签名称，因此我们以 node.tag 来创建一个字符串字面量节点
25     // 作为第一个参数
26     const callExp = createCallExpression('h', [
27       createStringLiteral(node.tag)
28     ])
29     // 2. 处理 h 函数调用的参数
30     node.children.length === 1
31       // 如果当前标签节点只有一个子节点，则直接使用子节点的 jsNode 作为参数
32       ? callExp.arguments.push(node.children[0].jsNode)
33       // 如果当前标签节点有多个子节点，则创建一个 ArrayExpression 节点作为参数
34       : callExp.arguments.push(
35         // 数组的每个元素都是子节点的 jsNode
36         createArrayExpression(node.children.map(c => c.jsNode))
37       )
38     // 3. 将当前标签节点对应的 JavaScript AST 添加到 jsNode 属性下
39     node.jsNode = callExp
40   }
41 }
```

　　如上面的代码及注释所示，总体实现并不复杂。有两点需要注意：

- 在转换标签节点时，我们需要将转换逻辑编写在退出阶段的回调函数内，这样才能保证其子节点全部被处理完毕；
- 无论是文本节点还是标签节点，它们转换后的 JavaScript AST 节点都存储在节点的 `node.jsNode` 属性下。

　　使用上面两个转换函数即可完成标签节点和文本节点的转换，即把模板转换成 `h` 函数的调用。但是，转换后得到的 AST 只是用来描述渲染函数 `render` 的返回值的，所以我们最后一步要做的就是，补全 JavaScript AST，即把用来描述 `render` 函数本身的函数声明语句节点附加到 JavaScript AST 中。这需要我们编写 `transformRoot` 函数来实现对 `Root` 根节点的转换：

```
01 // 转换 Root 根节点
02 function transformRoot(node) {
03   // 将逻辑编写在退出阶段的回调函数中，保证子节点全部被处理完毕
04   return () => {
05     // 如果不是根节点，则什么都不做
06     if (node.type !== 'Root') {
07       return
08     }
09     // node 是根节点，根节点的第一个子节点就是模板的根节点，
10     // 当然，这里我们暂时不考虑模板存在多个根节点的情况
11     const vnodeJSAST = node.children[0].jsNode
12     // 创建 render 函数的声明语句节点，将 vnodeJSAST 作为 render 函数体的返回语句
13     node.jsNode = {
14       type: 'FunctionDecl',
15       id: { type: 'Identifier', name: 'render' },
16       params: [],
17       body: [
18         {
19           type: 'ReturnStatement',
20           return: vnodeJSAST
21         }
22       ]
23     }
24   }
25 }
```

　　经过这一步处理之后，模板 AST 将转换为对应的 JavaScript AST，并且可以通过根节点的 `node.jsNode` 来访问转换后的 JavaScript AST。下一节我们将讨论如何根据转换后得到的 JavaScript AST 生成渲染函数代码。



### 15.6　代码生成

　在上一节中，我们完成了 JavaScript AST 的构造。本节，我们将讨论如何根据 JavaScript AST 生成渲染函数的代码，即代码生成。代码生成本质上是字符串拼接的艺术。我们需要访问 JavaScript AST 中的节点，为每一种类型的节点生成相符的 JavaScript 代码。

　　本节，我们将实现 `generate` 函数来完成代码生成的任务。代码生成也是编译器的最后一步：

```
01 function compile(template) {
02   // 模板 AST
03   const ast = parse(template)
04   // 将模板 AST 转换为 JavaScript AST
05   transform(ast)
06   // 代码生成
07   const code = generate(ast.jsNode)
08
09   return code
10 }
```

　　与 AST 转换一样，代码生成也需要上下文对象。该上下文对象用来维护代码生成过程中程序的运行状态，如下面的代码所示：

```
01 function generate(node) {
02   const context = {
03     // 存储最终生成的渲染函数代码
04     code: '',
05     // 在生成代码时，通过调用 push 函数完成代码的拼接
06     push(code) {
07       context.code += code
08     }
09   }
10
11   // 调用 genNode 函数完成代码生成的工作，
12   genNode(node, context)
13
14   // 返回渲染函数代码
15   return context.code
16 }
```

　　在上面这段 `generate` 函数的代码中，首先我们定义了上下文对象 `context`，它包含 `context.code` 属性，用来存储最终生成的渲染函数代码，还定义了 `context.push` 函数，用来完成代码拼接，接着调用 `genNode` 函数完成代码生成的工作，最后将最终生成的渲染函数代码返回。

　　另外，我们希望最终生成的代码具有较强的可读性，因此我们应该考虑生成代码的格式，例如缩进和换行等。这就需要我们扩展 `context` 对象，为其增加用来完成换行和缩进的工具函数，如下面的代码所示：

```
01 function generate(node) {
02   const context = {
03     code: '',
04     push(code) {
05       context.code += code
06     },
07     // 当前缩进的级别，初始值为 0，即没有缩进
08     currentIndent: 0,
09     // 该函数用来换行，即在代码字符串的后面追加 \n 字符，
10     // 另外，换行时应该保留缩进，所以我们还要追加 currentIndent * 2 个空格字符
11     newline() {
12       context.code += '\n' + `  `.repeat(context.currentIndent)
13     },
14     // 用来缩进，即让 currentIndent 自增后，调用换行函数
15     indent() {
16       context.currentIndent++
17       context.newline()
18     },
19     // 取消缩进，即让 currentIndent 自减后，调用换行函数
20     deIndent() {
21       context.currentIndent--
22       context.newline()
23     }
24   }
25
26   genNode(node, context)
27
28   return context.code
29 }
```

　　在上面这段代码中，我们增加了 `context.currentIndent` 属性，它代表缩进的级别，初始值为 `0`，代表没有缩进，还增加了 `context.newline()` 函数，每次调用该函数时，都会在代码字符串后面追加换行符 `\n`。由于换行时需要保留缩进，所以我们还要追加 `context.currentIndent * 2` 个空格字符。这里我们假设缩进为两个空格字符，后续我们可以将其设计为可配置的。同时，我们还增加了 `context.indent()` 函数用来完成代码缩进，它的原理很简单，即让缩进级别 `context.currentIndent` 进行自增，再调用 `context.newline()` 函数。与之对应的 `context.deIndent()` 函数则用来取消缩进，即让缩进级别 `context.currentIndent` 进行自减，再调用 `context.newline()` 函数。

　　有了这些基础能力之后，我们就可以开始编写 `genNode` 函数来完成代码生成的工作了。代码生成的原理其实很简单，只需要匹配各种类型的 JavaScript AST 节点，并调用对应的生成函数即可，如下面的代码所示：

```
01 function genNode(node, context) {
02   switch (node.type) {
03     case 'FunctionDecl':
04       genFunctionDecl(node, context)
05       break
06     case 'ReturnStatement':
07       genReturnStatement(node, context)
08       break
09     case 'CallExpression':
10       genCallExpression(node, context)
11       break
12     case 'StringLiteral':
13       genStringLiteral(node, context)
14       break
15     case 'ArrayExpression':
16       genArrayExpression(node, context)
17       break
18   }
19 }
```

　　在 `genNode` 函数内部，我们使用 `switch` 语句来匹配不同类型的节点，并调用与之对应的生成器函数。

- 对于 `FunctionDecl` 节点，使用 `genFunctionDecl` 函数为该类型节点生成对应的 JavaScript 代码。
- 对于 `ReturnStatement` 节点，使用 `genReturnStatement` 函数为该类型节点生成对应的 JavaScript 代码。
- 对于 `CallExpression` 节点，使用 `genCallExpression` 函数为该类型节点生成对应的 JavaScript 代码。
- 对于 `StringLiteral` 节点，使用 `genStringLiteral` 函数为该类型节点生成对应的 JavaScript 代码。
- 对于 `ArrayExpression` 节点，使用 `genArrayExpression` 函数为该类型节点生成对应的 JavaScript 代码。

　　由于我们目前只涉及这五种类型的 JavaScript 节点，所以现在的 `genNode` 函数足够完成上述案例。当然，如果后续需要增加节点类型，只需要在 `genNode` 函数中添加相应的处理分支即可。

　　接下来，我们将逐步完善代码生成工作。首先，我们来实现函数声明语句的代码生成，即 `genFunctionDecl` 函数，如下面的代码所示：

```
01 function genFunctionDecl(node, context) {
02   // 从 context 对象中取出工具函数
03   const { push, indent, deIndent } = context
04   // node.id 是一个标识符，用来描述函数的名称，即 node.id.name
05   push(`function ${node.id.name} `)
06   push(`(`)
07   // 调用 genNodeList 为函数的参数生成代码
08   genNodeList(node.params, context)
09   push(`) `)
10   push(`{`)
11   // 缩进
12   indent()
13   // 为函数体生成代码，这里递归地调用了 genNode 函数
14   node.body.forEach(n => genNode(n, context))
15   // 取消缩进
16   deIndent()
17   push(`}`)
18 }
```

　　`genFunctionDecl` 函数用来为函数声明类型的节点生成对应的 JavaScript 代码。以渲染函数的声明节点为例，它最终生成的代码将会是：

```
01 function render () {
02   ... 函数体
03 }
```

　　另外我们注意到，在 `genFunctionDecl` 函数内部调用了 `genNodeList` 函数来为函数的参数生成对应的代码。它的实现如下：

```
01 function genNodeList(nodes, context) {
02   const { push } = context
03   for (let i = 0; i < nodes.length; i++) {
04     const node = nodes[i]
05     genNode(node, context)
06     if (i < nodes.length - 1) {
07       push(', ')
08     }
09   }
10 }
```

　　`genNodeList` 函数接收一个节点数组作为参数，并为每一个节点递归地调用 `genNode` 函数完成代码生成工作。这里要注意的一点是，每处理完一个节点，需要在生成的代码后面拼接逗号字符（`,`）。举例来说：

```
01 // 如果节点数组为
02 const node = [节点 1， 节点 2， 节点 3]
03 // 那么生成的代码将类似于
04 '节点 1，节点 2，节点 3'
05 // 如果在这段代码的前后分别添加圆括号，那么它将可用于函数的参数声明
06 ('节点 1，节点 2，节点 3')
07 // 如果在这段代码的前后分别添加方括号，那么它将是一个数组
08 ['节点 1，节点 2，节点 3']
```

　　由上例可知，`genNodeList` 函数会在节点代码之间补充逗号字符。实际上，`genArrayExpression` 函数就利用了这个特点来实现对数组表达式的代码生成，如下面的代码所示：

```
01 function genArrayExpression(node, context) {
02   const { push } = context
03   // 追加方括号
04   push('[')
05   // 调用 genNodeList 为数组元素生成代码
06   genNodeList(node.elements, context)
07   // 补全方括号
08   push(']')
09 }
```

　　不过，由于目前渲染函数暂时没有接收任何参数，所以 `genNodeList` 函数不会为其生成任何代码。对于 `genFunctionDecl` 函数，另外需要注意的是，由于函数体本身也是一个节点数组，所以我们需要遍历它并递归地调用 `genNode` 函数生成代码。

　　对于 `ReturnStatement` 和 `StringLiteral` 类型的节点来说，为它们生成代码很简单，如下所示：

```
01 function genReturnStatement(node, context) {
02   const { push } = context
03   // 追加 return 关键字和空格
04   push(`return `)
05   // 调用 genNode 函数递归地生成返回值代码
06   genNode(node.return, context)
07 }
08
09 function genStringLiteral(node, context) {
10   const { push } = context
11   // 对于字符串字面量，只需要追加与 node.value 对应的字符串即可
12   push(`'${node.value}'`)
13 }
```

　　最后，只剩下 `genCallExpression` 函数了，它的实现如下：

```
01 function genCallExpression(node, context) {
02   const { push } = context
03   // 取得被调用函数名称和参数列表
04   const { callee, arguments: args } = node
05   // 生成函数调用代码
06   push(`${callee.name}(`)
07   // 调用 genNodeList 生成参数代码
08   genNodeList(args, context)
09   // 补全括号
10   push(`)`)
11 }
```

　　可以看到，在 `genCallExpression` 函数内，我们也用到了 `genNodeList` 函数来为函数调用时的参数生成对应的代码。配合上述生成器函数的实现，我们将得到符合预期的渲染函数代码。运行如下测试用例：

```
01 const ast = parse(`<div><p>Vue</p><p>Template</p></div>`)
02 transform(ast)
03 const code = generate(ast.jsNode)
```

　　最终得到的代码字符串如下：

```
01 function render () {
02   return h('div', [h('p', 'Vue'), h('p', 'Template')])
03 }
```

### 15.7　总结

　　在本章中，我们首先讨论了 Vue.js 模板编译器的工作流程。Vue.js 的模板编译器用于把模板编译为渲染函数。它的工作流程大致分为三个步骤。

　　(1) 分析模板，将其解析为模板 AST。

　　(2) 将模板 AST 转换为用于描述渲染函数的 JavaScript AST。

　　(3) 根据 JavaScript AST 生成渲染函数代码。

　　接着，我们讨论了 `parser` 的实现原理，以及如何用有限状态自动机构造一个词法分析器。词法分析的过程就是状态机在不同状态之间迁移的过程。在此过程中，状态机会产生一个个 Token，形成一个 Token 列表。我们将使用该 Token 列表来构造用于描述模板的 AST。具体做法是，扫描 Token 列表并维护一个开始标签栈。每当扫描到一个开始标签节点，就将其压入栈顶。栈顶的节点始终作为下一个扫描的节点的父节点。这样，当所有 Token 扫描完毕后，即可构建出一棵树型 AST。

　　然后，我们讨论了 AST 的转换与插件化架构。AST 是树型数据结构，为了访问 AST 中的节点，我们采用深度优先的方式对 AST 进行遍历。在遍历过程中，我们可以对 AST 节点进行各种操作，从而实现对 AST 的转换。为了解耦节点的访问和操作，我们设计了插件化架构，将节点的操作封装到独立的转换函数中。这些转换函数可以通过 `context.nodeTransforms` 来注册。这里的 `context` 称为转换上下文。上下文对象中通常会维护程序的当前状态，例如当前访问的节点、当前访问的节点的父节点、当前访问的节点的位置索引等信息。有了上下文对象及其包含的重要信息后，我们即可轻松地实现节点的替换、删除等能力。但有时，当前访问节点的转换工作依赖于其子节点的转换结果，所以为了优先完成子节点的转换，我们将整个转换过程分为“进入阶段”与“退出阶段”。每个转换函数都分两个阶段执行，这样就可以实现更加细粒度的转换控制。

　　之后，我们讨论了如何将模板 AST 转换为用于描述渲染函数的 JavaScript AST。模板 AST 用来描述模板，类似地，JavaScript AST 用于描述 JavaScript 代码。只有把模板 AST 转换为 JavaScript AST 后，我们才能据此生成最终的渲染函数代码。

　　最后，我们讨论了渲染函数代码的生成工作。代码生成是模板编译器的最后一步工作，生成的代码将作为组件的渲染函数。代码生成的过程就是字符串拼接的过程。我们需要为不同的 AST 节点编写对应的代码生成函数。为了让生成的代码具有更强的可读性，我们还讨论了如何对生成的代码进行缩进和换行。我们将用于缩进和换行的代码封装为工具函数，并且定义到代码生成过程中的上下文对象中。
