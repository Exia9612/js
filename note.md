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
  > form表单标签
  > - block element
  > - input
  >   - inline blobk
  >   - disabled(不可读不可写)和readonly(只读不可写)的区别在于提交表单提交时数据能否读取
  > - label标签
  >   - for属性与某一个input的id属性相同时，点击label自动聚焦该input输入框
  > - textarea标签
  >   - 通常宽度计算公式：8px(英文字符) * cols + 17px(滚动条)
  >   - 中间不应该有空格和换行，会被视为textare的内容
  > - placeholder不同浏览器中样式不一，同时难以调整样式。对于样式要求严格的需求讲义用js模拟
  placeholder
  > - fieldset和legend标签
  >   - 块级元素
  >   - 分割表单
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
        <form method="get|post" action="url">
          <p>
            username: <input type="text" name="username" value="isaac" maxlength=5/>
          </p>
          <p>
            password: <input type="password" name="password" value=""/>
          </p>
          <p>
            <input type="submit" value="submit"/>
          </p>
        </form>

        <form>
          <label for="usename"></label>
          <input type="text" id="username"/>
        <form>

        <form method="get|post" action="url">
          <p>
            username: <input type="text" name="username" value="isaac" disabled="disabled"/>
          </p>
          <p>
            <input type="text" value="cheng" readonly="readonly"/>
          </p>
        </form>

        <form>
          <input type="radio" name="sex" checked="checked" value="male" id="male"/>
          <label for="male">男士</label>
          <input type="radio" name="sex" checked="checked" value="female" id="female"/>
          <label for="female">女士</label>
        </form>

        <form>
          <textarea cols="30" rows="20"></textarea>
        </form>
      </body>  
    </html>
  ```
  > 总结
  > - 块级元素标签：div hx p address ul ol li dl dt dd table form field legend
  > - 内联元素标签：span strong em del ins label a sub sup
  > - 内联块元素：input img select textaarea iframe