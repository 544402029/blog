import { hopeTheme } from "vuepress-theme-hope";
import { searchPlugin } from '@vuepress/plugin-search'
export default {
  title: "沧海的雨季", // 设置网站标题
  description: "记录日常所得",
  base: "/blog/",
  head: [
    [
      "script",
      {},
      `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?87e6dfa24d2735e29aae05a54966e81f";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`,
    ],
  ],
  plugins: [
    {copyCode: {
      showInMobile: true
    }},
    searchPlugin({
      // 配置项
    }),
  ],
  themeConfig: {
    search: true,
  },
  theme: hopeTheme({
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
    fullscreen: true,
    lastUpdated: "最后更新时间",
    repo: "https://gitee.com/l544402029/blog",
    repoLabel: "gitee",
    repoDisplay: true,
    editLink: true,
    editLinkText: "编辑此页",
    docsBranch: "gh-pages",
    nextLinks: true,
    prevLinks: true,
    plugins: {
      comment: {
        provider: 'Giscus',
        repo: '544402029/discuss',
        repoId: 'R_kgDOH_p7pg',
        category: 'General',
        categoryId: 'DIC_kwDOH_p7ps4CRbHM',
        lang: 'zh-CN'
      },
    },
    sidebar: [
      {
        text: "面试题库",
        icon: "creative",
        prefix: "面试题库/",
        children: [
          { text: "面试真题2022", link: "/面试题库/面试真题2022.md" },
          { text: "通信类", link: "/面试题库/通信类.md" },
          { text: "HTML", link: "/面试题库/HTML.md" },
          { text: "CSS", link: "/面试题库/CSS.md" },
          { text: "JavaScript", link: "/面试题库/JavaScript.md" },
          { text: "笔试题", link: "/面试题库/笔试题.md" },
          { text: "Vue", link: "/面试题库/Vue.md" },
          { text: "Vue3", link: "/面试题库/Vue3.md" },
          { text: "Webpack", link: "/面试题库/Webpack.md" },
          { text: "Node.js", link: "/面试题库/Node.js.md" },
          { text: "其它", link: "/面试题库/其它.md" },
          { text: "vue的diff算法", link: "/面试题库/vue的diff算法.md" },
        ],
      },
    ],
    navbar: [
      {
        text: "面试题库",
        link: "/面试题库/面试真题2022.md"
      },
      {
        text: "常用代码片段",
        children: [
          { text: "CSS常用代码片段", link: "/常用代码片段/CSS常用代码片段.md" },
          { text: "JS常用代码片段", link: "/常用代码片段/JS常用代码片段.md" },
        ],
      },
      {
        text: "前端笔记",
        children: [
          { text: "深入理解ES6", link: "/前端笔记/深入理解 ES6.md" },
          { text: "正则表达式", link: "/前端笔记/正则表达式.md" },
          {
            text: "JavaScript正则迷你书",
            link: "/前端笔记/JavaScript正则迷你书.md",
          },
          {
            text: "JavaScript 设计模式核⼼原理与应⽤实践",
            link: "/前端笔记/JavaScript 设计模式核⼼原理与应⽤实践.md",
          },
          { text: "TypeScript", link: "/前端笔记/TypeScript.md" },
          { text: "linux命令", link: "/前端笔记/linux命令.md" },
          {
            text: "HTTP协议原理",
            link: "/前端笔记/HTTP协议原理+实践 Web开发工程师必学.md",
          },
          { text: "图解HTTP", link: "/前端笔记/图解HTTP.md" },
          {
            text: "后台通用提效解决方案",
            link: "/前端笔记/后台通用提效解决方案.md",
          },
          { text: "Git", link: "/前端笔记/Git.md" },
        ],
      },
      {
        text: "Vue",
        children: [{ text: "Vue使用", link: "/vue/vue使用.md" }],
      },
      {
        text: "小程序",
        children: [{ text: "微信小程序", link: "/小程序/微信小程序.md" }],
      },
      {
        text: "Node.js",
        children: [
          {
            text: "Node.js从零开发Web Server博客项目",
            link: "/Node.js/Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备.md",
          },
          {
            text: "Node.js+KOA2 从0到1打造超好用Web框架一步到位",
            link: "/Node.js/Node.js+KOA2 从0到1打造超好用Web框架一步到位 掌握KOA2服务端开发.md",
          },
          {
            text: "Vue全家桶+SSR+Koa2全栈开发美团网",
            link: "/Node.js/Vue全家桶+SSR+Koa2全栈开发美团网.md",
          },
          {
            text: "Koa2新浪博客",
            link: "/Node.js/Koa2新浪博客.md",
          },
        ],
      },
    ],
  }),
};
