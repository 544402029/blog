# JavaScript 设计模式核⼼原理与应⽤实践

## 设计原则

SOLID

- 单一功能原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

### 核心思想——封装变化

设计模式出现的背景，是软件设计的复杂度日益飙升。软件设计越来越复杂的“罪魁祸首”，就是**变化**。

但在实际开发中，不发生变化的代码可以说是不存在的。我们能做的只有将这个变化造成的影响**最小化** —— **将变与不变分离，确保变化的部分灵活、不变的部分稳定**。
这个过程，就叫“封装变化”；这样的代码，就是我们所谓的“健壮”的代码，它可以经得起变化的考验。而设计模式出现的意义，就是帮我们写出这样的代码。

### 设计模式的术

![image-20220805093228638](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805093228638.png)

设计模式的核心思想，就是“封装变化”。确实如此，无论是创建型、结构型还是行为型，这些具体的设计模式都是在用自己的方式去封装不同类型的变化 —— 创建型模式封装了创建对象过程中的变化，比如下节的工厂模式，它做的事情就是将创建对象的过程抽离；结构型模式封装的是对象之间组合方式的变化，目的在于灵活地表达对象间的配合与依赖关系；而行为型模式则将是对象千变万化的行为进行抽离，确保我们能够更安全、更方便地对行为进行更改。
封装变化，封装的正是软件中那些不稳定的要素，它是一种防患于未然的行为 —— 提前抽离了变化，就为后续的拓展提供了无限的可能性，如此，我们才能做到在变化到来的时候从容不迫。

## 工厂模式（创建型）

## 工厂模式·简单工厂

区分“变与不变”

```javascript
function User(name , age, career, work) {
    this.name = name
    this.age = age
    this.career = career
    this.work = work
}

function Factory(name, age, career) {
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码','写系分', '修Bug']
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...

    return new User(name, age, career, work)
}
```

## 工厂模式·抽象工厂

理解“开放封闭”

```javascript
class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
  // 提供硬件的接口
  createHardWare() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}

// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
    // 提供安卓系统实例
    return new AndroidOS();
  }
  createHardWare() {
    // 提供高通硬件实例
    return new QualcommHardWare();
  }
}

// 定义操作系统这类产品的抽象产品类
class OS {
  controlHardWare() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
  controlHardWare() {
    console.log("我会用安卓的方式去操作硬件");
  }
}

class AppleOS extends OS {
  controlHardWare() {
    console.log("我会用🍎的方式去操作硬件");
  }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log("我会用高通的方式去运转");
  }
}

class MiWare extends HardWare {
  operateByOrder() {
    console.log("我会用小米的方式去运转");
  }
}

// 这是我的手机
const myPhone = new FakeStarFactory();
// 让它拥有操作系统
const myOS = myPhone.createOS();
// 让它拥有硬件
const myHardWare = myPhone.createHardWare();
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare();
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder();
```

假如有一天，FakeStar 过气了，我们需要产出一款新机投入市场，这时候怎么办？我们是不是**不需要对抽象工厂 MobilePhoneFactory 做任何修改**，只需要拓展它的种类：

```javascript
class newStarFactory extends MobilePhoneFactory {
  createOS() {
    // 操作系统实现代码
  }
  createHardWare() {
    // 硬件实现代码
  }
}
```

# 单例模式（创建型）

Vuex 的数据管理哲学

**保证一个类仅有一个实例，并提供一个访问它的全局访问点**，这样的模式就叫做单例模式。

## ES6 版

```javascript
class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

// true
s1 === s2;
```

## 闭包版

```javascript
class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

// true
s1 === s2;
```

## Vuex 如何确保 Store 的唯一性

```javascript
// 安装vuex插件
Vue.use(Vuex);

// 将store注入到Vue实例中
new Vue({
  el: "#app",
  store,
});
```

通过调用 Vue.use()方法，我们安装了 Vuex 插件。Vuex 插件是一个对象，它在内部实现了一个 install 方法，这个方法会在插件安装时被调用，从而把 Store 注入到 Vue 实例里去。也就是说每 install 一次，都会尝试给 Vue 实例注入一个 Store。
在 install 方法里，有一段逻辑和我们楼上的 getInstance 非常相似的逻辑：

```javascript
let Vue // 这个Vue的作用和楼上的instance作用一样
...

export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}
```

## 面试真题

### 实现一个 Storage

####

描述

> #### 实现 Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。

#### 静态方法版本

```javascript
// 定义Storage
class Storage {
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!Storage.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      Storage.instance = new Storage();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return Storage.instance;
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    return localStorage.setItem(key, value);
  }
}

const storage1 = Storage.getInstance();
const storage2 = Storage.getInstance();

storage1.setItem("name", "李雷");
// 李雷
storage1.getItem("name");
// 也是李雷
storage2.getItem("name");

// 返回true
storage1 === storage2;
```

#### 闭包版

```javascript
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase() {}
StorageBase.prototype.getItem = function (key) {
  return localStorage.getItem(key);
};
StorageBase.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value);
};

// 以闭包的形式创建一个引用自由变量的构造函数
const Storage = (function () {
  let instance = null;
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new StorageBase();
    }
    return instance;
  };
})();

// 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果
const storage1 = new Storage();
const storage2 = new Storage();

storage1.setItem("name", "李雷");
// 李雷
storage1.getItem("name");
// 也是李雷
storage2.getItem("name");

// 返回true
storage1 === storage2;
```

## 实现一个全局的模态框

#### 描述

> #### 实现一个全局唯一的 Modal 弹框

####

#### 实现

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单例模式弹框</title>
</head>
<style>
    #modal {
        height: 200px;
        width: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        text-align: center;
    }
</style>
<body>
	<button id='open'>打开弹框</button>
	<button id='close'>关闭弹框</button>
</body>
<script>
    // 核心逻辑，这里采用了闭包思路来实现单例模式
    const Modal = (function() {
    	let modal = null
    	return function() {
            if(!modal) {
            	modal = document.createElement('div')
            	modal.innerHTML = '我是一个全局唯一的Modal'
            	modal.id = 'modal'
            	modal.style.display = 'none'
            	document.body.appendChild(modal)
            }
            return modal
    	}
    })()

    // 点击打开按钮展示模态框
    document.getElementById('open').addEventListener('click', function() {
        // 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理
    	const modal = new Modal()
    	modal.style.display = 'block'
    })

    // 点击关闭按钮隐藏模态框
    document.getElementById('close').addEventListener('click', function() {
    	const modal = new Modal()
    	if(modal) {
    	    modal.style.display = 'none'
    	}
    })
</script>
</html>
```

# 原型设计模式（创建型）

谈 Prototype 无小事

### 原型

在 JavaScript 中，每个构造函数都拥有一个 prototype 属性，它指向构造函数的原型对象，这个原型对象中有一个 constructor 属性指回构造函数；每个实例都有一个**proto**属性，当我们使用构造函数去创建实例时，实例的**proto**属性就会指向构造函数的原型对象。

```javascript
// 创建一个Dog构造函数
function Dog(name, age) {
  this.name = name;
  this.age = age;
}
Dog.prototype.eat = function () {
  console.log("肉骨头真好吃");
};
// 使用Dog构造函数创建dog实例
const dog = new Dog("旺财", 3);
```

这段代码里的几个实体之间就存在着这样的关系：

![image-20220805093835167](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805093835167.png)

### 原型链

```javascript
// 输出"肉骨头真好吃"
dog.eat();
// 输出"[object Object]"
dog.toString();
```

明明没有在 dog 实例里手动定义 eat 方法和 toString 方法，它们还是被成功地调用了。这是因为当我试图访问一个 JavaScript 实例的属性/方法时，它首先搜索这个实例本身；当发现实例没有定义对应的属性/方法时，它会转而去搜索实例的原型对象；如果原型对象中也搜索不到，它就去搜索原型对象的原型对象，这个搜索的轨迹，就叫做原型链。
以我们的 eat 方法和 toString 方法的调用过程为例，它的搜索过程就是这样子的：

![image-20220805093903839](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805093903839.png)

楼上这些彼此相连的 prototype，就组成了一个原型链。 注： 几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例，除了 Object.prototype（当然，如果我们手动用 Object.create(null)创建一个没有任何原型的对象，那它也不是 Object 的实例）。
以上为大家介绍了原型、原型链等 JavaScript 中核心的基础知识。这些不仅是基础中的基础，也是面试中的重点。此外在面试中，一些面试官可能会刻意混淆 JavaScript 中原型范式和强类型语言中原型模式的区别，当他们这么做的时候不一定是因为对语言、对设计模式的理解有问题，而很有可能是为了考察你**对象的深拷贝**。

### 对象的深拷贝

```javascript
function deepClone(obj) {
  // 如果是 值类型 或 null，则直接return
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 定义结果对象
  let copy = {};

  // 如果对象是数组，则定义结果数组
  if (obj.constructor === Array) {
    copy = [];
  }

  // 遍历对象的key
  for (let key in obj) {
    // 如果key是对象的自有属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用深拷贝方法
      copy[key] = deepClone(obj[key]);
    }
  }

  return copy;
}
```

调用深拷贝方法，若属性为值类型，则直接返回；若属性为引用类型，则递归遍历。这就是我们在解这一类题时的核心的方法。

# 装饰器模式（结构型）

对象装上它，就像开了挂
装饰器模式，又名装饰者模式。它的定义是“在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求”。

**不关心它现有的业务逻辑是啥样的，只对它已有的功能做个拓展，只关心拓展出来的那部分新功能如何实现。**

核心思想就是只进行添加，不修改原有逻辑。遵循了单一职责原则。

# 适配器模式（结构型）

兼容代码就是一把梭

适配器模式通过**把一个类的接口变换成客户端所期待的另一种接口**，可以帮我们解决**不兼容**的问题。

举例手机的耳机插孔

旧的 Ajax 方法

```javascript
// 发送get请求
Ajax(
  "get",
  url地址,
  post入参,
  function (data) {
    // 成功的回调逻辑
  },
  function (error) {
    // 失败的回调逻辑
  }
);
```

对老代码进行适配

```javascript
// Ajax适配器函数，入参与旧接口保持一致
async function AjaxAdapter(type, url, data, success, failed) {
  const type = type.toUpperCase();
  let result;
  try {
    // 实际的请求全部由新接口发起
    if (type === "GET") {
      result = (await HttpUtils.get(url)) || {};
    } else if (type === "POST") {
      result = (await HttpUtils.post(url, data)) || {};
    }
    // 假设请求成功对应的状态码是1
    result.statusCode === 1 && success
      ? success(result)
      : failed(result.statusCode);
  } catch (error) {
    // 捕捉网络错误
    if (failed) {
      failed(error.statusCode);
    }
  }
}

// 用适配器适配旧的Ajax方法
async function Ajax(type, url, data, success, failed) {
  await AjaxAdapter(type, url, data, success, failed);
}
```

# 代理模式（结构型）

代理模式，式如其名——在某些情况下，出于种种考虑/限制，一个对象**不能直接访问**另一个对象，需要一个**第三者**（代理）牵线搭桥从而间接达到访问目的，这样的模式就是代理模式。

## ES6 中的 Proxy

```javascript
const proxy = new Proxy(obj, handler)

// 普通私密信息
const baseInfo = ['age', 'career']
// 最私密信息
const privateInfo = ['avatar', 'phone']

// 用户（同事A）对象实例
const user = {
    ...(一些必要的个人信息)
    isValidated: true,
    isVIP: false,
}

// 规定礼物的数据结构由type和value组成
const present = {
    type: '巧克力',
    value: 60,
}

// 为用户增开presents字段存储礼物
const girl = {
  // 姓名
  name: '小美',
  // 自我介绍
  aboutMe: '...'（大家自行脑补吧）
  // 年龄
  age: 24,
  // 职业
  career: 'teacher',
  // 假头像
  fakeAvatar: 'xxxx'(新垣结衣的图片地址）
  // 真实头像
  avatar: 'xxxx'(自己的照片地址),
  // 手机号
  phone: 123456,
  // 礼物数组
  presents: [],
  // 拒收50块以下的礼物
  bottomValue: 50,
  // 记录最近一次收到的礼物
  lastPresent: present,
}

// 掘金婚介所推出了小礼物功能
const JuejinLovers = new Proxy(girl, {
  get: function(girl, key) {
    if(baseInfo.indexOf(key)!==-1 && !user.isValidated) {
        alert('您还没有完成验证哦')
        return
    }

    //...(此处省略其它有的没的各种校验逻辑)

    // 此处我们认为只有验证过的用户才可以购买VIP
    if(user.isValidated && privateInfo.indexOf(key)!==-1 && !user.isVIP) {
        alert('只有VIP才可以查看该信息哦')
        return
    }
  }

  set: function(girl, key, val) {

    // 最近一次送来的礼物会尝试赋值给lastPresent字段
    if(key === 'lastPresent') {
      if(val.value < girl.bottomValue) {
          alert('sorry，您的礼物被拒收了')
          return
      }

      // 如果没有拒收，则赋值成功，同时并入presents数组
      girl.lastPresent = val
      girl.presents = [...girl.presents, val]
    }
  }

})
```

## 事件代理

事件代理，可能是代理模式最常见的一种应用方式，也是一道实打实的高频面试题。它的场景是一个父元素下有多个子元素，像这样：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>事件代理</title>
  </head>
  <body>
    <div id="father">
      <a href="#">链接1号</a>
      <a href="#">链接2号</a>
      <a href="#">链接3号</a>
      <a href="#">链接4号</a>
      <a href="#">链接5号</a>
      <a href="#">链接6号</a>
    </div>
  </body>
</html>
```

```html
// 假如不用代理模式，我们将循环安装监听函数 const aNodes =
document.getElementById('father').getElementsByTagName('a') const aLength =
aNodes.length for(let i=0;i<aLength;i++) { aNodes[i].addEventListener('click',
function(e) { e.preventDefault() alert(`我是${aNodes[i].innerText}`) }) }
```

考虑到事件本身具有“冒泡”的特性，当我们点击 a 元素时，点击事件会“冒泡”到父元素 div 上，从而被监听到。如此一来，点击事件的监听函数只需要在 div 元素上被绑定一次即可，而不需要在子元素上被绑定 N 次——这种做法就是事件代理，它可以很大程度上提高我们代码的性能。

### 事件代理的实现

```javascript
// 获取父元素
const father = document.getElementById("father");

// 给父元素安装一次监听函数
father.addEventListener("click", function (e) {
  // 识别是否是目标子元素
  if (e.target.tagName === "A") {
    // 以下是监听函数的函数体
    e.preventDefault();
    alert(`我是${e.target.innerText}`);
  }
});
```

在这种做法下，我们的点击操作并不会直接触及目标子元素，而是由父元素对事件进行处理和分发、间接地将其作用于子元素，因此这种操作从模式上划分属于代理模式。

## 缓存代理

缓存代理比较好理解，它应用于一些计算量较大的场景里。在这种场景下，我们需要“用空间换时间”——当我们需要用到某个已经计算过的值的时候，不想再耗时进行二次计算，而是希望能从内存里去取出现成的计算结果。这种场景下，就需要一个代理来帮我们在进行计算的同时，进行计算结果的缓存了。
一个比较典型的例子，是对传入的参数进行求和：

```javascript
// addAll方法会对你传入的所有参数做求和操作
const addAll = function () {
  console.log("进行了一次新计算");
  let result = 0;
  const len = arguments.length;
  for (let i = 0; i < len; i++) {
    result += arguments[i];
  }
  return result;
};

// 为求和方法创建代理
const proxyAddAll = (function () {
  // 求和结果的缓存池
  const resultCache = {};
  return function () {
    // 将入参转化为一个唯一的入参字符串
    const args = Array.prototype.join.call(arguments, ",");

    // 检查本次入参是否有对应的计算结果
    if (args in resultCache) {
      // 如果有，则返回缓存池里现成的结果
      return resultCache[args];
    }
    return (resultCache[args] = addAll(...arguments));
  };
})();
```

我们把这个方法丢进控制台，尝试同一套入参两次，结果喜人：

![image-20220805094028579](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094028579.png)
我们发现 proxyAddAll 针对重复的入参只会计算一次，这将大大节省计算过程中的时间开销。现在我们有 6 个入参，可能还看不出来，当我们针对大量入参、做反复计算时，缓存代理的优势将得到更充分的凸显。

## 保护代理

开婚介所的时候，为了保护用户的私人信息，我们会在同事哥访问小美的年龄的时候，去校验同事哥是否已经通过了我们的实名认证；为了确保~~婚介所的利益~~同事哥确实是一位有诚意的男士，当他想获取小美的联系方式时，我们会校验他是否具有 VIP 资格。所谓“保护代理”，就是在访问层面做文章，在 getter 和 setter 函数里去进行校验和拦截，确保一部分变量是安全的。
值得一提的是，上节中我们提到的 Proxy，它本身就是为拦截而生的，所以我们目前实现保护代理时，考虑的首要方案就是 ES6 中的 Proxy。

# 策略模式（行为型）

重构小能手，拆分“胖逻辑”

定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。

原先的代码

```javascript
function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === "pre") {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  }
  // 处理大促价
  if (tag === "onSale") {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  }

  // 处理返场价
  if (tag === "back") {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  }

  // 处理尝鲜价
  if (tag === "fresh") {
    return originPrice * 0.5;
  }

  // 处理新人价
  if (tag === "newUser") {
    if (originPrice >= 100) {
      return originPrice - 50;
    }
    return originPrice;
  }
}
```

## 单一功能改造

```javascript
// 处理预热价
function prePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 20;
  }
  return originPrice * 0.9;
}

// 处理大促价
function onSalePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 30;
  }
  return originPrice * 0.8;
}

// 处理返场价
function backPrice(originPrice) {
  if (originPrice >= 200) {
    return originPrice - 50;
  }
  return originPrice;
}

// 处理尝鲜价
function freshPrice(originPrice) {
  return originPrice * 0.5;
}

function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === "pre") {
    return prePrice(originPrice);
  }
  // 处理大促价
  if (tag === "onSale") {
    return onSalePrice(originPrice);
  }

  // 处理返场价
  if (tag === "back") {
    return backPrice(originPrice);
  }

  // 处理尝鲜价
  if (tag === "fresh") {
    return freshPrice(originPrice);
  }
}
```

到这里，在单一功能原则的指引下，我们已经解决了一半的问题。
我们现在来捋一下，其实这个询价逻辑整体上来看只有两个关键动作：

> 询价逻辑的分发 ——> 询价逻辑的执行

在改造的第一步，我们已经把“询价逻辑的执行”给摘了出去，并且实现了不同询价逻辑之间的解耦。接下来，我们就要拿“分发”这个动作开刀。

## 开放封闭改造

剩下一半的问题是啥呢？就是咱们上面说的那个新人价的问题——这会儿我要想给 askPrice 增加新人询价逻辑，我该咋整？我只能这么来：

```javascript
// 处理预热价
function prePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 20;
  }
  return originPrice * 0.9;
}

// 处理大促价
function onSalePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 30;
  }
  return originPrice * 0.8;
}

// 处理返场价
function backPrice(originPrice) {
  if (originPrice >= 200) {
    return originPrice - 50;
  }
  return originPrice;
}

// 处理尝鲜价
function freshPrice(originPrice) {
  return originPrice * 0.5;
}

function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === "pre") {
    return prePrice(originPrice);
  }
  // 处理大促价
  if (tag === "onSale") {
    return onSalePrice(originPrice);
  }

  // 处理返场价
  if (tag === "back") {
    return backPrice(originPrice);
  }

  // 处理尝鲜价
  if (tag === "fresh") {
    return freshPrice(originPrice);
  }
}
```

在 askPrice 里面，我们新增了一个 if-else 判断。可以看出，这样其实还是在修改 askPrice 的函数体，没有实现“对扩展开放，对修改封闭”的效果。
那么我们应该怎么做？我们仔细想想，楼上用了这么多 if-else，我们的目的到底是什么？是不是就是为了把 询价标签-询价函数 这个映射关系给明确下来？那么在 JS 中，有没有什么既能够既帮我们明确映射关系，同时不破坏代码的灵活性的方法呢？答案就是**对象映射**！
咱们完全可以把询价算法全都收敛到一个对象里去嘛：

```javascript
// 定义一个询价处理器对象
const priceProcessor = {
  pre(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};
```

当我们想使用其中某个询价算法的时候：通过标签名去定位就好了：

```javascript
// 询价函数
function askPrice(tag, originPrice) {
  return priceProcessor[tag](originPrice);
}
```

# 状态模式（行为型）

状态模式和策略模式宛如一对孪生兄弟——它们长得很像、解决的问题也可以说没啥本质上的差别。

> 状态模式主要解决的是当控制一个对象状态的条件表达式过于复杂时的情况。把状态的判断逻辑转移到表示不同状态的一系列类中，可以把复杂的判断逻辑简化。

## 一台咖啡机的诞生

旧代码

```javascript
class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
  }

  // 关注咖啡机状态切换函数
  changeState(state) {
    // 记录当前状态
    this.state = state;
    if (state === "american") {
      // 这里用 console 代指咖啡制作流程的业务逻辑
      console.log("我只吐黑咖啡");
    } else if (state === "latte") {
      console.log(`给黑咖啡加点奶`);
    } else if (state === "vanillaLatte") {
      console.log("黑咖啡加点奶再加香草糖浆");
    } else if (state === "mocha") {
      console.log("黑咖啡加点奶再加点巧克力");
    }
  }
}
```

## 职责分离

```javascript
class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
  }
  changeState(state) {
    // 记录当前状态
    this.state = state;
    if (state === "american") {
      // 这里用 console 代指咖啡制作流程的业务逻辑
      this.americanProcess();
    } else if (state === "latte") {
      this.latteProcress();
    } else if (state === "vanillaLatte") {
      this.vanillaLatteProcress();
    } else if (state === "mocha") {
      this.mochaProcress();
    }
  }

  americanProcess() {
    console.log("我只吐黑咖啡");
  }

  latteProcress() {
    this.americanProcess();
    console.log("加点奶");
  }

  vanillaLatteProcress() {
    this.latteProcress();
    console.log("再加香草糖浆");
  }

  mochaProcress() {
    this.latteProcress();
    console.log("再加巧克力");
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");
```

## 开放封闭

复用的问题解决了，if-else 却仍然活得好好的。
现在咱们假如要增加”气泡美式“这个咖啡品种，就不得不去修改 changeState 的函数逻辑，这违反了开放封闭的原则。
同时，一个函数里收敛这么多判断，也着实不够体面。咱们现在要像策略模式一样，想办法把咖啡机状态和咖啡制作工序之间的映射关系（也就是咱们上节谈到的分发过程）用一个更优雅地方式做掉。如果你策略模式掌握得足够好，你会第一时间反映出对象映射的方案：

```javascript
const stateToProcessor = {
  american() {
    console.log("我只吐黑咖啡");
  },
  latte() {
    this.american();
    console.log("加点奶");
  },
  vanillaLatte() {
    this.latte();
    console.log("再加香草糖浆");
  },
  mocha() {
    this.latte();
    console.log("再加巧克力");
  },
};

class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
  }

  // 关注咖啡机状态切换函数
  changeState(state) {
    // 记录当前状态
    this.state = state;
    // 若状态不存在，则返回
    if (!stateToProcessor[state]) {
      return;
    }
    stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");
```

当我们这么做时，其实已经实现了一个 js 版本的状态模式。
但这里有一点大家需要引起注意：这种方法仅仅是看上去完美无缺，其中却暗含一个非常重要的隐患——stateToProcessor 里的工序函数，感知不到咖啡机的内部状况。

## 策略与状态的辨析

怎么理解这个问题？大家知道，策略模式是对算法的封装。算法和状态对应的行为函数虽然本质上都是行为，但是算法的独立性可高多了。
比如说我一个询价算法，我只需要读取一个数字，我就能啪啪三下五除二给你吐出另一个数字作为返回结果——它和计算主体之间可以是分离的，我们只要关注计算逻辑本身就可以了。
但状态可不一样了。拿咱们咖啡机来说，为了好懂，咱写代码的时候把真正咖啡的制作工序用 console 来表示了。但大家都知道，做咖啡要考虑的东西可太多了。 比如咱们做拿铁，拿铁里的牛奶从哪来，是不是从咖啡机的某个储物空间里去取？再比如我们行为函数是不是应该时刻感知咖啡机每种原材料的用量、进而判断自己的工序还能不能如期执行下去？这就决定了行为函数必须能很方便地拿到咖啡机这个主体的各种信息——它必须得对主体有感知才行。
策略模式和状态模式确实是相似的，它们都封装行为、都通过委托来实现行为分发。
但策略模式中的行为函数是”潇洒“的行为函数，它们不依赖调用主体、互相平行、各自为政，井水不犯河水。而**状态模式中的行为函数，首先是和状态主体之间存在着关联，由状态主体把它们串在一起；另一方面，正因为关联着同样的一个（或一类）主体，所以不同状态对应的行为函数可能并不会特别割裂。**

## 进一步改造

按照我们这一通描述，当务之急是要把咖啡机和它的状态处理函数建立关联。
把状态-行为映射对象作为主体类对应实例的一个属性添加进去就行了：

```javascript
class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
    // 初始化牛奶的存储量
    this.leftMilk = "500ml";
  }
  stateToProcessor = {
    that: this,
    american() {
      // 尝试在行为函数里拿到咖啡机实例的信息并输出
      console.log("咖啡机现在的牛奶存储量是:", this.that.leftMilk);
      console.log("我只吐黑咖啡");
    },
    latte() {
      this.american();
      console.log("加点奶");
    },
    vanillaLatte() {
      this.latte();
      console.log("再加香草糖浆");
    },
    mocha() {
      this.latte();
      console.log("再加巧克力");
    },
  };

  // 关注咖啡机状态切换函数
  changeState(state) {
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    }
    this.stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");
```

如此一来，我们就可以在 stateToProcessor 轻松拿到咖啡机的实例对象，进而感知咖啡机这个主体了。

# 观察者模式（行为型）

鬼故事：产品经理拉了一个钉钉群

> 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。 —— Graphic Design Patterns

# 代码实现

```javascript
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



// 定义订阅者类
class Observer {
    constructor() {
        console.log('Observer created')
    }

    update() {
        console.log('Observer.update invoked')
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
        ...
        console.log('996 begins...')
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
        ...
        console.log('996 begins...')
    }
}
```

## 面试真题

### Vue 数据双向绑定（响应式系统）的实现原理

#### 解析

Vue 框架是热门的渐进式 JavaScript 框架。在 Vue 中，当我们修改状态时，视图会随之更新，这就是 Vue 的数据双向绑定（又称响应式原理）。数据双向绑定是 Vue 最独特的特性之一。

![image-20220805094105245](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094105245.png)

在 Vue 中，每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新——这是一个典型的观察者模式。这道面试题考察了受试者对 Vue 底层原理的理解、对观察者模式的实现能力以及一系列重要的 JS 知识点，具有较强的综合性和代表性。

值得注意的是，在面试过程中，面试官多数情况下不会要求大家写出完整的响应式原理实现代码，而是要求你“说说自己的理解”。

在 Vue 数据双向绑定的实现逻辑里，有这样三个关键角色：

- observer（监听器）：注意，此 observer 非彼 observer。在我们上节的解析中，observer 作为设计模式中的一个角色，代表“订阅者”。但在 Vue 数据双向绑定的角色结构里，所谓的 observer 不仅是一个数据监听器，它还需要对监听到的数据进行**转发**——也就是说它**同时还是一个发布者**。
- watcher（订阅者）：observer 把数据转发给了**真正的订阅者**——watcher 对象。watcher 接收到新的数据后，会去更新视图。
- compile（编译器）：MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，指令的数据初始化、订阅者的创建这些“杂活”也归它管~

这三者的配合过程如图所示：

![image-20220805094133281](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094133281.png)
OK，实现方案搞清楚了，下面我们给整个流程中**涉及到发布-订阅这一模式的代码**来个特写：

### 核心代码

#### 实现 observer

首先我们需要实现一个方法，这个方法会对需要监听的数据对象进行遍历、给它的属性加上定制的 getter 和 setter 函数。这样但凡这个对象的某个属性发生了改变，就会触发 setter 函数，进而通知到订阅者。这个 setter 函数，就是我们的监听器：

```javascript
// observe方法遍历并包装对象属性
function observe(target) {
  // 若target是一个对象，则遍历它
  if (target && typeof target === "object") {
    Object.keys(target).forEach((key) => {
      // defineReactive方法会给目标属性装上“监听器”
      defineReactive(target, key, target[key]);
    });
  }
}

// 定义defineReactive方法
function defineReactive(target, key, val) {
  // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
  observe(val);
  // 为当前属性安装监听器
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get: function () {
      return val;
    },
    // 监听器函数
    set: function (value) {
      console.log(`${target}属性的${key}属性从${val}值变成了了${value}`);
      val = value;
    },
  });
}
```

下面实现订阅者 Dep：

```javascript
// 定义订阅者类Dep
class Dep {
  constructor() {
    // 初始化订阅队列
    this.subs = [];
  }

  // 增加订阅者
  addSub(sub) {
    this.subs.push(sub);
  }

  // 通知订阅者（是不是所有的代码都似曾相识？）
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
```

现在我们可以改写 defineReactive 中的 setter 方法，在监听器里去通知订阅者了：

```javascript
function defineReactive(target, key, val) {
  const dep = new Dep();
  // 监听当前属性
  observe(val);
  Object.defineProperty(target, key, {
    set: (value) => {
      // 通知所有订阅者
      dep.notify();
    },
  });
}
```

## 实现一个 Event Bus/ Event Emitter

Event Bus（Vue、Flutter 等前端框架中有出镜）和 Event Emitter（Node 中有出镜）出场的“剧组”不同，但是它们都对应一个共同的角色——**全局事件总线**。
全局事件总线，严格来说不能说是观察者模式，而是发布-订阅模式（具体的概念甄别我们会在下个小节着重讲）。它在我们日常的业务开发中应用非常广。
上节开篇我说过，如果只能考一个设计模式的面试题，我一定会出观察者模式。
这句话接着往下说，如果只能选一道题，那这道题一定是 Event Bus/Event Emitter 的代码实现——我都说这么清楚了，这个知识点到底要不要掌握、需要掌握到什么程度，就看各位自己的了。

### 在 Vue 中使用 Event Bus 来实现组件间的通讯

Event Bus/Event Emitter 作为全局事件总线，它起到的是一个**沟通桥梁**的作用。我们可以把它理解为一个事件中心，我们所有事件的订阅/发布都不能由订阅方和发布方“私下沟通”，必须要委托这个事件中心帮我们实现。
在 Vue 中，有时候 A 组件和 B 组件中间隔了很远，看似没什么关系，但我们希望它们之间能够通信。这种情况下除了求助于 Vuex 之外，我们还可以通过 Event Bus 来实现我们的需求。
创建一个 Event Bus（本质上也是 Vue 实例）并导出：

```javascript
const EventBus = new Vue();
export default EventBus;
```

在主文件里引入 EventBus，并挂载到全局：

```javascript
import bus from "EventBus的文件路径";
Vue.prototype.bus = bus;
```

订阅事件：

```javascript
// 这里func指someEvent这个事件的监听函数
this.bus.$on("someEvent", func);
```

发布（触发）事件：

```javascript
// 这里params指someEvent这个事件被触发时回调函数接收的入参
this.bus.$emit("someEvent", params);
```

大家会发现，整个调用过程中，没有出现具体的发布者和订阅者（比如上节的 PrdPublisher 和 DeveloperObserver），全程只有 bus 这个东西一个人在疯狂刷存在感。这就是全局事件总线的特点——所有事件的发布/订阅操作，必须经由事件中心，禁止一切“私下交易”！
下面，我们就一起来实现一个 Event Bus（注意看注释里的解析）：

```javascript
class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {};
  }

  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = [];
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb);
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = this.handlers[eventName].slice();
      // 如果有，则逐个调用队列里的回调函数
      handlers.forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
```

在日常的开发中，大家用到 EventBus/EventEmitter 往往提供比这五个方法多的多的多的方法。但在面试过程中，如果大家能够完整地实现出这五个方法，已经非常可以说明问题了，因此楼上这个 EventBus 希望大家可以熟练掌握。

## 观察者模式与发布-订阅模式的区别是什么？

在面试过程中，一些对细节比较在意的面试官可能会追问观察者模式与发布-订阅模式的区别。这个问题可能会引发一些同学的不适，因为在大量参考资料以及已出版的纸质书籍中，都会告诉大家“发布-订阅模式和观察者模式是同一个东西的两个名字”。本书在前文的叙述中，也没有突出强调两者的区别。其实这两个模式，要较起真来，确实不能给它们划严格的等号。
为什么大家都喜欢给它们强行划等号呢？这是因为就算划了等号，也不影响我们正常使用，毕竟两者在核心思想、运作机制上没有本质的差别。但考虑到这个问题确实可以成为面试题的一个方向，此处我们还是单独拿出来讲一下。
回到我们上文的例子里。韩梅梅把所有的开发者拉了一个群，直接把需求文档丢给每一位群成员，这种**发布者直接触及到订阅者**的操作，叫观察者模式。但如果韩梅梅没有拉群，而是把需求文档上传到了公司统一的需求平台上，需求平台感知到文件的变化、自动通知了每一位订阅了该文件的开发者，这种**发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作，叫做发布-订阅模式**。
相信大家也已经看出来了，观察者模式和发布-订阅模式之间的区别，在于是否存在第三方、发布者能否直接感知订阅者（如图所示）。



![image-20220805094256032](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805094256032.png)



在我们见过的这些例子里，韩梅梅拉钉钉群的操作，就是典型的观察者模式；而通过 EventBus 去实现事件监听/发布，则属于发布-订阅模式。
既生瑜，何生亮？既然有了观察者模式，为什么还需要发布-订阅模式呢？
大家思考一下：为什么要有观察者模式？观察者模式，解决的其实是模块间的耦合问题，有它在，即便是两个分离的、毫不相关的模块，也可以实现数据通信。但观察者模式仅仅是减少了耦合，**并没有完全地解决耦合问题**——被观察者必须去维护一套观察者的集合，这些观察者必须实现统一的方法供被观察者调用，两者之间还是有着说不清、道不明的关系。
而发布-订阅模式，则是快刀斩乱麻了——发布者完全不用感知订阅者，不用关心它怎么实现回调方法，事件的注册和触发都发生在独立于双方的第三方平台（事件总线)上。发布-订阅模式下，实现了完全地解耦。
但这并不意味着，发布-订阅模式就比观察者模式“高级”。在实际开发中，我们的模块解耦诉求**并非总是需要它们完全解耦**。如果两个模块之间本身存在关联，且这种关联是稳定的、必要的，那么我们使用观察者模式就足够了。而在模块与模块之间独立性较强、且没有必要单纯为了数据通信而强行为两者制造依赖的情况下，我们往往会倾向于使用发布-订阅模式。

# 迭代器模式

## 实现一个迭代器生成函数

```javascript
// 编写一个迭代器生成函数
function* iteratorGenerator() {
  yield "1号选手";
  yield "2号选手";
  yield "3号选手";
}

const iterator = iteratorGenerator();

iterator.next();
iterator.next();
iterator.next();
```

写一个生成器函数并没有什么难度，但在面试的过程中，面试官往往对生成器这种语法糖背后的实现逻辑更感兴趣。下面我们要做的，不仅仅是写一个迭代器对象，而是用 ES5 去写一个能够生成迭代器对象的迭代器生成函数（解析在注释里）：

```javascript
// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
  // idx记录当前访问的索引
  var idx = 0;
  // len记录传入集合的长度
  var len = list.length;
  return {
    // 自定义next方法
    next: function () {
      // 如果索引还没有超出集合长度，done为false
      var done = idx >= len;
      // 如果done为false，则可以继续取值
      var value = !done ? list[idx++] : undefined;

      // 将当前值与遍历是否完毕（done）返回
      return {
        done: done,
        value: value,
      };
    },
  };
}

var iterator = iteratorGenerator(["1号选手", "2号选手", "3号选手"]);
iterator.next();
iterator.next();
iterator.next();
```
