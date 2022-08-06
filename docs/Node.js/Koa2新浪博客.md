# Koa2

## 创建项目：

-e 指的是使用ejs模板

```
koa2 -e 项目名称
```


## 数据库操作


### 查询表

`*`号代表查询所有列

`select * from users;`


#### 查询username，nickname

`select username,nickname from users;`

#### id倒序查询

`select * from blogs order by id desc;`

#### 查询总共几条数据

`select count(*) as `count` from blogs;`

建议使用id查询，查询所有列性能稍差。
`select count(id) as `count` from blogs;`

#### 分页查询
从游标2查询2条数据
`select * from blogs order by id desc limit 2 offset 2;`


### 注释

`-- `为注释

`-- select * from users;`

### 插入数据

需要注意， `password`为关键字， 需要使用``进行包裹

`insert into users(username,`password`,nickname)values('lisi','123','李四');`

### 更新数据

更新id为1的数据， 不加将会更新所有数据。

`update blogs set content='内容1内容1'where id=4;`

### 删除数据

同更新数据一样， 不加where条件将删除全部。

`delete from users where id=3;`


### 外键

为了防止数据库插入无效数据， 如博客表， 如果不存在userid=9的用户， 然而却在发表博客时传入了userid=9的用户， 这时会在数据库层面进行报错。

如果此时删除userid=1的用户，也会连带把blogs表中所有关于userid=1发表的博客删除。

具体操作：


![image-20220805090750267](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090750267.png)

在blogs表中将userid与user表中id进行了关联

![image-20220805090803593](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805090803593.png)

### 连表查询

不一定有外键， 但一般会有外键约束。
`select * from blogs inner join users on users.id=blogs.userid;`


#### 查询特定字段
查询了blogs所有列， users的username和nickname
`select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid;`

#### 条件查询

查询username=lisi的数据
`select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid where users.username='lisi';`


## sequelize


### 安装

` npm i mysql2 sequelize -d`

### 连接

seq.js
```js
const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql'
}

// 线上环境，使用连接池
// conf.pool = {
//     max: 5, //连接池中最大的连接数量
//     min: 0, //最小
//     idle: 10000 //如果一个连接池 10s 之内没有使用，则释放
// }

const seq = new Sequelize('koa2_weibo_db', 'root', '666666', conf)

module.exports = seq
```

### 创建模型

module.js
```js
const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型。数据表的名字是 users
const User = seq.define('user', {
    // id会自动创建，并设为主键，自增
    userName: {
        type: Sequelize.STRING,//varchar(255)
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '昵称'
    }
})

// 创建blog模型
const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// 外键关联(先查询博客，然后查询该博客相关的用户信息)
Blog.belongsTo(User, {
    // 创建外键 Blog.userId -> User.id
    foreignKey: 'userId'
})

// 外键关联第2种方式(先查询用户信息，然后查询到用户发布的博客)
User.hasMany(Blog, {
    // 创建外键 Blog.userId -> User.id
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}
```



### 同步
sync.js
```js
const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok');
}).catch(() => {
    console.log('auth err');
})

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok');
    process.exit()
})
```

### 增加数据

create.js
```js
const { Blog, User } = require('./model')

!(async function () {
    // 创建用户
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三'
    })
    // insert into users (...) values (...)
    console.log('zhangsan', zhangsan.dataValues)
})()
```

### 查询数据
select.js

```js
const { Blog, User } = require('./model')

!(async function () {
    // const zhangsan = await User.findOne({
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log('zhangsan', zhangsan.dataValues);


    // 查询特定的列
    // const zhangsanName = await User.findOne({
    //     attributes: ['userName', 'nickName'],
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log('zhangsanName', zhangsanName.dataValues);


    // 查询一个列表
    // const zhangsanBlogList = await Blog.findAll({
    //     where: {
    //         userId: 1
    //     },
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })

    // console.log('zhangsanBlogList', zhangsanBlogList.map(blog => blog.dataValues));


    // 分页
    // const blogPageList = await Blog.findAll({
    //     limit: 2,//限制本次查询2条
    //     offset: 2,//跳过多少条
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log('blogPageList', blogPageList.map(blog => blog.dataValues));

    // 查询总数 （一般开发用该Api）
    // const blogListAndCount = await Blog.findAndCountAll({
    //     limit: 2,//限制本次查询2条
    //     offset: 2,//跳过多少条
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log('blogListAndCount', blogListAndCount.count, blogListAndCount.rows.map(blog => blog.dataValues));


    // 连表查询
    // const blogListWithUser = await Blog.findAndCountAll({
    //     order: [
    //         ['id', 'desc']
    //     ],
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['userName', 'nickName'],
    //             where: {
    //                 userName: 'zhangsan'
    //             }
    //         }
    //     ]
    // })
    // console.log(
    //     'blogListWithUser',
    //     blogListWithUser.count,
    //     blogListWithUser.rows.map(blog => {
    //         const blogVal = blog.dataValues
    //         blogVal.user = blogVal.user.dataValues
    //         return blogVal
    //     })
    // );


    // 连表查询2
    const userListWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [
            {
                model: Blog
            }
        ]
    })

    console.log(
        'userListWithBlog',
        userListWithBlog.count,
        userListWithBlog.rows.map(user => {
            const userVal = user.dataValues
            userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
            return userVal
        })
    );

})()
```

### 修改数据

update.js
```js
const { User } = require('./model');

!(async function () {
    const updateRes = await User.update({
        nickName: '张三法外狂徒'
    }, {
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('updateRes...', updateRes);
})()
```

### 删除数据

delete.js

```js
const { User, Blog } = require('./model');

!(async function () {
    // 删除一条博客
    // const delRes = await Blog.destroy({
    //     where: {
    //         id: '5'
    //     }
    // })
    // console.log('delRes...', delRes);

    // 删除一个用户
    const delUserRes = await User.destroy({
        where: {
            id: 1
        }
    })
    console.log('delUserRes', delUserRes);
})()
```


## jest单元测试

### 安装

`npm i jest -D`

### 执行命令

--runInBand : 按顺序执行
--forceExit ： 测试完退出
--colors ： 按颜色区分输出，可视化较好

`"test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"`

### 使用

在根目录创建test文件夹

demo.test.js

```js
function sum(a, b) {
    return a + b
}

test('10+20 应该等于30', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})
```
