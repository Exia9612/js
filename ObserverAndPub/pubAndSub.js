class EventEmitter {
  handlers = {}

  on (type, handler, once) {
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }

    if (!this.handlers[type].includes(handler)) {
      this.handlers[type].push(handler)
      handler.once = once
    }
  }

  off (type, handler) {
    if (this.handlers[type]) {
      this.handlers[type] = this.handlers[type].filter(h => {
        return h !== handler
      })
    }
  }

  trigger (type) {
    if (this.handlers[type]) {
      this.handlers[type].forEach(handler => {
        handler.call(this)

        if (handler.once) {
          this.off(type, handler)
        }
      })
    }
  }
}