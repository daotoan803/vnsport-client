import axios from 'axios';
import handleRequest from './utils/handle-request';

const token = localStorage.getItem('token');
if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

export const getChatRooms = async ({ page, limit } = {}) => {
  return handleRequest(
    axios.get('/api/admin/chat/rooms', {
      params: {
        page,
        limit,
      },
    })
  );
};
export const getMessageByRoomId = (roomId, { page, limit } = {}) =>
  handleRequest(
    axios.get(`/api/admin/chat/rooms/${roomId}`, { params: { page, limit } })
  );

export const getMessageBelongToCurrentUser = ({ page, limit } = {}) =>
  handleRequest(axios.get('/api/user/chat', { params: { page, limit } }));

export default {
  getChatRooms,
  getMessageByRoomId,
  getMessageBelongToCurrentUser,
};
