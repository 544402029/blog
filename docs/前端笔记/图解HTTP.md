# 图解HTTP

## 了解 Web 及网络基础

### TCP/IP 的分层管理



TCP/IP 协议族里重要的一点就是分层。TCP/IP 协议族按层次分别分 为以下 4 层：**应用层、传输层、网络层和数据链路层。**
把 TCP/IP 层次化是有好处的。比如，如果互联网只由一个协议统 筹，某个地方需要改变设计时，就必须把所有部分整体替换掉。而分 层之后只需把变动的层替换掉即可。**把各层之间的接口部分规划好之 后，每个层次内部的设计就能够自由改动了。 **
值得一提的是，层次化之后，设计也变得相对简单了。处于应用层上 的应用可以只考虑分派给自己的任务，而不需要弄清对方在地球上哪 个地方、对方的传输路线是怎样的、是否能确保传输送达等问题。

TCP/IP 协议族各层的作用如下。

##### 应用层

**应用层决定了向用户提供应用服务时通信的活动。**
TCP/IP 协议族内预存了各类通用的应用服务。比如，FTP（File Transfer Protocol，文件传输协议）和 DNS（Domain Name System，域名系统）服务就是其中两类。**HTTP 协议也处于该层。**

##### 传输层

**传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。**
**在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和 UDP（User Data Protocol，用户数据报协议）。**

##### 网络层（又名网络互连层）

**网络层用来处理在网络上流动的数据包**。
数据包是网络传输的最小数据单位。该层规定了通过怎样的路径（所谓的传输路线）到达对方计算机，并把数据包传送给对方。
与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所起的作用就是在众多的选项内选择一条传输路线。

##### 链路层（又名数据链路层，网络接口层）

**用来处理连接网络的硬件部分。**包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）。硬件上的范畴均在链路层的作用范围之内。

#### TCP/IP 通信传输流

![image-20220804150227500](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150227500.png)

利用 TCP/IP 协议族进行网络通信时，会通过分层顺序与对方进行通 信。发送端从应用层往下走，接收端则往应用层往上走。  
我们用 HTTP 举例来说明，首先作为发送端的客户端在应用层（HTTP 协议）发出一个想看某个 Web 页面的 HTTP 请求。
接着，为了传输方便，在传输层（TCP 协议）把从应用层处收到的数据（HTTP 请求报文）进行分割，并在各个报文上打上标记序号及端口号后转发给网络层。
在网络层（IP 协议），增加作为通信目的地的 MAC 地址后转发给链路层。
这样一来，发往网络的通信请求就准备齐全了。
接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。
当传输到应用层，才能算真正接收到由客户端发送过来的 HTTP 请求。
![image-20220804150245762](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150245762.png)

发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。
反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去。
这种把数据信息包装起来的做法称为封装（encapsulate）。

### 与 HTTP 关系密切的协议 : IP、TCP 和 DNS

#### IP

IP 协议的作用是把各种数据包传送给对方。而要保证确实传送到对方 那里，则需要满足各类条件。其中两个重要的条件是 IP 地址和 MAC 地址（Media Access Control Address）。  
IP 地址指明了节点被分配到的地址，MAC 地址是指网卡所属的固定 地址。IP 地址可以和 MAC 地址进行配对。IP 地址可变换，但 MAC 地址基本上不会更改。

ARP 协议

IP 间的通信依赖 MAC 地址。在网络上，通信的双方在同一局域网 （LAN）内的情况是很少的，通常是经过多台计算机和网络设备中转 才能连接到对方。而在进行中转时，会利用下一站中转设备的 MAC 地址来搜索下一个中转目标。这时，会采用 ARP 协议（Address Resolution Protocol）。**ARP 是一种用以解析地址的协议，根据通信方 的 IP 地址就可以反查出对应的 MAC 地址。 **

![image-20220804150309479](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150309479.png)

#### TCP 协议

按层次分，TCP 位于传输层，提供可靠的字节流服务。
所谓的字节流服务（Byte Stream Service）是指，为了方便传输，将大 块数据分割成以报文段（segment）为单位的数据包进行管理。而可 靠的传输服务是指，能够把数据准确可靠地传给对方。一言以蔽之， **TCP 协议为了更容易传送大数据才把数据分割，而且 TCP 协议能够 确认数据最终是否送达到对方。 **

为了准确无误地将数据送达目标处，TCP 协议采用了三次握手 （three-way handshaking）策略。用 TCP 协议把数据包送出去后，TCP 不会对传送后的情况置之不理，它一定会向对方确认是否成功送达。

握手过程中使用了 TCP 的标志（flag） —— **SYN（synchronize） 和 ACK（acknowledgement）**。

**发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后， 回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。 **

若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发 送相同的数据包。

![image-20220804150325875](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150325875.png)

除了上述三次握手，TCP 协议还有其他各种手段来保证通信的可靠性。

### 负责域名解析的 DNS 服务

DNS（Domain Name System）服务是和 HTTP 协议一样位于应用层的 协议。它**提供域名到 IP 地址之间的解析服务。**
计算机既可以被赋予 IP 地址，也可以被赋予主机名和域名。比如 [www.hackr.jp](https://www.hackr.jp)。

![image-20220804150339898](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150339898.png)

### 各种协议与 HTTP 协议的关系

![image-20220804150359073](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150359073.png)

### URI 和 URL

与 URI（统一资源标识符）相比，我们更熟悉 URL（Uniform Resource Locator，统一资源定位符）。URL 正是使用 Web 浏览器等 访问 Web 页面时需要输入的网页地址。

#### 统一资源标识符

URI 就是由某个协议方案表示的资源的定位标识符。协议 方案是指访问资源所使用的协议类型名称。

URI 用字符串标识某一互联网资源，而 URL 表示资源的地点（互联网上所处的位置）。可见 URL 是 URI 的子集。



## 简单的 HTTP 协议

### 请求报文

请求报文是由请求方法、请求 URI、协议版本、可选的请求首部字段 和内容实体构成的。  
![image-20220804150426961](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150426961.png)

### 响应报文

响应报文基本上由协议版本、状态码（表示请求成功或失败的数字代 码）、用以解释状态码的原因短语、可选的响应首部字段以及实体主 体构成。

![image-20220804150441612](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150441612.png)

### HTTP 是不保存状态的协议

HTTP 是一种不保存状态，即无状态（stateless）协议。HTTP 协议自身不对请求和响应之间的通信状态进行保存。也就是说在 HTTP 这个 级别，协议对于发送过的请求或响应都不做持久化处理。  
![image-20220804150534050](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150534050.png)

### 告知服务器意图的 HTTP 方法

1.  GET ：获取资源
1.  POST：传输实体主体
1.  PUT：传输文件
1.  HEAD：获得报文首部
1.  DELETE：删除文件
1.  OPTIONS：询问支持的方法
1.  TRACE：追踪路径
1.  CONNECT：要求用隧道协议连接代理

![image-20220804150544137](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150544137.png)

### 持久连接

HTTP 协议的初始版本中，每进行一次 HTTP 通信就要断开一次 TCP 连接。

#### 持久连接

为解决上述 TCP 连接的问题，HTTP/1.1 和一部分的 HTTP/1.0 想出了 持久连接（HTTP Persistent Connections，也称为 HTTP keep-alive 或 HTTP connection reuse）的方法。**持久连接的特点是，只要任意一端 没有明确提出断开连接，则保持 TCP 连接状态。 **
在 HTTP/1.1 中，所有的连接默认都是持久连接，但在 HTTP/1.0 内并 未标准化。虽然有一部分服务器通过非标准的手段实现了持久连接， 但服务器端不一定能够支持持久连接。毫无疑问，除了服务器端，客 户端也需要支持持久连接。

#### 管线化

持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从 前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术 出现后，不用等待响应亦可直接发送下一个请求。
这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待 响应了。  
![image-20220804150558365](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150558365.png)

## HTTP 报文内的 HTTP 信息

### HTTP 报文

用于 HTTP 协议交互的信息被称为 HTTP 报文。请求端（客户端）的 HTTP 报文叫做请求报文，响应端（服务器端）的叫做响应报文。 HTTP 报文本身是由多行（用 CR+LF 作换行符）数据构成的字符串文 本。 HTTP 报文大致可分为报文首部和报文主体两块。两者由最初出现的 空行（CR+LF）来划分。通常，并不一定要有报文主体。

### 请求报文及响应报文的结构

![image-20220804150609948](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150609948.png)

图：请求报文（上）和响应报文（下）的结构

![image-20220804150619767](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150619767.png)





请求报文和响应报文的首部内容由以下数据组成。现在出现的各种首 部字段及状态码稍后会进行阐述。


- 请求行： 包含用于请求的方法，请求 URI 和 HTTP 版本。 
- 状态行： 包含表明响应结果的状态码，原因短语和 HTTP 版本。 
- 首部字段： 包含表示请求和响应的各种条件和属性的各类首部。
- 一般有 4 种首部，分别是：通用首部、请求首部、响应首部和实体首部。
- 其他： 可能包含 HTTP 的 RFC 里未定义的首部（Cookie 等）。

#### 压缩传输的内容编码

向待发送邮件内增加附件时，为了使邮件容量变小，我们会先用 ZIP压缩文件之后再添加附件发送。HTTP 协议中有一种被称为内容编码
的功能也能进行类似的操作。

![image-20220804150632609](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150632609.png)

常用的内容编码有以下几种。

- gzip（GNU zip）
- compress（UNIX 系统的标准压缩）
- deflate（zlib）
- identity（不进行编码）

#### 分割发送的分块传输编码

在 HTTP 通信过程中，请求的编码实体资源尚未全部传输完成之前，浏览器无法显示请求页面。在传输大容量数据时，通过把数据分割成
多块，能够让浏览器逐步显示页面。

这种把实体主体分块的功能称为分块传输编码（Chunked TransferCoding）。

![image-20220804150734653](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150734653.png)

分块传输编码会将实体主体分成多个部分（块）。每一块都会用十六进制来标记块的大小，而实体主体的最后一块会使用“0(CR+LF)”来标
记。

使用分块传输编码的实体主体会由接收的客户端负责解码，恢复到编码前的实体主体。

HTTP/1.1 中存在一种称为传输编码（Transfer Coding）的机制，它可以在通信时按某种编码方式传输，但只定义作用于分块传输编码中。

#### 发送多种数据的多部分对象集合

![image-20220804150744918](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150744918.png)

HTTP 协议中也采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体。通常是在图片或文本文件等上传时使用。

- multipart/form-data

  在 Web 表单文件上传时使用。

- multipart/byteranges

  状态码 206（Partial Content，部分内容）响应报文包含了多个范
  围的内容时使用。

- multipart/form-data

  ![image-20220804150804338](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150804338.png)


- multipart/byteranges

  ![image-20220804150828212](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150828212.png)
  ![输入图片说明](C:\Users\Administrator\AppData\Local\static\images\xiaban.png)

在 HTTP 报文中使用多部分对象集合时，需要在首部字段里加上 ** Content-type** 。

### 获取部分内容的范围请求

以前，用户不能使用现在这种高速的带宽访问互联网，当时，下载一个尺寸稍大的图片或文件就已经很吃力了。如果下载过程中遇到网络
中断的情况，那就必须重头开始。为了解决上述问题，需要一种可恢复的机制。所谓恢复是指能从之前下载中断处恢复下载。

要实现该功能需要指定下载的实体范围。像这样，指定范围发送的请求叫做范围请求（Range Request）。

对一份 10 000 字节大小的资源，如果使用范围请求，可以只请求
5001~10 000 字节内的资源。

![image-20220804150852590](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150852590.png)

执行范围请求时，会用到首部字段 Range 来指定资源的 byte 范围。byte 范围的指定形式如下。

- 5001~10 000 字节

  `Range: bytes=5001-10000`

- 从 5001 字节之后全部的

  `Range: bytes=5001-`

- 从一开始到 3000 字节和 5000~7000 字节的多重范围

  `Range: bytes=-3000, 5000-7000`

针对范围请求，响应会返回状态码为 206 Partial Content 的响应报文。另外，对于多重范围的范围请求，响应会在首部字段 ContentType 标明 multipart/byteranges 后返回响应报文。

如果服务器端无法响应范围请求，则会返回状态码 200 OK 和完整的实体内容。


## HTTP 首部

### HTTP 首部字段

#### HTTP 首部字段传递重要信息

使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容。

![image-20220804150905204](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150905204.png)

### HTTP/1.1 通用首部字段

#### Cache-Control

![image-20220804150915316](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150915316.png)

`Cache-Control: private, max-age=0, no-cache`

![image-20220804150923509](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150923509.png)

![image-20220804150932313](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150932313.png)

##### no-cache 指令

![image-20220804150943573](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804150943573.png)

`Cache-Control: no-cache`

使用 no-cache 指令的目的是为了防止从缓存中返回过期的资源。

客户端发送的请求中如果包含 no-cache 指令，则表示客户端将不会接收缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发给源服务器。

如果服务器返回的响应中包含 no-cache 指令，那么缓存服务器不能对资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资源有效性进行确认，且禁止其对响应资源进行缓存操作。

`Cache-Control: no-cache=Location`

由服务器返回的响应中，若报文首部字段 Cache-Control 中对 no-cache 字段名具体指定参数值，那么客户端在接收到这个被指定参数值的首部字段对应的响应报文后，就不能使用缓存。换言之，无参数值的首部字段可以使用缓存。只能在响应指令中指定该参数。

##### 控制可执行缓存的对象的指令

no-store 指令

`Cache-Control: no-store`

当使用 no-store 指令时，暗示请求（和对应的响应）或响应中包含机密信息。

从字面意思上很容易把 no-cache 误解成为不缓存，但事实上 no-cache 代表不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称为 do-not-serve-from-cache-without-revalidation 更合适。no-store 才是真正地不进行缓存，请读者注意区别理解。

因此，该指令规定缓存不能在本地存储请求或响应的任一部分。

##### 指定缓存期限和认证的指令

s-maxage 指令

`Cache-Control: s-maxage=604800（单位 ：秒）`

s-maxage 指令的功能和 max-age 指令的相同，它们的不同点是 s-maxage 指令只适用于供多位用户使用的公共缓存服务器(代理服务器)。也就是
说，对于向同一用户重复返回响应的服务器来说，这个指令没有任何作用。

另外，当使用 s-maxage 指令后，则直接忽略对 Expires 首部字段及 max-age 指令的处理。

#### max-age 指令

![image-20220804151000062](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151000062.png)

`Cache-Control: max-age=604800（单位：秒）`

当客户端发送的请求中包含 max-age 指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。另外，当指定 max-age 值为 0，那么缓存服务器通常需要将请求转发给源服务器。

当服务器返回的响应中包含 max-age 指令时，缓存服务器将不对资源的有效性再作确认，而 max-age 数值代表资源保存为缓存的最长时间。

应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而HTTP/1.0 版本的缓存服务器的情况却相反，max-age 指令会被忽略掉。

##### min-fresh 指令

![image-20220804151010692](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151010692.png)

`Cache-Control: min-fresh=60（单位：秒）`

min-fresh 指令要求缓存服务器返回至少还未过指定时间的缓存资源。

比如，当指定 min-fresh 为 60 秒后，过了 60 秒的资源都无法作为响应返回了。

##### max-stale 指令

`Cache-Control: max-stale=3600（单位：秒）`

使用 max-stale 可指示缓存资源，即使过期也照常接收。
如果指令未指定参数值，那么无论经过多久，客户端都会接收响应；如果指令中指定了具体数值，那么即使过期，只要仍处于 max-stale指定的时间内，仍旧会被客户端接收。

##### only-if-cached 指令

`Cache-Control: only-if-cached`

使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回。换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本地缓存无响应，则返回状态码 504 Gateway Timeout。


##### must-revalidate 指令

`Cache-Control: must-revalidate`

使用 must-revalidate 指令，代理会向源服务器再次验证即将返回的响应缓存目前是否仍然有效。

若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端一条 504（Gateway Timeout）状态码。

另外，使用 must-revalidate 指令会忽略请求的 max-stale 指令（即使已经在首部使用了 max-stale，也不会再有效果）。

##### proxy-revalidate 指令

`Cache-Control: proxy-revalidate`

proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前，必须再次验证缓存的有效性。


##### no-transform 指令

`Cache-Control: no-transform`

使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。

这样做可防止缓存或代理压缩图片等类似操作。


#### Cache-Control 扩展

##### cache-extension token

`Cache-Control: private, community="UCI"`

通过 cache-extension 标记（token），可以扩展 Cache-Control 首部字段内的指令。

如上例，Cache-Control 首部字段本身没有 community 这个指令。借助 extension tokens 实现了该指令的添加。如果缓存服务器不能理解 community 这个新指令，就会直接忽略。因此，extension tokens 仅对能理解它的缓存服务器来说是有意义的。

#### Connection

Connection 首部字段具备如下两个作用。

* 控制不再转发给代理的首部字段
* 管理持久连接
* 控制不再转发给代理的首部字段

![image-20220804151031179](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151031179.png)

在客户端发送请求和服务器返回响应内，使用 Connection 首部字段，可控制不再转发给代理的首部字段（即 Hop-by-hop 首部）。

* 管理持久连接

![image-20220804151040449](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151040449.png)

`Connection: close`

HTTP/1.1 版本的默认连接都是持久连接。为此，客户端会在持久连接上连续发送请求。当服务器端想明确断开连接时，则指定 Connection 首部字段的值为 Close。

![image-20220804151050243](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151050243.png)

`Connection: Keep-Alive`

HTTP/1.1 之前的 HTTP 版本的默认连接都是非持久连接。为此，如果想在旧版本的 HTTP 协议上维持持续连接，则需要指定Connection 首部字段的值为 Keep-Alive。

如上图①所示，客户端发送请求给服务器时，服务器端会像上图②那样加上首部字段 Keep-Alive 及首部字段 Connection 后返回响应。

#### Date

首部字段 Date 表明创建 HTTP 报文的日期和时间。

HTTP/1.1 协议使用在 RFC1123 中规定的日期时间的格式，如下 示例。

`Date: Tue, 03 Jul 2012 04:40:59 GMT`

之前的 HTTP 协议版本中使用在 RFC850 中定义的格式，如下所示。

`Date: Tue, 03-Jul-12 04:40:59 GMT`

除此之外，还有一种格式。它与 C 标准库内的 asctime() 函数的输出格式一致。

`Date: Tue Jul 03 04:40:59 2012`


#### Pragma

Pragma 是 HTTP/1.1 之前版本的历史遗留字段，仅作为与 HTTP/1.0的向后兼容而定义。

规范定义的形式唯一，如下所示。

`Pragma: no-cache`

该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存的资源。

![image-20220804151104910](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151104910.png)

所有的中间服务器如果都能以 HTTP/1.1 为基准，那直接采用 CacheControl: no-cache 指定缓存的处理方式是最为理想的。但要整体掌握
全部中间服务器使用的 HTTP 协议版本却是不现实的。因此，发送的请求会同时含有下面两个首部字段。


```
Cache-Control: no-cache
Pragma: no-cache
```

#### Trailer

![image-20220804151115077](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151115077.png)

首部字段 Trailer 会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在 HTTP/1.1 版本分块传输编码时。

![image-20220804151123452](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151123452.png)

#### Transfer-Encoding

![image-20220804151132300](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151132300.png)

首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。

HTTP/1.1 的传输编码方式仅对分块传输编码有效。



![image-20220804151223650](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151223650.png)



以上用例中，正如在首部字段 Transfer-Encoding 中指定的那样，有效使用分块传输编码，且分别被分成 3312 字节和 914 字节大小的分块数据。


#### Upgrade

首部字段 Upgrade 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。

![image-20220804151234131](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151234131.png)

上图用例中，首部字段 Upgrade 指定的值为 TLS/1.0。请注意此处两个字段首部字段的对应关系，Connection 的值被指定为 Upgrade。Upgrade 首部字段产生作用的 Upgrade 对象仅限于客户端和邻接服务器之间。因此，使用首部字段 Upgrade 时，还需要额外指定Connection:Upgrade。

对于附有首部字段 Upgrade 的请求，服务器可用 101 Switching Protocols 状态码作为响应返回。


#### Via

使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径。

报文经过代理或网关时，会先在首部字段 Via 中附加该服务器的信息，然后再进行转发。这个做法和 traceroute 及电子邮件的 Received
首部的工作机制很类似。

首部字段 Via 不仅用于追踪报文的转发，还可避免请求回环的发生。所以必须在经过代理时附加该首部字段内容。

![image-20220804151244020](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151244020.png)

上图用例中，在经过代理服务器 A 时，Via 首部附加了“1.0 gw.hackr.jp (Squid/3.1)”这样的字符串值。行头的 1.0 是指接收请求的服务器上应用的 HTTP 协议版本。接下来经过代理服务器 B 时亦是如此，在 Via 首部附加服务器信息，也可增加 1 个新的 Via 首部写入服务器信息。

Via 首部是为了追踪传输路径，所以经常会和 TRACE 方法一起使用。比如，代理服务器接收到由 TRACE 方法发送过来的请求（其中Max-Forwards: 0）时，代理服务器就不能再转发该请求了。这种情况下，代理服务器会将自身的信息附加到 Via 首部后，返回该请求的响应。


#### Warning

HTTP/1.1 的 Warning 首部是从 HTTP/1.0 的响应首部（Retry-After）演变过来的。该首部通常会告知用户一些与缓存相关的问题的警告。

`Warning: 113 gw.hackr.jp:8080 "Heuristic expiration" Tue, 03 Jul 2012 05:09:44 GMT`

Warning 首部的格式如下。最后的日期时间部分可省略。

`Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])`

HTTP/1.1 中定义了 7 种警告。警告码对应的警告内容仅推荐参考。另外，警告码具备扩展性，今后有可能追加新的警告码。

![image-20220804151259884](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151259884.png)


### 请求首部字段

请求首部字段是从客户端往服务器端发送请求报文中所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容。


#### Accept

![image-20220804151309305](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151309305.png)

`Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`

Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型。

下面我们试举几个媒体类型的例子。

* 文本文件

text/html, text/plain, text/css ...

application/xhtml+xml, application/xml ...

* 图片文件

image/jpeg, image/gif, image/png ...

* 视频文件

video/mpeg, video/quicktime ...

* 应用程序使用的二进制文件

application/octet-stream, application/zip ...

比如，如果浏览器不支持 PNG 图片的显示，那 Accept 就不指定 image/png，而指定可处理的 image/gif 和 image/jpeg 等图片类型。

若想要给显示的媒体类型增加优先级，则使用 q= 来额外表示权重值，用分号（;）进行分隔。权重值 q 的范围是 0~1（可精确到小数点后 3 位），且 1 为最大值。不指定权重 q 值时，默认权重为 q=1.0。

当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。

#### Accept-Charset

![image-20220804151320615](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151320615.png)

`Accept-Charset: iso-8859-5, unicode-1-1;q=0.8`

Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字
段 Accept 相同的是可用权重 q 值来表示相对优先级。

该首部字段应用于内容协商机制的服务器驱动协商。

#### Accept-Encoding

![image-20220804151329231](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151329231.png)

`Accept-Encoding: gzip, deflate`

Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。

下面试举出几个内容编码的例子。

* gzip

由文件压缩程序 gzip（GNU zip）生成的编码格式（RFC1952），采用 Lempel-Ziv 算法（LZ77）及 32 位循环冗余校验（Cyclic Redundancy Check，通称 CRC）。

* compress

由 UNIX 文件压缩程序 compress 生成的编码格式，采用 LempelZiv-Welch 算法（LZW）。deflate 组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。

* identity

不执行压缩或不会变化的默认编码格式采用权重 q 值来表示相对优先级，这点与首部字段 Accept 相同。另外，也可使用星号（*）作为通配符，指定任意的编码格式。

#### Accept-Language

![image-20220804151340084](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151340084.png)

首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次
指定多种自然语言集。

和 Accept 首部字段一样，按权重值 q 来表示相对优先级。在上述图例中，客户端在服务器有中文版资源的情况下，会请求其返回中文版
对应的响应，没有中文版时，则请求返回英文版响应。

#### Authorization

![image-20220804151350006](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151350006.png)

`Authorization: Basic dWVub3NlbjpwYXNzd29yZA==`

首部字段 Authorization 是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接收到返回的401 状态码响应后，把首部字段 Authorization 加入请求中。共用缓存在接收到含有 Authorization 首部字段的请求时的操作处理会略有差异。

#### Expect

![image-20220804151359117](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151359117.png)

`Expect: 100-continue`

客户端使用首部字段 Expect 来告知服务器，期望出现的某种特定行为。因服务器无法理解客户端的期望作出回应而发生错误时，会返回状态码 417 Expectation Failed。客户端可以利用该首部字段，写明所期望的扩展。虽然 HTTP/1.1 规范只定义了 100-continue（状态码 100 Continue 之意）。等待状态码 100 响应的客户端在发生请求时，需要指定 Expect:100-continue。


#### From

![image-20220804151407214](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151407214.png)

首部字段 From 用来告知服务器使用用户代理的用户的电子邮件地址。通常，其使用目的就是为了显示搜索引擎等用户代理的负责人的电子邮件联系方式。使用代理时，应尽可能包含 From 首部字段（但可能会因代理不同，将电子邮件地址记录在 User-Agent 首部字段内）。

#### Host

![image-20220804151416961](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151416961.png)

图：虚拟主机运行在同一个 IP 上，因此使用首部字段 Host 加以区分

`Host: www.hackr.jp`

首部字段 Host 会告知服务器，请求的资源所处的互联网主机名和端口号。Host 首部字段在 HTTP/1.1 规范内是唯一一个必须被包含在请
求内的首部字段。

首部字段 Host 和以单台服务器分配多个域名的虚拟主机的工作机制有很密切的关联，这是首部字段 Host 必须存在的意义。

请求被发送至服务器时，请求中的主机名会用 IP 地址直接替换解决。但如果这时，相同的 IP 地址下部署运行着多个域名，那么服务器就会无法理解究竟是哪个域名对应的请求。因此，就需要使用首部字段 Host 来明确指出请求的主机名。若服务器未设定主机名，那直接发送一个空值即可。如下所示。

`Host:`

#### If-Match

![image-20220804151426978](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151426978.png)

形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。

![image-20220804151439425](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151439425.png)

图：只有当 If-Match 的字段值跟 ETag 值匹配一致时，服务器才会接受请求

`If-Match: "123456"`

首部字段 If-Match，属附带条件之一，它会告知服务器匹配资源所用的实体标记（ETag）值。这时的服务器无法使用弱 ETag 值。（请参
照本章有关首部字段 ETag 的说明）

服务器会比对 If-Match 的字段值和资源的 ETag 值，仅当两者一致时，才会执行请求。反之，则返回状态码 412 Precondition Failed 的响应。

还可以使用星号（*）指定 If-Match 的字段值。针对这种情况，服务器将会忽略 ETag 的值，只要资源存在就处理请求。

#### If-Modified-Since

![image-20220804151451549](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151451549.png)

图：如果在 If-Modified-Since 字段指定的日期时间后，资源发生了更新，服务器会接受请求

`If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT`

首部字段 If-Modified-Since，属附带条件之一，它会告知服务器若 If-Modified-Since 字段值早于资源的更新时间，则希望能处理该请求。而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified 的响应。

If-Modified-Since 用于确认代理或客户端拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段 Last-Modified 来确定。

#### If-None-Match

![image-20220804151506045](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151506045.png)

图：只有在 If-None-Match 的字段值与 ETag 值不一致时，可处理该请求。与 If-Match 首部字段的作用相反

首部字段 If-None-Match 属于附带条件之一。它和首部字段 If-Match作用相反。用于指定 If-None-Match 字段值的实体标记（ETag）值与请求资源的 ETag 不一致时，它就告知服务器处理该请求。

在 GET 或 HEAD 方法中使用首部字段 If-None-Match 可获取最新的资源。因此，这与使用首部字段 If-Modified-Since 时有些类似。

#### If-Range

![image-20220804151521993](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151521993.png)

首部字段 If-Range 属于附带条件之一。它告知服务器若指定的 If-Range 字段值（ETag 值或者时间）和请求资源的 ETag 值或时间相一致时，则作为范围请求处理。反之，则返回全体资源。

![image-20220804151550659](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151550659.png)

下面我们思考一下不使用首部字段 If-Range 发送请求的情况。服务器端的资源如果更新，那客户端持有资源中的一部分也会随之无效，当然，范围请求作为前提是无效的。这时，服务器会暂且以状态码 412 Precondition Failed 作为响应返回，其目的是催促客户端再次发送请求。这样一来，与使用首部字段 If-Range 比起来，就需要花费两倍的功夫。


#### If-Unmodified-Since

`If-Unmodified-Since: Thu, 03 Jul 2012 00:00:00 GMT`

首部字段 If-Unmodified-Since 和首部字段 If-Modified-Since 的作用相反。它的作用的是告知服务器，指定的请求资源只有在字段值内指的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码 412 Precondition Failed 作为响应返回。

#### Max-Forwards

![image-20220804151604534](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151604534.png)

`Max-Forwards: 10`

通过 TRACE 方法或 OPTIONS 方法，发送包含首部字段 Max-Forwards 的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，Max-Forwards 的值减 1 后重新赋值。当服务器接收到 Max-Forwards 值为 0 的请求时，则不再进行转发，而是直接返回响应。

使用 HTTP 协议通信时，请求可能会经过代理等多台服务器。途中，如果代理服务器由于某些原因导致请求转发失败，客户端也就等不到服务器返回的响应了。对此，我们无从可知。

可以灵活使用首部字段 Max-Forwards，针对以上问题产生的原因展开调查。由于当 Max-Forwards 字段值为 0 时，服务器就会立即返回
响应，由此我们至少可以对以那台服务器为终点的传输路径的通信状况有所把握。

![image-20220804151615855](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151615855.png)

![image-20220804151622885](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151622885.png)

#### Proxy-Authorization

`Proxy-Authorization: Basic dGlwOjkpNLAGfFY5`

接收到从代理服务器发来的认证质询时，客户端会发送包含首部字段Proxy-Authorization 的请求，以告知服务器认证所需要的信息。

这个行为是与客户端和服务器之间的 HTTP 访问认证相类似的，不同之处在于，认证行为发生在客户端与代理之间。客户端与服务器之间的认证，使用首部字段 Authorization 可起到相同作用。

#### Range

`Range: bytes=5001-10000`

对于只需获取部分资源的范围请求，包含首部字段 Range 即可告知服务器资源的指定范围。上面的示例表示请求获取从第 5001 字节至第
10000 字节的资源。

接收到附带 Range 首部字段请求的服务器，会在处理请求之后返回状态码为 206 Partial Content 的响应。无法处理该范围请求时，则会返
回状态码 200 OK 的响应及全部资源。

#### Referer

![image-20220804151635738](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151635738.png)

`Referer: http://www.hackr.jp/index.htm`

首部字段 Referer 会告知服务器请求的原始资源的 URI。客户端一般都会发送 Referer 首部字段给服务器。但当直接在浏览器的地址栏输入 URI，或出于安全性的考虑时，也可以不发送该首部字段。

因为原始资源的 URI 中的查询字符串可能含有 ID 和密码等保密信息，要是写进 Referer 转发给其他服务器，则有可能导致保密信息的泄露。

另外，Referer 的正确的拼写应该是 Referrer，但不知为何，大家一直沿用这个错误的拼写。

#### TE

`TE: gzip, deflate;q=0.5`

首部字段 TE 会告知服务器客户端能够处理响应的传输编码方式及相对优先级。它和首部字段 Accept-Encoding 的功能很相像，但是用于传输编码。

首部字段 TE 除指定传输编码之外，还可以指定伴随 trailer 字段的分块传输编码的方式。应用后者时，只需把 trailers 赋值给该字段值。

`TE: trailers`

#### User-Agent

![image-20220804151645729](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151645729.png)

`User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1`

首部字段 User-Agent 会将创建请求的浏览器和用户代理名称等信息传达给服务器。

由网络爬虫发起请求时，有可能会在字段内添加爬虫作者的电子邮件地址。此外，如果请求经过代理，那么中间也很可能被添加上代理服务器的名称。


### 响应首部字段

响应首部字段是由服务器端向客户端返回响应报文中所使用的字段，用于补充响应的附加信息、服务器信息，以及对客户端的附加要求等信息。

#### Accept-Ranges

![image-20220804151655237](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151655237.png)

图：当不能处理范围请求时，Accept-Ranges: none


`Accept-Ranges: bytes`

首部字段 Accept-Ranges 是用来告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资源。

可指定的字段值有两种，可处理范围请求时指定其为 bytes，反之则指定其为 none。


#### Age

![image-20220804151703195](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151703195.png)

`Age: 600`

首部字段 Age 能告知客户端，源服务器在多久前创建了响应。字段值的单位为秒。

若创建该响应的服务器是缓存服务器，Age 值是指缓存后的响应再次发起认证到认证完成的时间值。代理创建响应时必须加上首部字段Age。

#### ETag

![image-20220804151712577](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151712577.png)

`ETag: "82e22293907ce725faf67773957acd12"`

首部字段 ETag 能告知客户端实体标识。它是一种可将资源以字符串形式做唯一性标识的方式。服务器会为每份资源分配对应的 ETag值。

另外，当资源更新时，ETag 值也需要更新。生成 ETag 值时，并没有统一的算法规则，而仅仅是由服务器来分配。

![image-20220804151801531](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151801531.png)



资源被缓存时，就会被分配唯一性标识。例如，当使用中文版的浏览器访问 http://www.google.com/ 时，就会返回中文版对应的资源，而使用英文版的浏览器访问时，则会返回英文版对应的资源。两者的 URI 是相同的，所以仅凭 URI 指定缓存的资源是相当困难的。若在下载过程中出现连接中断、再连接的情况，都会依照 ETag 值来指定资源。


 **强 ETag 值和弱 Tag 值** 

ETag 中有强 ETag 值和弱 ETag 值之分。

* 强 ETag 值

强 ETag 值，不论实体发生多么细微的变化都会改变其值。

`ETag: "usagi-1234"`

* 弱 ETag 值

弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变 ETag 值。这时，会在字段值最开始处附加 W/。

`ETag: W/"usagi-1234"`


#### Location

![image-20220804151811423](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151811423.png)

`Location: http://www.usagidesign.jp/sample.html`

使用首部字段 Location 可以将响应接收方引导至某个与请求 URI 位置不同的资源。

基本上，该字段会配合 3xx ：Redirection 的响应，提供重定向的URI。

几乎所有的浏览器在接收到包含首部字段 Location 的响应后，都会强制性地尝试对已提示的重定向资源的访问。

#### Proxy-Authenticate

`Proxy-Authenticate: Basic realm="Usagidesign Auth"`

首部字段 Proxy-Authenticate 会把由代理服务器所要求的认证信息发送给客户端。

它与客户端和服务器之间的 HTTP 访问认证的行为相似，不同之处在于其认证行为是在客户端与代理之间进行的。而客户端与服务器之间进行认证时，首部字段 WWW-Authorization 有着相同的作用。

#### Retry-After

![image-20220804151821963](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151821963.png)

`Retry-After: 120`

首部字段 Retry-After 告知客户端应该在多久之后再次发送请求。主要配合状态码 503 Service Unavailable 响应，或 3xx Redirect 响应一起使用。

字段值可以指定为具体的日期时间（Wed, 04 Jul 2012 06：34：24 GMT 等格式），也可以是创建响应后的秒数。


#### Server

![image-20220804151829992](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151829992.png)

`Server: Apache/2.2.17 (Unix)`

首部字段 Server 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息。不单单会标出服务器上的软件应用名称，还有可能包括版本号和安装时启用的可选项。

`Server: Apache/2.2.6 (Unix) PHP/5.2.5`

### Vary

![image-20220804151838050](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151838050.png)

图：当代理服务器接收到带有 Vary 首部字段指定获取资源的请求时，如果使用的 Accept-Language 字段的值相同，那么就直接从缓存返回响应。反之，则需要先从源服务器端获取资源后才能作为响应返回。

`Vary: Accept-Language`

首部字段 Vary 可对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的命令。

从代理服务器接收到源服务器返回包含 Vary 指定项的响应之后，若再要进行缓存，仅对请求中含有相同 Vary 指定首部字段的请求返回
缓存。即使对相同资源发起请求，但由于 Vary 指定的首部字段不相同，因此必须要从源服务器重新获取资源。

#### WWW-Authenticate

`WWW-Authenticate: Basic realm="Usagidesign Auth"`

首部字段 WWW-Authenticate 用于 HTTP 访问认证。它会告知客户端适用于访问请求 URI 所指定资源的认证方案（Basic 或是 Digest）和带参数提示的质询（challenge）。状态码 401 Unauthorized 响应中，肯定带有首部字段 WWW-Authenticate。

上述示例中，realm 字段的字符串是为了辨别请求 URI 指定资源所受到的保护策略。

### 实体首部字段

实体首部字段是包含在请求报文和响应报文中的实体部分所使用的首部，用于补充内容的更新时间等与实体相关的信息。

![image-20220804151854347](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151854347.png)

图：在请求和响应两方的 HTTP 报文中都含有与实体相关的首部字段。

#### Allow

![image-20220804151902936](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151902936.png)

`Allow: GET, HEAD`

首部字段 Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。当服务器接收到不支持的 HTTP 方法时，会以状态码
405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。


#### Content-Encoding

`Content-Encoding: gzip`

首部字段 Content-Encoding 会告知客户端服务器对实体的主体部分选用的内容编码方式。内容编码是指在不丢失实体信息的前提下所进行的压缩。

![image-20220804151914729](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804151914729.png)

主要采用以下 4 种内容编码的方式。

- gzip
- compress
- deflate
- identity

#### Content-Language

![image-20220804152053623](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152053623.png)

`Content-Language: zh-CN`

`首部字段 Content-Language 会告知客户端，实体主体使用的自然语言（指中文或英文等语言）。`


#### Content-Length

![image-20220804152107397](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152107397.png)

首部字段 Content-Length 表明了实体主体部分的大小（单位是字节）。对实体主体进行内容编码传输时，不能再使用 Content-Length 首部字段。由于实体主体大小的计算方法略微复杂，所以在此不再展开。由于实体主体大小的计算方法略微复杂，所以在此不再展开。读者若想一探究竟，可参考 RFC2616 的 4.4。


#### Content-Location

`Content-Location: http://www.hackr.jp/index-ja.html`

首部字段 Content-Location 给出与报文主体部分相对应的 URI。和首部字段 Location 不同，Content-Location 表示的是报文主体返回资源对应的 URI。

比如，对于使用首部字段 Accept-Language 的服务器驱动型请求，当返回的页面内容与实际请求的对象不同时，首部字段 Content-Location内会写明 URI。（访问 http://www.hackr.jp/ 返回的对象却是http://www.hackr.jp/index-ja.html 等类似情况）



#### Content-MD5

![image-20220804152121246](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152121246.png)

图：客户端会对接收的报文主体执行相同的 MD5 算法，然后与首部字段 Content-MD5 的字段值比较

```
Content-MD5: OGFkZDUwNGVhNGY3N2MxMDIwZmQ4NTBmY2IyTY==
```

首部字段 Content-MD5 是一串由 MD5 算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达。对报文主体执行MD5 算法获得的 128 位二进制数，再通过 Base64 编码后将结果写入 Content-MD5 字段值。由于 HTTP 首部无法记录二进制值，所以要通过 Base64 编码处理。为确保报文的有效性，作为接收方的客户端会对报文主体再执行一次相同的 MD5 算法。计算出的125值与字段值作比较后，即可判断出报文主体的准确性。

采用这种方法，对内容上的偶发性改变是无从查证的，也无法检测出恶意篡改。其中一个原因在于，内容如果能够被篡改，那么同时意味着 Content-MD5 也可重新计算然后被篡改。所以处在接收阶段的客户端是无法意识到报文主体以及首部字段 Content-MD5 是已经被篡改过的。

#### Content-Range

![image-20220804152133670](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152133670.png)

```
Content-Range: bytes 5001-10000/10000
```

针对范围请求，返回响应时使用的首部字段 Content-Range，能告知客户端作为响应返回的实体的哪个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小。


#### Content-Type

```
Content-Type: text/html; charset=UTF-8
```

首部字段 Content-Type 说明了实体主体内对象的媒体类型。和首部字段 Accept 一样，字段值用 type/subtype 形式赋值。参数 charset 使用 iso-8859-1 或 euc-jp 等字符集进行赋值。

#### Expires

![image-20220804152146937](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152146937.png)

`Expires: Wed, 04 Jul 2012 08:26:05 GMT`

首部字段 Expires 会将资源失效的日期告知客户端。缓存服务器在接收到含有首部字段 Expires 的响应后，会以缓存来应答请求，在 Expires 字段值指定的时间之前，响应的副本会一直被保存。当超过指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求资源。

源服务器不希望缓存服务器对资源缓存时，最好在 Expires 字段内写入与首部字段 Date 相同的时间值。

但是，当首部字段 Cache-Control 有指定 max-age 指令时，比起首部字段 Expires，会优先处理 max-age 指令。

#### Last-Modified

![image-20220804152154870](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152154870.png)

```
Last-Modified: Wed, 23 May 2012 09:59:55 GMT
```

首部字段 Last-Modified 指明资源最终修改的时间。一般来说，这个值就是 Request-URI 指定资源被修改的时间。但类似使用 CGI 脚本进行动态数据处理时，该值有可能会变成数据最终修改时的时间。


### 为 Cookie 服务的首部字段

管理服务器与客户端之间状态的 Cookie，虽然没有被编入标准化HTTP/1.1 的 RFC2616 中，但在 Web 网站方面得到了广泛的应用。

Cookie 的工作机制是用户识别及状态管理。Web 网站为了管理用户的状态会通过 Web 浏览器，把一些数据临时写入用户的计算机内。接
着当用户访问该Web网站时，可通过通信方式取回之前发放的Cookie。

调用 Cookie 时，由于可校验 Cookie 的 **有效期** ，以及发送方的 **域、路径、协议** 等信息，所以正规发布的 Cookie 内的数据不会因来自其他 Web 站点和攻击者的攻击而泄露。


为 Cookie 服务的首部字段

![image-20220804152206830](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152206830.png)

#### Set-Cookie

```
Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31 GMT; path=/; domain=.hackr.jp;
```

当服务器准备开始管理客户端的状态时，会事先告知各种信息。下面的表格列举了 Set-Cookie 的字段值。

Set-Cookie 字段的属性

![image-20220804152216749](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152216749.png)


 **expires 属性** 

Cookie 的 expires 属性指定浏览器可发送 Cookie 的有效期。当省略 expires 属性时，其有效期仅限于维持浏览器会话（Session）
时间段内。这通常限于浏览器应用程序被关闭之前。

另外，一旦 Cookie 从服务器端发送至客户端，服务器端就不存在可以显式删除 Cookie 的方法。但可通过覆盖已过期的 Cookie，实现对客户端 Cookie 的实质性删除操作。

 **path 属性** 

Cookie 的 path 属性可用于限制指定 Cookie 的发送范围的文件目录。不过另有办法可避开这项限制，看来对其作为安全机制的效果不能抱有期待。


 **domain 属性** 

通过 Cookie 的 domain 属性指定的域名可做到与结尾匹配一致。比如，当指定 example.com 后，除 example.com 以外，www.example.com
或 www2.example.com 等都可以发送 Cookie。因此，除了针对具体指定的多个域名发送 Cookie 之 外，不指定domain 属性显得更安全。

 **secure 属性** 

Cookie 的 secure 属性用于限制 Web 页面仅在 HTTPS 安全连接时，才可以发送 Cookie。

发送 Cookie 时，指定 secure 属性的方法如下所示。

```
Set-Cookie: name=value; secure
```

以上例子仅当在 https://www.example.com/（HTTPS）安全连接的情况下才会进行 Cookie 的回收。也就是说，即使域名相同，
http://www.example.com/（HTTP）也不会发生 Cookie 回收行为。当省略 secure 属性时，不论 HTTP 还是 HTTPS，都会对 Cookie 进行回收。


 **HttpOnly 属性** 

Cookie 的 HttpOnly 属性是 Cookie 的扩展功能，它使 JavaScript 脚本无法获得 Cookie。其主要目的为防止跨站脚本攻击（Cross-site scripting，XSS）对 Cookie 的信息窃取。

发送指定 HttpOnly 属性的 Cookie 的方法如下所示。

```
Set-Cookie: name=value; HttpOnly
```

通过上述设置，通常从 Web 页面内还可以对 Cookie 进行读取操作。但使用 JavaScript 的 document.cookie 就无法读取附加 HttpOnly 属性后的 Cookie 的内容了。因此，也就无法在 XSS 中利用 JavaScript 劫持Cookie 了。

虽然是独立的扩展功能，但 Internet Explorer 6 SP1 以上版本等当下的主流浏览器都已经支持该扩展了。另外顺带一提，该扩展并非是为了
防止 XSS 而开发的。


#### Cookie

```
Cookie: status=enable
```

首部字段 Cookie 会告知服务器，当客户端想获得 HTTP 状态管理支持时，就会在请求中包含从服务器接收到的 Cookie。接收到多个 Cookie 时，同样可以以多个 Cookie 形式发送。


### 其他首部字段

HTTP 首部字段是可以自行扩展的。所以在 Web 服务器和浏览器的应用上，会出现各种非标准的首部字段。

接下来，我们就一些最为常用的首部字段进行说明。


- X-Frame-Options
- X-XSS-Protection
- DNT
- P3P


#### X-Frame-Options

```
X-Frame-Options: DENY
```

首部字段 X-Frame-Options 属于 HTTP 响应首部，用于控制网站内容。在其他 Web 网站的 Frame 标签内的显示问题。其主要目的是为了防止点击劫持（clickjacking）攻击。

首部字段 X-Frame-Options 有以下两个可指定的字段值。

- DENY ：拒绝
- SAMEORIGIN ：仅同源域名下的页面（Top-level-browsingcontext）匹配时许可。（比如，当指定 http://hackr.jp/sample.html
  页面为 SAMEORIGIN 时，那么 hackr.jp 上所有页面的 frame 都被允许可加载该页面，而 example.com 等其他域名的页面就不行了）


支持该首部字段的浏览器有：Internet Explorer 8、Firefox 3.6.9+、Chrome 4.1.249.1042+、Safari 4+ 和 Opera 10.50+ 等。现在主流的浏览器都已经支持。

能在所有的 Web 服务器端预先设定好 X-Frame-Options 字段值是最理想的状态。

对 apache2.conf 的配置实例

```
<IfModule mod_headers.c>
Header append X-FRAME-OPTIONS "SAMEORIGIN"
</IfModule>
```

#### X-XSS-Protection

```
X-XSS-Protection: 1
```

首部字段 X-XSS-Protection 属于 HTTP 响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器 XSS 防护机制的开关。

首部字段 X-XSS-Protection 可指定的字段值如下。

- 0 ：将 XSS 过滤设置成无效状态
- 1 ：将 XSS 过滤设置成有效状态


#### DNT

![image-20220804152240475](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804152240475.png)

```
DNT: 1
```

首部字段 DNT 属于 HTTP 请求首部，其中 DNT 是 Do Not Track 的简称，意为拒绝个人信息被收集，是表示拒绝被精准广告追踪的一种方
法。

首部字段 DNT 可指定的字段值如下。

0 ：同意被追踪

1 ：拒绝被追踪

由于首部字段 DNT 的功能具备有效性，所以 Web 服务器需要对 DNT
做对应的支持。






> 协议中对 X- 前缀的废除在 HTTP 等多种协议中，通过给非标准参数加上前缀 X-，来区别于标准参数，并使那些非标准的参数作为扩展变成可能。但是这种简单粗暴的做法有百害而无一益，因此在“RFC 6648 - Deprecatingthe "X-" Prefix and Similar Constructs in Application Protocols”中提议停止该做法。
>
> 然而，对已经在使用中的 X- 前缀来说，不应该要求其变更。


## 确保 Web 安全的 HTTPS

### HTTP 的缺点

到现在为止，我们已了解到 HTTP 具有相当优秀和方便的一面，然而HTTP 并非只有好的一面，事物皆具两面性，它也是有不足之处的。HTTP 主要有这些不足，例举如下。


- 通信使用明文（不加密），内容可能会被窃听
- 不验证通信方的身份，因此有可能遭遇伪装
- 无法证明报文的完整性，所以有可能已遭篡改

这些问题不仅在 HTTP 上出现，其他未加密的协议中也会存在这类问题。

除此之外，HTTP 本身还有很多缺点。而且，还有像某些特定的 Web 服务器和特定的 Web 浏览器在实际应用中存在的不足（也可以说成
是脆弱性或安全漏洞），另外，用 Java 和 PHP 等编程语言开发的 Web 应用也可能存在安全漏洞。

#### 通信使用明文可能会被窃听

由于 HTTP 本身不具备加密的功能，所以也无法做到对通信整体（使用 HTTP 协议通信的请求和响应的内容）进行加密。即，HTTP 报文使用明文（指未经过加密的报文）方式发送。

- TCP/IP 是可能被窃听的网络

如果要问为什么通信时不加密是一个缺点，这是因为，按TCP/IP 协议族的工作机制，通信内容在所有的通信线路上都有可能遭到窥视。

所谓互联网，是由能连通到全世界的网络组成的。无论世界哪个角落的服务器在和客户端通信时，在此通信线路上的某些网络设
备、光缆、计算机等都不可能是个人的私有物，所以不排除某个环节中会遭到恶意窥视行为。

即使已经过加密处理的通信，也会被窥视到通信内容，这点和未加密的通信是相同的。只是说如果通信经过加密，就有可能让人无法破解报文信息的含义，但加密处理后的报文信息本身还是会被看到的。

![image-20220804154634713](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804154634713.png)

图：互联网上的任何角落都存在通信内容被窃听的风险

窃听相同段上的通信并非难事。只需要收集在互联网上流动的数据包（帧）就行了。对于收集来的数据包的解析工作，可交给那些抓包（Packet Capture）或嗅探器（Sniffer）工具。



下面的图片示例就是被广泛使用的抓包工具 Wireshark。它可以 获取 HTTP 协议的请求和响应的内容，并对其进行解析。 



像使用 GET 方法发送请求、响应返回了 200 OK，查看 HTTP 响 应报文的全部内容等一系列的事情都可以做到。



![image-20220804154756196](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804154756196.png)



- 加密处理防止被窃听

在目前大家正在研究的如何防止窃听保护信息的几种对策中，最 为普及的就是加密技术。加密的对象可以有这么几个。



通信的加密



一种方式就是将通信加密。HTTP 协议中没有加密机制，但可以通过和 SSL（Secure Socket Layer，安全套接层）或 TLS（Transport Layer Security，安全层传输协议）的组合使用， 加密 HTTP 的通信内容。 用 SSL建立安全通信线路之后，就可以在这条线路上进行 HTTP 通信了。与 SSL组合使用的 HTTP 被称为 HTTPS（HTTP Secure，超文本传输安全协议）或 HTTP over SSL。



![image-20220804160446918](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804160446918.png)



内容的加密



还有一种将参与通信的内容本身加密的方式。由于 HTTP 协议中 没有加密机制，那么就对 HTTP 协议传输的内容本身加密。即把 HTTP 报文里所含的内容进行加密处理。

在这种情况下，客户端需要对 HTTP 报文进行加密处理后再发送 请求。



![image-20220804160638953](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804160638953.png)



诚然，为了做到有效的内容加密，前提是要求客户端和服务器同 时具备加密和解密机制。主要应用在 Web 服务中。有一点必须引起注意，由于该方式不同于 SSL或 TLS 将整个通信线路加密 处理，所以内容仍有被篡改的风险。稍后我们会加以说明。



#### 不验证通信方的身份就可能遭遇伪装

HTTP 协议中的请求和响应不会对通信方进行确认。也就是说存在“服 务器是否就是发送请求中 URI 真正指定的主机，返回的响应是否真的 返回到实际提出请求的客户端”等类似问题。



1. 任何人都可发起请求

在 HTTP 协议通信时，由于不存在确认通信方的处理步骤，任何 人都可以发起请求。另外，服务器只要接收到请求，不管对方是 谁都会返回一个响应（但也仅限于发送端的 IP 地址和端口号没 有被 Web 服务器设定限制访问的前提下）。



![image-20220804161537585](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804161537585.png)



  - 无法确定请求发送至目标的 Web 服务器是否是按真实意 图返回响应的那台服务器。有可能是已伪装的 Web 服务 器。 
  - 无法确定响应返回到的客户端是否是按真实意图接收响 应的那个客户端。有可能是已伪装的客户端。 
  - 无法确定正在通信的对方是否具备访问权限。因为某些 Web 服务器上保存着重要的信息，只想发给特定用户通 信的权限。
  - 无法判定请求是来自何方、出自谁手。
  - 即使是无意义的请求也会照单全收。无法阻止海量请求 下的 DoS 攻击（Denial of Service，拒绝服务攻击）。



2. 查明对手的证书

虽然使用 HTTP 协议无法确定通信方，但如果使用 SSL则可以。 SSL不仅提供加密处理，而且还使用了一种被称为证书的手段， 可用于确定方。

证书由值得信任的第三方机构颁发，用以证明服务器和客户端是 实际存在的。另外，伪造证书从技术角度来说是异常困难的一件 事。所以只要能够确认通信方（服务器或客户端）持有的证书， 即可判断通信方的真实意图。



![image-20220804162427765](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804162427765.png)



通过使用证书，以证明通信方就是意料中的服务器。这对使用者 个人来讲，也减少了个人信息泄露的危险性。 

另外，客户端持有证书即可完成个人身份的确认，也可用于对 Web 网站的认证环节。



#### 无法证明报文完整性，可能已遭篡改

- 接收到的内容可能有误

​		由于 HTTP 协议无法证明通信的报文完整性，因此，在请求或响 应送出之后直到对方接收之前的这段时间内，即使请求或响应的 内容遭到篡改，也没有办法获悉。

换句话说，没有任何办法确认，发出的请求 / 响应和接收到的请 求 / 响应是前后相同的。

![image-20220804162638013](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804162638013.png)



比如，从某个 Web 网站上下载内容，是无法确定客户端下载的 文件和服务器上存放的文件是否前后一致的。文件内容在传输途 中可能已经被篡改为其他的内容。即使内容真的已改变，作为接 收方的客户端也是觉察不到的。

像这样，请求或响应在传输途中，遭攻击者拦截并篡改内容的攻 击称为中间人攻击（Man-in-the-Middle attack，MITM）。



![image-20220804162847549](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804162847549.png)

- 如何防止篡改

​	虽然有使用 HTTP 协议确定报文完整性的方法，但事实上并不便 捷、可靠。其中常用的是 MD5 和 SHA-1 等散列值校验的方法， 以及用来确认文件的数字签名方法。



![image-20220804163134154](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804163134154.png)



提供文件下载服务的 Web 网站也会提供相应的以 PGP（Pretty Good Privacy，完美隐私）创建的数字签名及 MD5 算法生成的散 列值。PGP 是用来证明创建文件的数字签名，MD5 是由单向函 数生成的散列值。不论使用哪一种方法，都需要操纵客户端的用 户本人亲自检查验证下载的文件是否就是原来服务器上的文件。 浏览器无法自动帮用户检查。 

可惜的是，用这些方法也依然无法百分百保证确认结果正确。因 为 PGP 和 MD5 本身被改写的话，用户是没有办法意识到的。 

为了有效防止这些弊端，有必要使用 HTTPS。SSL提供认证和加 密处理及摘要功能。仅靠 HTTP 确保完整性是非常困难的，因此 通过和其他协议组合使用来实现这个目标。下节我们介绍 HTTPS 的相关内容。



### HTTP+ 加密 + 认证 + 完整性保护 =HTTPS

#### HTTP 加上加密处理和认证以及完整性保护后即是 HTTPS

如果在 HTTP 协议通信过程中使用未经加密的明文，比如在 Web 页 面中输入信用卡号，如果这条通信线路遭到窃听，那么信用卡号就暴 露了。

另外，对于 HTTP 来说，服务器也好，客户端也好，都是没有办法确认通信方的。因为很有可能并不是和原本预想的通信方在实际通信。 并且还需要考虑到接收到的报文在通信途中已经遭到篡改这一可能 性。

为了统一解决上述这些问题，需要在 HTTP 上再加入加密处理和认证 等机制。我们把添加了加密及认证机制的 HTTP 称为 HTTPS（HTTP Secure）。



![image-20220804163422636](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804163422636.png)



经常会在 Web 的登录页面和购物结算界面等使用 HTTPS 通信。使用 HTTPS 通信时，不再用 http://，而是改用 https://。另外，当浏览器访 问 HTTPS 通信有效的 Web 网站时，浏览器的地址栏内会出现一个带 锁的标记。对 HTTPS 的显示方式会因浏览器的不同而有所改变。



![image-20220804164013934](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804164013934.png)

#### HTTPS 是身披 SSL 外壳的 HTTP

HTTPS 并非是应用层的一种新协议。只是 HTTP 通信接口部分用 SSL（Secure Socket Layer）和 TLS（Transport Layer Security）协议代 替而已。

通常，HTTP 直接和 TCP 通信。当使用 SSL时，则演变成先和 SSL通 信，再由 SSL和 TCP 通信了。简言之，所谓 HTTPS，其实就是身披 SSL协议这层外壳的 HTTP。



![image-20220804165301230](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804165301230.png)

在采用 SSL后，HTTP 就拥有了 HTTPS 的加密、证书和完整性保护 这些功能。

SSL是独立于 HTTP 的协议，所以不光是 HTTP 协议，其他运行在应 用层的 SMTP 和 Telnet 等协议均可配合 SSL协议使用。可以说 SSL是 当今世界上应用最为广泛的网络安全技术。



#### 相互交换密钥的公开密钥加密技术



在对 SSL进行讲解之前，我们先来了解一下加密方法。SSL采用一种 叫做公开密钥加密（Public-key cryptography）的加密处理方式。 

近代的加密方法中加密算法是公开的，而密钥却是保密的。通过这种 方式得以保持加密方法的安全性。 

加密和解密都会用到密钥。没有密钥就无法对密码解密，反过来说， 任何人只要持有密钥



- 共享密钥加密的困境

加密和解密同用一个密钥的方式称为共享密钥加密（Common key crypto system），也被叫做**对称密钥加密**。



![image-20220804165922683](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804165922683.png)

以共享密钥方式加密时必须将密钥也发给对方。可究竟怎样才能 安全地转交？在互联网上转发密钥时，如果通信被监听那么密钥 就可会落入攻击者之手，同时也就失去了加密的意义。另外还得 设法安全地保管接收到的密钥。

![image-20220804170104654](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804170104654.png)

- 使用两把密钥的公开密钥加密

公开密钥加密方式很好地解决了共享密钥加密的困难。

公开密钥加密使用一对**非对称的密钥**。一把叫做私有密钥 （private key），另一把叫做公开密钥（public key）。顾名思 义，私有密钥不能让其他任何人知道，而公开密钥则可以随意发 布，任何人都可以获得。

**使用公开密钥加密方式，发送密文的一方使用对方的公开密钥进 行加密处理，对方收到被加密的信息后，再使用自己的私有密钥 进行解密。利用这种方式，不需要发送用来解密的私有密钥，也 不必担心密钥被攻击者窃听而盗走。**

另外，要想根据密文和公开密钥，恢复到信息原文是异常困难 的，因为解密过程就是在对离散对数进行求值，这并非轻而易举 就能办到。退一步讲，如果能对一个非常大的整数做到快速地因 式分解，那么密码破解还是存在希望的。但就目前的技术来看是 不太现实的。



![image-20220804171545648](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804171545648.png)



- HTTPS 采用混合加密机制

HTTPS 采用共享密钥加密和公开密钥加密两者并用的混合加密 机制。若密钥能够实现安全交换，那么有可能会考虑仅使用公开 密钥加密来通信。但是公开密钥加密与共享密钥加密相比，其处理速度要慢。

所以应充分利用两者各自的优势，将多种方法组合起来用于通 信。在交换密钥环节使用公开密钥加密方式，之后的建立通信交 换报文阶段则使用共享密钥加密方式。



![image-20220804172356148](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804172356148.png)



#### 证明公开密钥正确性的证书

遗憾的是，公开密钥加密方式还是存在一些问题的。那就是无法证明 公开密钥本身就是货真价实的公开密钥。比如，正准备和某台服务器 建立公开密钥加密方式下的通信时，如何证明收到的公开密钥就是原 本预想的那台服务器发行的公开密钥。或许在公开密钥传输途中，真正的公开密钥已经被攻击者替换掉了。

为了解决上述问题，可以使用由数字证书认证机构（CA，Certificate Authority）和其相关机关颁发的公开密钥证书。

数字证书认证机构处于客户端与服务器双方都可信赖的第三方机构的 立场上。威瑞信（VeriSign）就是其中一家非常有名的数字证书认证 机构。我们来介绍一下数字证书认证机构的业务流程。首先，服务器 的运营人员向数字证书认证机构提出公开密钥的申请。数字证书认证 机构在判明提出申请者的身份之后，会对已申请的公开密钥做数字签 名，然后分配这个已签名的公开密钥，并将该公开密钥放入公钥证书 后绑定在一起。

服务器会将这份由数字证书认证机构颁发的公钥证书发送给客户端， 以进行公开密钥加密方式通信。公钥证书也可叫做数字证书或直接称 为证书。

接到证书的客户端可使用数字证书认证机构的公开密钥，对那张证书 上的数字签名进行验证，一旦验证通过，客户端便可明确两件事： 一，认证服务器的公开密钥的是真实有效的数字证书认证机构。二， 服务器的公开密钥是值得信赖的。

此处认证机关的公开密钥必须安全地转交给客户端。使用通信方式 时，如何安全转交是一件很困难的事，因此，多数浏览器开发商发布 版本时，会事先在内部植入常用认证机关的公开密钥。

![image-20220804174808165](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804174808165.png)

- 可证明组织真实性的 EV SSL 证书

证书的一个作用是用来证明作为通信一方的服务器是否规范，另 外一个作用是可确认对方服务器背后运营的企业是否真实存在。 拥有该特性的证书就是 EV SSL证书（Extended Validation SSL Certificate）。 

EV SSL证书是基于国际标准的认证指导方针颁发的证书。其严 格规定了对运营组织是否真实的确认方针，因此，通过认证的 Web 网站能够获得更高的认可度。

持有 EV SSL证书的 Web 网站的浏览器地址栏处的背景色是绿色 的，从视觉上就能一眼辨别出。而且在地址栏的左侧显示了 SSL 证书中记录的组织名称以及颁发证书的认证机构的名称。 

![image-20220804175256487](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804175256487.png)

上述机制的原意图是为了防止用户被钓鱼攻击（Phishing），但 就效果上来讲，还得打一个问号。很多用户可能不了解 EV SSL 证书相关的知识，因此也不太会留意它。



- 用以确认客户端的客户端证书

HTTPS 中还可以使用客户端证书。以客户端证书进行客户端认 证，证明服务器正在通信的对方始终是预料之内的客户端，其作 用跟服务器证书如出一辙。

但客户端证书仍存在几处问题点。其中的一个问题点是证书的获取及发布。

想获取证书时，用户得自行安装客户端证书。但由于客户端证书 是要付费购买的，且每张证书对应到每位用户也就意味着需支付 和用户数对等的费用。另外，要让知识层次不同的用户们自行安 装证书，这件事本身也充满了各种挑战。

现状是，安全性极高的认证机构可颁发客户端证书但仅用于特殊 用途的业务。比如那些可支撑客户端证书支出费用的业务。

例如，银行的网上银行就采用了客户端证书。在登录网银时不仅 要求用户确认输入 ID 和密码，还会要求用户的客户端证书，以 确认用户是否从特定的终端访问网银。

客户端证书存在的另一个问题点是，客户端证书毕竟只能用来证 明客户端实际存在，而不能用来证明用户本人的真实有效性。也 就是说，只要获得了安装有客户端证书的计算机的使用权限，也 就意味着同时拥有了客户端证书的使用权限。

- 认证机构信誉第一

SSL机制中介入认证机构之所以可行，是因为建立在其信用绝对 可靠这一大前提下的。然而，2011 年 7 月，荷兰的一家名叫 DigiNotar 的认证机构曾遭黑客不法入侵，颁布了 google.com 和 twitter.com 等网站的伪造证书事件。这一事件从根本上撼动了 SSL的可信度。

因为伪造证书上有正规认证机构的数字签名，所以浏览器会判定 该证书是正当的。当伪造的证书被用做服务器伪装之时，用户根本无法察觉到。

虽然存在可将证书无效化的证书吊销列表（Certificate Revocation List，CRL）机制，以及从客户端删除根证书颁发机构（Root Certificate Authority，RCA）的对策，但是距离生效还需要一段 时间，而在这段时间内，到底会有多少用户的利益蒙受损失就不 得而知了。

- 由自认证机构颁发的证书称为自签名证书

如果使用 OpenSSL这套开源程序，每个人都可以构建一套属于 自己的认证机构，从而自己给自己颁发服务器证书。但该服务器 证书在互联网上不可作为证书使用，似乎没什么帮助。

独立构建的认证机构叫做自认证机构，由自认证机构颁发的“无 用”证书也被戏称为自签名证书。

浏览器访问该服务器时，会显示“无法确认连接安全性”或“该网 站的安全证书存在问题”等警告消息。

![image-20220804180204749](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220804180204749.png)



由自认证机构颁发的服务器证书之所以不起作用，是因为它无法 消除伪装的可能性。自认证机构能够产生的作用顶多也就是自己 对外宣称“我是○○”的这种程度。即使采用自签名证书，通过 SSL 加密之后，可能偶尔还会看见通信处在安全状态的提示，可那也 是有问题的。因为 就算加密通信，也不能排除正在和已经过伪 装的假服务器保持通信。

值得信赖的第三方机构介入认证，才能让已植入在浏览器内的认 证机构颁布的公开密钥发挥作用，并借此证明服务器的真实性。 

中级认证机构的证书可能会变成自认证证书 

多数浏览器内预先已植入备受信赖的认证机构的证书，但也有一 小部分浏览器会植入中级认证机构的证书。 

对于中级认证机构颁发的服务器证书，某些浏览器会以正规的证 书来对待，可有的浏览器会当作自签名证书。



#### HTTPS 的安全通信机制



为了更好地理解 HTTPS，我们来观察一下 HTTPS 的通信步骤。



![image-20220805095619279](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805095619279.png)

步骤 1： 客户端通过发送 Client Hello 报文开始 SSL通信。报文中包 含客户端支持的 SSL的指定版本、加密组件（Cipher Suite）列表（所 使用的加密算法及密钥长度等）。

步骤 2： 服务器可进行 SSL通信时，会以 Server Hello 报文作为应答。和客户端一样，在报文中包含 SSL版本以及加密组件。服务器的 加密组件内容是从接收到的客户端加密组件内筛选出来的。

步骤 3： 之后服务器发送 Certificate 报文。报文中包含公开密钥证 书。

步骤 4： 最后服务器发送 Server Hello Done 报文通知客户端，最初阶段的 SSL握手协商部分结束。 

步骤 5： SSL第一次握手结束之后，客户端以 Client Key Exchange 报 文作为回应。报文中包含通信加密中使用的一种被称为 Pre-master secret 的随机密码串。该报文已用步骤 3 中的公开密钥进行加密。 

步骤 6： 接着客户端继续发送 Change Cipher Spec 报文。该报文会提 示服务器，在此报文之后的通信会采用 Pre-master secret 密钥加密。 

步骤 7： 客户端发送 Finished 报文。该报文包含连接至今全部报文的 整体校验值。这次握手协商是否能够成功，要以服务器是否能够正确 解密该报文作为判定标准。 

步骤 8： 服务器同样发送 Change Cipher Spec 报文。 

步骤 9： 服务器同样发送 Finished 报文。 

步骤 10： 服务器和客户端的 Finished 报文交换完毕之后，SSL连接 就算建立完成。当然，通信会受到 SSL的保护。从此处开始进行应用 层协议的通信，即发送 HTTP 请求。 

步骤 11： 应用层协议通信，即发送 HTTP 响应。 

步骤 12： 最后由客户端断开连接。断开连接时，发送 close_notify 报 文。上图做了一些省略，这步之后再发送 TCP FIN 报文来关闭与 TCP 的通信。



在以上流程中，应用层发送数据时会附加一种叫做 MAC（Message Authentication Code）的报文摘要。MAC 能够查知报文是否遭到篡 改，从而保护报文的完整性。 

下面是对整个流程的图解。图中说明了从仅使用服务器端的公开密钥 证书（服务器证书）建立 HTTPS 通信的整个过程。



![image-20220805100914512](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805100914512.png)

> CBC 模式（Cipher Block Chaining）又名密码分组链接模式。在此模式下，将前 一个明文块加密处理后和下一个明文块做 XOR 运算，使之重叠，然后再对运算 结果做加密处理。对第一个明文块做加密时，要么使用前一段密文的最后一块， 要么利用外部生成的初始向量（initial vector，IV）。



- SSL 和 TLS

HTTPS 使用 SSL（Secure Socket Layer） 和 TLS（Transport Layer Security）这两个协议。

SSL技术最初是由浏览器开发商网景通信公司率先倡导的，开发 过 SSL3.0 之前的版本。目前主导权已转移到 IETF（Internet Engineering Task Force，Internet 工程任务组）的手中。 

IETF 以 SSL3.0 为基准，后又制定了 TLS1.0、TLS1.1 和 TLS1.2。TSL是以 SSL为原型开发的协议，有时会统一称该协议 为 SSL。当前主流的版本是 SSL3.0 和 TLS1.0。 

由于 SSL1.0 协议在设计之初被发现出了问题，就没有实际投入 使用。SSL2.0 也被发现存在问题，所以很多浏览器直接废除了 该协议版本。



- SSL 速度慢吗

HTTPS 也存在一些问题，那就是当使用 SSL时，它的处理速度会变慢。

![image-20220805101427558](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805101427558.png)

SSL的慢分两种。一种是指通信慢。另一种是指由于大量消耗 CPU 及内存等资源，导致处理速度变慢。

和使用 HTTP 相比，网络负载可能会变慢 2 到 100 倍。除去和 TCP 连接、发送 HTTP 请求 • 响应以外，还必须进行 SSL通信， 因此整体上处理通信量不可避免会增加。

另一点是 SSL必须进行加密处理。在服务器和客户端都需要进行 加密和解密的运算处理。因此从结果上讲，比起 HTTP 会更多地 消耗服务器和客户端的硬件资源，导致负载增强。

针对速度变慢这一问题，并没有根本性的解决方案，我们会使用 SSL加速器这种（专用服务器）硬件来改善该问题。该硬件为 SSL通信专用硬件，相对软件来讲，能够提高数倍 SSL的计算速 度。仅在 SSL处理时发挥 SSL加速器的功效，以分担负载。



> **为什么不一直使用 HTTPS** 
>
> 既然 HTTPS 那么安全可靠，那为何所有的 Web 网站不一直使用 HTTPS ？ 
>
> 其中一个原因是，因为与纯文本通信相比，加密通信会消耗更多的 CPU 及内存资源。如果每次通信都加密，会消耗相当多的资源，平 摊到一台计算机上时，能够处理的请求数量必定也会随之减少。 
>
> 因此，如果是非敏感信息则使用 HTTP 通信，只有在包含个人信息 等敏感数据时，才利用 HTTPS 加密通信。
>
> 特别是每当那些访问量较多的 Web 网站在进行加密处理时，它们 所承担着的负载不容小觑。在进行加密处理时，并非对所有内容都 进行加密处理，而是仅在那些需要信息隐藏时才会加密，以节约资 源。 
>
> ![image-20220805102210739](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805102210739.png)
>
> 除此之外，想要节约购买证书的开销也是原因之一。 
>
> 要进行 HTTPS 通信，证书是必不可少的。而使用的证书必须向认 证机构（CA）购买。证书价格可能会根据不同的认证机构略有不 同。通常，一年的授权需要数万日元（现在一万日元大约折合 600 人民币）。 
>
> 那些购买证书并不合算的服务以及一些个人网站，可能只会选择采 用 HTTP 的通信方式。





## 确认访问用户身份的认证



### 何为认证

计算机本身无法判断坐在显示器前的使用者的身份。进一步说，也无 法确认网络的那头究竟有谁。可见，为了弄清究竟是谁在访问服务 器，就得让对方的客户端自报家门。 

可是，就算正在访问服务器的对方声称自己是ueno，身份是否属实这 点却也无从谈起。为确认 ueno 本人是否真的具有访问系统的权限， 就需要核对“登录者本人才知道的信息”、“登录者本人才会有的信 息”。

核对的信息通常是指以下这些。

- 密码：只有本人才会知道的字符串信息。
-  动态令牌：仅限本人持有的设备内显示的一次性密码。 
- 数字证书：仅限本人（终端）持有的信息。 
- 生物认证：指纹和虹膜等本人的生理信息。 
- IC 卡等：仅限本人持有的信息。

![image-20220805103541481](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805103541481.png)



**HTTP 使用的认证方式**

HTTP/1.1 使用的认证方式如下所示。

- BASIC 认证（基本认证） 
- DIGEST 认证（摘要认证） 
- SSL 客户端认证 
- FormBase 认证（基于表单认证）

此外，还有 Windows 统一认证（Keberos 认证、NTLM 认证），



### BASIC 认证

BASIC 认证（基本认证）是从 HTTP/1.0 就定义的认证方式。即便是 现在仍有一部分的网站会使用这种认证方式。是 Web 服务器与通信 客户端之间进行的认证方式。

步骤 1： 当请求的资源需要 BASIC 认证时，服务器会随状态码 401 Authorization Required，返回带 WWW-Authenticate 首部字段的响应。 该字段内包含认证的方式（BASIC） 及 Request-URI 安全域字符串 （realm）。

步骤 2： 接收到状态码 401 的客户端为了通过 BASIC 认证，需要将 用户 ID 及密码发送给服务器。发送的字符串内容是由用户 ID 和密码 构成，两者中间以冒号（:）连接后，再经过 Base64 编码处理。

假设用户 ID 为 guest，密码是 guest，连接起来就会形成 guest:guest 这 样的字符串。然后经过 Base64 编码，最后的结果即是 Z3Vlc3Q6Z3Vlc3Q=。把这串字符串写入首部字段 Authorization 后， 发送请求。

当用户代理为浏览器时，用户仅需输入用户 ID 和密码即可，之后， 浏览器会自动完成到 Base64 编码的转换工作。

![image-20220805104637617](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805104637617.png)



步骤 3： 接收到包含首部字段 Authorization 请求的服务器，会对认证 信息的正确性进行验证。如验证通过，则返回一条包含 Request-URI 资源的响应。

BASIC 认证虽然采用 Base64 编码方式，但这不是加密处理。不需要 任何附加信息即可对其解码。换言之，由于明文解码后就是用户 ID 和密码，在 HTTP 等非加密通信的线路上进行 BASIC 认证的过程 中，如果被人窃听，被盗的可能性极高。

另外，除此之外想再进行一次 BASIC 认证时，一般的浏览器却无法 实现认证注销操作，这也是问题之一。

BASIC 认证使用上不够便捷灵活，且达不到多数 Web 网站期望的安 全性等级，因此它并不常用。



### DIGEST 认证



为弥补 BASIC 认证存在的弱点，从 HTTP/1.1 起就有了 DIGEST 认 证。 DIGEST 认证同样使用质询 / 响应的方式 （challenge/response），但不会像 BASIC 认证那样直接发送明文密 码。

所谓质询响应方式是指，一开始一方会先发送认证要求给另一方，接 着使用从另一方那接收到的质询码计算生成响应码。最后将响应码返 回给对方进行认证的方式。

![image-20220805104852486](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805104852486.png)



因为发送给对方的只是响应摘要及由质询码产生的计算结果，所以比 起 BASIC 认证，密码泄露的可能性就降低了。



**DIGEST 认证的认证步骤**



![image-20220805104947011](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805104947011.png)

**步骤 1**： 请求需认证的资源时，服务器会随着状态码 401 Authorization Required，返 回带 WWW-Authenticate 首部字段的响应。 该字段内包含质问响应方式认证所需的临时质询码（随机数， nonce）。

首部字段 WWW-Authenticate 内必须包含 realm 和 nonce 这两个字段的 信息。客户端就是依靠向服务器回送这两个值进行认证的。

nonce 是一种每次随返回的 401 响应生成的任意随机字符串。该字符 串通常推荐由 Base64 编码的十六进制数的组成形式，但实际内容依 赖服务器的具体实现。



**步骤 2**： 接收到 401 状态码的客户端，返回的响应中包含 DIGEST 认 证必须的首部字段 Authorization 信息。

首部字段 Authorization 内必须包含 username、realm、nonce、uri 和 response 的字段信息。其中，realm 和 nonce 就是之前从服务器接收到 的响应中的字段。

username 是 realm 限定范围内可进行认证的用户名。

uri（digest-uri）即 Request-URI 的值，但考虑到经代理转发后 Request-URI 的值可能被修改，因此事先会复制一份副本保存在 uri 内。

response 也可叫做 Request-Digest，存放经过 MD5 运算后的密码字符 串，形成响应码。

响应中其他的实体请参见请求首部字段 Authorization。\

**步骤 3**： 接收到包含首部字段 Authorization 请求的服务器，会确认认 证信息的正确性。认证通过后则返回包含 Request-URI 资源的响应。 

并且这时会在首部字段 Authentication-Info 写入一些认证成功的相关信息。 

DIGEST 认证提供了高于 BASIC 认证的安全等级，但是和 HTTPS 的 客户端认证相比仍旧很弱。DIGEST 认证提供防止密码被窃听的保护 机制，但并不存在防止用户伪装的保护机制。 

DIGEST 认证和 BASIC 认证一样，使用上不那么便捷灵活，且仍达不 到多数 Web 网站对高度安全等级的追求标准。因此它的适用范围也 有所受限。



### SSL 客户端认证

从使用用户 ID 和密码的认证方式方面来讲，只要二者的内容正确， 即可认证是本人的行为。但如果用户 ID 和密码被盗，就很有可能被 第三者冒充。利用 SSL客户端认证则可以避免该情况的发生。

SSL客户端认证是借由 HTTPS 的客户端证书完成认证的方式。凭借 客户端证书（在 HTTPS 一章已讲解）认证，服务器可确认访问是否 来自已登录的客户端。



#### SSL 客户端认证的认证步骤