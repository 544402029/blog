# vue3源码解析

## 权衡的艺术

### 命令式和声明式

命令式特点式关注过程，声明式更加关注结果。

声明式框架内部一定也是命令式的，只是暴漏给用户的更加声明式。



### 性能与可维护性的权衡

**声明式代码的性能不优于命令式代码的性能**。

**命令式**

```
div.textContent = 'hello vue3' // 直接修改
```



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



**命令式优于声明式，为什么选择声明式设计方案？**

原因在于声明式代码可维护性更强。命令式代码开发时，我们要手动完成DOM的创建、更新、删除等工作。而声明式代码展示的是我们要的结果，看上去更加直观。至于过程，由框架内部为我们封装好，让代码**在保持可维护性的同时让性能损失最小化**。



### 虚拟 DOM 的性能到底如何

前文说到，**声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗**，因此，如果我们能够最小化**找出差异的性能消耗**，就可以让声明式代码的性能无限接近命令式代码的性能。而所谓的虚拟 DOM，就是为了**最小化**找出差异这一步的性能消耗而出现的。



**比较 `innerHTML` 和虚拟 DOM 的性能**



- 创建页面时：

 `innerHTML` 创建页面的性能：**HTML 字符串拼接的计算量 + `innerHTML` 的 DOM 计算量**。

虚拟 DOM 在创建页面时的性能：**创建 JavaScript 对象的计算量 + 创建真实 DOM 的计算量**。



![image-20230508172857597](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230508172857597.png)





- 更新页面时：

![image-20230508173135884](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230508173135884.png)

可以发现，在更新页面时，虚拟 DOM 在 JavaScript 层面的运算要比创建页面时多出一个 Diff 的性能消耗，然而它毕竟也是 JavaScript 层面的运算，所以不会产生数量级的差异。再观察 DOM 层面的运算，可以发现虚拟 DOM 在更新页面时只会更新必要的元素，但 `innerHTML` 需要全量更新。这时虚拟 DOM 的优势就体现出来了。

　　另外，我们发现，当更新页面时，影响虚拟 DOM 的性能因素与影响 `innerHTML` 的性能因素不同。对于虚拟 DOM 来说，无论页面多大，都只会更新变化的内容，而对于 `innerHTML` 来说，页面越大，就意味着更新时的性能消耗越大。



![**`innerHTML`、虚拟 DOM 以及原生 JavaScript 在更新页面时的性能**](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230508173346867.png)



### 运行时和编译时

​		首先是纯运行时的框架。由于它没有编译的过程，因此我们没办法分析用户提供的内容，但是如果加入编译步骤，可能就大不一样了，我们可以分析用户提供的内容，看看哪些内容未来可能会改变，哪些内容永远不会改变，这样我们就可以在编译的时候提取这些信息，然后将其传递给 `Render` 函数，`Render` 函数得到这些信息之后，就可以做进一步的优化了。然而，假如我们设计的框架是纯编译时的，那么它也可以分析用户提供的内容。由于不需要任何运行时，而是直接编译成可执行的 JavaScript 代码，因此性能可能会更好，但是这种做法有损灵活性，即用户提供的内容必须编译后才能用。



## 响应系统的作用与实现

### 响应式数据的基本实现

- 当副作用函数 `effect` 执行时，会触发字段 `obj.text` 的**读取**操作；
- 当修改 `obj.text` 的值时，会触发字段 `obj.text` 的**设置**操作。

![image-20230510153331414](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230510153331414.png)

　接着，当设置 `obj.text` 时，再把副作用函数 `effect` 从“桶”里取出并执行即可

![image-20230510153443975](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230510153443975.png)

**把副作用函数从“桶”内取出并执行**

　接下来我们就根据如上思路，采用 `Proxy` 来实现：

```
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



```
01 effect(
02   // 一个匿名的副作用函数
03   () => {
04     document.body.innerText = obj.text
05   }
06 )
```



```
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



```
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





```
01 effect(function effectFn() {
02   document.body.innerText = obj.text
03 })
```

　在这段代码中存在三个角色：

- 被操作（读取）的代理对象 `obj`；
- 被操作（读取）的字段名 `text`；
- 使用 `effect` 函数注册的副作用函数 `effectFn`。



　　如果在不同的副作用函数中读取了两个不同对象的不同属性：

```
01 effect(function effectFn1() {
02   obj1.text1
03 })
04 effect(function effectFn2() {
05   obj2.text2
06 })
```



那么关系如下：

```
01 target1
02     └── text1
03         └── effectFn1
04 target2
05     └── text2
06         └── effectFn2
```



```
01 // 存储副作用函数的桶
02 const bucket = new WeakMap()
```



```
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



![image-20230510155659664](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230510155659664.png)

 



**`WeakMap`、`Map` 和 `Set` 之间的关系**

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
