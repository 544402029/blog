# javaScript常用代码片段


## 文件大小换算成单位
```js
/** 
 * 文件大小换算成单位
 * 
 * @param {Number} bytes 大小
 * @param {String} units 可选单位，默认metric
 * @param {Number} precision 可选位数，数值精度保留几位小数点，默认1
 * @return {String} 返回带单位值，byteSize(1580)，输出1.6 kB
 * 
*/
export const byteSize = (bytes, units='metric', precision=1) => {
    let value='',
        unit=''
    const base = units === 'metric' || units === 'metric_octet' ? 1000 : 1024
    const table = [
        { expFrom: 0, expTo: 1, metric: 'B', iec: 'B', metric_octet: 'o', iec_octet: 'o' },
        { expFrom: 1, expTo: 2, metric: 'kB', iec: 'KiB', metric_octet: 'ko', iec_octet: 'Kio' },
        { expFrom: 2, expTo: 3, metric: 'MB', iec: 'MiB', metric_octet: 'Mo', iec_octet: 'Mio' },
        { expFrom: 3, expTo: 4, metric: 'GB', iec: 'GiB', metric_octet: 'Go', iec_octet: 'Gio' },
        { expFrom: 4, expTo: 5, metric: 'TB', iec: 'TiB', metric_octet: 'To', iec_octet: 'Tio' },
        { expFrom: 5, expTo: 6, metric: 'PB', iec: 'PiB', metric_octet: 'Po', iec_octet: 'Pio' },
        { expFrom: 6, expTo: 7, metric: 'EB', iec: 'EiB', metric_octet: 'Eo', iec_octet: 'Eio' },
        { expFrom: 7, expTo: 8, metric: 'ZB', iec: 'ZiB', metric_octet: 'Zo', iec_octet: 'Zio' },
        { expFrom: 8, expTo: 9, metric: 'YB', iec: 'YiB', metric_octet: 'Yo', iec_octet: 'Yio' }
    ]

    for (let i = 0; i < table.length; i++) {
        const lower = Math.pow(base, table[i].expFrom)
        const upper = Math.pow(base, table[i].expTo)
        if (bytes >= lower && bytes < upper) {
            const retUnit = table[i][units]
            if (i === 0) {
                value = String(bytes)
                unit = retUnit
                break;
            } else {
                value = (bytes / lower).toFixed(precision)
                unit = retUnit
                break;
            }
        }
    }
    return `${value} ${unit}`.trim()  
}
```

## 防抖
```js
/**
 * 防抖 (debounce)将多次高频操作优化为只在最后一次执行
 * 
 * @param {Function} fn 需要防抖函数
 * @param {Number} wait  需要延迟的毫秒数
 * @param {Boolean} immediate 可选参，设为true，debounce会在wait时间间隔的开始时立即调用这个函数
 * @return {Function}
 * 
 */
export const debounce= (fn, wait, immediate) =>{
    let timer = null

    return function() {
        let args = arguments
        let context = this

        if (immediate && !timer) {
            fn.apply(context, args)
        }

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}
```
## 防抖
```js
/**
 * 防抖 (debounce)将多次高频操作优化为只在最后一次执行
 * 
 * @param {Function} fn 需要防抖函数
 * @param {Number} wait  需要延迟的毫秒数
 * @param {Boolean} immediate 可选参，设为true，debounce会在wait时间间隔的开始时立即调用这个函数
 * @return {Function}
 * 
 */
export const debounce= (fn, wait, immediate) =>{
    let timer = null

    return function() {
        let args = arguments
        let context = this

        if (immediate && !timer) {
            fn.apply(context, args)
        }

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}

```

## js浮点数计算加减乘除精度损失解决方法
```js
/**
 * js浮点数计算加减乘除精度损失解决方法
 * 
 * @param {Number} a 数值a
 * @param {Number} b 数值b
 * @param {String} computeType 加减乘除类型 add加  subtract减  multiply乘  divide除
 * @return {Number} 返回计算结果，floatNumber(0.11, 0.03, 'add')
 * 
 */
export const floatNumber = (a, b, computeType) =>{
    const isInteger= obj =>{
        return Math.floor(obj) === obj
    }
    const toInteger= floatNum =>{
        const ret = {times: 1, num: 0}
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        const strfi  = floatNum + ''
        const dotPos = strfi.indexOf('.')
        const len    = strfi.substr(dotPos+1).length
        const times  = Math.pow(10, len)
        const intNum = parseInt(floatNum * times + 0.5, 10)
        ret.times  = times
        ret.num    = intNum
        return ret
    }
    const operation=(a, b, computeType) =>{
        const o1 = toInteger(a)
        const o2 = toInteger(b)
        const n1 = o1.num
        const n2 = o2.num
        const t1 = o1.times
        const t2 = o2.times
        const max = t1 > t2 ? t1 : t2
        let result = null
        switch (computeType) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                result = (n1 / n2) * (t2 / t1)
                return result
        }

    }

    return operation(a, b, computeType)
}
```
## 判断当前环境是否是手机端

```js
/**
 * 判断当前环境是否是手机端
 * 
 * @return {Boolean}  返回结果
 * 
 */
 export const isMobile=() =>{
     if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
      }
  }
```

## 判断当前环境是否是微信环境
```js

/**
 * 断当前环境是否是微信环境
 * 
 * @return {Boolean}  返回结果
 * 
 */
export const isWeixin =() =>{      
      const ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)==="micromessenger") {
           return true;
     } else {
            return false;
      }
 }

```

## 检测浏览器是否放大

```js
/**
 * 检测浏览器是否放大
 * 
 * @param {Boolean } rsize  是否返回具体放大数值,默认否
 * @return {Boolean | Number}  返回结果
 * 
 */
export const detectZoom=rsize =>{
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()

  if (window.devicePixelRatio) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) ratio = screen.deviceXDPI / screen.logicalXDPI
  } else if (window.outerWidth&& window.innerWidth) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) ratio = Math.round(ratio * 100)

  return rsize ? ratio : ratio === 100
}
```

## 获取普通地址url参数
```js
/**
 * 获取普通地址url参数
 * 例如：http://localhost:8080/?token=rTyJ7bcRb7KU4DMcWo4216&roleId=512213631174180864
 * 
 * @param {String} name 
 * @return {Boolean | String} 返回获取值 
 * 
 */
export const getUrlParam = name =>{
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
  const r = window.location.search.substr(1).match(reg);  
  if (r != null) return decodeURI(r[2]); return false; 
}

```

## 获取hash模式地址url参数
```js
/**
 * 获取hash模式地址url参数
 * 例如：http://localhost:8080/#/?token=rTyJ7bcRb7KU4DMcWo4216&roleId=512213631174180864
 * 
 * @param {String} name 
 * @return {Boolean | String} 返回获取值 
 * 
 */
export const getUrlHashParam =name =>{
  const w = window.location.hash.indexOf("?");
  const query = window.location.hash.substring(w + 1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] == name) {
      return pair[1];
    }
  }

  return false;
}
```

## 时间戳转换
```js
/**
 * 时间戳转换
 * 
 * @param {Number} date 时间戳
 * @param {String} fmt  时间显示格式，例如 yyyy-MM-dd HH:mm:ss
 * @return {String} fmt 返回转换后的时间 ，formatDate(value, "yyyy-MM-dd  hh: mm : ss")
 * 
 */
export const formatDate = (date, fmt) => {
  date = new Date(date);
  if (isNaN(date.getDate())) return date;
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
      );
    }
  }
  return fmt;
};
```

## 时间戳转换成什么之前

```js
/**
 * 时间戳转换成什么之前
 * 
 * @param {Number} times 时间戳
 * @return {String} 返回结果，timeAgoLabel(1606273724459) 输出：刚刚
 * 
 */
export const timeAgoLabel = times => {
  let nowTimes = new Date().getTime()
  let diffSecond = (nowTimes - times) / 1000
  let agoLabel = ''
  if (diffSecond < 60) {
    agoLabel = '刚刚'
  } else if (diffSecond < 60 * 60) {
    agoLabel = Math.floor(diffSecond / 60) + '分钟前'
  } else if (diffSecond < 60 * 60 * 24) {
    agoLabel = Math.floor(diffSecond / 3600) + '小时前'
  } else if (diffSecond < 60 * 60 * 24 * 30) {
    agoLabel = Math.floor(diffSecond / (3600 * 24)) + '天前'
  } else if (diffSecond < 3600 * 24 * 30 * 12) {
    agoLabel = Math.floor(diffSecond / (3600 * 24 * 30)) + '月前'
  } else {
    agoLabel = Math.floor(diffSecond / (3600 * 24 * 30 * 12)) + '年前'
  }
  return agoLabel
}
```

## npm淘宝镜像

```
npm install --registry=https://registry.npm.taobao.org
```

## 元素在页面中的偏移量

把offsetLeft和offsetTop属性分别与offsetParent的相同属性相加，一直加到根元素。

```js
function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}
```

## 查询url参数

```js
let getQueryStringArgs = function() {
  // 取得没有开头问号的查询字符串
  let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
    // 保存数据的对象
    args = {};

  // 把每个参数添加到args对象
  for (let item of qs.split("&").map(kv => kv.split("="))) {
    let name = decodeURIComponent(item[0]),
      value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }

  return args;
}
```

## 洗牌算法

```js
class SuperArray extends Array {
  shuffle() {
    // 洗牌算法
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
}

let a = new SuperArray(1, 2, 3, 4, 5);

console.log(a instanceof Array);       // true
console.log(a instanceof SuperArray);  // true

console.log(a);  // [1, 2, 3, 4, 5]
a.shuffle();
console.log(a);  // [3, 1, 4, 5, 2]
```

## 检查两个以上的值是否相等

```js
function recursivelyCheckEqual(x, ...rest) {
  return Object.is(x, rest[0]) &&
         (rest.length < 2 || recursivelyCheckEqual(...rest));
}
```

## 生成任意位数随机数(数字)

```js
/**
 * 生成任意位数随机数(数字)
 * 
 * @param {Number} n 可选长度位数
 * @return {Number} 返回随机值
 * 
 */
export const randomNumber =n =>{
      let rnd = '';
      for (let i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
      }
      return rnd;
}
```

## 随机生成一个自定义长度，不重复的字母加数字组合，可用来做id标识
```js
/**
 * 随机生成一个自定义长度，不重复的字母加数字组合，可用来做id标识
 * 
 * @param {Number} randomLength 可选长度位数，默认10
 * @return {String} 返回随机值
 * 
 */
export const randomId =(randomLength = 10) =>{
    return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
},
```

## js数组去重(复杂数据有ID的情况下)
```js
 /**
  * js数组去重(复杂数据有ID的情况下)
  * 方式一(hash)
  * 
  * @param {Array} repeatArray 含重复数据的数组
  * @return {Array} 返回去重后的数据
  * 
  */
 export const noRepeatArrayHash= repeatArray =>{
      const hash = {};
      const temp = [];
      for (let i = 0; i < repeatArray.length; i++) {
          if (!hash[repeatArray[i].id]) {
              hash[repeatArray[i].id] = true;
              temp.push(repeatArray[i]);
          }
      }
  
      return temp;
}

 /**
  * js数组去重(复杂数据有ID的情况下)
  * 方式二(hash + reduce)
  * 
  * @param {Array} repeatArray 含重复数据的数组
  * @return {Array} 返回去重后的数据
  * 
  */
export const noRepeatArrayReduce= repeatArray =>{
    const hash = {};
	return repeatArray.reduce(function(accumulator, currentValue){
	       if(!hash[currentValue.id]){
		       hash[currentValue.id]=true;
			   accumulator.push(currentValue)
           }  
           
        return accumulator		   
	
	}, []);
}

```

## 从一组整数中随机选择一个数

```js
function selectFrom(lowerValue, upperValue) {
  let choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue);
}

let num = selectFrom(2,10);
console.log(num);  // 2~10范围内的值，其中包含2和10

// 使用
let colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
let color = colors[selectFrom(0, colors.length-1)];
```

## 查找字符串出现位置

```js
let stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
let positions = new Array();
let pos = stringValue.indexOf("e");

while(pos > -1) {
  positions.push(pos);
  pos = stringValue.indexOf("e", pos + 1);
}

console.log(positions); // [3,24,32,35,52]
```

## axios封装

```js
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';// 设置post请求头

// request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 0) {
      if (res.msg !== '没有数据!') {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }


      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return res
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
```

## 小程序http封装

```js
import {
  config
} from "../config/config";
import {
  promisic
} from "../utils/util";
class Http {
  static async request({
    url,
    data,
    method = "GET"
  }) {
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        appKey: config.appkey
      }
    })
    return res.data
  }
}

export {
  Http
}
```

## 下拉加载更多（分页）

```js
import {
  Http
} from "./http";
class Paging {
  start
  count
  req
  locker = false
  url
  moreData = true
  accumulator = []
  constructor(req, count = 10, start = 0) {
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url
  }
  async getMoreData() {
    if(!this.moreData){
      return
    }
    if (!this._getLocker) {
      return
    }
    const data = await this._actualGetData()
    this._releaseLocker()
    return data
  }
  async _actualGetData() {
    const req = this._getCurrentReq()
    let paging = await Http.request(req)
    if (!paging) {
      return null
    }
    if (paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    this.moreData = Paging._moreData(paging.total_page, paging.page)
    if (this.moreData) {
      this.start += this.count
    }
    this._accumulate(paging.items)
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }

  }
  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1
  }
  _accumulate(items) {
    this.accumulator = this.accumulator.concat(items)
  }
  _getCurrentReq() {
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`
    if (url.includes('?')) {
      url += '&' + params
    } else {
      url += '?' + params
    }
    this.req.url = url
    return this.req
  }
  _getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true
    return true
  }
  _releaseLocker() {
    this.locker = false
  }
}

export {
  Paging
}
```


## 状态机

三种状态不停切换

```js
  let state=function* (){
    while(1){
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status=state();
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
```

## 抽奖

```js
let draw=function(count){
  //具体抽奖逻辑
  console.info(`剩余${count}次`)
}

let residue=function* (count){
  while (count>0) {
    count--;
    yield draw(count);
  }
}

let star=residue(5);
let btn=document.createElement('button');
btn.id='start';
btn.textContent='抽奖';
document.body.appendChild(btn);
document.getElementById('start').addEventListener('click',function(){
  star.next();
},false)
```

## 长轮询

```js
// 长轮询
let ajax=function* (){
  yield new Promise(function(resolve,reject){
    setTimeout(function () {
      resolve({code:0})
    }, 200);
  })
}

let pull=function(){
  let genertaor=ajax();
  let step=genertaor.next();
  step.value.then(function(d){
    if(d.code!=0){
      setTimeout(function () {
        console.info('wait');
        pull()
      }, 1000);
    }else{
      console.info(d);
    }
  })
}

pull();
```

## url拼接

```js
 url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

 
function param () {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
```

## 获取最大Z-index值
```js
function getMaxZIndex() {
	var maxZ = Math.max.apply(null, $.map($('body *'), function(e,n) {
		if ($(e).css('position') != 'static') {
			return parseInt($(e).css('z-index')) || -1;
			}
		}
	));
	return maxZ;
}
```

## jq引入


```js
(function($){
    $(function(){
    
    })
})(jQuery);
```

`(function($){...})(jQuery)`用来定义一些需要预先定义好的函数


`$(function(){ })`用来在DOM加载完成之后运行\执行那些预行定义好的函数.

1. 避免全局依赖；
2. 避免第三方破坏；
3. 兼容jquery操作符"$"和jquery；



## 乱序排列

```js
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}
```

## 生成随机数

``` javascript
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generateMixed(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}
```

## 封装 promise

将小程序内置非promise API转换为promise

```js
const promisic = function(func) {
  return function(params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}
```

## 点击复制

### 第一种
```js
function copyUrl1(e) {
    var copyText = $('#copyUrl');
    copyText.select();
    document.execCommand("Copy");
    FoxUI.alert("已复制,马上去邀请小伙伴吧!");
}
```  
  
### 第二种
```js
/**
 * 将一个字符串复制到剪贴板
 * @param {String} str 复制的内容
 * @return {String} 直接粘贴， copyToClipboard('将一个字符串复制到剪贴板')
 * 
 */
 export const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
      }
}
```


## 平滑滚动到页面顶部
```js
/**
 * 平滑滚动到页面顶部
 * 
 */
export const scrollToTop = () => {  
    const c = document.documentElement.scrollTop || document.body.scrollTop;  
    if (c > 0) {  
    window.requestAnimationFrame(scrollToTop);  
    window.scrollTo(0, c - c / 8);  
    }  
}
```

## 记录上次点击
```js
var pre;
$(".un_bt").bind("click", function () {
    if(this !== pre){
        var preType = $(pre).find(".bttype").text() || un_bt_type;
    }
    pre = this;
})
```
