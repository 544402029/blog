# 1. 声明式框架

> Vue3依旧是声明式的框架，用起来简单。

**命令式和声明式区别**

*   早在JQ的时代编写的代码都是命令式的，命令式框架重要特点就是关注过程
*   声明式框架更加关注结果。命令式的代码封装到了vue.js中，过程靠vue.js来实现

> 声明式代码更加简单，不需要关注实现，按照要求填代码就可以 （给上原材料就出结果）

    - 命令式编程：
    let numbers = [1,2,3,4,5]
    let total = 0
    for(let i = 0; i < numbers.length; i++) {
      total += numbers[i] - 关注了过程
    }
    console.log(total)
    
    - 声明式编程：
    let total2 = numbers.reduce(function (memo,current) {
      return memo + current
    },0)
    console.log(total2)

简单来说，命令式我们需要先获取 DOM 节点， 然后再操作 DOM, 去渲染我们的内容。编写代码时我们更关注的是过程。

声明式我们更加关注结果，不需要考虑操作 DOM, 操作 DOM 交给 vue.js 进行处理, 我们更加关注数据，通过特定语法便可以渲染到页面上。

# 2. 采用虚拟DOM

传统更新页面，获取一个 DOM 节点， 拼接一个完整的字符串 innerHTML 放入节点进行渲染。如果数据更新，需要重新进行渲染。有可能大部分节点并没有发生改变，但是依然被更新。

添加虚拟DOM后，可以比较新旧虚拟节点，找到变化在进行更新。虚拟DOM就是一个对象，用来描述真实DOM的

    const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        children,
        component: null,
        el: null,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
    } 

虚拟 DOM 还有一个优势是 跨平台， 如微信小程序， uniapp，单元测试。

# 3. 区分编译时和运行时

*   我们需要有一个虚拟DOM，调用渲染方法将虚拟DOM渲染成真实DOM （缺点就是虚拟DOM编写麻烦）
*   专门写个编译时可以将模板编译成虚拟DOM （在构建的时候进行编译性能更高，不需要再运行的时候进行编译，而且vue3在编译中做了很多优化）

开发时我们用的编译模式，将 HTML 模板编译为虚拟 DOM ，最终运行时将编译的虚拟 DOM 渲染为真实 DOM, 不用再次执行编译过程。

# 4. Vue3 设计思想

*   Vue3 更注重模块的拆分，在2.0我们无法单独使用某个模块(如响应式模块)，需要完整的引入 vue.js。vue3 模块耦合度低，可以单独使用。**拆分模块**
*   Vue2 中很多方法,组件即使没使用到也会打包。vue3 通过 Tree-shaking 实现按需引入，减少打包体积。移除了不需要的功能（filter，inline-template）。**重写API**
*   Vue3实现自定义渲染器，扩展能力强。改写渲染方式更加简单。**扩展方便**

# 5. 项目结构

![image-20250224091431329](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224091431329.png)

![image-20250224091458807](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224091458807.png)

# 6. 对比vue2的变化

-   在Vue2的时候使用defineProperty来进行数据的劫持, 需要对属性进行重写添加`getter`及`setter` **性能差**。
-   当新增属性和删除属性时无法监控变化。需要通过`$set`、`$delete`实现
-   数组不采用defineProperty来进行劫持 （浪费性能，对所有索引进行劫持会造成性能浪费）需要对数组单独进行处理

> Vue3中使用Proxy来实现响应式数据变化。从而解决了上述问题。


## CompositionAPI

-   在Vue2中采用的是OptionsAPI, 用户提供的data,props,methods,computed,watch等属性 (用户编写复杂业务逻辑会出现反复横跳问题)
-   Vue2中所有的属性都是通过`this`访问，`this`存在指向明确问题
-   Vue2中很多未使用方法或属性依旧会被打包，并且所有全局API都在Vue对象上公开。Composition API对 tree-shaking 更加友好，代码也更容易压缩。
-   组件逻辑共享问题， Vue2 采用mixins 实现组件之间的逻辑共享； 但是会有数据来源不明确，命名冲突等问题。 Vue3采用CompositionAPI 提取公共逻辑非常方便

> 简单的组件仍然可以采用OptionsAPI进行编写，compositionAPI在复杂的逻辑中有着明显的优势~。 `reactivity`模块中就包含了很多我们经常使用到的`API` 例如：computed、reactive、ref、effect等

