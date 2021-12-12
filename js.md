# 浏览器历史和js关系 
## 浏览器
 IE         trident
 chrome     webkit
 safari     webkit
 firefox    gecko
 opera      presto
 edge       blink

##  浏览器历史和js诞生
1. 1990
> - 蒂姆 博纳斯 李，第一个网页浏览器World Wild Web，后移植到C语言 
> - libwww(真正意义上的浏览器)，允许浏览他人编写的网站
2. 1993
> - 美国伊利诺伊大学 马克 安德森 mosaic浏览器，可以显示图片，第一个图形化网站
3. 1994 
> - 马克 安德森和吉姆 克拉克共同创立mosaic公司(伊利诺伊大学将mosaic商标转让给spy glasee公司)，为避免因商标权产生的问题，mosaic公司该名为网景公司(Netscape)
4. 1996
> - 微软收购spy glass并开发了IE浏览器
> IE3 Jscript(脚本语言)
> 网景公司Brendan Eich在net navigator上开发了livescript，并和sun公司合作推广，因此更名为javascript
5. 2001
> - IE6 -> js引擎
6. 2003
> - mozilla公司开发firefox(netscape navigator开源)
7. 2008
> - google基于webkit开发了chrome，v8引擎(独立于浏览器运行，直接翻译机器码)
8. 2009
> - oracle公司收购了sun公司

## ECMA
- European Computer Manufactures Association(欧洲计算机制造联合会)
- ECMA-262 脚本语言规范 ECMAScript
- ES5 ES6 规范化脚本语言

## 编程语言
- 编译型 解释型 脚本语言

## Javascript
1. 组成
- ECMAScript(语法，类型，语句，关键字...): 由ECMA-262定义
- DOM(Document Object Model): 提供与网页内容交互的方法和接口(W3C规范)
- BOM(浏览器对象模型): 提供与浏览器交互的方法和接口(没有规范)
2. Js引擎
> - 轮转时间片，即短时间内轮流执行多个任务的片段 
![Image text](./img/js执行.png)
3. js引入
- 外部文件（通过src属性引入外部文件）
``` html
<script type="text/javascript" src="js/index.js">标签对内书写的js代码不会被执行</script>
```
- 内部文件
```html
<script type="text/javascript">标签对内书写的js代码会被执行</script>
```

## 变量
- 存储数据的容器
1. 声明和赋值
```javascript
// 变量声明 (向内存申请存储空间)
var a;
// 变量赋值
a = 3;  

// 变量声明并赋值 赋值运算符(=)
var b = 4;           

// 声明多个变量并赋值(变量之间用,隔开)
var c = 5,
    d = 6;           

// var 声明的变量允许被修改
var e = 1;
    e = 2;           
document.write(e);   // '2'

var sum = a + b;     // 先运算后赋值
document.write(sum); // '7'
```
2. 变量命名规范
- 不能以数字开头
- 以字母，_，$开头
- 不能使用关键字和保留字
- 语意化，结构化命名
- 小驼峰命名

## Js中值的类型
- 原始值
> - Number, String, Boolean, Undefined, null, Symbol, BigInt
- 引用值
> - object array function date Regexp
- 栈内存和堆内存
> - 栈内存
  > - 原始值存储在栈内存中
  > - 通过变量名获取栈内存中的原始值
  > - 每声明和重新赋值一个原始值，就在栈内存中开辟一个新的空间用来存放原始值
  ```javascript
  var num1 = 3;
  // 把num1的值赋值给num2
  // num2和num1是完全独立的
  var num2 = num1;
  ```
> - 堆内存
  > - 引用值存储在堆内存中
  > - 引用值的地址存储在栈内存中
  > - 引用值通过变量名获取到地址，访问引用值
  > - 引用值被赋值给另一个变量是赋值的其地址

![Image text](./img/内存.png)