// 模块集合的解构，导入export暴露的变量
//import { add, minius, time, div } from './calculate'

// calculator是一个对象
import calculator from './calculate'
const { add, minius, time, div } = calculator

;(() => {
  var oNum1 = document.querySelector('#num1')
  var oNum2 = document.querySelector('#num2')
  var oBtnGroup = document.querySelector('.button-group')
  const oResult = document.querySelector('#result')

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oBtnGroup.addEventListener('click', handleBtnClick, false);
  }

  function handleBtnClick (e) {
    const tar = e.target
    const tagName = tar.tagName.toLowerCase()

    if (tagName === 'button') {
      const type = tar.innerText
      oResult.innerText = calculate(type)
    }
  }

  function calculate(type) {
    const num1 = oNum1.value
    const num2 = oNum2.value

    switch(type) {
      case '+':
        return add(num1, num2)
      case '-':
        return minius(num1, num2)
      case '*':
        return time(num1, num2)
      case '/':
        return div(num1, num2)
      default:
        break;
    }
  }

  init()
})();