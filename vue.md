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





























