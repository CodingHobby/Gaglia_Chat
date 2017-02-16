var msgs = []
var notif = new Audio('./notif.mp3')
window.addEventListener('load', function () {
  var socket = io.connect(document.domain + ':' + location.port)
  socket.on('msg', function (msg) {
    msgs.push('<div class="msg"><span style="color: red"> ' + msg.user + '</span>: ' + msg.msg + '</div>')
    updateMsgs(msgs)
    notif.play()

    Push.create('New Message!', {
      body: msg.user + ': ' + msg.msg,
      icon: 'notif.png',
      timeout: 4000,
      onClick: function () {
        window.focus();
        this.close();
      }
    })
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
      msgs.push('<div class="msg"><span style="color: blue"> ' + msg.user + '</span>: ' + msg.msg + '</div>')
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