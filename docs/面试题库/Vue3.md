<a name="Vue3"></a>

## Vue3

![](https://cdn.nlark.com/yuque/0/2022/png/2735637/1648139575088-adaa9854-3e32-41aa-9734-629d0a5dc62d.png#clientId=ub8460f8f-9968-4&crop=0&crop=0&crop=1&crop=1&id=Q7riC&originHeight=3759&originWidth=641&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1b6b3b78-4bd1-406b-b430-73edb4147e8&title=)

<a name="4e686315"></a>

### Vue3 升级内容？

- 全部用 TS 重写（响应式、vdom、模板编译等）
- 性能提升，（打包出来的）代码量减少
- 会调整部分 API

<a name="79097a32"></a>

### Vue3 比 Vue2 有什么优势？

- 性能更好
- 体积更小
- 更好的 TS 支持（Vue3 采用 TS 开发）
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

<a name="d6bba70b"></a>

### Vue3 生命周期和 Vue2 生命周期有什么区别？

<a name="a2e9e079"></a>

#### Options API 生命周期

- beforeDestory 改为 beforeUnmount
- destroyed 改为 unmounted
- 其它沿用 Vue2 生命周期

<a name="6faeca87"></a>

### Composition API 带来了什么？

- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

更适用于大型项目，复杂页面。

![](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647919440656-41f4ebb6-ae41-4a53-9dbc-e2ce9d9ba69f.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=uaed21dd2&margin=%5Bobject%20Object%5D&originHeight=693&originWidth=529&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udd081cbb-2521-43a3-b089-c6de0dc1ab3&title=)

其中 this.a, this.fn1 按照正常 js 规范是通过 this.data.a, this.method.fn 去访问。但是在 vue2 做了一层代理， 导致直接在 this 下就可以访问。这样非常不利于类型推导。

<a name="FMkIH"></a>

### 如何理解 ref toRef 和 toRefs

<a name="wtxrP"></a>

#### ref

- 生成值类型的响应式数据
- 可用于模板和 reactive
- 通过 .value 修改值

<a name="f96VO"></a>

#### toref

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

<a name="VnpYw"></a>

#### toRefs

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

<a name="b8VCb"></a>

### ref toRef 和 toRefs 的最佳使用方式

- 用 reactive 做对象的响应式, 用 ref 做值类型响应式
- setup 中返回 toRefs(state) , 或者 toRef(state，'xxX' )
- ref 的变量命名都用 xxxRef
- 合成函数返回响应式对象时,使用 toRefs

<a name="iiDnB"></a>

### 为何需要 ref

- 返回值类型, 会丢失响应式
- 如在 setup、computed、 合成函数,都有可能返回值类型
- Vue 如不定义 ref ,用户将自造 ref ,反而混乱

proxy 只能针对对象，对值类型是无能为力的。

<a name="e3NWv"></a>

### 为何需要 .value

- ref 是一个对象(不丢失响应式) , value 存储值
- 通过.value 属性的 get 和 set 实现响应式
- 用于模板、reactive 时,不需要.value ,其他情况都需要

<a name="Bf0KS"></a>

### 为何需要 toRef 和 toRefs ?

- 初衷:不丢失响应式的情况下, 把对象数据**解构/扩散**
- 前提:针对的是响应式对象( reactive 封装的)非普通对象
- 注意: **不创造**响应式, 而是**延续**响应式

<a name="IxR7s"></a>

### vue3 升级了哪些重要功能

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

<a name="fe3Pz"></a>

#### createApp

<a name="x4X8i"></a>

#### ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936057600-cb9ff4cf-4739-47de-a65a-50e0a7a16f35.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=752&id=uff14a646&margin=%5Bobject%20Object%5D&name=image.png&originHeight=752&originWidth=1464&originalType=binary&ratio=1&rotation=0&showTitle=false&size=260521&status=done&style=none&taskId=u389ffd10-97dc-49a6-9a05-6d28fd878da&title=&width=1464)

<a name="ITrlh"></a>

#### emits 属性

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936173025-db6bbeb4-5c98-4e2a-9269-faffd2c89ce0.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=722&id=u169d1838&margin=%5Bobject%20Object%5D&name=image.png&originHeight=722&originWidth=1147&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219308&status=done&style=none&taskId=u7434b584-7306-4201-be59-313efe6ed1c&title=&width=1147)

<a name="LV5JS"></a>

#### 多事件处理

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936357967-f528d26c-aa3a-4e6e-a38c-deebf55b32d7.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=534&id=ue73d4349&margin=%5Bobject%20Object%5D&name=image.png&originHeight=534&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=135540&status=done&style=none&taskId=u62927f31-bc7a-4178-8088-5dc63e250d8&title=&width=910)

<a name="NI7PW"></a>

#### Fragment

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936416496-b9d53221-aec3-4478-b2ec-13df2792ca23.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=649&id=u510c9197&margin=%5Bobject%20Object%5D&name=image.png&originHeight=649&originWidth=1457&originalType=binary&ratio=1&rotation=0&showTitle=false&size=237612&status=done&style=none&taskId=u1bac32f6-3d48-486a-b0b8-18a282c00ee&title=&width=1457)
<a name="XAo5Z"></a>

####

<a name="CjO25"></a>

#### 移除 .sync

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936475532-a540eaed-df36-4338-b8e7-9788a26423db.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=625&id=u8b8a3a5e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=625&originWidth=1126&originalType=binary&ratio=1&rotation=0&showTitle=false&size=137946&status=done&style=none&taskId=ubdfb40be-6050-4040-bec0-35ea98807bb&title=&width=1126)

<a name="KcIjd"></a>

#### 异步组件的写法

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936565292-ae2dc739-a252-4af4-987b-62d12fa79b90.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=642&id=u9abbefd9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=642&originWidth=1495&originalType=binary&ratio=1&rotation=0&showTitle=false&size=197697&status=done&style=none&taskId=u308e92b1-8c77-4b50-81de-84e61af1410&title=&width=1495)

<a name="pMSfZ"></a>

#### 移除 filter

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936667672-ac9283e4-587d-4150-a524-98a2b53e3464.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=593&id=u7d32f0fb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=593&originWidth=978&originalType=binary&ratio=1&rotation=0&showTitle=false&size=152310&status=done&style=none&taskId=ue7ce5e84-7393-4d07-a6ce-557bd1964c6&title=&width=978)

<a name="qkbef"></a>

#### Teleport

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936723208-36a69e00-f7b0-46ac-bef8-160167e24cc0.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=759&id=uf65dbf9d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=759&originWidth=1193&originalType=binary&ratio=1&rotation=0&showTitle=false&size=233862&status=done&style=none&taskId=u4511887b-05df-4a48-beba-97113a96b07&title=&width=1193)

<a name="woWYG"></a>

#### Suspense

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647936916223-c44e4205-bdbe-4e65-b338-94d3e7c1f60f.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=743&id=u535952d2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=743&originWidth=935&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219353&status=done&style=none&taskId=u8af1b0c5-6dbb-4eea-abc5-9811769886f&title=&width=935)

<a name="CYH9B"></a>

#### Composition API

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647937014337-6c78a0d6-f0fe-42cc-98f3-95b25439bbd8.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=642&id=u522cf626&margin=%5Bobject%20Object%5D&name=image.png&originHeight=642&originWidth=1212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103795&status=done&style=none&taskId=ua2f16a1d-783f-47fb-b4ce-a71fa8f62d7&title=&width=1212)

<a name="Zhzbr"></a>

### watch 和 watchEffect 的区别

- 两者都可监听 data 属性变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中的属性, 自动监听其变化

<a name="YK9Uf"></a>

### setup 中如何获取组件实例

- 在 setup 和其他 Composition API 中没有 this
- 可通过 getCurrentInstance 获取当前实例
- 若使用 Options API 可照常使用 this

<a name="FkoYd"></a>

### Vue3 为何比 Vue2 快

- Proxy 响应式
- PatchFlag
- hoistStatic
- cacheHandler
- SSR 优化
- tree-shaking

<a name="cOcT1"></a>

#### PatchFlag

- 编译模板时,动态节点做标记
- 标记,分为不同的类型,如 TEXT PROPS
- diff 算法时，可以区分静态节点,以及不同类型的动态节点

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647964487170-7a10f3e8-141a-420a-ac08-55dbb7bf9012.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=823&id=u0002ce1a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=823&originWidth=802&originalType=binary&ratio=1&rotation=0&showTitle=false&size=268555&status=done&style=none&taskId=u236e5d12-b14a-40a6-98a8-ad49710232a&title=&width=802)

<a name="Glb2R"></a>

#### HoistStatic

- 将静态节点的定义,提升到父作用域,缓存起来
- 多个相邻的静态节点,会被合并起来
- 典型的拿空间换时间的优化策略

将静态节点的定义,提升到父作用域,缓存起来<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647964847513-d4a83dc1-03ce-46f5-add9-de5438a04bef.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=693&id=uce3f36a3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=693&originWidth=1491&originalType=binary&ratio=1&rotation=0&showTitle=false&size=323204&status=done&style=none&taskId=ufcfe2d0c-8b22-4ebc-a3ba-8c03c4388e4&title=&width=1491)

多个相邻的静态节点,会被合并起来<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647965068670-d3e69f0f-8a41-4391-8e9c-7a8bb1f6562b.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=681&id=uddb575d2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=681&originWidth=1493&originalType=binary&ratio=1&rotation=0&showTitle=false&size=355720&status=done&style=none&taskId=u813e246a-a706-48ee-a679-8290c83f5e6&title=&width=1493)

<a name="FBcir"></a>

#### CacheHandler

- 缓存事件

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647965197425-6f2d496d-2bba-4784-9f2a-d97050b3448a.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=630&id=u790db513&margin=%5Bobject%20Object%5D&name=image.png&originHeight=630&originWidth=1499&originalType=binary&ratio=1&rotation=0&showTitle=false&size=220860&status=done&style=none&taskId=u59550f99-f689-43b0-9a60-00ff4f40987&title=&width=1499)

<a name="Q7cjP"></a>

#### SSR 优化

- 静态节点直接输出, 绕过了 vdom
- 动态节点, 还是需要动态渲染

类似 HoistStatic

- ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647965387292-d7828aec-0cbc-48c9-bc2a-c2d7a3ddcb15.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=724&id=u9ff5fef1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=724&originWidth=1496&originalType=binary&ratio=1&rotation=0&showTitle=false&size=304224&status=done&style=none&taskId=u503f6856-d15d-463c-84d8-d7bf0aa819e&title=&width=1496)

<a name="ni2GT"></a>

#### Tree-shaking 的优化

- 编译时, 根据不同的情况,引入不同的 API
- <br />

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647965547993-5aa5ba98-4b71-406c-b603-e280c3dc4109.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=708&id=u797c879c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=708&originWidth=1508&originalType=binary&ratio=1&rotation=0&showTitle=false&size=326095&status=done&style=none&taskId=ua34cfbaf-cb6e-4935-8c98-85248c7e9e1&title=&width=1508)

<a name="iRkEI"></a>

### Vite 是什么？

- 一个前端打包工具, Vue 作者发起的项目
- 借助 Vue 的影响力,发展较快,和 webpack 竞争
- 优势:开发环境下无需打包,启动快

<a name="VctYG"></a>

### Vite 为什么启动非常快

- 开发环境使用 ES6 Module， 无需打包一非常快
- 生产环境使用 rollup , 并不会快很多

<a name="YQV91"></a>

#### ES Module 在浏览器中的应用

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647966140067-930405c2-4c4b-41b2-919e-5b4ddc33c728.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=792&id=u8000e137&margin=%5Bobject%20Object%5D&name=image.png&originHeight=792&originWidth=1512&originalType=binary&ratio=1&rotation=0&showTitle=false&size=263230&status=done&style=none&taskId=ufa9f9986-bee4-4214-b87e-2aab0c96b70&title=&width=1512)

外链<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647966471122-e1df3c2d-08f5-4db5-8389-d0c658aaec9b.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=772&id=u812209f8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=772&originWidth=1512&originalType=binary&ratio=1&rotation=0&showTitle=false&size=241179&status=done&style=none&taskId=u6c087461-32aa-4261-ba1e-129dbec2f04&title=&width=1512)

远程引入<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647966431628-a2a54b1b-dddc-41fd-8520-dc769612c02b.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=801&id=u75ca5c75&margin=%5Bobject%20Object%5D&name=image.png&originHeight=801&originWidth=1492&originalType=binary&ratio=1&rotation=0&showTitle=false&size=300972&status=done&style=none&taskId=ubbe580fe-fb8c-4756-b118-6cd439e464b&title=&width=1492)

动态引入<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1647966653656-c121ebb1-c829-474b-9f14-ae7224c8ba0c.png#clientId=uc0a7b48f-3dc9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=809&id=uadde6751&margin=%5Bobject%20Object%5D&name=image.png&originHeight=809&originWidth=1487&originalType=binary&ratio=1&rotation=0&showTitle=false&size=549342&status=done&style=none&taskId=u9f70e495-4aa6-4823-870e-1dc3337ab15&title=&width=1487)

<a name="KlxuR"></a>

### Composition API 和 React Hooks 的对比

- 前者 setup 只会被调用一次,而后者函数会被多次调用
- 前者无需 useMemo useCallback ,因为 setup 只调用一次
- 前者无需顾虑调用顺序, 而后者需要保证 hooks 的顺序一致
- 前者 reactive + ref 比后者 useState 要难理解

<a name="kQJrI"></a>

### Composition API 给 Vue 带来了什么？

- 提高了组件的复用性和可读性

<a name="Xgqbn"></a>

### Vue3 和 JSX-基本使用

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

<a name="kmlOd"></a>

### Vue3 和 JSX-JSX 和 template 的区别

- JSX 本质就是 js 代码, 可以使用 js 的任何能力
- template 只能嵌入简单的 js 表达式,其他需要指令,如 v-if
- JSX 已经成为 ES 规范, template 还是 Vue 自家规范
- 都会被编译为 js 代码( render 函数)

<a name="HlQ4h"></a>

### Vue3 和 JSX-slot

<a name="I2Px2"></a>

#### tabs-jsx

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

<a name="CviSq"></a>

#### 使用 JSX 实现作用域 slot

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

<a name="TOA22"></a>

### Vue3-script-setup

<a name="acU2U"></a>

#### 基本使用

- 顶级变量、自定义组件, 可以直接用于模板
- 可正常使用 ref， reactive， computed 等能力
- 和其他 <script> 同时使用

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

<a name="RjQpJ"></a>

#### defineProps 和 defineEmits

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

<a name="y0Bj1"></a>

### defineExpose

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
