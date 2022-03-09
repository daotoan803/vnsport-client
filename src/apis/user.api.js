import axios from 'axios';
import handleRequest from './utils/handle-request';

export const getCurrentUserDetail = () =>
  handleRequest(axios.get('/api/user/'));

export default {
  getCurrentUserDetail,
};
