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
        <sup>上标标签</sup>
        <sub>下标标签</sub>
        <span>
          没有自带样式
          区分文本内的某些内容
        </span>
        <ol type="1|i|I|a|A" start="5" reversed="reversed">
          <li></li>
        </ol>
        <ol type="disc|square|circle">
          <li></li>
        </ol>
        <!-- defination list 定义列表 -->
        <dl>
          <dt>defination term</dt>
          <dd>defination description</dd>
        </dl>
        <!-- 
          border:边框像素
          cellpadding:单元格内边距
          cellspacing:单元间距
          colspan:合并列数，列数不能超过总的td
          rowspan:行合并
          thead tbody tfoot必须同时出现，改变了表格加载机制
          先加载thead 然后tfoot 然后加载tbody中的表格数据
        -->
        <table border="1" cellpadding="10" cellspacing="10">
          <caption>表格标题</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
            <tr>  
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>isaac</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" align="center"></td>
            </tr>
          </tfoot>
        </table>
     </body>
    </html>
  ```
  > frameset布局标签
  > - frameset弊端
  >   - 跨html联动
  >   - HTTP请求过多
  >   - 对搜索引擎不友好
  >   - 不能与body共存，因此无法布局其它结构
  ```html
    <!DOCTYPE html>
    <html lang="zh-CHS">
     <head>
      <meta charset="UTF-8" />
      <title>
        frameset标签
      </title>
     </head>
    <!-- frameset实现三栏式布局 -->
    <frameset rows="10%, 90%">
      <frame src="top.html"/>
      <frameset cols="20%, 80%">
        <frame src="sidebar.html"/>
        <frame name="main" src="www.baidu.com"/>
      </frameset>
    </frameset>    
    </html>
  ```
  > iframe内联框架标签
  > - iframe弊端
  >   - 滚动条体系混乱
  >   - 无法监控iframe内的数据变化
  >   - 对搜索引擎不友好
  ```html
    <!DOCTYPE html>
    <html lang="zh-CHS">
      <head>
        <meta charset="UTF-8" />
        <title>
          frameset标签
        </title>
      </head>
      <body>
        <p>
          <a href="www.baidu.com" target="mainFrame">百度</a>
        </p>
        <iframe width="100%" height="500" name="mainFrame" src="www.baidu.com" frameborder="1" scrolling="no|yes|auto"></iframe>
      </body>  
    </html>
  ```