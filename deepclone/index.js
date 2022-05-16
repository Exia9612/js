var obj = {
  name: 'isaac',
  age: 34,
  info: {
    hobby: ['travel', 'piano', {
      a: 1
    }],
    career: {
      teacher: 4,
      engineer: 9
    }
  }
}

function deepClone (origin, target) {
  var tar = target || {}
  var toStr = Object.prototype.toString
  var arrType = '[object Array]'

  for (key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        target[key] =  toStr(origin[key]) === arrType ? [] : {}
        deepClone(origin[key], target[key])
      } else {
        target[key] = origin[key]
      }
    }
  }

  return tar
}

function deepclone2(origin, hashMap = new WeakMap()) {
  if (origin === undefined || typeof origin !== 'object') {
    return origin
  }

  if (origin instanceof Date) {
    return new Date(origin)
  }

  if (origin instanceof RegExp) {
    return new RegExp(origin)
  }

  const hashKey = hashMap.get(origin)

  if (hashKey) {
    return hashKey;
  }

  const target = new origin.constructor()
  hashMap.set(origin, target)
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepclone2(origin[k], hashMap)
    }
  }

  return target
} 

var o1 = {}
const wmap = new WeakMap()
function event() {
  console.log('hello')
}
wmap.set(o1, event)
console.log(wmap)
console.log(event)
o1 = null
console.log(wmap)
console.log(event)