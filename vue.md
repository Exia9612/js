# vue设计上的权衡
## 声明式和命令式
- 视图层框架通常分为声明式和命令式
### 声明式的表现形式
- 关注结果
- 代码直接写出结果
- 声明式提供给用户的是结果，但实现方式一定是命令式的
```javascript
  <div @click="() => { alert('ok') }">hello</div>
```

### 命令式的表现形式
- 关注过程
- 代码以过程组成(jq)
```javascript
  $('#app')
    .text('hello')
    .on('click', () => { alert('ok') })
  // 等价于下面的js代码
  const div = document.querySelector('#app')
  div.innerText = 'hello'
  div.addEventListener('click', () => { alert('ok') }) 
```

## 性能与可维护性的权衡
- 命令式性能更好
- 声明式可维护性更好
- 声明式代码性能一定不会优于命令式代码
```javascript
  // 对于更改元素文本内容的需求，命令式代码直接修改
  div.innerText = 'hello3'

  // 声明式代码需要先找出diff，再更新内容
```
- 命令式代码的性能消耗 = 直接修改性能消耗
- 声明式代码的性能小号 = 找出差异的性能消耗 + 直接修改性能消耗

## 虚拟DOM的性能
- 虚拟dom的作用在于尽可能减小找出差异的性能消耗，使声名式代码性能尽可能接近命令式
- 虚拟dom的优势在于更新时仅更新必要的字段，而不是将元素全部销毁后重建

# Vue的设计思路
## 声明式的描述UI
### 前端页面的组成
- DOM元素
- 属性
- 事件
- 元素的层级结构：DOM树的层级结构

如何声明式地描述上述内容，Vue提供了两种方法，模版(template)和javascript对象(虚拟DOM)
```javascript
<h1 @click="() => { console.log('h1') }">content<h1>

const virtualDom = {
  tag: 'h1',
  props: {
    onClick: () => { console.log('h1') }
  },
  children: 'content'
}
```
模版描述和javascript对象描述有什么区别呢，模版描述更直观，对象描述更加灵活
```javascript
<h1 v-if="level === 1">content<h1>
<h2 v-else-if="level === 2">content<h2>
<h3 v-else>content<h3>

const virtualTitle = {
  tag: `h${level}`,
  children: 'content'
}
```
### 组件的本质
组件本身是一组虚拟dom的封装
```javascript
  const myComponent = {
    render() {
      return {
        tag: 'div',
        porps: {
          onClick: () => alert('hello')
        }
        children: 'click me'
      }
    }
  }

  const vnode = {
    tag: myComponent
  }

  // render是组件的渲染函数，组件渲染的元素是通过render函数来描述的
  // 在vue内部render函数是通过调用h函数来返回虚拟dom
```
### 渲染器(renderer)
渲染器的作用是把虚拟dom渲为真实dom
#### 渲染器的实现思路
- 创建元素
- 为元素添加属性和事件
- 处理children
```javascript
  function renderer(vnode, container) {
    if (typeof vnode.tag === 'string') {
      // 虚拟dom描述的是dom元素
      mountElement(vnode, container)
    } else if (typeof vnode.tag === 'object') {
      // 虚拟dom描述的组件
      mountComponent(vnode, container)
    }
  }

  mountElement(vnode, container) {
    // 创建元素
    const el = document.createElement(vnode.tag)

    // 为元素添加属性和事件
    for (const key in vnode.props) {
      if (/^on/.test(key)) {
        // 以on开头说明是事件
        el.addEventListener(
          key.substr(2).toLowerCase(),
          vnode.porps[key]
        )
      }
    }

    // 处理children
    if (typeof vnode.children === 'string') {
      el.appendChild(document.createTextNode(vnode.children))
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => renderer(child, el))
    }
  }

  mountComponent(vnode, container) {
    const subTree = vnode.tag.render()
    renderer(subTree, container)
  }
```

### 编译器(compiler)
编译器的作用是将模版编译成渲染函数
```javascript
  <template>
    <div @click="handler">
      click me
    </div>
  </template>

  <script>
    export default {
      data: {}
      methods: {
        handler: () => {}
      }
    }
  </script>

  // 编译后
  export default {
    export default {
      data: {}
      methods: {
        handler: () => {}
      },
      render() {
        return h('div', { onClick: handler }, 'click me')
      }
    }
  }
```

### vue个模块件的联系
- 编译器将vue文件编译成带有渲染函数的js对象
- 渲染器通过调用渲染函数获得描述组件的虚拟dom，将虚拟dom转换为真实节点

# 响应式系统
## 副作用函数
- 函数执行时会直接或间接的影响其他函数的执行(比如函数内修改了全局变量)
## 响应式数据的实现思路
- 当某个数据被读取时，可以添加自定义的操作用来收集依赖于该字段的副作用函数
- 当某个数据被设置时，可以出发收集的依赖，并重新执行这些依赖
```javascript
  const obj = { text: 'hello' }
  function effect () {
    // 这里会读取obj的text字段的值，在这个操作中我们希望能收集effect作为读取text字段的依赖
    // effect -> 出发obj.text的读取操作 -> 添加effect到依赖收集容器
    document.bosy.innerText = obj.text
  }
```
- 分析上面的代码，我们发现代码中我们仅需要关注三个角色
  1. 被操作的代理对象(obj)
  2. 被读取的代理对象的字段(text)
  3. 需要被收集的副作用函数(effect)
  如何建立这三者的关系是构建响应式数据必须要解决的问题
- 因为三者间是级联引用的关系，所以可以用过树状结构保存这种引用关系
  weekMap(target, Map(key, effects))
- 为什选择weakMap，在vue中，当组件被销毁时，该组件的响应式数据也应该被回收，weakMap的key不计入引用计数
```javascript
let activeEffect

function effect(fn) {
  const effectFn = () {
    cleanup(effectFn);
    activeEffect = effectFn
    fn()
  }

  // 保存收集effect的依赖收集容器
  effectFn.deps = []
  effectFn()
}

// 解决分支切换
function clearup(effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn))
  effectFn.deps = []
}

effect(function fn() {
  // obj.ok为true时，依赖收集容器结构为
  //   obj -> ok -> effect(fn)
  //   obj -> text -> effect(fn)
  // 当obj.ok转为false时，fn并不会出发obj.text的读取操作，应该从依赖收集容器删除text依赖。
  // 解决方法是每次副作用函数执行时，先将其从容器中清除，再执行，通过副作用函数的执行再添加一遍依赖
  document.body.innerText = obj.ok ? obj.text : 'not'
})

// 依赖收集的容器
const bucket = new Weakmap()

function reactive(data) {
  return new Proxy(data, {
    get (target, key) {
      // track
      track(target, key)

      return target[key]
    },
    set (target, key, value) {
      target[key] = value

      // trigger
      trigger(target, key, value)
    }
  })
}

function track (target, key) {
  if (!activeEffect) return

  let depsMap = bucket.get(target)

  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key)

  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  deps.add(activeEffect)
  // deps是与当前副作用函数存在联系的依赖集合，将其添加到副作用函数的deps中
  affectEffect.deps.push(deps)
}

function trigger(target, key, value) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  // 避免trigger陷入无限循环，因为effects集合中删除一个元素再添加回来时，若forEach没有结束，set重新访问一次该元素
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(effectFn => effectFn())
}
```
## 响应式数据改进
### 嵌套effect和effect栈
我们希望effect可以嵌套执行
```javascript
const data = {
  foo: true,
  bar: true
}

effect(function effectFn1() => {
  console.log('effectFn1 execute')
  effect (function effectFn2() => {
    console.log('effectFn2 execute')
    obj.bar
  })
  obj.foo
})
```
我们希望在依赖收集容器中有这样的关系
```
  data -> bar -> effectFn2
       -> foo -> effectFn1
```
修改obj.bar的操作只会触发effectFn2，修改obj.foo的操作会触发effectFn1，同时在effectFn1中执行effectFn2。但是现有的effect实现并不能满足需求
```javascript
let activeEffect

function effect(fn) {
  const effectFn = () {
    cleanup(effectFn);
    activeEffect = effectFn
    fn()
  }

  // 保存收集effect的依赖收集容器
  effectFn.deps = []
  effectFn()
}
```
上述代码存在的问题是内层effectFn执行时会覆盖activeEffect，当内层effectFn执行完毕后，外层effectFn执行，但这时activeEffect已经被修改为内层effectFn，依赖收集错误。改进代码如下
```javascript
let activeEffect
const effectStack = []

function effect(fn) {
  const effectFn = () {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(activeEffect)
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1]
  }

  // 保存收集effect的依赖收集容器
  effectFn.deps = []
  effectFn()
}
```

### 避免无限递归循环
下面的代码会引起调用栈溢出，原因是因为在读取obj.foo时会track依赖，然后执行obj.foo的写操作触发trigger操作，此时effectFn还没有执行完成就被从依赖收集容器中取出再执行，就会引发栈溢出
```javascript
effect(() => obj.foo = obj.foo + 1)
```
解决方法
```javascript
function trigger(target, key, value) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  // 避免trigger陷入无限循环，因为effects集合中删除一个元素再添加回来时，若forEach没有结束，set重新访问一次该元素
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })

  effectsToRun.forEach(fn => fn())
}
```

### 调度执行
- 什么时候执行依赖
```javascript
let activeEffect
const effectStack = []

function effect(fn, options) {
  const effectFn = () {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(activeEffect)
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1]
  }

  // 保存收集effect的依赖收集容器
  effectFn.deps = []
  effectFn.options = options
  effectFn()
}

function trigger(target, key, value) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  // 避免trigger陷入无限循环，因为effects集合中删除一个元素再添加回来时，若forEach没有结束，set重新访问一次该元素
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })

  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

effect(
  () => console.log(obj.foo),
  {
    scheduler(fn) {
      // 在宏任务重执行副作用函数而不是同步执行了
      setTimeout(() => {
        fn()
      }, 1000);
    }
  }
)
```
- 依赖执行次数
```javascript
const jobQueue = new Set()
let p = new Promise.resolve()
let isFlushing = false

function flushJob() {
  if (isFlushing) return

  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}

effect(
  () => console.log(obj.foo), //obj.foo初始值为1
  {
    scheduler(fn) {
      jobQueue.add(fn)
      flushJob()
    }
  }
)

obj.foo++
obj.foo++
// 结果只会打印初始值和最终结果，1 3
```

## 计算属性
```javascript
const sumRes = computer(() => obj.foo + obj.bar)
```
1. 懒执行：副作用函数在需要的时候才去执行
2. 缓存：若计算属性依赖的值没有发生变化时，不重新计算，直接返回缓存结果
3. 支持对包含计算属性的外层副作用函数的重新调用
```javascript
const sumRes = computer(() => obj.foo + obj.bar)

effect(function fn() {
  console.log(sumRes.value)
})

obj.foo++ // 希望此时fn函数也可以重新触发
```
```javascript
let activeEffect
const effectStack = []

function effect(fn, options) {
  const effectFn = () => {
    clearup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }

  effectFn.deps = []
  effectFn.options = options

  if (!options.lazy) {
    // 解决懒执行问题，抛出副作用函数，交给用户决定执行时机
    effectFn()
  }
  return effectFn
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  // 避免trigger陷入无限循环，因为effects集合中删除一个元素再添加回来时，若forEach没有结束，set重新访问一次该元素
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add()effectFn
    }
  })
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

function computer(getter) {
  let res // 缓存结果
  let dirty = true // 缓存结果是否需要重新计算，true时重新计算
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true,
      // 当计算属性依赖的响应式数据的trigger被触发时，触发计算属性的依赖
      trigger(obj, 'value')
    }
  })

  const obj = {
    get value() {
      if (dirty) {
        res = effectFn()
        // 计算属性的副作用函数执行完，effectStack的顶层是嵌套的副作用函数
        dirty = false
      }
      // 主动添加依赖，依赖中的副作用函数是外层的副作用函数。

      track(obj, 'value')
      return res
    }
  }

  return obj
}
```

## watch
```javascript
watch(
  obj,
  () => console.log('变化了'),
  {
    immediate: true
  }
)
```
- 响应式数据更新后执行回调函数
- 回调函数可以获取更新前后的值
```javascript
// watch仅供参考参考，功能不完善
function watch(source, cb, options) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    get = () => travser(source)
  }

  let oldValue, newValue

  const job = () => {
    newValue = effectFn()
    cb(oldValue, newValue)
    oldValue = newValue
  }

  const effectFn = effect(
    () => getter(), // 遍历响应式数据中的kv，建立依赖
    {
      lazy: true,
      scheduler: job // 通过scheduler执行回调
    }
  )

  if (options.immediate) {
    job()
  } else {
    // 先执行一次，获得oldvalue
    oldValue = effectFn()
  }
}
```
- 竟态问题
```javascript
let finalData

watch(obj, async () => {
  finalData = await fetch(...)
})

/*
  第一次修改obj => 发送请求a
  第二次修改obj => 发送请求b
  请求b先返回 => finalData = b
  请求a后返回 => finalData = a

  但实际情况是因为b后发送，我们期望finalData的最终值应该是b
*/
```
```javascript
let finalData
watch(obj, async (newValue, oldValue, onInvalidate) => {
  let expire = false

  onInvalidate(() => {
    expire = true
  })

  const res = await fetch(...)

  if (!expire) {
    finalData = res
  }
})

function watch(source, cb, options) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => travser(source)
  }

  let oldValue, newValue
  let clearup

  function onInvalidate(fn) {
    cleanup = fn
  }

  const job = () => {
    newValue = effectFn()
    cleanup && cleanup()
    cb(oldValue, newValue, onInvalidate)
    oldValue = newValue
  }

  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler: job // 通过scheduler执行回调
    }
  )

  if (options.immediate) {
    job()
  } else {
    // 先执行一次，获得oldvalue
    oldValue = effectFn()
  }
}

/*
  第一次修改obj => 发送请求a - 更新了作用域内的clearup
  第二次修改obj => 发送请求b - 先调用了a的clearup，将expire设置为true1
  请求b先返回 => finalData = b - expire为false更新finalData
  请求a后返回 => finalData = a - expire为true不更新finalData
*/
```

# 非原始值的响应式方案
## Proxy和Reflect
- Proxy: 使用proxy可以创建一个代理对象，它能够实现对其它对象的代理。
- Reflect: 任何可以在Proxy拦截器中找到的方法都能够在reflect中找到同名函数。使用Reflect的主要因素是因为它接受第三个参数receiver，可以理解为函数调用过程中的this
```javascript
const obj = { foo: 1 }

const obj = {
  get foo () {
    return this.foo
  }
}

Reflect.get(obj, foo, { foo: 2 }) // 输出 2
```
```javascript
const obj = {
  foo: 1,
  get bar () {
    return this.foo
  }
}

const p = new Proxy(obj, {
  get (target, key) {
    track(target, key)

    return target[key]
  }
})

// 通过obj的代理对象p访问bar时，我们期望p.foo也会与副作用函数建立依赖关系，但是读取bar时的this是obj而不是代理对象p，所以无法建立响应关系
effect(() => console.log(p.bar))

// 重新定义代理对象
const p = new Proxy(obj, {
  get (target, key, reveiver) {
    track(target, key, reveiver)

    return Refelct.get(target, key, reveiver)
  }
})
```
## 如何代理Object
响应式系统应该拦截一切读取操作，以便数据变化时能够正确的触发响应。普通对象的所有读取操作有下列三种情况
- 访问属性: obj.foo
```javascript
const p = new Proxy(obj, {
  get (target, key, reveiver) {
    track(target, key, reveiver)

    // 使用Refelct.get拦截访问属性
    return Refelct.get(target, key, reveiver)
  }
})
```
- 判断对象或原型上是否有给定的key: key in obj
```javascript
const p = new Proxy(obj, {
  has (target, key) {
    track(target, key)

    // 使用has拦截in操作
    return Refelct.has(target, key)
  }
})
```
- 使用for...in循环遍历对象：for (const key in obj) {...}
根据js规范，使用for...in遍历数组时，js内部方法会使用ownKeys来获取对象自身拥有的键
```javascript
// 使用ownKeys内部方法获取一个对象所有属于自己的键值，这个操作明显不与任何具体的键值绑定，只能拿到目标对象target，所以我们构造一个唯一的key作为标示
let ITERATE_KEY = Symbol()

const p = new Proxy(obj, {
  ownKeys (target) {
    track(target, ITERATE_KEY)

    // 使用has拦截in操作
    return Refelct.ownKeys(target)
  }

  deleteProperty(target, key) {
    const hadKey = Object.propertype.hasOwnProperty.call(target, key)
    const res = Reflect.deleteProperty(target, key)

    if (res && hadKey) {
      trigger(target, key, 'DELETE')
    }
  }
})

/*
  什么时候触发与ITERATE_KEY关联的副作用函数呢
  对象的键值对数量发生变化时。因为添加或删除属性时会改变for...in遍历次数
*/
function trigger(target, key, type) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effectFns = depsMap.get(key)
  const iterateEffects = depsMap.get(ITERATE_KEY)
  const effectsToRun = new Set()

  effectFns && effectFns.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })

  if (type === 'ADD' || type === 'DELETE') {
    // 添加属性的时候去触发ITERATE_KEY的依赖
    iterateEffects && iterateEffects.forEach(effectFn => {
       if (effectFn !== activeEffect) {
         effectsToRun.add(effectFn)
       }
     })
  }

  effectsToRun.forEach(effentFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
```

## 合理的触发响应
- 当值没有被改变时不触发副作用函数
```javascript
const p = new Proxy({foo: 1}, {
  set(target, key, value, reveiver) {
    const oldValue = Refelct.get(target, key, receiver)
    const type = Object.propertype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
    const res = Reflect.set(target, key, value, receiver)

    // 判断nan
    // NaN === NaN false
    // NaN !== NaN true
    if (oldValue !== value && (oldValue === oldValue || value === value)) {
      trigger(target, key, type)
    }

    return res
  }
})
```

- 合理的处理原型触发
```javascript
const obj = {}
const proto = { bar: 1 }
const child = reactive(obj)
const parent = reactive(proto)
Object.setPrototypeof(child, parent)

effect(() => {
  console.log(child.bar)
})

child.bar = 2 //会触发两次依赖
```
当在副作用函数中读取child.bar时，会触发依赖收集。但是child上并没有bar属性，所以会在寻找child代理的对象obj的prototype，即proto上寻找。这一操作会被proto的代理对象拦截，所以child.bar和proto.bar都会与副作用函数建立响应。当给child.bar赋值时也会触发parent的set操作，所以依赖会触发两次
我们希望在不触发原形上的响应，所以需要找到一个方法分辨哪一次是原型上的触发
```javascript
// child的set
set (target, key, newValue, receiver) {
  // target 是obj
  // receiver 是obj的代理对象parent
}

// proto的set
set (target, key, newValue, receiver) {
  // target 是obj的原型proto
  // receiver 因为是child,bar， 所以receiver仍然是obj的代理对象parent
}
```
```javascript
const p = new Proxy({foo: 1}, {
  get (target, key, reveiver) {
    if (key === 'raw') {
      return target
    }
    track(target, key)
    return Refelct.get(target, key, reveiver)
  }

  set(target, key, value, reveiver) {
    const oldValue = Refelct.get(target, key, receiver)
    const type = Object.propertype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
    const res = Reflect.set(target, key, value, receiver)

    if (target === receiver.raw) {
      if (oldValue !== value && (oldValue === oldValue || value === value)) {
        trigger(target, key, type)
      }
    }

    return res
  }
})
```

## 浅响应与深响应
- 深响应
```javascript
// obj.foo.bar
const p = new Proxy({foo: {bar: 1}}, {
  get (target, key, reveiver) {
    if (key === 'raw') {
      return target
    }
    track(target, key)
    const res = Refelct.get(target, key, reveiver)
    if (typeof res === 'object' && res !== null) {
      return reactive(res)
    }
    return res
  }
})
```
- 浅响应(shallowReactive)
```javascript
function createReactive(obj, isShallow = false) {
  return new Proxy({foo: {bar: 1}}, {
    get (target, key, reveiver) {
      if (key === 'raw') {
        return target
      }
      track(target, key)
      const res = Refelct.get(target, key, reveiver)

      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        return reactive(res)
      }
      return res
    }

    set(target, key, value, reveiver) {
      const oldValue = Refelct.get(target, key, receiver)
      const type = Object.propertype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
      const res = Reflect.set(target, key, value, receiver)

      if (target === receiver.raw) {
        if (oldValue !== value && (oldValue === oldValue || value === value)) {
          trigger(target, key, type)
        }
      }

      return res
    }
  })
}
```
```javascript
function reactive(obj) {
  createReactive(obj)
}

function shallowReactive(obj) {
  createReactive(obj, true)
}
```
## 只读和浅只读
我们希望一些数据只是只读的，当用户试图修改它们时会收到一条警告。比如组件的props
```javascript
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy({foo: {bar: 1}}, {
    get (target, key, reveiver) {
      if (key === 'raw') {
        return target
      }

      // 如果一个数据是只读的，没有必要建立响应式
      if (!isReadonly) {
        track(target, key)
      }
      const res = Refelct.get(target, key, reveiver)

      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        // 深只读
        return isReadonly ? readonly(res) : reactive(res)
      }
      return res
    }

    set(target, key, value, reveiver) {
      if (isReadonly) {
        console.warn('readonly')
        return true
      }

      const oldValue = Refelct.get(target, key, receiver)
      const type = Object.propertype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
      const res = Reflect.set(target, key, value, receiver)

      if (target === receiver.raw) {
        if (oldValue !== value && (oldValue === oldValue || value === value)) {
          trigger(target, key, type)
        }
      }

      return res
    }

    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn('readonly')
        return true
      }

      const hasKey = Object.propertype.hasOwnProperty.call(target, key)
      const res = Refelct.deleteProperty(target, key)

      if (hadKey && res) {
        trigger(target, key, delete)
      }
      return res
    }
  })
}
```
```javascript
function readonly(obj) {
  createReactive(obj, false, true)
}

function shallowReadonly(obj) {
  // 浅只读：不可以修改第一层属性且也没有响应式，深层属性可以修改。获取第一层属性时直接返回被代理对象上的属性
  createReactive(obj, true, true)
}
```

## 代理数组
数组本质也是对象，只不过数组是一个异质对象(内部方法DefineProperty实现与普通对象不同)。此外数组元素的读取的设置操作也比普通对象丰富。
数组的读取操作有
- 通过索引访问数组元素值 arr[0]
- 访问数组的长度 arr.length
- 把数组作为对象，使用for...in遍历
- 使用for...of遍历数组
- 数组的原型方法，如concat/join/every/some/find/findIndex/include等，以及其他所有不改变数组原型的方法
数组的写操作
- 通过索引修改数组元素值：arr[1] = 3
- 修改数组长度：arr.length = 0
- 数组的栈方法：push/pop/shift/unshift
- 修改数组的原型方法：splice/fill/sort
### 数组的索引与length
当通过索引赋值时，如果索引大于数组的length，数组会先改变length属性后再赋值。所以当索引大于length时，应该触发关于length的副作用
```javascript
const arr = reactive(['foo'])

effect(() => console.log(arr.length))

arr[1] = 'bar' // 上面的副作用函数应该触发

function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy({foo: {bar: 1}}, {
    set(target, key, value, reveiver) {
      if (isReadonly) {
        console.warn('readonly')
        return true
      }

      const oldValue = Refelct.get(target, key, receiver)
      const type = Array.isArray(target) ?
        // 当添加的索引大于length时，是add操作
        Number(key) < target.length ? 'SET' : 'ADD'
        : Object.propertype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
      const res = Reflect.set(target, key, value, receiver)

      if (target === receiver.raw) {
        if (oldValue !== value && (oldValue === oldValue || value === value)) {
          trigger(target, key, type， value)
        }
      }

      return res
    }
}

function trigger(target, key, type, newValue) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  //...

  // 数组的add操作改变length，需要触发length的依赖
  if (type === 'ADD' && Array.isArray(target)) {
    const lengthEffects = depsMap,get('length')
    lengthEffects && lengthEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

  // 改变数组长度时需要触发所有索引小于长度的依赖
  if (Array.isArray(target) && key === 'length') {
    depsMap.forEach((effects, key) => {
      if (key < newValue) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
    })
  }

  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
```

### for...in遍历数组
数组的length改变时，需要触发for...in相关的副作用函数
```javascript
const arr = reactive(['foo'])

effect(() => {
  for const key in arr {
    console.log(key)
  }
})

arr[1] = 'bar' // 上面的副作用函数应该触发
arr.length = 0

function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy({foo: {bar: 1}}, {
    ownKeys(target) {
      if (Array.isArray(target)) {
        track(target, 'length')
      } else {
        track(target, ITERATE_KEY)
      }
      return Refelct.ownKeys(target)
    }
  })
```

### for...of遍历数组
使用for...of遍历数组时，js内部方法会读取数组的length和数组的索引，这时候就会被proxy拦截并建立响应式，所以上述已经可以满足需求，即建立的for...of和arr.length,arr[index]的响应式关系.
但是for...of的内部方法还会调用symbol.iterator，为了避免发生意外的错误和性能问题，我们不应该在symbol.iterator与for...of操作间建立依赖关系
```javascript
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy({foo: {bar: 1}}, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target
      }
      
      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key)
      }

      const res = Refelct.get(target, key)

      if (isShallow) {
        return res
      }

      if (typeof res === 'object' && res !== null) {
        return isReadonly ? readonly(res) : reactive(res)
      }

      return res
    }
  }
```





























