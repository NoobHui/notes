# 课程介绍 

nodejs6天

+ 第1-3天：es6语法、nodejs常用api，npm包管理工具，模块化，hackerNews增删改查的效果1.0

+ 第4天：express，hackerNews2.0

+ 第5天：数据库mongodb （非关系型数据 ）, HackerNews3.0

+ 第6天：nodejs写接口，前后端分离, HackerNews4.0 

  apach  php     node   js做后台开发 

# 浏览器的工作原理

## 浏览器的组成

![浏览器的组成](imgs/How-browsers-work1.png)

- 用户界面－ 包括地址栏、后退/前进按钮、书签目录等，也就是你所看到的除了用来显示你所请求页面的主窗口之外的其他部分
- 浏览器引擎－ 用来查询及操作渲染引擎的接口
- 渲染引擎（浏览器内核）－ 用来显示请求的内容，例如，如果请求内容为html，它负责解析html及css，并将解析后的结果显示出来
- 网络－ 用来完成网络调用，例如http请求，它具有平台无关的接口，可以在不同平台上工作
- UI 后端－ 用来绘制类似组合选择框及对话框等基本组件，具有不特定于某个平台的通用接口，底层使用操作系统的用户接口
- JS解释器－ 用来解释执行JS代码
- 数据存储－ 属于持久层，浏览器需要在硬盘中保存类似cookie的各种数据，HTML5定义了Storage技术，这是一种轻量级完整的客户端存储技术

## 主流的渲染引擎

> 浏览器的渲染引擎也叫排版引擎，或者是**浏览器内核**

主流的 渲染引擎 有

- **Chrome浏览器**: Blink引擎（WebKit的一个分支）。
- **Safari浏览器**: WebKit引擎，windows版本2008年3月18日推出正式版，但苹果已于2012年7月25日停止开发Windows版的Safari。
- **FireFox浏览器**: Gecko引擎。
- **Opera浏览器**: Blink引擎(早期版使用Presto引擎）。
- **Internet Explorer浏览器**: Trident引擎 。
- **Microsoft Edge浏览器**: EdgeHTML引擎（Trident的一个分支）。

## 渲染引擎工作原理

渲染引擎解析的基本流程：

```
1. 解析HTML构建Dom树，DOM 是W3C组织推荐的处理可扩展置标语言的标准编程接口。
2. 构建渲染树，渲染树并不等同于Dom树，因为像`head`标签 或 `display: none`这样的元素就没有必要放到渲染树中了，但是它们在Dom树中。
3. 对渲染树进行布局，定位坐标和大小、确定是否换行、确定position、overflow、z-index等等，这个过程叫`layout` 或 `reflow`。
4. 绘制渲染树，调用操作系统底层API(UI Backend)进行绘图操作。
```

![](imgs/flow.png)



**webkit内核工作流程**

![](imgs/webkitflow.png)

**gecko内核工作流程**

![](imgs/gecko.jpg)



结论：浏览器能够解析HTML文件，并且显示到页面中。所以我们写的文件能够使用浏览器打开并且能够看到效果。

## 性能优化：重绘与回流（重排）

> 回流（reflow）与重绘（repaint），在性能优化的时候，经常会提起，因为涉及到浏览器底层的渲染，所以掌握的童鞋并不多，但是面试经常被提及。

`回流(reflow)`:当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。

`重绘(repaint)`：当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。

1. 每个页面至少需要一次回流+重绘。
2. 回流必将引起重绘

回流什么时候发生？

1、添加或者删除可见的DOM元素；

2、元素位置改变；

3、元素尺寸改变——边距、填充、边框、宽度和高度

4、内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；

5、页面渲染初始化；

6、浏览器窗口尺寸改变——resize事件发生时；



```js
var s = document.body.style;
s.padding = "2px"; // 回流+重绘
s.border = "1px solid red"; // 再一次 回流+重绘
s.color = "blue"; // 再一次重绘
s.backgroundColor = "#ccc"; // 再一次 重绘
s.fontSize = "14px"; // 再一次 回流+重绘
// 添加node，再一次 回流+重绘
document.body.appendChild(document.createTextNode('abc!'));
```

+ 如何性能优化? 尽量减少重绘与回流的次数
  + 直接使用className修改样式，少用style设置样式

  + 让要操作的元素进行”离线处理”，处理完后一起更新 
    + 使用DocumentFragment进行缓存操作,引发一次回流和重绘
    + 使用display:none技术，只引发两次回流和重绘;

  + 将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素为动画的 HTML 元素，例如动画，那么修改他们的 CSS 是会大大减小 reflow 。

  + **完成功能是前提，在完成功能的情况下想着优化代码**

```javascript
	var pNode,fragment = document.createDocumentFragment(); 
    //动态创建20个p标签，先用DocumentFragment 对象来缓存     
    for(var i=0; i<20; i++){
        pNode = document.createElement('p');
        pNode.innerHTML = i;
        fragment.appendChild(pNode);        
    }
    document.body.appendChild(fragment);
```

## 浏览器与服务器的交互流程

1. 浏览器通过地址栏发出**请求**
2. 通过DNS服务器解析，得到域名对应的ip地址
3. 根据ip地址，访问服务器具体的某个文件
4. 服务器响应这个具体的文件
5. 浏览器获取响应，进行显示

![](imgs/ip-dns.png)

问题1：我们写的html页面，存放在哪儿？

问题2：我们写的html页面，在哪里解析的（显示）？

前端开发：以浏览器为宿主环境，结合 HTML、CSS、Javascript等技术，而进行的一系列开发，通常称之为**前端开发**。

服务器端开发：HTTP服务器可以结合某一编程语言处理业务逻辑，由此进行的开发，通常称之为**服务端开发**。 

**nodejs：服务端的javascript开发，用于开发服务端程序的**

动态网页：  网页的数据是动态生成的   数据在‘动’ 



# nodejs基本概念

## 为什么要学习nodejs

为什么要学习服务端的开发？

1. 通过学习Node.js开发理解**服务器开发**、**Web请求和响应过程**、 **了解服务器端如何与客户端配合**
2. 作为前端开发工程师（FE）需要具备一定的服务端开发能力
   + 了解什么是服务端渲染？
   + 了解服务端如何编写接口？
3. 全栈工程师的必经之路

服务器端开发语言有很多，为什么要选择nodejs

1. 降低编程语言切换的成本(nodejs实质上用的还是javascript)
2. NodeJS是前端项目的基础设施，前端项目中用到的大量工具，都是基于nodejs实现的
3. nodejs在处理高并发上有得天独厚的优势
4. **对于前端工程师，面试时对于nodejs有一定的要求**  

参考资料：  

[Node.js 究竟是什么？](https://www.ibm.com/developerworks/cn/opensource/os-nodejs/)

[为什么要用 Node.js](http://blog.jobbole.com/100058/)

## node.js 是什么？

node.js，也叫作node，或者nodejs，指的都是一个东西。

1. [node.js官方网站](https://nodejs.org/)
2. [node.js中文网](http://nodejs.cn/)
3. [node.js 中文社区](https://cnodejs.org/)

Node.js是一个Javascript运行环境(runtime environment)，发布于2009年5月，由Ryan Dahl开发，实质是对Chrome V8引擎进行了封装。Node.js对一些特殊用例进行优化，提供替代的API，使得V8在非浏览器环境下运行得更好。 

+ Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 

```
1. nodejs不是一门新的编程语言，nodejs是在服务端运行javascript的运行环境
2. 运行环境：写得程序想要运行必须要有对应的运行环境
	php代码必须要有apache服务器
	在web端，浏览器就是javascript的运行环境
	在node端，nodejs就是javascript的运行环境
2. javascript并不只是能运行在浏览器端，浏览器端能够运行js是因为浏览器有js解析器，因此只需要有js解析器，任何软件都可以运行js。
3. nodejs可以在服务端运行js，因为nodejs是基于chrome v8的js引擎。
```

+ Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。  
+ Node.js 的包管理器 npm，是全球最大的开源库生态系统。 

**nodejs的本质：不是一门新的编程语言，nodejs是javascript运行在服务端的运行环境，编程语言还是javascript**

## nodejs与浏览器的区别

相同点：nodejs与浏览器都是浏览器的运行环境，都能够解析js程序。对于ECMAScript语法来说，在nodejs和浏览器中都能运行。

不同点：nodejs无法使用DOM和BOM的操作，浏览器无法执行nodejs中的文件操作等功能

![](./imgs/nodejs.png)

思考：

1. 在浏览器端，可以使用javascript操作数据库么？
2. 在nodejs端，可以使用BOM和DOM的方法么？
3. 我们学习nodejs，学习什么内容？ 

## nodejs可以干什么？

1. 开发服务端程序
2. 开发命令行工具（CLI），比如npm,webpack,gulp,less,sass等
3. 开发桌面应用程序（借助 node-webkit、electron 等框架实现）

# 安装nodejs

## nodejs版本

下载地址

- [当前版本](https://nodejs.org/en/download/)
- [历史版本](https://nodejs.org/en/download/releases/)

官网术语解释

- LTS 版本：Long-term Support 版本，长期支持版，即稳定版。
- Current 版本：Latest Features 版本，最新版本，新特性会在该版本中最先加入。

查看node版本

```bash
node -v
```

## 环境变量

当要求系统运行一个**程序** 而没有告诉它程序所在的完整路径时，

1. 首先在**当前目录**中查找和该字符串匹配的可执行文件 .exe 
2. 进入用户 path 环境变量查找
3. 进入系统 path 环境变量查找

配置环境变量：

```javas
找到环境变量：计算机 --右键--> 属性 --> 高级系统设置 --> 高级 --> 环境变量
```

直接将可执行程序所在目录配置到PATH中

```javascript
//如果是window7操作系统，注意要用分号;隔开，不要覆盖原来的内容
;D:\Program Files\feiq;
```

# 运行nodejs程序

## 方式一：REPL介绍

1. REPL 全称: Read-Eval-Print-Loop（交互式解释器）
   - R 读取 - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
   - E 执行 - 执行输入的数据结构
   - P 打印 - 输出结果
   - L 循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。
2. 在REPL中编写程序 （类似于浏览器开发人员工具中的控制台功能）
   - 直接在控制台输入 `node` 命令进入 REPL 环境
3. 按两次 Control + C 退出REPL界面 或者 输入 `.exit` 退出 REPL 界面
   - 按住 control 键不要放开, 然后按两下 c 键

## 方式二：使用node执行js文件

+ 创建js文件 `helloworld.js`

- 写nodejs的内容：`console.log('hello nodejs')`
- 打开命令窗口 `cmd`
  - shift加右键打开命令窗口，执行 `node 文件名.js`即可
  - 给vscode安装`terminal`插件，直接在vscode中执行
- 执行命令：`node helloworld.js`

注意：在nodejs中是无法使用DOM和BOM的内容的，因此`document, window`等内容是无法使用的。



# ES6语法：

## let与const

> ES6中提供了两个声明变量的关键字：const和let 

## let的使用

ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`。



- let声明的变量只有在当前作用域有效

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

- 不存在变量提升

```js
// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

- 不允许重复声明

```js
let a = 10;
let a = 1;//报错 Identifier 'a' has already been declared
```

## const的使用

`const`声明一个只读的常量。常量：值不可以改变的量 

- const声明的量不可以改变

```js
const PI = 3.1415;
PI = 3; //报错
```

- const声明的变量必须赋值

```js
const num;
```

- 如果const声明了一个对象，仅仅保证地址不变

```js
const obj = {name:'zs'};
obj.age = 18;//正确
obj = {};//报错
```

- 其他用法和let一样

```js
1. 只能在当前代码块中使用
2. 不会提升
3. 不能重复
```

## let与const的使用场景

```js
1. 如果声明的变量不需要改变，那么使用const
2. 如果声明的变量需要改变，那么用let
3. 学了const和let之后，尽量别用var
```

## ES5-数组的新方法

###  forEach

`forEach()` 方法对数组的每个元素执行一次提供的函数。功能等同于`for`循环.

应用场景：为一些相同的元素，绑定事件处理器！

**需求：遍历数组["张飞","关羽","赵云","马超"]**

```javascript
var arr = ["张飞","关羽","赵云","马超"];
//第一个参数：element，数组的每一项元素
//第二个参数：index，数组的下标
//第三个参数：array，正在遍历的数组
arr.forEach(function(element, index, array){
  console.log(element, index, array);
});
```



### map

`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

**需求：遍历数组，求每一项的平方存在于一个数组中**

```javascript
var arr = [1,2,3,4,5];  // 1 4 9 16 25
//第一个参数：element，数组的每一项元素
//第二个参数：index，数组的下标
//第三个参数：array，正在遍历的数组
//返回值：一个新数组，每个元素都是回调函数的结果。
var newArray = arr.map(function(element, index, array){
  return element * element;
});
console.log(newArray);//[1,4,9,16,25]
```



### filter

`filter`用于返回满足条件的元素，
返回一个新数组，如果在回调函数中返回true，那么就留下来，如果返回false，就扔掉

**需求：遍历数组，将数组中工资超过5000的值删除[1000, 5000, 20000, 3000, 10000, 800, 1500]**

```javascript
var arr = [1000, 5000, 20000, 3000, 10000, 800, 1500];
//第一个参数：element，数组的每一项元素
//第二个参数：index，数组的下标
//第三个参数：array，正在遍历的数组
//返回值：一个新数组，存储了所有返回true的元素
var newArray = arr.filter(function(element, index, array){
  if(element > 5000) {
    return false;
  }else {
    return true;
  }
});
console.log(newArray);//[1000, 5000, 3000, 800, 1500]
```

### some

`some`用于遍历数组，如果有至少一个满足条件，就返回true，否则返回false。

**需求：遍历数组，判断数组是否包含奇数，[2,4,6,8,10,9]**

```javascript
var arr = [2,4,6,8,10,21];
//第一个参数：element，数组的每一项元素
//第二个参数：index，数组的下标
//第三个参数：array，正在遍历的数组
//返回值：布尔类型的值，只要有一个回调函数返回true，就返回true
var flag = arr.some(function(element, index, array){
  console.log(element, index, array);
  if(element %2 == 1){
    return true;
  }else {
    return false;
  }
});
console.log(flag);//true
```



### every

`every`用于遍历数组，只有当所有的元素返回true，才返回true，否则返回false。

**需求：遍历数组，判断数组是否都是偶数，[2,4,6,8,10,9]**

```javascript
  var arr = [2,4,6,8,10,21];
  //第一个参数：element，数组的每一项元素
  //第二个参数：index，数组的下标
  //第三个参数：array，正在遍历的数组
  //返回值：布尔类型的值，只有当所有的元素返回true，才返回true，否则返回false。
  var flag = arr.every(function(element, index, array){
    console.log(element, index, array);
    if(element %2 == 0){
      return true;
    }else {
      return false;
    }
  });
  console.log(flag);//false
```

### find

`find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。 

```js
// 获取第一个大于10的数
var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});
console.log(found);
```

### 	findexIndex

`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的**索引**。否则返回-1。 

```js
// 获取第一个大于10的下标
var array1 = [5, 12, 8, 130, 44];

function findFirstLargeNumber(element) {
  return element > 13;
}

console.log(array1.findIndex(findFirstLargeNumber));
```
## ES6语法-字符串新方法

      1. startsWith()  是否以谁开头  布尔类型
      2. endsWith()   是否以谁结尾
      3. includes()     是否包含
    
    let str = "abcdef"
    console.log(str.startsWith('ab'));  // true
    console.log(str.startsWith('bb'));  // false
    console.log(str.endsWith('ef'));    // true
    console.log(str.endsWith('ff'));    // false
    console.log(str.includes('ab'));    // true
    console.log(str.includes('bc'));    // true

## ES6语法- 对象简写

1- 在对象中，如果属性名和变量名相同的话，可以省略一个
2- 在对象中，方法也可以简写， 不写function 
``` javascript
    let name = 'zs'
    let age = 18 

    // 在对象中，如果属性名和变量名相同的话，可以省略一个
    // 在对象中，方法也可以简写

    let obj = {
      name: name,
      age: age
    }

    let obj = {
      name,
      age
    }
    
    // 在对象中的方法可以简写
    // 不写function
    let obj = {
      // say: function () {}
      say(n1) {
        console.log(n1)
      },
      goodBye() {
        console.log('byebye')
      }
    }
    
	//调用
    obj.say(1)
    obj.goodBye()

```


## ES6语法-函数默认参数（备胎）

     es6的函数允许直接传递默认参数
     当调用函数未传递参数时会使用默认参数
     
    function add(n1 = 0, n2 = 0) {
      // n1 = n1 || 0 // 如果n1没值，n1就是0
      // n2 = n2 || 0 // 如果n2没值，n2就是0
      console.log(n1 + n2);
    }
    
    add();  		// 0
    add(1); 		// 1
    add(1, 2);	     // 2



## ES6语法-箭头函数

> ES6标准新增了一种新的函数：Arrow Function（箭头函数）。
>
> 为什么叫Arrow Function？因为它的定义用的就是一个箭头：

###  基本使用

```js
var fn = function(x, y) {
    console.log(x + y);
}

相当于
//语法： (参数列表) => {函数体}
var fn = (x, y) => {
    console.log(x + y);
}
```

### 参数详解

+ 如果没有参数列表，使用()表示参数列表

```js
var sum = () => {
    console.log('哈哈')
};
// 等同于：
var sum = function() {    
    console.log('哈哈')
};
```

+ 如果只有一个参数，可以省略()

```js
// 等同于：
var sum = function(n1) {    
    console.log('哈哈')
};

var sum = n1 => {
    console.log('哈哈')
};

```

+ 如果有多个参数，需要使用()把参数列表括起来

```js
var sum = function(n1, n2) {    
    console.log('哈哈')
};

var sum = (n1, n2) => {
    console.log('哈哈')
};
```

### 返回值详解

+ 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来

```js
var sum = function(n1) {    
    console.log('哈哈')
};

var sum = n1 => {
    console.log('哈哈')
};
```

+ 如果函数体只有一行一句，并且需要返回这个值，那么可以省略{}和return

```js
var fn = function(n1, n2) {
    return n1 + n2;
}

var fn = (n1, n2) => n1 + n2;
```



## 案例1

1. 有一个数组`[1,3,5,7,9,2,4,6,8,10]`,请对数组进行排序
2. 有一个数组`['a','ccc','bb','dddd']`,请按照字符串长度对数组进行排序
3. 有一个数组，`[57,88,99,100,33,77]`,请保留60分以上的成绩，返回一个新的数组

## 箭头函数的注意点

1. 箭头函数内部没有this，因此箭头函数内部的this指向了外部的this（很爽）
2. 箭头函数不能作为构造函数，因为箭头函数没有this

【定义一个对象，定时器打招呼】

**苦口婆心一下：箭头函数刚开始用，肯定会有点不习惯，但是任何东西都有一个习惯的过程，慢慢接受就好了，多用，多练**	




# nodeJs 


# global模块-全局变量

JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。

在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 `global`，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。

常用的global属性

```javascript
console: 用于打印日志
setTimeout/clearTimeout: 设置清除延时器
setInterval/clearInterval: 设置清除定时器

__dirname: 当前文件的路径，不包括文件名
__filename： 获取当前文件的路径，包括文件名

//与模块化相关的，模块化的时候会用到
require
exports
module
```

# fs模块
> fs模块是nodejs中最常用的一个模块，因此掌握fs模块非常的有必要，fs模块的方法非常多,用到了哪个查哪个即可。
>
> 文档地址：http://nodejs.cn/api/fs.html

  在nodejs中，提供了fs模块，这是node的核心模块

  注意：

1. 除了global模块中的内容可以直接使用，其他模块都是需要加载的。
2. fs模块不是全局的，不能直接使用。因此需要导入才能使用。

```javascript
var fs = require("fs");
```

## 读取文件

> 语法：fs.readFile(path[, options], callback)

方式一：不传编码参数

```javascript
//参数1： 文件的名字
//参数2： 读取文件的回调函数
  //参数1：错误对象，如果读取失败，err会包含错误信息，如果读取成功，err是null
  //参数2：读取成功后的数据（是一个Buffer对象）
fs.readFile("data.txt", function(err, data){
  console.log(err);
  console.log(data);
});
```

方式二：传编码参数

```javascript
//参数1： 文件的路径
//参数2： 编码，如果设置了，返回一个字符串，如果没有设置，会返回一个buffer对象
//参数3： 回调函数
fs.readFile("data.txt", "utf8",function(err, data){
  console.log(err);
  console.log(data);
});
```

关于Buffer对象

```javascript
1. Buffer对象是Nodejs用于处理二进制数据的。
2. 其实任意的数据在计算机底层都是二进制数据，因为计算机只认识二进制。
3. 所以读取任意的文件，返回的结果都是二进制数据，即Buffer对象
4. Buffer对象可以调用toString()方法转换成字符串。
```

## 写文件

> 语法：fs.writeFile(file, data[, options], callback)

```javascript
//参数1：写入的文件名(如果文件不存在，会自动创建)
//参数2：写入的文件内容（注意：写入的内容会覆盖以前的内容）
//参数3：写文件后的回调函数
fs.writeFile("2.txt", "hello world, 我是一个中国人", function(err){
  if(err) {
    return console.log("写入文件失败", err);
  }
  console.log("写入文件成功");
});
```

注意：

1. 写文件的时候，会把原来的内容给覆盖掉

## 追加文件

> 语法：fs.appendFile(path, data[, options], callback)

```javascript
//参数1：追加的文件名(如果文件不存在，会自动创建)
//参数2：追加的文件内容（注意：写入的内容会覆盖以前的内容）
//参数3：追加文件后的回调函数
fs.appendFile("2.txt", "我是追加的内容", function(err){
  if(err) {
    return console.log("追加文件内容失败");
  }
  console.log("追加文件内容成功");
})
```

思考：如果没有appendFile，通过readFile与writeFile应该怎么实现？

## 文件同步与异步的说明

> fs中所有的文件操作，都提供了异步和同步两种方式

异步方式：不会阻塞代码的执行

```javascript
//异步方式
var fs = require("fs");

console.log(111);
fs.readFile("2.txt", "utf8", function(err, data){
  if(err) {
    return console.log("读取文件失败", err);
  }
  console.log(data);
});
console.log("222");
```

同步方式：会阻塞代码的执行

```javascript
//同步方式
console.log(111);
var result = fs.readFileSync("2.txt", "utf-8");
console.log(result);
console.log(222);
```

总结：同步操作使用虽然简单，但是会影响性能，因此尽量使用异步方法，尤其是在工作过程中。

## 其他api（了解）

方法有很多，但是用起来都非常的简单，学会查文档

文档：http://nodejs.cn/api/fs.html

| 方法名                                     | 描述          |
| --------------------------------------- | ----------- |
| `fs.readFile(path, callback)`           | 读取文件内容（异步）  |
| `fs.readFileSync(path)`                 | 读取文件内容（同步）  |
| `fs.writeFile(path, data, callback)`    | 写入文件内容（异步）  |
| `fs.writeFileSync(path, data)`          | 写入文件内容（同步）  |
| `fs.appendFile(path, data, callback)`   | 追加文件内容（异步）  |
| `fs.appendFileSync(path, data)`         | 追加文件内容（同步）  |
| `fs.rename(oldPath, newPath, callback)` | 重命名文件（异步）   |
| `fs.renameSync(oldPath, newPath)`       | 重命名文件（同步）   |
| `fs.unlink(path, callback)`             | 删除文件（异步）    |
| `fs.unlinkSync(path)`                   | 删除文件（同步）    |
| `fs.mkdir(path, mode, callback)`        | 创建文件夹（异步）   |
| `fs.mkdirSync(path, mode)`              | 创建文件夹（同步）   |
| `fs.rmdir(path, callback)`              | 删除文件夹（异步）   |
| `fs.rmdirSync(path)`                    | 删除文件夹（同步）   |
| `fs.readdir(path, option, callback)`    | 读取文件夹内容（异步） |
| `fs.readdirSync(path, option)`          | 读取文件夹内容（同步） |
| `fs.stat(path, callback)`               | 查看文件状态（异步）  |
| `fs.statSync(path)`                     | 查看文件状态（同步）  |

# path模块

## 路径操作的问题

在读写文件的时候，文件路径可以写相对路径或者绝对路径

```javascript
//data.txt是相对路径，读取当前目录下的data.txt, 相对路径相对的是指向node命令的路径
//如果node命令不是在当前目录下执行就会报错， 在当前执行node命令的目录下查找data.txt，找不到
fs.readFile("data.txt", "utf8", function(err, data) {
  if(err) {
    console.log("读取文件失败", err);
  }

  console.log(data);
});
```

相对路径：相对于执行node命令的路径

绝对路径：`__dirname`: 当前文件的目录，`__filename`: 当前文件的目录，包含文件名

## path模块的常用方法

> 关于路径，在linux系统中，路径分隔符使用的是`/`，但是在windows系统中，路径使用的`\`

在我们拼写路径的时候会带来很多的麻烦，经常会出现windows下写的代码，在linux操作系统下执行不了，path模块就是为了解决这个问题而存在的。

常用方法：

```javascript
path.join();//拼接路径

//windows系统下
> path.join("abc","def","gg", "index.html")
"abc\def\gg\a.html"

//linux系统下
> path.join("abc","def","gg", "index.html")
'abc/def/gg/index.html'

path.basename(path[, ext])	返回文件的最后一部分
path.dirname(path)	返回路径的目录名
path.extname(path)	获取路径的扩展名

var path = require("path");
var temp = "abc\\def\\gg\\a.html";
console.log(path.basename(temp));//a.html
console.log(path.dirname(temp));//abc\def\gg
console.log(path.extname(temp));//.html
```

【优化读写文件的代码】

```js
let str = 'D:\飞秋文件\feiq\Recv Files\前端-web资料\15-班级随机点名.html'; 
```



## path模块其他api（了解）

| 方法名                          | 描述                   |
| ---------------------------- | -------------------- |
| `path.basename(path[, ext])` | 返回文件的最后一部分           |
| `path.dirname(path)`         | 返回路径的目录名             |
| `path.extname(path)`         | 获取路径的扩展名             |
| `path.isAbsolute(path)`      | 判断目录是否是绝对路径          |
| `path.join([...paths])`      | 将所有的path片段拼接成一个规范的路径 |
| `path.normalize(path)`       | 规范化路径                |
| `path.parse(path)`           | 将一个路径解析成一个path对象     |
| `path.format(pathObj)`       | 讲一个path对象解析成一个规范的路径  |

# http模块

## 创建服务器基本步骤

```javascript
//1. 导入http模块，http模块是node的核心模块，作用是用来创建http服务器的。
var http = require("http");

//2. 创建服务器
var server = http.createServer();

//3. 服务器处理请求
server.on("request", function() {
  console.log("我接收到请求了");
});

//4. 启动服务器，监听某个端口
server.listen(9999, function(){
  console.log("服务器启动成功了, 请访问： http://localhost:9999");
});
```

详细说明

1. 给服务器注册request事件，只要服务器接收到了客户端的请求，就会触发request事件
2. request事件有两个参数，request表示请求对象，可以获取所有与请求相关的信息，response是响应对象，可以获取所有与响应相关的信息。
3. 服务器监听的端口范围为：1-65535之间，推荐使用3000以上的端口，因为3000以下的端口一般留给系统使用

## request对象详解

文档地址：http://nodejs.cn/api/http.html#http_message_headers

常见属性：

```javascript
method： 请求的方式
url： 请求的地址
headers: 所有的请求头信息
rawHeaders： 所有的请求头信息（数组的方式）
```

注意：在发送请求的时候，可能会出现两次请求的情况，这是因为谷歌浏览器会自动增加一个`favicon.ico`的请求。

小结：request对象中，常用的就是method和url两个参数

## response对象详解

文档地址：http://nodejs.cn/api/http.html#http_class_http_serverresponse

常见的属性和方法：

```javascript
res.write(data): 给浏览器发送请求体，可以调用多次，从而提供连续的请求体
res.end();   通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。
res.end(data); 结束请求，并且响应一段内容，相当于res.write(data) + res.end()
res.statusCode: 响应的的状态码 200 404 500
res.statusMessage: 响应的状态信息， OK Not Found ,会根据statusCode自动设置。
res.setHeader(name, value); 设置响应头信息， 比如content-type
res.writeHead(statusCode, statusMessage, options); 设置响应头，同时可以设置状态码和状态信息。
```

**注意：必须先设置响应头，才能设置响应体。** 

## 根据不同请求输出不同响应数据

- [request.url](http://nodejs.cn/api/http.html#http_message_url)
- `req.url`：获取请求路径
  - 例如：请求`http://127.0.0.1:3000/index` 获取到的是：`/index`
  - 例如：请求`http://127.0.0.1:3000/` 获取到的是：`/`
  - 例如：请求`http://127.0.0.1:3000` 获取到的是：`/`

## 服务器响应文件

- 注意：浏览器中输入的URL地址，仅仅是一个标识，不与服务器中的目录一致。也就是说：返回什么内容是由服务端的逻辑决定

```js
server.on('request', function(req, res) {
  var url = req.url
  if(url === '/') {
    fs.readFile('./index.html', function(err, data) {
      if(err) {
        return res.end('您访问的资源不存在~')
      }

      res.end(data)
    })
  }
})
```

## 模拟Apache服务器

- 根据 `req.url` 读取不同的页面内容，返回给浏览器

## MIME类型

- MIME(Multipurpose Internet Mail Extensions)多用途Internet邮件扩展类型 是一种表示文档性质和格式的标准化方式
- 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档；因此服务器将正确的MIME类型附加到响应对象的头部是非常重要的
- [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types)

### mime模块

- 作用：获取文件的MIME类型
- 安装：`npm i mime`

```js
var mime = require('mime')

// 获取路径对应的MIME类型
mime.getType('txt')                    // ⇨ 'text/plain'
// 根据MIME获取到文件后缀名
mime.getExtension('text/plain')        // ⇨ 'txt'
```

# npm - Node包管理工具

## npm的基本概念

- node package manager
- [npm官网](https://npmjs.com)
- [npm中文文档](https://www.npmjs.com.cn/)

```html
1. npm 是node的包管理工具，
2. 它是世界上最大的软件注册表，每星期大约有 30 亿次的下载量，包含超过 600000 个 包（package） （即，代码模块）。
3. 来自各大洲的开源软件开发者使用 npm 互相分享和借鉴。包的结构使您能够轻松跟踪依赖项和版本。

npm 由三个独立的部分组成：
    网站
    注册表（registry）
    命令行工具 (CLI)
```

- 作用：通过`npm`来快速安装开发中使用的包
- npm不需要安装，只要安装了node，就自带了`npm`

## npm基本使用

### 初始化包

```javascript
npm init;    //这个命令用于初始化一个包，创建一个package.json文件，我们的项目都应该先执行npm init
npm init -y;  //快速的初始化一个包， 不能是一个中文名
```

### 安装包

```javascript
npm install 包名;  //安装指定的包名的最新版本到项目中
npm install 包名@版本号;  //安装指定包的指定版本

npm i 包名； //简写
```

### 卸载包

```javascript
npm uninstall 包名;  //卸载已经安装的包
```

## 本地安装和全局安装

有两种方式用来安装 npm 包：本地安装和全局安装。选用哪种方式来安装，取决于你如何使用这个包。 

+ 全局安装：如果你想将其作为一个命令行工具，那么你应该将其安装到全局。这种安装方式后可以让你在任何目录下使用这个命令。比如less命令，webpack命令。
+ 本地安装：如果你自己的模块依赖于某个包，并通过 Node.js 的 `require` 加载，那么你应该选择本地安装，这种方式也是 `npm install` 命令的默认行为。

```javascript
// 全局安装,会把npm包安装到C:\Users\cc\AppData\Roaming\npm目录下，作为命令行工具使用
npm install -g 包名;

//本地安装，会把npm包安装到当前项目的node_modules文件中，作为项目的依赖
npm install 包名;  
```

## package.json文件

package.json文件，包（项目）描述文件，用来管理组织一个包（项目），它是一个纯JSON格式的。

+ 作用：描述当前项目（包）的信息，描述当前包（项目）的依赖项
+ 如何生成：`npm init`或者`npm init -y`
+ 作用
  + 作为一个标准的包，必须要有`package.json`文件进行描述
  + 一个项目的node_modules目录通常都会很大，不用拷贝node_modules目录，可以通过package.json文件配合`npm install`直接安装项目所有的依赖项
+ 描述内容

```json
{
  "name": "03-npm",  //描述了包的名字，不能有中文
  "version": "1.0.0",  //描述了包的的版本信息， x.y.z  如果只是修复bug，需要更新Z位。如果是新增了功能，但是向下兼容，需要更新Y位。如果有大变动，向下不兼容，需要更新X位。
  "description": "", //包的描述信息
  "main": "index.js", //入口文件（模块化加载规则的时候详细的讲）
  "scripts": {  //配置一些脚本，在vue的时候会用到，现在体会不到
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],  //关键字（方便搜索）
  "author": "",  //作者的信息
  "license": "ISC",  //许可证，开源协议
  "dependencies": {   //重要，项目的依赖， 方便代码的共享  通过 npm install可以直接安装所有的依赖项
    "bootstrap": "^3.3.7",
    "jquery": "^3.3.1"
  }
}
```

**注意：一个合法的package.json，必须要有name和version两个属性** 



如果安装失败， 可以通过以下命令清除npm缓存：

		npm cache clean -f  // -f强制清除

//主要看网络

## npm下载加速

### nrm

- nrm：npm registry manager（npm仓库地址管理工具）
- 安装：`npm i -g nrm`

```shell
# 带*表示当前正在使用的地址

# 查看仓库地址列表
nrm ls

# 切换仓库地址
nrm use taobao
```

## nodemon 自动重启

- 作用：监视到js文件修改后，自动重启node程序
- 安装：`npm i -g nodemon`
- 使用：`nodemon app.js` 运行node程序

# hacknews案例

- [Hacker News 示例](https://news.ycombinator.com/)
https://github.com/XuefengZhang1/hack.git
- 路由（route）：就是一套映射规则，根据url地址分配到对应的处理程序

## 功能划分

- 1 新闻列表页 - /index    get
- 2 新闻详情页 - /details  get
- 3 新闻添加页 - /submit   get
- 4 新闻添加请求 - /add    post

## 路由

路由（route）：就是一套映射规则，根据url地址分配到对应的处理程序

## art-template 模板引擎

- [文档](https://aui.github.io/art-template/zh-cn/docs/)
- 安装

```bash
npm install art-template
```

- 核心方法

```javascript
// 基于模板路径渲染模板
//参数1：文件的路径
//参数2：数据
//返回值：返回渲染后的内容
// template(filename, data)
let html = template(path.join(__dirname, "pages", "index.html"), {name:"大吉大利，今晚吃鸡"});
```

**注意点：文件的路径必须是绝对路径**

## hacknews 数据处理

- 采用`后端渲染`将模板页面和数据渲染为用户能够看懂的正常页面返回

## url模块

- 说明：用于 URL 处理与解析
- 注意：通过url拿到的查询参数都是字符串格式

```js
// 导入url模块
var url = require('url')

// 解析 URL 字符串并返回一个 URL 对象
// 第一个参数：表示要解析的URL字符串
// 第二个参数：是否将query属性（查询参数）解析为一个对象，如果为：true，则query是一个对象
var ret = url.parse('http://localhost:3000/details?id=1&name=jack', true)
console.log(ret.query) // { id: '1', name: 'jack' }
```

## querystring模块

- 用于解析与格式化 URL 查询字符串
- 注意：只在专门处理查询字符串时使用

```js
// foo=bar&abc=xyz&abc=123
var querystring = require('querystring')

// 将查询参数转化为对象
// 第一个参数: 要解析的 URL 查询字符串
querystring.parse('foo=bar&abc=xyz') // { foo: 'bar', abc: 'xyz' }
```

## 服务端重定向

- [HTTP 状态码说明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- [301 和 302](http://shuai.be/archives/301-302-redirection/)
- 说明：服务端可以通过HTTP状态码让浏览器中的页面重定向

```js
res.writeHead(302, {
  'Location': '/'
})
res.end()
```

## POST请求参数的处理

- 说明：POST请求可以发送大量数据，没有大小限制

```js
// 接受POST参数
var postData = []

// 给req注册一个data事件， 只要浏览器给服务器发送post请求，data事件就会触发
// post请求发送的数据量可以很大， 这个data事件会触发多次，一块一块的传输
// 要把所有的chunk都拼接起来
// data事件：用来接受客户端发送过来的POST请求数据
var result = "";
req.on('data', function (chunk) {
  result += chunk;
})

// end事件：当POST数据接收完毕时，触发
req.on('end', function () {
  cosnole.log(result); 
})
```

# 模块化

模块化规范：

+ AMD:  requirejs
+ CMD:  seajs  玉伯  浏览器端的模块 
+ commonJS： nodejs  服务端的模块

## 基本概念

> 在nodejs中，应用由模块组成，nodejs中采用commonJS模块规范。

1. 一个js文件就是一个模块
2. 每个模块都是一个独立的作用域，在这个而文件中定义的变量、函数、对象都是私有的，对其他文件不可见。

- `01-模块化的概念`用于演示每一个模块都有自己单独的作用域

## node中模块分类

- 1 核心模块
  - 由 node 本身提供，不需要单独安装（npm），可直接引入使用
- 2 第三方模块
  - 由社区或个人提供，需要通过npm安装后使用
- 3 自定义模块
  - 由我们自己创建，比如：tool.js 、 user.js

### 核心模块

- fs：文件操作模块
- http：网络操作模块
- path：路径操作模块
- url: 解析地址的模块
- querystring: 解析参数字符串的模块
- 基本使用：1 先引入  2 再使用

```js
// 引入模块
var fs = require('fs');
```

### 第三方模块

- 第三方模块是由 社区或个人 提供的
- 比如：mime模块/art-template/jquery...
- 基本使用：1 先通过npm下载 2 再引入 3 最后使用

### 用户自定义模块

- 由开发人员创建的模块（JS文件）
- 基本使用：1 创建模块 2 引入模块
- 注意：自定义模块的路径必须以`./`获取`../`开头

```js
// 加载模块
require('./a')     // 推荐使用，省略.js后缀！

require('./a.js')
```

## 模块的导入与导出

### 模块导入

- 通过`require("fs")`来加载模块
- 如果是第三方模块，需要先使用npm进行下载
- 如果是自定义模块，需要加上相对路径`./`或者`../`,可以省略`.js`后缀，如果文件名是`index.js`那么index.js也可以省略。
- 模块可以被多次导入，但是只会在第一次加载

### 模块导出

- 在模块的内部，`module`变量代表的就是当前模块，它的`exports`属性就是对外的接口，加载某个模块，加载的就是`module.exports`属性，这个属性指向一个空的对象。

```javascript
//module.exports指向的是一个对象，我们给对象增加属性即可。
//module.exports.num = 123;
//module.exports.age = 18;

//通过module.exports也可以导出一个值，但是多次导出会覆盖
module.exports = '123';
module.exports = "abc";
```



### module.exports与exports

- `exports` 是 `module.exports` 的引用
- 注意：给 `module.exports` 赋值会切断与 `exports` 之间的联系
  - 1 直接添加属性两者皆可
  - 2 赋值操作时，只能使用 `module.exports`
    

```js
console.log( module.exports === exports ) // ==> true

// 等价操作
module.exports.num = 123
exports.num = 123

// 赋值操作：不要使用 exports = {}
module.exports = {}
```

### 第三方模块（以mime包为例）

- 先基于当前文件模块所属目录找 node_modules 目录
- 如果找到，则去该目录中找 mime 目录
- 如果找到 mime 目录，则找该目录中的 package.json 文件
- 如果找到 package.json 文件，则找该文件中的 main 属性
- 如果找到 main 属性，则拿到该属性对应的文件路径
- 如果找到 mime 目录之后
  - 发现没有 package.json
  - 或者 有 package.json 没有 main 属性
  - 或者 有 main 属性，但是指向的路径不存在
  - 则 node 会默认去看一下 mime 目录中有没有 index.js index.node index.json 文件
- 如果找不到 index 或者找不到 mime 或者找不到 node_modules
- 则进入上一级目录找 node_moudles 查找规则同上
- 如果上一级还找不到，继续向上，一直到当前文件所属磁盘根目录
- 如果最后到磁盘根目录还找不到，最后报错：`can not find module xxx`



### CommonJS 规范参考文档

- [module (模块)](http://nodejs.cn/api/modules.html)
- [CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html)
- [浅析JS模块规范：AMD，CMD，CommonJS](http://www.jianshu.com/p/09ffac7a3b2c)

# 模块化改造hackerNews

# Express

## Express 框架

- **基于 Node.js 平台，快速、开放、极简的 web 开发框架**
- [express 官网](http://expressjs.com/)
- [express 中文网](http://expressjs.com.cn/)

### 起步

- 安装：`npm i express`

```js
// 导入 express
var express = require('express')
// 创建 express实例，也就是创建 express服务器
var app = express()

// 路由
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// 启动服务器
app.listen(3000, function () {
  console.log('服务器已启动')
})
```

### API说明

- `express()`：创建一个Express应用，并返回，即：app
- `app.get()`：注册一个GET类型的路由
  - 注意：只要注册了路由，所有的请求都会被处理（未配置的请求路径，响应404）
- `res.send()`：发送数据给客户端，并自动设置Content-Type
  - 参数可以是：字符串、数组、对象、Buffer
  - 注意：只能使用一次
- `req` 和 `res`：与http模块中的作用相同，是扩展后的请求和响应对象

## 注册路由的三种方式

- 1 `app.METHOD`：比如：app.get / app.post / app.delete / app.patch
- 2 `app.all(path, callback)`
  - 注意：path 与 请求地址必须完全相同
  - 注意：可以处理任意的请求类型
- 3 `app.use(path, callback)` 更重要的作用是处理中间件
  - 注意：只要是以path开头的请求地址，都可以被use处理
  - 注意：可以处理任意的请求类型
  - 注意：path参数可省略，默认值为：`/`

## 模拟Apache服务器

- `req.path`：请求路径
  - 示例：URL为'example.com/users?sort=desc'，path表示：`/users`
- `res.sendFile()`

### 处理静态资源

- 静态资源：图片、CSS、JavaScript 文件 等
- 如何处理？使用 express.static() 方法来托管静态资源
- 注意：`express.static()`可以调用多次
- 思考：`app.use('/web', express.static('web'))` 的含义？
  - 访问：`http://localhost:3000/web/anoceanofsky.jpg`

```js
// 托管web目录下的静态资源
app.use(express.static('web'))
// 相当于：app.use('/', express.static('web'))

// 访问上述静态资源
// http://localhost:3000/anoceanofsky.jpg

// 当请求达到服务器后，express就会到web目录下，查找anoceanofsky.jpg
// 并读取该文件，返回给浏览器
```

## request常用属性和方法

```js
// 获取请求路基中的参数，是一个对象 ---> Get请求参数
req.query

// 获取POST请求参数，需要配置`body-parser`模块， POST请求参数
req.body
```

- 获取`POST`请求参数

```js
// 导入body-parser模块
var bodyParser = require('body-parser');
// 将POST请求参数转化为对象，存储到req.body中
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

// 此时，就可以获取到POST请求参数了
console.log(req.body)
```

## response常用属性和方法

```js
// send() 发送数据给客户端，并自动设置Content-Type
res.send()

// 发送文件给浏览器，并根据文件后缀名自动设置Content-Type
// 注意：文件路径必须是绝对路径
res.sendFile(path.join(__dirname, 'index.html'))

// 设置HTTP响应码
res.status(200)；

// 设置响应头
res.set('Content-Type', 'text/plain')
res.set({
  'Content-Type': 'text/plain',
  'cute': 'fangfang'
})

// 重定向
res.redirect('/index')
```



# express

## express中使用模版引擎 

安装 

```bash
npm install express 
npm install art-template 
npm install express-art-template
```

给express绑定一个模版引擎

```javascript
//给express设置模版引擎
//参数1： 模版引擎的后缀名，  以后的模版文件都应该是 html结尾
//参数2： 使用什么模版引擎
app.engine("html", require('express-art-template'))
```

通过`res.render()`渲染模版引擎

```javascript
//参数1； 模版文件的路径,相对路径，回去views目录下查找
//参数2： 数据
res.render(path.join(__dirname, "index.html"), {name:"zs"})
```

关于模版引擎的配置（了解）

```javascript
//模版文件默认去aa目录下查找  默认值：  views
app.set("views", "aa");

//设置模板引擎的默认后缀
app.set("view engine", "html");
```



## 中间件

*中间件（Middleware）* 是一个函数，它可以访问请求对象`req`, 响应对象`res`, 可以通过`next`参数将中间件传递给下一个中间件

中间件作用： 给req 和 res 拓展功能 

中间件的功能包括：

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。

定义一个中间件

```javascript
//添加一个中间件
//中间件是啥：中间件就是一个函数，中间件可以访问到req和res，可以通过next发送给下一个中间件
app.use(function(req,res, next) {
  req.aa = "大春哥";
  res.bb = "很帅";
  //中间件可以通过next传递给下一个中间件
  next();
});
```

## body-parser中间件的使用

+ 获取get请求的参数：`req.query`
+ 获取post请求的参数`req.body`，但是需要借助`body-parser`中间件

安装：

```bash
npm install body-parser
```

使用

```javascript
//1. 导入body-parser中间件
var bodyParser = require('body-parser');
//使用body-parser中间件
//extended:true 表示使用qs库来解析查询字符串  extended：false表示使用querystring库来解析字符串
app.use(bodyParser.urlencoded({extended:false}));

//3. 通过req.body获取参数
app.post("/", function(req, res) {
  console.log(req.body);
  res.send("哈哈");
});
```

**注意：中间件是有执行顺序的**

## 实现自己的body-parser中间件

```javascript
//bodyParser.json(); 返回一个函数（中间件），会处理json数据
app.use(function(req, res, next){
  //给req增加一个body属性
  var result = "";
  req.on('data', function(chunk){
    result += chunk;
  });

  req.on("end", function(){
    req.body = querystring.parse(result);
    next();
  });
});
```

## 外置路由的使用

目的：将路由封装到一个独立的路由模块中，有利于代码的封装和模块化

```javascript
/*
  router.js 文件代码如下:
*/

// 1 加载 express 模块
var express = require('express')

// 2 调用 express.Router() 方法，得到一个路由容器实例
var router = express.Router()

// 3 为 router 添加不同的路由
router.get('/', function (req, res) {
  res.send('hello express')
})

router.get('/add', function (req, res) {

})

// 4. 将 router 路由容器导出
module.exports = router
```

```javascript
/*
  在 app.js 文件中：
*/
var express = require('express')

// 1 加载上面自定义的路由模块
var router = require('./router')

var app = express()

// 2. 将自定义路由模块 router 通过 app.use() 方法挂载到 app 实例上
//    这样 app 实例程序就拥有了 router 的路由
app.use( router )

app.listen(3000, function () {
  console.log('running...')
})
```

## 使用express重构HackerNews案例

# mongodb

数据库的分类

关系型数据库；mysql oracle sql server db2

非关系数据库:  mongodb  redis  memcache

## MongoDB简介

- [mongodb 官网](https://www.mongodb.com/)
- [mongodb 中文](https://www.mongodb.com/cn)
- [mongodb教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)
- MongoDB 是一个非关系型数据库，属于文档型数据库（NoSQL -> Not Only SQL）
- 对 JavaScript 兼容较好，和 Node.js 结合最好 
- MEAN: `M:mongodb E:express  A:angular(vue react) n:nodejs`

## mongodb安装

### windows版本

参考地址：

http://www.runoob.com/mongodb/mongodb-window-install.html

- 1 根据操作系统选择合适的安装程序（32位或64位）
- 2 直接安装程序
- 3 配置环境变量，通过命令：`mongod --version`看是否安装成功
- 4 注意：**MongoDB最新版的安装包已经不再支持32位的windows操作系统了**

```html
解决mongodb安装时出错 “mongodb 无法启动此程序，因为计算机中丢失 api-ms-win-crt-runtime-l1-1-0.dll”，安装 vc_redist.x64.exe

https://helpx.adobe.com/tw/creative-cloud/kb/error_on_launch.html

通过指定其他电脑的ip地址，就可以使用其他电脑中的MongoDB数据库了：
var url = 'mongodb://localhost:27017'
```

### mac版本

参考地址：http://www.runoob.com/mongodb/mongodb-osx-install.html

## mongodb启动与连接

- 1 通过命令：`mongod` 启动 mongodb数据库服务（不要关闭）
- 2 重新开启一个cmd，输入命令：`mongo` 就可以连接到mongod服务了

```html
1 在 C中创建 data文件夹, 在data文件夹中创建 db文件夹
2 在终端中输入命令: mongod ,就可以启动mongodb数据库服务了

3. 创建 c:\data\db 的目的: 告诉 mongodb 数据存储到这个文件夹中, 但是, 只能在C盘中启动 mongod
4. 如果需要在 D盘 启动, 需要在 D中也创建 data/db 目录

```

```bash
# 终端1 -- 启动服务
mongod

# 终端2 -- 连接到服务
# 此时，就可以在 终端 对数据库进行操作了
mongo
# 或者 指定ip
mongo mongodb://localhost:27017
```

### 数据库存储路径的说明

- [windows32位系统 安装MongoDB](https://www.cnblogs.com/myzy/p/7826540.html)
- 注意：mongod 会在执行命令的磁盘根目录中查找 `data/db` 目录作为数据库文件存储路径
- 可以通过命令：`mongod --dbpath 路径` 修改默认配置

```bash
# 64位：
mongod --dbpath C:\data\db

# 32位：
mongod  --journal --storageEngine=mmapv1
mongod --dbpath c:\data\db --journal --storageEngine=mmapv1
```

## MongoDB终端操作

## 数据库操作

> 以下的命令都是在mongo终端下完成

- 查看数据库

```bash
# 注意：自己创建的数据库，如果数据为空，不会显示
show dbs
```

- 切换(创建)数据库

```bash
# 如果数据库存在，切换到该数据库， 如果数据库不存在，创建新的数据库
# 如果数据库里面没有数据的话，数据库不显示
use 数据库名
use test
use users
```

- 查看当前使用的数据库

```bash
# 查看当前正在使用的数据库
db
```

- 删除当前数据库

```bash
db.dropDatabase()
```

### mongodb术语

- 数据库：一个项目会使用一个数据库，比如letao, baixiu等
- 集合：类似于表，一个数据库可以有很多集合，比如user存放学生信息，teacher存放老师的信息
- 文档：一条数据就是一个文档，一个集合可以存放多条数据，即一个集合可以存放多个老师的信息，每个老师的信息称为一条文档
- 字段：一条数据中的属性，就是字段，比如name，age等

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                           |
| ------------ | ---------------- | ----------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table joins  |                  | 表连接,MongoDB不支持                |
| primary key  | primary key      | 主键,MongoDB自动将_id字段设置为主键 |

### 插入数据（文档）

- 语法：`db.集合名称.insert({})`
- 说明: 在 mongodb 中不需要提前创建"表", 直接通过 db.表名称.inseret() 就可以往表中添加数据了

```js
// 插入一条
db.users.insert({name: 'jack', age: 18, gender: 'male'})

// 插入多条
db.users.insertMany([{name: 'tom', age: 19}, {name: 'jerry', age: 20}])
```

### 查询数据

- 语法：`db.集合名称.find()`

```js
// 查询所有数据
db.users.find()

// 美化输出格式：
db.集合名称.find().pretty()

// 指定条件查询：
db.集合名称.find({name: 'jack'})
```

### 修改数据

- 语法：`db.集合名称.updateOne(条件, 更新后的数据)`

```js
// 修改name属性为jack的数据，将age改为20
// 第一个参数: 表示要修改哪个数据, 会根据指定的name属性, 去查找值为jack的数据
// 第二个参数: 表示修改修改后的数据, 会修改 age 属性的值为 20
db.users.updateOne({name: 'jack'}, {$set: {age: 20}})

// 修改age大于19岁的文档，将name设置为 中年人
db.users.updateMany({age: {$gt: 19}},{$set: {name: '中年人'}})
```

### 删除数据

- 语法：`db.集合名称.deleteOne(条件)`

```js
// 删除 age 为18的数据：
// 参数: 删除条件
db.users.deleteOne({age: 18})

// 删除所有name为jack的文档
db.users.deleteMany({ name: 'jack' })
```

### MondoDB 查询语句

| 操作       | 格式 |                           示例 |             SQL语句 |
| ---------- | :--: | -----------------------------: | ------------------: |
| 等于       |  {}  |   db.col.find({ name :'jack'}) | where name = 'jack' |
| 小于       | $lt  |  db.col.find({ age: {$lt:18}}) |      where age < 18 |
| 小于或等于 | $lte | db.col.find({ age: {$lte:18}}) |     where age <= 18 |
| 大于       | $gt  |  db.col.find({ age: {$gt:18}}) |      where age > 18 |
| 大于或等于 | $gte | db.col.find({ age: {$gte:18}}) |     where age >= 18 |
| 不等于     | $ne  |  db.col.find({ age: {$ne:18}}) |     where age != 18 |
A
less  than  equal  great  not 

## 在 node 中操作 MongoDB

- 安装：`npm i  mongodb`

```js
// 导入 mongodb，并获取到客户端对象
var MongoClient = require('mongodb').MongoClient

// 连接数据库服务地址
var url = 'mongodb://localhost:27017'

// 连接数据库
MongoClient.connect(url, function (err, client) {
  if (err) {
    return console.log('链接数据库失败', err)
  }

  console.log('数据库链接成功');

  // 获取集合对象
  var db = client.db('nodedb')

  // 关闭数据库链接
  client.close()
})
```

### 数据增删改查

- 添加数据：

```js
var db = client.db('nodedb')

// 添加
db.collection('users')
  // 添加一条数据
  .insert({name: 'rose', age: 19}, function (err, data) {
    console.log(data);
  })
  // 添加多条数据
  .insertMany([{ name: 'tom', age: 20 }, { name: 'jerry', age: 21 }], function (err, data) {
    console.log(data);
  })
```

- 查询数据：

```js
var db = client.db('nodedb')

// 查询
db.collection('users').find().toArray(function (err, data) {
  console.log(data)
})
```

- 删除数据:

```js
var db = client.db('nodedb')

db.collection('users')
  // 删除一条数据：
  .deleteOne({name: 'rose'}, function (err, result) {
    console.log(result);
  })
  // 删除多条数据：
  .deleteMany({age: {$lt: 20}}, function (err, result) {
    console.log(result);
  })
```

- 修改数据：

```js
var db = client.db('nodedb')

db.collection('users')
  .update({ name: 'tom' }, { $set: { age: 22 } }, function (err, result) {
    console.log(result);
  })
```

## 使用MongoDB实现 hacker-news



## 在 node 中操作 MongoDB

- 安装：`npm i  mongodb`
- 启动mongodb的服务

```js
// 导入 mongodb，并获取到客户端对象
var MongoClient = require('mongodb').MongoClient

// 连接数据库服务地址
var url = 'mongodb://localhost:27017'

// 连接数据库
MongoClient.connect(url, function (err, client) {
  if (err) {
    return console.log('链接数据库失败', err)
  }

  console.log('数据库链接成功');

  // 获取集合对象
  var db = client.db('nodedb')

  // 关闭数据库链接
  client.close()
})
```

## 数据增删改查

+ 查询数据

```javascript
//查询
db
    .collection("users")
    .find({age: {$gt:20}})
    .toArray(function(err, data){
    if(err) {
        return console.log("获取数据失败");
    }
    console.log(data);
});


  db.collection("user").findOne({name:"小鲜肉"}, function(err, result){
    if(err) {
      console.log("查询单个数据失败了");
      return;
    }
    console.log(result);
  })
```

- 添加数据：

```js
//添加单条
db
    .collection("users")
    .insertOne({name:"jim1", age: 12, gender:"女"}, function(err, info){
    if(info.result.ok === 1){}
    console.log("数据插入成功");
});

//添加多条数据
db
    .collection("users")
    .insertMany([ {"name":"hucc", "age":18, gender:"男"}, {"name":"hcc", "age":17, gender:"女"} ], function(err, info){
    console.log(info.result);
});
```

- 删除数据:

```js
//删除单条数据
db
    .collection("users")
    .deleteOne({age: {$gt:5}}, function(err, info){
    if(info.result.ok === 1) {
        console.log("数据删除成功");
    }
})

//删除多条数据
db
    .collection("users")
    .deleteMany({age: {$gt:5}}, function(err, info){
    if(info.result.ok === 1) {
        console.log("数据删除成功");
    }
})
```

- 修改数据：

```js
//修改单条数据
db
    .collection("users")
    .updateOne({name: "tom"}, {$set: {gender:"女"}}, function(err, info){
    if(info.result.ok === 1) {
        console.log("数据修改成功了");
    }
})

//修改多条数据
db
    .collection("users")
    .updateMany({ name: "tom" }, { $set: { gender: "不详" } }, function (err, info) {
    if (info.result.ok === 1) {
        console.log("数据修改成功了");
    }
})
```

## 使用MongoDB实现 hacker-news

# 前后端分离的HackerNews

## 服务端渲染

服务端准备数据，服务端进行数据的渲染。

前端仅仅是提供了页面。

## 前端渲染（前后端分离）

服务端提供数据和接口

前端通过ajax请求数据，获取数据，结合模版引擎进行渲染。