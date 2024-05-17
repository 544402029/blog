---
prev: 
    text: 'Vue'
    link: '/面试题库/Vue'
next: 
    text: 'Webpack'
    link: '/面试题库/Webpack'
---

# Vue3

![Vue3升级说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1622731226157.png)



## Vue3 升级内容？

- 全部用 TS 重写（响应式、vdom、模板编译等）
- 性能提升，（打包出来的）代码量减少
- 会调整部分 API



## Vue3 比 Vue2 有什么优势？

- 性能更好
- 体积更小
- 更好的 TS 支持（Vue3 采用 TS 开发）
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能



## Vue3 生命周期和 Vue2 生命周期有什么区别？



### Options API 生命周期

- beforeDestory 改为 beforeUnmount
- destroyed 改为 unmounted
- 其它沿用 Vue2 生命周期



## Composition API 带来了什么？

- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

更适用于大型项目，复杂页面。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1647919440656-41f4ebb6-ae41-4a53-9dbc-e2ce9d9ba69f.png)

其中 this.a, this.fn1 按照正常 js 规范是通过 this.data.a, this.method.fn 去访问。但是在 vue2 做了一层代理， 导致直接在 this 下就可以访问。这样非常不利于类型推导。



## 如何理解 ref toRef 和 toRefs



### ref

- 生成值类型的响应式数据
- 可用于模板和 reactive
- 通过 .value 修改值



### toref

- 针对一个响应式对象（reactive 封装）的 prop
- 创建一个 ref， 具有响应式
- 两者保持引用关系

```javascript
<template>
    <p>toRef demo - {{ageRef}} - {{state.name}} {{state.age}}</p>
</template>

<script>
import { ref, toRef, reactive } from 'vue'

export default {
    name: 'ToRef',
    setup() {
        const state = reactive({
            age: 20,
            name: '双越'
        })

        const age1 = computed(() => {
            return state.age + 1
        })

        // // toRef 如果用于普通对象（非响应式对象），产出的结果不具备响应式
        // const state = {
        //     age: 20,
        //     name: '双越'
        // }

        const ageRef = toRef(state, 'age')

        setTimeout(() => {
            state.age = 25
        }, 1500)

        setTimeout(() => {
            ageRef.value = 30 // .value 修改值
        }, 3000)

        return {
            state,
            ageRef
        }
    }
}
</script>
```



### toRefs

- 将响应式对象( reactive 封装) 转换为普通对象
- 对象的每个 prop 都是对应的 ref
- 两者保持引用关系

```javascript
<template>
    <p>toRefs demo {{age}} {{name}}</p>
</template>

<script>
import { ref, toRef, toRefs, reactive } from 'vue'

export default {
    name: 'ToRefs',
    setup() {
        const state = reactive({
            age: 20,
            name: '双越'
        })

        const stateAsRefs = toRefs(state) // 将响应式对象，变成普通对象

        // const { age: ageRef, name: nameRef } = stateAsRefs // 每个属性，都是 ref 对象
        // return {
        //     ageRef,
        //     nameRef
        // }

        setTimeout(() => {
            state.age = 25
        }, 1500)
        // 直接返回return{state}是不具有响应式变化的
        return stateAsRefs
    }
}
</script>
```



## ref toRef 和 toRefs 的最佳使用方式

- 用 reactive 做对象的响应式, 用 ref 做值类型响应式
- setup 中返回 toRefs(state) , 或者 toRef(state，'xxX' )
- ref 的变量命名都用 xxxRef
- 合成函数返回响应式对象时,使用 toRefs



## 为何需要 ref

- 返回值类型, 会丢失响应式
- 如在 setup、computed、 合成函数,都有可能返回值类型
- Vue 如不定义 ref ,用户将自造 ref ,反而混乱

proxy 只能针对对象，对值类型是无能为力的。



## 为何需要 .value

- ref 是一个对象(不丢失响应式) , value 存储值
- 通过.value 属性的 get 和 set 实现响应式
- 用于模板、reactive 时,不需要.value ,其他情况都需要



## 为何需要 toRef 和 toRefs ?

- 初衷:不丢失响应式的情况下, 把对象数据**解构/扩散**
- 前提:针对的是响应式对象( reactive 封装的)非普通对象
- 注意: **不创造**响应式, 而是**延续**响应式



## vue3 升级了哪些重要功能

- createApp
- emits 属性
- 多事件
- Fragment
- 移除 .sync
- 生命周期
- 异步组件的写法
- 移除 filter
- Teleport
- Suspense
- Composition API



### createApp



![image-20220808173555752](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173555752.png)



### emits 属性

![image-20220808173620004](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173620004.png)



### 多事件处理

![image-20220808173646903](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173646903.png)



### Fragment

![image-20220808173733270](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173733270.png)



### 移除 .sync

![image-20220808173805261](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173805261.png)



### 异步组件的写法

![image-20220808173900335](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173900335.png)

### 移除 filter

![image-20220808173917433](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173917433.png)



### Teleport

![image-20220808173939272](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808173939272.png)



### Suspense

![image-20220808174002376](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174002376.png)



### Composition API

![image-20220808174021740](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174021740.png)



## watch 和 watchEffect 的区别

- 两者都可监听 data 属性变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中的属性, 自动监听其变化



## setup 中如何获取组件实例

- 在 setup 和其他 Composition API 中没有 this
- 可通过 getCurrentInstance 获取当前实例
- 若使用 Options API 可照常使用 this



## Vue3 为何比 Vue2 快

- Proxy 响应式
- PatchFlag
- hoistStatic
- cacheHandler
- SSR 优化
- tree-shaking



### PatchFlag

- 编译模板时,动态节点做标记
- 标记,分为不同的类型,如 TEXT PROPS
- diff 算法时，可以区分静态节点,以及不同类型的动态节点

![image-20220808174120035](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174120035.png)



### HoistStatic

- 将静态节点的定义,提升到父作用域,缓存起来
- 多个相邻的静态节点,会被合并起来
- 典型的拿空间换时间的优化策略

将静态节点的定义,提升到父作用域,缓存起来

![image-20220808174151576](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174151576.png)

多个相邻的静态节点,会被合并起来![image-20220808174233992](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174233992.png)



### CacheHandler

- 缓存事件

![image-20220808174304798](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174304798.png)



### SSR 优化

- 静态节点直接输出, 绕过了 vdom
- 动态节点, 还是需要动态渲染

类似 HoistStatic

- ![image-20220808174327021](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174327021.png)

### Tree-shaking 的优化

- 编译时, 根据不同的情况,引入不同的 API

  

![image-20220808174356872](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174356872.png)



## Vite 是什么？

- 一个前端打包工具, Vue 作者发起的项目
- 借助 Vue 的影响力,发展较快,和 webpack 竞争
- 优势:开发环境下无需打包,启动快



## Vite 为什么启动非常快

- 开发环境使用 ES6 Module， 无需打包一非常快
- 生产环境使用 rollup , 并不会快很多



### ES Module 在浏览器中的应用

![image-20220808174426879](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174426879.png)

外链

![image-20220808174448402](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174448402.png)

远程引入

![image-20220808174520247](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174520247.png)

动态引入![image-20220808174540438](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808174540438.png)



## Composition API 和 React Hooks 的对比

- 前者 setup 只会被调用一次,而后者函数会被多次调用
- 前者无需 useMemo useCallback ,因为 setup 只调用一次
- 前者无需顾虑调用顺序, 而后者需要保证 hooks 的顺序一致
- 前者 reactive + ref 比后者 useState 要难理解



## Composition API 给 Vue 带来了什么？

- 提高了组件的复用性和可读性



## Vue3 和 JSX-基本使用

```javascript
<template>
    <p @click="changeFlag">Demo {{flagRef}}</p>
    <child a="abc" v-if="flagRef"></child>
    <ul>
        <li v-for="item in state.list" :key="item">{{item}}</li>
    </ul>
</template>

<script>
import { ref, reactive } from 'vue'
import Child from './Child'

export default {
    name: 'Demo',
    components: { Child },
    setup() {
        const flagRef = ref(true)

        function changeFlag() {
            flagRef.value = !flagRef.value
        }

        const state = reactive({
            list: ['a', 'b', 'c']
        })

        return {
            flagRef,
            changeFlag,
            state
        }
    }
}
</script>
```

```javascript
<script>
import {ref} from 'vue';
export default {
    setup(){
        const countRef = ref(200)
        // return ()=>{
        //     return <p>demo12 {countRef.value}</p>
        // }
        const render = ()=>{
            return <p>demo1.vue {countRef.value}</p>//jsx
        }
        return render
    }
}
</script>
```

```javascript
import { defineComponent, ref, reactive } from "vue";
import Child from "./Child";

export default defineComponent(() => {
  const flagRef = ref(true);

  function changeFlag() {
    flagRef.value = !flagRef.value;
  }

  const state = reactive({
    list: ["a1", "b1", "c1"],
  });

  const render = () => {
    return (
      <>
        <p onClick={changeFlag}>demo1 {flagRef.value.toString()}</p>
        {flagRef.value && <Child a={flagRef.value}></Child>}

        <ul>
          {state.list.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </>
    );
  };
  return render;
});

// 1. setup 函数
// 2. 组件的配置
```

```javascript
import { defineComponent } from "vue";

export default defineComponent({
  props: ["a"],
  setup(props) {
    const render = () => {
      return <p>Child {props.a}</p>;
    };
    return render;
  },
});
```



## Vue3 和 JSX-JSX 和 template 的区别

- JSX 本质就是 js 代码, 可以使用 js 的任何能力
- template 只能嵌入简单的 js 表达式,其他需要指令,如 v-if
- JSX 已经成为 ES 规范, template 还是 Vue 自家规范
- 都会被编译为 js 代码( render 函数)



## Vue3 和 JSX-slot



### tabs-jsx

```javascript
<template>
    <tabs default-active-key="1" @change="onTabsChange">
        <tab-panel key="1" title="title1">
            <div>tab panel content 1</div>
        </tab-panel>
        <tab-panel key="2" title="title2">
            <div>tab panel content 2</div>
        </tab-panel>
        <tab-panel key="3" title="title3">
            <div>tab panel content 3</div>
        </tab-panel>
    </tabs>
</template>

<script>
import Tabs from './Tabs.jsx'
import TabPanel from './TabPanel'

export default {
    components: { Tabs, TabPanel },
    methods: {
        onTabsChange(key) {
            console.log('tab changed', key)
        }
    },
}
</script>
```

```javascript
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Tabs",
  props: ["defaultActiveKey"],
  emits: ["change"],
  setup(props, context) {
    const children = context.slots.default();
    const titles = children.map((panel) => {
      const { key, title } = panel.props || {};
      return {
        key,
        title,
      };
    });

    // 当前 actKey
    const actKey = ref(props.defaultActiveKey);
    function changeActKey(key) {
      actKey.value = key;
      context.emit("change", key);
    }

    // jsx
    const render = () => (
      <>
        <div>
          {/* 渲染 buttons */}
          {titles.map((titleInfo) => {
            const { key, title } = titleInfo;
            return (
              <button
                key={key}
                style={{ color: actKey.value === key ? "blue" : "#333" }}
                onClick={() => changeActKey(key)}
              >
                {title}
              </button>
            );
          })}
        </div>

        <div>
          {children.filter((panel) => {
            const { key } = panel.props || {};
            if (actKey.value === key) return true; // 匹配上 key ，则显示
            return false; // 否则，隐藏
          })}
        </div>
      </>
    );
    return render;
  },
});
```

```javascript
<template>
    <slot></slot>
</template>

<script>
export default {
    name: 'TabPanel',
    props: ['key', 'title'],
}
</script>
```



### 使用 JSX 实现作用域 slot

```javascript
import { defineComponent } from "vue";
import Child from "./Child";

export default defineComponent(() => {
  function render(msg) {
    return <p>msg: {msg} 123123</p>;
  }

  return () => {
    return (
      <>
        <p>Demo - JSX</p>
        <Child render={render}></Child>
      </>
    );
  };
});
```

```javascript
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: ["render"],
  setup(props) {
    const msgRef = ref("作用域插槽 Child - JSX");

    return () => {
      return <p>{props.render(msgRef.value)}</p>;
    };
  },
});
```



## Vue3-script-setup

### 基本使用

- 顶级变量、自定义组件, 可以直接用于模板
- 可正常使用 ref， reactive， computed 等能力
- 和其他 `<script>` 同时使用

```javascript
<script>
function add(a, b) { return a + b }
</script>

<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import Child1 from './Child1'
import Child2 from './Child2'
import Child3 from './Child3'

const countRef = ref(100)

function addCount() {
    countRef.value++
}

const state = reactive({
    name: '双越'
})
const { name } = toRefs(state)

console.log( add(10, 20) )

function onChange(info) {
    console.log('on change', info)
}
function onDelete(info) {
    console.log('on delete', info)
}

const child3Ref = ref(null)
onMounted(() => {
    // 拿到 Child3 组件的一些数据
    console.log(child3Ref.value)
    console.log(child3Ref.value.a)
    console.log(child3Ref.value.b)
})

</script>

<template>
    <p @click="addCount">{{countRef}}</p>
    <p>{{name}}</p>
    <child-1></child-1>
    <hr>

    <child-2 :name="name" :age="countRef" @change="onChange" @delete="onDelete"></child-2>
    <hr>

    <child-3 ref="child3Ref"></child-3>
</template>
```



### defineProps 和 defineEmits

```javascript
<script setup>
import { defineProps, defineEmits } from 'vue'

// 定义属性
const props = defineProps({
    name: String,
    age: Number
})

// 定义事件
const emit = defineEmits(['change', 'delete'])
function deleteHandler() {
    emit('delete', 'aaa')
}

</script>

<template>
    <p>Child2 - name: {{props.name}}, age: {{props.age}}</p>
    <button @click="$emit('change', 'bbb')">change</button>
    <button @click="deleteHandler">delete</button>
</template>
```



## defineExpose

```javascript
<script setup>
import { ref, defineExpose } from 'vue'

const a = ref(101)
const b = 201

defineExpose({
    a,
    b
})

</script>

<template>
    <p>Child3</p>
</template>
```
