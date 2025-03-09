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

## 4.4　分支切换与 `cleanup`

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



## 4.5　嵌套的 `effect` 与 `effect` 栈

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

## 9.7　总结

　　在本章中，我们首先讨论了 Diff 算法的作用。Diff 算法用来计算两组子节点的差异，并试图最大程度地复用 DOM 元素。在上一章中，我们采用了一种简单的方式来更新子节点，即卸载所有旧子节点，再挂载所有新子节点。然而这种更新方式无法对 DOM 元素进行复用，需要大量的 DOM 操作才能完成更新，非常消耗性能。于是，我们对它进行了改进。改进后的方案是，遍历新旧两组子节点中数量较少的那一组，并逐个调用 `patch` 函数进行打补丁，然后比较新旧两组子节点的数量，如果新的一组子节点数量更多，说明有新子节点需要挂载；否则说明在旧的一组子节点中，有节点需要卸载。

　　然后，我们讨论了虚拟节点中 `key` 属性的作用，它就像虚拟节点的“身份证号”。在更新时，渲染器通过 `key` 属性找到可复用的节点，然后尽可能地通过 DOM 移动操作来完成更新，避免过多地对 DOM 元素进行销毁和重建。

　　接着，我们讨论了简单 Diff 算法是如何寻找需要移动的节点的。简单 Diff 算法的核心逻辑是，拿新的一组子节点中的节点去旧的一组子节点中寻找可复用的节点。如果找到了，则记录该节点的位置索引。我们把这个位置索引称为最大索引。在整个更新过程中，如果一个节点的索引值小于最大索引，则说明该节点对应的真实 DOM 元素需要移动。

　　最后，我们通过几个例子讲解了渲染器是如何移动、添加、删除虚拟节点所对应的 DOM 元素的。
