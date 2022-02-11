import axios from 'axios';

const brandApi = (() => {
  const getBrands = async ({ categoryGroupCodeOrId, categoryCodeOrId }) => {
    let query = '';
    if (categoryCodeOrId) query = `category=${categoryCodeOrId}`;
    else query = `categoryGroup=${categoryGroupCodeOrId}`;

    let res = null;
    try {
      res = await axios.get(`/api/brands?${query}`);
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  return { getBrands };
})();

export default brandApi;
