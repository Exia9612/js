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
# css(cascading style sheet 层叠样式表)
## 语法
> 选择器: {
>   属性名: 属性值
> }
## 类型
### 权重
> 内联样式 > 内部样式表 > 外部样式表
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