const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT || 5000;


// Websocket like socket.io for Realtime application, instead of httpRequest  which is  slower
const app = express();
const server = http.createServer(app);
// const io = socketio(server);
const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    console.log(`We have a new connection!!!`);


    // socket.on('join', ({name, room}) => {
    //     console.log(name, room);
    // });

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);
    });

    socket.on('disconnect', () => {
        console.log(`User has left !!!`);
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
