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
  