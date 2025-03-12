import{_ as s,c as n,o as a,a3 as p}from"./chunks/framework.47i9LX9H.js";const _=JSON.parse('{"title":"面试题合集2025","description":"","frontmatter":{},"headers":[],"relativePath":"面试题库/面试题合集2025.md","filePath":"面试题库/面试题合集2025.md"}'),l={name:"面试题库/面试题合集2025.md"},e=p(`<h1 id="面试题合集2025" tabindex="-1">面试题合集2025 <a class="header-anchor" href="#面试题合集2025" aria-label="Permalink to &quot;面试题合集2025&quot;">​</a></h1><h2 id="做一下自我介绍" tabindex="-1">做一下自我介绍 <a class="header-anchor" href="#做一下自我介绍" aria-label="Permalink to &quot;做一下自我介绍&quot;">​</a></h2><p>您好，我叫***，前端开发，有6年的工作经验。之前做的是一个偏向金融的CRM管理系统，主要用的技术栈是Vue。</p><p>平时的话也会学习新技术，写写自己的博客之类的。目标是想成为一名全栈工程师。</p><h2 id="你的职业规划是什么" tabindex="-1">你的职业规划是什么？ <a class="header-anchor" href="#你的职业规划是什么" aria-label="Permalink to &quot;你的职业规划是什么？&quot;">​</a></h2><p>近3年的话想深入学习一下python后端方面的知识。</p><p>长期来说的话打算会学习一下UI设计，运维相关知识。</p><p>尽量在5年之内成为一名成熟的全栈工程师。</p><h2 id="项目中遇到的困难" tabindex="-1">项目中遇到的困难？ <a class="header-anchor" href="#项目中遇到的困难" aria-label="Permalink to &quot;项目中遇到的困难？&quot;">​</a></h2><p>之前我们做过一个pc端打电话的功能。</p><p>手机端采用uniapp，pc是网页。两者使用socket进行通信，pc端点击拨打电话后手机进行拨打，然后将通话状态传递给PC端展示。</p><p><strong>第一个难的点就是权限</strong></p><p>为了保证通话录音正常，我们需要获取通话状态、通话记录、通讯录、存储、电池保活等这些权限。</p><p>然后就是对不同品牌的手机还要检测自动录音是不是开启了，没开启的话打开对应设置界面。</p><p>还有一个是录音文件，它必须拷贝到公共目录进行读取上传。（这里也是折腾了比较久的。）</p><p><strong>还有就是保活，这个是最难的</strong></p><p>（由于安卓新版本对保活控制越来越严格，保活越来越困难。大厂可以通过合作，让手机厂商将其加入到手机系统保活白名单）</p><p>一方面我们通过原生安卓的intent来检测是否忽略电池优化，没有忽略的话打开相应设置界面。</p><p>还有就是引入一个保活插件提高保活率。（这是一个作者开发的，它里边用了双守护，1像素锁屏显示等来提高保活。）</p><p>（未使用：背景音乐保活，常驻通知栏等。）</p><p>socket使用心跳检测保证活跃。</p><p><strong>还有一个是系统兼容,这个比较麻烦</strong></p><p>比如华为录音文件lastModified（最后修改时间）为创建时间，其它系统为结束时间。（通过录音时长计算得到录音结束时间，以便匹配录音文件。）</p><p>鸿蒙系统录音文件无法读取，需要把targetSdkVersion 降到 28，安卓9。</p><p>OPPO只要手机号已经存在联系人里边，录音文件就只有姓名，没有手机号。通过手机号在联系人里边找，找到后在录音文件名称里加上电话号码以便录音文件匹配。）</p><p>小米系统默认开启空白通行证后没办法读取通话状态，而且无法检测该权限给用户提示。为了兼容换成读取通话记录，当它多出后认为通话结束。查找录音文件。</p><p><strong>服务器性能：</strong></p><p>三端频繁通信带来的服务器压力，特别是多标签页导致的socket重复连接问题，我们在前端采用了shareWorker技术统一管理socket操作，从而减轻了服务器压力。</p><h2 id="讲讲diff算法" tabindex="-1">讲讲diff算法？ <a class="header-anchor" href="#讲讲diff算法" aria-label="Permalink to &quot;讲讲diff算法？&quot;">​</a></h2><p>首先我们要对比前后两个节点是不是一样的，不一样的话就替换。</p><p>一样的话，我们就对比他们的子节点，子节点对比总共分为九种情况。文本，数组，空两两交叉组合。</p><p>我们主要对比数组与数组的情况，其它八种基本都是删除，更新这种。</p><p>对于数组与数组的情况，diff算法首先从头部逐个匹配节点，然后尾部，一样的话就patch更新。</p><p>结束后老节点如果有多的就移除，如果缺少就挂载。</p><p>在这个过程中，可能会遇到节点顺序变化的情况。为了尽量减少DOM性能消耗，diff算法采用了最长递增子序列（LIS）的方法来识别那些不需要移动的节点。通过这种方式，我们可以确定哪些节点可以直接复用，哪些节点需要移动到正确的位置。</p><h2 id="递增子序列实现" tabindex="-1">递增子序列实现 <a class="header-anchor" href="#递增子序列实现" aria-label="Permalink to &quot;递增子序列实现&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 2 5 8 9 7 4 6 11</span></span>
<span class="line"><span>// 最长的子序列是多少个 长度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 贪心算法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 我们找序列中最有潜力的那一个，比最后一个大的，直接放到队列中，如果比最后一个小</span></span>
<span class="line"><span>// 则将它替换到队伍中比他第一个大的那一项（二分查找）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2 3  （更有潜力）</span></span>
<span class="line"><span>// 2 5</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 贪心算法+二分查找+追溯</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2 （2的前一个是null）</span></span>
<span class="line"><span>// 2 5 （5的前一个是2）</span></span>
<span class="line"><span>// 2 5 8 （8的前一个是5）</span></span>
<span class="line"><span>// 2 5 8 9 （9的前一个是8）</span></span>
<span class="line"><span>// 2 5 8 9 7  （❌7无法放到9后边）</span></span>
<span class="line"><span>// 2 5 7 9 （7去找比自己大的那一项替换，虽然错误，但我们找的是后面更有潜力的。序列长度是不会错的，7的前一个是5）</span></span>
<span class="line"><span>// 2 5 7 9 11 （11的前一个是9）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 追溯</span></span>
<span class="line"><span>// 2 5 8 9 11  = 5</span></span>
<span class="line"><span>function getSeq(arr) {</span></span>
<span class="line"><span>    let result = [0]</span></span>
<span class="line"><span>    const len = arr.length // 总长度</span></span>
<span class="line"><span>    let resultLastIndex</span></span>
<span class="line"><span>    let start</span></span>
<span class="line"><span>    let end</span></span>
<span class="line"><span>    let middle = 0</span></span>
<span class="line"><span>    let p = arr.slice(0).fill(0)</span></span>
<span class="line"><span>    for (let i = 0; i &lt; len; i++) {</span></span>
<span class="line"><span>        const arrI = arr[i]</span></span>
<span class="line"><span>        if (arrI != 0) {</span></span>
<span class="line"><span>            // 获取队列中的最后一项</span></span>
<span class="line"><span>            resultLastIndex = result[result.length - 1]</span></span>
<span class="line"><span>            if (arr[resultLastIndex] &lt; arrI) {</span></span>
<span class="line"><span>                result.push(i)</span></span>
<span class="line"><span>                p[i] = resultLastIndex</span></span>
<span class="line"><span>                continue</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // ..替换</span></span>
<span class="line"><span>            start = 0</span></span>
<span class="line"><span>            end = result.length - 1</span></span>
<span class="line"><span>            while (start &lt; end) { // 折半 查找</span></span>
<span class="line"><span>                middle = Math.floor((start + end) / 2)</span></span>
<span class="line"><span>                // 中间那一项的值</span></span>
<span class="line"><span>                // 1,2,3,4,6    5</span></span>
<span class="line"><span>                if (arr[result[middle]] &lt; arrI) {</span></span>
<span class="line"><span>                    start = middle + 1</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    end = middle</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (arrI &lt; arr[result[end]]) {</span></span>
<span class="line"><span>                p[i] = result[end - 1]</span></span>
<span class="line"><span>                result[end] = i // 发现最后找到的索引比这一项大，那就用这个索引换掉，因为更有潜力</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    let i = result.length</span></span>
<span class="line"><span>    let last = result[i - 1]</span></span>
<span class="line"><span>    while (i-- &gt; 0) {</span></span>
<span class="line"><span>        result[i] = last</span></span>
<span class="line"><span>        last = p[last]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// console.log(getSeq([1, 2, 3, 4, 5, 0]))</span></span>
<span class="line"><span>console.log(getSeq([2, 3, 1, 5, 9, 4]))</span></span></code></pre></div><h2 id="你的优点和缺点" tabindex="-1">你的优点和缺点？ <a class="header-anchor" href="#你的优点和缺点" aria-label="Permalink to &quot;你的优点和缺点？&quot;">​</a></h2><ul><li><p>优点</p><ul><li><p>有毅力：深入研究Vue.js源码，解决了PC端打电话并上传录音文件的复杂功能。</p></li><li><p>追求完美：接手混乱项目后，优化代码结构，提升可读性和维护性，如将冗长文件拆分、重命名变量以增加意义。</p></li></ul></li><li><p>缺点</p><ul><li>社交能力偏弱: 我不擅长闲聊，但在必要时能够进行有效的沟通以确保工作的顺利进行。</li></ul></li></ul><h2 id="你对ai怎么看" tabindex="-1">你对AI怎么看？ <a class="header-anchor" href="#你对ai怎么看" aria-label="Permalink to &quot;你对AI怎么看？&quot;">​</a></h2><p>我对AI感受很深，从22年开始用ChatGPT和Copilot，这些工具真的改变了我的工作方式。它们不仅能大幅减少编写简单代码的时间，还能帮我们找到解决复杂问题的新思路。我觉得我们应该拥抱AI，无论是直接使用还是结合开发新功能，这里面都是大有可为的。</p>`,41),i=[e];function t(c,r,o,d,h,u){return a(),n("div",null,i)}const g=s(l,[["render",t]]);export{_ as __pageData,g as default};
