# Arguments对象
1. 函数内部对应实参值的列表
2. 类数组对象
```javascript
function test() {
  // arguments对象转换为数组，不妨碍引擎优化
  var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
}
```
3. arguments.callee指向arguments的宿主函数
```javascript
function test() {
  // 这种写法编译器无法优化，需要在堆内存上找到arguments后再找arguments的宿主函数
  // 不如直接引用函数本身的速度
  console.log(arguments.callee) // error
}
```
4. Symbol.iterator，可迭代对象
5. 非箭头函数的内置的局部变量
```javascript
const test = () => {
  console.log(arguments) // error
}

// 箭头函数通常做法为
const test = (...args) => {
  console.log(args) // 数组
  Array.isArray(args) // true
}
```
6. 使用arguments的情景
  - 实参个数 > 形参个数
```javascript
function t1(a, b, c) {
  console.log(arguments[3])
}

t1(1,2,3,4) // 4
```
  - 不定参数情况下
```javascript
function t1() {
  console.log(arguments[3])
}

t1(1,2,3,4) // 4
```
7. 形参与实参的对应关系(共享关系)
```javascript
function t1(a) {
  arguments[0] = 10
  console.log(a, arguments[0])
}

t1(1) // 10, 10

function t1(a) {
  a = 10
  console.log(a, arguments[0])
}

t1(1) // 10, 10

// 形参中存在一个默认参数、参数结构、..args不定参数情况下和严格模式下，arguments就会解除形参与实参的对应挂关系
function test(a = 100, b) {
  arguments[0] = 10
  arguments[1] = 20
  console.log(a, b)
  console.log(arguments)
}

test(1, 2) // 1, 2  [10, 20]
```

# parseInt
1. parseInt(string, radix)
   将string作为radix进制数解析，返回十进制整数
2. 流程
  - 可能会转换字符，调用toString方法
  - 对字符串进行整数解析，忽略开头的空格
  - 返回整数或者NaN
  - radix默认值根据字符串调整

# 副作用
## 函数的副作用
1. 函数的副作用指函数不仅仅只返回了一个值，还做了其他事情，如：操作系统文件，数据库，发送http请求，修改全局变量，console.log等
2. 避免不应该出现的副作用
## 局部副作用
- 函数返回值不断变化
```javascript
    function test(round) {
      let result = 0
      for (let i = 0; i < round; i++) {
        result += i
      }
      return result
    }
```
## 纯函数
- 输入和输出的数据都是显示的，即函数与外界交换数据的唯一渠道是参数的返回值
## 引用透明性
- 对于一个纯函数而言，给定相同的参数，返回值相同。所以当参数确定时，可以用特定的值代替结果，称为引用透明性

# if (a == 1 && a == 2 && a == 3)
```javascript
 var a = {
   _a: 0,
   toString () {
     return ++this._a
   }
 }
```
- if (a === 1 && a === 2 && a === 3)
```javascript
var _a = 0

Object.defineProperty(window, 'a', {
  get () {
    return ++_a
  }
})
```
