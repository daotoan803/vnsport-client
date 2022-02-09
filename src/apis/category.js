import axios from 'axios';

const categoryApi = (() => {
  const getCategoryOptions = async () => {
    let res = null;
    try {
      res = await axios.get('/api/categories');
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  const getCategoryGroupPreview = async (categoryGroupId) => {
    let res = null;
    try {
      res = await axios.get(`/api/products/group/${categoryGroupId}`);
    } catch (e) {
      res = e.response;
    }
    return { status: res.status, data: res.data };
  };

  const getCategoryGroups = async () => {
    let res = null;
    try {
      res = await axios.get('/api/categories/group');
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  return { getCategoryOptions, getCategoryGroups, getCategoryGroupPreview };
})();

export default categoryApi;