import axios from 'axios';
import authApi from './authApi';

const chatApi = (() => {
  const fetchChatRoomList = async (page, limit) => {
    let res = null;
    try {
      res = await axios.get('/api/admin/chat/users', {
        params: { page, limit },
        ...authApi.getAxiosAuthorizationConfig(),
      });
    } catch (e) {
      if (e.response) {
        res = e.response;
        return;
      }
      throw e;
    }

    return res;
  };

  const fetchChat = async (page, limit) => {
    const res = await axios.get('/api/user/chat', {
      params: {
        page,
        limit,
      },
      ...authApi.getAxiosAuthorizationConfig(),
    });

    return res;
  };

  const fetchChatByRoomId = async ({ page, limit, roomId }) => {
    let res = null;

    try {
      res = await axios.get(`/api/admin/chat/room/${roomId}`, {
        params: {
          page,
          limit,
        },
        ...authApi.getAxiosAuthorizationConfig(),
      });
    } catch (e) {
      if (e.response) {
        res = e.response;
      } else throw e;
    }
    return res;
  };

  return {
    fetchChat,
    fetchChatRoomList,
    fetchChatByRoomId,
  };
})();

export default chatApi;
