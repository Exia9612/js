;(function () {
  var slider = function (opt) {
    this.sliderItem = document.getElementsByClassName(opt.sliderItem)
    this.thumbItem = document.getElementsByClassName(opt.thumbItem)
  }

  slider.prototype = {
    bindClick: function () {
      var slider = this.sliderItem
      var thumbs = this.thumbItem

      // 绑定事件
    }
  }

  window.Slider = slider
})()