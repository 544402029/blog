# VUE项目构建与开发入门

## 构建基础

### 依赖工具

首先需要确保本地环境安装了`Node`环境以及包管理工具。

可以打开终端运行：

```
# 查看Node版本
node -v

# 查看npm版本
npm -v
```

### 脚手架

#### 安装

在终端通过以下命令全局安装 vue-cli：

```
# 安装 Vue CLI 3.x
npm i -g @vue/cli
```

#### 构建

在创建的项目目录地址下执行构建命令：

```
# my-project 是你的项目名称
vue create my-project
```

如果你只想构建一个基础的 Vue 项目，那么使用 Babel、Router、Vuex、CSS Pre-processors 就足够了，最后选择你喜欢的包管理工具 npm or yarn。


#### 目录结构

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180548230.png)

#### 可视化界面

`vue-cli 3.x` 还提供了可视化的操作界面，在项目目录下我们运行如下命令开启图形化界面：

```
vue ui
```


### 包管理工具与配置项

#### 常用命令

![image-20220808180619484](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180619484.png)


### 环境设置

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180631300.png)


## 	构建实战

### 单页应用基本配置

#### 拆分代码

```
// 引入 Home 组件
const Home = () => import('./views/Home.vue');

// 引入 About 组件
const About = () => import('./views/About.vue');
```