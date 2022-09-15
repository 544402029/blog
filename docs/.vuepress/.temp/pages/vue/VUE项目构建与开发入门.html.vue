<template><div><h1 id="vue项目构建与开发入门" tabindex="-1"><a class="header-anchor" href="#vue项目构建与开发入门" aria-hidden="true">#</a> VUE项目构建与开发入门</h1>
<h2 id="构建基础" tabindex="-1"><a class="header-anchor" href="#构建基础" aria-hidden="true">#</a> 构建基础</h2>
<h3 id="依赖工具" tabindex="-1"><a class="header-anchor" href="#依赖工具" aria-hidden="true">#</a> 依赖工具</h3>
<p>首先需要确保本地环境安装了<code v-pre>Node</code>环境以及包管理工具。</p>
<p>可以打开终端运行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 查看Node版本
node -v

# 查看npm版本
npm -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="脚手架" tabindex="-1"><a class="header-anchor" href="#脚手架" aria-hidden="true">#</a> 脚手架</h3>
<h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h4>
<p>在终端通过以下命令全局安装 vue-cli：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 安装 Vue CLI 3.x
npm i -g @vue/cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="构建" tabindex="-1"><a class="header-anchor" href="#构建" aria-hidden="true">#</a> 构建</h4>
<p>在创建的项目目录地址下执行构建命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># my-project 是你的项目名称
vue create my-project
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你只想构建一个基础的 Vue 项目，那么使用 Babel、Router、Vuex、CSS Pre-processors 就足够了，最后选择你喜欢的包管理工具 npm or yarn。</p>
<h4 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180548230.png" alt=""></p>
<h4 id="可视化界面" tabindex="-1"><a class="header-anchor" href="#可视化界面" aria-hidden="true">#</a> 可视化界面</h4>
<p><code v-pre>vue-cli 3.x</code> 还提供了可视化的操作界面，在项目目录下我们运行如下命令开启图形化界面：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vue ui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="包管理工具与配置项" tabindex="-1"><a class="header-anchor" href="#包管理工具与配置项" aria-hidden="true">#</a> 包管理工具与配置项</h3>
<h4 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180619484.png" alt="image-20220808180619484"></p>
<h3 id="环境设置" tabindex="-1"><a class="header-anchor" href="#环境设置" aria-hidden="true">#</a> 环境设置</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180631300.png" alt=""></p>
<h2 id="构建实战" tabindex="-1"><a class="header-anchor" href="#构建实战" aria-hidden="true">#</a> 构建实战</h2>
<h3 id="单页应用基本配置" tabindex="-1"><a class="header-anchor" href="#单页应用基本配置" aria-hidden="true">#</a> 单页应用基本配置</h3>
<h4 id="拆分代码" tabindex="-1"><a class="header-anchor" href="#拆分代码" aria-hidden="true">#</a> 拆分代码</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// 引入 Home 组件
const Home = () => import('./views/Home.vue');

// 引入 About 组件
const About = () => import('./views/About.vue');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


