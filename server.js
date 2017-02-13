var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  path = require('path'),
  server = app.listen(port, function () {
    console.log('Server running on port ' + port)
  }),
  socket = require('socket.io'),
  io = socket(server)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.redirect('/chat')
})

io.sockets.on('connection', function (socket) {
  console.log('New connection on: ' + socket.id)
  
  socket.on('msg', function (msg) {
    console.log(JSON.stringify(msg))
    socket.broadcast.emit('msg', msg)
  })

})
