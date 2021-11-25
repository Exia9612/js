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