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

  const getRole = () => role;

  const logIn = async (email, password) => {
    const { data, status } = await axios
      .post('/api/user/signin', {
        email,
        password,
      })
      .catch((e) => ({ status: e.request.status, data: e.response.data }));

    if (status === 200) {
      storeToken(data.token);
      if (data.role) {
        localStorage.setItem('role', data.role);
      }
    }

    if (status === 500) alert('something happen, please try again');
    return { status: status, role: data.role };
  };

  const signup = async ({ name, email, dob, gender, password }) => {
    const { status, data } = await axios.post('/api/user/signup', {
      name,
      email,
      dob,
      gender,
      password,
    });

    if (status === 200) {
      storeToken(data.token);
    }
    return { status, data };
  };

  const logout = () => {
    token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
    availableRole,
  };
})();

export default auth;
