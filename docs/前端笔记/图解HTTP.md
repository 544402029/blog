# TCP/IP 的分层管理

TCP/IP 协议族里重要的一点就是分层。TCP/IP 协议族按层次分别分 为以下 4 层：**应用层、传输层、网络层和数据链路层。**
把 TCP/IP 层次化是有好处的。比如，如果互联网只由一个协议统 筹，某个地方需要改变设计时，就必须把所有部分整体替换掉。而分 层之后只需把变动的层替换掉即可。**把各层之间的接口部分规划好之 后，每个层次内部的设计就能够自由改动了。 **
值得一提的是，层次化之后，设计也变得相对简单了。处于应用层上 的应用可以只考虑分派给自己的任务，而不需要弄清对方在地球上哪 个地方、对方的传输路线是怎样的、是否能确保传输送达等问题。

TCP/IP 协议族各层的作用如下。

## 应用层

**应用层决定了向用户提供应用服务时通信的活动。**
TCP/IP 协议族内预存了各类通用的应用服务。比如，FTP（File Transfer Protocol，文件传输协议）和 DNS（Domain Name System，域名系统）服务就是其中两类。**HTTP 协议也处于该层。**

## 传输层

**传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。**
**在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和 UDP（User Data Protocol，用户数据报协议）。**

## 网络层（又名网络互连层）

**网络层用来处理在网络上流动的数据包**。
数据包是网络传输的最小数据单位。该层规定了通过怎样的路径（所谓的传输路线）到达对方计算机，并把数据包传送给对方。
与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所起的作用就是在众多的选项内选择一条传输路线。

## 链路层（又名数据链路层，网络接口层）

**用来处理连接网络的硬件部分。**包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）。硬件上的范畴均在链路层的作用范围之内。

# TCP/IP 通信传输流

![输入图片说明](../../static/images/tonmgxinchuanshuliu.png)

利用 TCP/IP 协议族进行网络通信时，会通过分层顺序与对方进行通 信。发送端从应用层往下走，接收端则往应用层往上走。  
我们用 HTTP 举例来说明，首先作为发送端的客户端在应用层（HTTP 协议）发出一个想看某个 Web 页面的 HTTP 请求。
接着，为了传输方便，在传输层（TCP 协议）把从应用层处收到的数据（HTTP 请求报文）进行分割，并在各个报文上打上标记序号及端口号后转发给网络层。
在网络层（IP 协议），增加作为通信目的地的 MAC 地址后转发给链路层。
这样一来，发往网络的通信请求就准备齐全了。
接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。
当传输到应用层，才能算真正接收到由客户端发送过来的 HTTP 请求。
![输入图片说明](../../static/images/YINGYONGCENG.png)

发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。
反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去。
这种把数据信息包装起来的做法称为封装（encapsulate）。

# 与 HTTP 关系密切的协议 : IP、TCP 和 DNS

## IP

IP 协议的作用是把各种数据包传送给对方。而要保证确实传送到对方 那里，则需要满足各类条件。其中两个重要的条件是 IP 地址和 MAC 地址（Media Access Control Address）。  
IP 地址指明了节点被分配到的地址，MAC 地址是指网卡所属的固定 地址。IP 地址可以和 MAC 地址进行配对。IP 地址可变换，但 MAC 地址基本上不会更改。

### ARP 协议

IP 间的通信依赖 MAC 地址。在网络上，通信的双方在同一局域网 （LAN）内的情况是很少的，通常是经过多台计算机和网络设备中转 才能连接到对方。而在进行中转时，会利用下一站中转设备的 MAC 地址来搜索下一个中转目标。这时，会采用 ARP 协议（Address Resolution Protocol）。**ARP 是一种用以解析地址的协议，根据通信方 的 IP 地址就可以反查出对应的 MAC 地址。 **

![输入图片说明](../../static/images/ARP.png)

## TCP 协议

按层次分，TCP 位于传输层，提供可靠的字节流服务。
所谓的字节流服务（Byte Stream Service）是指，为了方便传输，将大 块数据分割成以报文段（segment）为单位的数据包进行管理。而可 靠的传输服务是指，能够把数据准确可靠地传给对方。一言以蔽之， **TCP 协议为了更容易传送大数据才把数据分割，而且 TCP 协议能够 确认数据最终是否送达到对方。 **

为了准确无误地将数据送达目标处，TCP 协议采用了三次握手 （three-way handshaking）策略。用 TCP 协议把数据包送出去后，TCP 不会对传送后的情况置之不理，它一定会向对方确认是否成功送达。

握手过程中使用了 TCP 的标志（flag） —— **SYN（synchronize） 和 ACK（acknowledgement）**。

**发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后， 回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。 **

若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发 送相同的数据包。

![输入图片说明](../../static/images/tcpxunxu.png)

除了上述三次握手，TCP 协议还有其他各种手段来保证通信的可靠性。

## 负责域名解析的 DNS 服务

DNS（Domain Name System）服务是和 HTTP 协议一样位于应用层的 协议。它**提供域名到 IP 地址之间的解析服务。**
计算机既可以被赋予 IP 地址，也可以被赋予主机名和域名。比如 [www.hackr.jp](https://www.hackr.jp)。

![输入图片说明](../../static/images/dnsfuwu.png)

# 各种协议与 HTTP 协议的关系

![输入图片说明](../../static/images/qingtcp.png)

# URI 和 URL

与 URI（统一资源标识符）相比，我们更熟悉 URL（Uniform Resource Locator，统一资源定位符）。URL 正是使用 Web 浏览器等 访问 Web 页面时需要输入的网页地址。

## 统一资源标识符

URI 就是由某个协议方案表示的资源的定位标识符。协议 方案是指访问资源所使用的协议类型名称。

URI 用字符串标识某一互联网资源，而 URL 表示资源的地点（互联网上所处的位置）。可见 URL 是 URI 的子集。

# HTTP 协议

## 请求报文

请求报文是由请求方法、请求 URI、协议版本、可选的请求首部字段 和内容实体构成的。  
![输入图片说明](../../static/images/qqbw.png)

## 响应报文

响应报文基本上由协议版本、状态码（表示请求成功或失败的数字代 码）、用以解释状态码的原因短语、可选的响应首部字段以及实体主 体构成。

![输入图片说明](../../static/images/zhuangtaimaduanyu.png)

## HTTP 是不保存状态的协议

HTTP 是一种不保存状态，即无状态（stateless）协议。HTTP 协议自身不对请求和响应之间的通信状态进行保存。也就是说在 HTTP 这个 级别，协议对于发送过的请求或响应都不做持久化处理。  
![输入图片说明](../../static/images/wuzhuangtai.png)

## 告知服务器意图的 HTTP 方法

1.  GET ：获取资源
1.  POST：传输实体主体
1.  PUT：传输文件
1.  HEAD：获得报文首部
1.  DELETE：删除文件
1.  OPTIONS：询问支持的方法
1.  TRACE：追踪路径
1.  CONNECT：要求用隧道协议连接代理

![输入图片说明](../../static/images/httpmethod.png)

## 持久连接

HTTP 协议的初始版本中，每进行一次 HTTP 通信就要断开一次 TCP 连接。

### 持久连接

为解决上述 TCP 连接的问题，HTTP/1.1 和一部分的 HTTP/1.0 想出了 持久连接（HTTP Persistent Connections，也称为 HTTP keep-alive 或 HTTP connection reuse）的方法。**持久连接的特点是，只要任意一端 没有明确提出断开连接，则保持 TCP 连接状态。 **
在 HTTP/1.1 中，所有的连接默认都是持久连接，但在 HTTP/1.0 内并 未标准化。虽然有一部分服务器通过非标准的手段实现了持久连接， 但服务器端不一定能够支持持久连接。毫无疑问，除了服务器端，客 户端也需要支持持久连接。

### 管线化

持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从 前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术 出现后，不用等待响应亦可直接发送下一个请求。
这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待 响应了。  
![管线化](../../static/images/guanxianhua.png)

# HTTP 报文内的 HTTP 信息

## HTTP 报文

用于 HTTP 协议交互的信息被称为 HTTP 报文。请求端（客户端）的 HTTP 报文叫做请求报文，响应端（服务器端）的叫做响应报文。 HTTP 报文本身是由多行（用 CR+LF 作换行符）数据构成的字符串文 本。 HTTP 报文大致可分为报文首部和报文主体两块。两者由最初出现的 空行（CR+LF）来划分。通常，并不一定要有报文主体。

## 请求报文及响应报文的结构

![请求报文](../../static/images/qingqiubaowen.png)

图：请求报文（上）和响应报文（下）的结构

![响应报文](../../static/images/xiangyingbaowen.png) 





请求报文和响应报文的首部内容由以下数据组成。现在出现的各种首 部字段及状态码稍后会进行阐述。


- 请求行： 包含用于请求的方法，请求 URI 和 HTTP 版本。 
- 状态行： 包含表明响应结果的状态码，原因短语和 HTTP 版本。 
- 首部字段： 包含表示请求和响应的各种条件和属性的各类首部。
- 一般有 4 种首部，分别是：通用首部、请求首部、响应首部和实体首部。
- 其他： 可能包含 HTTP 的 RFC 里未定义的首部（Cookie 等）。

### 压缩传输的内容编码

向待发送邮件内增加附件时，为了使邮件容量变小，我们会先用 ZIP压缩文件之后再添加附件发送。HTTP 协议中有一种被称为内容编码
的功能也能进行类似的操作。

![输入图片说明](../../static/images/yasuoa.png)

常用的内容编码有以下几种。

- gzip（GNU zip）
- compress（UNIX 系统的标准压缩）
- deflate（zlib）
- identity（不进行编码）

### 分割发送的分块传输编码

在 HTTP 通信过程中，请求的编码实体资源尚未全部传输完成之前，浏览器无法显示请求页面。在传输大容量数据时，通过把数据分割成
多块，能够让浏览器逐步显示页面。

这种把实体主体分块的功能称为分块传输编码（Chunked TransferCoding）。

![输入图片说明](../../static/images/fenkuaichuanshudaima.png)

分块传输编码会将实体主体分成多个部分（块）。每一块都会用十六进制来标记块的大小，而实体主体的最后一块会使用“0(CR+LF)”来标
记。

使用分块传输编码的实体主体会由接收的客户端负责解码，恢复到编码前的实体主体。

HTTP/1.1 中存在一种称为传输编码（Transfer Coding）的机制，它可以在通信时按某种编码方式传输，但只定义作用于分块传输编码中。

### 发送多种数据的多部分对象集合

![输入图片说明](../../static/images/duobufenduixiang.png)

HTTP 协议中也采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体。通常是在图片或文本文件等上传时使用。

- multipart/form-data

    在 Web 表单文件上传时使用。

- multipart/byteranges
    
    状态码 206（Partial Content，部分内容）响应报文包含了多个范
围的内容时使用。

- multipart/form-data

    ![输入图片说明](../../static/images/from-data.png)


- multipart/byteranges

    ![输入图片说明](../../static/images/shangban.png)
    ![输入图片说明](../../static/images/xiaban.png)

在 HTTP 报文中使用多部分对象集合时，需要在首部字段里加上 ** Content-type** 。

## 获取部分内容的范围请求

以前，用户不能使用现在这种高速的带宽访问互联网，当时，下载一个尺寸稍大的图片或文件就已经很吃力了。如果下载过程中遇到网络
中断的情况，那就必须重头开始。为了解决上述问题，需要一种可恢复的机制。所谓恢复是指能从之前下载中断处恢复下载。

要实现该功能需要指定下载的实体范围。像这样，指定范围发送的请求叫做范围请求（Range Request）。

对一份 10 000 字节大小的资源，如果使用范围请求，可以只请求
5001~10 000 字节内的资源。

![输入图片说明](../../static/images/fanweiqingqiu.png)

执行范围请求时，会用到首部字段 Range 来指定资源的 byte 范围。byte 范围的指定形式如下。

- 5001~10 000 字节

    `Range: bytes=5001-10000`

- 从 5001 字节之后全部的

    `Range: bytes=5001-`

- 从一开始到 3000 字节和 5000~7000 字节的多重范围
    
    `Range: bytes=-3000, 5000-7000`

针对范围请求，响应会返回状态码为 206 Partial Content 的响应报文。另外，对于多重范围的范围请求，响应会在首部字段 ContentType 标明 multipart/byteranges 后返回响应报文。

如果服务器端无法响应范围请求，则会返回状态码 200 OK 和完整的实体内容。


# HTTP 首部

## HTTP 首部字段

### HTTP 首部字段传递重要信息

使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容。

![首部字段](../../static/images/shoubuziduan.png)

## HTTP/1.1 通用首部字段

### Cache-Control

![Cache-Control](../../static/images/cachecontrol.png)

`Cache-Control: private, max-age=0, no-cache`

![表 6-5：缓存请求指令](../../static/images/cache1.png)

![表 6-6：缓存响应指令](../../static/images/biao6-6.png)

#### no-cache 指令

![no-cache 指令](../../static/images/no-cache.png)

`Cache-Control: no-cache`

使用 no-cache 指令的目的是为了防止从缓存中返回过期的资源。

客户端发送的请求中如果包含 no-cache 指令，则表示客户端将不会接收缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发给源服务器。

如果服务器返回的响应中包含 no-cache 指令，那么缓存服务器不能对资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资源有效性进行确认，且禁止其对响应资源进行缓存操作。

`Cache-Control: no-cache=Location`

由服务器返回的响应中，若报文首部字段 Cache-Control 中对 no-cache 字段名具体指定参数值，那么客户端在接收到这个被指定参数值的首部字段对应的响应报文后，就不能使用缓存。换言之，无参数值的首部字段可以使用缓存。只能在响应指令中指定该参数。

#### 控制可执行缓存的对象的指令

no-store 指令

`Cache-Control: no-store`

当使用 no-store 指令时，暗示请求（和对应的响应）或响应中包含机密信息。

从字面意思上很容易把 no-cache 误解成为不缓存，但事实上 no-cache 代表不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称为 do-not-serve-from-cache-without-revalidation 更合适。no-store 才是真正地不进行缓存，请读者注意区别理解。

因此，该指令规定缓存不能在本地存储请求或响应的任一部分。

#### 指定缓存期限和认证的指令

s-maxage 指令

`Cache-Control: s-maxage=604800（单位 ：秒）`

s-maxage 指令的功能和 max-age 指令的相同，它们的不同点是 s-maxage 指令只适用于供多位用户使用的公共缓存服务器(代理服务器)。也就是
说，对于向同一用户重复返回响应的服务器来说，这个指令没有任何作用。

另外，当使用 s-maxage 指令后，则直接忽略对 Expires 首部字段及 max-age 指令的处理。

#### max-age 指令

![max-age 指令](../../static/images/max-age.png)

`Cache-Control: max-age=604800（单位：秒）`

当客户端发送的请求中包含 max-age 指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。另外，当指定 max-age 值为 0，那么缓存服务器通常需要将请求转发给源服务器。

当服务器返回的响应中包含 max-age 指令时，缓存服务器将不对资源的有效性再作确认，而 max-age 数值代表资源保存为缓存的最长时间。

应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而HTTP/1.0 版本的缓存服务器的情况却相反，max-age 指令会被忽略掉。

#### min-fresh 指令

![min-fresh](../../static/images/min-fresh.png)

`Cache-Control: min-fresh=60（单位：秒）`

min-fresh 指令要求缓存服务器返回至少还未过指定时间的缓存资源。

比如，当指定 min-fresh 为 60 秒后，过了 60 秒的资源都无法作为响应返回了。

#### max-stale 指令

`Cache-Control: max-stale=3600（单位：秒）`

使用 max-stale 可指示缓存资源，即使过期也照常接收。
如果指令未指定参数值，那么无论经过多久，客户端都会接收响应；如果指令中指定了具体数值，那么即使过期，只要仍处于 max-stale指定的时间内，仍旧会被客户端接收。

#### only-if-cached 指令

`Cache-Control: only-if-cached`

使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回。换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本地缓存无响应，则返回状态码 504 Gateway Timeout。


#### must-revalidate 指令

`Cache-Control: must-revalidate`

使用 must-revalidate 指令，代理会向源服务器再次验证即将返回的响应缓存目前是否仍然有效。

若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端一条 504（Gateway Timeout）状态码。

另外，使用 must-revalidate 指令会忽略请求的 max-stale 指令（即使已经在首部使用了 max-stale，也不会再有效果）。

#### proxy-revalidate 指令

`Cache-Control: proxy-revalidate`

proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前，必须再次验证缓存的有效性。


#### no-transform 指令

`Cache-Control: no-transform`

使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。

这样做可防止缓存或代理压缩图片等类似操作。


### Cache-Control 扩展

#### cache-extension token

`Cache-Control: private, community="UCI"`

通过 cache-extension 标记（token），可以扩展 Cache-Control 首部字段内的指令。

如上例，Cache-Control 首部字段本身没有 community 这个指令。借助 extension tokens 实现了该指令的添加。如果缓存服务器不能理解 community 这个新指令，就会直接忽略。因此，extension tokens 仅对能理解它的缓存服务器来说是有意义的。

### Connection

Connection 首部字段具备如下两个作用。

* 控制不再转发给代理的首部字段
* 管理持久连接
* 控制不再转发给代理的首部字段

![Connection](../../static/images/connection3.png)

在客户端发送请求和服务器返回响应内，使用 Connection 首部字段，可控制不再转发给代理的首部字段（即 Hop-by-hop 首部）。

* 管理持久连接

![Connection: close](../../static/images/connection2.png)

`Connection: close`

HTTP/1.1 版本的默认连接都是持久连接。为此，客户端会在持久连接上连续发送请求。当服务器端想明确断开连接时，则指定 Connection 首部字段的值为 Close。

![持久连接](../../static/images/keep-alive.png)

`Connection: Keep-Alive`

HTTP/1.1 之前的 HTTP 版本的默认连接都是非持久连接。为此，如果想在旧版本的 HTTP 协议上维持持续连接，则需要指定Connection 首部字段的值为 Keep-Alive。

如上图①所示，客户端发送请求给服务器时，服务器端会像上图②那样加上首部字段 Keep-Alive 及首部字段 Connection 后返回响应。

### Date

首部字段 Date 表明创建 HTTP 报文的日期和时间。

HTTP/1.1 协议使用在 RFC1123 中规定的日期时间的格式，如下 示例。

`Date: Tue, 03 Jul 2012 04:40:59 GMT`

之前的 HTTP 协议版本中使用在 RFC850 中定义的格式，如下所示。

`Date: Tue, 03-Jul-12 04:40:59 GMT`

除此之外，还有一种格式。它与 C 标准库内的 asctime() 函数的输出格式一致。

`Date: Tue Jul 03 04:40:59 2012`


### Pragma

Pragma 是 HTTP/1.1 之前版本的历史遗留字段，仅作为与 HTTP/1.0的向后兼容而定义。

规范定义的形式唯一，如下所示。

`Pragma: no-cache`

该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存的资源。

![Pragma](../../static/images/pragma.png)

所有的中间服务器如果都能以 HTTP/1.1 为基准，那直接采用 CacheControl: no-cache 指定缓存的处理方式是最为理想的。但要整体掌握
全部中间服务器使用的 HTTP 协议版本却是不现实的。因此，发送的请求会同时含有下面两个首部字段。


```
Cache-Control: no-cache
Pragma: no-cache
```

### Trailer

![Trailer](../../static/images/Trailer.png)

首部字段 Trailer 会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在 HTTP/1.1 版本分块传输编码时。

![分块传输编码时](../../static/images/chuanshubianma.png.png)

### Transfer-Encoding

![Transfer-Encoding](../../static/images/transfer.png)

首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。

HTTP/1.1 的传输编码方式仅对分块传输编码有效。

![ Transfer-Encoding](../../static/images/%20Transfer-Encoding.png)

以上用例中，正如在首部字段 Transfer-Encoding 中指定的那样，有效使用分块传输编码，且分别被分成 3312 字节和 914 字节大小的分块数据。


### Upgrade

首部字段 Upgrade 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。

![Upgrade](../../static/images/Upgrade.png)

上图用例中，首部字段 Upgrade 指定的值为 TLS/1.0。请注意此处两个字段首部字段的对应关系，Connection 的值被指定为 Upgrade。Upgrade 首部字段产生作用的 Upgrade 对象仅限于客户端和邻接服务器之间。因此，使用首部字段 Upgrade 时，还需要额外指定Connection:Upgrade。

对于附有首部字段 Upgrade 的请求，服务器可用 101 Switching Protocols 状态码作为响应返回。


### Via

使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径。

报文经过代理或网关时，会先在首部字段 Via 中附加该服务器的信息，然后再进行转发。这个做法和 traceroute 及电子邮件的 Received
首部的工作机制很类似。

首部字段 Via 不仅用于追踪报文的转发，还可避免请求回环的发生。所以必须在经过代理时附加该首部字段内容。

![via](../../static/images/via.png)

上图用例中，在经过代理服务器 A 时，Via 首部附加了“1.0 gw.hackr.jp (Squid/3.1)”这样的字符串值。行头的 1.0 是指接收请求的服务器上应用的 HTTP 协议版本。接下来经过代理服务器 B 时亦是如此，在 Via 首部附加服务器信息，也可增加 1 个新的 Via 首部写入服务器信息。

Via 首部是为了追踪传输路径，所以经常会和 TRACE 方法一起使用。比如，代理服务器接收到由 TRACE 方法发送过来的请求（其中Max-Forwards: 0）时，代理服务器就不能再转发该请求了。这种情况下，代理服务器会将自身的信息附加到 Via 首部后，返回该请求的响应。


### Warning

HTTP/1.1 的 Warning 首部是从 HTTP/1.0 的响应首部（Retry-After）演变过来的。该首部通常会告知用户一些与缓存相关的问题的警告。

`Warning: 113 gw.hackr.jp:8080 "Heuristic expiration" Tue, 03 Jul 2012 05:09:44 GMT`

Warning 首部的格式如下。最后的日期时间部分可省略。

`Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])`

HTTP/1.1 中定义了 7 种警告。警告码对应的警告内容仅推荐参考。另外，警告码具备扩展性，今后有可能追加新的警告码。

![表 6-7：HTTP/1.1 警告码](../../static/images/HTTP/1.1%20%E8%AD%A6%E5%91%8A%E7%A0%81.png)


## 请求首部字段

请求首部字段是从客户端往服务器端发送请求报文中所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容。


### Accept

![Accept](../../static/images/accept.png)

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

### Accept-Charset

![Accept-Charset](../../static/images/charset.png)

`Accept-Charset: iso-8859-5, unicode-1-1;q=0.8`

Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字
段 Accept 相同的是可用权重 q 值来表示相对优先级。

该首部字段应用于内容协商机制的服务器驱动协商。

### Accept-Encoding

![Accept-Encoding](../../static/images/encoding.png)

`Accept-Encoding: gzip, deflate`

Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。

下面试举出几个内容编码的例子。

* gzip

由文件压缩程序 gzip（GNU zip）生成的编码格式（RFC1952），采用 Lempel-Ziv 算法（LZ77）及 32 位循环冗余校验（Cyclic Redundancy Check，通称 CRC）。

* compress

由 UNIX 文件压缩程序 compress 生成的编码格式，采用 LempelZiv-Welch 算法（LZW）。deflate 组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。

* identity

不执行压缩或不会变化的默认编码格式采用权重 q 值来表示相对优先级，这点与首部字段 Accept 相同。另外，也可使用星号（*）作为通配符，指定任意的编码格式。







