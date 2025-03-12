import{_ as o,c as e,o as t,a3 as a}from"./chunks/framework.47i9LX9H.js";const _=JSON.parse('{"title":"Electron+Vue3+AI+云存储--实战跨平台桌面应用","description":"","frontmatter":{},"headers":[],"relativePath":"前端笔记/Electron+Vue3+AI+云存储--实战跨平台桌面应用.md","filePath":"前端笔记/Electron+Vue3+AI+云存储--实战跨平台桌面应用.md"}'),l={name:"前端笔记/Electron+Vue3+AI+云存储--实战跨平台桌面应用.md"},r=a('<h1 id="electron-vue3-ai-云存储-实战跨平台桌面应用" tabindex="-1">Electron+Vue3+AI+云存储--实战跨平台桌面应用 <a class="header-anchor" href="#electron-vue3-ai-云存储-实战跨平台桌面应用" aria-label="Permalink to &quot;Electron+Vue3+AI+云存储--实战跨平台桌面应用&quot;">​</a></h1><blockquote><p><a href="https://coding.imooc.com/learn/list/907.html" target="_blank" rel="noreferrer">Electron+Vue3+AI+云存储--实战跨平台桌面应用</a>课程笔记记录。有需要请购买正版课程。</p></blockquote><h2 id="electron基础快速入门" tabindex="-1"><strong>Electron基础快速入门</strong> <a class="header-anchor" href="#electron基础快速入门" aria-label="Permalink to &quot;**Electron基础快速入门**&quot;">​</a></h2><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218111810746.png" alt="image-20250218111810746"></p><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218111907933.png" alt="image-20250218111907933"><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218112048678.png" alt=""></p><h3 id="electron的缺点" tabindex="-1">Electron的缺点 <a class="header-anchor" href="#electron的缺点" aria-label="Permalink to &quot;Electron的缺点&quot;">​</a></h3><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218112337060.png" alt="image-20250218112337060"></p><ul><li><strong>优点</strong>： <ul><li>允许开发者使用熟悉的Web技术栈高效地开发跨平台桌面应用。</li><li>提供丰富的API和工具支持。</li></ul></li><li><strong>缺点</strong>： <ul><li>打包体积较大。</li><li>性能通常不如原生应用。</li></ul></li></ul><h3 id="预加载脚本preload的使用" tabindex="-1">预加载脚本preload的使用 <a class="header-anchor" href="#预加载脚本preload的使用" aria-label="Permalink to &quot;预加载脚本preload的使用&quot;">​</a></h3><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218113626837.png" alt="image-20250218113626837"></p><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218113726442.png" alt="image-20250218113726442"></p><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224095745335.png" alt="image-20250218140554150"></p><ol><li><p><strong>进程间通信</strong>：Electron应用中有两种类型的进程 - 主进程和渲染进程。它们通过IPC（进程间通信）进行交流。主进程使用<code>ipcMain</code>模块来定义通信通道，而渲染进程则利用<code>ipcRenderer</code>来调用这些通道。</p></li><li><p><strong>安全性问题</strong>：直接启用Node集成并关闭上下文隔离虽然让渲染进程能够轻松访问Node.js API，但这样也带来了安全隐患，因为第三方脚本可能滥用这个权限执行恶意操作。</p></li><li><p><strong>预加载脚本的作用</strong>：为了解决上述安全问题，推荐使用预加载脚本来增强应用程序的安全性。预加载脚本可以在保持与DOM和Node API的交互的同时限制渲染进程对某些API的直接访问。</p></li><li><p><strong>如何设置预加载脚本</strong>：</p><ul><li>在主进程中配置<code>webPreferences</code>选项时指定<code>preload</code>属性指向预加载脚本文件。</li><li>使用<code>contextBridge</code>API在预加载脚本里暴露特定的方法或变量给渲染进程，从而控制哪些功能是可访问的。</li></ul></li></ol>',13),c=[r];function n(i,s,p,g,h,u){return t(),e("div",null,c)}const m=o(l,[["render",n]]);export{_ as __pageData,m as default};
