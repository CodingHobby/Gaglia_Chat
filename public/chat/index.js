var notif = new Audio('./notif.mp3')

var config = {
	apiKey: "AIzaSyDZ4a2nblDl4CGL6XJBIBGdSJ55K7Ei8xs",
	authDomain: "gagliachat.firebaseapp.com",
	databaseURL: "https://gagliachat.firebaseio.com",
	storageBucket: "gagliachat.appspot.com",
	messagingSenderId: "311284835365"
};
firebase.initializeApp(config);

var database = firebase.database()

var msgs = database.ref('msgs')


window.addEventListener('load', function () {
	var socket = io.connect(document.domain + ':' + location.port)

	msgs.on('value', updateMsgs, function (err) {
		console.log('Error:', err)
	})
	socket.on('connection', function () {
		updateMsgs(msgs)
	})

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


	function updateMsgs(data) {
		var keys = Object.keys(data.val())
		document.getElementById('msgs').innerHTML = ''
		for (var i = 0; i < keys.length; i++) {
			console.log(data.val()[keys[i]])
			document.getElementById('msgs').innerHTML += data.val()[keys[i]]
		}
	}

	document.getElementById('form').addEventListener('submit', function (e) {
		e.preventDefault()
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
			return false
		}
	})

})