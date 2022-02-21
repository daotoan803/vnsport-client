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

  const sendNewMessage = ({ message, chatRoomId, images }, cb) => {
    if (images?.length > 0) {
      images.forEach(async (image) => {
        const reader = new FileReader();
        reader.onload = function () {
          const bytes = new Uint8Array(this.result);
          console.log(bytes);
          chatSocket.emit(
            'send-image-message',
            { imageBuffer: bytes, chatRoomId },
            cb
          );
        };
        reader.readAsArrayBuffer(image);
      });
    }

    if (message.trim() === '') return;
    chatSocket.emit('send-message', { message, chatRoomId }, cb);
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
