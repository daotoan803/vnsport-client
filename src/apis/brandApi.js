import axios from 'axios';

const brandApi = (() => {
  const getBrands = async ({ categoryGroupCodeOrId, categoryCodeOrId }) => {
    let res = null;
    try {
      res = await axios.get(`/api/brands`, {
        params: {
          categoryGroupCodeOrId,
          categoryCodeOrId,
        },
      });
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  return { getBrands };
})();

export default brandApi;
