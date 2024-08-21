# Node.js

## 前置高阶函数的知识

### 关于函数

什么是高阶函数： 把函数作为参数或者返回值的一类函数。

```js
function core(a, b, c) {
  console.log("核心逻辑", a, b, c);
}

// 切片编程
core.before = function (fn) {
  return (...args) => {
    fn();
    this(...args); // AOP, 切片在原有的逻辑中增加额外的逻辑
  };
};

const newCore = core.before(() => {
  console.log("新增的业务逻辑");
});
newCore("a", "b", "c");
```



AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，其实就是给原函数增加一层，不用管原函数内部实现。



### Promise

#### 实现Promises/A+ 规范的Promise



```js
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError(
        "[TypeError: Chaining cycle detected for promise #<Promise>]"
      )
    );
  }

  if (typeof x === "function" || (typeof x === "object" && x !== null)) {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x); // {then:{}}  | {} | function
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    // 默认promise的状态
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      // 为了满足ECMAScript的功能，自己额外的添加
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }

      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  catch(errFn) {
    return this.then(null, errFn);
  }
  then(onFulfilled, onRejected) {
    // then方法中如果没有传递参数，那么可以透传到下一个then中
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 如果同步的话, promise2还没有拿到， 所以要在异步方法中执行
        process.nextTick(() => {
          try {
            // x是onFulfilled，onRejected执行的结果，进行下一步then的链式传递
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        process.nextTick(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          process.nextTick(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          process.nextTick(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
}

Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
// npm install promises-aplus-tests -g

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let idx = 0;
    let result = [];
    values.forEach((item, i) => {
      Promise.resolve(item).then((val) => {
        result[i] = val;
        if (++idx === values.length) {
          resolve(result);
        }
      }, reject);
    });
  });
};

Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    values.forEach((item, i) => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
};

Promise.prototype.finally = function (fn) {
  return this.then(
    (val) => {
      return Promise.resolve(fn()).then(() => val);
    },
    (r) => {
      return Promise.resolve(fn()).then(() => {
        throw r;
      });
    }
  );
};

function promisify(fn) {
  // 高阶函数
  // 只针对node， 因为node中函数参数第一个永远是错误，基于传递的参数构建promise
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  };
}

module.exports = Promise;


```



使用promise

```js
const Promise = require("./promise");
const fs = require("fs");
const path = require("path");

// function readFile(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, "utf8", (err, data) => {
//       if (err) return reject(err);
//       resolve(data);
//     });
//   });
// }

// let promise2 = readFile(path.resolve(__dirname, "name.txt")).then((data) => {
//   // return 100;
//   return new Promise((resolve, reject) => {
//     resolve(100);
//   });
// });

// let promise2 = new Promise((resolve) => resolve()).then((data) => {
//   // return 100;
//   // return null;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(
//         new Promise((resolve, reject) => {
//           setTimeout(() => {
//             // resolve(100);
//             resolve({});
//           }, 1000);
//         })
//       );
//     }, 1000);
//   });
// });

// promise2.then(
//   (data) => {
//     console.log(data, "outer");
//   },
//   (err) => {
//     console.log(err, "error");
//   }
// );

// Promise.resolve(
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("resolve");
//     }, 1000);
//   })
// ).then((data) => {
//   console.log(data);
// });

// Promise.reject(
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("reject");
//     }, 1000);
//   })
// ).then(
//   (data) => {
//     console.log(data);
//   },
//   function (err) {
//     console.log(err, "error");
//   }
// );

// Promise.reject(
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("reject1");
//     }, 1000);
//   })
// )
//   .catch((err) => {
//     console.log(err, "error1");
//   })
//   .then((val) => {
//     console.log(val, "success");
//   });

function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, "utf8", (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

// Promise.all([
//   readFile(path.resolve(__dirname, "name.txt")),
//   readFile(path.resolve(__dirname, "age.txt")),
// ]).then((data) => {
//   console.log(data);
// });

// Promise.race([
//   readFile(path.resolve(__dirname, "name.txt")),
//   readFile(path.resolve(__dirname, "age.txt")),
//   100,
// ]).then((data) => {
//   console.log(data);
// });

// function withAbort(userPromise) {
//   let abort;
//   const internalPromise = new Promise((resolve, reject) => {
//     abort = reject;
//   });
//   let p = Promise.race([userPromise, internalPromise]);
//   p.abort = abort;
//   return p;
// }

// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100);
//   }, 3000);
// });

// p = withAbort(p);
// setTimeout(() => {
//   p.abort("超时了");
// }, 2000);
// p.then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err, "error");
// });

Promise.resolve("a")
  .finally(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("b");
      }, 1000);
    });
  })
  .then((value) => {
    console.log("成功", value);
  })
  .catch((value) => {
    console.log("失败", value);
  });

```





#### 实现generator

```
// 实现一个简易的generator, generator 的原理就是将一个函数分解成多个 switch case通过指针指向要执行的函数
function wrap(iteratorFn) {
  const _context = {
    next: 0,
    done: false,
    send: undefined,
    stop() {
      this.done = true;
    },
  };
  return {
    next(value) {
      _context.send = value;
      let v = iteratorFn(_context);
      return {
        value: v,
        done: _context.done,
      };
    },
  };
}

function gen() {
  var a, b, c;
  return wrap(function $gen(_context) {
    switch ((_context.prev = _context.next)) {
      case 0:
        _context.next = 2;
        return 1;
      case 2:
        a = _context.send;
        console.log(a);
        _context.next = 6;
        return 2;
      case 6:
        b = _context.send;
        console.log(b);
        _context.next = 10;
        return 3;
      case 10:
        c = _context.send;
        console.log(c);
      case 12:
      case "end":
        return _context.stop();
    }
  });
}

let it = gen();
console.log(it.next());
console.log(it.next("b"));
console.log(it.next("c"));
console.log(it.next("d"));
console.log(it.next("e"));
console.log(it.next("f"));

```







## 进制转换与编码

### 任意进制转化十进制



```js
// 电脑的世界里只 0,1。 进制转化问题， 二进制的缺点:长，不容易阅读
// 10进制  -> 2进制 8进制  16进制

// 二进制0b开头  八进制0开头 十六进制 0x开头

// 任意进制转为十进制  （乘权求和）
// 111 是二进制 -》7   10进制
// 1       1       1
// 1x2^2 + 1x2^1 + 1*2^0 = 7
// 当前位的值 * 进制^(所在位-1) 累加

// 111 是16进制 -》17 10进制
// 1*16^2 + 1*16^1 + 1*16^0 = 273
```







### 如何将十进制转换为任意进制

![image-20230921174113703](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20230921174113703.png)

**将十进制10转换为二进制的过程如下：**

1. 将十进制数除以2。
2. 记录商和余数。
3. 将得到的商继续除以2,重复步骤2。
4. 当商为0时，停止除法过程。
5. 余数的倒序即为二进制表示。

例如，将十进制数10转换为二进制：

1. 10÷2=5⋯0
2. 5÷2=2⋯1
3. 2÷2=1⋯0
4. 1÷2=0⋯1

将余数倒序排列，得到二进制表示：1010





**十进制10转为八进制的步骤如下：**

1.将10除以8,得到商1余2。这意味着八进制数的最低位是2。

2.然后将商1再除以8,得到商0余1。这意味着八进制数的次低位是1。

3.由于商已经为0,所以我们可以停止除法过程。

4.最后，将所有余数从下到上(也就是从最后一个余数到第一个余数)连在一起，就得到了八进制数。

所以，十进制的10转为八进制是12。





**代码中的进制转换**

```
console.log(parseInt("01010", 2));
console.log(parseInt("12", 8));
console.log(parseInt("0xa", 16));

console.log((10).toString(16));
```





## OSI七层模型

> OSI ( Open System Interconnection )是理想化的模型，将⽹络进⾏分层，其⽬的是将复杂的流程简单化，从⽽实现**分⽽治之**。（专⼈⼲专事）

### ⼀、⽹络分层的含义?

> 下层是为了上层提供服务的。

应⽤层：⽤户最终使⽤的接⼝

表示层：数据的表示、安全、压缩

会话层：建⽴和管理会话的

传输层：（**主要提供安全及数据完整性保障**）⽹络层不可靠，保证可靠的传输

⽹络层：（**主要关⼼的是寻址**） ，进⾏逻辑寻址，定位到对⽅，找到最短的路

数据链路层： （**主要关⼼两个设备之间传递数据**），建⽴逻辑链接，将数据组合成数据帧进⾏传递 （差错校

测，可靠传输）

物理层：（**核⼼是传输数据⽐特流**），不关⼼具体的传输媒体（双绞线、光纤、同轴电缆、⽆线...）



> 举例：**写给⼥朋友信的过程**

1.应⽤层：你⼼⾥有很多想对⼥朋友说的话。这个就是应⽤层中的数据

2.表示层：将你想说的话进⾏整合，有调理的表示出来

3.会话层：我希望我的信只能我的⼥朋看到别⼈不⾏ （⾮⼥朋友偷看者死）

以上这三个就是我们完整信的内容。

4.传输层：我⾃⼰不好意思亲⼿交给她，找个快递来。告诉他我家504她家301，你发吧~

5.⽹络层：快递说这不是开玩笑吗？你得给我个能找到他的地址 xxx 省 xxx 市 xxx 街道 xxx ⼩区。还得添上

你的地址， 原地址和⽬标地址。

6.数据链路层：信件到了快递总部，会进⾏分类增加标识，快递需要中转，先找到第⼀个中转站发过去，之后

根据⽬的地地址依次进⾏中转发送。

7.物理层：通过⻜机、卡⻋将信邮寄到过去。

信件邮寄到⽬的地后，邮局会分配到对应的⼩区，找到对应的⻔牌号，我的⼥朋友就会拿到对应的信件了。



![image-20231030171730114](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20231030171730114.png)



### ⼆. 地址

>  通信是通过 ip 地址查找对应的 mac 来进⾏通信的。 IP地址 是可变的（类似我们收件地址）MAC地址是不可变的。

1. #### IP地址

IPV4 ⽹际协议版本4 ，地址由 32 位⼆进制数值组成 例如：192.168.1.1 ，⼤概42亿个

IPV6 ⽹际协议版本6 ，地址由 8个16位块的128位组成。 例如：2408:8207:788b:2370:9530:b5e7:9c53:ff87

⼤约 3.4*10^38

2. #### MAC地址

设备通信都是由内部的⽹卡设备来进⾏的，每个⽹卡都有⾃⼰的mac地址（原则上唯⼀）



### 三. 物理设备

#### 1.物理层

* 中继器：双绞线最⼤传输距离 100M ，中继器可以延⻓⽹络传输的距离，对衰减的信号有放⼤在⽣的功能。

* 集线器：多⼝的中继器，⽬的是将⽹络上的所有设备连接在⼀起 , 不会过滤数据，也不知道将收到的数据发给谁。（采⽤的⽅式就是⼴播给每个⼈）

> 可以实现局域⽹的通信，但是会有安全问题，还会造成不必要的流量浪费。 傻，你就不能记住来过的⼈嘛？每次都发送？



#### 2.数据链路层

* 交换机：交换机可以识别已经连接设备的物理地址（MAC地址）。可以将数据传递到相应的端⼝上



#### 3.⽹络层

* 路由器：检测数据的 ip 地址是否属于⾃⼰⽹络，如果不是会发送到另⼀个⽹络。没有 wan ⼝的路由器可以看成交换机。 路由器⼀般充当⽹关，路由器会将本地 IP 地址进⾏NAT

  

> ⽹关：两个⼦⽹之间不可以直接通信，需要通过⽹关进⾏转发



![image-20231030172333084](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20231030172333084.png)



### 四. TCP/IP参考模型

Transmission Control Protocol/Internet Protocol，传输控制协议/⽹际协议。 TCP/IP 协议实际上是⼀系列⽹络

通信协议的统称，最核⼼的两个协议是 TCP 和 IP

#### 1.什么是协议?

> 协议就是约定和规范。

数据链路层、物理层 ：物理设备 (在五层模型中能称之为协议的都在三层以上)

* ⽹络层：

  - ==IP== 协议：寻址通过路由器查找，将消息发送给对⽅路由器，通过 ==ARP== 协议,发送⾃⼰的mac地址

  - ==ARP== 协议：Address Resolution Protocol 从 ==ip== 地址获取 ==mac==地址 （局域⽹）

* 传输层
  - ==TCP== 、 ==UDP==

- 应⽤层:

  - ==HTTP== 、 ==DNS== 、 ==FTP== 、 ==TFTP== 、 ==SMTP== 、 ==DHCP==



#### **2.** ARP协议

> 根据⽬的 IP 地址，解析⽬的 mac 地址

![image-20231030172940286](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20231030172940286.png)

> 有了源mac地址和⽬标mac地址，就可以传输数据包了



#### 3.DHCP协议

通过 DHCP ⾃动获取⽹络配置信息 （动态主机配置协议Dynamic Host Configuration

Protocol）我们⽆需⾃⼰⼿动配置 IP

#### 4.DNS协议

DNS 是Domain Name System的缩写， DNS 服务器进⾏域名和与之对应的 IP 地址转换的服务器

- 顶级域名 .com 、

- ⼆级域名 .com.cn 、 三级域名 www.zf.com.cn , 有多少个点就是⼏级域名

访问过程：我们访问 zf.com.cn

- 操作系统⾥会对 DNS 解析结果做缓存，如果缓存中有直接返回 IP 地址查找 C:\WINDOWS\system32\drivers\etc\hosts 如果有直接返回 IP 地址

- 通过 **DNS** **服务器**查找离⾃⼰最近的根服务器，通过根服务器找到 .cn 服务器，将 ip 返回给 DNS 服务器

- DNS 服务器会继续像此 ip 发送请求，去查找对应 .cn 下 .com 对应的 ip ...

- 获取最终的 ip 地址。缓存到 DNS 服务器上



![image-20231030173401825](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20231030173401825.png)



> DNS 服务器会对 ip 及 域名 进⾏缓存



### 五 TCP**和**UDP

两个协议都在传输层，我们经常说 TCP 是⾯向连接的⽽ UDP 是⾯向⽆连接的。

UDP 发出请求后，不考虑对⽅是否能接收到、内容是否完整、顺序是否正确。 收到数据后也不会进⾏通知。

⾸部结构简单，在数据传输时能实现最⼩的开销**1.** **TCP**

tcp 传输控制协议 Transimision Control Protocal 可靠、⾯向连接的协议,传输效率低 (在不可靠的 IP 层上

建⽴可靠的传输层)。 TCP提供全双⼯服务，即数据可在同⼀时间双向传播。

1）TCP数据格式

源端⼝号、⽬标端⼝号，指代的是发送⽅随机端⼝，⽬标端对应的端⼝

序列号：32位序列号是⽤于对数据包进⾏标记，⽅便重组

确认序列号：期望发送⽅下⼀个发送的数据的编号

4位⾸部⻓度：单位是字节，4位最⼤能表示15，所以头部⻓度最⼤为60

URG :紧急新号、 ACK :确认信号、 PSH :应该从TCP缓冲区读⾛数据、 RST ：断开重新连接、 SYN :建⽴连

接、 FIN :表示要断开

窗⼝⼤⼩： 当⽹络通畅时将这个窗⼝值变⼤加快传输速度，当⽹络不稳定时减少这个值。在TCP中起到流量控

制作⽤。

校验和：⽤来做差错控制，看传输的报⽂段是否损坏

紧急指针：⽤来发送紧急数据使⽤

TCP 对数据进⾏分段打包传输，对每个数据包编号控制顺序。

**2.** TCP抓包

**client.js**

const net = require('net');

const socket = new net.Socket();

// 连接8080端⼝

socket.connect(8080, 'localhost');

// 连接成功后给服务端发送消息

socket.on('connect', function(data) {

socket.write('hello'); // 浏览器和客户端说 hello**server.js**

**1**）建⽴连接

1）我能主动给你打·电话吗？ 2）当然可以啊！那我也能给你打电话吗？

socket.end()

});

socket.on('data', function(data) {

console.log(data.toString())

})

socket.on('error', function(error) {

console.log(error);

});

const net = require('net');

const server = net.createServer(function(socket){

socket.on('data',function (data) { // 客户端和服务端

socket.write('hi'); // 服务端和客户端说 hi

 });

socket.on('end',function () {

console.log('客户端关闭')

 })

})

server.on('error',function(err){

console.log(err);

})

server.listen(8080); // 监听8080端⼝3）可以的呢，建⽴连接成功！

**4**）数据传输四次挥⼿

1）我们分⼿吧 2）收到分⼿的信息

3）好吧，分就分吧 4）⾏，那就到这⾥了

为了防⽌最终的 ACK 丢失，发送 ACK 后需要等待⼀段时间，因为如果丢包服务端需要重新发送 FIN 包，如果

客户端已经 closed ，那么服务端会将结果解析成错误。 从⽽在⾼并发⾮⻓连接的场景下会有⼤量端⼝被占

⽤。

**3.** **UDP**

udp ⽤户数据报协议 User Datagram Protoco ，是⼀个⽆连接、不保证可靠性的传输层协议。你让我发什么就

发什么！

使⽤场景： DHCP 协议、 DNS 协议、 QUIC 协议等 (处理速度快，可以丢包的情况)

**4.** **UDP**抓包

**server.js**

**client.js**

var dgram = require("dgram");

var socket = dgram.createSocket("udp4");

socket.on("message", function (msg, rinfo) {

console.log(msg.toString());

console.log(rinfo);

socket.send(msg, 0, msg.length, rinfo.port, rinfo.address);

});

socket.bind(41234, "localhost");udp.dstport ==41234

**5.**滑动窗⼝

发送连续的数据

滑动窗⼝：TCP是全双⼯的，所以发送端有发送缓存区；接收端有接收缓存区，要发送的数据都放 到发送者的

缓存区，发送窗⼝（要被发送的数据）就是要发送缓存中的哪⼀部分

核⼼是流量控制：在建⽴连接时，接收端会告诉发送端⾃⼰的窗⼝⼤⼩（ rwnd ）,每次接收端收到数据后都会

再次确认（ rwnd ）⼤⼩，如果值为0，停⽌发送数据。 （并发送窗⼝探测包，持续监测窗⼝⼤⼩）

**6.**粘包

Nagle 算法的基本定义是**任意时刻，最多只能有⼀个未被确认的⼩段** (TCP内部控制)

Cork算法 当达到 MSS (Maximum Segment Size )值时统⼀进⾏发送（此值就是帧的⼤⼩ - ip 头 - tcp 头 = 1460

个字节）理论值

**7.** **TCP**拥塞处理 （队头阻塞，慢启动， 短连接）

举例：假设接收⽅窗⼝⼤⼩是⽆限的，接收到数据后就能发送 ACK 包，那么传输数据主要是依赖于⽹络带

宽，带宽的⼤⼩是有限的。

TCP 维护⼀个拥塞窗⼝ cwnd （congestion window）变量 ，在传输过程正没有拥塞就将此值增⼤。如果出

现拥塞（超时重传 RTO(Retransmission TimeOut) ）就将窗⼝值减少。

cwnd < ssthresh 使⽤慢开始算法

cwnd > ssthresh 使⽤拥塞避免算法

ROT时更新 ssthresh 值为当前窗⼝的⼀半，更新 cwnd = 1

var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

socket.on('message',function(msg,rinfo){

console.log(msg.toString());

console.log(rinfo);

});

socket.send(Buffer.from('helloworld'),0,5,41234,'localhost',function(err,bytes){

console.log('发送了个%d字节',bytes);

});

socket.on('error',function(err){

console.error(err);

});传输轮次： RTT (Round-trip time) ,从发送到确认信号的时间

cwnd 控制发送窗⼝的⼤⼩。

快重传，可能在发送的过程中出现丢包情况。此时不要⽴即回退到慢开始阶段，⽽是对已经收到的报⽂重复

确认，如果确认次数达到3此，则⽴即进⾏重传 **快恢复算法** (减少超时重传机制的出现)，降低重置 cwnd 的频

率。

**HTTP**

**⼀**.HTTP发展历程

1990年 HTTP/0.9 为了便于服务器和客户端处理，采⽤了“纯⽂本”格式，只运⾏使⽤GET请求。在响应请求之后会

⽴即关闭连接。

1996年 HTTP/1.0 增强了 0.9 版本，引⼊了 HTTP Header（头部）的概念，传输的数据不再仅限于⽂本，可以解

析图⽚⾳乐等，增加了响应状态码和 POST , HEAD 等请求⽅法。 （内容协商）

**1999**年⼴泛使⽤ HTTP/1.1 ，正式标准，允许持久连接，允许响应数据分块，增加了缓存管理和控制，增加了

PUT、DELETE 等新的⽅法。 (问题 多个请求并发 http`队头阻塞的问题)**2015**年 HTTP/2 ，使⽤ HPACK 算法压缩头部，减少数据传输量。允许服务器主动向客户端推送数据，⼆进制协议可

发起多个请求，使⽤时需要对请求加密通信。

**2018**年 HTTP/3 基于 UDP 的 QUIC 协议。

**⼆**.HTTP/1.1

HTTP/1.1 是可靠传输协议，基于 TCP/IP 协议；

采⽤应答模式，客户端主动发起请求，服务器被动回复请求；

HTTP是⽆状态的每个请求都是互相独⽴

HTTP 协议的请求报⽂和响应报⽂的结构基本相同，由三部分组成。

我始终认为，学好HTTP就是掌握HTTP中Header的使⽤ **客户端**Header

**服务端**Header

Accept 

Content-Type 

我发送给你的数据是什么类型

Accept-encoding 

Content-Encoding 

我发送给你的数据是⽤什么格式压缩 ( gzip 、 deflate 、 br )

Accept-language 

根据客户端⽀持的语⾔返回 （多语⾔）

Range 

Content-Range 

范围请求数据 206

**1.**内容协商

客户端和服务端进⾏协商，返回对应的结果

**2.**⻓连接

TCP 的连接和关闭⾮常耗时间，所以我们可以复⽤ TCP 创建的连接。HTTP/1.1响应中默认会增

加 Connection:keep-alive

**3.  ** **管线化**

如果值创建⼀条 TCP 连接来进⾏数据的收发，就会变成 "串⾏" 模式，如果某个请求过慢就会发⽣阻塞问题。

**Head** **-of-line blocking** 管线化就是不⽤等待响应亦可直接发送下⼀个请求。这样就能够做到同时并⾏发送多个请

求

同⼀个域名有限制，那么我就多开⼏个域名 **域名分⽚**

**4.** **Cookie**

**Set-Cookie/Cookie**⽤户第⼀次访问服务器的时候，服务器会写⼊身份标识，下次再请求的时候会携带 cookie 。

通过Cookie可以实现有状态的会话

**5.**  **HTTP ** **缓存**

**强缓存** 服务器会将数据和缓存规则⼀并返回，缓存规则信息包含在响应header中。 Cache-Control

const http = require('http')

const server = http.createServer((req,res)=>{

res.end('hello')

})

server.listen(3000)强制缓存存在有效期，缓存期内不会向服务端发送请求。超过时间后需要去服务端验证是否是最新版本。

**对⽐缓存**

**if-Modified-Since/if-None-Match** （最后修改时间）、 **Last-modified/Etag** (指纹)

最后修改时间是秒级的，⼀秒内修改多次⽆法监控

最后修改时间修改了，但是内容没有发⽣变化

**三****HTTPS** **（保证密⽂ 防⽌篡改）**

HTTP采⽤明⽂传输，中间⼈可以获取到明⽂数据 （从⽽实现对数据的篡改）。这时候 HTTPS 就登场了！ HTTPS 是

什么呢？ **HTTPS = HTTP + SSL/TLS** ， SSL 安全套接层（Secure Sockets Layer） 发展到 v3 时改名为 TLS

传输层安全(Transport Layer Security)，主要的⽬的是提供数据的完整性和保密性。**⼀****.****数据完整性**

**1.****摘要算法**

把任意⻓度的数据压缩成固定的⻓度

输⼊不同输出的结果发⽣剧烈的变化“雪崩效应”，相同的内容摘要后结果相同

不能从结果反推输⼊

我们可以在内容后⾯增加hash值进⾏传输，服务端收到后通过hash值来校验内容是否完整。数据是明⽂的显

然**不安全**

**⼆****.****数据加密**

**1.****对称加密**

加密和解密时使⽤的密钥都是同⼀个， 通信过程使⽤秘钥加密后的密⽂传输。只有⾃⼰和⽹站才能解密。

M

⽬前 AES （Advanced Encryption Standard） ChaCha20 为最常⻅的对称加密算法 。**2.****⾮对称加密**

⾮对称加密可以解决“密钥交换”的问题。⾮对称加密有两个秘钥，**公钥**、**私钥**，所以称之为⾮对称。公钥加密私钥

解密。

并不能完全采⽤⾮对称加密算法，由于算法本身耗时远⾼于对称加密。

使⽤ RSA 、 ECDHE 算法解决秘钥交换的问题

最常听到的⾮对称加密算法是 RSA 、 ECC (⼦算法 ECDHE ⽤于密钥交换， ECDSA ⽤于数字签名)(性能和安全

略胜⼀筹) HTTPS 中⽬前⼴泛使⽤ ECC 。

**3.****混合加密**

通信刚开始的时候使⽤⾮对称算法，交换秘钥。在客户端⽣成**会话秘钥**后传送给服务端，后续通信采⽤对称加密的

⽅式这⾥还并不安全，还涉及到中间⼈攻击。（ 指攻击者与通讯的两端分别创建独⽴的联系,并交换其所收到的数

据 ）

**4.****数字证书和****CA**

因为谁都可以发布公钥，所以我们需要验证对⽅身份。防⽌中间⼈攻击客户端会判断有效期、颁发者、证书是否被修改及证书是否被吊销。 每份签发证书都可以根据验证链查找到

对应的根证书，操作系统、浏览器会在本地存储权威机构的根证书，利⽤本地根证书可以对对应机构签发证

书完成来源验证。

加密：对传输的数据进⾏加密。

数据⼀致性：保证传输过程中数据不会被篡改。

身份认证：确定对⽅的真实身份。

**三****.** **HTTPS****过程**

**1.****第⼀阶段**

客户端会发送 handshake Protocol：client hello

Cipher Suites 密钥交换算法 + 签名算法 + 对称加密算法 + 摘要算法 套件列表

Random 客户端随机数

Version: TLS 1.2

服务端会发送 handleshake Protocol：Server Hello

Version: TLS 1.2

Random 服务端随机数

Cipher Suites：选择的套件

双⽅选择 TLS 版本，确定加密算法，⽣成两个随机数。

**2.****第⼆阶段**

服务端发送证书 certificate

服务端发送 ECDHE 参数，服务端Hello完成 

Server Key Exchange

Server Hello Done

客户端发送 ECDHE 参数，以后使⽤秘钥进⾏通信吧，加密握⼿消息发送给对⽅

Client Key Exchange

Change Cipher Spec

Encrypted HandleShake Message

服务端发送会话凭证，以后使⽤秘钥进⾏通信吧，加密握⼿消息发送给对⽅new Session Ticket

Change Cipher Spec

Encrypted HandleShake Message**SSL****协议组成**

SSL 握⼿协议、 SSL 秘钥变化协议、 SSL 警告协议、 SSL 记录协议等

**四****.HTTP/2**

HTTP/2主要的⽬标就是改进性能，兼容HTTP/1.1

问题1： HTTP/1.1 中只优化了 body （ gzip 压缩）并没有对头部进⾏处理

问题2： HTTP/1.1 问题在于当前请求未得到响应时，不能复⽤通道再次发送请求。需要开启**新的****TCP****连接**发送请

求这就是我们所谓的管线化，但是后续的响应要遵循FIFO原则，如果第⼀个请求没有返回会被阻塞 **HTTP****队头阻塞**

**问题**。 (最多并发的请求是6个)

**1.****多路复⽤**

在⼀条TCP链接上可以乱序收发请求和响应，多个请求和响应之间不再有顺序关系

同域下采⽤⼀个TCP链接传输数据

采⽤⼆进制格式， HTTP/1.1采⽤的是纯⽂本需要处理空⾏、⼤⼩写等。⽂本的表现形式有多样性，⼆进制则

只有0和1的组合不在有歧义⽽且体积更⼩。把原来的 Header+body 的⽅式转换为⼆进制帧。HTTP/2 虚拟了流的概念（有序的帧），给每帧分配⼀个唯⼀的流ID，这样数据可以通过 ID 按照顺序组合起

来

帧的组成及⼤⼩

Length帧的⼤⼩， 2^24 帧最⼤不能超过 16M

Type帧的类型：常⽤的就是 HEADERS，DATA

Flags标志位：常⽤的是 END_HEADERS , END_STREAM , PRIORITY

Stream Identifier 流的标号**2.****头部压缩**

使⽤ HPACK 算法压缩HTTP头

废除起始⾏，全部移⼊到Header中去，采⽤**静态表**的⽅式压缩字段

如果是⾃定义Header，在发送的过程中会添加到**静态表**后，也就是所谓的**动态表**

对内容进⾏哈夫曼编码来减⼩体积

**3.****服务端推送**

服务端可以提前将可能会⽤到的资源主动推送到客户端。

**五****.HTTP/3**

解决TCP中**队头阻塞**问题

TCP为了保证可靠传输，如果在传输的过程中发⽣丢包，可能此时其他包已经接受完毕，但是仍要等待客户端重传

丢失的包。这就是TCP协议本身**队头阻塞**的问题。

HTTP/3 ⽬前还处于草案阶段**1.** **QUIC** **协议**

HTTP/3中关键的改变，那就是把下层的 TCP 换成了 UDP 。 UDP ⽆序从⽽解决了**队头阻塞**的问题

QUIC 基于 UDP 之前说过 UDP 是⽆连的，接速度⽐ TCP 快

QUIC 基于 UDP 实现了可靠传输、流量控制，引⼊流和多路复⽤

QUIC 全⾯采⽤加密通信, QUIC 使⽤了 TLS 1.3，⾸次连接只需要 1RTT

⽀持**链接迁移**，不受 IP 及 port 影响⽽发⽣重连，通过 ConnectionID 进⾏链接

使⽤ QPACK 进⾏头部压缩， HPACK 要求传输过程有序（动态表），会导致队头阻塞。

HTTP2 帧中需要封装流， HTTP3 则可以直接使⽤ Quic ⾥的stream

**HTTP****中的优化**

**⼀****.****Timing**

Queuing : 请求发送前会根据优先级进⾏排队，同时每个域名最多处理6个TCP链接，超过的也会进⾏排队，

并且分配磁盘空间时也会消耗⼀定时间。

Stalled :请求发出前的等待时间（处理代理，链接复⽤）

DNS lookup :查找 DNS 的时间initial Connection :建⽴TCP链接时间

SSL : SSL 握⼿时间（ SSL 协商）

Request Sent :请求发送时间（可忽略）

Waiting ( TTFB ) :等待响应的时间，等待返回⾸个字符的时间

Content Dowloaded :⽤于下载响应的时间

**⼆****.****优化**

减少⽹站中使⽤的域名 域名越多 ， DNS 解析花费的时间越多。

减少⽹站中的重定向操作，重定向会增加请求数量。

选⽤⾼性能的Web服务器 Nginx 代理静态资源 。

资源⼤⼩优化：对资源进⾏压缩、合并（合并可以减少请求，也会产⽣⽂件缓存问题）， 使⽤ gzip/br 压

缩。

给资源添加强制缓存和协商缓存。

升级 HTTP/1.x 到 HTTP/2

付费、将静态资源迁移⾄ CDN

**三****.****CDN**

CDN 的全称是Content Delivery Network，受制于⽹络的限制，访问者离服务器越远访问速度就越慢

核⼼就是**离你最近的服务器给你提供数据** （代理 + 缓存）

先在全国各地架设 CDN 服务器

正常访问⽹站会通过 *DNS* 解析，解析到对应的服务器

解析1：我们通过 CDN 域名访问时，会被解析到 CDN 专⽤ DNS 服务器。并返回 CDN 全局负载均衡服务器的 IP

地址。

解析2：向全局负载均衡服务器发起请求，全局负载均衡服务器会根据⽤户 IP 分配⽤户所属区域的负载均衡

服务器。并返回⼀台 CDN 服务器 IP 地址

⽤户向 CDN 服务器发起请求。如果服务器上不存在此⽂件。则向上⼀级缓存服务器请求，直⾄查找到源服务

器，返回结果并缓存到 DNS 服务器上。







## 网络

### 七层分别是哪七层



> 每一层做了哪些事情？

- 应用层 用户最终看到的   **报文**

- 表示层 表示数据的方式， 压缩
- 会话层 建立会话 和管理会话的

----------------上面三层在使用的时候会被合并成一层------------------

- 传输层 传递数据的，数据丢了怎么办？ 重传？数据是否可靠传输？传输数据 **数据段** 端口号，拆分数据 （传输层会对数据进行拆分和分割）
- 网络层 寻址 （定位到对方）**数据包**  就是添加原地址和目标地址
- 数据链路层 建立逻辑链接，将数据进行封装传递过去 （**帧** 1500字节 MTU 最大的传输单元）

------------------物理层-------------------

- 物理层（物理设备 主要在计算机中如何传递二进制数据，电线，同轴电缆（网线），无线，双绞线） 传输 0和 1 



> 底层是为上层服务的



#### ip 地址 mac 地址



\- 网址——》 ip 地址 网址好记 -》 ip 地址不好记

\- ip ipv4 192.168.1.1 (255.255.255.255) 不够用，子网的划分 ipv6 由 8 个 16 个位组成的地址 ip（短） 所谓的寻址就是寻找 mac 地址

\- mac 网卡和网卡的通信（mac 地址) 一般情况下 mac 地址是唯一的 通过 mac 地址来交换数据 （长）



#### 局域网如何通信



\- 物理层 中继器 ***\*两口\**** （实现信号再生）通过中继器实现信号的放大，解决最大传输问题

\- 物理层 集线器 ***\*多口\**** 可以实现多台设备交互 （广播的形式发发送数据，不会帮你过滤敏感信息）

\- 数据链路层 交换机 （记录端口和 mac 地址的关系） 我们通信通过 ip 地址获取对方的 mac 地址 有了 mac 地址之后 可以拿到对应的端口实现通信



#### 外网（路由器 网关）

路由器有两张网卡 一个网卡和局域网通信 ，另一个负责链接外网 (如果没有 wan 的路由器其实就可以看成交换机) 路由器网卡可以将 ip 地址转换成外网地址，并且可以增加对应端口来识别物理设备的身份



#### 协议 （第三层开始才有协议）

- 应用层 http （应用层协议） 协议 DNS（将网址转换成 ip 地址） DHCP 动态主机配置协议
- tcp （面向连接，安全可靠慢） 、 udp（非连接 不安全不可靠 快）
- ip 协议 寻址的， arp 协议（也有人称之为链路层的协议） （下两层不具备协议，所以把 arp 就算到 ip 层上）



#### tcp 的特点及组成格式

（tcp 是一个全双工的 单工、半双工（同时只有一个人在说话）、全双工） 三次握手和四次断开 缺陷和优点

- 三次握手的目的 就是建立双向的链接 （实现了双方可以建立连接）
  - 1. 我可以和你发短信么
  - 1. 好的， 那我可以给你发消息么
  - 1. 可以呀
- 四次断开是如何来的？
  - 1. 我们分手吧！
  - 1. 我收到了， （女生不能立刻发起分手的动作）
  - 。。。。 正在发送其他消息
  - 1. 我们分手吧
  - 1. 对方确认 分手吧~

> 缺陷：tcp 每次传输一个数据段的时候 都要增加一个 20 字节的头部 （粘包）

##### 1.握手的流程

- 客户端和服务端分别有一个序列号 seq = 0

客户端我的序列号是 0 seq = 0， 服务端要表示我收到了这个数据做应答 ack = 客户端 seq + 1, 并且告诉客户端服务端的 seq 是多少 seq = 0, ack = 1

客户端会收到 客户端的 ack = 服务端 seq + 1 ， 服务端响应给客户端的 ack 或作为客户端的 seq

> 握手后 ack = 1 seq = 1 (两个序号分别是客户端的序号和服务端序号的)

##### 2.发送消息的过程

客户端和服务端说 hello -》 服务端要立刻响应

客户端的 seq=1 , ack 的值也是 1 长度为 5 个字节的大小的内容 服务端响应 ack = 客户端的 seq + len, 我的序号还是 seq = 1

服务端和客户端说 hi -》 客户端要响应

服务端的序列号是 seq= 1 , 我的 ack = 6， len = 2 我要发送两个字节的消息 客户端就收到消息要响应 ack = 服务端的 seq + 服务端的 len， 我的序号是是上次服务端 aqck 的值 seq = 6

> tcp 如果发现对方没有响应，会认为数据丢失了 ，会重新发送

##### 3.断开也是双方的基础上+1



#### 三次握手和四次断开的时候

- 当断开的时候， 客户端最后发送的确认消息，服务端可能收不到 （服务端如果认为丢包了，会再次发送分手消息） 客户端不能再发送分手确认消息后立刻断开，如果断开会报异常 （客户端发送确认消息后，需要等待一段时间）
- 每次断开的时候都不能立即断开，导致端口无法释放，可能导致端口用尽 （http基于tcp，http1.0最早的时候短链接，用完tcp后就断开，http1.1 keep-alive 所谓的长连接，可以再1个tcp 通道中多次传输数据）
- 在发送数据的时候 发送方有对应的缓存区，对方有接受的缓存区， 在创建tcp连接的时候 会进行窗口协商， 自动的会更新窗口大小
- 流量控制 （滑动窗口，当队头的tcp段发送过去并且确认了，才会滑动） 这里会发生阻塞情况，除了队头的收到了，也不能发送其他数据（tcp的队头阻塞问题，无解的） tcp每个数据段都标识了 seq
- 如果接收方的缓存区满了，会主动告诉发送方调整窗口大小为0.如果接收方的数据被上层应用读取，读取后会主动通知发送方，如果接收方发送的数据丢包了，不用担心，发送方会定时发送探测包，来监控接收方的窗口大小
- 如果发送的数据，可以立刻被接收方确认，那么可以无线的发送数据吗? (带宽) 如何计算拥塞窗口大小 （慢启动 慢慢开始） 最浪费时间，http中默认可以同时在一个域名下 开启6个tcp的链接 （经历6次的慢启动，如果中间丢包了，也会出现从0开始） （用快重传来达到减少慢启动的过程）

> 缺点：（端口占用问题，慢启动问题 keep-alive）， tcp队头阻塞问题 （解决有序传输) 有点：有序，可靠，快重传，粘包 nagle算法 （默认只有一个小的段在传输），cork算法 （粘包的目的就是为了解决减少tcp段数据较小的问题）



#### http1.1

(在1个tcp链接中)我们的http不能同时发送多个请求，因为响应的时候 对不上 （http请求是没有seq, 无状态的）对头阻塞 （浏览器默认不开启管线化，不开启 啥叫管线化，是一种想法就是在一个tcp中批量提交多个http请求，但是响应要按照顺序应用） 响应要按照请求的次序来响应



## koa中间件

```js
const Koa = require('./koa')
const app = new Koa()

app.use(async function (ctx, next) { // fn1
    console.log(1)
    // throw ('error')
    next()
    next()
    ctx.body = 'u1'
    console.log(2)
})
app.use(async function (ctx, next) { // fn2
    console.log(3)
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
    await next()
    ctx.body = 'u2'
    console.log(4)
})

app.use(async function (ctx, next) { // fn3
    console.log(5)
    next()
    ctx.body = 'u3'
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
    console.log(6)
})

// app.use(() => {
//     ctx.body = {
//         name: 'zhangsan'
//     }
// })

app.on('error', (err) => {
    console.log('error', err)
})
// fn3(fn2(fn1()))
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})
```

```js
const EventEmitter = require('events')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const http = require('http')
const Stream = require("stream");

module.exports = class Application extends EventEmitter {
    constructor() {
        super();
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middlewares = []
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    createContext(req, res) {
        const ctx = Object.create(this.context)
        const request = Object.create(this.request)
        const response = Object.create(this.response)
        request.response = response
        response.request = request
        ctx.request = request
        ctx.response = response
        ctx.response.req = ctx.request.req = ctx.req = req
        ctx.request.res = ctx.response.res = ctx.res = res
        return ctx
    }

    compose(ctx) {
        const middlewares = this.middlewares
        let idx = -1

        function dispatch(i) {
            console.log('i', i)
            // 防止一个中间件内，多次调用next方法，我们可以直接屏蔽掉
            if (i === idx) return Promise.reject(new Error('next() called multiple times'))
            // 处理完毕直接返回成功的promise
            if (i === middlewares.length) return Promise.resolve()
            idx = i
            let fn = middlewares[i] // 一个个取出变成promise，将dispatch传递给下一个
            try {
                return Promise.resolve(fn(ctx, () => dispatch(i + 1))) // 内部的箭头函数就是next，next内部返回了下一个use的fn（也是promise），此时使用await next()便可以等待下一个use的fn执行完成
            } catch (e) {
                return Promise.reject(e)
            }
            // 调用两次next的逻辑
            // ()=> dispatch(i(0) + 1) i=1 idx=1  第一次
            // ()=> dispatch(i(0) + 1) i=1  第二次由于是同一个函数（闭包），i(0)+1还是1，所以导致i===idx
        }

        return dispatch(0)
    }

    handleRequest = (req, res) => {
        const ctx = this.createContext(req, res)
        res.statusCode = 404
        this.compose(ctx).then(() => {
            const body = ctx.body
            if (body) {
                if (body instanceof Stream) {
                    return body.pipe(res)
                } else if (typeof body === 'object') {
                    res.end(JSON.stringify(body))
                } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
                    res.end(body)
                } else if (typeof body === 'number') {
                    res.statusCode = body
                    res.end()
                }
            } else {
                res.end('Not Found')
            }
        }).catch((error) => { // 统一捕获异常
            this.emit('error', error)
        }) // 所有方法执行完毕后，采用最终的结果进行响应处理
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest)
        server.listen(...args)
    }
}


```





