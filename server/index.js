const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

//set up socket io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//listen to any instance of connecting to a socket via a URL
/**
 * A socket may as well take in a 3rd Parameter as the callback for instance
 * when there is an error and then pass this to the front end..
 *
 *
 */
io.on('connection', (socket) => {
  console.log(`We have a new connection!!!!`);

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);
  });

  socket.on('disconnect', () => {
    console.log('User had left!!!');
  });
});

//calling the router as a middleware
app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
