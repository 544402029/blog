# vue使用

## 搭建项目

首先需要安装node，git

创建码云仓库

#### 生成公钥

```
ssh-keygen -t rsa -C "544402029@qq.com" 
```

和码云注册邮箱地址一样

#### 获取公钥

```
cat ~/.ssh/id_rsa.pub
```

#### 添加公钥

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1587537833808.png)

#### 克隆仓库

```
git clone git@gitee.com:l544402029/Travel.git
```

#### 创建vue

安装脚手架

```
npm install -g @vue/cli
```

创建vue项目

```
vue create Travel
```

#### 推送到远程仓库

```
git add .
git commit -m 'init project'
git push
```


## MVVM模式

### MVP模式

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580482042948.png)

首先我们要了解一下MVP模式， 代码分为三层。 Model层（也就是我们所说的数据层）， Presenter呈现层(业务逻辑相关的控制层)， View层（视图层，页面上的DOM展示）。

当我们视图上的按钮被点击时， 控制器里的代码会执行， 控制器里面的代码负责了所有的业务逻辑。控制器可以去调用模型层去发`ajax`请求，或者控制器处理业务逻辑之后， 控制器会通过`DOM`操作再来改变视图。

使用MVP模式我们大部分代码都是操作DOM。可以说是面向DOM开发。

### MVVM模式

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580482764644.png)


MVVM模式也有Model层来存储数据， 有View（视图层）来显示数据， 但是没有Presenter（控制器）层， 它有一个ViewModel层。ViewModel层不需要我们自己编写， 它是vue自带的。

使用MVVM模式， 我们不需要关注ViewModel层， 它是vue内置的。我们只需要关注View层和Model层。对于MVVM模式， 编码的重点一部分是在View层， 一部分是在Model层。 使用这种模式大部分是在操作数据， DOM操作大大减少， 减少了代码量， 可是说是面向数据开发。


在我们更改视图或者操作数据的时候，vm层会对相应数据或者视图进行更新，不进行dom操作，在vm层中的实现主要使用了es5的`Object.defineProperty()`和虚拟dom的一个机制。


#### 关键点：

1. mvvm和mvp都是前端的设计模式，都是前后端分离后所特有的模式
2. 前后端分离前是mvc模式，主要业务逻辑集中在后端，连页面的渲染都是在后端
3. mvvm和mvp其实都是取代了mvc中的v，即后端不需要渲染页面了，而是把需要渲染给页面的数据以json形式传给前端mvvm或mvp中的m，vm或p再把这些数据传给v进行页面渲染
4. 由于前端渲染会降低SEO，所以网站首页可以采取后端渲染

## 组件

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。

### 组件间传值

#### 子组件向父组件传值

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580486002362.png)

在子组件接受父组件传过来的值时， 只能用但是不能来修改。 之所以有这样一个单向数据流的概念， 是因为父组件传过来的值有可能被其他组件使用。你修改了这个子组件的数据， 不仅影响这个组件， 有可能对其他组件造成影响。

#### 非父子组件传值

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580568788281.png)


### vue实例

#### 数据与方法

当数据改变时，视图会进行重渲染。**值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的。** 也就是说如果你添加一个新的属性将不会触发任何视图的更新。

如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。

#### 生命周期

![enter description here](https://cn.vuejs.org/images/lifecycle.png)


生命周期函数就是vue实例在某一个时间点自动执行的函数。

生命周期钩子的 this 上下文指向调用它的 Vue 实例。


:::danger 注意
不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。
:::



#### 计算属性， 方法和侦听器

##### 计算属性

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580542616794.png)

计算属性拥有缓存机制， 在计算所需要的的变量没有变化时会一直使用， 不会进行更新。  只有当需要的变量发生变化才会进行更新。

计算属性，方法， 侦听器都可以使用的情况， 我们应该优先使用计算属性,  性能更高。


##### 方法

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580542836843.png)


方法没有缓存机制， 每次都会进行更新。

##### 侦听器

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580543213321.png)


侦听器会在监听的变量发生变化时更新数据。

#### vue条件渲染

##### key值得作用

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580546704958.png)

如果加上`key`值， vue就知道它是页面上唯一的元素。 如果两个元素`key`值不同， 他就不会复用之前的元素。


## 模板语法

#### 动态参数

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：

```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```


## 列表渲染

有时你可能需要为已有对象赋值多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：

```js
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```


你应该这样做：


```js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```




遇到请求地址是`/api`可以自动转发到`/static/mock`。


## 项目联调

把后端请求的地址填写在这里即可

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1581876970902.png)


## mixin

如果我们的业务代码内有很多相同的逻辑代码， 这时候我们可以考虑使用mixin， 它可以做到让我们写一套代码在多个地方使用。


创建mixin.js

```js
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted () {
    this.handlePlaylist(this.playlist)
  },
  activated () {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist (newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist () {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
```



#### 在业务代码内引入此文件

```vue
import {playlistMixin} from 'common/js/mixin'

export default {
	mixins: [playlistMixin],
}
```

这样做就可以把业务代码和playlistMixin进行融合。 如果组件内有相同方法， 会覆盖掉mixin中的方法。




## vuex

首先我们可以在store文件夹下创建index.js作为总入口。 引入4个文件。action.js, getter.js, mutation.js,  state.js。

其中state用来存放数据，  getter用来获取数据， 它相当于是一个计算属性。
mutation修改数据，  action可以异步的操作数据， 还可以打包mutation的修改。

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1580638665713.png)

### 定义

index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```

state.js
```js
import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

const state = {
  singer : {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: [],
  favoriteList: []
}
export default state
```

getter.js

```js
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const playHistory = (state) => {
  return state.playHistory.map((song) => {
    return new Song(song)
  })
}

export const favoriteList = (state) => {
  return state.favoriteList.map((song) => {
    return new Song(song)
  })
}

export const disc = (state) => state.disc

export const topList = (state) => state.topList

export const searchHistory = (state) => state.searchHistory

```

一般修改数据， 我们会创建一个js文件专门存放修改数据的变量名， 防止出错。

mutation-types.js
```js
export const SET_SINGER = 'SET_SINGER'

export const SET_PLAYING_STATE = 'SET_PLAYING_STATE'

export const SET_FULL_SCREEN = 'SET_FULL_SCREEN'

export const SET_PLAYLIST = 'SET_PLAYLIST'

export const SET_SEQUENCE_LIST = 'SET_SEQUENCE_LIST'

export const SET_PLAY_MODE = 'SET_PLAY_MODE'

export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'

export const SET_PLAY_HISTORY = 'SET_PLAY_HISTORY'

export const SET_FAVORITE_LIST = 'SET_FAVORITE_LIST'

export const SET_DISC = 'SET_DISC'

export const SET_TOP_LIST = 'SET_TOP_LIST'

export const SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY'
```

mutations.js

```js
import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_SEQUENCE_LIST](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAY_HISTORY] (state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST] (state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    
  }
}

export default mutations

```

action.js

```js
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit},{list}) {
  commit(types.SET_PLAY_MODE,playMode.random)
  commit(types.SET_SEQUENCE_LIST,list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST,randomList)
  commit(types.SET_CURRENT_INDEX,0)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}

export const insertSong = function ({ commit, state }, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
```

### 使用



```
import {mapGetters, mapMutations} from 'vuex'


		...mapGetters([
			'fullScreen',
			'playlist',
			'currentSong',
			'playing',
			'currentIndex',
			'mode',
			'sequenceList'
		]),

	  back() {
        this.setFullScreen(false)
      },
	  
	  
      ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN',
        setPlayingState:'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlaylist: 'SET_PLAYLIST'
      })

```

action

```
	import {mapActions} from 'vuex'

	  this.selectPlay({
          list: this.songs,
          index
        })
		
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
```





