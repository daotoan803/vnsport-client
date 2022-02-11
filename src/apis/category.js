import axios from 'axios';

const categoryApi = (() => {
  const getCategories = async (categoryGroupCodeOrId) => {
    let categoryGroupQuery = categoryGroupCodeOrId
      ? `group=${categoryGroupCodeOrId}`
      : '';

    let res = null;
    try {
      res = await axios.get(`/api/categories?${categoryGroupQuery}`);
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

  return { getCategories, getCategoryGroups };
})();

export default categoryApi;
