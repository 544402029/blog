import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "似若秋叶",
  description: "专注写作前端博客，记录日常所得。",
  base: '/blog/',
  lang: 'zh-CN',
  head: [['script', {},`var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?87e6dfa24d2735e29aae05a54966e81f";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();`]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      copyright: 'Copyright © 2019-present 544402029'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/index.md' },
      {
        text: '面试题库',
        items: [
          {
            text: 'Vue全家桶',
            link: '/面试题库/vue全家桶.md',
          },
          { text: '面试真题2022', link: '/面试题库/面试真题2022.md' },
          { text: '通信类', link: '/面试题库/通信类.md' },
          { text: 'HTML', link: '/面试题库/HTML.md' },
          { text: 'CSS', link: '/面试题库/CSS.md' },
          { text: 'JavaScript', link: '/面试题库/JavaScript.md' },
          { text: '笔试题', link: '/面试题库/笔试题.md' },
          { text: 'Vue', link: '/面试题库/Vue.md' },
          { text: 'Vue3', link: '/面试题库/Vue3.md' },
          { text: 'Webpack', link: '/面试题库/Webpack.md' },
          { text: 'Node.js', link: '/面试题库/Node.js.md' },
          { text: '其它', link: '/面试题库/其它.md' },
          { text: 'vue的diff算法', link: '/面试题库/vue的diff算法.md' },
        ],
      },
      {
        text: '常用代码片段',
        items: [
          { text: 'CSS常用代码片段', link: '/常用代码片段/CSS常用代码片段.md' },
          { text: 'JS常用代码片段', link: '/常用代码片段/JS常用代码片段.md' },
        ],
      },
      {
        text: '前端笔记',
        items: [
          { text: 'Vue使用', link: '/前端笔记/vue使用.md' },
          { text: 'Git', link: '/前端笔记/Git.md' },
          { text: '微信小程序',link: '/前端笔记/微信小程序.md'  },
          { text: '深入理解ES6', link: '/前端笔记/深入理解 ES6.md' },
          { text: '正则表达式', link: '/前端笔记/正则表达式.md' },
          { text: 'JavaScript正则迷你书', link: '/前端笔记/JavaScript正则迷你书.md' },
          { text: 'JavaScript 设计模式核⼼原理与应⽤实践', link: '/前端笔记/JavaScript 设计模式核⼼原理与应⽤实践.md' },
          { text: 'TypeScript', link: '/前端笔记/TypeScript.md' },
          { text: 'linux命令', link: '/前端笔记/linux命令.md' },
          { text: '图解HTTP', link: '/前端笔记/图解HTTP.md' },
          { text: 'HTTP协议原理', link: '/前端笔记/HTTP协议原理+实践 Web开发工程师必学.md' },
          { text: '计算机网络通关29讲', link: '/前端笔记/计算机网络通关29讲.md' },
          { text: '后台通用提效解决方案', link: '/前端笔记/后台通用提效解决方案.md' },
          {
            text: 'Node.js从零开发Web Server博客项目',
            link: '/前端笔记/Node.js从零开发WebServer博客项目,前端晋升全栈工程师必备.md',
          },
          {
            text: 'Node.js+KOA2 从0到1打造超好用Web框架一步到位',
            link: '/前端笔记/Node.js+KOA2从0到1打造超好用Web框架一步到位,掌握KOA2服务端开发.md',
          },
          {
            text: 'Vue全家桶+SSR+Koa2全栈开发美团网',
            link: '/前端笔记/Vue全家桶+SSR+Koa2全栈开发美团网.md',
          },
          {
            text: 'Koa2新浪博客',
            link: '/前端笔记/Koa2新浪博客.md',
          },
          {
            text: 'Electron+Vue3+AI+云存储--实战跨平台桌面应用',
            link: '/前端笔记/Electron+Vue3+AI+云存储--实战跨平台桌面应用.md',
          }
        ],
      },
      {
        text: 'Vue源码',
        items: [
          { text: 'Vue源码day1', link: '/vue源码/vue源码day1.md' },
          { text: 'Vue源码day2', link: '/vue源码/vue源码day2.md' },
          { text: 'Vue源码day3', link: '/vue源码/vue源码day3.md' },
          { text: 'Vue源码day4', link: '/vue源码/vue源码day4.md' },
          { text: 'Vue源码day5', link: '/vue源码/vue源码day5.md' },
        ],
      },
      {
        text: '珠峰架构',
        items: [
          {
            text: 'Node.js核心',
            link: '/zhufeng/Node.js核心.md',
          },
          {
            text: '前端工程化',
            link: '/zhufeng/前端工程化.md',
          }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/544402029/blog' }
    ]
  }
})
