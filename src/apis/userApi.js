import axios from 'axios';
import authApi from './authApi';

const userApi = (() => {
  const findUserInfo = async ({ userId, chatRoomId }) => {
    let res = null;
    try {
      res = await axios.get('/api/admin/users/find', {
        params: {
          userId,
          chatRoomId,
        },
        ...authApi.getAxiosAuthorizationConfig,
      });
    } catch (e) {
      if (!e.response) throw e;
      res = e.response;
    }

    return res;
  };

  return { findUserInfo };
})();

export default userApi;
