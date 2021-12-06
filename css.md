# 浏览器
## 大型浏览器
>  - google chrome webkit/blink
>  - safari webkit
>  - firefox gecko
>  - IE trident
>  - opera presto
## 内核
> - 渲染引擎
> - JS解析引擎(V8最快)
## 渲染过程
![Image text](./img/brower.png)
## 浏览器解析css选择器逻辑
![Image text](./img/parsecss.png)
```html
<!DOCTYPE html>
  <html lang="zh-CHS">
    <head>
      <meta charset="UTF-8" />
      <style type="text/css">
        .mod_nav header h3 span {
          font-size: 15px;
        }
      </style>
    </head>
    <body>
      <div class="mod_nav">
        <header>
          <h3>
            <span>hello<span>
          </h3>
        </header>
        <div>
          <ul>
            <li><a href="">baidu</a></li>
          </ul>
          <ul>
            <li><a href="">baidu</a></li>
          </ul>
        </div>
      </div>
    </body>  
  </html>
```
> 对于css树，浏览器从下到上，从右到左解析。因为设计跨级css(.mod_nav span)，从上到下开销很大，有可能遍历所有节点。·

# css(cascading style sheet 层叠样式表)
## 语法
> 选择器: {
>   属性名: 属性值
> }

## 盒子模型
> - 宽高 + 内边距 + 边框 + 外边距
> - 可是区域： 宽高 + 内边距 * 2 + 边框 * 2
> - body自带margin(其它：8px，IE7：16px 11px, IE8: 16px 8px)
> - 改变可视区域的写法
```css
box-sizing: border-box ｜ content-box;
/* firefox */
-moz-box-sizing: border-box;
/* chrome 低版本safari */
-webkit-box-sizing: border-box;
/* IE8以下 */
-ms-box-sizing: border-box;
/* 内核为presto */
-o-box-sizing: border-box;
```

## 类型
### 权重
> 内联样式 > 内部样式表 > 外部样式表
> !important > id选择器 > 类选择器 ｜ 属性选择器 > 标签选择器 > 通配符选择器
### 权重计算
> \*            0
> 标签，伪元素    1
> 类，属性，伪类  10
> id            100
> 内联样式       1000
> ！important   无穷
### 内联样式
```html
  <div style="font-size: 14px;"></div>
```
### 内部样式表
```html
  <head>
    <style type="text/css">
      div: {
        font-size: 14px
      }
    </style>
  </head>
```
### 外部样式表
```html
  <head>
    <!-- rel:relation,表明link与html文档的关系 -->
    <link rel="stylesheet" type="text/css" href="path"/>
  </head>
```
## 选择器
### 通配符选择器
> 作用域所有标签，用于清除某人样式
```css
  * {
    margin: none;
  }
```
### 标签选择器
```css
  div {
    background-color: red;
  }
```
### 类选择器
```css
  .container {
    background-color: red;
  }
```
### 属性选择器
> 给所有带id的标签添加属性
```css
  [id] {
    background-color: red;
  }
```
> 给所有id=box的标签添加属性
```css
  [id="box"] {
    background-color: red;
  }
```
### 派生选择器
> id选择器 + id选择器不行
```css
  strong em {
    background-color: red;
  }
```
### 并列选择器
```css
  h1.title {
    background-color: red;
  }
```
```html
  <div class="box box1"></div>
```
```css
  .box.box1 {
    background-color: blue;
  }
```

## 样式
```html
  <!DOCTYPE html>
    <html lang="zh-CHS">
      <head>
        <meta charset="UTF-8" />
        <style type="text/css">
          input,
          textarea {
            outline: none;
            /* 下列样式很少用 */
            outline-color: red;
            outline-style: dotted;
            outline-width: 20px;
          }
        </style>
      </head>
      <body>
        <input type="text" />
        <br />
        <textarea cols="20" rows="30"></textarea>
      </body>  
    </html>
```
#### width min-width max-width
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        div {
            width: 100%;
            /* 小于该宽度时自动换行 */
            min-width: 1440px;
            /* 超过该宽度不在延长 */
            max-width: 1600px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div>11111111111111111111111111111111111111111111</div>
</body>
</html>
```
#### height min-height max-height overflow
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        div {
            width: 100%;
            /* 最小高度 */
            min-height: 1440px;
            /* 超过该高度不在延长 */
            max-height: 1600px;
            font-size: 16px;
            /* 溢出部分隐藏 */
            /* overflow: hidden; */
            /* 添加滚动条无论是否溢出, 滚动条宽度17p且占用盒子内宽度 */
            overflow: scroll;
            /* 溢出时添加滚动条 */
            overflow: auto;
        }
    </style>
</head>
<body>
    <div>11111111111111111111111111111111111111111111</div>
</body>
</html>
```
#### font-size font-weight font-style font-family color
> - font-size
>   - 浏览器默认字体大小16px 
>   - 字体大小设置的是高度，宽度是自动缩放的
> - font-weight
>   - 粗细并不随数字大小逐渐改变，仅在超过某些阈值时改变
>   - ligter normal bold bolder(不适用于所有字体)
> - font-style
>   - font-style: italic (斜体，适用有斜体的字体)
>   - font-style: oblique (倾斜，适用所有字体)
> - font-family
>   - arial通用字体，win和mac都安装的字体
#### border
> - 占据可视宽度
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        div {
            width: 0px;
            height: 0px;
            border-width: 100px;
            border-style: solid;
            /* 向右的三角形 */
            border-color: transparent ;
            border-left-color: wheat;
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```
#### 对齐
> - 针对有宽高的容器
> - text-align: left center right
> - line-height，默认22px
> - text-indent(文本缩进)
#### em
> - 相对大小，对应容器内字体大小的倍数
> - line-height: 1.2em设置行高为基础的1.2倍
#### cursor
> - 光标显示
```css
  cursor: pointer | not-allowed ...
```
#### 单行文本截断和显示省略号
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        div {
            width: 200px;
            height: 22px;
            border: 1px solid #000;
            /* 不换行 */
            white-space: nowrap;
            overflow: hidden;
            /* 隐藏部分加省略号 */
            text-overflow: ellipsis;
        }
    </style>
</head>
<body>
    <div>
      <span></span>
    </div>
</body>
</html>
```
#### display
> - 控制元素显示：block inline-block inline
> - 注意内联和内联块级元素的空格和换行会被转换为文本分隔符
> display: none和visiblity: hidden的区别
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        .box1 {
            width: 200px;
            height: 200px;
            background-color: blue;
            /* 保留在文档中占据的位置 */
            visibility: hidden;
            /* 不保留文档中的位置 */
            display: none;
        }

        .box2 {
          width: 200px;
            height: 200px;
            background-color: purple;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
</html>
```
> - 多行文本垂直居中
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
      div {
        display: table;
        width: 100px;
        height: 100px;
        border: 1px solid black;
      }

      span {
        display: table-cell;
        vertical-align: middle;
      }
  </style>
</head>
<body>
  <div class="box1">
    <span>111111111111111111111111111111111111111111111111</span>
  </div>
</body>
</html>
```

#### vertical-align
> - 解决行内块和行内元素文本对齐
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
      .block {
        display: inline-block;
        width: 150px;
        height: 150px;
        border: 1px solid black;
        /* top|middle|bottom|px */
        vertical-align: top;
      }
  </style>
</head>
<body>
    <span class="block">123</span>
    <span>123</span>
</body>
</html>
```

### 伪类选择器
#### hover
> - 控制鼠标悬浮时的样式
```css
div:hover {
  background-color: #333;
}
```
#### disbaled
> - 设置禁用时的样式
```css
div:disabled {
  background-color: #333;
}
```
#### checked
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        .checkbox {
            width: 40px;
            height: 40px;
            border: 1px solid black;
        }

        .checkbox label {
            display: block;
            width: 20px;
            height: 20px;
            margin: 10px;
            background-color: #000;
            opacity: 0;
            /* 兼容IE */
            filter: alpha(opacity=0);
        }

        .checkbox input[type="checkbox"] {
          display: none;
        }

        /* 相邻兄弟选择器：同父级 相邻 在其之后 */
        .checkbox input[type="checkbox"]:checked + label {
          opacity: 100;
          /* 兼容IE */
          filter: alpha(opacity=100);
        }
    </style>
</head>
<body>
    <div class="checkbox">
      <input type="checkbox" id="checkbox"/>
      <label for="checkbox"></label>
    </div>
</body>
</html>
```
#### focus
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        input {
          outline: none;
        }

        input:focus {
          border: 1px solid green;
        }
    </style>
</head>
<body>
    <input type="text" />
</body>
</html>
```
#### first-child last-child
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        div span:first-child {
          color: red;
        }

        div span:last-child {
          color: red;
        }
    </style>
</head>
<body>
    <div>
      <span>123<span>
      <span>123<span>
      <span>123<span>
      <span>123<span>
      <span>123<span>
    </div>
</body>
</html>
```
#### nth-child
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
      table {
        width: 300px;
      }

      table tr:nth-child(even) {
        background-color: #efefef;
      }
    </style>
</head>
<body>
    <table>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
    </table>
</body>
</html>
```

### 定位
#### 绝对定位
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        .box1 {
          /* 绝对定位之后，元素在新建图层上 */
          position: absolute;
          left: 10px;
          top: 20px;
          width: 100px;
          height: 100px;
          background-color: green:
        }

        .box2 {
          width: 200px;
          height: 200px;
          background-color: orange:
        }
    </style>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
</html>
```

#### 相对定位
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        .box1 {
          /* 相对定位现对于自身原本的位置，定位之后，元素也在新建图层但保留原涂层的位置 */
          position: relative;
          left: 10px;
          top: 20px;
          width: 100px;
          height: 100px;
          background-color: green:
        }

        .box2 {
          width: 200px;
          height: 200px;
          background-color: orange:
        }
    </style>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
</html>
```

#### 定位的两栏设计
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        html, body {
          height: 100%;
          margin: 0;
          overflow-y: hidden;
        }

        .left {
          margin-right: 300px;
          height: 100%;
          background-color: green;
        }

        .right {
          position: absolute;
          right: 0;
          top: 0;
          width: 300px;
          height: 100%;
          background-color: orange;
        }
    </style>
</head>
<body>
    <div class="left"></div>
    <div class="right"></div>
</body>
</html>
```

### 浮动
> - 浮动元素不新建图层
> - 和绝对定位一样，浮动元素只会影响后面元素的布局
> - float之后块级元素变成内联块
> - 块级元素无法识别浮动元素的位置
> - 内联、内联块、浮动元素、溢出隐藏元素和纯文本可以识别浮动元素位置
#### 清除浮动
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        html, body {
          height: 100%;
          margin: 0;
          overflow-y: hidden;
        }

        .box {
          width: 600px;
          height: 100px;
          border: 10px solid #000;
        }

        .left {
          margin-right: 300px;
          width: 300px;
          height: 100px;
          background-color: green;
        }

        .right {
          width: 300px;
          height: 100px;
          background-color: orange;
        }

        .clearfix {
          /* 必须在块级元素下才能清除元素 */
          clear: both;
        }
    </style>
</head>
<body>
  <div class="box">
    <div class="left"></div>
    <div class="right"></div>
    <p class="clearfix"></p>
  </div>
</body>
</html>
```

### 伪元素和伪类
> - 一个冒号开头
> - :before :after
> - 必须带有content属性 
> - ::伪元素
> - 伪元素是内联元素
> - before在较低图层，after在较高图层
 ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        p:before {
          content: 'I';
        }

        p:after {
          content: 'iron man';
        }
    </style>
</head>
<body>
  <p>am</p>
</body>
</html>
```
> - 利用伪元素清除伪类
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        ul::after, div::after {
            content: "";
            /* 
                块级元素才能清除浮动
                after伪元素会放到父级元素的末尾
            */
            display: block;
            clear: both;
        }

        .box {
            width: 200px;
            border: 1px solid #000;
        }

        .box1 {
            float: left;
            width: 100px;
            height: 100px;
            background-color: green;
        }

        .box2 {
            float: left;
            width: 100px;
            height: 100px;
            background-color: orange;
        }
    </style>
</head>
<body>
    <div class="box">
        <div class="box1"></div>
        <div class="box2"></div>
    </div>
</body>
</html>
```
> - 利用伪类传递数据
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        p:before {
          content: attr(data-username)
        }
    </style>
</head>
<body>
    <p data-username="isaac">, welcome</p>
</body>
</html>
```

### box-shadow
> - box-shadow: 水平位置(必填) 垂直位置(必填) 模糊距离 阴影尺寸 阴影颜色 阴影种类
> - 水平偏移(默认往左) 垂直偏移(默认往下)控制阴影在x y 轴的水平偏移量
> - 模糊距离控制阴影的清晰度
> - 阴影尺寸：在阴影为偏移时扩展阴影
> - 不占据文档流空间，所以可能会侵占其它元素的空间，可以给附近元素添加相对定位解决
```css
box {
  position: relative;
  z-index: 2;
}
```

### logo写法
> - 常用background-color，有缓存机制
> - img 每一次加载都需要请求，对弱网环境不友好
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
    /* 通过content-box,内边距独立与宽高之外来处理css加载不出时，logo显示问题 */
    h1 {
      margin: 0;
    }

    .logo {
      width: 142px;
      height: 58px;
      border: 1px solid #000000;
    }

    .logo h1 .logo-hd {
      display: block;
      width: 142px;
      height: 0;
      padding-top: 58px;
      background: url(img/logo.png) no-repeat 0 0/142px 58px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div class="logo">
    <h1>
      <a href="" class="logo-hd">logo</a>
    </h1>
  </div>
</body>
</html>
```

### table的一些写法
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
    table {
      width: 300px;
      height: 300px;
      /* 单元格没有边框 */
      border: 1px solid #000;
      caption-side: bottom;
      /* 合并边框 */
      border-collapse: collapse;
      /* 固定单元格 */
      table-layout: fixed;
    }

    table tr td:nth-child(2) {
      text-align: center;
    }
  </style>
</head>
<body>
  <caption>测试表格</caption>
  <table border="1">
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
    <tr>
      <td>7</td>
      <td>8</td>
      <td>9</td>
    </tr>
  </table>
</body>
</html>
```

### ul模拟表格
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }

    /* .table {
      width: 300px;
    } */

    /* .table li {
      float: left;
      width: 101px;
      height: 101px;
      margin: -1px 0 0 -1px;
      border: 1px solid #000;
      box-sizing: border-box;
    } */

    .table {
      width: 300px;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
    }

    .table li {
      float: left;
      width: 100px;
      height: 100px;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <ul class="table clearfix">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</body>
</html>
```

## BFC
> - block formatting context(块级元素上下文)
> - 普通流(normal flow)
> - 浮动流(float) 脱离普通流
> - 绝对定位(absolute positioning) 脱离文档流，位于新图层
> - bfc解决css一些问题
> - 成为bfc元素的必要条件
>> - body float position(fixed absolute)
>> - display: flex inline-block table-cell
>> - overflow: hidden auto scroll
### 外边距合并
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
    .container {
      /* bfc元素解决外边距塌陷的问题 */
      overflow: hidden;
    }

    .box {
      width: 100px;
      height: 100px;
    }

    .box1 {
      background-color: green;
      margin-bottom: 100px;
    }

    .box2 {
      margin-top: 100px;
      background-color: orange;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box box1"></div>
  </div>
  <div class="container">
    <div class="box box2"></div>
  </div>
</body>
</html>
``` 

### 浮动高度塌陷
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
    .box {
      /* bfc撑开盒子高度 */
      position: fixed;
      width: 200px;
      border: 10px solid #000 ;
    }

    .box1 {
      float: left;
      width: 100px;
      height: 100px;
      background-color: green;
    }

    .box2 {
      float: left;
      width: 100px;
      height: 100px;
      background-color: orange;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="box1"></div>
    <div class="box2"></div>
  </div>
</body>
</html>
```

### 内边距塌陷
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style type="text/css">
    .box1 {
      width: 300px;
      height: 300px;
      background-color: black;
      overflow: hidden;
    }

    .box2 {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      /* 父级元素会受影响 */
      margin-top: 100pc;
      background-color: orange;
    }
  </style>
</head>
<body>
  <div class="box1">
    <div class="box2"></div>
  </div>
</body>
</html>
```

### 浮动元素覆盖

## css 属性书写顺序
> - 显示属性：display position float clear
> - 自身属性：width height margin padding border background
> - 文本属性：color font text-align vertical-align whitespace