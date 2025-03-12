import{_ as s,c as a,o as n,a3 as i}from"./chunks/framework.47i9LX9H.js";const u=JSON.parse('{"title":"后台通用提效解决方案","description":"","frontmatter":{},"headers":[],"relativePath":"前端笔记/后台通用提效解决方案.md","filePath":"前端笔记/后台通用提效解决方案.md"}'),p={name:"前端笔记/后台通用提效解决方案.md"},t=i(`<h1 id="后台通用提效解决方案" tabindex="-1">后台通用提效解决方案 <a class="header-anchor" href="#后台通用提效解决方案" aria-label="Permalink to &quot;后台通用提效解决方案&quot;">​</a></h1><h2 id="编程规范" tabindex="-1">编程规范 <a class="header-anchor" href="#编程规范" aria-label="Permalink to &quot;编程规范&quot;">​</a></h2><h3 id="git-提交格式" tabindex="-1">git 提交格式 <a class="header-anchor" href="#git-提交格式" aria-label="Permalink to &quot;git 提交格式&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 可选类型</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  types: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;feat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;feat:     新功能&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;fix&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;fix:      修复&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs:     文档变更&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;style&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;style:    代码格式(不影响代码运行的变动)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;refactor&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;refactor: 重构(既不是增加feature，也不是修复bug)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;perf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;perf:     性能优化&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test:     增加测试&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;chore&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;chore:    构建过程或辅助工具的变动&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;revert&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;revert:   回退&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;build&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;build:    打包&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 消息步骤</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  messages: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;请选择提交类型:&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    customScope: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;请输入修改范围(可选):&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;请简要描述提交(必填):&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    body: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;请输入详细描述(可选):&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    footer: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;请输入要关闭的issue(可选):&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    confirmCommit: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;确认使用以上信息提交？(y/n/e/h)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 跳过问题</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  skipQuestions: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;body&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;footer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // subject文字长度默认是72</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  subjectLimit: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">72</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><h3 id="vscode-保存自动格式化" tabindex="-1">vscode 保存自动格式化 <a class="header-anchor" href="#vscode-保存自动格式化" aria-label="Permalink to &quot;vscode 保存自动格式化&quot;">​</a></h3><h4 id="eslint" tabindex="-1">eslint <a class="header-anchor" href="#eslint" aria-label="Permalink to &quot;eslint&quot;">​</a></h4><h2 id="zip下载" tabindex="-1">zip下载 <a class="header-anchor" href="#zip下载" aria-label="Permalink to &quot;zip下载&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>这里输入代码</span></span></code></pre></div><p>VSCode 进行扩展设置，依次点击 文件 &gt; 首选项 &gt; 设置 打开 VSCode 配置文件,添加如下配置 此种方式只能做一些简单的格式化。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>    &quot;files.autoSave&quot;:&quot;off&quot;,</span></span>
<span class="line"><span>    &quot;eslint.validate&quot;: [</span></span>
<span class="line"><span>       &quot;javascript&quot;,</span></span>
<span class="line"><span>       &quot;javascriptreact&quot;,</span></span>
<span class="line"><span>       &quot;html&quot;,</span></span>
<span class="line"><span>       { &quot;language&quot;: &quot;vue&quot;, &quot;autoFix&quot;: true }</span></span>
<span class="line"><span>     ],</span></span>
<span class="line"><span>     &quot;eslint.options&quot;: {</span></span>
<span class="line"><span>        &quot;plugins&quot;: [&quot;html&quot;]</span></span>
<span class="line"><span>     }</span></span></code></pre></div><h4 id="prettier" tabindex="-1">prettier <a class="header-anchor" href="#prettier" aria-label="Permalink to &quot;prettier&quot;">​</a></h4><p>在 VsCode 安装 prettier 插件，安装后在项目根目录下创建.prettierrc 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>&quot;semi&quot;: false,</span></span>
<span class="line"><span>&quot;singleQuote&quot;: true,</span></span>
<span class="line"><span>&quot;trailingComma&quot;: &quot;none&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可设置不同的规则，详见文档。</p><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/save.png" alt="输入图片说明"> 勾选 VsCode 的保存格式化选项。 在配置完成后可在项目文件内右键配置默认的格式化程序，此后便可以保存立即进行格式化了。 <img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/geshihua.png" alt="输入图片说明"></p><h3 id="git-提交自动格式化" tabindex="-1">git 提交自动格式化 <a class="header-anchor" href="#git-提交自动格式化" aria-label="Permalink to &quot;git 提交自动格式化&quot;">​</a></h3><h4 id="husky" tabindex="-1">husky <a class="header-anchor" href="#husky" aria-label="Permalink to &quot;husky&quot;">​</a></h4><p><a href="https://github.com/typicode/husky" target="_blank" rel="noreferrer">husky</a>：是<code>git hooks</code>工具。 注意：<strong><code>npm</code> 需要在 7.x 以上版本！！！！！</strong></p><ol><li>安装依赖：</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>npm install husky@7.0.1 --save-dev</span></span></code></pre></div><ol start="2"><li>启动 <code>hooks</code> ， 生成 <code>.husky</code> 文件夹</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>npx husky install</span></span></code></pre></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/husky.png" alt="输入图片说明"></p><ol start="3"><li>在 <code>package.json</code> 中生成 <code>prepare</code> 指令（ <strong>需要 npm &gt; 7.0 版本</strong> ）</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>npm set-script prepare &quot;husky install&quot;</span></span></code></pre></div><p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/laiba.png" alt="输入图片说明"></p><ol start="4"><li>执行 <code>prepare</code> 指令</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>npm run prepare</span></span></code></pre></div><ol start="5"><li>执行成功，提示 <img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/buxiangguanr.png" alt="输入图片说明"></li><li>执行 <code>npx husky add .husky/pre-commit &quot;npx eslint --ext .js,.vue src&quot;</code> 添加 <code>commit</code> 时的 <code>hook</code> （<code>npx eslint --ext .js,.vue src</code> 会在执行到该 hook 时运行）</li><li>该操作会生成对应文件 <code>pre-commit</code>： <img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/permmmit.png" alt="输入图片说明"></li><li>修改 <code>package.json</code> 配置</li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;lint-staged&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;src/**/*.{js,vue}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;eslint --fix&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;git add&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span></code></pre></div><ol start="9"><li>如上配置，每次它只会在你本地 <code>commit</code> 之前，校验你提交的内容是否符合你本地配置的 <code>eslint</code>规则(这个见文档 <a href="https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/eslint.html" target="_blank" rel="noreferrer">ESLint</a> )，校验会出现两种结果：</li><li>如果符合规则：则会提交成功。</li><li>如果不符合规则：它会自动执行 <code>eslint --fix</code> 尝试帮你自动修复，如果修复成功则会帮你把修复好的代码提交，如果失败，则会提示你错误，让你修好这个错误之后才能允许你提交代码。</li><li>修改 <code>.husky/pre-commit</code> 文件</li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">. </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$(dirname &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;)/_/husky.sh&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npx lint</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">staged</span></span></code></pre></div><h2 id="zip下载-1" tabindex="-1">zip下载 <a class="header-anchor" href="#zip下载-1" aria-label="Permalink to &quot;zip下载&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { saveAs } from &#39;file-saver&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import JSZip from &#39;jszip&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function export_txt_to_zip(th, jsonData, txtName, zipName) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const zip = new JSZip()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const txt_name = txtName || &#39;file&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const zip_name = zipName || &#39;file&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const data = jsonData</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let txtData = \`\${th}\\r\\n\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  data.forEach((row) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let tempStr = &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    tempStr = row.toString()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    txtData += \`\${tempStr}\\r\\n\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  zip.file(\`\${txt_name}.txt\`, txtData)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  zip.generateAsync({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    type: &quot;blob&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }).then((blob) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    saveAs(blob, \`\${zip_name}.zip\`)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }, (err) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    alert(&#39;导出失败&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div>`,34),l=[t];function e(h,o,k,c,r,d){return n(),a("div",null,l)}const g=s(p,[["render",e]]);export{u as __pageData,g as default};
