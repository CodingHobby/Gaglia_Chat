window.addEventListener('load', function () {
  var msgs = []
  var socket = io.connect('localhost:3000')
  socket.on('msg', function (msg) {
    msgs.push(document.getElementById('msgs').innerHTML += '<div><span style="color: red"> ' + msg.user + '</span>: ' + msg.msg + '</div>')
  })


  document.getElementById('send').addEventListener('click', function () {
    var userName = document.getElementById('yourId').value
    var msg = document.getElementById('message').value
    if (!userName || !msg) {
      alert('Please Insert a User name')
      return false
    } else {

      var msg = {
        user: userName,
        msg: msg
      }
      console.log('Sending msg: ' + JSON.stringify(msg))
      msgs.push('<div><span style="color: blue"> ' + msg.user + '</span>: ' + msg.msg + '</div>')
      updateMsgs(msgs)
      socket.emit('msg', msg)
    }
  })

  function updateMsgs(msgs) {
    document.getElementById('msgs').innerHTML = ''
    for (var i = 0; i < msgs.length; i++) {
      document.getElementById('msgs').innerHTML += msgs[i]
    }
  }
})