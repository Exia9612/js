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
     </body>
    </html>
  ```