# HTML篇
## 前端认知，编辑器，HTML基础
1. 前端：结构 样式 逻辑
  > - 结构：网页布局 HTML
  > - 样式：网页样式 CSS
  > - 逻辑：网页动态交互 JS 
2. HTML
  > - 超文本标记语言/HyperText Markup Language
  > - 用标签代替语意
  > - head标签：页面配置信息
  > - 元素
  >   - 标签加内容
  >   - 内联元素：不独占一行，无法定义宽高
  >   - 块级元素：独占一行，可以定义宽高
  >   - 行内块元素：不独占一行，可以定义宽高
  >   - 内联元素可以嵌套内联元素
  >   - 块级元素可以嵌套任何元素
  >   - p标签不能嵌套div标签
  ```html
    <!DOCTYPE html>
     html5的声明
     声明html的版本
     影响document.compatMode(CSS1Compat: css3标准兼容模式, BackCompat: 浏览器怪异兼容模式
    <html lang="zh-CHS">
      zh-CHS: Chinese simple 通用简体中文
      zh-CHT：Chinese tradition 通用繁体中文
     <head>
      <meta charset="UTF-8" />
       GB2312: 中国信息处理国家标准码 简体中文
       GBK：汉字扩展规范 拓展支持繁体中文，扩大简体中文收录，支持藏蒙维等少数民族文字
       UTF-8：unicode 万国码 
      <title>
        主页：网站名称 + 主要关键字/关键词描述
        详情页：详情名称 + 网站名称 + 简介
        列表页：分类名称 + 关键字 + 网站名称
        文章页：标题 + 分类 + 网站名称
      </title>
      <meta name="keywords" content=""/>
         keywords: 100字符 网站名称 + 分类信息
      <meta name="description" content=""/>
         description: 80-120汉字 综合title + keywords
      搜索引擎优先级：title > dexcription > keywords
     </head>
     <body>
      一些语意化标签，利于搜索引擎搜索
      <del>del</del>
      <ins>ins</ins>
      <address>addrress斜体</address>
      <em>元素内部字体大小 * 1<em>
      <div>
        中文自动换行
        英文无分割时不换行
      </div>
      <a href="www.baidu.com" target="_blank">百度</a>
      <a href="tel:1234567890">移动端打电话</a>
      <a href="mailto:xxx@qq.com">发邮件</a>
      <a href="#id">锚点定位：定位到某元素</a>
      <a href="javascript:;">协议限定符</a>
     </body>
    </html>
  ```