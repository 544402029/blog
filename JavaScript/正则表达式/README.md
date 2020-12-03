# 正则表达式

## 创建正则表达式的方式

创建正则表达式一般有两种方式

1. 字面量  `/js/`
2. 构造函数  `new RegExp()`

## 匹配字符串

### test

使用test()可以返回一个布尔值。

示例：

```js
    var str = 'I love js';
    var pattern = /js/;
    //test
    console.log(pattern.test(str));//true
```

### exec

使用exec()返回匹配到的数据

示例：

```js
    var str = 'I love js';
    var pattern = /js/;
    //exec
    console.log(pattern.exec(str));
    //["js", index: 7, input: "I love js", groups: undefined]
```

### 模式修饰符

i 不区分大小写
g 全局搜索
m 多行搜索


## 转义字符

如果我们需要匹配特殊字符， 就需要转义 。 用`\`进行转义

如： 

```js
 var str = '//我是注释'
    var pattern = /\//
    console.log(pattern.exec(str));
    //["/", index: 0, input: "//我是注释", groups: undefined]
```

还有其它几种特殊字符：

如`\n`, 匹配换行符 也可以使用`\xOA`
`\t`， 匹配制表符 也可以用`\u0009`

## 字符类

我们通过`[]`来写字符类

示例：

```js
    var str = 'javascript'
    var pattern = /[sjwelsls]/
    console.log(pattern.exec(str));
    //["j", index: 0, input: "javascript", groups: undefined]
```

使用字符类我们只需要匹配到其中一个字符。返回的是匹配到的第一个字符。

### 取反

我们使用`^`来进行取反

示例：

```js
    var str = 'javascript'
    var pattern = /[^sj]/
    console.log(pattern.exec(str));
    //["a", index: 1, input: "javascript", groups: undefined]
```

如上， 匹配到了a， 不会去匹配s和j

### 范围输入

我们使用`-`来连接输入的范围

示例：

```js
    var str = 'javascript'
    var pattern = /[a-z]/
    console.log(pattern.exec(str));
    //["j", index: 0, input: "javascript", groups: undefined]
```

如上， a到z之间的字符全都能匹配到。如果也想匹配大写A-Z, 只需要这样写`/[a-zA-Z]/`。

匹配中文： `/[\u4e00-\u9fa5]/`

### 常用字符类

一般大写字符都是小写字符的取反。如`w`和`W`。

`/./`  符号.可以匹配到换行符以外所有字符。 `/[^/n]/`的简写。
`w/`  字符w可以匹配a-zA-Z0-9_之间的字符。 `/[a-zA-Z0-9_]/`的简写。
`/W/`  大写字符W可以匹配a-zA-Z0-9_范围之外的字符。 `/[^a-zA-Z0-9_]/`的简写。
`/d/`  字符d可以匹配0-9之间的字符。`/[0-9]/`的简写。
`/\s/` \s用来匹配制表符和空格。


### 重复

我们如果想匹配重复的字符可以这样写：

```
    var str = '110'
    var pattern = /\d{2}/
    console.log(pattern.exec(str));
    //["11", index: 0, input: "110", groups: undefined]
```

在匹配的字符后面添加{2}就可以匹配到2位符合条件的字符。

我们不仅可以写入要匹配字符的长度， 
也可以写一个范围 如`{1,3}`。(一定不要在{1,3}之间添加空格)
匹配大于等于1的长度 `{1,}`

#### 简写形式：

`?` 表示0个至1个。 `/\d{0,1}/`
`+` 表示大于等于1。 `/\d{1,}/` 
`*` 表示0次至多次  ``/\d{0,}/` 

示例：

```js
   var str = '肯德基豪华午餐 ￥15.5！'
    var pattern = /\d+\.?\d*/
    console.log(pattern.exec(str));
    //["15.5", index: 9, input: "肯德基豪华午餐 ￥15.5！", groups: undefined]
```

### 贪婪匹配


如果按照上面的重复匹配， 正则表达式就会尽可能多的去匹配字符，这个叫做贪婪匹配。

如果我们不想这样， 只想尽可能少的匹配(要符合条件)。这时我们一般使用`?`来写，表达非贪婪匹配。

如`\a??\`或`/a{0,1}?/`。

以下为简单地几个例子：

贪婪匹配
```js
	var str = 'aaab';
	var pattern = /a+?b/;
	console.log(pattern.exec(str));
	//["aaab", index: 0, input: "aaab", groups: undefined]
```
虽然这是一个非贪婪匹配， 但是它要符合条件的才可以， 只是尽可能的去少匹配。以上会匹配到aaab。


贪婪匹配：

```js
	var str = '<td><p>a</p></td><td><p>b</p></td>';
	var pattern = /<td>.*<\/td>/;
	console.log(pattern.exec(str));
	//["<td><p>a</p></td><td><p>b</p></td>", index: 0, input: "<td><p>a</p></td><td><p>b</p></td>", groups: undefined]
```



非贪婪匹配： 匹配第一个td标签之间字符
```
	var str = '<td><p>a</p></td><td><p>b</p></td>';
	var pattern = /<td>.*?<\/td>/;
	console.log(pattern.exec(str));
	
```
输出：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583492618154.png)



## 选择、分组和引用

### 选择

一般我们通过|来表示或， 只要匹配到一个就返回，后面的进行忽略。 如`/html|css|js/`。


### 分组

一般我们通过`()`来进行分组

示例：

```js
	var str = 'abab';
	var pattern = /ab+/;
	console.log(pattern.exec(str));
	//["ab", index: 0, input: "abab", groups: undefined]
```
以上只能匹配一个ab，因为`+`只对b起作用

如果想匹配ab多个可以加上括号

```js
	var str = 'abab';
	var pattern = /(ab)+/;
	console.log(pattern.exec(str));
```

输出结果：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583493676592.png)

它返回的是一个数组，里面第一项是abab， 而第二项就是括号括起来的字符匹配（捕获性分组）

如果不想捕获， 可以加上?:

```js
	var str = 'abcd';
	var pattern = /(?:ab)c/;
	console.log(pattern.exec(str));
```


![enter description here](https://markdown.xiaoshujiang.com/img/spinner.gif "[[[1583502973291]]]" )


多个括号匹配

```js
	var str = 'abcd';
	var pattern = /(a(b(c)))/;
	console.log(pattern.exec(str));
```

输出结果：
![enter description here](https://markdown.xiaoshujiang.com/img/spinner.gif "[[[1583503353539]]]" )

括号从左到右进行匹配


匹配开始与结尾一致：

```js
	var str = '<p><a>这是一段文字</a></p>';
	var pattern = /<([a-zA-Z]+)>(.*?)<\/\1>/;
	console.log(pattern.exec(str));
```

输出结果：
![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583503592268.png)

\1标识第一个括号包括的内容， 使用\1可以保证与第一个括号里的内容完全一致。


## 位置匹配

### 首匹配

使用^可以做到首匹配

```js
	var str = 'html js';
	var str1= 'js';
	var pattern = /^js/;
	console.log(pattern.exec(str));//null
	console.log(pattern.exec(str1));//["js", index: 0, input: "js", groups: undefined]
```

### 尾匹配

```js
	var str = 'html js css';
	var str1 = 'html js';
	var pattern = /js$/;
	console.log(pattern.exec(str));//null
	console.log(pattern.exec(str1));//["js", index: 5, input: "html js", groups: undefined]
```

如何保证输入字符全是数字？

```js
	var str = '110119120';
	var pattern = /^\d+$/;
	console.log(pattern.exec(str));
	if (pattern.test(str)) {
		console.log('全是数字！');
	} else {
		console.log('不全是数字！');
	}
```

也可以这么写：

```js
	var str = '11011a9120';
	var pattern = /\D/;
	console.log(pattern.exec(str));
	if (pattern.test(str)) {
		console.log('不全是数字！');
	} else {
		console.log('全是数字！');
	}
```

### 单词边界匹配

\b匹配单词边界，表示的就是\w和\W之间的位置。
应用场景：当元素有多个类名时，匹配其中的一个类名（有三种位置：行首、行尾、中间)。
在构造函数参数中的转义字符都要进行双重转义。 如果正则里面为空可以匹配任何字符串。

示例：

```js
	var str = 'js html';
	var str1 ='js';
	var pattern = /js\b/;
	console.log(pattern.exec(str));//["js", index: 0, input: "js html", groups: undefined]
	console.log(pattern.exec(str1));//["js", index: 0, input: "js", groups: undefined]
```

```js
	var str = '@@@js@@@';
	var pattern = /\bjs\b/;
	console.log(pattern.exec(str));
	//["js", index: 3, input: "@@@js@@@", groups: undefined]
```

匹配到了两个@之间js的位置


匹配一个class类名

```html
<p class="odd2      odd    ">1</p>
<p class="even">2</p>
<p class="odd">3</p>
<p class="even">4</p>
```

```js
	var oddP = getByClassName('odd');
	var evenP = getByClassName('even');
	for (var i = 0; i < oddP.length; i++) {
		oddP[i].style.backgroundColor = 'red';
	}
	for (var i = 0; i < evenP.length; i++) {
		evenP[i].style.backgroundColor = 'yellow';
	}

	function getByClassName(className, parentNode) {
		if (document.getElementsByClassName) {
			return document.getElementsByClassName(className);
		} else {console.log(1);
			parentNode = parentNode || document;
			var nodeList = [];
			var allNodes = parentNode.getElementsByTagName('*');
			var pattern = new RegExp('\\b' + className + '\\b');

			for (var i = 0; i < allNodes.length; i++) {
				if (pattern.test(allNodes[i].className)) {
					nodeList.push(allNodes[i]);
				}
			}

			return nodeList;
		}
	}
```

使用了`new RegExp('\\b' + className + '\\b')`， 构造函数的s需要双重转义， 需要加两个\\斜杠。 

此次匹配不仅能匹配到以odd开始， 也可以匹配到odd在中间， 或者在末尾。只要odd是一个单独的单词即可。


输出结果：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583545569056.png)

### 前瞻性匹配

```js
	var str = 'java';
	var str1 = 'javascript'
	var pattern = /java(?=script)/;
	console.log(pattern.exec(str));
	console.log(pattern.exec(str1));
```

只有java后面跟的是script才可以匹配到，用?=来进行匹配

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583546182515.png)

### 负向前瞻性匹配

与前瞻性匹配相反的是负向前瞻性匹配

```js
	var str = 'java';
	var str1 = 'javascript'
	var pattern = /java(?!script)/;
	console.log(pattern.exec(str));
	console.log(pattern.exec(str1));
```
它用?!来进行匹配，表示后面跟的不是script才可以匹配到。

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583546415364.png)


## RegExp对象的实例方法

```js
	console.log(new RegExp('\\b'));
	/\\/
	new RegExp('\\\\')
```
要谨记， 构造函数的正则需要双重转义， 如果构造函数想要匹配一个`\`， 需要使用4个`\`来进行匹配。

### 实例方法

test(),exec()都是正则的实例方法。

一般来说exec只匹配到第一个匹配的字符。 如果想继续向下匹配可以增加`g`修饰符。

如果匹配到末尾继续进行匹配， 会重新匹配会第一个。

### 正则相关方法

#### search(正则表达式);

//判断是否存在该正则匹配的字符串，有一个则返回匹配到的位置的索引。
找不到返回-1；有多个，依然返回第一个索引，与g全局匹配无关紧要。参数可以为字符串，但该字符串最终还是会转化为正则来判断。

示例：

```js
	var str = 'html js js';
	var pattern = /js/;
	console.log(str.search(pattern));//5

	var str = 'html js js';
	console.log(str.search('js'));//5
```


#### match(正则表达式);

//返回一个匹配的数组，和exec()方法类似；不同的地方仅在于：全局匹配时，该方法会一次性返回所有匹配的字符串在一个数组中，并且不会返回分组匹配到的字符串。

match：非全局的情况下才会返回分组中匹配到的内容，全局匹配只能匹配到所有匹配到的字符（不返回分组匹配到的字符）。

exec：无论是否全局匹配都会返回分组中匹配到的内容，并且都只会返回当前匹配到的一个内容，而不是全部返回。

示例：

```js
	var str = 'js js js';
	var pattern = /(j)s/g;
	console.log(str.match(pattern));
	console.log(pattern.exec(str));
```

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583549522250.png)


有换行的地方才会用到m多行匹配。一般会和g连用。默认情况下是都有多行匹配的。一般与
$或^ 存在的时候才会发挥作用。

#### split();

//该字符串方法是将参数所表示的字符作为分割成多个数组元素的标志，该字符串方法传入正则表达式也可使用。

示例：

```js
	var str = 'html ,   css  ,   js';
	var pattern = /\s*,\s*/;
	console.log(str.split(pattern));
```

输出结果：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583550110660.png)


#### replace方法

字符串的replace()方法：返回的是新的字符串。
- 第一个参数，字符串里要被替换的字符。
- 第二个参数，替换的字符。

只能替换一个。传入正则作为参数，利用正则的全局匹配可以替换多个。

string的replace方法也能引用正则的分组，第二个参数传入‘$1’，表示为正则的第一个分组。replace方法返回的是一个新的字符串。

##### 应用场景：

可以用来过滤敏感词，将敏感词用*代替。
string的replace方法的第二个参数可以是函数function，传入$0，$0表示母匹配(正则最大的匹
配)，$1表示分组中的子匹配。然后用函数的返回值去替换正则($0)。

示例：

```js
	var str = '中国军队和阿扁一起办证';
	var pattern = /国军|阿扁|办证/g;
	console.log(str.replace(pattern, function ($0) {
		console.log($0);
		var result = '';
		for (var i = 0; i < $0.length; i++) {
			result += '*';
		}

		return result;
	}));
```

输出结果：

![enter description here](https://gitee.com/l544402029/res/raw/master/小书匠/1583550856019.png)

## 常用正则表达式

### QQ号

条件：
- 全是数字
- 首位不能为0
- 最少5位(10000)
- 目前最多11位？

```js
/^[1-9]\d{4,10}$/
/^[1-9]\d{4,}$/
```	

### 昵称

条件： 
- 中、英文、数字以及下划线
- 2-18位

```js
	/^[\u4e00-\u9fa5a-zA-Z0-9_]{2,18}$/
	/^[\u4e00-\u9fa5\w]{2,18}$/
```

### 密码

条件：
- 6-16位
- 不能用空白字符\s

```js
	/^\S{6,16}$/
	/^[\w~!@#$%^\[\]]{6,16}$/
```

### 去除字符串首尾的空白字符

```js
	var str = '        Alex         ';
	var pattern = /^\s+/;
	console.log('|' + str.replace(pattern, '') + '|');

	var str = '        Alex         ';
	var pattern = /\s+$/;
	console.log('|' + str.replace(pattern, '') + '|');

	var str = '        Alex         ';
	var pattern = /^\s+|\s+$/g;
	console.log('|' + str.replace(pattern, '') + '|');

	var str = '        Alex         ';
	var pattern1 = /^\s+/;
	var pattern2 = /\s+$/;
	console.log('|' + str.replace(pattern1, '').replace(pattern2, '') + '|');

	function trim(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	}
	// trimLeft trimRight
	var str = '        Alex         ';
	console.log('|' + trim(str) + '|');

```

### 转驼峰

```js
	// css: background-color: red;
	// js: elem.style.backgroundColor = 'red';
	// jquery: $(elem).css('background-color', 'red');

	var str = 'background-color';
	var pattern = /-([a-z])/gi;
	console.log(str.replace(pattern, function (all, letter) {
		return letter.toUpperCase();
	}));

	function toCamelCase(str) {
		return str.replace(pattern, function (all, letter) {
			return letter.toUpperCase();
		})
	}
```

### 匹配HTML标签

```js
	var str = '<p class="odd" id="odd">123</p>';
	var pattern = /<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g;
	console.log(str.match(pattern));

	var str = '<p class="odd" id="odd">123</p>';
	var pattern = /<[^>]+>/g;
	console.log(str.match(pattern));

	var str = '<input type="text" value=">" name="username" />';
	var pattern = /<(?:[^"'>]|"[^"]*"|'[^']*')*>/g;
	console.log(str.match(pattern));

	var str = '<input type="text" value=">" name="username" />';
	var pattern = /<(?:[^"'>]|(["'])[^"']*\1)*>/g;
	console.log(str.match(pattern));
```

### 匹配邮箱

条件：
- alex@yahoo.com.cn
- alex_1@yahoo.com.cn
- alex_1.a-sdasd.asdasdas.com@yah-o_o.com.adasdsd.cn

```js
/(?:\w+\.)*\w+@(?:\w+\.)+[a-z]/i
/^[a-z0-9]+(?:[._-][a-z0-9]+)*@[a-z0-9]+(?:[._-][a-z0-9]+)*\.[a-z]{2,4}$/i
```

### URL

条件： 
- (协议:\/\/)主机名(:端口号)(/路径)
- ftp|http|https|mailto|file:///

```js
/^(https?:\/\/)?([^:\/]+)(:\d+)?(\/.*)?$/
```

### 匹配主机名

```js
	/[^:\/]+/
	//-www.-imos-oc.casfasf.sadasd.co-m
	//ai
	/[a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9]/i
	/^([a-z0-9]\.|[a-z0-9][-a-z0-9]*[a-z0-9]\.)*(com|edu|gov|net|org|[a-z]{2})$/i
	/^([a-z0-9]\.|[a-z0-9][-a-z0-9]*[a-z0-9]\.)*([a-z]+)$/i

	var regexp = {
		'chinese': /[\u4e00-\u9fa5]/, // 
		'qq': /^[1-9]\d{4,}$/,
		....
	};
	regexp.qq
```