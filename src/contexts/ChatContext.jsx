import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import chatSocketApi from './../apis/chatSocketApi';
import auth from './../apis/authApi';
import chatApi from './../apis/chatApi';

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
  const [chatRooms, setChatRooms] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [loadingChatRooms, setLoadingChatRooms] = useState(false);

  const authContext = useContext(AuthContext);

  const addNewMessage = (newMessage) => {
    console.log('addNewMessage called');
    setMessages((prev) => {
      console.log('setting new message : ', [newMessage, ...prev]);
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
    chatApi.fetchChat().then((res) => {
      setLoadingMessage(false);
      setMessages(res.data.messages.messages);
    });
  };

  const fetchChatRoomList = () => {
    setLoadingChatRooms(true);
    chatApi.fetchChatRoomList().then((res) => {
      setLoadingChatRooms(false);
      setChatRooms(res.data);
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
    if (authContext.role === auth.availableRole.admin) {
      fetchChatRoomList();
      chatSocketApi.subscribeAllChatRoomNewMessages(addChatRooms);
    }
  }, [authContext.token]);

  useEffect(() => {
    if (!chatRoomId) return;

    setLoadingMessage(true);
    chatApi.fetchChatByRoomId({ roomId: chatRoomId }).then((res) => {
      setLoadingMessage(false);
      setMessages(res.data.messages.messages);
    });
  }, [chatRoomId]);

  const sendMessage = (message) => {
    if (message.trim() === '') return;

    chatSocketApi.sendNewMessage({ message, chatRoomId }, addNewMessage);
  };

  const setRoom = (newRoomId) => {
    chatSocketApi.joinNewRoom(newRoomId, () => {
      setChatRoomId(newRoomId);
    });
  };

  const onReadMessage = (chatRoomId) => {
    chatSocketApi.emitMessageRead(chatRoomId);
    setChatRooms((prev) => {
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
