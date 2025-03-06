# vue3源码解析

> 斜体为自己看时的记录

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



### 嵌套的 `effect` 与 `effect` 栈

`effect` 是可以发生嵌套的，例如：

```
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



```
01 data
02   └── foo
03     └── effectFn1
04   └── bar
05     └── effectFn2
```



在这种情况下，我们希望当修改 `obj.foo` 时会触发 `effectFn1` 执行。由于 `effectFn2` 嵌套在 `effectFn1` 里，所以会间接触发 `effectFn2` 执行，而当修改 `obj.bar` 时，只会触发 `effectFn2` 执行。但结果不是这样的，我们尝试修改 `obj.foo` 的值，会发现输出为：



```
01 'effectFn1 执行'
02 'effectFn2 执行'
03 'effectFn2 执行'
```



　一共打印三次，前两次分别是副作用函数 `effectFn1` 与 `effectFn2` 初始执行的打印结果，到这一步是正常的，问题出在第三行打印。我们修改了字段 `obj.foo` 的值，发现 `effectFn1` 并没有重新执行，反而使得 `effectFn2` 重新执行了，这显然不符合预期。



　　问题出在哪里呢？其实就出在我们实现的 `effect` 函数与 `activeEffect` 上。观察下面这段代码：

```
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



```
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



![image-20230511145533200](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230511145533200.png)



如此一来，响应式数据就只会收集直接读取其值的副作用函数作为依赖，从而避免发生错乱。



### 避免无限递归循环

​		实现一个完善的响应系统要考虑诸多细节。而本节要介绍的无限递归循环就是其中之一，还是举个例子：

```
01 const data = { foo: 1 }
02 const obj = new Proxy(data, { /*...*/ })
03
04 effect(() => obj.foo++)
```

　　

​		可以看到，在 `effect` 注册的副作用函数内有一个自增操作 `obj.foo++`，该操作会引起栈溢出：

```
01 Uncaught RangeError: Maximum call stack size exceeded
```



　　为什么会这样呢？接下来我们就尝试搞清楚这个问题，并提供解决方案。

　　实际上，我们可以把 `obj.foo++` 这个自增操作分开来看，它相当于：

```
01 effect(() => {
02   // 语句
03   obj.foo = obj.foo + 1
04 })
```



　在这个语句中，既会读取 `obj.foo` 的值，又会设置 `obj.foo` 的值，而这就是导致问题的根本原因。我们可以尝试推理一下代码的执行流程：首先读取 `obj.foo` 的值，这会触发 `track` 操作，将当前副作用函数收集到“桶”中，接着将其加 `1` 后再赋值给 `obj.foo`，此时会触发 `trigger` 操作，即把“桶”中的副作用函数取出并执行。但问题是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执行。这样会导致无限递归地调用自己，于是就产生了栈溢出。

　　解决办法并不难。通过分析这个问题我们能够发现，读取和设置操作是在同一个副作用函数内进行的。此时无论是 `track` 时收集的副作用函数，还是 `trigger` 时要触发执行的副作用函数，都是 `activeEffect`。基于此，我们可以在 `trigger` 动作发生时增加守卫条件：**如果 `trigger` 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行**，如以下代码所示：

```
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





### 计算属性 `computed` 与 `lazy`
