<template><div><h1 id="后台通用提效解决方案" tabindex="-1"><a class="header-anchor" href="#后台通用提效解决方案" aria-hidden="true">#</a> 后台通用提效解决方案</h1>
<h2 id="编程规范" tabindex="-1"><a class="header-anchor" href="#编程规范" aria-hidden="true">#</a> 编程规范</h2>
<h3 id="git-提交格式" tabindex="-1"><a class="header-anchor" href="#git-提交格式" aria-hidden="true">#</a> git 提交格式</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 可选类型</span>
  <span class="token literal-property property">types</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"feat"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"feat:     新功能"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"fix"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"fix:      修复"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"docs"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"docs:     文档变更"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"style"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"style:    代码格式(不影响代码运行的变动)"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"refactor"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"refactor: 重构(既不是增加feature，也不是修复bug)"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"perf"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"perf:     性能优化"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"test"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"test:     增加测试"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"chore"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"chore:    构建过程或辅助工具的变动"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"revert"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"revert:   回退"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"build"</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"build:    打包"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 消息步骤</span>
  <span class="token literal-property property">messages</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"请选择提交类型:"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">customScope</span><span class="token operator">:</span> <span class="token string">"请输入修改范围(可选):"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">subject</span><span class="token operator">:</span> <span class="token string">"请简要描述提交(必填):"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token string">"请输入详细描述(可选):"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">footer</span><span class="token operator">:</span> <span class="token string">"请输入要关闭的issue(可选):"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">confirmCommit</span><span class="token operator">:</span> <span class="token string">"确认使用以上信息提交？(y/n/e/h)"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 跳过问题</span>
  <span class="token literal-property property">skipQuestions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"body"</span><span class="token punctuation">,</span> <span class="token string">"footer"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// subject文字长度默认是72</span>
  <span class="token literal-property property">subjectLimit</span><span class="token operator">:</span> <span class="token number">72</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vscode-保存自动格式化" tabindex="-1"><a class="header-anchor" href="#vscode-保存自动格式化" aria-hidden="true">#</a> vscode 保存自动格式化</h3>
<h4 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> eslint</h4>
<h2 id="zip下载" tabindex="-1"><a class="header-anchor" href="#zip下载" aria-hidden="true">#</a> zip下载</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>这里输入代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>VSCode 进行扩展设置，依次点击 文件 &gt; 首选项 &gt; 设置 打开 VSCode 配置文件,添加如下配置
此种方式只能做一些简单的格式化。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
    "files.autoSave":"off",
    "eslint.validate": [
       "javascript",
       "javascriptreact",
       "html",
       { "language": "vue", "autoFix": true }
     ],
     "eslint.options": {
        "plugins": ["html"]
     }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> prettier</h4>
<p>在 VsCode 安装 prettier 插件，安装后在项目根目录下创建.prettierrc 文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
{
"semi": false,
"singleQuote": true,
"trailingComma": "none"
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可设置不同的规则，详见文档。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/save.png" alt="输入图片说明">
勾选 VsCode 的保存格式化选项。
在配置完成后可在项目文件内右键配置默认的格式化程序，此后便可以保存立即进行格式化了。
<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/geshihua.png" alt="输入图片说明"></p>
<h3 id="git-提交自动格式化" tabindex="-1"><a class="header-anchor" href="#git-提交自动格式化" aria-hidden="true">#</a> git 提交自动格式化</h3>
<h4 id="husky" tabindex="-1"><a class="header-anchor" href="#husky" aria-hidden="true">#</a> husky</h4>
<p><a href="https://github.com/typicode/husky" target="_blank" rel="noopener noreferrer">husky<ExternalLinkIcon/></a>：是<code v-pre>git hooks</code>工具。
注意：<strong><code v-pre>npm</code> 需要在 7.x 以上版本！！！！！</strong></p>
<ol>
<li>安装依赖：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
npm install husky@7.0.1 --save-dev

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>启动 <code v-pre>hooks</code> ， 生成 <code v-pre>.husky</code> 文件夹</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
npx husky install

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/husky.png" alt="输入图片说明"></p>
<ol start="3">
<li>在 <code v-pre>package.json</code> 中生成 <code v-pre>prepare</code> 指令（ <strong>需要 npm &gt; 7.0 版本</strong> ）</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
npm set-script prepare "husky install"

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/laiba.png" alt="输入图片说明"></p>
<ol start="4">
<li>执行 <code v-pre>prepare</code> 指令</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
npm run prepare

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>执行成功，提示
<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/buxiangguanr.png" alt="输入图片说明"></li>
<li>执行 <code v-pre>npx husky add .husky/pre-commit &quot;npx eslint --ext .js,.vue src&quot;</code> 添加 <code v-pre>commit</code> 时的 <code v-pre>hook</code> （<code v-pre>npx eslint --ext .js,.vue src</code> 会在执行到该 hook 时运行）</li>
<li>该操作会生成对应文件 <code v-pre>pre-commit</code>：
<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/permmmit.png" alt="输入图片说明"></li>
<li>修改 <code v-pre>package.json</code> 配置</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string-property property">"lint-staged"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"src/**/*.{js,vue}"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"eslint --fix"</span><span class="token punctuation">,</span>
      <span class="token string">"git add"</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="9">
<li>如上配置，每次它只会在你本地 <code v-pre>commit</code> 之前，校验你提交的内容是否符合你本地配置的 <code v-pre>eslint</code>规则(这个见文档 <a href="https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/eslint.html" target="_blank" rel="noopener noreferrer">ESLint<ExternalLinkIcon/></a> )，校验会出现两种结果：</li>
<li>如果符合规则：则会提交成功。</li>
<li>如果不符合规则：它会自动执行 <code v-pre>eslint --fix</code> 尝试帮你自动修复，如果修复成功则会帮你把修复好的代码提交，如果失败，则会提示你错误，让你修好这个错误之后才能允许你提交代码。</li>
<li>修改 <code v-pre>.husky/pre-commit</code> 文件</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token hashbang comment">#!/bin/sh</span>
<span class="token punctuation">.</span> <span class="token string">"$(dirname "</span>$0<span class="token string">")/_/husky.sh"</span>

npx lint<span class="token operator">-</span>staged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="zip下载-1" tabindex="-1"><a class="header-anchor" href="#zip下载-1" aria-hidden="true">#</a> zip下载</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>import { saveAs } from 'file-saver'

import JSZip from 'jszip'



export function export_txt_to_zip(th, jsonData, txtName, zipName) {

  const zip = new JSZip()

  const txt_name = txtName || 'file'

  const zip_name = zipName || 'file'

  const data = jsonData

  let txtData = `${th}\r\n`

  data.forEach((row) => {

    let tempStr = ''

    tempStr = row.toString()

    txtData += `${tempStr}\r\n`

  })

  zip.file(`${txt_name}.txt`, txtData)

  zip.generateAsync({

    type: "blob"

  }).then((blob) => {

    saveAs(blob, `${zip_name}.zip`)

  }, (err) => {

    alert('导出失败')

  })

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


