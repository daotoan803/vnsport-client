import axios from './axios';
import handleRequest from './utils/handle-request';

export const getCurrentUserDetail = () =>
  handleRequest(axios.get('/api/user/'));

export const findUserInfo = ({ chatRoomId, userId }) =>
  handleRequest(
    axios.get(`/api/admin/users`, { params: { chatRoomId, userId } })
  );

export default {
  getCurrentUserDetail,
  findUserInfo,
};
