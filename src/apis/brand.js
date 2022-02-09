import axios from 'axios';

const brandApi = (() => {
  const getBrandOptions = async () => {
    let res = null;
    try {
      res = await axios.get('/api/brands');
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  const getBrandOptionsByCategoryGroup = async (categoryGroupId) => {
    let res = null;
    try {
      res = await axios.get('/api/brands/group/' + categoryGroupId);
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  return { getBrandOptions, getBrandOptionsByCategoryGroup };
})();

export default brandApi;
