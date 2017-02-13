var msgs = []
window.addEventListener('load', function () {
  var socket = io.connect('https://gagliachat.herokuapp.com/')
  socket.on('msg', function (msg) {
    msgs.push('<div><span style="color: red"> ' + msg.user + '</span>: ' + msg.msg + '</div>')
    updateMsgs(msgs)
  })


  document.getElementById('send').addEventListener('click', function () {
    var userName = document.getElementById('yourId').value
    var msg = document.getElementById('message').value
    if (!userName || !msg) {
      alert('Please Enter both a User Name and a Message')
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
      document.getElementById('message').value = ''
    }
  })

  function updateMsgs(msgs) {
    document.getElementById('msgs').innerHTML = ''
    for (var i = 0; i < msgs.length; i++) {
      document.getElementById('msgs').innerHTML += msgs[i]
    }
  }
})