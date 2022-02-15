// 建立链接
var socket = io.connect('http://localhost:7000')

// 获取dom元素
var message = document.getElementById('message')
var username = document.getElementById('username')
var sendBtn = document.getElementById('sendBtn')
var outputArea = document.getElementById('outputArea')
var feedbackArea = document.getElementById('feedbackArea')

sendBtn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    username: username.value
  })
})

message.addEventListener('compositionstart', function() {
  // 通过username.value直到谁在发送
  socket.emit('typing', username.value)
})

// 监听服务器传来的事件
socket.on('chat', function (data) {
  message.value = ''
  feedbackArea.innerHTML = ''
  outputArea.innerHTML += `<p><strong>${data.username}: ${data.message}</strong></p>`
})

socket.on('typing', function (data) {
  feedbackArea.innerHTML = `<p><em>${data}正在输入</em></p>`
})