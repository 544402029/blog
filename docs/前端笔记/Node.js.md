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





