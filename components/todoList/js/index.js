init();

function init() {
  initTodoList;
}


var initTodoList = (function() {
  var showInput = document.getElementsByClassName('j-show-input')[0],
      inputWrap = document.getElementsByClassName('input-wrap')[0],
      inputShow = false,
      addItem = document.getElementsByClassName('j-add-item')[0],
      textInput = document.getElementById('textInput'),
      oList = document.getElementsByClassName('j-list')[0]


  addEvent(showInput, 'click', function () {
    console.log(1)
    if (inputShow) {
      inputWrap.style.display = 'none'
      inputShow = false
    } else {
      inputWrap.style.display = 'block'
      inputShow = true
    }
  })

  addEvent(addItem, 'click', function () {
    var val = textInput.value,
        len = val.length,
        oItems = document.getElementsByClassName('item')
    if (len === 0) {
      return
    }
    var oLi = document.createElement('li')
    oLi.className = 'item'
    oLi.innerText = val
    oList.appendChild(oLi)
    textInput.value = ''
  })

  function itemTpl(text) {
    return (
      '<p class="item-content">' + text + '</p>' +
      '<div>' +
        '<a href="javascript:;" class="fa fa-edit"></a>' +
        '<a href="javascript:;" class="fa fa-times"></a>' +
      '</div>'
    )
  }
})();
