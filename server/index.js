const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

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

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);
        const {error, user} = addUser({id: socket.id, name, room});     // socket.id : ID of the currently connected client

        if(error) return callback(error);

        /******** SEND MESSAGE FROM THE SERVER TO THE CLIENT *************** */
        // Tell the user that he is welcome to the chat
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        // Send a message to everyone in the room beside that specific user, that he has joined
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined !`});

        socket.join(user.room);

        callback();
    });

    /******** RECEIVE MESSAGE FROM THE CLIENT TO THE SERVER *************** */
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user);
        
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log(`User has left !!!`);
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
