# css画三角形/画圆形
- 目的：通过img标签的src或者background图片来引入性能不好，需要加载图片
- 实现：border border-radius
# 清除浮动
### 1、额外标签法（在最后一个浮动标签后，新加一个标签，给其设置clear：both；）（不推荐）
- 缺点：添加无意义标签，语义化差
### 2、父级添加overflow属性（父元素添加overflow:hidden）（不推荐）
- 缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素
### 3、伪元素清除法
# 垂直水平居中
- 1、定位+-margin   缺点：需要知道子元素的宽高
```
#outer {
      width: 800px;
      height: 800px;
      border: 2px solid cadetblue;
      position: relative;
    }

    #inner {
      width: 100px;
      height: 100px;
      background-color: cadetblue;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
    }
```
- 2、absolute + margin auto 缺点: 需要知道子元素的宽高
```
#outer {
      width: 800px;
      height: 800px;
      border: 2px solid cadetblue;
      position: relative;
    }

    #inner {
      width: 100px;
      height: 100px;
      background-color: cadetblue;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
```
### 3、absolute + calc 兼容性依赖calc的兼容性，缺点是需要知道子元素的宽高
```
#outer {
      width: 800px;
      height: 800px;
      border: 2px solid cadetblue;
      position: relative;
    }

    #inner {
      width: 100px;
      height: 100px;
      background-color: cadetblue;
      position: absolute;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
    }
```
### 4、absolute + transform 依赖translate2d的兼容性
```
#outer {
      width: 800px;
      height: 800px;
      border: 2px solid cadetblue;
      position: relative;
    }

    #inner {
      width: 100px;
      height: 100px;
      background-color: cadetblue;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
```
### 5、flex
### 6、行内元素line-hight+text-align
# 三列布局
### 1、两侧固定宽度浮动+中间自适应宽度+左右固定margin
```
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    #left {
      float: left;
      width: 100px;
      height: 200px;
      background-color: cadetblue;
    }

    #right {
      float: right;
      width: 100px;
      height: 200px;
      background-color: cadetblue;
    }

    #center {
      height: 500px;
      margin: 0 100px 0 100px;
      background-color: crimson;
    }
  </style>
</head>

<body>
  <div id="left"></div>
  <div id="right"></div>
  <div id="center"></div>
</body>
```
### 2、flex
```
body{
      height: 600px;
      display: flex;
    }
    #left{
      height: 200px;
      flex:0 0 100px;
      background-color: crimson;
    }
    #middle{
      flex: 1;
      background-color: cyan;
    }
    #right{
      height: 200px;
      flex:  0 0 100px;
      background-color: darkblue;
    }
  ```
  ### 3、两侧固定宽度绝对定位两侧+中间自适应宽度+中间盒子左右固定margin
  ### 4、全部一侧浮动+两侧宽度固定+中间calc（100% - 两侧宽度）
  ### 5、双飞翼布局
  ### 5、圣杯布局
  ```
    <style>
    * {
      margin: 0;
      padding: 0;
    }

    #container {
      width: 100%;
      padding: 0 100px;
      box-sizing: border-box;
    }

    #center {
      float: left;
      height: 600px;
      width: 100%;
      background-color: crimson;
    }

    #left {
      float: left;
      height: 200px;
      width: 100px;
      background-color: cyan;
      margin-left: -100%;
      position: relative;
      left: -100px;
    }

    #right {
      float: left;
      margin-left: -100px;
      height: 200px;
      width: 100px;
      background-color: darkcyan;
      position: relative;
      left: 100px;
    }
  </style>
</head>

<body>
  <div id="container">
    <div id="center"></div>
    <div id="left"></div>
    <div id="right"></div>
  </div>
</body>
```