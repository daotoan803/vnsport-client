import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import chatSocketApi from '../apis/chatSocket.api';
import chatApi from '../apis/chat.api';
import { availableRole } from './../enums/user.enum';

const ChatContext = createContext({
  loadingMessage: false,
  loadingChatRooms: false,
  messages: [],
  chatRoomId: 0,
  chatRooms: [],
  // eslint-disable-next-line no-unused-vars
  sendMessage(newMessage) {},
  // eslint-disable-next-line no-unused-vars
  setRoom(chatRoomId) {},
  // eslint-disable-next-line no-unused-vars
  onReadMessage(chatRoomId) {},
});

export default ChatContext;

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [loadingChatRooms, setLoadingChatRooms] = useState(false);

  const authContext = useContext(AuthContext);

  const addNewMessage = (newMessage) => {
    setMessages((prev) => {
      return [newMessage, ...prev];
    });
  };

  const addChatRooms = (room) => {
    setChatRooms((prev) => {
      const newChatRoomList = prev.filter(
        (message) => message.chatRoomId !== room.chatRoomId
      );

      room.haveNewMessage = room.id !== chatRoomId;
      return [room, ...newChatRoomList];
    });
  };

  const fetchOldMessages = () => {
    setLoadingMessage(true);
    chatApi.getMessageBelongToCurrentUser().then((res) => {
      setLoadingMessage(false);
      setMessages(res.data.messages.messages);
    });
  };

  const fetchChatRoomList = () => {
    setLoadingChatRooms(true);
    chatApi.getChatRooms().then((res) => {
      setLoadingChatRooms(false);
      setChatRooms(res.data.rooms.rows);
    });
  };

  useEffect(() => {
    if (!authContext.token) {
      chatSocketApi.terminate();
      return;
    }

    chatSocketApi.initialize(authContext.token);
    //join user default chat room
    chatSocketApi.joinNewRoom();
    fetchOldMessages();
    chatSocketApi.subscribeNewMessage(addNewMessage);
    if (authContext.role === availableRole.admin) {
      fetchChatRoomList();
      chatSocketApi.subscribeAllChatRoomNewMessages(addChatRooms);
    }
  }, [authContext.token]);

  useEffect(() => {
    if (!chatRoomId) return;
    if (!authContext.token) return;

    setLoadingMessage(true);
    chatApi.getMessageByRoomId(chatRoomId).then((res) => {
      setLoadingMessage(false);
      setMessages(res.data.messages.messages);
    });
  }, [chatRoomId, authContext.token]);

  const sendMessage = (message, images) => {
    if (!images && message.trim() === '') return;

    chatSocketApi.sendNewMessage(
      { message, images, chatRoomId },
      (err, data) => {
        if (err) throw err;
        addNewMessage(data);
      }
    );
  };

  const setRoom = (newRoomId) => {
    chatSocketApi.joinNewRoom(newRoomId, () => {
      setChatRoomId(newRoomId);
    });
  };

  const onReadMessage = (chatRoomId) => {
    chatSocketApi.emitMessageRead(chatRoomId);
    setChatRooms((prev) => {
      console.log(prev);
      return prev.map((chatRoom) => {
        if (chatRoom.chatRoomId === chatRoomId) {
          chatRoom.chatRoom.haveNewMessage = false;
        }
        return chatRoom;
      });
    });
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        chatRoomId,
        chatRooms,
        loadingMessage,
        loadingChatRooms,
        sendMessage,
        setRoom,
        onReadMessage,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
