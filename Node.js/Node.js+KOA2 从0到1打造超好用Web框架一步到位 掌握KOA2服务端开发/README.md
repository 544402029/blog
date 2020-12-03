# Node.js+KOA2

## Koa中间件 

中间件其实就是个函数。

怎么让函数注册为中间件呢？

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583555248199.png)

一般我们都把中间件定义在app.use()内， 定义为一个箭头函数。

如何连续调用中间件函数?

```js
 app.use((ctx,next)=>{
 //ctx 表示上下文，next 表示下一个中间件函数，use方法中的这两个参数，都是node集成好的对象。
 //比如这里有两个中间件函数，但是node默认只调用第一个中间件函数，如何调用下一个中间件函数，就需要使用next函数
 next()
 })
 ```

## 洋葱模型

在使用中间件时， 请务必加上`async`和`awit`， 这样能保证洋葱模型的正常执行。

next()返回的一定是一个promise！！！

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1575775184653.png)

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1575800944203.png)

### async与await

`await`主要是用来求值的， 相当于一个求值关键字， 可以代替`then`直接将promise结果返回， 如下：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1575776232022.png)

当然后面也可以写表达式， 不仅仅是Promise

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1575776380816.png)

await能堆promise直接求值， 也能阻塞程序运行， 将原本异步的代码变成同步。等待异步代码返回后再继续执行。

但阻塞时也可以继续执行其它的代码， 并不影响其它代码进行执行。

#### async的意义
带有`async`声明的函数返回值会被强制包装成`promise`对象，

#### 为什么要在中间件前面加一个`async`关键字？

不仅仅是为了中间件强制要求要返回一个`promise`， 因为不使用`async`也可以返回`promise`，`koa`已经处理了，返回的就是`promise`。  主要是因为内部使用了`await`， 必须要使用`async`来声明函数， 否则就会报错了！

### 为什么一定要保证洋葱模型？

保证洋葱模型必须要在中间件函数前增加async， 并且next()前添加await。

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583588245836.png)

为什么我们非要保证洋葱模型呢？ 

中间件函数执行是有顺序的， 假如我需要在第一个中间件函数内写一段逻辑代码，它有一个前提条件就是必须等后面所有的中间件函数执行完。 比如用它来进行计时。计算所有中间件执行完所需时间。那么我怎么才能知道后面的中间件函数执行完呢？洋葱模型就能解决这个问题。它以next()为分界线，next()之前的代码说明后续的中间件还没有执行。但是next()之后的代码说明后面的中间件已经执行完了。

### 洋葱模型如何进行传值？

将需要传的值直接写在上下文环境的属性就就可以传递值了， 但是请务必保证是洋葱模型。

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1575800622318.png)


## 路由系统

我们需要使用一个插件来对路由进行管理`koa-router`。

### api版本

我们如果需要兼容老版本的api，一般会带有一个版本号， 有以下几种方式进行携带：

1. 路径
2. 查询参数
3. header

### 自动重启

自动重启需要安装nodemon插件

```
npm i nodemon -g
```

安装完成执行

```
nodemon app.js
```

### 断点调试

如果想要断点调试直接在vscode内按F5或者直接点击爬虫并运行代码即可。

但是想要自动重启程序并加入断点调试怎么做呢？

我们需要添加一个配置：


launch.json
```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "nodemon",
            "runtimeExecutable": "nodemon",
            "program": "${workspaceFolder}/app.js",
            "restart": true,
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "skipFiles": [
                "<node_internals>/**"
            ]
        },

        {
            "type": "node",
            "request": "launch",
            "name": "启动程序",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\app.js"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "当前文件",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${file}"
        }

    ]
}
```

"program": "${file}"  指的是启动当前文件  点开需要调试的文件并运行即可

如果想添加nodemon启动程序， 可以在右下角点击添加配置， 选择nodemon安装程序

### 自动加载路由

我们如果想要实现自动加载路由， 首先需要安装一个插件，requireDirectory

```
npm i require-directory
```

首先在初始化文件或者app.js内引入

init.js

```js
const requireDirectory = require('require-directory')

   const apiDirectory = `${process.cwd()}/app/api`
	requireDirectory(module,apiDirectory,{
		visit:whenLoadModule
	})

	function whenLoadModule(obj){
		if(obj instanceof Router){
			InitManager.app.use(obj.routes())
		}
	}
```

module, 模块， 固定参数
第二个参数为路由目录路径（如果是它的上级目录， 比如api，他下面有v1,v2,v3文件夹， 里面存放各个版本路由， 这时候v1,v2,v3的路由都能被加载）
第三个数为一个对象。 里面的visit可以接受一个回调函数，回调函数内对每个路由进行了判断， 只要是	Router路由就进行注册。

:::danger 注意
在路由文件内导出时要注意， 请以`module.exports = router`方式进行导出。 如果是其他方式， 判断的方式也要进行改变。
:::


### KOA为什么会返回Not Found？

一般来说是因为ctx.body没有返回任何值



### 怎么导入配置文件？

在根目录创建一个文件夹， 并创建一个js文件， 使用ES6的方法到处 `module.exports`

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1576986509619.png)


在初始化方法内写一个静态方法进行引入

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1576986763052.png)


使用

一般来说不用再用`else`，`throw`抛出错误就会停止运行

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1576987025531.png)


### 前缀

为路由添加一个前缀， 可以避免写相同的路径

user.js
```js
const router = new Router({
    prefix:'/v1/user'
})
```


## 参数校验

### 获取参数

 目的：拒绝非法参数，向客户端返回明确提示信息

参数的方式一般有4种

-  URL 中冒号 + 参数名 获取用ctx.params
-  URL 后问号  获取用ctx.request.query
-  header 获取用ctx.request.header
-  body  获取用ctx.request.body

获取body要引入插件

app.js
```js
const parser = require('koa-bodyparser')
app.use(parser())
```

## 异常处理

### 全局异常处理

使用中间件来捕获异常错误


exception.js

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583638465214.png)

未知异常：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583639083327.png)

在app.js中引入

```js
const catchError = require('./middlewares/exception')
app.use(catchError)
```



### 定义异常基类

```js
class HttpException extends Error{
    
    constructor(msg='服务器异常',errorCode=10000,code=400){
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

```

使用：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583638266234.png)


## Lin-Validator使用指南

依赖于第三方库lodash、validator以及jsonwebtoken
```
npm install lodash validator jsonwebtoken -S

```
也可以直接 npm i lin-mizar，用lin-cms的核心库。 功能更多。

可参考：[ 校验器
](http://doc.cms.7yue.pro/lin/server/koa/validator.html#%E7%B1%BB%E6%A0%A1%E9%AA%8C)


## 数据库

### 关系型数据库与非关系型数据库


![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1577109327824.png)


### 新建连接

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1577456314498.png)


#### 修改连接密码

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583651146766.png)

如果不行请把root的都修改一下

### 新建数据库

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583651319475.png)

###  数据库操作插件


首先设置配置文件：

config.js
```js{4-10}
module.exports = {
    //prod
    environment:'dev',
    database:{
        dbName:'island',//数据库名
        host:'localhost',//数据库IP地址
        port:'3306',//端口
        user:'root',//用户名
        password:'888888'//密码
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'wx',
        appSecret:'c',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
```


db.js
```js
const Sequelize = require('sequelize')
//引入配置文件
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

//@dbName 数据库名
//@user 用户名
//@password 密码
const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',//操作数据库类型  mysql需要安装mysql2
    host,
    port,
    logging:true,//输出操作数据库记录
    timezone:'+08:00',//以北京时间来记录操作时间
    define:{
        timestamps:true,//创建createdAt updatedAt字段,false不创建
        paranoid:true,//创建deletedAt字段,fase不创建
        createdAt:'created_at',//修改createdAt名称,更符合数据库字段规范
        updatedAt:'updated_at',//修改updatedAt名称
        deletedAt:'deleted_at',//修改deletedAt名称
        underscored:true//驼峰转下划线
    }
})

sequelize.sync({
    force:false//上线一定一定不要设置为true， true会自动删除数据库后再新建
})

module.exports = {
    sequelize
}
```





#### 创建用户模型


user.js
```js
const bcrypt = require('bcryptjs')

const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')

class User extends Model{

}

User.init({
    //主键不能为空， 不能重复
    id:{
        type:Sequelize.INTEGER,//内置类型，对应mysql的一种类型
        primaryKey:true,//设置数据库主键
        autoIncrement:true//自动增长id编号
    },
    nickname:Sequelize.STRING,//内置类型，对应mysql的一种类型
    email:{
        type:Sequelize.STRING(128),//最大64位
        unique:true//保持唯一
    },
    password:{
        type:Sequelize.STRING,//内置类型，对应mysql的一种类型
        set(val){
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
        }
    },
    openid:{
        type:Sequelize.STRING(64),//限制长度 最大64位
        unique:true//保持唯一
    }
},{
    sequelize,
    tableName:'user'//表格名字
})

module.exports = {
    User
}
```

### Sequelize新增数据

user.js

```js{17}
const bcrypt = require('bcryptjs')

const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')

class User extends Model{
    static async verifyEmailPassword(email,plainPassword){
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            throw new global.errs.AuthFailed('账号不存在')
        }
        const correct = bcrypt.compareSync(
            plainPassword,user.password
        )
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user
    }

    static async registerByOpenid(openid){
        return await User.create({
            openid
        })
    }
}

User.init({
    //主键不能为空， 不能重复
    id:{
        type:Sequelize.INTEGER,//内置类型，对应mysql的一种类型
        primaryKey:true,//设置数据库主键
        autoIncrement:true//自动增长id编号
    },
    nickname:Sequelize.STRING,//内置类型，对应mysql的一种类型
    email:{
        type:Sequelize.STRING(128),//最大64位
        unique:true//保持唯一
    },
    password:{
        type:Sequelize.STRING,//内置类型，对应mysql的一种类型
        set(val){//盐加密
            const salt = bcrypt.genSaltSync(10)//加密成本,一般设置为10
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
        }
    },
    openid:{
        type:Sequelize.STRING(64),//限制长度 最大64位
        unique:true//保持唯一
    }
},{
    sequelize,
    tableName:'user'//表格名字
})

module.exports = {
    User
}
module.exports = router
```

## 令牌与权限

### token令牌

首先要引入插件jsonwebtoken

util.js

```js{42-56,1}
const jwt = require('jsonwebtoken')
/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

const generateToken = function(uid, scope){
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    //jwt.sign生成令牌
    //第一个参数 {} payload 可以放入自定义信息
    //第二个参数 secretKey 私有钥匙  自己定义
    //第三个参数  可选配置项
    const token = jwt.sign({
        uid,
        scope
    },secretKey,{
        expiresIn
    })
    return token
}



module.exports = {
    findMembers,
    generateToken,
}



// const generateToken = function (uid, scope) {
//     const secretKey = global.config.security.secretKey
//     const expiresIn = global.config.security.expiresIn
//     const token = jwt.sign({
//         uid,
//         scope
//     }, secretKey, {
//         expiresIn: expiresIn
//     })
//     return token
// }
```


config.js

```js{11-14}
module.exports = {
    //prod
    environment:'dev',
    database:{
        dbName:'island',//数据库名
        host:'localhost',//数据库IP地址
        port:'3306',//端口
        user:'root',//用户名
        password:'888888'//密码
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'wx8476e68f02a076e0',
        appSecret:'c45121c9efc0454e20aa930238b32cf1',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
```

api>v1>token.js

```js{56-60,2-4,26-45}
const Router = require('koa-router')
const {
    NotEmptyValidator,
    TokenValidator
} = require('../../validators/validator')
const {
    LoginType
} = require('../../lib/enum')
const {
    User
} = require('../../models/user')
const {
    generateToken
} = require('../../../core/util')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    WXManager
} = require('../../services/wx')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'),
                v.get('body.secret'))
            break
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break
        case LoginType.ADMIN_EMAIL:
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

router.post('/verify',async(ctx)=>{
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        result
    }
})


async function emailLogin(account, secret) {
    const user = await
    User.verifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router
```

### token验证和权限分级

安装basic-auth插件

auth.js
```js
const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')

class Auth {
    constructor(level){ //权限分级
        this.level = level || 1
        Auth.USER  = 8//普通用户
        Auth.ADMIN = 16//管理员
        Auth.SUPER_ADMIN = 32//超级管理员
    }
    get m (){
        return async(ctx,next)=>{
            const userToken = basicAuth(ctx.req)//获取token
            let errMsg = 'token不合法';
            if (!userToken || !userToken.name){
                throw new global.errs.Forbbiden(errMsg)
            }
            try {
                //验证JWT令牌
               var decode = jwt.verity(userToken.name,global.config.security.secretKey)
            } catch (error) {
                //判断是哪种类型的token失效
                //已过期
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期'
                }
                //不合法
                throw new global.errs.Forbbiden(errMsg)
            }

            if(decode.scope < this.level){
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }

            ctx.auth = {
                uid:decode.uid,
                scope:decode.scope
            }

            await next()
        }
    }

    static verifyToken(token){
        try {
            jwt.verify(token,global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}
```

classic.js

使用token验证

```js{6,9,10}
const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/classic'
})

const {Auth} = require('../../../middlewares/auth')

const {PositiveIntegerValidator} = require('../../validators/validator')
//ew Auth().m不需要加括号，必须放在async前面 ，传入数字9代表当前路由权限级别
router.get('/latest',new Auth(9).m, async (ctx,next)=>{
    ctx.body = ctx.auth.uid
})


module.exports = router
```

token.js

权限分级
```js{59，15-17}
const Router = require('koa-router')
const {
    NotEmptyValidator,
    TokenValidator
} = require('../../validators/validator')
const {
    LoginType
} = require('../../lib/enum')
const {
    User
} = require('../../models/user')
const {
    generateToken
} = require('../../../core/util')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    WXManager
} = require('../../services/wx')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'),
                v.get('body.secret'))
            break
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break
        case LoginType.ADMIN_EMAIL:
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

router.post('/verify',async(ctx)=>{
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        result
    }
})


async function emailLogin(account, secret) {
    const user = await
    User.verifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router
```




