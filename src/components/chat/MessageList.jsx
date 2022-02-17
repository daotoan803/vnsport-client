import React, { useState, useEffect } from 'react';

import Message from './Message';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
  }, []);

  return (
    <>
      {messages.map((message, i) => {
        const prevMessage = messages[i - 1];
        const nextMessage = messages[i + 1];

        if (message.isSender === nextMessage?.isSender) {
          if (message.isSender === prevMessage?.isSender) {
            message.position = 'middle';
          } else if (message.isSender !== prevMessage?.isSender) {
            message.position = 'bottom';
          }
        } else if (message.isSender === prevMessage?.isSender) {
          message.position = 'top';
        }
        return (
          <Message
            key={message.id}
            isSender={message.isSender}
            position={message.position}
            message={message.message}
          />
        );
      })}
    </>
  );
};

export default MessageList;
