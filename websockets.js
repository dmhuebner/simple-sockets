var http = require('http');
var socketio = require('./node_modules/socket.io');
var fs = require('fs');

var port = 8080;

var handler = function(req, resp) {
  fs.readFile(__dirname + '/index.html', function(error, data) {
    if (error) {
      resp.writeHead(500);
      resp.end('Error loading index.html');
    } else {
      resp.writeHead(200);
      resp.end(data);
    }
  });
}

var app = http.createServer(handler);
var io = socketio.listen(app);

io.sockets.on('connection', function(socket) {
  setInterval(function() {
    var timeStamp = Date.now();
    console.log('Emitted ' + timeStamp);
    socket.emit('timer', timeStamp);
  }, 2000);
  socket.on('submit', function(data) {
    console.log('Submited ' + data);
  });
});

app.listen(port);

console.log('Server running on port ' + port);