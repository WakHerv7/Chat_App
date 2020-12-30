import React, { useState, useEffect} from 'react';      // { useState, useEffect} : Are for Reatc-Hooks
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
// let socket = require('socket.io-client')('http://localhost:3000');

import './Chat.css';

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        // let socket = require('socket.io-client')('http://localhost:3000');
        socket = io(ENDPOINT);
        // socket = io(ENDPOINT,  {transports: ['websocket', 'polling', 'flashsocket']});

        setName(name);
        setRoom(room);

        console.log(socket);

        // socket.emit('join', {name: name, room: room});   // Passing datas : name as name & room as room
        socket.emit('join', {name, room}, () => {
            
        });      // Do the same thing as before but works well with ES6

        return () => {
            socket.emit('disconnect');

            socket.off();       // Turn Off the connected client
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        /******** RECEIVE MESSAGE FROM THE SERVER ****/
        socket.on('message', (message) => {
            setMessages([...messages, message]);    // Add new message to our Messages Array
        });
    }, [messages]);


    // Function for Sending Messages
    /******** SEND MESSAGE TO THE SERVER ****/
    const sendMessage = (event) => {
        event.preventDefault();     // Prevent refreshing the page

        if (message) {
            // socket.emit( messageId, messageContent, callback);
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (        
        <div className="outerContainer">
            <div className="container">
                <h1>Chat</h1>
                <input 
                value={message} 
                onChange={ (event) => setMessage(event.target.value) }
                onKeyPress={ (event) => event.key === 'Enter' ? sendMessage(event) : null } 
                />
            </div>
        </div>   
    );
}

export default Chat;