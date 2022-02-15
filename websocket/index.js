var express = require('express')
var socket = require('socket.io')

// app设置
var app = express()
var server = app.listen(7000, function () {
  console.log('listening 7000')
})

// 静态文件
app.use(express.static('public'))

// socket
var io = socket(server)

io.on('connection', function (socket) {
  console.log('websocket connection', socket.id)

  socket.on('chat', function(data) {
    // 服务器监听client的chat事件
    // 将chat信息发送给其它建立连接的client
    io.sockets.emit('chat', data)
  })

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data)
  })
})
