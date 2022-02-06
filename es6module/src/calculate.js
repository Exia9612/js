/**
 export
 export default
 */

// export function add(a, b) {
//   return a + b
// }

// export function minius(a, b) {
//   return a - b
// }

// export function time(a, b) {
//   return a * b
// }

// export function div(a, b) {
//   return a / b
// }

// function add(a, b) {
//   return a + b
// }

// function minius(a, b) {
//   return a - b
// }

// function time(a, b) {
//   return a * b
// }

// function div(a, b) {
//   return a / b
// }

// // export {} => 不是对象，是模块集合的容器
// 导出模块集合
// 导出多个
// export {
//   // 将模块放到模块容器中导出
//   add,
//   minius,
//   time,
//   div
// }

//导出了default对象
//导出一个
export default {
  add(a, b) {
    return a + b
  },
  minius(a, b) {
    return a - b
  },
  time(a, b) {
    return a * b
  },
  div(a, b) {
    return a / b
  }
}
