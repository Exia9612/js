# Dom
## Dom说明
- 文档对象模型
- 提供操作HTML/XML的一套规范，DOM不能直接操作CSS

## JS对象
1. 本地对象
  - Object Function Array String Number Boolean Error EvalError SyntaxError RangeError ReferenceError TypeError RangeError Date RegExp
2. 内置对象(Build-in Object)
  - Global Math
  - isNaN parseInt Number DecoreURI encodeURI Infinity NaN undefined
  - 本地对象和内置对象都是ES内部对象
3. 宿主对象(Host Object)
  - 执行JS脚本的环境提供的对象，不同浏览器可能实现不同，存在兼容性问题
  - BOM DOM

## 节点
  - 节点(node)包含元素(element)也成为元素节点或DOM元素
  - 节点种类
    1. 元素节点 1
    2. 属性节点 2
    3. 文本节点 3
    4. 注释节点 8
    5. document 9
    6. DocumentFragment 11
### 节点属性
  1. nodeType
  - 只读
  - 获取节点种类对应的数字
  2. nodeName
  - 只读属性
  - 返回大写标签名或节点名(#text)
  3. nodeValue
  - 可写属性
  - 属性节点、文本节点、注释节点可用
### 获取节点方法
  1. document.parentNode
  - 一个子元素只有一个父元素，document的父元素为null
  2. childNodes
  - 获取子节点集合
  3. firstChild/lastChild
  - 获取某节点下第一个或最后一个节点
  4. nextSibling/previousSibling
  - 上一个/下一个兄弟节点
### 获取元素方法
  1. parentElement
   - 获取父元素节点
  2. children 子元素IE7及以下不支持
  3. childElementCount = children.length IE9及以下不支持
  4. firstElementChild/lastElementChild IE9及以下不支持
  5. nextElementSibling/previousElementSibling IE9及以下不支持
  6. getElementsByTagName()
   - 通过标签名获取一组元素
   - 存在于Document和Element原型中,Element只选择标签下的元素
  7. getElementsByClassName
   - 通过样式名获取一组元素
   - IE8以下不支持
   - 存在于Document和Element原型中
  8. getElementById
   - 通过id名获取元素
   - IE8以下不区分大小写
   - 仅存在于Document下，所以Element实例没有该方法(div.getElementById() undefiend)
  9.  getElementsByName
   - 通过标签的name属性获取一组元素
   - IE9以下只能用于有name属性的标签
   - 仅存在于Document下
  10. querySelector / querySelectorAll
   - 通过CSS选择器选择第一个/一组匹配的元素
   - IE8以下没有该方法，性能较低，不能实是更新(缓存)
   - 存在于Document和Element原型中
  11. document.documentElement直接获取整个html文档

## DOM结构
![Image text](./img/dom结构.png)
  - document 继承于  HTMLDocument / XMLDocument 继承于 Document。因此document不能直接继承于Document，而是由HTMLDocument / XMLDocument继承于Document，再由document继承
  - Text(文本节点原型) Comment(注释节点原型)继承于CharacterData
  - Element是元素节点的构造函数
  - HTMLDocument下有body和head属性，可以选择到HTMLBodyElement和HTMLHeadElement的元素实例