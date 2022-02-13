/**
 * 目标
 * 要完成的任务 -> 又要完成另一类任务
 * 
 * 观察者 -> 观察一个目标是否要做它自己的任务
 *          做这个目标任务相关联的任务
 */

 /**
  * 用户名，密码，数据
  * 目标任务：任何一个数据被访问或改变
  * 
  * 观察者任务：进行日志记录
  */

class Target {
  constructor (data) {
    this.data = data
    this.observer = new Observer('#list')
    this.init()
  }

  init () {
    this.validateData(this.data)
    this.proxyData()
  }

  validateData(data) {
    const { username, password, age, gender } = data
    username.length < 6 && (data.username = '')
    password.length < 6 && (data.password = '')
    typeof age !== 'number' && (data.age = 0)
    !['male', 'female'].includes(data.gender) && (data.gender = 'male')
  }

  proxyData() {
    const _this = this

    for (const key in this.data) {
      Object.defineProperty(this, key, {
        get () {
          this.observer.updateLog('get', key, _this.data[key])
          return _this.data[key]
        },
        set (newValue) {
          this.observer.updateLog('get', key, _this.data[key])
          _this.data[key] = newValue
        }
      })
    }
  }
}

class Observer {
  constructor (el) {
    this.el = document.querySelector(el)
    this.logPool = []
  }

  updateLog (type, key, oldValue, newValue) {
    switch (type) {
      case 'get':
        this.getProp(key, oldValue);
        break;
      case 'set':
        this.setProp(key, oldValue, newValue, oldValue)
        break
      default:
        break
    }
  }

  getProp (key, value) {
    const o = {
      type: 'get',
      dateTime: new Date(),
      key,
      value
    }
    this.logPool.push(o)
    this.log(o)
  }

  setProp (key, oldValue, newValue) {
    const o = {
      type: 'set',
      dateTime: new Date(),
      key,
      oldValue,
      newValue
    }
    this.logPool.push(o)
    this.log(o)
  }

  log(o) {
    const { type, dateTime, key } = o
    const oli = document.createElement('li')
    let htmlStr = ''

    switch (type) {
      case 'get':
        htmlStr = `${dateTime}: key: ${key}, value: ${o.value}`
        break
      case 'set':
        htmlStr = `${dateTime}: key: ${key}, value: ${o.newValue}, oldValue: ${o.oldValue}`
        break
      default:
        break
    }
    oli.innerHTML = htmlStr
    this.el.appendChild(oli)
    console.log(this.logPool)
  }
}