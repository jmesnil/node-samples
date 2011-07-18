var net = require('net');

var server = net.createServer(function (socket) {
  socket.setEncoding('utf-8');
  socket.write("Echo server\r\n");
  
  socket.on('data', function(data) {
    console.log(data);
    socket.write(data);
  });
});

server.listen(1337, "127.0.0.1");
