import axios from 'axios';

const auth = (() => {
  let token = localStorage.getItem('token') || null;
  let role = localStorage.getItem('role') || null;

  const availableRole = {
    admin: 'admin',
    sale: 'sale',
    storage: 'storage',
    customer: '',
  };

  const isLoggedIn = () => token !== null;

  const storeToken = (newToken) => {
    token = newToken;
    localStorage.setItem('token', newToken);
  };

  const storeUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const getRole = () => role;
  const getToken = () => token;

  const logIn = async (email, password) => {
    const { data, status } = await axios
      .post('/api/user/signin', {
        email,
        password,
      })
      .catch((e) => ({ status: e.request.status, data: e.response.data }));

    if (status === 200) {
      storeToken(data.token);
      storeUser(data.user);
      if (data.role) {
        localStorage.setItem('role', data.role);
      }
    }

    if (status === 500) alert('something happen, please try again');
    return { status, data };
  };

  const signup = async ({ name, email, dob, gender, password }) => {
    let res = null;
    try {
      res = await axios.post('/api/user/signup', {
        name,
        email,
        dob,
        gender,
        password,
      });
    } catch (e) {
      res = e.response;
    }

    const { status, data } = res;

    if (status === 200) {
      storeToken(data.token);
    }
    return { status, data };
  };

  const validateToken = async () => {
    if (token === null) return {status : 401};

    let res = null;
    try {
      res = await axios.post('/api/user/validateToken');
    } catch (e) {
      if (!e.response) throw e;
      res = e.response;
    }

    return res;
  };

  const logout = () => {
    token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  };

  const getAxiosAuthorizationConfig = () => {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  return {
    isLoggedIn,
    logIn,
    signup,
    logout,
    getRole,
    getAxiosAuthorizationConfig,
    validateToken,
    availableRole,
    getToken,
  };
})();

export default auth;
