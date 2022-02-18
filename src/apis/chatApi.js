import axios from 'axios';
import authApi from './authApi';

const chatApi = (() => {
  const fetchChat = async (page, limit) => {
    if (!authApi.isLoggedIn() || !authApi.getToken()) {
      throw new Error("Can't fetch chat when not logged in");
    }

    const res = await axios.get('/api/chat', {
      params: {
        ...(page ? { page } : {}),
        ...(limit ? { limit } : {}),
      },
      ...authApi.getAxiosAuthorizationConfig(),
    });

    return res;
  };

  return { fetchChat };
})();

export default chatApi;
