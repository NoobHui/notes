# DOCTYPE有什么作用？
告诉浏览器使用哪个版本的HTML规范来渲染文档。DOCTYPE不存在或形式不正确会导致HTML文档以混杂模式呈现。标准模式（Standards mode）以浏览器支持的最高标准运行；混杂模式（Quirks mode）中页面是一种比较宽松的向后兼容的方式显示。
# 常用标签的display属性
- 行内元素：a span img（可以设置宽高，是置换元素）
- 行内块元素：input select
- 块级元素：div ul ol li dl dt dd h1 p
- 空元素(单标签)：br hr link meta
# 页面导入样式时，使用link和@import有什么区别
- @import导入CSS文件会等到文档加载完后再加载CSS样式表。因此，在页面DOM加载完成到CSS导入完成之间会有一段时间页面上的内容是没有样式的。
- 使用link标签加载CSS样式文件。因为link是顺序加载的，这样页面会等到CSS下载完之后再下载HTML文件，这样先布局好，就不会出现FOUC(无样式内容闪烁)问题。
- link属于XHTML标签，import是CSS提供的方式,需要在style标签中或者另外一个css文件中使用。link方式除了CSS，还可以定义RSS，定义rel连接属性等，而import只能加载CSS
- @improt导入的优先级低
# 对浏览器内核的理解
- 主要分成两部分：渲染引擎(Layout Engine或Rendering Engine)和JS引擎。

- 渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
- JS引擎：解析和执行javascript来实现网页的动态效果。最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。
# 常见的浏览器内核有哪些
- ie trident
- 火狐 gecko
- chrome blink
- safari webkit
- opera blink
# HTML5有哪些新特性
- DOCTYPE声明的方式是区分重要因素
- canvas
- 用于媒介回放的video和audio元素
- 本地离线存储。localStorage长期存储数据，浏览器关闭后数据不丢失;sessionStorage的数据在浏览器关闭后自动删除
- 语意化更好的内容元素，比如 article footer header nav section
- 拖放API：drag、drop
# cookies，sessionStorage和localStorage的区别
## 共同点：都是保存在浏览器端，且是同源的。

## 区别：
- cookies是为了标识用户身份而存储在用户本地终端上的数据，始终在同源http请求中携带，即cookies在浏览器和服务器间来回传递，而sessionstorage和localstorage不会自动把数据发给服务器，仅在本地保存。
- 存储大小的限制不同。cookie保存的数据很小，不能超过4k，而sessionstorage和localstorage保存的数据大，可达到5M。
- 数据的有效期不同。cookie在设置的cookie过期时间之前一直有效，即使窗口或者浏览器关闭。sessionstorage仅在浏览器窗口关闭之前有效。localstorage始终有效，窗口和浏览器关闭也一直保存，用作长久数据保存。
- 作用域不同。cookie在所有的同源窗口都是共享；sessionstorage不在不同的浏览器共享，即使同一页面；localstorage在所有同源窗口都是共享

# 语义化标签
## 为什么要语义化？
- 代码结构: 使页面没有css的情况下，也能够呈现出很好的内容结构
- 有利于SEO: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
- 提升用户体验： 例如title、alt可以用于解释名称或者解释图片信息，以及label标签的灵活运用。
- 便于团队开发和维护: 语义化使得代码更具有可读性，让其他开发人员更加理解你的html结构，减少差异化。
- 方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。

## 常见HTML标签语义
- title是网站的标题，不显示，不影响布局。而h表示网页内的标题，是面向用户的。两者都对seo有影响
- strong标明重点内容，语气加强含义；b是无意义的视觉表示
- em表示强调文本；i是斜体，是无意义的视觉表示
- 视觉样式标签：b i u s
- 语义样式标签：strong em ins del code
# 浏览器的渲染过程：
完整流程：向dns服务器请求网址的IP地址 2. 通过80端口向目标IP地址发送http请求 3. 目标服务器接受请求，将请求内容封装在http响应报文中并发送 4. 接受http响应报文并解析，然后在浏览器上显示出来
- 解析HTML，构建DOM tree
- 解析CSS（CSS 解析是把 CSS 规则应用到 DOM 树上，为 DOM 结构添加显示相关属性的过程），构建CSSOM tree
- 合并DOM tree和CSSOM tree，生成render tree
- 布局（layout/reflow），计算各元素尺寸、位置
- 绘制（paint/repaint），绘制页面像素信息
- 浏览器将各层的信息发送给GPU，GPU将各层合成，显示在屏幕上