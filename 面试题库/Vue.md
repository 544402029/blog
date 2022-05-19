# Vue常考面试题
## Vue2.x 常考面试题

### 多页面应用与单页应用的区别?

##### 多页应用

每次页面跳转，后端返回一个新的 HTML

优点：

- 首屏时间快（页面首个屏幕的内容展现速度）
- SEO 效果好（搜索引擎可以识别首页中的跳转其它页面的链接）

缺点：

- 页面切换慢（每次跳转页面需发送 HTTP 请求）

##### 单页应用

JS 感知路由（URL）变化，动态清除页面内容并将新页面的内容挂载到页面上（JS 渲染），此时由前端实现路由

- 优点：页面切换快

- 缺点：首屏时间慢，SEO 差

在 vue 中不使用`<a>`标签进行页面跳转，使用`<router-link>`标签进行页面跳转 `<router-link to="/list">`列表页`</router-link>` 其中`to=""` 相当于`href=""`





### 了解MVVM框架吗？

了解 Vue.js。

### MVVM 使用了什么设计模式?

观察者模式

### 什么是组件化？

首先很久之前就有组件化的概念， 使用 asp jsp php 就可以。node.js 中也有类似的组件化。Vue和React搬过来，做了一个创新：数据驱动视图。

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1584159494287.png)

对比 Vue， React 组件化

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1584159539600.png)

但是， 传统组件它只是静态的渲染， 也就是说我们想显示谁的个人信息， 就要在后端拼接完数据去渲染。 渲染完页面就形成了， 不会再去改变了。你再需要去改需要自己去操作 DOM。所以当时 jQuery 是很流行的。因为操作 DOM 很多。

### MVC 是什么？

传统的 MVC 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。

![MVC](https://gitee.com/l544402029/res/raw/master/小书匠/1587266702810.png)

但是 MVC 有一个巨大的缺陷就是**控制器承担的责任太大**了，随着项目愈加复杂，控制器中的代码会越来越**臃肿**，导致出现不利于**维护**的情况。

### MVP 是什么？

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580482042948.png)

首先我们要了解一下MVP模式， 代码分为三层。 Model层（也就是我们所说的数据层）， Presenter呈现层(业务逻辑相关的控制层)， View层（视图层，页面上的DOM展示）。

当我们视图上的按钮被点击时， 控制器里的代码会执行， 它负责了所有的业务逻辑。控制器可以去调用模型层去发`ajax`请求，或者直接处理业务逻辑， 然后通过`DOM`操作来改变视图。

使用MVP模式我们大部分代码都是操作DOM。可以说是面向DOM开发。

### 如何理解 MVVM ？

![MVVM](https://gitee.com/l544402029/res/raw/master/小书匠/1584160135977.png)



- M: Model 层 （数据 vuex，data ）
- V：View 层 （视图）
- VM： ViewModel 层

在 MVVM 架构中，引入了 **ViewModel** 的概念。ViewModel 只关心数据和业务的处理，不关心 View 如何处理数据，在这种情况下，View 和 Model 都可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个 ViewModel 中，让多个 View 复用这个 ViewModel。

![MVVM](https://user-gold-cdn.xitu.io/2018/12/21/167ced454926a458?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

以 Vue 框架来举例，ViewModel 就是组件的实例。View 就是模板，Model 的话在引入 Vuex 的情况下是完全可以和组件分离的。

除了以上三个部分，其实在 MVVM 中还引入了一个隐式的 Binder 层，实现了 View 和 ViewModel 的绑定。

![Binder](https://user-gold-cdn.xitu.io/2018/12/21/167cf01bd8430243?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

同样以 Vue 框架来举例，这个隐式的 Binder 层就是 Vue 通过解析模板中的插值和指令从而实现 View 与 ViewModel 的绑定。

对于 MVVM 来说，其实最重要的并不是通过双向绑定或者其他的方式将 View 与 ViewModel 绑定起来，**而是通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓。**


### 响应式原理

Vue 内部使用了 `Object.defineProperty()` 来实现数据响应式，通过这个函数可以监听到 `set` 和 `get` 的事件。
```js
var data = { name: 'yck' }
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 自定义函数
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    }
  })
}
```
以上代码简单的实现了如何监听数据的 `set` 和 `get` 的事件，但是仅仅如此是不够的，因为自定义的函数一开始是不会执行的。只有先执行了依赖收集，才能在属性更新的时候派发更新，所以接下来我们需要先触发依赖收集。

```js
<div>
    {{name}}
</div>
```

在解析如上模板代码时，遇到 `{{name}}` 就会进行依赖收集。

接下来我们先来实现一个 `Dep` 类，用于解耦属性的依赖收集和派发更新操作。

```js
// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = []
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }
  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 全局属性，通过该属性配置 Watcher
Dep.target = null
```

以上的代码实现很简单，当需要依赖收集的时候调用 `addSub`，当需要派发更新的时候调用 `notify`。

接下来我们先来简单的了解下 Vue 组件挂载时添加响应式的过程。在组件挂载时，会先对所有需要的属性调用 `Object.defineProperty()`，然后实例化 `Watcher`，传入组件更新的回调。在实例化过程中，会对模板中的属性进行求值，触发依赖收集。

接下来的代码会简略的表达触发依赖收集时的操作。

```js
class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 Dom
    this.cb(this.value)
  }
}
```

以上就是 `Watcher` 的简单实现，在执行构造函数的时候将 `Dep.target` 指向自身，从而使得收集到了对应的 `Watcher`，在派发更新的时候取出对应的 `Watcher` 然后执行 `update` 函数。

接下来，需要对 `defineReactive` 函数进行改造，在自定义函数中添加依赖收集和派发更新相关的代码。

```js
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 watcher 的 update 方法
      dp.notify()
    }
  })
}
```

以上所有代码实现了一个简易的数据响应式，核心思路就是手动触发一次属性的 getter 来实现依赖收集。

现在我们就来测试下代码的效果，只需要把所有的代码复制到浏览器中执行，就会发现页面的内容全部被替换了。

```js
var data = { name: 'yck' }
observe(data)
function update(value) {
  document.querySelector('div').innerText = value
}
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'yyy' 
```

### Object.defineProperty 的缺陷?
以上已经分析完了 Vue 的响应式原理，接下来说一点 `Object.defineProperty` 中的缺陷。

如果通过下标方式修改数组数据或者给对象新增属性并不会触发组件的重新渲染，因为 `Object.defineProperty` 不能拦截到这些操作，更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。

对于第一个问题，Vue 提供了一个 API 解决
```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  // 判断是否为数组且下标是否有效
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 调用 splice 函数触发派发更新
    // 该函数已被重写
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 判断 key 是否已经存在
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // 如果对象不是响应式对象，就赋值返回
  if (!ob) {
    target[key] = val
    return val
  }
  // 进行双向绑定
  defineReactive(ob.value, key, val)
  // 手动派发更新
  ob.dep.notify()
  return val
}
```


对于数组而言，Vue 内部重写了以下函数实现派发更新
```js
// 获得数组原型
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
// 重写以下函数
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function (method) {
  // 缓存原生函数
  const original = arrayProto[method]
  // 重写函数
  def(arrayMethods, method, function mutator (...args) {
  // 先调用原生函数获得结果
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    // 调用以下几个函数时，监听新数据
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // 手动派发更新
    ob.dep.notify()
    return result
  })
})
```

### 为什么vue中通过`this.`的方式就可以获取`data`,`method`,`prop`内的数据，而不是`this.data.`的方式？

具体请看一下的代码， 在初始化数据`initState(vm);`中对`data`,`prop`做了一层代理，将三个属性下的所有`key`值都代理到了vue实例上。

```js
proxy(vm, "_props", key);
```

```js
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
```

### vue编译过程?

想必大家在使用 Vue 开发的过程中，基本都是使用模板的方式。那么你有过「模板是怎么在浏览器中运行的」这种疑虑嘛？

首先直接把模板丢到浏览器中肯定是不能运行的，模板只是为了方便开发者进行开发。Vue 会通过编译器将模板通过几个阶段最终编译为 `render` 函数，然后通过执行 `render` 函数生成 Virtual DOM 最终映射为真实 DOM。

接下来我们就来学习这个编译的过程，了解这个过程中大概发生了什么事情。这个过程其中又分为三个阶段，分别为：

1. 将模板解析为 AST
2. 优化 AST
3. 将 AST 转换为 render 函数

在第一个阶段中，最主要的事情还是通过各种各样的正则表达式去匹配模板中的内容，然后将内容提取出来做各种逻辑操作，接下来会生成一个最基本的 AST 对象
```js
{
    // 类型
    type: 1,
    // 标签
    tag,
    // 属性列表
    attrsList: attrs,
    // 属性映射
    attrsMap: makeAttrsMap(attrs),
    // 父节点
    parent,
    // 子节点
    children: []
}
```

然后会根据这个最基本的 AST 对象中的属性，进一步扩展 AST。

当然在这一阶段中，还会进行其他的一些判断逻辑。比如说对比前后开闭标签是否一致，判断根组件是否只存在一个，判断是否符合 HTML5 Content Model 规范等等问题。

接下来就是优化 AST 的阶段。在当前版本下，Vue 进行的优化内容其实还是不多的。只是对节点进行了静态内容提取，也就是将永远不会变动的节点提取了出来，实现复用 Virtual DOM，跳过对比算法的功能。在下一个大版本中，Vue 会在优化 AST 的阶段继续发力，实现更多的优化功能，尽可能的在编译阶段压榨更多的性能，比如说提取静态的属性等等优化行为。

最后一个阶段就是通过 AST 生成 `render` 函数了。其实这一阶段虽然分支有很多，但是最主要的目的就是遍历整个 AST，根据不同的条件生成不同的代码罢了。

###　NextTick 原理分析

`nextTick` 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。

在 Vue 2.4 之前都是使用的 microtasks，但是 microtasks 的优先级过高，在某些情况下可能会出现比事件冒泡更快的情况，但如果都使用 macrotasks 又可能会出现渲染的性能问题。所以在新版本中，会默认使用 microtasks，但在特殊情况下会使用 macrotasks，比如 v-on。

对于实现 macrotasks ，会先判断是否能使用 `setImmediate`，不能的话降级为 `MessageChannel` ，以上都不行的话就使用 `setTimeout`

```js
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

以上代码很简单，就是判断能不能使用相应的 API。

### 响应式（双向绑定）是什么原理? Model如何改变View？View又是如何改变Model的？

双向绑定原理：

Vue 采用**数据劫持**结合**发布者-订阅者模式**的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。



- data 更新 view 是使用 `Object.defineProperty()`监听 data 的变化，实现了数据响应式。通过这个函数可以监听到 `set` 和 `get` 的事件。当数据发生改变时就触发这个函数， 更新的方法放在`set`内就行了。

- view 更新 data 通过事件监听即可。比如`input`标签监听 `input` 事件就可以实现了。只不过框架执行了我们看不到。

### 监听 data 变化的核心 API 是什么？

核心 API - **Object.defineProperty**

![Object.defineProperty基本用法](https://gitee.com/l544402029/res/raw/master/小书匠/1586940879057.png)

我们对 data 对象定义一个属性叫做 name, 然后它可以监听 get 和 set。 get 的时候返回一个内容(name)。 set 的时候重新赋值一个内容。这样我们就把一个属性的赋值和获取都变成了一个函数。既然有函数我们就可以做监听了。我们可以打印 get 和 set。这样就监听起来了。

这样做之后打印 data.name 就可以打印出 get 和 zhangsan， 然后赋值 lisi 会打印 set。这样就监听到内容（name）的变化了。

### 如何深度监听 data ，数组变化？

深度监听、监听数组

```js
function updateView() {// 触发更新视图
  console.log('视图更新');
}

const oldArrayProperty = Array.prototype;// 重新定义数组原型
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach((methodName) => {
  arrProto[methodName] = function () {
    updateView(); // 触发视图更新
    oldArrayProperty[methodName].call(this, ...arguments);
    // Array.prototype.push.call(this, ...arguments)
  };
});

function defineReactive(target, key, value) {// 重新定义属性，监听起来
  observer(value);// 深度监听
  Object.defineProperty(target, key, { // 核心 API
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue);// 深度监听
        // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
        value = newValue;// 设置新值
        updateView();// 触发更新视图
      }
    },
  });
}

function observer(target) {// 监听对象属性
  if (typeof target !== 'object' || target === null) {// 不是对象或数组
    return target;  
  }
  // 污染全局的 Array 原型
  // Array.prototype.push = function () {
  //     updateView()
  //     ...
  // }
  if (Array.isArray(target)) {
    target.__proto__ = arrProto;
  }
  // 重新定义各个属性（for in 也可以遍历数组）
  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

// 准备数据
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京', // 需要深度监听
  },
  nums: [10, 20, 30],
};

// 监听数据
observer(data);

// 测试
// data.name = 'lisi'
// data.age = 21
// // console.log('age', data.age)
// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4); // 监听数组
```

以上代码重新定义原型，重写 push， pop 等方法， 实现监听。


### Object.defineProperty 的缺点？

- 深度监听，需要递归到底，一次性计算量大
- 无法监听新增属性、删除属性（Vue.set Vue.delete）
- 无法原生监听数组，需要特殊处理

### Object.defineProperty 的优点？

- 兼容性好，支持 IE9


### Proxy 相比于 defineProperty 的优势？

- 深度监听不用递归到底
- 可以监听新增属性， 删除属性
- 数组变化也能监听到
- 直接监听对象而非属性
- 支持更多的拦截方法 
- 性能更好 （Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；）

### Proxy 基本使用

![proxy基本使用](https://gitee.com/l544402029/res/raw/master/小书匠/1586944295809.png)

### Proxy 可以实现什么功能？

相当于是一个对象的代理 ，可以自定义对象中的操作。内部拥有`set`，`get`...等方法，可以实现数据响应式

Proxy 代理/拦截

- 拦截读取: `get (target, key)`
- 拦截设置：`set (target, key, value)`
- 拦截查找: `has (target, key)` // 拦截 `key in obj`操作
- 拦截删除: `deleteProperty (target, key)`
- 拦截遍历: `ownKeys(target)` // 拦截`Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames`

### Proxy 如何实现响应式？

```js
// 创建响应式
function reactive(target = {}) {
  if (typeof target !== 'object' || target == null) {
    // 不是对象或数组，则返回
    return target;
  }

  // 代理配置
  const proxyConf = {
    get(target, key, receiver) {
      // 只处理本身（非原型的）属性
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log('get', key); // 监听
      }

      const result = Reflect.get(target, key, receiver);

      // 深度监听
      // 性能如何提升的？
      return reactive(result);
    },
    set(target, key, val, receiver) {
      // 重复的数据，不处理
      if (val === target[key]) {
        return true;
      }

      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log('已有的 key', key);
      } else {
        console.log('新增的 key', key);
      }

      const result = Reflect.set(target, key, val, receiver);
      console.log('set', key, val);
      // console.log('result', result) // true
      return result; // 是否设置成功
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      console.log('delete property', key);
      // console.log('result', result) // true
      return result; // 是否删除成功
    },
  };

  // 生成代理对象
  const observed = new Proxy(target, proxyConf);
  return observed;
}

// 测试数据
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    city: 'beijing',
    a: {
      b: {
        c: {
          d: {
            e: 100,
          },
        },
      },
    },
  },
};

const proxyData = reactive(data);
```


### 为什么要使用虚拟 DOM？

因为 DOM 操作非常耗费性能，

所谓 v-dom 就是使用 JS 模拟 DOM 结构， 我们都知道 JS 执行速度很快， 我们可以使用 JS 计算出最小的变更来操作 DOM。

### 如何用 JS 模拟 DOM 结构？

DOM

```html
<div id="root">
    <div title="tt1" id="container">张三</div>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
</div>
```

JS 模拟 DOM

```js
var vdom = {
  tag: 'div',
  type: 1,
  value: undefined,
  data: {
    id: 'root',
  },
  children: [
    {
      tag: 'div',
      type: 1,
      value: undefined,
      data: {
        title: 'tt1',
        id: 'container'
      },
      children: [
        tag: 'undefined',
        type: 1,
        value: "张三",
        data: undefined,
        children: []
      ]
    },{
      tag: "ul"
      type: 1,
      value: undefined,
      data: {},
      children: [{
        tag: "li",
        type: 1,
        value: undefined,
        data: {},
        children: [
          {
            tag: undefined,
            type: 3,
            value: "1",
            data: undefined,
            children: []
          }
        ]

      },{
        {
          tag: "li",
          type: 1,
          value: undefined,
          data: {},
          children: [
            {
              tag: undefined,
              type: 3,
              value: "2",
              data: undefined,
              children: []
            }
          ]
        },
        {
          tag: "li",
          type: 1,
          value: undefined,
          data: {},
          children: [
            {
              tag: undefined,
              type: 3,
              value: "3",
              data: undefined,
              children: []
            }
          ]
        }
      }]
    }
  ],
};
```

### 你能讲一下 diff 算法吗？

diff 算法是 v-dom 中最核心，最关键的部分。

diff 即对比， 是一个广泛的概念， 如 linux diff 命令， git diff 等。

首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异。那么需要的时间复杂度会是 O(n ^ 3)，这个复杂度肯定是不能接受的。

- 第一， 遍历 tree1； 
- 第二， 遍历 tree2
- 第三， 排序
- 1000 个节点，要计算 1 亿次， 算法不可用

于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。

- 只比较同一层级， 不跨级对比
在实际业务中很少会去跨层的移动 DOM 元素。

只比较同一层级示意图：

![示意图](https://gitee.com/l544402029/res/raw/master/小书匠/1584421293247.png)

- 第一步先比较tag，tag 不相同， 则直接删掉重建， 不再深度比较

![ tag不相同](https://gitee.com/l544402029/res/raw/master/小书匠/1584421354676.png)

如图，D 和 G 的 tag 不相同，直接删掉重建为 G，即便 E 和 F 相同， 也不会再向下进行比较

- tag 和 key， 两者都相同， 则认为是相同节点， 不再深度比较

![对比图](https://gitee.com/l544402029/res/raw/master/小书匠/1586181939507.png)


### 为什么 Virtual DOM 比原生 DOM 快？
首先这个问题得分场景来说，如果无脑替换所有的 DOM 这种场景来说，Virtual DOM 的局部更新肯定要来的快。但是如果你可以人肉也同样去局部替换 DOM，那么 Virtual DOM 必然没有你直接操作 DOM 来的快，毕竟还有一层 diff 算法的损耗。

当然了 Virtual DOM 提高性能是其中一个优势，其实最大的优势还是在于：

- 将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
- 同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
- 实现组件的高度抽象化



### vue 模板到底是什么？

- 模板不是 html， 有指令、插值、JS 表达式， 能实现判断、循环
- html 只是标签语言， 只有 JS 才能实现判断、循环(图灵完备的)
- **因此， 模板一定是转换为某种 JS 代码， 即编译模板**

#### 编译模板

- 模板编译为 render 函数，执行 render 函数返回 vnode
- 基于 vnode 再执行 patch 和 diff
- 使用 webpack vue-loader, 会在开发环境编译模板（重要）

![编译模板](https://gitee.com/l544402029/res/raw/master/小书匠/1586183809733.png)

### 能说一下 vue 组件渲染和更新过程吗？

**初次渲染过程：**

- 解析模板为 render 函数（或在开发环境完成，vue-loader）
- 触发响应式，监听 data 属性 `getter` `setter`
- 执行 render 函数， 生成 vnode， patch(elem,vnode)

**更新过程**

- 修改 data， 触发 setter（此前在 getter 中已被监听）
- 重新执行 render 函数， 生成 newVnode
- patch(vnode,newVnode)

流程图：

![完成流程图](https://gitee.com/l544402029/res/raw/master/小书匠/1584440791063.png)



### 生命周期是什么?

::: tip 理解
`Vue`实例的生命周期就是：`Vue`实例在某一个时间点会自动执行的函数。`Vue`生命周期有 11 种之多，它分为不同的组。

- `beforeCreate`:　 `Vue`实例创建前 (获取不到`props`和`data`数据,可以添加 loading 事件)
- `created`:　　 `Vue`实例创建后 (可以获取数据,但组件未被加载，异步请求可以在这里调用)
- `beforeMount`:　　 模版数据挂载前 (开始创建 VDOM)
- `mounted`: 模版数据挂载后 (将 VDOM 渲染为真实的 DOM 并且渲染数据,挂载组件,可以获取节点)
- `beforeUpdate`:　 数据更新前　　　　(对数据进行处理的函数写这里。)
- `updated`:　　 数据更新后
- `beforeDestroy`:　 `Vue`实例销毁前　　　　(适合移除事件,定时器)
- `destroyed`:　　 `Vue`实例销毁后
- `activated`:　　 `keep-alive`组件激活时
- `deactivated`:　　 `keep-alive`组件停用时
- `errorCaptured`:　　捕获子 , 孙组件发生错误时触发 (2.5+版本增加)
:::

![生命周期图](https://cn.vuejs.org/images/lifecycle.png)

在 `beforeCreate` 钩子函数调用的时候，是获取不到 `props` 或者 `data` 中的数据的，因为这些数据的初始化都在 `initState` 中。

然后会执行 `created` 钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的。

接下来会先执行 `beforeMount` 钩子函数，开始创建 `VDOM`，最后执行 `mounted`钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。

接下来是数据更新时会调用的钩子函数 `beforeUpdate` 和 `updated`，这两个钩子函数没什么好说的，就是分别在数据更新前和更新后会调用。

另外还有 `keep-alive` 独有的生命周期，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。

最后就是销毁组件的钩子函数 `beforeDestroy` 和 `destroyed`。前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 `destroyed` 钩子函数。

### 父子组件的生命周期顺序

- 加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

- 子组件更新过程

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

- 父组件更新过程

父 beforeUpdate->父 updated

- 销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

### ajax 请求应该放在哪个生命周期？

**答案:**

放在`mounted`生命周期内

**解析**

因为本质上 JS 是单线程的，ajax 是异步获取数据的。

放在`mounted`之前其实并没有用，因为你放在`mounted`之前你以为会在很早把 Ajax 数据拿过来，但是由于 JS 没渲染完，你这个数据拿过来也并没有效果。

而且页面初始化时，`created` 到 `mounted` 的耗时非常短。所以 `ajax` 放在 `created` 里所能带来的优化效果，并不明显。

放在 `created` 里可以更早地获取到数据触发 `setter`，视图的重新渲染也会提前，但因为 `created` 发生在真实 `dom` 挂载之前，可能导致首屏等待时长变长。

### 何时需要使用 beforeDestory

- 自定义事件（$on $emit ）
- 清除定时器
- 解绑自定义 DOM 事件， 如 window scroll 等（window.addEventListener 绑定的事件）

### keep-alive 组件有什么作用?

如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 `keep-alive` 组件包裹需要保存的组件。

对于 `keep-alive` 组件来说，它拥有两个独有的生命周期钩子函数，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。

提供 `include` 和 `exclude` 属性，两者都支持字符串或正则表达式， `include` 表示只有名称匹配的组件会被缓存，`exclude` 表示任何名称匹配的组件都不会被缓存 ，其中 `exclude` 的优先级比 `include` 高；



### 双向数据绑定 v-model 的实现原理

- input 元素的 `value = this.name`
- 绑定 input 事件 `this.name = $event.target.value`
- data 更新触发 re-render

### vue 如何自己实现 v-model?

首先我们需要在自定义组件上面写入 v-model

![v-model](https://gitee.com/l544402029/res/raw/master/小书匠/1584147196591.png)

接着在自定义组件内写入 props 和 model， 如下：

![props/model](https://gitee.com/l544402029/res/raw/master/小书匠/1584147338097.png)




### 组件中 name 属性有什么用？

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。
1. 做递归组件的时候会用到
2. 对某个页面取消 keep-alive 的缓存的时候会用到
3. vue-devtools 调试工具

### 组件中 data 什么时候可以使用对象?

组件复用时所有组件实例都会共享 `data`，如果 `data` 是对象的话，就会造成一个组件修改 `data` 以后会影响到其他所有组件，所以需要将 `data` 写成函数，每次用到就调用一次函数获得新的数据。

当我们使用 `new Vue()` 的方式的时候，无论我们将 `data` 设置为对象还是函数都是可以的，因为 `new Vue()` 的方式是生成一个根组件，该组件不会复用，也就不存在共享 `data` 的情况了。


### 怎么强制刷新组件？

- `this.$forceUpdate()`。
- 组件上加上 key，然后变化 key 的值


### 怎么访问子组件的实例或者子元素？

- 先用 ref 特性为子组件赋予一个ID引用 `<base-input ref="myInput"></<base-input>`  
  - 比如子组件有个 `focus` 的方法，可以这样调用 `this.$refs.myInput.focus()`；
  - 比如子组件有个 `value` 的数据，可以这样使用 `this.$refs.myInput.value`。

- 先用ref特性为普通的 DOM 元素赋予一个ID引用

```vue
<ul ref="mydiv">
    <li class="item">第一个li</li>
    <li class="item">第一个li</li>
</ul>
console.log(this.$refs['mydiv'].getElementsByClassName('item')[0].innerHTML)//第一个li
```

### 组件会在什么时候下被销毁？

- 没有使用 `keep-alive` 时的路由切换；
- `v-if='false'；`
- 执行 `vm.$destroy()；`


### 为何组件 data 必须是一个函数？

组件复用时所有组件实例都会共享 `data`，如果 `data` 是对象的话，就会造成一个组件修改 `data` 以后会影响到其他所有组件，所以需要将 `data` 写成函数，每次用到就调用一次函数获得新的数据。。

当我们使用 `new Vue()` 的方式的时候，无论我们将 `data` 设置为对象还是函数都是可以的，因为 `new Vue()` 的方式是生成一个根组件，该组件不会复用，也就不存在共享 `data` 的情况了。

### 如何将组件的所有 props 传递给子组件？

- `<User v-bind="$props" />`

### props 与非 props 特性？

props 特性：

1. 在子组件中有`props`来接收父组件传来的数据

2. 可以在子组件中使用传来的数据，但是父组件设置的属性不会在最外层的元素上显示

非 props 特性：

1. 无法接收父组件传来的数据（因为子组件中没有相应的`props`来接收父组件传来的数据）；

2. 父组件设置的属性会在其最外层的元素上显示


### 父子组件如何进行通信？

- 父组件通过`props`传递数据给子组件，子组件通过`emit`发送事件传递数据给父组件。子组件不能直接修改`props`，而是必须通过发送事件的方式告知父组件修改数据。 (单向数据流)

- 当然我们也可以使用 `$parent` / `$children` 来实现父子组件通信。它们的主要目的是作为访问组件的应急方法。更推荐用 `props` 和 `events` 实现父子组件通信。

### 为什么要有单向数据流？

为了保证数据的单向流动，便于对数据进行追踪，避免数据混乱。

### 组件中的数据有哪几种形式？

组件中的数据共有三种形式：`data`,`props`, `computed`。



### 跨多层次组件通信

对于这种情况可以使用 Vue 2.2 新增的 API `provide / inject`，虽然文档中不推荐直接使用在业务中，但是如果用得好的话还是很有用的。

假设有父组件 A，然后有一个跨多层级的子组件 B

```js
// 父组件 A
export default {
  provide: {
    data: 1
  }
}
// 子组件 B
export default {
  inject: ['data'],
  mounted() {
    // 无论跨几层都能获得父组件的 data 属性
    console.log(this.data) // => 1
  }
}
```

### 非父子组件传值/任意组件

我们需要使用发布订阅模式或者总线机制来实现非父子组件传值。

![非父子组件传值](https://gitee.com/l544402029/res/raw/master/小书匠/1584267573447.png)

首先我们在 Vue 的原型链上创建一个 bus 属性， 指向一个 vue 实例。然后我们在其中一个组件上触发 change 事件， 在另外一个组件上监听绑定 change 事件， 此时就可以获取到兄弟组件传来的值了。

这种方法**通过一个空的 Vue 实例作为中央事件总线（事件中心）**，用它来**触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信**，包括父子、兄弟、跨级。



### 什么是作用域插槽？

如果我们的父组件需要一个子组件内定义的标题， 我们需要使用作用域插槽。

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1584149133026.png)

父组件通过 `v-slot="slotProps"` 接收到数据。 通过 `slotProps.slotData` 拿到子组件的数据

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1584149314804.png)

### 什么是具名插槽?

![具名插槽](https://gitee.com/l544402029/res/raw/master/小书匠/1584149606280.png)



### 聊一下Vuex？

![vuex](https://vuex.vuejs.org/vuex.png)

是一个公共存储的数据库，能够方便的在 vue 实例及其组件间传递数据。

### 聊聊Vuex的设计思想？
Vuex 全局维护着一个对象，使用到了单例设计模式。`state` 里面存放的数据是响应式的，Vue 组件从 `store` 读取数据，若是 `store` 中的数据发生改变，依赖项数据的组件也会发生更新。并且只能通过 `commit` 的方式改变状态，实现了单向数据流模式。


- `state`: 状态中心、存放数据

- `mutations`: 更改状态，同步的

- `actions`: 异步更改状态

- `getters`: 获取状态,计算属性

- `modules`: 将`state`分成多个`modules`，便于管理

#### 应用场景：

1. 多个组件间的状态和数据共享
2. 路由间的复杂数据传递。

非常要注意的地方：只要刷新或者退出浏览器，仓库清空。

**除非已经确定是特别简单的项目，其它都建议使用 vuex 的方式来进行数据通信，好处是数据易于管理，可维护性高，不易造成数据传递混乱**

### Vuex 中 action 和 mutation 有何区别？

- `action` 中处理异步， `mutation` 不可以
- `mutation` 做原子操作，每次只操作一个
- `action` 可以整合多个 `mutation`

### 为什么Vuex的mutation不能做异步操作？

因为当 mutation 触发的时候，异步回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

### 双向绑定和Vuex是否冲突？

严格模式中，会冲突，抛出一个错误。

可以使用以下方式进行解决：

用 “Vuex 的思维” 去解决这个问题的方法是：给 `<input>` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用一个方法:

```html
<input :value="message" @input="updateMessage">
```

```js
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```


### 手写一个过滤器

```js
filters:{
    addUnit(val){
        if(val){
            return val+'元/米'
        }else{
            return ''
        }
    }
}
Vue.filter('addUnit',function(val){
    if(val){
        return val+'元/米'
    }else{
        return ''
    }
})
new Vue({
  // ...
})
```


### extend 能做什么？

这个 API 很少用到，作用是**扩展组件生成一个构造器，通常会与 `$mount` 一起使用**。

```js
// 创建组件构造器
let Component = Vue.extend({
  template: '<div>test</div>',
});
// 挂载到 #app 上
new Component().$mount('#app');
// 除了上面的方式，还可以用来扩展已有的组件
let SuperComponent = Vue.extend(Component);
new SuperComponent({
  created() {
    console.log(1);
  },
});
new SuperComponent().$mount('#app');
```



### mixin 的问题

- 变量来源不明确， 不利于阅读
- 多 mixin 可能会造成命名冲突
- mixin 和组件可能会出现多对多的关系， 复杂度较高

### mixin 和 mixins 区别

`mixin` 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。

```js
Vue.mixin({
  beforeCreate() {
    // ...逻辑
    // 这种方式会影响到每个组件的 beforeCreate 钩子函数
  },
});
```

虽然文档不建议我们在应用中直接使用 `mixin`，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 ajax 或者一些工具函数等等。

`mixins` 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 `mixins` 混入代码，比如上拉下拉加载数据这种逻辑等等。

另外需要注意的是 `mixins` 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并。



### v-show 与 v-if 区别

`v-show` 只是在 `display: none` 和 `display: block` 之间切换。无论初始条件是什么都会被渲染出来，后面只需要切换 CSS，DOM 还是一直保留着的。所以总的来说 `v-show` 在初始渲染时有更高的开销，但是切换开销很小，更适合于频繁切换的场景。

`v-if` 的话就得说到 Vue 底层的编译了。当属性初始为 `false` 时，组件就不会被渲染，直到条件为 `true`，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合不经常切换的场景。

并且基于 `v-if` 的这种惰性渲染机制，可以在必要的时候才去渲染组件，减少整个页面的初始渲染开销。




### 为何在 v-for 中用 key？

使用 `v-for`更新已渲染的元素列表时,默认用就地复用策略。

也就是说列表数据修改的时候,他会根据`key`值去判断是否修改：如果修改,则重新渲染这一项;

否则复用之前的 dom，仅修改`value`值。

而且必须要使用`key`，而不是`index`或`random`。diff 算法是通过`tag`和`key`来判断，是否更新节点。这样就**减少了渲染次数，提升渲染性能。**




### vue 怎么实现阻止冒泡?

`stop`修饰符

### 常见事件修饰符有哪些？

- `stop`阻止冒泡

- `prevent`阻止浏览器的默认行为、

- `capture`事件捕获模式

- `self`只有触发元素是自身时才执行的事件

- `once`只执行一次的事件

- `passive`事件行为立即触发，而不会等待


### 给组件绑定自定义事件无效怎么解决？

加上修饰词 `.native`。

### 组合键如何使用？

组合键 `click.ctrl.exact` 只有`ctrl`被按下的时候才触发


### 绑定 class 的数组用法

- 对象方法 `v-bind:class="{'orange': isRipe, 'green': isNotRipe}"`
- 数组方法 `v-bind:class="[class1, class2]"`
- 行内 `v-bind:style="{color: color, fontSize: fontSize+'px' }"`


### computed 与 watch 和 methods 有什么区别?

- `computed`是计算属性，依赖其他属性来计算值，并且 `computed` 的值有**缓存**，只有当计算值变化才会返回内容。

- `watch` 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

- `methods` 每次都会进行计算

当有一些数据需要随着另外一些数据变化时，建议使用 computed。 当有一个通用的响应数据变化的时候，要执行一些业务逻辑或异步操作的时候建议使用 watcher

computed 和 watch 还都支持对象的写法

```js
vm.$watch('obj', {
    // 深度遍历
    deep: true,
    // 立即触发
    immediate: true,
    // 执行的函数
    handler: function(val, oldVal) {}
})
var vm = new Vue({
  data: { a: 1 },
  computed: {
    aPlus: {
      // this.aPlus 时触发
      get: function () {
        return this.a + 1
      },
      // this.aPlus = 1 时触发
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
```

### watch 的深度监听？

首先对于引用类型是没有深度监听的， 也就是说它下面的属性值改变并不会被监听到。 我们如果想做深度监听可以按照以下方式进行：

```vue
<template>
  <div>
    <input v-model="name" />
    <input v-model="info.city" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '双越',
      info: {
        city: '北京',
      },
    };
  },
  watch: {
    name(oldVal, val) {
      // eslint-disable-next-line
      console.log('watch name', oldVal, val); // 值类型，可正常拿到 oldVal 和 val
    },
    info: {
      handler(oldVal, val) {
        // eslint-disable-next-line
        console.log('watch info', oldVal, val); // 引用类型，拿不到 oldVal 。因为指针相同，此时已经指向了新的 val
      },
      deep: true, // 深度监听
      immediate: true//该回调将会在侦听开始之后被立即调用
    },
  },
};
</script>
```

在 watch 监听的引用类型下增加 handler 函数和 deep:true， 以实现深度监听。

对于引用类型来说也拿不到原先的属性值。


### \$nextTick 有什么用？

- 首先 Vue 是异步渲染
- data 改变之后， DOM 不会立刻渲染
- 异步渲染时会将 data 的修改做整合， 多次 data 修改只会渲染一次。也就是说 `$nextTick` 只会触发一次
- `$nextTick` 会在 DOM 渲染之后被触发， 以获取最新 DOM 节点



### nextTick 应用场景

```js
// DOM 还没有更新
this.$nextTick(function () {
  // DOM 现在更新了
  // `this` 绑定到当前实例
  this.doSomethingElse()
})
```

`nextTick` 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，可以获得更新后的 DOM。

应用场景：

- 需要在视图更新之后，基于新的视图进行操作。

- created()钩子函数进行的 DOM 操作。因为此时 DOM 并未渲染。


### vue 怎么做路由拦截？

利用`vue-router`提供的钩子函数`beforeEach()`对路由进行判断

### 动态路由定义和获取？

在 router 目录下的 index.js 文件中，对 path 属性加上 /:id。 `path: '/bookdetail/:id',`

使用 router 对象的 params.id 获取。 `id: this.$route.params.id`

### vue-router 有哪几种导航钩子?

三种

1. 全局导航钩子

- `router.beforeEach`   全局前置守卫
- `router.beforeResolve` 全局解析守卫
- `router.afterEach` 全局后置钩子(不会接受 next 函数也不会改变导航本身)


3. 路由独享的守卫

- `beforeEnter`

2.  组件内钩子

- `beforeRouteEnter`(在渲染该组件的对应路由被 confirm 前调用)
- `beforeRouteUpdate`(在当前路由改变，但是该组件被复用时调用)
- `beforeRouteLeave`(导航离开该组件的对应路由时调用)


### 请描述一下前端路由原理

前端路由实现起来其实很简单，本质就是**监听 URL 的变化**，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式

- Hash 模式
- History 模式

### 路由两种模式有什么区别？

**Hash 模式**

**hash 的特点**

- hash 变化会触发网页跳转，即浏览器的前进、后退。
- hash 永远不会提交到 server 端（前端自生自灭）

`www.test.com/#/` 就是 Hash URL。

当 `#` 后面的哈希值发生变化时，可以通过 `hashchange` 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 `www.test.com`。

```js
window.addEventListener('hashchange', () => {
  // ... 具体逻辑
});
```

Hash 模式相对来说更简单，并且兼容性也更好。

#### History 模式

History 模式是 HTML5 新推出的功能，主要使用 `history.pushState` 和 `history.replaceState` 改变 URL。

通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。

```js
// 新增历史记录
history.pushState(stateObject, title, URL);
// 替换当前历史记录
history.replaceState(stateObject, title, URL);
```

当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件

```js
window.addEventListener('popstate', (e) => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state);
});
```

两种模式对比
- Hash 模式只可以更改 `#` 后面的内容，History 模式可以通过 API 设置任意的同源 URL
- History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
- Hash 模式无需后端配置，并且兼容性好。History 模式后端需要配置。
- Hash 丑，url 带有#号,无法使用锚点定位。history 无#， 好看。


### Vue 和 React 之间的区别
Vue 的表单可以使用 `v-model` 支持双向绑定，相比于 React 来说开发上更加方便，当然了 `v-model` 其实就是个语法糖，本质上和 React 写表单的方式没什么区别。

改变数据方式不同，Vue 修改状态相比来说要简单许多，React 需要使用 `setState` 来改变状态，并且使用这个 API 也有一些坑点。并且 Vue 的底层使用了依赖追踪，页面更新渲染已经是最优的了，但是 React 还是需要用户手动去优化这方面的问题。

React 16以后，有些钩子函数会执行多次，这是因为引入 Fiber 的原因。

React 需要使用 JSX，有一定的上手成本，并且需要一整套的工具链支持，但是完全可以通过 JS 来控制页面，更加的灵活。Vue 使用了模板语法，相比于 JSX 来说没有那么灵活，但是完全可以脱离工具链，通过直接编写 `render` 函数就能在浏览器中运行。

在生态上来说，两者其实没多大的差距，当然 React 的用户是远远高于 Vue 的。

在上手成本上来说，Vue 一开始的定位就是尽可能的降低前端开发的门槛，然而 React 更多的是去改变用户去接受它的概念和思想，相较于 Vue 来说上手成本略高。

### SSR了解吗？

SSR也就是服务端渲染，也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把HTML直接返回给客户端。

SSR有着更好的SEO、并且首屏加载速度更快等优点。不过它也有一些缺点，比如我们的开发条件会受到限制，服务器端渲染只支持 `beforeCreate` 和 `created` 两个钩子，当我们需要一些外部扩展库时需要特殊处理。服务端渲染应用程序也需要处于 Node.js 的运行环境。还有就是服务器会有更大的负载需求。



### vue 常见性能优化方式？

1. 合理使用`v-show`、`v-if`、`computed`、`keep-alive`
2. `v-for`时加`key`，以及避免和`v-if`同时使用
3. 自定义事件、DOM 事件及时销毁
4. 使用路由懒加载、异步组件
5. `data` 层级不要太深，尽量扁平化

#### 懒加载
- 路由懒加载

当路由被访问的时候才加载对应组件

结合了 Vue 的**异步组件**和 **Webpack 的代码分割**功能，先将**异步组件**定义为返回一个 **Promise 的工厂函数**，使用**动态 import 语法**来定义**代码分块点**

```js
const Foo = () => import('./Foo.vue');
```

- 图片懒加载

当网络请求比较慢的时候,提前给这张图片添加一个像素比较低的占位图片，不至于堆叠在一块，或显示大片空白，让用户体验更好。

使用 vue 的 vue-lazyload 插件

在入口文件引入后把 `img` 标签里面的 `:src` 属性 改成 `v-lazy`



---

### 观察者模式

```js
// 定义发布者类
class Publisher {
  constructor() {
    this.observers = []
    console.log('Publisher created')
  }
  // 增加订阅者
  add(observer) {
    console.log('Publisher.add invoked')
    this.observers.push(observer)
  }
  // 移除订阅者
  remove(observer) {
    console.log('Publisher.remove invoked')
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }
  // 通知所有订阅者
  notify() {
    console.log('Publisher.notify invoked')
    this.observers.forEach((observer) => {
      observer.update(this)
    })
  }
}

// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
  constructor() {
    super()
    // 初始化需求文档
    this.prdState = null
    // 韩梅梅还没有拉群，开发群目前为空
    this.observers = []
    console.log('PrdPublisher created')
  }

  // 该方法用于获取当前的prdState
  getState() {
    console.log('PrdPublisher.getState invoked')
    return this.prdState
  }

  // 该方法用于改变prdState的值
  setState(state) {
    console.log('PrdPublisher.setState invoked')
    // prd的值发生改变
    this.prdState = state
    // 需求文档变更，立刻通知所有开发者
    this.notify()
  }
}

// 定义订阅者类
class Observer {
  constructor() {
    console.log('Observer created')
  }

  update() {
    console.log('Observer.update invoked')
  }
}



class DeveloperObserver extends Observer {
  constructor() {
    super()
    // 需求文档一开始还不存在，prd初始为空对象
    this.prdState = {}
    console.log('DeveloperObserver created')
  }

  // 重写一个具体的update方法
  update(publisher) {
    console.log('DeveloperObserver.update invoked')
    // 更新需求文档
    this.prdState = publisher.getState()
    // 调用工作函数
    this.work()
  }

  // work方法，一个专门搬砖的方法
  work() {
    // 获取需求文档
    const prd = this.prdState
    // 开始基于需求文档提供的信息搬砖。。。
    console.log('996 begins...')
  }
}


// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
  // 具体的需求内容
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)
```


### 实现一个Event Bus/ Event Emitter

Event Bus，即全局事件总线，严格来说不能说是观察者模式，而是发布-订阅模式。

Event Bus/Event Emitter 作为全局事件总线，它起到的是一个沟通桥梁的作用。我们可以把它理解为一个事件中心，我们所有事件的订阅/发布都不能由订阅方和发布方“私下沟通”，必须要委托这个事件中心帮我们实现。

在Vue中，有时候 A 组件和 B 组件中间隔了很远，看似没什么关系，但我们希望它们之间能够通信。这种情况下除了求助于 Vuex 之外，我们还可以通过 Event Bus 来实现我们的需求。

创建一个 Event Bus（本质上也是 Vue 实例）并导出：

```js
const EventBus = new Vue()
export default EventBus
```

在主文件里引入 EventBus ，并挂载到全局：

```js
import bus from 'EventBus的文件路径'
Vue.prototype.bus = bus
```

订阅事件：

```js
// 这里func指someEvent这个事件的监听函数
this.bus.$on('someEvent', func)
```

发布（触发）事件：

```js
// 这里params指someEvent这个事件被触发时回调函数接收的入参
this.bus.$emit('someEvent', params)
```

大家会发现，整个调用过程中，没有出现具体的发布者和订阅者（比如上节的PrdPublisher和DeveloperObserver），全程只有bus这个东西一个人在疯狂刷存在感。这就是全局事件总线的特点——所有事件的发布/订阅操作，必须经由事件中心，禁止一切“私下交易”！

下面，我们就一起来实现一个Event Bus（注意看注释里的解析）：

```js
class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {}
  }

  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = []
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb)
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 如果有，则逐个调用队列里的回调函数
      this.handlers[eventName].forEach((callback) => {
        callback(...args)
      })
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb.apply(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}
```


### 请实现一个简单的购物车实例

```vue
<template>
  <div>
    <header class="header">购物车</header>
    <section class="cart-goods">
      <div class="good-item" v-for="item of goods" :key="item.id">
        <div class="goods-item-info">{{ item.title }} - {{ item.price }}元</div>
        <div class="btn" @click.stop="add(item.id)">加入购物车</div>
      </div>
    </section>
    <hr />
    <section class="cart">
      <div class="good-item" v-for="item of list" :key="item.id">
        <div class="goods-item-info">{{ item.title }} - {{ item.price }}元</div>
        <div class="goods-item-right">
          <span class="btn" @click="add(item.id)">增加</span>
          <span class="num">{{ item.quantity }}</span>
          <span class="btn" @click="sub(item.id)">减少</span>
        </div>
      </div>
    </section>
    <section class="footer">合计：{{ totalPrice }}元</section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods: [
        {
          id: 1,
          title: '商品1',
          price: 10,
        },
        {
          id: 2,
          title: '商品2',
          price: 15,
        },
      ],
      cart: [],
    };
  },
  computed: {
    list: function () {
      return this.cart.map((cartitem) => {
        // 根据ID找到对应的商品
        const prduction = this.goods.find((item) => {
          return item.id === cartitem.id;
        });
        // 返回商品信息，外加购物数量
        return {
          ...prduction,
          quantity: cartitem.quantity,
        };
      });
    },
    totalPrice: function () {
      return this.list.reduce(
        (total, curItem) => total + curItem.price * curItem.quantity,
        0
      );
    },
  },
  methods: {
    add: function (id) {
      // 先看购物车中是否有该商品
      const prd = this.cart.find((item) => item.id === id);
      if (prd) {
        prd.quantity++;
        return;
      }
      //购物车没有该商品
      this.cart.push({
        id,
        quantity: 1, // 默认购物数量 1
      });
    },
    sub: function (id) {
      // 从购物车中找出该商品
      const prd = this.cart.find((item) => item.id === id);
      if (prd == null) {
        return;
      }
      prd.quantity--;
      // 如果数量减少到了 0
      if (prd.quantity <= 0) {
        this.cart = this.cart.filter((item) => item.id !== id);
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.btn
  display inline-flex
  align-items center
  height 30px
  padding 4px
  background #dcdcdc
  border-radius 4px
.good-item
  display flex
  justify-content space-between
  line-height 60px
.goods-item-right .num
  margin 0 15px
</style>
```

### 请实现一个简单的 TodoList？

```vue
<template>
  <div>
    <div class="todo-input-box">
      <input
        class="todo-input"
        type="text"
        placeholder="请添加待办的事项"
        v-model="todo"
        @keyup.enter="addtodo"
      />
      <span class="add" @click="addtodo">添加</span>
    </div>
    <list :list="list" @delete="del" @delline="through"> </list>
  </div>
</template>

<script>
import List from '../components/list';

export default {
  name: 'todolist',
  components: {
    List,
  },
  data() {
    return {
      todo: '',
      list: [],
    };
  },
  methods: {
    addtodo: function () {
      let itemId = 1;
      if (this.list.length !== 0) {
        const lastIndex = this.list.length - 1;
        itemId = this.list[lastIndex].id + 1;
      }
      const todoitem = {
        id: itemId,
        title: this.todo,
        completed: false,
      };
      this.list.push(todoitem);
      this.todo = '';
    },
    del: function (index) {
      this.list.splice(index, 1);
    },
    through: function (id, state) {
      this.list.map((item) => {
        if (item.id === id) {
          item.completed = state;
        }
      });
    },
  },
};
</script>
<style scoped>
.todo-input-box {
  display: flex;
  justify-content: center;
}
.todo-input {
  width: 70vw;
  border: 1px solid #666;
  border-radius: 4px;
  text-indent: 10px;
  margin-right: 10px;
}
.add {
  background: #dcdcdc;
  padding: 10px;
  border-radius: 4px;
}
</style>
```


list组件

```vue
<template>
  <ul class="list">
    <template v-for="(item, index) of list">
      <li class="item" :key="item.id">
        <input
          class="check"
          type="checkbox"
          name="item"
          :id="ids(item.id)"
          @click="check($event)"
        />
        <label :for="ids(item.id)" :class="isDelLine(item.completed)">{{
          item.title
        }}</label>
        <span class="delete" @click="del(index)">删除</span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: Array,
  },
  computed: {},
  methods: {
    ids: function(id) {
      return 'vid' + id;
    },
    isDelLine: function(completed) {
      return completed ? 'through' : '';
    },
    check: function(event) {
      const checked = event.target.checked;
      const id = event.target.id;
      this.$emit('delline', id, checked);
    },
    del: function(index) {
      const isDel = window.confirm('您确定要删除吗？');
      if (isDel === true) {
        this.$emit('delete', index);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.li {
  list-style: none;
}
.list {
  padding: 0 10px;
}
.list .item {
  display: flex;
  line-height: 40px;
  margin: 10px 0;
}
.item .check {
  margin-top: 12px;
}
.item .through {
  text-decoration: line-through;
}
.item label {
  flex: 1;
  background: #f0f0f0;
  padding: 0px 4px;
}
.item .delete {
  width: 50px;
}
</style>
```


## Vue3


![vue3思维导图](https://gitee.com/l544402029/res/raw/master/小书匠/1622731226157.png)

### Vue3 升级内容？

- 全部用 TS 重写（响应式、vdom、模板编译等）
- 性能提升，（打包出来的）代码量减少
- 会调整部分 API

### Vue3比Vue2有什么优势？

- 性能更好
- 体积更小
- 更好的TS支持（Vue3采用TS开发）
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

### Vue3生命周期和Vue2生命周期有什么区别？

#### Options API生命周期
- beforeDestory 改为 beforeUnmount
- destroyed 改为 unmounted
- 其它沿用 Vue2 生命周期

### Composition API 带来了什么？

- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

更适用于大型项目，复杂页面。


![类型推导(https://gitee.com/l544402029/res/raw/master/小书匠/1622731832802.png)

其中this.a, this.fn1 按照正常js规范是通过this.data.a, this.method.fn去访问。但是在vue2做了一层代理， 导致直接在this下就可以访问。这样非常不利于类型推导。



