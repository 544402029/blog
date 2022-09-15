<template><div><h1 id="计算机网络必知必会" tabindex="-1"><a class="header-anchor" href="#计算机网络必知必会" aria-hidden="true">#</a> 计算机网络必知必会</h1>
<blockquote>
<p>本文由阅读《<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=837&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=7266" target="_blank" rel="noopener noreferrer">计算机网络必知必会<ExternalLinkIcon/></a>》记录笔记，有兴趣可阅读原版教程。</p>
</blockquote>
<h2 id="传输层协议-tcp-tcp-为什么握手是-3-次、挥手是-4-次" tabindex="-1"><a class="header-anchor" href="#传输层协议-tcp-tcp-为什么握手是-3-次、挥手是-4-次" aria-hidden="true">#</a> 传输层协议 TCP：TCP 为什么握手是 3 次、挥手是 4 次？</h2>
<h3 id="tcp-协议" tabindex="-1"><a class="header-anchor" href="#tcp-协议" aria-hidden="true">#</a> TCP 协议</h3>
<p><strong>TCP（Transport Control Protocol）是一个传输层协议，提供 Host-To-Host 数据的可靠传输，支持全双工，是一个连接导向的协议。</strong></p>
<h4 id="主机到主机-host-to-host" tabindex="-1"><a class="header-anchor" href="#主机到主机-host-to-host" aria-hidden="true">#</a> 主机到主机（Host-To-Host）</h4>
<p><strong>TCP 提供的是 Host-To-Host 传输，一台主机通过 TCP 发送数据给另一台主机</strong>。这里的主机（Host）是一个抽象的概念，可以是手机、平板、手表等。收发数据的设备都是主机，所以双方是平等的。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220818144749540.png" alt="image-20220818144749540"></p>
<p>**TCP 协议往上是应用到应用（Application-To-Application）的协议。**什么是应用到应用的协议呢？比如你用微信发信息给张三，你的微信客户端、微信聊天服务都是应用。微信有自己的聊天协议，微信的聊天协议是应用到应用的协议；如果微信的聊天协议想要工作，就需要一个主机到主机的协议帮助它实现通信。</p>
<p>而 TCP 上层有太多的应用，不仅仅有微信，还有原神、抖音、网易云音乐……因此 TCP 上层的应用层协议使用 TCP 能力的时候，需要告知 TCP 是哪个应用——这就是**==端口号。端口号用于区分应用==**，下文中我们还会详细讨论。</p>
<p>TCP 要实现主机到主机通信，就需要知道主机们的<strong>网络地址（IP 地址）</strong>，但是 TCP 不负责实际地址到地址（Address-To-Address）的传输，因此 TCP 协议把 IP 地址给底层的互联网层处理。</p>
<p><strong>互联网层，也叫网络层（Network Layer），提供地址到地址的通信</strong>，IP 协议就在这一层工作。<strong>互联网层解决地址到地址的通信，但是不负责信号在具体两个设备间传递</strong>。因此，<strong>网络层会调用下方的==链路层==在两个相邻设备间传递信息</strong>。当信号在两个设备间传递的时候，科学家又设计出了<strong>物理层封装最底层的物理设备、传输介质</strong>等，由最下方的<strong>物理层提供最底层的传输能力</strong>。</p>
<p>以上的 5 层架构，我们称为<strong>互联网协议群</strong>，也称作 <strong>TCP/IP 协议群</strong>。总结下，<strong>主机到主机（Host-To-Host）为应用提供应用间通信的能力。</strong></p>
<h3 id="什么是连接和会话" tabindex="-1"><a class="header-anchor" href="#什么是连接和会话" aria-hidden="true">#</a> 什么是连接和会话？</h3>
<p>下一个关联的概念是<strong>连接（Connection）——连接是数据传输双方的契约。</strong></p>
<p>连接是通信双方的一个约定，目标是让两个在通信的程序之间产生一个默契，保证两个程序都在线，而且尽快地响应对方的请求，这就是<strong>连接（Connection）</strong>。</p>
</div></template>


