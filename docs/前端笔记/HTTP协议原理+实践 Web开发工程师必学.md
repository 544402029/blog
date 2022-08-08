# 5 层网络模型

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/wucengmoxing.png)

## 物理层

物理层主要作用是定义物理设备如何传输数据。
比如网卡端口，网线，光缆等

## 数据链路层

数据链路层在通信的实体间建立数据链路连接。
通过物理设备建立一个电路的连接，两边可以传输数据，基本上就是基础的传输数据（0101 之类的东西）

## 网络层

网络层为数据在结点之间传输创建逻辑链路
比如从我的电脑访问百度的服务器，那么我们如何寻找百度这台服务器所在的地址？它就是一个逻辑关系，那么这个关系就是在网络层为我们创建的。

## 传输层

向用户提供可靠的端到端服务。

> 两台设备传输的方式都是在这层定义的，传输数据过大可能会分包，分片。传递到另一台设备会进行组装。

传输层向高层屏蔽了下层数据通信的细节。

> 数据的拼装以及传输过程，我们是不用知道的，因为传输层已经封装好了。

TCP/IP 协议， UDP 协议处于该层。

## 应用层

为应用软件提供了很多服务。
构建于 TCP 协议之上。
屏蔽了网络传输相关细节。

# 发展历史

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/http0.9.png)

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/http1.0.png)

![输入图片说明](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/http1.1.png)

### 持久连接

一次连接后不会断开 TCP

### pipleline

http1.0 为串行发送，服务端的上个请求发送完毕后才能继续发送下一个请求
1.1 为并行发送
