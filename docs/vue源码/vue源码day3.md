> 今天主要来学习计算属性的具体实现。下面代码示例部分只做参考，具体完整代码可以在[vue3源码解读: 手写vue3核心源码，内含详细解读 (gitee.com)](https://gitee.com/l544402029/vue3-source-code)内查看。


# 1. 修改属性需要每次都更新吗？

src/1.reactive.html
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
const state2 = reactive(data);

const state3 = reactive(state2);

const runner = effect(
    () => {
        console.log("runner");
        app.innerHTML = state3.name;
    }
);
// state3.name = 1
// state3.name = 2
// state3.name = 3
```
如上代码所示，我们修改了3次 name 属性，如果不作任何处理一定会更新3次，而只有最后一次结果是我们需要的，这样无疑是浪费性能的。我们需要把它们进行合并更新。

js/reactivity/effect.js
```
let isFlushing = false;
const runner = effect(
    () => {
        console.log("runner");
        // state3.user 如果这个也是对象，我们应该针对这个对象进行代理
        // 懒代理
        app.innerHTML = state3.name;
    },
    {
        //     调度执行
        scheduler() {// effect.run()
            if (!isFlushing) {
                Promise.resolve().then(() => {
                    //     异步更新
                    runner();
                    isFlushing = false;
                });
                isFlushing = true;
            }
        },
    }
);
```
js/reactivity/handler.js
```js
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
我们可以把是否渲染的逻辑交给用户，首先定义了isFlushing 是否更新变量，在 effect 函数第二个参数传入对象。

scheduler 是用户自定义的渲染逻辑，如果用户传入 scheduler 优先执行 scheduler，执行 scheduler 的同时，将 isFlushing 状态改为正在更新，这样下次更新 state3.name 不会再次进入，利用 promise 异步的方式执行 effect.run() 重新渲染，这时候同步代码已经执行完毕了， name 渲染出来的就只能是3了。

这个原理类似于防抖，只执行最后一次的结果。

# 2 深度代理

src/1.reactive.html
```js
const data = {
    user: {
        post: "qd",
    },
};
const state3 = reactive(state2);
const runner = effect(
    () => {
        console.log("runner");
        // state3.user 如果这个也是对象，我们应该针对这个对象进行代理
        // 懒代理
        app.innerHTML = state3.user.post;
    }
);

state3.user.post = "hd";
```
由于我们只做了一层代理，访问 state3.user 和 修改 state3,user 是可以更新的，也就是说 `state3.user = {post:'ad'}` 是可以更新的。

如果对象的属性内有对象， 我们也应该针对于这个对象进行代理。这也是一个懒代理，也就是说只有读取到这个属性才进行代理，还没被读取的时候是不进行代理的。

js/reactivity/handler.js
```js
get(target, key, receiver) {
  // 走到这里说明已经是代理对象, 可返回true
  if (key === ReactiveFlags.IS_REACTIVE) {
    return true;
  }
  // console.log('取值的时候关联effect')
  track(target, key);

  let result = Reflect.get(target, key, receiver);
  if (isObject(result)) {
    // 如果取到的是对象，则需要继续将这个对象作为代理对象
    return reactive(result);
  }
  return result;
},
```

# 3. effect 是什么？
effect 是 vue 比较偏底层的方法，我们常用的 computed, watch, watchEffect 都是基于 effect 去实现的，就像搭积木一样。

# 4. 计算属性的特点

* 1） 不访问这个属性就不计算
* 2） 计算属性得有同步的返回值，不能异步
* 3） 如果依赖的值不变也不重新计算
* 4） 计算属性不能修改本身的值，可以去修改其它属性
* 5） 可以在模板中使用

# 5. 计算属性实现

## 核心实现代码

src/2.computed.html
```
const state = reactive({
  firstName: "j",
  lastName: "w",
  age: 30,
});
const fullName = computed({
  get: () => {
    console.log("computed");
    return state.firstName + state.lastName;
  },
  set: (val) => {
    console.log(val);
  },
});

// 计算属性也是一个effect， 依赖的状态会收集计算属性的 effect
// 计算属性会触发它收集的 effect

effect(() => {
  // 计算属性也可以收集effect
  console.log("计算属性也可以收集effect");
  // 多次获取计算属性，依赖属性未发生变化，只计算一次（this._dirty的作用）
  console.log(fullName.value);
  console.log(fullName.value);
  console.log(fullName.value);
  console.log(fullName.value);
```

js/reactivity/computed.js
```
// 计算属性是一个effect，会让 getter 中的属性去收集这个 effect
this.effect = new ReactiveEffect(getter, () => {
    //   ...
    this._dirty = true // 让计算属性标记为脏值
    // 当 getter 触发依赖更新的时候，也重新触发 计算属性 的依赖更新
    triggerEffects(this.dep)
});


get value() {
    if (activeEffect) {
        //   value => [effect, effect, effect]
        trackEffects(this.dep)
    }
    if (this._dirty) {
        this._dirty = false;
        // 取值让 getter 执行拿到返回值，作为计算属性旳值
        // 当取计算属性的时候, 让 getter 执行触发依赖收集
        this._value = this.effect.run();
    }

    return this._value;
}
```

计算属性就是一个 effect， 在执行 effect 的时候，读取计算属性触发 get 访问器，将当前 activeEffect 加入到当前计算属性的依赖里。
在计算属性 get 方法内部依赖触发更新时，我们也让计算属性触发依赖更新。


## 计算属性的不同点

计算属性的不同点是在于 值对应effect， 而不是对象属性对应 effect

对象名字对应effect
```
Map1 = {({name: 'jw',age:30}):Map2}
Map2 = {name: new Set([effect, effect])}
```

计算属性对应effect
```
value => [effect, effect, effect]
```


## 多次获取计算属性
多次获取计算属性，依赖属性未发生变化，只计算一次（this._dirty的作用）

在创建计算属性的时候，增加 `_dirty` 变量记录是否为脏值，第一次取值为 fasle, 执行 计算属性的 get 方法，然后将它改为 false, 当第二次进来因为 false 就不会再执行了。只有 get 内部的依赖触发重新更新时，将它再改为 true，这时候就又能执行了。





​     