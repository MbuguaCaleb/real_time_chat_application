import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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

  //this useeffect only runs when the message changes as shown in the array at the end
  //responsibe for displaying the admin message
  useEffect(() => {
    //message is wha
    socket.on('message', (message) => {
      //adding message to all other message
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === 'Enter' ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;
