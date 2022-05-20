# 5 层网络模型

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1641724679523-65024daf-498d-43fb-800a-c952e0cfee27.png#clientId=u39c1ff95-5071-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=810&id=ub4259a85&margin=%5Bobject%20Object%5D&name=image.png&originHeight=810&originWidth=1192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=192665&status=done&style=none&taskId=ubdf5da0c-024e-4078-b96c-f16da9fcc14&title=&width=1192)

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

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1642786434418-767f577f-bf11-48e9-a2cc-5926358652d5.png#clientId=ua138ee1d-d66a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=795&id=u1dfdb6db&margin=%5Bobject%20Object%5D&name=image.png&originHeight=795&originWidth=1488&originalType=binary&ratio=1&rotation=0&showTitle=false&size=149843&status=done&style=none&taskId=uc0cc31be-2b36-492f-8615-ba654e87732&title=&width=1488)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1642786468041-b9973717-8a43-4637-b7bb-b1326b88ac0b.png#clientId=ua138ee1d-d66a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=851&id=u0f298e99&margin=%5Bobject%20Object%5D&name=image.png&originHeight=851&originWidth=1591&originalType=binary&ratio=1&rotation=0&showTitle=false&size=140913&status=done&style=none&taskId=u1cb43ff6-69c3-4daa-adf6-7d4d08cdbce&title=&width=1591)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2735637/1642786512137-21b19a0f-44f8-44ec-8562-5780af47a921.png#clientId=ua138ee1d-d66a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=828&id=u9d48ab45&margin=%5Bobject%20Object%5D&name=image.png&originHeight=828&originWidth=1572&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49638&status=done&style=none&taskId=u7c406e72-31b7-4338-b44a-29c442c5835&title=&width=1572)

### 持久连接

一次连接后不会断开 TCP

### pipleline

http1.0 为串行发送，服务端的上个请求发送完毕后才能继续发送下一个请求
1.1 为并行发送
