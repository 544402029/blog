> 今天主要来学习watch和ref的具体实现。下面代码示例部分只做参考，具体完整代码可以在[vue3源码解读: 手写vue3核心源码，内含详细解读 (gitee.com)](https://gitee.com/l544402029/vue3-source-code)内查看。

# 1. watch 和 computed 的区别


1. computed 目的在于计算新值，有缓存
2. watch 目的在于监控属性的变化做某一件事

# 2. watch监听简单类型为什么要包装成方法？

因为如果直接写 state.firstName 的话，取的是字符串，无法监听，所以需要包装成方法，利用effect触发依赖收集。

# 3. watch 核心实现

## 代码
js/reactivity/watch.js
```
function traverse(source, seen = new Set()) {
    if (!isObject(source)) {
        return source
    }
    // 对象嵌套互相引用，如果已经有了，直接返回
    if (seen.has(source)) {
        return source
    }
    seen.add(source)
    for (let k in source) {
        // 这里访问了对象中得1所有属性，触发依赖收集
        traverse(source[k], seen)
    }
    return source
}

export function watch(source, cb, options) {
    doWatch(source, cb, options)
}

function doWatch(source, cb, options) {
    let getter
    if (isReactive(source)) {
        // 要进行依赖收集
        getter = () => traverse(source)
    } else if (isFunction(source)) {
        getter = source
    }
    let oldValue
    let clean

    const onCleanup = (fn) => {
        clean = fn
    }
    const job = () => {
        if (cb) {
            if (clean) clean()
            const newValue = effect.run()
            cb(newValue, oldValue, onCleanup)
            oldValue = newValue
        } else {
            effect.run()
        }

    }
    const effect = new ReactiveEffect(getter, job)
    if (options && options.immediate) {
        job()
    }
    oldValue = effect.run()
}
```


# 4. 竟态问题

## 问题场景

考虑这么一个场景，有一个搜索框，如百度搜索框，实时监听输入内容请求接口。我们发送了3次请求，第一个请求接口耗时3s返回， 第二个请求耗时2s返回，第三个请求耗时1s返回，如果我们不作处理，那么必然返回第一个请求接口的内容。而我们实际需要的是第三个请求内容。

watch 的解决方案就是如果有新请求进来就清空上次的操作。这个原理类似于防抖。

## 自行实现
```
let timer = 4000;

function getData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, (timer -= 1000));
    });
}

let arr = []; // 用于存储上一次的清理操作
// 什么是闭包?
// 我定义函数的作用域与执行函数的作用域不是同一个
watch(
    () => state.age,
    async function (newVal, oldVal, onCleanup) {
        // 自行实现
        // while (arr.length > 0) {
        //   let fn = arr.shift();
        //   fn();
        // }
        let flag = true;
        arr.push(function () {
            flag = false
        })
        let r = await getData(newVal);
        flag && (app.innerHTML = r);
    },
    {
        flush: "sync",
    }
);
state.age = 100; // 请求3s返回 100
state.age = 200; // 请求2s返回 200
state.age = 300; // 请求1s返回 300
```
首先第一次进来, arr.length 为 0， 不会执行 while， 接着定义 flag 为 true。添加闭包函数放入数组，函数内执行 flag 为 false。 接着等待 getData 异步返回。接着下次请求进来，执行了上次闭包函数将第一次的 flag 变为 false。 等到同步代码执行完成， 异步开始执行 第一次的 flag 已经变为 false， 就不会执行接下来的操作了。

简单来说， 就是每个回调有自己的 flag，当执行下一个回调 改变上一个 flag 状态。

## 源码实现
js/reactivity/watch.js
```
let clean

const onCleanup = (fn) => {
    clean = fn
}
const job = () => {
    if (cb) {
        if (clean) clean()
        const newValue = effect.run()
        cb(newValue, oldValue, onCleanup)
        oldValue = newValue
    } else {
        effect.run()
    }

}
```

## 步骤图


![image-20250224092851424](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224092851424.png)

如果 getData 这一步为同步就不行了， 如果实际开发中，请把它包装成异步代码。

# 5. watchEffect
其实watchEffect 就是 effect。基于 watch 进行实现。

js/reactivity/watch.js
```
export function watchEffect(effect, options) {
    doWatch(effect, null, options)
}
```

# 6. ref 的实现

## 核心源码

js/reactivity/ref.js
```
import {toReactive} from "./reactive.js";
import {activeEffect} from "./effect.js";
import {trackEffects, triggerEffects} from "./handler.js";

export function ref(value) {
    return new RefImpl(value)
}

class RefImpl {
    // 内部采用类的属性访问器 -》 Object.defineProperty
    constructor(rawValue) {
        this.rawValue = rawValue
        this._value = toReactive(rawValue)
        this.dep = new Set()
    }

    get value() {
        if (activeEffect) {
            trackEffects(this.dep)
        }
        return this._value
    }

    set value(newValue) {
        if (newValue !== this.rawValue) {
            this.rawValue = newValue
            this._value = toReactive(newValue)
            triggerEffects(this.dep)
        }

    }
}

// ref 代理的实现
class ObjectRefImpl {
    constructor(object, key) {
        this.object = object
        this.key = key
    }

    get value() {
        return this.object[this.key]
    }

    set value(newValue) {
        this.object[this.key] = newValue
    }
}

export function toRef(object, key) {
    return new ObjectRefImpl(object, key)
}

export function toRefs(object) {
    const ret = {}
    for (const key in object) {
        ret[key] = toRef(object, key)
    }
    return ret
}
```

# 7. reactive，readonly


vue3中reactive 有几种变体  reactive  shallowReactive  readonly()  shallowReadonly

被readonly代理过的，再被reactive进行代理直接返回readonly的结果。

```
// let obj = { name: 'jw' };
// let proxy1 = readonly(obj); // 由于仅读属性无法修改。就算包了reactive也无意义
// let proxy2 = reactive(proxy1);  // 如果对象已经是仅读的代理还有意义吗
// console.log(proxy1 === proxy2); // true
```

如果调用过reactive后，依然可以调用readonly
```
let obj = { name: 'jw' };
readonly(reactive(obj)); // 如果调用过reactive后，依然可以调用readonly
```

# 8. 真实源码探索

src/6.example.html

1) 收集索引

```
import {computed, reactive, watchEffect, effect, watch, ref, toRef, toRefs} from "../js/vue.esm-browser.prod.js"
const arr = reactive([1])
effect(() => {
    // 通过索引可以访问收集依赖，track arr 0
    console.log(arr[3]) // 这里没有收集length
})
arr[0] = 2 // 收集的arr[3], 触发不了依赖更新
arr.length = 0 // 修改长度要触发索引的触发 改的是length（真实源码内更新length也会触发依赖更新）
// arr[3] = 1
```

2）长度收集
```
const arr = reactive([1])
effect(() => {
    // 通过索引访问可以收集依赖
    console.log(arr.length)
})
arr[100] = 2 // 修改索引, 如果添加应该触发长度更新
```

3) 数组方法

访问变异方法会访问数组的长度，会对长度进行依赖，这里我们停止收集调用方法


```
    const arr = reactive([])
    effect(() => {
        console.log('effect1')
        arr.push({}) // 会收集length
    })
    effect(() => {
        console.log('effect2')
        arr.push({}) // 会收集length 相互更新对方依赖死循环
        // 解决方案就是在effect这里边对length不收集
    })
    arr.push(1) // 修改length
```


# 9. 拆包

src/5.ref.html

```
    const state1 = reactive({
        name: 'jw'
    })
    const state2 = reactive({
        age: 30
    })
    const r = proxyRefs({...toRefs(state1), ...toRefs(state2)})

    watchEffect(() => {
        app.innerHTML = r.name.value + r.age.value
    })
```

js/reactivity/ref.js
```
// ref 代理的实现
class ObjectRefImpl {
    constructor(object, key) {
        this.object = object
        this.key = key
        this.__v_isRef = true
    }

    get value() {
        // 类似 vue2 的 _data
        return this.object[this.key]
    }

    set value(newValue) {
        this.object[this.key] = newValue
    }
}

export function toRef(object, key) {
    return new ObjectRefImpl(object, key)
}

export function toRefs(object) {
    const ret = {}
    for (const key in object) {
        ret[key] = toRef(object, key)
    }
    return ret
}

export function proxyRefs(target) {
    return new Proxy(target, {
        get(target, key, receiver) {
            let r = Reflect.get(target, key, receiver)
            // 每个响应式对象都有 __v_isRef 属性， 如果有则去取下边的value， 没有则直接取本身
            return r.__v_isRef ? r.value : r
        },
        set(target, key, value, receiver) {
            const oldValue = target[key]
            if (oldValue.__v_isRef) {
                oldValue.value = value
                return true
            } else {
                return Reflect.set(target, key, value, receiver)
            }
        }
    })
}
```

toRefs 相当于代理了 reactive 对象，取它的值就相当于是取 reactive 的值， 这一点和 vue2 中的 this.xx 代理 this.data.xx 很像， this.xx 就去找 this.data.xx 内的属性。


拆包也是类似的，如果访问响应式对象，就去取它下边的value，设置同理。这也就是我们为什么不用在模板中加.value。