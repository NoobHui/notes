## AJAX技术 

> 即 Asynchronous Javascript And XML，AJAX 不是一门的新的语言，而是对现有持术的综合利用。

+ 本质:是在HTTP协议的基础上通过js的XMLHttpRequest对象与服务器进行通信。


+ 作用：可以在页面不刷新的情况下，请求服务器，局部更新页面的数据；

### 异步 与 同步(了解)

>  指某段程序执行时不会阻塞其它程序执行，其表现形式为程序的执行顺序不依赖程序本身的书写顺序，相反则为同步。



> 同步：同一时刻只能做一件事，上一步完成才能开始下一步

+ 异步：同时做多件事，效率更高,做一件事情时，不影响另一件事情的进行。

XMLHttpRequest可以以异步方式的处理程序。

## XMLHttpRequest

> 浏览器内建对象，用于在后台与服务器通信(交换数据) ， 由此我们便可实现对网页的部分更新，而不是刷新整个页面。



### 发送get请求

XMLHttpRequest以异步的方式发送HTTP请求，因此在发送请求时，一样需要遵循HTTP协议。

```javascript
//使用XMLHttpRequest发送get请求的步骤
//1. 创建一个XMLHttpRequest对象
var xhr = new XMLHttpRequest();
//2. 设置请求行
//第一个参数:请求方式  get/post
//第二个参数:请求的地址 需要在url后面拼上参数列表
xhr.open("get", "08.php?name=hucc");
//3. 设置请求头
xhr.setReqeustHeader('content-type','text/html');
//浏览器会给我们默认添加基本的请求头,get请求时无需设置
//4. 设置请求体
//get请求的请求体为空,因为参数列表拼接到url后面了
xhr.send(null);
```

+ get请求,设置请求行时,需要把参数列表拼接到url后面
+ get请求不用设置请求头
+ get请求的请求体为null



### 发送post请求

```javascript
var xhr = new XMLHttpRequest;
//1. 设置请求行 post请求的参数列表在请求体中
xhr.open("post", "09.php");
//2. 设置请求头, post请求必须设置content-type,不然后端无法获取到数据
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//3. 设置请求体
xhr.send("name=hucc&age=18");
```

+ post必须设置请求头中的content-type为application/x-www-form-urlencoded

+ post请求需要将参数列表设置到请求体中



### 获取响应

HTTP响应分为3个部分，状态行、响应头、响应体。

```javascript
//给xhr注册一个onreadystatechange事件，当xhr的状态发生状态发生改变时，会触发这个事件。
xhr.onreadystatechange = function () {
  if(xhr.readyState == 4){
    //1. 获取状态行
    console.log("状态行:"+xhr.status);
    //2. 获取响应头
    console.log("所有的相应头:"+xhr.getAllResponseHeaders());
    console.log("指定相应头:"+xhr.getResponseHeader("content-type"));
    //3. 获取响应体
    console.log(xhr.responseText);
  }
}
```

**readyState** 

> readyState:记录了XMLHttpRequest对象的当前状态

```javascript
//0：请求未初始化（还没有调用 open()）。
//1：请求已经建立，但是还没有发送（还没有调用 send()）。
//2：请求已发送，正在处理中
//3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
//4：响应已完成；您可以获取并使用服务器的响应了。(我们只需要关注状态4即可)
```



### 案例

【判断用户名是否存在】

【成绩查询案例】

【聊天机器人案例】



## 数据交互

> 浏览器端只是负责用户的交互和数据的收集以及展示，真正的数据都是存储在服务器端的。我们现在通过ajax的确可以返回一些简单的数据（一个字符串），但是在实际开发过程中，肯定会会设计到大量的复杂类型的数据传输，比如数组、对象等，但是每个编程语言的语法都不一样。因此我们会采用通过的数据交换格式（XML、JSON）来进行数据的交互。



### XML

**什么是XML**

- XML 指可扩展标记语言（EXtensible Markup Language）
- XML 是一种标记语言，很类似 HTML
- XML 的设计宗旨是传输数据，而非显示数据
- XML 标签没有被预定义。您需要自行定义标签。



**语法规范**

+ 第一行必须是版本信息
+ 必须有一个根元素（有且仅有一个）
+ 标签不可有空格、不可以数字或.开头、大小写敏感
+ 不可交叉嵌套，都是双标签，如果是单标签，必须闭合
+ 属性双引号（浏览器自动修正成双引号了）
+ 特殊符号要使用实体 
+ 注释和HTML一样

```xml
<students>
    <student>
        <name>张三</name>
        <age>18</age>
        <gender>男</gender>
        <desc>路人甲</desc>
    </student>
    <student>
        <name>李四</name>
        <age>20</age>
        <gender>男</gender>
        <desc>路人乙</desc>
    </student>
</students>
```

**php获取xml文件的内容**

```php
//注意，如果需要返回xml数据，需要把content-type改成text/xml,不然浏览器以text/html进行解析。
header('content-type:text/xml;charset=utf-8');
//用于获取文件的内容
//参数：文件的路径
$result = file_get_contents("data.xml");
echo $result;
```

**html解析xml**

```javascript
//获取服务端返回的xml数据，需要使用xhr.responseXML，这是一个document对象，可以使用DOM中的方法查找元素。
var data = xhr.responseXML;
//获取所有的学生
var students = data.querySelectorAll("student");
```

缺点：虽然可以描述和传输复杂数据，但是其解析过于复杂并且体积较大，所以实现开发已经很少使用了。



### JSON数据

JSON(JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式。它基于 ECMAScript 规范的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。

+ 数据在名称/值对中
+ 数据由逗号分隔(最后一个健/值对不能带逗号)
+ 花括号保存对象，方括号保存数组
+ 键使用双引号

```javascript
    var obj = {a: 'Hello', b: 'World'}; //这是一个对象，注意键名也是可以使用引号包裹的
    var json = '{"a": "Hello", "b": "World"}'; //这是一个 JSON 字符串，本质是一个字符串
```
**JSON数据在不同语言进行传输时，类型为字符串，不同的语言各自也都对应有解析方法，需要解析完成后才能读取**

#### php处理json

- php关联数组==> json

```php
// php的关联数组
$obj = array(
  "a"=>"hello",
  "b"=>"world",
  "name"=>"胡聪聪"
);
//json字符串
$json = json_encode($obj);
echo $json;
```

- json===>php对象

```php
$json = '{"a": "Hello", "b": "World"}';//json字符串
//第一个参数：json字符串
//第二个参数：
	//false，将json转换成对象(默认)
	//true：将对象转换成数组(推荐)
$obj = json_decode($json,true);
echo $obj['a'];

//通过json文件获取到的内容就是一个json字符串。
$data = file_get_contents("data.json");
//将json转换成数组
$result = json_decode($data, true);
print_r($result);
```




####  JS处理json

+ JS对象 ==> JSON字符串 JSON.stringify(obj)
```javascript
    //obj是一个js对象
    var obj = {a: 'Hello', b: 'World'}
    //result就变成了一个json字符串了
    var result = JSON.stringify(obj);// '{"a": "Hello", "b": "World"}'
```


+ JSON字符串 ==> JS对象  JSON.parse(obj)
```javascript
    //json是一个json字符串
    var json = '{"a": "Hello", "b": "World"}';
    //obj就变成了一个js对象
    var obj = JSON.parse(json);// {a: 'Hello', b: 'World'}
```



使用json进行数据传输

思考：

1. js有一个对象，如何发送到php后台
2. php中有一个对象，如何发送到前台。



【案例：获取表格数据.html】



## 兼容性处理

```javascript
var xhr = null;
if(XMLHttpRequest){
  //现代浏览器
  xhr = new  XMLHttpRequest();
}else{
  //IE5.5支持
  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
```

**前后端分离**

​	我们使用php动态渲染页面时，有很多比较麻烦的地方。

- 在前端写好页面以后，需要后台进行修改，意味这后端程序员也需要懂前端的知识，其实渲染的工作应该交给前端来做。
- 前端没有写好页面的话，后端无法开始工作，需要等待前端的页面完成之后才能开始工作，拖延项目 的进度。
- 在客户端设备多元化的情况下，后台渲染的页面无法满足所有用户的需求
- 前后端代码混合在一个文件中，项目修改和维护成本高​



## 封装ajax工具函数

> 每次发送ajax请求，其实步骤都是一样的，重复了大量代码，我们完全可以封装成一个工具函数。

```javascript
//1. 创建xhr对象
//2. 设置请求行
//3. 设置请求头
//3. 设置请求体
//4. 监听响应状态
//5. 获取响应内容
```

### 参数提取


| 参数名      | 参数类型     | 描述      | 传值           | 默认值                                    |
| -------- | :------- | ------- | ------------ | -------------------------------------- |
| type     | string   | 请求方式    | get/post     | 只要不传post，就是get                         |
| url      | string   | 请求地址    | 接口地址         | 如果不传地址，不发送请求                           |
| data     | object   | 请求数据    | `{key:valu}` | 需要把这个对象拼接成参数的格式 uname=hucc&upass=12345 |
| callback | function | 渲染数据的函数 | 函数           | 空                                      |

### 完整代码

```js
var $={
      ajax:function(obj){
        //获取用户的参数
        var type=obj.type||'get'; //默认请求方式是get
        var url=obj.url||location.href; //默认请求当前页面
        var callback=obj.callback;
        //1-js中使用对最方便接受的参数是对象，但是传递给服务器的格式 name=zs&age=18
        var data=this.setParam(obj.data); //name=zs&age=18

        // console.log(data);
        //封装ajax公共代码部分
        //1-创建XMLHttpRequest对象
        var xhr=new XMLHttpRequest();

        //模拟http协议
        //如果是get请求在url后面拼接参数
        if(type=='get'){
            url=url+'?'+data;
            data=null;
        }
        //1-请求行
        xhr.open(type,url);
        //2-请求头 post 必须设置请求头
        if(type=='post'){
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        }
        //3-请求主体
        xhr.send(data);

        //监听服务器的响应
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 &&xhr.status==200){
                var r=xhr.responseText;//获取响应主体
                //r中就是服务器返回核心数据 需要渲染
                callback&&callback(r);
            }
        }
    },
  	
    //将对象转成 name=zs&age=18
    setParam:function(obj){
        
        if(typeof obj =='object'){ 
            var str='';                  
            for(var k in obj){
                str+=k+'='+obj[k]+'&';
            }
            str=str.substr(0,str.length-1); //参数一：开始索引 参数二：截取长度
        }

        return str;//返回转换后的字符串
    }
};        
```



## jQuery中的ajax方法

> jQuery为我们提供了更强大的Ajax封装

### $.ajax

参数列表

| 参数名称       | 描述       | 取值                  | 示例                                |
| ---------- | -------- | ------------------- | --------------------------------- |
| url        | 接口地址     |                     | url:"02.php"                      |
| type       | 请求方式     | get/post            | type:"get"                        |
| timeout    | 超时时间     | 单位毫秒                | timeout:5000                      |
| dataType   | 服务器返回的格式 | json/xml/text(默认)   | dataType:"json"                   |
| data       | 发送的请求数据  | 对象                  | data:{name:"zs", age:18}          |
| beforeSend | 调用前的回调函数 | function(){}        | beforeSend:function(){ alert(1) } |
| success    | 成功的回调函数  | function (data) {}  | success:function (data) {}        |
| error      | 失败的回调函数  | function (error) {} | error:function(data) {}           |
| complete   | 完成后的回调函数 | function () {}      | complete:function () {}           |



使用示例：

```javascript
$.ajax({
  type:"get",//请求类型
  url:"02.php",//请求地址
  data:{name:"zs", age:18},//请求数据
  dataType:"json",//希望接受的数据类型
  timeout:5000,//设置超时时间
  beforeSend:function () {
    //alert("发送前调用");
  },
  success:function (data) {
    //alert("成功时调用");
    console.log(data);
  },
  error:function (error) {
    //alert("失败时调用");
    console.log(error);
  },
  complete:function () {
    //alert("请求完成时调用");
  }
});
```
【案例：登录案例.html】

### 其他api(了解)

```javascript
//$.post(url, callback, [dataType]);只发送post请求
//$.get(url, callback, [dataType]);
//$.getJSON(url, callback);
//$.getScript(url,callback);//载入服务器端的js文件
//$("div").load(url);//载入一个服务器端的html页面。
```



### 接口化开发

请求地址即所谓的接口，通常我们所说的接口化开发，其实是指一个接口对应一个功能， 并且严格约束了**请求参数** 和**响应结果** 的格式，这样前后端在开发过程中，可以减少不必要的讨论， 从而并行开发，可以极大的提升开发效率，另外一个好处，当网站进行改版后，服务端接口进行调整时，并不影响到前端的功能。



#### 注册接口

**表单序列化**

jquery提供了一个`serialize()`方法序列化表单，说白就是将表单中带有name属性的所有参数拼成一个格式为`name=value&name1=value1`这样的字符串。方便我们获取表单的数据。

```javascript
//serialize将表单参数序列化成一个字符串。必须指定name属性
//name=hucc&pass=123456&repass=123456&mobile=18511249258&code=1234
$('form').serialize();

```

**jquery的ajax方法，data参数能够直接识别表单序列化的数据`data:$('form').serialize()`**

```javascript
$.post({
  url:"register.php",
  data:$('form').serialize(),
  dataType:'json',
  success:function (info) {
    console.log(info);
  }
});
```



**需求文档**

```javascript
//注册功能
//总需求：点击注册按钮，向服务端发送请求
//需求1:表单校验
  //1.1 用户名不能为空，否则提示"请输入用户名"
  //1.2 密码不能为空，否则提示"请输入密码"
  //1.3 确认密码必须与密码一直，否则提示"确认密码与密码不一致"
  //1.4 手机号码不能为空，否则提示"请输入手机号码";
  //1.5 手机号码格式必须正确，否则提示"手机号格式错误"
  //1.6 短信验证码必须是4位的数字，否则提示"验证码格式错误"
//需求2：点击注册按钮时，按钮显示为"注册中...",并且不能重复提交请求
//需求3：根据不同响应结果，处理响应
	 //3.1显示注册结果
```



# 模板引擎

> 是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的HTML文档。

## 为什么要使用模板引擎

我们通过ajax获取到数据后，需要把数据渲染到页面，在学习模板引擎前，我们的做法是大量的拼接字符串，对于结构简单的页面，这么做还行，但是如果页面结构很复杂，使用拼串的话**代码可阅读性非常的差，而且非常容易出错，后期代码维护也是相当的麻烦。** 

【演示：使用拼串进行渲染的缺点.html】

作用：代替前面渲染数据是拼接字符串操作

实际工作渲染数据使用的模板引擎 



## 常见的模板引擎

BaiduTemplate：http://tangram.baidu.com/BaiduTemplate/
velocity.js：https://github.com/shepherdwind/velocity.js/
ArtTemplate：https://github.com/aui/artTemplate

artTemplate是使用最广泛，效率最高的模板引擎，需要大家掌握。



## artTemplate的使用

[github地址](https://github.com/aui/art-template)

[中文api地址](https://aui.github.io/art-template/docs/)

### artTemplate入门

**1.引入模板引擎的js文件** 

```javascript
<script src="template-web.js"></script>
```

**2.准备模板** 

```html
<!--
  指定了type为text/template后，这一段script标签并不会解析，也不会显示。
-->
<script type="text/template" id="tmp">
  <p>姓名：{{ username }}</p>  
  <p>年龄：{{ age }}</p>
  <p>技能：{{ skill }}</p>
  <p>描述：{{desc }}</p>
</script>
```

**3.准备数据**

```javascript
//3. 准备数据,数据是后台获取的，可以随时变化
var json = {
  userName:"隔壁老王",
  age:18,
  skill:"查水表",
  desc:"年轻气壮"
}
```

**4.将模板与数据进行绑定**

```javascript
//第一个参数：模板的id
//第二个参数：数据
//返回值：根据模板生成的字符串。
var html = template("myTmp", json);
console.log(html);
```


**5.将数据显示到页面**

```javascript
var div = document.querySelector("div");
div.innerHTML = html;
```

**注意：传递给模板引擎的数据必须是对象**

### artTemplate语法

**if语法**

```html
{{if gender='男'}}
  <div class="man">
{{else}}
  <div class="woman">
{{/if}}
```

**each语法**

```html
<!--
  1. {{each data}}  可以通过$value 和 $index获取值和下标
  2. {{each data v i}}  自己指定值为v，下标为i
-->
{{each data v i}}
<li>
  <a href="{{v.url}}">
    <img src="{{v.src}}" alt="">
    <p>{{v.content}}</p>
   </a>
 </li>
{{/each}}
```

```javascript
//如果返回的数据是个数组，必须使用对象进行包裹，因为在{{}}中只写书写对象的属性。
var html = template("navTmp", {data:info});
```



# 瀑布流案例

## 封装jQuery瀑布流插件

```javascript
//特点分析：
//1. 页面中每个图片模块使用绝对定位，所以每个图片的位置，都是动态计算出来的；
//2. 每列直接会有间隙， 列数=容器的宽度/（一列的宽度+间隙）

//思路分析：
//1. 获取所有的图片模块，算出列数
//2. 初始化一个数组，用户存储每一列的高度 [0,0,0,0,0]
//3. 查找数组的最小列，每次都把图片定位到最小列的位置
//4. 更新数组最小列的高度（加上定位过来的图片的高度）
```



代码参考：

```javascript
//向jQuery的原型中添加方法 
$.fn.waterFall=function(option){

    var data=option.gap||20;
   
    //1-获取页面中所有item 逐一进行定位
    var  items=$(this).children();
    // 获取第一个item的宽度 225 
    var width=items.width();
    //列数
    var  count=Math.floor($(this).width()/(width+data.gap));

    //数组记录列高
    var column=[];
	
    //遍历给所有的 item进行定位
    // index 索引值，ele当前遍历元素
    items.each(function(index,ele){
        //第一行
        // top：0  left:index*(width+gap);
        if(index<count){ //第一行
            $(ele).css({
                top:0,
                left:index*(width+data.gap)
            })
            column[index]=$(ele).height()+data.gap; //更新列高
            // console.log(column);
        }else{
            //其他图片 一个一个找最小列高进行排列
            //先找最小列高
            var minHeight=column[0];
            var minKey=0;
            for(var i=0;i<column.length;i++){
                if(column[i]<minHeight){
                    minHeight=column[i]; //记录列高最小值
                    minKey=i; //记录最小列索引
                }
            }
            //设置当前图片的坐标
            $(ele).css({
                top:minHeight, //最小列的列高
                left:minKey*(width+data.gap) //最小列的索引值*（宽度+边距）
            })
            //更新列高
            column[minKey]+=$(ele).height()+data.gap;
        }
    })
	
    
    //求出所有列的最大值
    var maxHeight=column[0];
    for(var i=0;i<column.length;i++){
        if(column[i]>maxHeight){
            maxHeight=column[i];
        }
    }
  	
    //设置items的高度
    $('.items').height(maxHeight);
}
```



## 瀑布流完整版

```javascript
//需求分析：
//1. 页面刚开始，没有任何一张图片。因此需要从通过ajax获取第一屏的图片
//2. 使用模版引擎将获取到的数据渲染到页面
//3. 点击加载更多获取下一屏的数据
//4. 给window注册scroll事件，当触底时，需要动态的加载图片。
//5. 加载时，显示加载中的提示信息，并且要求不能重复发送ajax请求
//6. 当服务端返回图片数量为0时，提示用户没有更多数据。
```



接口文档

```javascript
接口地址: 
	./data.php
请求方式：
	post
请求的参数： 
	page:请求的页码   
返回数据格式(json)：
	page:下一页的页码
	items：返回的图片数据集合
```



# 同源与跨域

## 同源

不同源 则跨域 

### 同源策略的基本概念

> 1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。
> 同源策略：最初，它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。现在浏览器的所谓"同源"指的是"三个相同":

```javascript
协议相同
域名相同
端口相同
```

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下。

```javascript
//http://www.example.com/dir2/other.html：同源
//http://example.com/dir/other.html：不同源（域名不同）
//http://v2.www.example.com/dir/other.html：不同源（域名不同）
//http://www.example.com:81/dir/other.html：不同源（端口不同）
```

### 同源策略的目的

> 同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。


### 同源策略的限制范围

> 随着互联网的发展，“同源策略”越来越严格，目前，如果非同源，以下三种行为都将收到限制。

```javascript
//1. Cookie、LocalStorage 无法读取。
//2. DOM 无法获得。
//3. AJAX 请求不能发送。
```

虽然这些限制是很有必要的，但是也给我们日常开发带来不好的影响。比如实际开发过程中，往往都会把服务器端架设到一台甚至是一个集群的服务器中，把客户端页面放到另外一个单独的服务器。那么这时候就会出现不同源的情况，如果我们知道两个网站都是安全的话，我们是希望两个不同源的网站之间可以相互请求数据的。这就需要使用到**跨域** 。

## 跨域

【演示跨域问题.html】

### jsonp

> JSONP(JSON with Padding)、可用于解决主流浏览器的跨域数据访问的问题。原理：服务端返回一个预先定义好的javascript函数的调用，并且将服务器的数据以该函数参数的形式传递过来，这个方法需要前后端配合。

`script` 标签是不受同源策略的限制的，它可以载入任意地方的 JavaScript 文件，而并不要求同源。类似的还有`img`和`link`标签

```html
<!--不受同源策略的标签-->
<img src="http://www.api.com/1.jpg" alt="">
<link rel="stylesheet" href="http://www.api.com/1.css">
<script src="http://www.api.com/1.js"></script>
```

#### jsonp演化过程


jsonp原理大家知道即可，不用太过于去纠结这个原理，因此jquery已经帮我们封装好了，我们使用起来非常的方便。

### jquery对于jsonp的封装

```javascript
//使用起来相当的简单，跟普通的get请求没有任何的区别，只需要把dataType固定成jsonp即可。
$.ajax({
  type:"get",
  url:"http://www.api.com/testjs.php",
  dataType:"jsonp",
  data:{
    uname:"hucc",
    upass:"123456"
  },
  success:function (info) {
    console.log(info);
  }
});
```

【案例：查询天气.html】

http://lbsyun.baidu.com/index.php?title=car/api/weather

[天气查询api地址](https://www.jisuapi.com/api/weather/)

秘钥：zVo5SStav7IUiVON0kuCogecm87lonOj

图灵机器人：http://www.tuling123.com/




# XMLHttpRequest 2.0

> XMLHttpRequest是一个javascript内置对象，使得Javascript可以进行异步的HTTP通信。2008年2月，就提出了XMLHttpRequest Level 2 草案。

老版本的XMLHttpRequest的缺点：

```javascript
//1. 仅支持传输文本数据，无法传说二进制文件，比如图片视频等。
//2. 传输数据时，没有进度信息，只能提示完成与否。
//3. 受到了"同源策略"的限制
```



新版本的功能：

```javascript
//1. 可以设置timeout 超时时间
//2. 可以使用formData对象管理表单数据
//3. 可以获取数据传输的进度信息
```

**注意：我们现在使用new XMLHttpRequest创建的对象就是2.0对象了，我们之前学的是1.0的语法，现在学习一些2.0的新特性即可。**  

## timeout设置超时

```javascript
xhr.timeout = 3000;//设置超时时间
xhr.ontimeout = function(){
  alert("请求超时");
}
```



## formData管理表单数据

> formData对象类似于jquery的serialize方法，用于管理表单数据

```javascript
//使用特点： 
//1. 实例化一个formData对象， new formData(form); form就是表单元素
//4. formData对象可以直接作为 xhr.send(formData)的参数。注意此时数据是以二进制的形式进行传输。
//5. formData有一个append方法，可以添加参数。formData.append("id", "1111");
//6. 这种方式只能以post形式传递，不需要设置请求头，浏览器会自动为我们设置一个合适的请求头。
```



代码示例：

```javascript
//1. 使用formData必须发送post请求
    xhr.open("post", "02-formData.php");
    
//2. 获取表单元素
var form = document.querySelector("#myForm");
//3. 创建form对象，可以直接作为send的参数。
var formData = new FormData(form);

//4. formData可以使用append方法添加参数
formData.append("id", "1111");

//5. 发送，不需要指定请求头，浏览器会自动选择合适的请求头
xhr.send(formData);
```



## 文件上传

> 以前，文件上传需要借助表单进行上传，但是表单上传是同步的，也就是说文件上传时，页面需要提交和刷新，用户体验不友好，xhr2.0中的formData对象支持文件的异步上传。

```javascript
var formData = new FormData();
//获取上传的文件，传递到后端
var file = document.getElementById("file").files[0];
formData.append("file", file);
xhr.send(formData);
```



## 显示文件进度信息

> xhr2.0还支持获取上传文件的进度信息，因此我们可以根据进度信息可以实时的显示文件的上传进度。

```javascript
1. 需要注册 xhr.upload.onprogress = function(e){} 事件，用于监听文件上传的进度.注意：需要在send之前注册。
2. 上传的进度信息会存储事件对象e中
3. e.loaded表示已上传的大小   e.total表示整个文件的大小
```



代码参考：

```javascript
xhr.upload.onprogress = function (e) {
  
  inner.style.width = (e.loaded/e.total*100).toFixed(2)+"%";
  span.innerHTML = (e.loaded/e.total*100).toFixed(2)+"%";
}

xhr.send(formData);
```

如果上传文件超过8M，php会报错，需要进行设置，允许php上传大文件。

![](image/php.png)



## 跨域资源共享(CORS)

### cors的使用

> 新版本的XMLHttpRequest对象，可以向不同域名的服务器发出HTTP请求。这叫做["跨域资源共享"](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing)（Cross-origin resource sharing，简称CORS）。

跨域资源共享（CORS）的前提

- 浏览器支持这个功能
- 服务器必须允许这种跨域。

服务器允许跨域的代码：

```php
//允许所有的域名访问这个接口
header("Access-Control-Allow-Origin:*");
//允许www.study.com这个域名访问这个接口
header("Access-Control-Allow-Origin:http://www.study.com");
```



### CORS的具体流程（了解）

1. 浏览器会根据**同源策略** 查看是否是跨域请求，如果同源，直接发送ajax请求。
2. 如果非同源，说明是跨域请求，浏览器会自动发送一条请求（**预检请求** ），并不会携带数据，服务器接受到请求之后，会返回请求头信息，浏览器查看返回的响应头信息中是否设置了`header('Access-Control-Allow-Origin:请求源域名或者*');`
3. 如果没有设置，说明服务器不允许使用cors跨域，那么浏览器不会发送真正的ajax请求。
4. 如果返回的响应头中设置了`header('Access-Control-Allow-Origin:请求源域名或者*');`,浏览器会跟请求头中的`Origin: http://www.study.com`进行对比，如果满足要求，则发送真正的ajax请求，否则不发送。
5. 结论：**跨域行为是浏览器行为，是浏览器阻止了ajax行为。服务器与服务器之间是不存在跨域的问题的**


【案例：图灵机器人】


### 其他的跨域手段（没卵用）

以下方式基本不用，了解即可：

1、顶级域名相同的可以通过domain.name来解决，即同时设置 domain.name = 顶级域名（如example.com）
2、document.domain + iframe
3、window.name + iframe
4、location.hash + iframe
5、window.postMessage()

[其他跨域方式](http://rickgray.me/2015/09/03/solutions-to-cross-domain-in-browser.html)

### 虚拟主机配置

在一台web服务器上，我们可以通过配置虚拟主机，然后分别设定根目录，实现对多个网站的管理。

具体步骤如下：

**1.找到http.conf文件**

找到470行，去掉`#`号注释

```javascript
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```



**2.找到`httpd-vhosts.conf`文件**

在目录：D:\phpStudy\Apache\conf\extra下找到httpd-vhosts.conf文件

```javascript
# 默认的虚拟主机
<VirtualHost _default_:80>
  DocumentRoot "C:\www\study"
  <Directory "C:\www\study">
    Options +Indexes +FollowSymLinks +ExecCGI
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
  </Directory>
</VirtualHost>

# Add any other Virtual Hosts below
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    #根目录
    DocumentRoot "C:\www\show"
    #域名
    ServerName show.com
    #完整域名
    ServerAlias www.show.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>   
```
