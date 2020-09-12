import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    //settting the state from queryString as name and room
    //creating a socket connection instance
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    /*socket can take in a callback as 3rd param as response
    received from the server side of the app*/
    socket.emit('join', { name, room }, () => {});

    /*Exiting the lifecycle method*/

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
