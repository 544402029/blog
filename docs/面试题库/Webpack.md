---
prev: Vue3
next: Node.js
---

## Webpack

```
本篇博客由慕课网视频[从基础到实战手把手带你掌握新版Webpack4.0](https://coding.imooc.com/class/316.html)阅读整理而来，观看视频请支持正版。
```

```
本篇博客 Webpack 版本是4.0+，请确保你安装了Node.js最新版本。
```



## Webpack 是什么？



##### 核心定义

webpack 的核心定义是一个模块打包工具。



### 官方文档查阅

[https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)

GUIDES: 解决某一个方向问题答案，如代码分割，TypeScript

CONCEPTS： 一些核心的概念

CONFIGURATION： 某个配置项

API： 写一些 loader，plugin 插件

LOADERS： 查看 loader 的作用，配置。（如果找不到到插件的 githup 上找）

PLUGINS： 插件的作用，配置。（如果找不到到插件的 githup 上找）



### 搭建 Webpack 环境

首先要安装 node.js 以及 npm， 并保证是最新版本。（最新版本会加快打包构建速度）



#### 安装指令

全局安装

```shell
npm install webpack webpack-cli -g
```

项目安装

```shell
npm install webpack webpack-cli -D
```

带有版本的安装

```shell
npm install webpack@4.16.5 webpack-cli -D
```



#### 卸载指令

```shell
npm uninstall webpack webpack-cli -g
```



#### 查看当前 Webpack 版本

全局安装查看指令：

```shell
webpack -v
```

项目内安装查看指令：

```shell
npx webpack  -v
```



#### 查看历史 Webpack 版本

```shell
npm info webpack
```



## 使用 Webpack 配置文件



### 创建配置文件

在根目录创建`webpack.config.js`

```javascript
const path = require("path"); //引入node核心模块

module.exports = {
  //mode: 'production',//默认模式,会压缩代码，不写即是默认，不写会有提示
  mode: "development", //开发模式， 不会压缩代码
  entry: {
    main: "./src/index.js",
  }, //从哪一个文件开始打包
  output: {
    //输出到哪里
    filename: "bundle.js", //输出的文件名称
    path: path.resolve(__dirname, "bundle"), //输出到哪一个文件夹下, path后面跟绝对路径
    //__dirname指的是webpack.config.js文件当前所在的路径
  },
};
```



### 修改默认配置文件名字

把默认的`webpack.config.js`， 修改为`webpackconfig.js`

```shell
npx webpack --config webpackconfig.js
```

> npx 会在目录下的 node_modules 下面找 webpack，没有就安装一个。npm 则先去全局，然后再去当前目录下的 node_modules 找 webpack，没有就不找了



### webpack 执行命令

- 全局(global)

```shell
webpack index.js
```

- 局部（local）

```shell
npx webpack index.js
```

- 修改后脚本执行命令（`npm scripts`）

```shell
npm run bundle
```

package.json 文件

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "bundle": "webpack"
  },
  "author": "LiuJunFeng",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10"
  }
}
```



## loader

loader 是一个打包方案，它知道对于某一个特定的文件，webpack 该如何进行打包。本身 webpack 是不知道对于一些文件（jpg，txt，excel）该如何处理的，但是 loader 知道。 所以 webpack 去求助 loader 就可以啦。



### 打包静态资源（图片篇）

#### 安装插件

打包图片资源可以选用两个`loader`， 一个是`file-loader`，一个是`url-loader`。

```shell
npm i file-loader -D
```

```shell
npm i url-loader -D
```

url-loader 更加友好， 它可以通过图片大小来判断是使用 base64 格式图片还是直接打包成一个图片资源文件。

#### 配置文件

webpack.config.js

```javascript
module: {
  rules: [
    {
      test: /\.(jpg|png|gif)$/,
      use: {
        // loader: 'file-loader',// 遇到jpg格式不知道怎么打包就去求助file-loader插件
        loader: "url-loader", //图片转化为base64， 不是单独生成一个文件。
        options: {
          // placeholder 占位符
          name: "[name]_[hash].[ext]", //name 打包文件名字   name/原有文件名字  hash/本次打包哈希值  ext/原有名字后缀
          outputPath: "images/", //把图片文件打包到images目录下
          limit: 204800, //如果文件超过204800字节，就会像file-loader打包到dist目录下生成一个文件，
          //如果文件小于204800字节，那就回变成base64字符串， 放到js内
        },
      },
    },
  ];
}
```



#### 原理

File-loader 底层处理逻辑，先将文件转移到打包目录下，再将 dist 中的文件路径返回给 index.js。

任何的静态文件都可以使用`file-loader`插件， 只要你希望把静态文件移动到打包目录下并且获取到此文件地址。



### 打包静态资源（样式篇）



#### 安装插件

##### css 文件打包

打包`css`文件需要使用两个`loader`，`style-loader`和`css-loader`。

```shell
npm i style-loader css-loader -D
```

`css-loader`帮我们分析出几个 css 文件的引入关系， 最终将这些 css 文件合并成一段 css。

`style-loader` 再得到`css-loader`生成的内容后， 会把这段代码挂载到 html 的 head 部分。

在打包 css 文件时， 一定要`css-loader`和`style-loader`配合使用。

##### sass 文件打包

```shell
npm install sass-loader node-sass --save-dev
```



##### 自动加厂商前缀

```shell
npm i -D postcss-loader
```

```shell
npm i autoprefixer -D
```

loader 打包的执行顺序是从下到上（从右到左）来执行， 如下：sass 文件会先执行`sass-loader`， 处理完后再执行`style-loader`挂载到 html 的 head 部分。



#### 配置

webpack.config.js

在 module 对象内的 rule 数组内添加以下代码：

css 样式文件配置

```javascript
{
            test: /\.scss$/,
            use:[
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                        importLoaders: 2,//在scss又引入另外一个scss时，有可能直接走css-loader，不走sass-loader和postcss-loader，加上此配置项可以让它继续走下面两个loader
                        //modules: true//开启css模块化打包  解决全局样式冲突
                    }
                },
                'sass-loader',//sass文件编译
                'postcss-loader'//加厂商前缀
            ]
        }]
```

字体文件配置

```javascript
{
            test: /\.(eot|ttf|woff|woff2|svg)$/,
            use: {
                loader: 'file-loader',
                options:{
                    outputPath: 'fonts/',
                }

            }
        }
```

如果需要加厂商前缀， 需要在根目录在创建一个文件， 取名为`postcss.config.js`, 以下为具体配置：

```javascript
module.exports = {
  plugins: [require("autoprefixer")],
};
```

默认打包支持的浏览器，不需要厂商前缀，可以把浏览器条件放宽：

可以在根目录`package.json`文件中添加浏览器条件：

```javascript
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```



## 使用 plugins

plugin 可以在 webpack 运行到某个时刻的时候， 帮你做一些事情。 很像 vue 中的生命周期函数。



### 生成 html 文件



#### 安装

```shell
npm i -D html-webpack-plugin
```

html-webpack-plugin 会在打包结束的时刻， 自动生成一个 html 文件， 并把打包生成的 js 自动注入到这个 html 文件中。



#### 配置

首先需要引入该插件， 然后再`module`对象内写入`plugins`属性名， 属性是一个数组，数组内实例化该插件。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins:[new HtmlWebpackPlugin()],
```



### 打包时清空 dist 目录



#### 安装

```shell
npm i clean-webpack-plugin -D
```

`clean-webpack-plugin` 插件会在打包流程执行前清空 dist 目录

<a name="224e2ccd-2"></a>

#### 配置

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
```

```javascript
    plugins:[new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),new CleanWebpackPlugin()],
```



## 基础配置



### Entry

```javascript
    entry: {
       main: './src/index.js',
       sub:'./src/index.js'
    },//从哪一个文件开始打包
```

如果一个文件打包两次， 可以用以上方式配置， 一个文件会成为 main.js， 一个会成为 sub.js。



### Output

```javascript
    output: {//输出到哪里
        publicPath:'http://cdn.com.cn',//文件使用cdn域名
        filename: '[name].js',//输出的文件名称  name对应的是entry里的key值
		chunkFilename:'[name].chunk.js',//间接引入的文件会加上.chunk
        path: path.resolve(__dirname,'dist') //输出到哪一个文件夹下, path后面跟绝对路径
        //__dirname指的是webpack.config.js文件当前所在的路径
    }
```



## SourceMap

可以使用这个配置查看源代码那里有错误， 而不是打包后的文件错误。

比如你的 js 文件里面写的有问题，比如 dist 目录下的 main.js 文件第 96 行出错。SourceMap 他是一个映射关系， 他知道 dist 目录下的 main.js 文件 96 行实际上对应的是 src 目录下 index.js 文件中的第一行。他就知道是 index.js 第一行出错了。



#### 配置

```javascript
module.exports = {
    //mode: 'production',//默认模式,会压缩代码，不写即是默认，不写会有提示
    mode: 'development',//开发模式， 不会压缩代码
    devtool:'source-map',
    entry: {
       main: './src/index.js'
    },//从哪一个文件开始打包
```

`devtool:'inline-source-map'`

source-map 会在 dist 目录下生成一个 main.js.map，   而使用 inline-source-map 会直接通过 data-url 的方式直接写在 main.js 内的底部。

`devtool:'cheap-inline-source-map'`

当我们遇到代码量很大的时候， 如果我们的代码出了错误， 加上 cheap 它就会只告诉我们是哪一行出了错误， 而不会告诉我们第几列。   打包会更加节省性能。

`devtool:'cheap-module-inline-source-map'`

source-map 只会告诉我们业务相关的代码是否有错， 而不会告诉我们引入第三方模块代码是否有错误， 比如 loader 内的错误。如果你想让它也管第三方模块的错误可以加上 module。

`devtool:'eval',`

使用`eval`配置执行效率最快， 性能最好的打包方式。它使用了`eval`的语法执行源代码。但是如果比较复杂的代码情况下， 它提示出来的内容可能不太准确。



##### 最佳实践

如果你在开发环境中， 使用 source-map 建议使用`devtool:'cheap-module-inline-eval-source-map'`, 它提示出来的错误是比较全的， 同时它的打包速度也是比较快的。

如果在线上环境中， 没必要使用 source-map 作为映射， 直接删除此配置即可。

当然如果你也需要看错误提示， 可以使用`devtool:'cheap-module-source-map'。`它的提示会更好一些。



## WebpackDevServer

修改源码自动就会进行打包。提升开发效率。

总共有以下两种方式：



### webpack --watch

监听文件改动实时进行打包

package.json

```json
  "scripts": {
    "watch": "webpack --watch"
  },
```



### devServer

自动打包并刷新浏览器，还可以模拟服务器上的特性。 vue 以及 react 脚手架使用的都是此配置。推荐使用， 这个也是业界最经常使用的方案。



#### 安装插件

```
npm i webpack-dev-server -D
```



#### 配置

webpack.config.js

```javascript
    devServer: {
        contentBase: './dist',//服务器起在哪一个文件夹下
        open: true,//自动打开浏览器
        port: 8080,//使用哪个端口号
        proxy: {
            './api':'http://locallhost:3000'
        }//如果访问api这个地址，也就是locallhost:8000/api, 它会帮你转发到http://locallhost:3000这个地址上
    },
```

package.json

```json
  "scripts": {
    "watch": "webpack --watch",
    "start": "webpack-dev-server"
  },
```



## 热模块更新（HMR）

HMR 是 Hot Module Replacement 的缩写。

它可以只更新你改动的文件， 不会直接刷新浏览器。

优点：

1. 非常方便调试样式。



#### 配置

webpack.config.js

```javascript
const webpack = require("webpack");
```

```javascript
    devServer: {
        contentBase: './dist',//服务器起在哪一个文件夹下
        open: true,//自动打开浏览器
        port: 8080,//使用哪个端口号
        // proxy: {
        //     './api':'http://locallhost:3000'
        // }//如果访问api这个地址，也就是locallhost:8000/api, 它会帮你转发到http://locallhost:3000这个地址上
        hot:true,//开启热更新
        hotOnly:true//即便热更新没有生效，也不刷新浏览器
    },
```

```javascript
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
```

index.js 内

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/peizhiwenj.png)

如果开启热更新， number.js 文件只要发生变化就会重新执行一下



## 使用 Babel 处理 ES6 语法

### 业务代码

#### 安装插件

```shell
npm i -D babel-loader @babel/core

npm i @babel/preset-env -D

npm i --save @babel/polyfill
```

babel-loader 插件只是作为 babel 与 webpack 沟通的桥梁， 如果想要翻译 ES6 语法， 需要安装@babel/preset-env 插件。

babel/polyfill 用来补充 babel/preset-env 的， 有的语法 babel/preset-env 不能翻译（如 Promise）， 这时候可以使用 babel/polyfill。

#### 配置

在业务代码 js 的顶部引入 babel/polyfill 。如果使用了`useBuiltIns:"usage"`，也可以不引入此插件。

```javascript
import "@babel/polyfill";
```

webpack.config.js

```javascript
      {
        test: /\.js$/,//js文件由ES6转成ES5
        exclude: /node_modules/,//不管这个文件夹下的js文件
        loader: "babel-loader",
        options: {
            presets: [["@babel/preset-env",{
              targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1"
              },//浏览器版本，如chrome版本大于67将不会翻译成ES5
              useBuiltIns:"usage"//js里用哪个翻译那个，不用的语法特性不会翻译, 减少文件体积
            }]]
        }
      }
```

### 打包组件库

如果开发组件库或者第三方模块的时候， 不要使用@babel/polyfill 插件。因为它在注入 promise 或者 map 方法的时候， 它会通过全局变量的方式注入， 会污染到全局环境。

#### 安装插件

我们可以换一种方式：

首先把业务代码中引入的@babel/polyfill 注释掉， 然后按照 @babel/plugin-transform-runtime 和@babel/runtime 插件。

```shell
 npm i -D @babel/plugin-transform-runtime
 npm i --save @babel/runtime
  npm i --save @babel/runtime-corejs2
```

#### 配置

webpack.config.js

```javascript
      {
        test: /\.js$/,//js文件由ES6转成ES5
        exclude: /node_modules/,//不管这个文件夹下的js文件
        loader: "babel-loader",
        options: {
            plugins: [["@babel/plugin-transform-runtime",{
              "corejs":2,
              "helpers":true,
              "regenerator":true,
              "useESModules":false
            }]]
        }
      }
```

如果 plugins 内 corejs 配置了 2， 那么就要安装@babel/runtime-corejs2 这个插件了。

当然， 在我们配置过多的 babel 配置时， 也可以在根目录创建一个.babelrc 文件。用来放置相关配置， 如下：

webpack.config.js

```javascript
      {
        test: /\.js$/,//js文件由ES6转成ES5
        exclude: /node_modules/,//不管这个文件夹下的js文件
		//include: path.resolve(__dirname,'../src')//只对src目录的js文件打包
        loader: "babel-loader"
      }
```

babelrc

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```



## 配置 React 代码打包



#### 安装插件

```shell
 npm i react react-dom --save
 npm i --save-dev @babel/preset-react
```



#### 配置

babelrl

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ]
}
```

```
这个执行顺序是按照从下到上，从右到左来执行的。顺序一定不要写反了。它是先执行react转成js， 然后执行babel转成ES5的。
```



## Tree Shaking

```
Tree Shaking支持ES6的Module引入方式，它只支持静态引入的方式， 动态引入的方式它不支持。
```

Tree Shaking 中文翻译是摇树的意思， 大意就是把无效的代码摇晃掉， 只留下有用的代码。<br />比如你引入了一个模块中的方法， 它就只打包你引入的方法， 不需要的方法不会进行打包了。

在开发环境中， 是没有 Tree Shaking 功能的， 如果需要请添加以下配置：

webpack.config.js

在线上环境中可以不配置这个

```javascript
  optimization:{
    usedExports:true
  },
  output: {
    //输出到哪里
    filename: "[name].js", //输出的文件名称  name对应的是entry里的key值
    path: path.resolve(__dirname, "dist") //输出到哪一个文件夹下, path后面跟绝对路径
    //__dirname指的是webpack.config.js文件当前所在的路径
  }
```

package.json 文件内

```javascript
  "name": "webpack-demo",
  "sideEffects": ["@babel/polly-fill"],
  "version": "1.0.0",
  "description": "",
  "private": true,
```

配置`"sideEffects": ["@babel/polly-fill"]`,后， Tree Shaking 不会对这个插件有任何作用了。

当然没有引用`@babel/polly-fill`也可以设置为`false`。

如果你的业务 js 代码引入了 js，如下：

![image-20220808175242375](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808175242375.png)

你也需要在"sideEffects"进行配置， 一般我们会对 css 文件进行以下配置：

```javascript
  "sideEffects": [
    "*.css"
  ]
```

只要遇到任何的 css 文件，那么也不要去使用 Tree Shaking。



## Develoment 和 Production 模式的区分打包

在开发环境可以方便我们开发， 有热模块更新 DevServer 等配置可以更加方便我们的调试代码。

而线上环境会压缩代码， 对`source-map`精简（没有报错信息或者只显示行错误）。



### 开发环境

首先我们需要把 webpack.config.js 修改为 webpack.dev.js， 表示开发环境。

```javascript
const path = require("path"); //引入node核心模块
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  //mode: 'production',//默认模式,会压缩代码，不写即是默认，不写会有提示
  mode: "development", //开发模式， 不会压缩代码
  devtool: "cheap-module-eval-source-map",
  entry: {
    main: "./src/index.js",
  }, //从哪一个文件开始打包
  devServer: {
    contentBase: "./dist", //服务器起在哪一个文件夹下
    open: true, //自动打开浏览器
    port: 8080, //使用哪个端口号
    // proxy: {
    //     './api':'http://locallhost:3000'
    // }//如果访问api这个地址，也就是locallhost:8000/api, 它会帮你转发到http://locallhost:3000这个地址上
    hot: true, //开启热更新
    hotOnly: true, //即便热更新没有生效，也不刷新浏览器
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          // loader: 'file-loader',// 遇到jpg格式不知道怎么打包就去求助file-loader插件
          loader: "url-loader", //图片转化为base64， 不是单独生成一个文件。
          options: {
            // placeholder 占位符
            name: "[name]_[hash].[ext]", //name 打包文件名字   name/原有文件名字  hash/本次打包哈希值  ext/原有名字后缀
            outputPath: "images/", //把图片文件打包到images目录下
            limit: 204800, //如果文件超过204800字节，就会像file-loader打包到dist目录下生成一个文件，
            //如果文件小于204800字节，那就回变成base64字符串， 放到js内
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, //在scss又引入另外一个scss时，有可能直接走css-loader，不走sass-loader和postcss-loader，加上此配置项可以让它继续走下面两个loader
              //modules: true//开启css模块化打包  解决全局样式冲突
            },
          },
          "sass-loader", //sass文件编译
          "postcss-loader", //加厂商前缀
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", //加厂商前缀
        ],
      },
      {
        test: /\.js$/, //js文件由ES6转成ES5
        exclude: /node_modules/, //不管这个文件夹下的js文件
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    usedExports: true,
  },
  output: {
    //输出到哪里
    filename: "[name].js", //输出的文件名称  name对应的是entry里的key值
    path: path.resolve(__dirname, "dist"), //输出到哪一个文件夹下, path后面跟绝对路径
    //__dirname指的是webpack.config.js文件当前所在的路径
  },
};
```



#### 启动命令

package.json

```json
  "scripts": {
    "dev": "webpack-dev-server --config wepack.dev.js"
  },
```

在开发环境内也可以把 hotOnly: true 去掉， 使浏览器能自动刷新。



### 线上环境

然后创建 webpack.prod.js 文件， 表示线上环境。

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 204800,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
```



#### 启动命令

package.json

```json
  "scripts": {
    "dev": "webpack-dev-server --config wepack.dev.js",
    "build":"webpack --config webpack.prod.js"
  },
```

打包完成后把 dist 文件夹丢给后端使用即可。



### 公共文件

我们可以发现在 webpack.dev.js 和 webpack.prod.js 中有很多相同代码， 这时候我们可以把相同的代码抽离出来放到 webpack.common.js 中。

我们需要引入一个插件合并 common 文件与 prod 或者 dev 文件

```shell
npm i webpack-merge -D
```

创建 webpack.common.js, 相同代码放入此文件

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 204800,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

webpack.dev.js

```javascript
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const devConfig = (module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    usedExports: true,
  },
});

module.exports = merge(commonConfig, devConfig);
```

webpack.prod.js

```javascript
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
};

module.exports = merge(commonConfig, prodConfig);
```

当然， 如果我们这几个配置文件放在了根目录的 build 文件夹内， 你需要在 package.json 内对指令进行更改，把目录需要更改到 build 目录下

package.json

```javascript
  "scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  },
```

当然， 输出的目录也需要修改一下

webpack.common.js

```javascript
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist")
  }
```



### Webpack 和 Code Splitting

Code Splitting 指的是代码分割。如果我们不使用代码分割，打包出来的文件会很大， 加载时间会很长。还有一种情况， 我们引入一个 lodash 库， 这部分代码不变， 仅仅是业务代码改变了， 如果我们再次打包就会全部又加载一遍， 影响了加载的速度。 我们希望的是 lodash 库不需要再次加载。

我们先安装一个插件 lodash

```shell
npm i lodash --save
```

src 目录创建一个 lodash.js 文件

```javascript
import _ from "lodash";
window._ = _;
```

webpack.common.js

```javascript
  entry: {
    lodash: "./src/lodash.js",
    main: "./src/index.js"
  },
```



### 自动进行代码分割

#### 同步代码方式

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/tonghbudaimafasngshi.png)

以上为同步引入方式，可按照一下代码进行配置：

webpack.common.js

```javascript
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

这段代码能帮你做代码分割。

#### 异步代码

异步引入指的是以下情况：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yibudairu.png)



##### 安装插件

```shell
npm i babel-plugin-dynamic-import-webpack
```

.babelrc

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": ["dynamic-import-webpack"]
}
```



#### 小结

代码分割，和 webpack 无关

webpack 中实现代码分割，两种方式

1. 同步代码： 只需要在 webpack.common.js 中做 optimization 的配置即可
1. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中



## SplitChunksPlugin 配置参数详解

### 魔法注释

![image-20220808175400125](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808175400125.png)

需要在 package.json 去掉 babel-plugin-dynamic-import-webpack 插件，因为它是一个第三方的插件，不支持魔法注释， 我们需要一个官方的插件来进行魔法注释。

```shell
npm i -D @babel/plugin-syntax-dynamic-import
```

.babelrc

plugins 修改为 babel/plugin-syntax-dynamic-import

```javascript
 "plugins": ["@babel/plugin-syntax-dynamic-import"]
```

webpack.common.js

如果 optimization 不写任何内容， 只是一个空对象， 会按照以下默认配置打包：

```javascript
 optimization: {
    splitChunks: {
      chunks: 'aysnc',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name:true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: false
      }
    }
  }
```

一般按照这个选项配置即可：

webpack.common.js

```javascript
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
```



### 参数说明



#### chunks



##### chunks: 'async'

默认配置是 async

只对异步引入进行代码分割

![image-20220808175424862](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808175424862.png)

##### chunks: 'initial'

只对同步引入进行代码分割

![image-20220808175441749](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808175441749.png)

##### chunks: 'all'

全部都会进行代码分割，同时必须要配置 defaultVendors

```javascript
defaultVendors: {
 test: /[\\/]node_modules[\\/]/,
 priority: -10
}
```

执行过程是首先看是否需要代码分割， 也就是 chunks 配置，如果需要分割会走到 cacheGroups 内看如何分割， 从 defaultVendors 看看是否在 node_modules 里， 那它就符合这个配置的要求， 于是他就会把需要打包的模块（如 lodash）打包在一个 Vendors 组里面去。

![image-20220808175459244](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808175459244.png)

这个文件是在 vendors 组内， 入口文件是 main.js

```javascript
   vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js'
        },
```

加上 filename 可以使文件名改为 vendors.js



#### minSize

minSize: 30000

引入的文件大于 30000 字节才进行分割， 一般配置 30000。

如果不是 node_modules 内的文件， 需要配置一个默认选项：

```javascript
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
```

这样打包后会在文件前加 default~的前缀， 如下：

![image-20220808175516416](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808175516416.png)



#### maxSize

基本上没用， 一般不会配置这个选项。

这个配置是进行二次拆分的选项。 比如一个 lodash 库， 你配置 50000， 也就是 50kb， 这个 lodash 库是 1m， 那么它会拆分成 20 个文件， 但是一般情况下 lodash 库是拆分不了的。



#### minChunks

当一个模块引入了多少次才会进行代码分割。



#### maxAsyncRequests

同时加载的模块数量。一般不会配置。默认即可。

比如我们这个选项配置为 5， 加入我引入了 10 个库， 分割了 10 个文件，那你一打开网页的时候， 同时要加载 10 个文件。那就违反了 maxAsyncRequests 配置为 5 的要求， 同时只能加载 5 个请求， 那么 webpack 在打包前 5 个库的时候会为你生成 5 个 js 文件， 超过 5 个它就不会做代码分割了。



#### maxInitialRequests

一般不会配置。默认即可。

整个网站首页加载的时候， 或者说入口文件加载的时候， 入口文件可能会引入其它的 js 文件。入口文件引入的库如果是配置为 3， 那么最多做 3 次代码分割。 超过 3 个就不会再做代码分割了。



#### automaticNameDelimiter

组和文件名做连接时的连接符



#### name

为`true`会让`cacheGroups`起的名字有效。也就是`filename`。



#### cacheGroups

`cacheGroups`也就是缓存组， 与上面的选项息息相关。会把符合条件的代码缓存到一个组内。

`priority`指的是优先级。 哪个大优先哪个。

`reuseExistingChunk: true`

假如我有一个 a 模块， 又有一个 b 模块。a 模块内又使用了 b 模块。在打包 a 代码的时候， 由于 a 模块使用了<br />b 模块，所以 b 模块代码也会被打包进去。但是如果配置这个选项，它会去看， 之前 b 模块代码已经被引入过，那么它会去复用之前打包的模块。



### Chunks 是什么？

webpack 打包过程中生成的每个文件都是一个 chunk



##### 意义

代码分割配置

minChunks: 2 至少两个打包文件引入这个模块 才单独分割打包



## Lazy Loading 懒加载

以下代码可以实现懒加载， 在点击页面后再加载代码

```javascript
async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName:"lodash" */ "lodash");
  const element = document.createElement("div");
  element.innerHTML = _.join(["Dell", "Lee"], "-");
  return element;
}

document.addEventListener("click", () => {
  getComponent().then((element) => {
    document.body.appendChild(element);
  });
});
```

优点： 页面加载速度更快。

懒加载并不是 webpack 的功能， 它是 ESModule 的一个概念， 只不过 webpack 能够识别对它进行代码分割。



### 打包分析

[https://github.com/webpack/analyse](https://github.com/webpack/analyse)

package.json

```javascript
  "scripts": {
    "dev-build": "webpack --profile --json > stats.json --config ./build/webpack.dev.js",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  },
```

整个打包过程的描述放在`stats.json`文件内。

打开http://webpack.github.io/analyse/，把文件上传即可得到以下的分析图。

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/bundleanaliy.png)

当然也可以使用 Webpack Bundle Analyzer 这个插件。



## Preloading, Prefetching

webpack 期望首次加载速度最优化，不是利用缓存在下次加载时提高访问速度 应该提高代码使用率

show coverage 代码使用率

交互代码可以放到单独的异步模块里 提高加载速度及页面利用率

如下：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yubao.png)

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/woyaozhibo.png)

但是异步加载交互代码时：例如当点击的时候才再加载异步代码，虽然提高了页面初始化速度，但是对用用户点击<br />的体验不好，速度太慢；

为了解决懒加载带来的问题：使用 prefretch preload

prefetch:会等主流程都加载完成，等待空闲再加载；（最优）

```javascript
import(/* webpackPrefetch: true */ "LoginModal");
```

preload：是和主线程一起加载



## css 代码分割

想要使用 css 代码分割我们必须要修改一下 Tree Shaking 配置

package.json

```json
  "sideEffects": [
    "*.css",
    "*.scss"
  ],
```

首先， 我们需要安装一个插件

```javascript
npm install --save-dev mini-css-extract-plugin
```

引入 css 文件

```javascript
import "./style.css";
```

webpack.prod.js 配置

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

压缩 css 代码：

```shell
npm i optimize-css-assets-webpack-plugin -D
```

webpack.prod.js

```javascript
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    })
  ]
```



##### 高级用法

多个入口文件引入的 css 文件打包到一起， 需要借助 splitChunks，额外增加一个 style 组，只要发现你的打包文件是 css 文件， 统一打包到一个叫 styles.css 的文件内，`enforce`为`true`忽略默认的一些参数（如 minsize 之类）。只要你是一个 css 文件我就做代码的拆分，把代码分割到 style.css 文件内。

webpack.prod.js

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

当我们想要每个入口文件打包到不同的 css 文件内的时候，还是利用 cacheGroups， 如下： 如果入口文件是 foo 文件就走 fooStyles 的逻辑，如果是 bar 文件就走 barStyles 的逻辑。

```javascript
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    foo: path.resolve(__dirname, "src/foo"),
    bar: path.resolve(__dirname, "src/bar"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: "foo",
          test: (m, c, entry = "foo") =>
            m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
          chunks: "all",
          enforce: true,
        },
        barStyles: {
          name: "bar",
          test: (m, c, entry = "bar") =>
            m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```



## Webpack 与浏览器缓存

webpack.common.js

关闭性能上的警告

```javascript
performance: false,
```

在我们使用 webpack 的时候，线上代码修改的时候，因为代码的名字没有改变导致浏览器在加载<br />网页的时候，取的是缓存中的代码，导致没有及时的获取最新的代码，这时候就要清除浏览器的缓存， 我们可以利用输出文件配置 contenthash， 这样只有在修改代码了才会改变 hash 值， 就可以做到修改了代码线上浏览器缓存也会更新。

webpack.prod.js

```javascript
 output: {
 filename: '[name].[contenthash].js',
 chunkFilename: '[name].[contenthash].js'
 }
```

老版本如果发现即使没修改代码，打包文件的 hash 值也不一样，请按下图配置：

![image-20220808175632040](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808175632040.png)

## Shimming 的作用

shimming 作用：解决 webpack 打包的兼容性问题.

比如你引入一个 jquery.ui 的库， 但是没有引入 jquery， 使用了$写代码。 但是在你的业务是有引入 jquery 的， 这样在业务代码如果运行 jqueryui 初始化会报错的。 所以我们应该使用 shimming。

webpack.common.js

```javascript
const webpack = require("webpack");
```

webpack.common.js

```javascript
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
	  _join:['lodash','join'],
	  //_: 'lodash'
    })
  ],
```

以上代码的意思就是如果我的一个模块中使用了`$`， 那我就会在模块里自动帮你引入 jquery 这个模块。<br />使用\_join 就是 lodash 下的 join 方法



### 模块内 this 指向 window

每个模块的 this 都是指向自身模块， 不会指向 window。 如果想要指向 window， 可以引入这个插件：

```shell
npm i imports-loader --save-dev
```

webpack.common.js

```javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
        },{
          loader: "imports-loader?this=>window"
        }]
      }
```



## 环境变量

我们换一种方式来启动不同环境下的打包方式， 通过一个变量:

package.json

```json
{
  "name": "webpack-demo",
  "sideEffects": ["*.css", "*.scss"],
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "dev-build": "webpack --profile --json > stats.json --config ./build/webpack.common.js",
    "dev": "webpack-dev-server --config ./build/webpack.common.js",
    "build": "webpack --env.production --config ./build/webpack.common.js"
  },
  "author": "LiuJunFeng",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.8.4",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-transform-runtime": "^7.8.3",
    "@babel/preset-env": "^7.8.4",
    "@babel/preset-react": "^7.8.3",
    "autoprefixer": "^9.7.4",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.4.2",
    "file-loader": "^5.0.2",
    "html-webpack-plugin": "^3.2.0",
    "imports-loader": "^0.8.0",
    "mini-css-extract-plugin": "^0.9.0",
    "node-sass": "^4.13.1",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^8.0.2",
    "style-loader": "^1.1.3",
    "url-loader": "^3.0.0",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.3",
    "webpack-merge": "^4.2.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.8.3",
    "@babel/runtime": "^7.8.4",
    "@babel/runtime-corejs2": "^7.8.4",
    "jquery": "^3.4.1",
    "lodash": "^4.17.15",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```

webpack.common.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");

const commonConfig = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 204800,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "imports-loader?this=>window",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
    }),
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
        },
      },
    },
  },
  performance: false,
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
};

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};
```

webpack.dev.js

```javascript
const webpack = require("webpack");

const devConfig = (module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
});

module.exports = devConfig;
```

webpack.prod.js

```javascript
const webpack = require("webpack");

const devConfig = (module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
});

module.exports = devConfig;
```

我们也可以在 package.json 里这样写：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/packge.json.png)

那么对应的 webpack.common.js 是这样的

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/commonjs.png)

还可以这么写：

package.json

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/jdakdj.png)

webpack.common.js

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/zhendeleia.png)



## 打包组件库

创建一个新的文件夹 Library,   并初始化项目：

```shell
npm init -y
```

安装 webpack

```shell
npm i webpack webpack-cli --save
```

创建 webpack.config.js 配置以下代码：

```javascript
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    libraryTarget: "umd", //无论什么方式引入组件都可以正确引入到
  },
};
```

package.json

```json
{
  "name": "Library",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "LIU",
  "license": "MIT",
  "dependencies": {
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10"
  }
}
```

如果你想这样通过 src 引入 js， 并且想通过 library 获取它下面的方法或属性，

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/srcjs.png)

添加`library: 'library'`即可

webpack.config.js

```javascript
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    library: "library",
    libraryTarget: "umd", //无论什么方式引入组件都可以正确引入到
    //libraryTarget: 'this',
    //libraryTarget: 'window',
    //libraryTarget: 'global',
  },
};
```

这样配置好以下几种方式都可以正确引入了：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/houqiyingx.png)

webpack.config.js

```javascript
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  externals: ["lodash"], //打包过程中如果遇到lodash库你就忽略这个库，不要把它打包到你的代码中去，防止使用时用户重复引入库（例如：lodash）
  // externals: {
  //     lodash: {
  //         //root: '_',//全局script标签引入，必须在页面注入一个名字叫_的变量
  //         //commonjs: 'lodash'//如果我的lodash在commonjs这个环境中使用，并且引入名字必须是lodash
  //     }
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    library: "library",
    libraryTarget: "umd", //无论什么方式引入组件都可以正确引入到
  },
};
```

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/3nianasannian.png)

package.json

```javascript
{
  "name": "Library",
  "version": "1.0.0",
  "description": "",
  "main": "./dist/library.js",
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "LIU",
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.15",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10"
  }
}
```

发布组件库流程：

- 登录 npm
- 命令行`npm adduser`,输入用户名，密码
- 命令行 `npm publish`   发布到 npm



## PWA 的打包配置

### 安装插件模拟服务器

```javascript
 npm i http-server --save-dev
```

package.json

scripts 命令

```json
"start": "http-server dist",
```

PWA：是一种强缓存技术，访问过的页面就算服务器断开，也能通过缓存浏览之前访问的页面

只在上线环境配置就可以了， 开发环境不用考虑服务器挂掉不挂掉的问题。



#### 安装插件

```shell
npm i workbox-webpack-plugin --save-dev
```



#### 配置

webpack.prod.js

```javascript
const WorkboxPlugin = require("workbox-webpack-plugin");
```

```javascript
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
```

业务逻辑文件增加以下代码：

```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("service-worker registed");
      })
      .catch((error) => {
        console.log("service-worker register error");
      });
  });
}
```



## TypeScript 的打包配置

安装插件：

```shell
npm i ts-loader typescript --save
```

webpack-config.js

```javascript
    module: {
        rule: [{
            test: /\.tsx?$/,
            use: 'ts-loader'
        }]
    },
```

创建 tsconfig.json 文件

```javascript
{
    "compilerOptions": {
        "outDir": "./dist",//输出目录
        "module": "es6",//只允许es6 Module的方式引入模块
        "target":"es5",//编译为Es5这样的代码
        "allowJs":true//允许TS里引入js这样的模块
    }
}
```

如果想引入 lodash 库，并且想让它的非法错误提示出来， 首先安装一个这样的模块：

```shell
 npm i @types/lodash --save-dev
```

如下图， 如果不向`join`方法传入参数会有报错提示

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/jqueryjs.png)

如果还想安装 jquery 库， 那你也需要安装对应的类型文件

```shell
npm i @types/jquery --save-dev
```

这个网站可以查询都有哪些类型文件可以试用：

[https://microsoft.github.io/TypeSearch/](https://microsoft.github.io/TypeSearch/)



## WebpackDevServer

### 请求转发

如果我们现在项目内发送请求， 我们一般会安装一个 axios 库

```shell
npm i axios --save
```

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/meibanfaces.png)

在项目中我们一般会在开发环境有一个请求 api 以供测试， 线上环境有一个请求 api。 这时候我们一般需要使用相对路径写接口地址， 但是使用相对路径接口地址带上的就是 localhost 了， 这时候我们需要做一个代理：

webpack.config.js

```javascript
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		proxy: {
			'/react/api': {
				target: 'https://www.dell-lee.com',
				secure: false,
				pathRewrite: {
					'header.json': 'demo.json'
				},
				changeOrigin: true,
				headers: {
					host: 'www.dell-lee.com',
				}
			}
		}
	},
```

secure: false： https 的接口需要设置这个

pathRewrite: 相当于想要去获取 header.json， 配置这个获取的是 demo.json。 一般用于后端接口还没写好的时候使用一个 demo 数据， 等写好了再使用写好的接口，只需要把这个选项注释掉， 不用去业务代码中再修改了。

changeOrigin: true 始终配置就行， 主要为了有的网站使用了 origin 限制。

headers： 设置请求头， 可设置 host, cookie



### 解决单页面应用路由问题

首先我们需要安装一个路由插件：

```shell
npm i react-router-dom --save
```

在我们使用单页应用时， 如果我们要访问 list 页面， 那么服务器会以为我们访问的是一个叫 list 的页面。但是我们的文件里并没有一个 list.html， 那它就会提示我们页面不存在。

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/yuchengjinro.png)

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/langduibuxing.png)

想要达到我们预期的效果， 需要配置 devServer

webpack.config.js

```javascript
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		historyApiFallback:true,
```

当然你也可以单独设置每个地址的访问，如 abc.html<br />转发到 index.html

```javascript
		historyApiFallback: {
			rewrites: [{
				from: /abc.html/,
				to: '/index.html'
			}]
		},
```

```
historyApiFallback只在开发环境中有效，线上环境需要和后端配合
```



## EsLint



### 使用 eslint 检测代码

安装插件

```shell
npm i eslint --save-dev
```

```shell
npx eslint --init
```

配置好文件以后可以用此命令查看项目文件是否符合语法：

```shell
npx eslint src
```

安装解析器

```shell
npm i babel-eslint --save-dev
```

.eslintrc.js

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/buwena.png)


### vscode 中的 ESlint

其实我们也可以不借助 webpack， 直接使用编辑器自带的插件， 如 vscode 的 Eslint 插件， 这样使用会更加方便！

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/zaichongyiba.png)

如果我们的团队有些规范并不想要符合 airbnb 它的规范， 我们可以这么配置：<br />首先复制出规范的名称， 如下图：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/qiangnuzhimo.png)

然后再.eslintrc.js 文件的 rules 里进行配置：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/eslintrc.png)

假设我们团队有一个同学使用的不是 vscode， 他没有这样的语法提示， 就会跟我们写的代码不一样。 这时候我们就需要借助 webpack 了：

首先我们需要安装一个这样的插件：

```shell
npm i eslint-loader --save-dev
```

然后再 webpack.config.js 配置

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/config.jswebpack.png)

```
eslint-loader  一定要写在后面， 只有语法正确再进行转义或者其它。因为loader是先执行后边再执行前边的。
```



##### Eslint 安装使用流程

- 安装 Eslint
- 安装 Eslint-loader
- webpack 内 devServer 配置 overlay
- webpack 内 js 文件配置 eslint-loader



#### Eslint 其他配置

webpack.config.js

```javascript
{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', {
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
        force: 'pre',
      },
      ],
    }
```

fix: true   自动帮你修复比较浅显的问题

force: 'pre'   强制先执行 eslint-loader



### 最佳实践

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/gitgouzi.png)

不用配置 webpack， 直接使用 git 的钩子， 再提交代码时验证语法。



## webpack 性能优化

#### 1. 跟上技术的迭代（Node， Npm， Yarn）

#### 2. 在尽可能少的模块上应用 Loader

可以干掉的配置：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/woshishui8.png)

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/gandiaopeizhi.png)



#### 3. Plugin 尽可能精简并确保可靠

#### 4. resolve 参数合理配置

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/resolvecanshu.png)

extensions 建议配逻辑文件， css，图片类不要配置， 浪费性能。



#### 5. 使用 DllPlugin 提高打包速度

我们引入了一个 lodash 库， 我们知道这个库的文件它是不会变的， 但是每次打包都会打包它， 我们可以让它只在第一次打包， 下次就不打包了。

首先创建一个 webpack.dll.js

```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vendors: ["lodash"],
    react: ["react", "react-dom"],
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dll"),
    library: "[name]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "../dll/[name].manifest.json"),
    }),
  ],
};
```

运行命令打包组件库：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/dabaozuyjianku.png)

然后安装一个插件：

```shell
npm i  add-asset-html-webpack-plugin --save
```

在 webpack.common.js 引入

```javascript
const fs = require("fs"); //引入核心模块
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
```

```javascript
const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
  }),
  new CleanWebpackPlugin(["dist"], {
    root: path.resolve(__dirname, "../"),
  }),
];

const files = fs.readdirSync(path.resolve(__dirname, "../dll"));
files.forEach((file) => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, "../dll", file),
      })
    );
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "../dll", file),
      })
    );
  }
});

module.exports = {
  plugins,
};
```



#### 6. 控制包大小

不要引入无用组件库， 多使用 Tree Shaking，   使用 SplitChunks 代码拆分。

#### 7. thread-loader, parallel-webpack, happypack 多进程打包

#### 8. 合理使用 SourceMap

不要太详细，配置合适的即可

#### 9. 结合 Stats 分析打包结果

#### 10. 开发环境内存编译， 无用插件剔除

开发环境配置模式为`development`

```javascript
mode: "development",
```



## 多页面打包配置

配置 entry：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/entrywebpack.png)

想要添加多页面首先在 src 目录增加对应的 js 文件，然后在 entry 增加入口文件

webpack.common.js

```javascript
const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");

const makePlugins = (configs) => {
  const plugins = [new CleanWebpackPlugin()];

  Object.keys(configs.entry).forEach((item) => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: `${item}.html`,
        chunks: ["runtime", "vendors", item],
      })
    );
  });

  const files = fs.readdirSync(path.resolve(__dirname, "../dll"));
  files.forEach((file) => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, "../dll", file),
        })
      );
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "../dll", file),
        })
      );
    }
  });

  return plugins;
};

const configs = {
  entry: {
    main: "./src/index.js",
    list: "./src/list.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 10240,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    usedExports: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
        },
      },
    },
  },
  performance: false,
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
};

configs.plugins = makePlugins(configs);

module.exports = configs;
```

---



## 如何编写一个 loader

首先创建一个文件夹 make-loader, 对项目初始化, 然后安装 webpack

```
npm init -y
npm i webpack webpack-cli --save-dev
```

创建文件夹 loader， loader 文件夹内创建文件 replaceLoader.js

我们要实现的目标是如果发现我们的业务逻辑文件内有`dell`这个字符， 我们要把它修改成`dellLee`

```javascript
//replaceLoader.js
//source 引入文件的内容
//this.query携带传过来的参数,name是loader配置的name参数
//loaderUtils可以分析参数， 比如参数是个对象的时候可以用到
//this.callback代替return 传递除result,还可以传递sourcemap等内容
//异步loader 使用this.async()
const loaderUtils = require("loader-utils");
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();

  setTimeout(() => {
    const result = source.replace("dell", options.name);
    callback(null, result);
  }, 1000);
};
```

```javascript
//replaceLoader.js
module.exports = function (source) {
  return source.replace("dell", "world");
};
```

webpack.config.js

```javascript
const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  //当你引入loader的时候，会先在node_modules里找，如果没有回去loader里去找
  resolveLoader: {
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: "replaceLoader",
          },
          {
            loader: "replaceLoaderAsync",
            options: {
              name: "lee",
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
```

如果你的 loader 配置参数有些诡异， 如是一个对象， 这时候我们可以使用一个插件做分析：

```
npm i loader-utils --save-dev
```



## 如何编写一个 Plugin

#### Plugin 与 loader 的区别

##### loader

当我们在源代码中引入一个新的 js 文件，或者一个其他格式的文件的时候， 我们可以使用 loader 处理这个引入的文件。

##### Plugin

在我们做打包的时候， 在某一个具体时刻上。 比如说， 当我打包结束后，我要自动生成一个 html 文件， 这时候我们就可以使用一个 html-webpack-plugin 的插件。它会在打包结束后生成 html 文件。

Plugin 可以在我们打包过程的某个时刻想做一些事情。

首先我们初始化一个项目， 安装 webpack 和 webpack-cli。

如果我们想要生成带版权的文件， 可以这么做：

创建文件夹 plugins， plugins 文件夹内创建 copyright-webpack-plugin.js

```javascript
//options是plugin配置传过来的参数
//compiler是webpack的实例，存储了我们webpack相关各种各样的配置文件，打包过程，等等一系列的内容。
//钩子， 指某个时刻会自动执行的函数。 如vue生命周期
//emit  当你把打包资源放到目标文件夹的时刻。它是一个异步的钩子。 可以在后面写一个tabAsync. 他有两个参数 第一个是插件名字，第二个是剪头函数
//compile  同步的钩子， 后面跟tap， 箭头函数只传compilation
//compilation 和compiler不一样， 只存放这次打包的相关内容
//compilation.assets 打包生成的内容
class CopyrightWebpackPlugin {
  // constructor(options) {
  // }
  apply(compiler) {
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", (compilation) => {
      console.log("compiler");
    });
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        compilation.assets["copyright.txt"] = {
          source: function () {
            return "copyright by dell lee";
          },
          size: function () {
            return 21;
          },
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
```

在 webpack.config.js 配置：

```javascript
const path = require("path");
const CopyRightWebpackPlugin = require("./plugins/copyright-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  plugins: [new CopyRightWebpackPlugin()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
```



#### node 调试工具

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/nodetiaoshigongju.png)

--inspect 开启 node 调试工具

--inspect-brk webpack 执行命令的第一行打断点

输入 npm run debug 后打开浏览器， 点击控制台左上角 node 小图标

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/nodetiaoshi.png)

这时候我们就可以看到插件的详细信息了

可在 watch 增加 compilation 的监控

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/compations.png)



## Bundler 源码编写

### 模块分析

## Vue CLI 3 的配置方法

Vue 内的 Webpack 设计理念是让我们用的更爽， 即使是 webpack 小白用户我们也能够轻松使用。

如果我们想配置 webpack， 需要在项目的根目录创建一个 vue.config.js

这里的配置和 webpack 并不一样， 它对 webpack 的配置进行了大量的封装， 如果我们需要配置， 可参考脚手架的配置参考：[https://cli.vuejs.org/zh/config/](https://cli.vuejs.org/zh/config/)

如果我们想实现原生的 webpack， 在脚手架参考文档使用 configureWebpack即可。



## 实现小型打包工具

该工具可以实现以下两个功能

- 将 ES6 转换为 ES5
- 支持在 JS 文件中 import CSS 文件

通过这个工具的实现，大家可以理解到打包工具的原理到底是什么。



#### 实现

因为涉及到 ES6 转 ES5，所以我们首先需要安装一些 Babel 相关的工具

`yarn add babylon babel-traverse babel-core babel-preset-env`

接下来我们将这些工具引入文件中

```javascript
const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");
```

首先，我们先来实现如何使用 Babel 转换代码

```javascript
function readCode(filePath) {
  // 读取文件内容
  const content = fs.readFileSync(filePath, "utf-8");
  // 生成 AST
  const ast = babylon.parse(content, {
    sourceType: "module",
  });
  // 寻找当前文件的依赖关系
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });
  // 通过 AST 将代码转为 ES5
  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });
  return {
    filePath,
    dependencies,
    code,
  };
}
```

- 首先我们传入一个文件路径参数，然后通过 `fs` 将文件中的内容读取出来
- 接下来我们通过 `babylon` 解析代码获取 AST，目的是为了分析代码中是否还引入了别的文件
- 通过 `dependencies` 来存储文件中的依赖，然后再将 AST 转换为 ES5 代码
- 最后函数返回了一个对象，对象中包含了当前文件路径、当前文件依赖和当前文件转换后的代码

接下来我们需要实现一个函数，这个函数的功能有以下几点

- 调用 `readCode` 函数，传入入口文件
- 分析入口文件的依赖
- 识别 JS 和 CSS 文件

```javascript
function getDependencies(entry) {
  // 读取入口文件
  const entryObject = readCode(entry);
  const dependencies = [entryObject];
  // 遍历所有文件依赖关系
  for (const asset of dependencies) {
    // 获得文件目录
    const dirname = path.dirname(asset.filePath);
    // 遍历当前文件依赖关系
    asset.dependencies.forEach((relativePath) => {
      // 获得绝对路径
      const absolutePath = path.join(dirname, relativePath);
      // CSS 文件逻辑就是将代码插入到 `style` 标签中
      if (/\.css$/.test(absolutePath)) {
        const content = fs.readFileSync(absolutePath, "utf-8");
        const code = `
          const style = document.createElement('style')
          style.innerText = ${JSON.stringify(content).replace(/\\r\\n/g, "")}
          document.head.appendChild(style)
        `;
        dependencies.push({
          filePath: absolutePath,
          relativePath,
          dependencies: [],
          code,
        });
      } else {
        // JS 代码需要继续查找是否有依赖关系
        const child = readCode(absolutePath);
        child.relativePath = relativePath;
        dependencies.push(child);
      }
    });
  }
  return dependencies;
}
```

- 首先我们读取入口文件，然后创建一个数组，该数组的目的是存储代码中涉及到的所有文件
- 接下来我们遍历这个数组，一开始这个数组中只有入口文件，在遍历的过程中，如果入口文件有依赖其他的文件，那么就会被 push 到这个数组中
- 在遍历的过程中，我们先获得该文件对应的目录，然后遍历当前文件的依赖关系
- 在遍历当前文件依赖关系的过程中，首先生成依赖文件的绝对路径，然后判断当前文件是 CSS 文件还是 JS 文件
  - 如果是 CSS 文件的话，我们就不能用 Babel 去编译了，只需要读取 CSS 文件中的代码，然后创建一个 style 标签，将代码插入进标签并且放入 head 中即可
  - 如果是 JS 文件的话，我们还需要分析 JS 文件是否还有别的依赖关系最后将读取文件后的对象 `push` 进数组中

现在我们已经获取到了所有的依赖文件，接下来就是实现打包的功能了

```javascript
function bundle(dependencies, entry) {
  let modules = "";
  // 构建函数参数，生成的结构为
  // { './entry.js': function(module, exports, require) { 代码 } }
  dependencies.forEach((dep) => {
    const filePath = dep.relativePath || entry;
    modules += `'${filePath}': (
      function (module, exports, require) { ${dep.code} }
    ),`;
  });
  // 构建 require 函数，目的是为了获取模块暴露出来的内容
  const result = `
    (function(modules) {
      function require(id) {
        const module = { exports : {} }
        modules[id](module, module.exports, require)
        return module.exports
      }
      require('${entry}')
    })({${modules}})
  `;
  // 当生成的内容写入到文件中
  fs.writeFileSync("./bundle.js", result);
}
```

这段代码需要结合着 Babel 转换后的代码来看，这样大家就能理解为什么需要这样写了

```javascript
// entry.js
var _a = require("./a.js");
var _a2 = _interopRequireDefault(_a);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
console.log(_a2.default);
// a.js
Object.defineProperty(exports, "__esModule", {
  value: true,
});
var a = 1;
exports.default = a;
```

Babel 将我们 ES6 的模块化代码转换为了 CommonJS 的代码，但是浏览器是不支持 CommonJS 的，所以如果这段代码需要在浏览器环境下运行的话，我们需要自己实现 CommonJS 相关的代码，这就是 `bundle` 函数做的大部分事情。

接下来我们再来逐行解析 `bundle` 函数

- 首先遍历所有依赖文件，构建出一个函数参数对象
- 对象的属性就是当前文件的相对路径，属性值是一个函数，函数体是当前文件下的代码，函数接受三个参数 `module`、`exports`、 `require`
  - `module` 参数对应 CommonJS 中的 `module`
  - `exports` 参数对应 CommonJS 中的 `module.export`
  - `require` 参数对应我们自己创建的 `require` 函数
- 接下来就是构造一个使用参数的函数了，函数做的事情很简单，就是内部创建一个 `require` 函数，然后调用 `require(entry)`，也就是 `require('./entry.js')`，这样就会从函数参数中找到 `./entry.js`对应的函数并执行，最后将导出的内容通过 module.export 的方式让外部获取到
- 最后再将打包出来的内容写入到单独的文件中

如果你对于上面的实现还有疑惑的话，可以阅读下打包后的部分简化代码

```javascript
(function (modules) {
  function require(id) {
    // 构造一个 CommonJS 导出代码
    const module = { exports: {} };
    // 去参数中获取文件对应的函数并执行
    modules[id](module, module.exports, require);
    return module.exports;
  }
  require("./entry.js");
})({
  "./entry.js": function (module, exports, require) {
    // 这里继续通过构造的 require 去找到 a.js 文件对应的函数
    var _a = require("./a.js");
    console.log(_a2.default);
  },
  "./a.js": function (module, exports, require) {
    var a = 1;
    // 将 require 函数中的变量 module 变成了这样的结构
    // module.exports = 1
    // 这样就能在外部取到导出的内容了
    exports.default = a;
  },
  // 省略
});
```

**小结:**

虽然实现这个工具只写了不到 100 行的代码，但是打包工具的核心原理就是这些了

1. 找出入口文件所有的依赖关系
1. 然后通过构建 CommonJS 代码来获取 `exports` 导出的内容



## 如何配置别名

vue.config.js

```javascript
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'))
  },
```



## 常见面试题总结

### module chunk bundle 分别什么意思，有何区别?

- module： 各个源码文件， webpack 中一切皆模块
- chunk： 多模块合并成的， 如 entry import() splitChunk
- bundle： 最终输出的文件
- ![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/bundle.png)



### webpack 常见性能优化 - 综合

1. Node， Npm/Yarn 更新到最新版本
1. Plugin 尽可能精简可靠
1. resolve 参数合理配置
1. ![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/resolve.png)<br />extensions 建议配逻辑文件， css，图片类不要配置， 浪费性能。
1. 合理使用 SourceMap 不要太详细，配置合适的即可



### webpack 常见性能优化 - 构建速度

1. 优化 babel-loader

```json
rules: [
  {
    // js 文件才使用 babel
    test: /\.js$/,
    use: ['babel-loader?cacheDirectory'], //开启缓存
    include: [resolve('src')], //明确范围 只在 src 文件夹下查找
    exclude: /node_modules/,// 不会去查找的路径
  },
];
```

对于 Babel 来说，我们肯定是希望只作用在 JS 代码上的，然后 `node_modules` 中使用的代码都是编译过的，所以我们也完全没有必要再去处理一遍。

使用`use: ['babel-loader?cacheDirectory']`开启缓存， 只要 ES6 代码没有改的就不会再重新编译，而是缓存下来。

在第二次进行编译的时候，针对没有改的部分启用缓存， 不用再重新编译。

`include`、`exclude` 明确具体范围。比如 `node_modules`内文件就不要使用 `babel-loader` 了

2. IgnorePlugin(忽略无用文件)

> 有以下这种场景， 我们需要使用一个 moment 日历插件， 它支持很多种语言。 在默认情况下它是所有语言都引入的， 而我们实际开发中只需要中文。 这样就会导致打包了很多不必要的代码。 有没有什么方法可以做到只打包中文语言呢？

index.js

```javascript
import moment from "moment";
import "moment/locale/zh-cn"; //手动引入中文语言包
moment.locale("zh-cn"); //设置语言为中文
console.log("locale", moment.locale());
console.log("data", moment().format("ll")); //2020年xx月xx日
```

首先引入 moment 库， 并引入中文语言包

webpack.prod.js

```javascript
  plugins: [
    // 忽略 moment 下的 /locale 目录
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  ],
```

在开发环境下配置 plugins ， 不会打包 moment 下的 locale 文件。

IgnorePlugin 是直接不引入， 代码中没有

3. noParse

```javascript
  module: {
    //完整的 react.min.js 文件就没有采用模块化
    //忽略对 react.min.js 文件的递归解析处理
    noParse:[/react\.min\.js$/],
  },
```

如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助

一般情况下我们使用的 react.min.js 都是打包后的文件， 我们没有必要再次进行打包， 对于这种文件我们可以进行忽略。

noParse 是引入， 但不进行打包。

4. happyPack （多进程打包）

- JS 单线程，开启多进程打包
- 提高构建速度（特别是多核 CPU）

受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。

**HappyPack 可以将 Loader 的同步执行转换为并行的**，这样就能充分利用系统资源来加快打包效率了

webpack.prod.js

首先引入 happypack

webpack.prod.js

```javascript
const HappyPack = require("happypack");

module.exports = smart(webpackCommonConf, {
  mode: "production",
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ["happypack/loader?id=babel"],
        include: srcPath,
        // exclude: /node_modules/
      },
    ],
  },
  plugins: [
    // happyPack 开启多进程打包
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: "babel",
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ["babel-loader?cacheDirectory"],
      // 开启 4 个线程
      threads: 4,
    }),
  ],
  //其他配置
});
```

5. ParallelUglifyPlugin （多进程压缩 JS）
   - webpack 内置 Uglify 工具压缩 JS
   - JS 单线程， 开启多进程压缩更快

在 Webpack3 中，我们一般使用 UglifyJS 来压缩代码，但是这个是单线程运行的，为了加快效率，我们可以使用 webpack-parallel-uglify-plugin 来并行运行 UglifyJS，从而提高效率。

在 Webpack4 中，我们就不需要以上这些操作了，只需要将 mode 设置为 production 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 console.log 这类代码的功能。

webpack.prod.js

```javascript
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

  plugins: [
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
      uglifyJS: {
        output: {
          beautify: false, // 最紧凑的输出
          comments: false, // 删除所有的注释
        },
        compress: {
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
      },
    }),
  ],
```

**关于开启多进程**

- 项目较大， 打包较慢， 开启多进程能提高速度
- 项目较小， 打包很快， 开启多进程会降低速度（进程开销/启动/销毁/通讯）

6. 自动刷新<br />![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/zidongshuaxin.png)

一般不用配置， 直接使用 devServer 就可以了。

7. 热更新

   自动刷新： 整个网页会全部刷新， 速度较慢。状态也会丢失。

热更新： 新代码生效，网页不刷新， 状态不丢失。

具体设置参考 [HMR](http://l544402029.gitee.io/blog/%E5%89%8D%E7%AB%AF%E5%B7%A5%E5%85%B7/webpack/#HMR) 这一节。

8. DllPlugin

DllPlugin 可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。

举例：我们引入了一个 lodash 库， 我们知道这个库的文件它是不会变的， 但是每次打包都会打包它， 我们可以让它只在第一次打包， 下次就不打包了。

- webpack 内置 DllPlugin 支持
- DllPlugin 打包出 dll 文件
- DllReferencePlugin 使用 dll 文件

```javascript
// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ["react"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].dll.js",
    library: "[name]-[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: "[name]-[hash]",
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, "dist", "[name]-manifest.json"),
    }),
  ],
};
```

然后我们需要执行这个配置文件生成依赖文件，接下来我们需要使用 DllReferencePlugin 将依赖文件引入项目中

```javascript
// webpack.conf.js
module.exports = {
  // ...省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require("./dist/vendor-manifest.json"),
    }),
  ],
};
```

9. 一些小的优化点

我们还可以通过一些小的优化点来加快打包速度

- resolve.extensions：用来表明文件后缀列表，默认查找顺序是 ['.js', '.json']，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
- resolve.alias：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径

**小结：**

- webpack 优化构建速度（可用于生产）
  - 优化 babel-loader (生产环境缓存无所谓，只用在开发环境就可以。include exclude 必须要使用)
  - IgnorePlugin
  - noParse
  - happyPack(多进程打包)
  - ParallelUglifyPlugin （多进程压缩 JS，必须生产环境，开发环境没必要压缩代码）
- webpack 优化构建速度（不用于生产环境）
  - 自动刷新
  - 热更新
  - DllPlugin



### webpack 性能优化 - 产出代码

解决思路：

1. 体积更小
1. 合理分包，不重复加载
1. 执行速度更快、内存使用更小

方案：

1. 小图片 base64 编码
1. bundle 加 hash
1. 懒加载（按需加载）
1. 提取公共代码 参考 Code Splitting
1. IngorePlugin
1. 使用 CDN 加速
1. 使用 production
   - 自动开启代码压缩
   - Vue React 等 会自动删除掉调试代码（如开发环境的 warning）
   - 启用 Tree-Shaking
     - ES6 Module 才能让 tree-shaking 生效。 commonjs 不行
1. 合理使用 SourceMap(不要太详细，配置合适的即可)
1. 结合 Stats 分析打包结果
1. Node， Npm/Yarn 更新到最新版本
1. Plugin 尽可能精简可靠
1. resolve 参数合理配置
1. Scope Hosting（Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。）
   - 代码体积更小
   - 创建函数作用域更少
   - 代码可读性更好

比如我们希望打包两个文件

```javascript
// test.js
export const a = 1;
// index.js
import { a } from "./test.js";
```

对于这种情况，我们打包出来的代码会类似这样

```javascript
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
  /* 1 */
  function (module, exports, require) {
    //...
  },
];
```

但是如果我们使用 Scope Hoisting 的话，代码就会尽可能的合并到一个函数中去，也就变成了这样的类似代码

```javascript
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
];
```

这样的打包方式生成的代码明显比之前的少多了。如果在 Webpack4 中你希望开启这个功能，只需要启用 `optimization.concatenateModules` 就可以了。

```javascript
module.exports = {
  optimization: {
    concatenateModules: true,
  },
};
```

配置：

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/biezhuawpo.png)



### 前端代码为何要进行构建和打包?

- 体积更小（Tree-Shaking、压缩、合并），加载更快
- 能够编译高级语言或语法（TS、ES6+、模块化、SCSS）
- 兼容性和错误检查（Polyfill、postcss、eslint）



#### 研发流程方面：

- 统一，高效的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范（提测、上线等）



### Plugin 与 loader 的区别？

#### loader

- loader 模块转换器， 如 less > css

  loader 是一个打包方案，它是针对于某一个特定类型的文件，webpack 该如何进行打包。本身 webpack 是不知道对于一些文件（jpg，txt，excel）该如何处理的，但是 loader 知道。 所以 webpack 去求助 loader 就可以啦。

- Plugin

  plugin 扩展插件，如 HtmlWebpackPlugin

  在我们做打包的时候， 在某一个具体时刻上。 比如说， 当我打包结束后，我要自动生成一个 html 文件， 这时候我们就可以使用一个 html-webpack-plugin 的插件。它会在打包结束后生成 html 文件。

  Plugin 可以在我们打包过程的某个时刻想做一些事情。



### 常见 loader 有哪些？

1. file-loader

   打包图片文件，先将文件转移到打包目录下，再将 dist 中的文件路径返回给 index.js。

1. url-loader

   可以通过图片大小来判断是使用 base64 格式图片还是直接打包成一个图片资源文件。

1. css-loader

   帮我们分析出几个 css 文件的引入关系， 最终将这些 css 文件合并成一段 css。

1. style-loader

   再得到 css-loader 生成的内容后， 会把这段代码挂载到 html 的 head 部分。

1. sass-loader

   sass 文件打包

1. postcss-loader

   自动加厂商前缀

1. babel-loader

   babel 与 webpack 沟通的桥梁

1. ts-loader

   TypeScript 的打包配置

1. eslint-loader

   可以使团队统一使用一套 eslint



### 常见 plugin 有哪些？

1.  html-webpack-plugin 会在打包结束的时刻， 自动生成一个 html 文件， 并把打包生成的 js 自动注入到这个 html 文件中。
1.  clean-webpack-plugin 打包流程执行前清空 dist 目录
1.  webpack.HotModuleReplacementPlugin 模块热更新
1.  webpack.IgnorePlugin 忽略无用文件
1.  webpack-bundle-analyzer 打包分析
1.  happypack 多进程打包
1.  webpack-parallel-uglify-plugin 多进程压缩 JS
1.  mini-css-extract-plugin 将 CSS 提取为独立的文件
1.  optimize-css-assets-webpack-plugin 压缩 css 代码
1.  workbox-webpack-plugin 实现 PWA，是一种强缓存技术
1.  add-asset-html-webpack-plugin 将 JavaScript 或 CSS 资源添加到 html-webpack-plugin 生成的 HTML 中
1.  webpack.DllPlugin 我们引入了一个 lodash 库， 我们知道这个库的文件它是不会变的， 但是每次打包都会打包它， 我们可以让它只在第一次打包， 下次就不打包了。



### babel 和 webpack 的区别

- babel JS 新语法编译工具， 不关心模块化
- webpack 打包构建工具， 是多个 loader plugin 的集合



#### 如何产出一个 lib？

output.library

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/output.png)



### babel-polyfill 和 babel-runtime 的区别？

- babel-polyfill 会污染全局
- babel-runtime 不会污染全局
- 产出第三方 lib 要用 babel-rumtime



### webpack 如何实现懒加载？

- import()
- 结合 Vue React 异步组件
- 结合 Vue-router React-router 异步加载路由



### 为何 Proxy 不能被 Polyfill？

我们先看一下那些可以 Polyfill

- Class 可以用 function 模拟
- Promise 可以用 callback 来模拟
- 但 Proxy 的功能用 Object.defineProperty 无法模拟
