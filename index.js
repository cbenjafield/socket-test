const express = require('express');
const app =  express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

io.on('connection', (socket) => {
  socket.on('device.added', data => {
    console.log('New connection:');
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

setInterval(() => {
  io.emit('ping', `Ping: ${new Date().toISOString()}`);
}, 5000);

server.listen(3000, () => {
  console.log('Listening on *:3000');
});