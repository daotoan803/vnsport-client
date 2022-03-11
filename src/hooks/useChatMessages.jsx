// import { useState, useEffect } from 'react';
// import chatSocketApi from '../apis/chatSocket.api';
// import chatApi from '../apis/chat.api';

// export default (roomId, { page, limit }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     (async () => {
//       let res = null;
//       setIsLoading(true);
//       if (roomId) {
//         res = await chatApi.getMessageByRoomId(roomId, { page, limit });
//       } else {
//         res = await chatApi.getMessageBelongToCurrentUser({ page, limit });
//       }
//       console.log(res.data);
//       setMessages(res.data.rows);
//       setIsLoading(false);
//       chatSocketApi.subscribeNewMessage((err, { message, user }) => {
//         if (err) {
//           setError(err);
//           return;
//         }
//         setMessages((prev) => [{ message, user }, ...prev]);
//       });
//     })();
//   }, [roomId, page, limit]);

//   return { isLoading, error, messages };
// };
