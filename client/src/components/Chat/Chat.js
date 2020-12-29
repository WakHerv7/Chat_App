import React, { useState, useEffect} from 'react';      // { useState, useEffect} : Are for Reatc-Hooks
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
// let socket = require('socket.io-client')('http://localhost:3000');

import './Chat.css';

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        // let socket = require('socket.io-client')('http://localhost:3000');
        socket = io(ENDPOINT);
        // socket = io(ENDPOINT,  {transports: ['websocket', 'polling', 'flashsocket']});

        setName(name);
        setRoom(room);

        // socket.emit('join', {name: name, room: room});   // Passing datas : name as name & room as room
        socket.emit('join', {name, room}, () => {
            
        });      // Do the same thing as before but works well with ES6

        return () => {
            socket.emit('disconnect');

            socket.off();       // Turn Off the connected client
        }

    }, [ENDPOINT, location.search]);
    
    return (
        <h1>Chat</h1>    
    );
}

export default Chat;