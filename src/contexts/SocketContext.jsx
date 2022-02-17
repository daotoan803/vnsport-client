import React, { createContext } from 'react';
import io from 'socket.io-client';

const socket = io.connect();

const SocketContext = createContext(socket);
export default SocketContext;

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
