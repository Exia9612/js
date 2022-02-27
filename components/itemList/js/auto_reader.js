;(function () {
  // 插件
  var wHeight = getViewPort().height
  var sHeight = getScrollSize().height
      playing = false
      t = null

  var AutoReader = function (opt) {
    this.playBtn = opt.playBtn
    this.sTopBtn = opt.sTopBtn

    var _self = this
    addEvent(this.sTopBtn, 'click', function () {
      window.scrollTo(0, 0)
      clearInterval(t)
      _self.playBtn.style.backgroundImage = 'url(img/play.png)'
      playing = false
    })

    addEvent(window, 'scroll', function () {
      // window.addEventListener('scroll',  function () {...})
      // 这个function里的this指向window，但我们的希望它指向AutoReade的实例
      _self.sTopBtnShow()
    })

    addEvent(this.playBtn, 'click', function () {
      // _self.setAutoPlay()
      _self.setAutoPlay.call(this)
    })
  }

  AutoReader.prototype = {
    sTopBtnShow: function () {
      var sTop = getScrollOffset().top
      var sTopBtn = this.sTopBtn

      sTopBtn.style.display = sTop ? 'block' : 'none'
    },
    setAutoPlay: function () {
      var sTop = getScrollOffset().top
          _self = this

      if (sHeight === wHeight + sTop) {
        return
      }

      if (!playing) {
        t = setInterval(function () {
          var sTop = getScrollOffset().top
          if (sHeight <= wHeight + sTop) {
            clearInterval(t)
            _self.style.backgroundImage = 'url(img/play.png)'
            playing = false
            return
          } else {
            window.scrollBy(0, 1)
            _self.style.backgroundImage = 'url(img/pause.png)'
          }
        }, 1)
        playing = true
      } else {
        clearInterval(t)
        _self.style.backgroundImage = 'url(img/play.png)'
        playing = false
      }
    }
  }

  window.AutoReader = AutoReader
})()