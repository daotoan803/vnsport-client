import io from 'socket.io-client';

const chatSocketApi = (() => {
  let chatSocket = null;
  let socketRoom = null;

  const initialize = (token) => {
    if (chatSocket) return;
    chatSocket = io.connect('/chat', { auth: { token } });
  };

  const terminate = () => {
    if (chatSocket) chatSocket.disconnect();
    chatSocket = null;
    socketRoom = null;
  };

  const joinNewRoom = (newRoomId = null, cb = () => {}) => {
    chatSocket.emit('leave-support-room', socketRoom, () => {
      chatSocket.emit('join-support-room', newRoomId, cb);
    });
  };

  const subscribeNewMessage = (cb) => {
    chatSocket.on('new-message', cb);
  };

  const sendNewMessage = (data, cb) => {
    chatSocket.emit('send-message', data, cb);
  };

  const subscribeAllChatRoomNewMessages = (cb) => {
    chatSocket.on('new-broadcast-message', cb);
  };

  const emitMessageRead = (chatRoomId) => {
    chatSocket.emit('read-message', chatRoomId);
  };

  return {
    initialize,
    terminate,
    joinNewRoom,
    subscribeNewMessage,
    sendNewMessage,
    subscribeAllChatRoomNewMessages,
    emitMessageRead,
  };
})();

export default chatSocketApi;
