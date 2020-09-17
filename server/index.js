const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

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
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    //letting a user join a room if there is no error
    //this is how i fire events in sockets.
    //it has a type then a build which is a payload
    ///this is a welcome message to the user from the admin
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    //Informing all the users in the room that a new user has joined
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name},has joined` });

    socket.join(user.room);

    callback();
  });

  //Event called on the front end when the user emits a message
  //Even send message is emmited on the frontend.Backend is only listening
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    //sending the message to a particular room
    io.to(user.room).emit('message', { user: user.name, text: message });

    //important incase you wish to return a response to the front end
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left`,
      });
    }
  });
});

//calling the router as a middleware
app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
