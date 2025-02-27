---
prev: false
next:
  text: '面试真题2022'
  link: '/面试题库/面试真题2022'

---

# vue全家桶
## vue路由

前端路由的特点就是根据路径的变化，渲染对应的组件。

### 路由的模式
- hash（#）
- history（h5）
- memory （内存型，不会修改url地址，服务端用的多）

**hash**

- hash无法做ssr，history可以做ssr。hash是前端的锚点，不会发送给后端。seo优化hash是不支持的。

- hash的特点刷新不会出现404。因为服务端无法获取 hash后面的东西。

- 缺点：丑，无法seo优化
- 优点：兼容性好

**h5 api**

- 好看，用起来方便
- 缺点：服务器没有对应的资源会产生404。解决方案就是无论访问什么资源都重定向到首页。
- 虽然用户访问的是 www.baidu.com/about -> 返回的是首页内容 （但是vue会拿到当前/about. 找到组件来渲染）。需要服务端支持。



实现方式

- hash模式如何实现路径的跳转和监控，onhashchange + location.hash
- history模式如何实现跳转和监控，history.pushState(自己跳转逻辑) + popstate（前进后退的）
- 新版vue-router 采用一套方案 history.pushState + popstate 来实现即可，不用 hash（不考虑兼容性，全部采用pushState来实现两种路由方案）



## vue面试题

### 一、你知道哪些vue3新特性？

- CompositionAPI 组合式API
  - 使用函数的方式编写vue组件，最终可以组合在一起。
  - 组合式API不是函数编程
  - 组合式API (响应式部分`ref()`, `reactive()` , 生命周期钩子 `onMounted()`, `onUnmounted()`, 依赖注入 `provide()`,`inject()`)
- SFC Composition API Syntax Sugar (`<script setup>`)*
  - 单文件组合式API语法糖
  - 代码写起来更简洁了不需要`return`，而且不用借助代理对象性能更好

- Teleport

  - 类似于React中的Portal组件（传送门）、指定将内容渲染到某个容器中。
  - 用户也可以手动调用render方法来实现。
  - 模态框组件或者弹框组件都可以用 Teleport 组件

- Fragments

  - Fragment（片段）vue3中允许组件中包含多个根节点，好处就是无需无意义的包裹。

- Emits Component Option

  - vue3中默认绑定的事件会绑定到根元素上，通过emits属性可以从attrs中移除，这样只能通过emit来触发对应的事件

- createRenderer API from @vue/runtime-core to create custom renderers

  - 创建渲染器，可以基于 runtime-core 创建自定义的渲染器。可以实现跨平台渲染。

- SFC State-driven CSS Variables `(v-bind in <style>`)*

  - 在单文件组件中通过v-bind 绑定 css 样式变量  `background:v-bind(color);`

- SFC `<style scoped>` can now include global rules or rules that target only slotted content
  Suspense experimental

  - 在作用域样式中我们能包含全局的规则和针对插槽的规则

  ```scss
  :slotted(.child){color:red}
  /* 可以在作用域样式中影响全局样式 */
  :global(#root) {
      color:red;
  }
  /* 修改别人组件中的样式可以采用:deep的方式 */
  .my :deep(h5) {color:yellow;}
  ```

- Suspense experimental

  - 针对异步组件的优雅处理



### 二、Vue3对比Vue2的变化？

- 性能优化（更快）
  - 使用 Proxy 替代了 `Object.defineProperty` (为什么？需要递归给对象中的所有属性增添 getter 和 setter，重写性能差，对新增的属性和删除的属性也无法监控 vm.$set vm.$delete。对数组也能监控但是性能依然差。defineProperty 不支持新的数据结构 map 和 set 都不支持)
  - 模板编译优化：编译的过程中给节点增加 PatchFlag 标记；对静态节点静态提升，函数缓存。
  - Diff 算法 （全量diff 最长递增子序列，可以减少复用节点的移动）（非全量diff算法，只比较动态节点。通过PatchFlag更新动态的属性，减少递归操作） 

- 体积优化 （更小）

  - Vue3移除了很多特性
    - Vue2中的 inline-template 基本用不到所以干掉了
    - 删除了过滤器（通过计算属性来替代，或者自己写个方法来替代）
    - new Vue()=>eventBus $on $off $emit (发布订阅) 官方觉得不需要了，如果你有需要可以通过 mitt 库来实现
    - .native .sync (.native 不需要 vue3中默认就是native，.sync没有了可以直接通过 v-model)  @keyup.enter(无法通过keycode来实现修饰符)
    - $children 来封装组件交互（vue3不再有此方法 provide和inject）
    - 全局api都不再使用了 Vue.use Vue.component Vue.directive
  - Vue3所有的api都是基于函数可以按需导入，配合构建工具可以实现 tree-shaking，用户最终打包的体积小

- createRender 自定义渲染器允许跨平台，vue2中只能改源码，扩展能力更强

- vue3支持ts 源码采用monorepo分模块打包，可以不引用完整的vue

  

  

### 三、如何看待 Composition API 和 Options API?

- 如果采用Options API 会将代码分散在不同的地方，会出现反复横跳的问题。Composition API 可以将相关的逻辑收集在一起。
- 在 vue2中想让逻辑复用要Vue.mixin(命名冲突，数据来源不明确)，组合式可以方便的提取逻辑方便复用。
- this问题，导致指向不明确，无法支持 tree-shaking

> 核心就是将业务逻辑相关的代码放在一起，可以复用。



### 四、如何理解 reactive、ref、toRef 和 toRefs？

- reactive: 特点就是将一个普通对象转换成响应式对象（采用的是 new Proxy），我们渲染的时候会使用产生的代理对象，当我访问代理对象属性的时候会进行依赖收集，当修改属性时会触发更新。
- ref：创建一个包装对象，将简单的值进行包装成响应式对象。通过这个对象的.value来进行访问值，访问的时候会做依赖收集，修改.value值会触发更新（采用的是类的属性访问器），ref内部如果放的是对象也会采用reactive来实现
- toRef：基于reactive将某个reactive中的某个属性转换成ref
- toRefs：基于reactive将所有属性转换成ref



### 五、watch和watchEffect的区别？
- watchEffect 等价于 effect， watch就是基于effect封装的自定义了scheduler
- watchEffect 里面传递的是一个立即执行函数。被动追踪依赖的值，值变化了重新执行此方法
- watch 监控某个值的变化，数据变化后会触发对应的回调

```vue
watchEffect(()=>app.innerHTML = state.xxx) // effect => getter
watch(()=>state.xxx,()=>{}) // getter scheduler
```



### 六、vue2和vue3核心diff算法区别？

- 对于vue2和vue3的全量diff算法，整体来说性能差异不大
- 默认都是采用同级比较+深度递归的方式进行比较
- vue3中拥有最长递增子序列的算法优化了移动复用节点的频率
  - diff算法的原理： 1）先比较根节点 isSameVnode
  - 如果不是相同节点删除后创建新节点，如果是相同节点泽复用比较属性和儿子
  - 一方有儿子，一方没儿子， 两方都没儿子， 两方都有儿子
  - 两方都有儿子才是diff算法的核心（先比头再比尾，确定是否是特殊情况，是的话直接操作，如果不是则采用最长递增子序列来进行优化复用节点）
- vue3中对比vue2性能优化在编译原理，编译的过程中会添加patchFlag，会产生对应的 block 节点来进行动态节点的收集，更新的时候只比较动态节点即可（靶向更新，减少了递归比较的方式）



### 七、v-if和v-for的优先级哪个高？

在同一个节点中使用这两个指令。 在vue3中v-if优先级会高于v-for，v-if会被提升到v-for之前执行。如果v-if的值基于v-for，会报错。

```vue
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.item%2)
    ? (_openBlock(true), _createElementBlock(_Fragment, { key: 0 }, _renderList(_ctx.arr, (item) => {
        return (_openBlock(), _createElementBlock("div"))
      }), 256 /* UNKEYED_FRAGMENT */))
    : _createCommentVNode("v-if", true)
}

// Check the console for the AST
```



v-if 和 v-for不要连用即可。



### 八、Vue 中的 v-if 和 v-show怎么理解？

- v-show 控制的是 display 样式， （v-show无论如何都执行）
- v-if 控制的是dom的显示隐藏（v-if具备阻断内部代码的执行，如果条件不成立不执行内部的逻辑，如果成立则执行）

> 在页面第一次加载时就能确定显示隐藏用v-if，如果频繁切换显示隐藏则用v-show。

```html
<span v-show="true"></span>
```

在切换时会记录原始的diplay属性。

opacity:0  占位 可以进行DOM事件监听

visibility:hidden  占据页面空间

display:none; 不占位, 无法进行DOM事件监听。



### 九、vue3组合式API生命周期钩子函数有变化吗？

- beforeCreate  created -> setup
- beforeMount -> onBeforeMount
- render
- Mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- Updated -> onUpdated
- beforeUnmount -> onBeforeUnmount
- unmounted -> onUnmounted
- errorCaptured -> onErrorCaptured 捕获错误
- activated -> onActivated  Kee-Alive相关的
- deactivated -> onDeactivated



### 十、Vue3中如何进行组件通信？

- 父子 `props`来进行通信，通过 `ref` 来获取儿子， 儿子通过 `exposed`暴露方法让父亲调用，`$attrs`可以获取父亲传递的属性、插槽。
- 子父通过 `props` 来进行通信。`emit` 来触发给子组件绑定的事件 `$parent`, 作用域插槽
- 跨级 `provide/inject`
- 兄弟 通过共同的父级来通信，vuex、pinia、自定义发布订阅来实现（不推荐）
- v-model语法糖 本质就是 `props`+`emit` 



### 十一、说说你对双向绑定的理解，以及它的实现原理？

> v-model 实现原理 1）组件上 2）表单元素上（v-model是 input  + value 语法糖?）



- 双向绑定一般针对的就是表单元素，当数据变化后会更新视图，当视图修改的时候会更新数据。MVVM  v-> vm -> model
- 针对表单元素的 v-model 会根据表单类型解析出对应的事件（text类型会对中文做处理）
- 针对组件来说就是语法糖。传递属性和事件，可以通过 `v-model:xxx`方式来修改绑定的名字 （缩写）



### 十二、谈谈pinia？

- vuex 只有一份，基于复杂的树结构，管理困难
- 模块和根状态名字冲突怎么办？
- 数据调用的时候过程复杂，数据非扁平化。
- mutation和action区别，功能繁琐
- 模块避免共用需要namespaced
- 不是ts写的，对ts支持也不好
- vuex基于 optionsAPI, 针对vue3不友好



### 十三、Vue-Router

- vue-router 两种前端模式 
  - hash （丑，不会出现404、但是无法seo优化）
  - history （好看，需要服务端支持来解决404问题，可以seo）
- 404问题咋解决，后端访问不存在的资源跳转到首页，首页会加载js根据路径渲染对应的组件。
- 路由守卫的执行过程（组合函数，promise链）
- 菜单权限 addRoute。访问权限 meta 属性 来做限制 （路由守卫）



### 十四、Vue中异步组件的作用及原理

defineAsyncComponent 来定义异步组件，内部传递工厂函数，来异步加载组件

- 类似图片懒加载，默认展示异步占位符，后续加载完毕后显示真正的内容（响应式原理）
- 一般配合工程化工具，实现代码分割。



### 十五、Keep-Alive的原理

- 缓存组件的虚拟节点（真实DOM） 直接在激活的时候可以复用老节点
- 缓存算法 LRU 最近最久未使用法。
- keep-alive 因为走了缓存而数据无法得到更新（beforeRouteUpdate，activated 来更新数据）

