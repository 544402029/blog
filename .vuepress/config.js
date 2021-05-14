module.exports = {
  title: '沧海的雨季', // 设置网站标题
  description: '记录日常所得',
  base: '/blog/',
  themeConfig: {
    repo: 'https://gitee.com/l544402029/blog',
    repoLabel: 'Github',
    editLinks: true,
    editLinkText: '编辑此页',
    docsBranch: 'gh-pages',
    sidebar: 'auto',
    markdown: {
      // 代码块行号
      lineNumbers: true,
    },
    nav: [
      {
        text: '面试题库',
        items: [
          { text: '基础面试', link: '/面试题库/基础面试题.md' },
		  { text: '中级面试', link: '/面试题库/中级面试题.md' },
          { text: 'Vue常考面试题', link: '/面试题库/Vue.md' },
        ],
      },
      {
        text: 'CSS',
        items: [
          { text: 'CSS常用代码片段', link: '/CSS/CSS常用代码片段/' }
        ],
      },
      {
        text: 'JavaScript',
        items: [
          { text: 'JavaScript常用代码片段', link: '/JavaScript/JavaScript常用代码片段/' },
          {
            text: 'JavaScript高级程序设计',
            link: '/JavaScript/JavaScript高级程序设计/',
          },
          { text: '深入理解ES6', link: '/JavaScript/ES6/' },
          { text: '正则表达式', link: '/JavaScript/正则表达式/' }
        ],
      },
      {
        text: 'Vue',
        items: [
          { text: 'Vue使用', link: '/vue/vue使用/' },
          { text: 'Vue技巧', link: '/vue/vue技巧/' },
					{ text: 'Vue源码解析', link: '/vue/vue源码解析/' },
        ],
      },
      { text: '小程序', items: [{ text: '小程序', link: '/小程序/' }] },
      {
        text: '前端工具',
        items: [
          { text: 'Git', link: '/前端工具/git/' },
          { text: 'webpack', link: '/前端工具/webpack/' },
          { text: 'chrome调试', link: '/前端工具/chrome调试/' },
          { text: 'linux命令', link: '/前端工具/linux命令/' },
        ],
      },
      {
        text: 'TypeScript',
        items: [{ text: 'TypeScript', link: '/TypeScript/' }],
      },
      {
        text: 'Node.js',
        items: [
          {
            text: 'Node.js从零开发Web Server博客项目',
            link:
              '/Node.js/Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备/',
          },
          {
            text: 'Node.js+KOA2 从0到1打造超好用Web框架一步到位',
            link:
              '/Node.js/Node.js+KOA2 从0到1打造超好用Web框架一步到位 掌握KOA2服务端开发/',
          },
          {
            text: 'Vue全家桶+SSR+Koa2全栈开发美团网',
            link:
              '/Node.js/Vue全家桶+SSR+Koa2全栈开发美团网/',
          }
        ],
      },
    ],
  },
};
