# VUE全家桶应用


## koa基础

首先要保证我们已经全局安装KOA2的脚手架工具`koa-generator`。

然后我们先利用脚手架创建一个ejs模板引擎。

```
koa2 -e koa2-learn
```

接着进行`npm i`安装所有依赖包。

```
npm install --update-binary
```

启动项目：
```
npm start koa2-learn
```


## Mongoose和Redis基础

### 安装

首先安装**mongoDB**和可视化工具**RoBo 3T**。


按照[https://www.runoob.com/mongodb/mongodb-window-install.html](https://www.runoob.com/mongodb/mongodb-window-install.html)网站进行配置启动


检测**mongoDB**是否安装成功，需执行以下命令：

```
which mongod
```

然后我们需要安装`mongoose`插件

```
npm i mongoose
```


接下来我们在项目根文件夹创建dbs文件夹， 创建 config.js 文件。目录如下：

![目录](https://gitee.com/l544402029/res/raw/master/小书匠/1585045331310.png)

config.js

```js
module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/dbs'
};
```

person.js
```js
//文件名就是对应的表明， 所以不要随便命名
const mongoose = require('mongoose');

//建数据表
let personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Person', personSchema);
```


app.js

```js{10-11,47-50}
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const pv = require('./middleware/koa-pv');

const mongoose = require('mongoose');
const dbConfig = require('./dbs/config');

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(pv());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
//连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
```


users.js

```js
const router = require('koa-router')();
const Person = require('../dbs/models/person');

router.prefix('/users');

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response';
});

router.post('/addPerson', async (ctx, next) => {
  let person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  });
  let code;
  try {
    //保存数据
    await person.save();
    code = 0;
  } catch (error) {
    code = -1;
  }
  ctx.body = {
    code
  };
});

router.post('/getPerson', async (ctx, next) => {
  const result = await Person.findOne({ name: ctx.request.body.name });
  const results = await Person.find({ name: ctx.request.body.name });
  ctx.body = {
    code: 1,
    result,
    results
  };
});

router.post('/updatePerson', async (ctx, next) => {
  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  });

  ctx.body = {
    result
  };
});

router.post('/removePerson', async (ctx, next) => {
  const result = await Person.where({
    name: ctx.request.body.name
  }).remove();

  ctx.body = {
    result
  };
});

module.exports = router;

```


接着我们访问一下这个接口, 在命令行输入以下命令：

```
curl -d 'name=lilei&age=27' http://localhost:3000/addPerson
```


`curl`是一个 Nginx 命令， `-d` 是 post 方式， `name=lilei&age=27'`是数据项， ` http://localhost:3000/addPerson` 是访问地址。

也可以选择使用 postman 来访问接口。

这样我们就把数据写入到数据库了。


## Redis

我们需要先安装两个中间件

```
npm i koa-generic-session koa-redis
```

koa-generic-session 主要用来操作 session , koa-redis 主要用来链接 redis的。

在app.js内引入

```js{8-9,21-28}
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const Redis = require('koa-redis');
const pv = require('./middleware/koa-pv');

const mongoose = require('mongoose');
const dbConfig = require('./dbs/config');

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

//加密信息
app.keys = ['keys', 'keyskeys'];
//链接redis
app.use(
  session({
    store: new Redis()
  })
);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(pv());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
//连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;

```

## Nuxt.js基础

### 安装

首先创建一个以 koa2 +  nuxt.js  为模板的项目。

```
vue init nuxt-community/koa-template nuxt-learn
```

![目录](https://gitee.com/l544402029/res/raw/master/小书匠/1585106731281.png)


search.vue

```vue
<template>
  <div class="page">Page is search</div>
</template>
<script>
export default {
  layout: 'search'
}
</script>
```

layout目录下就是模板， 我们可以使用模板， layout 就是设置你要使用哪个模板

```vue
<template>
  <div class="layout-search">
    <h1>search template</h1>
    <nuxt />
    <footer>search footer</footer>
  </div>
</template>
<style lang="css">
.layout-search {
  color: red;
}
</style>
```

nuxt 相当于是 vue 内的 router-view 。

default.vue是默认模板， 如果不设置 layout ， 那么使用的就是这个。 

输出结果：

![输出结果](https://gitee.com/l544402029/res/raw/master/小书匠/1585106901959.png)


以上只是静态的数据， 如果想要动态数据需要进行其他配置。


### 服务端渲染

文件目录：

![文件目录](https://gitee.com/l544402029/res/raw/master/小书匠/1585110840853.png)

search.vue

```vue
<template>
  <div class="page">
    <ul>
      <li v-for="(item, index) of list" :key="index" >
        {{item}}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  layout: 'search',
  data() {
    return {
      list: []
    }
  },
  async asyncData() {
    let {status, data: {list}} = await axios.get('http://localhost:3000/city/list')
    if (status === 200) {
      return { list }
    }
  }
}
</script>
```


city.js
```js
import Router from 'koa-router'

const router = new Router({
  prefix: '/city'
})

router.get('/list', async (ctx) => {
  ctx.body = {
    list: ['北京', '天津']
  }
})

export default router
```

这样我们就可以直接在网页源代码中看到获取的城市数据了。


## 项目实战

### 环境配置

首先全局安装`npx`

```
 npm i -g npx
```


创建项目：

```
npx create-nuxt-app mt-app
```


使用babel
```{2,4}
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server/index.js --exec babel-node",
    "generate": "nuxt generate"
  },
```

在执行命令后加 ` --exec babel-node`


安装插件
```
 npm i babel-preset-es2015
```

创建配置文件 `.babelrc`

```
{
  "presets": ["es2015"]
}
```

如果出现 babel-node 不是执行命令， 请执行以下命令：

```
 npm i babel-cli -S
```

#### 安装css预处理器loader

```
npm i sass-loader node-sass
```


## 数据库操作

### 导入数据库

```
mongoimport -d student -c areas areas.dat
```


遇到mongoimport命令无效

![解决方案1](https://gitee.com/l544402029/res/raw/master/小书匠/1585300869294.png)

环境变量有这个 系统会自动去这个路径下面找

![解决方案2](https://gitee.com/l544402029/res/raw/master/小书匠/1585301559136.png)


也可以参考[mongodb——设置为全局环境变量
](https://blog.csdn.net/YUHUI01/article/details/80862425)此博客设置全局变量。


