import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import AuthContext from './AuthContext';

const SocketContext = createContext({ chatSocket: null });
export default SocketContext;

export const SocketContextProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    if (!authContext.isLoggedIn) {
      if (chatSocket) chatSocket.disconnect();
      setChatSocket(null);
      return;
    }

    if (chatSocket) return;

    if (authContext.isLoggedIn && authContext.token) {
      setChatSocket(
        io.connect('/chat', {
          auth: {
            token: authContext.token,
          },
        })
      );
    }
  }, [authContext.token, authContext.isLoggedIn]);

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.emit('test-connection', 'abc');

    chatSocket.on('connect', () => {
      console.log('chat socket connect ok');
    });
  }, [chatSocket]);

  return (
    <SocketContext.Provider value={{ chatSocket: chatSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
