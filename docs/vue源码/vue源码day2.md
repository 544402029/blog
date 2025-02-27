> 今天主要来学习依赖收集原理。下面代码示例部分只做参考，具体完整代码可以在[vue3源码解读: 手写vue3核心源码，内含详细解读 (gitee.com)](https://gitee.com/l544402029/vue3-source-code)内查看。




# 1. 为什么要用Reflect？

src/1.reactive.html
```js
const person = {
  name: "xm",
  get aliasName() {
    // 属性访问器
    return "handSome" + this.name;
  },
};
const proxy = new Proxy(person, {
  get(target, key, receiver) {
    // receiver:代理对象
    console.log(key);
    // return target[key]  // this = person
    return Reflect.get(target, key, receiver); // this = receiver
  },
  set(target, key, value, receiver) {
    // target[key] = value
    Reflect.set(target, key, value, receiver);
    return true;
  },
});

// 一段伪代码
// effect(() => {
//     console.log(proxy.aliasName)
// })
proxy.name = "xh";
// 此时我们修改了name，effect 内的 proxy.aliasName是不会触发更新的，但是proxy.aliasName是依赖name的，所以就会有问题

// 采用Reflect后，如果访问aliasName，紧接着会去取name，此时是在 receiver （代理对象）上取值，会再触发get方法
console.log(proxy.aliasName);
// 使用 target[key]， 不会打印name
// aliasName
// handSomexh

// 使用Reflect.get(target, key, receiver)
// aliasName
// name
// handSomexh
```


我们不使用 Reflect 的情况下，首先我们只收集了 proxy.aliasName 的依赖，proxy.name 是没有进行依赖收集的。 所以修改proxy.name 是无法触发 proxy.aliasName 依赖更新的。

我们要考虑在收集 proxy.aliasName 同时收集 proxy.name 的依赖。

从代码中也可以看到，在 get 方法中，我们通过 target[key]， 我们读取的是 person[aliasName], 此时属性访问器的 this 指向的是 person。这个 person 是**源对象**，即使访问了也不会触发 **代理对象** 的依赖收集。

在使用 Reflect 后这个 this指向的 receiver ， 也就是代理对象，用代理对象访问 proxy.aliasName ,随后访问 this.name, 此时 this 为 代理对象， 此时读取就能收集到依赖了。

# 2. 多次代理同一个对象
js/reactivity/effect.js
```js
import { reactive, effect } from "../js/reactivity";

const data = {
  name: "jw",
  age: 30,
  address: "zz",
  user: {
    post: "qd",
  },
  flag: false,
};

const state1 = reactive(data); // new Proxy
/**
 * 1. 如果同一个对象，会返回同一个代理，在第一次利用weakMap把对象做了映射
 */
const state2 = reactive(data);

/**
 * state1 被代理过了 一定被增添了get和set
 */
const state3 = reactive(state2);
// console.log(state1 === state2)
// console.log(state1 === state3)
```

在代理同一个对象时，我们需要两次结果一致。 我们需要 state1 和 state2 是相等的。
思路就是对这个源对象做一层映射，如果从映射表中发现已有该对象，直接返回该对象，不再对其进行处理。
核心代码如下：
js/reactivity/effect.js
```js
// 做一层映射，解决相同对象重复 reactive 的情况
const reactiveMap = new WeakMap(); // 防止内存泄漏

function createReactiveObject(target) {
    // 相同对象返回的永远是同一个代理对象
    let existingProxy = reactiveMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    // 返回代理对象
    const proxy = new Proxy(target, mutableHandlers);
    reactiveMap.set(target, proxy);
    return proxy;
    }

```

在代理已经被代理过的对象时，要与第一次代理过的对象一致。  state1 === state3。
我们可以在代理对象上增加标识，如果能获取到该标识，则说明已经代理过，直接返回代理对象。
核心代码如下:
js/reactivity/effect.js
```js
export let ReactiveFlags;
(function (ReactiveFlags) {
    ReactiveFlags["IS_REACTIVE"] = "__v_isReactive";
})(ReactiveFlags || (ReactiveFlags = {}));
```

```js
// reactive.js
// 已经是代理对象直接返回代理对象
if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
}
```

reactivity/handler.js
```js
export const mutableHandlers = {
  // 原始对象 属性 代理对象
  get(target, key, receiver) {
    // 走到这里说明已经是代理对象, 可返回true
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }

    let result = Reflect.get(target, key, receiver);
    return result;
  },
};
```

由于代理对象后获取 IS_REACTIVE 时，get 方法在看到该属性时，直接返回了true， 证明此对象是代理对象。未代理对象是不会返回 true 的。

# 3.effect 嵌套处理


##  effect 依赖收集流程


![image-20250224092638695](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224092638695.png)


简单来说就是在执行 effect 时， 将该函数放在全局对象上。等执行内部代码时，在内部响应式对象属性上绑定该effect 函数，等对象属性发生变化，重新执行绑定的 effect 函数， 也就触发了更新。

effect和属性是**多对多**的关系。

## 如何保证内层 effect 执行完毕后，重新获取外层 effect （activeEffect）？

```
/**
 * 嵌套effect，可以采用树结构
 */
// activeEffect = null

// effect(() => { // activeEffect = effect1
//     state1.name
//     effect(() => { // effect2.parent = activeEffect; activeEffect = effect1
//         // activeEffect = effect2
//         state1.age
//     }) // activeEffect = effect2.parent
//     state1.address // ??
// })

// effect(() => {
//     app.innerHTML = state3.name + ',' + state3.age
// })
```


js/reactivity/effect.js
```
this.parent = activeEffect;

activeEffect = this.parent;
this.parent = undefined;

```
当执行 run 方法时， 增加 parent 属性作为外层 effect。外层 effect 执行时，此时 activeEffect 为 undefined。随后执行内层函数， 此时 activeEffect 为外层函数，当我们的内层函数执行完成，我们可以从 parent 上 找到 外层的 effect， 让 activeEffect 其重新恢复到外层函数。


# 4. 一直运行同一个effect

src/1.reactive.html

```
// effect(() => {
//     // 一直运行同一个effect
//     state1.age = Math.random() // state1.age 改变后触发依赖更新，死循环
//     app.innerHTML = state1.name
// })
```
属性修改每次都不一样, 每次修改完成后触发依赖更新，重新执行effect， 导致死循环。


js/reactivity/handler.js
```
export function triggerEffects(effects) {
  if (effects) {
    effects = [...effects];
    effects.forEach((effect) => {
      // 当前正在执行的和现在正要执行的是同一个我就屏蔽掉
      if (activeEffect !== effect) {
        if (effect.scheduler) {
          // 有 scheduler 应该先执行 scheduler
          effect.scheduler();
        } else {
          effect.run(); // 里边有删除 + 添加的逻辑
        }
      }
    });
  }
}
```

重点就是 **activeEffect !== effect**这段代码， 如果当前正在执行的 activeEffect 和现在正要执行 effect 的是同一个我就屏蔽掉不执行。


# 5. 为什么要重新收集依赖?

src/1.reactive.html
```
const data = {
  name: "jw",
  age: 30,
  address: "zz",
  user: {
    post: "qd",
  },
  flag: true,
};
// effect(() => {
//     // flag， name
//     // flag, age 清空上次收集，重新收集 取消掉name的收集  cleanupEffect(this)
//     app.innerHTML = state3.flag ? state3.name : state3.age
//     console.log('触发')
// })
// setTimeout(() => {
//     state3.flag = false // 会显示 age
//     setTimeout(() => {
//         console.log('改了name，原则上不应该触发effect')
//         state3.name = 'abc' // 需要更新吗？
//     }, 1000)
// }, 1000)
```
如上代码： 在 第一次 收集了 flag 和 name，随后 flag 变为 flase，此时如果没清空，依赖收集里会有 flag，name，age 三个属性，修改 name 也会 触发依赖更新， 而此时是不需要依赖更新的。

所以我们需要每次执行 effect 时， 都清空依赖，避免拥有无效的属性依赖。比如此时的 name 就是无效的依赖。

具体代码如下：
js/reactivity/effect.js
```js
function cleanupEffect(effect) {
  // {name:set(effect, effect)} 属性对应的 effect

  // 找到 deps 中的 set ,清理掉 effect 才可以
  let deps = effect.deps;
  for (let i = 0; i < deps.length; i++) {
    // effect.deps = [new Set(), new Set()]
    deps[i].delete(effect); // 删除掉 set 中的 effect
  }
  effect.deps.length = 0; // 让 effect 中的 deps 清空
}
```
```js
run() {
  // 当运行的时候，我们需要将对应的effect关联起来
  // 利用js时单线程的特性，先放在全局，再取值
  try {
    this.parent = activeEffect;
    activeEffect = this;
    cleanupEffect(this);
    return this.fn(); // 执行函数时触发了属性的get
  } finally {
    activeEffect = this.parent;
    this.parent = undefined;
  }
}
```
js/reactivity/handler.js
```js
export function trackEffects(dep) {
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect && activeEffect.deps.push(dep); // 让 effect 也记录下有哪些属性
  }
}
```


![image-20250224092654864](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224092654864.png)

在进行依赖收集的时候，我们在 effect 上绑定了使用哪些属性。这时候就可以用到了，每次执行 effect 时，先清空上次的依赖 `cleanupEffect(this);`, 随后再次收集最新的依赖，避免了 effect.deps 保留无效依赖的bug。
