import{_ as a,c as e,o as s,a3 as n}from"./chunks/framework.COm4hYgr.js";const m=JSON.parse('{"title":"VUE项目构建与开发入门","description":"","frontmatter":{},"headers":[],"relativePath":"vue/VUE项目构建与开发入门.md","filePath":"vue/VUE项目构建与开发入门.md"}'),t={name:"vue/VUE项目构建与开发入门.md"},i=n(`<h1 id="vue项目构建与开发入门" tabindex="-1">VUE项目构建与开发入门 <a class="header-anchor" href="#vue项目构建与开发入门" aria-label="Permalink to &quot;VUE项目构建与开发入门&quot;">​</a></h1><h2 id="构建基础" tabindex="-1">构建基础 <a class="header-anchor" href="#构建基础" aria-label="Permalink to &quot;构建基础&quot;">​</a></h2><h3 id="依赖工具" tabindex="-1">依赖工具 <a class="header-anchor" href="#依赖工具" aria-label="Permalink to &quot;依赖工具&quot;">​</a></h3><p>首先需要确保本地环境安装了<code>Node</code>环境以及包管理工具。</p><p>可以打开终端运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 查看Node版本</span></span>
<span class="line"><span>node -v</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看npm版本</span></span>
<span class="line"><span>npm -v</span></span></code></pre></div><h3 id="脚手架" tabindex="-1">脚手架 <a class="header-anchor" href="#脚手架" aria-label="Permalink to &quot;脚手架&quot;">​</a></h3><h4 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h4><p>在终端通过以下命令全局安装 vue-cli：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 安装 Vue CLI 3.x</span></span>
<span class="line"><span>npm i -g @vue/cli</span></span></code></pre></div><h4 id="构建" tabindex="-1">构建 <a class="header-anchor" href="#构建" aria-label="Permalink to &quot;构建&quot;">​</a></h4><p>在创建的项目目录地址下执行构建命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># my-project 是你的项目名称</span></span>
<span class="line"><span>vue create my-project</span></span></code></pre></div><p>如果你只想构建一个基础的 Vue 项目，那么使用 Babel、Router、Vuex、CSS Pre-processors 就足够了，最后选择你喜欢的包管理工具 npm or yarn。</p><h4 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h4><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180548230.png" alt=""></p><h4 id="可视化界面" tabindex="-1">可视化界面 <a class="header-anchor" href="#可视化界面" aria-label="Permalink to &quot;可视化界面&quot;">​</a></h4><p><code>vue-cli 3.x</code> 还提供了可视化的操作界面，在项目目录下我们运行如下命令开启图形化界面：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>vue ui</span></span></code></pre></div><h3 id="包管理工具与配置项" tabindex="-1">包管理工具与配置项 <a class="header-anchor" href="#包管理工具与配置项" aria-label="Permalink to &quot;包管理工具与配置项&quot;">​</a></h3><h4 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h4><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180619484.png" alt="image-20220808180619484"></p><h3 id="环境设置" tabindex="-1">环境设置 <a class="header-anchor" href="#环境设置" aria-label="Permalink to &quot;环境设置&quot;">​</a></h3><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808180631300.png" alt=""></p><h2 id="构建实战" tabindex="-1">构建实战 <a class="header-anchor" href="#构建实战" aria-label="Permalink to &quot;构建实战&quot;">​</a></h2><h3 id="单页应用基本配置" tabindex="-1">单页应用基本配置 <a class="header-anchor" href="#单页应用基本配置" aria-label="Permalink to &quot;单页应用基本配置&quot;">​</a></h3><h4 id="拆分代码" tabindex="-1">拆分代码 <a class="header-anchor" href="#拆分代码" aria-label="Permalink to &quot;拆分代码&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 引入 Home 组件</span></span>
<span class="line"><span>const Home = () =&gt; import(&#39;./views/Home.vue&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 引入 About 组件</span></span>
<span class="line"><span>const About = () =&gt; import(&#39;./views/About.vue&#39;);</span></span></code></pre></div>`,28),o=[i];function p(l,c,r,h,d,u){return s(),e("div",null,o)}const g=a(t,[["render",p]]);export{m as __pageData,g as default};
