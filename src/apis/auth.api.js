import axios from 'axios';
import handleRequest from './utils/handle-request';

const setAxiosAuth = (token) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const initializeToken = (token) => {
  setAxiosAuth(token);
};

export const signin = async ({ email, password }) => {
  const res = await handleRequest(
    axios.post('/api/user/signin', { email, password })
  );
  if (res.status === 200) {
    setAxiosAuth(res.data.token);
  }
  return res;
};

export const signup = async ({ name, email, gender, dob, password }) => {
  const res = await handleRequest(
    axios.post('/api/user/signup', { name, email, gender, dob, password })
  );
  if (res.status === 200) {
    setAxiosAuth(res.data.token);
  }
  return res;
};

export const logout = () => {
  axios.defaults.headers.common['Authorization'] = null;
};

export const checkToken = () =>
  handleRequest(axios.post('/api/user/check-token'));

export const logoutAll = () =>
  handleRequest(axios.post('/api/user/logout-all'));

export default {
  signin,
  signup,
  checkToken,
  logoutAll,
  logout,
  initializeToken,
};
