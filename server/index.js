const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

//set up socket io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//calling the router as a middleware
app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
