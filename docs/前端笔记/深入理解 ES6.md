# 深入理解 ES6

## let 和 const

### 块级作用域

let 和 const 都是属于块作用域，在块作用域之外不存在，可以理解为大括号内就是块作用域；

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

外层代码块不会受内层代码影响，如上，最后输出 5。如果使用`var`，最后输出会是 10。

### 块级作用域与函数声明

```js
function f() {
  console.log('I am outside!');
}

(function() {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!');
    }
  }

  f();
})();
```

上面的代码在 ES5 中会输出`I am inside!`,因为函数被提到了局部作用域的顶部。

而在 ES6 浏览器内会报错， 原因就在于如果改变块级作用域内声明函数的处理规则，会对老代码产生很大影响，ES6 在附录 B 里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。

- 允许在块级作用域内声明函数。
- 函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

::: warning 注意
上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作 let 处理。
:::

根据上述 3 条规则，浏览器在 ES6 环境中，块级作用域声明的函数类似于`var`声明的变量，实际运行代码如下：

```js
// 浏览器的 ES6 环境
function f() {
  console.log('I am outside!');
}
(function() {
  var f = undefined;
  if (false) {
    function f() {
      console.log('I am inside!');
    }
  }

  f();
})();
// Uncaught TypeError: f is not a function
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```js
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function() {
    return a;
  };
}
```

### 不能重复声明

let、const 不能重复声明, 不挂载在 window

const 声明常量是不能修改值的。但是如果 const 声明的是对象，可以修改对象内属性。因为对象返回的是个指针，指针不能修改，但是对象内属性可以修改

## 字符串与正则表达式

## 字符串模板

模板字符串嵌套。

```js
const tmpl = addrs => `
  <table>
  ${addrs
    .map(
      addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `
    )
    .join('')}
  </table>
`;

const data = [
  { first: '<Jane>', last: 'Bond' },
  { first: 'Lars', last: '<Croft>' }
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>
```

## 函数

### 函数形参的默认值

#### 思考

请问下面两种写法有什么差别？

```js
// 写法一
function m1({ x = 0, y = 0 } = {}) {
  return [x, y];
}

// 写法二
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
```

上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

```js
// 函数没有参数的情况
m1(); // [0, 0]
m2(); // [0, 0]

// x 和 y 都有值的情况
m1({ x: 3, y: 8 }); // [3, 8]
m2({ x: 3, y: 8 }); // [3, 8]

// x 有值，y 无值的情况
m1({ x: 3 }); // [3, 0]
m2({ x: 3 }); // [3, undefined]

// x 和 y 都无值的情况
m1({}); // [0, 0];
m2({}); // [undefined, undefined]

m1({ z: 3 }); // [0, 0]
m2({ z: 3 }); // [undefined, undefined]
```

#### 默认参数对 arguments 对象的影响

```javascript
//非严格模式
function mixArgs(first, second = 'b') {
  console.log(arguments.length); //1
  console.log(first === arguments[0]); //true
  console.log(second === arguments[1]); //false
  first = 'C';
  second = 'd';
  console.log(first === arguments[0]); //false
  console.log(second === arguments[1]); //false
}
mixArgs('a');
```

在`mixArgs()`方法中只传入了一个参数, `arguments.length`的值为 1。`arguments[1]`的值为`undefined`，`first`与`arguments[0]`全等，改变`first`和`second`并不会影响`arguments`对象。可以通过`arguments`对象来把参数恢复为初始值。

#### 默认参数表达式

```javascript
function getValue(value) {
  return value + 5;
}
function add(first, second = getValue(first)) {
  return first + second;
}
console.log(add(1, 1)); //2
console.log(add(1)); //7
```

声明`second=getValue(first)`,尽管`add(1,1)`返回 2，但是`add(1)`返回的是(1+6)也就是 7。
注意,函数调用结果作为默认参数值时，如果忘记写小括号，则最终传入的是对函数的引用。

#### 默认参数的临时死区

默认参数可以获取函数参数之前定义的参数，但是前面的参数不可以获取后面的参数，这也是因为临时死区。

函数参数有自己的作用域和临时死区，其与函数体的作用域是各自独立的，也就是说，参数的默认值不可访问函数体内声明的变量。

### 处理无命名参数

ES5 中使用`arguments`对象检查所有参数

```javascript
//处理无命名参数
function pick(object) {
  let result = Object.create(null);
  for (let i = 1, len = arguments.length; i < len; i++) {
    result[arguments[i]] = object[arguments[i]];
  }
  return result;
}

let book = {
  title: 'Understanding',
  author: 'Nicholas C.Zakas',
  year: 2016
};

let bookData = pick(book, 'author', 'year');
console.log(bookData.author);
console.log(bookData.year);
```

#### 不定参数

ES6 使用`...`表明这是一个不定参数,该参数为数组，包含着命名参数之后所有传入的参数，通过数组名可以逐一访问里面的参数。

```javascript
function pick(object, ...keys) {
  let result = Object.create(null);
  for (let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = object[keys[i]];
  }
  return result;
}

let book = {
  title: 'Understanding',
  author: 'Nicholas C.Zakas',
  year: 2016
};

let bookData = pick(book, 'author', 'year');
console.log(bookData.author);
console.log(bookData.year);
```

函数的`length`属性统计的是命名参数的数量，不定参数的加入不会影响`length`的值。在本例中`pick()`函数的`length`值为 1。因为只会计算`object`。

##### 不定参数的使用限制

首先一个函数只能有一个不定参数，而且不定参数必须要放在末尾。
其次，不定参数不能用于对象字面量`setter`中，之所以存在这条限制，是因为对象字面量`setter`的参数有且只能有一个。而在不定参数的定义中，参数的数量可以无限多，所以当前上下文不允许使用不定参数。

```javascript
let object = {
  //语法错误,不可以在setter中使用不定参数
  set name(...value) {
    //执行一些逻辑
  }
};
```

### 展开运算符

由于`Math.max()`方法不允许传入数组， 我们可以借助展开运算符来实现这个操作。可以使用展开运算符与其它正常传入的参数混合使用。假设你想限定`Math.max()`返回值的最小值为 0(防止负数偷偷溜进数组), 可以单独传入限定值, 其他的参数仍然使用占卡运算符得到, 如下:

```javascript
//展开运算符
let values = [-25, -50, -75, -100];
console.log(Math.max(...values, 0)); //0
```

### name 属性

#### name 属性的特殊情况

```javascript
//name属性
var doSomething = function doSomethingElse() {
  //空函数
};
var person = {
  get firstName() {
    return 'Nicholas';
  },
  sayName() {
    // console.log(this.name);
  }
};

var descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');

console.log(doSomething.name);
console.log(person.sayName.name);
console.log(descriptor.get.name);
```

本例中, `doSomething.name`的值为`doSomethingElse`, 是由于函数表达式有一个名字, 这个名字要比函数本身被赋值的变量权重高。
`person.sayName`属性的职位`"sayName"`, 其值取自对象字面量, 与之类似, `person.firstName`实际上是一个`getter`函数, 所以它的名称为`"get firstName"`,`setter`函数名称中也有前缀`set`。(`getter`和`setter`函数都必须用`Object.getOwnPropertyDescriptor`来检索)

另外两个有关函数名称的特例:通过`bind()`函数创建的函数, 其名称带有`bound`前缀; 通过`Function`构造函数创建的函数, 其名称将是`anonymous`, 如下:

```javascript
var doSomething = function() {
  //'空函数'
};

console.log(doSomething.bind().name); //"bound doSomething"
console.log(new Function().name); //"anonymous"
```

切记, 函数`name`属性的值不一定引用同名变量, 它只是协助调试用的额外信息, 所以不能使用`name`属性的值来获取对于函数的引用。

### 明确函数的多重用途

```javascript
function Person() {
  this.name = name;
}
var person = new Person();
var notPerson = Person();
console.log(person); //Person {name: ""}
console.log(notPerson); //undefined
```

JavaScript 函数有两个不同的内部方法: [[Call]]和[[Construct]]。当用`new`关键字来调用函数时, 执行的是[[Construct]]函数, 他负责创建一个通常被称作实例的新对象, 然后再执行函数体, 将`this`绑定到实例上; 如果不通过`new`关键字调用函数, 则执行[[Call]]函数, 从而直接执行代码中的函数体。具有[[Construct]]方法的函数统称为构造函数。
切记, 不是所有函数都拥有[[Construct]]方法, 因此不是所有函数都可以通过`new`来调用。例如, 箭头函数就没有这个[[]Construct]方法。

#### 元属性 new.target

当调用函数的[[Construct]]方法时, `new.target`被赋值为`new`操作符的目标, 通常是新创建的对象实例, 也就是函数体内`this`的构造函数; 如果调用[[Call]]方法, 则`new.target`的值为`undefined`。通过这个属性,可以安全的检测一个函数是否是通过`new`关键字调用的;也可以用来检查是否被某个特定构造函数所调用, 如下:

```javascript
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须通过new关键字来调用Person');
  }
}

function AnotherPerson(name) {
  Person.call(this, name);
}

var person = new Person('Nicholas');
var anotherPerson = new AnotherPerson('Nicholas'); //抛出错误
```

如果要让程序正确运行, `new.target`一定是`Person`。当调用`new AnotherPerson("Nicholas")`时, 真正调用的`Person.call(this,name)`, 没有使用`new`关键字, 因此 `new.target`的值为`undefined`会抛出错误。

在函数外使用`new.target`是一个语法错误。

### 箭头函数

#### 与传统函数区别:

- **没有 this、super、arguments、和 new.target 绑定**。这些值由外围最近一层非箭头函数决定。
- **不能通过 new 关键字调用。** 箭头函数没有[[Construct]]方法, 不能被用作构造函数。
- **没有原型。** 由于不可以通过 new 关键字来调用箭头函数, 因而没有构造原型的需求, 所以不存在 prototype 这个属性。
- **不可以改变 this 绑定**。函数内部的 this 值不可被改变, 在函数的生命周期内始终保持一致。
- **不支持 arguments 对象** 箭头函数没有 arguments 绑定, 所以必须通过命名参数和不定参数来访问函数的参数。
- **不支持重复的命名参数。** 无论是否在严格模式下, 箭头函数都不支持重复的命名参数。而在传统函数的规定中, 只有在严格模式下才不能有重复的命名参数。

#### 箭头函数语法

如果想让箭头函数向外返回一个对象字面量, 则需要将该字面量包裹在小括号内。

```javascript
//箭头函数语法
let doNothing = id => {
  return { id: id, name: 'Temp' };
};
//这样返回对象字面量更加简洁!
let doNothing = id => ({ id: id, name: 'Temp' });
```

#### 创建立即执行函数表达式

```javascript
//创建立即执行函数表达式
let person = (name => {
  return {
    getName() {
      return name;
    }
  };
})('Nicholas');
console.log(person.getName()); //Nicholas
```

需要注意的是, 小括号只包裹箭头函数定义,没有包含`('Nicholas')`,这一点与正常函数不同!

### 尾调用优化

尾调用优化发生在引擎背后, 除非你尝试优化一个函数, 否则, 无需思考此类问题。 递归函数是其最主要的应用场景!

```javascript
//尾调用优化
function factorial(n, p = 1) {
  if (n <= 1) {
    return 1 * p;
  } else {
    let result = n * p;
    return factorial(n - 1, result);
  }
}

console.log(factorial(4)); //24
```

## 字符串扩展

### 常见用途

padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

```js
'1'.padStart(10, '0'); // "0000000001"
'12'.padStart(10, '0'); // "0000000012"
'123456'.padStart(10, '0'); // "0000123456"
```

另一个用途是提示字符串格式。

```js
'12'.padStart(10, 'YYYY-MM-DD'); // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD'); // "YYYY-09-12"
```

## 扩展对象的功能性

### 对象字面量语法扩展

#### 对象方法的简写

```javascript
//对象方法的简写语法
let person = {
  name: 'Nicholas',
  sayName() {
    console.log(this.name);
  }
};
```

这个简写方法与传统写法唯一区别是简写方法可以使用`super`关键字。

#### 可计算属性名

```javascript
//可计算属性名
let suffix = ' name';
let person = {
  ['first' + suffix]: 'Nicholas',
  ['last' + suffix]: 'Zakas'
};
console.log(person['first name']); //Nicholas
console.log(person['last name']); //Zakas
```

这些属性球之后字符串为`'first name'`和·`'last name'`，然后他们可以用属性引用。使用方括号表示法，任何能放在对象实力方括号内的东西，都可以作为需计算属性名用在对象字面量中。

### 新增方法

#### Object.js()方法

`Object.js()`方法主要用来弥补全等运算符的不准确运算， 这个方法接受两个参数， 如果这两个参数类型相同且具有相同的值， 则返回`true`。

```javascript
//新增方法
console.log(Object.is(+0, -1)); //false
console.log(Object.is(NaN, NaN)); //true
console.log(Object.is(5, '5')); //false
```

对于`Object.is()`方法来说，大部分情况与全等操作符`===`相同，唯一区别在于`+0`和`-0`识别为不相等，并且`NaN`与`NaN`等价。

#### Object.assign()

`Object.assign()`方法可以接受任意数量的源对象， 并按指定的顺序将属性复制到接收对象中。如果有多个源对象具有同名属性， 则排位靠后的源对象会覆盖排位靠前的。

```javascript
let receiver = {};
Object.assign(
  receiver,
  {
    type: 'js',
    name: 'file.js'
  },
  {
    type: 'css'
  }
);
console.log(receiver.type); //css
console.log(receiver.name); //file.js
```

此处有两个`type`属性，后面的`css`会覆盖前面的值。

### 增强对象原型

#### 改变对象的原型

ES6 中添加了`Object.setPrototypeOf()`方法来改变原型，`Object.getPrototypeOf()`方法返回原型。

```javascript
//改变对象的原型
let person = {
  getGreeting() {
    return 'Hello';
  }
};

let dog = {
  getGreeting() {
    return 'Woof';
  }
};
let friend = Object.create(person);
console.log(friend.getGreeting()); //Hello
console.log(Object.getPrototypeOf(friend) === person); //true
//将原型设置为dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); //Woof
console.log(Object.getPrototypeOf(friend) === dog); //true
```

#### 简化原型访问的 Super 引用

如果你想重写对象实例方法，又需要调用与它同名的原型方法，ES5 可以这样写：

```javascript
let person = {
  getGreeting() {
    return 'Hello';
  }
};

let dog = {
  getGreeting() {
    return 'Woof';
  }
};
let friend = {
  getGreeting() {
    return Object.getPrototypeOf(this).getGreeting.call(this) + ', hi!';
  }
};
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); //Hello, hi!

console.log(Object.getPrototypeOf(friend) === person); //true
//将原型设置为dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); //Woof,hi
console.log(Object.getPrototypeOf(friend) === dog); //true
```

这个实例中，`friend`对象的`getGreeting`方法调用了同名的原型方法，`Object.getPrototypeOf(this)`方法可以确保调用正确的原型。后面的`.call(this)`可以确保正确设置原型方法中的`this`值。

由于要准确记得如何使用`Object.getPrototypeOf()`方法和`.call(this)`方法来调用原型上的方法过于复杂， ES6 对此引入了`super`关键字。 简单来说， `super`引用相当于指向对象原型的指针， 实际上就是`Object.getPrototypeOf()`的值。于是，我们可以简写上面的方法：

```javascript
let person = {
    getGreeting() {
        return 'Hello'
    }
}

let dog = {
    getGreeting() {
        return 'Woof'
    }
}
let friend = {
    getGreeting(){
        ==return super.getGreeting() + ", hi!";==
    }
}
Object.setPrototypeOf(friend,person);
console.log(friend.getGreeting());//Hello, hi!

console.log(Object.getPrototypeOf(friend) === person);//true
//将原型设置为dog
Object.setPrototypeOf(friend,dog)
console.log(friend.getGreeting());//Woof,hi
console.log(Object.getPrototypeOf(friend) === dog);//true
```

还有两个重要的点：
一是使用`Super`引用，必须是要在使用简写方法的对象中使用， 如果在其他方法声明中使用会导致语法错误。
二是， `Super`引用在多重继承的情况下非常有用， 因为在这种情况下使用`Object.getPrototypeOf()`方法将会出现问题。`Super`引用不是动态变化的，它总是指向正确的对象。

## 解构：使数据访问更便捷

### 对象解构

对象解构的语法形式是在一个赋值操作符左边放置一个对象字面量，如下：

```javascript
let node = {
  type: 'Identifier',
  name: 'foo'
};
let { type, name } = node;
console.log(type); //Identifier
console.log(name); //foo
```

#### 不要忘记初始化程序

如果使用`var`、`let`和`const`解构声明变量， 则必须要提供初始化程序（也就是等号右侧的值）。 下面这几行代码全部会导致程序抛出语法错误， 它们缺少了初始化程序：

```javascript
// var {type , name};//报错

// let {type , name}；//报错

// const {type , name};//报错
```

#### 解构赋值

我们可以在变量赋值时使用解构语法， 可以在定义变量之后修改它们的值：

```javascript
let node = {
    type: 'Identifier',
    name: 'foo'
  },
  type = 'Literal',
  name = 5;

({ type, name } = node);

console.log(type); //'Identifier'
console.log(name); //'foo'
```

::: warning 警告
请注意， 一定要使用一对小括号来包裹解构赋值语句。
JavaScript 引擎会将一对开放的花括号视为一个代码块， 而语法规定， 代码块语句不允许出现在赋值语句左侧， 添加小括号可以将语句转化为一个表达式， 从而实现了整个解构赋值的过程。
:::

解构赋值表达式的值与表达式右侧的值相等， 如此一来， 在任何使用值得地方都可以使用解构赋值表达式。 我们可以看一下给函数传递参数值的过程：

```javascript
let node = {
    type: 'Identifier',
    name: 'foo'
  },
  type = 'Literal',
  name = 5;

function ouputInfo(value) {
  console.log(value === node); //true
}

ouputInfo(({ type, name } = node));

console.log(type); //'Identifier'
console.log(name); //'foo'
```

函数调用时传入解构表达式， 此时传入的参数等同于`node`， 且变量被重新复制。

解构赋值表达式， 也就是`=`号右侧的表达式， 如果为`null`或`undefined`会导致程序抛出错误。

##### 解构对象方法

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello'); // hello
```

上面代码的例一将 Math 对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。例二将 console.log 赋值到 log 变量。

#### 默认值

使用解构赋值表达式， 如果指定的局部变量名称在对象中不存在， 那么局部变量会被赋值为`undefined`。

当然， 我们也可以定义一个默认值， 在属性名称后添加一个等号和相应的默认值即可：

```javascript
let node = {
    type: 'Identifier',
    name: 'foo'
  },
  type = 'Literal',
  name = 5;

({ type, name, value = true } = node);

console.log(type); //'Identifier'
console.log(name); //'foo'
console.log(value); //true
```

当`node`上没有该属性或者为`undefined`时默认值才会生效。

#### 为非同名局部变量赋值

如果你希望使用不同命名的局部变量来存储对象属性的值， ES6 有一个扩展语法可以满足你的需求。

```javascript
let node = {
  type: 'Identifier'
};

let { type: localType, name: localName = 'bar' } = node;

console.log(localType); //'Identifier'
console.log(localName); //'foo'
```

这段代码使用了结构肤质来声明变量`localType`和`localName`, 这两个变量分别包含了`node.type`和`node.name`属性的值。

我们也可以再赋值时添加默认值。在变量名后添加即可。

对象解构默认值：

```js
var { x = 3 } = {};
x; // 3

var { x, y = 5 } = { x: 1 };
x; // 1
y; // 5

var { x: y = 3 } = {};
y; // 3

var { x: y = 3 } = { x: 5 };
y; // 5

var { message: msg = 'Something went wrong' } = {};
msg; // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于`undefined`。

```js
var { x = 3 } = { x: undefined };
x; // 3

var { x = 3 } = { x: null };
x; // null
```

上面代码中，属性`x`等于`null`，因为`null`与`undefined`不严格相等，所以是个有效的赋值，导致默认值 3 不会生效。

::: warning 警告
如果要将一个已经声明的变量用于解构赋值，必须非常小心。
:::

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});
```

#### 嵌套对象结构

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};

//提取node.loc.start
let {
  loc: { start: localStart }
} = node;
console.log(localStart.line); //1
console.log(localStart.column); //1
```

我们在解构模式中使用了花括号， 其含义为找到`node`对象中的`loc`属性后， 应当深入一层继续查找`start`属性。在上面的解构示例中， 所有的冒号前标识符都代表在对象中的检索位置， 其右侧为被赋值的变量名。如果冒号后面是花括号， 则意味着要赋予的最终值嵌套在对象内部更深的层级中。

当然我们也可以使用一个与对象属性名不同的局部变量名， 如上， 解构模式可以应用于任意层级深度的对象。

#### 语法警示

```javascript
//未声明任何变量
let {
  loc: {}
} = node;
```

这条语句不会声明任何绑定， 更好的做法是定义一个默认值。

### 数组解构

```javascript
let colors = ['red', 'green', 'blue'];
let [firstColor, secondColor] = colors;
let [x, y, ...z] = ['a'];
x; // "a"
y; // undefined
z; // []
console.log(firstColor); //red
console.log(secondColor); //green
```

我们从数组`colors`解构出了`"red"`和`"green"`这两个值， 分别存在变量`firstColor`和`secondColor`中。我们可以通过值在数组中的位置进行选取， 且可以将其存储在任意变量中， 未显式声明的元素会直接忽略。

如果解构不成功，变量的值就等于`undefined`。

切记， 这个过程数组不会发生任何变化。

我们也可以只为感兴趣的元素提供变量名， 只要使用占位符即可。

```javascript
let colors = ['red', 'green', 'blue'];
let [, , thirdColor] = colors;
console.log(thirdColor); //blue
```

#### 不完全解构

```js
let [x, y] = [1, 2, 3];
x; // 1
y; // 2

let [a, [b], d] = [1, [2, 3], 4];
a; // 1
b; // 2
d; // 4
```

上面两个例子，都属于不完全解构，但是可以成功

如果等号的右边不是数组（或者严格地说，不是可遍历的结构，，那么将会报错。

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。

对于 Set 结构，也可以使用数组的解构赋值。

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
x; // "a"
```

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

#### 解构赋值

数组解构可以用于赋值上下文， 但不需要小括号包裹表达式， 这一点与对象结构的约定不同。

```javascript
let colors = ['red', 'green', 'blue'],
  firstColor = 'black',
  secondColor = 'purple';
[firstColor, secondColor] = colors;
console.log(firstColor); //red
```

#### 解构赋值交换变量值

```javascript
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a); //2
console.log(b); //1
```

赋值语句左侧与其他数组解构示例一样， 是一个解构模式；右侧是一个交换过程创建的临时数组字面量。 代码执行过程中， 先解构临时数组， 将`b` 和 `a`的值复制到左侧数组的前两个位置， 最终结果是互换了它们的值，

如果右侧数组解构表达式值为`null`或`undefined`， 则会导致报错。

##### 默认值

当然我们可以以在解构赋值表达式中为数组任意位置添加默认值， 这样我们就可以在指定的位置属性不存在或其值为`undefined`时使用默认值：

```javascript
let colors = ['red'];
let [firstColor, secondColor = 'green'] = colors;
console.log(firstColor); //red
console.log(secondColor); //green
```

::: warning 注意
ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。
:::

```js
let [x = 1] = [undefined];
x; // 1

let [x = 1] = [null];
x; // null
```

上面代码中，如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。

##### 惰性求值

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```js
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

#### 嵌套数组解构

与嵌套对象结构语法类似，如下：

```javascript
let colors = ['red', ['green', 'lightgreen'], 'blue'];
let [firstColor, [secondColor, thirdColor], fourColor] = colors;
console.log(firstColor); //red
console.log(secondColor); //green
console.log(thirdColor); //lightgreen
console.log(fourColor); //blue
```

#### 不定元素

在数组中， 我们可以通过`...`语法将数组中的其余元素赋值给一个特定的变量， 如下：

```javascript
let colors = ['red', 'green', 'lightgreen', 'blue'];
let [firstColor, ...restColor] = colors;
console.log(restColor[0]); //green
```

在 JavaScript 中， 很明显漏掉了数组复制的功能。 在 ES5 中， 我们使用`concat`方法克隆数组， 而在 ES6 中， 我们其实可以通过不定参数的语法来实现相同的功能：

```javascript
let colors = ['red', 'green', 'lightgreen', 'blue'];
let [...restColor] = colors;
console.log(restColor); //["red", "green", "lightgreen", "blue"]
```

在被解构的数组中， 不定元素必须为最后一个条目， 在后面添加逗号会抛出语法错误。

### 混合解构

可以混合使用对象解构和数组解构创建更多复杂的表达式， 你可以提取任何你想要的信息：

```javascript
let node = {
  name: 'foo',
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  },
  range: [0, 3]
};

let {
  loc: { start },
  range: [startIndex]
} = node;
console.log(start.line); //1
console.log(start.column); //1
console.log(startIndex); //0
```

需要注意的是， 解构模式中的`loc:`和`range:`仅代表他们在`node`对象中所处的位置（也就是该对象的属性）。

混合解构语法极为有效， 尤其是从`JSON`配置中提取信息， 不用遍历整个结构了。

### 解构参数

```javascript
//options的属性表示其他参数
function setCookie(name, value, options) {
  options = options || {};
  let secure = options.secure,
    path = options.path;
  console.log(secure, path); //true undefined
}

//第三个参数映射到options中
setCookie('type', 'js', {
  secure: true
});
```

在示例函数中， `name`和`value`是必需参数， 而`secure`和`path`则不然， 这些参数相对而言没有优先顺序， 将它们列为额外的命名参数也不合适。 此时为`options`对象设置同名的命名属性是一个很好的选择。现在的问题是， 仅查看函数声明部分， 无法分辨函数预期参数， 必须要通过阅读函数题才可以确定。

如果我们将`options`定义为解构参数， 可以很好地解决这个问题。

```javascript
function setCookie(
  name,
  value,
  { secure, colors: [, second], expires: { bili: b } }
) {
  console.log(secure, second, b); //true 2 233
}

setCookie('type', 'js', {
  secure: true,
  colors: [1, 2],
  expires: {
    bili: 233
  }
});
```

使用解构语法代替第 3 各参数来提取必要的信息， 其他参数保持不变， 这样解构参数变得更加清晰！

解构参数支持所有解构特性。 可使用默认值， 混合对象， 对象和数组解构， 及非同名变量存储提取出来的信息。

#### 必须传值的解构参数

解构参数如果调用函数时不提供解构参数会导致程序抛出错误。

这是因为确实的第 3 个参数， 其值为`undefined`。 解构参数只是将解构声明应用在函数参数的一个简写方法。如果解构赋值表达式的右侧值为`null`或者`undefined`则程序会报错。 JavaScript 引擎实际运行如下：

```javascript
function setCookie(
  name,
  value,
  { secure, colors: [, second], expires: { bili: b } }
) {
  let {
    secure,
    colors: [, second],
    expires: { bili: b }
  } = options;
}

setCookie('type', 'js');
```

如果你希望解构参数是可选的， 必须为其提供默认值。

```javascript
function setCookie(
  name,
  value,
  { secure = true, colors = [1, 2], expires = { bli: '233' } } = {}
) {
  console.log(secure, colors, expires); //true  [1, 2] {bli: "233"}
}

setCookie('type', 'js');
```

#### 解构参数的默认值

解构参数的每一个属性也可以有默认值。然而， 这也有很多缺点： 首先， 函数声明变得比以前更复杂了， 其次， 如果解构参数是可选的， 那么仍然要给它添加一个空对象作为参数， 否则调用时会报错。

建议对于对象类型的解构参数， 为其赋予相同解构的默认参数：

```javascript
const setCookieDefaults = {
  secure: false,
  colors: [985, 211],
  expires: { bli: 233 }
};
function setCookie(
  name,
  value,
  {
    secure = true,
    colors = [1, 2],
    expires = { bli: '233' }
  } = setCookieDefaults
) {
  console.log(secure, colors, expires); //false [985, 211] {bli: 233}
}
setCookie('type', 'js');
```

如果我们想要改变默认值， 可以立即在`setCookieDefaults`中修改， 改变的数据将自动同步到所有出现过的地方。

### 用途

##### 交换变量的值

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

##### 从函数返回多个值

```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

##### 函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

##### 提取 JSON 数据

```js
let jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

##### 函数参数的默认值

```js
jQuery.ajax = function(
  url,
  {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = true
    // ... more config
  } = {}
) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo'`;这样的语句。

##### 遍历 Map 结构

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + ' is ' + value);
}
// first is hello
// second is world

//如果只想获取键名，或者只想获取键值，可以写成下面这样。

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [, value] of map) {
  // ...
}
```

##### 输入模块的指定方法

```js
const { SourceMapConsumer, SourceNode } = require('source-map');
```

## Symbol 和 Symbol 属性

### 创建 Symbol

Symbol 主要是用来声明一个独一无二的值， 它主要作用于对象属性中， 比如在原有的代码中有一个对象属性为`tools`，此时你也想添加一个属性`tools`， 那么此时你可以使用`symbol`， 完美解决这个问题，`Symbol`属性非常适用于那些需要一定程度保护的功能。

```javascript
let firstName = Symbol('first,name');
let person = {};
person[firstName] = 'Nicholas';
console.log('first name' in person); //false
console.log(person[firstName]); //Nicholas
console.log(firstName); //Symbol(first,name)
console.log(typeof firstName); //symbol
```

上面创建了一个名为`firstName`的`Symbol`，用它将一个新的属性赋值给`person`对象，每当想访问这个属性时一定要用到最初定义的`Symbol`，Symol 是原始值， 使用`new Symbol()`会报错。

`Symbol`函数接受一个可选参数， 可以添加一段文本描述即将创建的`Symbol`， 这样便于阅读代码和调试`Symbol`程序。

可以用`typeof`来检测变量是否为`Symbol`类型。

### Symbol 的使用方法

`Symbol`可以用于可计算对象字面量属性名， `Object.defineProperty()`方法和`Object.defineProperties()`方法的调用过程中。

### Symbol 共享体系

想要在不同代码中共享一个`Symbol`， 可以试用`Symbol.for()`;

### Symbol 与类型强制转换

如果你尝试将`Symbol`和一个字符串拼接， 则会抛出错误。同样， 他也不能强制转换为数字类型。 使用逻辑操作符的话会返回`true`。

### Symbol 属性检索

`Object.keys()`方法可以反悔所有可枚举的属性名。`Object.getOwnPropertyNames`方法可以不考虑属性的可枚举性一律返回。 这两个方法都不支持`Symbol`属性。
在 ES6 中， `Object.getOwnProperty-Symbols()`方法来检索对象中的`Symbol`属性。

## Set 集合与 Map 集合

### Set 集合与 Map 集合

- Set 集合是一种无重复元素的列表，通常的做法是检测给定的值在某个集合中是否存在。

- Map 集合内含多组键值对，集合中每个元素分别存放着可访问的键名和它对应的值。Map 集合经常用于缓存频繁取用的数据。

一般来说， Set 集合常用语检查对象中是否存在某个键名， 而 Map 集合常备用于获取已存的信息。

### ES6 中的 Set 集合

ES6 中的 Set 集合是一种有序列表， 其中含有一些相互独立的非重复值， 通过 Set 集合可以快速访问其中的数据， 更有效的追踪各种离散值。

#### 创建 Set 集合并添加元素

调用`new Set()`创建 Set 集合， 调用`add()`方法向集合中添加元素， 访问集合的`size`属性可以获取集合中目前的元素数量。

```javascript
//Set集合和Map集合
let set = new Set();
set.add(5);
set.add('5');
console.log(set.size, set); //2  {5, "5"}
```

在 Set 集合中， 不会对所存值进行强制的类型转换， 数字 5 和字符串“5”可以作为两个单独元素存在。使用`Object.is()`方法检测两个值是否一致， 唯一例外的是， Set 集合中+0 和-0 是相等的。 如果想 Set 集合添加多个对象， 他们之间彼此保持独立：

```js
let set = new Set(),
  key1 = {},
  key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size); //2
```

`key1`和`key2`不会转换为字符串，它们在集合中是两个单独的元素。

如果多次调用`add()`方法并传入相同的值作为参数， 那么后续的调用会被忽略。
Set 构造函数会过滤掉重复的值从而保证集合中的元素各自唯一。

```javascript
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size); //5
```

自动去重的功能对于将已有代码或者 JSON 解构转换为 Set 集合执行非常好。

Set 构造函数可以接受所有可迭代对象作为参数， 如：数组、Set 集合 、 Map 集合。

通过`has()`方法检测 Set 集合中是否存在某个值：

```javascript
let set = new Set();
set.add(5);
set.add('6');
console.log(set.has(5)); //true
console.log(set.has(6)); //false
```

这段代码没有**数字**6 这个值， 所以`set.has(6)`调用返回`false`。

#### 移除元素

调用`delete()`方法移除某个元素， 调用`clear()`方法移除集合所有元素。

#### Set 集合中的 forEach（）方法

和 ES5 中的`forEach()`方法类似， 不同的是 Set 集合没有键名，它的回调函数前两个参数具有相同含义。

```javascript
let set = new Set([1, 2]);
set.forEach(function(value, key, ownerSet) {
  console.log(`${key} | ${value}`);
  console.log(ownerSet === set);
});
```

输出结果：

![image-20220805091503226](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091503226.png)

在 Set 集合的`forEach()`方法中， 第二个参数与数组一样， 如果需要在回调函数中使用`this`引用， 则可以将它作为第二个参数传入`forEach()`函数：

```javascript
let set = new Set([1, 2]);
let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(function(value) {
      this.output(value);
    }, this);
  }
};
processor.process(set); //1,2
```

当然也可以使用剪头函数， 这样就无须再将`this`作为第二个参数传入回调函数。

```javascript
let set = new Set([1, 2]);
let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(value => {
      this.output(value);
    });
  }
};
processor.process(set); //1,2
```

请记住，Set 集合更适合跟踪多个值， 也可以通过`forEach()`操作每个元素
， 但是不能像数组元素那样直接通过索引来访问集合中的元素。 如有需要， 最好先将 Set 集合转换成一个数组。

#### 将 Set 集合转换为数组

将数组转换为 Set 集合只需要在 Set 构造函数传入数组即可。 而 Set 集合转数组也非常简单， 只需要用展开运算符（`...`）即可。

```javascript
let set = new Set([1, 2, 2, 2, 3]),
  arr = [...set];
console.log(arr); //[1, 2, 3]
```

### Weak Set 集合

Set 集合与存储在变量中完全一样， 是一个强引用。 只要 Set 实例中的引用存在， 垃圾回收机制就不能释放该对象的内存空间。

```javascript
let set = new Set([1, 2, 2, 2, 3]),
  key = {};

set.add(key);
console.log(set.size); //4
//移除原始引用
key = null;
console.log(set.size); //4
//重新取回原始引用
key = [...set][3];
console.log(key); //{}
```

即使将变量`key`设置为`null`时清除了初始对象的引用， 但是 Set 集合保留了这个引用， 仍然可以取出该引用。

如果我们希望当其他引用不存在时， Set 集合中的引用也消失。 如在 Web 页面中记录一些 DOM 元素， 这些元素有可能被移除， 而你又不希望自己的代码保留这些 DOM 元素的最后一个引用。（这个情景称为内存泄漏。）

这个时候我们可以使用 ES6 中的 WeakSet 集合（弱引用 Set 集合）。WeakSet 集合只存储对象的弱引用， 并且不可以存储原始值。 集合中的弱引用如果是对象中的唯一引用， 则会被回收并释放相应内存。

#### 创建 WeakSet 集合

WeakSet 集合支持三个方法：`add()`添加, `has()`检查, `delete()`删除；

```javascript
let key1 = {},
  key2 = {};
set = new WeakSet([key1]);
set.add(key2);
set.delete(key1);
console.log(set.has(key1)); //false
console.log(set.has(key2)); //true
```

请务必要记住， WeakSet 构造函数不接受任何原始值， 如果数组中包含其它非对象值， 程序会抛出错误。

#### 两种 Set 类型主要区别

最大区别是 WeakSet 保存的是对象值的弱引用。

```javascript
let set = new WeakSet(),
  key = {};

set.add(key);
console.log(set.has(key)); //true
//移除原始引用, WeakSet中的引用也自动移除。
key = null;
console.log(set.has(key)); //false
```

这段代码执行以后， 就无法访问 WeakSet 中的`key`引用了。

##### 差别：

- WeakSet 实例中， 向`add()`方法传入非对象参数会报错。`has()`和`delete()`方法传入非对象参数会返回`false`。
- WeakSet 不可迭代， 不能用于`for-of`循环。
- WeakSet 不暴露任何迭代器，如`keys()`,`values()`方法， 所以无法通过程序本身来检测其中的内容。
- WeakSet 不支持`forEach()`方法。
- WeakSet 不支持 `size`属性。

WeakSet 集合功能看似受限， 其实是为了更好地处理内存中的数据。 总之， 如果你只需要跟踪对象引用， 你更应该使用 WeakSet 集合而不是普通的`set`集合。

### ES6 中的 Map 集合

Set 类型可以处理列表中的值， 但是不适用于处理键值对这样的信息结构。ES6 添加了 Map 集合来解决类似问题。

ES6 的 Map 类型是一种存储许多键值对的有序列表， 其中键名和对应的值支持所有数据类型。键名的等价性判断是通过调用`Object.is()`方法来实现的， 所以数字 5 和字符串 5 会被判定为两种类型， 可以分别作为独立的两个键出现在程序中， 这一点与对象不太一样， 因为对象的属性名会强制转换为字符串类型。

向 Map 集合添加新元素使用`set()`方法并分别传入键名和对应值作为两个参数。 如果要获取信息， 可以调用`get()`方法。

```javascript
let map = new Map();
map.set('title', 'es6');
map.set('year', '2019');
console.log(map.get('title')); //es6
console.log(map.get('year')); //2019
```

如果调用`get()`方法时传入的键名在 Map 集合不存在， 则会返回`undefined`。

在对象中， 无法使用对象作为对象属性的键名， 但在 Map 集合中， 却可以这样做。

```javascript
let map = new Map(),
  key1 = {},
  key2 = {};
map.set(key1, 5);
map.set(key2, 42);
console.log(map.get(key1)); //5
console.log(map.get(key2)); //42
```

#### Map 集合支持的方法

Map 集合和 Set 集合设计了 3 个通用的方法：

1.  `has(key)`检测指定的键名在 Map 集合中是否已经存在。
2.  `delete(key)`从 Map 集合中移除指定键名及对应的值。
3.  `clear()`移除 Map 集合中的所有键值对

Map 集合同样也支持`size`属性， 其代表当前集合中所含的键值对数量。

#### Map 集合的初始化方法

可以向`Map`构造函数传入==数组==来初始化一个 Map 集合， 这一点与 Set 相似。数组的每个元素都是一个子数组， ==子数组包含一个键值对的键名与值两个元素==。因此， 整个 Map 集合包含的全是这样的两元素数组：

```javascript
let map = new Map([
  ['name', 'nicholas'],
  ['age', '25']
]);
console.log(map.has('name')); //true
console.log(map.get('name')); //nicholas
console.log(map.size); //2
```

#### Map 集合中的 forEach()方法

Map 集合中的`forEach()`方法类似， 回调函数接受 3 个参数：

- Map 集合中下一次索引的位置
- 值对应的键名
- Map 集合本身

这些回调参数与数组中的更相近， 第一参数是值， 第二个是键名（在数组中对应的是数值型的索引值）。

```javascript
let map = new Map([
  ['name', 'nicholas'],
  ['age', '25']
]);
map.forEach(function(val, k, ownerMap) {
  console.log(`${k}  ${val}`);
  console.log(ownerMap === map);
});
```

输出结果：

![image-20220805091544344](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091544344.png)

遍历过程中， 会按照键值对插入 Map 集合的顺序将相应信息传入`forEach()`方法的回调函数， 而在数组中， 会按照数值型索引值的顺序依次传入回调函数。

### WeakSet 集合

WeakSet 是弱引用 Map 集合， 用于存储对象的弱引用。==WeakMap 集合键名必须是一个对象==，否则会报错。集合的键名对象的弱引用之外如果不存在其他强引用， 则引擎垃圾回收机制会自动回收这个对象， 同时也会移除 WeakMap 集合中的键值对。==集合的键值如果是一个对象， 则保存的是对象的强引用， 不会触发垃圾回收机制。==

WeakMap 最大用途是保存 Web 页面中的 DOM 元素。

#### 使用 WeakMap 集合

ES6 中的 WeakMap 类型是一种存储许多键值对的无序列表， 列表的键名必须是非`null`类型对象， 键名对应的值可以使任何类型。与 Map 非常相似， 通过 Set()方法添加数据， 通过 Get()方法获取数据。

```javascript
let map = new WeakMap(),
  element = document.querySelector('.element');
map.set(element, 'Original');
let value = map.get(element);
console.log(value); //Original
//移除element元素
element.parentNode.removeChild(element);
element = null;
console.log(map.has(element)); //false
//此时WeakMap集合为空
```

如果从页面文档移除 DOM 元素， 并将引用的这个元素设置为`null`， 那么 WeakMap 集合中的数据也会被清除。

与 WeakSet 集合相似， WeakMao 也不支持`size`属性。在其它引用被移除后， 由于对键的引用不再有残留， 也无法调用`get()`方法来提取对应的值。Weak Map 已经切断了对于该值的访问， 其所占的内存在垃圾回收器运行时便会被释放。

#### Weak Map 初始化

WeakMap 构造函数需要传入一个数组容器， 容器内包含其它数组。内部数组应当有两项， 第一项是作为键的==非`null`的对象==， 第二项则是对应的值（ 任意类型） 。

如果传入的键值含有非对象的键， 会报错。

#### Weak Map 集合支持的方法

WeakMap 有两个可以操作键值对的方法， `has()`检测给定的键在集合中是否存在， `delete()`方法移除指定的键值对。与 WeakSet 集合一样， 二者不支持键名枚举。 从而不支持`clear()`方法。

```javascript
let map = new WeakMap(),
  element = document.querySelector('.element');
map.set(element, 'Original');
let value = map.get(element);
console.log(map.has(element)); //true
console.log(map.get(element)); //Original
map.delete(element);
console.log(map.has(element)); //false
console.log(map.get(element)); //undefined
```

#### 私有对象数据

虽然大多数开发者认为 Weak Map 的主要用途是存储 DOM 元素， 但仍然还存在許多可能的用法 。Weak Map 的一个实际应用就是在对象实例中==存储私有数据==。在 ES6 中对象的所有属性都是公开的， 因此若想让数据对于对象自身可访问、而在其他条件下不可访问， 那么你就需要使用一些创造力。如下：

```javascript
let Person = (function() {
  let privateData = new WeakMap();
  function Person(name) {
    privateData.set(this, { name: name });
  }
  Person.prototype.getName = function() {
    return privateData.get(this).name;
  };
  return Person;
})();
```

此版本的`Person` 范例使用了 Weak Map 而不是对象来保存私有数据。由于 person 对象的实例本身能被作为键来使用， 于是也就无须再记录单独的`id`。当`Person` 构造器被调用时，将`this` 作为键在 Weak Map 上建立了一个入口， 而包含私有信息的对象成为了对应的值，其中只存放了`name` 属性。通过将`this` 传递给`privateData` ， `get()` 方法， 以茯取值对象并访问其`name` 属性， `getName()` 函数便能提取有信息。这种技术让私有信息能够保持私有状态， 并且当与之关联的对象实例被销毁时， 私有信息也会被同时销毁。

#### Weak Map 集合的使用方式及使用限制

当决定是要使用 Weak Map 还是使用正规 Map 时， 首要考虑因素在于你==是否只想使用对象类型的键==。如果你打算这么做， 那么最好的选择就是 Weak Map 。因为它能确保额外数据在不再可用后被销毁， 从而能优化内存使用并规避内存泄漏。要记住 Weak Map 只为它们的内容提供了很小的可见度， 因此你不能使用`forEach()` 方法、`size` 属性或`clear()` 方法来管理其中的项。如果你确实需要一些检测功能， 那么正规 Map 会是更好的选择， 只是一定要确保留意内存的使用。当然， 若你想使用非对象的键， 那么正规 Map 就是唯一选择。

## 迭代器(iterator)和生成器(Generator)

用循环语句迭代数据时， 必须要初始化一个变量来记录每一次迭代在数据集合中的位置。 而在许多编程语言中， 已经开始通过程序化的方式用迭代器对象返回迭代过程中集合的每一个元素。

### 什么是生成器

生成器是一种返回迭代器的函数， 通过`function`关键字后面的星号(\*)
来表示， 函数中会用到新的关键字`yield`。星号可以紧挨着`function`关键字， 也可以在中间添加一个空格， 如下：

```javascript
function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}

//生成器的调用方式与普通函数一样， 只不过返回的是一个迭代器。
let iterator = createIterator();
console.log(iterator.next().value); //1
console.log(iterator.next().value); //2
console.log(iterator.next().value); //3
```

`createIterator()`前的星号表示它是一个生成器， `yield`关键字也是 ES6 的新特性， 通过它来指定调用迭代器的`next()`方法时的返回值和返回顺序。 每当执行完一掉`yield`语句后函数会自动停止执行。直到再次调用迭代器的`next()`方法才会继续执行`yield2`语句。

使用`yield`关键字可以返回任何值或者表达式， 可以通过生成器函数批量的给迭代器增加元素， 例如， 可以在循环中使用`yield`关键字：

```javascript
function* createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}

let iterator = createIterator([1, 2, 3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
//之后所有的调用都会返回相同内容
console.log(iterator.next());
```

输出结果：

![image-20220805091608066](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091608066.png)

#### yield 的使用限制

`yield`关键字只在生成器内部使用， 在其他地方使用会抛出语法错误。 即便在生成器内部的函数里使用也是如此：

```javascript
function *createIterator(items){
  items.forEach(function(item){
    //语法错误
    yield item+1
  });
}
```

`yield`关键字确实在`createIterator`函数内部， 但是它与`return`关键字一样， 二者不能穿透函数边界， 嵌套函数中的`return`语句不能用做外部函数的返回语句， 此处嵌套函数中的`yield`语句会导致报错。

#### 生成器函数表达式

也可以通过函数表达式创建生成器， 只需在`function`关键字和小括号中间添加一个星号（\*）即可。

不能使用箭头函数来创建生成器。

#### 生成器对象的方法

```javascript
let o = {
  *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
};

let iterator = o.createIterator([1, 2, 3]);
```

只需在函数名前添加一个星号（\*）。

### 可访问对象与 for-of 循环

可迭代对象具有`Symbol.iterator`属性， 是一种与迭代器密切相关的对象。`Symbol.iterator`通过指定的函数可以返回一个用于附属对象的迭代器。 在 ES6 中， 所有的集合对象（数组， Set 集合和 Map 集合）和字符串都是可迭代对象， 这些对象中都有默认的迭代器。ES6 中新加入的特性`for-of`循环需要用到可迭代对象的这些功能。

`for-of`循环每执行一次都会调用可迭代对象的`next()`方法， 并将迭代器返回的结果对象的`value`属性存储在一个变量中， 循环将持续执行到返回对象的`done`属性的值为`true`。

```javascript
let values = [1, 2, 3];
for (let num of values) {
  console.log(num);
}
```

![image-20220805091630835](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20220805091630835.png)

如果只需迭代数组或集合中的值， 用`for-of`循环代替`for`循环是个不错的选择， 相比传统的`for`循环， `for-of`循环的控制条件更简单， 不需要追踪复杂的条件， 所以更少出错。

`for-of`语句用于不可迭代对象, `null`或`undefined`将会导致程序抛出错误。

### 访问默认迭代器

可以通过 Symbol.iterator 来访问对象默认的迭代器。

```javascript
let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();
console.log(iterator.next()); //{value:1,done:false}
console.log(iterator.next()); //{value:2,done:false}
console.log(iterator.next()); //{value:3,done:false}
console.log(iterator.next()); //{value:4,done:true}
```

这段代码通过`Symbol.iterator`获取了数组`values`的默认迭代器， 并用它遍历数组中的元素。在 JavaScript 引擎中执行`for-of`循环语句也会有类似的处理过程。

由于具有`Symbol.iterator`属性的对象具有默认的迭代器， 因此可以用它来检测对象是否为可迭代对象。

```javascript
function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function';
}

console.log(isIterable([1, 2, 3])); //true
console.log(isIterable('hello')); //true
console.log(isIterable(new Map())); //true
console.log(isIterable(new Set())); //true
console.log(isIterable(new WeakMap())); //false
console.log(isIterable(new WeakSet())); //false
```

这里的 isIterable()函数可以检查指定对象中是否存在默认的**函数类型迭代器**，而`for-of`循环在执行前也会做相似的检查。

### 内建迭代器

#### 集合对象迭代器

在 ES6 中有 3 种类型的集合对象， 数组、Map 集合与 Set 集合， 这 3 种对象都内奸了以下三种迭代器：

- entires() 返回一个迭代器， 其值为多个键值对
- values() 返回一个迭代器， 其值为集合的值
- keys() 返回一个迭代器， 其值为集合中的所有键名

#### 不同集合类型的默认迭代器

每个集合类型都有一个默认的迭代器， 在 for-of 循环中， 如果没有显示的置顶则使用默认的迭代器。数组和 Set 集合默认迭代器是`values()`方法， Map 集合默认迭代器是`entries()`方法。

#### NodeList 迭代器

DOM 标准中有一个 NodeList 类型， 代表页面文档中所有元素的集合。在 ES6 添加默认迭代器后，DOM 中定义的 NodeList 类型也拥有了默认迭代器， 其行为与数组的默认迭代器完全一致。 所以可以将 NodeList 应用于`for-of`循环级其他支持对象默认迭代器的地方。

```js
var divs = document.getElementsByTagName('div');

for (let div of divs) {
  console.log(div.id);
}
```

### iterator

在 ES6 中，有些数据结构原生具备`Iterator`接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历，
有些就不行（比如对象）。原因在于，这些数据结构原生部署了`Symbol.iterator`属性，另外一些数据结构没
有。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍
历器对象

#### 数组遍历

```js
let arr = ['hello', 'world'];
let map = arr[Symbol.iterator](); //数组内部自身实现的接口
console.log(map.next());
console.log(map.next());
console.log(map.next());
```

#### 对象自定义 iterator 接口

在对象内是没有部署`iterator`接口，`object`的数据是我们自己填充的，他不知道是什么数据，所以也不知道怎么去遍历。

数组是按照索引顺序来的

```js
let obj = {
  start: [1, 3, 2],
  end: [7, 9, 8],
  [Symbol.iterator]() {
    let self = this;
    let index = 0;
    let arr = self.start.concat(self.end);
    let len = arr.length;
    return {
      next() {
        if (index < len) {
          return {
            value: arr[index++],
            done: false
          };
        } else {
          return {
            value: arr[index++],
            done: true
          };
        }
      }
    };
  }
};
for (let key of obj) {
  console.log(key);
}
```

### Generator

#### 基本概念

`Generator`是异步编程的一种解决方案，早期有`promise`,`callback`。

基本用法：

```js
   let tell = function* (){
     yield 'a';
     yield 'b';
     return 'c';
   };

   let k = tell();

   console.log(k.next())
   console.log(k.next())
   console.log(k.next())
   console.log(k.next())
}
```

## JavaScript 中的类

### ES5 中的近类结构

在 ES5 及更早版本根本不存在类。与类更接近的是：创建一个构造器，然后将方法指派到该构造器的原型上。这种方式通常称为创建一个自定义类型。如下：

```js
function personType(name) {
  this.name = name;
}
personType.prototype.sayName = function() {
  console.log(this.name);
};
var person = new personType('Nicholas');
person.sayName();
console.log(person instanceof personType); //true
console.log(person instanceof Object); //true
```

以上代码中的`PersonType`是一个构造函数， 创建了一个`name`的属性，又在`PersonType`的原型上添加了`sayName()`方法， `PersonType`的所有实例都会共享这个方法。 然后使用了`new`操作符创建了一个实例， 并最终证实了它是`PersonType`的实例， 且由于存在原型继承的特性， 它也是`Object`的实例。

许多模拟累的 JavaScript 库都是基于这个模式来进行开发，ES6 的类也借鉴了类似的方法。

### 类的声明

#### 基本的类声明语法

要声明一个类，首先要便携`class`关键字， 其后是类的名称。剩余部分类似对象字面量中的方法简写， 并且方法之间不要有逗号。如下：

```js
class PersonClass {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}

let person = new PersonClass('Nicholas');
person.sayName(); //Nicholas
console.log(person instanceof PersonClass); //true
console.log(person instanceof Object); //true
console.log(typeof PersonClass); //function
console.log(typeof PersonClass.prototype.sayName); //function
```

这个`PersonClass`类声明类似于上个例子中的`personType`。类声明允许你在其中使用特殊的`constructor`方法名称直接定义一个构造器， 而不需要先定义一个函数再把它当做构造器使用。由于类的方法使用了简写方法， 于是就不在需要`function`关键字。`constructor`之外的名称则没有特别的含义， 你可以自由添加方法。

::: warning 注意
自有属性：该属性出现在实例上而不是在原型上，只能在类的构造器或方法内部进行构建。在本例中，`name`就是一个自有属性。建议在构造器函数内创建所有可能出现的自有属性，这样在类中声明变量就会限制在单一位置。
:::

#### 为何要使用类的语法

尽管类与自定义类型（构造器函数），但仍然要记住一些区别：

1. 类声明不会被提升，这与函数定义不同。类声明的行为与`let`类似，因此在程序的执行到达声明之前，类会暂时存在于暂时性时区内。
2. 类声明的所有代码自动运行在严格模式下， 并且无法退出严格模式。
3. 类的所有方法都是不可枚举的。这事对于自定义类型的显著变化， 后者必须用`Object.defineProperty()`才能将方法变为不可枚举。
4. 类的所有方法中内部都没有`[[constructor]]`， 因此使用`new`来调用它们会抛出错误。
5. 调用类构造器时不使用`new`，会抛出错误。
6. 试图在类的方法内部重写类名， 会抛出错误。

#### 基本的类表达式

类也有不需要标识符的表达式形式。类表达式被设计用于变量声明，或可作为参数传递给函数。

此处是上例中`PersonClass`等效的类表达式：

```js
let PersonClass = class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
};

let person = new PersonClass('Nicholas');
person.sayName(); //Nicholas
console.log(person instanceof PersonClass); //true
console.log(person instanceof Object); //true
console.log(typeof PersonClass); //function
console.log(typeof PersonClass.prototype.sayName); //function
```

:::tip
相对于函数声明与函数表达式之间的区别， 类声明与类表达式都不会被提升。对代码运行影响甚微。
:::

#### 具名类表达式

你也可以为类表达式命名。为此需要在`class`关键字后添加标识符，如下：

```js
let PersonClass = class PersonClass2 {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
};

console.log(typeof PersonClass); //function
console.log(typeof PersonClass2); //undefined
```

此例中的类表达式被命名为`PersonClass2`。`PersonClass2`标识符只在类定义内部存在， 因此只能用在类方法内部。（例如本例中的 s`sayName()`内）。在类的外部，`typeof PersonClass2`的结果为`undefined`, 这是因为外部不存在`PersonClass2`绑定。

具名类表达式与具名函数表达式有很多相似点。二者都能被当做值来使用。

#### 作为一级公民的类

在编程中， 能被当做值来使用的就称之为一级公民。意味着他能作为参数传给函数、能作为函数返回值、能用来给变量赋值。js 的函数就是一级公民（有时也被称为一级函数），此特性让 js 独一无二。

ES6 延续了传统， 让类同样成为一级公民。这就使得类可以被多种方式所使用。例如， 作为参数传递给函数。

```js
function createObject(classDef) {
  return new classDef();
}

let obj = createObject(
  class {
    sayHi() {
      console.log('Hi!');
    }
  }
);

obj.sayHi();
```

此例中`createObject()`函数被调用时接收了一个匿名表达式作为参数， 使用`new`创建了该类的一个实例，并将其返回出来。随后变量`obj`储存了返回的实例。

### 访问器属性

自有属性要在类构造器中创建，而类还允许你在原型上定义访问器属性。为了创建一个`getter`，要使用`get`关键字，并要与后方标识符之间留出空格； 创建`setter`用相同方式，只是要使用`set`关键字：

```js
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }
  set gtml(value) {
    return (this.element.innerHTML = value);
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype,
  'html'
);
console.log('get' in descriptor);
console.log('set' in descriptor);
console.log(descriptor.enumerable);
```

此代码中的`CustomHTMLElement`类用于包装一个已存在的 DOM 元素。它的属性`html`拥有`getter`与`setter`，委托了元素自身的`innerHTML`方法。 该访问器属性被创建在`CustomHTMLElement.prototype`上， 并且像其他属性被创建为不可枚举属性。

#### 静态成员

当你想让方法与访问器属性在对象实例上出现时，把它添加到类的原型上就会对此目的有帮助。而另一方面， 若想让方法与访问器属性只存在于类自身， 那么就需要使用静态成员。

ES6 静态成员的创建要在方法与访问器属性的名称前添加正式的`static`标注。

```js
class PersonClass {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
  static create(name) {
    return new PersonClass(name);
  }
}

let person = PersonClass.create('Nicholas');
```

`PersonClass`的定义拥有名为`create()`的单个静态方法， 此语法与`sayName()`基本相同， 只是多了一个`static`关键字。 你能在类的任何方法和访问器属性上使用`static`关键字， 唯一的限制是不能将它用于`constructor`方法的定义。

::: warning 警告
静态成员不能用实例来访问， 你始终需要直接用类自身来访问它们。
:::

### 继承

类让继承工作变得更轻易， 使用熟悉的`extends`关键字来制定当前类所需要继承的函数。你还可以调用`seper()`方法来访问基类的构造器。

```js
class Rectange {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
}

class Square extends Rectange {
  constructor(length) {
    super(length, length);
  }
}

var square = new Square(3);
console.log(square.getArea()); //9
console.log(square instanceof Square); //true
console.log(square instanceof Rectange); //true
```

在`square`类中使用了`extends`关键字继承了`Rectange`。`square`构造器使用了`super()`配合指定参数调用了`Rectange`构造器。

继承了其他类的类被称为派生类。 如果派生类指定了构造器，**就需要使用`super`**，否则会造成错误。 若你选择不使用构造器，`super()`方法会被自动调用，并会使用创建新实例时提供的所有参数。如下：

```js
class Square extends Rectange {}
// 等价于
class square extends Rectange {
  constructor(...args) {
    super(...args);
  }
}
```

此例中的第二个类展示了与所有派生类默认构造器等价的写法， 所有的参数都按顺序传递给了基类的构造器。 在当前需求下， 这种做法并不完全准确，因为`square`构造器只需要单个参数， 因此最好手动定义构造器。

:::tip
使用`super()`时要牢记以下几点：

1. 你只能在派生类中使用`super()`。若尝试在非派生的类（即：没有使用`extends`关键字的类）或函数中使用它，会抛出错误。
2. 在构造器中， 你必须在访问`this`之前调用`super()`。由于`super()`负责初始化`this`，因此试图先访问`this`自然会抛出错误。
3. 唯一能避免调用`super()`的方法， 是从类构造器中返回一个对象。

:::

### 在类构造器中使用 new.target

在类构造器中也可以使用`new.target`，可以用来判断类是如何被调用的。 在简单情况下， `new.target`就等于本类的构造器函数， 如下：

```js
class Rectange {
  constructor(length, width) {
    console.log(new.target === Rectange); //true
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectange(3, 4);
```

此代码说明在`new Rectange(3,4)`被调用时， `new.target`就等于`Rectangle`。类构造器被调用时不能缺少`new`， 因此`new.target`属性就始终会在类构造器内被定义。 不过这个值并不是相同的， 如下：

```js
    constructor(length,width){
        console.log(new.target === Rectange)//false
        this.length = length
        this.width = width
    }

}

class Square extends Rectange{
    constructor(length){
        super(length,length)
    }
}

var obj = new Square(3)
```

`super`调用了`Rectangle`构造器， 因此当`Rectangle`构造器被调用时， `new.target`等于`Square`。这很重要， 因为构造器能够根据如何被调用而有不同行为， 并且这给了更改这种行为的能力。例如， 你可以使用`new.target`来创建一个抽象基类（一种不能实例化的类），如下：

```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('This class cannot be instantiated directly');
    }
  }
}

class Rectange extends Shape {
  constructor(length, width) {
    super();
    this.length = length;
    this.width = width;
  }
}

// var x= new Shape()//抛出错误
var y = new Rectange(3, 4); //没有错误
console.log(y instanceof Shape); //true
```

此例中的`shape`类构造器会在`new.target`为`shape`的时候抛出错误， 意味着`new Shape()`永远会抛出错误。 然而， 你依然可以将`shape`用作一个基类， 正如`Rectangle`所做的那样。 `super()`的调用执行了`shape`构造器， 而且`new target`的值等于`Rectangle`， 因此该构造器能够无错误的继续执行。

:::tip
由于调用类是不能缺少`new`， 于是`new target`属性在类构造器内部据不会是`undefined`。
:::

### Decorator

定义： 是一个函数修改类的行为。

修饰器作用：

1. 是一个函数，
2. 修改类的行为，
3. 修改类本身的功能。 （只在类中能使用）

#### 第三方库修饰器的 js 库：

core-decorators; npm install core-decorators

#### 使用

修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第
三个参数是该属性的描述对象。

```js
let readonly = function(target, name, descriptor) {
  target.test = 1;
  descriptor.writable = false; //不允许修改
  return descriptor;
};

class Test {
  @readonly
  time() {
    return '2017-03-11';
  }
}

// test.time=function(){
//   console.log('reset time');
// };

let test = new Test();
console.log(test.time(), test.test);
```

只能在 class 前增加修饰器

```js
let typename = function(target, name, descriptor) {
  target.myname = 'hello';
};

@typename
class Test {}

console.log('类修饰符', Test.myname);
```

### 用 Decorators 修饰器做前端埋点

```js
let log = type => {
  return function(target, name, descriptor) {
    let src_method = descriptor.value;
    descriptor.value = (...arg) => {
      src_method.apply(target, arg);
      console.info(`log ${type}`);
    };
  };
};

class AD {
  @log('show')
  show() {
    console.info('ad is show');
  }
  @log('click')
  click() {
    console.info('ad is click');
  }
}

let ad = new AD();
ad.show();
ad.click();
```

### 总结

ES6 的类起初是作为 ES5 传统继承模型的语法糖， 但添加了许多特性来减少错误。

ES6 的类配合原型继承工作， 在类的原型上定义了非静态的方法， 而静态方法被绑定在类构造器自身上。 类的所有方法初始是不可枚举的， 这更契合了内置对象的行为， 后者的方法默认情况下通常是不可枚举的。 此外， 类构造器被调用时不能缺少`new`， 确保了不能意外的将类作为函数使用。

基于类的继承允许你从另一个类、函数、表达式上派生新的类。这种能力意味着你可以调用一个函数来判断需要继承的正确基类， 也允许使用混入或其它不同组合模式来创建一个新类。新的继承方式让继承内置对象（例如数组）也变为可能， 并且其工作符合预期。

你可以在类构造器内部使用`new.target`，以便根据类如何被调用来做出不同的行为。 最常用的就是创建一个抽象基类， 直接实例化它会抛出错误， 但他仍然允许被其他类所继承。

总之， 类是 js 的一项新特性， 他提供了更简洁的语法与更好的功能， 通过安全一致的方式来自定义一个对象类型。

## 改进的数组功能

### 创建数组

为了数组更易创建，ES6 新增了`Array.of()`与`Array.from()`方法。

#### Array.of()方法

该方法类似于`Array`构造器， 它在使用单个数值参数不会导致特殊的结果。 `Array.of()`方法总会创建一个包含所有传入参数的数组， 而不管传入的参数数量与类型。 如下：

```js
let items = Array.of(1, 2);
console.log(items.length); //2
console.log(items[0]); //1
console.log(items[1]); //2

items = Array.of(2);
console.log(items.length); //1
console.log(items[0]); //2

items = Array.of('2');
console.log(items.length); //1
console.log(items[0]); //"2"
```

通常我们都可以使用数组字面量的写法代替`Array.of()`，但若想向函数传递参数， 使用`Array.of()`而非`Array`构造器函数能够确保行为一致。例如：

```js
function createArray(arratCreate, value) {
  return arratCreate(value);
}

let items = createArray(Array.of(), value);
```

此代码中`createArray`函数接受两个参数： 一个数组创建器与一个值， 并将后者插入到目标数组中。 你应当向`createArray()`函数传递`Array.of()`作为第一个参数来创建新数组。相反传递`Array`构造器则会有危险， 因为无法保证第二个参数不是数值类型。

#### Arrat.from()方法

在 JS 中将非数组对象转换为数组非常麻烦。ES6 新增了`Array.form()`方法来提供一种明确清晰的方式来解决这方面需求。

将可迭代的对象或者类数组对象作为第一个参数传入， `Array.form()`就能返回一个数组。

##### 映射转换

你也可以想`Array.from()`方法传递一个映射用的函数作为第二个参数。 此函数会将类数组对象的每一个值转换为目标形式， 并将其存储在目标数组的对应位置上。如下：

```js
function translate() {
  return Array.from(argumenrs, value => value + 1);
}
let numbers = translate(1, 2, 3);
console.log(numbers); //2,3,4
```

此代码将`(value)=>value+1`作为映射函数传递给了`Array.from()`方法， 对每个项进行了一次`+1`处理。如果映射函数需要在对象上工作， 你可以手动传递第三个参数给`Array.from()`方法， 从而指定映射函数内部的`this`值。

```js
let helper = {
  diff: 1,
  add(value) {
    return value + this.diff;
  }
};

function translate() {
  return Array.form(arguments, helper.add, helper);
}
let numbers = translate(1, 2, 3);
console.log(numbers);
```

##### 在可迭代对象上使用

### 所有数组上的新方法

#### find()与 findIndex()方法

`find()`与`findIndex()`方法接收两个参数，一个回调函数、一个可选值（用于指定回调函数内部的`this`）。该回调函数接收三个参数：数组的某个元素、该元素对应的索引位置、以及数组本身， 这与`map`与`forEach`方法的回调函数所有的参数一致。该回调函数在给定元素定义的条件满足时返回`true`，而`find()`与`findIndex()`方法会在回调函数第一次返回`true`时停止查找。

二者唯一区别：`find`返回值， `findIndex`返回索引。

```js
let numbers = [23, 30, 35, 40, 45];
console.log(numbers.find(n => n > 33)); //35
console.log(numbers.findIndex(N => N > 33)); //2
```

`find`与`findIndex`方法在查找满足特定条件的数组元素非常有用。但若想查找特定的值， 则使用`indexOf()`与`lastIndexOf()`方法会是更好选择。

### 类型化数组

#### 数值数据类型

#### 数组缓冲区

#### 使用视图操作数组缓冲区

##### 获取视图信息

##### 读取或写入数据

##### 类型化数组即为视图

##### 创建特定类型视图

### 类型化数组与常规数组的相似点

#### 公共方法

#### 相同的迭代器

#### of()与 from()方法

### 类型化数组与常规数组区别

#### 行为差异

#### 遗漏的方法

#### 附加的方法

### 总结

## Promise 与异步编程

### 异步编程背景

JS 引擎建立在单线程时间循环的概念上。 单线程意味着同一时刻只能执行一段代码，与 JAVA 和 C++这种允许同时执行多段不同的代码的多线程语言形成了反差。多段代码可以同时访问或修改状态，维护并保护这些状态就变成了难题， 这也是基于多线程软件出现的`bug`常见根源之一。

### Promise 基础

Promise 是为异步操作的结果所准备的占位符。函数可以返回一个 Promise, 而不必订阅一个事件或向函数传递一个回调参数。

#### Promise 生命周期

每个 Promise 都有一个短暂的生命周期， 初始为挂起状态（pending）, 表示异步操作尚未结束。一旦异步操作结束， Promise 就会被认为是已决的， 并进入以下两种状态：

1. 已完成（fulfilled）
2. 已拒绝（rejected）

可以通过`then()`方法在 Promise 状态改变时执行一些特定操作。

`then`方法接受两个参数， 第一个参数是`Promise`成功时要调用的函数， 与异步操作相关联的任何附加数据都会被传入这个完成函数。第二个参数则是`Promise`被拒绝时要调用的函数， 与完成函数类似， 拒绝函数会传入与拒绝相关联的任何附加数据。

### 创建已决的 Promise

#### Promise.resolve()

`Promise.resolve()`方法接受单个参数并返回一个处于完成态的 Promise。

```js
let promise = Promise.resolve(42);

promise.then(values => {
  console.log(values); //42
});
```

### 在 Promise 链中返回值

Promise 链的另一重要方面是从一个 Promise 传递数据给下一个 Promise 的能力。传递给执行器中的`resolve()`处理函数的参数，会被传递给对应 Promise 的完成处理函数。你可以指定完成处理函数的返回值， 以便沿着一个链继续传递数据。如：

```js
let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});

p1.then(function(value) {
  console.log(value); //42
  return value + 1;
}).then(function(value) {
  console.log(value); //43
});
```

`p1`的完成处理函数在被执行时返回了`value+1`。由于`value`的值为 42(来自执行器)，此完成处理函数就返回了`43`。这个值随后被传递给第二个 Promise 的完成处理函数， 并被其输出到控制台。

#### 在 Promise 链中返回 Promise

从完成或拒绝处理函数中返回一个基本类型值， 能够在 Promise 之间传递数据， 但若返回一个对象呢？ 若该对象是一个 Promise 该怎么处理呢？ 请研究以下例子：

```js
let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
p1.then(function(value) {
  console.log(value); // 42
  // 创建一个新的 promise
  let p2 = new Promise(function(resolve, reject) {
    resolve(43);
  });
  return p2;
}).then(function(value) {
  console.log(value); // 43
});
```

在此例中，一个新的 Promise 在 p1 的完成处理函数中被创建。这意味着直到 p2 被完成之后，第二个完成处理函数才会执行。**若你想等待前面的 Promise 被解决，之后才去触发另一个 Promise ，那么这种模式就非常有用。**

### 响应多个 Promise

本章至今的每个例子在同一时刻都只响应一个 Promise 。然而有时你会想监视多个 Promise 的进程，以便决定下一步行动。 ES6 提供了能监视多个 Promise 的两个方法：Promise.all() 与 Promise.race() 。

#### Promise.all() 方法

Promise.all() 方法接收单个可迭代对象（如数组）作为参数，并返回一个 Promise 。这个可迭代对象的元素都是 Promise ，只有在它们都完成后，所返回的 Promise 才会被完成。例如：

```js
let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
  resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
  resolve(44);
});
let p4 = Promise.all([p1, p2, p3]);
p4.then(function(value) {
  console.log(Array.isArray(value)); // true
  console.log(value[0]); // 42
  console.log(value[1]); // 43
  console.log(value[2]); // 44
});
```

此例中只有`p1,p2,p3`全部执行完毕后才会执行`p4`，若传递给 Promise.all() 的任意 Promise 被拒绝了，那么方法所返回的 Promise 就会立刻被拒绝，而不必等待其他的 Promise 结束。

#### Promise.race() 方法

Promise.race() 提供了监视多个 Promise 的一个稍微不同的方法。此方法也接受一个包含需监视的 Promise 的可迭代对象，并返回一个新的 Promise ，但一旦来源 Promise 中有一个被解决，所返回的 Promise 就会立刻被解决。与等待所有 Promise 完成的 Promise.all() 方法不同，在来源 Promise 中任意一个被完成时， Promise.race() 方法所返回的 Promise 就能作出响应。例如：

```js
let p1 = Promise.resolve(42);
let p2 = new Promise(function(resolve, reject) {
  resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
  resolve(44);
});
let p4 = Promise.race([p1, p2, p3]);
p4.then(function(value) {
  console.log(value); // 42
});
```

在此代码中， `p1` 被创建为一个已完成的 Promise ，而其他的 Promise 则需要调度作业。p4 的完成处理函数被使用数值 42 进行了调用，并忽略了其他的 Promise 。传递给`Promise.race()` 的 Promise 确实在进行赛跑，看哪一个首先被解决。若胜出的 Promise 是被完成，则返回的新 Promise 也会被完成；而胜出的 Promise 若是被拒绝，则新 Promise 也会被拒绝。此处有个使用拒绝的范例：

```js
let p1 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve(42);
  }, 1000);
});
let p2 = Promise.reject(43);
let p3 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve(44);
  }, 1000);
});
let p4 = Promise.race([p1, p2, p3]);
p4.catch(function(value) {
  console.log(value); // 42
});
```

### 未来的异步任务运行

在我写这本书的时候，针对 JS 中的异步任务运行，为之引入简单语法的一项工作正在进行。此工作开展在 await 语法上，极度借鉴了上述以 Promise 为基础的例子。其基本理念是使用一个被 async 标记的函数（而非生成器），并在调用另一个函数时使用 await 而非 yield ，就像这样：

```js
(async function() {
  let contents = await readFile('config.json');
  doSomethingWith(contents);
  console.log('Done');
});
```

在 function 之前的 async 关键字标明了此函数使用异步方式运行。 await 关键字则表示对于 readFile("config.json") 的函数调用应返回一个 Promise ，若返回类型不对，则会将其包装为 Promise 。与上述 run() 的实现一致， await 会在 Promise 被拒绝的情况下抛出错误，否则它将返回该 Promise 被决议的值。最终结果是你可以将异步代码当作同步代码来书写，而无须为管理基于迭代器的状态机而付出额外开销。await 语法预计将在 ES2017 （即 ES8 ）中被最终敲定。（译注：已被纳入 ES8 ）

### 总结

Promise 被设计用于改善 JS 中的异步编程，与事件及回调函数对比，在异步操作方面为你提供了更多的控制权与组合性。 Promise 调度被添加到 JS 引擎作业队列，以便稍后执行。不过此处有另一个作业队列追踪着 Promise 的完成与拒绝处理函数，以确保适当的执行。Promise 具有三种状态：挂起、已完成、已拒绝。一个 Promise 起始于挂起态，并在成功时转为完成态，或在失败时转为拒绝态。在这两种情况下，处理函数都能被添加以表明 Promise 何时被解决。 then() 方法允许你绑定完成处理函数与拒绝处理函数，而 catch(方法则只允许你绑定拒绝处理函数。你能用多种方式将多个 Promise 串联在一起，并在它们之间传递信息。每个对 then() 的调用都创建并返回了一个新的 Promise ，在前一个 Promise 被决议时，新 Promise 也会被决议。 Promise 链可被用于触发对一系列异步事件的响应。你还能使用 Promise.race() 与 Promise.all() 来监视多个 Promise 的进程，并进行相应的响应。组合使用生成器与 Promise 会让异步任务运行得更容易，这是由于 Promise 提供了异步操作可返回的一个通用接口。这样你就能使用生成器与 yield 运算符来等待异步响应，并作出适多数新的 web API 都基于 Promise 创建，并且你可以期待未来会有更多的效仿之作。当的应答。

## 代理(Proxy)和反射(Reflection)API

## Proxy 与 Reflect

Proxy 可以实现对一个对象的代理，在内部拥有 set 和 get 方法，可以实现一些自定义操作。
Proxy 代理/拦截

- 拦截读取: get (target, key)
- 拦截设置：set (target, key, value, proxy)
- 拦截查找: has (target, key) // 拦截 key in obj 操作
- 拦截删除:deleteProperty (target, key)
- 拦截遍历: ownKeys(target) // 拦截 Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames

```js
//原始对象对象
let obj = {
  time: '2019-05-19',
  name: 'net',
  _r: 123
};

//代理
let monitor = new Proxy(obj, {
  //拦截对象属性读取
  get(target, key) {
    return target[key].replace('2019', '2020');
  },
  //拦截对象设置属性
  set(target, key, value) {
    //key值只有是name时才允许修改
    if (key === 'name') {
      return (target[key] = value);
    } else {
      return target[key];
    }
  },
  //拦截key in object
  has(target, key) {
    //key值只有name时才可以返回值
    if (key === 'name') {
      return target[key];
    } else {
      return false;
    }
  },
  //拦截delete
  deleteProperty(target, key) {
    //key值有_才可以删除
    if (key.indexOf('_') > -1) {
      delete target[key];
      return true;
    } else {
      return target[key];
    }
  },
  // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
  ownKeys(target) {
    return Object.keys(target).filter(item => item != 'time');
  }
});

//用户只操作monitor
console.log('get', monitor.time); //2020-05-19

monitor._r = '39';
console.log('set', monitor); //123
monitor.name = '666';
console.log('set', monitor.name); //666

console.info('has', 'name' in monitor, 'time' in monitor); //true false

delete monitor.name;
delete monitor.time;
delete monitor._r;
console.log('delete', monitor); //只删除了_r

console.log('ownKeys', Object.keys(monitor)); //只得到了name和_r  time被保护起来了
```

### Reflect

映射 和`Proxy`的用法一样有读取`get`、设置`set`、`delete`删除、遍历

```js
let obj = {
  name: 'net'
};
console.log('Reflect get', Reflect.get(obj, 'name')); //net
Reflect.set(obj, 'name', 'mukewang');
console.log(obj.name); //mukewang
console.log('has', Reflect.has(obj, 'name')); //true
```

## 用模块封装代码

JS “共享一切”的代码加载方式是该语言混乱且最易出错的方面之一。其他语言使用包（package ）之类的概念来定义代码的作用域，然而在 ES6 之前，一个应用的每个 JS 文件所定义的所有内容都由全局作用域共享。当 web 应用变得更加复杂、需要使用越来越多的 JS 代码时，这种方式导致了诸多问题，例如命名冲突、安全问题等。 ES6 的设计目标之一就是要解决作用域问题，并让 JS 应用变得更有条理。这便是模块的切入点。

### 何为模块？

模块（ Modules ）是使用不同方式加载的 JS 文件（与 JS 原先的脚本加载方式相对）。这
种不同模式很有必要，因为它与脚本（ script ）有大大不同的语义：

1. 模块代码自动运行在严格模式下，并且没有任何办法跳出严格模式；
2. 在模块的顶级作用域创建的变量，不会被自动添加到共享的全局作用域，它们只会在模
   块顶级作用域的内部存在；
3. 模块顶级作用域的 `this` 值为 `undefined` ；
4. 模块不允许在代码中使用 HTML 风格的注释（这是 JS 来自于早期浏览器的历史遗留特性）；
5. 对于需要让模块外部代码访问的内容，模块必须导出它们；
6. 允许模块从其他模块导入绑定。

这些差异乍一看似乎很小，但它们代表了 JS 代码加载与执行方面的显著改变，我将在整章中对其进行论述。模块的真实力量是按需导出与导入代码的能力，而不用将所有内容放在同一个文件内。对于导出与导入的清楚理解，是辨别模块与脚本差异的基础。

### 基本的导出

```js
// 导出数据
export var color = 'red';
export let name = 'Nicholas';
export const magicNumber = 7;
// 导出函数
export function sum(num1, num2) {
  return num1 + num1;
}
// 导出类
export class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
}
// 此函数为模块私有
function subtract(num1, num2) {
  return num1 - num2;
}
// 定义一个函数……
function multiply(num1, num2) {
  return num1 * num2;
}
// ……稍后将其导出
export { multiply };
```

### 基本的导入

```js
import { identifier1, identifier2 } from './example.js';
```

当从模块导入了一个绑定时，该绑定表现得就像使用了 `const` 的定义。这意味着你不能再定义另一个同名变量（包括导入另一个同名绑定），也不能在对应的 `import`语句之前使用此

### 完全导入一个模块

```js
// 完全导入
import * as example from './example.js';
console.log(example.sum(1, example.magicNumber)); // 8
console.log(example.multiply(1, 2)); // 2
```

在此代码中， `example.js` 中所有导出的绑定都被加载到一个名为 `example` 的对象中，具名导出（ `sum()` 函数、 `multiple()` 函数与 `magicNumber` ）都成为 `example` 的可用属性。这种导入格式被称为命名空间导入（ namespace import ），这是因为该 `example` 对象并不存在于 `example.js` 文件中，而是作为一个命名空间对象被创建使用，其中包含了`example.js` 的所有导出成员。

然而要记住，无论你对同一个模块使用了多少次 `import` 语句，该模块都只会被执行一次。在导出模块的代码执行之后，已被实例化的模块就被保留在内存中，并随时都能被其他`import` 所引用。

```js
import { sum } from './example.js';
import { multiply } from './example.js';
import { magicNumber } from './example.js';
```

尽管此处的模块使用了三个 `import` 语句，但 `example.js` 只会被执行一次。若同一个应用中的其他模块打算从`example.js`导入绑定，则那些模块都会使用这段代码中所用的同一个模块实例。

### 导入绑定的一个微妙怪异点

ES6 的 `import` 语句为变量、函数与类创建了只读绑定，而不像普通变量那样简单引用了原始绑定。尽管导入绑定的模块无法修改绑定的值，但负责导出的模块却能做到这一点。例如，假设你想要使用以下模块：

```js
export var name = 'Nicholas';
export function setName(newName) {
  name = newName;
}
```

当你导入了这两个绑定后， `setName()` 函数还可以改变 `name` 的值：

```js
import { name, setName } from './example.js';
console.log(name); // "Nicholas"
setName('Greg');
console.log(name); // "Greg"
name = 'Nicholas'; // error
```

调用 `setName("Greg")`会回到导出 `setName()` 的模块内部，并在那里执行，从而将 `name` 设置为 `"Greg"` 。注意这个变化会自动反映到所导入的 `name` 绑定上，这是因为绑定的 `name`是导出的 `name` 标识符的本地名称，二者并非同一个事物。

### 导出默认值

以下是使用 `default` 关键字的一个简单例子：

```js
export default function(num1, num2) {
  return num1 + num2;
}
```

此模块将一个函数作为默认值进行了导出， `default` 关键字标明了这是一个默认导出。此函数并不需要有名称，因为它就代表这个模块自身。你也能在 `export default` 后面放置一个标识符，以指定默认的导出，正如：

```js
function sum(num1, num2) {
  return num1 + num2;
}
export default sum;
```

此处 `sum()`函数先被定义了，随后它作为模块的默认值被导出。若默认值需要计算才能得出，你或许会选择这种方式。

```js
function sum(num1, num2) {
  return num1 + num2;
}
export { sum as default };
```

`default` 标识符有特别含义，既作为重命名导出，又标明了模块需要使用的默认值。由于`default` 在 JS 中是一个关键字，它就不能被用作变量、函数或类的名称（但它可以被用作属性名称）。因此使用 `default` 来重命名一个导出是个特例，与非默认导出的语法保持了一致性。若你想用单个语句一次性进行多个导出，并要求包含默认导出，这种语法就非常有用。

### 导入默认值

你可以使用如下语法来从一个模块中导入默认值：

```js
// 导入默认值
import sum from './example.js';
console.log(sum(1, 2)); // 3
```

这个导入语句从 `example.js` 模块导入了其默认值。注意此处并未使用花括号，与之前在非默认的导入中看到的不同。本地名称 `sum` 被用于代表目标模块所默认导出的函数。这种语法是最简洁的，而 ES6 的标准制定者也期待它成为在网络上进行导入的主要形式，这样你就能导入已存在的对象。对于既导出了默认值、又导出了一个或更多非默认的绑定的模块，你可以使用单个语句来导入它的所有导出绑定。例如，假设你有这么一个模块：

```js
export let color = 'red';
export default function(num1, num2) {
  return num1 + num2;
}
```

你可以像下面这样使用 `import` 语句，来同时导入`color` 以及作为默认值的函数：

```js
import sum, { color } from './example.js';
console.log(sum(1, 2)); // 3
console.log(color); // "red"
```

逗号将默认的本地名称与非默认的名称分隔开，后者仍旧被花括号所包裹。要记住在 `import`语句中默认名称必须位于非默认名称之前。

如同导出默认值，你也能使用重命名语法进行默认值的导入：

```js
// 等价于上个例子
import { default as sum, color } from 'example';
console.log(sum(1, 2)); // 3
console.log(color); // "red"
```

在此代码中，默认的导出`（ default ）`被重命名为 `sum` ，并且附加的 `color` 导出也被一并导入了。此例与前面的例子是等效的。

### 绑定的再导出

也许有时你会想将当前模块已导入的内容重新再导出（例如，假设要用几个小模块来创建一个库）。你能使用本章已描述过的模式来将已导入的值再导出，就像这样:

```js
import { sum } from './example.js';
export { sum };
```

此方法能奏效，但还可以使用单个语句来完成相同任务：

```js
export { sum } from './example.js';
```

此处，从 `"./example.js"` 导入的 `sum` 随后以 `add` 的名称被导出了。若你想将来自另一个模块的所有值完全导出，可以使用星号（ \* ）模式：

```js
export * from './example.js';
```

使用完全导出，就可以导出目标模块的默认值及其所有具名导出，但这可能影响你从当前模块所能导出的值。例如，假设 `example.js` 具有一个默认导出，当你使用这种语法时，你就无法为当前模块另外再定义一个默认导出。

### 无绑定的导入

有些模块也许没有进行任何导出，相反只是修改全局作用域的对象。尽管这种模块的顶级变量、函数或类最终并不会自动被加入全局作用域，但这并不意味着该模块无法访问全局作用域。诸如 Array 与 Object 之类的内置对象的共享定义在模块内部是可访问的，并且对于这些对象的修改会反映到其他模块中。例如，若你想为所有数组添加一个`pushAll()` 方法，你可以像下面这样定义一个模块：

```js
// 没有导出与导入的模块
Array.prototype.pushAll = function(items) {
  // items 必须是一个数组
  if (!Array.isArray(items)) {
    throw new TypeError('Argument must be an array.');
  }
  // 使用内置的 push() 与扩展运算符
  return this.push(...items);
};
```

这是一个有效的模块，尽管此处没有任何导出与导入。此代码可以作为模块或脚本来使用。由于它没有导出任何东西，你可以使用简化的导入语法来执行此模块的代码，而无须导入任何绑定：

```js
import './example.js';
let colors = ['red', 'green', 'blue'];
let items = [];
items.pushAll(colors);
```

此代码导入并执行了包含 `pushAll()` 的模块，于是 `pushAll()` 就被添加到数组的原型上。这意味着现在 `pushAll()` 在当前模块内的所有数组上都可用。

无绑定的导入最有可能被用于创建`polyfill` 与 `shim` （为新语法在旧环境中运行提供向下兼容的两种方式）。

### 最佳实践

#### 导出

```js
let A = 123;
let test = function() {
  console.log('test');
};
class Hello {
  test() {
    console.log('class');
  }
}

export default {
  A,
  test,
  Hello
};
```

#### 导入

```js
import obj from './class/module.js';

console.log(obj.A);
```

### 总结

ES6 为 JS 语言添加了模块，作为打包与封装功能的方式。模块的行为异于脚本，它们不会用自身顶级作用域的变量、函数或类去修改全局作用域，而模块的 `this` 值为 `undefined` 。为了实现这些行为，模块在被加载时使用了一种不同的方式。

你必须将模块中需要向外提供的任何功能都导出，变量、函数与类都可以，并且每个模块允许存在一个默认导出。在导出之后，另一个模块就能导入该模块所导的一个或多个名称了。这些导入的名称就像是被 `let` 所定义的，会被当作块级绑定，并且不允在同一模块内重复声明。

如果模块只是要在全局作用域上进行操纵，那么无须导出任何绑定。你实际上可以导入这样一个模块，而不会在当前模块作用域中引入任何绑定。

## 附录 A

## 附录 B
