;(function (doc) {
  var oItems = doc.getElementsByClassName('list-item'),
      oList = doc.getElementsByClassName('list')[0],
      curIdx = 0;

  var init = function () {
    bindEvent();
  }

  function bindEvent() {
    // 事件代理
    addEvent(oList, 'mouseover', slide)
  }

  function slide(ev) {
    var e = ev || window.event,
        tar = e.target || e.secElement,
        oParent = getParent(tar, 'li'),
        thisIdx = Array.prototype.indexOf.call(oItems, oParent);
    
    if (curIdx !== thisIdx) {
      oItems[curIdx].className = 'list-item';
      curIdx = thisIdx;
      oItems[thisIdx].className += ' active'
    }
  }

  function getParent(target, element) {
    while (target.tagName.toLowerCase() !== element) {
      target = target.parentNode;
    }
    return target
  }
  init();
})(document);