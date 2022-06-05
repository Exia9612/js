# 重绘与回流
 - 当js对页面节点操作时，会引起重绘或回流 + 重绘
## 重绘
  - 浏览器重新构建受影响部分的渲染树就是重绘
  - 不一定由回流引起
  - 更改除引起回流的其它样式时，会引起重绘(背景颜色)

## 回流
  - 回流就是renderTree改变
  - 一定引起重绘
  - 节点的尺寸，布局(位置)，display属性被改变时，节点增删，renderTree中一部分需要重新构建，引起回流
  - 一个页面必定有一次回流(初始构建renderTree引起)
  - 引起回流的因素
    1. dom节点增加与删除
    2. dom节点位置变化
    3. 元素的尺寸，边距，边框，宽高
    4. dom节点显示与否 display
    5. 页面渲染初始化
    6. 浏览器窗口尺寸变化
    7. 向浏览器请求某些样式信息(offset, scroll, client, width, height, getComputedStyle, currentStyle)
  - 现代浏览器优化回流操作：
    - 对于会引起回流的操作会加入待执行队列，待队列条目或周期事件到，在批量执行回流操作
    - 困难，对于向浏览器请求某些样式信息(offset, scroll, client, width, height, getComputedStyle, currentStyle)的操作，浏览器会强行刷新待执行队列(为防止获取的数据不准确)，因此这些操作不能通过批量操作优化
  - 减少回流操作的方法
    - 思想为将多个节点操作简化为批量处理节点操作
    - 修改类名改变样式，浏览器批量处理，只有一次回流。
    - this.style.cssText修改样式，适用于动态计算样式
    ```javascript
      width = 100
      heigth = 100
      this.style.cssText = '\
        width: ' + width + 'px;\
        heigth: ' + height + 'px;\  
      '
    ```
    - createDocumentFragment
    ```javascript
    var oFragment = document.createDocumentFragment() // 节点容器
    for (vat i = 0; i < 10; i++) {
      var oDiv = document.createElement('div')
      oDiv.className = 'box'
      oFragment.appendChild(oDiv)
    }
    document.body.appendChild(oFragment)
    ```
  - display: none
    - 原理是dislay: none的元素并不会在渲染树上，所以操作这些节点不会引起回流
    - 只会回流两次
    ```javascript
    var oBox = document.getElementsByClassName('box')[0]
    oBox.onMouseover = function() {
      oBox.style.display = none
      // ...操作该节点
      oBox.style.display = block
    }
    ```
  - 对于offset client等，若是静态的就是用缓存；动态使用getComputedStyle
  - 对于动画元素，将其positin: absolute。使动画元素在另一层，回流与重绘不会影响父级
  
# 时间线
定义：浏览器加载页面开始到加载完全结束的过程中发生的事情
1. 创建document对象
2. 解析文档，构建DOM树
   document.readyState = 'loading'
3. link开启新线程 -> 异步加载css外部文件 style -> cssdom
4. 没有设置异步加载的script，阻塞文档解析。等待js脚本加载并且解析完成后再继续解析文档
5. 异步加载的script，不阻塞文档解析(不能使用document.write)
6. 解析文档遇到img 先解析节点。对于src属性，创建加载线程，异步加载图片资源，不阻塞文档解析
7. 文档解析完成
   document.readyState = 'interactive'
8. 文档解析完成后： defer执行的script标签 按照顺序执行; async加载的script标签直接执行，不等待文档解析完成
9.  DOMContentLoaded事件 从同步脚本执行阶段 -> 事件驱动阶段
10. async script加载并执行完成，img等资源加载完毕，window.onload事件才能触发 document.readyState = 'complete'
```javascript
function domReady(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      // DOMContentLoaded事件只用触发一次，触发后执行fn应该删除
      document.removeEventListener('DOMContentLoaded', arguments.callee, false)
    }, false)
    fn()
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (this.readyState === 'complete') {
        document.detachEvent('onreadystatechange', arguments.callee)
        fn()
      }
    })
  }

  if (document.documentElement.doScroll && typeof(window.frameElement) === 'undefined') {
    try {
      document.documentElement.doScroll('left')
    } catch (error) {
      return setTimeout(arguments.callee, 20)
    }
    fn()
  }
}
```

# 浏览器进程
## bower进程
 - 每一个网页是一个进程
## 第三方插件进程
## GPU进程
## 浏览器渲染进程(浏览器内核)
  - 浏览器内核是多线程的
    1. js 引擎线程（单线程）
    2. GUI线程（与js引擎线程互斥）
    3. http网络请求线程 webapis
    4. 定时器触发线程
    5. 浏览器事件处理线程
  - 计算量大时的解决方案
    1. ssr
    2. webwork(禁止操作dom)
    3. 异步，通过事件驱动的形式来实现异步。由除了js线程之外其它的线程处理的事件，就是异步事件